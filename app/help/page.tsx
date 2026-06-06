'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  HelpCircle,
  FileQuestion,
  Folder,
  BookOpen,
  MessageSquare,
  Mail,
  Phone,
  Check,
  CheckCircle2,
  Info,
  ChevronLeft
} from 'lucide-react';

const HelpCard = ({ 
  item, 
  index,
  onFeedback
}: { 
  item: any; 
  index: number;
  onFeedback: (type: 'yes' | 'no') => void;
}) => {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  return (
    <div 
      className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-slide-up hover:shadow-md transition-shadow duration-300"
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center mb-5 ${item.iconBg}`}>
        <item.icon size={24} className={item.iconColor} strokeWidth={2} />
      </div>
      
      <h3 className="text-[18px] font-bold text-[#064E3B] mb-3 leading-tight">
        {item.title}
      </h3>
      
      <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
        {item.content}
      </p>

      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-400 tracking-wider">
          WAS THIS HELPFUL?
        </span>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              if (feedback !== 'yes') {
                setFeedback('yes');
                onFeedback('yes');
              }
            }}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 flex items-center gap-1 cursor-pointer ${
              feedback === 'yes' 
                ? 'bg-[#22C55E] text-white scale-105' 
                : 'bg-[#F3F4F6] text-gray-600 hover:bg-gray-200'
            }`}
          >
            {feedback === 'yes' && <Check size={14} strokeWidth={3} />}
            Yes
          </button>
          <button 
            onClick={() => {
              if (feedback !== 'no') {
                setFeedback('no');
                onFeedback('no');
              }
            }}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 cursor-pointer ${
              feedback === 'no' 
                ? 'bg-[#EF4444] text-white scale-105' 
                : 'bg-[#F3F4F6] text-gray-600 hover:bg-gray-200'
            }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HelpPage() {
  const router = useRouter();
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const faqs = [
    {
      icon: FileQuestion,
      iconBg: 'bg-[#DCFCE7]',
      iconColor: 'text-[#16A34A]',
      title: 'What is My Dashboard?',
      content: '"My Dashboard" is your personal hub to track your progress, see your upcoming sessions, and access all your app features. You may receive notifications when there are important updates.'
    },
    {
      icon: Folder,
      iconBg: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0369A1]',
      title: 'How to Access My History?',
      content: 'To view your activity history, go to the "History" section from your profile dashboard. You must be signed in to your Tabtaba account to access this page.'
    },
    {
      icon: BookOpen,
      iconBg: 'bg-[#DCFCE7]',
      iconColor: 'text-[#16A34A]',
      title: 'How to Use the Knowledge Zone?',
      content: 'The Knowledge Zone contains articles and videos about mental health topics. You can browse, bookmark, and get recommendations based on your interests.'
    },
    {
      icon: MessageSquare,
      iconBg: 'bg-[#E0E7FF]',
      iconColor: 'text-[#4338CA]',
      title: 'How to Message My Therapist?',
      content: 'You can send and receive messages from your therapist through the "Messages" tab. Make sure notifications are enabled to stay updated.'
    }
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter relative overflow-hidden pb-16">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes slideDownToast {
          0% { opacity: 0; transform: translate(-50%, -20px) scale(0.95); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-toast {
          animation: slideDownToast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Custom Toast Notification */}
      {toast && (
        <div className="fixed top-12 left-1/2 z-50 animate-toast" style={{ transform: 'translateX(-50%)' }}>
          <div className={`px-5 py-3.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.12)] flex items-center gap-3 ${
            toast.type === 'success' 
              ? 'bg-[#10B981] text-white border border-[#059669]' 
              : 'bg-[#1F2937] text-white border border-gray-900'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 size={20} strokeWidth={2.5} /> : <Info size={20} strokeWidth={2.5} />}
            <span className="font-bold text-[14px] whitespace-nowrap">
              {toast.message}
            </span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. MOBILE VIEW (Original layout preserved exactly) */}
      {/* ======================================================== */}
      <div className="block md:hidden">
        {/* Header */}
        <div className="pt-12 px-6 flex items-center gap-3 relative z-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <button 
            onClick={() => router.back()}
            className="text-[#064E3B] hover:scale-110 transition-transform p-1 -ml-1"
          >
            <ArrowLeft size={28} strokeWidth={2.5} />
          </button>
          <h1 className="text-[24px] font-bold text-[#064E3B] flex items-center gap-2">
            Help & Support
            <HelpCircle size={24} strokeWidth={2.5} className="text-[#22C55E] ml-1" />
          </h1>
        </div>

        {/* FAQ Cards */}
        <div className="mt-8 px-6 flex flex-col gap-6 relative z-10">
          {faqs.map((item, index) => (
            <HelpCard 
              key={index} 
              item={item} 
              index={index} 
              onFeedback={(type) => {
                if (type === 'yes') {
                  showToast("Glad we could help! 💚", 'success');
                } else {
                  showToast("We'll work on making this clearer! 🙏", 'info');
                }
              }} 
            />
          ))}
        </div>

        {/* Footer Contact Info */}
        <div className="mt-10 px-6 flex flex-col items-center justify-center pb-8 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-[20px] font-bold text-[#064E3B] mb-5">Still need help?</h2>
          
          <div className="flex flex-col gap-4 text-[#6B7280] w-fit">
            <div className="flex items-center gap-3 hover:text-[#22C55E] transition-colors duration-300 cursor-pointer group">
              <Mail size={24} className="text-[#22C55E] group-hover:animate-float shrink-0" />
              <span className="text-[16px]">support@tabtaba.com</span>
            </div>
            
            <div className="flex items-center gap-3 hover:text-[#22C55E] transition-colors duration-300 cursor-pointer group">
              <Phone size={24} className="text-[#22C55E] group-hover:animate-float shrink-0" />
              <span className="text-[16px] leading-tight">+02 (800) TABTABA</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP VIEW (Premium web grid redesign) */}
      {/* ======================================================== */}
      <div className="hidden md:block w-full max-w-5xl mx-auto px-8 py-10">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-150/40 pb-5">
          <div className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-655 hover:text-gray-900 transition-colors font-bold text-sm bg-white border border-gray-250/60 rounded-full px-5 py-2.5 shadow-sm cursor-pointer"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              Help & Support Center
              <HelpCircle size={24} className="text-[#22C55E]" />
            </h1>
          </div>
        </div>

        {/* FAQ Grid Cards (2 columns on Desktop) */}
        <div className="grid grid-cols-2 gap-8 mt-6">
          {faqs.map((item, index) => (
            <HelpCard 
              key={index} 
              item={item} 
              index={index} 
              onFeedback={(type) => {
                if (type === 'yes') {
                  showToast("Glad we could help! 💚", 'success');
                } else {
                  showToast("We'll work on making this clearer! 🙏", 'info');
                }
              }} 
            />
          ))}
        </div>

        {/* Footer Contact Info Card side-by-side */}
        <div className="mt-14 bg-white border border-gray-150/50 rounded-[32px] p-8 shadow-sm flex flex-col items-center justify-center text-center max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-[22px] font-black text-[#064E3B] mb-2">Still need help?</h2>
          <p className="text-sm text-gray-400 font-semibold mb-6">Our dedicated clinical response team is standing by to assist you.</p>
          
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
            <div className="bg-[#FAFDFB] hover:bg-emerald-50/50 border border-emerald-50 rounded-2xl p-4 flex items-center gap-4 transition-all group cursor-pointer justify-center">
              <Mail size={22} className="text-[#22C55E] group-hover:animate-float shrink-0" />
              <span className="text-sm font-bold text-gray-600">support@tabtaba.com</span>
            </div>
            
            <div className="bg-[#FAFDFB] hover:bg-emerald-50/50 border border-emerald-50 rounded-2xl p-4 flex items-center gap-4 transition-all group cursor-pointer justify-center">
              <Phone size={22} className="text-[#22C55E] group-hover:animate-float shrink-0" />
              <span className="text-sm font-bold text-gray-600">+02 (800) TABTABA</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
