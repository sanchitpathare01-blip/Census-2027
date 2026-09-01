/**
 * engines.test.ts — Phase 3 test suite for confidence, misinformation, and scam engines.
 *
 * These tests validate deterministic logic only (no Gemini calls).
 * Run with: npx tsx src/ai/__tests__/engines.test.ts
 */

import { computeConfidence, buildConfidenceFromEvidence } from '../confidence-engine';
import { checkMisinformation, checkScamPatterns } from '../misinformation-engine';
import { initializeAppData } from '../../utils/data-loader';
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

console.log('\n━━━ Test Suite: Census Confidence Hub — Phase 3 Engines ━━━\n');

// ─────────────────────────────────────────────────────────────────────────────
// 1. Exact trusted-data question → HIGH confidence
// ─────────────────────────────────────────────────────────────────────────────
console.log('Test 1: Exact trusted-data question → HIGH confidence');
{
  const result = buildConfidenceFromEvidence(
    ['Census Phase 1 runs from April 1 2026 to September 30 2026'],
    [appData.officialSources[0]],
    true,
    false
  );
  assert(result.level === 'high', 'Confidence level is HIGH');
  assert(result.score >= 70, `Score >= 70 (got ${result.score})`);
  assert(result.matchedOfficialData === true, 'matchedOfficialData is true');
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Unsupported question → UNKNOWN
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest 2: Unsupported question → low/unknown confidence');
{
  const result = buildConfidenceFromEvidence([], [], false, true);
  assert(result.level === 'unknown' || result.level === 'low', `Level is unknown or low (got ${result.level})`);
  assert(result.score < 40, `Score < 40 (got ${result.score})`);
  assert(result.matchedOfficialData === false, 'matchedOfficialData is false');
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Misinformation claim → correct verdict
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest 3: Known misinformation claim → MISINFORMATION verdict');
{
  const result = checkMisinformation('Census officials will ask for my bank account details and PIN', appData);
  assert(result.matched === true, 'Matched a known claim');
  assert(result.verdict === 'misinformation', `Verdict is MISINFORMATION (got ${result.verdict})`);
  assert(result.officialFact !== null, 'Official fact is provided');
  assert(result.sources.length > 0, 'Sources are provided');
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Scam claim → correct risk level
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest 4: Scam indicator detection (OTP phishing)');
{
  const result = checkScamPatterns('Someone called me asking for OTP and threatening exclusion', appData);
  assert(result.detected === true, 'Scam pattern detected');
  assert(result.riskLevel === 'high', `Risk level is HIGH (got ${result.riskLevel})`);
  assert(result.matchedIndicators.length > 0, `Matched indicators: ${result.matchedIndicators.length}`);
  assert(result.recommendedAction !== null, 'Recommended action is provided');
  assert(result.reportingChannel !== null, 'Reporting channel is provided');
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Hindi language configured
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest 5: Hindi language is configured and active');
{
  const hi = LANGUAGES.find(l => l.code === LanguageCode.HI);
  assert(hi !== undefined, 'Hindi language exists');
  assert(hi?.isActive === true, 'Hindi is active');
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Marathi language configured
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest 6: Marathi language is configured');
{
  const mr = LANGUAGES.find(l => l.code === LanguageCode.MR);
  assert(mr !== undefined, 'Marathi language exists');
  assert(mr?.nativeName === 'मराठी', 'Marathi native name is correct');
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Tamil language configured
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest 7: Tamil language is configured');
{
  const ta = LANGUAGES.find(l => l.code === LanguageCode.TA);
  assert(ta !== undefined, 'Tamil language exists');
  assert(ta?.nativeName === 'தமிழ்', 'Tamil native name is correct');
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Gemini unavailable → graceful fallback (deterministic part)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest 8: Confidence engine works without Gemini');
{
  // When Gemini is down, we still compute confidence from matched data
  const misinfoResult = checkMisinformation('I will lose my citizenship if not counted', appData);
  const facts = misinfoResult.officialFact ? [misinfoResult.officialFact] : [];
  const confidence = buildConfidenceFromEvidence(facts, misinfoResult.sources, misinfoResult.matched, false);
  assert(confidence.score > 0, `Confidence score > 0 even without Gemini (got ${confidence.score})`);
  assert(confidence.reasons.length > 0, 'Reasoning provided');
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. Invalid / empty matched facts → appropriate handling
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest 9: Empty matched facts handled gracefully');
{
  const result = computeConfidence({
    matchedOfficialData: false,
    sourceCount: 0,
    directlySupported: false,
    hasConflictingInfo: false,
    isOutsideKnowledgeBase: true,
    matchedFacts: [],
  });
  assert(result.score === 0, `Score is 0 for no evidence (got ${result.score})`);
  assert(result.level === 'unknown', `Level is unknown (got ${result.level})`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. Unknown claim → UNCLEAR verdict (not auto-labelled)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nTest 10: Unknown claim → UNCLEAR verdict (no auto-labelling)');
{
  const result = checkMisinformation('Aliens built the Census website', appData);
  assert(result.matched === false, 'No match found');
  assert(result.verdict === 'unclear', `Verdict is UNCLEAR (got ${result.verdict})`);
  assert(result.sources.length === 0, 'No sources for unmatched claim');
}

// ─────────────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────────────
console.log(`\n━━━ Results: ${passed} passed, ${failed} failed ━━━\n`);

if (failed > 0) {
  throw new Error(`${failed} test(s) failed`);
}
