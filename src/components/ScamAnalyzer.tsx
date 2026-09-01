import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { checkScamPatterns, checkMisinformation } from '../ai/misinformation-engine';
import { getAppData } from '../utils/data-loader';

const ScamAnalyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const appData = getAppData();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setAnalyzed(true);
  };

  const scamResult = checkScamPatterns(input, appData);
  const misinfoResult = checkMisinformation(input, appData);

  const sampleInputs = [
    'Officer asked for my OTP over phone',
    'Do I need to pay cash to enumerator?',
    'Will I lose citizenship if not in Census?',
    'Received SMS link to complete census'
  ];

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Instant Message & Scam Detector</h3>
          <p className="text-sm text-gray-400">Paste any text, message, or phone claim to check against verified scam patterns</p>
        </div>
      </div>

      <form onSubmit={handleCheck} className="space-y-4 mb-6">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setAnalyzed(false); }}
            placeholder="Paste suspicious SMS, WhatsApp message, or description (e.g., 'Officer called asking for OTP')..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm min-h-[100px] resize-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-400">Try sample:</span>
            {sampleInputs.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { setInput(sample); setAnalyzed(true); }}
                className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-2.5 py-1 rounded-md border border-white/10 transition-colors"
              >
                "{sample}"
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-40 text-white font-medium px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm ml-auto"
          >
            <Search className="w-4 h-4" />
            Analyze Claim
          </button>
        </div>
      </form>

      <AnimatePresence>
        {analyzed && input.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 pt-4 border-t border-white/10"
          >
            {/* Scam Pattern Result */}
            {scamResult.detected ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  HIGH RISK — Verified Scam Pattern Detected: {scamResult.patternName}
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  <strong className="text-white">Recommended Action:</strong> {scamResult.recommendedAction}
                </p>
                <div className="bg-black/30 rounded-lg p-3 text-xs text-gray-300">
                  <strong className="text-red-300">Official Reporting Channel:</strong> {scamResult.reportingChannel}
                </div>
              </div>
            ) : misinfoResult.matched ? (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                  <Info className="w-5 h-5" />
                  Misinformation Alert — {misinfoResult.verdict?.toUpperCase()}
                </div>
                <p className="text-sm text-white font-semibold mb-2">
                  Official Fact: {misinfoResult.officialFact}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  {misinfoResult.explanation}
                </p>
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 mb-1">No Known Scam Pattern Matched</h4>
                  <p className="text-xs text-gray-300">
                    This message does not trigger any of our known high-risk scam indicators. Remember: Official Census enumerators will NEVER ask for money, bank details, or OTPs.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScamAnalyzer;
