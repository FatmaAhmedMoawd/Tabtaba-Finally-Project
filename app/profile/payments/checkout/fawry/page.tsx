'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function FawryPage() {
  const router = useRouter();
  const [copiedFawryCode, setCopiedFawryCode] = useState(false);

  const handleCopyFawryCode = () => {
    navigator.clipboard.writeText('1810200311');
    setCopiedFawryCode(true);
    setTimeout(() => setCopiedFawryCode(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter pb-12 relative overflow-x-hidden flex flex-col justify-start">
      
      {/* ======================================================== */}
      {/* 1. MOBILE VIEW (Original layout preserved exactly) */}
      {/* ======================================================== */}
      <div className="block md:hidden">
        {/* Header */}
        <div className="pt-8 px-6 pb-2 flex items-center justify-between relative z-10 w-full mb-3">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:scale-110 active:scale-95 transition-transform p-2 -ml-2"
          >
            <ChevronLeft size={28} strokeWidth={2.5} className="text-[#365D83]" />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <span className="text-[11px] font-black tracking-widest text-[#8C9BAE] uppercase block">
              SERVICE PAYMENT
            </span>
          </div>

          <div className="w-10" />
        </div>

        <div className="px-6 flex flex-col max-w-md mx-auto relative z-10 w-full">
          {/* Main Title Block */}
          <div className="text-center mb-6">
            <h1 className="text-[32px] font-black text-[#111A24] tracking-tight leading-none mb-2">
              Fawry Pay Reference
            </h1>
            <p className="text-[14px] font-extrabold text-gray-500 tracking-wide mt-2">
              Generated Reference Code
            </p>
          </div>

          {/* Reference Code Container */}
          <div className="bg-[#FAFBFD]/90 rounded-[28px] border border-[#ECEFF4] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-center w-full mb-5 pb-8">
            <div className="bg-[#F4F6F9] rounded-2xl py-5 px-6 flex items-center justify-center border border-gray-100">
              <span className="text-[38px] font-black text-[#00AC49] tracking-[0.06em] leading-none">
                1810200311
              </span>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyFawryCode}
              className="mt-4 h-[44px] rounded-full bg-[#E5EEFF] hover:bg-[#D9E6FF] active:scale-[0.97] transition-all text-[#0056D2] font-black text-[13px] tracking-wide px-6 flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#0056D2]">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              {copiedFawryCode ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          {/* Validity Container */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_22px_rgba(30,41,59,0.02)] border border-[#ECEFF4] flex items-center gap-4 text-left w-full mb-6">
            <div className="w-12 h-12 bg-[#EBF1FF] rounded-2xl flex items-center justify-center text-[#0056D2] shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#0056D2]">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] font-black tracking-widest text-[#8C9BAE] uppercase block mb-0.5">
                VALIDITY
              </span>
              <h3 className="font-extrabold text-[#111A24] text-[16px] leading-tight">
                Valid for 48 hours
              </h3>
              <p className="text-[13px] text-gray-400 font-bold mt-0.5 leading-none">
                Expires on Oct 25, 2:30 PM
              </p>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_22px_rgba(30,41,59,0.02)] border border-[#ECEFF4] text-left w-full mb-6">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 bg-[#EBF1FF] rounded-xl flex items-center justify-center text-[#0056D2] shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#0056D2]">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 8h10M7 12h10M7 16h10" />
                </svg>
              </div>
              <h2 className="text-[17px] font-extrabold text-[#111A24] tracking-tight">
                Payment Instructions
              </h2>
            </div>

            <div className="space-y-5">
              {[
                { n: 1, title: 'Locate a Fawry POS', desc: 'Go to any retail store, pharmacy, or supermarket that has a Fawry machine.' },
                { n: 2, title: 'Select Service', desc: "Select 'Fawry Pay' from the main menu or use the direct service code 788." },
                { n: 3, title: 'Reference Entry', desc: 'Enter the 10-digit reference code provided above exactly as shown.' },
                { n: 4, title: 'Payment & Confirmation', desc: 'Pay the requested amount and ensure you keep your printed receipt for your records.' },
              ].map((step) => (
                <div key={step.n} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#EBF1FF] text-[#0056D2] flex items-center justify-center font-black text-[13px] shrink-0 shadow-sm">
                    {step.n}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#111A24] text-[14px] leading-tight mb-0.5">{step.title}</h4>
                    <p className="text-[13px] text-gray-500 font-medium leading-snug">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Confirmation Card */}
          <div className="bg-[#EBFDF5] rounded-[24px] p-5 border border-[#30C45D]/20 flex items-start gap-4 text-left w-full mb-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#00AC49] flex items-center justify-center text-white shrink-0 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="stroke-white">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <h4 className="font-extrabold text-[#0D7A39] text-[15px] leading-tight">Instant Confirmation</h4>
              <p className="text-[13px] text-emerald-800 font-medium leading-snug mt-1">
                Your Tabtaba account will be updated automatically after payment.
              </p>
            </div>
          </div>

          {/* Done Button */}
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('isSubscribed', 'true');
                window.dispatchEvent(new Event('storage'));
              }
              router.push('/sessions');
            }}
            className="w-full h-[60px] rounded-full bg-[#00AC49] hover:bg-[#009E45] shadow-lg hover:scale-[1.01] text-white text-[16px] font-black active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer shadow-[0_8px_24px_rgba(0,172,73,0.12)]"
          >
            Done
          </button>

          <p className="mt-5 text-[13px] text-gray-400 font-bold text-center leading-normal max-w-[280px] mx-auto hover:underline mb-8 cursor-pointer">
            Having trouble? Contact Tabtaba support for assistance.
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP VIEW (Premium split-screen web redesign) */}
      {/* ======================================================== */}
      <div className="hidden md:block w-full max-w-5xl mx-auto px-8 py-10">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-150/40 pb-5">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-655 hover:text-gray-900 transition-colors font-bold text-sm bg-white border border-gray-250/60 rounded-full px-5 py-2.5 shadow-sm cursor-pointer"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-black text-gray-905">Fawry Pay Reference</h1>
          </div>

          <span className="text-xs font-black tracking-widest text-[#8C9BAE] uppercase">
            Service Bill Checkout
          </span>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-12 gap-10 items-start mt-6">
          
          {/* Left Column: Reference Code & Validity */}
          <div className="col-span-5 space-y-6">
            
            {/* Reference Code Card */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm text-center">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">
                YOUR REFERENCE CODE
              </span>
              <div className="bg-[#F4F6F9] rounded-2xl py-6 px-6 flex items-center justify-center border border-gray-100 shadow-inner">
                <span className="text-3xl font-black text-[#00AC49] tracking-wider leading-none">
                  1810200311
                </span>
              </div>

              {/* Copy Code button */}
              <button
                onClick={handleCopyFawryCode}
                className="mt-5 h-[46px] rounded-full bg-[#E5EEFF] hover:bg-[#D9E6FF] active:scale-[0.97] transition-all text-[#0056D2] font-black text-xs tracking-wider px-6 flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#0056D2]">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                {copiedFawryCode ? 'Copied Reference!' : 'Copy Reference Code'}
              </button>
            </div>

            {/* Validity Box */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-[#EBF1FF] rounded-2xl flex items-center justify-center text-[#0056D2] shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#0056D2]">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase block mb-0.5">
                  CODE VALIDITY PERIOD
                </span>
                <h3 className="font-extrabold text-[#111A24] text-base leading-tight">
                  Valid for 48 hours
                </h3>
                <p className="text-xs text-gray-400 font-bold mt-1 leading-none">
                  Expires on Oct 25, 2:30 PM
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Instructions & Completion */}
          <div className="col-span-7 bg-white border border-gray-150/50 rounded-[32px] p-8 shadow-sm space-y-6">
            
            {/* Instructions */}
            <div className="text-left w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#EBF1FF] rounded-xl flex items-center justify-center text-[#0056D2] shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#0056D2]">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 8h10M7 12h10M7 16h10" />
                  </svg>
                </div>
                <h2 className="text-lg font-extrabold text-[#111A24] tracking-tight">
                  Payment Instructions
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { n: 1, title: 'Locate a Fawry POS Terminal', desc: 'Go to any retail outlet, pharmacy, supermarket, or merchant operating a Fawry machine.' },
                  { n: 2, title: 'Select Service Code 788', desc: "Select 'Fawry Pay' from the screen menu options or punch in the direct service code 788." },
                  { n: 3, title: 'Enter the Reference Code', desc: 'Type in the 10-digit reference code provided on the left panel exactly as generated.' },
                  { n: 4, title: 'Pay & Retain Receipt', desc: 'Pay the bill fee of EGP 250.00 and ensure the vendor issues you a physical print receipt.' },
                ].map((step) => (
                  <div key={step.n} className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#EBF1FF] text-[#0056D2] flex items-center justify-center font-black text-[12px] shrink-0 shadow-sm">
                      {step.n}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#111A24] text-sm leading-tight mb-0.5">{step.title}</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instant Confirmation Banner */}
            <div className="bg-[#EBFDF5] rounded-2xl p-5 border border-[#30C45D]/20 flex items-start gap-4 text-left w-full shadow-sm">
              <div className="w-9 h-9 rounded-full bg-[#00AC49] flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="stroke-white">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-[#0D7A39] text-sm leading-tight">Instant Account Upgrade</h4>
                <p className="text-xs text-emerald-800 font-medium leading-normal mt-1">
                  Once payment registers at the POS terminal, your Tabtaba dashboard unlocks instantly.
                </p>
              </div>
            </div>

            {/* Action Done */}
            <div className="pt-4 border-t border-gray-100 flex gap-4">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('isSubscribed', 'true');
                    window.dispatchEvent(new Event('storage'));
                  }
                  router.push('/sessions');
                }}
                className="flex-1 h-14 rounded-full bg-[#00AC49] hover:bg-[#009E45] shadow-lg text-white text-sm font-black active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer shadow-[0_8px_24px_rgba(0,172,73,0.12)]"
              >
                Go to Dashboard
              </button>
            </div>

          </div>

        </div>

      </div>

      <div className="mt-auto pb-3 flex justify-center">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60" />
      </div>
    </div>
  );
}
