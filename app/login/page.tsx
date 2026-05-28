'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile_email', email);
      const nameFromEmail = email.split('@')[0];
      const uppercaseName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      localStorage.setItem('profile_fullName', uppercaseName || 'User');
      window.dispatchEvent(new Event('storage'));
    }
    router.push('/dashboard');
  };

  return (
    <main className="min-h-[100dvh] bg-white flex flex-col items-center px-8 pt-10 pb-8 font-inter relative overflow-hidden">
      
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute left-6 top-8 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#30C45D] hover:scale-110 transition-transform active:scale-95"
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      <div className="w-full max-w-md mx-auto flex flex-col items-center relative z-10 flex-1">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
           <div className="relative w-[100px] h-[100px] mb-2">
              <Image 
                src="https://i.postimg.cc/SKKMvjL9/photo-2026-05-14-14-47-12.jpg" 
                alt="Tabtaba Logo" 
                fill 
                className="object-contain mix-blend-multiply" 
                priority
                referrerPolicy="no-referrer"
              />
           </div>
           <h2 className="text-[#30C45D] font-bold text-[28px] tracking-tight -mt-4">
              Tabtaba
           </h2>
        </div>

        {/* Heading */}
        <div className="w-full mb-8">
          <h1 className="text-[#30C45D] font-black text-[38px] leading-[1.1] mb-3">
            Sign in to your<br />account
          </h1>
          <p className="text-[#5C7182] text-[16px] font-medium leading-relaxed max-w-[90%]">
            Log in to access your professional dashboard and continue supporting your patients&apos; mental well-being
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleContinue} className="w-full flex-1 flex flex-col">
          
          {/* Email Address */}
          <div className="mb-6">
            <label className="block text-[#4A6984] text-[15px] font-bold mb-3 px-1">
              tabtaba Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BAC7D5]">
                <Mail size={22} />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full h-[64px] pl-13 pr-4 bg-white border border-[#E2E8F0] rounded-2xl text-[#1D2D50] placeholder-[#BAC7D5] text-[16px] font-medium focus:outline-none focus:border-[#30C45D] focus:ring-4 focus:ring-[#30C45D]/5 transition-all shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-[#4A6984] text-[15px] font-bold mb-3 px-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BAC7D5]">
                <Lock size={22} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••••"
                className="w-full h-[64px] pl-13 pr-14 bg-white border border-[#E2E8F0] rounded-2xl text-[#1D2D50] placeholder-[#BAC7D5] text-[16px] font-medium focus:outline-none focus:border-[#30C45D] focus:ring-4 focus:ring-[#30C45D]/5 transition-all shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BAC7D5] hover:text-[#5C7182] transition-colors p-1"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <Link href="/forgot-password" className="text-[#30C45D] font-bold text-[15px] hover:underline">
               Forgot password?
            </Link>
          </div>

          {/* Or Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-[#E2E8F0]"></div>
            <span className="text-[#8997A5] text-[14px] font-bold whitespace-nowrap">Or sign in with</span>
            <div className="flex-1 h-px bg-[#E2E8F0]"></div>
          </div>

          {/* Google Sign In */}
          <div className="flex justify-center mb-8">
             <button type="button" className="w-[64px] h-[64px] bg-white border border-[#E2E8F0] rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all hover:scale-105 active:scale-95">
                <Image 
                  src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png" 
                  alt="Google" 
                  width={28} 
                  height={28}
                  referrerPolicy="no-referrer"
                />
             </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mb-10">
            <p className="text-[#1D2D50] text-[15px] font-bold">
              Don&apos;t have an account, <Link href="/signup" className="text-[#30C45D] hover:underline">Sign up</Link>
            </p>
          </div>

          {/* Legal Footer */}
          <div className="mt-auto mb-8 text-center px-4">
             <p className="text-[#5C7182] text-[14px] font-medium leading-relaxed">
                I Agree with <span className="text-[#5C7182] underline cursor-pointer">Terms of Service</span> and <span className="text-[#5C7182] underline cursor-pointer">Privacy Policy</span>
             </p>
          </div>

          {/* Continue Button */}
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#30C45D] hover:bg-[#2AA950] text-white rounded-[24px] h-[72px] text-[20px] font-black shadow-xl shadow-[#30C45D]/20 transition-all flex items-center justify-center"
          >
            Continue
          </motion.button>

        </form>
        
      </div>

      <style jsx>{`
        .pl-13 {
          padding-left: 3.5rem;
        }
      `}</style>
    </main>
  );
}
