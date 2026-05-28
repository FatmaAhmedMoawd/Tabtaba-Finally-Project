'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

type Tab = 'monthly' | 'yearly';

export default function StatsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('monthly');
  const [isLoaded, setIsLoaded] = useState(false);

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
    <div className="min-h-[100dvh] bg-white font-inter pb-32 relative overflow-hidden">
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

      <div className="px-6 max-w-lg mx-auto flex flex-col gap-6">
        
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
                  layoutId="activeTab"
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
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              Yearly
            </button>
          </div>
        </div>

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

      <BottomNav />
    </div>
  );
}

