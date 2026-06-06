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
  ArrowRight,
  ChevronLeft
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
    fullName: !validateName(fullName) && touched.fullName ? 'Full name must contain at least 2 words (only letters).' : '',
    title: !title && touched.title ? 'Please select your title.' : '',
    gender: !gender && touched.gender ? 'Please select your gender.' : '',
    username: !validateUsername(username) && touched.username ? 'Username is invalid (min 3 chars, clean characters only).' : '',
    email: !validateEmail(email) && touched.email ? 'Invalid or unsupported email domain.' : '',
    mobile: !validateMobile(mobile) && touched.mobile ? 'Invalid phone (starts with 010, 011, 012, or 015, and has 11 digits).' : '',
    dateOfBirth: !validateDate(day, month, year) && dateTouched ? 'Please select a valid date in the past.' : '',
    nationality: !nationality.trim() && touched.nationality ? 'Please select your nationality.' : '',
    country: !country.trim() && touched.country ? 'Please select your country of residence.' : '',
    languages: languages.length === 0 ? 'Please select at least one language.' : '',
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
              <div className="w-8 h-8 rounded-full bg-[#0A9D46] text-white flex items-center justify-center font-bold text-[13px] shadow-md shadow-[#0A9D46]/20">
                1
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-900 leading-tight">Personal Info</span>
                <span className="text-[11px] font-bold text-gray-400">Basic details</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white text-gray-400 border border-gray-100 flex items-center justify-center font-bold text-[13px]">
                2
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-gray-400 leading-tight">Education</span>
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
          <span className="text-xs font-bold text-[#0A9D46] bg-[#EAF6ED] px-3 py-1 rounded-full">Step 1/5</span>
        </header>

        <div className="max-w-3xl w-full mx-auto px-6 py-8 md:py-12 flex flex-col gap-6">
          {/* Section title & progress bar on desktop */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[26px] md:text-[32px] font-black text-gray-900 tracking-tight leading-tight">
              Start your journey as a therapist
            </h1>
            <p className="text-gray-500 font-semibold text-[14px] md:text-[15px] leading-relaxed">
              Create your account to help others and grow your professional impact.
            </p>
            
            {/* Horizontal progress bar for desktop only */}
            <div className="hidden md:flex flex-col gap-1.5 mt-3">
              <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                <span>Personal Info</span>
                <span>20% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-[#0A9D46] h-full w-[20%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Form Content wrapped in a premium card */}
          <div className="bg-white border border-gray-100/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
            
            {/* Row 1: Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">FULL NAME *</label>
              <div className="bg-[#FAFDFE] border border-[#EBF2F9] focus-within:border-[#0A9D46] focus-within:bg-white rounded-xl relative flex items-center shadow-xs transition-colors">
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  placeholder="e.g. Dr. Yasser Abd El-Aziz" 
                  className="w-full bg-transparent px-4 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] font-semibold"
                />
              </div>
              {errors.fullName && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.fullName}</p>}
            </div>

            {/* Row 2: Title & Gender Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">TITLE *</label>
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 transition-colors">
                  <span className={`text-[15px] font-semibold flex-1 ${title ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
                    {title || 'Select Title'}
                  </span>
                  <ChevronDown size={18} className="text-[#788B9E]" />
                  <select value={title} onChange={e=>setTitle(e.target.value)} onBlur={() => handleBlur('title')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                     <option value="" disabled>Select Title</option>
                     <option value="Specialist">Specialist</option>
                     <option value="Consultant">Consultant</option>
                     <option value="Professor">Professor</option>
                  </select>
                </div>
                {errors.title && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.title}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">GENDER *</label>
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 transition-colors">
                  <span className={`text-[15px] font-semibold flex-1 ${gender ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>
                    {gender || 'Select Gender'}
                  </span>
                  <ChevronDown size={18} className="text-[#788B9E]" />
                  <select value={gender} onChange={e=>setGender(e.target.value)} onBlur={() => handleBlur('gender')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                     <option value="" disabled>Select Gender</option>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                  </select>
                </div>
                {errors.gender && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.gender}</p>}
              </div>
            </div>

            {/* Row 3: User Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">USER NAME *</label>
              <div className="bg-[#FAFDFE] border border-[#EBF2F9] focus-within:border-[#0A9D46] focus-within:bg-white rounded-xl relative flex items-center shadow-xs transition-colors">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => handleBlur('username')}
                  placeholder="e.g. yasser_aziz" 
                  className="w-full bg-transparent px-4 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] font-semibold"
                />
              </div>
              {errors.username && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.username}</p>}
            </div>

            {/* Row 4: Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">EMAIL ADDRESS *</label>
              <div className="bg-[#FAFDFE] border border-[#EBF2F9] focus-within:border-[#0A9D46] focus-within:bg-white rounded-xl relative flex items-center shadow-xs px-4 transition-colors">
                <Mail size={18} className="text-[#BAC7D5] shrink-0" strokeWidth={2} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="e.g. name@domain.com" 
                  className="w-full bg-transparent pl-3 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] font-semibold"
                />
              </div>
              {errors.email && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.email}</p>}
            </div>

            {/* Row 5: Mobile Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">MOBILE NUMBER *</label>
              <div className="flex gap-3">
                {/* Country Code */}
                <div className="flex items-center gap-1.5 bg-[#F6FAFE] rounded-xl px-3.5 py-3.5 shadow-xs shrink-0 select-none">
                  <Image src="https://flagcdn.com/eg.svg" alt="EG" width={22} height={16} className="rounded-xs object-cover" />
                  <span className="text-[#1A1A1A] text-[14px] font-bold">+20</span>
                </div>
                {/* Phone Input */}
                <div className="flex-1 bg-[#FAFDFE] border border-[#EBF2F9] focus-within:border-[#0A9D46] focus-within:bg-white rounded-xl relative flex items-center shadow-xs px-4 transition-colors">
                  <Phone size={18} className="text-[#BAC7D5] shrink-0" strokeWidth={2} />
                  <input 
                    type="tel" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    onBlur={() => handleBlur('mobile')}
                    placeholder="Enter 10-digit number" 
                    className="w-full bg-transparent pl-3 py-3.5 text-[15px] text-gray-800 outline-none placeholder:text-[#BAC7D5] font-semibold"
                  />
                </div>
              </div>
              {errors.mobile && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.mobile}</p>}
            </div>

            {/* Row 6: Date of Birth */}
            <div className="flex flex-col gap-2">
              <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">DATE OF BIRTH *</label>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 transition-colors">
                  <span className={`text-[14px] font-semibold flex-1 ${day ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>{day || 'Day'}</span>
                  <ChevronDown size={14} className="text-[#788B9E]" />
                  <select value={day} onChange={e=>setDay(e.target.value)} onBlur={() => handleBlur('day')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                     <option value="" disabled>Day</option>
                     {Array.from({length: 31}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                  </select>
                </div>
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 transition-colors">
                  <span className={`text-[14px] font-semibold flex-1 ${month ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>{month || 'Month'}</span>
                  <ChevronDown size={14} className="text-[#788B9E]" />
                  <select value={month} onChange={e=>setMonth(e.target.value)} onBlur={() => handleBlur('month')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                     <option value="" disabled>Month</option>
                     {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="bg-[#FAFDFE] border border-[#EBF2F9] focus-within:border-[#0A9D46] rounded-xl relative flex items-center px-4 py-3.5 transition-colors">
                  <input type="number" placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} onBlur={() => handleBlur('year')} className="w-full bg-transparent text-gray-800 placeholder:text-[#BAC7D5] text-[14px] font-semibold outline-none" min="1900" max="2026" />
                </div>
              </div>
              {errors.dateOfBirth && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.dateOfBirth}</p>}
            </div>

            {/* Row 7: Nationality & Country Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">NATIONALITY *</label>
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 gap-2 transition-colors">
                  <Globe size={18} className="text-[#788B9E] shrink-0" />
                  <span className={`text-[14px] font-semibold flex-1 truncate ${nationality ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>{nationality || 'Select Nationality'}</span>
                  <ChevronDown size={18} className="text-[#788B9E] shrink-0" />
                  <select value={nationality} onChange={e=>setNationality(e.target.value)} onBlur={() => handleBlur('nationality')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                     <option value="" disabled>Select Nationality</option>
                     <option value="Egyptian">Egyptian</option>
                     <option value="Saudi">Saudi</option>
                     <option value="Emirati">Emirati</option>
                     <option value="American">American</option>
                  </select>
                </div>
                {errors.nationality && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.nationality}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#0D4B8D] text-[11px] font-extrabold uppercase tracking-widest pl-1">COUNTRY OF RESIDENCE *</label>
                <div className="bg-[#F6FAFE] hover:bg-[#EEF4FB] rounded-xl relative flex items-center px-4 py-3.5 gap-2 transition-colors">
                  <MapPin size={18} className="text-[#788B9E] shrink-0" />
                  <span className={`text-[14px] font-semibold flex-1 truncate ${country ? 'text-gray-800' : 'text-[#BAC7D5]'}`}>{country || 'Select Country'}</span>
                  <ChevronDown size={18} className="text-[#788B9E] shrink-0" />
                  <select value={country} onChange={e=>setCountry(e.target.value)} onBlur={() => handleBlur('country')} className="absolute inset-0 opacity-0 w-full cursor-pointer">
                     <option value="" disabled>Select Country</option>
                     <option value="Egypt">Egypt</option>
                     <option value="Saudi Arabia">Saudi Arabia</option>
                     <option value="UAE">UAE</option>
                     <option value="USA">USA</option>
                  </select>
                </div>
                {errors.country && <p className="text-[13px] text-red-500 font-medium px-1 mt-0.5">{errors.country}</p>}
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="flex flex-col border-t border-gray-50 pt-5">
              <div className="flex items-center gap-2 mb-1">
                <Languages size={18} className="text-gray-800" strokeWidth={2.5} />
                <h3 className="text-[15px] font-black text-gray-900">Languages Spoken</h3>
              </div>
              <p className="text-[#8B98A7] text-[12.5px] font-semibold mb-4">
                Select all that apply to your clinical practice
              </p>

              <div className="flex flex-wrap gap-2">
                {['Arabic', 'English', 'French', 'Spanish', 'German', ...languages.filter(l => !['Arabic', 'English', 'French', 'Spanish', 'German'].includes(l))].map(lang => {
                  const isSelected = languages.includes(lang);
                  return (
                    <button 
                      type="button"
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`px-5 py-2.5 rounded-full flex items-center gap-2 text-[13.5px] transition-all hover:scale-[1.02] cursor-pointer ${
                        isSelected 
                          ? 'bg-[#0A9D46] text-white shadow-xs font-bold' 
                          : 'bg-[#EAEFF4] hover:bg-[#DFE6EC] text-gray-700 font-semibold'
                      }`}
                    >
                      <span>{lang}</span>
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </button>
                  );
                })}

                {!showOtherLanguageInput ? (
                  <button 
                    type="button"
                    onClick={() => setShowOtherLanguageInput(true)}
                    className="bg-transparent border border-dashed border-gray-300 hover:border-gray-400 text-gray-400 hover:text-gray-600 px-5 py-2.5 rounded-full flex items-center gap-1.5 text-[13.5px] font-bold transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> Other
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-[#FAFDFE] border border-[#EBF2F9] rounded-full px-2.5 py-1">
                    <input 
                      type="text" 
                      autoFocus
                      placeholder="Language..." 
                      value={otherLanguage}
                      onChange={(e) => setOtherLanguage(e.target.value)}
                      onKeyDown={handleOtherKeydown}
                      className="bg-transparent text-[13.5px] font-semibold text-gray-800 outline-none pl-2 w-28 placeholder:text-gray-300"
                    />
                    <button type="button" onClick={handleAddOther} className="bg-[#0A9D46] text-white w-7 h-7 rounded-full flex items-center justify-center shrink-0 hover:bg-[#008c3d] cursor-pointer">
                      <Check size={14} strokeWidth={3} />
                    </button>
                  </div>
                )}
              </div>
              {errors.languages && <p className="text-[13px] text-red-500 font-medium px-1 mt-2">{errors.languages}</p>}
            </div>

            {/* Navigation buttons contained inside the form card */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-6 mt-4">
              <button 
                type="button"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-black font-extrabold text-[15px] flex items-center gap-1.5 px-3 py-2 cursor-pointer"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={!isStep1Valid}
                onClick={handleNext}
                className={`bg-[#0A9D46] text-white px-7 py-3.5 rounded-xl flex items-center gap-2 font-bold text-[15.5px] shadow-[0_4px_16px_rgba(10,157,70,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                  !isStep1Valid 
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

