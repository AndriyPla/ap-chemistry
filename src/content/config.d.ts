import type { TopicId } from './types';
export declare const units: readonly [readonly ["1", "Atomic Structure and Properties"], readonly ["2", "Compound Structure and Properties"], readonly ["3", "Properties of Substances and Mixtures"], readonly ["4", "Chemical Reactions"], readonly ["5", "Kinetics"], readonly ["6", "Thermochemistry"], readonly ["7", "Equilibrium"], readonly ["8", "Acids and Bases"], readonly ["9", "Thermodynamics and Electrochemistry"]];
export declare const topics: {
    id: TopicId;
    title: string;
    blurb: string;
}[];
export declare const expectedCounts: Record<TopicId, number>;
