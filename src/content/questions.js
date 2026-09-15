import { bank21 } from './banks/bank21';
import { bank22 } from './banks/bank22';
import { bank23 } from './banks/bank23';
import { bank24 } from './banks/bank24';
import { bank25 } from './banks/bank25';
import { bank26 } from './banks/bank26';
import { bank27 } from './banks/bank27';
export const questionBanks = { '2.1': bank21, '2.2': bank22, '2.3': bank23, '2.4': bank24, '2.5': bank25, '2.6': bank26, '2.7': bank27 };
export const allQuestions = Object.values(questionBanks).flat();
