'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { saveTherapistRegistrationData, getTherapistRegistrationData } from '@/lib/therapist-storage';
import { 
  Briefcase,
  ArrowLeft,
  ArrowRight,
  Home,
  Plus,
  CalendarDays,
  CheckCircle2,
  Circle,
  Check
} from 'lucide-react';

interface DayAvailability {
  active: boolean;
  from: string;
  to: string;
}

export default function TherapistRegisterStep4() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  
  const [worksAtClinic, setWorksAtClinic] = useState<boolean>(false);
  
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({
    Monday: { active: true, from: '09:00 AM', to: '05:00 PM' },
    Tuesday: { active: true, from: '09:00 AM', to: '05:00 PM' },
    Wednesday: { active: true, from: '10:00 AM', to: '06:00 PM' },
    Thursday: { active: false, from: '', to: '' },
    Friday: { active: false, from: '', to: '' },
    Saturday: { active: false, from: '', to: '' },
    Sunday: { active: false, from: '', to: '' },
  });

  useEffect(() => {
    const saved = getTherapistRegistrationData();
    Promise.resolve().then(() => {
      setIsAllowed(true);
      if (typeof saved.worksAtClinic === 'boolean') {
        setWorksAtClinic(saved.worksAtClinic);
      }
      if (saved.availability) {
        setAvailability(saved.availability);
      }
    });
  }, [router]);

  const handleNext = () => {
    saveTherapistRegistrationData({
      worksAtClinic,
      availability,
    });
    router.push('/therapist/register/step-5');
  };

  const toggleDay = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        active: !prev[day].active
      }
    }));
  };

  const updateTime = (day: string, field: 'from' | 'to', value: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="min-h-[100dvh] bg-white font-inter relative pb-28 md:flex md:flex-col md:items-center w-full">
      {/* Header Area */}
      <div className="w-full relative max-w-md mx-auto md:max-w-3xl md:mt-12 bg-white pt-10 md:pt-12 pb-6 px-6 md:px-12 overflow-hidden rounded-b-[38px] md:rounded-[32px] shadow-sm shadow-gray-100/50 md:shadow-none">
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-20 h-16 md:hidden mb-4">
            <Image
              src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
              alt="Tabtaba Logo"
              fill
              className="object-contain mix-blend-multiply scale-[1.3]"
              priority
            />
          </div>

          {/* Desktop Logo Box */}
          <div className="hidden md:flex p-6 w-32 h-32 items-center justify-center relative mb-6 rounded-2xl md:bg-white md:shadow-sm">
             <Image
                src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
                alt="Tabtaba Logo"
                fill
                className="object-contain scale-[0.8]"
                priority
              />
          </div>

          <div className="flex items-center gap-2 text-[#0A9D46] mb-8 md:mb-10 lg:scale-[1.3] transform origin-center">
            <Briefcase size={22} strokeWidth={2.5} />
            <h1 className="text-[20px] md:text-[22px] font-extrabold tracking-tight">
              Professional Registration
            </h1>
          </div>

          <div className="w-full flex items-center justify-between px-6 md:px-16 lg:px-32 mb-2 lg:scale-[1.1] transform origin-left">
             <span className="text-[#0A9D46] text-[12px] font-bold">Step 4 of 5</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full px-6 md:px-16 lg:px-32 relative h-1 md:h-1.5 mb-2 lg:mb-4 lg:scale-[1.1] transform origin-left">
            <div className="w-full h-1 md:h-1.5 bg-[#E2E8F0] md:bg-[#D7ECDY] rounded-full absolute top-0 left-0" />
            <div className="h-1 md:h-1.5 bg-[#0A9D46] rounded-full absolute top-0 left-0" style={{ width: '80%' }} />
            {/* The dot at 80% */}
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#0A9D46] rounded-full absolute top-1/2 -translate-y-1/2 shadow-sm" style={{ left: '80%', transform: 'translate(-50%, -50%)' }} />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto md:max-w-3xl px-6 pt-6 pb-12 md:pb-28 flex flex-col gap-8 md:px-12 w-full">
        
        {/* Do you work at a clinic? */}
        <div className="bg-[#DDF4E4] rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative text-[#0A9D46]">
              <Home size={24} strokeWidth={2} />
              <div className="absolute top-[8px] left-[7px] bg-[#DDF4E4] w-[10px] h-[10px] flex items-center justify-center">
                 <Plus size={12} strokeWidth={3} className="text-[#0A9D46]" />
              </div>
            </div>
            <span className="font-bold text-[16px] text-gray-900 leading-tight">Do you<br/>work at a<br/>clinic?</span>
          </div>
          
          <div className="flex items-center gap-4">
             <label className="flex items-center gap-2 cursor-pointer">
                {worksAtClinic ? (
                   <CheckCircle2 size={24} className="text-[#0A9D46] fill-[#0A9D46] text-white" />
                ) : (
                   <Circle size={24} className="text-[#8997A5]" strokeWidth={1.5} />
                )}
                <span className="text-[15px] text-gray-800 font-medium">Yes</span>
                <input type="radio" className="hidden" checked={worksAtClinic} onChange={() => setWorksAtClinic(true)} />
             </label>

             <label className="flex items-center gap-2 cursor-pointer">
                {!worksAtClinic ? (
                   <CheckCircle2 size={24} className="text-[#0A9D46] fill-[#0A9D46] text-white" />
                ) : (
                   <Circle size={24} className="text-[#8997A5]" strokeWidth={1.5} />
                )}
                <span className="text-[15px] text-gray-800 font-medium">No</span>
                <input type="radio" className="hidden" checked={!worksAtClinic} onChange={() => setWorksAtClinic(false)} />
             </label>
          </div>
        </div>

        {/* Session Availability */}
        <div className="flex flex-col gap-6">
           <div className="flex items-center gap-3">
             <CalendarDays size={24} className="text-[#0A9D46]" strokeWidth={2} />
             <h2 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Session Availability</h2>
           </div>

           <div className="flex flex-col gap-8">
              {Object.entries(availability).map(([day, data]) => (
                <div key={day} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#0D4B8D] font-bold text-[16px]">{day}</span>
                    <button onClick={() => toggleDay(day)} className="focus:outline-none">
                       {data.active ? (
                          <div className="w-6 h-6 rounded-md bg-[#22C55E] flex items-center justify-center shadow-sm">
                             <Check size={16} strokeWidth={3} className="text-white" />
                          </div>
                       ) : (
                          <div className="w-6 h-6 rounded-md border border-[#8997A5] flex items-center justify-center">
                          </div>
                       )}
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#0A9D46] uppercase tracking-wider pl-1">From</label>
                        <input 
                           type="text" 
                           value={data.from}
                           onChange={(e) => updateTime(day, 'from', e.target.value)}
                           disabled={!data.active}
                           placeholder="--:-- --"
                           className="bg-white border-0 rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none placeholder:text-[#BAC7D5] disabled:opacity-50"
                        />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#0A9D46] uppercase tracking-wider pl-1">To</label>
                        <input 
                           type="text" 
                           value={data.to}
                           onChange={(e) => updateTime(day, 'to', e.target.value)}
                           disabled={!data.active}
                           placeholder="--:-- --"
                           className="bg-white border-0 rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none placeholder:text-[#BAC7D5] disabled:opacity-50"
                        />
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

      </div>

      {/* Floating Footer Navigation */}
      <div className="fixed bottom-0 left-0 w-full pb-6 pt-4 px-6 z-50 md:max-w-md md:left-1/2 md:-translate-x-1/2 bg-white">
        <div className="flex items-center justify-between w-full relative">
          
          {/* Back Button */}
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-[#333333] hover:text-black font-extrabold text-[16px] px-2 py-3 transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
            <span>Back</span>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="bg-[#00AA4F] hover:bg-[#009645] text-white px-6 py-3.5 rounded-xl flex items-center gap-3 font-bold text-[16px] shadow-[0_4px_16px_rgba(0,170,79,0.35)] transition-transform active:scale-95"
          >
             <span>Next Step</span>
             <ArrowRight size={20} strokeWidth={2.5} />
          </button>

        </div>
      </div>
    </div>
  );
}
