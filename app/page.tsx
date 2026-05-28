'use client';

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const StarsBackground = () => {
  const [stars, setStars] = useState<{
    id: number;
    size: number;
    top: string;
    left: string;
    duration: number;
    delay: number;
  }[]>([]);

  useEffect(() => {
    // Generate more stars and make them more visible
    const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1.5, // Slightly larger
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
    const timer = setTimeout(() => {
      setStars(generatedStars);
    }, 50); // Small delay to ensure clean mount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-[#EAB308]/50" // Slightly more opaque gold
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
            boxShadow: `0 0 ${star.size * 3}px rgba(234, 179, 8, 0.7)`, // Stronger glow
          }}
          animate={{
            opacity: [0.4, 1, 0.4], // More visible minimum opacity
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Very subtle bloom overlay */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reset subscription when the site is opened for the first time in a new browser window/session
    if (typeof window !== 'undefined') {
      const sessionActive = sessionStorage.getItem('appActiveSession');
      if (!sessionActive) {
        sessionStorage.setItem('appActiveSession', 'true');
        localStorage.setItem('isSubscribed', 'false');
        window.dispatchEvent(new Event('storage'));
      }
    }

    // Small delay to satisfy linter and ensure clean mount
    const timer = setTimeout(() => {
      setMounted(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <main className="h-[100dvh] flex flex-col items-center justify-between p-6 bg-white relative overflow-hidden">
      
      <StarsBackground />
      
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto relative z-10 mb-8 mt-4">
        
        {/* Welcome Text */}
        <h2 
          className="text-[#6c757d] font-serif text-[2.5rem] md:text-[2.75rem] mb-2 md:mb-[-1rem] tracking-wide font-medium relative z-20" 
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          welcome to
        </h2>

        {/* Logo Container */}
        <div className="w-full flex items-center justify-center">
          <motion.div 
            className="relative flex items-center justify-center w-full px-2 md:px-8 mt-8 md:mt-2"
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image 
              src="https://i.postimg.cc/3NBkTmZn/photo-2026-05-14-02-36-41.jpg" 
              alt="Tabtaba Logo" 
              width={1000} 
              height={500} 
              priority 
              className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-auto max-h-[60vh] object-contain mix-blend-multiply scale-[1.4] md:scale-[1.05] lg:scale-[1] origin-center"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

      </div>

      {/* Action Button */}
      <div className="w-full max-w-sm mb-4 md:mb-8 relative z-10 shrink-0">
        <Link 
          href="/onboarding"
          className="relative w-full bg-[#34c759] hover:bg-[#2eaa4a] text-white rounded-full py-[1.125rem] px-6 flex items-center justify-center text-xl font-semibold transition-all active:scale-[0.98] shadow-md shadow-[#34c759]/20 font-inter"
        >
          <span>Get started</span>
          <ArrowRight className="w-6 h-6 absolute right-6" strokeWidth={2.5} />
        </Link>
      </div>

    </main>
  );
}

