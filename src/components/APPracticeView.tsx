import { useEffect, useMemo, useState } from 'react';
import { topics } from '../content/config';
import { shuffledOptions } from '../lib/options';
import { getAPQuestions, type APBankQuestion } from '../content/apQuestionBank';
import type { TopicId } from '../content/types';

type Scope = TopicId | '2';

export function APPracticeView({scope,navigate}:{scope:Scope;navigate:(path:string)=>void}){
 const questions=useMemo(()=>{
  return getAPQuestions(scope);
 },[scope]);
 const [index,setIndex]=useState(0),[selected,setSelected]=useState(''),[checked,setChecked]=useState(false),[secondsLeft,setSecondsLeft]=useState(90),[marked,setMarked]=useState<Set<number>>(new Set()),[tool,setTool]=useState<'notes'|'calculator'|'reference'|'more'|null>(null),[navigatorOpen,setNavigatorOpen]=useState(false);
 const q=questions[index],info=scope==='2'?null:topics.find(t=>t.id===scope),options=useMemo(()=>shuffledOptions(q.id,q.options),[q.id,q.options]),answerValue=q.answer;
 const correct=selected===answerValue;
 useEffect(()=>{setSecondsLeft(90)},[index]);
 useEffect(()=>{if(secondsLeft<=0||(checked&&correct))return;const timer=window.setInterval(()=>setSecondsLeft(value=>Math.max(0,value-1)),1000);return()=>window.clearInterval(timer)},[secondsLeft,checked,correct]);
 const move=(next:number)=>{setIndex(Math.max(0,Math.min(questions.length-1,next)));setSelected('');setChecked(false);setNavigatorOpen(false)};
 const toggleMark=()=>setMarked(current=>{const next=new Set(current);next.has(index)?next.delete(index):next.add(index);return next});
 return <main id="main" className="ap-practice-shell">
  <header className="ap-practice-top"><div className="ap-practice-title">{scope==='2'?'Unit 2 Practice':`${scope} ${info?.title}`}</div><div className="ap-tools" aria-label="Practice tools"><button onClick={()=>setTool(tool==='notes'?null:'notes')} aria-pressed={tool==='notes'}><span>✎</span>Highlights &amp; Notes</button><button onClick={()=>setTool(tool==='calculator'?null:'calculator')} aria-pressed={tool==='calculator'}><span>▣</span>Calculator</button><button onClick={()=>setTool(tool==='reference'?null:'reference')} aria-pressed={tool==='reference'}><span>x²</span>Reference</button><button onClick={()=>setTool(tool==='more'?null:'more')} aria-pressed={tool==='more'}><span>⋮</span>More</button></div></header>
  <div className="ap-progress" aria-label={`Question ${index+1} of ${questions.length}`}>{questions.map((_,i)=><span key={i} className={`${i===index?'current ':''}${marked.has(i)?'marked ':''}${i<index?'visited':''}`}/>)}</div>
  {tool&&<ToolPanel tool={tool} close={()=>setTool(null)} exit={()=>navigate('/unit/2')}/>} 
  <section className="ap-question-stage">
   <div className="ap-question-toolbar"><b>{index+1}</b><button className={marked.has(index)?'is-marked':''} onClick={toggleMark}><span aria-hidden="true">♡</span>{marked.has(index)?'Marked for Review':'Mark for Review'}</button><time className={`ap-question-timer ${secondsLeft<=30?'warning':''} ${secondsLeft===0?'expired':''}`} aria-label={`${secondsLeft} seconds remaining`} dateTime={`PT${secondsLeft}S`}>◷ {Math.floor(secondsLeft/60)}:{String(secondsLeft%60).padStart(2,'0')}</time><span className="ap-mcq-tag">MCQ</span></div>
   <APQuestionVisual question={q}/>
   <article className="ap-question-content"><p>{q.prompt}</p><fieldset><legend className="sr-only">Select one answer</legend>{options.map((option,i)=><label className={`ap-answer ${selected===option?'selected ':''}${checked&&option===answerValue?'correct ':''}${checked&&selected===option&&option!==answerValue?'incorrect':''}`} key={option}><input type="radio" name={q.id} checked={selected===option} onChange={()=>{setSelected(option);setChecked(false)}}/><span className="ap-answer-letter">{String.fromCharCode(65+i)}</span><span>{option}</span><button type="button" aria-label={`Eliminate choice ${String.fromCharCode(65+i)}`} onClick={e=>{e.preventDefault();e.currentTarget.closest('label')?.classList.toggle('eliminated')}}>⊘</button></label>)}</fieldset>
    <div className="ap-check-row"><button disabled={!selected} onClick={()=>setChecked(true)}>✓&nbsp; Check Answer</button></div>
    {secondsLeft===0&&!correct&&<p className="ap-time-message" role="status">Time is up. Finish this attempt or move to the next question.</p>}
    {checked&&<div className={`ap-result ${correct?'correct':'incorrect'}`} role="status"><b>{correct?'Correct':'Incorrect — keep trying'}</b><span>{correct?q.solution:getIncorrectGuidance(q)}</span></div>}
   </article>
  </section>
  <footer className="ap-practice-bottom"><button className="ap-brand" onClick={()=>navigate('/unit/2')}><span>⚗</span>AP Chemistry Practice</button><button className="ap-question-count" onClick={()=>setNavigatorOpen(!navigatorOpen)}>Question {index+1} of {questions.length}⌃</button><div className="ap-bottom-actions"><button onClick={()=>move(index-1)} disabled={index===0}>Back</button><button className="ap-next" onClick={()=>move(index+1)} disabled={index===questions.length-1}>Next</button></div>{navigatorOpen&&<nav className="ap-navigator" aria-label="Question navigator">{questions.map((_,i)=><button key={i} className={`${i===index?'current ':''}${marked.has(i)?'marked':''}`} onClick={()=>move(i)}>{i+1}</button>)}</nav>}</footer>
 </main>
}

