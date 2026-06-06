'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check, Award, Flame, Brain } from 'lucide-react';
import { DashboardHeader } from '@/widgets/dashboard/ui/dashboard-header';

// Define the static activity dots configuration for October 2023 to match the Figma mockup exactly
const DOTS_DATA: { [key: number]: { green?: boolean; yellow?: boolean; blue?: boolean; checked?: boolean } } = {
  1: { green: true },
  2: { green: true },
  3: { yellow: true },
  4: {},
  5: { green: true },
  6: { checked: true },
  7: { green: true },
  8: {},
  9: {},
  10: {},
  11: { green: true },
  12: { blue: true },
  13: { green: true },
  14: { green: true },
  15: { yellow: true },
  16: {},
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
    return <div className="flex flex-col min-h-screen bg-transparent max-w-lg lg:max-w-xl mx-auto pb-6" />;
  }

  // Define activities list for selected days to make the page highly functional
  const getSelectedDayActivities = (day: number) => {
    const dots = DOTS_DATA[day] || {};
    const list = [];
    if (dots.green || dots.checked) {
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
    <div className="flex flex-col min-h-screen bg-transparent font-inter w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 relative">
      <DashboardHeader />

      <div className="flex-1 flex flex-col md:grid md:grid-cols-12 md:gap-8 mt-4">
        
        {/* Left Column: Monthly Calendar and Legend */}
        <div className="md:col-span-7 flex flex-col gap-6">
          
          {/* Interactive Calendar Month Header */}
          <div className="flex items-center justify-between px-1">
            {/* Calendar Icon + Month Title */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#EBFDF0] flex items-center justify-center">
                <CalendarIcon size={18} className="text-[#30BE4F]" />
              </div>
              <h2 className="text-gray-900 text-lg font-black tracking-tight">
                {currentMonth}
              </h2>
            </div>

            {/* Pagination Arrows */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentMonth(currentMonth === 'October 2023' ? 'September 2023' : 'October 2023')}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-[#30BE4F] shadow-sm border border-gray-150/50 hover:bg-gray-55 active:scale-95 transition-all"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => setCurrentMonth(currentMonth === 'October 2023' ? 'November 2023' : 'October 2023')}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-[#30BE4F] shadow-sm border border-gray-150/50 hover:bg-gray-55 active:scale-95 transition-all"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Crisp White Calendar Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
            
            {/* Weekday Labels MON to SUN */}
            <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <span key={day} className="text-[11px] font-black text-gray-400 tracking-wider">
                  {day}
                </span>
              ))}
            </div>

            {/* Monthly Days Grid */}
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
              {calendarDays.map((item, idx) => {
                const dots = item.isCurrentMonth ? (DOTS_DATA[item.day] || {}) : {};
                const isSelected = item.isCurrentMonth && selectedDay === item.day;

                return (
                  <div key={idx} className="flex items-center justify-center w-full">
                    <button
                      onClick={() => {
                        if (item.isCurrentMonth) {
                          setSelectedDay(item.day);
                        }
                      }}
                      disabled={!item.isCurrentMonth}
                      className={`w-10 h-14 sm:w-11 sm:h-16 rounded-2xl flex flex-col items-center justify-between py-2 transition-all duration-200 relative
                        ${!item.isCurrentMonth 
                          ? 'text-gray-300 cursor-not-allowed font-medium' 
                          : isSelected
                            ? 'bg-[#EBFDF0] text-[#30BE4F] font-bold shadow-sm border border-[#30BE4F]/20 scale-105'
                            : 'text-gray-800 hover:bg-gray-55 border border-transparent font-bold'
                        }`}
                    >
                      {/* Day number */}
                      <span className={`text-sm leading-none ${!item.isCurrentMonth ? 'text-gray-300' : 'text-gray-800'}`}>
                        {item.day}
                      </span>

                      {/* Indicator (Dot or Checkmark) */}
                      <div className="h-4 flex items-center justify-center w-full mb-1">
                        {item.isCurrentMonth && (
                          <>
                            {dots.checked ? (
                              <span className="w-4 h-4 rounded-full bg-[#EBFDF0] flex items-center justify-center shrink-0">
                                <Check size={10} strokeWidth={4.5} className="text-[#30BE4F]" />
                              </span>
                            ) : (
                              <div className="flex gap-0.5 justify-center items-center">
                                {dots.green && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#30BE4F]" />
                                )}
                                {dots.yellow && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                                )}
                                {dots.blue && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend Panel Container */}
          <div className="bg-gray-50/60 border border-gray-150/60 rounded-2xl p-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-start items-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#30BE4F] shrink-0" />
                <span className="text-[12.5px] font-bold text-gray-600">Completed Activity</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
                <span className="text-[12.5px] font-bold text-gray-600">With Checkmarks</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0" />
                <span className="text-[12.5px] font-bold text-gray-600">Session Reminder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Intensity & Activities log */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Weekly Intensity Section */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-black text-gray-900 tracking-tight">
                Weekly Intensity
              </h3>
              <span className="text-[11px] font-black text-[#30BE4F] bg-[#EBFDF0] px-3 py-1 rounded-full uppercase tracking-wider">
                Optimal Week 🔥
              </span>
            </div>

            {/* Vertical Bar Chart */}
            <div className="flex justify-between items-end h-28 px-2 relative mb-2">
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
                      <div className="absolute -top-12 bg-gray-900 text-white text-[11px] font-black px-2.5 py-1.5 rounded-xl shadow-md z-20 pointer-events-none whitespace-nowrap flex flex-col gap-0.5 border border-white/10 transition-all duration-200">
                        <span>Intensity: {item.value}%</span>
                        <span className="text-green-400 font-extrabold text-[9px] uppercase tracking-wider">{item.mood}</span>
                      </div>
                    )}

                    {/* The Vertical Pill Bar */}
                    <div className="w-5 h-20 bg-gray-55 rounded-full overflow-hidden relative border border-gray-100">
                      <div
                        style={{ height: `${item.value}%` }}
                        className={`w-full absolute bottom-0 rounded-full transition-all duration-300 ease-out ${
                          isActive 
                            ? 'bg-[#30BE4F] shadow-sm scale-105'
                            : 'bg-[#30BE4F]/75'
                        }`}
                      />
                    </div>

                    {/* Day label */}
                    <span className={`text-xs font-bold transition-colors ${
                      isActive ? 'text-[#30BE4F]' : 'text-gray-400'
                    }`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-gray-500 mt-4 leading-relaxed font-semibold">
              Your intensity is looking healthy! Weekly average is 15 minutes.
            </p>
          </div>

          {/* Selected Day Activities List */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
            <h3 className="text-[16px] font-black text-gray-900 mb-4 tracking-tight">
              Activities on Oct {selectedDay}
            </h3>

            <div className="flex flex-col gap-3">
              {selectedActivities.length > 0 ? (
                selectedActivities.map((act, idx) => {
                  const IconComponent = act.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-55 rounded-2xl border border-gray-100/50"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white border border-gray-100 text-[#30BE4F]"
                        >
                          <IconComponent size={18} strokeWidth={2.5} />
                        </div>
                        
                        <div className="flex flex-col text-left">
                          <h4 className="text-[13px] font-bold text-gray-800 leading-tight">
                            {act.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                            {act.type === 'activity' && `⏱️ ${act.duration}`}
                            {act.type === 'mood' && `Mood: ${act.mood}`}
                            {act.type === 'session' && `👤 ${act.doctor}`}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase text-[#30BE4F] bg-[#EBFDF0] px-2 py-0.5 rounded-full shrink-0">
                        Done
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 border border-dashed border-gray-150 rounded-2xl">
                  <p className="text-xs text-gray-450 font-medium">
                    No registered activities on this day
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Horizontal Cards at the bottom of the page */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
        {/* Next Session Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
            <CalendarIcon size={22} />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Next Session</span>
            <span className="text-[15px] font-black text-gray-800 mt-0.5 truncate">Oct 12, 10:00 AM</span>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200">
          <div className="w-12 h-12 rounded-2xl bg-[#EBFDF0] flex items-center justify-center text-[#30BE4F] shrink-0">
            <Flame size={22} />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Streak</span>
            <span className="text-[15px] font-black text-gray-800 mt-0.5 truncate">14 Days</span>
          </div>
        </div>

        {/* Peak Intensity Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Award size={22} />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Peak Intensity</span>
            <span className="text-[15px] font-black text-gray-800 mt-0.5 truncate">Steady & High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
