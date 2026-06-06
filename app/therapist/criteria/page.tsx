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
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter relative pb-28 pt-6">
      
      {/* Decorative Background blur */}
      <div className="absolute top-0 right-0 w-[40%] aspect-square rounded-full bg-[#0A9D46]/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[40%] aspect-square rounded-full bg-[#1A448E]/5 blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto w-full px-6 flex flex-col items-center relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute left-6 top-2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#0A9D46] hover:scale-110 transition-transform active:scale-95 cursor-pointer"
          aria-label="Go back"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        {/* Logo */}
        <div className="relative w-44 h-20 mb-2">
          <Image
            src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
            alt="Tabtaba Logo"
            fill
            className="object-contain mix-blend-multiply scale-[1.1]"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-[#0A9D46] text-[22px] md:text-[26px] font-black mb-8 text-center tracking-tight">
          Required criteria for each category
        </h1>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4">
          
          {/* Card 1: Psychiatrist */}
          <div className="bg-white/80 backdrop-blur-md border border-gray-100/80 rounded-[28px] p-6 shadow-sm hover:shadow-md hover:border-[#0A9D46]/20 transition-all hover:scale-[1.01] flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#E8F8EC] rounded-[18px] flex items-center justify-center shrink-0">
                <Briefcase className="w-7 h-7 text-[#0A9D46]" strokeWidth={1.5} />
              </div>
              <h2 className="text-[20px] font-black text-gray-900 leading-tight">
                Psychiatrist
              </h2>
            </div>
            
            <ul className="flex flex-col gap-4.5 flex-1">
              <li className="flex items-start gap-3 w-full">
                <GraduationCap className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Graduation certificate</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <IdCard className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Professional license</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <BadgeCheck className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Medical association certificate</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <Award className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Postgraduate degree (Master&apos;s or PhD)</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
            </ul>
          </div>

          {/* Card 2: Clinical Psychotherapist */}
          <div className="bg-white/80 backdrop-blur-md border border-gray-100/80 rounded-[28px] p-6 shadow-sm hover:shadow-md hover:border-[#0A9D46]/20 transition-all hover:scale-[1.01] flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#E8F8EC] rounded-[18px] flex items-center justify-center shrink-0">
                <Brain className="w-7 h-7 text-[#0A9D46]" strokeWidth={1.5} />
              </div>
              <h2 className="text-[20px] font-black text-gray-900 leading-tight">
                Clinical Psychotherapist
              </h2>
            </div>
            
            <ul className="flex flex-col gap-4.5 flex-1">
              <li className="flex items-start gap-3 w-full">
                <Brain className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Master of Science or Arts in Clinical Psychology</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <TrendingUp className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Years of clinical experience</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <Users className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Proof of supervision</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
            </ul>
          </div>

          {/* Card 3: Psychological Counselor */}
          <div className="bg-white/80 backdrop-blur-md border border-gray-100/80 rounded-[28px] p-6 shadow-sm hover:shadow-md hover:border-[#0A9D46]/20 transition-all hover:scale-[1.01] flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#E8F8EC] rounded-[18px] flex items-center justify-center shrink-0">
                <MessageSquare className="w-7 h-7 text-[#0A9D46]" strokeWidth={1.5} />
              </div>
              <h2 className="text-[20px] font-black text-gray-900 leading-tight">
                Psychological Counselor
              </h2>
            </div>
            
            <ul className="flex flex-col gap-4.5 flex-1">
              <li className="flex items-start gap-3 w-full">
                <BookOpen className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Master of Science or Arts in Psychology</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <ScrollText className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Years of experience in psychological counseling</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
              <li className="flex items-start gap-3 w-full">
                <Users className="w-5 h-5 text-[#1A448E] shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 text-[#4A5568] text-[14px] md:text-[15px] leading-tight font-medium">Proof of supervision</span>
                <CheckCircle2 className="w-5.5 h-5.5 text-[#0A9D46] shrink-0 mt-0.5" strokeWidth={2.5} />
              </li>
            </ul>
          </div>

        </div>
        
        {/* Continue Button */}
        <div className="fixed bottom-6 right-6 z-50 md:static md:bottom-auto md:right-auto md:z-auto mt-8 w-full md:w-auto flex justify-end md:justify-center px-6 md:px-0">
          <Link 
            href="/therapist/register" 
            className="bg-[#009E45] hover:bg-[#008c3d] text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-[16px] shadow-[0_6px_20px_rgba(0,158,69,0.25)] transition-all hover:scale-[1.03] active:scale-[0.98] min-w-[160px] md:min-w-[200px]"
          >
             <span>Continue</span>
             <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </div>
  );
}

