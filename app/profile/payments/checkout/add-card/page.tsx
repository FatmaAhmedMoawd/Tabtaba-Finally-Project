'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Lock,
  CreditCard,
  CheckCircle2,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AddCardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: 'Yasser Abd Elazize',
    cardNumber: '000 000 000 00',
    expiryDate: '04/28',
    cvv: '0000'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F9FBFF] to-[#FAF8F3] font-inter pb-12 relative overflow-x-hidden">
      
      {/* ======================================================== */}
      {/* 1. MOBILE VIEW (Original layout preserved exactly) */}
      {/* ======================================================== */}
      <div className="block md:hidden">
        {/* Header */}
        <div className="pt-8 px-6 flex items-center gap-2 relative z-10">
          <button 
            onClick={() => router.back()}
            className="text-[#30C45D] hover:scale-110 transition-transform p-1"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </button>
          <h1 className="text-[28px] font-bold text-[#30C45D]">Add Card</h1>
        </div>

        <div className="px-6 mt-8 flex flex-col gap-10 max-w-md mx-auto">
          {/* Virtual Card Preview */}
          <div className="relative w-full aspect-[1.7/1] bg-gradient-to-br from-[#1E7B44] via-[#22C55E] to-[#86E5A6] rounded-[32px] p-8 text-white shadow-2xl shadow-[#30C45D]/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-[80%] h-[150%] bg-white/10 rotate-[35deg] translate-x-[20%] -translate-y-[40%] rounded-[100px] blur-sm"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <div className="w-16 h-5 bg-white/20 rounded-sm border border-white/30"></div>
                  <div className="flex gap-1 opacity-40 pt-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
              </div>

              <div className="space-y-6">
                  <div className="text-[26px] font-medium tracking-[0.1em] opacity-95">
                      {formData.cardNumber || '000 000 000 00'}
                  </div>

                  <div className="flex justify-between items-end">
                      <div className="flex-1">
                          <p className="text-[11px] font-medium text-white/80 mb-0.5">Card Holder Name</p>
                          <p className="text-[18px] font-bold tracking-tight">{formData.name || 'Yasser Abd Elazize'}</p>
                      </div>
                      <div className="text-right">
                          <p className="text-[11px] font-medium text-white/80 mb-0.5">Expiry Date</p>
                          <p className="text-[18px] font-bold tracking-tight">{formData.expiryDate || '04/28'}</p>
                      </div>
                      <div className="ml-6 flex shrink-0">
                        <div className="w-12 h-9 bg-white/20 rounded-md border border-white/30 p-1.5 grid grid-cols-2 gap-1">
                          <div className="border border-white/20 rounded-sm"></div>
                          <div className="border border-white/20 rounded-sm"></div>
                          <div className="border border-white/20 rounded-sm"></div>
                          <div className="border border-white/20 rounded-sm"></div>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Form Fields - Matching input style from image */}
          <div className="space-y-8 mt-4">
            <div className="space-y-4">
              <label className="text-[20px] font-bold text-[#111827] px-1">Card Holder Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full h-[74px] bg-[#F2F8FE] border-2 border-transparent focus:border-[#30C45D] rounded-[24px] px-8 text-[20px] font-medium text-[#D1D5DB] focus:text-[#111827] outline-none transition-all shadow-inner"
                placeholder="Yasser Abd Elazize"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[20px] font-bold text-[#111827] px-1">Card Number</label>
              <input 
                type="text" 
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                className="w-full h-[74px] bg-[#F2F8FE] border-2 border-transparent focus:border-[#30C45D] rounded-[24px] px-8 text-[20px] font-medium text-[#D1D5DB] focus:text-[#111827] outline-none transition-all shadow-inner"
                placeholder="000 000 000 00"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                  <label className="text-[20px] font-bold text-[#111827] px-1">Expiry Date</label>
                  <input 
                      type="text" 
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className="w-full h-[74px] bg-[#F2F8FE] border-2 border-transparent focus:border-[#30C45D] rounded-[24px] px-8 text-[20px] font-medium text-[#D1D5DB] focus:text-[#111827] outline-none transition-all shadow-inner"
                      placeholder="04/28"
                  />
              </div>
              <div className="space-y-4">
                  <label className="text-[20px] font-bold text-[#111827] px-1">CVV</label>
                  <input 
                      type="text" 
                      value={formData.cvv}
                      onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                      className="w-full h-[74px] bg-[#F2F8FE] border-2 border-transparent focus:border-[#30C45D] rounded-[24px] px-8 text-[20px] font-medium text-[#D1D5DB] focus:text-[#111827] outline-none transition-all shadow-inner"
                      placeholder="0000"
                  />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full h-[78px] bg-[#3E7515] text-white rounded-[32px] text-[24px] font-bold shadow-xl shadow-[#3E7515]/20 mt-8 mb-4 border-b-4 border-[#2D5A10] cursor-pointer"
          >
            save card
          </motion.button>

          {/* Secure Note */}
          <div className="flex items-center justify-center gap-2 text-gray-400 font-bold text-[14px]">
            <Lock size={16} />
            Your payment information is encrypted and secure.
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
            <h1 className="text-2xl font-black text-gray-900">Add Credit / Debit Card</h1>
          </div>
        </div>

        {/* Desktop Split Grid */}
        <div className="grid grid-cols-12 gap-10 items-start mt-6">
          
          {/* Left Column: Virtual Card Preview */}
          <div className="col-span-5 bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm flex flex-col items-center">
            <span className="text-xs font-black text-[#0D7A39] uppercase tracking-wider mb-6 block self-start">
              Card Preview
            </span>

            {/* Virtual Card Preview */}
            <div className="relative w-full aspect-[1.7/1] bg-gradient-to-br from-[#1E7B44] via-[#22C55E] to-[#86E5A6] rounded-[24px] p-6 text-white shadow-2xl shadow-[#30C45D]/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-[80%] h-[150%] bg-white/10 rotate-[35deg] translate-x-[20%] -translate-y-[40%] rounded-[100px] blur-sm"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-4 bg-white/20 rounded-sm border border-white/30"></div>
                    <div className="flex gap-1 opacity-40 pt-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-[20px] font-medium tracking-[0.1em] opacity-95">
                        {formData.cardNumber || '000 000 000 00'}
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="flex-1">
                            <p className="text-[9px] font-medium text-white/80 mb-0.5">Card Holder Name</p>
                            <p className="text-[14px] font-bold tracking-tight truncate max-w-[150px]">{formData.name || 'Yasser Abd Elazize'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-medium text-white/80 mb-0.5">Expiry Date</p>
                            <p className="text-[14px] font-bold tracking-tight">{formData.expiryDate || '04/28'}</p>
                        </div>
                        <div className="ml-4 flex shrink-0">
                          <div className="w-10 h-7 bg-white/20 rounded-md border border-white/30 p-1 grid grid-cols-2 gap-0.5">
                            <div className="border border-white/20 rounded-sm"></div>
                            <div className="border border-white/20 rounded-sm"></div>
                            <div className="border border-white/20 rounded-sm"></div>
                            <div className="border border-white/20 rounded-sm"></div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-wider">
              <Lock size={14} className="text-gray-400" />
              <span>SSL Secured Payment</span>
            </div>
          </div>

          {/* Right Column: Card Details Inputs */}
          <div className="col-span-7 bg-white border border-gray-150/50 rounded-[32px] p-8 shadow-sm space-y-6">
            <span className="text-xs font-black text-[#0D7A39] uppercase tracking-wider block">
              Enter Card Details
            </span>

            <div className="space-y-5">
              
              {/* Card Holder Name */}
              <div>
                <label className="text-sm font-black text-gray-800 mb-2 block">Card Holder Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-[#30C45D] focus:bg-white transition-all shadow-sm"
                  placeholder="Yasser Abd Elazize"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="text-sm font-black text-gray-800 mb-2 block">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-[#30C45D] focus:bg-white transition-all shadow-sm"
                  placeholder="000 000 000 00"
                />
              </div>

              {/* Expiry Date and CVV */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-black text-gray-800 mb-2 block">Expiry Date</label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-[#30C45D] focus:bg-white transition-all shadow-sm"
                    placeholder="04/28"
                  />
                </div>
                <div>
                  <label className="text-sm font-black text-gray-800 mb-2 block">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                    className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-[#30C45D] focus:bg-white transition-all shadow-sm"
                    placeholder="0000"
                  />
                </div>
              </div>

            </div>

            {/* Save Card Button */}
            <div className="pt-4 border-t border-gray-100 flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-250 rounded-xl font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer bg-white text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 py-3.5 bg-[#3E7515] hover:bg-[#2D5A10] text-white rounded-xl font-black text-sm active:scale-95 transition-all cursor-pointer shadow-md shadow-[#3E7515]/20 border-b-2 border-[#2D5A10]"
              >
                Save Card Details
              </button>
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
              className="bg-white w-full max-w-sm rounded-[48px] p-8 flex flex-col items-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center text-[#30C45D] mb-6 shadow-sm">
                <CheckCircle2 size={48} strokeWidth={2.5} />
              </div>

              <h3 className="text-[28px] font-black text-[#1D214F] mb-6 text-center leading-tight">Card Details</h3>
              
              <div className="w-full bg-[#F2F8FE] p-6 rounded-[32px] space-y-4 mb-8 border border-[#E1E8EE]">
                <div className="flex justify-between items-center bg-white/60 p-3 rounded-2xl">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Name</span>
                  <span className="text-[16px] font-black text-[#1D214F]">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center bg-white/60 p-3 rounded-2xl">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Number</span>
                  <span className="text-[16px] font-black text-[#1D214F]">{formData.cardNumber}</span>
                </div>
                <div className="flex justify-between items-center bg-white/60 p-3 rounded-2xl">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Expiry</span>
                  <span className="text-[16px] font-black text-[#1D214F]">{formData.expiryDate}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('isSubscribed', 'true');
                      window.dispatchEvent(new Event('storage'));
                    }
                    setShowSuccess(false);
                    router.push('/sessions');
                }}
                className="w-full h-16 bg-[#30C45D] text-white rounded-full text-[20px] font-black shadow-lg shadow-[#30C45D]/30 active:scale-95 transition-transform"
              >
                Go to Dashboard
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
