'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { saveTherapistRegistrationData, getTherapistRegistrationData } from '@/lib/therapist-storage';
import { 
  Briefcase,
  ChevronDown, 
  ArrowLeft,
  ArrowRight,
  IdCard
} from 'lucide-react';

export default function TherapistRegisterStep3() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [authority, setAuthority] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const saved = getTherapistRegistrationData();
    Promise.resolve().then(() => {
      setIsAllowed(true);
      setCategory(saved.category ?? '');
      setSpecialization(saved.specialization ?? '');
      setExperience(saved.experience ?? '');
      setAuthority(saved.authority ?? '');
      setLicenseNumber(saved.licenseNumber ?? '');
    });
  }, [router]);

  if (!isAllowed) {
    return null;
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    saveTherapistRegistrationData({
      category,
      specialization,
      experience,
      authority,
      licenseNumber,
    });
    router.push('/therapist/register/step-4');
  };

  const validateSpecialization = (value: string) => {
    const trimmed = value.trim();
    return trimmed.length >= 5 && /^[A-Za-z\s]+$/.test(trimmed) && !/(asd|qwe|qwer|123123|0000|1111)/i.test(trimmed);
  };

  const validateExperience = (value: string) => {
    const num = Number(value);
    return Number.isInteger(num) && num >= 0 && num <= 60;
  };

  const validateAuthority = (value: string) => {
    return value.trim() === '' || /^[A-Za-z0-9\s()\-&,.]{3,}$/.test(value.trim());
  };

  const validateLicenseNumber = (value: string) => {
    return value.trim() === '' || /^[A-Za-z0-9\-]{3,20}$/.test(value.trim());
  };

  const isStep3Valid =
    ['Psychiatrist', 'Psychologist', 'Counselor', 'Social Worker', 'Life Coach'].includes(category) &&
    validateSpecialization(specialization) &&
    validateExperience(experience) &&
    validateAuthority(authority) &&
    validateLicenseNumber(licenseNumber);

  const errors = {
    category: !category && touched.category ? 'الرجاء اختيار التصنيف المهني.' : '',
    specialization: !validateSpecialization(specialization) && touched.specialization ? 'الرجاء إدخال تخصص سريري حقيقي.' : '',
    experience: !validateExperience(experience) && touched.experience ? 'الخبرة غير صالحة، يجب أن تكون رقماً منطقياً.' : '',
    authority: !validateAuthority(authority) && touched.authority ? 'الرجاء إدخال جهة ترخيص صحيحة أو تركها فارغة.' : '',
    licenseNumber: !validateLicenseNumber(licenseNumber) && touched.licenseNumber ? 'رقم الترخيص غير صالح أو يبدو عشوائياً.' : '',
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
             <span className="text-[#0A9D46] text-[12px] font-bold">Step 3 of 5</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full px-6 md:px-16 lg:px-32 relative h-1 md:h-1.5 mb-2 lg:mb-4 lg:scale-[1.1] transform origin-left">
            <div className="w-full h-1 md:h-1.5 bg-[#E2E8F0] md:bg-[#D7ECDY] rounded-full absolute top-0 left-0" />
            <div className="h-1 md:h-1.5 bg-[#0A9D46] rounded-full absolute top-0 left-0" style={{ width: '60%' }} />
            {/* The dot at 60% */}
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#0A9D46] rounded-full absolute top-1/2 -translate-y-1/2 shadow-sm" style={{ left: '60%', transform: 'translate(-50%, -50%)' }} />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto md:max-w-3xl w-full px-6 pt-8 pb-12 md:pb-28 flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-8">
        
        {/* Professional Category */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#0D4B8D] pl-1">*Professional Category</label>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center px-4 py-4 shadow-sm">
            <span className={`text-[15px] font-medium flex-1 ${category ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
              {category || 'Select category'}
            </span>
            <ChevronDown size={18} className="text-[#BAC7D5]" />
            <select value={category} onChange={e=>setCategory(e.target.value)} onBlur={() => handleBlur('category')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
               <option value="" disabled>Select category</option>
               <option value="Psychiatrist">Psychiatrist</option>
               <option value="Psychologist">Psychologist</option>
               <option value="Counselor">Counselor</option>
               <option value="Social Worker">Social Worker</option>
               <option value="Life Coach">Life Coach</option>
            </select>
          </div>
          {errors.category && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.category}</p>}
        </div>

        {/* Specialization */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#0D4B8D] pl-1">*Specialization</label>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center shadow-sm">
            <input 
              type="text" 
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              onBlur={() => handleBlur('specialization')}
              placeholder="e.g. Cognitive Behavioral Therapy" 
              className="w-full bg-transparent px-4 py-4 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] placeholder:font-medium"
            />
          </div>
          {errors.specialization && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.specialization}</p>}
        </div>

        {/* Years of Experience */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#0D4B8D] pl-1">*Years of Experience</label>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center shadow-sm">
            <input 
              type="number"
              min="0"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              onBlur={() => handleBlur('experience')}
              className="w-full bg-transparent px-4 py-4 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] placeholder:font-medium"
            />
          </div>
          {errors.experience && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.experience}</p>}
        </div>

        {/* Licensing Authority */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#0D4B8D] pl-1">Licensing Authority</label>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center px-4 py-4 shadow-sm">
            <span className={`text-[15px] font-medium flex-1 ${authority ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
              {authority || 'If found'}
            </span>
            <ChevronDown size={18} className="text-[#BAC7D5]" />
            <select value={authority} onChange={e=>setAuthority(e.target.value)} onBlur={() => handleBlur('authority')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
               <option value="" disabled>If found</option>
               <option value="American Psychological Association (APA)">APA (USA)</option>
               <option value="British Psychological Society (BPS)">BPS (UK)</option>
               <option value="Health Professions Council (HPC)">HPC</option>
               <option value="Ministry of Health">Ministry of Health</option>
               <option value="Other">Other</option>
            </select>
          </div>
          {errors.authority && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.authority}</p>}
        </div>

        {/* License Number */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#0D4B8D] pl-1">License Number</label>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center shadow-sm px-4">
            <IdCard size={20} className="text-[#BAC7D5] mr-2" strokeWidth={2} />
            <input 
              type="text" 
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              onBlur={() => handleBlur('licenseNumber')}
              placeholder="If found" 
              className="w-full bg-transparent py-4 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] placeholder:font-medium"
            />
          </div>
          {errors.licenseNumber && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.licenseNumber}</p>}
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
            disabled={!isStep3Valid}
            onClick={handleNext}
            className={`bg-[#00AA4F] text-white px-6 py-3.5 rounded-xl flex items-center gap-3 font-bold text-[16px] shadow-[0_4px_16px_rgba(0,170,79,0.35)] transition-transform active:scale-95 ${!isStep3Valid ? 'opacity-60 cursor-not-allowed hover:bg-[#00AA4F]' : 'hover:bg-[#009645]'}`}
          >
             <span>Next Step</span>
             <ArrowRight size={20} strokeWidth={2.5} />
          </button>

        </div>
      </div>
    </div>
  );
}
