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
  ArrowRight
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

  const validateDegree = (value: string) => ['Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Diploma'].includes(value);
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
    highestDegree: !validateDegree(highestDegree) && touched.highestDegree ? 'الرجاء اختيار الدرجة العلمية المناسبة.' : '',
    graduationYear: !validateGraduationYear(graduationYear) && touched.graduationYear ? 'الرجاء اختيار سنة تخرج صحيحة.' : '',
    universityName: !validateUniversityName(universityName) && touched.universityName ? 'الرجاء إدخال اسم جامعة حقيقي.' : '',
  };

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
          <div className="hidden md:flex p-6 w-32 h-32 items-center justify-center relative mb-6">
             <Image
                src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
                alt="Tabtaba Logo"
                fill
                className="object-contain scale-[0.8]"
                priority
              />
          </div>

          <div className="flex items-center gap-2 text-[#0A9D46] mb-8 md:mb-10 lg:scale-[1.3] transform origin-center">
            <GraduationCap size={24} strokeWidth={2.5} />
            <h1 className="text-[22px] font-extrabold tracking-tight">
              Education & Qualifications
            </h1>
          </div>

          <div className="w-full flex items-center justify-between px-6 md:px-16 lg:px-32 mb-2 lg:scale-[1.1] transform origin-left">
             <span className="text-[#0A9D46] text-[12px] font-bold">Step 2 of 5</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full px-6 md:px-16 lg:px-32 relative h-1 md:h-1.5 mb-2 lg:mb-4 lg:scale-[1.1] transform origin-left">
            <div className="w-full h-1 md:h-1.5 bg-[#E2E8F0] md:bg-[#D7ECDY] rounded-full absolute top-0 left-0" />
            <div className="h-1 md:h-1.5 bg-[#0A9D46] rounded-full absolute top-0 left-0" style={{ width: '40%' }} />
            {/* The dot at 40% */}
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#0A9D46] rounded-full absolute top-1/2 -translate-y-1/2 shadow-sm" style={{ left: '40%', transform: 'translate(-50%, -50%)' }} />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto md:max-w-3xl w-full px-6 pt-6 pb-12 md:pb-28 flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-8">
        
        <p className="text-[#4A5568] text-[15px] md:text-[18px] md:mb-2 font-medium leading-relaxed pr-6 md:col-span-2">
          Please provide details about your academic background and language proficiency to help us tailor your professional profile.
        </p>

        {/* Highest Degree */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#0D4B8D]">
            <ScrollText size={18} strokeWidth={2.5} />
            <label className="text-[14px] font-bold">Highest Degree</label>
          </div>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center px-4 py-4 shadow-sm">
            <span className={`text-[15px] font-medium flex-1 ${highestDegree ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
              {highestDegree || 'Select your degree'}
            </span>
            <ChevronDown size={18} className="text-[#BAC7D5]" />
            <select value={highestDegree} onChange={e=>setHighestDegree(e.target.value)} onBlur={() => handleBlur('highestDegree')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
               <option value="" disabled>Select your degree</option>
               <option value="Bachelor&apos;s Degree">Bachelor&apos;s Degree</option>
               <option value="Master&apos;s Degree">Master&apos;s Degree</option>
               <option value="PhD">PhD</option>
               <option value="Diploma">Diploma</option>
            </select>
          </div>
          {errors.highestDegree && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.highestDegree}</p>}
        </div>

        {/* Graduation Year */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#0D4B8D]">
            <Calendar size={18} strokeWidth={2.5} />
            <label className="text-[14px] font-bold">Graduation Year</label>
          </div>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center px-4 py-4 shadow-sm">
            <span className={`text-[15px] font-medium flex-1 ${graduationYear ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
              {graduationYear || 'Select year'}
            </span>
            <ChevronDown size={18} className="text-[#BAC7D5]" />
            <select value={graduationYear} onChange={e=>setGraduationYear(e.target.value)} onBlur={() => handleBlur('graduationYear')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
               <option value="" disabled>Select year</option>
               {Array.from({length: 40}, (_, i) => {
                 const year = new Date().getFullYear() - i;
                 return <option key={year} value={year}>{year}</option>
               })}
            </select>
          </div>
          {errors.graduationYear && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.graduationYear}</p>}
        </div>

        {/* University Name */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#0D4B8D]">
            <GraduationCap size={18} strokeWidth={2.5} />
            <label className="text-[14px] font-bold">University Name</label>
          </div>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center shadow-sm">
            <input 
              type="text" 
              value={universityName}
              onChange={(e) => setUniversityName(e.target.value)}
              onBlur={() => handleBlur('universityName')}
              placeholder="Enter the name of your institution" 
              className="w-full bg-transparent px-4 py-4 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] placeholder:font-medium"
            />
          </div>
          {errors.universityName && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.universityName}</p>}
        </div>

      </div>

      {/* Floating Footer Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white pb-6 pt-4 px-6 z-50 md:max-w-md md:left-1/2 md:-translate-x-1/2">
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
            disabled={!isStep2Valid}
            onClick={handleNext}
            className={`bg-[#00AA4F] text-white px-6 py-3.5 rounded-xl flex items-center gap-3 font-bold text-[16px] shadow-[0_4px_16px_rgba(0,170,79,0.35)] transition-transform active:scale-95 ${!isStep2Valid ? 'opacity-60 cursor-not-allowed hover:bg-[#00AA4F]' : 'hover:bg-[#009645]'}`}
          >
             <span>Next Step</span>
             <ArrowRight size={20} strokeWidth={2.5} />
          </button>

        </div>
      </div>
    </div>
  );
}
