'use client';

import React from 'react';
import { LayoutDashboard, Calendar, MessageSquare, Banknote, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

const THERAPIST_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard, href: '/therapist/dashboard' },
  { id: 'schedule', label: 'Schedule', Icon: Calendar, href: '/therapist/schedule' },
  { id: 'messages', label: 'Messages', Icon: MessageSquare, href: '/therapist/messages' },
  { id: 'earnings', label: 'Earnings', Icon: Banknote, href: '/therapist/earnings' },
  { id: 'profile', label: 'Profile', Icon: User, href: '/therapist/profile' },
];

export const TherapistBottomNav: React.FC = () => {
  const pathname = usePathname();

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
      `}</style>
      
      <nav className="fixed bottom-0 left-0 w-full bg-white px-4 sm:px-6 pb-8 pt-3 z-50 flex items-center justify-around shadow-[0_-15px_40px_rgba(0,0,0,0.06)] rounded-t-[32px] border-t border-gray-100 max-w-lg lg:max-w-4xl mx-auto left-1/2 -translate-x-1/2 md:hidden">
        {THERAPIST_NAV_ITEMS.map(({ id, label, Icon, href }) => {
          const isActive = pathname === href;
          
          return (
            <Link
              key={id}
              href={href}
              className="relative flex flex-col items-center justify-center focus:outline-none flex-1"
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTherapistTab"
                  className="absolute inset-x-1 inset-y-[-4px] bg-[#F0FDF4] rounded-2xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className={`p-1 rounded-xl transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                  <Icon 
                    className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-[#1DA349]' : 'text-[#A0B3C6]'}`} 
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                </div>
                <span 
                  className={`text-[10px] sm:text-[11px] transition-all duration-300 ${isActive ? 'font-black text-[#1DA349]' : 'font-medium text-[#A0B3C6]'}`}
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
