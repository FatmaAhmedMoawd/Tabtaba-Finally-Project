'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { saveTherapistRegistrationData, getTherapistRegistrationData } from '@/lib/therapist-storage';
import { 
  User, 
  ChevronDown, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Languages, 
  Check, 
  Plus, 
  ArrowRight
} from 'lucide-react';

export default function TherapistRegisterStep1() {
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [nationality, setNationality] = useState('');
  const [country, setCountry] = useState('');
  const [languages, setLanguages] = useState<string[]>(['Arabic', 'English']);
  
  const [showOtherLanguageInput, setShowOtherLanguageInput] = useState(false);
  const [otherLanguage, setOtherLanguage] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = getTherapistRegistrationData();
    Promise.resolve().then(() => {
      setIsAllowed(true);
      setFullName(saved.fullName ?? '');
      setTitle(saved.title ?? '');
      setGender(saved.gender ?? '');
      setUsername(saved.username ?? '');
      setEmail(saved.email ?? '');
      setMobile(saved.mobile ?? '');
      setDay(saved.day ?? '');
      setMonth(saved.month ?? '');
      setYear(saved.year ?? '');
      setNationality(saved.nationality ?? '');
      setCountry(saved.country ?? '');
      setLanguages(saved.languages ?? ['Arabic', 'English']);
    });
  }, []);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    saveTherapistRegistrationData({
      fullName,
      title,
      gender,
      username,
      email,
      mobile,
      day,
      month,
      year,
      nationality,
      country,
      languages,
    });
    router.push('/therapist/register/step-2');
  };

  const validateName = (value: string) => {
    const trimmed = value.trim();
    return /^[A-Za-z\u0600-\u06FF]+(?:[\s\-']+[A-Za-z\u0600-\u06FF]+)+$/.test(trimmed) && trimmed.length >= 5;
  };

  const validateUsername = (value: string) => {
    const trimmed = value.trim();
    return trimmed.length >= 3 && /^[A-Za-z0-9._-]+$/.test(trimmed) && !/(asd|qwe|qwer|123123|0000|1111)/i.test(trimmed);
  };

  const validateEmail = (value: string) => {
    const domainPattern = /@(?:gmail\.com|yahoo\.com|outlook\.com)$/i;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && domainPattern.test(value);
  };

  const validateMobile = (value: string) => {
    return /^(010|011|012|015)\d{8}$/.test(value);
  };

  const validateDate = (d: string, m: string, y: string) => {
    if (!d || !m || !y) return false;
    const monthIndex = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(m);
    if (monthIndex === -1) return false;
    const date = new Date(Number(y), monthIndex, Number(d));
    return date.getFullYear() === Number(y) && date.getMonth() === monthIndex && date.getDate() === Number(d) && date < new Date();
  };

  const isStep1Valid =
    validateName(fullName) &&
    ['Specialist', 'Consultant', 'Professor'].includes(title) &&
    ['Male', 'Female'].includes(gender) &&
    validateUsername(username) &&
    validateEmail(email) &&
    validateMobile(mobile) &&
    validateDate(day, month, year) &&
    nationality.trim().length > 0 &&
    country.trim().length > 0 &&
    languages.length > 0;

  const dateTouched = touched.day || touched.month || touched.year;

  if (!isAllowed) {
    return null;
  }

  const errors = {
    fullName: !validateName(fullName) && touched.fullName ? 'الاسم الكامل مطلوب ويجب أن يكون حقيقيًا بحروف فقط.' : '',
    title: !title && touched.title ? 'الرجاء اختيار المسمى الوظيفي.' : '',
    gender: !gender && touched.gender ? 'الرجاء اختيار الجنس.' : '',
    username: !validateUsername(username) && touched.username ? 'اسم المستخدم غير صالح، يجب أن يكون نظيفًا وطويلًا بما يكفي.' : '',
    email: !validateEmail(email) && touched.email ? 'البريد الإلكتروني غير صالح أو غير مدعوم.' : '',
    mobile: !validateMobile(mobile) && touched.mobile ? 'الرقم غير صالح. يجب أن يبدأ بـ010 أو 011 أو 012 أو 015 ويحتوي على 11 رقمًا.' : '',
    dateOfBirth: !validateDate(day, month, year) && dateTouched ? 'الرجاء إدخال تاريخ ميلاد صحيح في الماضي (يوم، شهر، سنة).' : '',
    nationality: !nationality.trim() && touched.nationality ? 'الرجاء اختيار الجنسية.' : '',
    country: !country.trim() && touched.country ? 'الرجاء اختيار دولة الإقامة.' : '',
    languages: languages.length === 0 ? 'الرجاء اختيار لغة واحدة على الأقل.' : '',
  };

  const toggleLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      setLanguages(languages.filter(l => l !== lang));
    } else {
      setLanguages([...languages, lang]);
    }
  };

  const handleAddOther = () => {
    if (otherLanguage.trim() && !languages.includes(otherLanguage.trim())) {
      setLanguages([...languages, otherLanguage.trim()]);
    }
    setOtherLanguage('');
    setShowOtherLanguageInput(false);
  };

  const handleOtherKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOther();
    }
  };

  return (
    <div className="min-h-[100dvh] bg-white font-inter relative pb-28 md:flex md:flex-col md:items-center w-full">
      {/* Header Area */}
      <div className="w-full relative max-w-md mx-auto md:max-w-3xl md:mt-12 bg-white rounded-b-[38px] md:rounded-[32px] pt-10 pb-5 md:py-12 px-6 md:px-12 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] md:shadow-none">
        
        <div className="relative z-10 md:flex md:items-center md:justify-between">
          <div className="md:max-w-lg">
            <h1 className="text-[32px] md:text-[40px] leading-[1.1] font-extrabold text-[#0A9D46] tracking-tight mb-2 pr-12 md:pr-0">
              Start your journey as a therapist
            </h1>
            <p className="text-[#9EAEB9] md:text-[#849CAE] text-[14px] md:text-[18px] font-medium leading-tight mb-6 pr-16 md:pr-0">
              Create your account to help others and grow your professional impact.
            </p>

            <div className="flex justify-between items-end mt-4 md:mt-8">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#0A9D46]">
                  <User size={18} className="md:w-6 md:h-6" strokeWidth={2.5} />
                  <span className="text-[16px] md:text-[20px] font-bold mt-0.5">Personal Info</span>
                </div>
                <span className="text-[#0A9D46] text-[10px] md:text-[12px] font-extrabold tracking-wider uppercase mt-1 md:mt-2">
                  Step 1 of 5
                </span>
                <div className="w-16 md:w-20 h-1 md:h-1.5 bg-[#0A9D46] rounded-full mt-1" />
              </div>

              {/* Mobile Logo */}
              <div className="relative w-20 h-16 mr-2 md:hidden">
                <Image
                  src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
                  alt="Tabtaba Logo"
                  fill
                  className="object-contain mix-blend-multiply scale-[1.3]"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Desktop Logo Box */}
          <div className="hidden md:flex p-6 w-40 h-40 items-center justify-center relative shrink-0">
             <Image
                src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
                alt="Tabtaba Logo"
                fill
                className="object-contain scale-[0.8]"
                priority
              />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto md:max-w-3xl w-full px-6 pt-8 pb-12 flex flex-col gap-5">
        
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">FULL NAME *</label>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center shadow-sm">
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur('fullName')}
              placeholder="Dr. yasser abd elazize" 
              className="w-full bg-transparent px-4 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] placeholder:font-medium"
            />
          </div>
          {errors.fullName && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.fullName}</p>}
        </div>

        {/* Title & Gender Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">TITLE *</label>
            <div className="bg-[#F6FAFE] rounded-lg relative flex items-center px-4 py-3.5">
              <span className={`text-[15px] font-medium flex-1 ${title ? 'text-gray-800' : 'text-[#D0DDE7]'}`}>
                {title || 'Title'}
              </span>
              <ChevronDown size={18} className="text-[#788B9E]" />
              <select value={title} onChange={e=>setTitle(e.target.value)} onBlur={() => handleBlur('title')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                 <option value="" disabled>Title</option>
                 <option value="Specialist">Specialist</option>
                 <option value="Consultant">Consultant</option>
                 <option value="Professor">Professor</option>
              </select>
            </div>
            {errors.title && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.title}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">GENDER *</label>
            <div className="bg-[#F6FAFE] rounded-lg relative flex items-center px-4 py-3.5">
              <span className={`text-[15px] font-medium flex-1 ${gender ? 'text-gray-800' : 'text-[#D0DDE7]'}`}>
                {gender || 'Gender'}
              </span>
              <ChevronDown size={18} className="text-[#788B9E]" />
              <select value={gender} onChange={e=>setGender(e.target.value)} onBlur={() => handleBlur('gender')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                 <option value="" disabled>Gender</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
              </select>
            </div>
            {errors.gender && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.gender}</p>}
          </div>
        </div>

        {/* User Name */}
        <div className="flex flex-col gap-1.5 mt-1">
          <label className="text-[#0D4B8D] text-[13px] font-bold tracking-tight pl-1">*User Name</label>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center shadow-sm">
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur('username')}
              placeholder="Enter Username" 
              className="w-full bg-transparent px-4 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] placeholder:font-medium"
            />
          </div>
          {errors.username && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.username}</p>}
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1.5 mt-1">
          <label className="text-[#0D4B8D] text-[13px] font-bold tracking-tight pl-1">*Email Address</label>
          <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center shadow-sm px-4">
            <Mail size={18} className="text-[#BAC7D5] shrink-0" strokeWidth={2} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="Enter your email" 
              className="w-full bg-transparent pl-3 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] placeholder:font-medium"
            />
          </div>
          {errors.email && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.email}</p>}
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col gap-1.5 mt-1">
          <label className="text-[#0D4B8D] text-[13px] font-bold tracking-tight pl-1">*Mobile Number</label>
          <div className="flex gap-2">
            {/* Country Code */}
            <div className="flex items-center gap-1.5 bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl px-3 py-3.5 shadow-sm">
              <Image src="https://flagcdn.com/eg.svg" alt="EG" width={24} height={18} className="rounded-sm object-cover" />
              <span className="text-[#1A1A1A] text-[14px] font-medium">+02</span>
            </div>
            {/* Phone Input */}
            <div className="flex-1 bg-[#FAFDFE] border border-[#EBF2F9] rounded-xl relative flex items-center shadow-sm px-4">
              <Phone size={18} className="text-[#BAC7D5] shrink-0 fill-transparent" strokeWidth={2} />
              <input 
                type="tel" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                onBlur={() => handleBlur('mobile')}
                placeholder="Enter Mobile Number" 
                className="w-full bg-transparent pl-3 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] placeholder:font-medium"
              />
            </div>
          </div>
          {errors.mobile && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.mobile}</p>}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">DATE OF BIRTH *</label>
          <div className="grid grid-cols-3 gap-0">
            <div className="bg-[#F6FAFE] rounded-l-lg border-r border-[#EBF2F9]/50 relative flex items-center px-4 py-4">
              <span className={`text-[14px] font-medium flex-1 ${day ? 'text-gray-800' : 'text-[#A2B1C2]'}`}>{day || 'Day'}</span>
              <ChevronDown size={14} className="text-[#A2B1C2]" />
              <select value={day} onChange={e=>setDay(e.target.value)} onBlur={() => handleBlur('day')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                 <option value="" disabled>Day</option>
                 {Array.from({length: 31}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
              </select>
            </div>
            <div className="bg-[#F6FAFE] relative flex items-center px-4 py-4">
              <span className={`text-[14px] font-medium flex-1 ${month ? 'text-gray-800' : 'text-[#A2B1C2]'}`}>{month || 'Month'}</span>
              <ChevronDown size={14} className="text-[#A2B1C2]" />
              <select value={month} onChange={e=>setMonth(e.target.value)} onBlur={() => handleBlur('month')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                 <option value="" disabled>Month</option>
                 {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="bg-[#F6FAFE] rounded-r-lg border-l border-[#EBF2F9]/50 relative flex items-center px-4 py-4">
              <input type="number" placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} onBlur={() => handleBlur('year')} className="w-full bg-transparent text-gray-800 placeholder:text-[#A2B1C2] text-[14px] font-medium outline-none" min="1900" max="2026" />
            </div>
          </div>
          {errors.dateOfBirth && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.dateOfBirth}</p>}
        </div>

        {/* Nationality & Country Row */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#0D4B8D] text-[13px] font-bold tracking-tight pl-1">*Nationality</label>
            <div className="bg-[#F6FAFE] rounded-lg relative flex items-center px-3 py-4 gap-2">
              <Globe size={18} className="text-[#A2B1C2] shrink-0" />
              <span className={`text-[14px] font-medium flex-1 truncate ${nationality ? 'text-gray-800' : 'text-[#A2B1C2]'}`}>{nationality || 'Nationality'}</span>
              <ChevronDown size={18} className="text-[#788B9E] shrink-0" />
              <select value={nationality} onChange={e=>setNationality(e.target.value)} onBlur={() => handleBlur('nationality')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                 <option value="" disabled>Nationality</option>
                 <option value="Egyptian">Egyptian</option>
                 <option value="Saudi">Saudi</option>
                 <option value="Emirati">Emirati</option>
                 <option value="American">American</option>
              </select>
            </div>
            {errors.nationality && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.nationality}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[#0D4B8D] text-[13px] font-bold tracking-tight pl-1">*Country of Residence</label>
            <div className="bg-[#F6FAFE] rounded-lg relative flex items-center px-3 py-4 gap-2">
              <MapPin size={18} className="text-[#A2B1C2] shrink-0" />
              <span className={`text-[14px] font-medium flex-1 truncate ${country ? 'text-gray-800' : 'text-[#A2B1C2]'}`}>{country || 'Country'}</span>
              <ChevronDown size={18} className="text-[#788B9E] shrink-0" />
              <select value={country} onChange={e=>setCountry(e.target.value)} onBlur={() => handleBlur('country')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                 <option value="" disabled>Country</option>
                 <option value="Egypt">Egypt</option>
                 <option value="Saudi Arabia">Saudi Arabia</option>
                 <option value="UAE">UAE</option>
                 <option value="USA">USA</option>
              </select>
            </div>
            {errors.country && <p className="text-[13px] text-red-500 font-medium px-1 mt-1">{errors.country}</p>}
          </div>
        </div>

        {/* Languages Spoken */}
        <div className="flex flex-col mt-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Languages size={20} className="text-gray-800" strokeWidth={2} />
            <h3 className="text-[15px] font-bold text-gray-900">Languages Spoken</h3>
          </div>
          <p className="text-[#8B98A7] text-[13px] font-medium mb-4">
            Select all that apply to your practice
          </p>

          <div className="flex flex-wrap gap-2.5">
            {['Arabic', 'English', 'French', 'Spanish', 'German', ...languages.filter(l => !['Arabic', 'English', 'French', 'Spanish', 'German'].includes(l))].map(lang => {
              const isSelected = languages.includes(lang);
              return (
                <button 
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-5 py-2.5 rounded-full flex items-center gap-1.5 text-[14px] transition-colors ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#1E8A99] to-[#25A775] text-white shadow-sm font-bold' 
                      : 'bg-[#EAEFF4] text-[#111827] font-medium'
                  }`}
                >
                  {lang} {isSelected && <Check size={16} strokeWidth={3} />}
                </button>
              );
            })}

            {!showOtherLanguageInput ? (
              <button 
                onClick={() => setShowOtherLanguageInput(true)}
                className="bg-transparent border border-gray-200 text-[#9CA3AF] px-5 py-2.5 rounded-full flex items-center gap-1.5 text-[14px] font-medium"
              >
                <Plus size={16} /> Other
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-[#EAEFF4] rounded-full px-2 py-1">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Type language..." 
                  value={otherLanguage}
                  onChange={(e) => setOtherLanguage(e.target.value)}
                  onKeyDown={handleOtherKeydown}
                  className="bg-transparent text-[14px] font-medium text-[#111827] outline-none pl-3 w-28"
                />
                <button onClick={handleAddOther} className="bg-[#25A775] text-white w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                  <Check size={14} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Next Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          disabled={!isStep1Valid}
          onClick={handleNext}
          className={`bg-[#00AA4F] text-white px-7 py-3.5 rounded-2xl flex items-center justify-between gap-3 font-bold text-[16px] shadow-[0_4px_16px_rgba(0,170,79,0.35)] transition-transform active:scale-95 ${!isStep1Valid ? 'opacity-60 cursor-not-allowed hover:bg-[#00AA4F]' : 'hover:bg-[#009645]'}`}
        >
           <span>Next Step</span>
           <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
