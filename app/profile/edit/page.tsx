'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Camera, Check, AlertCircle, Upload, User } from 'lucide-react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';
import { motion, AnimatePresence } from 'motion/react';

const PRESET_AVATARS = [
  {
    id: 'hijab1',
    url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=250',
    label: 'Hijab Style 1',
  },
  {
    id: 'hijab2',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    label: 'Hijab Style 2',
  },
  {
    id: 'hijab3',
    url: 'https://images.unsplash.com/photo-1563132337-f159f484226c?auto=format&fit=crop&q=80&w=250',
    label: 'Hijab Style 3',
  },
  {
    id: 'female2',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    label: 'Female Casual',
  },
  {
    id: 'female3',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    label: 'Female Minimalist',
  },
  {
    id: 'male1',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    label: 'Male Casual',
  },
];

export default function EditProfilePage() {
  const router = useRouter();

  // Local state for the editable fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [avatar, setAvatar] = useState('');

  // Interactive controls
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing profile details from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('profile_fullName');
      const savedPhone = localStorage.getItem('profile_phoneNumber');
      const savedEmail = localStorage.getItem('profile_email');
      const savedDob = localStorage.getItem('profile_dob');
      const savedAvatar = localStorage.getItem('profile_avatar');

      setTimeout(() => {
        if (savedName) setFullName(savedName);
        if (savedPhone) setPhoneNumber(savedPhone);
        if (savedEmail) setEmail(savedEmail);
        if (savedDob) setDob(savedDob);
        if (savedAvatar) {
          setAvatar(savedAvatar);
        } else {
          setAvatar('');
        }
      }, 0);
    }
  }, []);

  // Format date input beautifully
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };

  const handleDeviceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setToastMessage('حجم الصورة كبير جداً! برجاء اختيار صورة أقل من 2 ميجا بايت ⚠️');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setAvatar(result);
      setShowAvatarPicker(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile_fullName', fullName);
      localStorage.setItem('profile_phoneNumber', phoneNumber);
      localStorage.setItem('profile_email', email);
      localStorage.setItem('profile_dob', dob);
      localStorage.setItem('profile_avatar', avatar);

      // Trigger standard storage event so other components (e.g., bottom-nav or headers) update instantly
      window.dispatchEvent(new Event('storage'));
    }

    // Trigger Success Toast
    setToastMessage('تم تحديث بيانات الملف الشخصي بنجاح');
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setIsSaving(false);
      router.push('/profile');
    }, 1800);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-sans pb-36 relative overflow-x-hidden">
      
      {/* Dynamic Celebration Toast overlay */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed top-8 left-4 right-4 z-[99999] px-2 select-none">
            <motion.div
              initial={{ y: -80, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -80, opacity: 0, scale: 0.9 }}
              className="max-w-md mx-auto bg-gradient-to-r from-[#EFFAF3] to-[#F1FAF5] border-2 border-[#30C45D] shadow-[0_15px_45px_rgba(48,196,93,0.22)] rounded-[24px] p-4.5 flex gap-4 items-center justify-center text-center"
            >
              <div className="w-11 h-11 rounded-full bg-[#D1FAE5] flex items-center justify-center text-[#0D7A39] shrink-0 shadow-md">
                <Check size={22} className="animate-bounce" strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-[17px] font-black text-[#0D7A39] leading-tight">
                  {toastMessage}
                </h4>
                <p className="text-[12.5px] text-[#064e3b]/80 font-semibold mt-1">
                  Saving all changes... redirection to My Profile soon.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto px-6 pt-4">
        


        {/* Edit profile header */}
        <div className="flex items-center justify-between py-6 relative z-10 w-full">
          <button 
            type="button"
            onClick={() => router.push('/profile')}
            className="text-[#E2A521] hover:scale-105 active:scale-95 transition-all p-1"
            id="back-profile-edit"
          >
            <ChevronLeft size={34} strokeWidth={2.5} />
          </button>
          
          <h1 className="text-[23px] font-black text-[#E2A521] tracking-tight text-center absolute left-1/2 -translate-x-1/2 select-none">
            Edit profile
          </h1>
          
          <button 
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="text-[#E2A521] font-black text-[16px] pr-1.5 hover:opacity-80 transition-opacity disabled:opacity-40"
            id="top-save-profile-edit"
          >
            Save
          </button>
        </div>

        {/* Profile Picture */}
        <div className="mt-6 flex flex-col items-center justify-center relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#22C55E]/15 rounded-full blur-xl opacity-40"></div>
            
            <div className="w-[125px] h-[125px] rounded-full overflow-hidden border-[4px] border-white shadow-[0_12px_32px_rgba(0,0,0,0.08)] relative z-10 bg-[#F3F4F6] flex items-center justify-center">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="User Profile Pic"
                  fill
                  className="object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-14 h-14 text-gray-400" strokeWidth={1.5} />
              )}
            </div>
            
            {/* Green Pencil edit button matching exactly */}
            <button 
              type="button"
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="absolute bottom-1.5 right-1.5 w-[33px] h-[33px] bg-[#22C55E] hover:bg-[#1CA84E] rounded-full border-[3px] border-white flex items-center justify-center text-white shadow-md z-20 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
              id="avatar-picker-toggle"
              title="Click to change avatar"
            >
              <Camera size={14} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Presetted Avatar Picker panel */}
        <AnimatePresence>
          {showAvatarPicker && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 p-4 bg-white/80 backdrop-blur-md border border-slate-100 rounded-[24px] shadow-sm overflow-hidden z-20 relative"
            >
              <div className="flex justify-between items-center mb-3.5 px-1">
                <span className="text-[13px] font-extrabold text-[#7B8BB4]">اختر صورتك المفضلة 🎨</span>
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(false)}
                  className="text-[11px] font-bold text-slate-400 hover:text-slate-600 underline"
                >
                  Close
                </button>
              </div>

              {/* Upload image from local device */}
              <div className="mb-4">
                <label className="flex items-center justify-center gap-2 p-3 bg-emerald-50/50 hover:bg-emerald-50 border-2 border-dashed border-[#22C55E]/30 hover:border-[#22C55E] rounded-2xl cursor-pointer transition-all text-slate-700 select-none group">
                  <Upload size={18} strokeWidth={2.5} className="text-[#22C55E] group-hover:scale-110 transition-transform" />
                  <span className="text-[13.5px] font-extrabold text-[#111827]">تحميل صورة من جهازك 📁</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleDeviceUpload}
                  />
                </label>
              </div>

              <div className="grid grid-cols-6 gap-2 mb-3">
                {PRESET_AVATARS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setAvatar(item.url);
                      setShowAvatarPicker(false);
                    }}
                    className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 shrink-0 ${
                      avatar === item.url ? 'border-[#22C55E] scale-102 ring-2 ring-emerald-500/20' : 'border-white hover:border-slate-300'
                    }`}
                  >
                    <Image src={item.url} alt={item.label} fill className="object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>

              {/* URL Custom Picker Option */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste a custom photo URL..."
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-[#22C55E] font-medium"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customAvatarUrl.trim()) {
                      setAvatar(customAvatarUrl.trim());
                      setCustomAvatarUrl('');
                      setShowAvatarPicker(false);
                    }
                  }}
                  className="px-3 bg-[#22C55E] text-white text-xs font-bold rounded-xl hover:bg-[#1CA84E] transition-all"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Form Fields */}
        <div className="mt-8 flex flex-col gap-5 relative z-10 text-left">
          
          {/* Full Name field */}
          <div>
            <label className="text-[15.5px] font-extrabold text-slate-800 ml-1 mb-2 block select-none">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-14 bg-[#F2F5FD] placeholder-slate-400 text-slate-700 font-semibold px-5 rounded-[20px] border border-transparent focus:border-[#E2A521]/30 focus:bg-white outline-none transition-all text-[15px] shadow-sm"
              placeholder="Your Full Name"
              id="input-name-profile-edit"
            />
          </div>

          {/* Phone Number field */}
          <div>
            <label className="text-[15.5px] font-extrabold text-slate-800 ml-1 mb-2 block select-none">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-14 bg-[#F2F5FD] placeholder-slate-400 text-slate-700 font-semibold px-5 rounded-[20px] border border-transparent focus:border-[#E2A521]/30 focus:bg-white outline-none transition-all text-[15px] shadow-sm"
              placeholder="01012280268"
              id="input-phone-profile-edit"
            />
          </div>

          {/* Email field */}
          <div>
            <label className="text-[15.5px] font-extrabold text-slate-800 ml-1 mb-2 block select-none">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-[#F2F5FD] placeholder-slate-400 text-slate-700 font-semibold px-5 rounded-[20px] border border-transparent focus:border-[#E2A521]/30 focus:bg-white outline-none transition-all text-[15px] shadow-sm"
              placeholder="your.email@example.com"
              id="input-email-profile-edit"
            />
          </div>

          {/* Date of Birth field */}
          <div>
            <label className="text-[15.5px] font-extrabold text-slate-800 ml-1 mb-2 block select-none">
              Date Of Birth
            </label>
            <input
              type="text"
              value={dob}
              onChange={handleDobChange}
              className="w-full h-14 bg-[#F2F5FD] placeholder-[#94A3B8] text-slate-700 font-semibold px-5 rounded-[20px] border border-transparent focus:border-[#E2A521]/30 focus:bg-white outline-none transition-all text-[15px] shadow-sm"
              placeholder="DD / MM / YYY"
              id="input-dob-profile-edit"
            />
          </div>

        </div>

        {/* Action Buttons at the Bottom */}
        <div className="mt-9 flex items-center gap-4.5 justify-between relative z-10 mb-6">
          <button
            type="button"
            onClick={() => router.push('/profile')}
            className="flex-1 max-w-[48%] h-14 border-2 border-[#E2E8F0] bg-white text-[#22C55E] rounded-[24px] font-extrabold text-[15.5px] transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] cursor-pointer"
            id="btn-cancel-profile-edit"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 max-w-[48%] h-14 bg-[#22C55E] hover:bg-[#1CA84E] text-white rounded-[24px] font-extrabold text-[15.5px] transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/10 cursor-pointer disabled:opacity-40"
            id="btn-save-profile-edit"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>

      </div>

      {/* Persistent Bottom Nav Bar to match Snapchat/Mockup exactly */}
      <BottomNav />
    </div>
  );
}
