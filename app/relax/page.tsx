'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wind, Headphones, FileText, Activity } from 'lucide-react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

const EXERCISES = [
  {
    id: 'breathing',
    title: 'Box Breathing',
    duration: '5 min session',
    Icon: Wind,
    iconBg: 'bg-[#10B981]',
    href: '/relax/zone',
  },
  {
    id: 'meditation',
    title: 'Self-Compassion Meditation',
    duration: '10 min session',
    Icon: Activity,
    iconBg: 'bg-[#10B981]',
    href: '#',
  },
  {
    id: 'sounds',
    title: 'Calm Nature Sounds',
    duration: '20 min session',
    Icon: Headphones,
    iconBg: 'bg-white border border-orange-400',
    iconColor: 'text-orange-400',
    href: '#',
  },
  {
    id: 'journal',
    title: 'Daily Journal',
    duration: 'Open entry',
    Icon: FileText,
    iconBg: 'bg-white border border-blue-400',
    iconColor: 'text-blue-400',
    href: '/relax/exercises',
  },
];

export default function RelaxPage() {
  return (
    <div className="min-h-screen bg-white font-inter pb-32">
      {/* Header with Logo */}
      <div className="flex flex-col items-center pt-8 pb-6">
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

      {/* Exercises List */}
      <div className="px-6 flex flex-col gap-5 max-w-lg mx-auto">
        {EXERCISES.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${exercise.iconBg}`}
              >
                <exercise.Icon
                  className={`w-7 h-7 ${exercise.iconColor || 'text-white'}`}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[#1C1C1C] text-[17px] leading-tight mb-1">
                  {exercise.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <span className="text-[12px] font-medium flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {exercise.duration}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={exercise.href}
              className="bg-[#EBF5F1] text-[#0D7A39] px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#D7EDE4] transition-colors"
            >
              Start<br />Now
            </Link>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
