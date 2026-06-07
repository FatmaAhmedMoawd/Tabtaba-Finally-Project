'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({ password: false, confirm: false });

  const passwordError = touched.password && password.length > 0 && password.length < 8;
  const confirmError = touched.confirm && confirmPassword.length > 0 && password !== confirmPassword;

  const handleBack = () => {
    router.back();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ password: true, confirm: true });
    if (password.length < 8 || password !== confirmPassword) return;
    router.push('/forgot-password/success');
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
          <h3 className="text-gray-800 text-[20px] font-extrabold mb-3">Reset Password</h3>
          <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
            Create a strong, new password that you don&apos;t use for other accounts to ensure absolute security for your profile.
          </p>
        </div>
      </div>

      {/* Right Panel: Form Display */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-10 z-10 min-h-[100dvh] overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col">
          {/* Header */}
          <div className="relative pt-2 pb-6 overflow-visible flex items-center">
            <button 
              onClick={handleBack}
              className="p-2 text-[#30C45D] hover:bg-green-50 rounded-full transition-colors flex items-center justify-center z-10 cursor-pointer"
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </button>
            <h1 className="text-[#1D2D50] font-bold text-[20px] absolute left-1/2 -translate-x-1/2 tracking-tight">
              Reset Password
            </h1>
          </div>

          {/* Title and Description */}
          <div className="mb-6">
            <h2 className="text-[#1D2D50] font-bold text-[28px] md:text-[32px] tracking-tight mb-2">
              Reset password
            </h2>
            <p className="text-[#5C7182] text-[15px] md:text-[16px] font-medium leading-relaxed">
              Your new password must be different from the previously used password
            </p>
          </div>

          <form onSubmit={handleVerify} className="flex-1 flex flex-col">
            {/* New Password */}
            <div className="mb-4">
              <label className="block text-[#1D2D50] text-[15px] font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, password: true }))}
                  className={`w-full h-[58px] px-6 bg-[#F9FAFB] border rounded-xl text-[#1D2D50] placeholder-[#BAC7D5] text-[16px] font-medium focus:outline-none transition-all shadow-sm
                    ${passwordError 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-[#F3F4F6] focus:border-[#30C45D] focus:bg-white'
                    }`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#BAC7D5] hover:text-[#1D2D50] transition-colors p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {passwordError ? (
                <p className="mt-2 text-red-500 text-[13px] font-medium">
                  Password must be at least 8 characters
                </p>
              ) : (
                <p className="mt-2 text-[#30C45D] text-[13px] font-medium">
                  Must be at least 8 characters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-[#1D2D50] text-[15px] font-medium mb-2">
                confirm Password
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, confirm: true }))}
                  className={`w-full h-[58px] px-6 bg-[#F9FAFB] border rounded-xl text-[#1D2D50] placeholder-[#BAC7D5] text-[16px] font-medium focus:outline-none transition-all shadow-sm
                    ${confirmError 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-[#F3F4F6] focus:border-[#30C45D] focus:bg-white'
                    }`}
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#BAC7D5] hover:text-[#1D2D50] transition-colors p-1 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {confirmError ? (
                <p className="mt-2 text-red-500 text-[13px] font-medium">
                  Passwords do not match
                </p>
              ) : (
                <p className="mt-2 text-[#30C45D] text-[13px] font-medium">
                  Both passwords must match
                </p>
              )}
            </div>

            {/* Verify Account Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#30C45D] hover:bg-[#2AA950] text-white rounded-[24px] h-[60px] text-[18px] font-bold shadow-lg shadow-[#30C45D]/15 transition-all flex items-center justify-center cursor-pointer mt-4"
            >
              Verify Account
            </motion.button>
          </form>
        </div>
      </div>

      {/* iPhone Home Indicator - Mobile Only */}
      <div className="pb-3 flex justify-center md:hidden">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </main>
  );
}
