'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check, Award, Flame, Brain } from 'lucide-react';

// Define the static activity dots configuration for October 2023 to match the Figma mockup exactly
const DOTS_DATA: { [key: number]: { green?: boolean; yellow?: boolean; blue?: boolean } } = {
  1: { green: true },
  2: { green: true },
  3: { yellow: true },
  4: { green: true },
  5: { green: true },
  6: { green: true, blue: true },
  7: { green: true, blue: true }, // Day 7 selected in Figma
  8: { yellow: true },
  9: { green: true },
  10: { green: true },
  11: { green: true },
  12: { yellow: true },
  13: { green: true, blue: true },
  14: { yellow: true },
  15: { green: true },
  16: { green: true },
  17: { yellow: true },
  18: { green: true },
  19: { green: true, blue: true },
  20: { green: true },
  21: { yellow: true },
  22: { green: true },
  23: { green: true },
  24: { green: true, blue: true },
  25: { yellow: true },
  26: { green: true },
  27: { yellow: true },
  28: { green: true },
  29: { green: true },
  30: { yellow: true },
  31: { green: true, blue: true }
};

// Custom intensity levels for each day of the week to display in the chart
const INITIAL_WEEKLY_INTENSITY = [
  { day: 'M', value: 45, label: 'Monday', activities: 2, mood: 'Good' },
  { day: 'T', value: 70, label: 'Tuesday', activities: 4, mood: 'Excellent' },
  { day: 'W', value: 30, label: 'Wednesday', activities: 1, mood: 'Neutral' },
  { day: 'T', value: 85, label: 'Thursday', activities: 5, mood: 'Fantastic' },
  { day: 'F', value: 50, label: 'Friday', activities: 3, mood: 'Good' },
  { day: 'S', value: 95, label: 'Saturday', activities: 6, mood: 'Phenomenal' },
  { day: 'S', value: 25, label: 'Sunday', activities: 1, mood: 'Neutral' },
];

