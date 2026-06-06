'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Wind, 
  Moon, 
  Lightbulb, 
  Heart, 
  Play, 
  Clock, 
  CloudRain, 
  Trees, 
  ArrowRight,
  Sparkles,
  Volume2,
  Headphones,
  FileText,
  Activity
} from 'lucide-react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

const FILTER_CHIPS = ['All Exercises', 'Meditation', 'Deep Breathing', 'Articles', 'Soundscapes'];

// Data for Old Mobile Layout
const MOBILE_EXERCISES = [
  {
    id: 'breathing',
    title: 'Box Breathing',
    duration: '5 min session',
    Icon: Wind,
    iconBg: 'bg-[#10B981]',
    href: '/relax/zone?type=breathing',
  },
  {
    id: 'meditation',
    title: 'Self-Compassion Meditation',
    duration: '10 min session',
    Icon: Activity,
    iconBg: 'bg-[#10B981]',
    href: '/relax/zone?type=meditation',
  },
  {
    id: 'sounds',
    title: 'Calm Nature Sounds',
    duration: '20 min session',
    Icon: Headphones,
    iconBg: 'bg-white border border-orange-400',
    iconColor: 'text-orange-400',
    href: '/relax/zone?type=sounds',
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

// Data for New Desktop Layout
const DESKTOP_EXERCISES = [
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    duration: '5 MIN',
    description: 'Quick reset for moments of high anxiety or stress.',
    Icon: Wind,
    iconColor: 'text-[#10B981]',
    iconBg: 'bg-[#E6F4F0]',
    href: '/relax/zone?type=breathing',
  },
  {
    id: 'sleep-gateway',
    title: 'Sleep Gateway',
    duration: '20 MIN',
    description: 'Guided imagery to help you drift into a restful slumber.',
    Icon: Moon,
    iconColor: 'text-[#3B82F6]',
    iconBg: 'bg-[#EFF6FF]',
    href: '/relax/zone?type=sounds',
  },
  {
    id: 'mindful-focus',
    title: 'Mindful Focus',
    duration: '10 MIN',
    description: 'Sharpen your presence and clarity during work hours.',
    Icon: Lightbulb,
    iconColor: 'text-[#F59E0B]',
    iconBg: 'bg-[#FEF3C7]',
    href: '/relax/zone?type=meditation',
  },
  {
    id: 'grief-support',
    title: 'Grief Support',
    duration: '12 MIN',
    description: 'A gentle space to sit with difficult emotions and heal.',
    Icon: Heart,
    iconColor: 'text-[#EF4444]',
    iconBg: 'bg-[#FEE2E2]',
    href: '/relax/exercises',
  },
];

export default function RelaxPage() {
  const [activeFilter, setActiveFilter] = useState('All Exercises');
  const [favoriteFeatured, setFavoriteFeatured] = useState(false);

  return (
    <>
      {/* ========================================================
          OLD MOBILE LAYOUT (Exactly as it was originally)
          ======================================================== */}
      <div className="block md:hidden min-h-screen bg-white font-inter pb-32">
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
        <div className="px-6 grid grid-cols-1 gap-5 w-full max-w-lg mx-auto">
          {MOBILE_EXERCISES.map((exercise) => (
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
                    <span className="block md:hidden">
                      {exercise.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </span>
                    <span className="hidden md:inline">{exercise.title}</span>
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
                className="bg-[#EBF5F1] text-[#0D7A39] px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#D7EDE4] transition-colors shrink-0 text-center"
              >
                Start<br />Now
              </Link>
            </div>
          ))}
        </div>

        <BottomNav />
      </div>

      {/* ========================================================
          NEW HIGH-FIDELITY WEB DESKTOP LAYOUT (Exactly matching mockup)
          ======================================================== */}
      <div className="hidden md:block min-h-screen bg-[#FCFAF6] font-inter px-8 pb-16">
        {/* Subheader Title Section */}
        <div className="mb-8 pt-2">
          <span className="text-[11px] font-black text-[#0D7A39] tracking-widest uppercase">RELAX</span>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight mt-1">
            Find your inner peace
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl mt-1 leading-relaxed font-medium">
            Curated sessions and articles designed to help you unwind, breathe, and restore your mental baseline.
          </p>
        </div>

        {/* Filter Chips Row */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {FILTER_CHIPS.map((chip) => {
            const isSelected = activeFilter === chip;
            return (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                  isSelected 
                    ? 'bg-[#0D7A39] text-white shadow-[#0D7A39]/10' 
                    : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Featured Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Card: Featured Session */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#E8F5EE] to-[#F1FAF5] rounded-[32px] p-8 border border-white shadow-sm flex flex-col justify-between relative min-h-[300px] overflow-hidden group">
            {/* Subtle abstract background art */}
            <div className="absolute right-4 bottom-4 w-48 h-48 opacity-10 pointer-events-none transition-transform group-hover:scale-105 duration-500">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#0D7A39] fill-none" stroke="currentColor" strokeWidth="2">
                <circle cx="50" cy="50" r="40" />
                <path d="M50 10 C30 40, 70 40, 50 90" />
                <path d="M10 50 C40 30, 40 70, 90 50" />
              </svg>
            </div>

            <div className="flex justify-between items-start w-full z-10">
              <div>
                <span className="bg-[#D1E7DD] text-[#0F5132] text-[10px] font-black tracking-wider px-3 py-1 rounded-full uppercase">
                  FEATURED
                </span>
                <h2 className="text-[26px] font-black text-gray-900 leading-tight mt-3">
                  Deep Morning Calm
                </h2>
                <p className="text-gray-600 text-sm max-w-lg mt-2 leading-relaxed font-medium">
                  A guided meditation session focused on setting positive intentions and grounding your energy for the day ahead.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-[11px] font-black text-gray-600 border border-white/50 shadow-sm">
                <Clock size={12} strokeWidth={2.5} />
                <span>15 MIN</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 z-10">
              <Link 
                href="/relax/zone?type=meditation"
                className="bg-[#0D7A39] hover:bg-[#0B6630] text-white px-6 py-3.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-[0.98]"
              >
                <Play size={12} fill="currentColor" />
                <span>Start Session</span>
              </Link>
              <button 
                onClick={() => setFavoriteFeatured(!favoriteFeatured)}
                className={`w-11 h-11 rounded-full border border-gray-200/80 bg-white flex items-center justify-center transition-all cursor-pointer ${
                  favoriteFeatured ? 'text-red-500 bg-red-50 border-red-200' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Heart size={16} strokeWidth={favoriteFeatured ? 0 : 2} fill={favoriteFeatured ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Right Card: Article of the Day */}
          <div className="lg:col-span-4 bg-[#FAF7F3] rounded-[32px] p-6 border border-[#ECE6DD] shadow-sm flex flex-col justify-between min-h-[300px]">
            <div className="flex flex-col gap-4">
              {/* Header / Image section */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-black text-[#855D2C] tracking-wider uppercase">
                    ARTICLE OF THE DAY
                  </span>
                  <h3 className="text-lg font-black text-gray-900 leading-tight mt-1.5">
                    The Science of Deep Breathing
                  </h3>
                </div>
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-[#E9E1D5]">
                  <Image 
                    src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=200" 
                    alt="Leaf Image" 
                    fill
                    className="object-cover" 
                  />
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed font-[500]">
                Understand how controlled breathing impacts your vagus nerve and lowers stress hormones instantly.
              </p>
            </div>

            <Link 
              href="/relax/exercises"
              className="text-[#855D2C] hover:text-[#63441F] font-bold text-xs flex items-center gap-1.5 transition-colors mt-4"
            >
              <span>Read more</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Grid of 4 Small Exercise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {DESKTOP_EXERCISES.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-gray-100/50 flex flex-col justify-between min-h-[190px] relative hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-shadow duration-300"
            >
              <div>
                {/* Top row with icon & duration */}
                <div className="flex justify-between items-center mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.iconBg}`}>
                    <item.Icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 tracking-wider">
                    {item.duration}
                  </span>
                </div>
                
                <h3 className="font-black text-gray-900 text-base leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1.5 leading-relaxed font-[500]">
                  {item.description}
                </p>
              </div>

              <Link 
                href={item.href}
                className="mt-4 flex items-center justify-center gap-1 py-2 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-xs border border-gray-100 transition-colors"
              >
                <Play size={10} fill="currentColor" className="mr-0.5" />
                <span>Play</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Nature Soundscapes Banner */}
        <div className="bg-[#1A1A1A] rounded-[32px] overflow-hidden border border-[#2A2A2A] shadow-lg flex flex-col md:flex-row">
          {/* Left Side Green Block with Wave */}
          <div className="md:w-1/3 bg-[#22C55E] flex items-center justify-center py-10 md:py-0 min-h-[160px] relative overflow-hidden">
            {/* Animated Wave representation */}
            <div className="flex flex-col gap-1.5 items-center justify-center text-white">
              <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12c4-4 8 4 12 0s8-4 10 0" />
                <path d="M2 17c4-4 8 4 12 0s8-4 10 0" className="opacity-70" />
                <path d="M2 7c4-4 8 4 12 0s8-4 10 0" className="opacity-45" />
              </svg>
            </div>
          </div>

          {/* Right Side Content Block */}
          <div className="md:w-2/3 p-8 flex flex-col justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-xl tracking-tight">
                Nature Soundscapes
              </h3>
              <p className="text-gray-400 text-xs mt-1.5 leading-relaxed max-w-xl font-[500]">
                Immerse yourself in high-fidelity recordings of rainforests, ocean waves, and mountain winds. Perfect for focus or deep sleep.
              </p>
            </div>

            {/* Track capsules block */}
            <div className="flex flex-wrap gap-3">
              {/* Track 1 */}
              <Link 
                href="/relax/zone?type=sounds"
                className="flex items-center justify-between gap-6 bg-[#2B2B2D]/60 hover:bg-[#3B3B3D]/80 border border-[#3A3A3D]/40 rounded-2xl px-4 py-2.5 text-left transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <CloudRain size={16} className="text-[#22C55E]" strokeWidth={2.5} />
                  <div>
                    <span className="text-white text-xs font-bold block leading-none">Summer Rain</span>
                    <span className="text-[9px] text-gray-500 font-extrabold block mt-0.5 tracking-wider uppercase">10 MIN LOOP</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black shrink-0 shadow-sm">
                  <Play size={8} fill="currentColor" className="ml-0.5" />
                </div>
              </Link>

              {/* Track 2 */}
              <Link 
                href="/relax/zone?type=sounds"
                className="flex items-center justify-between gap-6 bg-[#2B2B2D]/60 hover:bg-[#3B3B3D]/80 border border-[#3A3A3D]/40 rounded-2xl px-4 py-2.5 text-left transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Trees size={16} className="text-orange-400" strokeWidth={2.5} />
                  <div>
                    <span className="text-white text-xs font-bold block leading-none">Amazon Forest</span>
                    <span className="text-[9px] text-gray-500 font-extrabold block mt-0.5 tracking-wider uppercase">15 MIN LOOP</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black shrink-0 shadow-sm">
                  <Play size={8} fill="currentColor" className="ml-0.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
