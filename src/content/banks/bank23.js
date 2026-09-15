import { buildBank, choice } from './helpers';
const cases = [
    ['NaCl', 'Na⁺', 'Cl⁻', '1:1', 'solid', 'molten'], ['MgCl₂', 'Mg²⁺', 'Cl⁻', '1:2', 'solid', 'aqueous'], ['Al₂O₃', 'Al³⁺', 'O²⁻', '2:3', 'solid', 'molten'], ['CaF₂', 'Ca²⁺', 'F⁻', '1:2', 'solid', 'aqueous'], ['K₂O', 'K⁺', 'O²⁻', '2:1', 'solid', 'molten'],
    ['Li₃N', 'Li⁺', 'N³⁻', '3:1', 'solid', 'aqueous'], ['BaCl₂', 'Ba²⁺', 'Cl⁻', '1:2', 'solid', 'molten'], ['MgO', 'Mg²⁺', 'O²⁻', '1:1', 'solid', 'aqueous'], ['Na₂S', 'Na⁺', 'S²⁻', '2:1', 'solid', 'molten'], ['Ca₃N₂', 'Ca²⁺', 'N³⁻', '3:2', 'solid', 'aqueous']
];
const seeds = cases.flatMap(([formula, cat, anion, ratio, nonconduct, conduct]) => [
    { prompt: `What cation-to-anion ratio makes the formula unit ${formula} charge-neutral?`, answer: { kind: 'text', value: ratio, accepted: [ratio, ratio.replace(':', ' to ')] }, solution: `Balancing ${cat} with ${anion} gives ${ratio}.`, representation: 'particle' },
    { prompt: `A particle diagram of ${formula} shows ${ratio} ${cat}-to-${anion}. What does the formula represent?`, ...choice('the simplest whole-number ratio in an extended lattice', ['the simplest whole-number ratio in an extended lattice', 'one isolated molecule', 'a mobile electron sea', 'a temporary collision pair']), solution: 'An ionic formula unit is the simplest neutral ratio in a repeating lattice.', representation: 'particle' },
    { prompt: `Why does ${formula} in the ${nonconduct} state ordinarily fail to conduct electricity?`, ...choice('the ions are held at fixed lattice sites', ['the ions are held at fixed lattice sites', 'the ions have no charge', 'all electrons leave the sample', 'the formula units become gases']), solution: 'Charged ions are present, but fixed ions cannot carry charge through the solid.' },
    { prompt: `Why can ${formula} conduct when ${conduct}?`, ...choice('its ions are mobile and can carry charge', ['its ions are mobile and can carry charge', 'its nuclei disappear', 'covalent bonds release photons', 'its ions become neutral']), solution: `In the ${conduct} state, mobile ions transport charge.` },
    { prompt: `A crystal of ${formula} fractures after layers shift. Which particle-level explanation is best?`, ...choice('like-charged ions become adjacent and repel', ['like-charged ions become adjacent and repel', 'mobile electrons glue every shifted layer', 'neutral molecules evaporate', 'the ion charges reverse']), solution: 'A displacement can align like charges; strong repulsion splits the brittle lattice.' }
]);
export const bank23 = buildBank('2.3', 'lattice', seeds);
