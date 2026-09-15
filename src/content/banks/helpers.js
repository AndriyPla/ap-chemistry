import { evidence } from '../structures';
export function buildBank(topic, lessonSection, seeds) {
    return seeds.map((s, i) => {
        const optionDiagnostics = Object.fromEntries((s.options ?? []).filter(o => s.answer.kind !== 'choice' || o !== s.answer.value).map(o => [o, `“${o}” does not match the reviewed ${lessonSection} evidence. ${s.hint ?? 'Re-read the particle description and identify the requested relationship.'}`]));
        return ({
            id: `u2-${topic.replace('.', '')}-${String(i + 1).padStart(2, '0')}`, unit: 2, topic,
            concepts: s.concepts ?? [lessonSection], representation: s.representation ?? (s.answer.kind === 'number' ? 'calculation' : s.answer.kind === 'lewis' ? 'lewis' : 'text'),
            difficulty: (i < 16 ? 'introductory' : i < 34 ? 'developing' : 'ap-style'),
            prompt: s.prompt, options: s.options, answer: s.answer,
            hints: [s.hint ?? `Identify the particle-level idea from lesson section “${lessonSection}.”`, 'Connect the given evidence to the stored definition or relationship before choosing.'],
            diagnostics: { blank: 'Enter or select an answer before checking.', incorrect: `Your response does not match the reviewed record for ${lessonSection}. Check the requested quantity, term, units, or particle-level relationship.`, ...optionDiagnostics },
            solution: s.solution, lessonSection, evidence: s.evidence ?? evidence
        });
    });
}
export const choice = (value, options) => ({ answer: { kind: 'choice', value }, options });
export const textAnswer = (value, ...accepted) => ({ kind: 'text', value, accepted: [value, ...accepted] });
