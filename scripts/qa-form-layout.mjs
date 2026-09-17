import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{channel:'msedge'}:{})});
try {
 const page=await browser.newPage();page.setDefaultTimeout(15000);
 for(const width of [1440,768,390]) {
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:3000');
  await page.getByRole('button',{name:'Continue',exact:true}).click();await page.locator('#question-error').waitFor();
  assert.equal(await page.locator('#question-heading').innerText(),'Which position are you applying for?');
  for(const card of await page.locator('.service-card').all()){
   const pill=await card.locator('.role-card-footer small').boundingBox();
   const button=await card.locator('.role-card-footer button').boundingBox();
   const bounds=await card.boundingBox();
   assert.ok(button.y >= pill.y+pill.height+15,`Footer must have vertical separation at ${width}px`);
   assert.ok(button.x+button.width <= bounds.x+bounds.width,`CTA must fit within card at ${width}px`);
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.locator('.service-card').first().screenshot({path:`artifacts/role-card-${width}.png`});
 }
 console.log('PASS: position first; role-card labels and CTAs separated with no overflow at 1440, 768 and 390px.');
}finally{await browser.close();}
