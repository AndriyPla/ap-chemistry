import { useMemo, useState } from 'react';
import { topics } from '../content/config';
import { shuffledOptions } from '../lib/options';
import { AP_QUESTION_BANK_SOURCE, getAPQuestions, type APBankQuestion } from '../content/apQuestionBank';
import type { TopicId } from '../content/types';

type Scope = TopicId | '2';

export function APPracticeView({scope,navigate}:{scope:Scope;navigate:(path:string)=>void}){
 const questions=useMemo(()=>{
  return getAPQuestions(scope);
 },[scope]);
 const [index,setIndex]=useState(0),[selected,setSelected]=useState(''),[checked,setChecked]=useState(false),[marked,setMarked]=useState<Set<number>>(new Set()),[tool,setTool]=useState<'notes'|'calculator'|'reference'|'more'|null>(null),[navigatorOpen,setNavigatorOpen]=useState(false);
 const q=questions[index],info=scope==='2'?null:topics.find(t=>t.id===scope),options=useMemo(()=>shuffledOptions(q.id,q.options),[q.id,q.options]),answerValue=q.answer;
 const correct=selected===answerValue;
 const move=(next:number)=>{setIndex(Math.max(0,Math.min(questions.length-1,next)));setSelected('');setChecked(false);setNavigatorOpen(false)};
 const toggleMark=()=>setMarked(current=>{const next=new Set(current);next.has(index)?next.delete(index):next.add(index);return next});
 return <main id="main" className="ap-practice-shell">
  <header className="ap-practice-top"><div className="ap-practice-title">{scope==='2'?'Unit 2 Practice':`${scope} ${info?.title}`}</div><div className="ap-tools" aria-label="Practice tools"><button onClick={()=>setTool(tool==='notes'?null:'notes')} aria-pressed={tool==='notes'}><span>✎</span>Highlights &amp; Notes</button><button onClick={()=>setTool(tool==='calculator'?null:'calculator')} aria-pressed={tool==='calculator'}><span>▣</span>Calculator</button><button onClick={()=>setTool(tool==='reference'?null:'reference')} aria-pressed={tool==='reference'}><span>x²</span>Reference</button><button onClick={()=>setTool(tool==='more'?null:'more')} aria-pressed={tool==='more'}><span>⋮</span>More</button></div></header>
  <div className="ap-progress" aria-label={`Question ${index+1} of ${questions.length}`}>{questions.map((_,i)=><span key={i} className={`${i===index?'current ':''}${marked.has(i)?'marked ':''}${i<index?'visited':''}`}/>)}</div>
  {tool&&<ToolPanel tool={tool} close={()=>setTool(null)} exit={()=>navigate('/unit/2')}/>} 
  <section className="ap-question-stage">
   <div className="ap-question-toolbar"><b>{index+1}</b><button className={marked.has(index)?'is-marked':''} onClick={toggleMark}><span aria-hidden="true">♡</span>{marked.has(index)?'Marked for Review':'Mark for Review'}</button><span className="ap-mcq-tag">MCQ</span></div>
   <APQuestionVisual question={q}/>
   <article className="ap-question-content"><p>{q.prompt}</p><fieldset><legend className="sr-only">Select one answer</legend>{options.map((option,i)=><label className={`ap-answer ${selected===option?'selected ':''}${checked&&option===answerValue?'correct ':''}${checked&&selected===option&&option!==answerValue?'incorrect':''}`} key={option}><input type="radio" name={q.id} checked={selected===option} onChange={()=>{setSelected(option);setChecked(false)}}/><span className="ap-answer-letter">{String.fromCharCode(65+i)}</span><span>{option}</span><button type="button" aria-label={`Eliminate choice ${String.fromCharCode(65+i)}`} onClick={e=>{e.preventDefault();e.currentTarget.closest('label')?.classList.toggle('eliminated')}}>⊘</button></label>)}</fieldset>
    <div className="ap-check-row"><button disabled={!selected} onClick={()=>setChecked(true)}>✓&nbsp; Check Answer</button></div>
    {checked&&<div className={`ap-result ${correct?'correct':'incorrect'}`} role="status"><b>{correct?'Correct':'Not quite'}</b><span>{correct?q.solution:'Review the evidence in each choice, then try again or move to the next question.'}</span></div>}
   </article>
  </section>
  <footer className="ap-practice-bottom"><button className="ap-brand" onClick={()=>navigate('/unit/2')}><span>⚗</span>AP Chemistry Practice</button><button className="ap-question-count" onClick={()=>setNavigatorOpen(!navigatorOpen)}>Question {index+1} of {questions.length}⌃</button><div className="ap-bottom-actions"><button onClick={()=>move(index-1)} disabled={index===0}>Back</button><button className="ap-next" onClick={()=>move(index+1)} disabled={index===questions.length-1}>Next</button></div>{navigatorOpen&&<nav className="ap-navigator" aria-label="Question navigator">{questions.map((_,i)=><button key={i} className={`${i===index?'current ':''}${marked.has(i)?'marked':''}`} onClick={()=>move(i)}>{i+1}</button>)}</nav>}</footer>
 </main>
}

