import { useEffect, useMemo, useState } from 'react';
import { questionBanks } from '../content/questions';
import { topics } from '../content/config';
import { structureById } from '../content/structures';
import type { Question, TopicId } from '../content/types';
import { checkSimpleAnswer } from '../lib/check';
import { shuffledOptions } from '../lib/options';
import { LewisBuilder } from './LewisBuilder';
import { AlloyVisualPractice } from './AlloyVisualPractice';

export function PracticeView({topic,navigate}:{topic:TopicId;navigate:(path:string)=>void}){
 const bank=questionBanks[topic],info=topics.find(t=>t.id===topic)!;const [index,setIndex]=useState(0),[input,setInput]=useState(''),[status,setStatus]=useState(''),[panel,setPanel]=useState<'hint'|'explain'|'solution'|null>(null);
 const q=bank[index];useEffect(()=>{setInput('');setStatus('');setPanel(null)},[index]);
 const next=()=>{let n=index;while(n===index)n=Math.floor(Math.random()*bank.length);setIndex(n)};
 const check=()=>{if(!input.trim()){setStatus(q.diagnostics.blank);return}setStatus(checkSimpleAnswer(q.answer,input)?'Correct — your answer matches the reviewed record.':q.diagnostics[input]??q.diagnostics.incorrect)};
 return <main id="main" className="page practice"><nav className="crumbs"><button onClick={()=>navigate('/unit/2')}>Unit 2</button><span>/</span><button onClick={()=>navigate(`/learn/${topic}`)}>Learn</button><span>/</span><span>Practice</span></nav>
  <header className="practice-head"><div><p className="eyebrow">PRACTICE · TOPIC {topic}</p><h1>{info.title}</h1><p>No score, attempt history, or hint usage is recorded.</p></div><label>Choose problem<select value={index} onChange={e=>setIndex(Number(e.target.value))}>{bank.map((x,i)=><option key={x.id} value={i}>{i+1} · {x.id}</option>)}</select></label></header>
  {topic==='2.4'&&<AlloyVisualPractice/>}
  <div className="question-meta"><span>{q.difficulty}</span><span>{q.representation}</span>{q.concepts.map(x=><span key={x}>{x}</span>)}</div><article className="question-card"><p className="question-number">PROBLEM {index+1} OF {bank.length}</p><h2>{q.prompt}</h2>
   {q.answer.kind==='lewis'?<LewisBuilder key={q.id} target={structureById[q.answer.structureId]} onResult={ok=>setStatus(ok?'Correct — the reviewed structure is unlocked.':'')}/>:<SimpleInput q={q} input={input} setInput={setInput} check={check}/>} 
   {q.answer.kind!=='lewis'&&<p className={`feedback ${status.startsWith('Correct')?'success':''}`} role="status">{status}</p>}
   <button className="primary in-card-next" onClick={next}>Next problem <span aria-hidden="true">→</span></button>
  </article>
  <div className="help-bar" aria-label="Unlimited help"><button aria-pressed={panel==='hint'} onClick={()=>setPanel('hint')}>Conceptual hint</button><button aria-pressed={panel==='explain'} onClick={()=>setPanel('explain')}>Explain the idea</button><button aria-pressed={panel==='solution'} onClick={()=>setPanel('solution')}>Show full solution</button></div>
  {panel&&<aside className="help-panel"><p className="eyebrow">{panel==='hint'?'HINT':panel==='explain'?'CONCEPT EXPLANATION':'WORKED SOLUTION'}</p><p>{panel==='hint'?q.hints[0]:panel==='explain'?q.hints[1]:q.solution}</p>{panel==='explain'&&<button onClick={()=>navigate(`/learn/${topic}#${q.lessonSection}`)}>Open related lesson section</button>}</aside>}
  <div className="next-row"><button onClick={()=>setIndex(Math.max(0,index-1))} disabled={index===0}>Previous</button><button className="primary" onClick={next}>Another problem</button><button onClick={()=>setIndex(Math.min(49,index+1))} disabled={index===49}>Next</button></div>
 </main>
}
function SimpleInput({q,input,setInput,check}:{q:Question;input:string;setInput:(x:string)=>void;check:()=>void}){
 const options=useMemo(()=>shuffledOptions(q.id,q.options??[]),[q.id,q.options]);return <div className="answer-area">{options.length?<fieldset><legend>Select one answer</legend>{options.map((o,i)=><label className="option" key={o}><input type="radio" name={q.id} value={o} checked={input===o} onChange={()=>setInput(o)}/><strong className="option-letter" aria-hidden="true">{String.fromCharCode(65+i)}</strong><span>{o}</span></label>)}</fieldset>:<label>Your answer<input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&check()} placeholder={q.answer.kind==='number'?`Number (${q.answer.unit})`:'Type your answer'}/></label>}<button className="primary" onClick={check}>Check answer</button></div>
}
