'use client';

import Image from "next/image";
import Link from "next/link";
import { Stethoscope, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function OnboardingPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center p-6 bg-white relative overflow-hidden">
      
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg mx-auto relative z-10 mt-2 mb-8 md:mt-6">
        
        {/* Logo */}
        <motion.div 
          className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] mb-10 md:mb-12 shrink-0 flex items-center justify-center mx-auto"
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image 
            src="https://i.postimg.cc/SKKMvjL9/photo-2026-05-14-14-47-12.jpg" 
            alt="Tabtaba Logo" 
            width={400}
            height={400}
            priority 
            className="w-full h-auto object-contain mix-blend-multiply drop-shadow-sm scale-[1.15] md:scale-[1.25]"
            style={{ filter: "brightness(1.06) contrast(1.04)" }}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Buttons */}
        <div className="w-full max-w-[94%] md:max-w-md space-y-6">
          <Link 
            href="/support" 
            className="group block w-full bg-[#FF9800] hover:bg-[#F59100] text-white rounded-[44px] h-[88px] md:h-[100px] shadow-[0_12px_30px_-5px_rgba(255,152,0,0.4)] transition-all active:scale-[0.97] hover:scale-[1.01]"
          >
            <div className="h-full flex items-center px-4 md:px-5">
              <div className="w-[62px] h-[62px] md:w-[70px] md:h-[70px] rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <svg className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10.5V15.5C21 19.09 18.09 22 14.5 22H11C8.28 22 5.92 20.35 4.96 17.8L3.08 12.79C2.7 11.78 3.51 10.74 4.56 10.87C5 10.92 5.37 11.19 5.56 11.6L6.5 13.5V4C6.5 2.9 7.4 2 8.5 2C9.6 2 10.5 2.9 10.5 4V10.5C10.5 10.78 10.72 11 11 11C11.28 11 11.5 10.78 11.5 10.5V2.5C11.5 1.67 12.17 1 13 1C13.83 1 14.5 1.67 14.5 2.5V10.5C14.5 10.78 14.72 11 15 11C15.28 11 15.5 10.78 15.5 10.5V4C15.5 3.17 16.17 2.5 17 2.5C17.83 2.5 18.5 3.17 18.5 4V10.5C18.5 10.78 18.72 11 19 11C19.28 11 19.5 10.78 19.5 10.5V8.5C19.5 7.67 20.17 7 21 7C21.83 7 22.5 7.67 22.5 8.5V10.5z" />
                </svg>
              </div>
              <div className="flex-1 px-2 flex items-center justify-center">
                <span className="text-[1.3rem] md:text-[1.5rem] font-bold tracking-tight text-center leading-none mt-0.5 whitespace-nowrap" style={{ fontFamily: 'var(--font-quicksand)' }}>
                  I need support
                </span>
              </div>
              <div className="w-[45px] flex items-center justify-center shrink-0 ml-auto">
                <ArrowRight className="w-7 h-7 md:w-8 md:h-8 transition-transform group-hover:translate-x-1.5" strokeWidth={3} />
              </div>
            </div>
          </Link>

          <Link 
            href="/therapist" 
            className="group block w-full bg-[#30C45D] hover:bg-[#2AA950] text-white rounded-[44px] h-[88px] md:h-[100px] shadow-[0_12px_30px_-5px_rgba(48,196,93,0.4)] transition-all active:scale-[0.97] hover:scale-[1.01]"
          >
            <div className="h-full flex items-center px-4 md:px-5">
              <div className="w-[62px] h-[62px] md:w-[70px] md:h-[70px] rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Stethoscope className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1 px-2 flex items-center justify-center">
                <span className="text-[1.3rem] md:text-[1.5rem] font-bold tracking-tight text-center leading-none mt-0.5 whitespace-nowrap" style={{ fontFamily: 'var(--font-quicksand)' }}>
                  Therapist
                </span>
              </div>
              <div className="w-[45px] flex items-center justify-center shrink-0 ml-auto">
                <ArrowRight className="w-7 h-7 md:w-8 md:h-8 transition-transform group-hover:translate-x-1.5" strokeWidth={3} />
              </div>
            </div>
          </Link>
        </div>



      </div>

      {/* Bottom Links */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center space-y-6 pb-4 relative z-10 shrink-0">
        <p className="text-[#9e9e9e] text-[0.95rem] md:text-base font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
          Already have an account? <Link href="/login" className="text-[#4B6B22] font-semibold hover:underline">Log in</Link>
        </p>

        <Link href="/guest" className="text-[#30C45D] font-semibold hover:underline text-[0.95rem] md:text-base" style={{ fontFamily: 'var(--font-inter)' }}>
          Continue as Guest
        </Link>
      </div>

    </main>
  );
}
