import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const BottomActions: React.FC = () => {
  return (
    <section className="w-full px-5 sm:px-8 mt-16 md:mt-20 lg:mt-24 mb-32 grid grid-cols-2 gap-4 sm:gap-6 font-inter relative lg:max-w-3xl lg:mx-auto">
      
      {/* Talk to AI Assistant */}
      <Link href="/chat" className="w-full h-[56px] rounded-[2rem] border-[1.5px] border-[#30BE4F] bg-white flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#30BE4F] px-2 shadow-[0_4px_15px_rgba(48,190,79,0.1)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(48,190,79,0.2)] transition-all duration-300 group">
        {/* Headset icon for AI assistant */}
        <span className="w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
           <svg className="w-5 h-5 text-[#30BE4F] fill-none" viewBox="0 0 100 100" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
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
        </span>
        <span className="text-[12px] sm:text-[14px] font-bold text-[#1E7B44] truncate">Talk to AI Assistant</span>
      </Link>

      {/* Go to the library */}
      <Link href="/library" className="relative w-full">
         {/* Floating Icon Background */}
         <div className="absolute -top-[3.75rem] md:-top-[4rem] left-1/2 -translate-x-1/2 md:left-[25%] md:translate-x-0 w-[4.5rem] h-[4.5rem] sm:w-[5rem] sm:h-[5rem] bg-[#Eef2f5] rounded-full flex items-start justify-center pt-3 z-0 border-[8px] border-[#FAFAFA] overflow-hidden pointer-events-none drop-shadow-sm">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#5C7182]" viewBox="0 0 576 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path d="M144.3 32.04C106.9 31.29 63.7 41.44 18.6 61.29c-11.42 5.026-18.6 16.67-18.6 29.15l0 357.6c0 11.55 11.99 19.55 22.45 14.65c126.3-59.14 219.8 11 223.8 14.01C249.1 478.9 252.5 480 256 480c12.4 0 16-11.38 16-15.98V80.04c0-5.203-2.531-10.08-6.781-13.08C263.3 65.58 216.7 33.35 144.3 32.04zM557.4 61.29c-45.11-19.79-88.48-29.61-125.7-29.26c-72.44 1.312-118.1 33.55-120.9 34.92C306.5 69.96 304 74.83 304 80.04v383.1C304 468.4 307.5 480 320 480c3.484 0 6.938-1.125 9.781-3.328c3.925-3.018 97.44-73.16 223.8-14c10.46 4.896 22.45-3.105 22.45-14.65l.0001-357.6C575.1 77.97 568.8 66.31 557.4 61.29z"/>
            </svg>
         </div>
        
        <button className="relative z-10 w-full h-[56px] bg-[#026B2D] text-white rounded-[2rem] flex items-center justify-center font-semibold text-[13.5px] sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#026B2D] shadow-[0_8px_20px_rgba(2,107,45,0.25)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(2,107,45,0.35)] transition-all duration-300">
          <span className="truncate mt-2 md:mt-0 md:pl-6">Go to the library</span>
        </button>
      </Link>

    </section>
  );
};
