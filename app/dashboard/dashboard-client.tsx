'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/widgets/dashboard/ui/dashboard-header';
import { MoodSelector } from '@/widgets/dashboard/ui/mood-selector';
import { StatsGrid } from '@/widgets/dashboard/ui/stats-grid';
import { BottomActions } from '@/widgets/dashboard/ui/bottom-actions';

export function DashboardClient() {
  const [fullName, setFullName] = useState('Toka');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('profile_fullName');
      if (name) {
        setFullName(name);
      }
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
      <div className="animate-stagger-1">
        <DashboardHeader />
      </div>
      
      {/* Greeting Section - Desktop only */}
      <div className="animate-stagger-2 mt-4 px-4 md:px-0 hidden md:block">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">
          Good morning, {fullName.split(' ')[0]} 👋
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">
          We hope you are feeling well today. Here is your dashboard overview.
        </p>
      </div>

      {/* Vertically stacked sections spanning the full width */}
      <div className="flex flex-col gap-8 w-full mt-4">
        <div className="animate-stagger-3">
          <MoodSelector />
        </div>
        
        <div className="animate-stagger-4">
          <StatsGrid />
        </div>
        
        <div className="animate-stagger-5">
          <BottomActions />
        </div>
      </div>

      {/* Floating Chat Button - Mobile only */}
      <Link
        href="/chat?bot=true"
        className="md:hidden fixed bottom-[88px] right-5 z-40 w-14 h-14 rounded-full bg-[#30BE4F] shadow-[0_6px_24px_rgba(48,190,79,0.45)] flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Open AI chat"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          {/* Robot face */}
          <rect x="20" y="30" width="60" height="50" rx="12" fill="currentColor" />
          {/* Eyes */}
          <circle cx="36" cy="50" r="7" fill="white" />
          <circle cx="64" cy="50" r="7" fill="white" />
          <circle cx="38" cy="52" r="3.5" fill="#30BE4F" />
          <circle cx="66" cy="52" r="3.5" fill="#30BE4F" />
          {/* Mouth */}
          <rect x="35" y="65" width="30" height="5" rx="2.5" fill="white" opacity="0.85" />
          {/* Antenna */}
          <line x1="50" y1="30" x2="50" y2="18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="14" r="5" fill="currentColor" />
          {/* Ears */}
          <rect x="12" y="43" width="9" height="16" rx="4" fill="currentColor" />
          <rect x="79" y="43" width="9" height="16" rx="4" fill="currentColor" />
        </svg>
      </Link>
    </div>
  );
}

