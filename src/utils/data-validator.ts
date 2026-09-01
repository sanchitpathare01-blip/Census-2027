import { CENSUS_PHASES } from '../data/census-phases';
import { SCHEDULES } from '../data/schedules';
import { PHASE_1_QUESTIONS, PHASE_2_QUESTIONS } from '../data/questionnaire';
import { MISINFORMATION_CLAIMS } from '../data/misinformation';
import { SCAM_PATTERNS } from '../data/scam-patterns';
import { OFFICIAL_SOURCES } from '../data/official-sources';

export function validateCensusPhases(): boolean {
  if (CENSUS_PHASES.length === 0) {
    console.error('Validation failed: No Census phases found.');
    return false;
  }
  const ids = new Set();
  for (const phase of CENSUS_PHASES) {
    if (ids.has(phase.id)) {
      console.error(`Validation failed: Duplicate Phase ID ${phase.id}`);
      return false;
    }
    ids.add(phase.id);
    if (!phase.officialSource || !OFFICIAL_SOURCES.find(s => s.id === phase.officialSource.id)) {
      console.error(`Validation failed: Phase ${phase.id} lacks a valid official source.`);
      return false;
    }
    if (phase.activities.length === 0) {
      console.error(`Validation failed: Phase ${phase.id} has no activities.`);
      return false;
    }
  }
  return true;
}

export function validateSchedules(): boolean {
  if (SCHEDULES.length !== 36) {
    console.error(`Validation failed: Expected 36 schedules (States + UTs), got ${SCHEDULES.length}`);
    return false;
  }
  for (const schedule of SCHEDULES) {
    if (!schedule.state || !schedule.statecode) {
      console.error(`Validation failed: Missing state or statecode in schedule.`);
      return false;
    }
    if (!schedule.officialSource || !OFFICIAL_SOURCES.find(s => s.id === schedule.officialSource.id)) {
      console.error(`Validation failed: Schedule for ${schedule.state} lacks a valid official source.`);
      return false;
    }
  }
  return true;
}

export function validatePhase1Questions(): boolean {
  // Exactly 33 verified Phase 1 Houselisting questions are required.
  if (PHASE_1_QUESTIONS.length !== 33) {
    console.error(`Validation failed: Expected 33 Phase 1 questions, got ${PHASE_1_QUESTIONS.length}`);
    return false;
  }
  const ids = new Set();
  const qNums = new Set();
  for (const q of PHASE_1_QUESTIONS) {
    if (ids.has(q.id)) {
      console.error(`Validation failed: Duplicate Phase 1 Question ID ${q.id}`);
      return false;
    }
    ids.add(q.id);
    if (qNums.has(q.questionNumber)) {
      console.error(`Validation failed: Duplicate Phase 1 Question Number ${q.questionNumber}`);
      return false;
    }
    qNums.add(q.questionNumber);
    if (q.phase !== 'phase_1_houselisting') {
      console.error(`Validation failed: Question ${q.id} has incorrect phase tag '${q.phase}'.`);
      return false;
    }
    if (!q.officialSource || !OFFICIAL_SOURCES.find(s => s.id === q.officialSource.id)) {
      console.error(`Validation failed: Question ${q.id} lacks a valid official source.`);
      return false;
    }
  }
  return true;
}

export function validatePhase2Questions(): boolean {
  // Phase 2 questions may currently be 0 if the official questionnaire is not yet published.
  // If any exist, they must be valid.
  const ids = new Set();
  for (const q of PHASE_2_QUESTIONS) {
    if (ids.has(q.id)) {
      console.error(`Validation failed: Duplicate Phase 2 Question ID ${q.id}`);
      return false;
    }
    ids.add(q.id);
    if (q.phase !== 'phase_2_population') {
      console.error(`Validation failed: Phase 2 Question ${q.id} has incorrect phase tag '${q.phase}'.`);
      return false;
    }
    if (!q.officialSource || !OFFICIAL_SOURCES.find(s => s.id === q.officialSource.id)) {
      console.error(`Validation failed: Phase 2 Question ${q.id} lacks a valid official source.`);
      return false;
    }
  }
  return true;
}

export function validateMisinformation(): boolean {
  if (MISINFORMATION_CLAIMS.length === 0) {
    console.error('Validation failed: No misinformation claims found.');
    return false;
  }
  for (const claim of MISINFORMATION_CLAIMS) {
    if (!claim.sources || claim.sources.length === 0) {
      console.error(`Validation failed: Misinformation claim ${claim.id} has no sources.`);
      return false;
    }
    for (const source of claim.sources) {
      if (!OFFICIAL_SOURCES.find(s => s.id === source.id)) {
        console.error(`Validation failed: Misinformation claim ${claim.id} has an invalid source ${source.id}.`);
        return false;
      }
    }
  }
  return true;
}

export function validateScamPatterns(): boolean {
  if (SCAM_PATTERNS.length === 0) {
    console.error('Validation failed: No scam patterns found.');
    return false;
  }
  const ids = new Set();
  for (const pattern of SCAM_PATTERNS) {
    if (ids.has(pattern.id)) {
      console.error(`Validation failed: Duplicate Scam Pattern ID ${pattern.id}`);
      return false;
    }
    ids.add(pattern.id);
    if (pattern.indicators.length === 0) {
      console.error(`Validation failed: Scam pattern ${pattern.id} has no indicators.`);
      return false;
    }
  }
  return true;
}

export function runAllValidations(): boolean {
  return validateCensusPhases() &&
         validateSchedules() &&
         validatePhase1Questions() &&
         validatePhase2Questions() &&
         validateMisinformation() &&
         validateScamPatterns();
}
