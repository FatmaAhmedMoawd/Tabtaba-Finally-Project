'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play, Wind, Moon, Music, Activity } from 'lucide-react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

const CATEGORIES = [
  { id: 'meditation', label: 'Meditation', Icon: Activity, color: 'text-[#10B981]', bg: 'bg-[#F0FDF4]' },
  { id: 'breathing', label: 'Breathing', Icon: Wind, color: 'text-[#10B981]', bg: 'bg-[#F0FDF4]' },
  { id: 'sleep', label: 'Sleep Stories', Icon: Moon, color: 'text-orange-400', bg: 'bg-[#FFF7ED]' },
  { id: 'music', label: 'Calming Music', Icon: Music, color: 'text-blue-400', bg: 'bg-[#EFF6FF]' },
];

export default function RelaxZonePage() {
  const router = useRouter();

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

      <div className="px-6 max-w-lg mx-auto flex flex-col gap-8">
        {/* Main Relax Zone Card */}
        <div className="bg-white rounded-[40px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#DBEAFE] flex items-center justify-center">
              <div className="flex flex-col gap-0.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-[2px] bg-[#3B82F6] rounded-full opacity-60" style={{ transform: `translateX(${i * 2}px)` }} />
                ))}
              </div>
            </div>
            <div className="w-9 h-9" aria-hidden="true" />
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <h2 className="text-[24px] font-bold text-[#1C1C1C]">Relax Zone</h2>
              <div className="flex items-center gap-2">
                <span className="bg-[#DCFCE7] text-[#15803D] text-[12px] font-bold px-3 py-1 rounded-full">
                  5 min Session
                </span>
              </div>
              <p className="text-gray-500 text-[15px] mt-1 font-medium">Deep Breathing Exercise</p>
            </div>

            <button className="w-14 h-14 bg-[#1E3A8A] rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
              <Play className="text-white fill-white ml-1" size={24} />
            </button>
          </div>
        </div>

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

      <BottomNav />
    </div>
  );
}
