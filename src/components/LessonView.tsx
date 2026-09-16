import { lessons, vseprRows } from '../content/lessons';
import { topics } from '../content/config';
import type { TopicId } from '../content/types';
import { StepVisual } from './StepVisual';
export function LessonView({topic,navigate}:{topic:TopicId;navigate:(path:string)=>void}){
 const lesson=lessons.find(l=>l.topic===topic)!,info=topics.find(t=>t.id===topic)!;
 return <main id="main" className="page lesson"><nav className="crumbs" aria-label="Breadcrumb"><button onClick={()=>navigate('/unit/2')}>Unit 2</button><span>/</span><span>{info.title}</span></nav>
  <header className="page-head"><p className="eyebrow">LEARN · TOPIC {topic}</p><h1>{info.title}</h1><p>{info.blurb}</p><button className="primary" onClick={()=>navigate(`/practice/${topic}`)}>Practice this topic</button></header>
  <section className="lesson-grid"><article className="objective-card"><h2>Learning objectives</h2><ul>{lesson.objectives.map(x=><li key={x}>{x}</li>)}</ul></article><article className="vocab-card"><h2>Essential vocabulary</h2><div className="chips">{lesson.vocabulary.map(x=><span key={x}>{x}</span>)}</div></article></section>
  <div className="lesson-sections">{lesson.sections.map((s,i)=><article id={s.id} key={s.id}><span className="section-num">0{i+1}</span><div><h2>{s.title}</h2><p>{s.body}</p>{s.example&&<aside><strong>Worked example</strong><p>{s.example}</p></aside>}<StepVisual topic={topic} section={s.id}/></div></article>)}</div>
  {topic==='2.7'&&<VseprTable/>}
  <section className="misconceptions"><h2>Common misconceptions</h2>{lesson.misconceptions.map(x=><p key={x}>✕ {x}</p>)}</section>
  <section className="ap-guidance"><div><p className="eyebrow">AP-STYLE REASONING</p><h2>Make the evidence do the work</h2><p>{lesson.apGuidance}</p></div><div><p className="eyebrow">SUMMARY</p><p>{lesson.summary}</p></div></section>
  <button className="primary wide" onClick={()=>navigate(`/practice/${topic}`)}>Start all 50 practice problems</button>
 </main>
}
function VseprTable(){return <section className="reference"><p className="eyebrow">COMPLETE REFERENCE</p><h2>VSEPR geometry chart</h2><p>Multiple bonds count as one domain. “Not assessed” avoids unsupported d-hybrid assignments for expanded-octet examples.</p><div className="table-scroll" tabIndex={0}><table><thead><tr>{['Domains','Bonding','Lone pairs','Electron geometry','Molecular geometry','Angles','Hybridization','Example'].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{vseprRows.map((r,i)=><tr key={i}>{r.map((x,j)=><td key={j}>{x}</td>)}</tr>)}</tbody></table></div></section>}
