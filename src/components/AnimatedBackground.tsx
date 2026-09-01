import React from 'react';
import { motion } from 'framer-motion';
import FaultyTerminal from './FaultyTerminal';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-navy pointer-events-none">
      
      {/* FaultyTerminal dynamic background */}
      <div className="absolute inset-0 opacity-40">
        <FaultyTerminal
          scale={2.0}
          gridMul={[3, 2]}
          digitSize={1.1}
          timeScale={0.4}
          scanlineIntensity={0.8}
          glitchAmount={1}
          flickerAmount={0.8}
          curvature={0.15}
          tint="#6c38be"
          brightness={0.3}
        />
      </div>
      
      {/* Animated glowing nodes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue rounded-full mix-blend-screen filter blur-[120px] opacity-20"
        animate={{
          x: [0, 50, -20, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tertiary-purple rounded-full mix-blend-screen filter blur-[100px] opacity-15"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
