'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, Sun, CloudRain } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

type Mood = 'DEPRESSED' | 'SAD' | 'NEUTRAL' | 'HAPPY';

const MOOD_CONTENT = {
  DEPRESSED: {
    titleAr: "أنا حاسس بيك 🫂",
    titleEn: "It's Okay to Not Be Okay",
    messageAr: "يا غالي، عادي جداً نمر بأيام صعبة.. فضفضلي وخلينا ناخد نفس عميق سوا 🫶. أنا جمبك ودايماً هسمعك وطبطبة معاك خطوة بخطوة.",
    messageEn: "I'm here for you. Take a deep breath 🫶. It's totally okay to not be okay. Remember, you're never alone and we are here step by step.",
    icon: CloudRain,
    color: "#4B5563",
    bg: "bg-gradient-to-br from-slate-50 to-slate-150 border-slate-200",
    emoji: "🫂"
  },
  SAD: {
    titleAr: "طبطبة على قلبك 💜",
    titleEn: "Sending Warm Hugs",
    messageAr: "الزعل مجرد سحابة وهتعدي.. قلبك هيرجع ينور تاني. خد وقتك الكامل، طبطب على نفسك ودلعها ووفر لها الراحة النهاردة 💜.",
    messageEn: "This sadness is just a passing cloud. Your heart will smile and shine again soon. Be gentle with yourself and find comfort today 💜.",
    icon: Heart,
    color: "#7C3AED",
    bg: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    emoji: "💜"
  },
  NEUTRAL: {
    titleAr: "هدوء وسلام داخلي ✨",
    titleEn: "Balanced and Grounded",
    messageAr: "يوم هادي ولطيف.. فرصة مثالية تركز على حضورك الداخلي، تتنفس بوعي، وتستمتع بجمال وسلام اللحظة دي 🌿.",
    messageEn: "A calm and quiet day. Take this beautiful opportunity to breathe mindfully, ground yourself, and enjoy the peace of the present 🌿.",
    icon: Sun,
    color: "#D97706",
    bg: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200",
    emoji: "✨"
  },
  HAPPY: {
    titleAr: "يا جمال ضحكتك وسعادتك! 🌟",
    titleEn: "Radiant Feelings",
    messageAr: "ضحكتك بتنور الدنيا كلها! يا رب دايماً مبسوط وطاقتك الحلوة مالية المكان.. انشر فرحتك وبهجتك حواليك النهاردة 🎉!",
    messageEn: "Your smile lights up everything! May your beautiful energy fill the day with joy. Keep shining and spread the happiness 🎉!",
    icon: Sparkles,
    color: "#22C55E",
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
    emoji: "🌟"
  }
};

const DepressedIcon = ({ className, strokeWidth }: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 9.5l2-2 M8.5 7.5l2 2" strokeLinecap="round" />
    <path d="M13.5 9.5l2-2 M13.5 7.5l2 2" strokeLinecap="round" />
    <path d="M8 15.5 Q12 13.5 16 15.5" strokeLinecap="round" />
  </svg>
);

const SadIcon = ({ className, strokeWidth }: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
    <path d="M8 15.5 Q12 13.5 16 15.5" strokeLinecap="round" />
  </svg>
);

const NeutralIcon = ({ className, strokeWidth }: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
    <line x1="8" y1="14.5" x2="16" y2="14.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HappyIcon = ({ className, strokeWidth }: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
    <path d="M8 14 Q12 17 16 14" strokeLinecap="round" />
  </svg>
);

const MOODS: { id: Mood; labelEn: string; labelAr: string; emoji: string; Icon: React.ElementType }[] = [
  { id: 'DEPRESSED', labelEn: 'Depressed', labelAr: 'مُحبَط', emoji: '😭', Icon: DepressedIcon },
  { id: 'SAD', labelEn: 'Sad', labelAr: 'حزين', emoji: '😢', Icon: SadIcon },
  { id: 'NEUTRAL', labelEn: 'Neutral', labelAr: 'راضي', emoji: '😐', Icon: NeutralIcon },
  { id: 'HAPPY', labelEn: 'Happy', labelAr: 'سعيد', emoji: '😊', Icon: HappyIcon },
];

