'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Lock,
  Smartphone,
  ShieldCheck,
  Info,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export default function VodafoneCashPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFawryReference, setShowFawryReference] = useState(false);
  const [copiedFawryCode, setCopiedFawryCode] = useState(false);

  const handlePay = () => {
    setShowFawryReference(true);
  };

  const handleCopyFawryCode = () => {
    navigator.clipboard.writeText('1810200311');
    setCopiedFawryCode(true);
    setTimeout(() => setCopiedFawryCode(false), 2000);
  };

  if (showFawryReference) {
    return (
      <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter pb-12 relative overflow-x-hidden flex flex-col justify-start">
        {/* Header with back arrow */}
        <div className="pt-8 px-6 pb-2 flex items-center justify-between relative z-10 w-full mb-3">
          <button 
            onClick={() => setShowFawryReference(false)}
            className="text-gray-500 hover:scale-110 active:scale-95 transition-transform p-2 -ml-2"
          >
            <ChevronLeft size={28} strokeWidth={2.5} className="text-[#365D83]" />
          </button>
          
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <span className="text-[11px] font-black tracking-widest text-[#8C9BAE] uppercase block">
              SERVICE PAYMENT
            </span>
          </div>

          <div className="w-10"></div> {/* Spacer */}
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
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              {copiedFawryCode ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          {/* Validity Container */}
          <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_22px_rgba(30,41,59,0.02)] border border-[#ECEFF4] flex items-center gap-4 text-left w-full mb-6">
            <div className="w-12 h-12 bg-[#EBF1FF] rounded-2xl flex items-center justify-center text-[#0056D2] shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#0056D2]">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
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
            {/* Header row in Card */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 bg-[#EBF1FF] rounded-xl flex items-center justify-center text-[#0056D2] shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#0056D2]">
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                  <path d="M7 8h10M7 12h10M7 16h10"/>
                </svg>
              </div>
              <h2 className="text-[17px] font-extrabold text-[#111A24] tracking-tight">
                Payment Instructions
              </h2>
            </div>

            {/* Steps list */}
            <div className="space-y-5">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#EBF1FF] text-[#0056D2] flex items-center justify-center font-black text-[13px] shrink-0 shadow-sm">
                  1
                </div>
                <div>
                  <h4 className="font-extrabold text-[#111A24] text-[14px] leading-tight mb-0.5">
                    Locate a Fawry POS
                  </h4>
                  <p className="text-[13px] text-gray-500 font-medium leading-snug">
                    Go to any retail store, pharmacy, or supermarket that has a Fawry machine.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#EBF1FF] text-[#0056D2] flex items-center justify-center font-black text-[13px] shrink-0 shadow-sm">
                  2
                </div>
                <div>
                  <h4 className="font-extrabold text-[#111A24] text-[14px] leading-tight mb-0.5">
                    Select Service
                  </h4>
                  <p className="text-[13px] text-gray-500 font-medium leading-snug">
                    Select &apos;Fawry Pay&apos; from the main menu or use the direct service code <span className="text-[#0056D2] font-black">788</span>.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#EBF1FF] text-[#0056D2] flex items-center justify-center font-black text-[13px] shrink-0 shadow-sm">
                  3
                </div>
                <div>
                  <h4 className="font-extrabold text-[#111A24] text-[14px] leading-tight mb-0.5">
                    Reference Entry
                  </h4>
                  <p className="text-[13px] text-gray-500 font-medium leading-snug">
                    Enter the 10-digit reference code provided above exactly as shown.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#EBF1FF] text-[#0056D2] flex items-center justify-center font-black text-[13px] shrink-0 shadow-sm">
                  4
                </div>
                <div>
                  <h4 className="font-extrabold text-[#111A24] text-[14px] leading-tight mb-0.5">
                    Payment & Confirmation
                  </h4>
                  <p className="text-[13px] text-gray-500 font-medium leading-snug">
                    Pay the requested amount and ensure you keep your printed receipt for your records.
                  </p>
                </div>
              </div>
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

          {/* Done Action Button */}
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

          {/* Footer Contact support helper */}
          <p className="mt-5 text-[13px] text-gray-400 font-bold text-center leading-normal max-w-[280px] mx-auto cursor-pointer hover:underline mb-8">
            Having trouble? Contact Tabtaba support for assistance.
          </p>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, text: "Enter your mobile number above and click Pay Now." },
    { num: 2, text: "You will receive a popup on your phone asking for your Vodafone Cash PIN." },
    { num: 3, text: "Once you enter your PIN and confirm, the payment will be completed." }
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F9FBFF] to-[#FAF8F3] font-inter pb-12 relative overflow-x-hidden">
      {/* Header */}
      <div className="pt-8 px-6 flex items-center justify-between relative z-10 w-full mb-8">
        <button 
          onClick={() => router.back()}
          className="text-[#30C45D] hover:scale-110 transition-transform p-1"
        >
          <ChevronLeft size={32} strokeWidth={3} />
        </button>
        <div className="bg-[#EBF1FF] text-[#0056D2] px-4 py-2 rounded-full flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider shadow-sm">
           <ShieldCheck size={16} />
           SECURE CHECKOUT
        </div>
      </div>

      <div className="px-6 flex flex-col gap-8 max-w-md mx-auto relative z-10">
        
        <div>
          <h1 className="text-[34px] font-[900] text-[#111827] leading-[1.1] mb-3">Pay with Vodafone Cash</h1>
          <p className="text-[#6B7280] text-[16px] font-medium leading-relaxed">
            Enter your wallet number to receive a payment request on your phone.
          </p>
        </div>

        {/* Vodafone Card */}
        <div className="bg-white rounded-[28px] p-4 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-4">
            <div className="w-16 h-16 relative bg-red-600 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-3 shadow-inner">
                <div className="w-10 h-10 border-[3px] border-white rounded-full relative overflow-hidden">
                  <div className="absolute top-1/2 left-0 w-full h-1/2 bg-red-600"></div>
                </div>
            </div>
            <div>
                <h3 className="text-[19px] font-black text-[#111827]">Vodafone Cash</h3>
                <p className="text-[12px] font-extrabold text-gray-400 uppercase tracking-widest">DIGITAL WALLET</p>
            </div>
        </div>

        {/* Form */}
        <div className="space-y-4 mt-2">
          <label className="text-[15px] font-black text-[#4B5563] uppercase tracking-[0.05em] px-1">WALLET PHONE NUMBER</label>
          <div className="relative group">
            <input 
              type="tel" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-[76px] bg-white border-2 border-gray-100 focus:border-[#30C45D] rounded-[24px] px-8 text-[20px] font-bold text-[#111827] outline-none transition-all placeholder-[#D1D5DB] shadow-sm"
              placeholder="010 XXXX XXXX"
            />
          </div>
        </div>

        {/* How it works */}
        <div className="bg-[#F0F5FF]/50 rounded-[36px] p-8 border border-[#E0E7FF] flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[#0056D2] mb-1">
                <Smartphone size={22} strokeWidth={2.5} />
                <h4 className="text-[16px] font-black uppercase tracking-[0.05em]">HOW IT WORKS</h4>
            </div>
            {steps.map((step) => (
                <div key={step.num} className="flex gap-5">
                    <div className="w-8 h-8 rounded-full bg-[#D1E0FF] text-[#0056D2] flex items-center justify-center font-black text-[15px] shrink-0 shadow-sm">
                        {step.num}
                    </div>
                    <p className="text-[15px] font-bold text-[#4B5563] leading-relaxed">
                        {step.text}
                    </p>
                </div>
            ))}
        </div>

        {/* Warning Note */}
        <div className="bg-[#FFF8F1] border border-[#FFE4CB] p-5 rounded-[28px] flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                <Info size={22} strokeWidth={2.5} />
            </div>
            <p className="text-[15px] font-bold text-orange-900 leading-tight">
                If you don&apos;t receive the popup, dial *9# and check &apos;Pending Requests&apos;.
            </p>
        </div>

        {/* Order Details Summary */}
        <div className="bg-white/40 rounded-[36px] p-7 border border-gray-100 mt-2 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3 text-[#6B7280]">
                    <div className="flex items-center justify-center text-[#111827]">
                        <Smartphone size={24} />
                    </div>
                    <span className="font-black text-[16px] uppercase tracking-wider text-[#111827]">Order Summary</span>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">AMOUNT DUE</p>
                    <div className="flex items-baseline justify-end gap-1">
                        <span className="text-[26px] font-black text-[#111827]">250.00</span>
                        <span className="text-[15px] font-black text-[#111827]">EGP</span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-5 pt-5 border-t border-gray-200/50">
                <div className="flex justify-between">
                    <span className="text-[16px] font-bold text-[#6B7280]">Clinical Consultation (45 min)</span>
                    <span className="text-[16px] font-black text-[#111827]">200.00 EGP</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[16px] font-bold text-[#6B7280]">Service Fee</span>
                    <span className="text-[16px] font-black text-[#111827]">50.00 EGP</span>
                </div>
            </div>
        </div>

        {/* Pay Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePay}
          className="w-full h-20 bg-[#30C45D] text-white rounded-[32px] text-[22px] font-black shadow-2xl shadow-[#30C45D]/30 mt-4 mb-4 flex items-center justify-center"
        >
          Pay Now
        </motion.button>

        {/* Secure Note */}
        <div className="flex items-center justify-center gap-3 text-[#065F46] font-black text-[13px] uppercase tracking-[0.1em] opacity-80">
          <Lock size={16} />
          SECURE SSL ENCRYPTED TRANSACTION
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-[48px] p-10 flex flex-col items-center shadow-2xl"
            >
              <div className="w-22 h-22 bg-[#DCFCE7] rounded-full flex items-center justify-center text-[#22C55E] mb-8 shadow-sm">
                <CheckCircle2 size={56} strokeWidth={2.5} />
              </div>
              <h3 className="text-[28px] font-black text-[#1D214F] mb-3 text-center">Request Sent!</h3>
              <p className="text-[17px] font-bold text-[#6B7280] text-center mb-10 leading-relaxed px-4">
                Please check your phone for the Vodafone Cash payment popup.
              </p>
              <button 
                onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('isSubscribed', 'true');
                      window.dispatchEvent(new Event('storage'));
                    }
                    setShowSuccess(false);
                    router.push('/dashboard');
                }}
                className="w-full h-16 bg-[#30C45D] text-white rounded-full text-[20px] font-black shadow-lg shadow-[#30C45D]/30 active:scale-95 transition-transform"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-auto pb-3 flex justify-center">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </div>
  );
}
