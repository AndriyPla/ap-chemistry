import bankMarkdown from '../../content/ap-style-question-banks/AP_CHEM_UNIT_2_QUESTION_BANK.md?raw';
import type { TopicId } from './types';

export type APBankQuestion = {
  id: string;
  number: number;
  topic: TopicId | 'mixed';
  prompt: string;
  options: string[];
  answer: string;
  solution: string;
  stimulus: 'bond-curves' | 'ionic-lattice' | 'ionic-properties' | null;
};

const clean = (value: string) => value.replace(/\s{2,}\n/g, '\n').replace(/\s+/g, ' ').trim();

function getStimulus(number: number): APBankQuestion['stimulus'] {
  if ([26, 27, 31, 32, 34, 35, 39, 40].includes(number)) return 'bond-curves';
  if ([51, 54, 55, 56, 59].includes(number)) return 'ionic-lattice';
  if ([52, 53, 57, 58, 60, 61, 62].includes(number)) return 'ionic-properties';
  return null;
}

function topicFor(number: number): APBankQuestion['topic'] {
  if (number > 175) return 'mixed';
  return `2.${Math.ceil(number / 25)}` as TopicId;
}

function parseBank(markdown: string) {
  const normalized = markdown.replace(/\r/g, '');
  const keys = new Map<number, string>();
  for (const match of normalized.matchAll(/(?:^|[;\s])(\d+)\s+([A-D])(?=;|\.)/g)) keys.set(Number(match[1]), match[2]);

  const records: Array<{number: number; body: string}> = [];
  const starts = [...normalized.matchAll(/^(\d+)\. \*\*MCQ\.\*\*\s+/gm)];
  for (const [index, start] of starts.entries()) {
    const number = Number(start[1]);
    const remainder = normalized.slice(start.index! + start[0].length);
    const boundary = remainder.search(/^\d+\. \*\*(?:MCQ|CR)\.\*\*|^### Answers/gm);
    records.push({number, body: remainder.slice(0, boundary < 0 ? undefined : boundary).trim()});
    if (index === starts.length - 1) break;
  }

  return records.flatMap(({number, body}) => {
    const markers = [...body.matchAll(/(?:^|\s)([A-D])\.\s+/g)];
    const answerLetter = keys.get(number);
    if (markers.length !== 4 || !answerLetter) return [];
    const prompt = clean(body.slice(0, markers[0].index));
    const options = markers.map((marker, index) => clean(body.slice(marker.index! + marker[0].length, markers[index + 1]?.index ?? body.length)));
    const answerIndex = answerLetter.charCodeAt(0) - 65;
    return [{
      id: `ap-u2-${number}`,
      number,
      topic: topicFor(number),
      prompt,
      options,
      answer: options[answerIndex],
      solution: `The question bank identifies ${answerLetter} as the correct answer: ${options[answerIndex]}`,
      stimulus: getStimulus(number),
    } satisfies APBankQuestion];
  });
}

export const apQuestionBank = parseBank(bankMarkdown);

export function getAPQuestions(scope: TopicId | '2') {
  return scope === '2' ? apQuestionBank : apQuestionBank.filter(question => question.topic === scope);
}

export const AP_QUESTION_BANK_SOURCE = 'AP_CHEM_UNIT_2_QUESTION_BANK.md';
