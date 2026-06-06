'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react';

function DigitalWalletContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || '';
  const price = searchParams.get('price') || '';
  const cycle = searchParams.get('cycle') || 'monthly';

  const params = `?plan=${encodeURIComponent(plan)}&price=${encodeURIComponent(price)}&cycle=${cycle}`;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#EEF4FB] to-[#F5F5EE] font-inter pb-12 relative">
      
      {/* Header */}
      <div className="pt-10 px-6 flex items-center gap-2 relative z-10 w-full max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="text-[#30C45D] hover:scale-110 transition-transform p-1"
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <h1 className="text-[22px] font-black text-[#30C45D]">Digital Wallet</h1>
      </div>

      <div className="px-6 mt-8 flex flex-col gap-6 w-full max-w-md md:max-w-4xl mx-auto">
        
        {/* Order Summary */}
        <div className="bg-white rounded-[28px] p-5 shadow-sm flex items-center justify-between border border-gray-50">
          <div className="flex items-center gap-4">
            {/* Green plan icon */}
            <div className="w-[62px] h-[62px] bg-[#30C45D] rounded-[18px] flex items-center justify-center shadow-md shadow-green-200/60 shrink-0">
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 border-2 border-white rounded-md" />
                <div className="absolute top-[6px] left-[4px] right-[4px] h-[2px] bg-white rounded-full" />
                <div className="absolute top-[11px] left-[4px] right-[4px] h-[2px] bg-white rounded-full" />
                <div className="absolute bottom-[4px] left-[4px] w-[5px] h-[5px] bg-white rounded-full" />
              </div>
            </div>
            <div>
              <h3 className="text-[18px] font-black text-[#111827] leading-tight">
                {plan || 'TBTABA Care Monthly'}
              </h3>
              <p className="text-[13px] font-medium text-gray-400">Premium Mental Health</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[28px] font-black text-[#30C45D] leading-none">{price || '200'}</span>
            <span className="block text-[14px] font-black text-[#30C45D]">EGP</span>
          </div>
        </div>

        {/* Select Payment Method Title */}
        <h2 className="text-[22px] font-black text-[#111827] mt-2">Select Payment Method</h2>

        {/* Responsive Grid for buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* Vodafone Cash */}
          <button
            onClick={() => router.push(`/profile/payments/checkout/vodafone-cash${params}`)}
            className="w-full bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md hover:border-red-100 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {/* Vodafone red icon */}
              <div className="w-[56px] h-[56px] bg-[#E30613] rounded-[16px] flex items-center justify-center shadow-md shadow-red-200/50 shrink-0">
                <div className="w-8 h-8 border-[3px] border-white rounded-full relative overflow-hidden">
                  <div className="absolute inset-x-0 top-1/2 bottom-0 bg-[#E30613]" />
                </div>
              </div>
              <div className="text-left">
                <h4 className="text-[17px] font-black text-[#111827]">Vodafone Cash</h4>
                <p className="text-[13px] font-medium text-gray-400">Pay with Vodafone wallet</p>
              </div>
            </div>
            <ChevronRight size={22} strokeWidth={2.5} className="text-gray-300" />
          </button>

          {/* Fawry */}
          <button
            onClick={() => router.push(`/profile/payments/checkout/fawry${params}`)}
            className="w-full bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md hover:border-green-100 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {/* Fawry green icon */}
              <div className="w-[56px] h-[56px] bg-[#4CAF50] rounded-[16px] flex items-center justify-center shadow-md shadow-green-200/50 shrink-0">
                {/* Store/shop icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-[17px] font-black text-[#111827]">Fawry</h4>
                <p className="text-[13px] font-medium text-gray-400">Pay at any Fawry POS</p>
              </div>
            </div>
            <ChevronRight size={22} strokeWidth={2.5} className="text-gray-300" />
          </button>

        </div>

      </div>

      {/* iPhone Home Indicator */}
      <div className="mt-16 pb-3 flex justify-center">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60" />
      </div>
    </div>
  );
}

export default function DigitalWalletPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#EEF4FB] to-[#F5F5EE]">
        <div className="animate-spin text-[#30C45D]"><ClipboardList size={40} /></div>
      </div>
    }>
      <DigitalWalletContent />
    </Suspense>
  );
}
