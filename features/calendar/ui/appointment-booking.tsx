'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check, Lock, AlertCircle } from 'lucide-react';
import { DOCTORS } from '@/features/sessions/model/doctors';

const ALL_AVAILABLE_TIMES = [
  '10:00 AM', '12:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
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
    setSelectedTime(null);
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
      <div className="px-5 pt-12 pb-10 relative z-10">
        <div className="relative min-h-[90px]">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.back()} 
              className="text-[#0D7A39] hover:bg-green-50 rounded-full transition-colors flex items-center p-1"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-[#0D7A39] text-xl font-bold">Appointment</h1>
          </div>

          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-28 h-28 sm:w-32 sm:h-32 mt-[-4px]">
            <Image 
              src="https://i.postimg.cc/43GH2tHQ/photo-2026-05-14-14-47-12-removebg-preview.png" 
              alt="Tabtaba Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
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

      {/* Success Modal overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowSuccess(false)} />
          <div className="bg-white rounded-[32px] w-[342px] max-w-full p-8 flex flex-col items-center shadow-[0_20px_50px_rgba(15,23,42,0.15)] text-center relative z-[10000] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-[145px] h-[145px] bg-[#E8F8EE] rounded-full flex items-center justify-center mb-6 shrink-0">
              <svg width="68" height="68" viewBox="0 0 24 24" fill="currentColor" className="text-[#22C55E]" aria-hidden="true">
                <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1zm19.83-9.12c-.12-.42-.4-.76-.79-.93L16.5 8h-1.89l.86-3.43c.12-.5.03-1.03-.26-1.45l-.47-.68c-.3-.43-.8-.69-1.33-.69h-.6c-.52 0-1.02.24-1.34.66L7.42 8.03C7.15 8.39 7 8.83 7 9.29V17c0 1.1.9 2 2 2h8.13c.89 0 1.69-.58 1.93-1.43l2.03-7.1c.15-.5.06-1.04-.26-1.42z" />
              </svg>
            </div>

            <h2 className="text-[28px] font-extrabold text-[#111827] mb-1.5 leading-tight tracking-tight">Thank You !</h2>
            <p className="text-[#5F6D7E] text-[16px] font-semibold mb-6">Your Appointment Successful</p>

            <p className="text-[#5F6D7E] text-[14.5px] leading-relaxed mb-8 max-w-[270px]">
              You booked an appointment with {doctor.name} on{' '}
              {selectedDateObj ? (
                `${monthNames[selectedDateObj.getMonth()]} ${selectedDateObj.getDate()}`
              ) : (
                'February 21'
              )}
              , at {selectedTime}.
            </p>

            <button
              onClick={() => {
                router.push(`/sessions/booking-details?doctorId=${doctor.id}&date=${encodeURIComponent(formattedSelectedDateStr)}&time=${encodeURIComponent(selectedTime || '')}&reminder=${selectedReminder || ''}`);
              }}
              className="w-full bg-[#0D7A39] hover:bg-[#0A602D] text-white py-4 rounded-[16px] font-bold text-[16px] mb-4 transition-colors cursor-pointer"
            >
              Done
            </button>

            <button
              onClick={() => setShowSuccess(false)}
              className="text-[#5F6D7E] hover:text-[#111827] font-semibold text-[14px] transition-colors cursor-pointer"
            >
              Edit your appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
