import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { RegisterStep2Form } from '@/features/register/ui/register-step-2-form';

export const metadata: Metadata = {
  title: 'Create an Account - Tabtaba',
  description: 'Create a new account to begin your journey towards better mental health.',
};

export default function RegisterStep2Page() {
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
          <h3 className="text-gray-800 text-[20px] font-extrabold mb-3">Begin Your Wellness Journey</h3>
          <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
            Create an account to begin your journey towards better mental health. We provide a safe, calm, and professional space for you.
          </p>
        </div>
      </div>

      {/* Right Panel: Form Display */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-10 z-10 min-h-[100dvh] overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col">
          {/* Header Text */}
          <div className="mb-6 mt-2">
            <h1 
              className="text-[2.2rem] leading-[1.2] font-bold text-[#71B584] mb-3 tracking-tight" 
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Create your new<br />account
            </h1>
            <p 
              className="text-[15px] leading-[1.5] text-[#5C7182] font-medium"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Create an account to begin your journey towards better mental health.
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col">
            <RegisterStep2Form />
          </div>
        </div>
      </div>
      
    </main>
  );
}
