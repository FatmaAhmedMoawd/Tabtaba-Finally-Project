'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

// Custom icons matching the user's design EXACTLY
const HomeIcon = ({ isActive, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    fill={isActive ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" fill={isActive ? 'white' : 'none'} />
  </svg>
);

const CalendarIcon = ({ isActive, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

const SessionsIcon = ({ isActive, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <line x1="8" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="13" y2="18" />
  </svg>
);

const RelaxIcon = ({ isActive, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <circle cx="12" cy="6" r="2" />
    <path d="M12 8v6" />
    <path d="M6 12c1.5-1.5 3-2 6-2s4.5.5 6 2" />
    <path d="M3 18c2-2 4.5-2.5 9-2.5s7 1 9 2.5" />
    <path d="M6 20h12" />
  </svg>
);

const StatsIcon = ({ isActive, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="12" y1="20" x2="12" y2="6" />
    <line x1="18" y1="20" x2="18" y2="11" />
  </svg>
);

const ProfileIcon = ({ isActive, ...props }: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: HomeIcon, href: '/dashboard' },
  { id: 'calendar', label: 'Calendar', Icon: CalendarIcon, href: '/calendar' },
  { id: 'sessions', label: 'Sessions', Icon: SessionsIcon, href: '/sessions' },
  { id: 'relax', label: 'Relax', Icon: RelaxIcon, href: '/relax' },
  { id: 'stats', label: 'Stats', Icon: StatsIcon, href: '/stats' },
  { id: 'profile', label: 'Profile', Icon: ProfileIcon, href: '/profile' },
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
                    isActive={isActive}
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
