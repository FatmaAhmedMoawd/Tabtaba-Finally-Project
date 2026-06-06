'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Camera, Check, Upload, User, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-[100dvh] bg-[#FCFAF6] font-sans pb-36 relative overflow-x-hidden">
      
      {/* Dynamic Celebration Toast overlay */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed top-8 left-4 right-4 z-[99999] px-2 select-none">
            <motion.div
              initial={{ y: -80, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -80, opacity: 0, scale: 0.9 }}
              className="max-w-md mx-auto bg-[#E6F4F0] border-2 border-[#30C45D] shadow-[0_15px_45px_rgba(48,196,93,0.15)] rounded-[24px] p-4.5 flex gap-4 items-center justify-center text-center"
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

      {/* ======================================================== */}
      {/* 1. MOBILE VIEW (Original layout preserved exactly) */}
      {/* ======================================================== */}
      <div className="block md:hidden min-h-screen bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3]">
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
              
              {/* Green Pencil edit button */}
              <button 
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="absolute bottom-1.5 right-1.5 w-[33px] h-[33px] bg-[#22C55E] hover:bg-[#1CA84E] rounded-full border-[3px] border-white flex items-center justify-center text-white shadow-md z-20 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                id="avatar-picker-toggle"
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

          {/* Action Buttons */}
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
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP VIEW (Premium Web Form Redesign) */}
      {/* ======================================================== */}
      <div className="hidden md:block w-full max-w-5xl mx-auto px-8 py-10">
        
        {/* Navigation & Title */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-150/40 pb-5">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => router.push('/profile')}
              className="flex items-center gap-2 text-gray-655 hover:text-gray-900 transition-colors font-bold text-sm bg-white border border-gray-250/60 rounded-full px-5 py-2.5 shadow-sm cursor-pointer"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
              <span>Back to Profile</span>
            </button>
            <h1 className="text-2xl font-black text-gray-900">Edit Personal Information</h1>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="px-6 py-3 border border-gray-250 rounded-2xl font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer bg-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-[#0D7A39] hover:bg-[#0A602D] text-white rounded-2xl font-black text-sm active:scale-95 transition-all cursor-pointer shadow-md shadow-emerald-700/10 disabled:opacity-50"
            >
              {isSaving ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Main Form Split Grid */}
        <div className="grid grid-cols-12 gap-10 items-start mt-6">
          
          {/* Left Column: Avatar & Preset Selectors (5 columns) */}
          <div className="col-span-5 bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm flex flex-col items-center">
            <span className="text-xs font-black text-[#0D7A39] uppercase tracking-wider mb-6 block self-start">
              Profile Avatar
            </span>

            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#0D7A39]/10 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden border-[4px] border-white shadow-[0_12px_36px_rgba(0,0,0,0.06)] relative z-10 bg-gray-50 flex items-center justify-center">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Profile Avatar"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-300" />
                )}
              </div>
            </div>

            {/* Presets and Upload Panel directly visible on Desktop */}
            <div className="w-full space-y-5">
              
              {/* Presets Grid */}
              <div>
                <label className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2.5 block">
                  Select Preset Character
                </label>
                <div className="grid grid-cols-6 gap-2 bg-[#FCFAF6] border border-gray-100 p-3 rounded-2xl">
                  {PRESET_AVATARS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAvatar(item.url)}
                      className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer ${
                        avatar === item.url ? 'border-[#0D7A39] ring-2 ring-emerald-500/20' : 'border-white hover:border-slate-350'
                      }`}
                    >
                      <Image src={item.url} alt={item.label} fill className="object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload field */}
              <div>
                <label className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2 block">
                  Upload Photo file
                </label>
                <label className="flex items-center justify-center gap-2 p-3.5 bg-emerald-50/50 hover:bg-emerald-50/80 border-2 border-dashed border-[#0D7A39]/20 hover:border-[#0D7A39] rounded-2xl cursor-pointer transition-all select-none group">
                  <Upload size={16} className="text-[#0D7A39] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black text-gray-700">Upload image from computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleDeviceUpload}
                  />
                </label>
              </div>

              {/* Custom URL */}
              <div>
                <label className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2 block">
                  Or Paste Photo Link URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://example.com/avatar.jpg"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#0D7A39] font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customAvatarUrl.trim()) {
                        setAvatar(customAvatarUrl.trim());
                        setCustomAvatarUrl('');
                      }
                    }}
                    className="px-4 bg-[#0D7A39] hover:bg-[#0A602D] text-white text-xs font-black rounded-xl active:scale-95 transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Information form fields (7 columns) */}
          <div className="col-span-7 bg-white border border-gray-150/50 rounded-[32px] p-8 shadow-sm space-y-6">
            <span className="text-xs font-black text-[#0D7A39] uppercase tracking-wider block">
              Personal Information
            </span>

            <div className="grid grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="col-span-2">
                <label className="text-sm font-black text-gray-800 mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-[#0D7A39] focus:bg-white transition-all shadow-sm"
                  placeholder="Your Full Name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-black text-gray-800 mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-[#0D7A39] focus:bg-white transition-all shadow-sm"
                  placeholder="name@example.com"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-sm font-black text-gray-800 mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-[#0D7A39] focus:bg-white transition-all shadow-sm"
                  placeholder="Phone Number"
                />
              </div>

              {/* Date of Birth */}
              <div className="col-span-2">
                <label className="text-sm font-black text-gray-800 mb-2 block">Date of Birth</label>
                <input
                  type="text"
                  value={dob}
                  onChange={handleDobChange}
                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-[#0D7A39] focus:bg-white transition-all shadow-sm"
                  placeholder="DD / MM / YYYY"
                />
              </div>

            </div>

            {/* Privacy notice banner */}
            <div className="bg-[#F0F7F4] border border-[#CDE7DC] rounded-2xl p-4.5 flex items-start gap-3 mt-4">
              <ShieldCheck className="text-[#0D7A39] shrink-0 mt-0.5" size={18} />
              <div>
                <span className="text-xs font-black text-gray-800 block">Encryption & Privacy Assured</span>
                <span className="text-[10.5px] text-gray-500 font-semibold block mt-0.5 leading-relaxed">
                  Your data is protected. Tabtaba uses bank-grade secure server databases, ensuring your personal identity and records remain 100% confidential.
                </span>
              </div>
            </div>

            {/* Save trigger button desktop row */}
            <div className="flex gap-4 border-t border-gray-100 pt-6 justify-end">
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="px-6 py-3.5 border border-gray-200 rounded-xl font-extrabold text-sm hover:bg-gray-50 transition-colors cursor-pointer bg-white text-gray-700"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="px-7 py-3.5 bg-[#0D7A39] hover:bg-[#0A602D] text-white rounded-xl font-black text-sm active:scale-95 transition-all cursor-pointer shadow-md shadow-emerald-700/10 disabled:opacity-40"
              >
                {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>

          </div>

        </div>

      </div>

      <BottomNav />
    </div>
  );
}