function APQuestionVisual({question}:{question:APBankQuestion}){
 if(question.stimulus==='bond-curves')return <div className="ap-stimulus"><img src={`${import.meta.env.BASE_URL}assets/unit2/bond-potential-curves.svg`} alt="Stimulus 2.2-A: potential-energy curves for bonds A and B"/></div>;
 if(question.stimulus==='ionic-lattice')return <div className="ap-stimulus"><img src={`${import.meta.env.BASE_URL}assets/unit2/ionic-lattice-shift.svg`} alt="Stimulus 2.3-A: alternating ionic lattice before and after a layer shift"/></div>;
 if(question.stimulus==='ionic-properties')return <div className="ap-stimulus ap-chart-stimulus"><table aria-label="Stimulus 2.3-B: selected ionic properties"><thead><tr><th>Ion</th><th>Charge</th><th>Radius (pm)</th></tr></thead><tbody><tr><td>Li⁺ / Na⁺ / K⁺</td><td>+1</td><td>76 / 102 / 138</td></tr><tr><td>Mg²⁺ / Ca²⁺</td><td>+2</td><td>72 / 100</td></tr><tr><td>F⁻ / Cl⁻ / Br⁻</td><td>−1</td><td>133 / 181 / 196</td></tr><tr><td>O²⁻ / S²⁻</td><td>−2</td><td>140 / 184</td></tr></tbody></table></div>;
 return <div className="ap-stimulus ap-text-stimulus"><span>{AP_QUESTION_BANK_SOURCE}</span><b>Question {question.number} · {question.topic==='mixed'?'Mixed Unit 2':`Topic ${question.topic}`}</b></div>
}

function ToolPanel({tool,close,exit}:{tool:'notes'|'calculator'|'reference'|'more';close:()=>void;exit:()=>void}){
 const [a,setA]=useState(''),[b,setB]=useState(''),[op,setOp]=useState('+');const first=Number(a),second=Number(b);const result=op==='+'?first+second:op==='−'?first-second:op==='×'?first*second:second===0?NaN:first/second;
 return <aside className="ap-tool-panel"><button className="ap-tool-close" onClick={close} aria-label="Close tool">×</button>{tool==='notes'&&<><h2>Highlights &amp; Notes</h2><textarea aria-label="Question notes" placeholder="Write notes for this question…"/></>}{tool==='calculator'&&<><h2>Calculator</h2><div className="ap-mini-calc"><input type="number" value={a} onChange={e=>setA(e.target.value)} aria-label="First number"/><select value={op} onChange={e=>setOp(e.target.value)} aria-label="Operation"><option>+</option><option>−</option><option>×</option><option>÷</option></select><input type="number" value={b} onChange={e=>setB(e.target.value)} aria-label="Second number"/><output>{a&&b&&Number.isFinite(result)?result:'—'}</output></div></>}{tool==='reference'&&<><h2>Unit 2 Reference</h2><p><b>FC</b> = valence − dots − lines</p><p><b>VSEPR domains:</b> 2 → linear; 3 → trigonal planar; 4 → tetrahedral</p><p><b>Potential energy:</b> left minimum = shorter; deeper well = stronger</p></>}{tool==='more'&&<><h2>Practice options</h2><button className="ap-exit" onClick={exit}>Exit to Unit 2</button></>}</aside>
}
