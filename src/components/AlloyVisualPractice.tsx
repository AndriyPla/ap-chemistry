import { useMemo, useState, type CSSProperties } from 'react';

type StructureKind = 'pure' | 'substitutional' | 'interstitial';
const structures:Record<StructureKind,{title:string;description:string;soluteSize:number}>={
 pure:{title:'Pure metal',description:'Every lattice site contains the same-sized metal atom.',soluteSize:1},
 substitutional:{title:'Substitutional alloy',description:'A similarly sized atom replaces a host atom at a lattice site.',soluteSize:.82},
 interstitial:{title:'Interstitial alloy',description:'Much smaller atoms fit into gaps between host-metal atoms.',soluteSize:.38}
};
const challenges=[
 {name:'Copper',formula:'Cu',host:'Cu',solute:'—',hostRadius:128,soluteRadius:128,answer:'pure' as const,reason:'Only copper atoms occupy the regular metallic lattice.'},
 {name:'Brass',formula:'Cu + Zn',host:'Cu',solute:'Zn',hostRadius:128,soluteRadius:134,answer:'substitutional' as const,reason:'Copper and zinc atoms are similar enough in size for zinc to replace copper at lattice sites.'},
 {name:'Bronze',formula:'Cu + Sn',host:'Cu',solute:'Sn',hostRadius:128,soluteRadius:145,answer:'substitutional' as const,reason:'Tin atoms replace some copper atoms and distort the regular layers.'},
 {name:'Carbon steel',formula:'Fe + C',host:'Fe',solute:'C',hostRadius:126,soluteRadius:70,answer:'interstitial' as const,reason:'The much smaller carbon atoms occupy gaps between iron atoms and hinder layer motion.'},
 {name:'Sterling silver',formula:'Ag + Cu',host:'Ag',solute:'Cu',hostRadius:144,soluteRadius:128,answer:'substitutional' as const,reason:'Copper atoms replace silver atoms at lattice positions.'},
 {name:'Stainless steel',formula:'Fe + Cr',host:'Fe',solute:'Cr',hostRadius:126,soluteRadius:128,answer:'substitutional' as const,reason:'Similarly sized chromium atoms substitute for iron in the metal lattice.'}
];
const orderedKinds=(seed:number)=>Object.keys(structures).sort((a,b)=>((a.charCodeAt(0)*17+seed*13)%29)-((b.charCodeAt(0)*17+seed*13)%29)) as StructureKind[];

export function AlloyVisualPractice(){
 const [index,setIndex]=useState(0),[choice,setChoice]=useState<StructureKind|null>(null),[checked,setChecked]=useState(false);
 const challenge=challenges[index],kinds=useMemo(()=>orderedKinds(index),[index]);
 const choose=(kind:StructureKind)=>{setChoice(kind);setChecked(false)};
 const next=()=>{setIndex(i=>(i+1)%challenges.length);setChoice(null);setChecked(false)};
 return <section className="alloy-lab" aria-labelledby="alloy-lab-title">
  <div className="alloy-lab-head"><div><p className="eyebrow">VISUAL PRACTICE LAB</p><h2 id="alloy-lab-title">Match the alloy to its particle structure</h2><p>Use the relative atom sizes and the lattice positions—not color alone—to choose a model.</p></div><span>{index+1} / {challenges.length}</span></div>
  <div className="alloy-prompt"><div><strong>{challenge.name}</strong><span>{challenge.formula}</span></div><dl><div><dt>Host atom</dt><dd>{challenge.host} · {challenge.hostRadius} pm</dd></div><div><dt>Added atom</dt><dd>{challenge.solute} · {challenge.soluteRadius} pm</dd></div></dl></div>
  <div className="alloy-options" role="radiogroup" aria-label={`Choose a particle structure for ${challenge.name}`}>
   {kinds.map(kind=><button key={kind} className={`alloy-option ${choice===kind?'selected':''} ${checked&&choice===kind?(choice===challenge.answer?'correct':'wrong'):''}`} role="radio" aria-checked={choice===kind} onClick={()=>choose(kind)}><AlloyDiagram kind={kind}/><strong>{structures[kind].title}</strong><span>{structures[kind].description}</span></button>)}
  </div>
  <div className="alloy-actions"><button className="primary" disabled={!choice} onClick={()=>setChecked(true)}>Check structure</button>{checked&&<button onClick={next}>Next alloy →</button>}</div>
  <p className={`alloy-feedback ${checked&&choice===challenge.answer?'success':''}`} role="status">{checked&&(choice===challenge.answer?`Correct. ${challenge.reason}`:`Not quite. Compare the added atom's size with the host and ask whether it replaces a lattice atom or fits in a gap.`)}</p>
 </section>
}

function AlloyDiagram({kind}:{kind:StructureKind}){
 const atoms=Array.from({length:16},(_,i)=>({i,row:Math.floor(i/4),col:i%4})),substitutions=new Set([2,9,15]);
 return <div className="alloy-diagram" aria-hidden="true">{atoms.map(a=>{const solute=kind==='substitutional'&&substitutions.has(a.i);return <span key={a.i} className={solute?'alloy-atom solute':'alloy-atom host'} style={{left:`${15+a.col*23}%`,top:`${15+a.row*23}%`,'--atom-scale':solute?structures[kind].soluteSize:1} as CSSProperties}/>})}{kind==='interstitial'&&[[26,26],[72,49],[49,72]].map(([left,top],i)=><span key={i} className="alloy-atom solute interstitial" style={{left:`${left}%`,top:`${top}%`,'--atom-scale':structures[kind].soluteSize} as CSSProperties}/>)}</div>
}
