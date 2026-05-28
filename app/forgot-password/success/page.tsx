'use client';

import React from 'react';
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
    <main className="min-h-[100dvh] bg-white flex flex-col font-inter overflow-hidden">
      {/* Header */}
      <header className="px-4 py-2 flex items-center relative h-[56px]">
        <button 
          onClick={handleBack}
          className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center z-10"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>
        <h1 className="absolute inset-0 flex items-center justify-center text-[#30C45D] font-bold text-[22px] tracking-tight">
          Security
        </h1>
      </header>

      <div className="flex-1 px-6 pt-8 pb-8 flex flex-col max-w-md mx-auto w-full items-center">
        {/* Success Icon Card */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[#30C45D] opacity-[0.1] blur-[40px] rounded-full scale-150"></div>
          <div className="relative w-48 h-48 bg-white rounded-[40px] shadow-2xl flex items-center justify-center overflow-hidden border-8 border-gray-50/50">
            <div className="w-32 h-32 bg-gradient-to-br from-[#30C45D] to-[#2AA950] rounded-[32px] flex items-center justify-center shadow-lg transform rotate-[-5deg]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform rotate-[5deg]">
                <Check className="text-[#30C45D]" size={40} strokeWidth={4} />
              </div>
            </div>
            {/* Seal background effect like in image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-40 h-40 border-4 border-[#30C45D] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-10 w-full">
          <h2 className="text-[#111827] font-black text-[38px] tracking-tight mb-4 leading-tight">
            Password Changed
          </h2>
          <p className="text-[#5C7182] text-[18px] font-medium leading-relaxed max-w-[280px] mx-auto">
            Password changed successfully, you can login again with a new password
          </p>
        </div>

        {/* Info Cards */}
        <div className="w-full space-y-4 mb-10">
          <div className="flex items-start gap-4 p-5 bg-[#F9FAFB] rounded-[24px] border border-[#F3F4F6]">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#30C45D]">
              <RefreshCw size={28} />
            </div>
            <div>
              <h3 className="text-[#1D214F] font-bold text-[18px] mb-1">Security updated</h3>
              <p className="text-[#5C7182] text-[15px] font-medium leading-tight">Recovery methods remain active</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-[#F9FAFB] rounded-[24px] border border-[#F3F4F6]">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#30C45D]">
              <Smartphone size={28} />
            </div>
            <div>
              <h3 className="text-[#1D214F] font-bold text-[18px] mb-1">Sessions maintained</h3>
              <p className="text-[#5C7182] text-[15px] font-medium leading-tight">Review active devices in settings</p>
            </div>
          </div>
        </div>

        {/* Back to Login Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBackToLogin}
          className="w-full bg-gradient-to-r from-[#30C45D] to-[#2AA950] text-white rounded-[32px] h-[76px] text-[22px] font-black shadow-xl shadow-[#30C45D]/30 transition-all flex items-center justify-center mb-8"
        >
          Back to Login
        </motion.button>

        {/* Footer info/support */}
        <div className="mt-auto w-full flex flex-col items-center gap-4">
           <button className="flex items-center gap-2 text-[#5C7182] font-bold text-[16px]">
             <span className="w-5 h-5 rounded-full border-2 border-[#5C7182] flex items-center justify-center text-[12px]">?</span>
             Need support?
           </button>
           
           <div className="w-full bg-[#262626] rounded-2xl p-4 flex items-start gap-3">
             <div className="p-1.5 bg-[#30C45D] rounded-full text-white mt-0.5">
               <Info size={16} />
             </div>
             <p className="text-white text-[14px] leading-tight font-medium opacity-90">
               Always ensure your password is unique and not used on other accounts.
             </p>
           </div>
        </div>
      </div>

      {/* iPhone Home Indicator */}
      <div className="pb-3 flex justify-center">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </main>
  );
}
