/**
 * final-demo.test.ts — Phase 5 System Integration Readiness Test Suite.
 *
 * Run with: npx tsx src/ai/__tests__/final-demo.test.ts
 */

import { initializeAppData } from '../../utils/data-loader';
import { checkMisinformation, checkScamPatterns } from '../misinformation-engine';
import { buildConfidenceFromEvidence } from '../confidence-engine';
import { LanguageCode } from '../../data/types';
import { LANGUAGES } from '../../data/languages';

const appData = initializeAppData();

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string): void {
  if (condition) {
    console.log(`  ✅ ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ ${testName}`);
    failed++;
  }
}

console.log('\n━━━ System Integration Test: Census Confidence Hub (Phase 5) ━━━\n');

// 1. Full Data Layer Integrity
console.log('1. Trusted Data Layer Verification');
{
  assert(appData.phase1Questions.length === 33, 'Phase 1 Houselisting has 33 verified questions');
  assert(appData.phase2Questions.length === 0, 'Phase 2 PE is empty (pending official publication)');
  assert(appData.questionnaireStatus.phase1 === 'verified', 'Phase 1 questionnaire status is verified');
  assert(appData.questionnaireStatus.phase2 === 'pending_official_publication', 'Phase 2 questionnaire status is pending');
  assert(appData.schedules.length === 36, 'All 36 States/UTs are represented');
  assert(appData.misinformationClaims.length >= 6, 'Contains 6+ verified misinformation claims');
  assert(appData.scamPatterns.length >= 6, 'Contains 6+ verified scam patterns');
  assert(appData.officialSources.length >= 6, 'Contains 6+ verified official sources');
}

// 2. Multilingual Foundation
console.log('\n2. Multilingual Foundation Verification');
{
  assert(appData.languages.length === 10, '10 Indian languages configured');
  const activeLangs = appData.languages.filter(l => l.isActive);
  assert(activeLangs.length === 2, '2 languages (EN, HI) active by default');
  const marathi = LANGUAGES.find(l => l.code === LanguageCode.MR);
  assert(marathi !== undefined && marathi.nativeName === 'मराठी', 'Marathi language metadata valid');
}

// 3. Scam & Misinformation Engine Pipeline
console.log('\n3. Deterministic Scam & Misinformation Engine Pipeline');
{
  const scamRes = checkScamPatterns('Officer called asking for OTP over phone', appData);
  assert(scamRes.detected === true, 'OTP phishing claim triggers scam detection');
  assert(scamRes.riskLevel === 'high', 'Risk level is HIGH');

  const misinfoRes = checkMisinformation('Will I lose my citizenship if not counted?', appData);
  assert(misinfoRes.matched === true, 'Citizenship claim matches misinformation claim');
  assert(misinfoRes.verdict === 'misinformation', 'Verdict is MISINFORMATION');
}

// 4. Evidence-Based Confidence Calculation
console.log('\n4. Deterministic Confidence Calculation');
{
  const confidence = buildConfidenceFromEvidence(
    ['Census Phase 1 runs April 1 to Sept 30 2026'],
    [appData.officialSources[0]],
    true,
    false
  );
  assert(confidence.score >= 70, `Score is >= 70 (got ${confidence.score})`);
  assert(confidence.level === 'high', `Level is HIGH (got ${confidence.level})`);
}

console.log(`\n━━━ Integration Test Results: ${passed} passed, ${failed} failed ━━━\n`);

if (failed > 0) {
  throw new Error(`${failed} test(s) failed`);
}
