'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/forgot-password/success');
  };

  return (
    <main className="min-h-[100dvh] bg-white flex flex-col font-inter overflow-hidden">
      <div className="flex-1 flex flex-col">
        {/* Header Section with Logo and Blurred Background */}
        <div className="relative pt-4 pb-8 overflow-visible">
          <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-[#30C45D] opacity-[0.14] blur-[80px] rounded-full -mr-16 -mt-8 pointer-events-none"></div>
          
          <div className="px-4 flex items-center mb-4">
            <button 
              onClick={handleBack}
              className="p-2 text-[#30C45D] hover:bg-green-50 rounded-full transition-colors flex items-center justify-center z-10"
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center px-6">
            <div className="relative w-[180px] h-[120px] mb-2">
              <Image 
                src="https://i.postimg.cc/YS4B7cnz/photo-2026-05-14-14-47-12.jpg" 
                alt="Tabtaba Logo" 
                fill
                className="object-contain mix-blend-multiply"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="text-[#1D2D50] font-bold text-[28px] tracking-tight mt-1">
              Reset password
            </h1>
          </div>
        </div>

        <div className="px-6 flex-1 flex flex-col">
          {/* Title and Description */}
          <div className="mb-8">
            <h2 className="text-[#1D2D50] font-bold text-[32px] tracking-tight mb-2">
              Reset password
            </h2>
            <p className="text-[#5C7182] text-[16px] font-medium leading-relaxed">
              Your new password must be different from the previously used password
            </p>
          </div>

          <form onSubmit={handleVerify} className="flex-1 flex flex-col">
            {/* New Password */}
            <div className="mb-6">
              <label className="block text-[#1D2D50] text-[16px] font-medium mb-3">
                New password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className="w-full h-[72px] px-6 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl text-[#1D2D50] placeholder-[#BAC7D5] text-[18px] font-medium focus:outline-none focus:border-[#30C45D] focus:bg-white transition-all shadow-sm"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#BAC7D5] hover:text-[#1D2D50] transition-colors"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
              <p className="mt-3 text-[#30C45D] text-[15px] font-medium">
                Must be at least 8 character
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-8">
              <label className="block text-[#1D2D50] text-[16px] font-medium mb-3">
                Confirm password
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className="w-full h-[72px] px-6 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl text-[#1D2D50] placeholder-[#BAC7D5] text-[18px] font-medium focus:outline-none focus:border-[#30C45D] focus:bg-white transition-all shadow-sm"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#BAC7D5] hover:text-[#1D2D50] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
              <p className="mt-3 text-[#30C45D] text-[15px] font-medium">
                Both password must match
              </p>
            </div>

            <div className="flex-1"></div>

            {/* Verify Account Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#30C45D] hover:bg-[#2AA950] text-white rounded-[36px] h-[76px] text-[20px] font-bold shadow-2xl shadow-[#30C45D]/30 transition-all flex items-center justify-center mb-10"
            >
              Verify Account
            </motion.button>
          </form>
        </div>
      </div>

      {/* iPhone Home Indicator */}
      <div className="pb-3 flex justify-center">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </main>
  );
}
