import { buildBank, choice } from './helpers';
const cases = [
    ['NO₃⁻', 'N +1; two singly bonded O −1 each; double-bonded O 0', '−1', 'three equivalent contributors', 'all three N–O bonds are equivalent in the resonance hybrid'],
    ['CO₃²⁻', 'C 0; two singly bonded O −1 each; double-bonded O 0', '−2', 'three equivalent contributors', 'all three C–O bonds are equivalent'],
    ['O₃', 'central O +1; singly bonded terminal O −1; double-bonded terminal O 0', '0', 'two equivalent contributors', 'the two O–O bonds are equivalent and intermediate in order'],
    ['SO₂', 'formal charges depend on the reviewed expanded-octet or charge-separated convention', '0', 'equivalent placements of π bonding', 'the two S–O bonds are equivalent'],
    ['NO₂⁻', 'N 0; singly bonded O −1; double-bonded O 0', '−1', 'two equivalent contributors', 'the two N–O bonds are equivalent'],
    ['N₂O', 'formal-charge placement distinguishes contributors', '0', 'multiple nonequivalent contributors', 'the contributor with negative charge on terminal O is favored'],
    ['SCN⁻', 'formal-charge placement differs among contributors', '−1', 'multiple contributors with fixed S–C–N connectivity', 'connectivity stays S–C–N while π electrons delocalize'],
    ['OCN⁻', 'formal-charge placement differs among contributors', '−1', 'multiple contributors with fixed O–C–N connectivity', 'contributors do not move the nuclei'],
    ['benzene model', 'each carbon has zero formal charge', '0', 'two equivalent Kekulé contributors', 'all six C–C bonds are equivalent'],
    ['acetate, CH₃COO⁻', 'one O is −1 in each localized contributor', '−1', 'two equivalent carboxylate contributors', 'the two C–O bonds in the carboxylate group are equivalent']
];
const seeds = cases.flatMap(([species, charges, sum, contributors, observation]) => [
    { prompt: `What formal-charge pattern is associated with a reviewed contributor for ${species}?`, answer: { kind: 'text', value: charges, accepted: [charges] }, solution: charges, concepts: ['formal charge'] },
    { prompt: `What must the formal charges sum to for ${species}?`, answer: { kind: 'text', value: sum, accepted: [sum, sum.replace('−', '-')] }, solution: `Formal charges must sum to the overall charge, ${sum}.`, concepts: ['charge sum'] },
    { prompt: `How should resonance for ${species} be described?`, ...choice(contributors, [contributors, 'atoms rapidly exchange positions', 'the sample switches between different molecules', 'connectivity changes on every contributor']), solution: `${species} is represented with ${contributors}; the actual electron distribution is delocalized.` },
    { prompt: `Which observation or inference follows from resonance in ${species}?`, ...choice(observation, [observation, 'every localized contributor exists as a separate isolable molecule', 'resonance moves the nuclei', 'formal charge is the measured partial charge']), solution: observation },
    { prompt: `A student says ${species} switches rapidly between drawings. Correct the statement.`, ...choice('The drawings are contributors to one delocalized structure; the species does not switch between them.', ['The drawings are contributors to one delocalized structure; the species does not switch between them.', 'Each drawing is a different isotope.', 'The atoms move while electrons remain fixed.', 'Only the contributor with the most charges exists.']), solution: 'Resonance contributors are bookkeeping representations of one delocalized species.' }
]);
export const bank26 = buildBank('2.6', 'resonance', seeds);
