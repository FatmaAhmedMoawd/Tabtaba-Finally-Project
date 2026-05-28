import React from 'react';
import { TrendingUp, Smile } from 'lucide-react';

export const StatsGrid: React.FC = () => {
  return (
    <section className="w-full px-6 md:px-8 mt-8 grid grid-cols-2 gap-4 lg:gap-6 font-inter lg:max-w-4xl lg:mx-auto">
      
      {/* Daily Streak */}
      <div className="bg-[#30BE4F] rounded-[1.25rem] p-4 sm:p-5 shadow-sm text-white flex flex-col justify-between aspect-[1.15] md:aspect-auto md:h-40">
        <h3 className="text-[11px] sm:text-[13px] font-bold tracking-[0.05em] uppercase opacity-90 mt-1">Daily Streak</h3>
        <div className="mt-1 text-[2.5rem] sm:text-5xl font-bold flex items-baseline gap-1.5 -ml-0.5">
          12 <span className="text-[15px] sm:text-lg font-medium opacity-90 tracking-normal lowercase">days</span>
        </div>
        <div className="mt-auto pt-4 relative w-full h-1.5 bg-white/30 rounded-full overflow-hidden mb-1">
          <div className="absolute top-0 left-0 h-full w-[70%] bg-white rounded-full"></div>
        </div>
      </div>

      {/* Meditation */}
      <div className="bg-[#F2F3F7] rounded-[1.25rem] p-4 sm:p-5 shadow-sm flex flex-col justify-between aspect-[1.15] md:aspect-auto md:h-40">
        <h3 className="text-[11px] sm:text-[13px] font-bold text-[#4A5568] tracking-[0.05em] uppercase mt-1">Meditation</h3>
        <div className="mt-1 text-[2.5rem] sm:text-5xl font-bold text-[#0D5230] flex items-baseline gap-1.5 -ml-0.5">
          340 <span className="text-[15px] sm:text-lg font-medium text-[#4A5568] tracking-normal lowercase">min</span>
        </div>
        <div className="mt-auto pt-2 flex items-center gap-1.5 text-[11.5px] sm:text-sm font-bold text-[#1E7B44] mb-1">
          <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.5} />
          +15% this week
        </div>
      </div>

      {/* Avg Mood */}
      <div className="bg-[#F2F3F7] rounded-[1.25rem] p-4 sm:p-5 shadow-sm flex flex-col justify-between aspect-[1.15] md:aspect-auto md:h-40">
        <h3 className="text-[11px] sm:text-[13px] font-bold text-[#4A5568] tracking-[0.05em] uppercase mt-1">Avg Mood</h3>
        <div className="mt-1 text-[2.5rem] sm:text-5xl font-bold text-[#FBBF24] flex items-center gap-2 -ml-0.5">
          4.8 <Smile className="w-8 h-8 sm:w-10 sm:h-10 text-[#FBBF24]" fill="currentColor" stroke="white" strokeWidth={1} />
        </div>
        <div className="mt-auto pt-2 text-[11.5px] sm:text-sm font-semibold text-[#718096] mb-1">
          Based on 28 entries
        </div>
      </div>

      {/* Activities */}
      <div className="bg-[#6591C6] rounded-[1.25rem] p-4 sm:p-5 shadow-sm flex flex-col justify-between aspect-[1.15] md:aspect-auto md:h-40">
        <h3 className="text-[11px] sm:text-[13px] font-bold text-[#1E437C] tracking-[0.05em] uppercase mt-1">Activities</h3>
        <div className="mt-1 text-[2.5rem] sm:text-5xl font-bold text-[#1D4A80] flex items-baseline gap-1.5 -ml-0.5">
          42 <span className="text-[15px] sm:text-lg font-medium text-[#1E437C] tracking-normal lowercase">done</span>
        </div>
        <div className="mt-auto pt-2 text-[11.5px] sm:text-[13px] font-bold text-[#1E437C] mb-1">
          Top: Deep Breathing
        </div>
      </div>

    </section>
  );
};
