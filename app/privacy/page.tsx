'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  const router = useRouter();

  const sections = [
    {
      title: 'Privacy & Security',
      content: 'Your privacy and data security are important to us. We are committed to protecting your personal information and using it only to improve your experience on tabtaba'
    },
    {
      title: 'How we use your data',
      content: 'We only collect the information necessary to create and link your account for easier use of Tabtaba. Your data is never shared.'
    },
    {
      title: 'Data security',
      content: 'We use industry-standard security measures to protect your account and personal information from unauthorized access.'
    },
    {
      title: 'Account safety',
      content: 'Keep your password private\nUse a strong password\nSign out from shared devices'
    },
    {
      title: 'Notifications & emails',
      content: 'You can control what notifications and emails you receive from your account settings at any time.'
    },
    {
      title: 'Need help?',
      content: 'If you have any questions or concerns about privacy or security, please contact our support team.'
    }
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter relative overflow-hidden pb-12">
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slowRotate {
          from { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(10deg) scale(1.1); }
          to { transform: rotate(0deg) scale(1); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }
        .animate-block {
          animation: slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-bg-shield {
          animation: slowRotate 20s ease-in-out infinite;
        }
        .animate-heartbeat {
          animation: heartbeat 3s infinite;
        }
      `}</style>

      {/* Header */}
      <div className="pt-12 px-6 flex items-center gap-3 relative z-10 animate-block" style={{ animationDelay: '0.1s' }}>
        <button 
          onClick={() => router.back()}
          className="text-[#064E3B] hover:scale-110 transition-transform p-1 -ml-1"
        >
          <ArrowLeft size={28} strokeWidth={2.5} />
        </button>
        <h1 className="text-[24px] font-bold text-[#064E3B] flex items-center gap-2">
          Privacy & Security
          <ShieldCheck size={26} strokeWidth={2.5} className="text-[#22C55E] animate-heartbeat ml-1" />
        </h1>
      </div>

      {/* Content */}
      <div className="mt-8 px-6 flex flex-col gap-6 relative z-10">
        {sections.map((section, index) => (
          <div 
            key={index} 
            className="group animate-block pl-0 hover:pl-3 border-l-2 border-transparent hover:border-[#22C55E] transition-all duration-300 ease-out"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <h2 className="text-[19px] font-bold text-[#22C55E] mb-2 group-hover:text-[#16A34A] transition-colors duration-300">
              {section.title}
            </h2>
            <div className="text-[15px] text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {section.content.split('\n').map((line, i) => (
                <p key={i} className="mb-0.5">{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
