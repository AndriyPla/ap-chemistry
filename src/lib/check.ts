import type { Answer, AtomRecord, BondRecord, MolecularStructure } from '../content/types';

export interface StudentGraph { atoms:AtomRecord[]; bonds:BondRecord[]; overallCharge:number }
const normalize=(v:string)=>v.trim().toLowerCase().replace(/[−–—]/g,'-').replace(/\s+/g,' ');

export function checkSimpleAnswer(answer:Answer,input:string):boolean {
  if(answer.kind==='lewis') return false;
  if(answer.kind==='number') {
    const n=Number(input.replace(/,/g,'').match(/-?\d+(?:\.\d+)?/)?.[0]);
    const unitOk=!/[a-z]/i.test(input) || normalize(input).includes(normalize(answer.unit).replace('/','')) || normalize(input).includes(normalize(answer.unit));
    return Number.isFinite(n)&&Math.abs(n-answer.value)<=answer.tolerance&&unitOk;
  }
  const accepted=answer.kind==='choice'?[answer.value,...(answer.accepted??[])]:answer.accepted;
  return accepted.some(x=>normalize(x)===normalize(input));
}

function bondOrder(bonds:BondRecord[],a:string,b:string){return bonds.find(x=>(x.a===a&&x.b===b)||(x.a===b&&x.b===a))?.order??0}
export function graphsEquivalent(student:StudentGraph,target:MolecularStructure):boolean {
  if(student.overallCharge!==target.overallCharge||student.atoms.length!==target.atoms.length||student.bonds.length!==target.bonds.length)return false;
  const candidates=student.atoms.map(sa=>target.atoms.filter(ta=>ta.element===sa.element&&ta.lonePairs===sa.lonePairs&&ta.formalCharge===sa.formalCharge&&(ta.unpairedElectrons??0)===(sa.unpairedElectrons??0)));
  if(candidates.some(c=>!c.length))return false;
  const mapping=new Map<string,string>(),used=new Set<string>();
  const search=(i:number):boolean=>{
    if(i===student.atoms.length)return student.bonds.every(sb=>bondOrder(target.bonds,mapping.get(sb.a)!,mapping.get(sb.b)!)===sb.order);
    const sa=student.atoms[i];
    for(const ta of candidates[i]){
      if(used.has(ta.id))continue;
      const consistent=student.bonds.filter(b=>b.a===sa.id||b.b===sa.id).every(b=>{
        const other=b.a===sa.id?b.b:b.a; const mapped=mapping.get(other);
        return !mapped||bondOrder(target.bonds,ta.id,mapped)===b.order;
      });
      if(!consistent)continue;
      mapping.set(sa.id,ta.id);used.add(ta.id);
      if(search(i+1))return true;
      mapping.delete(sa.id);used.delete(ta.id);
    }
    return false;
  };
  return search(0);
}

export function graphDiagnostic(student:StudentGraph,target:MolecularStructure):string {
  const counts=(atoms:AtomRecord[])=>atoms.reduce<Record<string,number>>((m,a)=>(m[a.element]=(m[a.element]??0)+1,m),{});
  if(JSON.stringify(Object.entries(counts(student.atoms)).sort())!==JSON.stringify(Object.entries(counts(target.atoms)).sort()))return 'Atom inventory mismatch: use exactly the element types and quantities supplied for this formula.';
  if(student.overallCharge!==target.overallCharge)return `Overall-charge mismatch: this reviewed record requires ${target.overallCharge>0?'+':''}${target.overallCharge}.`;
  const signatures=(atoms:AtomRecord[])=>atoms.map(a=>`${a.element}:${a.lonePairs}:${a.unpairedElectrons??0}:${a.formalCharge}`).sort();
  if(JSON.stringify(signatures(student.atoms))!==JSON.stringify(signatures(target.atoms)))return 'Electron or formal-charge mismatch: recheck lone pairs, single electrons, and the formal charge on each element.';
  const bondSignatures=(atoms:AtomRecord[],bonds:BondRecord[])=>bonds.map(b=>{const a=atoms.find(x=>x.id===b.a)!,c=atoms.find(x=>x.id===b.b)!;return `${[a.element,c.element].sort().join('-')}:${b.order}`}).sort();
  if(JSON.stringify(bondSignatures(student.atoms,student.bonds))!==JSON.stringify(bondSignatures(target.atoms,target.bonds)))return 'Bond mismatch: recheck which elements are connected and whether each bond is single, double, or triple.';
  return 'Connectivity mismatch: the counts look similar, but the molecular graph is not an approved arrangement. Recheck which specific atoms are joined.';
}
