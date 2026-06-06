"use client";

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, Check, RefreshCw, Smartphone, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function PasswordSuccessPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <main className="min-h-[100dvh] bg-white flex flex-col md:flex-row items-stretch font-inter relative overflow-hidden">
      
      {/* Left Panel: Desktop Only Brand Display */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#E2F7E7] to-[#30C45D]/15 flex-col items-center justify-center p-12 text-center relative overflow-hidden select-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#30C45D]/10 blur-2xl" />
        
        <div className="relative z-10 flex flex-col items-center max-w-sm">
          <div className="relative w-28 h-28 mb-4 bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
            <Image 
              src="https://i.postimg.cc/SKKMvjL9/photo-2026-05-14-14-47-12.jpg" 
              alt="Tabtaba Logo" 
              width={100}
              height={100}
              className="object-contain" 
              priority
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-[#30C45D] font-black text-[38px] leading-none mb-4 tracking-tight">Tabtaba</h2>
          <h3 className="text-gray-800 text-[20px] font-extrabold mb-3">Security Updated</h3>
          <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
            Your credentials have been securely updated. You can now log back into the app using your new password.
          </p>
        </div>
      </div>

      {/* Right Panel: Success Display */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-10 z-10 min-h-[100dvh] overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          {/* Header */}
          <header className="py-2 flex items-center relative h-[56px] mb-4 w-full">
            <button 
              onClick={handleBack}
              className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center z-10 cursor-pointer"
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </button>
            <h1 className="absolute inset-0 flex items-center justify-center text-[#30C45D] font-bold text-[20px] tracking-tight">
              Security
            </h1>
          </header>

          {/* Success Icon Card */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-[#30C45D] opacity-[0.1] blur-[40px] rounded-full scale-150"></div>
            <div className="relative w-40 h-40 bg-white rounded-[32px] shadow-2xl flex items-center justify-center overflow-hidden border-8 border-gray-50/50">
              <div className="w-24 h-24 bg-gradient-to-br from-[#30C45D] to-[#2AA950] rounded-[24px] flex items-center justify-center shadow-lg transform rotate-[-5deg]">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform rotate-[5deg]">
                  <Check className="text-[#30C45D]" size={30} strokeWidth={4} />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <div className="w-32 h-32 border-4 border-[#30C45D] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Title and Description */}
          <div className="text-center mb-6 w-full">
            <h2 className="text-[#111827] font-black text-[30px] md:text-[34px] tracking-tight mb-2 leading-tight">
              Password Changed
            </h2>
            <p className="text-[#5C7182] text-[15px] md:text-[17px] font-medium leading-relaxed max-w-[280px] mx-auto">
              Password changed successfully, you can login again with a new password
            </p>
          </div>

          {/* Info Cards */}
          <div className="w-full space-y-3 mb-6">
            <div className="flex items-start gap-4 p-4 bg-[#F9FAFB] rounded-[20px] border border-[#F3F4F6]">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#30C45D] shrink-0">
                <RefreshCw size={24} />
              </div>
              <div>
                <h3 className="text-[#1D2D50] font-bold text-[16px] mb-0.5">Security updated</h3>
                <p className="text-[#5C7182] text-[13px] font-medium leading-tight">Recovery methods remain active</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-[#F9FAFB] rounded-[20px] border border-[#F3F4F6]">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#30C45D] shrink-0">
                <Smartphone size={24} />
              </div>
              <div>
                <h3 className="text-[#1D2D50] font-bold text-[16px] mb-0.5">Sessions maintained</h3>
                <p className="text-[#5C7182] text-[13px] font-medium leading-tight">Review active devices in settings</p>
              </div>
            </div>
          </div>

          {/* Back to Login Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBackToLogin}
            className="w-full bg-gradient-to-r from-[#30C45D] to-[#2AA950] text-white rounded-[24px] h-[60px] text-[18px] font-black shadow-lg shadow-[#30C45D]/15 transition-all flex items-center justify-center mb-6 cursor-pointer"
          >
            Back to Login
          </motion.button>

          {/* Footer info/support */}
          <div className="w-full flex flex-col items-center gap-3">
             <button className="flex items-center gap-2 text-[#5C7182] font-bold text-[14px] cursor-pointer">
               <span className="w-4 h-4 rounded-full border-2 border-[#5C7182] flex items-center justify-center text-[10px]">?</span>
               Need support?
             </button>
             
             <div className="w-full bg-[#262626] rounded-xl p-3 flex items-start gap-3">
               <div className="p-1.5 bg-[#30C45D] rounded-full text-white mt-0.5 shrink-0">
                 <Info size={14} />
               </div>
               <p className="text-white text-[12px] leading-snug font-medium opacity-90">
                 Always ensure your password is unique and not used on other accounts.
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* iPhone Home Indicator - Mobile Only */}
      <div className="pb-3 flex justify-center md:hidden">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </main>
  );
}
