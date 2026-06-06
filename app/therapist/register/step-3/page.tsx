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
  IdCard,
  ChevronLeft,
  Award,
  BookOpen
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
    return trimmed.length >= 3 && /^[A-Za-z\u0600-\u06FF0-9\s(),.\-&]+$/.test(trimmed) && !/(asd|qwe|qwer|123123|0000|1111)/i.test(trimmed);
  };

  const validateExperience = (value: string) => {
    const num = Number(value);
    return value !== '' && Number.isInteger(num) && num >= 0 && num <= 60;
  };

  const validateAuthority = (value: string) => {
    return value.trim() === '' || /^[A-Za-z0-9\u0600-\u06FF\s()\-&,.]{3,}$/.test(value.trim());
  };

  const validateLicenseNumber = (value: string) => {
    return value.trim() === '' || /^[A-Za-z0-9\u0600-\u06FF\-]{3,20}$/.test(value.trim());
  };

  const isStep3Valid =
    ['Psychiatrist', 'Psychologist', 'Counselor', 'Social Worker', 'Life Coach'].includes(category) &&
    validateSpecialization(specialization) &&
    validateExperience(experience) &&
    validateAuthority(authority) &&
    validateLicenseNumber(licenseNumber);

  const errors = {
    category: !category && touched.category ? 'Please select a professional category.' : '',
    specialization: !validateSpecialization(specialization) && touched.specialization ? 'Please enter a valid specialization (min 3 characters).' : '',
    experience: !validateExperience(experience) && touched.experience ? 'Please enter valid years of experience (0-60).' : '',
    authority: !validateAuthority(authority) && touched.authority ? 'Please enter a valid licensing authority.' : '',
    licenseNumber: !validateLicenseNumber(licenseNumber) && touched.licenseNumber ? 'Please enter a valid license number.' : '',
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
              <div className="w-8 h-8 rounded-full bg-[#0A9D46] text-white flex items-center justify-center font-bold text-[13px] shadow-md shadow-[#0A9D46]/20">
                3
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-900 leading-tight">Professional Info</span>
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
          <span className="text-xs font-bold text-[#0A9D46] bg-[#EAF6ED] px-3 py-1 rounded-full">Step 3/5</span>
        </header>

        <div className="max-w-3xl w-full mx-auto px-6 py-8 md:py-12 flex flex-col gap-6">
          {/* Section title & progress bar on desktop */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[26px] md:text-[32px] font-black text-gray-900 tracking-tight leading-tight flex items-center gap-2">
              <Briefcase className="text-[#0A9D46]" size={32} />
              <span>Professional Registration</span>
            </h1>
            <p className="text-gray-500 font-semibold text-[14px] md:text-[15px] leading-relaxed">
              Tell us about your specialization, practice license details, and clinical experience.
            </p>
            
            {/* Horizontal progress bar for desktop only */}
            <div className="hidden md:flex flex-col gap-1.5 mt-3">
              <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                <span>Professional Details</span>
                <span>60% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-[#0A9D46] h-full w-[60%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Form Content wrapped in a premium card */}
          <div className="bg-white border border-gray-100/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
            
            {/* Grid layout for inputs on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Professional Category */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[#0D4B8D] pl-1">
                  <Briefcase size={16} strokeWidth={2.5} />
                  <label className="text-[11px] font-extrabold uppercase tracking-widest">Category *</label>
                </div>
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 transition-colors">
                  <span className={`text-[15px] font-semibold flex-1 ${category ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
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
                {errors.category && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.category}</p>}
              </div>

              {/* Specialization */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[#0D4B8D] pl-1">
                  <BookOpen size={16} strokeWidth={2.5} />
                  <label className="text-[11px] font-extrabold uppercase tracking-widest">Specialization *</label>
                </div>
                <div className="bg-[#FAFDFE] border border-[#EBF2F9] focus-within:border-[#0A9D46] focus-within:bg-white rounded-xl relative flex items-center shadow-xs transition-colors">
                  <input 
                    type="text" 
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    onBlur={() => handleBlur('specialization')}
                    placeholder="e.g. Cognitive Behavioral Therapy" 
                    className="w-full bg-transparent px-4 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] font-semibold"
                  />
                </div>
                {errors.specialization && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.specialization}</p>}
              </div>

            </div>

            {/* Grid layout for row 2 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Years of Experience */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[#0D4B8D] pl-1">
                  <Award size={16} strokeWidth={2.5} />
                  <label className="text-[11px] font-extrabold uppercase tracking-widest">Years of Experience *</label>
                </div>
                <div className="bg-[#FAFDFE] border border-[#EBF2F9] focus-within:border-[#0A9D46] focus-within:bg-white rounded-xl relative flex items-center shadow-xs transition-colors">
                  <input 
                    type="number"
                    min="0"
                    max="60"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    onBlur={() => handleBlur('experience')}
                    placeholder="e.g. 5"
                    className="w-full bg-transparent px-4 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] font-semibold"
                  />
                </div>
                {errors.experience && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.experience}</p>}
              </div>

              {/* Licensing Authority */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[#0D4B8D] pl-1">
                  <ChevronDown size={16} strokeWidth={2.5} />
                  <label className="text-[11px] font-extrabold uppercase tracking-widest">Licensing Authority</label>
                </div>
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 transition-colors">
                  <span className={`text-[15px] font-semibold flex-1 ${authority ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
                    {authority || 'Select authority (Optional)'}
                  </span>
                  <ChevronDown size={18} className="text-[#BAC7D5]" />
                  <select value={authority} onChange={e=>setAuthority(e.target.value)} onBlur={() => handleBlur('authority')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                     <option value="">Select authority (Optional)</option>
                     <option value="American Psychological Association (APA)">APA (USA)</option>
                     <option value="British Psychological Society (BPS)">BPS (UK)</option>
                     <option value="Health Professions Council (HPC)">HPC</option>
                     <option value="Ministry of Health">Ministry of Health</option>
                     <option value="Other">Other</option>
                  </select>
                </div>
                {errors.authority && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.authority}</p>}
              </div>

            </div>

            {/* License Number */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[#0D4B8D] pl-1">
                <IdCard size={16} strokeWidth={2.5} />
                <label className="text-[11px] font-extrabold uppercase tracking-widest">License Number</label>
              </div>
              <div className="bg-[#FAFDFE] border border-[#EBF2F9] focus-within:border-[#0A9D46] focus-within:bg-white rounded-xl relative flex items-center shadow-xs px-4 transition-colors">
                <IdCard size={18} className="text-[#BAC7D5] shrink-0 mr-2" strokeWidth={2} />
                <input 
                  type="text" 
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  onBlur={() => handleBlur('licenseNumber')}
                  placeholder="Enter license number (Optional)" 
                  className="w-full bg-transparent py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] font-semibold"
                />
              </div>
              {errors.licenseNumber && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.licenseNumber}</p>}
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
                disabled={!isStep3Valid}
                onClick={handleNext}
                className={`bg-[#0A9D46] text-white px-7 py-3.5 rounded-xl flex items-center gap-2 font-bold text-[15.5px] shadow-[0_4px_16px_rgba(10,157,70,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                  !isStep3Valid 
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
