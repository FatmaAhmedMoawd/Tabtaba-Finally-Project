'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Settings, 
  User, 
  Heart, 
  CreditCard, 
  Lock, 
  HelpCircle, 
  LogOut,
  Camera,
  ChevronRight
} from 'lucide-react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

export default function ProfilePage() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [subActive, setSubActive] = useState(false);
  const [fullName, setFullName] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const active = localStorage.getItem('isSubscribed') === 'true';
      const savedEmail = localStorage.getItem('profile_email');
      const emailPrefix = savedEmail ? savedEmail.split('@')[0] : '';
      const emailName = emailPrefix ? emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1) : '';
      const savedName = localStorage.getItem('profile_fullName') || emailName;
      const savedAvatar = localStorage.getItem('profile_avatar');
      
      setTimeout(() => {
        setSubActive(active);
        setIsLoggedIn(!!savedEmail);
        setFullName(savedEmail ? (savedName || 'User') : '');
        if (savedAvatar) {
          setProfileAvatar(savedAvatar);
        } else {
          setProfileAvatar('');
        }
      }, 0);
    }
  }, []);

  const menuItems = [
    { icon: User, label: 'Profile' },
    { icon: Heart, label: 'Favorite' },
    { icon: CreditCard, label: 'Payment Method' },
    { icon: Lock, label: 'Privacy Policy' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
    { icon: LogOut, label: 'Logout' },
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter pb-32 relative overflow-x-hidden">
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleInBounce {
          0% { opacity: 0; transform: scale(0.8); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-slide-up {
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scaleInBounce 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-pulse-soft {
          animation: pulseSoft 2s infinite ease-in-out;
        }
      `}</style>

      {/* Header */}
      <div className="pt-12 px-6 flex justify-between items-center relative z-10">
        <button 
          onClick={() => router.back()}
          className="text-[#22C55E] hover:scale-110 transition-transform p-1 -ml-1"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>
        <span className="text-[22px] font-[900] text-[#22C55E] absolute left-1/2 -translate-x-1/2 select-none">
          My Profile
        </span>
        <button 
          onClick={() => router.push('/settings')}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#22C55E] border border-green-50 hover:scale-110 transition-transform"
        >
          <Settings size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Profile Picture */}
      <div className="mt-8 flex flex-col items-center justify-center relative z-10 w-full">
        <div className="relative animate-scale-in">
          {/* Glowing background effect for Wow Factor */}
          <div className="absolute inset-0 bg-[#22C55E] rounded-full blur-xl opacity-20 animate-pulse-soft"></div>
          
          <button 
            onClick={() => {
              if (isLoggedIn) {
                router.push('/profile/edit');
              } else {
                router.push('/register');
              }
            }}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 bg-[#F3F4F6] flex items-center justify-center block outline-none cursor-pointer hover:opacity-95 transition-all"
          >
            {profileAvatar ? (
              <Image
                src={profileAvatar}
                alt="Profile Picture"
                fill
                className="object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <User className="w-14 h-14 text-gray-400" strokeWidth={1.5} />
            )}
          </button>
          
          {/* Camera Icon */}
          <button 
            onClick={() => {
              if (isLoggedIn) {
                router.push('/profile/edit');
              } else {
                router.push('/register');
              }
            }}
            className="absolute bottom-0 right-0 w-10 h-10 bg-[#7B8BB4] rounded-full border-4 border-white flex items-center justify-center text-white shadow-md z-20 hover:scale-110 transition-transform animate-pulse-soft cursor-pointer"
          >
            <Camera size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Dynamic Name and Membership Level or Alert Prompt */}
        {!isLoggedIn ? (
          <div className="mt-6 mx-6 p-5 rounded-[28px] bg-amber-50/90 border border-amber-200/60 shadow-lg shadow-amber-500/5 text-amber-900 max-w-[340px] sm:max-w-[380px] text-center flex flex-col items-center gap-2 animate-section">
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-lg">
              ⚠️
            </div>
            <p className="text-[14px] font-black leading-relaxed text-amber-950">
              تنبيه: لازم تروح تكريت اكونت الاول او تسجل دخول علشان خاطر تقدر ان انت تشترك او تدفع او انك تقدر تعمل جلسات 💚
            </p>
            <div className="flex gap-2 w-full mt-3">
              <button 
                onClick={() => router.push('/register')} 
                className="flex-1 py-3.5 rounded-2xl bg-[#30BE4F] hover:bg-[#28A745] text-white font-extrabold text-[13px] hover:scale-[1.01] active:scale-[0.98] transition-all shadow-md shadow-green-500/10 cursor-pointer"
              >
                إنشاء حساب
              </button>
              <button 
                onClick={() => router.push('/login')} 
                className="flex-1 py-3.5 rounded-2xl bg-white border border-gray-300 hover:bg-slate-50 text-gray-700 font-extrabold text-[13px] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
              >
                تسجيل دخول
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-[22px] font-black text-[#1C1C1C] mt-4 leading-none">{fullName}</h2>
            <p className="text-[13px] font-[600] text-gray-400 mt-1.5 uppercase tracking-wide">
              {subActive ? 'TBTABA Care Premium' : 'Free Standard Companion'}
            </p>
          </div>
        )}
      </div>

      {/* Menu List */}
      <div className="mt-10 px-6 max-w-lg mx-auto flex flex-col gap-2 relative z-10">
        {menuItems.map((item, index) => {
          const isLogout = item.label === 'Logout';
          return (
            <button
              key={index}
              onClick={() => {
                if (item.label === 'Profile') {
                  router.push('/profile/edit');
                } else if (item.label === 'Favorite') {
                  router.push('/profile/favorites');
                } else if (item.label === 'Settings') {
                  router.push('/settings');
                } else if (item.label === 'Help') {
                  router.push('/help');
                } else if (item.label === 'Payment Method') {
                  router.push('/profile/payments');
                } else if (item.label === 'Logout') {
                  setIsLogoutModalOpen(true);
                }
              }}
              className={`w-full flex items-center justify-between p-3 rounded-[20px] transition-all duration-300 hover:bg-white hover:shadow-sm active:scale-[0.98] animate-slide-up group`}
              style={{ animationDelay: `${0.1 + index * 0.08}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E5EDFF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#D1E0FF]">
                  <item.icon className="text-[#22C55E]" size={24} strokeWidth={2} />
                </div>
                <span className="text-[17px] font-semibold text-[#1C1C1C]">
                  {item.label}
                </span>
              </div>
              <ChevronRight 
                className="text-[#93C5FD] group-hover:translate-x-1 transition-transform duration-300" 
                size={24} 
              />
            </button>
          );
        })}

        {/* Testing / Active Subscription Indicator */}
        <div className="mt-6 bg-white/75 backdrop-blur-md rounded-[28px] p-5 border border-gray-100/80 shadow-sm flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-[#22C55E]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-400 leading-none mb-1 uppercase tracking-wider">MEMBERSHIP</p>
              <h3 className="text-[15px] font-[900] text-[#1D1C1C]">
                {subActive ? 'TBTABA Care Premium' : 'Free Standard Companion'}
              </h3>
            </div>
          </div>
          
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                const toggled = !subActive;
                localStorage.setItem('isSubscribed', toggled ? 'true' : 'false');
                window.dispatchEvent(new Event('storage'));
                setSubActive(toggled);
              }
            }}
            className={`px-4 py-2 rounded-full text-[12px] font-black tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              subActive 
                ? 'bg-[#EAFDF5] text-[#0D7A39] hover:bg-red-50 hover:text-red-500'
                : 'bg-[#EBF5FB] text-[#0056D2] hover:bg-emerald-50 hover:text-[#0D7A39]'
            }`}
          >
            {subActive ? 'Active' : 'Upgrade'}
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsLogoutModalOpen(false)}
          />
          <div className="bg-white rounded-[16px] w-[300px] p-6 relative z-10 shadow-2xl animate-scale-in">
            <h2 className="text-[20px] font-bold text-black mb-2">Log Out</h2>
            <p className="text-[15px] text-[#6B7280] mb-8">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-6 font-bold text-[15px]">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="text-[#22C55E] hover:opacity-80 transition-opacity cursor-pointer"
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
                    // Dispatch a storage event so other listening/rendered components update
                    window.dispatchEvent(new Event('storage'));
                  }
                  setIsLogoutModalOpen(false);
                  router.replace('/login');
                }}
                className="text-[#22C55E] hover:opacity-80 transition-opacity cursor-pointer"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
