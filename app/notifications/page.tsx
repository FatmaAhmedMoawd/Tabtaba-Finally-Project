'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Bell,
  Calendar,
  Smile,
  MessageSquare,
  BookOpen,
  BrainCircuit
} from 'lucide-react';

// Reusable Toggle Component
const Toggle = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0 focus:outline-none ${
      isOn ? 'bg-[#065F46]' : 'bg-[#D1D5DB]'
    }`}
  >
    <div 
      className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${
        isOn ? 'translate-x-5' : 'translate-x-0'
      }`} 
    />
  </button>
);

export default function NotificationsPage() {
  const router = useRouter();

  // State for toggles
  const [toggles, setToggles] = useState({
    session: true,
    mood: true,
    therapist: true,
    content: true,
    tips: false
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationItems = [
    {
      id: 'session' as const,
      icon: Calendar,
      iconBg: 'bg-[#4ADE80]',
      iconColor: 'text-[#064E3B]',
      title: 'Session Reminders',
      subtitle: 'Get notified about your upcoming therapy sessions.'
    },
    {
      id: 'mood' as const,
      icon: Smile,
      iconBg: 'bg-[#E5E7EB]',
      iconColor: 'text-[#4B5563]',
      title: 'Mood Tracking Updates',
      subtitle: 'Receive reminders to log your mood and track your progress.'
    },
    {
      id: 'therapist' as const,
      icon: MessageSquare,
      iconBg: 'bg-[#D1FAE5]',
      iconColor: 'text-[#065F46]',
      title: 'Therapist Messages',
      subtitle: 'Get notified when your therapist sends you a message.'
    },
    {
      id: 'content' as const,
      icon: BookOpen,
      iconBg: 'bg-[#E5E7EB]',
      iconColor: 'text-[#4B5563]',
      title: 'New Content Alerts',
      subtitle: 'Stay updated with new articles and videos in your Knowledge Zone.'
    },
    {
      id: 'tips' as const,
      icon: BrainCircuit,
      iconBg: 'bg-[#F3F4F6]',
      iconColor: 'text-[#065F46]',
      title: 'Personalized Tips',
      subtitle: 'Get mental health tips and recommendations tailored for you.'
    }
  ];

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter relative overflow-x-hidden pb-12">
      <style>{`
        @keyframes slideUpCard {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ringBell {
          0% { transform: rotate(0); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(5deg); }
          40% { transform: rotate(-5deg); }
          50% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }
        .animate-card {
          animation: slideUpCard 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-ring {
          animation: ringBell 2s infinite;
          transform-origin: top center;
        }
      `}</style>

      {/* Header */}
      <div className="pt-12 px-6 flex items-center gap-3 relative z-10 animate-card" style={{ animationDelay: '0.1s' }}>
        <button 
          onClick={() => router.back()}
          className="text-[#064E3B] hover:scale-110 transition-transform p-1 -ml-1"
        >
          <ArrowLeft size={28} strokeWidth={2.5} />
        </button>
        <h1 className="text-[26px] font-bold text-[#064E3B] flex items-center gap-2">
          Notifications
          <Bell size={24} strokeWidth={2.5} className="text-[#4ADE80] animate-ring ml-1" />
        </h1>
      </div>

      {/* List of Notification Cards */}
      <div className="mt-8 px-6 flex flex-col gap-4 relative z-10">
        {notificationItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-[32px] p-5 flex items-start gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-card hover:shadow-md transition-shadow"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-full shrink-0 flex items-center justify-center ${item.iconBg}`}>
              <item.icon size={26} className={item.iconColor} strokeWidth={2} />
            </div>

            {/* Text */}
            <div className="flex-1 flex flex-col pt-1">
              <h3 className="text-[17px] font-bold text-[#1F2937] leading-tight">
                {item.title}
              </h3>
              <p className="text-[14px] text-gray-500 mt-1 leading-snug">
                {item.subtitle}
              </p>
            </div>

            {/* Toggle */}
            <div className="pt-1">
              <Toggle 
                isOn={toggles[item.id]} 
                onToggle={() => handleToggle(item.id)} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
