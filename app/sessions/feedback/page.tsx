'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Calendar,
  Heart
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function SessionFeedbackPage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [helpful, setHelpful] = useState<boolean | null>(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Highly encouraging and positive messages for each star level (Arabic & English)
  // Each star level increases on the amount of motivation, positivity, and warmth!
  const ratingDetails = [
    {
      label: 'CATASTROPHIC EXPERIENCE',
      color: 'text-rose-500',
      arabic: 'كل خطوة في مبارزتك مع الصعاب هي شجاعة حتّى لو كانت الجلسة صعبة اليوم! نحن فخورون بك جداً وسندعمك دائماً للوصول إلى السلام النفسي وعلاج جراحك! 💚',
      english: "Every step in your journey is an act of deep courage. Even the hardest sessions are foundations for pathbreaking growth."
    },
    {
      label: 'POOR EXPERIENCE',
      color: 'text-orange-500',
      arabic: 'شكراً لمشاركتك شجاعتك معنا اليوم! خطوة بخطوة، وصبرك ولطفك مع ذاتك هما مفاتيح الشفاء والراحة والتعافي. غداً سيكون أفضل بمشيئة الله! 🌸',
      english: "Thank you for sharing your brave spirit today. Patience and self-love are keys to healing."
    },
    {
      label: 'AVERAGE EXPERIENCE',
      color: 'text-amber-500',
      arabic: 'تقدم رائع ويوم طيب! التعافي ليس خطاً مستقيماً بل خطوات صغيرة ومستمرة، وتواجدك هنا اليوم والمحاولة هي بحد ذاتها انتصار عظيم تفتخر به! ✨',
      english: "Wonderful progress today! Healing is not a straight line, but a series of small, beautiful efforts."
    },
    {
      label: 'VERY GOOD EXPERIENCE',
      color: 'text-[#22C55E]',
      arabic: 'جلسة ممتازة وتقدّم ملحوظ يسرّ القلب! شغفك ومثابرتك من أجل ذاتك يملأنا فخراً واعتزازاً، وخطواتك نحو السكينة تزهر يوماً بعد يوم بجمال مبهر! 🌟',
      english: "An excellent session and noticeable progress! Your dedication and passion fill us with immense pride."
    },
    {
      label: 'GREAT EXPERIENCE',
      color: 'text-[#22C55E]',
      arabic: 'قمّة الروعة والجمال! أنت تصنع المعجزات وتتقدم بخطى ملهمة وقوية في طريق السلام والتعافي. فخورون جداً وبعمق بوعيك البطل وشجاعتك الصادقة! 🎉',
      english: "Pure excellence! You are working absolute miracles on your path toward peace and emotional wellbeing."
    }
  ];

  const currentDetails = ratingDetails[Math.max(0, Math.min(rating - 1, 4))];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to localStorage so it is dynamic
    if (typeof window !== 'undefined') {
      const customReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
      const savedEmail = localStorage.getItem('profile_email');
      const emailPrefix = savedEmail ? savedEmail.split('@')[0] : '';
      const emailName = emailPrefix ? emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1) : 'User';
      const savedName = localStorage.getItem('profile_fullName') || emailName;
      const savedAvatarRaw = localStorage.getItem('profile_avatar');
      const savedAvatar = (savedAvatarRaw && !savedAvatarRaw.includes('photo-160774')) ? savedAvatarRaw : '';
      
      const newReview = {
        id: Date.now(),
        name: savedName,
        avatar: savedAvatar,
        time: 'Just now',
        rating: rating,
        text: feedbackMessage || 'Excellent session! Very helpful and somatic practices were beautifully integrated.',
        likes: 0,
        helpful: true,
      };
      localStorage.setItem('userReviews', JSON.stringify([newReview, ...customReviews]));
    }

    // Simulate API call to submit feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Navigate to reviews list page after submission
      setTimeout(() => {
        router.push('/sessions/reviews');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDF4FA] via-[#F4F9FF] to-[#FAF6ED] font-sans relative overflow-x-hidden pb-12">
      
      {/* Ambient Glowing Light Blobs in Backdrop */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-[#30C45D]/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[300px] h-[300px] bg-[#FAE2B9]/15 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md md:max-w-5xl mx-auto px-4 md:px-6 pt-4 flex flex-col items-center">
        
        {/* Header Navigation */}
        <header className="flex items-center justify-between py-2 relative z-10 w-full mb-4">
          <button 
            type="button" 
            onClick={() => router.push('/dashboard')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 hover:text-[#30C45D] hover:bg-slate-50 border border-slate-100/80 transition-all cursor-pointer shadow-sm active:scale-95"
            id="back-button-feedback"
            aria-label="Back"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-transparent" aria-hidden="true" id="more-options-feedback" />
        </header>



        {/* 2. BOTTOM RESPONSIVE GRID LAYOUT (Doctor profile & feedback details) */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full relative z-10 mb-6">
          
          {/* Left Column: Doctor Profile & Language Switcher */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-4">
            
            {/* Doctor Profile Card */}
            <div className="bg-white rounded-[32px] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.015)] border border-slate-100/80 flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-3">
                <div className="absolute inset-0 bg-white rounded-full ring-4 ring-[#30C45D]/10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" 
                    alt="Dr. Serene" 
                    fill
                    priority
                    className="object-cover scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-7 h-7 bg-gradient-to-tr from-[#C084FC] to-[#D8B4FE] border-2 border-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>

              <h3 className="text-[20px] font-black text-slate-800 leading-tight">Dr. Serene</h3>
              <p className="text-[13.5px] font-[600] text-slate-500 mt-0.5">Clinical Psychologist</p>
              
              <div className="w-full h-[1px] bg-slate-100 my-4" />

              <span className="text-[14px] font-black text-slate-800 block mb-1">How was your session?</span>
              <p className="text-[12.5px] font-semibold text-slate-450 max-w-[220px]">
                Your feedback helps us create a better sanctuary for everyone.
              </p>
            </div>

            {/* Language Switcher Card */}
            <div className="bg-white rounded-[32px] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.015)] border border-slate-100/80 flex flex-col gap-3">
              <span className="text-xs font-black text-slate-800 tracking-tight block">
                Language / اللغة
              </span>
              <div className="flex gap-2 p-1 bg-[#F3F4F6] rounded-full">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-2 text-center rounded-full text-xs font-black transition-all ${
                    language === 'en'
                      ? 'bg-[#0D7A39] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('ar')}
                  className={`flex-1 py-2 text-center rounded-full text-xs font-black transition-all ${
                    language === 'ar'
                      ? 'bg-[#0D7A39] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Feedback Details Card */}
          <div className="col-span-1 md:col-span-7 bg-white rounded-[32px] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.015)] border border-slate-100/80 flex flex-col gap-5">
            
            {/* Session Rating Stars */}
            <div className="flex flex-col gap-2">
              <span className="text-[14.5px] font-black text-slate-800 block">
                Session Rating
              </span>
              <div className="flex gap-1.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = star <= (hoverRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-emerald-500 hover:scale-110 transition-transform duration-150 p-1 cursor-pointer"
                      id={`star-rating-${star}`}
                    >
                      <Star 
                        size={32} 
                        className={`transition-all duration-200 ${
                          isActive 
                            ? 'fill-[#22C55E] text-[#22C55E]' 
                            : 'text-slate-200 fill-none'
                        }`} 
                        strokeWidth={2.5}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Feedback Level Tag */}
              <AnimatePresence mode="wait">
                <motion.span 
                  key={rating}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`text-[11px] font-black tracking-widest mt-1.5 uppercase transition-colors duration-200 ${currentDetails.color}`}
                >
                  {currentDetails.label}
                </motion.span>
              </AnimatePresence>

              {/* Dynamic Encouraging Message (Arabic emphasis with gorgeous layout) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`msg-${rating}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 px-3.5 py-3 bg-[#F4FBF6] border border-[#E2F5E8]/80 text-[#0E522E] rounded-2xl w-full text-center relative overflow-hidden shadow-xs"
                >
                  <div className="absolute top-1 right-2 opacity-15">
                    <Sparkles size={16} className="text-[#30C45D]" />
                  </div>
                  <p className="text-[13.5px] font-bold leading-relaxed text-[#0F6032] text-center" dir="rtl">
                    {currentDetails.arabic}
                  </p>
                  <p className="text-[11px] font-[500] text-slate-400 mt-2 leading-tight">
                    {currentDetails.english}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Support Doctor Helpful? Yes/No Section */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100/60">
              <span className="text-[14.5px] font-black text-slate-800 block">
                Was the doctor helpful?
              </span>
              
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setHelpful(false)}
                  className={`py-3 px-4 rounded-full text-sm font-bold tracking-wide transition-all duration-200 border cursor-pointer ${
                    helpful === false
                      ? 'bg-rose-50 border-rose-200 text-rose-600 font-extrabold shadow-sm'
                      : 'bg-[#F3F4F6] border-transparent text-[#4B5563] hover:bg-slate-200'
                  }`}
                  id="doctor-helpful-no"
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => setHelpful(true)}
                  className={`py-3 px-4 rounded-full text-sm font-bold tracking-wide transition-all duration-200 border cursor-pointer ${
                    helpful === true
                      ? 'bg-[#22C55E] border-transparent text-white font-extrabold shadow-md shadow-[#22C55E]/10'
                      : 'bg-[#F3F4F6] border-transparent text-[#4B5563] hover:bg-slate-200'
                  }`}
                  id="doctor-helpful-yes"
                >
                  Yes
                </button>
              </div>
            </div>

            {/* Custom Feedback Textbox Section */}
            <div className="flex flex-col gap-2">
              <label htmlFor="user-message-textarea" className="text-[14.5px] font-black text-slate-800 block">
                Tell us more about your experience...
              </label>
              
              <textarea
                id="user-message-textarea"
                rows={3}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Share your thoughts here..."
                className="w-full bg-[#F3F4F6]/60 border border-slate-150 p-4 rounded-2xl text-[14px] font-semibold text-slate-800 placeholder-slate-400/80 focus:outline-none focus:ring-2 focus:ring-[#30C45D]/15 focus:border-[#30C45D] transition-all duration-200 resize-none"
              />
            </div>

            {/* Large Gradient Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0D7A39] hover:bg-[#0A602D] py-3.5 px-6 rounded-3xl font-black text-[16px] text-white transition-all flex justify-center items-center gap-2 shadow-lg shadow-emerald-700/10 active:scale-[0.98] cursor-pointer mt-1 relative overflow-hidden"
              id="submit-feedback-button"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving Review...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 w-full">
                  <span>Submit Feedback</span>
                  <ArrowRight size={18} strokeWidth={3} className="ml-1" />
                </div>
              )}
            </button>

          </div>

        </form>

        {/* Footer caption */}
        <div className="text-center py-2 relative z-10">
          <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase select-none leading-relaxed px-4">
            YOUR FEEDBACK IS ANONYMOUS AND HELPS US IMPROVE OUR SERVICE.
          </p>
        </div>

      </div>

      {/* SUCCESS MODAL / SHEET overlay */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[20000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] p-8 w-full max-w-sm relative z-10 shadow-2xl border border-slate-100 flex flex-col items-center text-center overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-100 rounded-full filter blur-xl opacity-60"></div>
              
              <div className="w-20 h-20 bg-emerald-100/55 rounded-full flex items-center justify-center text-emerald-600 mb-5 border-2 border-emerald-50">
                <CheckCircle size={44} strokeWidth={2.5} className="text-[#22C55E]" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2">
                Thank you so much! ❤️
              </h3>
              
              <p className="text-[14px] font-semibold text-slate-500 max-w-[245px] leading-relaxed mb-1">
                Your feedback was delivered anonymously and will help us keep growing.
              </p>

              <div className="w-full h-1 bg-slate-100 rounded-full mt-6 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.2 }}
                  className="absolute top-0 left-0 bottom-0 bg-[#22C55E]"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Decorative App Store Style Home Handle Bar overlay */}
      <div className="w-full max-w-md mx-auto flex justify-center pt-4 pb-2 select-none pointer-events-none">
        <div className="w-32 h-[5px] bg-slate-300 rounded-full opacity-50"></div>
      </div>

    </div>
  );
}
