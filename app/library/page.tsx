'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, BookOpen, Search, Video, FileText, ChevronRight } from 'lucide-react';

const topics = [
  {
    title: 'Autism',
    image: 'https://i.postimg.cc/KYYrt4wB/photo-1-2026-05-15-22-07-11.jpg',
    type: 'VIDEO',
    colSpan: 'col-span-1',
  },
  {
    title: 'ADHD',
    image: 'https://i.postimg.cc/BQJWvz0r/photo-2026-05-15-01-12-32.jpg',
    type: 'VIDEO',
    colSpan: 'col-span-1',
  },
  {
    title: 'OCD',
    image: 'https://i.postimg.cc/Ls7ffDjb/photo-6-2026-05-15-22-07-31.jpg',
    type: 'ARTICLE',
    colSpan: 'col-span-1',
  },
  {
    title: "Alzheimer's",
    image: 'https://i.postimg.cc/pVjQfwGD/photo-5-2026-05-15-22-07-31.jpg',
    type: 'ARTICLE',
    colSpan: 'col-span-1',
  },
];

export default function KnowledgeLibraryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex flex-col font-inter relative pb-8">
      {/* Background Gradient matching design */}
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{
          background: 'linear-gradient(to bottom, #FAFAFA 0%, #F5F9F6 40%, #FAFAFA 100%)'
        }}
        aria-hidden="true"
      />
      
      <div className="relative z-10 w-full max-w-7xl lg:max-w-5xl mx-auto flex flex-col h-full px-5 sm:px-8">
        
        {/* Header */}
        <header className="flex items-center justify-between pt-12 pb-4">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 flex items-center justify-center text-[#22C55E] bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
          </button>
          
          <div className="flex z-10">
            {/* The Book Icon Background element from dashboard for visual consistency and smooth transition */}
            <div className="w-[4.5rem] h-[4.5rem] bg-[#Eef2f5] rounded-full flex items-center justify-center border-none drop-shadow-sm mt-3 ml-2">
               <BookOpen className="w-8 h-8 text-[#22C55E]" strokeWidth={2} />
            </div>
          </div>
          
          <button className="w-8 h-8 flex items-center justify-center text-[#E2E8F0]">
            <div className="flex gap-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
            </div>
          </button>
        </header>

        {/* Title */}
        <div className="text-center mt-2 mb-1">
          <h1 className="text-[24px] font-bold text-[#1E293B]">Knowledge Library</h1>
          <p className="text-[#22C55E] text-[15px] font-medium mt-1">Explore</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {topics.map((topic, index) => {
            const isVideo = index < 2;
            
            return (
              <Link
                href={isVideo ? "/library/video" : "/library/article"}
                key={index} 
                className={`relative rounded-[1.25rem] overflow-hidden aspect-[4/5] object-cover shadow-sm group cursor-pointer ${topic.colSpan} block`}
              >
              <Image 
                src={topic.image} 
                alt={topic.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                referrerPolicy="no-referrer"
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />
              
              {/* Type Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/25 backdrop-blur-md rounded-full px-2.5 py-1 z-10 border border-white/20">
                {topic.type === 'VIDEO' ? (
                  <Video className="w-3.5 h-3.5 text-white" />
                ) : (
                  <FileText className="w-3.5 h-3.5 text-white" />
                )}
                <span className="text-white text-[10px] font-bold tracking-wider">{topic.type}</span>
              </div>

              {/* Title */}
              <div className="absolute bottom-4 left-4 z-10">
                <h3 className="text-white font-bold text-[18px]">{topic.title}</h3>
              </div>
            </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-8 pb-4 max-w-md mx-auto w-full md:max-w-2xl">
          <Link href="#" className="relative w-full h-[64px] bg-[#02A44B] text-white rounded-[1.25rem] flex items-center justify-between px-4 focus:outline-none focus:ring-2 focus:ring-[#026B2D] shadow-[0_8px_20px_rgba(2,164,75,0.25)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(2,164,75,0.35)] transition-all duration-300">
             <div className="w-[42px] h-[42px] bg-white/20 rounded-[0.85rem] flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
                <Video className="w-5 h-5 text-white/90" strokeWidth={2} />
             </div>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="font-semibold text-[16px]">Explore More Videos</span>
             </div>
             <ChevronRight className="w-5 h-5 text-white/80 z-10 shrink-0 mr-1" strokeWidth={2.5} />
          </Link>

          <Link href="#" className="relative w-full h-[64px] bg-[#3BCE65] text-[#1E5D36] rounded-[1.25rem] flex items-center justify-between px-4 focus:outline-none focus:ring-2 focus:ring-[#3BCE65] shadow-[0_8px_20px_rgba(59,206,101,0.25)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(59,206,101,0.35)] transition-all duration-300">
             <div className="w-[42px] h-[42px] bg-white rounded-[0.85rem] flex items-center justify-center shadow-sm z-10 shrink-0">
                <BookOpen className="w-5 h-5 text-[#3BCE65]" strokeWidth={2.5} />
             </div>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="font-semibold text-[16px]">Explore More Articles</span>
             </div>
             <ChevronRight className="w-5 h-5 text-[#1E5D36]/70 z-10 shrink-0 mr-1" strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </div>
  );
}