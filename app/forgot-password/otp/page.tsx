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
    <main className="min-h-[100dvh] bg-white flex flex-col font-inter overflow-hidden">
      <div className="flex-1 flex flex-col">
        {/* Header Section with Logo */}
        <div className="relative pt-4 pb-8 overflow-visible">
          <div className="px-4 flex items-center mb-4">
            <button 
              onClick={handleBack}
              className="p-2 text-[#30C45D] hover:bg-green-50 rounded-full transition-colors flex items-center justify-center z-10"
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center px-6">
            <h1 className="text-[#30C45D] font-bold text-[32px] tracking-[0.1em] mt-8 uppercase">
              OTP
            </h1>
          </div>
        </div>

        <div className="px-8 flex-1 flex flex-col">
          {/* Title and Description */}
          <div className="mb-10 text-left">
            <h2 className="text-[#30C45D] font-bold text-[32px] tracking-tight mb-2">
              Email verification
            </h2>
            <p className="text-[#A2845E] text-[17px] font-medium leading-tight">
              Enter the verification code we send you on: <br />
              <span className="text-[#30C45D]">{displayEmail}</span>
            </p>
          </div>

          {/* OTP Input Boxes - Reduced Gap */}
          <div className="flex justify-center gap-3 mb-10 pb-4">
            {otp.map((digit, index) => (
              <div key={index} className="w-[72px] aspect-square relative">
                <input
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-full bg-[#F3F7FA] border-2 border-[#E1E8EE] rounded-[18px] text-[36px] font-bold text-[#1D2D50] flex items-center justify-center text-center focus:outline-none focus:border-[#30C45D] focus:bg-white transition-all shadow-sm"
                />
              </div>
            ))}
          </div>

          {/* Resend Section */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <p className="text-[#5C7182] text-[16px] font-medium">
              Didn&apos;t receive code? <button onClick={handleResend} className="text-[#1D214F] font-bold ml-1 hover:underline">Resend</button>
            </p>
            <div className="flex items-center gap-2 text-[#30C45D] font-bold text-[18px]">
              <Clock size={22} strokeWidth={2} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="flex-1"></div>

          {/* Continue Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="w-full bg-[#30C45D] hover:bg-[#2AA950] text-white rounded-[36px] h-[76px] text-[24px] font-bold shadow-2xl shadow-[#30C45D]/30 transition-all flex items-center justify-center mb-8"
          >
            Continue
          </motion.button>
        </div>
      </div>

      {/* iPhone Home Indicator */}
      <div className="pb-3 flex justify-center mt-auto">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </main>
  );
}
