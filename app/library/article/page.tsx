'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Bookmark, Upload, BadgeCheck,
  CheckCircle2, Lightbulb, Heart, MessageSquare
} from 'lucide-react';

export default function ArticleDetailsPage() {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  return (
    <div className="min-h-screen bg-[#F6F9F7] font-inter pb-24 relative overflow-x-hidden">
      {/* Subtle Bottom Gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#EAF5ED]/50 pointer-events-none to-transparent z-0"></div>
      
      {/* Hero Image Section */}
      <div className="relative w-full aspect-[4/3] md:aspect-video bg-gray-200 z-10 block max-w-5xl mx-auto">
        <Image 
          src="https://i.postimg.cc/KYYrt4wB/photo-1-2026-05-15-22-07-11.jpg" 
          alt="Autism Article" 
          fill 
          priority
          sizes="100vw"
          className="object-cover"
        />
        
        {/* Top Overlay */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/50 to-transparent flex items-start justify-between px-5 pt-8 z-30 pointer-events-none">
          <button onClick={() => router.back()} className="text-white hover:bg-white/20 p-2 rounded-full transition pointer-events-auto">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mt-1 pointer-events-auto">
            <span className="text-white font-semibold text-[11px] tracking-wider uppercase">ARTICLE</span>
          </div>

          <div className="flex items-center gap-3 text-white pointer-events-auto">
            <button className="hover:bg-white/20 p-1.5 rounded-full transition">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="hover:bg-white/20 p-1.5 rounded-full transition">
              <Upload className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 bg-[#F6F9F7] -mt-6 rounded-t-3xl min-h-[50vh] w-full max-w-5xl mx-auto">
        <div className="w-full max-w-2xl mx-auto px-5 pt-8 sm:px-10 pb-12">
          
          {/* Metadata */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-[#0056D2] text-white text-xs font-semibold px-3 py-1 rounded-full">
            Autism
          </span>
          <div className="flex items-center text-[#64748B] text-xs font-medium gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            5 min read
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[26px] font-bold text-[#0F172A] leading-[1.2] mb-5">
          Understanding Autism in Children
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              alt="Dr. Sarah Ahmed"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#0F172A] font-bold text-[15px]">By Dr. Sarah Ahmed</span>
              <BadgeCheck className="w-4 h-4 text-[#0056D2] fill-[#0056D2] stroke-white" />
            </div>
            <span className="text-[#64748B] text-[13px]">October 10, 2025</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="text-[#334155] text-[15.5px] leading-[1.6] space-y-6">
          
          <h2 className="text-[19px] font-bold text-[#0F172A] mt-6">What is Autism?</h2>
          <p>
            Autism Spectrum Disorder (ASD) is a developmental condition that affects 
            communication, behavior, and social interaction.
          </p>

          <h3 className="text-[18px] font-bold text-[#0F172A] pt-2">Early Signs</h3>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#026B2D] fill-[#026B2D] stroke-white shrink-0" />
                <span>Limited eye contact</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#026B2D] fill-[#026B2D] stroke-white shrink-0" />
                <span>Delayed speech</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#026B2D] fill-[#026B2D] stroke-white shrink-0" />
                <span>Repetitive behaviors</span>
              </div>
            </div>

            {/* Tip Card */}
            <div className="sm:w-[200px] bg-[#EBF3FF] rounded-2xl p-4 flex gap-2">
              <Lightbulb className="w-5 h-5 text-[#EAB308] fill-[#EAB308] shrink-0 translate-y-0.5" />
              <div>
                <span className="text-[#0F172A] font-bold text-sm block mb-1">Tip</span>
                <p className="text-[#475569] text-[13px] leading-snug">
                  Early diagnosis makes a big difference in treatment.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-[18px] font-bold text-[#0F172A] pt-4">How to Support Your Child</h3>
          
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full bg-[#0056D2] text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
              <span className="font-semibold text-[#0F172A]">Be Patient & Understand</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full bg-[#0056D2] text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
              <span className="font-semibold text-[#0F172A]">Create Daily Routines</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full bg-[#0056D2] text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
              <span className="font-semibold text-[#0F172A]">Seek Professional Help</span>
            </div>
          </div>

        </div>

        {/* Progress Card */}
        <div className="mt-8 bg-[#F0F7F2] border border-[#D5EAD8] rounded-[1.25rem] p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#026B2D] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-4 h-4">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="font-bold text-[#0F172A] text-[15px]">Great progress! 🎊</span>
          </div>
          <p className="text-[#475569] text-sm mb-4">
            You&apos;ve completed 60% of this article
          </p>
          <div className="w-full h-2.5 bg-[#DCECDD] rounded-full overflow-hidden">
            <div className="h-full bg-[#026B2D] rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center justify-between gap-3 mt-8">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full border ${isLiked ? 'border-red-500 bg-red-50 text-red-500' : 'border-[#CBD5E1] bg-white text-[#334155] hover:bg-slate-50'} font-semibold text-[14px] transition`}
          >
            <Heart className={`w-[18px] h-[18px] ${isLiked ? 'fill-red-500 text-red-500' : ''}`} /> Like
          </button>
          
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-[#CBD5E1] bg-white text-[#334155] font-semibold text-[14px] hover:bg-slate-50 transition">
            <MessageSquare className="w-[18px] h-[18px]" /> Comment
          </button>
          
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-[14px] transition ${isSaved ? 'bg-[#0056D2] text-white border border-[#0056D2]' : 'bg-white border-[#CBD5E1] text-[#334155] hover:bg-slate-50'}`}
          >
            <Bookmark className={`w-[18px] h-[18px] ${isSaved ? 'fill-white text-white' : ''}`} /> Saved
          </button>
        </div>

        {/* You May Also Like */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[19px] font-bold text-[#0F172A]">You May Also Like</h2>
            <Link href="#" className="text-[#0056D2] font-semibold text-[13.5px]">View all</Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0">
            {/* Card 1 */}
            <div className="w-[240px] shrink-0 bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100">
              <div className="relative w-full aspect-[4/3] bg-slate-100">
                <Image 
                  src="https://i.postimg.cc/vTMVpdxS/Capture-PNG3.png" 
                  alt="ADHD in Kids" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="inline-block bg-[#0056D2] text-white text-[10px] font-bold px-2.5 py-1 rounded-md mb-2">
                  ADHD
                </span>
                <h4 className="font-bold text-[#0F172A] text-[15px] leading-snug mb-1">
                  Managing ADHD in Kids
                </h4>
                <div className="text-[#64748B] text-[12px] font-medium">4 min read</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-[240px] shrink-0 bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100">
              <div className="relative w-full aspect-[4/3] bg-slate-100">
                <Image 
                  src="https://i.postimg.cc/pr6PKfvh/Capture-PNG4.png" 
                  alt="Coping with Anxiety" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="inline-block bg-[#22C55E] text-white text-[10px] font-bold px-2.5 py-1 rounded-md mb-2 uppercase tracking-wide">
                  Anxiety
                </span>
                <h4 className="font-bold text-[#0F172A] text-[15px] leading-snug mb-1">
                  Coping with Anxiety
                </h4>
                <div className="text-[#64748B] text-[12px] font-medium">6 min read</div>
              </div>
            </div>
            
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
