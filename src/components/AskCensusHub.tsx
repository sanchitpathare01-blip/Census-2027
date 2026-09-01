import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Globe, ShieldCheck, AlertTriangle, Info, Loader2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
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
  { code: LanguageCode.KN, label: 'ಕನ್ನಡ (Kannada)' },
  { code: LanguageCode.ML, label: 'മലയാളം (Malayalam)' },
  { code: LanguageCode.PA, label: 'ਪੰਜਾਬੀ (Punjabi)' },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await askCensusHub(query.trim(), language);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const confidenceStyle = response ? CONFIDENCE_STYLES[response.confidenceLevel] ?? CONFIDENCE_STYLES['unknown'] : null;

  return (
    <section id="ask-census-hub" className="relative z-10 px-6 py-16 max-w-4xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Ask Census Hub
          </span>
        </h2>
        <p className="text-gray-400 text-lg">
          Ask any question about Census 2027 — verified information, powered by AI.
        </p>
      </motion.div>

      {/* Input Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 rounded-2xl border border-white/10 mb-6"
      >
        {/* Language selector */}
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-purple-400 shrink-0" />
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-full max-w-xs"
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
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-base"
            disabled={loading}
          />
          <button
            id="census-query-submit"
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shrink-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </motion.form>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-red-300 text-sm"
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            {error}
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
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-amber-200 text-sm">
                {response.warning}
              </div>
            )}

            {/* Main answer */}
            <div className="glass-card p-6 rounded-2xl border border-white/10">
              {/* Confidence badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-4 ${confidenceStyle.bg} ${confidenceStyle.text}`}>
                {confidenceStyle.icon}
                {confidenceStyle.label} — {response.confidenceScore}%
              </div>

              {/* Answer text */}
              <div className="text-gray-200 leading-relaxed whitespace-pre-wrap mb-4">
                {response.answer}
              </div>

              {/* Trust distinction */}
              {response.matchedFacts.length > 0 && (
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 mb-4">
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Information
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {response.matchedFacts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3 mb-4">
                <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  AI Explanation
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Gemini simplified the verified information for you. Always refer to official sources for authoritative details.
                </p>
              </div>

              {/* Sources */}
              {response.sources.length > 0 && (
                <div className="border-t border-white/5 pt-3">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Official Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {response.sources.map((source) => (
                      <a
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-md transition-colors"
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
                className="mt-4 text-xs text-gray-500 hover:text-gray-400 flex items-center gap-1 transition-colors"
              >
                {showReasoning ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {showReasoning ? 'Hide' : 'Show'} confidence reasoning
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
                      <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                        <span className="text-gray-600">•</span>
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
