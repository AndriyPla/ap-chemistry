export type TopicId = '2.1' | '2.2' | '2.3' | '2.4' | '2.5' | '2.6' | '2.7';
export type Difficulty = 'introductory' | 'developing' | 'ap-style';
export type Answer = {
    kind: 'choice';
    value: string;
    accepted?: string[];
} | {
    kind: 'text';
    value: string;
    accepted: string[];
} | {
    kind: 'number';
    value: number;
    unit: string;
    tolerance: number;
} | {
    kind: 'lewis';
    structureId: string;
};
export interface VerificationEvidence {
    sourceUrl: string;
    locator: string;
    method: string;
    reviewer: 'development-agent';
    reviewedOn: string;
    status: 'source-checked';
    limitation?: string;
}
export interface Question {
    id: string;
    unit: 2;
    topic: TopicId;
    concepts: string[];
    representation: 'text' | 'particle' | 'graph' | 'calculation' | 'lewis' | 'chart';
    difficulty: Difficulty;
    prompt: string;
    options?: string[];
    answer: Answer;
    hints: [string, string];
    diagnostics: Record<string, string>;
    solution: string;
    lessonSection: string;
    evidence: VerificationEvidence;
}
export interface AtomRecord {
    id: string;
    element: string;
    x: number;
    y: number;
    z: number;
    lonePairs: number;
    formalCharge: number;
    unpairedElectrons?: number;
}
export interface BondRecord {
    a: string;
    b: string;
    order: 1 | 2 | 3;
}
export interface MolecularStructure {
    id: string;
    formula: string;
    overallCharge: number;
    totalValenceElectrons: number;
    atoms: AtomRecord[];
    bonds: BondRecord[];
    electronGeometry: string;
    molecularGeometry: string;
    bondAngles: string;
    hybridization: string;
    exception?: string;
    description: string;
    evidence: VerificationEvidence;
}
export interface LessonSection {
    id: string;
    title: string;
    body: string;
    example?: string;
}
export interface Lesson {
    topic: TopicId;
    objectives: string[];
    vocabulary: string[];
    sections: LessonSection[];
    misconceptions: string[];
    apGuidance: string;
    summary: string;
}
