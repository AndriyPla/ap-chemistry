import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import type { MolecularStructure } from '../content/types';

const colors:Record<string,string>={H:'#f8fafc',C:'#64748b',N:'#3b82f6',O:'#ef4444',F:'#22c55e',Cl:'#22c55e',Br:'#8b4513',S:'#eab308',P:'#f97316',B:'#f59e0b',Be:'#a3e635',Xe:'#8b5cf6'};

export function ModelViewer({model}:{model:MolecularStructure}){
 const [rx,setRx]=useState(-12),[ry,setRy]=useState(18),[zoom,setZoom]=useState(1),[labels,setLabels]=useState(true),[pairs,setPairs]=useState(false),[dragging,setDragging]=useState(false);
 const drag=useRef<{x:number;y:number;rx:number;ry:number}|null>(null);
 const rotate=(x:number,y:number,z:number)=>{const ay=ry*Math.PI/180,ax=rx*Math.PI/180;const x1=x*Math.cos(ay)+z*Math.sin(ay),z1=-x*Math.sin(ay)+z*Math.cos(ay);return{x:x1,y:y*Math.cos(ax)-z1*Math.sin(ax),z:y*Math.sin(ax)+z1*Math.cos(ax)}};
 const projected=Object.fromEntries(model.atoms.map(a=>{const p=rotate(a.x,a.y,a.z),depth=Math.max(.82,1+p.z*.09);return[a.id,{...p,left:`calc(50% + ${p.x*68*zoom}px)`,top:`calc(50% + ${-p.y*68*zoom}px)`,scale:zoom*depth}]}));
 const pointerDown=(e:PointerEvent<HTMLDivElement>)=>{drag.current={x:e.clientX,y:e.clientY,rx,ry};setDragging(true);e.currentTarget.setPointerCapture(e.pointerId)};
 const pointerMove=(e:PointerEvent<HTMLDivElement>)=>{if(!drag.current)return;setRy(drag.current.ry+(e.clientX-drag.current.x)*.55);setRx(Math.max(-85,Math.min(85,drag.current.rx-(e.clientY-drag.current.y)*.55)))};
 const pointerUp=(e:PointerEvent<HTMLDivElement>)=>{drag.current=null;setDragging(false);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)};
 return <section className="model-card" aria-label={`Reviewed 3D model of ${model.formula}`}>
  <div className={`model-stage ${dragging?'is-dragging':''}`} role="img" aria-label={`Interactive 3D model of ${model.formula}. Drag left, right, up, or down to rotate.`} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
   <div className="model-rotor">
    {model.bonds.map((b,i)=>{const a=projected[b.a],c=projected[b.b],dx=(c.x-a.x)*68*zoom,dy=-(c.y-a.y)*68*zoom,d=Math.hypot(dx,dy),depth=(a.z+c.z)/2;return <span key={i} className="model-bond" style={{left:`calc(50% + ${(a.x+c.x)*34*zoom}px)`,top:`calc(50% + ${-(a.y+c.y)*34*zoom}px)`,width:d,transform:`translate(-50%,-50%) rotate(${Math.atan2(dy,dx)}rad)`,zIndex:Math.round(10+depth*5)}} data-order={b.order}/>})}
    {model.atoms.map(a=>{const p=projected[a.id];return <span key={a.id} className="model-atom" style={{left:p.left,top:p.top,transform:`translate(-50%,-50%) scale(${p.scale})`,'--atom-color':colors[a.element]??'#cbd5e1',zIndex:Math.round(20+p.z*10)} as CSSProperties}>{labels?a.element:''}{pairs&&a.lonePairs>0&&<small>{'··'.repeat(a.lonePairs)}</small>}</span>})}
   </div>
   <span className="drag-cue">Drag to rotate</span>
  </div>
  <div className="model-controls"><button onClick={()=>setRy(v=>v-15)}>Rotate left</button><button onClick={()=>setRy(v=>v+15)}>Rotate right</button><button onClick={()=>setRx(v=>Math.max(-85,v-15))}>Rotate up</button><button onClick={()=>setRx(v=>Math.min(85,v+15))}>Rotate down</button><button onClick={()=>setZoom(v=>Math.min(1.5,v+.1))}>Zoom in</button><button onClick={()=>setZoom(v=>Math.max(.6,v-.1))}>Zoom out</button><button onClick={()=>{setRx(-12);setRy(18);setZoom(1)}}>Reset camera</button><button onClick={()=>setLabels(v=>!v)}>{labels?'Hide':'Show'} labels</button><button onClick={()=>setPairs(v=>!v)}>{pairs?'Hide':'Show'} lone pairs</button></div>
  <dl className="model-facts"><div><dt>Electron geometry</dt><dd>{model.electronGeometry}</dd></div><div><dt>Molecular geometry</dt><dd>{model.molecularGeometry}</dd></div><div><dt>Angles</dt><dd>{model.bondAngles}</dd></div><div><dt>Hybridization</dt><dd>{model.hybridization}</dd></div></dl><p>{model.description} Coordinates are a reviewed instructional idealization; atom positions are not graded.</p>
 </section>
}
