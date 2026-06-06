'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, User, Search } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const [profileAvatar, setProfileAvatar] = useState('');
  const [hasCustomAvatar, setHasCustomAvatar] = useState(false);
  const [fullName, setFullName] = useState('Toka');

  useEffect(() => {
    const checkProfileData = () => {
      if (typeof window !== 'undefined') {
        const savedAvatar = localStorage.getItem('profile_avatar');
        if (savedAvatar) {
          setProfileAvatar(savedAvatar);
          setHasCustomAvatar(true);
        } else {
          setProfileAvatar('');
          setHasCustomAvatar(false);
        }
        
        const savedName = localStorage.getItem('profile_fullName');
        if (savedName) {
          setFullName(savedName);
        } else {
          setFullName('Toka');
        }
      }
    };
    checkProfileData();
    
    // Listen for storage events (e.g. from profile updates) to keep sync
    window.addEventListener('storage', checkProfileData);
    return () => window.removeEventListener('storage', checkProfileData);
  }, []);

  return (
    <>
      {/* Mobile Header (md:hidden) */}
      <header className="w-full flex md:hidden items-center justify-between py-4 px-6 bg-transparent">
        {/* Avatar */}
        <button 
          onClick={() => router.push('/profile')}
          className="relative w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-full flex items-center justify-center bg-[#F3F4F6] border-2 border-white shadow-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#30BE4F] cursor-pointer"
        >
          {hasCustomAvatar && profileAvatar ? (
            <Image 
              src={profileAvatar} 
              alt="User Profile" 
              fill
              className="object-cover rounded-full"
              sizes="48px"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center bg-[#F3F4F6] text-gray-400">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          )}
        </button>

        {/* Logo */}
        <div 
          onClick={() => router.push('/dashboard')}
          className="relative w-[180px] h-[130px] sm:w-[200px] sm:h-[150px] flex items-center justify-center -mt-2 lg:-mt-4 cursor-pointer"
        >
          <Image 
            src="https://i.postimg.cc/SKKMvjL9/photo-2026-05-14-14-47-12.jpg" 
            alt="Tabtaba Logo" 
            fill
            priority
            className="object-contain mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Notification */}
        <button 
          onClick={() => router.push('/notifications')}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#30BE4F] cursor-pointer"
        >
          <Bell className="w-6 h-6 text-gray-700" strokeWidth={2} />
        </button>
      </header>

      {/* Desktop Header (hidden md:flex) */}
      <header className="hidden md:flex items-center justify-between w-full py-5 px-0 bg-transparent mb-2">
        {/* Search bar on the left */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for sessions, articles, tests..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-100/80 border border-transparent focus:border-[#30BE4F]/50 focus:bg-white rounded-2xl text-[14px] text-gray-700 placeholder-gray-400 outline-none transition-all duration-200"
          />
        </div>

        {/* User profile preview & notifications on the right */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.push('/notifications')}
            className="relative w-11 h-11 flex items-center justify-center hover:bg-gray-100 rounded-2xl border border-gray-200/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#30BE4F] cursor-pointer"
          >
            <Bell className="w-5 h-5 text-gray-600" strokeWidth={2} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div 
            onClick={() => router.push('/profile')}
            className="flex items-center gap-3 p-1.5 pr-4 bg-gray-100/50 hover:bg-gray-100/80 border border-gray-200/30 rounded-2xl transition-all cursor-pointer select-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gray-200 border border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
              {hasCustomAvatar && profileAvatar ? (
                <Image 
                  src={profileAvatar} 
                  alt="User Profile" 
                  fill
                  className="object-cover"
                  sizes="40px"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-bold text-gray-800 leading-tight">{fullName}</span>
              <span className="text-[10px] text-gray-400 font-semibold">Client Account</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

