'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  Brain, 
  MessageSquare,
  GraduationCap,
  IdCard,
  BadgeCheck,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  ScrollText,
  CheckCircle2,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

export default function TherapistCriteriaPage() {
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter relative pb-24 overflow-x-hidden pt-6">
      <div className="max-w-md mx-auto w-full px-5 flex flex-col items-center">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute left-6 top-8 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#0A9D46] hover:scale-110 transition-transform active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        {/* Logo */}
        <div className="relative w-44 h-24 mb-4">
          <Image
            src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
            alt="Tabtaba Logo"
            fill
            className="object-contain mix-blend-multiply scale-[1.2]"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-[#0A9D46] text-[20px] font-bold mb-8 text-center font-inter tracking-tight">
          Required criteria for each category:
        </h1>

        <div className="w-full flex flex-col gap-8">
          
          {/* Section 1: Psychiatrist */}
          <div className="flex flex-col relative pl-[4.5rem]">
            {/* Category Icon */}
            <div className="absolute left-0 top-0 w-14 h-14 bg-[#E8F8EC] rounded-[18px] flex flex-col items-center justify-center">
              <Briefcase className="w-7 h-7 text-[#0A9D46]" strokeWidth={1.5} />
              <div className="absolute top-[22px] right-[20px] w-2.5 h-2.5 bg-[#E8F8EC] rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-[#0A9D46] rounded-sm" />
              </div>
            </div>
            
            <h2 className="text-[22px] font-bold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Psychiatrist
            </h2>
            
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 w-full">
                <GraduationCap className="w-5 h-5 text-[#1A448E] shrink-0" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Graduation certificate</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0" strokeWidth={2} />
              </li>
              <li className="flex items-center gap-3 w-full">
                <IdCard className="w-5 h-5 text-[#1A448E] shrink-0" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Professional license</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0" strokeWidth={2} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <BadgeCheck className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Medical association<br/>certificate</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0 mt-1" strokeWidth={2} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <Award className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Postgraduate degree<br/>(Master&apos;s or PhD)</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0 mt-1" strokeWidth={2} />
              </li>
            </ul>
          </div>

          {/* Section 2: Clinical Psychotherapist */}
          <div className="flex flex-col relative pl-[4.5rem]">
            {/* Category Icon */}
            <div className="absolute left-0 top-0 w-14 h-14 bg-[#E8F8EC] rounded-[18px] flex items-center justify-center">
              <Brain className="w-7 h-7 text-[#0A9D46]" strokeWidth={1.5} />
            </div>
            
            <h2 className="text-[22px] font-bold text-gray-900 mb-4 tracking-tight leading-snug" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Clinical<br/>Psychotherapist
            </h2>
            
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 w-full">
                <Brain className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Master of Science or Arts in<br/>Clinical Psychology</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0 mt-1" strokeWidth={2} />
              </li>
              <li className="flex items-center gap-3 w-full">
                <TrendingUp className="w-5 h-5 text-[#1A448E] shrink-0" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Years of clinical experience</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0" strokeWidth={2} />
              </li>
              <li className="flex items-center gap-3 w-full">
                <Users className="w-5 h-5 text-[#1A448E] shrink-0" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Proof of supervision</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0" strokeWidth={2} />
              </li>
            </ul>
          </div>

          {/* Section 3: Psychological Counselor */}
          <div className="flex flex-col relative pl-[4.5rem]">
            {/* Category Icon */}
            <div className="absolute left-0 top-0 w-14 h-14 bg-[#E8F8EC] rounded-[18px] flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-[#0A9D46]" strokeWidth={1.5} />
            </div>
            
            <h2 className="text-[22px] font-bold text-gray-900 mb-4 tracking-tight leading-snug" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Psychological<br/>Counselor
            </h2>
            
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 w-full">
                <BookOpen className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Master of Science or Arts in<br/>Psychology</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0 mt-1" strokeWidth={2} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <ScrollText className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Years of experience in<br/>psychological counseling</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0 mt-1" strokeWidth={2} />
              </li>
              <li className="flex items-center gap-3 w-full">
                <Users className="w-5 h-5 text-[#1A448E] shrink-0" strokeWidth={2} />
                <span className="flex-1 text-[#222222] text-[16px] leading-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Proof of supervision</span>
                <CheckCircle2 className="w-6 h-6 text-[#0A9D46] shrink-0" strokeWidth={2} />
              </li>
            </ul>
          </div>

        </div>
        
        {/* Continue Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Link href="/therapist/register" className="bg-[#009E45] hover:bg-[#008c3d] text-white px-7 py-3.5 rounded-[14px] flex items-center justify-between gap-3 font-bold text-[15px] shadow-[0_4px_14px_rgba(0,158,69,0.3)] transition-transform active:scale-95 min-w-[150px]">
             <span>Continue</span>
             <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </div>
  );
}
