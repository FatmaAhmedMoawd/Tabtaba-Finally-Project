'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search,
  MoreHorizontal
} from 'lucide-react';
import { TherapistBottomNav } from '@/widgets/therapist/ui/therapist-bottom-nav';

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Yassin Al-Jamal',
      time: '10:45 AM',
      message: 'Thank you doctor, I feel much b...',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      unreadCount: 2,
      isActive: true,
    },
    {
      id: 2,
      name: 'Noura Al-Saeed',
      time: 'Yesterday',
      message: "Can we postpone Tuesday's ses...",
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      unreadCount: 0,
      isActive: false,
    },
    {
      id: 3,
      name: 'Mohammed Khalid',
      time: 'Monday',
      message: 'The weekly report has been sent.',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      unreadCount: 0,
      isActive: false,
    },
    {
      id: 4,
      name: 'Fahad bin Issa',
      time: 'May 22',
      message: "Received the notes, I'll work on t...",
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400&h=400',
      unreadCount: 0,
      isActive: false,
    }
  ];

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F4F9F9] to-[#FDFDF5] font-inter relative pb-32 md:flex md:flex-col md:items-center w-full">
      <div className="w-full max-w-md mx-auto md:max-w-3xl pt-12 pb-6 px-6 relative">
        
        {/* Header */}
        <div className="flex items-start justify-between w-full mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[36px] font-extrabold text-[#22C55E] leading-tight tracking-tight">
              Messages
            </h1>
            <p className="text-[#4F5B7B] text-[16px] font-medium opacity-90">
              Connect with your patients calmly
            </p>
          </div>
          <div className="pt-2">
            <MoreHorizontal className="text-[#E2E8F0]" size={28} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full relative mb-8">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8997A5]">
            <Search size={20} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search for a patient..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#EAECEF]/60 rounded-full py-4 pl-12 pr-6 text-[#4F5B7B] placeholder:text-[#BAC7D5] font-medium text-[15px] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 transition-all"
          />
        </div>

        {/* Active Now */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-1 mb-4">
            <h2 className="text-[#006D32] font-bold text-[14px] tracking-wide">ACTIVE NOW</h2>
            <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
          </div>
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar px-1 pb-2">
            {/* User 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-b from-gray-200 to-gray-50 shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                    <Image 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Ahmed A." 
                      width={64} 
                      height={64} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-white"></div>
              </div>
              <span className="text-[13px] font-semibold text-[#4F5B7B]">Ahmed A.</span>
            </div>

            {/* User 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-b from-gray-200 to-gray-50 shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                    <Image 
                      src="https://randomuser.me/api/portraits/women/68.jpg" 
                      alt="Sarah M." 
                      width={64} 
                      height={64} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-white"></div>
              </div>
              <span className="text-[13px] font-semibold text-[#4F5B7B]">Sarah M.</span>
            </div>

            {/* User 3 */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-b from-gray-200 to-gray-50 shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                    <Image 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Layla K." 
                      width={64} 
                      height={64} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-white"></div>
              </div>
              <span className="text-[13px] font-semibold text-[#4F5B7B]">Layla K.</span>
            </div>
          </div>
        </div>

        {/* Message List */}
        <div className="bg-[#F8FAFC]/50 rounded-[32px] overflow-hidden flex flex-col pt-2 pb-4 -mx-2 px-2 min-h-[200px]">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              chat.isActive ? (
                <div key={chat.id} className="relative bg-white rounded-l-[24px] rounded-r-[32px] p-4 flex items-center gap-4 mb-2 shadow-sm border border-transparent">
                  <div className="absolute left-0 top-4 bottom-4 w-[6px] bg-[#22C55E] rounded-r-full"></div>
                  
                  <div className="relative shrink-0 ml-2">
                    <div className="w-[64px] h-[64px] rounded-2xl overflow-hidden shadow-sm">
                      <Image 
                        src={chat.image} 
                        alt={chat.name} 
                        width={64} 
                        height={64} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    {chat.unreadCount > 0 && (
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center border-2 border-white text-white text-[11px] font-bold shadow-sm">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 gap-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[17px] font-bold text-[#22C55E] truncate pr-2">{chat.name}</span>
                      <span className="text-[#22C55E] text-[12px] font-bold shrink-0">{chat.time}</span>
                    </div>
                    <p className="text-[#1D2D50] text-[14px] font-bold truncate pr-4">
                      {chat.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={chat.id} className="p-4 flex items-center gap-4 hover:bg-white/50 transition-colors rounded-[32px]">
                  <div className="w-[64px] h-[64px] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-black/5">
                    <Image 
                      src={chat.image} 
                      alt={chat.name} 
                      width={64} 
                      height={64} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex flex-col flex-1 gap-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[17px] font-bold text-[#1D2D50] truncate pr-2">{chat.name}</span>
                      <span className="text-[#8997A5] text-[12px] font-medium shrink-0">{chat.time}</span>
                    </div>
                    <p className="text-[#64748B] text-[14px] font-medium truncate pr-4">
                      {chat.message}
                    </p>
                  </div>
                </div>
              )
            ))
          ) : (
            <div className="flex items-center justify-center py-10 text-[#8997A5] font-medium">
              No patients found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </div>

      <TherapistBottomNav />
    </div>
  );
}
