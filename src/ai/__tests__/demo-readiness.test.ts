/**
 * demo-readiness.test.ts — Phase 4 test suite for UI data bindings and demo readiness.
 *
 * Run with: npx tsx src/ai/__tests__/demo-readiness.test.ts
 */

import { initializeAppData } from '../../utils/data-loader';

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

console.log('\n━━━ Test Suite: Census Confidence Hub — Phase 4 Demo Readiness ━━━\n');

// 1. Questionnaire count verification
console.log('Test 1: Questionnaire Explorer bindings');
{
  assert(appData.phase1Questions.length === 33, 'Phase 1 questions array has exactly 33 items');
  assert(appData.phase2Questions.length === 0, 'Phase 2 questions array is empty (pending official publication)');
}

// 2. Schedule lookup verification
console.log('\nTest 2: State/UT Schedule Lookup bindings');
{
  assert(appData.schedules.length === 36, 'All 36 States/UTs are loaded in schedules');
  const delhi = appData.schedules.find(s => s.statecode === 'DL');
  assert(delhi !== undefined, 'Delhi schedule entry exists');
  assert(delhi?.houseListingStart === '2026-04-01', 'National Phase 1 start date bound');
}

// 3. Misinformation claim count
console.log('\nTest 3: Misinformation Fact Cards bindings');
{
  assert(appData.misinformationClaims.length >= 6, 'Contains at least 6 verified misinformation claims');
}

// 4. Scam patterns count
console.log('\nTest 4: Scam Pattern Grid bindings');
{
  assert(appData.scamPatterns.length >= 6, 'Contains at least 6 verified scam patterns');
}

// 5. Official sources count
console.log('\nTest 5: Official Sources bindings');
{
  assert(appData.officialSources.length >= 6, 'Contains at least 6 official sources');
}

console.log(`\n━━━ Results: ${passed} passed, ${failed} failed ━━━\n`);

if (failed > 0) {
  throw new Error(`${failed} test(s) failed`);
}
