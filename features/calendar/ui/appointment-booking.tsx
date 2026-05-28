'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check, Lock, AlertCircle } from 'lucide-react';
import { DOCTORS } from '@/features/sessions/model/doctors';

const ALL_AVAILABLE_TIMES = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
];

const reminderOptions = [
  { value: 30, label: '30 Minit' },
  { value: 40, label: '40 Minit' },
  { value: 25, label: '25 Minit' },
  { value: 10, label: '10 Minit' },
  { value: 35, label: '35 Minit' },
];

export function AppointmentBooking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId') || '1';
  const doctor = DOCTORS.find((d) => d.id === doctorId) || DOCTORS[0];

  const [isMounted, setIsMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [showAuthRequiredModal, setShowAuthRequiredModal] = useState(false);
  
  // Start the view month/year same as the current date
  const [viewYear, setViewYear] = useState<number | null>(null);
  const [viewMonth, setViewMonth] = useState<number | null>(null);
  
  // By default select today's date if viewing current month
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Derive synced appointment info directly on initial render 
  const methodParam = searchParams?.get('method');
  const dateParam = searchParams?.get('date');
  const timeParam = searchParams?.get('time');

  const syncedInfo = (methodParam === 'added' && dateParam && timeParam) ? {
    date: decodeURIComponent(dateParam),
    time: decodeURIComponent(timeParam)
  } : null;

  const [showSyncToast, setShowSyncToast] = useState(!!syncedInfo);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('profile_email');
      if (!email) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowAuthRequiredModal(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showAuthRequiredModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAuthRequiredModal]);

  useEffect(() => {
    setTimeout(() => {
      const now = new Date();
      setCurrentDate(now);
      setViewYear(now.getFullYear());
      setViewMonth(now.getMonth());
      setSelectedDateObj(now);
      setSelectedDate(now.getDate());
      setIsMounted(true);
    }, 0);
  }, []);
  
  const availableTimes = React.useMemo(() => {
    if (!selectedDateObj) {
      return ALL_AVAILABLE_TIMES;
    }
    
    // Refresh 'now' so it accurately reflects the real-world current time
    const now = new Date();
    
    // Check if the selected date is in the past
    const selectedDateMidnight = new Date(selectedDateObj);
    selectedDateMidnight.setHours(0, 0, 0, 0);
    const nowMidnight = new Date(now);
    nowMidnight.setHours(0, 0, 0, 0);
    
    if (selectedDateMidnight < nowMidnight) {
       // Past dates have no active available times to book
       return [];
    }
    
    // Maintain all appointment times visible and booking-ready on today's and future dates
    return ALL_AVAILABLE_TIMES;
  }, [selectedDateObj]);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<number | null>(25);
  const [showSuccess, setShowSuccess] = useState(false);

  // Instead of updating via useEffect, we'll reset selectedTime if needed when it's rendered,
  // or just let the button click reset it if availableTimes change.
  // Actually, we can just derive it or let the user re-select since it usually resets when changing date.

  const handlePrevMonth = () => {
    if (viewMonth === null || viewYear === null) return;
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
    if (viewMonth === null || viewYear === null) return;
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
    if (viewYear === null || viewMonth === null) return;
    setSelectedDate(day);
    const newDateObj = new Date(viewYear, viewMonth, day);
    setSelectedDateObj(newDateObj);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    // 0 = Sunday, 1 = Monday, ... 6 = Saturday
    const day = new Date(year, month, 1).getDay();
    // Adjust so Monday is 0
    return day === 0 ? 6 : day - 1; 
  };

  const generateDays = () => {
    if (viewYear === null || viewMonth === null) return [];
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

  const generateHeader = () => ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonthStr = (viewMonth !== null && viewYear !== null) ? `${monthNames[viewMonth]} ${viewYear}` : '';

  const formattedSelectedDateStr = selectedDateObj 
     ? `${monthNames[selectedDateObj.getMonth()]} ${selectedDateObj.getDate()}, ${selectedDateObj.getFullYear()}`
     : '';

  const handleConfirm = () => {
    // Check if requirements are met
    if (selectedDate && selectedTime && selectedReminder) {
      setShowSuccess(true);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#FAFAFA] font-inter max-w-lg lg:max-w-xl mx-auto relative overflow-hidden">
        
        {/* Header with Title and Back Arrow (Background slightly dimmed ideally, but we show success modal over it) */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Background screen behind modal */}
        <div className="flex flex-col h-full bg-[#EAF2F8] opacity-50 pt-16 px-5 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-[#0D7A39] font-bold text-xl">
              <ChevronLeft size={24} />
              Appointment
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-5 pb-28 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white rounded-[24px] w-full max-w-sm p-6 flex flex-col items-center shadow-xl text-center max-h-[95vh] overflow-y-auto">
            
            <div className="w-20 h-20 bg-[#E8F8EE] rounded-full flex items-center justify-center mb-4 shrink-0">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6543 31.815H8.76156C8.28315 31.815 7.82433 31.6249 7.48604 31.2866C7.14775 30.9483 6.95768 30.4895 6.95768 30.0111V21.4391C6.95768 20.9606 7.14775 20.5018 7.48604 20.1635C7.82433 19.8252 8.28315 19.6352 8.76156 19.6352H14.6543C15.1327 19.6352 15.5915 19.8252 15.9298 20.1635C16.2681 20.5018 16.4582 20.9606 16.4582 21.4391V30.0111C16.4582 30.4895 16.2681 30.9483 15.9298 31.2866C15.5915 31.6249 15.1327 31.815 14.6543 31.815Z" fill="#30BE4F"/>
                <path d="M14.2415 19.9882C15.3526 21.0963 16.3214 20.4703 16.9632 19.4678L19.4442 15.5898C19.8202 14.9961 20.0898 14.2882 20.2464 13.5604V13.5604C20.6542 11.6661 22.3789 10.3725 24.3168 10.3725V10.3725C26.1718 10.3725 27.6012 11.9688 27.4328 13.8055L26.6802 21.4395H30.4952C32.1627 21.4395 33.4842 22.8427 33.3768 24.504L32.8986 31.7915C32.8258 32.8916 31.9168 33.7297 30.8143 33.7297H17.4782" stroke="#30BE4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="text-[24px] font-bold text-[#1C1C1C] mb-1">Awesome! 🎉</h2>
            <p className="text-[#5C7182] text-[15px] mb-5">Here are your appointment details:</p>
            
            <div className="w-full bg-[#F3F4F6] rounded-[16px] p-4 mb-6 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-[14px]">Date</span>
                <span className="font-bold text-[#0D7A39] text-[14px]">{formattedSelectedDateStr}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-[14px]">Time</span>
                <span className="font-bold text-[#0D7A39] text-[14px]">{selectedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-[14px]">Reminder</span>
                <span className="font-bold text-[#0D7A39] text-[14px]">{selectedReminder} Minutes before</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                router.push(`/sessions/booking-details?doctorId=${doctor.id}&date=${encodeURIComponent(formattedSelectedDateStr)}&time=${encodeURIComponent(selectedTime || '')}&reminder=${selectedReminder || ''}`);
              }}
              className="w-full bg-[#0D7A39] text-white py-3.5 rounded-xl font-semibold text-[16px] mb-3 hover:bg-[#0A602D] transition-colors shrink-0"
            >
              Done
            </button>
            <button 
              onClick={() => setShowSuccess(false)}
              className="text-[#5C7182] text-[14px] hover:text-[#1C1C1C] transition-colors pb-2"
            >
              Edit your appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isMounted) {
    return <div className="flex flex-col h-[100dvh] overflow-y-auto bg-[#EAF2F8] font-inter max-w-lg lg:max-w-xl mx-auto pb-6" />;
  }

  return (
    <div className="flex flex-col h-[100dvh] overflow-y-auto bg-[#EAF2F8] font-inter max-w-lg lg:max-w-xl mx-auto pb-24">
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Header */}
      <div className="px-5 pt-12 flex items-center relative z-10 justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()} 
            className="mr-2 text-[#0D7A39] hover:bg-green-50 rounded-full transition-colors flex items-center p-1"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-[#0D7A39] text-xl font-bold">Appointment</h1>
        </div>
        
        <div className="relative w-20 h-10">
          <Image 
            src="https://i.postimg.cc/43GH2tHQ/photo-2026-05-14-14-47-12-removebg-preview.png" 
            alt="Tabtaba Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Sync success toast */}
      {showSyncToast && syncedInfo && (
        <div className="mx-5 mt-4 bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex flex-col relative animate-in fade-in slide-in-from-top-4 duration-300 shadow-sm">
          <button 
            onClick={() => setShowSyncToast(false)} 
            className="absolute top-4 right-4 text-emerald-600 hover:text-emerald-800 font-bold text-sm bg-emerald-100/30 hover:bg-emerald-100/50 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-full bg-[#00AC49] flex items-center justify-center shrink-0 shadow-sm text-white">
              <svg className="w-6 h-6 text-white stroke-[4.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="pr-4">
              <h4 className="font-extrabold text-[#0D7A39] text-[15px]">Added to Calendar!</h4>
              <p className="text-[13px] text-emerald-800 font-medium leading-snug mt-1">
                Your session with <span className="font-extrabold text-emerald-950">{doctor.name}</span> on <span className="font-bold text-emerald-950">{syncedInfo.date}</span> at <span className="font-bold text-emerald-950">{syncedInfo.time}</span> is now successfully saved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Doctor Summary Card */}
      <div className="mx-5 my-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border border-[#30C45D]/20 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative bg-gray-50 border-2 border-[#30C45D]/30">
          <Image
            src={doctor.imageUrl}
            alt={doctor.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div>
          <h2 className="font-bold text-[#1C1C1C] text-[16px] leading-tight">{doctor.name}</h2>
          <p className="text-[#5C7182] text-[13px] font-medium">{doctor.specialty}</p>
        </div>
      </div>

      <div className="px-5 flex-1 flex flex-col">
        {/* Calendar Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-[#0D7A39] text-white px-5 py-3.5 flex items-center justify-between">
            <span className="font-semibold">{currentMonthStr}</span>
            <div className="flex items-center gap-4">
              <button onClick={handlePrevMonth} className="hover:opacity-75 transition-opacity">
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button onClick={handleNextMonth} className="hover:opacity-75 transition-opacity">
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 text-center mb-3">
              {generateHeader().map(day => (
                <div key={day} className="text-[14px] text-[#1C1C1C] font-medium py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
              {generateDays().map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} />;
                }
                const isSelected = selectedDateObj?.getDate() === day && selectedDateObj?.getMonth() === viewMonth && selectedDateObj?.getFullYear() === viewYear;
                return (
                  <button 
                    key={day}
                    onClick={() => handleSelectDate(day)}
                    className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-[15px] transition-colors
                      ${isSelected ? 'bg-[#0D7A39] text-white font-semibold' : 'text-[#1C1C1C] hover:bg-green-50'}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="bg-white rounded-t-[32px] px-5 pt-6 pb-8 mx-0 mt-auto min-h-[300px] shadow-[0_-4px_15px_rgba(0,0,0,0.02)]">
          <h3 className="text-[16px] font-bold text-[#1C1C1C] mb-4">Available Time</h3>
          
          <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2 -mx-5 px-5 hide-scroll">
             {availableTimes.length > 0 ? availableTimes.map(time => {
                const isSelected = selectedTime === time;
                // Add newline to match figma layout (e.g., 10:00 \n AM) if needed, but original uses circle
                const [timeStr, period] = time.split(' ');
                
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`flex-shrink-0 w-[68px] h-[68px] rounded-full flex flex-col items-center justify-center gap-0.5 border transition-colors ${
                      isSelected 
                        ? 'bg-[#0D7A39] border-[#0D7A39] text-white' 
                        : 'bg-[#E8F8EE] border-[#E8F8EE] text-[#0D7A39] hover:bg-green-100 hover:border-green-100'
                    }`}
                  >
                    <span className="text-[13px] font-bold">{timeStr}</span>
                    <span className="text-[11px] font-medium">{period}</span>
                  </button>
                )
             }) : (
               <div className="text-sm text-gray-500 py-4 px-2 italic">
                 No available times for this date.
               </div>
             )}
          </div>

          <h3 className="text-[16px] font-bold text-[#1C1C1C] mb-4 mt-8">Reminder Me Before</h3>
          
          <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2 -mx-5 px-5 hide-scroll">
            {reminderOptions.map(option => {
               const isSelected = selectedReminder === option.value;
               const valueStr = option.value.toString();
               const labelStr = option.label.replace(valueStr, '').trim();

               return (
                 <button
                   key={option.value}
                   onClick={() => setSelectedReminder(option.value)}
                   className={`flex-shrink-0 w-[68px] h-[68px] rounded-full flex flex-col items-center justify-center gap-0.5 border transition-colors ${
                     isSelected 
                       ? 'bg-[#0D7A39] border-[#0D7A39] text-white' 
                       : 'bg-[#E8F8EE] border-[#E8F8EE] text-[#0D7A39] hover:bg-green-100 hover:border-green-100'
                   }`}
                 >
                    <span className="text-[15px] font-bold leading-tight">{valueStr}</span>
                    <span className="text-[11px] font-medium leading-tight">{labelStr}</span>
                 </button>
               )
            })}
          </div>

          <button 
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime || !selectedReminder}
            className="w-full bg-[#0D7A39] text-white py-3.5 rounded-xl font-semibold text-[16px] mt-8 hover:bg-[#0A602D] transition-colors disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Auth required Modal overlay */}
      {showAuthRequiredModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)] border border-gray-100 max-w-[380px] w-full text-center relative z-[100001] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-[#EF4444] border-2 border-red-100">
              <Lock size={28} strokeWidth={2.5} />
            </div>
            
            <h3 className="text-[20px] sm:text-[22px] font-[900] text-[#1D214F] leading-tight mb-2">
              تسجيل الدخول مطلوب 🔐
            </h3>
            <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-4">
              Registration Required
            </h4>
            
            <div className="w-full h-px bg-gray-100 mb-4" />
            
            <p className="text-[14px] sm:text-[15px] text-gray-600 font-bold leading-relaxed mb-6 px-1 text-center">
              لازم تروح تكريت اكونت الاول او تسجل دخول علشان خاطر تقدر ان انت تشترك او تدفع او انك تقدر تعمل سيشنز او جلسات مع الدكتورز 💚
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push('/register')}
                className="w-full py-4 bg-[#30BE4F] hover:bg-[#28A745] text-white rounded-2xl font-black text-[15px] sm:text-[16px] transition-all hover:scale-[1.01] active:scale-95 shadow-md shadow-green-500/10 cursor-pointer"
              >
                Register / إنشاء حساب جديد ✨
              </button>
              
              <button
                onClick={() => router.push('/login')}
                className="w-full py-4 border-2 border-[#1D214F] hover:bg-slate-50 text-[#1D214F] rounded-2xl font-black text-[15.5px] sm:text-[16px] transition-all active:scale-95 cursor-pointer"
              >
                Sign In / تسجيل دخول
              </button>
              
              <button
                onClick={() => router.back()}
                className="w-full py-3.5 text-gray-400 hover:text-gray-600 font-bold text-[14px] transition-colors mt-1 cursor-pointer"
              >
                Cancel & Go Back / الرجوع للخلف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
