'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar,
  Video,
  Plus,
  MessageSquare,
  Bell,
  Settings,
  Users,
  Star,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import { TherapistBottomNav } from '@/widgets/therapist/ui/therapist-bottom-nav';

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(16); // Monday 16 is active by default
  const [activeFilter, setActiveFilter] = useState('All');

  const days = [
    { name: 'Sat', number: 14 },
    { name: 'Sun', number: 15 },
    { name: 'Mon', number: 16 },
    { name: 'Tue', number: 17 },
    { name: 'Wed', number: 18 },
    { name: 'Thu', number: 19 },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-inter relative pb-32 md:pb-12 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4 md:px-8 relative z-10 flex flex-col gap-6">
        
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full border-b border-gray-100 pb-5">
          <div className="flex flex-col gap-1">
            <span className="text-[#8997A5] text-[13px] font-bold tracking-widest uppercase">Your Weekly Schedule</span>
            <h1 className="text-[28px] md:text-[32px] font-black text-gray-800 tracking-tight leading-tight">
              October 24, 2023
            </h1>
          </div>
          
          {/* Header Action Buttons */}
          <div className="flex items-center gap-3 mt-2 lg:mt-0 justify-between lg:justify-end shrink-0">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
                <Bell size={18} />
              </button>
              <Link 
                href="/therapist/profile"
                className="w-10 h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
              >
                <Settings size={18} />
              </Link>
            </div>
            
            <button className="bg-[#1DA349] hover:bg-[#15803d] text-white px-5 py-2.5 rounded-full flex items-center gap-2 font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm">
              <Plus size={18} strokeWidth={2.5} />
              <span>Add Availability</span>
            </button>
          </div>
        </div>

        {/* 3-Column Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
          
          {/* Main schedule selector & cards list (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Date Slider */}
            <div className="bg-white rounded-[32px] p-5 border border-gray-200/50 shadow-sm flex flex-col gap-4">
              <span className="text-[13px] font-bold text-gray-400 uppercase tracking-widest px-1">Select Date</span>
              <div className="grid grid-cols-6 gap-2">
                {days.map((day) => {
                  const isActive = activeDay === day.number;
                  return (
                    <button
                      key={day.number}
                      onClick={() => setActiveDay(day.number)}
                      className={`flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-[#0B5C2E] text-white shadow-md shadow-green-900/10' 
                          : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
                      }`}
                    >
                      <span className={`text-[12px] font-semibold ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                        {day.name}
                      </span>
                      <span className="text-[20px] font-black leading-tight mt-0.5">
                        {day.number}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              {['All', 'Video', 'Chat'].map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#1DA349] text-white shadow-xs' 
                        : 'bg-white text-gray-500 border border-gray-200/80 hover:bg-gray-50'
                    }`}
                  >
                    {filter === 'All' ? 'All (5)' : filter}
                  </button>
                );
              })}
            </div>

            {/* Sessions Cards Container */}
            <div className="flex flex-col gap-4">
              {/* Card 1 */}
              {(activeFilter === 'All' || activeFilter === 'Video') && (
                <div className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-black/5 bg-gray-50">
                        <Image 
                          src="https://randomuser.me/api/portraits/men/32.jpg" 
                          alt="Ahmed Mohammed" 
                          fill
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-gray-800 leading-tight">Ahmed Mohammed</span>
                        <span className="text-gray-400 text-[13px] font-bold mt-0.5">Initial Consultation</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-[#0B5C2E] font-black text-[15px] leading-tight">09:00 AM</span>
                      <span className="text-gray-400 text-[12px] font-semibold mt-0.5">50 mins</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-[#EAF6ED] text-[#22C55E] px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold select-none">
                      <Video size={15} strokeWidth={2.5} />
                      <span>Video Call</span>
                    </div>
                    <Link 
                      href="/therapist/session" 
                      className="text-[#0B5C2E] font-black text-[14px] px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Start Session
                    </Link>
                  </div>
                </div>
              )}

              {/* Card 2 */}
              {(activeFilter === 'All' || activeFilter === 'Chat') && (
                <div className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-black/5 bg-gray-50">
                        <Image 
                          src="https://randomuser.me/api/portraits/women/44.jpg" 
                          alt="Sara Khalid" 
                          fill
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[17px] font-bold text-gray-800 leading-tight">Sara Khalid</span>
                        <span className="text-gray-400 text-[13px] font-bold mt-0.5">Weekly Follow-up</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-[#0B5C2E] font-black text-[15px] leading-tight">11:30 AM</span>
                      <span className="text-gray-400 text-[12px] font-semibold mt-0.5">40 mins</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-[#EAF6ED] text-[#22C55E] px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold select-none">
                      <MessageSquare size={15} strokeWidth={2.5} />
                      <span>Chat Session</span>
                    </div>
                    <Link 
                      href="/therapist/messages" 
                      className="text-[#0B5C2E] font-black text-[14px] px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Open Chat
                    </Link>
                  </div>
                </div>
              )}

              {/* Dashed Slot */}
              <div className="border-2 border-dashed border-gray-200/80 rounded-[32px] p-8 flex flex-col items-center justify-center gap-2 bg-white/40 mt-1 select-none">
                <Calendar size={28} className="text-gray-300" strokeWidth={1.5} />
                <span className="text-gray-400 text-[14px] font-bold">No sessions scheduled at 01:00 PM</span>
                <button className="text-[#1DA349] hover:text-[#15803d] font-bold text-[14px] mt-1 flex items-center gap-1 cursor-pointer">
                  <span>View Available Slots</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Statistics Sidebar Panel (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            {/* Total Sessions Completed progress bar */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/50 shadow-sm flex flex-col gap-3.5">
              <div className="flex items-baseline justify-between">
                <span className="text-[28px] font-black text-gray-800 leading-none">8</span>
                <span className="text-[12px] font-bold text-gray-400 tracking-wider">TOTAL SESSIONS</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>Completed (2/8)</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#1DA349] h-full w-[25%] rounded-full" />
              </div>
            </div>

            {/* WEEKLY GOAL card with Circular Progress indicator */}
            <div className="bg-[#0B5C2E] rounded-[32px] p-6 text-white shadow-md relative overflow-hidden flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1.5 flex-1 relative z-10">
                <span className="text-white/80 font-black text-[12px] uppercase tracking-wider">Weekly Goal</span>
                <p className="text-[13px] text-white/95 leading-relaxed font-bold">
                  You&apos;re doing great! Only 12 hours left to reach your weekly patient care target.
                </p>
              </div>
              
              {/* Circular Ring */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center z-10 select-none">
                <svg className="w-full h-full transform -rotate-90">
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="32" 
                    stroke="rgba(255,255,255,0.15)" 
                    strokeWidth="5" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="40" 
                    cy="40" 
                    r="32" 
                    stroke="#ffffff" 
                    strokeWidth="5.5" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 32}
                    strokeDashoffset={2 * Math.PI * 32 * (1 - 0.72)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute font-black text-[15px] text-white">72%</div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-[28px] p-5 border border-gray-200/50 shadow-sm flex flex-col gap-3 group hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-full bg-[#EAF6ED] flex items-center justify-center text-[#1DA349]">
                  <Users size={18} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">ACTIVE PATIENTS</span>
                  <span className="text-[24px] font-black text-gray-800 mt-0.5">124</span>
                </div>
              </div>

              <div className="bg-white rounded-[28px] p-5 border border-gray-200/50 shadow-sm flex flex-col gap-3 group hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-full bg-[#FCF8E3] flex items-center justify-center text-[#F1C40F]">
                  <Star size={18} className="fill-[#F1C40F]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">RATING</span>
                  <span className="text-[24px] font-black text-gray-800 mt-0.5">4.9</span>
                </div>
              </div>
            </div>

            {/* Pro Scheduler promo banner */}
            <div className="bg-gradient-to-br from-[#EAF4FE] to-[#F1F7FE] border border-blue-100 rounded-[32px] p-6 shadow-xs flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 text-blue-100 translate-x-3 -translate-y-3 pointer-events-none">
                <Sparkles size={100} strokeWidth={1} />
              </div>
              
              <div className="flex flex-col gap-1.5 relative z-10">
                <span className="text-blue-600 font-black text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} className="fill-blue-600" />
                  <span>Pro Scheduler</span>
                </span>
                <p className="text-[13px] text-gray-600 leading-relaxed font-bold">
                  Unlock advanced calendar sync and multi-clinic management tools.
                </p>
              </div>
              
              <button className="w-full bg-white border border-blue-200 text-blue-600 font-black text-[14px] py-3 rounded-full hover:bg-blue-50 transition-colors shadow-xs active:scale-95 cursor-pointer">
                Learn More
              </button>
            </div>

          </div>

        </div>
      </div>

      <TherapistBottomNav />
    </div>
  );
}
