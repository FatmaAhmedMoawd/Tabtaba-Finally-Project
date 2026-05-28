import React from 'react';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const BottomActions: React.FC = () => {
  return (
    <section className="w-full px-5 sm:px-8 mt-16 md:mt-20 lg:mt-24 mb-32 grid grid-cols-2 gap-4 sm:gap-6 font-inter relative lg:max-w-3xl lg:mx-auto">
      
      {/* Talk to AI Assistant */}
      <Link href="/chat" className="w-full h-[56px] rounded-[2rem] border-[1.5px] border-[#30BE4F] bg-white flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#30BE4F] px-2 shadow-[0_4px_15px_rgba(48,190,79,0.1)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(48,190,79,0.2)] transition-all duration-300 group">
        {/* Placeholder icon for AI assistant */}
        <span className="w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
           <svg className="w-5 h-5 text-[#30BE4F]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C9.243 2 7 4.243 7 7V9H6C4.897 9 4 9.897 4 11V18C4 19.103 4.897 20 6 20H18C19.103 20 20 19.103 20 18V11C20 9.897 19.103 9 18 9H17V7C17 4.243 14.757 2 12 2ZM12 4C13.654 4 15 5.346 15 7V9H9V7C9 5.346 10.346 4 12 4ZM6 11H18V18H6V11ZM9 13C8.448 13 8 13.448 8 14C8 14.552 8.448 15 9 15C9.552 15 10 14.552 10 14C10 13.448 9.552 13 9 13ZM15 13C14.448 13 14 13.448 14 14C14 14.552 14.448 15 15 15C15.552 15 16 14.552 16 14C16 13.448 15.552 13 15 13ZM11 16H13V18H11V16Z" fill="currentColor"/>
           </svg>
        </span>
        <span className="text-[12px] sm:text-[14px] font-bold text-[#1E7B44] truncate">Talk to AI Assistant</span>
      </Link>

      {/* Go to the library */}
      <Link href="/library" className="relative w-full">
        {/* Floating Icon Background */}
        <div className="absolute -top-[3.75rem] md:-top-[4rem] left-1/2 -translate-x-1/2 md:left-[25%] md:translate-x-0 w-[4.5rem] h-[4.5rem] sm:w-[5rem] sm:h-[5rem] bg-[#Eef2f5] rounded-full flex items-start justify-center pt-3 z-0 border-[8px] border-[#FAFAFA] overflow-hidden pointer-events-none drop-shadow-sm">
           <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-[#5C7182]" strokeWidth={1.5} />
        </div>
        
        <button className="relative z-10 w-full h-[56px] bg-[#026B2D] text-white rounded-[2rem] flex items-center justify-center font-semibold text-[13.5px] sm:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#026B2D] shadow-[0_8px_20px_rgba(2,107,45,0.25)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(2,107,45,0.35)] transition-all duration-300">
          <span className="truncate mt-2 md:mt-0 md:pl-6">Go to the library</span>
        </button>
      </Link>

    </section>
  );
};
