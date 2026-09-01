/**
 * gemini-service.ts — Server-side only.
 *
 * Initialises the Gemini model, builds trusted context from Phase 2 data,
 * and returns a structured AIResponse. Called exclusively from server/api.ts.
 *
 * NEVER import this file in client/browser code.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AppData, OfficialSource } from '../data/types';
import type { AIResponse, UserIntent } from './types';
import { SYSTEM_INSTRUCTION, buildUserPrompt } from './gemini-prompts';
import { checkMisinformation, checkScamPatterns } from './misinformation-engine';
import { buildConfidenceFromEvidence } from './confidence-engine';

// ─────────────────────────────────────────────────────────────────────────────
// Intent detection — lightweight keyword heuristic
// ─────────────────────────────────────────────────────────────────────────────

const SCAM_KEYWORDS = ['scam', 'fraud', 'fake', 'otp', 'phishing', 'money', 'payment', 'pay', 'fee', 'suspicious', 'called me', 'asking for'];
const MISINFO_KEYWORDS = ['true', 'false', 'real', 'myth', 'rumour', 'rumor', 'claim', 'heard that', 'is it true', 'will i lose', 'citizenship'];

function detectIntent(query: string): UserIntent {
  const q = query.toLowerCase();
  const scamHits = SCAM_KEYWORDS.filter(k => q.includes(k)).length;
  const misinfoHits = MISINFO_KEYWORDS.filter(k => q.includes(k)).length;

  if (scamHits >= 2) return 'scam_check' as UserIntent;
  if (misinfoHits >= 2) return 'misinformation_check' as UserIntent;
  if (q.includes('explain') || q.includes('what is') || q.includes('what does') || q.includes('tell me about')) return 'explanation' as UserIntent;
  if (q.includes('?')) return 'question' as UserIntent;
  return 'general' as UserIntent;
}

// ─────────────────────────────────────────────────────────────────────────────
// Trusted context builder — selects relevant Phase 2 data for the prompt
// ─────────────────────────────────────────────────────────────────────────────

function buildTrustedContext(query: string, intent: UserIntent, appData: AppData): { context: string; sources: OfficialSource[]; matchedOfficialData: boolean } {
  const parts: string[] = [];
  const sources: OfficialSource[] = [];
  let matchedOfficialData = false;
  const q = query.toLowerCase();

  // Always include Census phase info
  for (const phase of appData.phases) {
    parts.push(`Census Phase: ${phase.name}\nTimeline: ${phase.timelineStart ?? 'TBD'} to ${phase.timelineEnd ?? 'TBD'}\nPurpose: ${phase.purpose}\nExplanation: ${phase.plainLanguageExplanation}`);
    if (!sources.find(s => s.id === phase.officialSource.id)) {
      sources.push(phase.officialSource);
    }
  }

  // Privacy facts
  if (q.includes('privacy') || q.includes('confidential') || q.includes('secret') || q.includes('data') || q.includes('safe')) {
    for (const pf of appData.privacyFacts) {
      parts.push(`Privacy Fact: ${pf.title}\n${pf.content}\nPlain language: ${pf.plainLanguageExplanation}${pf.legalBasis ? `\nLegal basis: ${pf.legalBasis}` : ''}`);
      if (!sources.find(s => s.id === pf.officialSource.id)) {
        sources.push(pf.officialSource);
      }
      matchedOfficialData = true;
    }
  }

  // Questions about the questionnaire
  if (q.includes('question') || q.includes('ask') || q.includes('what will') || q.includes('questionnaire') || q.includes('house listing') || q.includes('houselisting')) {
    parts.push(`Phase 1 Houselisting Questionnaire has ${appData.phase1Questions.length} official questions:`);
    for (const question of appData.phase1Questions) {
      parts.push(`  Q${question.questionNumber}: ${question.questionText}`);
    }
    parts.push(`Phase 2 Population Enumeration: ${appData.phase2Questions.length > 0 ? `${appData.phase2Questions.length} questions` : 'Official questionnaire pending publication.'}`);
    matchedOfficialData = true;
    const qSource = appData.phase1Questions[0]?.officialSource;
    if (qSource && !sources.find(s => s.id === qSource.id)) {
      sources.push(qSource);
    }
  }

  // Schedule info
  if (q.includes('schedule') || q.includes('date') || q.includes('when') || q.includes('state') || q.includes('start')) {
    parts.push(`National Phase 1 (Houselisting) window: April 1 2026 to September 30 2026`);
    parts.push(`National Phase 2 (Population Enumeration): February 2027`);
    parts.push(`Each state is allotted a 30-day window within the Phase 1 period.`);
    parts.push(`Snow-bound areas (parts of J&K, Ladakh, HP, Uttarakhand): Population Enumeration in September 2026.`);
    matchedOfficialData = true;
  }

  // Misinformation context for misinfo intents
  if (intent === 'misinformation_check' as UserIntent) {
    const misinfoResult = checkMisinformation(query, appData);
    if (misinfoResult.matched) {
      parts.push(`VERIFIED MISINFORMATION RECORD:\nClaim: "${appData.misinformationClaims.find(c => c.id === misinfoResult.claimId)?.claim}"\nVerdict: ${misinfoResult.verdict}\nOfficial Fact: ${misinfoResult.officialFact}\nExplanation: ${misinfoResult.explanation}`);
      for (const s of misinfoResult.sources) {
        if (!sources.find(existing => existing.id === s.id)) sources.push(s);
      }
      matchedOfficialData = true;
    }
  }

  // Scam context for scam intents
  if (intent === 'scam_check' as UserIntent) {
    const scamResult = checkScamPatterns(query, appData);
    if (scamResult.detected) {
      parts.push(`VERIFIED SCAM PATTERN:\nPattern: ${scamResult.patternName}\nRisk Level: ${scamResult.riskLevel}\nMatched Indicators: ${scamResult.matchedIndicators.join(', ')}\nRecommended Action: ${scamResult.recommendedAction}\nReporting Channel: ${scamResult.reportingChannel}`);
      matchedOfficialData = true;
    }
  }

  // Self-enumeration
  if (q.includes('self') || q.includes('online') || q.includes('portal') || q.includes('digital')) {
    const seSource = appData.officialSources.find(s => s.id === 'census-se-portal');
    if (seSource) {
      parts.push(`Self-Enumeration Portal: ${seSource.url}\n${seSource.description}`);
      if (!sources.find(s => s.id === seSource.id)) sources.push(seSource);
      matchedOfficialData = true;
    }
  }

  return {
    context: parts.join('\n\n'),
    sources,
    matchedOfficialData,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main service function
// ─────────────────────────────────────────────────────────────────────────────

export async function askGemini(
  query: string,
  language: string,
  appData: AppData,
  apiKey: string
): Promise<AIResponse> {
  const intent = detectIntent(query);

  // 1. Build trusted context from Phase 2 data
  const { context, sources, matchedOfficialData } = buildTrustedContext(query, intent, appData);

  // 2. Check misinformation / scam patterns deterministically
  const misinfoResult = checkMisinformation(query, appData);
  const scamResult = checkScamPatterns(query, appData);

  // 3. Build prompt
  const userPrompt = buildUserPrompt(query, language, context, sources);

  // 4. Call Gemini
  let geminiAnswer: string;
  let geminiMatchedFacts: string[] = [];
  let geminiWarning: string | undefined;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const result = await model.generateContent(userPrompt);
    const rawText = result.response.text();

    // Parse JSON from response
    const parsed = parseGeminiResponse(rawText);
    geminiAnswer = parsed.answer;
    geminiMatchedFacts = parsed.matchedFacts;
    geminiWarning = parsed.warning ?? undefined;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';

    // Graceful fallback — return trusted data without Gemini explanation
    return buildFallbackResponse(query, misinfoResult, scamResult, sources, errMsg);
  }

  // 5. Build warning from deterministic checks
  let warning = geminiWarning;
  if (misinfoResult.matched) {
    warning = `⚠️ Misinformation detected: ${misinfoResult.officialFact}`;
  }
  if (scamResult.detected) {
    warning = `🚨 Scam pattern detected: ${scamResult.patternName}. ${scamResult.recommendedAction}`;
  }

  // 6. Compute confidence deterministically
  const allMatchedFacts = [...geminiMatchedFacts];
  if (misinfoResult.matched && misinfoResult.officialFact) {
    allMatchedFacts.push(misinfoResult.officialFact);
  }

  const isOutside = !matchedOfficialData && !misinfoResult.matched && !scamResult.detected;
  const confidence = buildConfidenceFromEvidence(allMatchedFacts, sources, matchedOfficialData || misinfoResult.matched || scamResult.detected, isOutside);

  return {
    answer: geminiAnswer,
    confidenceScore: confidence.score,
    confidenceLevel: confidence.level,
    reasoning: confidence.reasons,
    sources,
    matchedFacts: allMatchedFacts,
    warning,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Response parser — extracts JSON from Gemini's text output
// ─────────────────────────────────────────────────────────────────────────────

interface GeminiParsedResponse {
  answer: string;
  matchedFacts: string[];
  warning: string | null;
}

function parseGeminiResponse(raw: string): GeminiParsedResponse {
  // Try to extract JSON from the response
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
      return {
        answer: typeof parsed['answer'] === 'string' ? parsed['answer'] : raw,
        matchedFacts: Array.isArray(parsed['matchedFacts']) ? (parsed['matchedFacts'] as string[]) : [],
        warning: typeof parsed['warning'] === 'string' ? parsed['warning'] : null,
      };
    } catch {
      // Fall through to plain text
    }
  }

  // Fallback: treat entire response as the answer
  return {
    answer: raw,
    matchedFacts: [],
    warning: null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallback when Gemini is unavailable
// ─────────────────────────────────────────────────────────────────────────────

function buildFallbackResponse(
  _query: string,
  misinfoResult: ReturnType<typeof checkMisinformation>,
  scamResult: ReturnType<typeof checkScamPatterns>,
  sources: OfficialSource[],
  errorMessage: string
): AIResponse {
  let answer = `The AI explanation service is temporarily unavailable (${errorMessage}). However, the trusted Census data is still accessible.`;

  if (misinfoResult.matched) {
    answer += `\n\n⚠️ Regarding your claim: This has been identified as ${misinfoResult.verdict}.\nOfficial fact: ${misinfoResult.officialFact}\n${misinfoResult.explanation}`;
  }

  if (scamResult.detected) {
    answer += `\n\n🚨 Scam pattern detected: ${scamResult.patternName}\nRisk: ${scamResult.riskLevel}\nAction: ${scamResult.recommendedAction}\nReport to: ${scamResult.reportingChannel}`;
  }

  const matchedFacts: string[] = [];
  if (misinfoResult.officialFact) matchedFacts.push(misinfoResult.officialFact);

  const confidence = buildConfidenceFromEvidence(
    matchedFacts,
    sources,
    misinfoResult.matched || scamResult.detected,
    !misinfoResult.matched && !scamResult.detected
  );

  return {
    answer,
    confidenceScore: confidence.score,
    confidenceLevel: confidence.level,
    reasoning: [...confidence.reasons, `AI service error: ${errorMessage}`],
    sources,
    matchedFacts,
    warning: 'AI explanation service is currently unavailable. Showing verified data only.',
  };
}
