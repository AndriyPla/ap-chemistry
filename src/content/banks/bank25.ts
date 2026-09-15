import { buildBank, choice } from './helpers';
import { structures } from '../structures';
const builderSeeds=structures.map(s=>({
  prompt:`Construct a reviewed Lewis diagram for ${s.formula}. Include all bonds, lone pairs, formal charges, and overall charge shown by the task.`,
  answer:{kind:'lewis' as const,structureId:s.id}, solution:`${s.description} Total valence electrons: ${s.totalValenceElectrons}. ${s.exception ?? ''}`,
  concepts:['Lewis construction','electron counting'], representation:'lewis' as const,
  hint:`Count ${s.totalValenceElectrons} valence electrons, remembering that bond lines already represent two electrons.`
}));
const reasoning=structures.slice(0,8).flatMap(s=>[
 {prompt:`How many total valence electrons must be represented in ${s.formula}?`,answer:{kind:'number' as const,value:s.totalValenceElectrons,unit:'electrons',tolerance:0},solution:`The reviewed total is ${s.totalValenceElectrons} valence electrons.`,concepts:['electron counting']},
 {prompt:`Which statement correctly describes the reviewed Lewis record for ${s.formula}?`,...choice(s.description,[s.description,'Hydrogen is used as the central atom.','Bond lines are counted again as lone-pair dots.','The overall charge is ignored.']),solution:s.description,concepts:['structure evaluation']},
 {prompt:`After drawing ${s.formula}, what is the best final validation step?`,...choice('verify atom inventory, electron total, connectivity, bond orders, lone pairs, and charge',['verify atom inventory, electron total, connectivity, bond orders, lone pairs, and charge','compare only the drawing coordinates','check only that every atom has four bonds','erase all formal charges']),solution:'A Lewis record is checked as a molecular graph plus electron and charge annotations.',concepts:['validation']}
]);
export const bank25=buildBank('2.5','steps',[...builderSeeds,...reasoning]);
