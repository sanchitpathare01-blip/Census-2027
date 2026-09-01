import { MisinformationVerdict } from '../data/types';
import type { AppData } from '../data/types';
import type { MisinformationResult, ScamDetectionResult } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Misinformation detection — checks against Phase 2 verified claims FIRST
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compares the user's claim against the trusted misinformation knowledge base.
 * If a match is found, returns the verified verdict with official sources.
 * If no match, returns UNCLEAR — never auto-labels without evidence.
 */
export function checkMisinformation(
  userClaim: string,
  appData: AppData
): MisinformationResult {
  const normalised = userClaim.toLowerCase().trim();

  for (const claim of appData.misinformationClaims) {
    // Extract keywords from the known claim
    const claimWords = extractKeywords(claim.claim);
    const matchCount = claimWords.filter(w => normalised.includes(w)).length;
    const matchRatio = claimWords.length > 0 ? matchCount / claimWords.length : 0;

    if (matchRatio >= 0.4) {
      return {
        matched: true,
        claimId: claim.id,
        verdict: claim.verdict,
        officialFact: claim.officialFact,
        explanation: claim.explanation,
        sources: claim.sources,
      };
    }
  }

  // No reliable match — mark UNCLEAR
  return {
    matched: false,
    claimId: null,
    verdict: MisinformationVerdict.UNCLEAR,
    officialFact: null,
    explanation: null,
    sources: [],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Scam detection — checks against Phase 2 verified scam patterns
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scans user-provided text for known scam indicators from trusted data.
 * Only uses reporting channels stored in Phase 2 data — never invents them.
 */
export function checkScamPatterns(
  userText: string,
  appData: AppData
): ScamDetectionResult {
  const normalised = userText.toLowerCase().trim();
  let bestMatch: ScamDetectionResult | null = null;
  let bestIndicatorCount = 0;

  for (const pattern of appData.scamPatterns) {
    const matchedIndicators: string[] = [];

    for (const indicator of pattern.indicators) {
      const indicatorWords = extractKeywords(indicator);
      const hits = indicatorWords.filter(w => normalised.includes(w)).length;
      if (indicatorWords.length > 0 && hits / indicatorWords.length >= 0.3) {
        matchedIndicators.push(indicator);
      }
    }

    if (matchedIndicators.length > bestIndicatorCount) {
      bestIndicatorCount = matchedIndicators.length;
      bestMatch = {
        detected: true,
        patternId: pattern.id,
        patternName: pattern.name,
        riskLevel: pattern.riskLevel,
        matchedIndicators,
        recommendedAction: pattern.recommendedAction,
        reportingChannel: pattern.reportingChannel,
      };
    }
  }

  if (bestMatch && bestIndicatorCount > 0) {
    return bestMatch;
  }

  return {
    detected: false,
    patternId: null,
    patternName: null,
    riskLevel: null,
    matchedIndicators: [],
    recommendedAction: null,
    reportingChannel: null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
  'shall', 'would', 'should', 'may', 'might', 'can', 'could',
  'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from',
  'as', 'into', 'through', 'during', 'before', 'after', 'above',
  'below', 'between', 'out', 'off', 'up', 'down', 'and', 'but',
  'or', 'nor', 'not', 'no', 'so', 'if', 'than', 'that', 'this',
  'it', 'its', 'my', 'me', 'i', 'you', 'your', 'we', 'our',
  'they', 'them', 'their', 'he', 'she', 'him', 'her',
]);

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
}
