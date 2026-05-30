'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ChevronLeft, 
  CreditCard, 
  Wallet,
  Lock,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { motion } from 'motion/react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const planName = searchParams.get('plan') || 'TBTABA Care Plan';
  const price = searchParams.get('price') || '200';
  const cycle = searchParams.get('cycle') || 'monthly';
  
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'wallet'>('card');
  const [showAuthRequiredModal, setShowAuthRequiredModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('profile_email');
      if (!email) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowAuthRequiredModal(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showAuthRequiredModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAuthRequiredModal]);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F9FBFF] to-[#FAF8F3] font-inter pb-12 relative overflow-x-hidden">
      {/* Header */}
      <div className="pt-8 px-6 flex items-center gap-2 relative z-10 w-full">
        <button 
          onClick={() => router.back()}
          className="text-[#30C45D] hover:scale-110 transition-transform p-1"
        >
          <ChevronLeft size={32} strokeWidth={3} />
        </button>
        <h1 className="text-[28px] font-bold text-[#30C45D]">Checkout</h1>
      </div>

      <div className="px-6 mt-8">
        <h2 className="text-[15px] font-[900] text-[#5C7182] uppercase tracking-[0.1em] mb-4">
          ORDER SUMMARY
        </h2>

        {/* Order Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-50 flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-[72px] h-[72px] bg-[#22C55E] rounded-[24px] flex items-center justify-center text-white shadow-lg shadow-green-500/20">
              {/* Box with lines icon mockup from image */}
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 border-2 border-white rounded-md"></div>
                <div className="absolute top-2 left-1.5 right-1.5 h-0.5 bg-white"></div>
                <div className="absolute top-4 left-1.5 right-1.5 h-0.5 bg-white"></div>
                <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 className="text-[20px] font-black text-[#1D214F] leading-tight">{planName}</h3>
              <p className="text-[14px] font-medium text-[#6B7280]">Premium Mental Health Support</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex flex-col items-end">
              <span className="text-[26px] font-black text-[#22C55E] leading-tight">{price}</span>
              <span className="text-[20px] font-black text-[#22C55E] -mt-1 uppercase">EGP</span>
              <span className="text-[13px] font-bold text-gray-400 mt-1 whitespace-nowrap">/ {cycle === 'monthly' ? 'Month' : 'Year'}</span>
            </div>
          </div>
        </div>

        <h2 className="text-[26px] font-black text-[#1D214F] mb-6">Payment Method</h2>

        {/* Payment Methods */}
        <div className="space-y-4">
          <button 
            onClick={() => setSelectedMethod('card')}
            className={`w-full flex items-center justify-between p-6 rounded-[48px] transition-all duration-400 border-2 ${
              selectedMethod === 'card' 
                ? 'bg-[#F2F8FE] border-[#30C45D] shadow-md scale-[1.02]' 
                : 'bg-white border-transparent shadow-sm hover:border-gray-100'
            }`}
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-[#1D214F] border border-gray-100">
                <CreditCard size={32} strokeWidth={2} />
              </div>
              <div className="text-left">
                <h4 className="text-[19px] font-black text-[#111827]">Credit / Debit Card</h4>
                <p className="text-[14px] font-medium text-gray-400">Visa, Mastercard, Meeza</p>
              </div>
            </div>
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
              selectedMethod === 'card' ? 'border-[#065F46] bg-white' : 'border-gray-200 bg-white'
            }`}>
              {selectedMethod === 'card' && (
                <motion.div 
                  layoutId="radio-dot"
                  className="w-5 h-5 bg-[#065F46] rounded-full shadow-sm" 
                />
              )}
            </div>
          </button>

          <button 
            onClick={() => setSelectedMethod('wallet')}
            className={`w-full flex items-center justify-between p-6 rounded-[48px] transition-all duration-400 border-2 ${
              selectedMethod === 'wallet' 
                ? 'bg-[#F2F8FE] border-[#30C45D] shadow-md scale-[1.02]' 
                : 'bg-white border-transparent shadow-sm hover:border-gray-100'
            }`}
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-[#1D214F] border border-gray-100">
                <Wallet size={32} strokeWidth={2} />
              </div>
              <div className="text-left">
                <h4 className="text-[19px] font-black text-[#111827]">Digital Wallet</h4>
                <p className="text-[14px] font-medium text-gray-400">Vodafone Cash, Fawry, etc.</p>
              </div>
            </div>
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
              selectedMethod === 'wallet' ? 'border-[#065F46] bg-white' : 'border-gray-200 bg-white'
            }`}>
              {selectedMethod === 'wallet' && (
                <motion.div 
                  layoutId="radio-dot"
                  className="w-5 h-5 bg-[#065F46] rounded-full shadow-sm" 
                />
              )}
            </div>
          </button>
        </div>

         {/* Continue Button */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (typeof window !== 'undefined' && !localStorage.getItem('profile_email')) {
               setShowAuthRequiredModal(true);
               return;
            }
            if (selectedMethod === 'card') {
                router.push('/profile/payments/checkout/add-card');
            } else {
                router.push(`/profile/payments/checkout/digital-wallet?plan=${encodeURIComponent(planName)}&price=${encodeURIComponent(price)}&cycle=${cycle}`);
            }
          }}
          className="w-full mt-12 bg-gradient-to-r from-[#30C45D] to-[#2AA950] text-white h-20 rounded-full text-[21px] font-black shadow-2xl shadow-[#30C45D]/30 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          Proceed to Payment
          <ChevronRight size={28} strokeWidth={3} />
        </motion.button>

        {/* Security Info */}
        <div className="mt-12 mb-8 flex items-center justify-center gap-2 text-gray-400 font-bold text-[13px] uppercase tracking-[0.1em]">
          <Lock size={16} className="text-[#9CA3AF]" />
          SECURED BY INDUSTRY-STANDARD ENCRYPTION
        </div>
      </div>

      {/* Auth required Modal overlay */}
      {showAuthRequiredModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md touch-none" />
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)] border border-gray-100 max-w-[380px] w-full text-center relative z-[100001] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-[#EF4444] border-2 border-red-100 pb-0.5">
              <Lock size={28} strokeWidth={2.5} />
            </div>
            
            <h3 className="text-[20px] sm:text-[22px] font-[900] text-[#1D214F] leading-tight mb-2">
              تسجيل الدخول مطلوب 🔐
            </h3>
            <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-4">
              Registration Required
            </h4>
            
            <div className="w-full h-px bg-gray-100 mb-4" />
            
            <p className="text-[14px] sm:text-[15px] text-gray-600 font-bold leading-relaxed mb-6 px-1 text-center">
              لازم تروح تكريت اكونت الاول او تسجل دخول علشان خاطر تقدر ان انت تشترك او تدفع او انك تقدر تعمل سيشنز او جلسات مع الدكتورز 💚
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push('/register')}
                className="w-full py-4 bg-[#30BE4F] hover:bg-[#28A745] text-white rounded-2xl font-black text-[15px] sm:text-[16px] transition-all hover:scale-[1.01] active:scale-95 shadow-md shadow-green-500/10 cursor-pointer"
              >
                Register / إنشاء حساب جديد ✨
              </button>
              
              <button
                onClick={() => router.push('/login')}
                className="w-full py-4 border-2 border-[#1D214F] hover:bg-slate-50 text-[#1D214F] rounded-2xl font-black text-[15.5px] sm:text-[16px] transition-all active:scale-95 cursor-pointer"
              >
                Sign In / تسجيل دخول
              </button>
              
              <button
                onClick={() => router.back()}
                className="w-full py-3.5 text-gray-400 hover:text-gray-600 font-bold text-[14px] transition-colors mt-1 cursor-pointer"
              >
                Cancel & Go Back / الرجوع للخلف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iPhone Home Indicator */}
      <div className="mt-auto pb-3 flex justify-center">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F9FBFF] to-[#FAF8F3]">
            <div className="animate-spin text-[#30C45D]"><ClipboardList size={40} /></div>
        </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
