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
  await page.screenshot({path:'artifacts/resume-upload-mobile.png',fullPage:true});
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

  await page.goto(base+`/gsm-admin/leads/${id}`);
  await page.getByRole('button',{name:/^Preview r/,exact:true}).click();
  await page.locator('.resume-pdf-preview').waitFor();
  const pdfUrl=await page.locator('.resume-pdf-preview').getAttribute('src');
  const pdf=await page.request.get(base+pdfUrl);
  assert.equal(pdf.status(),200);assert.match(pdf.headers()['content-disposition'],/^inline/);assert.equal(pdf.headers()['x-frame-options'],'SAMEORIGIN');
  await page.screenshot({path:'artifacts/resume-preview.png'});
  await page.getByRole('button',{name:'Close preview'}).click();
  const request=page.context().request;
  const [{submission_token:token}]=await sql.query('SELECT submission_token FROM leads WHERE id=$1',[id]);
  const sharp=(await import('sharp')).default;
  const png=await sharp({create:{width:80,height:80,channels:3,background:'#de7b37'}}).png().toBuffer();
  const uploaded=await request.post(base+'/api/resume',{multipart:{kind:'image',submissionToken:token,resume:{name:'qa-image.png',mimeType:'image/png',buffer:png}}});
  assert.equal(uploaded.status(),201,await uploaded.text());const image=await uploaded.json();
  const bad=await request.post(base+'/api/resume',{multipart:{kind:'image',submissionToken:token,resume:{name:'fake.png',mimeType:'image/png',buffer:Buffer.from('not an image')}}});assert.equal(bad.status(),400);
  const snapshot={type:'image',label:{en:'QA image'},options:[]};
  await sql.query('INSERT INTO lead_answers (id,lead_id,question_key,answer,question_snapshot) VALUES (gen_random_uuid(),$1,$2,$3::jsonb,$4::jsonb)',[id,'qa_image',JSON.stringify(image.id),JSON.stringify(snapshot)]);
  await page.reload();await page.getByRole('button',{name:'Preview image',exact:true}).click();await page.locator('.admin-image-preview').waitFor();
  await page.waitForFunction(()=>{const i=document.querySelector('.admin-image-preview') as HTMLImageElement;return i?.complete && i.naturalWidth>0;});
  await page.screenshot({path:'artifacts/image-preview.png'});await page.getByRole('button',{name:'Close preview'}).click();
  const unauth=await fetch(base+`/api/admin/resumes/${image.id}?metadata=1`);assert.equal(unauth.status,401);
  const missingConfirmation=await request.delete(base+`/api/admin/leads/${id}`,{data:{}});assert.equal(missingConfirmation.status(),400);
  await page.getByRole('button',{name:'Delete application for QA CAREERS Browser submission'}).click();
  await page.getByRole('button',{name:'Keep application'}).click();assert.equal((await sql.query('SELECT id FROM leads WHERE id=$1',[id])).length,1);
  await page.getByRole('button',{name:'Delete application for QA CAREERS Browser submission'}).click();
  await page.getByRole('button',{name:'Delete permanently'}).click();await page.waitForURL('**/gsm-admin/leads');
  assert.equal((await sql.query('SELECT id FROM leads WHERE id=$1',[id])).length,0);
  assert.equal((await sql.query('SELECT id FROM resume_uploads WHERE submission_token=$1',[token])).length,0);
  assert.equal((await sql.query('SELECT id FROM lead_answers WHERE lead_id=$1',[id])).length,0);
  assert.equal((await sql.query("SELECT id FROM audit_log WHERE entity_id=$1 AND action='application.deleted'",[id])).length,1);
  console.log('PASS: mobile application and upload; authenticated PDF/image previews; invalid image rejection; cancel/confirm deletion and cascading file cleanup.');
 } finally {
  await browser.close();
  if(id){const rows=await sql.query('SELECT submission_token FROM leads WHERE id=$1',[id]) as {submission_token:string}[];await sql.query('DELETE FROM leads WHERE id=$1',[id]);if(rows[0])await sql.query('DELETE FROM resume_uploads WHERE submission_token=$1',[rows[0].submission_token]);}
 }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
