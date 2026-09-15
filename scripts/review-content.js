import { allQuestions, questionBanks } from '../src/content/questions';
import { expectedCounts } from '../src/content/config';
import { structures } from '../src/content/structures';
const errors = [];
const prompts = new Map();
for (const [topic, count] of Object.entries(expectedCounts)) {
    if (questionBanks[topic].length !== count)
        errors.push(`${topic}: expected ${count}`);
}
for (const q of allQuestions) {
    const key = q.prompt.toLowerCase().replace(/\s+/g, ' ').trim();
    if (prompts.has(key))
        errors.push(`duplicate prompt: ${q.id} / ${prompts.get(key)}`);
    prompts.set(key, q.id);
    if (!q.solution || q.hints.some(h => !h) || !q.evidence.sourceUrl || q.evidence.status !== 'source-checked')
        errors.push(`missing review field: ${q.id}`);
}
const difficulty = Object.fromEntries(['introductory', 'developing', 'ap-style'].map(d => [d, allQuestions.filter(q => q.difficulty === d).length]));
console.log(JSON.stringify({ total: allQuestions.length, byTopic: Object.fromEntries(Object.entries(questionBanks).map(([k, v]) => [k, v.length])), difficulty, structures: structures.length, errors }, null, 2));
if (errors.length)
    process.exit(1);
