'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const updateTime = () => {
        const now = new Date();
        setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false }));
      };
      updateTime();
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for continuing
    console.log('Continuing with:', { email, mobile });
    if (typeof window !== 'undefined') {
      localStorage.setItem('forgot_password_email', email);
    }
    router.push('/forgot-password/otp');
  };

  return (
    <main className="min-h-[100dvh] bg-white flex flex-col font-inter">


      {/* Header */}
      <header className="px-4 py-2 flex items-center relative h-[56px]">
        <button 
          onClick={handleBack}
          className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center z-10"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>
        <h1 className="absolute inset-0 flex items-center justify-center text-[#30C45D] font-bold text-[22px] tracking-tight">
          Forgot Password
        </h1>
      </header>

      <div className="flex-1 px-6 pt-12 pb-8 flex flex-col max-w-md mx-auto w-full">
        {/* Title and Description */}
        <div className="mb-8">
          <h2 className="text-[#30C45D] font-black text-[34px] tracking-tight mb-2 leading-tight">
            Forgot Password?
          </h2>
          <p className="text-[#5C7182] text-[17px] font-medium leading-relaxed">
            Enter your email address to receive a confirmation code resetting your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleContinue} className="flex-1 flex flex-col">
          {/* Email Address */}
          <div className="mb-6">
            <label className="block text-[#30C45D] text-[16px] font-bold mb-3">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#BAC7D5] group-focus-within:text-[#30C45D] transition-colors">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full h-[72px] pl-16 pr-5 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl text-[#1D2D50] placeholder-[#BAC7D5] text-[17px] font-medium focus:outline-none focus:border-[#30C45D] focus:bg-white transition-all shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="mb-10">
            <label className="block text-[#30C45D] text-[16px] font-bold mb-3">
              Mobile Number
            </label>
            <div className="flex bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl overflow-hidden focus-within:border-[#30C45D] focus-within:bg-white transition-all shadow-sm">
              <div className="flex items-center gap-3 pl-4 pr-4 bg-[#F9FAFB] border-r border-[#F3F4F6] h-[72px]">
                <div className="relative w-8 h-5 flex items-center justify-center">
                  <Image 
                    src="https://flagcdn.com/w40/eg.png" 
                    alt="Egypt" 
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[#1D2D50] text-[18px] font-bold">+02</span>
              </div>
              <input 
                type="tel" 
                placeholder="Enter Mobile Number"
                className="flex-1 h-[72px] px-5 bg-transparent text-[#1D2D50] placeholder-[#BAC7D5] text-[17px] font-medium focus:outline-none"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex-1"></div>

          {/* Continue Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#30C45D] hover:bg-[#2AA950] text-white rounded-[36px] h-[76px] text-[22px] font-black shadow-2xl shadow-[#30C45D]/30 transition-all flex items-center justify-center mt-12 mb-10"
          >
            Continue
          </motion.button>
        </form>
      </div>

      {/* iPhone Home Indicator */}
      <div className="pb-3 flex justify-center">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </main>

  );
}
