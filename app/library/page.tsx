'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, BookOpen, Search, Video, FileText, ChevronRight,
  CheckCircle2, Share2, ThumbsUp, ChevronDown, Play, Bookmark 
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#F0FDF4] flex flex-col font-inter relative pb-16">
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
          
          <div className="w-8 h-8" aria-hidden="true" />
        </header>

        {/* Title */}
        <div className="text-center mt-2 mb-1">
          <h1 className="text-[24px] font-bold text-[#1E293B]">Knowledge Library</h1>
          <p className="text-[#22C55E] text-[15px] font-medium mt-1">Explore</p>
        </div>

        {/* Explore Topics Header */}
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-[20px] font-bold text-[#1E293B]">Explore Topics</h2>
          <button className="text-[#22C55E] text-[14px] font-semibold hover:underline">View all</button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full">
          <Link href="/library/video" className="relative w-full h-[64px] bg-[#02A44B] text-white rounded-[1.25rem] flex items-center justify-between px-4 focus:outline-none focus:ring-2 focus:ring-[#026B2D] shadow-[0_8px_20px_rgba(2,164,75,0.25)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(2,164,75,0.35)] transition-all duration-300">
             <div className="w-[42px] h-[42px] bg-white/20 rounded-[0.85rem] flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
                <Video className="w-5 h-5 text-white/90" strokeWidth={2} />
             </div>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="font-semibold text-[16px]">Explore More Videos →</span>
             </div>
             <div className="w-5 h-5" />
          </Link>

          <Link href="/library/article" className="relative w-full h-[64px] bg-[#3BCE65] text-[#1E5D36] rounded-[1.25rem] flex items-center justify-between px-4 focus:outline-none focus:ring-2 focus:ring-[#3BCE65] shadow-[0_8px_20px_rgba(59,206,101,0.25)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(59,206,101,0.35)] transition-all duration-300">
             <div className="w-[42px] h-[42px] bg-white rounded-[0.85rem] flex items-center justify-center shadow-sm z-10 shrink-0">
                <BookOpen className="w-5 h-5 text-[#3BCE65]" strokeWidth={2.5} />
             </div>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="font-semibold text-[16px]">Explore More Articles →</span>
             </div>
             <div className="w-5 h-5" />
          </Link>
        </div>

        {/* Main Content Grid: Video details (left) & Article details (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          
          {/* Left Column: Video and Chapters (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Video Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-4">
              {/* Video Thumbnail with Play Button */}
              <Link href="/library/video" className="relative block aspect-video rounded-2xl overflow-hidden group">
                <Image 
                  src="https://i.postimg.cc/C5KggG66/photo-4-2026-05-15-22-07-31.jpg" 
                  alt="How to Manage Anxiety Daily" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20" />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center pl-1 shadow-md hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-[#02A44B] fill-[#02A44B]" />
                  </div>
                </div>
              </Link>

              {/* Video Details */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#EAF5ED] text-[#026B2D] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">
                    Anxiety
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-slate-500 text-xs font-semibold">10:25 / 320k views</span>
                </div>

                <Link href="/library/video" className="block hover:text-[#02A44B] transition-colors">
                  <h2 className="text-[20px] font-bold text-[#1E293B] leading-tight">
                    How to Manage Anxiety Daily
                  </h2>
                </Link>

                {/* Author Info */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100">
                      <Image 
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                        alt="Dr. Ali Hassan" 
                        fill 
                        className="object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[#1E293B] text-[13px] uppercase tracking-wide">
                          BY DR. ALI HASSAN
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600/20" />
                      </div>
                      <span className="text-slate-400 text-[11px]">Published 2 days ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Chapters */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1E293B] text-[15px]">Video Chapters</h3>
                <button className="text-[#026B2D] text-[13px] font-semibold hover:underline">Show all</button>
              </div>
              
              <div className="relative pl-1">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[15px] top-2.5 bottom-2.5 w-[2px] bg-slate-200" />
                
                <div className="flex flex-col gap-4">
                  {[
                    { time: "00:00", title: "Introduction" },
                    { time: "01:30", title: "Breathing Techniques" },
                    { time: "04:30", title: "Daily Habits" },
                  ].map((chapter, i) => (
                    <div key={i} className="flex items-center gap-5 relative z-10">
                      <div className="w-[10px] h-[10px] rounded-full border-2 border-white bg-[#026B2D] shadow-sm ml-[11px]" />
                      <span className="text-[#026B2D] font-bold text-[13px] w-10">{chapter.time}</span>
                      <span className="text-[#1E293B] font-medium text-[14px]">{chapter.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1E293B] text-[15px]">Comments (324)</h3>
                <button className="flex items-center gap-1 text-[#026B2D] text-[13px] font-semibold hover:underline">
                  Newest <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image 
                    src="https://ui-avatars.com/api/?name=Nour+Ahmed&background=ffedd5&color=ea580c" 
                    alt="Nour Ahmed" 
                    fill 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-[#1E293B] text-[13px]">Nour Ahmed</span>
                    <span className="text-slate-400 text-[11px]">2 hours ago</span>
                  </div>
                  <p className="text-slate-600 text-[13.5px] leading-snug mb-2">
                    This breathing technique really helped me! 🙏
                  </p>
                  <div className="flex items-center gap-4 text-[12px] font-semibold text-slate-400">
                    <button className="hover:text-slate-600">Like</button>
                    <button className="hover:text-slate-600">Reply</button>
                    <div className="flex items-center gap-1 text-[#026B2D] ml-auto">
                      <ThumbsUp className="w-3.5 h-3.5 fill-[#026B2D] stroke-[#026B2D]" />
                      <span>24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Article Card & Suggested Videos (1/3 width) */}
          <div className="space-y-6">
            
            {/* Article Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-4">
              <Link href="/library/article" className="relative block aspect-[4/3] rounded-2xl overflow-hidden group">
                <Image 
                  src="https://i.postimg.cc/KYYrt4wB/photo-1-2026-05-15-22-07-11.jpg" 
                  alt="Understanding Autism in Children" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#0056D2] border border-white/20">
                  ARTICLE
                </div>
              </Link>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#EBF3FF] text-[#0056D2] text-[11px] font-bold px-2.5 py-1 rounded-full">
                    Autism
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-slate-500 text-xs font-semibold">5 min read</span>
                </div>

                <Link href="/library/article" className="block hover:text-[#0056D2] transition-colors">
                  <h3 className="text-[18px] font-bold text-[#1E293B] leading-snug">
                    Understanding Autism in Children
                  </h3>
                </Link>

                <div className="flex items-center gap-2.5 mt-3 mb-4">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Dr. Sarah Ahmed" 
                      fill 
                      className="object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-slate-600 font-semibold text-xs">Dr. Sarah Ahmed</span>
                </div>

                {/* Progress Tracker */}
                <div className="bg-[#F0F7F2] border border-[#D5EAD8] rounded-2xl p-4 mb-4">
                  <span className="font-bold text-[#1E293B] text-[12.5px] block mb-1">
                    Great progress! 🎊
                  </span>
                  <p className="text-slate-500 text-[11.5px] mb-3">
                    You have completed 75% of this book
                  </p>
                  <div className="w-full h-2 bg-[#DCECDD] rounded-full overflow-hidden">
                    <div className="h-full bg-[#026B2D] rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <Link 
                  href="/library/article" 
                  className="block w-full py-3 bg-[#02A44B] hover:bg-[#028b3e] text-white rounded-full text-center font-bold text-[14px] shadow-[0_4px_12px_rgba(2,164,75,0.15)] transition-all"
                >
                  Continue Reading
                </Link>
              </div>
            </div>

            {/* Suggested Videos */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1E293B] text-[15px]">Suggested Videos</h3>
                <button className="text-[#026B2D] text-[13px] font-semibold hover:underline">View all</button>
              </div>

              <div className="flex flex-col gap-3">
                {/* Suggested Video 1 */}
                <Link href="/library/video" className="group flex gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <Image 
                      src="https://i.postimg.cc/8PvYR2hp/Capture-PNG6.png" 
                      alt="Mindfulness for Beginners" 
                      fill 
                      className="object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1 py-0.2 rounded">
                      8:15
                    </div>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="font-bold text-[#1E293B] text-[13.5px] leading-tight mb-1 group-hover:text-[#02A44B] transition-colors truncate">
                      Mindfulness for Beginners
                    </h4>
                    <span className="text-[#64748B] text-[11.5px] font-medium truncate">
                      Dr. Sara Ibrahim • 8 min
                    </span>
                  </div>
                </Link>

                {/* Suggested Video 2 */}
                <Link href="/library/video" className="group flex gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <Image 
                      src="https://i.postimg.cc/Bncwy27v/Capture-PNG7.png" 
                      alt="Stop Overthinking Now" 
                      fill 
                      className="object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1 py-0.2 rounded">
                      12:20
                    </div>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="font-bold text-[#1E293B] text-[13.5px] leading-tight mb-1 group-hover:text-[#02A44B] transition-colors truncate">
                      Stop Overthinking Now
                    </h4>
                    <span className="text-[#64748B] text-[11.5px] font-medium truncate">
                      Dr. Ali Hassan • 12 min
                    </span>
                  </div>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}