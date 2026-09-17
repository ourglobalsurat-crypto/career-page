import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import dotenv from 'dotenv';
import {neon} from '@neondatabase/serverless';
import {defaultQuestions} from '../src/lib/default-questionnaire';
import {getVisibleQuestions} from '../src/lib/careers-flow';
dotenv.config({path:'.env.local',quiet:true});
const sql=neon(process.env.DATABASE_URL!);const base=process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
async function main(){
 const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined});
 const page=await browser.newPage({viewport:{width:390,height:844}});page.setDefaultTimeout(15000);
 await page.setExtraHTTPHeaders({'x-forwarded-for':`198.19.1.${Math.floor(Math.random()*250)}`});
 let id:string|undefined;
 try {
  await page.goto(base);
  const questions=getVisibleQuestions(defaultQuestions,{growth_path:'sales'});
  for(const q of questions){
   await page.getByRole('heading',{name:q.label.en,exact:true}).waitFor();
   const invalid: Record<string,string> = {sales_q3:'Too short',full_name:'12345',phone:'+911234567890',email:'not-an-email',current_salary:'-100',expected_salary:'0',portfolio:'javascript:alert(1)'};
   if(invalid[q.key] !== undefined) {
    await page.locator('.question-input').fill(invalid[q.key]);
    await page.getByRole('button',{name:'Continue',exact:true}).click();
    await page.locator('#question-error').waitFor();
    await page.getByRole('heading',{name:q.label.en,exact:true}).waitFor();
   }
   if(q.type==='single_choice') await page.locator('.choice-card').filter({hasText:q.key==='growth_path'?'Sales Executive':q.options[0].label.en}).first().click();
   else if(q.type==='multi_choice')await page.locator('.choice-card').first().click();
   else if(q.type==='file'){
    await page.locator('input[type=file]').setInputFiles({name:'qa-browser.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4\n1 0 obj<</Type /Catalog>>endobj\n%%EOF')});
    await page.getByText('Résumé uploaded successfully.',{exact:true}).waitFor();
   } else await page.locator('.question-input').fill(q.key==='full_name'?'QA CAREERS Browser submission':q.key==='email'?'qa@example.com':q.type==='phone'?'9876543210':q.type==='url'?'https://example.com/portfolio':q.type==='number'?'45000':'I qualify leads, understand their goals, track my pipeline and measure results.');
   if(q.type!=='file') await page.getByRole('button',{name:'Continue',exact:true}).click();
  }
  await page.locator('.consent-row input').check();
  const responsePromise=page.waitForResponse(r=>r.url().endsWith('/api/leads') && r.request().method()==='POST');
  await page.getByRole('button',{name:'Submit application',exact:true}).click();
  const response=await responsePromise;assert.equal(response.status(),201);
  const saved=await sql.query("SELECT id FROM leads WHERE name='QA CAREERS Browser submission' AND email='qa@example.com' ORDER BY created_at DESC LIMIT 1") as {id:string}[];
  id=saved[0]?.id;assert.ok(id);
  await page.waitForURL('**/thank-you');await page.getByRole('heading',{name:'Thank you for applying!'}).waitFor();
  await page.screenshot({path:'artifacts/careers-thank-you-mobile.png',fullPage:true});
  // Log in through the actual admin form, then add and close a test position.
  await page.goto(base+'/gsm-admin/login');await page.getByLabel('Email address').fill(process.env.ADMIN_EMAIL!);await page.getByLabel('Password',{exact:true}).fill(process.env.ADMIN_PASSWORD!);
  await page.getByRole('button',{name:'Open hiring desk',exact:true}).click();await page.waitForURL('**/gsm-admin');
  await page.goto(base+'/gsm-admin/questionnaire');
  await page.getByRole('button',{name:'Manage positions',exact:true}).click();
  const optionCount=await page.locator('.editor-option-row').count();
  await page.getByRole('button',{name:'Add option',exact:true}).click();
  assert.equal(await page.locator('.editor-option-row').count(),optionCount+1);
  await page.getByRole('button',{name:'Close editor',exact:true}).click();
  const draft=await sql.query("SELECT id FROM form_versions WHERE status='draft'") as {id:string}[];
  const rows=await sql.query("SELECT id,question_key,question_type,label,help_text,placeholder,required,options,config,is_active FROM questions WHERE version_id=$1 AND config->>'systemRole'='flow_selector'",[draft[0].id]);
  const row=(rows as Record<string,unknown>[])[0];
  const original={key:row.question_key,type:row.question_type,label:row.label,helpText:row.help_text,placeholder:row.placeholder,required:row.required,options:row.options,config:row.config,isActive:row.is_active};
  const request=page.context().request;
  const added=await request.patch(base+`/api/admin/questions/${row.id}`,{data:{...original,options:[...(row.options as object[]),{id:'qa_role',label:{en:'QA temporary role',hi:'',gu:''}}]}});assert.equal(added.status(),200,await added.text());
  const rejected=await request.post(base+'/api/admin/questionnaire/publish');assert.equal(rejected.status(),400,'New role must have questions before publish');
  const restored=await request.patch(base+`/api/admin/questions/${row.id}`,{data:original});assert.equal(restored.status(),200);
  const published=await request.post(base+'/api/admin/questionnaire/publish');assert.equal(published.status(),200,await published.text());
  await page.goto(base);assert.equal(await page.locator('.service-card').count(),11);
  console.log('PASS: role-first mobile application; invalid name, phone, email, salary, short answer and URL blocked; résumé upload, consent, thank-you; admin login and publishing.');
 } finally {
  await browser.close();
  if(id){const rows=await sql.query('SELECT submission_token FROM leads WHERE id=$1',[id]) as {submission_token:string}[];await sql.query('DELETE FROM leads WHERE id=$1',[id]);if(rows[0])await sql.query('DELETE FROM resume_uploads WHERE submission_token=$1',[rows[0].submission_token]);}
 }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
