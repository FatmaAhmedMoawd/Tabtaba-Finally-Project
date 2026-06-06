'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { 
  CalendarDays, 
  BarChart3, 
  Lock, 
  Target, 
  FileText, 
  User, 
  CalendarPlus,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  Star,
  CheckCircle2
} from "lucide-react";

export default function TherapistOnboardingPage() {
  const router = useRouter();

  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-[#F4FAF6] via-white to-[#F9F6F0] font-inter relative overflow-hidden flex flex-col justify-between py-8 px-6 md:px-12 lg:px-16">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-[#36B66B]/5 blur-[80px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-[#1A448E]/5 blur-[80px] -z-10" />

      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute left-6 top-8 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#36B66B] hover:scale-110 transition-transform active:scale-95 cursor-pointer"
        aria-label="Go Back"
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      {/* Header Logo */}
      <div className="w-full max-w-6xl mx-auto flex justify-end md:justify-start items-center mb-6 md:mb-12">
        <div className="relative w-28 h-12 md:w-36 md:h-16">
          <Image
            src="https://i.postimg.cc/XvC9dkkh/photo-2026-05-14-14-47-12.jpg"
            alt="Tabtaba Logo"
            fill
            className="object-contain mix-blend-multiply"
            priority
          />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Welcome & Info */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[#36B66B] text-[13px] md:text-[14px] font-extrabold uppercase tracking-[0.2em] font-sans">
                Welcome to Tabtaba
              </span>
              <h1 className="text-[34px] md:text-[46px] lg:text-[52px] font-black text-gray-900 leading-[1.1] tracking-tight">
                Empower your practice as a <span className="text-[#36B66B]">Therapist</span>
              </h1>
            </div>

            <p className="text-[#4A5568] text-[16px] md:text-[18px] font-medium leading-relaxed max-w-lg">
              Join Tabtaba's professional network. Connect with individuals seeking support, manage your sessions, and track patient progress in a secure environment.
            </p>

            {/* Features Row */}
            <div className="grid grid-cols-3 w-full gap-4 mt-2 max-w-md md:max-w-xl">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 bg-white/60 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#EAF6ED] flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-[#36B66B]" strokeWidth={2} />
                </div>
                <span className="text-[12px] md:text-[14px] font-bold text-gray-800 leading-tight">Manage<br/>Sessions</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 bg-white/60 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#E8F0F8] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#1A448E]" strokeWidth={2} />
                </div>
                <span className="text-[12px] md:text-[14px] font-bold text-gray-800 leading-tight">Track Patient<br/>Progress</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 bg-white/60 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-gray-600" strokeWidth={2} />
                </div>
                <span className="text-[12px] md:text-[14px] font-bold text-gray-800 leading-tight">Secure &<br/>Confidential</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full mt-4 max-w-md lg:max-w-none justify-center lg:justify-start">
              <Link 
                href="/therapist/criteria" 
                className="w-full sm:w-auto bg-[#36B66B] hover:bg-[#2CA05A] text-white px-8 py-4 rounded-full font-bold text-[16px] md:text-[17px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#36B66B]/20 flex items-center justify-center gap-2"
              >
                <span>Join Us Now</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>

              <Link 
                href="/login" 
                className="w-full sm:w-auto border border-gray-200 bg-white/80 hover:bg-white hover:border-[#36B66B]/40 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-full font-bold text-[16px] md:text-[17px] transition-all hover:scale-[1.02] active:scale-[0.98] text-center shadow-sm"
              >
                Log In
              </Link>
            </div>
            
            <button className="text-[#36B66B] hover:text-[#2CA05A] font-bold text-[15px] hover:underline decoration-2 underline-offset-4 mt-2 transition-all">
              Continue as Guest
            </button>
          </div>

          {/* Right Column: Dashboard Mockup illustration */}
          <div className="lg:col-span-6 hidden lg:flex flex-col relative items-center justify-center pl-6">
            <div className="relative w-full max-w-[500px] aspect-[4/3] bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-5 overflow-hidden">
              
              {/* Top Banner inside mockup */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 relative overflow-hidden">
                    <Image 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Dr. Yasser" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-extrabold text-gray-900">Dr. Yasser Abd El-Aziz</span>
                    <span className="text-[11px] font-bold text-[#36B66B]">Consultant Psychiatrist</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#EAF6ED] flex items-center justify-center">
                  <span className="text-[10px] text-[#36B66B] font-extrabold">●</span>
                </div>
              </div>

              {/* Internal Grid mockups */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-2xl p-4 flex flex-col justify-between h-28">
                  <span className="text-[11px] font-bold text-gray-400">TODAY'S SESSIONS</span>
                  <span className="text-[26px] font-black text-gray-800">4 remaining</span>
                  <div className="w-fit bg-[#EAF6ED] text-[#36B66B] font-bold text-[10px] px-2 py-0.5 rounded-full">Active</div>
                </div>

                <div className="bg-[#FAFDFE] border border-[#EBF2F9] rounded-2xl p-4 flex flex-col justify-between h-28">
                  <span className="text-[11px] font-bold text-gray-400">TOTAL RATING</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[26px] font-black text-gray-800">4.9</span>
                    <Star size={16} className="text-[#F1C40F] fill-[#F1C40F] mt-1" />
                  </div>
                  <span className="text-[11.5px] font-bold text-[#1A448E]">Top 5% Therapist</span>
                </div>
              </div>

              {/* Progress bar inside mockup */}
              <div className="bg-[#FAF4EC] border border-[#FDF0E0] rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#B57C2F]">Monthly Target Progress</span>
                  <span className="text-[12px] font-black text-[#B57C2F]">80%</span>
                </div>
                <div className="w-full bg-white/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#36B66B] h-full w-[80%] rounded-full" />
                </div>
              </div>

              {/* Success Badge decoration */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#36B66B]/10 rounded-full flex items-center justify-center rotate-12">
                <CheckCircle2 size={40} className="text-[#36B66B] mr-4 mb-4" strokeWidth={2.5} />
              </div>
            </div>

            {/* Stepper overview banner */}
            <div className="absolute bottom-[-24px] left-[-20px] bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-md flex items-center gap-3.5 max-w-[280px]">
              <div className="w-8 h-8 rounded-full bg-[#EAF6ED] flex items-center justify-center text-[#36B66B] shrink-0 font-black text-sm">
                5
              </div>
              <p className="text-[11.5px] font-bold text-gray-600 leading-tight">
                Simple onboarding steps to complete your practice setup.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Stepper Row (Bottom Indicator) */}
      <div className="w-full max-w-4xl mx-auto mt-12 mb-4 bg-white/40 border border-gray-100/50 rounded-2xl p-4 backdrop-blur-xs">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-[#E2E8F0] -z-10" />
          
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-9 h-9 rounded-full bg-[#EAF6ED] text-[#36B66B] border border-[#36B66B]/20 flex items-center justify-center shadow-xs">
              <Target size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] text-gray-800 font-bold text-center leading-tight">Join Network</span>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-9 h-9 rounded-full bg-white text-gray-400 border border-gray-100 flex items-center justify-center">
              <FileText size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] text-gray-400 font-bold text-center leading-tight">Credentials</span>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-9 h-9 rounded-full bg-white text-gray-400 border border-gray-100 flex items-center justify-center">
              <User size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] text-gray-400 font-bold text-center leading-tight">Profile Details</span>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-9 h-9 rounded-full bg-white text-gray-400 border border-gray-100 flex items-center justify-center">
              <CalendarPlus size={16} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] text-gray-400 font-bold text-center leading-tight">Availability</span>
          </div>
        </div>
      </div>
      
    </main>
  );
}

