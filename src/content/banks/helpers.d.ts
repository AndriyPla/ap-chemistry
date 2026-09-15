import type { Answer, Question, TopicId, VerificationEvidence } from '../types';
export type Seed = {
    prompt: string;
    answer: Answer;
    solution: string;
    concepts?: string[];
    representation?: Question['representation'];
    options?: string[];
    hint?: string;
    evidence?: VerificationEvidence;
};
export declare function buildBank(topic: TopicId, lessonSection: string, seeds: Seed[]): Question[];
export declare const choice: (value: string, options: string[]) => Pick<Seed, "answer" | "options">;
export declare const textAnswer: (value: string, ...accepted: string[]) => Answer;
