import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquareWarning } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-[80vh]">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl space-y-8"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Census 2027, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-tertiary-purple">
            without the uncertainty.
          </span>
        </h1>
        
        <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Understand what's happening, protect yourself from scams, and get ready to participate with confidence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#ask-census-hub"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          >
            <span>Build My Confidence</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <a
            href="#stage-1"
            className="w-full sm:w-auto flex items-center justify-center gap-2 glass-card text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <MessageSquareWarning className="w-5 h-5 text-warning-orange" />
            <span>I just want to check a message</span>
          </a>
        </div>
      </motion.div>
      
    </section>
  );
};

export default Hero;
