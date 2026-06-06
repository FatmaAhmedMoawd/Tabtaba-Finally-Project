'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(420); // 7 minutes
  const [displayEmail, setDisplayEmail] = useState('your******@gmail.com');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('forgot_password_email') || localStorage.getItem('profile_email');
      if (savedEmail && savedEmail.includes('@')) {
        const [localPart, domain] = savedEmail.split('@');
        const maskedLocal = localPart.length > 3 
          ? localPart.slice(0, 4) + '******' 
          : localPart.slice(0, 1) + '******';
        setTimeout(() => {
          setDisplayEmail(`${maskedLocal}@${domain}`);
        }, 0);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}.${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    setTimeLeft(420);
    // Add logic to resend OTP here
    console.log('OTP Resent');
    router.push('/forgot-password/reset');
  };

  const handleBack = () => {
    router.back();
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.substring(value.length - 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next if current box is filled
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleContinue = () => {
    // Logic for verifying OTP
    console.log('Verifying OTP:', otp.join(''));
    router.push('/forgot-password/reset');
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
          <h3 className="text-gray-800 text-[20px] font-extrabold mb-3">Email Verification</h3>
          <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
            A confirmation code has been dispatched. Enter the four digits to verify your email address.
          </p>
        </div>
      </div>

      {/* Right Panel: Form Display */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-10 z-10 min-h-[100dvh] overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col">
          {/* Header Section with Logo */}
          <div className="relative pt-2 pb-6 overflow-visible flex items-center">
            <button 
              onClick={handleBack}
              className="p-2 text-[#30C45D] hover:bg-green-50 rounded-full transition-colors flex items-center justify-center z-10 cursor-pointer"
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </button>
            <h1 className="text-[#30C45D] font-bold text-[20px] absolute left-1/2 -translate-x-1/2 uppercase tracking-wide">
              OTP
            </h1>
          </div>

          {/* Title and Description */}
          <div className="mb-8 text-left">
            <h2 className="text-[#30C45D] font-bold text-[28px] md:text-[32px] tracking-tight mb-2">
              Email verification
            </h2>
            <p className="text-[#A2845E] text-[15px] md:text-[17px] font-medium leading-tight">
              Enter the verification code we send you on: <br />
              <span className="text-[#30C45D] font-bold">{displayEmail}</span>
            </p>
          </div>

          {/* OTP Input Boxes - Reduced Gap */}
          <div className="flex justify-center gap-3 mb-8 pb-2">
            {otp.map((digit, index) => (
              <div key={index} className="w-[64px] aspect-square relative">
                <input
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-full bg-[#F3F7FA] border-2 border-[#E1E8EE] rounded-[18px] text-[30px] font-bold text-[#1D2D50] flex items-center justify-center text-center focus:outline-none focus:border-[#30C45D] focus:bg-white transition-all shadow-sm"
                />
              </div>
            ))}
          </div>

          {/* Resend Section */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <p className="text-[#5C7182] text-[15px] font-medium">
              Didn&apos;t receive code? <button onClick={handleResend} className="text-[#1D214F] font-bold ml-1 hover:underline cursor-pointer">Resend</button>
            </p>
            <div className="flex items-center gap-2 text-[#30C45D] font-bold text-[16px]">
              <Clock size={20} strokeWidth={2} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Continue Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="w-full bg-[#30C45D] hover:bg-[#2AA950] text-white rounded-[24px] h-[60px] text-[18px] font-bold shadow-lg shadow-[#30C45D]/15 transition-all flex items-center justify-center cursor-pointer"
          >
            Continue
          </motion.button>
        </div>
      </div>

      {/* iPhone Home Indicator - Mobile Only */}
      <div className="pb-3 flex justify-center md:hidden">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </main>
  );
}
