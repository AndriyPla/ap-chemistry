import { describe,expect,it } from 'vitest';
import { allQuestions,questionBanks } from '../content/questions';
import { expectedCounts } from '../content/config';
import { structureById,structures } from '../content/structures';
import { shuffledOptions } from '../lib/options';
describe('content integrity',()=>{
 it('contains exactly 50 questions per topic and 350 total',()=>{for(const [topic,count] of Object.entries(expectedCounts))expect(questionBanks[topic as keyof typeof questionBanks]).toHaveLength(count);expect(allQuestions).toHaveLength(350)});
 it('has unique IDs, solutions, help, and source evidence',()=>{expect(new Set(allQuestions.map(q=>q.id)).size).toBe(350);for(const q of allQuestions){expect(q.prompt.length).toBeGreaterThan(20);expect(q.solution.length).toBeGreaterThan(10);expect(q.hints).toHaveLength(2);expect(q.evidence.sourceUrl).toMatch(/^https:/);expect(q.evidence.status).toBe('source-checked')}});
 it('resolves every Lewis structure reference',()=>{for(const q of allQuestions)if(q.answer.kind==='lewis')expect(structureById[q.answer.structureId]).toBeTruthy()});
 it('has internally consistent charge and electron metadata',()=>{for(const s of structures){expect(s.atoms.length).toBeGreaterThan(1);expect(Number.isInteger(s.totalValenceElectrons)).toBe(true);expect(s.atoms.reduce((n,a)=>n+a.formalCharge,0)).toBe(s.overallCharge)}});
 it('distributes correct choices across multiple letter positions',()=>{const positions=allQuestions.filter(q=>q.answer.kind==='choice'&&q.options).map(q=>shuffledOptions(q.id,q.options!).indexOf(q.answer.kind==='choice'?q.answer.value:''));const used=new Set(positions);expect(used.size).toBeGreaterThanOrEqual(4);expect([0,1,2,3].every(i=>used.has(i))).toBe(true);expect(positions.every(i=>i>=0)).toBe(true)});
});
