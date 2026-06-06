import React from 'react';
import { TrendingUp, Smile } from 'lucide-react';

export const StatsGrid: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-0 mt-2 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 font-inter">
      
      {/* Daily Streak */}
      <div className="bg-[#30BE4F] rounded-[1.4rem] p-5 shadow-md text-white flex flex-col justify-between min-h-[140px] md:h-44">
        <h3 className="text-[11px] sm:text-[12px] font-bold tracking-[0.08em] uppercase opacity-90">DAILY STREAK</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[3rem] sm:text-5xl font-black leading-none">12</span>
          <span className="text-[15px] font-semibold opacity-90 lowercase">days</span>
        </div>
        <div className="relative w-full h-[5px] bg-white/30 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-[70%] bg-white rounded-full"></div>
        </div>
      </div>

      {/* Meditation */}
      <div className="bg-white rounded-[1.4rem] p-5 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px] md:h-44">
        <h3 className="text-[11px] sm:text-[12px] font-bold text-[#6B7280] tracking-[0.08em] uppercase">MEDITATION</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[3rem] sm:text-5xl font-black text-gray-900 leading-none">340</span>
          <span className="text-[15px] font-semibold text-gray-500 lowercase">min</span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#22C55E]">
          <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.5} />
          +15% this week
        </div>
      </div>

      {/* Avg Mood */}
      <div className="bg-white rounded-[1.4rem] p-5 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px] md:h-44">
        <h3 className="text-[11px] sm:text-[12px] font-bold text-[#6B7280] tracking-[0.08em] uppercase">AVG MOOD</h3>
        <div className="flex items-center gap-2">
          <span className="text-[3rem] sm:text-5xl font-black text-[#FBBF24] leading-none">4.8</span>
          <Smile className="w-9 h-9 text-[#FBBF24]" fill="currentColor" stroke="white" strokeWidth={0.5} />
        </div>
        <div className="text-[11.5px] font-semibold text-gray-400">
          Based on 28 entries
        </div>
      </div>

      {/* Activities */}
      <div className="bg-[#5B8DC8] rounded-[1.4rem] p-5 shadow-md flex flex-col justify-between min-h-[140px] md:h-44">
        <h3 className="text-[11px] sm:text-[12px] font-bold text-[#1a3c6e] tracking-[0.08em] uppercase">ACTIVITIES</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[3rem] sm:text-5xl font-black text-[#0f2d5e] leading-none">42</span>
          <span className="text-[15px] font-semibold text-[#1a3c6e] lowercase">done</span>
        </div>
        <div className="text-[11.5px] font-bold text-[#1a3c6e]">
          Top: Deep Breat…
        </div>
      </div>

    </section>
  );
};
