import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-navy pointer-events-none">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          transformOrigin: 'top center'
        }}
      />
      
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
