'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Bell, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Star, 
  PlayCircle, 
  
  UserCircle2, 
  Video,
  Banknote
} from 'lucide-react';
import { TherapistBottomNav } from '@/widgets/therapist/ui/therapist-bottom-nav';

export default function TherapistDashboardPage() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F9F9] to-[#FDFDF5] font-inter relative pb-28 md:flex md:flex-col md:items-center w-full">
      <div className="w-full max-w-md mx-auto md:max-w-3xl pt-8 pb-6 px-6 relative">
        
        {/* Soft glowing orb */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#76D195] opacity-20 blur-[60px] rounded-full translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none" />
        
        <div className="relative z-10 w-full flex flex-col gap-6">
           {/* Header */}
           <div className="flex items-center justify-between w-full">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                 <Image 
                   src="https://randomuser.me/api/portraits/men/32.jpg" 
                   alt="Dr. yasser" 
                   width={48} 
                   height={48} 
                   className="w-full h-full object-cover" 
                 />
               </div>
               <span className="text-[20px] font-extrabold text-[#00AA4F]">Tabtaba</span>
             </div>
             <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors">
               <Bell size={24} className="text-[#0A9D46]" />
             </button>
           </div>

           {/* Greetings */}
           <div className="flex items-start justify-between mt-2">
             <div className="flex flex-col gap-1">
               <h1 className="text-[28px] font-extrabold text-[#4F5B7B] leading-tight">
                 Welcome back, Dr.<br />
                 yasser<span className="inline-block ml-1">👋</span>
               </h1>
               <p className="text-[15px] font-medium text-[#4F5B7B] opacity-80 mt-1">
                 You have 4 sessions remaining today.
               </p>
             </div>
            <div className="w-8 h-8" aria-hidden="true" />
           </div>

           {/* Earnings Card */}
           <div className="w-full bg-[#1EA34B] rounded-3xl p-6 shadow-lg shadow-green-600/20 relative overflow-hidden mt-2">
             {/* Decorative Background Icon */}
             <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                <Banknote size={160} strokeWidth={1} className="text-white transform -rotate-12" />
             </div>
             
             <div className="relative z-10 flex flex-col gap-1">
                <span className="text-white/90 font-semibold text-[14px]">Total Earnings</span>
                <span className="text-white font-extrabold text-[36px] tracking-tight">5,400 EGP</span>
                <div className="bg-[#14833B] w-fit rounded-full px-3 py-1.5 flex items-center gap-1.5 mt-2">
                   <TrendingUp size={14} className="text-white" />
                   <span className="text-white text-[12px] font-medium">12% from last week</span>
                </div>
             </div>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-2 gap-4">
             {/* Sessions */}
             <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4 border border-[#F1F5F9]">
               <div className="w-10 h-10 rounded-full bg-[#EAF6ED] flex items-center justify-center self-start">
                  <CalendarIcon size={20} className="text-[#22C55E]" strokeWidth={2.5} />
               </div>
               <div className="flex flex-col gap-0.5">
                 <span className="text-[12px] font-bold text-gray-500 tracking-wider">SESSIONS</span>
                 <span className="text-[28px] font-extrabold text-gray-900">12</span>
               </div>
             </div>

             {/* Rating */}
             <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4 border border-[#F1F5F9]">
               <div className="w-10 h-10 rounded-full bg-[#Fef9c3] flex items-center justify-center self-start">
                  <Star size={20} className="text-[#EAB308] fill-[#EAB308]" strokeWidth={2.5} />
               </div>
               <div className="flex flex-col gap-0.5">
                 <span className="text-[12px] font-bold text-gray-500 tracking-wider">RATING</span>
                 <span className="text-[28px] font-extrabold text-gray-900">4.9</span>
               </div>
             </div>
           </div>

           {/* Quick Actions */}
           <div className="flex flex-col gap-4 mt-2">
             <h2 className="text-[20px] font-extrabold text-gray-900">Quick Actions</h2>
             <div className="grid grid-cols-2 gap-3">
               <Link href="/therapist/session" className="bg-[#1DA349] hover:bg-[#15803d] transition-colors text-white rounded-full py-4 px-4 flex items-center justify-center gap-2 font-bold shadow-sm">
                 <PlayCircle size={20} strokeWidth={2.5} />
                 <span>Start Session</span>
               </Link>
               <Link href="/therapist/schedule" className="bg-[#EAF6ED] hover:bg-[#DDF4E4] transition-colors text-[#1DA349] rounded-full py-4 px-4 flex items-center justify-center gap-2 font-bold shadow-sm">
                 <CalendarIcon size={20} strokeWidth={2.5} />
                 <span>Schedule</span>
               </Link>
             </div>
           </div>

           {/* Today's Sessions */}
           <div className="flex flex-col gap-4 mt-4">
             <div className="flex items-center justify-between">
               <h2 className="text-[20px] font-extrabold text-gray-900">Today&apos;s Sessions</h2>
               <Link href="/therapist/sessions" className="text-[#1DA349] font-bold text-[14px]">
                 See all
               </Link>
             </div>
             
             <div className="flex flex-col gap-4">
               {/* Session 1 */}
               <div className="bg-[#FAFAFA] rounded-3xl p-4 flex items-center justify-between shadow-sm border border-[#F1F5F9]">
                  <div className="flex items-center gap-4">
                    <div className="w-[60px] h-[60px] bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm">
                      <span className="text-[13px] font-bold text-[#8997A5]">5:00</span>
                      <span className="text-[15px] font-black text-[#1DA349]">PM</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[16px] font-bold text-gray-900">Anxiety Case</span>
                      <div className="flex items-center gap-1.5 text-[#8997A5]">
                        <UserCircle2 size={16} strokeWidth={2} />
                        <span className="text-[14px] font-medium">Sarah K.</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-[#EAF6ED] flex items-center justify-center text-[#1DA349] shrink-0">
                    <Video size={20} strokeWidth={2.5} />
                  </button>
               </div>

               {/* Session 2 */}
               <div className="bg-[#FAFAFA] rounded-3xl p-4 flex items-center justify-between shadow-sm border border-[#F1F5F9]">
                  <div className="flex items-center gap-4">
                    <div className="w-[60px] h-[60px] bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm">
                      <span className="text-[13px] font-bold text-[#8997A5]">7:00</span>
                      <span className="text-[15px] font-black text-[#1DA349]">PM</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[16px] font-bold text-gray-900">Follow-up</span>
                      <div className="flex items-center gap-1.5 text-[#8997A5]">
                        <UserCircle2 size={16} strokeWidth={2} />
                        <span className="text-[14px] font-medium">Mohamed J.</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-[#EAF6ED] flex items-center justify-center text-[#1DA349] shrink-0">
                    <Video size={20} strokeWidth={2.5} />
                  </button>
               </div>
             </div>
           </div>
        </div>
      </div>

      <TherapistBottomNav />
    </div>
  );
}
