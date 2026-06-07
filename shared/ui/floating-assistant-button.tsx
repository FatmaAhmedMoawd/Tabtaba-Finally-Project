'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'motion/react';

export function FloatingAssistantButton() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide the floating button on the landing page and chat page itself
  if (pathname === '/' || pathname === '/chat' || pathname === '/chat/ai') {
    return null;
  }

  // Also hide on auth, onboarding, support, and therapist pages where it might be distracting
  const hideOnPaths = [
    '/login', 
    '/register', 
    '/onboarding', 
    '/forgot-password',
    '/support',
    '/help',
    '/therapist'
  ];
  if (hideOnPaths.some(p => pathname?.startsWith(p))) {
    return null;
  }

  return (
    <motion.button
      onClick={() => router.push('/chat/ai')}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -8, 0]
      }}
      transition={{
        scale: { duration: 0.3 },
        opacity: { duration: 0.3 },
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 z-[999] w-14 h-14 rounded-full bg-[#30C45D] flex items-center justify-center shadow-[0_8px_25px_rgba(48,196,93,0.4)] border-2 border-white cursor-pointer overflow-hidden"
      aria-label="Talk to AI Assistant"
    >
      <svg viewBox="0 0 100 100" className="w-[75%] h-[75%] text-[#064E3B] fill-none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Head outline */}
        <circle cx="50" cy="53" r="30" strokeWidth="6.5" />
        
        {/* Hair bangs */}
        <path d="M22 50 C28 35, 72 35, 78 50" strokeWidth="6" />
        
        {/* Headset band */}
        <path d="M20 53 C20 23, 80 23, 80 53" strokeWidth="6.5" />
        
        {/* Headset ear cups */}
        <rect x="14" y="44" width="7" height="18" rx="3.5" fill="currentColor" stroke="none" />
        <rect x="79" y="44" width="7" height="18" rx="3.5" fill="currentColor" stroke="none" />
        
        {/* Eyes */}
        <circle cx="38" cy="55" r="4.5" fill="currentColor" stroke="none" />
        <circle cx="62" cy="55" r="4.5" fill="currentColor" stroke="none" />
        
        {/* Smile */}
        <path d="M44 68 C47 72, 53 72, 56 68" strokeWidth="6" />
        
        {/* Microphone boom arm */}
        <path d="M18 60 Q26 76 46 72" strokeWidth="5.5" />
      </svg>
    </motion.button>
  );
}
