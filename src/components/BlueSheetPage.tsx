import { useState, type ReactNode } from 'react';
import { units } from '../content/config';

export function BlueSheetPage({navigate}:{navigate:(path:string)=>void}){
 const [unit,setUnit]=useState('2');
 return <main id="main" className="page blue-sheet-page"><nav className="crumbs"><button onClick={()=>navigate('/')}>All units</button><span>/</span><span>Blue Sheet</span></nav>
  <header className="blue-sheet-head"><div><p className="eyebrow">ONE-SIDED TEST NOTES</p><h1>Blue Sheet Builder</h1><p>Select a unit, then copy the most useful formulas, diagrams, memory shortcuts, and solution steps onto one 8.5 × 11 inch page.</p></div><div className="blue-sheet-controls"><label>AP Chemistry unit<select value={unit} onChange={e=>setUnit(e.target.value)}>{units.map(([n,title])=><option key={n} value={n}>{n}. {title}</option>)}</select></label><button className="primary" disabled={unit!=='2'} onClick={()=>window.print()}>Print / Save PDF</button></div></header>
  {unit==='2'?<Unit2BlueSheet/>:<section className="sheet-unavailable"><p className="eyebrow">COMING LATER</p><h2>Unit {unit} is not built yet</h2><p>The selector is ready, but this site currently contains reviewed lesson and practice content only for Unit 2. The Blue Sheet will unlock here when that unit is added.</p></section>}
 </main>
}

function Unit2BlueSheet(){return <section className="blue-sheet-paper" aria-label="Unit 2 printable blue sheet">
 <header><div><small>AP CHEMISTRY · UNIT 2</small><h2>Compound Structure &amp; Properties</h2></div><div className="sheet-mantra"><b>CLAIM → EVIDENCE → REASONING</b><span>Name particles · describe arrangement · explain forces/motion</span></div></header>
 <div className="sheet-columns">
  <div className="sheet-column">
   <SheetBlock title="2.1 Types of chemical bonds" memory="Ask: where are the valence electrons?"><div className="bond-type-grid"><span><b>IONIC = transfer</b><small>metal + nonmetal<br/>Na• + Cl••••••• → Na⁺ [Cl]⁻</small></span><span><b>COVALENT = share</b><small>nonmetal + nonmetal<br/>H• + •H → H—H</small></span><span><b>METALLIC = mobile</b><small>metal atoms<br/>M⁺  e⁻→  M⁺  e⁻→</small></span></div><p><b>Fast decision:</b> metal + nonmetal → ionic; only nonmetals → covalent; only metals → metallic.</p><p><b>Conductivity:</b> requires a mobile charged particle. Metals conduct through mobile e⁻.</p></SheetBlock>
   <SheetBlock title="2.2 Intramolecular force & potential energy" memory="Left minimum = shorter · deeper well = stronger"><BondComparisonCurve/><div className="curve-key"><span><i className="curve-swatch chlorine"/>Cl–Cl: shorter + stronger</span><span><i className="curve-swatch bromine"/>Br–Br: longer + weaker</span></div><ul><li><b>Minimum x</b> = equilibrium bond length; <b>well depth</b> = bond energy.</li><li>Left of minimum: repulsion dominates. Right: attraction dominates.</li><li>At the minimum, attraction and repulsion balance → net force = 0.</li><li>Far apart, potential energy approaches 0.</li></ul></SheetBlock>
   <SheetBlock title="2.3 Structure of ionic solids" memory="Charged particles must MOVE to conduct"><p><b>Formula unit:</b> smallest charge-neutral ratio, not a molecule. Example: Mg²⁺ + 2Cl⁻ → MgCl₂.</p><div className="ionic-motion"><span><b>SOLID ✕</b><code>Na⁺ Cl⁻ Na⁺{`\n`}Cl⁻ Na⁺ Cl⁻</code><small>ions locked in a rigid lattice</small></span><span><b>MOLTEN / AQUEOUS ✓</b><code>Na⁺ →   ← Cl⁻{`\n`}Cl⁻ ←   → Na⁺</code><small>mobile ions carry charge</small></span></div><p><b>Say “ions move,” not “electrons move.”</b> High mp comes from strong Coulombic attraction. A shifted lattice aligns like charges → repulsion → brittle fracture.</p></SheetBlock>
   <SheetBlock title="2.4 Metals & alloys" memory="Replace = substitutional · Gap = interstitial"><div className="sheet-alloys"><span>● ● ●<br/>● ◉ ●<small>similar size replaces</small></span><span>● · ●<br/>● ● ●<small>small atom in gap</small></span></div><p>Alloy atoms disrupt regular layers → resist sliding → usually harder/less ductile.</p></SheetBlock>
  </div>
  <div className="sheet-column">
   <SheetBlock title="2.5 Lewis structures" memory="COUNT → CONNECT → OUTSIDE → CENTER → CHECK"><ol><li>Total valence e⁻; add for − charge, subtract for +.</li><li>Skeleton; H never central.</li><li>Single bonds (2 e⁻ each).</li><li>Complete terminal octets, then center.</li><li>Center short? Make multiple bonds.</li><li>Verify e⁻ total + formal charges.</li></ol><div className="sheet-example"><b>CO₂:</b> 4 + 2(6) = 16 e⁻ → O=C=O; each O has 2 lone pairs.</div><p><b>Exceptions:</b> H duet; Be/B incomplete; odd total = radical; period 3+ can expand.</p></SheetBlock>
   <SheetBlock title="2.6 Formal charge & resonance" memory="V − D − L: valence − dots − lines"><p className="sheet-formula">FC = valence e⁻ − nonbonding e⁻ − bond lines</p><p>Σ formal charges = overall charge.</p><div className="sheet-resonance">O—N=O &nbsp; ↔ &nbsp; O=N—O</div><p><b>Resonance:</b> same atoms/connectivity; move only π e⁻ or lone pairs. Real structure is a hybrid.</p><p><b>Best contributor:</b> complete octets → small |FC| → negative charge on more electronegative atom.</p></SheetBlock>
   <SheetBlock title="2.7 VSEPR + hybridization" memory="Count domains first; name the atom shape second"><table className="vsepr-sheet-table"><thead><tr><th>AXE</th><th>e⁻ geometry</th><th>molecular shape</th><th>angle(s)</th><th>example</th></tr></thead><tbody>{vseprSheetRows.map(row=><tr key={row[0]}>{row.map((cell,i)=><td key={i}>{cell}</td>)}</tr>)}</tbody></table><p>Each bond (single/double/triple) = 1 domain; each lone pair = 1. Lone pairs repel more strongly and compress adjacent angles. Hybridization by domains: 2 sp · 3 sp² · 4 sp³.</p></SheetBlock>
   <SheetBlock title="Fast AP response templates" memory="Never stop at a vocabulary word"><p><b>Property:</b> “Because ___ particles are [arranged/mobile], ___ attraction/motion causes ___.”</p><p><b>Diagram:</b> “The model shows ___. This means ___. Therefore ___.”</p><p><b>Comparison:</b> make one claim per variable and cite its own evidence.</p></SheetBlock>
  </div>
 </div>
 <footer><b>FINAL 20-SECOND CHECK</b><span>charges sum? · electrons total? · domains counted once? · phase stated? · evidence connected to claim?</span></footer>
 </section>}

