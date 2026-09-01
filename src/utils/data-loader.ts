import type { AppData } from '../data/types';
import { CENSUS_PHASES } from '../data/census-phases';
import { SCHEDULES } from '../data/schedules';
import { PHASE_1_QUESTIONS, PHASE_2_QUESTIONS, QUESTIONNAIRE } from '../data/questionnaire';
import { PRIVACY_FACTS } from '../data/privacy-facts';
import { MISINFORMATION_CLAIMS } from '../data/misinformation';
import { SCAM_PATTERNS } from '../data/scam-patterns';
import { OFFICIAL_SOURCES } from '../data/official-sources';
import { LANGUAGES } from '../data/languages';
import { runAllValidations } from './data-validator';

let cachedAppData: AppData | null = null;

export function initializeAppData(): AppData {
  if (cachedAppData) {
    return cachedAppData;
  }

  const isValid = runAllValidations();
  if (!isValid) {
    throw new Error('Data validation failed. Check console for details.');
  }

  console.log(`✅ Census data loaded and validated`);
  console.log(`   Phase 1 questions: ${PHASE_1_QUESTIONS.length}`);
  console.log(`   Phase 2 questions: ${PHASE_2_QUESTIONS.length}`);
  console.log(`   Total questions:   ${QUESTIONNAIRE.length}`);

  cachedAppData = {
    phases: CENSUS_PHASES,
    schedules: SCHEDULES,
    phase1Questions: PHASE_1_QUESTIONS,
    phase2Questions: PHASE_2_QUESTIONS,
    allQuestions: QUESTIONNAIRE,
    questionnaireStatus: {
      phase1: 'verified',
      phase2: PHASE_2_QUESTIONS.length > 0 ? 'verified' : 'pending_official_publication'
    },
    privacyFacts: PRIVACY_FACTS,
    misinformationClaims: MISINFORMATION_CLAIMS,
    scamPatterns: SCAM_PATTERNS,
    officialSources: OFFICIAL_SOURCES,
    languages: LANGUAGES,
    lastUpdated: new Date().toISOString()
  };

  return cachedAppData;
}

export function getAppData(): AppData {
  if (!cachedAppData) {
    return initializeAppData();
  }
  return cachedAppData;
}