function getIncorrectGuidance(question:APBankQuestion){
 const guidance:Record<string,string>={
  '2.1':'Recheck how the particles are held together and whether electrons are transferred, shared, or mobile. Use electronegativity only as evidence—not as a rigid cutoff.',
  '2.2':'Compare the choice with the graph or bond relationship: the minimum gives equilibrium distance, well depth reflects bond strength, and the slope indicates force.',
  '2.3':'Recheck ion charge, ionic radius, and whether the ions are fixed or mobile in the state described.',
  '2.4':'Look again at atom sizes and locations. Substitutional atoms replace lattice atoms; smaller interstitial atoms occupy gaps; mobile electrons explain conductivity.',
  '2.5':'Count all valence electrons, then check the skeleton, bonds, lone pairs, and each atom’s duet or octet before choosing again.',
  '2.6':'Recalculate formal charges or compare equivalent bond evidence. Resonance moves electrons, not atoms, and the real structure is a hybrid.',
  '2.7':'Count electron domains first, then separate electron geometry from molecular shape and check whether bond dipoles cancel by symmetry.',
  mixed:'Identify which Unit 2 model the question tests, then test the selected choice against the given particle, energy, Lewis, resonance, or geometry evidence.',
 };
 return `${guidance[question.topic]} Your selected choice does not satisfy that evidence. Try another answer.`;
}

