import { useMemo, useRef, useState } from 'react';
import type { AtomRecord, BondRecord, MolecularStructure } from '../content/types';
import { graphDiagnostic, graphsEquivalent, type StudentGraph } from '../lib/check';
import { ModelViewer } from './ModelViewer';

type Snapshot={atoms:AtomRecord[];bonds:BondRecord[];overallCharge:number};
const clone=(s:Snapshot):Snapshot=>structuredClone(s);
const empty:Snapshot={atoms:[],bonds:[],overallCharge:0};

export function LewisBuilder({target,onResult}:{target:MolecularStructure;onResult:(ok:boolean)=>void}){
 const inventory=useMemo(()=>Object.entries(target.atoms.reduce<Record<string,number>>((a,x)=>(a[x.element]=(a[x.element]??0)+1,a),{})),[target]);
 const [state,setState]=useState<Snapshot>(empty),[past,setPast]=useState<Snapshot[]>([]),[future,setFuture]=useState<Snapshot[]>([]);
 const [tool,setTool]=useState<string|null>(null),[selected,setSelected]=useState<string[]>([]),[feedback,setFeedback]=useState('Build the structure, then check your answer.'),[feedbackTone,setFeedbackTone]=useState<'pending'|'checking'|'incorrect'|'success'>('pending'),[checking,setChecking]=useState(false),[correct,setCorrect]=useState(false),[viewer,setViewer]=useState(false);
 const drag=useRef<{id:string,dx:number,dy:number}|null>(null); const area=useRef<HTMLDivElement>(null); const revision=useRef(0);
 const markDirty=()=>{revision.current+=1;setChecking(false);setCorrect(false);setViewer(false);setFeedback('Answer changed — check again.');setFeedbackTone('pending');onResult(false)};
 const mutate=(fn:(s:Snapshot)=>void)=>{setPast(p=>[...p,clone(state)]);setFuture([]);const n=clone(state);fn(n);setState(n);markDirty()};
 const remaining=(el:string)=>inventory.find(([e])=>e===el)![1]-state.atoms.filter(a=>a.element===el).length;
 const place=(e:React.MouseEvent<HTMLDivElement>)=>{if(!tool?.startsWith('atom:')||!area.current)return;const el=tool.slice(5);if(remaining(el)<=0)return;const r=area.current.getBoundingClientRect();mutate(s=>s.atoms.push({id:`s${Date.now()}`,element:el,x:e.clientX-r.left,y:e.clientY-r.top,z:0,lonePairs:0,formalCharge:0,unpairedElectrons:0}));};
 const addBond=(order:1|2|3)=>{if(selected.length!==2)return;mutate(s=>{const old=s.bonds.find(b=>(b.a===selected[0]&&b.b===selected[1])||(b.b===selected[0]&&b.a===selected[1]));if(old)old.order=order;else s.bonds.push({a:selected[0],b:selected[1],order})});setSelected([])};
 const editAtom=(kind:'pair'|'electron'|'charge',delta=1)=>{if(selected.length!==1)return;mutate(s=>{const a=s.atoms.find(x=>x.id===selected[0])!;if(kind==='pair')a.lonePairs=Math.max(0,a.lonePairs+delta);if(kind==='electron')a.unpairedElectrons=Math.max(0,(a.unpairedElectrons??0)+delta);if(kind==='charge')a.formalCharge=Math.max(-3,Math.min(3,a.formalCharge+delta))})};
 const remove=()=>{if(!selected.length)return;mutate(s=>{s.atoms=s.atoms.filter(a=>!selected.includes(a.id));s.bonds=s.bonds.filter(b=>!selected.includes(b.a)&&!selected.includes(b.b))});setSelected([])};
 const undo=()=>{if(!past.length)return;setFuture(f=>[clone(state),...f]);setState(past.at(-1)!);setPast(p=>p.slice(0,-1));markDirty()};
 const redo=()=>{if(!future.length)return;setPast(p=>[...p,clone(state)]);setState(future[0]);setFuture(f=>f.slice(1));markDirty()};
 const check=()=>{if(checking)return;const checkedRevision=revision.current;setChecking(true);setFeedback('Checking structure…');setFeedbackTone('checking');setTimeout(()=>{if(revision.current!==checkedRevision){setChecking(false);return}const ok=graphsEquivalent(state as StudentGraph,target);setChecking(false);setCorrect(ok);onResult(ok);setFeedbackTone(ok?'success':'incorrect');setFeedback(ok?'Correct — this molecular graph matches a reviewed accepted structure.':graphDiagnostic(state as StudentGraph,target))},600)};
 const reset=()=>{if(state.atoms.length&&!confirm('Clear this Lewis workspace?'))return;revision.current+=1;setPast([]);setFuture([]);setState(empty);setSelected([]);setChecking(false);setCorrect(false);setViewer(false);setFeedback('Workspace cleared — build a structure, then check your answer.');setFeedbackTone('pending');onResult(false)};
 return <section className="builder" aria-label="Lewis diagram builder">
  <div className="builder-help"><strong>Formula: {target.formula}</strong><span>Each bond line represents 2 electrons. Add only nonbonding dots/pairs separately.</span></div>
  <div className="builder-layout">
   <div className="palette" aria-label="Builder tools">
    <h3>Atoms</h3>{inventory.map(([el,count])=><button key={el} disabled={remaining(el)<=0} aria-pressed={tool===`atom:${el}`} onClick={()=>setTool(`atom:${el}`)}>{el} <span>{remaining(el)}/{count}</span></button>)}
    <h3>Edit selected</h3><button onClick={()=>addBond(1)}>Single bond</button><button onClick={()=>addBond(2)}>Double bond</button><button onClick={()=>addBond(3)}>Triple bond</button>
    <button onClick={()=>editAtom('pair')}>Add lone pair</button><button onClick={()=>editAtom('pair',-1)}>Remove pair</button><button onClick={()=>editAtom('electron')}>Add single electron</button>
    <div className="inline"><button aria-label="Decrease formal charge" onClick={()=>editAtom('charge',-1)}>Charge −</button><button aria-label="Increase formal charge" onClick={()=>editAtom('charge',1)}>Charge +</button></div>
    <h3>Overall charge</h3><div className="inline"><button onClick={()=>mutate(s=>s.overallCharge--)}>−</button><output>{state.overallCharge>0?'+':''}{state.overallCharge}</output><button onClick={()=>mutate(s=>s.overallCharge++)}>+</button></div>
   </div>
   <div className="workspace-wrap"><div ref={area} className={`workspace ${state.overallCharge?'bracketed':''}`} onClick={place} onPointerMove={e=>{if(!drag.current||!area.current)return;const r=area.current.getBoundingClientRect();const x=e.clientX-r.left-drag.current.dx,y=e.clientY-r.top-drag.current.dy;setState(s=>({...s,atoms:s.atoms.map(a=>a.id===drag.current!.id?{...a,x,y}:a)}));markDirty()}} onPointerUp={()=>{if(drag.current){setPast(p=>[...p,clone(state)]);drag.current=null}}}>
    <svg className="bonds" aria-hidden="true">{state.bonds.map(b=>{const a=state.atoms.find(x=>x.id===b.a)!,c=state.atoms.find(x=>x.id===b.b)!;return <g key={`${b.a}${b.b}`}><line x1={a.x} y1={a.y} x2={c.x} y2={c.y}/>{b.order>1&&<line x1={a.x+4} y1={a.y+4} x2={c.x+4} y2={c.y+4}/>} {b.order>2&&<line x1={a.x-4} y1={a.y-4} x2={c.x-4} y2={c.y-4}/>}</g>})}</svg>
    {state.atoms.map(a=><button key={a.id} className={`placed-atom atom-${a.element.toLowerCase()} ${selected.includes(a.id)?'selected':''}`} style={{left:a.x,top:a.y}} aria-label={`${a.element}, ${a.lonePairs} lone pairs, charge ${a.formalCharge}`} onClick={e=>{e.stopPropagation();setTool(null);setSelected(v=>v.includes(a.id)?v.filter(x=>x!==a.id):[...v.slice(-1),a.id])}} onPointerDown={e=>{const r=e.currentTarget.getBoundingClientRect();drag.current={id:a.id,dx:e.clientX-r.left-r.width/2,dy:e.clientY-r.top-r.height/2};e.currentTarget.setPointerCapture(e.pointerId)}}>{a.element}{a.formalCharge!==0&&<sup>{a.formalCharge>0?'+':''}{a.formalCharge}</sup>}<span className="dots">{'•• '.repeat(a.lonePairs)}{'•'.repeat(a.unpairedElectrons??0)}</span></button>)}
    {state.overallCharge!==0&&<span className="overall-charge">{state.overallCharge>0?'+':''}{state.overallCharge}</span>}
   </div><p className="workspace-note">Click an atom tool, then the workspace. Select two atoms to bond them. Drag or use click placement; all chemistry is also stated in text.</p></div>
  </div>
  <div className="builder-actions"><button onClick={undo} disabled={!past.length||checking}>Undo</button><button onClick={redo} disabled={!future.length||checking}>Redo</button><button onClick={remove} disabled={!selected.length||checking}>Delete selected</button><button onClick={reset}>Reset</button><button className={`primary check-button ${checking?'is-checking':''}`} onClick={check} disabled={checking}>{checking&&<span className="check-spinner" aria-hidden="true"/>}{checking?'Checking…':'Check answer'}</button>{correct&&<button className="primary ghost" onClick={()=>setViewer(v=>!v)}>{viewer?'Close 3D Model':'Show 3D Model'}</button>}</div>
  <p className={`feedback ${feedbackTone}`} role="status" aria-live="polite">{feedback}</p>{viewer&&<ModelViewer model={target}/>} 
 </section>
}
