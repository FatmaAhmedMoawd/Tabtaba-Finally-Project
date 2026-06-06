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
  Check,
  ChevronLeft
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
        active: !prev[day].active,
        // Pre-fill default hours if toggled active first time and empty
        from: prev[day].from || '09:00 AM',
        to: prev[day].to || '05:00 PM'
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
    <div className="min-h-[100dvh] bg-[#FAF8F5] font-inter flex flex-col md:flex-row w-full">
      
      {/* Sidebar (Desktop only) */}
      <aside className="hidden md:flex md:w-[320px] lg:w-[360px] shrink-0 bg-white border-r border-gray-100 flex-col p-8 justify-between select-none">
        <div className="flex flex-col gap-10">
          {/* Logo */}
          <div className="relative w-36 h-14 cursor-pointer" onClick={() => router.push('/therapist')}>
            <Image
              src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
              alt="Tabtaba Logo"
              fill
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>

          {/* Stepper */}
          <div className="flex flex-col gap-6 relative pl-3">
            <div className="absolute left-[23px] top-[15px] bottom-[15px] w-[2px] bg-gray-100" />
            
            {/* Step 1 */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#EAF6ED] text-[#0A9D46] border border-[#0A9D46]/20 flex items-center justify-center font-bold text-[13px]">
                ✓
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-900 leading-tight">Personal Info</span>
                <span className="text-[11px] font-bold text-gray-400">Basic details</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#EAF6ED] text-[#0A9D46] border border-[#0A9D46]/20 flex items-center justify-center font-bold text-[13px]">
                ✓
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-900 leading-tight">Education</span>
                <span className="text-[11px] font-bold text-gray-400">Academic details</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#EAF6ED] text-[#0A9D46] border border-[#0A9D46]/20 flex items-center justify-center font-bold text-[13px]">
                ✓
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-900 leading-tight">Professional Info</span>
                <span className="text-[11px] font-bold text-gray-400">Licensing & experience</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-[#0A9D46] text-white flex items-center justify-center font-bold text-[13px] shadow-md shadow-[#0A9D46]/20">
                4
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-900 leading-tight">Availability</span>
                <span className="text-[11px] font-bold text-gray-400">Weekly schedules</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white text-gray-400 border border-gray-100 flex items-center justify-center font-bold text-[13px]">
                5
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-400 leading-tight">Verification</span>
                <span className="text-[11px] font-bold text-gray-400">Certificates & CV</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#FAF8F5] border border-gray-100 rounded-2xl p-4.5">
          <span className="text-[11px] font-extrabold text-[#0D4B8D] uppercase tracking-wider">SECURED</span>
          <p className="text-[12px] text-gray-500 font-semibold leading-relaxed mt-1">
            Your data is stored locally and securely, ready to be reviewed by the clinical team.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:max-h-screen md:overflow-y-auto">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-black">
            <ChevronLeft size={24} />
          </button>
          <div className="relative w-24 h-10">
            <Image
              src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
              alt="Tabtaba Logo"
              fill
              className="object-contain mix-blend-multiply"
            />
          </div>
          <span className="text-xs font-bold text-[#0A9D46] bg-[#EAF6ED] px-3 py-1 rounded-full">Step 4/5</span>
        </header>

        <div className="max-w-3xl w-full mx-auto px-6 py-8 md:py-12 flex flex-col gap-6">
          {/* Section title & progress bar on desktop */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[26px] md:text-[32px] font-black text-gray-900 tracking-tight leading-tight flex items-center gap-2">
              <CalendarDays className="text-[#0A9D46]" size={32} />
              <span>Session Availability</span>
            </h1>
            <p className="text-gray-500 font-semibold text-[14px] md:text-[15px] leading-relaxed">
              Define your regular clinic practice status and weekly available time blocks for patient sessions.
            </p>
            
            {/* Horizontal progress bar for desktop only */}
            <div className="hidden md:flex flex-col gap-1.5 mt-3">
              <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                <span>Availability Setup</span>
                <span>80% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-[#0A9D46] h-full w-[80%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Form Content wrapped in a premium card */}
          <div className="bg-white border border-gray-100/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
            
            {/* Clinic Question */}
            <div className="bg-[#EAF6ED]/60 border border-[#0A9D46]/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative text-[#0A9D46] w-10 h-10 rounded-full bg-white border border-[#0A9D46]/15 flex items-center justify-center shrink-0 shadow-xs">
                  <Home size={20} strokeWidth={2} />
                  <div className="absolute -top-1 -right-1 bg-[#0A9D46] text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                    +
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-[15px] text-gray-900 leading-tight">Do you work at a clinic?</span>
                  <span className="text-[12px] font-semibold text-gray-500 mt-0.5">Let us know if you practice offline too</span>
                </div>
              </div>
              
              <div className="flex items-center gap-5 shrink-0 pl-1">
                 <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="radio" className="hidden" checked={worksAtClinic} onChange={() => setWorksAtClinic(true)} />
                    {worksAtClinic ? (
                       <CheckCircle2 size={22} className="text-[#0A9D46] fill-[#0A9D46] text-white" />
                    ) : (
                       <Circle size={22} className="text-[#BAC7D5] hover:text-[#0A9D46]" strokeWidth={2} />
                    )}
                    <span className="text-[14.5px] text-gray-800 font-bold">Yes</span>
                 </label>

                 <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="radio" className="hidden" checked={!worksAtClinic} onChange={() => setWorksAtClinic(false)} />
                    {!worksAtClinic ? (
                       <CheckCircle2 size={22} className="text-[#0A9D46] fill-[#0A9D46] text-white" />
                    ) : (
                       <Circle size={22} className="text-[#BAC7D5] hover:text-[#0A9D46]" strokeWidth={2} />
                    )}
                    <span className="text-[14.5px] text-gray-800 font-bold">No</span>
                 </label>
              </div>
            </div>

            {/* Session Availability Details */}
            <div className="flex flex-col gap-4.5 mt-2">
               <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                 <CalendarDays size={18} className="text-gray-800" strokeWidth={2.5} />
                 <h2 className="text-[16px] font-black text-gray-900">Define Time Blocks</h2>
               </div>

               <div className="flex flex-col gap-3">
                  {Object.entries(availability).map(([day, data]) => (
                    <div key={day} className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 py-3 border-b border-gray-50 last:border-0">
                      
                      {/* Day toggle */}
                      <div className="flex items-center gap-3.5 w-40 shrink-0">
                        <button type="button" onClick={() => toggleDay(day)} className="focus:outline-none cursor-pointer">
                           {data.active ? (
                              <div className="w-6 h-6 rounded-md bg-[#0A9D46] flex items-center justify-center shadow-xs">
                                 <Check size={15} strokeWidth={3} className="text-white" />
                              </div>
                           ) : (
                              <div className="w-6 h-6 rounded-md border border-gray-300 hover:border-[#BAC7D5] flex items-center justify-center bg-white transition-colors" />
                           )}
                        </button>
                        <span className={`text-[15.5px] font-extrabold ${data.active ? 'text-gray-900' : 'text-gray-400'}`}>{day}</span>
                      </div>

                      {/* Hours Inputs */}
                      <div className="flex items-center gap-3.5 flex-1 max-w-md">
                         <div className="flex-1">
                            <input 
                               type="text" 
                               value={data.from}
                               onChange={(e) => updateTime(day, 'from', e.target.value)}
                               disabled={!data.active}
                               placeholder="e.g. 09:00 AM"
                               className="w-full bg-[#FAFDFE] border border-[#EBF2F9] focus:border-[#0A9D46] disabled:bg-gray-50 disabled:text-gray-300 rounded-xl px-4 py-2.5 text-[14px] font-bold text-gray-800 outline-none placeholder:text-gray-300 disabled:opacity-50 transition-colors"
                            />
                         </div>
                         <span className="text-gray-400 font-bold text-[13px] shrink-0 uppercase tracking-wider">to</span>
                         <div className="flex-1">
                            <input 
                               type="text" 
                               value={data.to}
                               onChange={(e) => updateTime(day, 'to', e.target.value)}
                               disabled={!data.active}
                               placeholder="e.g. 05:00 PM"
                               className="w-full bg-[#FAFDFE] border border-[#EBF2F9] focus:border-[#0A9D46] disabled:bg-gray-50 disabled:text-gray-300 rounded-xl px-4 py-2.5 text-[14px] font-bold text-gray-800 outline-none placeholder:text-gray-300 disabled:opacity-50 transition-colors"
                            />
                         </div>
                      </div>

                    </div>
                  ))}
               </div>
            </div>

            {/* Navigation buttons contained inside the form card */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-6 mt-4">
              <button 
                type="button"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-black font-extrabold text-[15px] flex items-center gap-1.5 px-3 py-2 cursor-pointer"
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="bg-[#0A9D46] hover:bg-[#008c3d] text-white px-7 py-3.5 rounded-xl flex items-center gap-2 font-bold text-[15.5px] shadow-[0_4px_16px_rgba(10,157,70,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                 <span>Next Step</span>
                 <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
