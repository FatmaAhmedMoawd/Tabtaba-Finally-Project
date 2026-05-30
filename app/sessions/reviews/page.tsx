'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Star, 
  ThumbsUp, 
  ArrowRight,
  
} from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'fatma alaa',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    time: '2 days ago',
    rating: 5,
    text: 'The session was incredibly helpful. The therapist really listened and provided actionable steps for my anxiety. I feel much lighter after just one hour. Highly recommend this platform.',
    likes: 24,
    helpful: true,
  },
  {
    id: 2,
    name: 'yousif ahmed',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    time: '1 week ago',
    rating: 4,
    text: 'Great experience overall. The interface is smooth and booking was very easy. I would have appreciated a bit more introductory material before the session started, but the quality of care was top-notch.',
    likes: 12,
    helpful: true,
  },
  {
    id: 3,
    name: 'Nada mostafa',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    time: '2 weeks ago',
    rating: 5,
    text: 'Finally found a therapist who understands my cultural background. Tabtaba made it so easy to filter and find exactly what I needed. Five stars for sure.',
    likes: 18,
    helpful: true,
  }
];

export default function ReviewsPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All Reviews');
  const [likedReviews, setLikedReviews] = useState<Record<number, boolean>>({});
  const [reviewsList, setReviewsList] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const customReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
      return [...customReviews, ...REVIEWS_DATA];
    }
    return REVIEWS_DATA;
  });

  const toggleLike = (id: number) => {
    setLikedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filters = ['All Reviews', 'Most Recent', 'Positive', 'Critical'];

  const filteredReviews = reviewsList.filter(review => {
    if (selectedFilter === 'Positive') {
      return review.rating >= 4;
    }
    if (selectedFilter === 'Critical') {
      return review.rating <= 3;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFBFD] to-[#FFFFFF] font-sans pb-24 relative max-w-md mx-auto px-4">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[#30C45D]/5 rounded-full filter blur-3xl pointer-events-none"></div>
      


      {/* Header */}
      <header className="flex items-center justify-between py-2 relative z-10 w-full mb-4">
        <button 
          onClick={() => router.push('/dashboard')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 hover:text-[#30C45D] hover:bg-slate-50 border border-slate-100/80 transition-all cursor-pointer shadow-sm active:scale-95"
          id="btn-back-reviews"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <span className="text-[17px] font-black text-slate-800">Reviews & Ratings</span>
        <div className="w-10 h-10 rounded-full bg-white" aria-hidden="true" />
      </header>

      {/* Hero Breakdown Card */}
      <div className="bg-white rounded-[32px] p-6 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.015),_0_5px_15px_rgba(0,0,0,0.005)] border border-slate-100/80 mt-2 flex flex-col items-center">
        {/* Large Green Rating */}
        <h1 className="text-[64px] font-black text-[#0D7A39] leading-none tracking-tight">
          4.9
        </h1>
        
        {/* Star visual */}
        <div className="flex gap-1.5 mt-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={22} className="fill-[#22C55E] text-[#22C55E]" strokeWidth={0} />
          ))}
        </div>
        
        {/* Subtitle */}
        <p className="text-[#64748B] text-[13.5px] font-[600] mt-1.5">
          Based on 1,248 reviews
        </p>

        {/* Breakdown Progress Bars */}
        <div className="w-full flex flex-col gap-2 mt-6">
          {[
            { stars: '5', percentage: '90%', widthStyle: '90%' },
            { stars: '4', percentage: '12%', widthStyle: '12%' },
            { stars: '3', percentage: '1%', widthStyle: '1%' },
            { stars: '2', percentage: '1%', widthStyle: '1%' },
            { stars: '1', percentage: '2%', widthStyle: '2%' },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3 text-xs text-slate-500 font-bold">
              <span className="w-3 text-center">{bar.stars}</span>
              <div className="flex-1 h-[7px] bg-[#F1F5F9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0D7A39] rounded-full transition-all duration-[1s]" 
                  style={{ width: bar.widthStyle }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Pills */}
      <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide -mx-4 px-4 mt-6 select-none touch-pan-x min-h-[48px]">
        {filters.map((filter) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-black transition-all flex items-center shrink-0 border cursor-pointer ${
                isActive 
                  ? 'bg-[#0D7A39] text-white border-transparent shadow-md shadow-[#0D7A39]/10' 
                  : 'bg-[#F1F5F9] text-[#64748B] border-transparent hover:bg-slate-200'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-4 mt-4">
        {filteredReviews.map((review) => {
          const hasLiked = !!likedReviews[review.id];
          return (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[28px] p-5 shadow-[0_12px_28px_rgba(0,0,0,0.015)] border border-slate-100/70"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-[48px] h-[48px] rounded-full overflow-hidden relative border-2 border-slate-100">
                    <Image 
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-[#30C45D] font-extrabold text-[15.5px] leading-tight">
                      {review.name}
                    </h3>
                    <span className="text-[11.5px] font-[600] text-slate-400 mt-0.5 block">
                      {review.time}
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={12.5} 
                      className={`${
                        star <= review.rating 
                          ? 'fill-[#22C55E] text-[#22C55E]' 
                          : 'text-slate-200 fill-none'
                      }`} 
                      strokeWidth={star <= review.rating ? 0 : 2}
                    />
                  ))}
                </div>
              </div>

              {/* Text */}
              <p className="text-[#475569] text-[13.5px] font-[600] leading-relaxed mt-3.5 select-text">
                {review.text}
              </p>

              {/* Footer Helpful Actions */}
              <div className="flex items-center gap-4 mt-4 pt-3.5 border-t border-slate-50">
                <button 
                  onClick={() => toggleLike(review.id)}
                  className={`flex items-center gap-1.5 text-[12.5px] font-bold cursor-pointer transition-colors ${
                    hasLiked ? 'text-[#0D7A39]' : 'text-[#64748B] hover:text-[#0D7A39]'
                  }`}
                >
                  <ThumbsUp size={14} className={hasLiked ? 'fill-[#0D7A39]' : ''} />
                  <span>{review.likes + (hasLiked ? 1 : 0)}</span>
                </button>
                <span className="text-slate-300 text-xs">|</span>
                <span className="text-[#64748B] text-[12.5px] font-bold select-none cursor-pointer hover:text-slate-800">
                  Helpful?
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => router.push('/dashboard')}
          className="text-[#0D7A39] text-[15px] font-black tracking-wide flex items-center justify-center gap-1 px-5 py-3 rounded-full hover:bg-[#EFFAF3] transition-all cursor-pointer group"
          id="btn-view-all-reviews"
        >
          <span>View all reviews</span>
          <ArrowRight size={16} strokeWidth={3} className="transform transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
