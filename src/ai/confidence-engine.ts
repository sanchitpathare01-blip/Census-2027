import type { OfficialSource } from '../data/types';
import type { ConfidenceResult, ConfidenceLevel } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic confidence scoring
// The application computes confidence from evidence — Gemini does NOT set it.
// ─────────────────────────────────────────────────────────────────────────────

interface ConfidenceInput {
  matchedOfficialData: boolean;
  sourceCount: number;
  directlySupported: boolean;
  hasConflictingInfo: boolean;
  isOutsideKnowledgeBase: boolean;
  matchedFacts: string[];
}

export function computeConfidence(input: ConfidenceInput): ConfidenceResult {
  let score = 0;
  const reasons: string[] = [];

  // Base: matched official data (+40)
  if (input.matchedOfficialData) {
    score += 40;
    reasons.push('Answer matched official Census data.');
  }

  // Directly supported by trusted context (+30)
  if (input.directlySupported) {
    score += 30;
    reasons.push('Answer is directly supported by verified information.');
  }

  // Source availability (+5 per source, max +20)
  const sourceBonus = Math.min(input.sourceCount * 5, 20);
  score += sourceBonus;
  if (input.sourceCount > 0) {
    reasons.push(`${input.sourceCount} official source(s) available.`);
  }

  // Matched facts bonus (+2 per fact, max +10)
  const factBonus = Math.min(input.matchedFacts.length * 2, 10);
  score += factBonus;
  if (input.matchedFacts.length > 0) {
    reasons.push(`${input.matchedFacts.length} verified fact(s) referenced.`);
  }

  // Penalties
  if (input.hasConflictingInfo) {
    score = Math.max(score - 30, 0);
    reasons.push('Conflicting information detected — confidence reduced.');
  }

  if (input.isOutsideKnowledgeBase) {
    score = Math.max(score - 40, 0);
    reasons.push('Question is outside the verified Census knowledge base.');
  }

  // Clamp
  score = Math.min(Math.max(score, 0), 100);

  const level = scoreToLevel(score);

  return {
    score,
    level,
    reasons,
    sourceCount: input.sourceCount,
    matchedOfficialData: input.matchedOfficialData,
  };
}

function scoreToLevel(score: number): ConfidenceLevel {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  if (score >= 15) return 'low';
  return 'unknown';
}

/**
 * Build a ConfidenceResult from AI response data and matched sources.
 * Called after Gemini responds — uses the matched evidence, NOT Gemini's opinion.
 */
export function buildConfidenceFromEvidence(
  matchedFacts: string[],
  sources: OfficialSource[],
  matchedOfficialData: boolean,
  isOutsideKnowledgeBase: boolean
): ConfidenceResult {
  return computeConfidence({
    matchedOfficialData,
    sourceCount: sources.length,
    directlySupported: matchedOfficialData && matchedFacts.length > 0,
    hasConflictingInfo: false,
    isOutsideKnowledgeBase,
    matchedFacts,
  });
}
