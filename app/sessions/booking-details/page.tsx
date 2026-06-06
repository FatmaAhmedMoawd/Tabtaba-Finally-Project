'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  ChevronLeft, 
  Video, 
  Phone, 
  Heart,
  Calendar,
  Clock,
  Check,
  ShieldCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { DOCTORS } from '@/features/sessions/model/doctors';

type SessionType = 'video' | 'voice';

const DOCTOR_BIOS: Record<string, string> = {
  '1': 'Specializing in anxiety, mindfulness, and cognitive behavioral therapy.',
  '2': 'Specializing in adolescent therapy, childhood depression, and autism spectrum support.',
  '3': 'Senior consultant with 15+ years of experience in CBT, couples counseling, and family dynamics.',
};

const DOCTOR_CATEGORIES: Record<string, string> = {
  '1': 'CLINICAL PSYCHOLOGIST',
  '2': 'CHILD PSYCHIATRIST',
  '3': 'SENIOR CONSULTANT',
};

function BookingDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const doctorId = searchParams.get('doctorId') || '1';
  const doctor = DOCTORS.find((d) => d.id === doctorId) || DOCTORS[0];

  // Selected details from navigation params
  const initialDateStr = searchParams.get('date') || 'Oct 24, 2023';
  const initialTimeStr = searchParams.get('time') || '10:30 AM';
  const initialType = (searchParams.get('type') as SessionType) || 'video';

  // State management
  const [selectedDateVal, setSelectedDateVal] = useState(initialDateStr);
  const [selectedTimeVal, setSelectedTimeVal] = useState(initialTimeStr);
  const [sessionType, setSessionType] = useState<SessionType>(initialType);
  const [isBooked, setIsBooked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calendar dates
  const dateOptions = [
    { day: 'Mon', num: '12', val: 'Oct 12, 2023' },
    { day: 'Tue', num: '13', val: 'Oct 13, 2023' },
    { day: 'Wed', num: '14', val: 'Oct 14, 2023' },
    { day: 'Thu', num: '15', val: 'Oct 15, 2023' },
    { day: 'Fri', num: '16', val: 'Oct 16, 2023' },
    { day: 'Sat', num: '17', val: 'Oct 17, 2023' },
  ];

  const timeOptions = [
    '09:00 AM',
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '04:30 PM',
  ];

  const handleFinalBooking = () => {
    setIsBooked(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('TXN-98234-ELARA');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert name to uppercase
  const formattedDoctorName = doctor.name.toUpperCase();

  // -------------------------------------------------------------
  // VIEW A: Success / Booking Completed View
  // -------------------------------------------------------------
  if (isBooked) {
    return (
      <div className="min-h-screen bg-[#FCFAF6] font-inter">
        
        {/* MOBILE SUCCESS VIEW (Original code preserved exactly) */}
        <div className="block md:hidden min-h-screen bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] relative overflow-x-hidden flex justify-center items-center py-12 px-4">
          <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl border border-gray-100/50 relative flex flex-col pb-12 overflow-y-auto p-2">
            <div className="pt-10 px-6 pb-2 flex items-center justify-between relative z-10 w-full">
              <button 
                onClick={() => setIsBooked(false)}
                className="text-gray-505 hover:scale-110 active:scale-95 transition-transform p-2 -ml-2"
              >
                <ChevronLeft size={28} strokeWidth={2.5} className="text-[#365D83]" />
              </button>
              <h1 className="text-[22px] font-extrabold text-[#00AC49] absolute left-1/2 -translate-x-1/2 tracking-tight">
                Success!
              </h1>
              <button className="text-[#00AC49] hover:scale-110 active:scale-95 transition-transform p-2">
                <div className="relative">
                  <span className="absolute -top-[2px] -right-[2px] w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9Z" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="relative flex justify-center items-center mt-12">
              <div className="absolute w-48 h-48 bg-[#00AC49] opacity-[0.08] blur-[42px] rounded-full pointer-events-none"></div>
              <div className="w-[124px] h-[124px] rounded-full bg-gradient-to-br from-[#00BC49] to-[#01B347] flex items-center justify-center shadow-[0_16px_40px_rgba(0,172,73,0.18)] border-4 border-white/80">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white stroke-[4.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-center mt-10 px-6">
              <h2 className="text-[30px] font-extrabold text-[#111A24] tracking-tight leading-none mb-3">
                Session Booked!
              </h2>
              <p className="text-[15px] font-semibold text-gray-555 leading-relaxed max-w-[310px] mx-auto">
                Your session is booked successfully. We&apos;ve sent a confirmation to your email.
              </p>
            </div>

            <div className="mx-6 mt-8 p-6 bg-[#FAFBFD]/90 rounded-[28px] border border-[#ECEFF4] shadow-sm text-left">
              <div className="flex items-center gap-4.5">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 relative border border-white shadow-sm bg-gray-50">
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="ml-4">
                  <span className="text-[11px] font-black tracking-widest text-[#00AC49] uppercase block mb-0.5">
                    {DOCTOR_CATEGORIES[doctor.id] || 'PSYCHIATRIST'}
                  </span>
                  <h3 className="font-extrabold text-[#111A24] text-[18px] leading-tight">
                    {doctor.name}
                  </h3>
                </div>
              </div>

              <div className="bg-[#FAFBFD]/90 rounded-2xl p-4.5 mt-5 border border-[#EEF2F6] space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EEF2F6] flex items-center justify-center text-gray-400 shrink-0 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#00AC49]">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C9BAE] font-bold uppercase tracking-wider block leading-none">DATE</span>
                    <span className="text-[14px] text-[#111A24] font-black mt-1 block leading-none">{selectedDateVal}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EEF2F6] flex items-center justify-center text-gray-400 shrink-0 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#00AC49]">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C9BAE] font-bold uppercase tracking-wider block leading-none">TIME</span>
                    <span className="text-[14px] text-[#111A24] font-black mt-1 block leading-none">{selectedTimeVal} (45 min)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-6 mt-10 flex flex-col items-stretch gap-3">
              <button
                onClick={() => {
                  router.push('/calendar');
                }}
                className="h-[60px] rounded-full bg-[#00AC49] hover:bg-[#009E45] text-white active:scale-[0.98] transition-all font-extrabold text-[16px] tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,172,73,0.12)] cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="stroke-white">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M12 14v4M10 16h4" />
                </svg>
                Add to Calendar
              </button>

              <button
                onClick={() => router.push('/dashboard')}
                className="mt-4 flex items-center justify-center gap-2 text-[#00AC49] hover:text-[#009E45] hover:scale-[1.03] active:scale-95 transition-all text-[16px] font-black tracking-tight"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#00AC49]">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Go to Home
              </button>
            </div>
            <div className="mt-auto pb-3 flex justify-center">
              <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>

        {/* DESKTOP SUCCESS DASHBOARD (Premium Redesign) */}
        <div className="hidden md:block w-full max-w-4xl mx-auto px-8 py-16">
          <div className="bg-white border border-gray-150/50 rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-12 flex flex-col items-center text-center relative overflow-hidden">
            
            {/* Green glowing badge */}
            <div className="relative flex justify-center items-center mb-8">
              <div className="absolute w-36 h-36 bg-[#0D7A39] opacity-[0.06] blur-[32px] rounded-full pointer-events-none"></div>
              <div className="w-20 h-20 rounded-full bg-[#0D7A39] flex items-center justify-center shadow-lg shadow-emerald-700/10 border-4 border-white">
                <Check size={36} className="text-white stroke-[4px]" />
              </div>
            </div>

            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none mb-3">
              Session Successfully Booked!
            </h1>
            <p className="text-gray-500 font-semibold text-base max-w-md mb-10 leading-relaxed">
              Congratulations! Your counseling consultation has been locked in. We have sent your session link and invoice receipt to your email address.
            </p>

            {/* Receipt Table Dashboard */}
            <div className="w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-[32px] p-8 text-left mb-10">
              <h3 className="text-xs font-black tracking-widest text-[#94A3B8] uppercase block mb-6">
                RECEIPT DETAILS
              </h3>

              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <span className="text-[11px] text-[#94A3B8] font-black tracking-wider uppercase block">SPECIALIST</span>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative border border-gray-100 shadow-sm bg-gray-50">
                      <Image
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-sm text-gray-900 font-black block leading-none">{doctor.name}</span>
                      <span className="text-[10px] text-gray-400 font-bold block mt-1.5">{doctor.specialty}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-[#94A3B8] font-black tracking-wider uppercase block">TRANSACTION REFERENCE</span>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-gray-900 font-black">TXN-98234-ELARA</span>
                    <button 
                      onClick={handleCopyLink} 
                      className="text-[11px] text-[#0D7A39] hover:text-[#0A602D] font-black hover:underline ml-1 cursor-pointer transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-[#94A3B8] font-black tracking-wider uppercase block">SCHEDULED DATE</span>
                  <span className="text-sm text-gray-900 font-black mt-3 block leading-none">{selectedDateVal}</span>
                </div>

                <div>
                  <span className="text-[11px] text-[#94A3B8] font-black tracking-wider uppercase block">SESSION TIME & DURATION</span>
                  <span className="text-sm text-gray-900 font-black mt-3 block leading-none">{selectedTimeVal} (45 min)</span>
                </div>

                <div className="col-span-2">
                  <span className="text-[11px] text-[#94A3B8] font-black tracking-wider uppercase block">SESSION TYPE</span>
                  <span className="inline-flex items-center gap-2 mt-3 text-xs font-black text-[#0D7A39]">
                    <Video size={14} className="stroke-[3px]" />
                    <span>{sessionType === 'video' ? 'Video Call Consultation' : 'Voice Only Call'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Centered Calendar Action Button */}
            <div className="flex flex-col items-center gap-3 w-full justify-center">
              <button 
                onClick={() => router.push('/calendar')}
                className="bg-[#0D7A39] hover:bg-[#0A602D] text-white py-4 px-10 rounded-full font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/10 active:scale-[0.98] transition-all cursor-pointer w-fit"
              >
                <Calendar size={18} />
                <span>Go to Calendar view</span>
              </button>
              
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-gray-400 hover:text-gray-655 font-bold text-xs mt-3 transition-colors hover:underline block cursor-pointer"
              >
                Back to Home Dashboard
              </button>
            </div>
            
          </div>
        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW B: Scheduling Checkout Form / Details View
  // -------------------------------------------------------------
  return (
    <div className="min-h-[100dvh] bg-[#FCFAF6] font-inter">
      
      {/* MOBILE CHECKOUT VIEW (Original code preserved exactly) */}
      <div className="block md:hidden min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] pb-16 relative overflow-x-hidden flex justify-center items-start pt-2 px-4">
        <div className="w-full max-w-lg bg-[#FAFBFD] min-h-screen relative flex flex-col pb-24 overflow-y-auto">
          {/* Header */}
          <div className="pt-10 px-6 pb-2 flex items-center justify-between relative z-10">
            <button 
              onClick={() => router.back()}
              className="text-[#1D214F] hover:scale-110 active:scale-95 transition-transform p-2 -ml-2"
            >
              <ChevronLeft size={28} strokeWidth={2.5} className="text-[#111A24]" />
            </button>
            <h1 className="text-[19px] font-black text-[#111A24] absolute left-1/2 -translate-x-1/2">
              Booking Session
            </h1>
            <div className="w-10 h-10 flex items-center justify-center"></div>
          </div>

          {/* Doctor Hero Card */}
          <div className="mx-6 mt-4 relative">
            <div className="w-full rounded-[32px] bg-gradient-to-br from-[#E1F3EA] via-[#E4F4EC] to-[#FAFDFB] p-6 shadow-sm border border-[#E9F4EE] flex flex-col text-left">
              <div className="flex items-center gap-4">
                <div className="w-[84px] h-[84px] rounded-full overflow-hidden shrink-0 relative border-2 border-white/60 shadow-sm bg-gray-100">
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    sizes="84px"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-black text-[#0A9D46] tracking-[0.06em] uppercase">
                    {DOCTOR_CATEGORIES[doctor.id] || 'CLINICAL PSYCHOLOGIST'}
                  </span>
                  <h2 className="text-[23px] font-black text-[#111A24] leading-snug mt-1">
                    {doctor.name}
                  </h2>
                </div>
              </div>
              <p className="text-[13px] font-medium text-[#5E6872] leading-relaxed mt-4">
                {DOCTOR_BIOS[doctor.id] || 'Specializing in anxiety, mindfulness, and cognitive behavioral therapy.'}
              </p>
            </div>
          </div>

          {/* Date Picker scroll */}
          <div className="mt-8 px-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-extrabold text-[#111A24]">Select Date</h3>
              <span className="text-[14px] font-semibold text-gray-500">October 2023</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hidden -mx-6 px-6">
              {dateOptions.map((date, idx) => {
                const isSelected = selectedDateVal.toLowerCase().includes(date.num) || (date.num === '13' && selectedDateVal === initialDateStr); 
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDateVal(date.val)}
                    className={`w-[68px] h-[92px] shrink-0 rounded-[24px] flex flex-col items-center justify-center transition-all duration-300 ${
                      isSelected 
                        ? 'bg-[#00AC49] text-white shadow-[0_8px_20px_rgba(0,172,73,0.18)]' 
                        : 'bg-white border border-[#F0F2F5] shadow-[0_2px_12px_rgba(0,0,0,0.01)]'
                    }`}
                  >
                    <span className={`text-[12px] font-bold uppercase transition-colors ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                      {date.day}
                    </span>
                    <span className={`text-[22px] font-black mt-1 transition-colors ${isSelected ? 'text-white' : 'text-[#111A24]'}`}>
                      {date.num}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available Times */}
          <div className="mt-6 px-6 text-left">
            <h3 className="text-[18px] font-extrabold text-[#111A24] mb-4">Available Time</h3>
            <div className="flex flex-wrap gap-2.5">
              {timeOptions.map((time, idx) => {
                const isSelected = selectedTimeVal === time || (idx === 1 && selectedTimeVal === initialTimeStr);
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedTimeVal(time)}
                    className={`py-3.5 px-6 rounded-full text-[14px] font-bold transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#10B981] text-white shadow-[0_6px_15px_rgba(16,185,129,0.2)]'
                        : 'bg-[#EDEDED] text-[#4A4A4A] hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Session Type */}
          <div className="mt-8 px-6 text-left">
            <h3 className="text-[18px] font-extrabold text-[#111A24] mb-4">Session Type</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSessionType('video')}
                className={`w-full p-4 rounded-[28px] border transition-all duration-300 relative text-left select-none flex items-center justify-between ${
                  sessionType === 'video' ? 'bg-[#EAF3EC] border-[#A8DBB8] shadow-sm' : 'bg-white border-[#F0F2F5] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    sessionType === 'video' ? 'bg-[#DCF2E4] text-[#0A9D46]' : 'bg-[#F2F4F7] text-gray-400'
                  }`}>
                    <Video size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-black text-[#111A24]">Video Call</h4>
                    <p className="text-[12px] font-medium text-gray-400 mt-0.5">Face-to-face healing</p>
                  </div>
                </div>
                {sessionType === 'video' && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </button>

              <button
                onClick={() => setSessionType('voice')}
                className={`w-full p-4 rounded-[28px] border transition-all duration-300 relative text-left select-none flex items-center justify-between ${
                  sessionType === 'voice' ? 'bg-[#EAF3EC] border-[#A8DBB8] shadow-sm' : 'bg-white border-[#F0F2F5] hover:bg-gray-55'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    sessionType === 'voice' ? 'bg-[#DCF2E4] text-[#0A9D46]' : 'bg-[#F2F4F7] text-gray-400'
                  }`}>
                    <Phone size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-black text-[#111A24]">Voice Only</h4>
                    <p className="text-[12px] font-medium text-gray-400 mt-0.5">Focused conversation</p>
                  </div>
                </div>
                {sessionType === 'voice' && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Investment */}
          <div className="mt-8 px-6 text-left">
            <div className="w-full bg-[#CEECD9] rounded-[24px] p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0A9D46]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-[#111A24] block">Session Investment</span>
                  <span className="text-[11px] text-[#2EA259] font-bold block mt-0.5">45 minutes session</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[18px] font-black text-[#0A9D46] block">200 EGP</span>
                <span className="text-[10px] text-[#0A9D46] font-black tracking-wider uppercase block">INCLUDED IN PLAN</span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-10 px-6 pb-8 flex items-center gap-3">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all ${
                isFavorited ? 'bg-rose-50 text-rose-500 scale-105 shadow-sm' : 'bg-[#EDEDED] text-gray-655 hover:bg-gray-200'
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
            <button
              onClick={handleFinalBooking}
              className="flex-1 h-[60px] rounded-full bg-[#00AC49] hover:bg-[#009E45] text-white font-extrabold text-[16px] tracking-wide active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP CHECKOUT VIEW (Premium Redesign) */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-8 py-10">
        
        {/* Navigation Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-bold text-sm bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            <span>Modify Selection</span>
          </button>
          <div className="h-4 w-px bg-gray-300"></div>
          <span className="text-gray-500 font-bold text-sm">Booking Confirmation & Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Doctor Summary & Scheduling options (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Doctor Info Card */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm shrink-0">
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div className="flex-1">
                <span className="text-[10px] font-black text-[#0D7A39] tracking-wider uppercase block">
                  {DOCTOR_CATEGORIES[doctor.id] || 'CLINICAL PSYCHOLOGIST'}
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-1 block">
                  {doctor.name}
                </h2>
                <p className="text-gray-500 text-sm font-semibold mt-1">
                  {DOCTOR_BIOS[doctor.id] || 'Specializing in anxiety, mindfulness, and cognitive behavioral therapy.'}
                </p>
              </div>
            </div>

            {/* Selected Slot Adjustments */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm">
              <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-[#0D7A39]" />
                <span>Adjust Booking Date</span>
              </h3>

              {/* Horizontal Date Picker */}
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
                {dateOptions.map((date, idx) => {
                  const isSelected = selectedDateVal === date.val || (selectedDateVal.toLowerCase().includes(date.num) && date.val.includes('Oct'));
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDateVal(date.val)}
                      className={`py-3 px-5 rounded-2xl border text-center transition-all cursor-pointer shrink-0 ${
                        isSelected 
                          ? 'bg-[#0D7A39] border-[#0D7A39] text-white shadow-sm shadow-emerald-500/10' 
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-55'
                      }`}
                    >
                      <span className="block text-[10px] font-black tracking-wider uppercase opacity-80">{date.day}</span>
                      <span className="block text-[18px] font-black mt-0.5">{date.num}</span>
                    </button>
                  );
                })}
              </div>

              {/* Adjust Time Slot */}
              <h3 className="text-sm font-black text-gray-900 mb-3 mt-6 flex items-center gap-2">
                <Clock size={16} className="text-[#0D7A39]" />
                <span>Adjust Session Time</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {timeOptions.map((time, idx) => {
                  const isSelected = selectedTimeVal === time || (idx === 1 && selectedTimeVal === initialTimeStr);
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTimeVal(time)}
                      className={`py-3 px-5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0D7A39] border-[#0D7A39] text-white'
                          : 'bg-white border-gray-250 text-gray-700 hover:bg-gray-55'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Checkout Summary & Booking Button (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm">
              <h3 className="text-base font-black text-gray-900 mb-4">Choose Consultation Mode</h3>
              
              {/* Session Type Picker */}
              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={() => setSessionType('video')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-center justify-between ${
                    sessionType === 'video' ? 'bg-[#EBFBF0] border-[#0D7A39]/30 text-[#0D7A39]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-55'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                      sessionType === 'video' ? 'bg-[#CDE8DD]' : 'bg-gray-100'
                    }`}>
                      <Video size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-black block">Video Call Consultation</span>
                      <span className="text-[10px] text-gray-500 font-bold block mt-0.5">Face-to-face interactive treatment</span>
                    </div>
                  </div>
                  {sessionType === 'video' && <Check size={18} className="text-[#0D7A39] stroke-[3px]" />}
                </button>

                <button
                  onClick={() => setSessionType('voice')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-center justify-between ${
                    sessionType === 'voice' ? 'bg-[#EBFBF0] border-[#0D7A39]/30 text-[#0D7A39]' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-55'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                      sessionType === 'voice' ? 'bg-[#CDE8DD]' : 'bg-gray-100'
                    }`}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-black block">Voice Only Call</span>
                      <span className="text-[10px] text-gray-500 font-bold block mt-0.5">Focused conversation and guidance</span>
                    </div>
                  </div>
                  {sessionType === 'voice' && <Check size={18} className="text-[#0D7A39] stroke-[3px]" />}
                </button>
              </div>

              {/* Investment card */}
              <div className="bg-[#E6F4F0] border border-[#CDE8DD] rounded-2xl p-4 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0D7A39] border border-[#BBDDCE]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-black text-gray-800 block">45 Minutes Session</span>
                    <span className="text-[10px] text-gray-550 font-bold block mt-0.5">Session Investment</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-[#0D7A39] block">200 EGP</span>
                  <span className="text-[9px] text-[#0D7A39] font-black tracking-wide uppercase">Included in plan</span>
                </div>
              </div>

              {/* Sticky bottom buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
                    isFavorited 
                      ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-sm' 
                      : 'bg-white border-gray-250 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>

                <button
                  onClick={handleFinalBooking}
                  className="flex-1 bg-[#0D7A39] hover:bg-[#0A602D] text-white py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.01] active:scale-95 shadow-md shadow-emerald-700/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={18} />
                  <span>Confirm Session Reservation</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function BookingDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAF6]">
        <div className="text-center font-inter">
          <div className="w-12 h-12 border-4 border-[#0D7A39] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#0D7A39] font-bold">Loading booking context...</p>
        </div>
      </div>
    }>
      <BookingDetailsContent />
    </Suspense>
  );
}
