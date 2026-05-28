'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MoreHorizontal, Star, Headphones, Heart, GraduationCap, ShieldCheck, MapPin, Search } from 'lucide-react';
import { DOCTORS } from '@/features/sessions/model/doctors';

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  // Find the doctor based on ID
  const doctor = DOCTORS.find((d) => d.id === id) || DOCTORS[0]; // fallback to first if not found

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F0F8FA] via-[#F6FBFD] to-[#FAFBFC] font-inter pb-24 relative">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20 bg-transparent">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-600 hover:bg-white/50 rounded-full transition-colors flex items-center">
          <ChevronLeft size={28} />
        </button>
        <button className="p-2 -mr-2 text-gray-500 hover:bg-white/50 rounded-full transition-colors flex items-center">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="max-w-lg lg:max-w-xl mx-auto w-full px-5 flex flex-col pt-2 pb-6">
        {/* Avatar */}
        <div className="flex justify-center relative mb-4">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden shrink-0 relative bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-4 border-white">
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
          {/* Online Indicator */}
          <div className="absolute bottom-1 right-[calc(50%-55px)] w-[22px] h-[22px] bg-[#0A9D46] border-4 border-white rounded-full z-10" />
        </div>

        {/* Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-1.5 mb-1.5">
            <h1 className="text-[26px] font-extrabold text-[#1C1C1C] text-center tracking-tight">{doctor.name}</h1>
            <ShieldCheck size={22} className="text-[#0A9D46] fill-[#E5F7EC]" />
          </div>
          
          <p className="text-[#5C7182] text-[16px] font-medium mb-2">{doctor.specialty}</p>
          
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="fill-[#FBBF24] text-[#FBBF24]" />
            <span className="text-[#FBBF24] text-[14px] font-bold">{doctor.rating.toFixed(1)}</span>
            <span className="text-[#A0B3C6]">-</span>
            <span className="text-[#5C7182] text-[14px]">(120 Reviews)</span>
          </div>

          <div className="bg-[#EBF3FB] px-4 py-2 rounded-xl flex items-center gap-2 mb-4">
            <Search size={16} className="text-[#0A9D46]" />
            <span className="text-[14px] font-bold text-[#0A9D46]">Best for: Overthinking & Anxiety</span>
          </div>

          <button className="bg-white border text-[#0A9D46] px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm shadow-[#0A9D46]/10 font-bold text-[14px] hover:bg-gray-50 transition-colors">
            <Headphones size={18} /> Listen to Intro
          </button>
        </div>

        {/* Patient Match */}
        <div className="bg-[#EDF4FF] rounded-3xl p-5 flex items-center justify-between mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0A9D46] rounded-full flex items-center justify-center shrink-0 shadow-md">
              <Heart size={24} className="text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#5C7182] text-[12px] font-bold tracking-wider uppercase mb-0.5">Patient Match</span>
              <span className="text-[#1C1C1C] text-[17px] font-extrabold">You match 92%</span>
            </div>
          </div>
          <span className="text-[#0A9D46] text-[28px] font-black">92%</span>
        </div>

        {/* About the Doctor */}
        <h2 className="text-[19px] font-bold text-[#1C1C1C] mb-4">About the Doctor</h2>
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-gray-50 flex flex-col">
          <p className="text-[16px] font-bold italic text-[#0A9D46] leading-snug mb-4">
            &quot;Helping you understand yourself and find peace within 💙&quot;
          </p>
          <p className="text-[#5C7182] text-[15px] leading-relaxed mb-6">
            With over 8 years of dedicated clinical experience, {doctor.name} specializes in cognitive-behavioral therapy for young adults. His approach combines empathetic listening with practical, evidence-based strategies to navigate life&apos;s most complex transitions and mental health challenges.
          </p>
          
          <div className="flex bg-transparent border-t border-gray-100 pt-5">
            <div className="flex-1 flex flex-col">
              <span className="text-[11px] font-bold text-[#A0B3C6] tracking-wider uppercase mb-1">Experience</span>
              <span className="text-[#1C1C1C] text-[16px] font-extrabold">+8 years</span>
            </div>
            <div className="w-[1px] bg-gray-100 mx-4"></div>
            <div className="flex-1 flex flex-col">
               <span className="text-[11px] font-bold text-[#A0B3C6] tracking-wider uppercase mb-1">Education</span>
               <span className="text-[#1C1C1C] text-[16px] font-extrabold">CBT Certified</span>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <h2 className="text-[19px] font-bold text-[#1C1C1C] mb-4">Specialties</h2>
        <div className="flex flex-wrap gap-2.5 mb-8">
          {doctor.tags.length > 0 ? doctor.tags.map((tag, idx) => (
            <span key={idx} className="bg-[#F2F4F7] text-[#1C1C1C] px-4 py-2 rounded-full text-[14px] font-bold capitalize">
              {tag.toLowerCase()}
            </span>
          )) : (
            <>
              <span className="bg-[#F2F4F7] text-[#1C1C1C] px-4 py-2 rounded-full text-[14px] font-bold">Anxiety</span>
              <span className="bg-[#F2F4F7] text-[#1C1C1C] px-4 py-2 rounded-full text-[14px] font-bold">Depression</span>
              <span className="bg-[#F2F4F7] text-[#1C1C1C] px-4 py-2 rounded-full text-[14px] font-bold">OCD</span>
              <span className="bg-[#F2F4F7] text-[#1C1C1C] px-4 py-2 rounded-full text-[14px] font-bold">ADHD</span>
            </>
          )}
        </div>

        {/* Education & Certifications */}
        <h2 className="text-[19px] font-bold text-[#1C1C1C] mb-4">Education & Certifications</h2>
        <div className="bg-white rounded-3xl p-5 mb-8 shadow-sm border border-gray-50 flex flex-col gap-5">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-[#F2FAF6] rounded-2xl flex items-center justify-center shrink-0">
              <GraduationCap size={24} className="text-[#0A9D46]" />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-[#1C1C1C] text-[16px] font-bold">Cairo University</span>
              <span className="text-[#5C7182] text-[14px]">BSc in Psychology, Faculty of Arts</span>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-[#F2FAF6] rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck size={24} className="text-[#0A9D46]" />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-[#1C1C1C] text-[16px] font-bold">Certified CBT Therapist</span>
              <span className="text-[#5C7182] text-[14px]">International Association of Cognitive Therapies</span>
            </div>
          </div>
        </div>

        {/* Available Slots */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[19px] font-bold text-[#1C1C1C]">Available Slots</h2>
          <button 
            onClick={() => router.push(`/calendar?doctorId=${doctor.id}`)}
            className="text-[#0A9D46] text-[14px] font-bold hover:underline"
          >
            View Calendar
          </button>
        </div>
        
        {/* Dates Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5 select-none touch-pan-x min-h-[100px]">
          {/* Active Date */}
          <button className="w-[72px] h-[92px] rounded-3xl bg-[#0A9D46] shadow-md shadow-green-100 flex flex-col items-center justify-center shrink-0">
            <span className="text-[#A2E2BB] text-[12px] font-extrabold uppercase mb-1">Mon</span>
            <span className="text-white text-[24px] font-black">12</span>
          </button>
          
          {[
            { day: 'Tue', date: '13' },
            { day: 'Wed', date: '14' },
            { day: 'Thu', date: '15' },
            { day: 'Fri', date: '16' },
            { day: 'Sat', date: '17' },
          ].map((item, idx) => (
            <button key={idx} className="w-[72px] h-[92px] rounded-3xl bg-white shadow-sm border border-gray-50 flex flex-col items-center justify-center shrink-0 hover:-translate-y-0.5 transition-transform">
              <span className="text-[#5C7182] text-[12px] font-extrabold uppercase mb-1">{item.day}</span>
              <span className="text-[#1C1C1C] text-[24px] font-black">{item.date}</span>
            </button>
          ))}
        </div>

        {/* Times Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8 px-0">
          <button className="bg-[#0A9D46] text-white py-3.5 rounded-2xl font-bold text-[14px] shadow-sm shadow-green-100">
            10:00 AM
          </button>
          <button className="bg-[#F4F6F9] text-[#A0B3C6] py-3.5 rounded-2xl font-bold text-[14px] cursor-not-allowed">
            01:00 PM
          </button>
          <button className="bg-[#0A9D46] text-white py-3.5 rounded-2xl font-bold text-[14px] shadow-sm shadow-green-100">
            06:00 PM
          </button>
        </div>

        {/* Patient Reviews */}
        <h2 className="text-[19px] font-bold text-[#1C1C1C] mb-4">Patient Reviews</h2>
        <div className="bg-[#FAFAFA] rounded-3xl p-6 border border-gray-100 shadow-sm relative mb-4">
          <div className="flex items-center gap-1 mb-2.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={14} className="fill-[#FBBF24] text-[#FBBF24]" />
            ))}
          </div>
          <p className="text-[#1C1C1C] text-[15px] italic leading-relaxed font-medium">
            &quot;Very helpful and understanding. {doctor.name.replace('Dr. ', '')} helped me realize behavioral patterns I never noticed before. Highly recommend for anyone dealing with anxiety.&quot;
          </p>
        </div>

      </div>
    </div>
  );
}
