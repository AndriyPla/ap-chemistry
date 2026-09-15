import type { AtomRecord, BondRecord, MolecularStructure, VerificationEvidence } from './types';

export const CED_URL = 'https://apcentral.collegeboard.org/media/pdf/ap-chemistry-course-and-exam-description.pdf';
export const OPENSTAX_URL = 'https://openstax.org/books/chemistry-2e/pages/7-introduction';
export const evidence: VerificationEvidence = {
  sourceUrl: CED_URL,
  locator: 'Unit 2, Topics 2.1–2.7; Course Framework pp. 42–56',
  method: 'Scope checked against the 2024 AP Chemistry CED; chemistry definitions cross-checked against OpenStax Chemistry 2e chapters 7 and 8.',
  reviewer: 'development-agent', reviewedOn: '2026-09-15', status: 'source-checked',
  limitation: 'Independent source review, not a claim of College Board or teacher endorsement.'
};

type A = [string,string,number,number,number,number,number,number?];
type B = [string,string,1|2|3];
const atoms = (rows:A[]):AtomRecord[] => rows.map(([id,element,x,y,z,lonePairs,formalCharge,unpairedElectrons=0])=>({id,element,x,y,z,lonePairs,formalCharge,unpairedElectrons}));
const bonds = (rows:B[]):BondRecord[] => rows.map(([a,b,order])=>({a,b,order}));
const make = (id:string, formula:string, charge:number, electrons:number, a:A[], b:B[], electronGeometry:string, molecularGeometry:string, bondAngles:string, hybridization:string, description:string, exception?:string):MolecularStructure => ({ id,formula,overallCharge:charge,totalValenceElectrons:electrons,atoms:atoms(a),bonds:bonds(b),electronGeometry,molecularGeometry,bondAngles,hybridization,description,exception,evidence });

