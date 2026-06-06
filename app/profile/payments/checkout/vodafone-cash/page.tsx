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

export default function VodafoneCashPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePay = () => {
    setShowSuccess(true);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F9FBFF] to-[#FAF8F3] font-inter pb-12 relative overflow-x-hidden">
      
      {/* ======================================================== */}
      {/* 1. MOBILE VIEW (Original layout preserved exactly) */}
      {/* ======================================================== */}
      <div className="block md:hidden">
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
              <div className="flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#D1E0FF] text-[#0056D2] flex items-center justify-center font-black text-[15px] shrink-0 shadow-sm">1</div>
                  <p className="text-[15px] font-bold text-[#4B5563] leading-relaxed">
                      Enter your Vodafone Cash wallet number.
                  </p>
              </div>
              <div className="flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#D1E0FF] text-[#0056D2] flex items-center justify-center font-black text-[15px] shrink-0 shadow-sm">2</div>
                  <p className="text-[15px] font-bold text-[#4B5563] leading-relaxed">
                      Approve the payment popup on your phone.
                  </p>
              </div>
              <div className="flex gap-5">
                  <div className="w-8 h-8 rounded-full bg-[#D1E0FF] text-[#0056D2] flex items-center justify-center font-black text-[15px] shrink-0 shadow-sm">3</div>
                  <p className="text-[15px] font-bold text-[#4B5563] leading-relaxed">
                      Once confirmed, your subscription will be active.
                  </p>
              </div>
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
            className="w-full h-20 bg-[#30C45D] text-white rounded-[32px] text-[22px] font-black shadow-2xl shadow-[#30C45D]/30 mt-4 mb-4 flex items-center justify-center cursor-pointer"
          >
            Pay Now
          </motion.button>

          {/* Secure Note */}
          <div className="flex items-center justify-center gap-3 text-[#065F46] font-black text-[13px] uppercase tracking-[0.1em] opacity-80">
            <Lock size={16} />
            SECURE SSL ENCRYPTED TRANSACTION
          </div>
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
            <h1 className="text-2xl font-black text-gray-900">Pay with Vodafone Cash</h1>
          </div>

          <div className="bg-[#EBF1FF] text-[#0056D2] px-5 py-2.5 rounded-full flex items-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm border border-blue-100">
             <ShieldCheck size={16} />
             <span>Secure Checkout Connection</span>
          </div>
        </div>

        {/* Grid Split Content */}
        <div className="grid grid-cols-12 gap-10 items-start mt-6">
          
          {/* Left Column: Summary and Status */}
          <div className="col-span-5 space-y-6">
            
            {/* Vodafone Cash Brand Card */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 relative bg-red-600 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-3 shadow-inner">
                  <div className="w-10 h-10 border-[3px] border-white rounded-full relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-full h-1/2 bg-red-600"></div>
                  </div>
              </div>
              <div>
                  <h3 className="text-[19px] font-black text-[#111827]">Vodafone Cash</h3>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-0.5">DIGITAL WALLET METHOD</p>
              </div>
            </div>

            {/* Warning Note */}
            <div className="bg-[#FFF8F1] border border-[#FFE4CB] p-6 rounded-[28px] flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                    <Info size={20} strokeWidth={2.5} />
                </div>
                <p className="text-sm font-bold text-orange-950 leading-relaxed">
                    If you don&apos;t receive the payment popup on your phone screen, dial <strong className="text-orange-650">*9#</strong> on your handset and navigate to &apos;Pending Requests&apos;.
                </p>
            </div>

            {/* Order Details Summary */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm">
              <div className="flex justify-between items-center pb-5 border-b border-gray-100">
                <span className="font-black text-sm uppercase tracking-wider text-gray-700">Order Summary</span>
                <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">AMOUNT DUE</p>
                    <div className="flex items-baseline justify-end gap-0.5">
                        <span className="text-2xl font-black text-[#111827]">250.00</span>
                        <span className="text-xs font-black text-gray-600">EGP</span>
                    </div>
                </div>
              </div>
              <div className="space-y-4 pt-5 text-sm">
                  <div className="flex justify-between font-bold">
                      <span className="text-gray-500">Clinical Consultation (45 min)</span>
                      <span className="text-[#111827]">200.00 EGP</span>
                  </div>
                  <div className="flex justify-between font-bold">
                      <span className="text-gray-500">Service Fee</span>
                      <span className="text-[#111827]">50.00 EGP</span>
                  </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form and Directions */}
          <div className="col-span-7 bg-white border border-gray-150/50 rounded-[32px] p-8 shadow-sm space-y-6">
            
            {/* Wallet input */}
            <div>
              <label className="text-sm font-black text-gray-800 mb-2 block uppercase tracking-wider">
                Wallet Phone Number
              </label>
              <input 
                type="tel" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-14 bg-gray-50 border-2 border-gray-100 focus:border-[#30C45D] focus:bg-white rounded-2xl px-6 text-xl font-bold text-[#111827] outline-none transition-all placeholder-gray-300"
                placeholder="010 XXXX XXXX"
              />
              <p className="text-xs text-gray-400 font-semibold mt-2 leading-relaxed">
                Provide the active cellular line hosting the digital cash reserve database.
              </p>
            </div>

            {/* How it works */}
            <div className="bg-[#F0F5FF]/50 rounded-[28px] p-6 border border-[#E0E7FF] space-y-4">
                <div className="flex items-center gap-2 text-[#0056D2] mb-1">
                    <Smartphone size={18} strokeWidth={2.5} />
                    <h4 className="text-xs font-black uppercase tracking-[0.05em]">HOW IT WORKS</h4>
                </div>
                <div className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#D1E0FF] text-[#0056D2] flex items-center justify-center font-black text-[13px] shrink-0 shadow-sm">1</div>
                    <p className="text-sm font-bold text-gray-600 leading-snug">
                        Enter your Vodafone Cash wallet number above.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#D1E0FF] text-[#0056D2] flex items-center justify-center font-black text-[13px] shrink-0 shadow-sm">2</div>
                    <p className="text-sm font-bold text-gray-600 leading-snug">
                        Approve the payment security code request modal popup on your phone handset.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#D1E0FF] text-[#0056D2] flex items-center justify-center font-black text-[13px] shrink-0 shadow-sm">3</div>
                    <p className="text-sm font-bold text-gray-600 leading-snug">
                        Once validated, the subscription token registers automatically.
                    </p>
                </div>
            </div>

            {/* Actions and secure sign */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3.5 border border-gray-250 rounded-xl font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer bg-white text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePay}
                  className="flex-1 py-4 bg-[#30C45D] hover:bg-[#259E49] text-white rounded-xl font-black text-sm active:scale-95 transition-all cursor-pointer shadow-md shadow-emerald-500/10"
                >
                  Request Checkout Push Notification
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-400 font-bold text-[11px] uppercase tracking-wider text-center">
                <Lock size={14} className="text-gray-400" />
                <span>SECURED BY 256-BIT ENCRYPTION PROTOCOLS</span>
              </div>
            </div>

          </div>

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
                    router.push('/sessions');
                }}
                className="w-full h-16 bg-[#30C45D] text-white rounded-full text-[20px] font-black shadow-lg shadow-[#30C45D]/30 active:scale-[0.98] transition-transform"
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