export function ActivityCalendar() {
  const [selectedDay, setSelectedDay] = useState<number>(7); // Default selected to Day 7 matching the screenshot
  const [isMounted, setIsMounted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('October 2023');
  const [activeChartBar, setActiveChartBar] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate calendar days layout:
  // October 2023 starts on Sunday (Oct 1st)
  // Weeks: MON TUE WED THU FRI SAT SUN
  // Grid row 1 starting with preceding month days:
  // Sep 26, 27, 28, 29, 30, Oct 1 (Sunday)
  // Let's create an array representing the exact grid of the screenshot:
  const calendarDays = [
    // Sept days (grayed out)
    { day: 26, isCurrentMonth: false },
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    // October days
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true }, // Selected by default
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    // Next month days (grayed out)
    { day: 1, isCurrentMonth: false, isNextMonth: true },
    { day: 2, isCurrentMonth: false, isNextMonth: true },
    { day: 3, isCurrentMonth: false, isNextMonth: true },
    { day: 4, isCurrentMonth: false, isNextMonth: true },
    { day: 5, isCurrentMonth: false, isNextMonth: true }
  ];

  if (!isMounted) {
    return <div className="flex flex-col h-[100dvh] bg-[#EAF2F8] max-w-lg lg:max-w-xl mx-auto pb-6" />;
  }

  // Define activities list for selected days to make the page highly functional
  const getSelectedDayActivities = (day: number) => {
    const dots = DOTS_DATA[day] || {};
    const list = [];
    if (dots.green) {
      list.push({ title: 'Box Breathing Exercise', type: 'activity', duration: '5 min', color: '#30BE4F', icon: Flame });
      list.push({ title: 'Daily Journal Entry', type: 'activity', duration: '10 min', color: '#30BE4F', icon: Award });
    }
    if (dots.yellow) {
      list.push({ title: 'High Mood Check-in', type: 'mood', time: '11:30 AM', color: '#F59E0B', mood: 'Very Happy 🌟', icon: Brain });
    }
    if (dots.blue) {
      list.push({ title: 'Cognitive Behavioral Session', type: 'session', doctor: 'Dr. Fatima Ahmed', color: '#3B82F6', icon: CalendarIcon });
    }
    return list;
  };

  const selectedActivities = getSelectedDayActivities(selectedDay);

  return (
    <div className="flex flex-col h-[100dvh] overflow-y-auto bg-[#EAF2F8] font-inter max-w-lg lg:max-w-xl mx-auto pb-28 relative">
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Premium Header */}
      <div className="px-5 pt-6 pb-2 relative z-10 bg-transparent flex justify-center items-center w-full min-h-[90px]">
        {/* Beautiful Centered Tabtaba Logo matching the mockup logo size */}
        <div className="w-16 h-16 relative">
          <Image 
            src="https://i.postimg.cc/43GH2tHQ/photo-2026-05-14-14-47-12-removebg-preview.png" 
            alt="Tabtaba Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="px-5 flex-1 flex flex-col gap-5">
        
        {/* Interactive Calendar Month Header */}
        <div className="flex items-center justify-between px-1">
          {/* Calendar Icon + Month Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E2F7E7] flex items-center justify-center">
              <CalendarIcon size={18} className="text-[#30BE4F]" />
            </div>
            <h2 className="text-[#1D214F] text-[18px] font-black tracking-tight">
              {currentMonth}
            </h2>
          </div>

          {/* Pagination Arrows */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentMonth(currentMonth === 'October 2023' ? 'September 2023' : 'October 2023')}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-[#30BE4F] shadow-sm transition-all active:scale-90"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => setCurrentMonth(currentMonth === 'October 2023' ? 'November 2023' : 'October 2023')}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-[#30BE4F] shadow-sm transition-all active:scale-90"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Crisp White Calendar Card */}
        <div className="bg-white rounded-[32px] p-5 shadow-[0_10px_30px_rgba(29,33,79,0.03)] border border-white/80">
          
          {/* Weekday Labels MON to SUN */}
          <div className="grid grid-cols-7 gap-1 text-center mb-3">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
              <span key={day} className="text-[11px] font-black text-gray-400 tracking-wider">
                {day}
              </span>
            ))}
          </div>

          {/* Monthly Days Grid */}
          <div className="grid grid-cols-7 gap-y-3.5 gap-x-1 text-center">
            {calendarDays.map((item, idx) => {
              const dots = item.isCurrentMonth ? (DOTS_DATA[item.day] || {}) : {};
              const isSelected = item.isCurrentMonth && selectedDay === item.day;
              
              // Special highlighted styling for Day 6 (has gray indicator in figma)
              const isDay6 = item.isCurrentMonth && item.day === 6;

              return (
                <div key={idx} className="flex flex-col items-center justify-center relative min-h-[46px]">
                  <button
                    onClick={() => {
                      if (item.isCurrentMonth) {
                        setSelectedDay(item.day);
                      }
                    }}
                    disabled={!item.isCurrentMonth}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] transition-all duration-200 font-bold relative
                      ${!item.isCurrentMonth 
                        ? 'text-gray-300 cursor-not-allowed font-medium' 
                        : isSelected
                          ? 'bg-[#30BE4F] text-white shadow-md shadow-green-500/20 scale-105 active:scale-95'
                          : isDay6
                            ? 'bg-[#F2F4F7] text-gray-700 hover:bg-gray-200'
                            : 'text-[#1D214F] hover:bg-green-50/50'
                      }`}
                  >
                    {isSelected ? (
                      <span className="flex items-center justify-center w-full h-full relative">
                        {/* Selected Tick design exactly like the premium mockup */}
                        {item.day === 7 ? (
                          <Check size={14} strokeWidth={3} className="text-white" />
                        ) : (
                          item.day
                        )}
                      </span>
                    ) : (
                      item.day
                    )}
                  </button>

                  {/* Activity Dots under the days */}
                  <div className="flex gap-0.5 mt-1 absolute bottom-0 h-1.5 items-center justify-center w-full">
                    {dots.green && (
                      <span className="w-1 h-1 rounded-full bg-[#30BE4F]" />
                    )}
                    {dots.yellow && (
                      <span className="w-1 h-1 rounded-full bg-[#F59E0B]" />
                    )}
                    {dots.blue && (
                      <span className="w-1 h-1 rounded-full bg-[#3B82F6]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend Panel Container */}
        <div className="bg-white/60 backdrop-blur-sm rounded-[24px] p-4.5 border border-white/60 flex flex-col gap-2.5">
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-start items-center px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#30BE4F] shrink-0" />
              <span className="text-[12.5px] font-extrabold text-[#1D214F]/80">Completed Activities</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
              <span className="text-[12.5px] font-extrabold text-[#1D214F]/80">High Mood Check-in</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0" />
              <span className="text-[12.5px] font-extrabold text-[#1D214F]/80">Session Recorded</span>
            </div>
          </div>
        </div>

        {/* Weekly Intensity Section */}
        <div className="bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(29,33,79,0.03)] border border-white/80">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16.5px] font-black text-[#1D214F] tracking-tight">
              Weekly Intensity
            </h3>
            
            {/* Custom live value display */}
            <span className="text-[12px] font-black text-[#30BE4F] bg-[#E2F7E7] px-2.5 py-1 rounded-full uppercase tracking-wider">
              Optimal Week 🔥
            </span>
          </div>

          {/* Premium Vertical Bar Chart */}
          <div className="flex justify-between items-end h-28 px-2 relative mb-2">
            {/* Grid Helper Lines */}
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-gray-100 h-0" />
            <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-100 h-0" />
            
            {INITIAL_WEEKLY_INTENSITY.map((item, idx) => {
              const isActive = activeChartBar === idx;

              return (
                <div 
                  key={idx} 
                  className="flex flex-col items-center gap-2 flex-1 group cursor-pointer"
                  onMouseEnter={() => setActiveChartBar(idx)}
                  onMouseLeave={() => setActiveChartBar(null)}
                  onClick={() => setActiveChartBar(isActive ? null : idx)}
                >
                  {/* Tooltip on active hover */}
                  {isActive && (
                    <div className="absolute -top-12 bg-[#1D214F] text-white text-[11px] font-black px-2.5 py-1.5 rounded-xl shadow-lg z-20 pointer-events-none whitespace-nowrap flex flex-col gap-0.5 border border-white/10 transition-all duration-200">
                      <span>Intensity: {item.value}%</span>
                      <span className="text-green-300 font-extrabold text-[9px] uppercase tracking-wider">{item.mood}</span>
                    </div>
                  )}

                  {/* The Vertical Pill Bar */}
                  <div className="w-5 h-20 bg-gray-50 rounded-full overflow-hidden relative border border-gray-100">
                    <div
                      style={{ height: `${item.value}%` }}
                      className={`w-full absolute bottom-0 rounded-full transition-all duration-500 ease-out ${
                        isActive 
                          ? 'bg-gradient-to-t from-[#1b8c34] to-[#30BE4F] shadow-sm scale-105'
                          : 'bg-gradient-to-t from-[#30BE4F] to-[#86EFAC]'
                      }`}
                    />
                  </div>

                  {/* Day label */}
                  <span className={`text-[12px] font-black transition-colors ${
                    isActive ? 'text-[#30BE4F]' : 'text-gray-400'
                  }`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Activities List (Bonus Premium Detail!) */}
        <div className="bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(29,33,79,0.03)] border border-white/80">
          <h3 className="text-[16px] font-black text-[#1D214F] mb-4.5 tracking-tight">
            Activities on Oct {selectedDay}
          </h3>

          <div className="flex flex-col gap-3">
            {selectedActivities.length > 0 ? (
              selectedActivities.map((act, idx) => {
                const IconComponent = act.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gray-50/50 hover:bg-gray-50 border border-gray-100/60 transition-all duration-300"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${act.color}15`, color: act.color }}
                    >
                      <IconComponent size={20} strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-extrabold text-[#1D214F] truncate">
                        {act.title}
                      </h4>
                      <p className="text-[12px] text-gray-500 font-bold mt-0.5">
                        {act.type === 'activity' && `⏱️ ${act.duration}`}
                        {act.type === 'mood' && `Mood: ${act.mood}`}
                        {act.type === 'session' && `👤 ${act.doctor}`}
                      </p>
                    </div>

                    <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
                      Done
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 px-4 bg-gray-50/30 rounded-2xl border border-dashed border-gray-200">
                <p className="text-[13px] font-extrabold text-gray-400">
                  No registered activities or sessions on this day.
                </p>
                <p className="text-[11px] text-gray-400 mt-1 font-bold">
                  Tap other days with dots to view logs! ✨
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
