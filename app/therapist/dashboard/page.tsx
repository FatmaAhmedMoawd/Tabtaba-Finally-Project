'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Bell, 
  TrendingUp, 
  Calendar, 
  Star, 
  PlayCircle, 
  UserCircle2, 
  Video,
  Banknote,
  Search,
  MoreVertical,
  MessageSquare
} from 'lucide-react';
import { TherapistBottomNav } from '@/widgets/therapist/ui/therapist-bottom-nav';

export default function TherapistDashboardPage() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-inter relative pb-28 md:pb-10 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4 md:px-8 relative z-10 flex flex-col gap-6">
        
        {/* Urgent Notification Banner */}
        {showAlert && (
          <div className="w-full bg-[#FFF0F0] border border-[#FDE8E8] rounded-2xl p-4 flex items-center justify-between shadow-sm animate-fade-in" dir="rtl">
            <div className="flex items-center gap-3 text-[#C82A2A] font-bold">
              <span className="text-lg">⚠️</span>
              <span className="text-[14px] md:text-[15px]">لديك طلب انضمام عاجل لجلسة جديدة</span>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/therapist/session" 
                className="bg-[#C82A2A] hover:bg-[#A61E1E] text-white text-[13px] px-5 py-2 rounded-full font-bold shadow-sm transition-colors"
              >
                قبول الطلب
              </Link>
              <button 
                onClick={() => setShowAlert(false)} 
                className="text-[#C82A2A] hover:bg-[#FEE2E2] p-1.5 rounded-full transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Header greeting & Actions bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full border-b border-gray-100 pb-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] md:text-[32px] font-black text-gray-800 tracking-tight leading-tight flex items-center gap-2">
              Welcome back, Dr. Yasser <span className="text-2xl md:text-3xl">👋</span>
            </h1>
            <p className="text-[15px] font-bold text-gray-500">
              You have 4 sessions remaining today.
            </p>
          </div>
          
          {/* Right Side search & profile actions */}
          <div className="flex items-center gap-3.5 mt-2 lg:mt-0 w-full lg:w-auto justify-between lg:justify-end shrink-0">
            <div className="relative w-full max-w-[280px] sm:max-w-xs">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search patients..." 
                className="w-full bg-white border border-gray-200/80 rounded-full py-2.5 pl-11 pr-5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1DA349]/20 focus:border-[#1DA349] transition-all shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm relative cursor-pointer">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              
              <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-200 shadow-sm relative bg-gray-100">
                <Image 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Dr. Yasser" 
                  fill
                  className="object-cover" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
          
          {/* Left Area (Stats & Sessions list) - Span 8 */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
              {/* Earnings Card (Span 2) */}
              <div className="sm:col-span-2 w-full bg-gradient-to-br from-[#1DA349] to-[#0A6D32] rounded-[32px] p-6 shadow-md shadow-green-600/10 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                {/* Decorative background logo */}
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
                  <Banknote size={150} strokeWidth={1} className="text-white transform -rotate-12" />
                </div>
                
                <div className="relative z-10 flex flex-col gap-1 w-full">
                  <span className="text-white/80 font-bold text-[14px]">Total Earnings</span>
                  <span className="text-white font-black text-[34px] tracking-tight leading-tight">5,400 EGP</span>
                  <div className="bg-white/20 w-fit rounded-full px-3 py-1 flex items-center gap-1.5 mt-1.5">
                    <TrendingUp size={14} className="text-white" />
                    <span className="text-white text-[12px] font-bold">12% from last week</span>
                  </div>
                </div>

                {/* Mini bar chart inside the card */}
                <div className="relative z-10 flex items-end gap-1.5 h-10 mt-5 w-full select-none">
                  <div className="w-[12%] bg-white/30 rounded-t-sm h-[35%] transition-all" />
                  <div className="w-[12%] bg-white/30 rounded-t-sm h-[50%] transition-all" />
                  <div className="w-[12%] bg-white/35 rounded-t-sm h-[40%] transition-all" />
                  <div className="w-[12%] bg-white/50 rounded-t-sm h-[75%] transition-all" />
                  <div className="w-[12%] bg-white rounded-t-sm h-[90%] transition-all" />
                  <div className="w-[12%] bg-white/40 rounded-t-sm h-[55%] transition-all" />
                  <div className="w-[12%] bg-white/30 rounded-t-sm h-[45%] transition-all" />
                </div>
              </div>

              {/* Sessions Card */}
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-200/50 flex flex-col justify-between min-h-[160px] group hover:shadow-md transition-shadow duration-200">
                <div className="w-10 h-10 rounded-full bg-[#EAF6ED] flex items-center justify-center">
                  <Calendar size={20} className="text-[#1DA349]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-0.5 mt-4">
                  <span className="text-[12px] font-bold text-gray-400 tracking-wider">SESSIONS</span>
                  <span className="text-[32px] font-black text-gray-800 leading-none">12</span>
                </div>
              </div>

              {/* Rating Card */}
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-200/50 flex flex-col justify-between min-h-[160px] group hover:shadow-md transition-shadow duration-200">
                <div className="w-10 h-10 rounded-full bg-[#FCF8E3] flex items-center justify-center">
                  <Star size={20} className="text-[#F1C40F] fill-[#F1C40F]" strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-0.5 mt-4">
                  <span className="text-[12px] font-bold text-gray-400 tracking-wider">RATING</span>
                  <span className="text-[32px] font-black text-gray-800 leading-none">4.9</span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Desktop only / Centered helper) */}
            <div className="flex flex-col gap-3 w-full bg-white rounded-[32px] p-6 border border-gray-200/50 shadow-sm mt-2">
              <div className="flex items-center gap-4">
                <div className="h-px bg-gray-100 flex-1" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">Quick Actions</span>
                <div className="h-px bg-gray-100 flex-1" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3.5 mt-1">
                <Link 
                  href="/therapist/session" 
                  className="bg-[#1DA349] hover:bg-[#15803d] text-white flex items-center gap-2.5 px-6 py-3 rounded-full text-[14px] font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PlayCircle size={18} strokeWidth={2.5} />
                  <span>Start Session</span>
                </Link>
                <Link 
                  href="/therapist/schedule" 
                  className="bg-[#EAF6ED] hover:bg-[#DDF4E4] text-[#1DA349] flex items-center gap-2.5 px-6 py-3 rounded-full text-[14px] font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar size={18} strokeWidth={2.5} />
                  <span>Schedule</span>
                </Link>
                <Link 
                  href="/therapist/messages" 
                  className="bg-[#F1F3F5] hover:bg-[#E9ECEF] text-gray-600 flex items-center gap-2.5 px-6 py-3 rounded-full text-[14px] font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageSquare size={18} strokeWidth={2.5} />
                  <span>Messages</span>
                </Link>
              </div>
            </div>

            {/* Today's Sessions list */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[20px] font-black text-gray-800">Today&apos;s Sessions</h2>
                <Link href="/therapist/schedule" className="text-[#1DA349] font-bold text-[14px] hover:underline decoration-2">
                  See all
                </Link>
              </div>
              
              <div className="flex flex-col gap-3.5">
                {/* Session 1 */}
                <div className="bg-white rounded-[28px] p-4.5 flex items-center justify-between shadow-sm border border-gray-200/50 hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-[64px] h-[64px] bg-[#FAF8F5] border border-gray-100 rounded-2xl flex flex-col items-center justify-center shadow-xs shrink-0 select-none">
                      <span className="text-[13px] font-bold text-gray-400">5:00</span>
                      <span className="text-[14px] font-black text-[#1DA349] leading-tight">PM</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[16px] font-bold text-gray-800">Anxiety Case</span>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <UserCircle2 size={16} strokeWidth={2} />
                        <span className="text-[14px] font-semibold">Sarah K.</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <Link 
                      href="/therapist/session"
                      className="w-12 h-12 rounded-full bg-[#EAF6ED] text-[#1DA349] hover:bg-[#DDF4E4] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                      title="Start video call"
                    >
                      <Video size={20} strokeWidth={2.5} />
                    </Link>
                    <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                {/* Session 2 */}
                <div className="bg-white rounded-[28px] p-4.5 flex items-center justify-between shadow-sm border border-gray-200/50 hover:border-gray-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-[64px] h-[64px] bg-[#FAF8F5] border border-gray-100 rounded-2xl flex flex-col items-center justify-center shadow-xs shrink-0 select-none">
                      <span className="text-[13px] font-bold text-gray-400">7:00</span>
                      <span className="text-[14px] font-black text-[#1DA349] leading-tight">PM</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[16px] font-bold text-gray-800">Follow-up</span>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <UserCircle2 size={16} strokeWidth={2} />
                        <span className="text-[14px] font-semibold">Mohamed J.</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <Link 
                      href="/therapist/session"
                      className="w-12 h-12 rounded-full bg-[#EAF6ED] text-[#1DA349] hover:bg-[#DDF4E4] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                      title="Start video call"
                    >
                      <Video size={20} strokeWidth={2.5} />
                    </Link>
                    <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Next Slot Banner */}
              <div className="bg-[#FAF4EC] border border-[#FDF0E0] rounded-2xl py-3.5 px-6 text-center text-[#B57C2F] font-bold text-[14px] shadow-xs mt-1">
                Next slot available at 9:00 PM
              </div>
            </div>

          </div>

          {/* Right Area (Quick Actions Card from Figma / Promotions) - Span 4 */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Quick Stats sidebar widget */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/50 shadow-sm flex flex-col gap-4">
              <h3 className="text-gray-800 font-black text-[17px] tracking-tight">Practice Summary</h3>
              <div className="h-px bg-gray-100 w-full" />
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-bold">Monthly Target</span>
                  <span className="text-gray-800 font-black">40 Hours</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1DA349] h-full w-[80%] rounded-full" />
                </div>
                <p className="text-[12.5px] text-gray-400 font-semibold leading-relaxed">
                  You are at 80% of your current monthly practice target. Keep it up!
                </p>
              </div>
            </div>

            {/* Quick help banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1DA349] to-[#0A6D32] rounded-[32px] p-6 text-white shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-6 -translate-y-6 blur-lg pointer-events-none" />
              <h4 className="text-[16px] font-black leading-tight">Need Assistance?</h4>
              <p className="text-[12px] text-white/80 leading-relaxed font-semibold mt-1.5">
                Our support desk is always here to assist with booking issues or clinical tools.
              </p>
              <Link 
                href="/therapist/profile" 
                className="mt-4 inline-block bg-white text-[#1DA349] text-[13px] font-black px-4.5 py-2 rounded-full text-center hover:bg-gray-50 transition-colors shadow-sm active:scale-95"
              >
                Go to Support
              </Link>
            </div>
            
          </div>
          
        </div>
      </div>

      <TherapistBottomNav />
    </div>
  );
}
