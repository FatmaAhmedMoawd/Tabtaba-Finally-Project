'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTherapistRegistrationData, TherapistRegistrationData } from '@/lib/therapist-storage';
import { 
  Calendar as CalendarIcon,
  Banknote,
  BadgeCheck,
  ChevronRight,
  GraduationCap,
  Award,
  Clock,
  Lock,
  Globe,
  LogOut,
  Users,
  User,
  Search,
  Bell,
  Settings,
  Sparkles
} from 'lucide-react';
import { TherapistBottomNav } from '@/widgets/therapist/ui/therapist-bottom-nav';

export default function TherapistProfilePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [profileData, setProfileData] = useState<TherapistRegistrationData>({});
  const [profileAvatar, setProfileAvatar] = useState('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const saved = getTherapistRegistrationData();
    const savedAvatar = typeof window !== 'undefined' ? localStorage.getItem('profile_avatar') : null;

    setProfileData(saved);
    setProfileAvatar(savedAvatar || '');
  }, []);

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setProfileAvatar(result);
      if (typeof window !== 'undefined') {
        localStorage.setItem('profile_avatar', result);
        window.dispatchEvent(new Event('storage'));
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePickProfilePhoto = () => {
    fileInputRef.current?.click();
  };

  if (!isMounted) return <div className="min-h-screen bg-[#FAF8F5]" />;

  // Default fallback values based on Figma screenshots
  const defaultFullName = profileData.fullName || 'Dr. Rawan Rashed';
  const defaultCategory = profileData.category || 'Clinical Psychologist';
  const defaultExperience = profileData.experience ? `${profileData.experience} Years Experience` : '8 Years Experience';
  const defaultAvatar = 'https://randomuser.me/api/portraits/women/44.jpg';

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-inter relative pb-32 md:pb-12 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4 md:px-8 relative z-10 flex flex-col gap-6">
        
        {/* Header Search & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full border-b border-gray-100 pb-5">
          <div className="relative w-full max-w-[280px] sm:max-w-xs">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search patients, sessions..." 
              className="w-full bg-white border border-gray-200/80 rounded-full py-2.5 pl-11 pr-5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1DA349]/20 focus:border-[#1DA349] transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 mt-2 lg:mt-0 justify-between lg:justify-end shrink-0">
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
              <Bell size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* 2-Column Grid Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
          
          {/* Left Column: Profile Card, Stats, and Account Settings (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Profile main details card */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/50 shadow-sm flex flex-col items-center text-center">
              <div className="relative mb-4 group cursor-pointer" onClick={handlePickProfilePhoto}>
                <div className="w-[120px] h-[120px] rounded-[40px] overflow-hidden border-4 border-white shadow-md relative bg-gray-50">
                  <Image 
                    src={profileAvatar || defaultAvatar}
                    alt={defaultFullName}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold">
                    Edit Photo
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleProfilePhotoChange}
                />
                
                <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                  <span className="bg-[#1DA349] rounded-full p-1.5 flex items-center justify-center">
                    <BadgeCheck size={16} className="text-white fill-white stroke-[#1DA349]" />
                  </span>
                </span>
              </div>
              
              <h2 className="text-[#0B5C2E] font-black text-[24px] tracking-tight leading-tight">
                {defaultFullName}
              </h2>
              
              <p className="text-gray-500 font-bold text-[14px] mt-1 select-none">
                {defaultCategory} • {defaultExperience}
              </p>
              
              {/* Tags Section */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
                {['Anxiety & Stress', 'Family Relations', 'Depression'].map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="bg-[#EBFDF0] text-[#1DA349] px-3.5 py-1 rounded-full text-xs font-bold border border-[#1DA349]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Grid of Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Today", value: "5", suffix: "Sessions", icon: CalendarIcon },
                { label: "Total", value: "142", suffix: "Patients", icon: Users },
                { label: "Month", value: "12,400", suffix: "EGP Earnings", icon: Banknote },
                { label: "Weekly", value: "32", suffix: "Work Hours", icon: Clock }
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="bg-white rounded-[28px] p-5 border border-gray-200/50 shadow-sm flex flex-col gap-1.5 hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">{stat.label}</span>
                    <stat.icon size={16} className="text-[#1DA349]" />
                  </div>
                  <div className="flex flex-col gap-0.5 mt-1.5">
                    <span className="text-[26px] font-black text-[#1DA349] leading-none">{stat.value}</span>
                    <span className="text-gray-400 text-[10px] font-bold">{stat.suffix}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Account Settings Menu list */}
            <div className="bg-white rounded-[32px] p-2.5 border border-gray-200/50 shadow-sm flex flex-col">
              <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest px-4 pt-3 pb-2.5 border-b border-gray-50">Account Settings</span>
              
              <Link href="/therapist/profile/personal-information" className="flex items-center justify-between p-3.5 hover:bg-gray-50 transition-colors rounded-2xl group mt-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-[#EBFDF0] group-hover:text-[#1DA349] transition-colors">
                    <User size={18} />
                  </div>
                  <span className="text-[14.5px] font-bold text-gray-700">Personal Information</span>
                </div>
                <ChevronRight className="text-gray-300 group-hover:translate-x-0.5 transition-transform" size={16} strokeWidth={2.5} />
              </Link>
              
              <Link href="/therapist/profile/security" className="flex items-center justify-between p-3.5 hover:bg-gray-50 transition-colors rounded-2xl group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-[#EBFDF0] group-hover:text-[#1DA349] transition-colors">
                    <Lock size={18} />
                  </div>
                  <span className="text-[14.5px] font-bold text-gray-700">Security & Password</span>
                </div>
                <ChevronRight className="text-gray-300 group-hover:translate-x-0.5 transition-transform" size={16} strokeWidth={2.5} />
              </Link>
              
              <button className="flex items-center justify-between p-3.5 hover:bg-gray-50 transition-colors rounded-2xl group text-left cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-[#EBFDF0] group-hover:text-[#1DA349] transition-colors">
                    <Globe size={18} />
                  </div>
                  <span className="text-[14.5px] font-bold text-gray-700">Language</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 text-xs font-bold">English</span>
                  <ChevronRight className="text-gray-300 group-hover:translate-x-0.5 transition-transform" size={16} strokeWidth={2.5} />
                </div>
              </button>

              <button 
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center justify-between p-3.5 hover:bg-red-50/50 transition-colors rounded-2xl group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                    <LogOut size={18} />
                  </div>
                  <span className="text-[14.5px] font-bold text-red-500">Logout</span>
                </div>
              </button>
            </div>

          </div>

          {/* Right Column: Qualifications, Pricing, Working Hours, and Promotions (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* Qualifications & Certificates */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/50 shadow-sm flex flex-col gap-4">
              <h3 className="text-gray-800 font-black text-[17px] tracking-tight">Qualifications & Certificates</h3>
              <div className="h-px bg-gray-100" />
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl group cursor-pointer hover:bg-gray-100/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EBFDF0] text-[#1DA349] flex items-center justify-center shrink-0">
                      <GraduationCap size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-bold text-[14px]">M.Sc. in Clinical Psychology</span>
                      <span className="text-gray-450 text-[11.5px] font-semibold mt-0.5">Cairo University • 2016</span>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-300" size={16} strokeWidth={2.5} />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl group cursor-pointer hover:bg-gray-100/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EBFDF0] text-[#1DA349] flex items-center justify-center shrink-0">
                      <BadgeCheck size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-bold text-[14px]">Health Specialties Authority</span>
                      <span className="text-gray-450 text-[11.5px] font-semibold mt-0.5">License No: 15-A-0034</span>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-300" size={16} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Session Pricing */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/50 shadow-sm flex flex-col gap-4">
              <h3 className="text-gray-800 font-black text-[17px] tracking-tight">Session Pricing</h3>
              <div className="h-px bg-gray-100" />
              
              <div className="flex flex-col gap-3">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-100/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">45 Minute Session</span>
                    <span className="text-[#1DA349] font-black text-[22px] mt-0.5">200 EGP</span>
                  </div>
                  <button className="bg-white border border-gray-200 hover:bg-gray-50 text-[#1DA349] text-xs font-bold px-4 py-2 rounded-full shadow-xs cursor-pointer active:scale-95 transition-all">
                    Edit
                  </button>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-100/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">Quick Consultation (15 Min)</span>
                    <span className="text-[#1DA349] font-black text-[22px] mt-0.5">100 EGP</span>
                  </div>
                  <button className="bg-white border border-gray-200 hover:bg-gray-50 text-[#1DA349] text-xs font-bold px-4 py-2 rounded-full shadow-xs cursor-pointer active:scale-95 transition-all">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-200/50 shadow-sm flex flex-col gap-4">
              <h3 className="text-gray-800 font-black text-[17px] tracking-tight">Working Hours</h3>
              <div className="h-px bg-gray-100" />
              
              <div className="flex flex-col gap-3.5">
                <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                  <span>Sunday - Thursday</span>
                  <span className="text-gray-700 tracking-tight">09:00 AM - 05:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                  <span>Saturday</span>
                  <span className="text-gray-700 tracking-tight">10:00 AM - 02:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                  <span>Friday</span>
                  <span className="bg-[#FFF0F0] text-red-500 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">OFF</span>
                </div>
                <button className="w-full bg-[#FAF8F5] border border-gray-200 hover:bg-gray-50 text-gray-700 font-black text-[14px] py-3 rounded-2xl mt-1.5 transition-all active:scale-[0.99] cursor-pointer">
                  Edit Weekly Schedule
                </button>
              </div>
            </div>

            {/* Grow Your Practice (Promotions) */}
            <div className="bg-gradient-to-br from-[#0B5C2E] to-[#063E1E] rounded-[32px] p-6 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="absolute right-0 top-0 text-white/5 translate-x-3 -translate-y-3 pointer-events-none">
                <Sparkles size={120} strokeWidth={1} />
              </div>
              
              <div className="flex flex-col gap-1.5 flex-1 relative z-10">
                <h4 className="text-[16px] font-black leading-tight flex items-center gap-1.5">
                  <Sparkles size={16} className="fill-white shrink-0" />
                  <span>Grow Your Practice</span>
                </h4>
                <p className="text-[13px] text-white/80 leading-relaxed font-semibold">
                  Your profile is currently 92% complete. Add a video introduction to increase patient bookings by up to 40%.
                </p>
              </div>
              
              <button className="bg-white hover:bg-gray-50 text-[#0B5C2E] font-black text-[14px] px-6 py-3 rounded-full shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap relative z-10 self-start md:self-auto">
                Complete Profile
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsLogoutModalOpen(false)}
          />
          <div className="bg-white rounded-[24px] w-full max-w-[340px] p-6 relative z-10 shadow-xl border border-gray-100 flex flex-col gap-4 animate-scale-up">
            <div className="flex flex-col gap-1">
              <h2 className="text-[19px] font-black text-gray-800">Confirm Logout</h2>
              <p className="text-[14px] text-gray-400 font-semibold leading-relaxed">Are you sure you want to logout of your therapist portal account?</p>
            </div>
            <div className="flex justify-end gap-3.5 font-bold text-[14.5px] mt-2 select-none">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer px-3 py-1.5"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('profile_email');
                    localStorage.removeItem('profile_fullName');
                    localStorage.removeItem('profile_avatar');
                    localStorage.removeItem('isSubscribed');
                    localStorage.removeItem('forgot_password_email');
                    sessionStorage.removeItem('appActiveSession');
                    window.dispatchEvent(new Event('storage'));
                  }
                  setIsLogoutModalOpen(false);
                  router.push('/');
                }}
                className="bg-red-500 hover:bg-red-650 text-white px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs active:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <TherapistBottomNav />
    </div>
  );
}
