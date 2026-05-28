'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Star, Send, X, Check,
  MessageSquare, Wifi, Heart,
  ChevronLeft
} from 'lucide-react';

export default function SessionCompletePage() {
  const router = useRouter();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  const feelings = [
    { label: 'Relieved', emoji: '😌' },
    { label: 'Happier', emoji: '☀️' },
    { label: 'Calmer', emoji: '🧘' },
    { label: 'Grateful', emoji: '🙏' },
    { label: 'Anxious', emoji: '🥺' }
  ];

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    
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
        text: feedbackText || 'Very successful session! Learned so much about breathing anchors and mindfulness integration.',
        likes: 0,
        helpful: true,
      };
      localStorage.setItem('userReviews', JSON.stringify([newReview, ...customReviews]));
    }

    setTimeout(() => {
      setShowFeedbackModal(false);
      // Reset and redirect after transition closes
      setTimeout(() => {
        setFeedbackSubmitted(false);
        setFeedbackText('');
        setRating(5);
        setSelectedFeeling(null);
        router.push('/sessions/reviews');
      }, 300);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F8FB] via-[#FBFBFB] to-[#FEFAF2] font-sans relative flex flex-col items-center justify-between pb-12 w-full overflow-x-hidden">
      
      {/* Top Main Container to limit max width on desktop */}
      <div className="w-full max-w-md mx-auto px-6 pt-4 flex flex-col items-center flex-1">
        


        {/* Floating Back-to-Dashboard handle */}
        <div className="w-full flex justify-start pt-2">
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-slate-500 rounded-full text-xs font-bold shadow-sm hover:bg-slate-50 transition-all border border-slate-100"
            id="btn-back-dashboard"
          >
            <ChevronLeft size={14} strokeWidth={2.5} />
            الرئيسية / Dashboard
          </button>
        </div>

        {/* Screen Title (Matched precisely to image text & alignment) */}
        <div className="text-center mt-6 mb-8">
          <h1 className="text-[26px] font-black text-slate-900 tracking-tight">
            Session Complete
          </h1>
          <p className="text-[15px] font-[600] text-slate-500 mt-1">
            Take a moment to breathe.
          </p>
        </div>

        {/* Content Card (Matched precisely to image layout with green heart container and blurred background glowing light blobs) */}
        <div className="w-full bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100/60 relative overflow-hidden flex flex-col items-center text-center">
          
          {/* Ambient Glowing Green Background blobs for visual premiumness */}
          <div className="absolute top-0 right-0 w-[140px] h-[140px] bg-gradient-to-br from-[#E8F8EC] to-transparent rounded-full filter blur-2xl opacity-85 pointer-events-none select-none"></div>
          <div className="absolute -bottom-10 -left-10 w-[120px] h-[120px] bg-gradient-to-tr from-[#ECFAF9]/50 to-transparent rounded-full filter blur-xl opacity-60 pointer-events-none select-none"></div>

          {/* Glowing pulse rings around Heart Icon */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-6 mt-2">
            <motion.div 
              className="absolute inset-0 bg-[#30C45D]/10 rounded-full filter blur-sm"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.4, 0.6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute w-[92px] h-[92px] bg-gradient-to-b from-white to-[#F2FBF5] rounded-full shadow-[0_8px_20px_rgba(48,196,93,0.06)] flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <Heart size={44} className="text-[#30C45D] fill-[#30C45D] filter drop-shadow-[0_2px_8px_rgba(48,196,93,0.15)] animate-pulse" />
            </div>
          </div>

          {/* Heading Text inside the Card */}
          <h2 className="text-[#30C45D] font-black text-[25px] leading-tight mb-3">
            Session Completed
          </h2>

          {/* Supportive Paragraph */}
          <p className="text-slate-600 font-medium text-[15px] leading-relaxed max-w-[280px]">
            You&apos;ve taken a wonderful step for your mental wellbeing today. How are you feeling?
          </p>
        </div>

        {/* Buttons and Reflection Layout */}
        <div className="w-full flex flex-col items-center mt-6 gap-4">
          
          {/* 1. Book Next Session Solid Green Pill Button */}
          <button
            onClick={() => router.push('/sessions/feedback')}
            className="w-full bg-gradient-to-r from-[#29B055] to-[#0D7A39] hover:brightness-[103%] hover:shadow-emerald-500/20 active:scale-[0.98] text-white py-4 px-6 rounded-3xl font-black text-[16px] transition-all flex justify-center items-center gap-3 shadow-lg shadow-emerald-500/10 cursor-pointer"
            id="book-next-session"
          >
            <Calendar size={18} strokeWidth={3} />
            <span>Book Next Session</span>
          </button>

          {/* 2. Leave Feedback Outline Styled Button */}
          <button
            onClick={() => router.push('/sessions/feedback')}
            className="w-full bg-slate-50/50 hover:bg-slate-50 text-[#0D7A39] border border-slate-200 py-4 px-6 rounded-3xl font-black text-[16px] transition-all flex justify-center items-center gap-3 active:scale-[0.98] cursor-pointer"
            id="leave-feedback"
          >
            <MessageSquare size={18} strokeWidth={3} />
            <span>Leave Feedback</span>
          </button>

          {/* 3. Daily Reflection Section Pill matched exactly to color and size of screen */}
          <div className="flex flex-col items-center mt-6 w-full">
            <span className="bg-[#FAE9F5] text-[#A21CAF] font-black tracking-widest text-[10.5px] px-4.5 py-1.5 rounded-full uppercase inline-block mb-3.5 shadow-sm/5 select-none font-sans">
              DAILY REFLECTION
            </span>

            {/* Reflection Quotation precisely centered and styled */}
            <p className="text-slate-600 font-semibold italic text-[14.5px] leading-relaxed text-center px-4 max-w-[310px] select-text">
              &ldquo;Healing is not linear, but every session is a dot on the path to a brighter landscape.&rdquo;
            </p>
          </div>

        </div>

      </div>

      {/* Decorative App Store Style Home Handle Bar overlay */}
      <div className="w-full max-w-md mx-auto flex justify-center pt-8 select-none pointer-events-none">
        <div className="w-32 h-[5px] bg-slate-200 rounded-full opacity-60"></div>
      </div>

      {/* INTERACTIVE MODAL FOR LEAVING FEEDBACK (Fully premium interactive component) */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-[10000] flex items-end justify-center sm:items-center p-0 sm:p-4">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowFeedbackModal(false)}
            />

            {/* Modal Box Sheet */}
            <motion.div 
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md p-6 relative z-10 shadow-2xl border border-slate-100 flex flex-col overflow-hidden max-h-[90vh]"
            >
              
              {/* Header row */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xl font-bold font-sans text-slate-900">
                    We value your feedback! ❤️
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    Share your feelings about Dr. Elena Aris
                  </p>
                </div>
                <button 
                  onClick={() => setShowFeedbackModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              {!feedbackSubmitted ? (
                <form onSubmit={handleSubmitFeedback} className="flex flex-col gap-5 select-none">
                  
                  {/* Rating Stars Section */}
                  <div className="flex flex-col items-center justify-center bg-slate-50/50 py-3 rounded-2xl border border-slate-100">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">RATING</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-amber-400 hover:scale-125 transition-transform duration-100 cursor-pointer"
                        >
                          <Star 
                            size={32} 
                            className={`${
                              star <= (hoverRating || rating) 
                                ? 'fill-[#EAB308] text-[#EAB308]' 
                                : 'text-slate-200 fill-none'
                            } transition-colors`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Emotional Feedback Emojis */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block px-1">How are you feeling now?</span>
                    <div className="grid grid-cols-5 gap-2">
                      {feelings.map((feeling) => (
                        <button
                          key={feeling.label}
                          type="button"
                          onClick={() => setSelectedFeeling(feeling.label)}
                          className={`py-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-center border cursor-pointer ${
                            selectedFeeling === feeling.label 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 scale-102 font-bold ring-1 ring-emerald-300/20' 
                              : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-2xl">{feeling.emoji}</span>
                          <span className="text-[10px] uppercase font-black tracking-wide leading-none">{feeling.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Textarea Input */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block px-1">Tell us more (Optional)</span>
                    <textarea
                      className="w-full border border-slate-150 p-4 rounded-2xl font-bold text-[14px] text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#30C45D]/15 focus:border-[#30C45D] transition-all min-h-[90px] resize-none"
                      placeholder="Was the audio and connection solid? How did you like the session topics?"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />
                  </div>

                  {/* Submit Call-to-action */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#29B055] to-[#0D7A39] hover:brightness-[104%] text-white py-4 px-6 rounded-2xl font-black text-[15px] transition-all flex justify-center items-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer mt-2"
                  >
                    <Send size={15} strokeWidth={3} />
                    Submit Review
                  </button>

                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                    <Check size={36} strokeWidth={3.5} className="animate-scaleUp" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">
                    Review Submitted Successfully!
                  </h3>
                  <p className="text-sm font-semibold text-slate-400">
                    Thank you for helping us grow better together. 💙
                  </p>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
