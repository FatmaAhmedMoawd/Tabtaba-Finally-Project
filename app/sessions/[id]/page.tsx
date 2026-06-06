'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight,
  Star, 
  Headphones, 
  Heart, 
  GraduationCap, 
  ShieldCheck, 
  Search,
  Video,
  Phone,
  Check,
  Calendar as CalendarIcon,
  Clock
} from 'lucide-react';
import { DOCTORS } from '@/features/sessions/model/doctors';

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  // Find the doctor based on ID
  const doctor = DOCTORS.find((d) => d.id === id) || DOCTORS[0]; // fallback to first if not found

  // Desktop Booking State
  const [selectedDateObj, setSelectedDateObj] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [selectedReminder, setSelectedReminder] = useState<number>(25);
  const [sessionType, setSessionType] = useState<'video' | 'voice'>('video');

  const [viewYear, setViewYear] = useState<number>(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    let newMonth = viewMonth - 1;
    let newYear = viewYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setViewMonth(newMonth);
    setViewYear(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = viewMonth + 1;
    let newYear = viewYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setViewMonth(newMonth);
    setViewYear(newYear);
  };

  const handleSelectDate = (day: number) => {
    const newDateObj = new Date(viewYear, viewMonth, day);
    setSelectedDateObj(newDateObj);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Mon is 0, Sun is 6
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const currentMonthStr = `${monthNames[viewMonth]} ${viewYear}`;
  const formattedSelectedDateStr = `${monthNames[selectedDateObj.getMonth()]} ${selectedDateObj.getDate()}, ${selectedDateObj.getFullYear()}`;

  const desktopTimes = ['10:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
  const reminderOptions = [
    { value: 10, label: '10 Min' },
    { value: 25, label: '25 Min' },
    { value: 30, label: '30 Min' },
    { value: 40, label: '40 Min' }
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF6] font-inter">
      
      {/* ======================================================== */}
      {/* 1. MOBILE VIEW (Original layout preserved exactly) */}
      {/* ======================================================== */}
      <div className="block md:hidden flex flex-col min-h-screen bg-gradient-to-b from-[#F0F8FA] via-[#F6FBFD] to-[#FAFBFC] pb-24 relative">
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center justify-between sticky top-0 z-20 bg-transparent">
          <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-600 hover:bg-white/50 rounded-full transition-colors flex items-center">
            <ChevronLeft size={28} />
          </button>
          <div className="w-10 h-10" aria-hidden="true" />
        </div>

        <div className="max-w-lg mx-auto w-full px-5 flex flex-col pt-2 pb-6">
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

            <button className="bg-white border text-[#0A9D46] px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm shadow-[#0A9D46]/10 font-bold text-[14px] hover:bg-gray-55 transition-colors">
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
            <span className="bg-[#F2F4F7] text-[#1C1C1C] px-4 py-2 rounded-full text-[14px] font-bold">Anxiety</span>
            <span className="bg-[#F2F4F7] text-[#1C1C1C] px-4 py-2 rounded-full text-[14px] font-bold">Depression</span>
            <span className="bg-[#F2F4F7] text-[#1C1C1C] px-4 py-2 rounded-full text-[14px] font-bold">OCD</span>
            <span className="bg-[#F2F4F7] text-[#1C1C1C] px-4 py-2 rounded-full text-[14px] font-bold">ADHD</span>
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
            <button 
              onClick={() => router.push(`/calendar?doctorId=${doctor.id}`)}
              className="bg-[#0A9D46] text-white py-3.5 rounded-2xl font-bold text-[14px] shadow-sm shadow-green-100"
            >
              10:00 AM
            </button>
            <button className="bg-[#F4F6F9] text-[#A0B3C6] py-3.5 rounded-2xl font-bold text-[14px] cursor-not-allowed">
              01:00 PM
            </button>
            <button 
              onClick={() => router.push(`/calendar?doctorId=${doctor.id}`)}
              className="bg-[#0A9D46] text-white py-3.5 rounded-2xl font-bold text-[14px] shadow-sm shadow-green-100"
            >
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

      {/* ======================================================== */}
      {/* 2. DESKTOP VIEW (Premium Wide Layout with Integrated Booking) */}
      {/* ======================================================== */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-8 py-10">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-bold text-sm bg-white border border-gray-200/60 rounded-full px-5 py-2.5 shadow-sm"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            <span>Back to Specialists</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-extrabold uppercase tracking-wider">Consultant Room:</span>
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-1.5 rounded-full border border-emerald-100">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Active
            </span>
          </div>
        </div>

        {/* Desktop Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details & Credentials (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Main Bio Card */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
              {/* Profile Pic */}
              <div className="relative w-36 h-36 rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm shrink-0">
                <Image
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="144px"
                  priority
                />
                {/* Active verification check */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow">
                  <Check size={12} strokeWidth={3.5} />
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="bg-[#E6F4F0] text-[#0D7A39] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {doctor.specialty}
                  </span>
                  <span className="bg-[#FFFCEB] text-[#D9A300] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <Star size={12} className="fill-[#FBBF24] text-[#FBBF24]" />
                    {doctor.rating.toFixed(1)} Rating
                  </span>
                </div>

                <h1 className="text-3xl font-black text-gray-900 leading-tight mb-1">
                  {doctor.name}
                </h1>
                
                <p className="text-gray-500 font-bold text-sm mb-4">
                  Senior Consultant in Behavioral Medicine & Psychology
                </p>

                {/* Best for Box */}
                <div className="bg-[#F0F5FD] border border-[#DDE7F9] px-4 py-2.5 rounded-2xl flex items-center gap-2 w-fit mb-5">
                  <Search size={16} className="text-[#0D7A39]" />
                  <span className="text-xs font-black text-gray-700">Best for: Overthinking, Anxiety & Stress Management</span>
                </div>

                {/* Intro button */}
                <button className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-black text-xs px-5 py-3 rounded-xl shadow-sm transition-all active:scale-[0.98] w-fit">
                  <Headphones size={16} className="text-[#0D7A39]" />
                  <span>Listen to Intro Message</span>
                </button>
              </div>
            </div>

            {/* Patient Match Card */}
            <div className="bg-gradient-to-r from-[#EBF6FC] to-[#F1F9FE] border border-[#DEEDF7] rounded-[28px] p-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#0D7A39] rounded-2xl flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/10">
                  <Heart size={26} className="text-white fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block">AI Match Compatibility</span>
                  <h4 className="text-[18px] font-extrabold text-gray-900 mt-0.5">You match 92% with this expert</h4>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-[#0D7A39]">92%</span>
              </div>
            </div>

            {/* About Doctor Details */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-4">Professional Bio</h3>
              <p className="text-lg font-extrabold italic text-[#0D7A39] mb-5 leading-relaxed">
                &quot;Helping you understand yourself and find peace within 💙&quot;
              </p>
              <p className="text-gray-600 font-medium leading-relaxed mb-6">
                With over 8 years of dedicated clinical experience, {doctor.name} specializes in cognitive-behavioral therapy for young adults. His approach combines empathetic listening with practical, evidence-based strategies to navigate life&apos;s most complex transitions and mental health challenges. He works closely with users to build resilient habits and conquer daily stressors.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                <div className="bg-[#FAFBFD] p-4 rounded-2xl border border-[#EEF2F6]">
                  <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block mb-1">Clinical Experience</span>
                  <span className="text-gray-900 text-lg font-black">+8 Years Active Practice</span>
                </div>
                <div className="bg-[#FAFBFD] p-4 rounded-2xl border border-[#EEF2F6]">
                  <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block mb-1">Certified Specialties</span>
                  <span className="text-gray-900 text-lg font-black">CBT, Mindfulness & ACT</span>
                </div>
              </div>
            </div>

            {/* Specialties Section */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-4">Specialties & Focus</h3>
              <div className="flex flex-wrap gap-2.5">
                {['Anxiety Disorders', 'Overthinking', 'Depression', 'OCD', 'ADHD Support', 'Adolescent Guidance', 'CBT Therapy', 'Family Counseling'].map((spec, i) => (
                  <span key={i} className="bg-gray-50 border border-gray-200/60 text-gray-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-5">Education & Credentials</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-emerald-50 text-[#0D7A39] rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-gray-900 text-base">Cairo University</h5>
                    <p className="text-gray-505 text-sm font-medium">BSc in Clinical Psychology, Faculty of Arts (High Honors)</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-emerald-50 text-[#0D7A39] rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-gray-900 text-base">Certified CBT Therapist</h5>
                    <p className="text-gray-505 text-sm font-medium">International Association of Cognitive Therapies (IACT)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Scheduler Widget (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <CalendarIcon size={20} className="text-[#0D7A39]" />
                <span>Select Appointment Slot</span>
              </h3>

              {/* Monthly Calendar Widget */}
              <div className="border border-gray-100 rounded-2xl overflow-hidden mb-6">
                <div className="bg-[#0D7A39] text-white px-4 py-3 flex items-center justify-between select-none">
                  <span className="font-bold text-sm">{currentMonthStr}</span>
                  <div className="flex items-center gap-3">
                    <button onClick={handlePrevMonth} className="hover:opacity-75 transition-opacity p-1">
                      <ChevronLeft size={18} strokeWidth={2.5} />
                    </button>
                    <button onClick={handleNextMonth} className="hover:opacity-75 transition-opacity p-1">
                      <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
                
                <div className="p-3 bg-[#FCFAF6]/60">
                  <div className="grid grid-cols-7 gap-1 text-center mb-2 font-bold text-xs text-gray-500">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                      <div key={day} className="py-1">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {generateDays().map((day, idx) => {
                      if (day === null) {
                        return <div key={`empty-${idx}`} />;
                      }
                      const isSelected = selectedDateObj.getDate() === day && selectedDateObj.getMonth() === viewMonth && selectedDateObj.getFullYear() === viewYear;
                      return (
                        <button 
                          key={day}
                          onClick={() => handleSelectDate(day)}
                          className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-xs transition-colors font-bold cursor-pointer
                            ${isSelected ? 'bg-[#0D7A39] text-white' : 'text-gray-800 hover:bg-green-50'}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Time Slots Chips */}
              <h4 className="text-sm font-black text-gray-900 mb-3">Available Times</h4>
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                {desktopTimes.map(time => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3.5 rounded-xl border text-xs font-black transition-all cursor-pointer text-center ${
                        isSelected 
                          ? 'bg-[#0D7A39] border-[#0D7A39] text-white shadow-sm shadow-[#0D7A39]/10' 
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-55'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              {/* Reminder Me Selection */}
              <h4 className="text-sm font-black text-gray-900 mb-3">Alert Me Before</h4>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {reminderOptions.map(opt => {
                  const isSelected = selectedReminder === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedReminder(opt.value)}
                      className={`py-3 rounded-xl border text-[11px] font-black transition-all cursor-pointer text-center ${
                        isSelected 
                          ? 'bg-[#0D7A39] border-[#0D7A39] text-white' 
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-55'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Session Type Selectors */}
              <h4 className="text-sm font-black text-gray-900 mb-3">Choose Session Type</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={() => setSessionType('video')}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                    sessionType === 'video' 
                      ? 'bg-[#EBFBF0] border-[#0D7A39]/30 text-[#0D7A39] shadow-sm' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-55'
                  }`}
                >
                  <Video size={16} />
                  <div className="flex flex-col">
                    <span className="text-xs font-black">Video Call</span>
                    <span className="text-[10px] text-gray-400 font-medium">Face-to-face chat</span>
                  </div>
                </button>

                <button 
                  onClick={() => setSessionType('voice')}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                    sessionType === 'voice' 
                      ? 'bg-[#EBFBF0] border-[#0D7A39]/30 text-[#0D7A39] shadow-sm' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-55'
                  }`}
                >
                  <Phone size={16} />
                  <div className="flex flex-col">
                    <span className="text-xs font-black">Voice Only</span>
                    <span className="text-[10px] text-gray-400 font-medium">Audio call support</span>
                  </div>
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

              {/* Checkout link button */}
              <Link
                href={`/sessions/booking-details?doctorId=${doctor.id}&date=${encodeURIComponent(formattedSelectedDateStr)}&time=${encodeURIComponent(selectedTime)}&reminder=${selectedReminder}&type=${sessionType}`}
                className="w-full bg-[#0D7A39] hover:bg-[#0A602D] text-white py-4 rounded-2xl font-black text-[15px] flex items-center justify-center gap-2 shadow-md shadow-emerald-700/10 hover:scale-[1.01] active:scale-95 transition-all"
              >
                <ShieldCheck size={18} />
                <span>Confirm & Book Appointment</span>
              </Link>
            </div>

            {/* Patient Reviews desktop */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm">
              <h3 className="text-sm font-black text-gray-900 mb-4">What Patients Say</h3>
              <div className="space-y-4">
                <div className="bg-[#FAFBFD] p-5 rounded-2xl border border-[#EEF2F6]">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={12} className="fill-[#FBBF24] text-[#FBBF24]" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 italic leading-relaxed">
                    &quot;Very helpful and understanding. Helped me realize behavioral patterns I never noticed before. Highly recommend for anyone dealing with anxiety.&quot;
                  </p>
                  <span className="text-[10px] font-black text-gray-400 mt-2 block">- Active subscriber, 3 weeks ago</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
