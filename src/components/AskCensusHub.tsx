import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Globe, ShieldCheck, AlertTriangle, Info, Loader2, ExternalLink, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { askCensusHub } from '../ai/gemini-client';
import type { AIResponse } from '../ai/types';
import { LanguageCode } from '../data/types';

const LANGUAGE_OPTIONS: { code: string; label: string }[] = [
  { code: LanguageCode.EN, label: 'English' },
  { code: LanguageCode.HI, label: 'हिन्दी (Hindi)' },
  { code: LanguageCode.MR, label: 'मराठी (Marathi)' },
  { code: LanguageCode.BN, label: 'বাংলা (Bengali)' },
  { code: LanguageCode.TA, label: 'தமிழ் (Tamil)' },
  { code: LanguageCode.TE, label: 'తెలుగు (Telugu)' },
  { code: LanguageCode.GU, label: 'ગુજરાતી (Gujarati)' },
  { code: LanguageCode.KN, label: '<ctrl42>ಕನ್ನಡ (Kannada)' },
  { code: LanguageCode.ML, label: 'മലയാളം (Malayalam)' },
  { code: LanguageCode.PA, label: 'ਪੰਜਾਬੀ (Punjabi)' },
];

const SAMPLE_DEMO_PROMPTS = [
  'Does an enumerator ask for OTP over phone?',
  'What are the 33 house listing questions?',
  'Is Census registration completely free?',
  'Will tax department get my Census data?'
];

const CONFIDENCE_STYLES: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
  high: { bg: 'bg-emerald-500/20 border-emerald-500/40', text: 'text-emerald-400', icon: <ShieldCheck className="w-4 h-4" />, label: 'High Confidence' },
  medium: { bg: 'bg-amber-500/20 border-amber-500/40', text: 'text-amber-400', icon: <Info className="w-4 h-4" />, label: 'Medium Confidence' },
  low: { bg: 'bg-orange-500/20 border-orange-500/40', text: 'text-orange-400', icon: <AlertTriangle className="w-4 h-4" />, label: 'Low Confidence' },
  unknown: { bg: 'bg-gray-500/20 border-gray-500/40', text: 'text-gray-400', icon: <Info className="w-4 h-4" />, label: 'Unverified' },
};

const AskCensusHub: React.FC = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState(LanguageCode.EN as string);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);

  const executeQuery = async (userQuery: string) => {
    if (!userQuery.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await askCensusHub(userQuery.trim(), language);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeQuery(query);
  };

  const handleChipClick = (prompt: string) => {
    setQuery(prompt);
    executeQuery(prompt);
  };

  const confidenceStyle = response ? CONFIDENCE_STYLES[response.confidenceLevel] ?? CONFIDENCE_STYLES['unknown'] : null;

  return (
    <section id="ask-census-hub" className="relative z-10 px-4 sm:px-6 py-16 max-w-4xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full text-xs text-purple-300 font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> GenAI Powered Trust Engine
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ask Census Hub AI Assistant
          </span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
          Ask any question about Census 2027 in your preferred language — verified answers backed by deterministic evidence.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 rounded-2xl border border-white/10 mb-6 space-y-4"
      >
        {/* Language selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Globe className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Select Response Language:</span>
          </div>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.code} value={opt.code} className="bg-gray-900">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Query input */}
        <div className="flex gap-3">
          <input
            id="census-query-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. What questions will they ask during house listing?"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
            disabled={loading}
          />
          <button
            id="census-query-submit"
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition-all flex items-center gap-2 shrink-0 font-medium text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Ask AI
          </button>
        </div>

        {/* Demo prompt chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-gray-500 font-medium">Quick Demo Prompts:</span>
          {SAMPLE_DEMO_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipClick(prompt)}
              className="text-[11px] bg-white/5 hover:bg-white/10 text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/40 px-2.5 py-1 rounded-lg transition-all"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </motion.form>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-red-300 text-xs space-y-2"
          >
            <div className="flex items-center gap-2 font-bold text-red-400">
              <AlertTriangle className="w-4 h-4" /> API Service Offline or Unreachable
            </div>
            <p>{error}</p>
            <p className="text-gray-400 text-[11px]">
              Note for Hackathon Demo: Make sure <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">npm run server</code> is running in your terminal to enable Gemini API proxy responses. All verified Phase 2 data cards above remain fully functional.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response */}
      <AnimatePresence>
        {response && confidenceStyle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Warning banner */}
            {response.warning && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-amber-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{response.warning}</span>
              </div>
            )}

            {/* Main answer */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
              {/* Confidence badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${confidenceStyle.bg} ${confidenceStyle.text}`}>
                {confidenceStyle.icon}
                {confidenceStyle.label} — {response.confidenceScore}% (Calculated by App Evidence)
              </div>

              {/* Answer text */}
              <div className="text-gray-200 leading-relaxed text-sm whitespace-pre-wrap">
                {response.answer}
              </div>

              {/* Trust distinction */}
              {response.matchedFacts.length > 0 && (
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3.5 space-y-2">
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Information (Source of Truth)
                  </p>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {response.matchedFacts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
                <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  AI Explanation
                </p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  Gemini simplified the verified information for you. Official sources are cited below for legal authority.
                </p>
              </div>

              {/* Sources */}
              {response.sources.length > 0 && (
                <div className="border-t border-white/5 pt-3">
                  <p className="text-gray-500 text-[11px] uppercase tracking-wider mb-2">Official Verified Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {response.sources.map((source) => (
                      <a
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md transition-colors"
                      >
                        {source.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Reasoning toggle */}
              <button
                onClick={() => setShowReasoning(!showReasoning)}
                className="mt-2 text-xs text-gray-500 hover:text-gray-400 flex items-center gap-1 transition-colors"
              >
                {showReasoning ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {showReasoning ? 'Hide' : 'Show'} confidence calculation reasoning
              </button>

              <AnimatePresence>
                {showReasoning && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-1 overflow-hidden"
                  >
                    {response.reasoning.map((reason, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-gray-500">•</span>
                        {reason}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AskCensusHub;
