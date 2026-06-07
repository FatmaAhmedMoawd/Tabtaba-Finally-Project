'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, Sun, CloudRain } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

type Mood = 'DEPRESSED' | 'SAD' | 'NEUTRAL' | 'HAPPY' | 'EXTREMELY';

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
    messageAr: "ضحكتك بتنور الدنيا كلها! يا رب دايماً مبسوط وطاقتك الحلوة مالية المكان.. انشر فرحتك بهجتك حواليك النهاردة 🎉!",
    messageEn: "Your smile lights up everything! May your beautiful energy fill the day with joy. Keep shining and spread the happiness 🎉!",
    icon: Sparkles,
    color: "#22C55E",
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
    emoji: "🌟"
  },
  EXTREMELY: {
    titleAr: "طاقة وسعادة فوق الوصف! 🚀",
    titleEn: "On Top of the World!",
    messageAr: "طاقتك وحماسك يملأ الدنيا بهجة! كمل اليوم بكل شغف وحيوية وانشر السعادة حواليك 🌟.",
    messageEn: "Your energy is absolutely electric! Keep shining bright and share this wonderful vibe with the world today 🌟.",
    icon: Sparkles,
    color: "#30BE4F",
    bg: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    emoji: "🤩"
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

const ExtremelyIcon = ({ className, strokeWidth }: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} className={className}>
    <circle cx="12" cy="12" r="9" />
    <polygon points="8.5,6.2 9,7.7 10.5,7.7 9.3,8.7 9.8,10.2 8.5,9.2 7.2,10.2 7.7,8.7 6.5,7.7 8,7.7" fill="currentColor" stroke="none" />
    <polygon points="15.5,6.2 16,7.7 17.5,7.7 16.3,8.7 16.8,10.2 15.5,9.2 14.2,10.2 14.7,8.7 13.5,7.7 15,7.7" fill="currentColor" stroke="none" />
    <path d="M8 14 Q12 17.5 16 14" strokeLinecap="round" />
  </svg>
);

const MOODS: { id: Mood; labelEn: string; labelAr: string; emoji: string; Icon: React.ElementType }[] = [
  { id: 'DEPRESSED', labelEn: 'DEPRESSED', labelAr: 'مُحبَط', emoji: '😭', Icon: DepressedIcon },
  { id: 'SAD', labelEn: 'SAD', labelAr: 'حزين', emoji: '😢', Icon: SadIcon },
  { id: 'NEUTRAL', labelEn: 'NEUTRAL', labelAr: 'راضي', emoji: '😐', Icon: NeutralIcon },
  { id: 'HAPPY', labelEn: 'HAPPY', labelAr: 'سعيد', emoji: '😊', Icon: HappyIcon },
  { id: 'EXTREMELY', labelEn: 'EXTREMELY', labelAr: 'متحمس جداً', emoji: '🤩', Icon: ExtremelyIcon },
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
    <section className="w-full relative px-4 md:px-0">

      {/* ─── MOBILE LAYOUT (hidden on md+) ─── */}
      <div className="md:hidden flex flex-col items-start py-2">
        {/* Big "mood Vibe" title - left aligned */}
        <div className="mb-5 text-left w-full">
          <h2 className="text-[1.75rem] font-black text-gray-900 tracking-tight leading-tight">
            mood Vibe
          </h2>
        </div>

        {/* 4 moods (no EXTREMELY) - left aligned row */}
        <div className="flex items-center justify-start w-full gap-4 py-2">
          {MOODS.filter(m => m.id !== 'EXTREMELY').map(({ id, labelEn, labelAr, Icon }) => {
            const isSelected = selectedMood === id;
            return (
              <motion.button
                key={id}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleMoodSelect(id)}
                className="group relative flex flex-col items-center gap-1.5 outline-none focus:outline-none cursor-pointer"
                aria-pressed={isSelected}
                aria-label={`Set mood to ${labelEn}`}
              >
                <div
                  className={`w-[65px] h-[65px] rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#30BE4F] text-white shadow-[0_8px_22px_rgba(48,190,79,0.35)] scale-105'
                      : 'bg-[#F3F4F6] text-gray-500'
                  }`}
                >
                  <Icon
                    className="w-7 h-7 select-none transition-colors duration-300"
                    strokeWidth={isSelected ? 2.5 : 2}
                  />
                </div>
                <span className={`text-[10px] font-bold tracking-wider uppercase transition-colors ${
                  isSelected ? 'text-[#30BE4F]' : 'text-gray-500'
                }`}>
                  {language === 'ar' ? labelAr : labelEn}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT (hidden on mobile) ─── */}
      <div className="hidden md:flex w-full bg-[#C8CDD6] rounded-[2.5rem] p-8 flex-col items-center shadow-[0_4px_18px_rgba(0,0,0,0.10)]">
        {/* Desktop subtitle */}
        <div className="mb-6 text-center">
          <h2 className="text-[17px] font-black text-gray-600 tracking-[0.12em] uppercase leading-tight">
            {language === 'ar' ? 'كيف تشعر اليوم؟' : 'How does today feel?'}
          </h2>
        </div>

        {/* All 5 moods */}
        <div className="flex items-center justify-between w-full max-w-xl gap-6 py-2">
          {MOODS.map(({ id, labelEn, labelAr, Icon }) => {
            const isSelected = selectedMood === id;
            return (
              <motion.button
                key={id}
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -2 }}
                onClick={() => handleMoodSelect(id)}
                className="group relative flex flex-col items-center gap-2 outline-none focus:outline-none cursor-pointer"
                aria-pressed={isSelected}
                aria-label={`Set mood to ${labelEn}`}
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#30BE4F] text-white shadow-[0_10px_25px_rgba(48,190,79,0.35)] scale-105'
                      : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                >
                  <Icon
                    className="w-10 h-10 select-none transition-colors duration-300"
                    strokeWidth={isSelected ? 2.5 : 2}
                  />
                </div>
                <span className={`text-xs font-bold tracking-wide transition-colors ${
                  isSelected ? 'text-[#30BE4F] font-extrabold' : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  {language === 'ar' ? labelAr : (id === 'EXTREMELY' ? 'EXCITED' : labelEn)}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Green pill button */}
        <button
          onClick={() => handleMoodSelect(selectedMood)}
          className="mt-6 px-6 py-3 bg-[#30BE4F] hover:bg-[#28A743] text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>✨</span>
          <span>
            {language === 'ar'
              ? `اليوم أشعر بـ: ${currentMoodContent.titleAr}`
              : `Today I feel: ${selectedMood === 'EXTREMELY' ? 'Extremely Happy' : (selectedMood.charAt(0) + selectedMood.slice(1).toLowerCase())}`}
          </span>
        </button>
      </div>

      {/* ─── Mood alert modal ─── */}
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

      {/* ─── Lightweight toast ─── */}
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

