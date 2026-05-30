'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon,
  Video,
  Plus,
  
  MessageSquare
} from 'lucide-react';
import { TherapistBottomNav } from '@/widgets/therapist/ui/therapist-bottom-nav';

export default function SchedulePage() {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F9F9] to-[#FDFDF5] font-inter relative pb-32 md:flex md:flex-col md:items-center w-full">
      <div className="w-full max-w-md mx-auto md:max-w-3xl pt-10 pb-6 px-6 relative">
        
        {/* Header */}
        <div className="flex items-start justify-between w-full mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-[#4F5B7B] text-[16px] font-medium opacity-80">October 2023</span>
            <h1 className="text-[32px] font-extrabold text-[#006D32] leading-tight">
              Your Weekly<br />Schedule
            </h1>
          </div>
          <div className="flex flex-col items-end gap-6">
            <div className="w-6 h-6" aria-hidden="true" />
            <div className="w-12 h-12 rounded-2xl bg-[#EAF6ED] flex items-center justify-center border border-white/50 shadow-sm">
              <CalendarIcon size={24} className="text-[#006D32]" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar snap-x">
          {/* Day 1 */}
          <div className="min-w-[70px] h-[90px] rounded-[24px] bg-white flex flex-col items-center justify-center gap-1 shadow-sm border border-[#F1F5F9] shrink-0 snap-start">
            <span className="text-[#8997A5] text-[13px] font-semibold">Sat</span>
            <span className="text-[#1D2D50] text-[22px] font-bold">14</span>
          </div>
          {/* Day 2 */}
          <div className="min-w-[70px] h-[90px] rounded-[24px] bg-white flex flex-col items-center justify-center gap-1 shadow-sm border border-[#F1F5F9] shrink-0 snap-start">
            <span className="text-[#8997A5] text-[13px] font-semibold">Sun</span>
            <span className="text-[#1D2D50] text-[22px] font-bold">15</span>
          </div>
          {/* Day 3 (Active) */}
          <div className="min-w-[70px] h-[90px] rounded-[24px] bg-[#006D32] flex flex-col items-center justify-center gap-1 shadow-lg shadow-green-600/20 shrink-0 snap-start">
            <span className="text-white/80 text-[13px] font-semibold">Mon</span>
            <span className="text-white text-[22px] font-bold">16</span>
          </div>
          {/* Day 4 */}
          <div className="min-w-[70px] h-[90px] rounded-[24px] bg-white flex flex-col items-center justify-center gap-1 shadow-sm border border-[#F1F5F9] shrink-0 snap-start">
            <span className="text-[#8997A5] text-[13px] font-semibold">Tue</span>
            <span className="text-[#1D2D50] text-[22px] font-bold">17</span>
          </div>
          {/* Day 5 */}
          <div className="min-w-[70px] h-[90px] rounded-[24px] bg-white flex flex-col items-center justify-center gap-1 shadow-sm border border-[#F1F5F9] shrink-0 snap-start">
            <span className="text-[#8997A5] text-[13px] font-semibold">Wed</span>
            <span className="text-[#1D2D50] text-[22px] font-bold">18</span>
          </div>
          {/* Day 6 */}
          <div className="min-w-[70px] h-[90px] rounded-[24px] bg-white flex flex-col items-center justify-center gap-1 shadow-sm border border-[#F1F5F9] shrink-0 snap-start">
            <span className="text-[#8997A5] text-[13px] font-semibold">Thu</span>
            <span className="text-[#1D2D50] text-[22px] font-bold">19</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-3 mt-4 mb-6">
          <button className="bg-[#22C55E] text-white px-6 py-2.5 rounded-full font-bold text-[14px] shadow-sm">
            All (8)
          </button>
          <button className="bg-[#F8FAFC] text-[#4F5B7B] px-6 py-2.5 rounded-full font-semibold text-[14px] border border-[#E2E8F0]">
            Video
          </button>
          <button className="bg-[#F8FAFC] text-[#4F5B7B] px-6 py-2.5 rounded-full font-semibold text-[14px] border border-[#E2E8F0]">
            Chat
          </button>
        </div>

        {/* Session Cards */}
        <div className="flex flex-col gap-4">
          
          {/* Card 1 */}
          <div className="bg-white rounded-[32px] p-5 shadow-sm border border-[#F1F5F9]">
            <div className="flex items-start justify-between border-b border-[#F1F5F9] pb-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-black/5">
                  <Image 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Ahmed Mohammed" 
                    width={60} 
                    height={60} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[18px] font-bold text-[#1D2D50] leading-tight">Ahmed<br />Mohammed</span>
                  <span className="text-[#8997A5] text-[13px] font-medium mt-1">Initial Consultation</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#006D32] font-extrabold text-[16px]">09:00<br />AM</span>
                <span className="text-[#8997A5] text-[12px] font-medium">50 mins</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="bg-[#EAF6ED] text-[#22C55E] px-4 py-2 rounded-xl flex items-center gap-2">
                <Video size={16} strokeWidth={2.5} />
                <span className="text-[13px] font-bold">Video Call</span>
              </div>
              <Link href="/therapist/session" className="text-[#006D32] font-extrabold text-[15px] px-2">
                Start Session
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[32px] p-5 shadow-sm border border-[#F1F5F9]">
            <div className="flex items-start justify-between border-b border-[#F1F5F9] pb-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-black/5">
                  <Image 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sara Khalid" 
                    width={60} 
                    height={60} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[18px] font-bold text-[#1D2D50] leading-tight">Sara Khalid</span>
                  <span className="text-[#8997A5] text-[13px] font-medium mt-1">Weekly Follow-up</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#006D32] font-extrabold text-[16px]">11:30 AM</span>
                <span className="text-[#8997A5] text-[12px] font-medium">40 mins</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="bg-[#EAF6ED] text-[#22C55E] px-4 py-2 rounded-xl flex items-center gap-2">
                <MessageSquare size={16} strokeWidth={2.5} />
                <span className="text-[13px] font-bold">Chat Session</span>
              </div>
              <button className="text-[#006D32] font-extrabold text-[15px] px-2">
                Open Chat
              </button>
            </div>
          </div>

          {/* Empty Slot */}
          <div className="border-2 border-dashed border-[#E2E8F0] rounded-[32px] p-8 flex flex-col items-center justify-center gap-3 bg-[#F8FAFC]/50 mt-2">
            <CalendarIcon size={28} className="text-[#BAC7D5]" strokeWidth={2} />
            <span className="text-[#4F5B7B] text-[15px] font-medium">No sessions scheduled at 01:00 PM</span>
            <button className="text-[#22C55E] font-bold text-[15px] mt-1">
              View Available Slots
            </button>
          </div>

        </div>

        {/* Add Availability Button */}
        <div className="w-full flex justify-end mt-8 mb-16">
          <button className="bg-[#1DA349] hover:bg-[#15803d] text-white px-5 py-4 rounded-full flex items-center gap-2 shadow-sm transition-colors">
            <Plus size={24} strokeWidth={2.5} />
            <span className="font-bold text-[16px]">Add Availability</span>
          </button>
        </div>

      </div>

      <TherapistBottomNav />
    </div>
  );
}
