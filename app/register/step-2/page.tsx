import React from 'react';
import type { Metadata } from 'next';
import { RegisterStep2Form } from '@/features/register/ui/register-step-2-form';

export const metadata: Metadata = {
  title: 'Create an Account - Tabtaba',
  description: 'Create a new account to begin your journey towards better mental health.',
};

export default function RegisterStep2Page() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center bg-white relative overflow-y-auto">
      
      <div className="w-full max-w-lg mx-auto flex flex-col px-6 md:px-8 py-10 md:py-12 z-10 min-h-[100dvh]">
        
        {/* Header Text */}
        <div className="mb-8 mt-4 md:mt-8">
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
            Create an account to begin your journey towards<br className="hidden sm:block" /> better mental health.
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col">
          <RegisterStep2Form />
        </div>

      </div>
      
    </main>
  );
}
