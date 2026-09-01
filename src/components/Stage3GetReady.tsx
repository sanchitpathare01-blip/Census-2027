import React from 'react';
import { motion } from 'framer-motion';

const Stage3GetReady: React.FC = () => {
  return (
    <section id="stage-3" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Header */}
          <div className="md:w-1/3 flex flex-col gap-4 sticky top-32">
            <span className="text-success-light font-bold tracking-widest text-sm uppercase">Stage 03</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready when you are.
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Here's exactly what to expect.
            </p>
          </div>
          
          {/* Content Area Shell */}
          <div className="md:w-2/3 w-full grid grid-cols-1 gap-6">
            {/* Empty placeholder card for Phase 3 */}
            <div className="glass-card w-full p-8 min-h-[400px] flex flex-col items-center justify-center border-dashed border-white/20">
              <p className="text-gray-500 text-sm mb-4">Checklist / Timeline placeholder (Phase 2/3)</p>
              
              <button className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors pointer-events-none opacity-50">
                Action Placeholder
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Stage3GetReady;