function SheetBlock({title,memory,children}:{title:string;memory:string;children:ReactNode}){return <section className="sheet-block"><h3>{title}</h3><p className="sheet-memory">{memory}</p>{children}</section>}
const vseprSheetRows = [
 ['AX₂','linear','linear','180°','CO₂'],
 ['AX₃','trig planar','trig planar','120°','BF₃'],
 ['AX₂E','trig planar','bent','<120°','SO₂'],
 ['AX₄','tetrahedral','tetrahedral','109.5°','CH₄'],
 ['AX₃E','tetrahedral','trig pyramidal','≈107°','NH₃'],
 ['AX₂E₂','tetrahedral','bent','≈104.5°','H₂O'],
 ['AX₅','trig bipyramidal','trig bipyramidal','90°,120°,180°','PCl₅'],
 ['AX₄E','trig bipyramidal','seesaw','<90°,<120°','SF₄'],
 ['AX₃E₂','trig bipyramidal','T-shaped','≈90°,180°','ClF₃'],
 ['AX₂E₃','trig bipyramidal','linear','180°','XeF₂'],
 ['AX₆','octahedral','octahedral','90°,180°','SF₆'],
 ['AX₅E','octahedral','square pyramidal','≈90°,180°','BrF₅'],
 ['AX₄E₂','octahedral','square planar','90°,180°','XeF₄']
];

function BondComparisonCurve(){return <svg className="sheet-curve bond-comparison-curve" viewBox="0 0 320 150" role="img" aria-labelledby="bond-curve-title bond-curve-desc"><title id="bond-curve-title">Potential energy curves for chlorine and bromine bonds</title><desc id="bond-curve-desc">The chlorine bond has a minimum farther left and deeper than the bromine bond, so chlorine is shorter and stronger.</desc><defs><linearGradient id="energyArrow" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#64c4ef"/><stop offset="1" stopColor="#ff315f"/></linearGradient></defs><line className="axis" x1="40" y1="12" x2="40" y2="127"/><line className="axis" x1="40" y1="127" x2="306" y2="127"/><line className="zero-line" x1="40" y1="48" x2="306" y2="48"/><path className="energy-arrow" d="M18 124V22M18 22l-7 13M18 22l7 13"/><text x="4" y="145">energy</text><text x="176" y="146">internuclear distance</text><text x="27" y="52">0</text><path className="chlorine-curve" d="M68 11 C76 33 86 104 116 116 C143 126 160 70 181 57 C207 42 255 47 302 48"/><path className="bromine-curve" d="M99 12 C106 42 116 92 151 101 C178 108 190 69 211 58 C237 44 273 47 302 48"/><line className="bond-length-guide chlorine-guide" x1="121" y1="118" x2="121" y2="127"/><line className="bond-length-guide bromine-guide" x1="154" y1="102" x2="154" y2="127"/><line className="bond-energy-guide chlorine-guide" x1="121" y1="48" x2="121" y2="118"/><line className="bond-energy-guide bromine-guide" x1="154" y1="48" x2="154" y2="102"/><text className="curve-label chlorine-label" x="75" y="95">Cl–Cl</text><text className="curve-label bromine-label" x="165" y="90">Br–Br</text></svg>}
