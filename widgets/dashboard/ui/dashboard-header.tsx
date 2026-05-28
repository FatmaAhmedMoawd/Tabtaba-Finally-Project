'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, User } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  const router = useRouter();
  const [profileAvatar, setProfileAvatar] = useState('');
  const [hasCustomAvatar, setHasCustomAvatar] = useState(false);

  useEffect(() => {
    const checkAvatar = () => {
      if (typeof window !== 'undefined') {
        const savedAvatar = localStorage.getItem('profile_avatar');
        if (savedAvatar) {
          setProfileAvatar(savedAvatar);
          setHasCustomAvatar(true);
        } else {
          setProfileAvatar('');
          setHasCustomAvatar(false);
        }
      }
    };
    checkAvatar();
    
    // Listen for storage events (e.g. from profile updates) to keep sync
    window.addEventListener('storage', checkAvatar);
    return () => window.removeEventListener('storage', checkAvatar);
  }, []);

  return (
    <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-4 px-6 md:px-8 bg-transparent">
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
  );
};
