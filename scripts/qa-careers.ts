import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import dotenv from 'dotenv';
import {neon} from '@neondatabase/serverless';
import {chromium} from 'playwright';
import {defaultQuestions} from '../src/lib/default-questionnaire';
import {getVisibleQuestions,pruneHiddenAnswers,validateQuestionnaireFlow} from '../src/lib/careers-flow';
dotenv.config({path:'.env.local',quiet:true});
const base='http://127.0.0.1:3000';
const sql=neon(process.env.DATABASE_URL!);
const owned:string[]=[];const uploads:string[]=[];
let activeBrowser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
const testIp = `198.18.${Math.floor(Math.random()*250)}.${Math.floor(Math.random()*250)}`;
const pdf=Buffer.from('%PDF-1.4\n1 0 obj<</Type /Catalog>>endobj\n%%EOF');
async function main(){
  assert.equal(validateQuestionnaireFlow(defaultQuestions),null);
  const rows=await sql.query("SELECT id,form_id FROM form_versions WHERE status='published'") as {id:string;form_id:string}[];
  const version=rows[0];
  const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{channel:'msedge'}:{})});
  activeBrowser=browser;
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  const page=await context.newPage();const errors:string[]=[];
  page.setDefaultTimeout(15000);
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.getByRole('heading',{name:'Do work that matters. Grow with us.'}).waitFor();
  assert.equal(await page.locator('.service-card').count(),11);
  await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.getByText('This answer is required.',{exact:true}).waitFor();
  await page.locator('.team-photo-wrap').scrollIntoViewIfNeeded();
  await page.locator('.team-photo-wrap img').evaluate((img:HTMLImageElement)=>img.decode());
  await page.locator('#top').scrollIntoViewIfNeeded();
  await page.screenshot({path:'artifacts/careers-desktop.png',fullPage:true});
  await page.getByRole('heading',{name:'Which position are you applying for?',exact:true}).waitFor();
  await page.locator('.choice-card').filter({hasText:'Sales Executive'}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.getByRole('heading',{name:'How many years of hands-on sales experience do you have?'}).waitFor();
  assert.equal(await page.getByText('What is your highest monthly lead-generation budget?',{exact:true}).count(),0);
  await page.setViewportSize({width:390,height:844});await page.goto(base);await page.screenshot({path:'artifacts/careers-mobile.png',fullPage:true});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile must not overflow horizontally');
  assert.equal((await context.request.get(base+'/gsm-admin')).status(),200); // login redirect
  assert.equal((await context.request.get(base+'/api/admin/leads/export')).status(),401);
  const login=await context.request.post(base+'/api/admin/login',{data:{email:process.env.ADMIN_EMAIL,password:process.env.ADMIN_PASSWORD}});
  assert.equal(login.status(),200,await login.text());
  const roles=defaultQuestions.find(q=>q.config.systemRole==='flow_selector')!.options;
  for(const [index,role] of roles.entries()){
    const token=crypto.randomUUID();
    const upload=await context.request.post(base+'/api/resume',{headers:{'x-forwarded-for':testIp},multipart:{submissionToken:token,resume:{name:'qa-resume.pdf',mimeType:'application/pdf',buffer:pdf}}});
    assert.equal(upload.status(),201,await upload.text());const resume=(await upload.json()).id;uploads.push(resume);
    const answers:Record<string,unknown>={growth_path:role.id};
    for(const q of getVisibleQuestions(defaultQuestions,answers)) {
      if(q.key==='growth_path')continue;
      answers[q.key]=q.type==='file'?resume:q.type==='url'?'https://example.com/work':q.type==='email'?'qa@example.com':q.type==='phone'?'+919876543210':q.type==='number'?50000:q.type==='rating'?4:q.type==='multi_choice'?[q.options[0].id]:q.type==='single_choice'?q.options[0].id:'QA practical example: I measured results, reviewed the funnel, and tested improvements.';
    }
    answers.full_name=`QA CAREERS Candidate ${String.fromCharCode(65+index)}`;answers.city='Surat';
    const body={formId:version.form_id,versionId:version.id,language:'en',answers,submissionToken:token,consent:true,startedAt:Date.now()-20000,honeypot:''};
    // Fingerprint headers isolate test requests from the rate limiter.
    const headers={'x-forwarded-for':`198.51.100.${index+1}`};
    if(role.id==='designer'){
      const invalid=await context.request.post(base+'/api/leads',{headers,data:{...body,answers:{...answers,portfolio:''}}});assert.equal(invalid.status(),400);
    }
    if(role.id==='sales') {
      assert.equal(pruneHiddenAnswers(defaultQuestions,{...answers,seo_q1:'option_1'}).seo_q1,undefined);
      const hidden=await context.request.post(base+'/api/leads',{headers,data:{...body,answers:{...answers,seo_q1:'option_1'}}});assert.equal(hidden.status(),400);
      const swapped=await context.request.post(base+'/api/leads',{headers,data:{...body,submissionToken:crypto.randomUUID()}});assert.equal(swapped.status(),400);
    }
    const response=await context.request.post(base+'/api/leads',{headers,data:body});assert.equal(response.status(),201,await response.text());
    const id=(await response.json()).leadId;owned.push(id);
    if(role.id==='sales'){
      const repeated=await context.request.post(base+'/api/leads',{headers,data:body});assert.equal(repeated.status(),200);assert.equal((await repeated.json()).leadId,id);
      await page.setViewportSize({width:1440,height:1000});await page.goto(base+`/gsm-admin/leads/${id}`);
      await page.getByRole('link',{name:'Download résumé'}).waitFor();
      assert.equal((await context.request.get(base+`/api/admin/resumes/${resume}`)).status(),200);
      const outsider=await browser.newContext();assert.equal((await outsider.request.get(base+`/api/admin/resumes/${resume}`)).status(),401);await outsider.close();
      await page.getByLabel('HR assessment (0–60)').fill('50');await page.getByLabel('Assessment notes').fill('QA: practical answers and results reviewed.');await page.getByRole('button',{name:'Save assessment'}).click();await page.getByText('Review saved.',{exact:true}).waitFor();
      await page.getByRole('heading',{name:'70/100',exact:true}).waitFor();
      await page.screenshot({path:'artifacts/careers-admin-detail.png',fullPage:true});
      const status=await context.request.patch(base+`/api/admin/leads/${id}`,{data:{action:'status',status:'qualified'}});assert.equal(status.status(),200);
    }
  }
  await page.goto(base+'/gsm-admin/leads?position=sales');assert.equal(await page.locator('tbody tr').count(),1);
  await page.screenshot({path:'artifacts/careers-admin-list.png',fullPage:true});
  assert.equal((await context.request.get(base+'/api/admin/leads/export')).status(),200);
  await page.goto(base+'/gsm-admin/questionnaire');await page.getByRole('button',{name:'Manage positions',exact:true}).click();
  await page.getByRole('heading',{name:'Which position are you applying for?'}).waitFor();
  assert.equal(await page.locator('.editor-option-row').count(),11);
  await page.getByRole('button',{name:'Close editor',exact:true}).click();
  await page.getByLabel('Filter questions by position').selectOption('sales');assert.equal(await page.locator('.builder-row:visible').count(),6);
  await page.screenshot({path:'artifacts/careers-admin-questions.png',fullPage:true});
  assert.deepEqual(errors,[]);await browser.close();
  console.log('PASS: all 11 roles submit; required portfolio; hidden-answer rejection; upload ownership and private download; duplicate prevention; admin login, filter, review, status, export; desktop and mobile.');
}
main().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{
  await activeBrowser?.close();
  for(const id of owned){await sql.query('DELETE FROM audit_log WHERE entity_id=$1',[id]);await sql.query('DELETE FROM leads WHERE id=$1',[id]);}
  for(const id of uploads)await sql.query('DELETE FROM resume_uploads WHERE id=$1',[id]);
  fs.writeFileSync('artifacts/careers-qa-summary.txt',process.exitCode?'FAILED: see command output':'All careers integration checks passed. Synthetic applications removed.');
});
