'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Banknote, 
  User, 
  Flame, 
  BarChart, 
  LogOut, 
  Activity,
  Home,
  Settings,
  Search,
  Stethoscope
} from 'lucide-react';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const router = useRouter();

  const [fullName, setFullName] = React.useState('Toka');

  React.useEffect(() => {
    const checkName = () => {
      if (typeof window !== 'undefined') {
        const name = localStorage.getItem('profile_fullName');
        if (name) {
          setFullName(name);
        } else {
          setFullName('Toka');
        }
      }
    };
    checkName();
    window.addEventListener('storage', checkName);
    return () => window.removeEventListener('storage', checkName);
  }, []);

  // Determine dashboard layout context (client vs therapist)
  const isClientDashboard = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/calendar') || 
    pathname.startsWith('/sessions') || 
    pathname.startsWith('/relax') || 
    pathname.startsWith('/stats') || 
    pathname.startsWith('/profile') || 
    pathname.startsWith('/library') ||
    pathname.startsWith('/notifications') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/help') ||
    pathname.startsWith('/chat') ||
    pathname.startsWith('/appearance') ||
    pathname.startsWith('/privacy');

  const isTherapistDashboard = pathname.startsWith('/therapist');

  // Exclude auth/onboarding/special pages from the sidebar structure
  const isAuthOrOnboarding = 
    pathname === '/' || 
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') || 
    pathname.startsWith('/signup') || 
    pathname.startsWith('/onboarding') || 
    pathname.startsWith('/forgot-password') || 
    pathname.startsWith('/support') || 
    pathname === '/therapist' || 
    pathname.startsWith('/therapist/register') || 
    pathname.startsWith('/therapist/criteria');

  if (isAuthOrOnboarding) {
    return <>{children}</>;
  }

  // Client Navigation items matching mockup
  const CLIENT_NAV_ITEMS = [
    { label: 'Home', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Calendar', icon: Calendar, href: '/calendar' },
    { label: 'Find Doctors', icon: Stethoscope, href: '/sessions' },
    { label: 'Messages', icon: MessageSquare, href: '/chat' },
    { label: 'Relax', icon: Flame, href: '/relax' },
    { label: 'Stats', icon: BarChart, href: '/stats' },
    { label: 'Profile', icon: User, href: '/profile' },
  ];

  // Therapist Navigation items
  const THERAPIST_NAV_ITEMS = [
    { label: 'Home', icon: Home, href: '/therapist/dashboard' },
    { label: 'Schedule', icon: Calendar, href: '/therapist/schedule' },
    { label: 'Messages', icon: MessageSquare, href: '/therapist/messages' },
    { label: 'Earnings', icon: Banknote, href: '/therapist/earnings' },
    { label: 'Profile', icon: User, href: '/therapist/profile' },
  ];

  const activeNavItems = isTherapistDashboard ? THERAPIST_NAV_ITEMS : CLIENT_NAV_ITEMS;

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('profile_email');
      localStorage.removeItem('profile_fullName');
      localStorage.removeItem('profile_avatar');
      localStorage.removeItem('isSubscribed');
      localStorage.removeItem('forgot_password_email');
      sessionStorage.removeItem('appActiveSession');
      window.dispatchEvent(new Event('storage'));
    }
    router.replace(isTherapistDashboard ? '/login' : '/');
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F6]">
      {/* Sleek Fixed Left Sidebar for Desktop */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex-col z-50 p-6 justify-between shadow-[2px_0_20px_rgba(0,0,0,0.015)] font-inter">
        <div className="flex flex-col gap-6 w-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="relative w-8 h-8 shrink-0">
              <Image 
                src="https://i.postimg.cc/43GH2tHQ/photo-2026-05-14-14-47-12-removebg-preview.png" 
                alt="Tabtaba Logo" 
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#0D7A39] font-black text-[18px] tracking-tight leading-none">Tabtaba</span>
              <span className="text-[8px] text-[#0D7A39]/70 font-black tracking-widest uppercase mt-0.5">Mental Wellness</span>
            </div>
          </div>

          {/* Green Welcome Card */}
          {!isTherapistDashboard && (
            <div className="relative overflow-hidden bg-[#22C55E] rounded-[24px] p-5 text-white shadow-lg flex flex-col gap-2 mb-2 select-none">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 -translate-y-8 blur-lg pointer-events-none" />
              <span className="bg-white/20 text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded w-fit uppercase">Today</span>
              <h4 className="text-[14px] font-black leading-tight mt-1">Welcome back, {fullName.split(' ')[0]}. Keep your routine steady.</h4>
              <p className="text-[11px] text-white/80 leading-relaxed font-medium">Keep your routine steady and explore more mental support step with clarity.</p>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 w-full">
            {activeNavItems.map((item) => {
              // Exact match or sub-route match
              const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 group text-[14px] font-bold ${
                    isActive 
                      ? 'bg-[#0D7A39] text-white shadow-[0_4px_12px_rgba(13,122,57,0.15)]' 
                      : 'text-gray-550 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-705'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile preview / Logout at bottom */}
        <div className="flex flex-col gap-2 pt-4">
          <button 
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 px-4 py-3 w-full rounded-2xl bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white font-bold text-[14px] transition-colors cursor-pointer focus:outline-none"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col w-full min-h-screen bg-[#FCFAF6] ${isClientDashboard || isTherapistDashboard ? 'md:pl-64' : ''}`}>
        {/* Top Header Bar */}
        {(isClientDashboard || isTherapistDashboard) && (
          <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#FCFAF6] z-40">
            {/* Search Input Box */}
            <div className="flex-1 max-w-xl">
              <div className="relative flex items-center bg-white rounded-full px-5 py-2.5 border border-gray-150/70 shadow-sm focus-within:shadow-md transition-shadow">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search sessions, doctors, exercises, articles..." 
                  className="bg-transparent border-none outline-none text-sm text-gray-850 placeholder:text-gray-400 w-full"
                />
              </div>
            </div>

            {/* Right-side elements */}
            <div className="flex items-center gap-6">
              {/* Settings Gear Icon */}
              <button className="text-gray-400 hover:text-gray-650 transition-colors cursor-pointer">
                <Settings className="w-5 h-5" />
              </button>

              {/* User Account Info */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-gray-850">{fullName}</div>
                  <div className="text-xs text-gray-455">Personal account</div>
                </div>
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0">
                  <Image 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="User Profile Photo" 
                    fill
                    className="object-cover" 
                  />
                </div>
              </div>
            </div>
          </header>
        )}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
