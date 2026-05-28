'use client';

import React, { useState, useEffect } from 'react';
import { Home, Calendar, History, Sparkles, BarChart3, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: Home, href: '/dashboard' },
  { id: 'calendar', label: 'Calendar', Icon: Calendar, href: '/calendar' },
  { id: 'sessions', label: 'Sessions', Icon: History, href: '/sessions' },
  { id: 'relax', label: 'Relax', Icon: Sparkles, href: '/relax' },
  { id: 'stats', label: 'Stats', Icon: BarChart3, href: '/stats' },
  { id: 'profile', label: 'Profile', Icon: User, href: '/profile' },
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Reset subscription when the site is opened for the first time in a new browser window/session
    if (typeof window !== 'undefined') {
      const sessionActive = sessionStorage.getItem('appActiveSession');
      if (!sessionActive) {
        sessionStorage.setItem('appActiveSession', 'true');
        localStorage.setItem('isSubscribed', 'false');
        window.dispatchEvent(new Event('storage'));
      }
    }

    const checkSub = () => {
      if (typeof window !== 'undefined') {
        const sub = localStorage.getItem('isSubscribed') === 'true';
        setIsSubscribed(sub);
      }
    };
    checkSub();
    const interval = setInterval(checkSub, 1000);
    window.addEventListener('storage', checkSub);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkSub);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes navPop {
          0% { transform: scale(0.8) translateY(4px); opacity: 0.5; }
          60% { transform: scale(1.1) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .active-nav-icon {
          animation: navPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 45, 85, 0.6), 0 0 0 0 rgba(255, 149, 0, 0.4); }
          75% { box-shadow: 0 0 0 10px rgba(255, 45, 85, 0), 0 0 0 18px rgba(255, 149, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 45, 85, 0), 0 0 0 0 rgba(255, 149, 0, 0); }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(255, 255, 255, 0.7); }
          50% { border-color: rgba(255, 255, 255, 1); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .live-glowing-badge {
          background-size: 200% 200%;
          animation: 
            livePulse 2.5s cubic-bezier(0.25, 0, 0, 1) infinite, 
            borderPulse 1.5s ease-in-out infinite, 
            gradientShift 4s ease infinite,
            badgeFloat 3s ease-in-out infinite;
        }
      `}</style>
      
      <nav className="fixed bottom-0 left-0 w-full bg-white px-4 sm:px-6 pb-8 pt-3 z-50 flex items-center justify-around shadow-[0_-15px_40px_rgba(0,0,0,0.06)] rounded-t-[32px] border-t border-gray-100">
        {NAV_ITEMS.map(({ id, label, Icon, href }) => {
          const isActive = pathname === href || (id === 'home' && pathname === '/');
          
          return (
            <Link
              key={id}
              href={href}
              className="relative flex flex-col items-center justify-center focus:outline-none flex-1"
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-x-1 inset-y-[-4px] bg-[#F0FDF4] rounded-2xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className={`p-1 rounded-xl transition-all duration-300 relative ${isActive ? 'scale-110' : ''}`}>
                  <Icon 
                    className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-[#30BE4F]' : 'text-[#A0B3C6]'}`} 
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                  {id === 'sessions' && isSubscribed && (
                    <span className="absolute -top-4.5 -right-12.5 bg-gradient-to-r from-[#FF2D55] via-[#FF3B30] to-[#FF9500] text-white text-[8.5px] font-[900] px-2.5 py-1 rounded-full uppercase tracking-[0.06em] whitespace-nowrap border-2 border-white/95 z-40 flex items-center gap-1.5 shadow-[0_6px_22px_rgba(255,45,85,0.45)] live-glowing-badge select-none">
                      {/* Heartbeat pulsing signal dot */}
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                      </span>
                      <span>JOIN LIVE</span>
                    </span>
                  )}
                </div>
                <span 
                  className={`text-[10px] sm:text-[11px] transition-all duration-300 ${isActive ? 'font-black text-[#30BE4F]' : 'font-medium text-[#A0B3C6]'}`}
                >
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