export const structures:MolecularStructure[] = [
 make('h2o','H₂O',0,8,[['o','O',0,0,0,2,0],['h1','H',-1,.65,0,0,0],['h2','H',1,.65,0,0,0]],[['o','h1',1],['o','h2',1]],'tetrahedral','bent','≈104.5°','sp³','Two O–H bonds and two oxygen lone pairs produce a bent molecule.'),
 make('co2','CO₂',0,16,[['c','C',0,0,0,0,0],['o1','O',-1.4,0,0,2,0],['o2','O',1.4,0,0,2,0]],[['c','o1',2],['c','o2',2]],'linear','linear','180°','sp','Two double bonds are two domains around carbon.'),
 make('nh3','NH₃',0,8,[['n','N',0,0,.35,1,0],['h1','H',-1,-.6,0,0,0],['h2','H',1,-.6,0,0,0],['h3','H',0,1,-.3,0,0]],[['n','h1',1],['n','h2',1],['n','h3',1]],'tetrahedral','trigonal pyramidal','≈107°','sp³','Three bonds and one lone pair surround nitrogen.'),
 make('ch4','CH₄',0,8,[['c','C',0,0,0,0,0],['h1','H',1,1,1,0,0],['h2','H',-1,-1,1,0,0],['h3','H',-1,1,-1,0,0],['h4','H',1,-1,-1,0,0]],[['c','h1',1],['c','h2',1],['c','h3',1],['c','h4',1]],'tetrahedral','tetrahedral','109.5°','sp³','Four equivalent bonding domains surround carbon.'),
 make('bf3','BF₃',0,24,[['b','B',0,0,0,0,0],['f1','F',-1.2,-.7,0,3,0],['f2','F',1.2,-.7,0,3,0],['f3','F',0,1.4,0,3,0]],[['b','f1',1],['b','f2',1],['b','f3',1]],'trigonal planar','trigonal planar','120°','sp²','Boron has six electrons around it in the preferred AP-level structure.','Incomplete octet on boron.'),
 make('so2','SO₂',0,18,[['s','S',0,0,0,1,0],['o1','O',-1.1,.8,0,2,0],['o2','O',1.1,.8,0,2,0]],[['s','o1',2],['s','o2',2]],'trigonal planar','bent','<120°','sp²','Two bonding domains and one lone pair give a bent shape; resonance-compatible conventions are reviewed.','Expanded-valence drawing convention.'),
 make('o3','O₃',0,18,[['o2','O',0,0,0,1,1],['o1','O',-1.2,.8,0,3,-1],['o3','O',1.2,.8,0,2,0]],[['o2','o1',1],['o2','o3',2]],'trigonal planar','bent','<120°','sp²','Either equivalent placement of the double bond is accepted as a contributor.'),
 make('no3','NO₃⁻',-1,24,[['n','N',0,0,0,0,1],['o1','O',-1.2,-.7,0,3,-1],['o2','O',1.2,-.7,0,3,-1],['o3','O',0,1.4,0,2,0]],[['n','o1',1],['n','o2',1],['n','o3',2]],'trigonal planar','trigonal planar','120°','sp²','Three equivalent resonance contributors delocalize the π bond and negative charge.'),
 make('co3','CO₃²⁻',-2,24,[['c','C',0,0,0,0,0],['o1','O',-1.2,-.7,0,3,-1],['o2','O',1.2,-.7,0,3,-1],['o3','O',0,1.4,0,2,0]],[['c','o1',1],['c','o2',1],['c','o3',2]],'trigonal planar','trigonal planar','120°','sp²','Three equivalent contributors give three equivalent C–O bonds.'),
 make('nh4','NH₄⁺',1,8,[['n','N',0,0,0,0,1],['h1','H',1,1,1,0,0],['h2','H',-1,-1,1,0,0],['h3','H',-1,1,-1,0,0],['h4','H',1,-1,-1,0,0]],[['n','h1',1],['n','h2',1],['n','h3',1],['n','h4',1]],'tetrahedral','tetrahedral','109.5°','sp³','Four N–H bonds and no lone pair surround nitrogen.'),
 make('h3o','H₃O⁺',1,8,[['o','O',0,0,.3,1,1],['h1','H',-1,-.6,0,0,0],['h2','H',1,-.6,0,0,0],['h3','H',0,1,-.3,0,0]],[['o','h1',1],['o','h2',1],['o','h3',1]],'tetrahedral','trigonal pyramidal','≈113°','sp³','Three bonds and one lone pair surround positively charged oxygen.'),
 make('hcn','HCN',0,10,[['h','H',-1.5,0,0,0,0],['c','C',0,0,0,0,0],['n','N',1.5,0,0,1,0]],[['h','c',1],['c','n',3]],'linear','linear','180°','sp','Hydrogen is terminal; carbon and nitrogen form a triple bond.'),
 make('c2h4','C₂H₄',0,12,[['c1','C',-.7,0,0,0,0],['c2','C',.7,0,0,0,0],['h1','H',-1.4,.9,0,0,0],['h2','H',-1.4,-.9,0,0,0],['h3','H',1.4,.9,0,0,0],['h4','H',1.4,-.9,0,0,0]],[['c1','c2',2],['c1','h1',1],['c1','h2',1],['c2','h3',1],['c2','h4',1]],'trigonal planar at each C','planar','≈120°','sp²','Each carbon has three domains and the C=C prevents free rotation.'),
 make('c2h2','C₂H₂',0,10,[['h1','H',-2,0,0,0,0],['c1','C',-.7,0,0,0,0],['c2','C',.7,0,0,0,0],['h2','H',2,0,0,0,0]],[['h1','c1',1],['c1','c2',3],['c2','h2',1]],'linear at each C','linear','180°','sp','Each carbon has two electron domains.'),
 make('n2','N₂',0,10,[['n1','N',-.8,0,0,1,0],['n2','N',.8,0,0,1,0]],[['n1','n2',3]],'linear','linear','180°','sp','A triple bond and one lone pair on each nitrogen use ten electrons.'),
 make('o2','O₂',0,12,[['o1','O',-.8,0,0,2,0],['o2','O',.8,0,0,2,0]],[['o1','o2',2]],'linear','linear','180°','not assigned','A double bond and two lone pairs on each oxygen use twelve electrons.'),
 make('f2','F₂',0,14,[['f1','F',-.8,0,0,3,0],['f2','F',.8,0,0,3,0]],[['f1','f2',1]],'linear','linear','180°','not assigned','A single bond and three lone pairs on each fluorine use fourteen electrons.'),
 make('hf','HF',0,8,[['h','H',-.7,0,0,0,0],['f','F',.7,0,0,3,0]],[['h','f',1]],'linear','linear','180°','not assigned','Hydrogen has a duet and fluorine an octet.'),
 make('pcl5','PCl₅',0,40,[['p','P',0,0,0,0,0],['c1','Cl',1.3,0,0,3,0],['c2','Cl',-.65,1.1,0,3,0],['c3','Cl',-.65,-1.1,0,3,0],['c4','Cl',0,0,1.4,3,0],['c5','Cl',0,0,-1.4,3,0]],[['p','c1',1],['p','c2',1],['p','c3',1],['p','c4',1],['p','c5',1]],'trigonal bipyramidal','trigonal bipyramidal','90°, 120°, 180°','not assessed','Five bonds surround phosphorus.','Expanded octet.'),
 make('sf6','SF₆',0,48,[['s','S',0,0,0,0,0],['f1','F',1.3,0,0,3,0],['f2','F',-1.3,0,0,3,0],['f3','F',0,1.3,0,3,0],['f4','F',0,-1.3,0,3,0],['f5','F',0,0,1.3,3,0],['f6','F',0,0,-1.3,3,0]],[['s','f1',1],['s','f2',1],['s','f3',1],['s','f4',1],['s','f5',1],['s','f6',1]],'octahedral','octahedral','90°, 180°','not assessed','Six bonding domains surround sulfur.','Expanded octet.'),
 make('clf3','ClF₃',0,28,[['cl','Cl',0,0,0,2,0],['f1','F',1.3,0,0,3,0],['f2','F',-1.3,0,0,3,0],['f3','F',0,0,1.3,3,0]],[['cl','f1',1],['cl','f2',1],['cl','f3',1]],'trigonal bipyramidal','T-shaped','≈90°, 180°','not assessed','Three bonds and two equatorial lone pairs give a T shape.','Expanded octet.'),
 make('xef2','XeF₂',0,22,[['xe','Xe',0,0,0,3,0],['f1','F',-1.4,0,0,3,0],['f2','F',1.4,0,0,3,0]],[['xe','f1',1],['xe','f2',1]],'trigonal bipyramidal','linear','180°','not assessed','Three equatorial lone pairs leave two axial bonds.','Expanded octet.'),
 make('xef4','XeF₄',0,36,[['xe','Xe',0,0,0,2,0],['f1','F',1.3,0,0,3,0],['f2','F',-1.3,0,0,3,0],['f3','F',0,1.3,0,3,0],['f4','F',0,-1.3,0,3,0]],[['xe','f1',1],['xe','f2',1],['xe','f3',1],['xe','f4',1]],'octahedral','square planar','90°, 180°','not assessed','Two lone pairs occupy opposite positions above and below the plane.','Expanded octet.'),
 make('brf5','BrF₅',0,42,[['br','Br',0,0,.3,1,0],['f1','F',1.2,0,0,3,0],['f2','F',-1.2,0,0,3,0],['f3','F',0,1.2,0,3,0],['f4','F',0,-1.2,0,3,0],['f5','F',0,0,1.4,3,0]],[['br','f1',1],['br','f2',1],['br','f3',1],['br','f4',1],['br','f5',1]],'octahedral','square pyramidal','≈90°, 180°','not assessed','Five bonds and one lone pair surround bromine.','Expanded octet.'),
 make('becl2','BeCl₂',0,16,[['be','Be',0,0,0,0,0],['c1','Cl',-1.3,0,0,3,0],['c2','Cl',1.3,0,0,3,0]],[['be','c1',1],['be','c2',1]],'linear','linear','180°','sp','Beryllium has four electrons around it in this incomplete-octet structure.','Incomplete octet on beryllium.'),
 make('no','NO',0,11,[['n','N',-.7,0,0,1,0,1],['o','O',.7,0,0,2,0]],[['n','o',2]],'linear','linear','180°','not assigned','One unpaired electron remains on nitrogen in this odd-electron species.','Odd-electron radical; unpaired electron is represented by the builder’s single-electron annotation.')
];

export const structureById = Object.fromEntries(structures.map(s=>[s.id,s])) as Record<string,MolecularStructure>;
