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
            router.push('/dashboard');
          }}
          className="w-full h-[60px] rounded-full bg-[#00AC49] hover:bg-[#009E45] shadow-lg hover:scale-[1.01] text-white text-[16px] font-black active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer shadow-[0_8px_24px_rgba(0,172,73,0.12)]"
        >
          Done
        </button>

        <p className="mt-5 text-[13px] text-gray-400 font-bold text-center leading-normal max-w-[280px] mx-auto hover:underline mb-8 cursor-pointer">
          Having trouble? Contact Tabtaba support for assistance.
        </p>
      </div>

      {/* iPhone Home Indicator */}
      <div className="mt-auto pb-3 flex justify-center">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60" />
      </div>
    </div>
  );
}
