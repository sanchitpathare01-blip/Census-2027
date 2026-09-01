import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import ScamAnalyzer from './ScamAnalyzer';
import { getAppData } from '../utils/data-loader';

const Stage1Safety: React.FC = () => {
  const appData = getAppData();
  const claims = appData.misinformationClaims;
  const scamPatterns = appData.scamPatterns;
  const [activeClaimIndex, setActiveClaimIndex] = useState(0);

  const currentClaim = claims[activeClaimIndex];

  return (
    <section id="stage-1" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Section Header */}
          <div className="lg:w-1/3 flex flex-col gap-4 sticky top-28">
            <span className="text-accent-blue font-bold tracking-widest text-sm uppercase">Stage 01 — Protection</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              First, let's make sure you're safe.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Before you participate, know what is genuine and what isn't. The Census never demands money, passwords, or property documents.
            </p>

            {/* Quick stats badge */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Verified Misinformation Claims:</span>
                <span className="text-emerald-400 font-bold">{claims.length} verified</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Verified Scam Indicators:</span>
                <span className="text-amber-400 font-bold">{scamPatterns.length} patterns</span>
              </div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="lg:w-2/3 w-full space-y-8">
            {/* 1. Instant Scam & Message Analyzer */}
            <ScamAnalyzer />

            {/* 2. Interactive Misinformation Fact-Checker */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 w-full space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Verified Fact vs Myth Explorer</h3>
                    <p className="text-xs text-gray-400">Fact #{activeClaimIndex + 1} of {claims.length}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveClaimIndex((prev) => (prev + 1) % claims.length)}
                  className="bg-white/5 hover:bg-white/10 text-xs text-gray-300 px-3 py-1.5 rounded-lg border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Next Claim
                </button>
              </div>

              {/* Claim vs Fact Card */}
              <div className="space-y-3 pt-2">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Common Myth / Claim</span>
                  <p className="text-sm font-semibold text-red-200 mt-1">"{currentClaim.claim}"</p>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Official Verified Fact</span>
                  <p className="text-sm font-bold text-emerald-200 mt-1">{currentClaim.officialFact}</p>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">{currentClaim.explanation}</p>
                </div>

                {currentClaim.sources.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                    <span>Source:</span>
                    {currentClaim.sources.map((s) => (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        {s.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3. Scam Patterns Grid */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 w-full space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Know the 6 Official High-Risk Scam Indicators
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scamPatterns.map((pattern) => (
                  <div key={pattern.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-amber-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-bold text-amber-300">{pattern.name}</h4>
                      <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                        {pattern.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-2">{pattern.description}</p>
                    <p className="text-[11px] text-gray-400">
                      <strong className="text-amber-400">Action:</strong> {pattern.recommendedAction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Stage1Safety;
