export enum LanguageCode {
  EN = 'en',
  HI = 'hi',
  MR = 'mr',
  BN = 'bn',
  TA = 'ta',
  TE = 'te',
  GU = 'gu',
  KN = 'kn',
  ML = 'ml',
  PA = 'pa',
}

export enum MisinformationVerdict {
  MISINFORMATION = 'misinformation',
  PARTIALLY_TRUE = 'partially_true',
  TRUE = 'true',
  UNCLEAR = 'unclear',
}

export enum ScamRiskLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum QuestionCategory {
  HOUSEHOLD = 'household',
  DEMOGRAPHICS = 'demographics',
  OCCUPATIONAL = 'occupational',
  SOCIAL = 'social',
  SENSITIVE = 'sensitive',
}

export interface OfficialSource {
  id: string;
  name: string;
  url: string;
  description: string;
  lastVerified: string;
  category: 'government' | 'census_official' | 'ministry' | 'official_faq';
}

export interface CensusPhase {
  id: string;
  name: string;
  description: string;
  timelineStart: string | null;
  timelineEnd: string | null;
  activities: string[];
  dataCollected: string[];
  purpose: string;
  plainLanguageExplanation: string;
  officialSource: OfficialSource;
}

export interface StateSchedule {
  state: string;
  statecode: string;
  selfEnumerationStart: string | null;
  selfEnumerationEnd: string | null;
  houseListingStart: string | null;
  houseListingEnd: string | null;
  populationEnumerationDate: string | null;
  notes?: string;
  officialSource: OfficialSource;
}

export type CensusQuestionPhase =
  | 'phase_1_houselisting'
  | 'phase_2_population';

export type QuestionnairePhaseStatus = 'verified' | 'pending_official_publication';

export interface QuestionnaireStatus {
  phase1: QuestionnairePhaseStatus;
  phase2: QuestionnairePhaseStatus;
}

export interface CensusQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  phase: CensusQuestionPhase;
  category: QuestionCategory;
  isSensitive: boolean;
  explanation?: string;
  examples?: string[];
  dataProtectionNote?: string;
  officialSource: OfficialSource;
}

export interface PrivacyFact {
  id: string;
  title: string;
  category: 'what_collected' | 'protection' | 'access' | 'legal';
  content: string;
  plainLanguageExplanation: string;
  legalBasis?: string;
  officialSource: OfficialSource;
}

export interface MisinformationClaim {
  id: string;
  claim: string;
  verdict: MisinformationVerdict;
  officialFact: string;
  explanation: string;
  sources: OfficialSource[];
  relatedQuestions?: string[];
}

export interface ScamPattern {
  id: string;
  name: string;
  description: string;
  indicators: string[];
  riskLevel: ScamRiskLevel;
  recommendedAction: string;
  reportingChannel: string;
  example?: string;
}

export interface SupportedLanguage {
  code: LanguageCode;
  englishName: string;
  nativeName: string;
  nativeNameDevanagari?: string;
  isRTL: boolean;
  isActive: boolean;
  fallbackLanguage: LanguageCode;
}

export interface Translations {
  [key: string]: {
    [lang in LanguageCode]?: string;
  };
}

export interface AppData {
  phases: CensusPhase[];
  schedules: StateSchedule[];
  phase1Questions: CensusQuestion[];
  phase2Questions: CensusQuestion[];
  allQuestions: CensusQuestion[];
  questionnaireStatus: QuestionnaireStatus;
  privacyFacts: PrivacyFact[];
  misinformationClaims: MisinformationClaim[];
  scamPatterns: ScamPattern[];
  officialSources: OfficialSource[];
  languages: SupportedLanguage[];
  lastUpdated: string;
}
