import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Lock, Scale } from 'lucide-react';
import QuestionExplorer from './QuestionExplorer';
import { getAppData } from '../utils/data-loader';

const Stage2Understand: React.FC = () => {
  const appData = getAppData();
  const privacyFacts = appData.privacyFacts;
  const phases = appData.phases;

  return (
    <section id="stage-2" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-start">
          {/* Section Header */}
          <div className="lg:w-1/3 flex flex-col gap-4 sticky top-28">
            <span className="text-tertiary-purple font-bold tracking-widest text-sm uppercase">Stage 02 — Awareness</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Know what you're participating in.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Here's what Census 2027 actually is: a 2-phase national exercise to assess housing conditions and demographic structure.
            </p>

            {/* Quick Summary Pill */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>Legal Framework: Census Act, 1948</span>
              </div>
              <p className="text-xs text-gray-300">
                Your individual data is protected by federal law and cannot be shared with tax authorities or used in court.
              </p>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="lg:w-2/3 w-full space-y-8">
            {/* 1. Two-Phase Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phases.map((phase, idx) => (
                <div key={phase.id} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                        Phase 0{idx + 1}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        {phase.timelineStart ?? 'TBD'} – {phase.timelineEnd ?? 'TBD'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{phase.name}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed mb-3">{phase.plainLanguageExplanation}</p>
                  </div>

                  <div className="border-t border-white/5 pt-3 mt-2">
                    <span className="text-[11px] text-gray-400 font-semibold block mb-1">Key Data Collected:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.dataCollected.slice(0, 3).map((item, i) => (
                        <span key={i} className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/10">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Privacy & Legal Guarantees */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Your Legal Privacy Protections</h3>
                  <p className="text-xs text-gray-400">Protected under Section 15 of the Census Act, 1948</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {privacyFacts.map((pf) => (
                  <div key={pf.id} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-purple-300 text-xs font-bold">
                      {pf.category === 'legal' ? <Scale className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      {pf.title}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{pf.plainLanguageExplanation}</p>
                    {pf.legalBasis && (
                      <span className="text-[10px] text-purple-400 font-mono block pt-1">{pf.legalBasis}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Interactive Question Explorer */}
            <QuestionExplorer />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Stage2Understand;
