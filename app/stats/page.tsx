'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { 
  MessageSquare, 
  FileText,
  Download
} from 'lucide-react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

type Tab = 'monthly' | 'yearly';

export default function StatsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('monthly');
  const [isLoaded, setIsLoaded] = useState(false);
  const [moodPeriod, setMoodPeriod] = useState('Weekly');

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const monthlyBarData = [
    { day: 'M', value: 40, color: 'bg-yellow-400' },
    { day: 'T', value: 100, color: 'bg-[#3E7515]' },
    { day: 'W', value: 50, color: 'bg-yellow-400' },
    { day: 'T', value: 95, color: 'bg-[#22C55E]' },
    { day: 'F', value: 30, color: 'bg-[#C084FC]' },
    { day: 'S', value: 15, color: 'bg-yellow-400' },
    { day: 'S', value: 45, color: 'bg-[#3B82F6]' },
  ];

  const yearlyBarData = [
    { day: 'Jan', value: 70, color: 'bg-[#3E7515]' },
    { day: 'Feb', value: 60, color: 'bg-yellow-400' },
    { day: 'Mar', value: 90, color: 'bg-[#3E7515]' },
    { day: 'Apr', value: 40, color: 'bg-yellow-400' },
    { day: 'May', value: 80, color: 'bg-[#22C55E]' },
    { day: 'Jun', value: 100, color: 'bg-[#3E7515]' },
    { day: 'Jul', value: 95, color: 'bg-[#3E7515]' },
  ];

  const barData = activeTab === 'monthly' ? monthlyBarData : yearlyBarData;
  const moodScore = activeTab === 'monthly' ? '72%' : '84%';
  const moodText = activeTab === 'monthly' ? 'Positive Vibes' : 'Annual Growth';

  return (
    <>
      <style>{`
        @keyframes draw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          animation: draw 2s ease-out forwards;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-scale {
          animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes barGrow {
          from { height: 0%; }
        }
        .animate-bar {
          animation: barGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ========================================================
          OLD MOBILE LAYOUT (Exactly as it was originally)
          ======================================================== */}
      <div className="block md:hidden min-h-[100dvh] bg-white font-inter pb-32 relative overflow-hidden">
        {/* Header */}
        <div className="relative flex flex-col items-center pt-8 pb-4 px-6 z-20">
          <button 
            onClick={() => router.back()}
            className="absolute left-6 top-8 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#3E7515] border border-gray-100 hover:scale-110 transition-transform z-30"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <div className="relative w-36 h-20">
            <Image
              src="https://i.postimg.cc/D0XMhPXh/photo-2026-05-14-14-47-12.jpg"
              alt="Tabtaba Logo"
              fill
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>
        </div>

        <div className="px-6 w-full max-w-lg mx-auto flex flex-col gap-6">
          {/* Toggle Switch */}
          <div className="flex justify-center mb-2">
            <div className="bg-[#F3F4F6] p-1 rounded-full flex gap-1 w-full max-w-[280px] shadow-inner">
              <button
                onClick={() => setActiveTab('monthly')}
                className={`flex-1 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 relative z-10 ${
                  activeTab === 'monthly' ? 'text-[#3E7515]' : 'text-gray-400'
                }`}
              >
                {activeTab === 'monthly' && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                Monthly
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`flex-1 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 relative z-10 ${
                  activeTab === 'yearly' ? 'text-[#3E7515]' : 'text-gray-400'
                }`}
              >
                {activeTab === 'yearly' && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                Yearly
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-2">
            {/* Mood Tracking Line Chart */}
            <div 
              className="bg-white rounded-[40px] p-6 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-scale relative"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex justify-between items-start mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-[22px] font-bold text-[#1C1C1C]">Mood Tracking</h2>
                    <p className="text-gray-500 text-[14px]">{moodScore} {moodText}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="w-10 h-10 rounded-full bg-[#3E7515] flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </div>
              </div>

              <div className="relative w-full h-36 mt-4 mb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <path
                        d={activeTab === 'monthly' 
                          ? "M 0 70 C 40 20, 70 30, 90 35 S 130 50, 160 55 S 220 5, 260 15 S 290 60, 300 65"
                          : "M 0 50 C 50 100, 100 20, 150 60 S 250 10, 300 40"
                        }
                        fill="none"
                        stroke="#3E7515"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className={isLoaded ? 'animate-draw' : ''}
                      />
                      {isLoaded && (
                        <circle 
                          cx={activeTab === 'monthly' ? "90" : "150"} 
                          cy={activeTab === 'monthly' ? "35" : "60"} 
                          r="5" 
                          fill="white" 
                          stroke="#3E7515" 
                          strokeWidth="3"
                          className="animate-fade-scale"
                          style={{ animationDelay: '1.5s' }}
                        />
                      )}
                    </svg>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-between px-2 text-[10px] font-bold text-gray-400 mt-2 uppercase">
                {activeTab === 'monthly' 
                  ? ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => <span key={d}>{d}</span>)
                  : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map(d => <span key={d}>{d}</span>)
                }
              </div>
            </div>

            {/* Mood Tracking Bar Chart */}
            <div 
              className="bg-white rounded-[40px] p-6 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-scale"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[20px] font-bold text-[#1C1C1C]">Mood Tracking</h2>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[#FBBF24] text-[13px] font-extrabold tracking-widest"
                  >
                    {activeTab === 'monthly' ? 'THIS MONTH' : 'THIS YEAR'}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-end h-40 px-2 mt-4 relative">
                <AnimatePresence mode="popLayout">
                  {barData.map((item, i) => (
                    <motion.div 
                      key={`${activeTab}-${item.day}`}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="flex flex-col items-center gap-4 h-full w-4 justify-end origin-bottom"
                    >
                      <div className="relative w-[10px] flex-1 bg-gray-100 rounded-full overflow-hidden flex items-end">
                        <div 
                          className={`absolute bottom-0 w-full rounded-full ${item.color}`}
                          style={{ 
                            height: `${item.value}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase w-6 text-center">{item.day}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>

      {/* ========================================================
          NEW HIGH-FIDELITY WEB DESKTOP LAYOUT (Exactly matching mockup)
          ======================================================== */}
      <div className="hidden md:block min-h-screen bg-[#FCFAF6] font-inter px-8 pb-16">
        {/* Title Header Section */}
        <div className="mb-8 pt-2">
          <span className="text-[11px] font-black text-[#0D7A39] tracking-widest uppercase">INSIGHT DASHBOARD</span>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight mt-1">
            Your Wellness Journey in Numbers
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl mt-1 leading-relaxed font-medium">
            Reflect on your progress over the last 7 days. Consistency is the foundation of emotional resilience.
          </p>
        </div>


        {/* Main Charts & Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Weekly Mood Vibe Chart */}
          <div className="lg:col-span-8 bg-white rounded-[32px] p-6 border border-gray-150/70 shadow-sm flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="flex justify-between items-center w-full">
                <div>
                  <h3 className="font-black text-gray-900 text-base leading-none">
                    Weekly Mood Vibe
                  </h3>
                  <span className="text-xs text-gray-400 block mt-1.5 font-[500]">
                    Average mood: <span className="font-extrabold text-[#0D7A39]">4.8 (Excellent)</span>
                  </span>
                </div>

                {/* Weekly/Monthly Pill selector */}
                <div className="bg-gray-100 rounded-full p-0.5 flex gap-0.5 text-[10px] font-bold text-gray-500 shadow-inner">
                  <button 
                    onClick={() => setMoodPeriod('Weekly')}
                    className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${moodPeriod === 'Weekly' ? 'bg-white text-gray-800 shadow-sm' : 'hover:text-gray-800'}`}
                  >
                    Weekly
                  </button>
                  <button 
                    onClick={() => setMoodPeriod('Monthly')}
                    className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${moodPeriod === 'Monthly' ? 'bg-white text-gray-800 shadow-sm' : 'hover:text-gray-800'}`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Smooth Wave Chart SVG */}
              <div className="w-full h-[180px] mt-6 relative">
                <svg viewBox="0 0 600 180" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Curved Path */}
                  <path
                    d="M 0 130 C 80 120, 120 70, 180 70 C 245 70, 275 140, 360 110 C 430 85, 470 20, 520 20 C 560 20, 580 90, 600 90"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Closed gradient area */}
                  <path
                    d="M 0 130 C 80 120, 120 70, 180 70 C 245 70, 275 140, 360 110 C 430 85, 470 20, 520 20 C 560 20, 580 90, 600 90 L 600 180 L 0 180 Z"
                    fill="url(#chartGradient)"
                  />

                  {/* Chart Dots */}
                  <circle cx="180" cy="70" r="5" fill="#ffffff" stroke="#10B981" strokeWidth="3" />
                  <circle cx="360" cy="110" r="5" fill="#ffffff" stroke="#10B981" strokeWidth="3" />
                  <circle cx="520" cy="20" r="5" fill="#ffffff" stroke="#10B981" strokeWidth="3" />
                </svg>
              </div>

              {/* Days row */}
              <div className="flex justify-between px-1 text-[10px] font-black text-gray-400 tracking-wider uppercase mt-4">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Weekly Summary Card */}
          <div className="lg:col-span-4 bg-[#E08A18] rounded-[32px] p-7 border border-[#C57610] shadow-sm flex flex-col justify-between min-h-[340px] text-white">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase opacity-80">INSIGHTS</span>
              <h3 className="text-xl font-black mt-2 leading-tight">
                Weekly Summary
              </h3>
              <p className="text-white/90 text-xs mt-3 leading-relaxed font-medium">
                You&apos;ve reached your mindfulness goal 5 days in a row! Your mood peak coincides with your Deep Breathing exercises.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 mt-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px]">✨</span>
                </div>
                <span className="text-xs font-bold leading-none">Sleep quality improved by 12%</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px]">🍃</span>
                </div>
                <span className="text-xs font-bold leading-none">Anxiety triggers reduced on Friday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Rings & Meditation Goals Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Activity Rings */}
          <div className="lg:col-span-6 bg-white rounded-[32px] p-6 border border-gray-150/70 shadow-sm flex flex-col justify-between min-h-[280px]">
            <h3 className="font-black text-gray-900 text-base leading-none mb-4">
              Activity Rings
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 h-full">
              {/* Round Circle Ring Chart */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Track circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-gray-100 fill-none"
                    strokeWidth="8"
                    stroke="currentColor"
                  />
                  {/* Active circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-[#10B981] fill-none"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="45.2" // 82%
                    strokeLinecap="round"
                    stroke="currentColor"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-gray-900 leading-none">82%</span>
                  <span className="text-[9px] text-gray-400 font-extrabold uppercase mt-1 tracking-wider">Breathing</span>
                </div>
              </div>

              {/* Labels side column */}
              <div className="flex flex-col gap-3 font-sans shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block leading-none">Breathing</span>
                    <span className="text-[10px] text-gray-400 font-medium block mt-0.5">82% of weekly goal</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block leading-none">Daily Walk</span>
                    <span className="text-[10px] text-gray-400 font-medium block mt-0.5">60% of weekly goal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meditation Goals progress bars */}
          <div className="lg:col-span-6 bg-white rounded-[32px] p-6 border border-gray-150/70 shadow-sm flex flex-col justify-between min-h-[280px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-gray-900 text-base leading-none">
                Meditation Goals
              </h3>
              <span className="text-[10px] font-extrabold text-[#10B981] tracking-wide bg-[#E6F4F0] px-2.5 py-1 rounded-full uppercase">
                18% excess from last week
              </span>
            </div>

            <div className="flex flex-col gap-4.5 h-full justify-center">
              {/* Goal 1 */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    Deep Focus Sessions
                  </span>
                  <span>340 <span className="text-gray-400 text-[10px]">/ 400m</span></span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Goal 2 */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                    Sleep Meditation
                  </span>
                  <span>18 <span className="text-gray-400 text-[10px]">/ 20m</span></span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              {/* Goal 3 */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    Anxiety relief
                  </span>
                  <span>9 <span className="text-gray-400 text-[10px]">/ 15m</span></span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download detailed report card */}
        <div className="bg-white rounded-[32px] p-6 border border-gray-150/70 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E6F4F0] text-[#0D7A39] flex items-center justify-center shrink-0">
              <FileText size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-base leading-none">
                Download detailed report
              </h3>
              <p className="text-gray-400 text-xs mt-1.5 font-medium leading-relaxed max-w-xl">
                Export your mood and activity history for your next therapy session.
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
              alert('Your comprehensive wellness report has been generated successfully and downloaded.');
            }}
            className="bg-[#0D7A39] hover:bg-[#0B6630] text-white px-6 py-3.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <Download size={13} strokeWidth={3} />
            <span>Generate PDF Report</span>
          </button>
        </div>

        {/* Floating Chat Bubble widget at bottom right */}
        <div className="fixed bottom-6 right-6 z-40">
          <Link 
            href="/chat"
            className="w-14 h-14 rounded-full bg-[#22C55E] text-white flex items-center justify-center shadow-lg hover:bg-[#1CA349] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageSquare size={24} strokeWidth={2.5} className="fill-current" />
          </Link>
        </div>
      </div>
    </>
  );
}

