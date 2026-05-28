'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Bookmark, Share, Play, Maximize, 
  CheckCircle2, ChevronDown, ThumbsUp, Heart, Share2, 
  MoreHorizontal, Upload
} from 'lucide-react';

export default function VideoDetailsPage() {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F9F7] font-inter pb-24 relative overflow-x-hidden">
      {/* Subtle Bottom Gradient matching design */}
      <div className="fixed bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#FFF9F0]/60 to-transparent pointer-events-none -z-0" />
      
      {/* Video Player Section */}
      <div className="w-full bg-black z-10 relative">
        <div className="relative w-full max-w-5xl mx-auto aspect-[4/3] md:aspect-video bg-black z-10 block">
          <Image 
            src="https://i.postimg.cc/C5KggG66/photo-4-2026-05-15-22-07-31.jpg" 
            alt="Video thumbnail" 
            fill 
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover opacity-80"
          />
          
          {/* Top Overlay */}
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between px-5 pt-8 z-30 pointer-events-none">
            <button onClick={() => router.back()} className="text-white hover:bg-white/20 p-2 rounded-full transition pointer-events-auto">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-white font-semibold text-[13px] tracking-widest uppercase">Video Details</h1>
            <div className="flex items-center gap-4 text-white pointer-events-auto">
              <button className="hover:bg-white/20 p-1.5 rounded-full transition">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="hover:bg-white/20 p-1.5 rounded-full transition">
                <Upload className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <button className="w-16 h-16 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center pl-1 hover:bg-black/60 transition pointer-events-auto">
              <Play className="w-8 h-8 text-white fill-white" />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-center px-4 gap-3 z-30 pointer-events-none">
            <span className="text-white text-xs font-medium">0:00</span>
            <div className="flex-1 h-1 bg-white/30 rounded-full relative pointer-events-auto">
              <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-white rounded-full"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md cursor-pointer"></div>
            </div>
            <span className="text-white text-xs font-medium">10:25</span>
            <button className="text-white ml-1 pointer-events-auto">
               <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto px-5 pt-5 z-10">
        {/* Tags */}
        <div className="flex items-center gap-3 text-[13px] font-medium text-slate-500 mb-3">
          <span className="bg-[#026B2D] text-white px-3 py-1 rounded-full font-semibold">Anxiety</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>10:25</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>320K views</span>
        </div>

        {/* Title */}
        <h1 className="text-[26px] md:text-[32px] font-bold text-[#1E293B] leading-tight mb-5">
          How to Manage Anxiety Daily
        </h1>

        {/* Author info */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200">
            <Image 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
              alt="Dr. Ali Hassan" 
              fill 
              className="object-cover" 
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#1E293B] text-[15px] uppercase tracking-wide">BY DR. ALI HASSAN</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-600/20" />
            </div>
            <span className="text-slate-500 text-[13px]">Published 2 days ago</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#475569] text-[16px] leading-[1.6] mb-6">
          Learn practical, proven techniques to reduce anxiety and find calm in your daily life. These exercises take just 5 minutes!
        </p>

        {/* Recommendation banner */}
        <div className="bg-[#EAF5ED] text-[#218042] px-4 py-3 rounded-xl flex items-center gap-2.5 mb-8">
          <CheckCircle2 className="w-5 h-5 text-[#218042] fill-[#218042]/20 shrink-0" />
          <span className="text-[14px] font-medium italic">Recommended for you based on your recent activity</span>
        </div>

        {/* Chapters */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#1E293B] text-[16px]">Video Chapters</h3>
            <button className="text-[#026B2D] text-[14px] font-semibold hover:underline">Show all</button>
          </div>
          
          <div className="relative pl-2">
            {/* Vertical Line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-100"></div>
            
            <div className="flex flex-col gap-5">
              {[
                { time: "00:00", title: "Introduction" },
                { time: "01:20", title: "Breathing Techniques" },
                { time: "04:00", title: "Daily Habits" },
                { time: "07:30", title: "Mindfulness Tips" },
              ].map((chapter, i) => (
                <div key={i} className="flex items-center gap-6 relative z-10">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#026B2D] ml-[0.5px]"></div>
                  <span className="text-[#026B2D] font-bold text-[14px] w-12">{chapter.time}</span>
                  <span className="text-[#1E293B] font-medium text-[15px]">{chapter.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#1E293B] text-[16px]">Comments (124)</h3>
            <button className="flex items-center gap-1 text-[#0F4C81] text-[14px] font-semibold">
              Newest <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {/* Comment 1 */}
            <div className="flex gap-3">
              <div className="relative w-8 h-8 rounded-full bg-orange-200 shrink-0 overflow-hidden">
                <Image src="https://ui-avatars.com/api/?name=Nour+Ahmed&background=ffedd5&color=ea580c" alt="Nour Ahmed" fill />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-[#1E293B] text-[14px]">Nour Ahmed</span>
                  <span className="text-slate-400 text-[12px]">2 hours ago</span>
                </div>
                <p className="text-[#475569] text-[14px] leading-snug mb-2">
                  This breathing technique really helped me! 🙏
                </p>
                <div className="flex items-center gap-4 text-[12px] font-medium text-slate-500">
                  <button className="hover:text-slate-800">Like</button>
                  <button className="hover:text-slate-800">Reply</button>
                  <div className="flex items-center gap-1.5 text-[#0F4C81] ml-auto">
                    <ThumbsUp className="w-3.5 h-3.5 fill-[#0F4C81]" />
                    <span>24</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="flex gap-3">
              <div className="relative w-8 h-8 rounded-full bg-blue-100 shrink-0 overflow-hidden">
                <Image src="https://ui-avatars.com/api/?name=Omar+T&background=dbeafe&color=2563eb" alt="Omar T" fill />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-[#1E293B] text-[14px]">Omar T.</span>
                  <span className="text-slate-400 text-[12px]">1 day ago</span>
                </div>
                <p className="text-[#475569] text-[14px] leading-snug mb-2">
                  Amazing content as always Dr. Ali! ❤️
                </p>
                <div className="flex items-center gap-4 text-[12px] font-medium text-slate-500">
                  <button className="hover:text-slate-800">Like</button>
                  <button className="hover:text-slate-800">Reply</button>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <Heart className="w-3.5 h-3.5" />
                    <span>12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-3 mb-10">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-[#1E293B] font-semibold text-[14px] hover:bg-slate-50 transition ${isLiked ? 'text-red-500 border-red-500 bg-red-50' : ''}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} /> Like
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-[#026B2D] bg-[#EAF5ED] text-[#026B2D] font-semibold text-[14px] hover:bg-[#dcf0e3] transition">
            <Bookmark className="w-4 h-4 fill-[#026B2D]" /> Saved
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-[#1E293B] font-semibold text-[14px] hover:bg-slate-50 transition">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* Suggested Videos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#1E293B] text-[18px]">Suggested Videos</h3>
            <button className="text-[#0F4C81] text-[14px] font-semibold hover:underline">View all</button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Video 1 */}
            <div className="bg-white p-3 rounded-2xl flex gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-md transition cursor-pointer">
              <div className="relative w-[130px] h-[85px] rounded-xl overflow-hidden shrink-0 bg-white">
                <Image src="https://i.postimg.cc/8PvYR2hp/Capture-PNG6.png" alt="Mindfulness" fill className="object-contain" />
                <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  8:15
                </div>
              </div>
              <div className="flex flex-col justify-center flex-1">
                <span className="bg-[#0F4C81] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit mb-1.5">
                  Mindfulness
                </span>
                <h4 className="font-bold text-[#1E293B] text-[15px] leading-tight mb-1 line-clamp-1">
                  Mindfulness for Beginners
                </h4>
                <span className="text-[#64748B] text-[12px] font-medium">
                  Dr. Sara Ibrahim • 8 min
                </span>
              </div>
            </div>

            {/* Video 2 */}
            <div className="bg-white p-3 rounded-2xl flex gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-md transition cursor-pointer">
              <div className="relative w-[130px] h-[85px] rounded-xl overflow-hidden shrink-0 bg-white">
                <Image src="https://i.postimg.cc/Bncwy27v/Capture-PNG7.png" alt="Overthinking" fill className="object-contain" />
                <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  12:20
                </div>
              </div>
              <div className="flex flex-col justify-center flex-1">
                <span className="bg-[#0F4C81] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit mb-1.5">
                  Overthinking
                </span>
                <h4 className="font-bold text-[#1E293B] text-[15px] leading-tight mb-1 line-clamp-1">
                  Stop Overthinking Now
                </h4>
                <span className="text-[#64748B] text-[12px] font-medium">
                  Dr. Ali Hassan • 12 min
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
