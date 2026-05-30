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
  Timer,
  Users,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TherapistBottomNav } from '@/widgets/therapist/ui/therapist-bottom-nav';

export default function TherapistProfilePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [profileData, setProfileData] = useState<TherapistRegistrationData>({});
  const [profileAvatar, setProfileAvatar] = useState('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    const saved = getTherapistRegistrationData();
    const savedAvatar = typeof window !== 'undefined' ? localStorage.getItem('profile_avatar') : null;

    Promise.resolve().then(() => {
      setProfileData(saved);
      setProfileAvatar(savedAvatar || '');
    });

    return () => clearTimeout(timer);
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
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePickProfilePhoto = () => {
    fileInputRef.current?.click();
  };

  if (!isMounted) return <div className="min-h-screen bg-[#F4F9F9]" />;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F4F9F9] via-[#FDFDF5] to-[#FDFDF5] font-inter relative pb-32 md:flex md:flex-col md:items-center w-full">
      <div className="w-full max-w-md mx-auto md:max-w-3xl pt-10 pb-6 px-6 relative">
        
        {/* Header Actions */}
        <div className="flex justify-end w-full mb-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-7 h-7" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative mb-4"
          >
            <div className="w-[125px] h-[125px] rounded-[45px] overflow-hidden border-4 border-white shadow-xl rotate-3 bg-[#F8FBFA] flex items-center justify-center">
              {profileAvatar ? (
                <Image 
                  src={profileAvatar}
                  alt={profileData.fullName ? `Profile photo of ${profileData.fullName}` : 'Therapist profile'}
                  width={125}
                  height={125}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#F3F7F5] text-[#94A3B8] text-[13px] font-semibold text-center px-3">
                  No photo selected
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProfilePhotoChange}
            />
            <button
              type="button"
              onClick={handlePickProfilePhoto}
              className="mt-3 px-4 py-2 rounded-full bg-[#22C55E] text-white text-[14px] font-bold hover:bg-[#1CA84E] transition-colors active:scale-95"
            >
              Upload photo
            </button>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md"
            >
              <div className="bg-[#1DA349] rounded-full p-1 flex items-center justify-center">
                <BadgeCheck size={20} className="text-white fill-white stroke-[#1DA349]" />
              </div>
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[34px] font-black text-[#006D32] leading-tight tracking-tight mt-2"
          >
            {profileData.fullName || 'Dr. rawan Rashed'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.2 }}
            className="text-[#4F5B7B] text-[16px] font-bold mt-1"
          >
            {profileData.category || 'Clinical Psychologist'} • {profileData.experience ? `${profileData.experience} Years Experience` : '8 Years Experience'}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            {(profileData.specialization ? [profileData.specialization] : ['Anxiety & Stress'])
              .concat(profileData.category ? [profileData.category] : [])
              .concat(profileData.languages ? profileData.languages.slice(0, 2) : [])
              .slice(0, 3)
              .map((tag, index) => (
                <span key={index} className="bg-[#EAF6ED] text-[#1DA349] px-4 py-1.5 rounded-full text-[13px] font-bold border border-[#1DA349]/5">
                  {tag}
                </span>
              ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-[32px] p-5 shadow-sm border border-[#F1F5F9] mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#006D32] font-black text-[18px]">Personal Info</span>
            <span className="text-[#4F5B7B] text-[13px]">{profileData.username ? `@${profileData.username}` : 'Username not set'}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#8997A5] text-[12px]">Email</p>
              <p className="text-[#1D2D50] font-bold break-all">{profileData.email || 'example@mail.com'}</p>
            </div>
            <div>
              <p className="text-[#8997A5] text-[12px]">Location</p>
              <p className="text-[#1D2D50] font-bold">{profileData.country ? `${profileData.country}${profileData.nationality ? ` • ${profileData.nationality}` : ''}` : 'Not set'}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: "Today's Sessions", value: "5", icon: CalendarIcon, delay: 0.1 },
            { label: "Total Patients", value: "142", icon: Users, delay: 0.2 },
            { label: "Earnings (Month)", value: "12,400", icon: Banknote, delay: 0.3 },
            { label: "Work Hours", value: "32", icon: Timer, delay: 0.4 }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: stat.delay }}
              className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F1F5F9] flex flex-col items-center gap-1 group hover:shadow-md transition-shadow"
            >
              <stat.icon className="text-[#1DA349] mb-2 group-hover:scale-110 transition-transform" size={24} strokeWidth={2.5} />
              <span className="text-[#8997A5] text-[12px] font-bold uppercase tracking-wide text-center leading-none mb-1">{stat.label}</span>
              <span className="text-[28px] font-black text-[#1DA349]">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Sections Container */}
        <div className="flex flex-col gap-6">
          
          {/* Qualifications */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 px-2">
              <div className="w-6 h-6 rounded-full bg-[#1DA349]/10 flex items-center justify-center">
                 <Award size={16} className="text-[#1DA349]" />
              </div>
              <h3 className="text-[#006D32] font-black text-[19px]">Qualifications & Certificates</h3>
            </div>
            
            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-[#F1F5F9] flex flex-col p-2">
              <button className="flex items-center justify-between p-4 hover:bg-[#F8FAFC] transition-colors rounded-[24px] group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6ED] flex items-center justify-center shrink-0">
                    <GraduationCap className="text-[#1DA349]" size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#1D2D50] font-black text-[16px]">{profileData.highestDegree || 'M.Sc. in Clinical Psychology'}</span>
                    <span className="text-[#8997A5] text-[13px] font-medium leading-tight">{profileData.universityName || 'Cairo University'} • {profileData.graduationYear || '2016'}</span>
                  </div>
                </div>
                <ChevronRight className="text-[#BAC7D5] group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              
              <div className="h-px bg-[#F1F5F9] mx-4 my-1"></div>

              <button className="flex items-center justify-between p-4 hover:bg-[#F8FAFC] transition-colors rounded-[24px] group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6ED] flex items-center justify-center shrink-0">
                    <BadgeCheck className="text-[#1DA349]" size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#1D2D50] font-black text-[16px]">{profileData.authority || 'Health Specialties Authority License'}</span>
                    <span className="text-[#8997A5] text-[13px] font-medium leading-tight">License No: {profileData.licenseNumber || '15-A-0034'}</span>
                  </div>
                </div>
                <ChevronRight className="text-[#BAC7D5] group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </motion.div>

          {/* Session Pricing */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 px-2">
              <Banknote size={20} className="text-[#1DA349]" />
              <h3 className="text-[#006D32] font-black text-[19px]">Session Pricing</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-white rounded-[28px] p-5 shadow-sm border border-[#F1F5F9] flex items-center justify-between hover:border-[#1DA349]/30 transition-colors">
                <div>
                   <p className="text-[#8997A5] text-[13px] font-bold mb-1">45 Minute Session</p>
                   <p className="text-[#1DA349] text-[22px] font-black">200 EGP</p>
                </div>
                <button className="text-[#1DA349] font-black text-[14px] px-5 py-2.5 bg-[#EAF6ED] rounded-full hover:bg-[#DDF4E4] transition-colors active:scale-95 underline decoration-2 underline-offset-4">Edit</button>
              </div>
              <div className="bg-white rounded-[28px] p-5 shadow-sm border border-[#F1F5F9] flex items-center justify-between hover:border-[#1DA349]/30 transition-colors">
                <div>
                   <p className="text-[#8997A5] text-[13px] font-bold mb-1">Quick Consultation (15 min)</p>
                   <p className="text-[#1DA349] text-[22px] font-black">100 EGP</p>
                </div>
                <button className="text-[#1DA349] font-black text-[14px] px-5 py-2.5 bg-[#EAF6ED] rounded-full hover:bg-[#DDF4E4] transition-colors active:scale-95 underline decoration-2 underline-offset-4">Edit</button>
              </div>
            </div>
          </motion.div>

          {/* Working Hours */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
             <div className="flex items-center gap-2 px-2">
                <Clock size={20} className="text-[#1DA349]" />
                <h3 className="text-[#006D32] font-black text-[19px]">Working Hours</h3>
             </div>
             <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F1F5F9] flex flex-col gap-4">
                <div className="flex justify-between items-start">
                   <span className="text-[#1D2D50] font-black text-[15px]">Sunday - Thursday</span>
                   <span className="text-[#8997A5] text-[14px] font-bold text-right tracking-tight">09:00 AM - 05:00 PM</span>
                </div>
                <div className="flex justify-between items-start">
                   <span className="text-[#1D2D50] font-black text-[15px]">Saturday</span>
                   <span className="text-[#8997A5] text-[14px] font-bold text-right tracking-tight">10:00 AM - 02:00 PM</span>
                </div>
                <button className="w-full bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#1DA349] font-black text-[16px] py-[18px] rounded-2xl mt-2 transition-colors active:scale-95">
                   Edit Weekly Schedule
                </button>
             </div>
          </motion.div>

          {/* Menu Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[45px] shadow-sm border border-[#F1F5F9] flex flex-col p-2 mb-10 overflow-hidden"
          >
              <Link href="/therapist/profile/personal-information" className="flex items-center justify-between p-5 hover:bg-[#F8FAFC] transition-colors rounded-[32px] group">
               <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-[#4F5B7B] group-hover:bg-[#EAF6ED] group-hover:text-[#1DA349] transition-colors">
                    <User size={22} />
                  </div>
                  <span className="text-[17px] font-black text-[#1D2D50]">Personal Information</span>
               </div>
               <ChevronRight className="text-[#BAC7D5] group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link href="/therapist/profile/security" className="flex items-center justify-between p-5 hover:bg-[#F8FAFC] transition-colors rounded-[32px] group">
               <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-[#4F5B7B] group-hover:bg-[#EAF6ED] group-hover:text-[#1DA349] transition-colors">
                    <Lock size={22} />
                  </div>
                  <span className="text-[17px] font-black text-[#1D2D50]">Security & Password</span>
               </div>
               <ChevronRight className="text-[#BAC7D5] group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <button className="flex items-center justify-between p-5 hover:bg-[#F8FAFC] transition-colors rounded-[32px] group">
               <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-[#4F5B7B] group-hover:bg-[#EAF6ED] group-hover:text-[#1DA349] transition-colors">
                    <Globe size={22} />
                  </div>
                  <span className="text-[17px] font-black text-[#1D2D50]">Language</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[#8997A5] font-bold text-[14px]">English</span>
                  <ChevronRight className="text-[#BAC7D5] group-hover:translate-x-1 transition-transform" size={20} />
               </div>
            </button>
            <button 
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center p-5 hover:bg-red-50 transition-colors rounded-[32px] group"
            >
               <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center text-[#C82A2A] group-hover:bg-red-100 transition-colors">
                    <LogOut size={22} />
                  </div>
                  <span className="text-[17px] font-black text-[#C82A2A]">Logout</span>
               </div>
            </button>
          </motion.div>

          {isLogoutModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsLogoutModalOpen(false)}
              />
              <div className="bg-white rounded-[18px] w-full max-w-[340px] p-6 relative z-10 shadow-2xl">
                <h2 className="text-[20px] font-bold text-black mb-2">Confirm Logout</h2>
                <p className="text-[15px] text-[#6B7280] mb-8">Are you sure you want to logout?</p>
                <div className="flex justify-end gap-4 font-bold text-[15px]">
                  <button 
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="text-[#1DA349] hover:opacity-80 transition-opacity cursor-pointer"
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
                    className="text-[#1DA349] hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <TherapistBottomNav />
    </div>
  );
}
