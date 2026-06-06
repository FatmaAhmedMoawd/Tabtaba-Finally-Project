'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search,
  Phone,
  Video,
  MoreVertical,
  Mic,
  Paperclip,
  Send,
  CheckCheck,
  ChevronLeft,
  User,
  ShieldAlert
} from 'lucide-react';
import { TherapistBottomNav } from '@/widgets/therapist/ui/therapist-bottom-nav';

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatId, setActiveChatId] = useState(1);
  const [newMessageText, setNewMessageText] = useState('');
  const [showChatPaneMobile, setShowChatPaneMobile] = useState(false);

  // Sample Patients Directory
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Yassin Al-Jamal',
      time: '10:45 AM',
      message: 'Thank you doctor, I feel much better...',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      unreadCount: 2,
      activeNow: true,
    },
    {
      id: 2,
      name: 'Noura Al-Saeed',
      time: 'Yesterday',
      message: "Can we postpone Tuesday's session?",
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      unreadCount: 0,
      activeNow: false,
    },
    {
      id: 3,
      name: 'Mohammed Khalid',
      time: 'Monday',
      message: 'The weekly report has been sent.',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      unreadCount: 0,
      activeNow: false,
    },
    {
      id: 4,
      name: 'Fahad bin Issa',
      time: 'May 22',
      message: "Received the notes, I'll work on them.",
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400&h=400',
      unreadCount: 0,
      activeNow: false,
    }
  ]);

  // Messages database mapping by chat ID
  const [chatMessages, setChatMessages] = useState<Record<number, Array<{ id: number, text: string, sender: 'patient' | 'therapist', time: string }>>>({
    1: [
      { id: 1, text: 'Hello doctor, I followed the prescription you gave me last Thursday.', sender: 'patient', time: '10:40 AM' },
      { id: 2, text: 'Thank you doctor, I feel much better today. The swelling has significantly decreased.', sender: 'patient', time: '10:45 AM' },
      { id: 3, text: "That's wonderful news, Yassin! I'm glad to hear the recovery is progressing well. Please continue the dosage for two more days as discussed.", sender: 'therapist', time: '10:48 AM' }
    ],
    2: [
      { id: 1, text: "Hello doctor, can we postpone Tuesday's session to Wednesday?", sender: 'patient', time: 'Yesterday' }
    ],
    3: [
      { id: 1, text: 'The weekly report has been sent to your email, doctor.', sender: 'patient', time: 'Monday' }
    ],
    4: [
      { id: 1, text: "Received the notes, I'll work on them and update you.", sender: 'patient', time: 'May 22' }
    ]
  });

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
  const activeMessages = chatMessages[activeChatId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const timeStr = `${hours}:${minutes} ${ampm}`;

    // Add message
    const updatedMessages = [
      ...activeMessages,
      {
        id: activeMessages.length + 1,
        text: newMessageText,
        sender: 'therapist' as const,
        time: timeStr
      }
    ];

    setChatMessages({
      ...chatMessages,
      [activeChatId]: updatedMessages
    });

    // Update last message preview in list
    setChats(prev => prev.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          time: timeStr,
          message: newMessageText.length > 35 ? newMessageText.slice(0, 35) + '...' : newMessageText,
          unreadCount: 0
        };
      }
      return c;
    }));

    setNewMessageText('');
  };

  const selectChat = (id: number) => {
    setActiveChatId(id);
    setShowChatPaneMobile(true);
    // Reset unread count
    setChats(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-inter relative pb-32 md:pb-6 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto pt-6 px-4 md:px-8 relative z-10">
        
        {/* Main 3-Column Grid (Wrapper, directory list, workspace pane) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-[calc(100vh-120px)] min-h-[580px] lg:min-h-[640px]">
          
          {/* Column 2: Chats Directory List (Span 5 on large screens) */}
          <div className={`lg:col-span-5 bg-white rounded-[32px] border border-gray-200/50 shadow-sm flex flex-col overflow-hidden ${
            showChatPaneMobile ? 'hidden lg:flex' : 'flex'
          }`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-50 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-[28px] font-black text-gray-800 tracking-tight leading-none">
                  Messages
                </h1>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1.5">
                  Connect with your patients calmly
                </p>
              </div>

              {/* Search patients */}
              <div className="relative w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for a patient..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-gray-200/80 rounded-full py-2.5 pl-11 pr-5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1DA349]/10 focus:border-[#1DA349] transition-all"
                />
              </div>
            </div>

            {/* Active Now horizontal scroll */}
            <div className="px-6 py-3 border-b border-gray-50 bg-[#FAF8F5]/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Active Now</span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              </div>
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1">
                {/* Active user circles */}
                <div className="flex flex-col items-center shrink-0 cursor-pointer">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1DA349] p-[1.5px] bg-white">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ahmed A." fill className="object-cover" />
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 mt-1">Ahmed A.</span>
                </div>

                <div className="flex flex-col items-center shrink-0 cursor-pointer">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1DA349] p-[1.5px] bg-white">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image src="https://randomuser.me/api/portraits/women/68.jpg" alt="Sarah M." fill className="object-cover" />
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 mt-1">Sarah M.</span>
                </div>

                <div className="flex flex-col items-center shrink-0 cursor-pointer">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1DA349] p-[1.5px] bg-white">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image src="https://randomuser.me/api/portraits/women/44.jpg" alt="Layla K." fill className="object-cover" />
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 mt-1">Layla K.</span>
                </div>
              </div>
            </div>

            {/* Chats list */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => {
                  const isActive = chat.id === activeChatId;
                  return (
                    <button
                      key={chat.id}
                      onClick={() => selectChat(chat.id)}
                      className={`w-full p-3.5 flex items-center gap-3.5 rounded-2xl transition-all duration-200 text-left relative cursor-pointer ${
                        isActive 
                          ? 'bg-[#EBFDF0] border-l-4 border-l-[#1DA349]' 
                          : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <div className="w-[52px] h-[52px] rounded-xl overflow-hidden shadow-xs border border-gray-100 relative">
                          <Image src={chat.image} alt={chat.name} fill className="object-cover" />
                        </div>
                        {chat.unreadCount > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 bg-[#1DA349] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-[15px] font-bold truncate ${isActive ? 'text-[#1DA349]' : 'text-gray-800'}`}>
                            {chat.name}
                          </span>
                          <span className={`text-[11px] font-bold shrink-0 ${isActive ? 'text-[#1DA349]' : 'text-gray-400'}`}>
                            {chat.time}
                          </span>
                        </div>
                        <p className={`text-[13px] truncate ${isActive ? 'text-[#0B5C2E]/80 font-semibold' : 'text-gray-500'}`}>
                          {chat.message}
                        </p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <span className="text-2xl">🔍</span>
                  <span className="text-[13px] font-bold mt-2">No conversations found</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Active Chat Pane (Span 7 on large screens) */}
          <div className={`lg:col-span-7 bg-white rounded-[32px] border border-gray-200/50 shadow-sm flex flex-col overflow-hidden ${
            showChatPaneMobile ? 'flex' : 'hidden lg:flex'
          }`}>
            
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                {/* Back button on mobile */}
                <button 
                  onClick={() => setShowChatPaneMobile(false)}
                  className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer shrink-0"
                  aria-label="Back to conversations list"
                >
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
                
                <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                  <Image src={activeChat.image} alt={activeChat.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-[16px] text-gray-800 leading-tight">{activeChat.name}</span>
                  <span className="text-[10px] text-[#22C55E] font-bold flex items-center gap-1 mt-0.5 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
                    ONLINE NOW
                  </span>
                </div>
              </div>

              {/* Call options */}
              <div className="flex items-center gap-1.5">
                <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Phone size={16} />
                </button>
                <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Video size={16} />
                </button>
                <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#FAF8F5]/30 flex flex-col gap-4">
              <div className="flex items-center gap-4 my-2">
                <div className="h-px bg-gray-200/60 flex-1" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0 select-none">Today</span>
                <div className="h-px bg-gray-200/60 flex-1" />
              </div>

              {activeMessages.map((msg) => {
                const isTherapist = msg.sender === 'therapist';
                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[80%] ${
                      isTherapist ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div className={`p-4 rounded-[24px] text-[14px] font-bold leading-relaxed shadow-xs ${
                      isTherapist 
                        ? 'bg-[#1DA349] text-white rounded-tr-none' 
                        : 'bg-[#F2F4F7] text-gray-700 rounded-tl-none border border-gray-200/30'
                    }`}>
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 px-1">
                      <span className="text-[10px] text-gray-400 font-semibold">{msg.time}</span>
                      {isTherapist && (
                        <CheckCheck size={12} className="text-[#1DA349]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Form & Encrypted Banner */}
            <div className="border-t border-gray-100 p-4 bg-white shrink-0 flex flex-col gap-3">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <button 
                  type="button" 
                  className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                  title="Record audio message"
                >
                  <Mic size={18} />
                </button>
                <button 
                  type="button" 
                  className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                  title="Attach file"
                >
                  <Paperclip size={18} />
                </button>
                
                <input 
                  type="text" 
                  placeholder={`Write a message to ${activeChat.name.split(' ')[0]}...`}
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200/60 rounded-full px-5 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1DA349]/10 focus:border-[#1DA349] transition-all"
                />
                
                <button 
                  type="submit" 
                  className="w-11 h-11 rounded-full bg-[#1DA349] hover:bg-[#15803d] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer shrink-0"
                  title="Send message"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>

              {/* Encryption Banner */}
              <div className="bg-[#EBFDF0] border border-[#DCFCE7] rounded-xl py-2 px-4 flex items-center justify-center gap-2 text-[10px] font-bold text-[#0B5C2E]/80 tracking-widest uppercase select-none">
                <ShieldAlert size={14} className="text-[#1DA349]" />
                <span>Encrypted • Auto-Archive On</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      <TherapistBottomNav />
    </div>
  );
}