export const MoodSelector: React.FC = () => {
  const { language } = useLanguage();
  const [selectedMood, setSelectedMood] = useState<Mood>('NEUTRAL');
  const [showAlert, setShowAlert] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const SUPPRESS_POPUPS_KEY = 'disableMoodPopups';
  // Default: suppress popups entirely unless explicitly set to 'false' in localStorage
  const [suppressPopups, setSuppressPopups] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem(SUPPRESS_POPUPS_KEY);
      Promise.resolve().then(() => {
        if (val === 'true') setSuppressPopups(true);
        else if (val === 'false') setSuppressPopups(false);
        else setSuppressPopups(true);
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }, []);

  // Prevent background scrolling on mobile & lock viewport to avoid scrolls/pulling
  useEffect(() => {
    if (showAlert) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [showAlert]);

  const handleMoodSelect = (id: Mood) => {
    setSelectedMood(id);
    // If popups are suppressed, show a lightweight toast instead of the modal
    if (!suppressPopups) {
      setShowAlert(true);
    } else {
      setShowToast(true);
    }
  };

  // Toast state and auto-dismiss
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    let t: any;
    if (showToast) {
      t = setTimeout(() => setShowToast(false), 2500);
    }
    return () => clearTimeout(t);
  }, [showToast]);

  const currentMoodContent = MOOD_CONTENT[selectedMood];

  return (
    <section className="w-full px-4 md:px-8 mt-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-[20px] sm:text-[22px] font-black text-[#111827] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>
            {language === 'ar' ? 'كيف تشعر اليوم؟ ✨' : 'How are you feeling today? ✨'}
          </h2>
          <p className="mt-2 text-[13.5px] sm:text-[14px] text-slate-500 max-w-2xl leading-6">
            {language === 'ar'
              ? 'اختار الحالة اللي بتحس بيها دلوقتي وخلي النصيحة تبقى مخصوصة للمزاج بتاعك.'
              : 'Select your mood and receive a calm, supportive message tailored to how you feel right now.'}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-3xl mx-auto w-full pb-6 pt-3 px-1 sm:px-0">
          {MOODS.map(({ id, labelEn, labelAr, emoji }) => {
            const isSelected = selectedMood === id;
            return (
              <motion.button
                key={id}
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -3 }}
                onClick={() => handleMoodSelect(id)}
                className={`group relative flex flex-col items-center justify-center rounded-[20px] sm:rounded-[26px] border p-2.5 sm:p-4 min-h-[96px] sm:min-h-[132px] transition-all duration-300 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E]/40 focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white border-transparent shadow-[0_15px_30px_rgba(34,197,94,0.15)] sm:shadow-[0_22px_45px_rgba(34,197,94,0.18)]'
                    : 'bg-white border border-slate-200 text-slate-700 shadow-sm hover:border-slate-300 hover:shadow-md'
                }`}
                aria-pressed={isSelected}
                aria-label={`Set mood to ${labelEn}`}
              >
                <span className="text-[28px] sm:text-[40px] mb-1.5 sm:mb-2 select-none">{emoji}</span>
                <span className={`text-[10.5px] sm:text-[13px] font-extrabold tracking-[0.01em] sm:tracking-[0.02em] leading-tight ${isSelected ? 'text-white' : 'text-slate-600'}`}>
                  {language === 'ar' ? labelAr : labelEn}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showAlert && isMounted && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAlert(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm z-[999998]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              className="relative w-full max-w-[360px] rounded-[32px] border border-white/70 bg-white/95 shadow-[0_30px_80px_rgba(15,23,42,0.18)] overflow-hidden z-[1000001] mx-2 sm:mx-0"
            >
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-[#22C55E]/15 via-white to-[#22C55E]/10" />
              <div className="relative p-6 pt-8">
                <button
                  onClick={() => setShowAlert(false)}
                  className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close"
                >
                  <X size={16} strokeWidth={2.2} />
                </button>

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F8FAF9] border border-slate-200 shadow-sm">
                  <currentMoodContent.icon size={28} strokeWidth={1.7} className="text-[#22C55E]" />
                </div>

                <h3 className="text-[20px] sm:text-[22px] font-black text-slate-900 text-center mb-2" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                  {language === 'ar' ? currentMoodContent.titleAr : currentMoodContent.titleEn}
                </h3>

                <p className="text-[13.5px] sm:text-[14px] text-slate-600 leading-7 text-center mb-5 px-1" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                  {language === 'ar' ? currentMoodContent.messageAr : currentMoodContent.messageEn}
                </p>

                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-[13px] text-slate-500 mb-5">
                  {language === 'ar'
                    ? 'دعمنا معاك ومفيش مشكلة كبيرة، كل يوم جديد فرصة أكثر هدوءاً.'
                    : 'You are seen, heard, and supported — one step at a time.'}
                </div>

                <button
                  onClick={() => setShowAlert(false)}
                  className="w-full rounded-[18px] bg-[#111827] py-3 text-sm font-black uppercase tracking-[0.02em] text-white transition hover:bg-slate-900 active:scale-[0.98]"
                >
                  {language === 'ar' ? 'حلو كده' : 'Sounds good'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightweight toast shown instead of modal when popups are suppressed */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed left-1/2 top-6 z-[1000002] -translate-x-1/2"
          >
            <div className="max-w-[92vw] sm:max-w-sm mx-auto rounded-[26px] border border-slate-200/80 bg-white/95 shadow-[0_18px_60px_rgba(15,23,42,0.15)] px-5 py-4 text-center backdrop-blur-sm">
              <div className="mb-1 text-sm font-black text-slate-900 tracking-tight">
                {language === 'ar' ? MOOD_CONTENT[selectedMood].titleAr : MOOD_CONTENT[selectedMood].titleEn}
              </div>
              <div className="text-[12.8px] leading-5 text-slate-600/90">
                {language === 'ar' ? MOOD_CONTENT[selectedMood].messageAr : MOOD_CONTENT[selectedMood].messageEn}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
