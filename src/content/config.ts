import type { TopicId } from './types';

export const units = [
  ['1', 'Atomic Structure and Properties'], ['2', 'Compound Structure and Properties'],
  ['3', 'Properties of Substances and Mixtures'], ['4', 'Chemical Reactions'], ['5', 'Kinetics'],
  ['6', 'Thermochemistry'], ['7', 'Equilibrium'], ['8', 'Acids and Bases'], ['9', 'Thermodynamics and Electrochemistry']
] as const;

export const topics: { id: TopicId; title: string; blurb: string }[] = [
  { id: '2.1', title: 'Types of Chemical Bonds', blurb: 'Connect electron distribution and electronegativity to bond type and properties.' },
  { id: '2.2', title: 'Intramolecular Force and Potential Energy', blurb: 'Read energy curves and reason about attraction, repulsion, length, and strength.' },
  { id: '2.3', title: 'Structure of Ionic Solids', blurb: 'Link repeating ion lattices to formula units and macroscopic behavior.' },
  { id: '2.4', title: 'Structure of Metals and Alloys', blurb: 'Explain metallic properties and compare substitutional with interstitial alloys.' },
  { id: '2.5', title: 'Lewis Diagrams', blurb: 'Count electrons and construct coordinate-independent molecular graphs.' },
  { id: '2.6', title: 'Resonance and Formal Charge', blurb: 'Evaluate contributors, calculate formal charge, and describe delocalization.' },
  { id: '2.7', title: 'VSEPR and Hybridization', blurb: 'Move from electron domains to three-dimensional molecular geometry.' }
];

export const expectedCounts: Record<TopicId, number> = { '2.1': 50, '2.2': 50, '2.3': 50, '2.4': 50, '2.5': 50, '2.6': 50, '2.7': 50 };
