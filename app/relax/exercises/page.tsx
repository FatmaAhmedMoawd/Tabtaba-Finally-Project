'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquareText } from 'lucide-react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

const TABS = ['Breathing', 'Meditation', 'Journal'];

export default function DailyExercisesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Journal');

  return (
    <div className="min-h-screen bg-white font-inter pb-32">
      {/* Header with Logo and Back Button */}
      <div className="relative flex flex-col items-center pt-8 pb-4 px-6">
        <button 
          onClick={() => router.back()}
          className="absolute left-6 top-10 p-2 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-700 z-10 hover:scale-110 transition-transform"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="relative w-44 h-24">
          <Image
            src="https://i.postimg.cc/D0XMhPXh/photo-2026-05-14-14-47-12.jpg"
            alt="Tabtaba Logo"
            fill
            className="object-contain mix-blend-multiply scale-[1.2]"
            priority
          />
        </div>
      </div>

      <div className="px-6 w-full max-w-lg md:max-w-3xl lg:max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
        
        {/* Left Column: Info & Tabs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
        {/* Banner */}
        <div className="bg-[#99F6B4] text-[#166534] py-3 px-6 rounded-[20px] font-bold text-[13px] uppercase tracking-wider leading-snug">
          YOUR COMPANION IN THE MENTAL HEALTH JOURNEY
        </div>

        {/* Page Title */}
        <h1 className="text-[32px] font-bold text-[#1C1C1C] leading-[1.1]">
          Daily exercises to improve your mental health
        </h1>

        {/* Tabs */}
        <div className="bg-[#EAECEE] p-1.5 rounded-[24px] flex gap-2 mx-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-full text-[14px] font-bold transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#15418B] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

        {/* Right Column: Journal Entry Form */}
        <div className="lg:col-span-6 w-full">
          {/* Journal Card */}
          <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 relative overflow-hidden flex flex-col gap-5 pt-7">
          {/* Decorative Shape */}
          <div className="absolute top-0 right-0 w-[180px] h-[190px] bg-gradient-to-br from-[#77D489] to-[#88E49D] rounded-bl-[90px] z-0" />
          
          <div className="relative flex items-center gap-2.5 text-[#1C1C1C]">
            <div className="flex flex-col gap-[3px] ml-1 mt-0.5">
               <div className="w-[14px] h-[2.5px] bg-[#15418B] rounded-full" />
               <div className="w-[14px] h-[2.5px] bg-[#15418B] rounded-full" />
               <div className="w-[10px] h-[2.5px] bg-[#15418B] rounded-full" />
               <svg className="w-4 h-4 text-[#15418B] absolute -right-3 -bottom-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12 20h9" />
                 <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
               </svg>
            </div>
            <span className="font-bold text-[18px] ml-3 text-gray-800 tracking-tight text-center flex items-center">Your Daily Question</span>
          </div>

          <h2 className="relative text-[20px] font-bold text-[#15418B] leading-snug pr-8 tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            What are the three things I am grateful for today?
          </h2>

          <div className="relative bg-[#F4F6F8] rounded-[24px] p-5 h-56 flex flex-col mt-2">
            <textarea
              className="w-full flex-1 bg-transparent border-none focus:ring-0 text-gray-600 text-[15px] resize-none placeholder:text-gray-400"
              placeholder="Write your thoughts and feelings here..."
            />
            {/* Save Button inside textarea container */}
            <div className="flex justify-end mt-2">
              <button className="bg-gradient-to-r from-[#177F4A] to-[#2BA85D] text-white px-7 py-3.5 rounded-[18px] font-bold text-[14px] shadow-md hover:opacity-95 transition-opacity">
                Save Entry
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
