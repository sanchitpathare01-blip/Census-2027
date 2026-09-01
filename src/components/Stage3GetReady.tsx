import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import ScheduleLookup from './ScheduleLookup';

const Stage3GetReady: React.FC = () => {
  return (
    <section id="stage-3" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center">
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
            <span className="text-success-light font-bold tracking-widest text-sm uppercase">Stage 03 — Readiness</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready when you are.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Here's exactly what to expect when Census 2027 begins in your area. Choose whether to self-enumerate online or welcome an enumerator.
            </p>

            {/* Quick Readiness Card */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Participation Guarantee
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Participation is completely FREE. No enumerator will ask for cash, bank PINs, or original property deeds.
              </p>
              <a
                href="#ask-census-hub"
                className="text-xs text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Have a question? Ask AI Assistant →
              </a>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="lg:w-2/3 w-full space-y-8">
            {/* 1. Interactive Schedule & Portal Lookup */}
            <ScheduleLookup />

            {/* 2. Enumerator Visit Expectations */}
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                What to Expect During a Door-to-Door Enumerator Visit
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400">1. Verify Official ID</span>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Always ask the enumerator to present their official Census ID card before answering questions.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400">2. Share SE ID (if done online)</span>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    If you completed self-enumeration online, simply share your unique SE ID. No further questions needed.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400">3. Answer Basic Questions</span>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    If answering at home, respond to the 33 Houselisting questions regarding structure and amenities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Stage3GetReady;
