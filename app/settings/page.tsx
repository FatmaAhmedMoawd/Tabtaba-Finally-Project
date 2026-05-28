'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Settings as SettingsIcon,
  Bell,
  Palette,
  ShieldCheck,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [email, setEmail] = React.useState('');
  const [initials, setInitials] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('profile_email') || '';
      const savedName = localStorage.getItem('profile_fullName') || '';
      
      setTimeout(() => {
        setEmail(savedEmail);
        
        if (savedName) {
          const parts = savedName.trim().split(/\s+/);
          const init = parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
          setInitials(init || 'U');
        } else if (savedEmail) {
          setInitials(savedEmail.charAt(0).toUpperCase());
        } else {
          setInitials('U');
        }
      }, 0);
    }
  }, []);

  const settingsItems = [
    {
      icon: Bell,
      title: 'Notification',
      subtitle: 'Stay in the loop with the latest updates.'
    },
    {
      icon: Palette,
      title: 'Appearance',
      subtitle: 'Personalize your experience.'
    },
    {
      icon: ShieldCheck,
      title: 'Privacy & Security',
      subtitle: 'Keep your account safe.'
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: "Need help or feedback? We've got you."
    }
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter relative overflow-hidden flex flex-col">
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes radarPing {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-slide-in {
          animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-radar {
          animation: radarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Header */}
      <div className="pt-12 px-6 flex items-center gap-3 relative z-10 animate-slide-in" style={{ animationDelay: '0.1s' }}>
        <button 
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-900 transition-colors p-1 -ml-1 hover:-translate-x-1 duration-300"
        >
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>
        <h1 className="text-[28px] font-bold text-gray-600 flex items-center gap-3">
          Settings
          <SettingsIcon size={24} className="text-gray-500" strokeWidth={2.5} />
        </h1>
      </div>

      {/* Profile Overview */}
      {email && (
        <div className="px-6 mt-8 relative z-10 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative inline-block group cursor-pointer">
            <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-tr from-[#16A34A] to-[#4ADE80] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="text-[28px] font-bold text-[#064E3B]">{initials}</span>
            </div>
            
            {/* Online Dot with Radar wow factor */}
            <div className="absolute bottom-1 right-1 w-[22px] h-[22px] bg-[#4ADE80] border-4 border-[#F6FAFE] rounded-full z-20" />
            <div className="absolute bottom-1 right-1 w-[22px] h-[22px] bg-[#4ADE80] rounded-full z-10 animate-radar" />
          </div>
          
          <div className="mt-4 inline-block bg-[#F4F6F8] px-4 py-2 rounded-[12px] shadow-sm">
            <span className="text-[15px] font-medium text-gray-600">{email}</span>
          </div>
        </div>
      )}

      {/* Settings List */}
      <div className="mt-10 px-6 flex flex-col gap-6 relative z-10">
        {settingsItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (item.title === 'Notification') {
                router.push('/notifications');
              } else if (item.title === 'Appearance') {
                router.push('/appearance');
              } else if (item.title === 'Privacy & Security') {
                router.push('/privacy');
              } else if (item.title === 'Help & Support') {
                router.push('/help');
              }
            }}
            className="flex items-center justify-between group animate-slide-in"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-transparent group-hover:bg-[#E5F3EC] transition-colors duration-300">
                <item.icon className="text-[#065F46]" size={24} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-[#065F46] group-hover:translate-x-1 transition-transform duration-300">
                  {item.title}
                </span>
                <span className="text-[13px] text-gray-400 mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>
            <ChevronRight 
              className="text-[#065F46] group-hover:translate-x-1 transition-transform duration-300" 
              size={20} 
            />
          </button>
        ))}
      </div>

      {/* Spacer to push logout to bottom */}
      <div className="flex-1 min-h-[40px]"></div>

      {/* Logout Button */}
      <div className="px-6 pb-12 relative z-10 animate-slide-in" style={{ animationDelay: '0.8s' }}>
        <button 
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full bg-[#22C55E] text-white p-4 px-6 rounded-full flex items-center justify-between shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group overflow-hidden relative"
        >
          
          {/* Shimmer effect wow factor */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          
          <div className="flex items-center gap-3 relative z-10">
            <LogOut size={22} strokeWidth={2} />
            <span className="text-[16px] font-bold">Logout</span>
          </div>
          <ChevronRight size={22} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          
        </button>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsLogoutModalOpen(false)}
          />
          <div className="bg-white rounded-[16px] w-full max-w-[340px] p-6 relative z-10 shadow-2xl">
            <h2 className="text-[20px] font-bold text-black mb-2">Confirm Logout</h2>
            <p className="text-[15px] text-[#6B7280] mb-8">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4 font-bold text-[15px]">
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
                    window.dispatchEvent(new Event('storage'));
                  }
                  setIsLogoutModalOpen(false);
                  router.replace('/login');
                }}
                className="text-[#22C55E] hover:opacity-80 transition-opacity cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
