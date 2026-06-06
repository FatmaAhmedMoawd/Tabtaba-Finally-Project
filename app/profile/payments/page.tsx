'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  Check, 
  X,
  Sparkles,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type BillingCycle = 'monthly' | 'yearly';

interface Feature {
  text: string;
  included: boolean;
  subtext?: string;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  currency: string;
  features: Feature[];
  buttonText: string;
  recommended: boolean;
}

export default function PaymentsPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [showAuthRequiredModal, setShowAuthRequiredModal] = useState(false);

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

  const handlePlanSelect = (plan: Plan) => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('profile_email');
      if (!email) {
        setShowAuthRequiredModal(true);
        return;
      }
    }
    router.push(`/profile/payments/checkout?plan=${plan.name}&price=${plan.price}&cycle=${billingCycle}`);
  };

  const plans: Record<BillingCycle, Plan[]> = {
    monthly: [
      {
        name: 'Standard',
        description: 'Essential support for your daily practice.',
        price: '150',
        currency: 'EGP/mo',
        features: [
          { text: '2 Clinical Sessions', included: true },
          { text: 'Standard Booking Access', included: true },
          { text: 'No Crisis Chat Access', included: false },
        ],
        buttonText: 'Get Started',
        recommended: false,
      },
      {
        name: 'TBTABA Care',
        description: 'Comprehensive clinical sanctuary for specialists.',
        price: '200',
        currency: 'EGP/mo',
        features: [
          { text: '4 Sessions', subtext: 'Double the capacity', included: true },
          { text: 'Priority Booking', subtext: 'Always get your preferred slot', included: true },
          { text: 'Crisis Chat', subtext: '24/7 immediate clinical response', included: true },
        ],
        buttonText: 'Upgrade to Care',
        recommended: true,
      },
    ],
    yearly: [
      {
        name: 'Standard',
        description: 'Essential support for your daily practice.',
        price: '600',
        currency: 'EGP/mo',
        features: [
          { text: '12 Clinical Sessions', included: true },
          { text: 'Standard Booking Access', included: true },
          { text: 'No Crisis Chat Access', included: false },
        ],
        buttonText: 'Get Started',
        recommended: false,
      },
      {
        name: 'TBTABA Care',
        description: 'Comprehensive clinical sanctuary for specialists.',
        price: '1160',
        currency: 'EGP/mo',
        features: [
          { text: '26Sessions', subtext: 'Double the capacity', included: true },
          { text: 'Priority Booking', subtext: 'Always get your preferred slot', included: true },
          { text: 'Crisis Chat', subtext: '24/7 immediate clinical response', included: true },
        ],
        buttonText: 'Upgrade to Yearly Care',
        recommended: true,
      },
    ],
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8FBFF] font-inter pb-12 relative overflow-x-hidden">
      {/* Background blobs for depth */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#30C45D]/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] bg-blue-100/30 blur-[80px] rounded-full -ml-10"></div>

      {/* Header Area */}
      <div className="pt-8 px-6 flex items-center justify-between relative z-10">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#30C45D] border border-gray-100 hover:scale-110 transition-transform"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
      </div>

      <div className="px-6 mt-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[34px] font-[900] text-[#1D214F] leading-tight mb-4"
        >
          Choose Your Path to Wellness
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#5C7182] text-[17px] font-medium leading-relaxed max-w-[320px] mx-auto px-2"
        >
          Select the plan that best fits your clinical needs and personal growth journey.
        </motion.p>
      </div>

      {/* Billing Toggle */}
      <div className="mt-10 flex flex-col items-center gap-4 relative z-10 px-6">
        <div className="bg-[#E5E7EB]/50 p-1.5 rounded-[22px] flex items-center w-full max-w-[300px]">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`flex-1 py-3.5 rounded-[18px] text-[15px] font-[700] transition-all duration-300 relative z-10 ${
              billingCycle === 'monthly' ? 'text-[#1D214F]' : 'text-[#5C7182]'
            }`}
          >
            {billingCycle === 'monthly' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-[18px] shadow-sm z-[-1]"
                transition={{ type: 'spring', duration: 0.6 }}
              />
            )}
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            className={`flex-1 py-3.5 rounded-[18px] text-[15px] font-[700] transition-all duration-300 relative z-10 ${
              billingCycle === 'yearly' ? 'text-[#1D214F]' : 'text-[#5C7182]'
            }`}
          >
            {billingCycle === 'yearly' && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-[18px] shadow-sm z-[-1]"
                transition={{ type: 'spring', duration: 0.6 }}
              />
            )}
            Yearly
          </button>
        </div>

        {/* Promo Badge */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={billingCycle}
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -5 }}
            className="bg-[#30C45D] text-white px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md shadow-[#30C45D]/20 origin-bottom"
          >
            <Sparkles size={14} />
            <span className="text-[12px] font-black uppercase tracking-wider">
              {billingCycle === 'monthly' ? 'SAVE 20%' : 'SAVE 20% ON YEARLY PLANS'}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Plans Container */}
      <div className="mt-8 px-6 w-full max-w-lg md:max-w-4xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={billingCycle}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:grid md:grid-cols-2 gap-8 w-full"
          >
            {plans[billingCycle].map((plan, idx) => (
              <div 
                key={idx}
                className={`relative rounded-[36px] p-8 border-2 ${
                  plan.recommended 
                    ? 'bg-white border-[#0056D2] shadow-2xl shadow-blue-500/10' 
                    : 'bg-white border-transparent shadow-xl shadow-gray-200/50'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-[#065F46] text-white px-6 py-2.5 rounded-bl-[20px] rounded-tr-[34px] text-[12px] font-black uppercase tracking-wider">
                    RECOMMENDED
                  </div>
                )}

                <h2 className="text-[26px] font-[900] text-[#1D214F] mb-2">{plan.name}</h2>
                <p className="text-[#5C7182] text-[16px] font-medium leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-[48px] font-black text-[#1D214F] leading-none">{plan.price}</span>
                  <span className="text-[17px] font-bold text-[#5C7182]">{plan.currency}</span>
                </div>

                <div className="space-y-5 mb-10">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-4">
                      <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        feature.included 
                          ? plan.recommended ? 'bg-[#0056D2] text-white' : 'bg-transparent border-2 border-[#0056D2] text-[#0056D2]'
                          : 'bg-transparent border-2 border-[#D1D5DB] text-[#D1D5DB]'
                      }`}>
                        {feature.included ? (
                          <Check size={14} strokeWidth={4} />
                        ) : (
                          <X size={14} strokeWidth={4} />
                        )}
                      </div>
                      <div>
                        <p className={`text-[17px] font-bold ${feature.included ? 'text-[#1D214F]' : 'text-[#6B7280]'}`}>
                          {feature.text}
                        </p>
                        {feature.subtext && (
                          <p className="text-[14px] font-medium text-[#6B7280]">
                            {feature.subtext}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-5 rounded-[22px] text-[19px] font-black transition-all ${
                    plan.recommended 
                      ? 'bg-gradient-to-r from-[#31C15D] to-[#065F46] text-white shadow-lg shadow-green-500/30' 
                      : 'border-2 border-[#0056D2] text-[#0056D2] hover:bg-blue-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Auth required Modal overlay */}
      {showAuthRequiredModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)] border border-gray-100 max-w-[380px] w-full text-center relative z-[100001] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-[#EF4444] border-2 border-red-100">
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
                onClick={() => setShowAuthRequiredModal(false)}
                className="w-full py-3.5 text-gray-400 hover:text-gray-600 font-bold text-[14px] transition-colors mt-1 cursor-pointer"
              >
                Cancel / إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iPhone Home Indicator */}
      <div className="mt-12 pb-3 flex justify-center">
        <div className="w-[130px] h-1.5 bg-gray-200 rounded-full opacity-60"></div>
      </div>
    </div>
  );
}
