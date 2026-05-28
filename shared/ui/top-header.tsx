'use client';

import React from 'react';
import { motion } from 'motion/react';

interface TopHeaderProps {
  className?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ className = '' }) => {
  return (
    <header 
      className={`w-full h-[60px] md:h-[80px] bg-[#34C759] shrink-0 rounded-b-[2rem] md:rounded-b-[2.5rem] shadow-sm top-0 sticky z-20 ${className}`}
      aria-label="Top Header"
    >
      <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen overflow-hidden rounded-b-[2rem] md:rounded-b-[2.5rem]">
        {/* Floating circles */}
        <motion.div
           className="absolute w-8 h-8 rounded-full bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
           animate={{
             x: [0, 80, 0],
             y: [0, -15, 0],
             scale: [1, 1.1, 1],
           }}
           transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
           style={{ top: '15%', left: '8%' }}
        />
        <motion.div
           className="absolute w-12 h-12 rounded-full bg-white/30 blur-[2px]"
           animate={{
             x: [0, -40, 0],
             y: [0, 15, 0],
             scale: [1, 1.3, 1],
           }}
           transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
           style={{ top: '25%', right: '15%' }}
        />
        <motion.div
           className="absolute w-6 h-6 rounded-full bg-[#FFD700]/70 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
           animate={{
             x: [0, 30, -15, 0],
             y: [0, -5, 10, 0],
           }}
           transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
           style={{ bottom: '15%', left: '35%' }}
        />
        
        {/* Golden stars */}
         <motion.div
           className="absolute text-[#FFD700] text-[22px] drop-shadow-[0_0_8px_rgba(255,215,0,1)]"
           animate={{
             rotate: [0, 180, 360],
             scale: [1, 1.3, 1],
             opacity: [0.6, 1, 0.6]
           }}
           transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
           style={{ top: '15%', right: '8%' }}
        >
          ✦
        </motion.div>
         <motion.div
           className="absolute text-[#FFD700] text-[16px] drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]"
           animate={{
             rotate: [360, 180, 0],
             scale: [0.8, 1.2, 0.8],
             opacity: [0.4, 0.9, 0.4]
           }}
           transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
           style={{ bottom: '30%', left: '18%' }}
        >
          ✦
        </motion.div>
        <motion.div
           className="absolute text-[#FFD700] text-[26px] drop-shadow-[0_0_12px_rgba(255,215,0,0.9)]"
           animate={{
             rotate: [0, -180, -360],
             scale: [0.8, 1.1, 0.8],
             opacity: [0.5, 0.9, 0.5]
           }}
           transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
           style={{ top: '8%', left: '55%' }}
        >
          ✦
        </motion.div>
      </div>
    </header>
  );
};
