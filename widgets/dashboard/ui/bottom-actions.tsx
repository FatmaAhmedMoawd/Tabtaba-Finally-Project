import React from 'react';
import Link from 'next/link';

export const BottomActions: React.FC = () => {
  return (
    <>
      {/* ─── MOBILE: Left pill only / Right icon+pill ─── */}
      <section className="md:hidden w-full px-4 mt-2 mb-32 font-inter">
        <div className="flex items-end justify-between gap-4">

          {/* Talk to AI Assistant - pill only, no icon above */}
          <Link
          href="/chat/ai"
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-full py-3 px-5 shadow-sm active:scale-[0.98] transition-transform"
          >
            <svg className="w-4 h-4 text-[#30BE4F] shrink-0" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="30" width="60" height="50" rx="12" fill="currentColor" />
              <circle cx="36" cy="50" r="7" fill="white" />
              <circle cx="64" cy="50" r="7" fill="white" />
              <circle cx="38" cy="52" r="3.5" fill="#30BE4F" />
              <circle cx="66" cy="52" r="3.5" fill="#30BE4F" />
              <rect x="35" y="65" width="30" height="5" rx="2.5" fill="white" opacity="0.85" />
              <line x1="50" y1="30" x2="50" y2="18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="14" r="5" fill="currentColor" />
              <rect x="12" y="43" width="9" height="16" rx="4" fill="currentColor" />
              <rect x="79" y="43" width="9" height="16" rx="4" fill="currentColor" />
            </svg>
            <span className="text-[13px] font-bold text-gray-800 whitespace-nowrap">Talk to AI Assistant</span>
          </Link>

          {/* Go to the library - icon circle above + green pill */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#EAEAF0] flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-500" viewBox="0 0 576 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M144.3 32.04C106.9 31.29 63.7 41.44 18.6 61.29c-11.42 5.026-18.6 16.67-18.6 29.15l0 357.6c0 11.55 11.99 19.55 22.45 14.65c126.3-59.14 219.8 11 223.8 14.01C249.1 478.9 252.5 480 256 480c12.4 0 16-11.38 16-15.98V80.04c0-5.203-2.531-10.08-6.781-13.08C263.3 65.58 216.7 33.35 144.3 32.04zM557.4 61.29c-45.11-19.79-88.48-29.61-125.7-29.26c-72.44 1.312-118.1 33.55-120.9 34.92C306.5 69.96 304 74.83 304 80.04v383.1C304 468.4 307.5 480 320 480c3.484 0 6.938-1.125 9.781-3.328c3.925-3.018 97.44-73.16 223.8-14c10.46 4.896 22.45-3.105 22.45-14.65l.0001-357.6C575.1 77.97 568.8 66.31 557.4 61.29z"/>
              </svg>
            </div>
            <Link
              href="/library"
              className="flex items-center justify-center bg-[#1a5c2e] rounded-full py-3 px-5 shadow-sm active:scale-[0.98] transition-transform"
            >
              <span className="text-[13px] font-bold text-white whitespace-nowrap">Go to the library</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ─── DESKTOP: Original tall cards ─── */}
      <section className="hidden md:grid w-full px-4 md:px-0 mt-2 mb-32 grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
        
        {/* Talk to AI Assistant */}
        <Link 
          href="/chat/ai" 
          className="group bg-white hover:bg-gray-50/50 border border-gray-200/80 rounded-[2.5rem] p-6 flex flex-col justify-between h-44 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#EBFDF0] flex items-center justify-center text-[#30BE4F] transition-transform group-hover:scale-105">
               <svg className="w-6 h-6 text-[#30BE4F] fill-none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="53" r="30" strokeWidth="6.5" />
                  <path d="M22 50 C28 35, 72 35, 78 50" strokeWidth="6" />
                  <path d="M20 53 C20 23, 80 23, 80 53" strokeWidth="6.5" />
                  <rect x="14" y="44" width="7" height="18" rx="3.5" fill="currentColor" stroke="none" />
                  <rect x="79" y="44" width="7" height="18" rx="3.5" fill="currentColor" stroke="none" />
                  <circle cx="38" cy="55" r="4.5" fill="currentColor" stroke="none" />
                  <circle cx="62" cy="55" r="4.5" fill="currentColor" stroke="none" />
                  <path d="M44 68 C47 72, 53 72, 56 68" strokeWidth="6" />
                  <path d="M18 60 Q26 76 46 72" strokeWidth="5.5" />
               </svg>
            </div>
            <span className="text-[#30BE4F] text-xs font-bold bg-[#EBFDF0] px-3 py-1 rounded-full uppercase tracking-wider">AI Coach</span>
          </div>
          <div className="mt-4 text-left">
            <h3 className="text-lg font-black text-gray-900 group-hover:text-[#30BE4F] transition-colors leading-tight">Talk to AI Assistant</h3>
            <p className="text-xs text-gray-500 mt-1 font-medium">Get instant psychological support and guidance 24/7</p>
          </div>
        </Link>

        {/* Go to the library */}
        <Link 
          href="/library" 
          className="group bg-[#FEF9C3] hover:bg-[#FEF08A] border border-[#FDE68A] rounded-[2.5rem] p-6 flex flex-col justify-between h-44 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] flex items-center justify-center text-[#B45309] transition-transform group-hover:scale-105">
              <svg className="w-6 h-6 text-[#D97706]" viewBox="0 0 576 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M144.3 32.04C106.9 31.29 63.7 41.44 18.6 61.29c-11.42 5.026-18.6 16.67-18.6 29.15l0 357.6c0 11.55 11.99 19.55 22.45 14.65c126.3-59.14 219.8 11 223.8 14.01C249.1 478.9 252.5 480 256 480c12.4 0 16-11.38 16-15.98V80.04c0-5.203-2.531-10.08-6.781-13.08C263.3 65.58 216.7 33.35 144.3 32.04zM557.4 61.29c-45.11-19.79-88.48-29.61-125.7-29.26c-72.44 1.312-118.1 33.55-120.9 34.92C306.5 69.96 304 74.83 304 80.04v383.1C304 468.4 307.5 480 320 480c3.484 0 6.938-1.125 9.781-3.328c3.925-3.018 97.44-73.16 223.8-14c10.46 4.896 22.45-3.105 22.45-14.65l.0001-357.6C575.1 77.97 568.8 66.31 557.4 61.29z"/>
              </svg>
            </div>
            <span className="text-[#B45309] text-xs font-bold bg-[#FFFBEB] px-3 py-1 rounded-full uppercase tracking-wider">Resources</span>
          </div>
          <div className="mt-4 text-left">
            <h3 className="text-lg font-black text-[#78350F] leading-tight">Go to the library</h3>
            <p className="text-xs text-[#92400E]/80 mt-1 font-medium">Explore therapeutic materials and self-help articles</p>
          </div>
        </Link>

      </section>
    </>
  );
};
