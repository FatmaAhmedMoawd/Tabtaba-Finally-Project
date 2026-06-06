'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { saveTherapistRegistrationData, getTherapistRegistrationData } from '@/lib/therapist-storage';
import { 
  GraduationCap, 
  ChevronDown, 
  Calendar,
  ScrollText,
  ArrowLeft,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

export default function TherapistRegisterStep2() {
  const [highestDegree, setHighestDegree] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = getTherapistRegistrationData();
    Promise.resolve().then(() => {
      setIsAllowed(true);
      setHighestDegree(saved.highestDegree ?? '');
      setGraduationYear(saved.graduationYear ?? '');
      setUniversityName(saved.universityName ?? '');
    });
  }, [router]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  if (!isAllowed) {
    return null;
  }

  const handleNext = () => {
    saveTherapistRegistrationData({
      highestDegree,
      graduationYear,
      universityName,
    });
    router.push('/therapist/register/step-3');
  };

  const validateDegree = (value: string) => ["Bachelor's Degree", "Master's Degree", "PhD", "Diploma"].includes(value);
  const validateGraduationYear = (value: string) => {
    const year = Number(value);
    return Number.isInteger(year) && year >= 1900 && year <= new Date().getFullYear();
  };
  const validateUniversityName = (value: string) => {
    return /^[A-Za-z\u0600-\u06FF\s.'-]{3,}$/.test(value.trim()) && !/(asd|qwe|qwer|123123|0000|1111)/i.test(value);
  };

  const isStep2Valid =
    validateDegree(highestDegree) &&
    validateGraduationYear(graduationYear) &&
    validateUniversityName(universityName);

  const errors = {
    highestDegree: !validateDegree(highestDegree) && touched.highestDegree ? 'Please select your highest academic degree.' : '',
    graduationYear: !validateGraduationYear(graduationYear) && touched.graduationYear ? 'Please select a valid graduation year.' : '',
    universityName: !validateUniversityName(universityName) && touched.universityName ? 'Please enter a valid university name (min 3 characters).' : '',
  };

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
              <div className="w-8 h-8 rounded-full bg-[#0A9D46] text-white flex items-center justify-center font-bold text-[13px] shadow-md shadow-[#0A9D46]/20">
                2
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-900 leading-tight">Education</span>
                <span className="text-[11px] font-bold text-gray-400">Academic details</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white text-gray-400 border border-gray-100 flex items-center justify-center font-bold text-[13px]">
                3
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-400 leading-tight">Professional Info</span>
                <span className="text-[11px] font-bold text-gray-400">Licensing & experience</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white text-gray-400 border border-gray-100 flex items-center justify-center font-bold text-[13px]">
                4
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-400 leading-tight">Availability</span>
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
          <span className="text-xs font-bold text-[#0A9D46] bg-[#EAF6ED] px-3 py-1 rounded-full">Step 2/5</span>
        </header>

        <div className="max-w-3xl w-full mx-auto px-6 py-8 md:py-12 flex flex-col gap-6">
          {/* Section title & progress bar on desktop */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[26px] md:text-[32px] font-black text-gray-900 tracking-tight leading-tight flex items-center gap-2">
              <GraduationCap className="text-[#0A9D46]" size={32} />
              <span>Education & Qualifications</span>
            </h1>
            <p className="text-gray-500 font-semibold text-[14px] md:text-[15px] leading-relaxed">
              Please provide details about your academic background to help us verify your qualifications.
            </p>
            
            {/* Horizontal progress bar for desktop only */}
            <div className="hidden md:flex flex-col gap-1.5 mt-3">
              <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                <span>Education</span>
                <span>40% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-[#0A9D46] h-full w-[40%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Form Content wrapped in a premium card */}
          <div className="bg-white border border-gray-100/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
            
            {/* Grid layout for inputs on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Highest Degree */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[#0D4B8D] pl-1">
                  <ScrollText size={16} strokeWidth={2.5} />
                  <label className="text-[11px] font-extrabold uppercase tracking-widest">Highest Degree *</label>
                </div>
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 transition-colors">
                  <span className={`text-[15px] font-semibold flex-1 ${highestDegree ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
                    {highestDegree || 'Select your degree'}
                  </span>
                  <ChevronDown size={18} className="text-[#BAC7D5]" />
                  <select value={highestDegree} onChange={e=>setHighestDegree(e.target.value)} onBlur={() => handleBlur('highestDegree')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                     <option value="" disabled>Select your degree</option>
                     <option value="Bachelor's Degree">Bachelor's Degree</option>
                     <option value="Master's Degree">Master's Degree</option>
                     <option value="PhD">PhD</option>
                     <option value="Diploma">Diploma</option>
                  </select>
                </div>
                {errors.highestDegree && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.highestDegree}</p>}
              </div>

              {/* Graduation Year */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[#0D4B8D] pl-1">
                  <Calendar size={16} strokeWidth={2.5} />
                  <label className="text-[11px] font-extrabold uppercase tracking-widest">Graduation Year *</label>
                </div>
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 transition-colors">
                  <span className={`text-[15px] font-semibold flex-1 ${graduationYear ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
                    {graduationYear || 'Select year'}
                  </span>
                  <ChevronDown size={18} className="text-[#BAC7D5]" />
                  <select value={graduationYear} onChange={e=>setGraduationYear(e.target.value)} onBlur={() => handleBlur('graduationYear')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                     <option value="" disabled>Select year</option>
                     {Array.from({length: 40}, (_, i) => {
                       const year = new Date().getFullYear() - i;
                       return <option key={year} value={year.toString()}>{year}</option>
                     })}
                  </select>
                </div>
                {errors.graduationYear && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.graduationYear}</p>}
              </div>

            </div>

            {/* University Name */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[#0D4B8D] pl-1">
                <GraduationCap size={16} strokeWidth={2.5} />
                <label className="text-[11px] font-extrabold uppercase tracking-widest">University Name *</label>
              </div>
              <div className="bg-[#FAFDFE] border border-[#EBF2F9] focus-within:border-[#0A9D46] focus-within:bg-white rounded-xl relative flex items-center shadow-xs transition-colors">
                <input 
                  type="text" 
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  onBlur={() => handleBlur('universityName')}
                  placeholder="Enter the name of your institution" 
                  className="w-full bg-transparent px-4 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] font-semibold"
                />
              </div>
              {errors.universityName && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.universityName}</p>}
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
                disabled={!isStep2Valid}
                onClick={handleNext}
                className={`bg-[#0A9D46] text-white px-7 py-3.5 rounded-xl flex items-center gap-2 font-bold text-[15.5px] shadow-[0_4px_16px_rgba(10,157,70,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                  !isStep2Valid 
                    ? 'opacity-50 cursor-not-allowed hover:bg-[#0A9D46] hover:scale-100 shadow-none' 
                    : 'hover:bg-[#008c3d]'
                }`}
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

