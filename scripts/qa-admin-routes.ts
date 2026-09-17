import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import dotenv from 'dotenv';
dotenv.config({path:'.env.local',quiet:true});
const base=process.env.QA_BASE_URL || 'http://127.0.0.1:5000';
async function main(){
 const browser=await chromium.launch({headless:true,channel:process.platform==='win32'?'msedge':undefined});
 try{
  const page=await browser.newPage();
  for(const path of ['/admin','/admin/login','/admin/leads','/admin/questionnaire']){
   const response=await page.request.get(base+path,{maxRedirects:0});assert.equal(response.status(),404,path);
  }
  const protectedResponse=await page.request.get(base+'/gsm-admin',{maxRedirects:0});
  assert.equal(protectedResponse.status(),307);assert.equal(protectedResponse.headers().location,'/gsm-admin/login');
  await page.goto(base+'/gsm-admin');await page.getByLabel('Email address').fill(process.env.ADMIN_EMAIL!);await page.getByLabel('Password',{exact:true}).fill(process.env.ADMIN_PASSWORD!);
  await page.getByRole('button',{name:'Open hiring desk'}).click();await page.waitForURL('**/gsm-admin');
  for(const path of ['/gsm-admin/leads','/gsm-admin/questionnaire']){const response=await page.goto(base+path);assert.equal(response?.status(),200);}
  assert.equal((await page.request.get(base+'/admin')).status(),404);
  await page.getByRole('button',{name:/log out|sign out/i}).click();await page.waitForURL('**/gsm-admin/login');
  console.log('PASS: old admin URLs return 404; new login, protected pages and logout work.');
 }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
