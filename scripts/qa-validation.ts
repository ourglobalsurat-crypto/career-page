import assert from 'node:assert/strict';
import {defaultQuestions} from '../src/lib/default-questionnaire';
import {getVisibleQuestions,pruneHiddenAnswers} from '../src/lib/careers-flow';
import {normalizeIndianPhone,validateQuestionAnswer} from '../src/lib/validation';
const q = (key:string) => defaultQuestions.find(q=>q.key===key)!;
const valid = (key:string,value:unknown) => validateQuestionAnswer(q(key),value).ok;
for(const role of q('growth_path').options){
 const visible=getVisibleQuestions(defaultQuestions,{growth_path:role.id});
 assert.equal(visible[0].key,'growth_path');assert.equal(visible[1].config.flow,role.id);
 assert.ok(visible.findIndex(q=>q.key==='full_name') > visible.findLastIndex(q=>q.config.flow===role.id));
}
assert.equal(pruneHiddenAnswers(defaultQuestions,{growth_path:'seo',sales_q3:'Old answer'}).sales_q3,undefined);
for(const phone of ['9876543210','+91 98765 43210','91-98765-43210']) assert.equal(normalizeIndianPhone(phone),'+919876543210');
for(const phone of ['98765','1234567890','+911234567890','+9198765432100','abc9876543210','9876543210 ext 12','++919876543210']) assert.equal(normalizeIndianPhone(phone),null);
assert.equal(normalizeIndianPhone('+44 7700 900123'),'+447700900123');
assert.ok(valid('email',' person@example.com '));assert.ok(!valid('email','person@'));assert.ok(!valid('email',' '));
assert.ok(valid('full_name','Asha Patel'));assert.ok(valid('full_name','आरव पटेल'));assert.ok(valid('full_name','O’Neill'));assert.ok(!valid('full_name','12345'));
assert.ok(!valid('city','123'));assert.ok(valid('current_salary',0));assert.ok(!valid('current_salary',[]));assert.ok(!valid('current_salary',true));assert.ok(!valid('expected_salary',0));assert.ok(!valid('current_salary',-1));
assert.ok(valid('expected_salary','50000.50'));assert.ok(!valid('expected_salary','1e5'));assert.ok(!valid('expected_salary','500.001'));
assert.ok(!valid('sales_q3','Short'));assert.ok(valid('sales_q3','I achieved my monthly target with a structured lead qualification process.'));
assert.ok(!valid('motivation','a'.repeat(301)));assert.ok(!valid('portfolio','https://example'));assert.ok(!valid('portfolio','javascript:alert(1)'));assert.ok(valid('portfolio','https://example.com/work'));
assert.ok(!valid('sales_q2',['option_1','option_1']));assert.ok(!valid('sales_q2',['unknown']));assert.ok(!valid('shopify_rating_liquid',2.5));
const date={...q('city'),type:'date' as const};assert.ok(!validateQuestionAnswer(date,'2026-02-30').ok);assert.ok(validateQuestionAnswer(date,'2028-02-29').ok);
console.log('PASS: all 11 role-first paths, role-switch cleanup, contact validation, salary bounds/types, minimum answer length, URLs, duplicate choices, ratings and real dates.');
