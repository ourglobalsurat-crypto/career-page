import type { PublicQuestion } from './types';
export type Screening = {score:number; breakdown:Record<string,number>; flags:string[]};
// This is a transparent preliminary score, not a hiring decision. Written answers
// and evidence need human evaluation (remaining 60 points).
export function screenApplication(questions:PublicQuestion[], answers:Record<string,unknown>, role:string):Screening {
  const first = questions.find(q => q.config.flow === role && q.type === 'single_choice');
  const index = first?.options.findIndex(o => o.id === answers[first.key]) ?? -1;
  const experience = index < 0 ? 0 : Math.round(index / Math.max((first?.options.length ?? 1)-1,1)*20);
  const availability = [10,10,7,5,2][Number(String(answers.notice_period).replace('option_',''))-1] ?? 0;
  const evidence = questions.some(q => q.config.flow === role && ['long_text','url'].includes(q.type) && typeof answers[q.key] === 'string' && String(answers[q.key]).trim().length > 0) ? 10 : 0;
  const flags = ['Written answers and portfolio results require human review.'];
  if(answers.surat_office === 'option_2') flags.push('Not comfortable working from Surat: discuss location fit.');
  if(answers.surat_office === 'option_3') flags.push('Wants to discuss working from Surat.');
  if(role === 'shopify' && answers.shopify_q2 === 'option_2') flags.push('No custom sections experience: consider junior level.');
  return {score:experience+availability+evidence,breakdown:{'Self-reported experience (20)':experience,'Availability (10)':availability,'Evidence supplied, not verified (10)':evidence},flags};
}
