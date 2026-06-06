'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Play, Wind, Moon, Music, Activity, Headphones } from 'lucide-react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

const CATEGORIES = [
  { id: 'meditation', label: 'Meditation', Icon: Activity, color: 'text-[#10B981]', bg: 'bg-[#F0FDF4]' },
  { id: 'breathing', label: 'Breathing', Icon: Wind, color: 'text-[#10B981]', bg: 'bg-[#F0FDF4]' },
  { id: 'sleep', label: 'Sleep Stories', Icon: Moon, color: 'text-orange-400', bg: 'bg-[#FFF7ED]' },
  { id: 'music', label: 'Calming Music', Icon: Music, color: 'text-blue-400', bg: 'bg-[#EFF6FF]' },
];

const EXERCISE_MAP: Record<string, {
  title: string;
  badge: string;
  subtitle: string;
  Icon: React.ComponentType<any>;
  iconColor: string;
  iconBg: string;
}> = {
  breathing: {
    title: 'Box Breathing',
    badge: '5 min Session',
    subtitle: 'Box Breathing Exercise',
    Icon: Wind,
    iconColor: 'text-[#10B981]',
    iconBg: 'bg-[#E6F4EA]',
  },
  meditation: {
    title: 'Self-Compassion',
    badge: '10 min Session',
    subtitle: 'Self-Compassion Meditation',
    Icon: Activity,
    iconColor: 'text-[#10B981]',
    iconBg: 'bg-[#E6F4EA]',
  },
  sounds: {
    title: 'Natural Sounds',
    badge: '20 min Session',
    subtitle: 'Calm Nature Sounds',
    Icon: Headphones,
    iconColor: 'text-orange-400',
    iconBg: 'bg-[#FFF7ED]',
  },
};

function RelaxZoneContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || 'breathing';
  const details = EXERCISE_MAP[typeParam] || EXERCISE_MAP.breathing;

  return (
    <div className="min-h-screen bg-white font-inter pb-32">
      {/* Header with Logo and Back Button */}
      <div className="relative flex flex-col items-center pt-8 pb-6 px-6">
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
        
        {/* Left Column: Main Player Card */}
        <div className="lg:col-span-7 w-full">
          {/* Main Relax Zone Card */}
          <div className="bg-white rounded-[40px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-14 h-14 rounded-2xl ${details.iconBg} flex items-center justify-center`}>
              <details.Icon className={`w-7 h-7 ${details.iconColor}`} />
            </div>
            <div className="w-9 h-9" aria-hidden="true" />
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <h2 className="text-[24px] font-bold text-[#1C1C1C]">{details.title}</h2>
              <div className="flex items-center gap-2">
                <span className="bg-[#DCFCE7] text-[#15803D] text-[12px] font-bold px-3 py-1 rounded-full">
                  {details.badge}
                </span>
              </div>
              <p className="text-gray-500 text-[15px] mt-1 font-medium">{details.subtitle}</p>
            </div>

            <button className="w-14 h-14 bg-[#1E3A8A] rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
              <Play className="text-white fill-white ml-1" size={24} />
            </button>
          </div>
        </div>
        </div>

        {/* Right Column: Categories Grid */}
        <div className="lg:col-span-5 w-full lg:mt-0">
          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${cat.bg}`}>
                <cat.Icon className={`w-7 h-7 ${cat.color}`} />
              </div>
              <span className="text-[#1C1C1C] font-bold text-[16px]">{cat.label}</span>
            </div>
          ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default function RelaxZonePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center font-inter">
          <div className="w-12 h-12 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#10B981] font-bold">Loading Relax Zone...</p>
        </div>
      </div>
    }>
      <RelaxZoneContent />
    </Suspense>
  );
}
