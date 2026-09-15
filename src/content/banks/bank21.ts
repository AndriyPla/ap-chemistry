import { buildBank, choice } from './helpers';
const bondOptions=['nonpolar covalent','polar covalent','ionic','metallic'];
const cases=[
 ['Cl₂','equal sharing between identical atoms','nonpolar covalent','Neither atom attracts the shared pair more strongly.','a molecular substance with a low boiling point'],
 ['HCl','electron density shifted toward Cl','polar covalent','Cl is δ− and H is δ+.','polar molecules with dipole–dipole attractions'],
 ['NaCl(s)','Na⁺ and Cl⁻ in a repeating lattice','ionic','Oppositely charged ions attract throughout the lattice.','high melting point and conduction only when ions are mobile'],
 ['Cu(s)','metal ion cores with mobile valence electrons','metallic','Delocalized electrons attract many positive cores.','electrical conduction and malleability'],
 ['C–H in CH₄','nearly even sharing','nonpolar covalent','The electronegativity difference is small.','a bond with little charge separation'],
 ['O–H in H₂O','shared density pulled toward O','polar covalent','O is δ− and H is δ+.','polar bonds that contribute to a molecular dipole'],
 ['MgO(s)','Mg²⁺ and O²⁻ in an extended array','ionic','Charge transfer is represented by oppositely charged ions.','a high-melting brittle solid'],
 ['Al(s)','closely packed cores in delocalized electrons','metallic','Mobile electrons carry charge through the solid.','conductivity in the solid state'],
 ['N₂','equal sharing in a triple bond','nonpolar covalent','Identical N atoms have the same electronegativity.','a nonpolar molecular bond'],
 ['C–F in CF₄','unequal sharing toward F','polar covalent','F is more electronegative than C.','polar bonds in an overall symmetric molecule']
] as const;
const seeds=cases.flatMap(([species,evidence,type,reason,property])=>[
 {prompt:`Classify the dominant bonding model for ${species}. Evidence: ${evidence}.`,...choice(type,[...bondOptions]),solution:`${type} is the useful model because ${reason}`},
 {prompt:`Which particle-level evidence best supports the bonding classification of ${species}?`,...choice(evidence,[evidence,'neutral molecules exchanging protons','isolated atoms with no interaction','nuclei sharing no electron density']),solution:`The relevant evidence is ${evidence}.`},
 {prompt:`Explain the charge or electron distribution in ${species}.`,answer:{kind:'text' as const,value:reason,accepted:[reason]},solution:reason,concepts:['electron distribution']},
 {prompt:`Which observation is most consistent with the bonding in ${species}?`,...choice(property,[property,'all particles are immobile in every state','the sample must dissolve in water','every bond is completely ionic']),solution:`The particle model predicts ${property}.`},
 {prompt:`A student assigns ${species} using a rigid electronegativity cutoff alone. What is the better reasoning?`,...choice('Treat electronegativity as a continuum and use structure and property evidence too.',['Treat electronegativity as a continuum and use structure and property evidence too.','Any difference above one fixed number proves complete electron transfer.','Electronegativity cannot inform bonding.','Only melting point determines bond type.']),solution:'Electronegativity difference tracks a continuum of electron sharing; particle and property evidence help select the useful model.',concepts:['electronegativity continuum']}
]);
export const bank21=buildBank('2.1','continuum',seeds);