function APQuestionVisual({question}:{question:APBankQuestion}){
 if(!question.stimulus)return null;
 if(question.stimulus==='electronegativity')return <div className="ap-stimulus ap-chart-stimulus"><table aria-label="Stimulus 2.1-A: selected electronegativity values"><thead><tr><th>Element</th><th>H</th><th>C</th><th>N</th><th>O</th><th>F</th><th>P</th><th>S</th><th>Cl</th></tr></thead><tbody><tr><th>Electronegativity</th><td>2.2</td><td>2.6</td><td>3.0</td><td>3.4</td><td>4.0</td><td>2.2</td><td>2.6</td><td>3.2</td></tr></tbody></table></div>;
 if(question.stimulus==='bond-curves')return <div className="ap-stimulus"><img src={`${import.meta.env.BASE_URL}assets/unit2/bond-potential-curves.svg`} alt="Stimulus 2.2-A: potential-energy curves for bonds A and B"/></div>;
 if(question.stimulus==='ionic-lattice')return <div className="ap-stimulus"><img src={`${import.meta.env.BASE_URL}assets/unit2/ionic-lattice-shift.svg`} alt="Stimulus 2.3-A: alternating ionic lattice before and after a layer shift"/></div>;
 if(question.stimulus==='ionic-properties')return <div className="ap-stimulus ap-chart-stimulus"><table aria-label="Stimulus 2.3-B: selected ionic properties"><thead><tr><th>Ion</th><th>Charge</th><th>Radius (pm)</th></tr></thead><tbody><tr><td>Li⁺ / Na⁺ / K⁺</td><td>+1</td><td>76 / 102 / 138</td></tr><tr><td>Mg²⁺ / Ca²⁺</td><td>+2</td><td>72 / 100</td></tr><tr><td>F⁻ / Cl⁻ / Br⁻</td><td>−1</td><td>133 / 181 / 196</td></tr><tr><td>O²⁻ / S²⁻</td><td>−2</td><td>140 / 184</td></tr></tbody></table></div>;
 if(question.stimulus==='alloy-models')return <div className="ap-stimulus"><img src={`${import.meta.env.BASE_URL}assets/unit2/alloy-models.svg`} alt="Stimulus 2.4-A: pure metal, substitutional alloy, and interstitial alloy particle models"/></div>;
 if(question.stimulus==='lewis-candidates')return <div className="ap-stimulus ap-lewis-candidates" role="img" aria-label="Stimulus 2.5-A: five candidate electron-dot diagrams"><pre>{`Diagram I              Diagram II             Diagram III
  ··      ··                                      ··     ··
  O — O               H — C — N :              O = C = O
  ··      ··                                      ··     ··

Diagram IV             Diagram V
: N ≡ N :                 H
                        H—C—H
                          H`}</pre></div>;
 if(question.stimulus==='bond-lengths')return <div className="ap-stimulus ap-chart-stimulus"><table aria-label="Stimulus 2.6-A: measured and typical bond lengths"><thead><tr><th>Species or bond</th><th>Length (pm)</th></tr></thead><tbody><tr><td>N–O / N=O / NO₃⁻</td><td>140 / 120 / 124</td></tr><tr><td>C–O / C=O / CO₃²⁻</td><td>143 / 120 / 129</td></tr></tbody></table></div>;
 return <div className="ap-stimulus"><img src={`${import.meta.env.BASE_URL}assets/unit2/vsepr-models.svg`} alt="Stimulus 2.7-A: five molecular geometry models"/></div>
}

function ToolPanel({tool,close,exit}:{tool:'notes'|'calculator'|'reference'|'more';close:()=>void;exit:()=>void}){
 const [a,setA]=useState(''),[b,setB]=useState(''),[op,setOp]=useState('+');const first=Number(a),second=Number(b);const result=op==='+'?first+second:op==='−'?first-second:op==='×'?first*second:second===0?NaN:first/second;
 return <aside className="ap-tool-panel"><button className="ap-tool-close" onClick={close} aria-label="Close tool">×</button>{tool==='notes'&&<><h2>Highlights &amp; Notes</h2><textarea aria-label="Question notes" placeholder="Write notes for this question…"/></>}{tool==='calculator'&&<><h2>Calculator</h2><div className="ap-mini-calc"><input type="number" value={a} onChange={e=>setA(e.target.value)} aria-label="First number"/><select value={op} onChange={e=>setOp(e.target.value)} aria-label="Operation"><option>+</option><option>−</option><option>×</option><option>÷</option></select><input type="number" value={b} onChange={e=>setB(e.target.value)} aria-label="Second number"/><output>{a&&b&&Number.isFinite(result)?result:'—'}</output></div></>}{tool==='reference'&&<><h2>Unit 2 Reference</h2><p><b>FC</b> = valence − dots − lines</p><p><b>VSEPR domains:</b> 2 → linear; 3 → trigonal planar; 4 → tetrahedral</p><p><b>Potential energy:</b> left minimum = shorter; deeper well = stronger</p></>}{tool==='more'&&<><h2>Practice options</h2><button className="ap-exit" onClick={exit}>Exit to Unit 2</button></>}</aside>
}
