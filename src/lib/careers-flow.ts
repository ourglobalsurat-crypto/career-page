import type { GrowthPath, PublicQuestion } from './types';
type AnswerMap = Record<string, unknown>;
export function isGrowthPath(value: unknown): value is GrowthPath {
  return typeof value === 'string' && /^[a-z0-9_]{1,80}$/.test(value);
}
export function getSelectedGrowthPath(questions: readonly PublicQuestion[], answers: AnswerMap): GrowthPath | null {
  const selector = questions.find(q => q.isActive && q.config.systemRole === 'flow_selector');
  const answer = selector && answers[selector.key];
  return typeof answer === 'string' && selector?.options.some(o => o.id === answer) ? answer : null;
}
export function getVisibleQuestions(questions: readonly PublicQuestion[], answers: AnswerMap): PublicQuestion[] {
  const role = getSelectedGrowthPath(questions, answers);
  const stage = (q:PublicQuestion) => q.config.systemRole === 'flow_selector' ? 0 : q.config.flow ? 1 : ['full_name','phone','email','city'].includes(q.key) ? 2 : q.key === 'resume' ? 4 : 3;
  return questions.filter(q => q.isActive && (!q.config.flow || q.config.flow === role))
    .sort((a,b) => stage(a)-stage(b) || a.position-b.position)
    .map(q => q.key === 'portfolio' ? {...q, required: ['designer','video_editor'].includes(role ?? '')} : q);
}
export function pruneHiddenAnswers(questions: readonly PublicQuestion[], answers: AnswerMap): AnswerMap {
  const keys = new Set(getVisibleQuestions(questions, answers).map(q => q.key));
  return Object.fromEntries(Object.entries(answers).filter(([key]) => keys.has(key)));
}
export function validateQuestionnaireFlow(questions: readonly PublicQuestion[]): string | null {
  for (const role of ['flow_selector','contact_name','contact_phone'] as const) {
    const matches = questions.filter(q => q.config.systemRole === role);
    if (matches.length !== 1 || !matches[0].isActive || !matches[0].required || matches[0].config.flow)
      return `Keep one required, visible, shared ${role} question.`;
    const expected = role === 'flow_selector' ? 'single_choice' : role === 'contact_phone' ? 'phone' : 'short_text';
    if(matches[0].type !== expected) return `The ${role} question must use ${expected}.`;
  }
  const selector = questions.find(q => q.config.systemRole === 'flow_selector')!;
  const ids = new Set(selector.options.map(o => o.id));
  if (!ids.size || ids.size !== selector.options.length || selector.options.some(o => !isGrowthPath(o.id) || !o.label.en.trim()))
    return 'Add at least one position with a unique ID and a title.';
  for (const id of ids) {
    if(!questions.some(q => q.isActive && q.config.flow === id)) return `Add at least one visible question for ${selector.options.find(o => o.id === id)?.label.en}.`;
  }
  if(questions.some(q => q.isActive && q.config.flow && ids.has(q.config.flow) && q.position < selector.position))
    return 'Role-specific questions must come after the position selector.';
  for (const key of ['email','city','employment','current_salary','expected_salary','notice_period','surat_office','motivation','portfolio','resume']) {
    const q = questions.find(q => q.key === key);
    if(!q || !q.isActive || q.config.flow || (key !== 'portfolio' && !q.required)) return `Keep the shared ${key} question visible and required (portfolio can be optional).`;
  }
  if(questions.find(q => q.key === 'resume')?.type !== 'file' || questions.find(q => q.key === 'portfolio')?.type !== 'url') return 'Keep résumé as a file and portfolio as a URL.';
  return null;
}
