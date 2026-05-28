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
  ChevronLeft
} from "lucide-react";

export default function TherapistOnboardingPage() {
  const router = useRouter();

  return (
    <main className="min-h-[100dvh] flex flex-col items-center bg-white relative overflow-hidden font-inter py-10 px-6">
      
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute left-6 top-8 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#30C45D] hover:scale-110 transition-transform active:scale-95"
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      <div className="w-full max-w-md mx-auto flex flex-col items-center relative z-10 flex-1">
        
        {/* Welcome Text */}
        <h1 className="text-[#30C45D] font-extrabold text-[24px] md:text-[28px] tracking-[0.15em] uppercase mb-2 text-center mt-4">
          WELCOME TO
        </h1>

        {/* Hero Image */}
        <div className="relative w-full aspect-[4/3] max-w-[340px] mx-auto mb-6">
          <Image 
            src="https://i.postimg.cc/7hcRsNjK/photo-2026-05-17-17-23-13.jpg" 
            alt="Welcome to Tabtaba Therapist" 
            fill 
            className="object-contain"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-3 w-full gap-2 mb-12 px-2 lg:px-6">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-10 flex items-center justify-center">
              <CalendarDays className="w-7 h-7 text-[#4A6984]" strokeWidth={2} />
            </div>
            <span className="text-[12px] md:text-[13px] font-bold text-[#1C1C1C] leading-tight">Manage<br/>Sessions</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-10 flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-[#4A6984]" strokeWidth={2} />
            </div>
            <span className="text-[12px] md:text-[13px] font-bold text-[#1C1C1C] leading-tight">Track Patient<br/>Progress</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-10 flex items-center justify-center">
              <Lock className="w-7 h-7 text-[#4A6984]" strokeWidth={2} />
            </div>
            <span className="text-[12px] md:text-[13px] font-bold text-[#1C1C1C] leading-tight">Secure &<br/>Confidential</span>
          </div>
        </div>

        {/* Stepper Row */}
        <div className="w-full relative px-2 mb-14">
          {/* Connecting Line */}
          <div className="absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-[#E2E8F0] -z-10" />
          
          <div className="flex justify-between w-full">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-10 h-10 flex items-center justify-center bg-white">
                <Target className="w-7 h-7 text-[#73A68F]" strokeWidth={2} />
              </div>
              <div className="w-4 h-4 rounded-full border-[3px] border-[#CBD5E1] bg-white ring-[4px] ring-white" />
              <span className="text-[10px] md:text-[11px] text-[#64748B] font-bold text-center leading-tight mt-1">Click to<br/>Join</span>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-10 h-10 flex items-center justify-center bg-white">
                <FileText className="w-7 h-7 text-[#73A68F]" strokeWidth={2} />
              </div>
              <div className="w-4 h-4 rounded-full border-[3px] border-[#CBD5E1] bg-white ring-[4px] ring-white" />
              <span className="text-[10px] md:text-[11px] text-[#64748B] font-bold text-center leading-tight mt-1">Upload<br/>CV</span>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-10 h-10 flex items-center justify-center bg-white">
                <User className="w-7 h-7 text-[#73A68F]" strokeWidth={2} />
              </div>
              <div className="w-4 h-4 rounded-full border-[3px] border-[#CBD5E1] bg-white ring-[4px] ring-white" />
              <span className="text-[10px] md:text-[11px] text-[#64748B] font-bold text-center leading-tight mt-1">Complete<br/>Profile</span>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-10 h-10 flex items-center justify-center bg-white">
                <CalendarPlus className="w-7 h-7 text-[#73A68F]" strokeWidth={2} />
              </div>
              <div className="w-4 h-4 rounded-full border-[3px] border-[#CBD5E1] bg-white ring-[4px] ring-white" />
              <span className="text-[10px] md:text-[11px] text-[#64748B] font-bold text-center leading-tight mt-1">Add<br/>Availability</span>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <Link 
          href="/therapist/criteria" 
          className="w-[85%] max-w-[320px] bg-[#36B66B] hover:bg-[#2CA05A] text-white rounded-full py-4.5 text-center font-bold text-[18px] transition-transform active:scale-[0.98] shadow-lg shadow-[#36B66B]/25 mb-6"
        >
          Join Us Now
        </Link>

        {/* Login Link */}
        <div className="flex flex-col items-center gap-6 mb-4">
          <p className="text-[#8997A5] font-medium text-[17px]">
            Already have an account? <Link href="/login" className="text-[#006D32] font-black hover:underline decoration-2 underline-offset-4">Log in</Link>
          </p>
          <button className="text-[#36B66B] font-black text-[18px] hover:scale-105 transition-transform">
            Continue as Guest
          </button>
        </div>
        
      </div>
    </main>
  );
}
