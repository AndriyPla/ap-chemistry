import type { Answer, Difficulty, Question, TopicId, VerificationEvidence } from '../types';
import { evidence } from '../structures';

export type Seed = { prompt:string; answer:Answer; solution:string; concepts?:string[]; representation?:Question['representation']; options?:string[]; hint?:string; evidence?:VerificationEvidence };
export function buildBank(topic:TopicId, lessonSection:string, seeds:Seed[]):Question[] {
  return seeds.map((s,i)=>{
    const optionDiagnostics=Object.fromEntries((s.options??[]).filter(o=>s.answer.kind!=='choice'||o!==s.answer.value).map(o=>[o,`“${o}” does not match the reviewed ${lessonSection} evidence. ${s.hint ?? 'Re-read the particle description and identify the requested relationship.'}`]));
    return ({
    id:`u2-${topic.replace('.','')}-${String(i+1).padStart(2,'0')}`, unit:2, topic,
    concepts:s.concepts ?? [lessonSection], representation:s.representation ?? (s.answer.kind==='number'?'calculation':s.answer.kind==='lewis'?'lewis':'text'),
    difficulty:(i<16?'introductory':i<34?'developing':'ap-style') as Difficulty,
    prompt:s.prompt, options:s.options, answer:s.answer,
    hints:[s.hint ?? `Identify the particle-level idea from lesson section “${lessonSection}.”`,'Connect the given evidence to the stored definition or relationship before choosing.'],
    diagnostics:{blank:'Enter or select an answer before checking.',incorrect:`Your response does not match the reviewed record for ${lessonSection}. Check the requested quantity, term, units, or particle-level relationship.`,...optionDiagnostics},
    solution:s.solution, lessonSection, evidence:s.evidence??evidence
  })});
}
export const choice=(value:string, options:string[]):Pick<Seed,'answer'|'options'>=>({answer:{kind:'choice',value},options});
export const textAnswer=(value:string,...accepted:string[]):Answer=>({kind:'text',value,accepted:[value,...accepted]});
