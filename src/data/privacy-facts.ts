import type { PrivacyFact } from './types';
import { OFFICIAL_SOURCES } from './official-sources';

export const PRIVACY_FACTS: PrivacyFact[] = [
  {
    id: 'pf-confidentiality',
    title: 'Strict Confidentiality',
    category: 'protection',
    content: 'Individual data collected during the Census is strictly confidential under the Census Act, 1948.',
    plainLanguageExplanation: 'Your personal answers are kept completely secret. The law guarantees that no one can look at your specific answers to identify you.',
    legalBasis: 'Section 15 of the Census Act, 1948',
    officialSource: OFFICIAL_SOURCES.find(s => s.id === 'census-act-1948')!
  },
  {
    id: 'pf-inadmissible',
    title: 'Inadmissible in Court',
    category: 'legal',
    content: 'Census records are not open to inspection and are not admissible as evidence in any civil or criminal court.',
    plainLanguageExplanation: 'No court, police, or tax department can use your Census answers against you.',
    legalBasis: 'Section 15 of the Census Act, 1948',
    officialSource: OFFICIAL_SOURCES.find(s => s.id === 'census-act-1948')!
  },
  {
    id: 'pf-aggregated',
    title: 'Aggregated Statistics Only',
    category: 'access',
    content: 'Only aggregated statistical data at various administrative levels is published.',
    plainLanguageExplanation: 'When the government publishes Census results, they only show totals (like "10,000 people live in this town"). They never publish names or personal details.',
    officialSource: OFFICIAL_SOURCES.find(s => s.id === 'census-india-main')!
  }
];
