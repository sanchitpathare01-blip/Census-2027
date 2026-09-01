import { CensusQuestion, QuestionCategory } from './types';
import { OFFICIAL_SOURCES } from './official-sources';

const hloSource = OFFICIAL_SOURCES.find(s => s.id === 'census-2027-hlo-gazette')!;

// ─────────────────────────────────────────────────────────────────────────────
// Phase 1: Houselisting and Housing Census — 33 Notified Questions
// Source: Official Gazette Notification, Census of India 2027
// ─────────────────────────────────────────────────────────────────────────────
export const PHASE_1_QUESTIONS: CensusQuestion[] = [
  { id: 'hlo-1', questionNumber: 1, questionText: 'Building number (Municipal or local authority or census number)', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-2', questionNumber: 2, questionText: 'Census house number', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-3', questionNumber: 3, questionText: 'Predominant material of the floor of census house', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-4', questionNumber: 4, questionText: 'Predominant material of the wall of census house', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-5', questionNumber: 5, questionText: 'Predominant material of the roof of census house', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-6', questionNumber: 6, questionText: 'Ascertain use of census house', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-7', questionNumber: 7, questionText: 'Condition of the census house', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-8', questionNumber: 8, questionText: 'Household number', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-9', questionNumber: 9, questionText: 'Total number of persons normally residing in the household', phase: 'phase_1_houselisting', category: QuestionCategory.DEMOGRAPHICS, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-10', questionNumber: 10, questionText: 'Name of the head of the household', phase: 'phase_1_houselisting', category: QuestionCategory.DEMOGRAPHICS, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-11', questionNumber: 11, questionText: 'Sex of the head of the household', phase: 'phase_1_houselisting', category: QuestionCategory.DEMOGRAPHICS, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-12', questionNumber: 12, questionText: 'Whether the head of the household belongs to SC/ST/Other', phase: 'phase_1_houselisting', category: QuestionCategory.DEMOGRAPHICS, isSensitive: true, dataProtectionNote: 'Sensitive demographic data collected for statistical aggregation only.', officialSource: hloSource },
  { id: 'hlo-13', questionNumber: 13, questionText: 'Ownership status of the census house', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-14', questionNumber: 14, questionText: 'Number of dwelling rooms exclusively in possession of the household', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-15', questionNumber: 15, questionText: 'Number of married couple(s) living in the household', phase: 'phase_1_houselisting', category: QuestionCategory.DEMOGRAPHICS, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-16', questionNumber: 16, questionText: 'Main source of drinking water', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-17', questionNumber: 17, questionText: 'Availability of drinking water source', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-18', questionNumber: 18, questionText: 'Main source of lighting', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-19', questionNumber: 19, questionText: 'Access to latrine', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-20', questionNumber: 20, questionText: 'Type of latrine', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-21', questionNumber: 21, questionText: 'Waste water outlet', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-22', questionNumber: 22, questionText: 'Availability of bathing facility', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-23', questionNumber: 23, questionText: 'Availability of kitchen and LPG/PNG connection', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-24', questionNumber: 24, questionText: 'Main fuel used for cooking', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-25', questionNumber: 25, questionText: 'Radio/Transistor', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-26', questionNumber: 26, questionText: 'Television', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-27', questionNumber: 27, questionText: 'Access to internet', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-28', questionNumber: 28, questionText: 'Laptop/Computer', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-29', questionNumber: 29, questionText: 'Telephone/Mobile Phone/Smartphone', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-30', questionNumber: 30, questionText: 'Bicycle/Scooter/Motorcycle/Moped', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-31', questionNumber: 31, questionText: 'Car/Jeep/Van', phase: 'phase_1_houselisting', category: QuestionCategory.HOUSEHOLD, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-32', questionNumber: 32, questionText: 'Main Cereal consumed in the household', phase: 'phase_1_houselisting', category: QuestionCategory.SOCIAL, isSensitive: false, officialSource: hloSource },
  { id: 'hlo-33', questionNumber: 33, questionText: 'Mobile number (collected for census-related communication purposes)', phase: 'phase_1_houselisting', category: QuestionCategory.DEMOGRAPHICS, isSensitive: true, dataProtectionNote: 'Mobile numbers are collected strictly for census communication and self-enumeration OTPs, and are not shared publicly.', officialSource: hloSource }
];

// ─────────────────────────────────────────────────────────────────────────────
// Phase 2 Population Enumeration questionnaire:
// Exact official questions will be added only after publication/verification.
// Do not fabricate Census questions.
// ─────────────────────────────────────────────────────────────────────────────
export const PHASE_2_QUESTIONS: CensusQuestion[] = [];

// Combined export for convenience
export const QUESTIONNAIRE: CensusQuestion[] = [
  ...PHASE_1_QUESTIONS,
  ...PHASE_2_QUESTIONS,
];
