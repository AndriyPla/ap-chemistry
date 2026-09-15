import { buildBank, choice } from './helpers';
const cases = [
    ['CO₂', 2, 2, 0, 'linear', 'linear', '180°', 'sp'], ['BF₃', 3, 3, 0, 'trigonal planar', 'trigonal planar', '120°', 'sp²'], ['SO₂', 3, 2, 1, 'trigonal planar', 'bent', '<120°', 'sp²'], ['CH₄', 4, 4, 0, 'tetrahedral', 'tetrahedral', '109.5°', 'sp³'], ['NH₃', 4, 3, 1, 'tetrahedral', 'trigonal pyramidal', '≈107°', 'sp³'],
    ['H₂O', 4, 2, 2, 'tetrahedral', 'bent', '≈104.5°', 'sp³'], ['PCl₅', 5, 5, 0, 'trigonal bipyramidal', 'trigonal bipyramidal', '90°, 120°, 180°', 'not assessed'], ['SF₄', 5, 4, 1, 'trigonal bipyramidal', 'seesaw', '<90°, <120°, ≈180°', 'not assessed'], ['BrF₅', 6, 5, 1, 'octahedral', 'square pyramidal', '≈90°, 180°', 'not assessed'], ['XeF₄', 6, 4, 2, 'octahedral', 'square planar', '90°, 180°', 'not assessed']
];
const shapes = ['linear', 'trigonal planar', 'bent', 'tetrahedral', 'trigonal pyramidal', 'trigonal bipyramidal', 'seesaw', 'T-shaped', 'octahedral', 'square pyramidal', 'square planar'];
const seeds = cases.flatMap(([species, domains, bonding, lone, eg, mg, angle, hybrid]) => [
    { prompt: `How many electron domains surround the central atom in ${species}?`, answer: { kind: 'number', value: domains, unit: 'domains', tolerance: 0 }, solution: `${species} has ${bonding} bonding domain(s) and ${lone} lone-pair domain(s), totaling ${domains}.`, representation: 'chart' },
    { prompt: `Name the electron-domain geometry of ${species}.`, answer: { kind: 'text', value: eg, accepted: [eg] }, solution: `${domains} domains arrange as ${eg}.`, representation: 'chart' },
    { prompt: `Name the molecular geometry of ${species}.`, ...choice(mg, [...new Set([mg, ...shapes])].slice(0, 5)), solution: `Ignoring lone-pair positions when naming atom positions gives ${mg}.`, representation: 'chart' },
    { prompt: `Give the reviewed ideal or approximate central bond angle(s) for ${species}.`, answer: { kind: 'text', value: angle, accepted: [angle, angle.replaceAll('≈', '').replaceAll('°', ' degrees')] }, solution: `The reviewed VSEPR value is ${angle}.`, representation: 'chart' },
    { prompt: `What AP-scope hybridization entry belongs with ${species}?`, ...choice(hybrid, [hybrid, 'sp', 'sp²', 'sp³', 'not assessed']), solution: hybrid === 'not assessed' ? 'Expanded-octet d-hybrid labels are outside the assessed mapping used here.' : `${domains} domains correspond to ${hybrid}.`, representation: 'chart' }
]);
export const bank27 = buildBank('2.7', 'domains', seeds);
