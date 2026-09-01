import type { OfficialSource, MisinformationVerdict, ScamRiskLevel } from '../data/types';

// ─────────────────────────────────────────────────────────────────────────────
// Confidence
// ─────────────────────────────────────────────────────────────────────────────

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'unknown';

export interface ConfidenceResult {
  score: number;            // 0-100, deterministically computed
  level: ConfidenceLevel;
  reasons: string[];
  sourceCount: number;
  matchedOfficialData: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Intent
// ─────────────────────────────────────────────────────────────────────────────

export enum UserIntent {
  QUESTION = 'question',
  MISINFORMATION_CHECK = 'misinformation_check',
  SCAM_CHECK = 'scam_check',
  EXPLANATION = 'explanation',
  GENERAL = 'general',
}

// ─────────────────────────────────────────────────────────────────────────────
// AI Request / Response
// ─────────────────────────────────────────────────────────────────────────────

export interface AIRequestContext {
  userQuery: string;
  language: string;          // LanguageCode value
  detectedIntent: UserIntent;
  trustedContext: string;    // serialised relevant Phase 2 data
  relevantSources: OfficialSource[];
}

export interface AIResponse {
  answer: string;
  confidenceScore: number;
  confidenceLevel: ConfidenceLevel;
  reasoning: string[];
  sources: OfficialSource[];
  matchedFacts: string[];
  warning?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Misinformation result
// ─────────────────────────────────────────────────────────────────────────────

export interface MisinformationResult {
  matched: boolean;
  claimId: string | null;
  verdict: MisinformationVerdict | null;
  officialFact: string | null;
  explanation: string | null;
  sources: OfficialSource[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Scam detection result
// ─────────────────────────────────────────────────────────────────────────────

export interface ScamDetectionResult {
  detected: boolean;
  patternId: string | null;
  patternName: string | null;
  riskLevel: ScamRiskLevel | null;
  matchedIndicators: string[];
  recommendedAction: string | null;
  reportingChannel: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Server API payload shapes
// ─────────────────────────────────────────────────────────────────────────────

export interface AskRequestBody {
  query: string;
  language: string;
}

export interface AskResponseBody {
  success: boolean;
  data?: AIResponse;
  error?: string;
}
