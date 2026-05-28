'use client';

import React from 'react';

export function DailyQuestion() {
  return (
    <div className="relative bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-50 mx-4 sm:mx-6 my-4 group transition-all duration-500 hover:shadow-[0_12px_40px_rgba(48,190,79,0.08)] overflow-hidden">
      
      {/* Premium subtle background glow instead of the ugly shape */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-50 rounded-full opacity-50 blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-green-100 group-hover:scale-110" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D3B8E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h9" />
            <path d="M4 12h5" />
            <path d="M4 18h5" />
            <path d="M17 10l5-5-2.5-2.5-5 5V10h2.5z" />
            <path d="M14.5 7.5L17 10" />
          </svg>
        </div>
        <span className="font-bold text-gray-800 text-[14px] uppercase tracking-wider">Your Daily Question</span>
      </div>

      {/* Question */}
      <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0D3B8E] mb-8 relative z-10 leading-tight">
        What are the three things I am grateful for today?
      </h2>

      {/* Text Area Container */}
      <div className="bg-[#FAFAFA] border border-gray-100 rounded-[20px] p-5 relative min-h-[160px] flex flex-col transition-all duration-300 focus-within:bg-white focus-within:shadow-[0_0_0_2px_rgba(48,190,79,0.2)] focus-within:border-transparent">
        <textarea 
          placeholder="Write your thoughts and feelings here..."
          className="w-full flex-1 bg-transparent resize-none outline-none text-gray-700 placeholder:text-gray-400 text-[15px] leading-relaxed"
        />
        
        {/* Button */}
        <div className="flex justify-end mt-4">
          <button className="bg-[#30BE4F] hover:bg-[#28A745] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] shadow-[0_4px_12px_rgba(48,190,79,0.25)] hover:shadow-[0_6px_16px_rgba(48,190,79,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}
