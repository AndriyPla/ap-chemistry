import { describe,expect,it } from 'vitest';
import { graphsEquivalent,checkSimpleAnswer,graphDiagnostic } from '../lib/check';
import { structureById } from '../content/structures';
describe('answer checking',()=>{
 it('checks numerical tolerance and units',()=>{expect(checkSimpleAnswer({kind:'number',value:120,unit:'pm',tolerance:1},'120 pm')).toBe(true);expect(checkSimpleAnswer({kind:'number',value:120,unit:'pm',tolerance:1},'130 pm')).toBe(false)});
 it('accepts coordinates and identical-atom permutations',()=>{const t=structureById.h2o;const student={overallCharge:0,atoms:t.atoms.map((a,i)=>({...a,id:`x${t.atoms.length-i}`,x:a.x+200,y:a.y-80})).reverse(),bonds:t.bonds.map(b=>({a:`x${t.atoms.length-t.atoms.findIndex(a=>a.id===b.a)}`,b:`x${t.atoms.length-t.atoms.findIndex(a=>a.id===b.b)}`,order:b.order}))};expect(graphsEquivalent(student,t)).toBe(true)});
 it('rejects wrong connectivity despite matching counts',()=>{const t=structureById.h2o;expect(graphsEquivalent({overallCharge:0,atoms:t.atoms,bonds:[{a:'h1',b:'h2',order:1},{a:'o',b:'h2',order:1}]},t)).toBe(false)});
 it('rejects wrong electron annotations and charge',()=>{const t=structureById.co2;expect(graphsEquivalent({overallCharge:1,atoms:t.atoms,bonds:t.bonds},t)).toBe(false);expect(graphsEquivalent({overallCharge:0,atoms:t.atoms.map((a,i)=>i?{...a,lonePairs:0}:a),bonds:t.bonds},t)).toBe(false)});
 it('returns a specific Lewis mismatch category',()=>{const t=structureById.h2o;expect(graphDiagnostic({overallCharge:1,atoms:t.atoms,bonds:t.bonds},t)).toMatch(/Overall-charge mismatch/);expect(graphDiagnostic({overallCharge:0,atoms:t.atoms,bonds:[]},t)).toMatch(/Bond mismatch/)});
});
