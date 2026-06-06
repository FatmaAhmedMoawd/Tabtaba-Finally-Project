'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Smile, 
  Send, 
  Phone, 
  Video, 
  Info, 
  Paperclip, 
  FileText, 
  Calendar, 
  Edit3,
  Search,
  CheckCheck,
  Mic,
  Trash2,
  ChevronLeft,
  Moon,
  MoreVertical
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

// ========================================================
// MOBILE CHAT TYPES & DATA
// ========================================================
type MobileMessage = {
  id: string;
  type: 'ai' | 'user';
  text: string;
  timestamp: string;
  read?: boolean;
  showWidget?: boolean;
};

const MOBILE_INITIAL_MESSAGES: MobileMessage[] = [
  {
    id: '1',
    type: 'ai',
    text: "Hello toka! I'm here to listen. How are you feeling today?",
    timestamp: '10:10 AM',
  },
  {
    id: '2',
    type: 'user',
    text: "I'm feeling a bit stressed from work.",
    timestamp: '10:12 AM',
    read: true,
  },
  {
    id: '3',
    type: 'ai',
    text: "I understand. Work can be overwhelming. Would you like to try a quick breathing exercise, or just talk about what's bothering you?",
    timestamp: '10:13 AM',
    showWidget: true,
  }
];

const TabtabaAvatarIcon = ({ className = "w-11 h-11" }: { className?: string }) => (
  <div className={`rounded-full bg-[#30C45D] flex items-center justify-center ${className} shrink-0 overflow-hidden shadow-sm`}>
    <svg viewBox="0 0 100 100" className="w-[75%] h-[75%] text-[#064E3B] fill-none" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="53" r="30" strokeWidth="6.5" />
      <path d="M22 50 C28 35, 72 35, 78 50" strokeWidth="6" />
      <path d="M20 53 C20 23, 80 23, 80 53" strokeWidth="6.5" />
      <rect x="14" y="44" width="7" height="18" rx="3.5" fill="currentColor" stroke="none" />
      <rect x="79" y="44" width="7" height="18" rx="3.5" fill="currentColor" stroke="none" />
      <circle cx="38" cy="55" r="4.5" fill="currentColor" stroke="none" />
      <circle cx="62" cy="55" r="4.5" fill="currentColor" stroke="none" />
      <path d="M44 68 C47 72, 53 72, 56 68" strokeWidth="6" />
      <path d="M18 60 Q26 76 46 72" strokeWidth="5.5" />
    </svg>
  </div>
);

const DiamondAlert = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2.69l7.9 7.9c.78.78.78 2.05 0 2.83L12 21.31l-7.9-7.9a2 2 0 0 1 0-2.83L12 2.69z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const WindIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
);

function getRandomAIResponse() {
  const responses = [
    "Thank you for sharing that with me. It takes courage to be open about your feelings.",
    "I understand. How else does this make you feel? I'm here to listen.",
    "That sounds like a lot to handle. Remember to be kind to yourself during this time.",
    "Would you like to explore this feeling further, or should we try a calming technique?",
    "I'm here for you. Let's take it one step at a time."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// ========================================================
// DESKTOP CHAT TYPES & DATA
// ========================================================
type FileItem = {
  name: string;
  size: string;
  date: string;
  type: 'pdf' | 'docx';
};

type Conversation = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  online: boolean;
  sharedFiles: FileItem[];
  appointment?: {
    day: string;
    time: string;
    type: string;
  };
};

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'sarah',
    name: 'Dr. Sarah Jenkins',
    role: 'Clinical Psychologist',
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'How is the meditation routine going?',
    time: '10:45 AM',
    online: true,
    sharedFiles: [
      { name: 'prescription_october.pdf', size: '2.4 MB', date: 'Oct 12', type: 'pdf' },
      { name: 'relaxation_exercises.docx', size: '1.1 MB', date: 'Oct 8', type: 'docx' },
    ],
    appointment: {
      day: 'Next Thursday',
      time: '4:00 PM (45 min)',
      type: 'Video Session',
    }
  },
  {
    id: 'michael',
    name: 'Dr. Michael Chen',
    role: 'Cognitive Behavioral Therapist',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'The weekly report has been updated.',
    time: '4 June',
    unreadCount: 2,
    online: true,
    sharedFiles: [
      { name: 'cbt_homework_week3.pdf', size: '1.8 MB', date: 'Jun 2', type: 'pdf' },
      { name: 'mood_journal_template.docx', size: '950 KB', date: 'May 28', type: 'docx' },
    ],
    appointment: {
      day: 'Tomorrow',
      time: '11:00 AM (30 min)',
      type: 'Audio Session',
    }
  },
  {
    id: 'lily',
    name: 'Dr. Lily Ahmed',
    role: 'Psychiatrist',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'See you in our next session.',
    time: 'Sep 21',
    online: false,
    sharedFiles: [
      { name: 'anxiety_management_guide.pdf', size: '3.1 MB', date: 'Sep 19', type: 'pdf' },
    ]
  }
];

type DesktopMessage = {
  id: string;
  sender: 'user' | 'doctor';
  text: string;
  time: string;
  date?: string;
};

export function ChatInterface() {
  const router = useRouter();

  // --------------------------------------------------------
  // MOBILE CHAT STATES & FUNCTIONS
  // --------------------------------------------------------
  const [mobileMessages, setMobileMessages] = useState<MobileMessage[]>(MOBILE_INITIAL_MESSAGES);
  const [mobileInputText, setMobileInputText] = useState('');
  const [mobileIsAiTyping, setMobileIsAiTyping] = useState(false);
  const [mobileIsRecording, setMobileIsRecording] = useState(false);
  const [mobileRecordingTime, setMobileRecordingTime] = useState(0);
  const mobileChatEndRef = useRef<HTMLDivElement>(null);
  const mobileTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToMobileBottom = () => {
    mobileChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToMobileBottom();
  }, [mobileMessages, mobileIsAiTyping]);

  useEffect(() => {
    const lastMsg = mobileMessages[mobileMessages.length - 1];
    if (lastMsg && lastMsg.type === 'user') {
      const timer = setTimeout(() => {
        setMobileIsAiTyping(true);
        const aiTimer = setTimeout(() => {
          setMobileMessages(prev => [
            ...prev,
            {
              id: `ai-${prev.length}`,
              type: 'ai',
              text: getRandomAIResponse(),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          ]);
          setMobileIsAiTyping(false);
        }, 2000);
        return () => clearTimeout(aiTimer);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [mobileMessages]);

  useEffect(() => {
    if (mobileIsRecording) {
      mobileTimerRef.current = setInterval(() => {
        setMobileRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
    }
    return () => {
      if (mobileTimerRef.current) clearInterval(mobileTimerRef.current);
    };
  }, [mobileIsRecording]);

  const handleMobileSendMessage = (text: string = mobileInputText) => {
    if (!text.trim()) return;

    setMobileMessages((prev) => [
      ...prev,
      {
        id: `user-${prev.length}`,
        type: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        read: true
      }
    ]);
    setMobileInputText('');
  };

  const formatMobileTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMobileStartRecording = () => {
    setMobileRecordingTime(0);
    setMobileIsRecording(true);
  };

  const handleMobileCancelRecording = () => {
    setMobileIsRecording(false);
    setMobileRecordingTime(0);
  };

  const handleMobileSendRecording = () => {
    handleMobileSendMessage("Sent a voice message 🎙️");
    setMobileIsRecording(false);
    setMobileRecordingTime(0);
  };

  // --------------------------------------------------------
  // DESKTOP CHAT STATES & FUNCTIONS
  // --------------------------------------------------------
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState('sarah');
  const [desktopInputText, setDesktopInputText] = useState('');
  
  const [messagesMap, setMessagesMap] = useState<Record<string, DesktopMessage[]>>({
    sarah: [
      {
        id: '1',
        sender: 'doctor',
        text: "Good morning, Toka. I've reviewed your mood report from yesterday. I noticed a slight improvement in sleep quality.",
        time: '10:32 AM',
        date: 'Today, 10:30 AM'
      },
      {
        id: '2',
        sender: 'user',
        text: "Good morning, Dr. Sarah. Yes, I've started feeling more comfortable after committing to the morning breathing exercises.",
        time: '10:33 AM'
      },
      {
        id: '3',
        sender: 'doctor',
        text: "That's great. How is today's meditation routine going? Have you been able to complete the morning session?",
        time: '10:35 AM'
      }
    ],
    michael: [
      {
        id: '1',
        sender: 'doctor',
        text: "Hi Toka, just checking if you filled out the CBT cognitive worksheet for this week.",
        time: '3:02 PM',
        date: 'Yesterday'
      },
      {
        id: '2',
        sender: 'user',
        text: "Hi Dr. Michael, I'm working on it now, will upload it tonight.",
        time: '3:15 PM'
      },
      {
        id: '3',
        sender: 'doctor',
        text: "Perfect. The weekly report has been updated in your documents tab.",
        time: '4:10 PM'
      }
    ],
    lily: [
      {
        id: '1',
        sender: 'doctor',
        text: "Hello Toka, I have updated your therapy prescription files. Please download them before our session.",
        time: '11:00 AM',
        date: 'Sep 21'
      },
      {
        id: '2',
        sender: 'user',
        text: "Thank you Dr. Lily, I downloaded them. See you in our next session.",
        time: '11:15 AM'
      }
    ]
  });

  const desktopChatEndRef = useRef<HTMLDivElement>(null);
  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];
  const activeMessages = messagesMap[activeChat.id] || [];

  const scrollToDesktopBottom = () => {
    desktopChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToDesktopBottom();
  }, [activeChatId, messagesMap]);

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setConversations(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, unreadCount: undefined };
      }
      return c;
    }));
  };

  const handleDesktopSendMessage = () => {
    if (!desktopInputText.trim()) return;

    const newMessage: DesktopMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: desktopInputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessagesMap(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === activeChat.id) {
        return {
          ...c,
          lastMessage: desktopInputText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return c;
    }));

    setDesktopInputText('');

    setTimeout(() => {
      const doctorReply: DesktopMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        text: `Thank you for your update! Let's discuss this further in our upcoming session on ${activeChat.appointment?.day || 'our next schedule'}.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessagesMap(prev => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), doctorReply]
      }));

      setConversations(prev => prev.map(c => {
        if (c.id === activeChat.id) {
          return {
            ...c,
            lastMessage: doctorReply.text,
            time: doctorReply.time
          };
        }
        return c;
      }));
    }, 1500);
  };

  return (
    <>
      {/* ========================================================
          OLD MOBILE LAYOUT (Exactly as it was originally)
          ======================================================== */}
      <div className="block md:hidden flex flex-col h-[100dvh] bg-[#FAFCFB] font-inter max-w-lg mx-auto shadow-sm relative overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 bg-white sticky top-0 z-40 shadow-[0_2px_10px_rgba(0,0,0,0.03)] rounded-b-[24px]">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()} 
              className="p-2 -ml-2 text-[#475569] hover:bg-[#F1F5F9] rounded-full transition-colors active:scale-95" 
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <TabtabaAvatarIcon className="w-11 h-11" />
            <div className="flex flex-col">
              <h1 className="text-[17px] font-bold text-[#1C1C1C] leading-tight">Tabtaba AI Assistant</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#30C45D]"></span>
                <span className="text-[12px] font-bold text-[#0D7A39]">Ready to listen</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-[#475569] hover:bg-[#F1F5F9] rounded-full transition-colors active:scale-95">
            <MoreVertical size={20} className="text-[#475569]" />
          </button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 flex flex-col scrollbar-hide">
          <AnimatePresence initial={false}>
            {mobileMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className={`flex w-full ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[88%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row items-end'}`}>
                  {message.type === 'ai' && (
                    <TabtabaAvatarIcon className="w-9 h-9 mb-1" />
                  )}
                  {message.type === 'user' && (
                    <div className="w-9 h-9 bg-[#E2E8F0] rounded-full flex items-center justify-center shrink-0 mb-1 shadow-sm">
                      <svg viewBox="0 0 24 24" className="w-[60%] h-[60%] text-[#64748B]" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1 w-full">
                    <div 
                      className={`px-5 py-4 text-[15px] leading-relaxed shadow-sm transition-all duration-300 ${
                        message.type === 'user' 
                          ? 'bg-[#3B6B10] text-white rounded-[24px] rounded-br-[4px]' 
                          : 'bg-[#F4F6EC] text-[#1C1C1C] rounded-[24px] rounded-bl-[4px]'
                      }`}
                    >
                      {message.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                      ))}
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#829285] px-1 justify-end mt-0.5">
                        <span>Read • {message.timestamp}</span>
                      </div>
                    )}

                    {/* Breathing Exercise Card inline */}
                    {message.type === 'ai' && message.showWidget && (
                      <div className="bg-[#E6F4F0] rounded-[32px] p-5 flex flex-col gap-4 mt-3 max-w-full shadow-sm border border-[#D5EAE3]">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#C2E5DB] flex items-center justify-center text-[#0D7A39] shrink-0">
                            <WindIcon className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col">
                            <h4 className="font-bold text-[#1C1C1C] text-[16px] leading-tight">Quick Calm Breathing</h4>
                            <span className="text-gray-500 text-[13px] font-medium">Guided Session • 2 min</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 h-[6px] bg-[#D4EAE3] rounded-full relative overflow-hidden">
                            <div className="w-[30%] h-full bg-[#0D7A39] rounded-full" />
                          </div>
                          <span className="text-[#0C7335] text-[10px] font-bold tracking-wider">PROGRESS</span>
                        </div>

                        <Link 
                          href="/relax/zone"
                          className="w-full bg-[#30C45D] hover:bg-[#2AA950] text-white rounded-full py-3 flex items-center justify-center gap-2 font-bold text-[14px] transition-colors shadow-sm"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Start Now
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {mobileIsAiTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 items-end">
                <TabtabaAvatarIcon className="w-9 h-9 mb-1" />
                <div className="bg-[#F4F6EC] rounded-[24px] rounded-bl-[4px] px-5 py-4 flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={mobileChatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-col items-center gap-3 px-5 mb-4">
          <div className="flex gap-3 justify-center w-full">
            <button 
              onClick={() => handleMobileSendMessage("I'm feeling anxious")}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-[#D2E0D5] rounded-full text-[14px] font-bold text-[#3B6B10] hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
            >
              <DiamondAlert className="w-4 h-4 text-[#3B6B10]" />
              I'm feeling anxious
            </button>
            <button 
              onClick={() => handleMobileSendMessage("Help with sleep")}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-[#D2E0D5] rounded-full text-[14px] font-bold text-[#3B6B10] hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
            >
              <Moon className="w-4 h-4 text-[#3B6B10]" />
              Help with sleep
            </button>
          </div>
          
          <Link 
            href="/relax/zone"
            className="flex items-center gap-2 px-5 py-3 bg-white border border-[#D2E0D5] rounded-full text-[14px] font-bold text-[#3B6B10] hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
          >
            <WindIcon className="w-4 h-4 text-[#3B6B10]" />
            Breathing exercises
          </Link>
        </div>

        {/* Input Bar */}
        <div className="p-5 pt-0 bg-transparent z-40">
          <div className="flex gap-3 items-center">
            <div className="flex-1 bg-[#F1F3EA] rounded-full min-h-[56px] flex items-center px-6 border border-transparent focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-md transition-all duration-300">
              <input 
                type="text" 
                value={mobileInputText}
                onChange={(e) => setMobileInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleMobileSendMessage()}
                placeholder="Type your message here..." 
                className="flex-1 bg-transparent border-none outline-none text-[15.5px] placeholder:text-gray-400 text-gray-800 py-3"
              />
              <button 
                onClick={handleMobileStartRecording}
                className="p-2 text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
              >
                <Mic size={22} strokeWidth={2} />
              </button>
            </div>
            <button 
              onClick={() => handleMobileSendMessage()}
              className="w-[56px] h-[56px] rounded-full bg-[#3B6B10] flex items-center justify-center text-white shadow-lg shadow-green-200/40 hover:bg-[#2F560C] transition-all active:scale-90 shrink-0 cursor-pointer"
            >
              <Send size={22} strokeWidth={2.2} className="ml-0.5" />
            </button>
          </div>
        </div>

        {/* Recording Overlay */}
        <AnimatePresence>
          {mobileIsRecording && (
            <div className="fixed inset-0 z-55 flex flex-col justify-end">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
                onClick={handleMobileCancelRecording}
              />
              
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative bg-white rounded-t-[40px] shadow-2xl flex flex-col items-center pt-12 pb-10 px-8 z-10"
              >
                <div className="w-16 h-1 bg-slate-100 rounded-full absolute top-4"></div>
                
                <div className="relative flex items-center justify-center mb-10">
                  <div className="absolute w-32 h-32 bg-emerald-100 rounded-full animate-ping opacity-40"></div>
                  <div className="absolute w-28 h-28 bg-emerald-50 rounded-full"></div>
                  <div className="w-20 h-20 bg-emerald-505 rounded-full flex items-center justify-center relative z-10 shadow-xl shadow-emerald-200">
                    <Mic size={32} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <h2 className="text-[36px] font-bold text-slate-800 mb-6 tabular-nums">
                  {formatMobileTime(mobileRecordingTime)}
                </h2>

                <div className="flex items-center gap-1.5 mb-12 h-12">
                  {[...Array(18)].map((_, i) => {
                    const heights = [30, 45, 35, 60, 50, 80, 55, 85, 60, 85, 55, 80, 50, 60, 35, 45, 30, 20];
                    return (
                      <div 
                        key={i} 
                        className="w-[5px] bg-[#30C45D] rounded-full animate-pulse shadow-sm"
                        style={{ 
                          height: `${heights[i]}%`,
                          animationDelay: `${i * 0.05}s`,
                          animationDuration: '0.8s'
                        }}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-between w-full">
                  <button 
                    onClick={handleMobileCancelRecording}
                    className="w-14 h-14 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center active:scale-95 transition-all border border-rose-100 cursor-pointer"
                  >
                    <Trash2 size={24} strokeWidth={2.5} />
                  </button>
                  
                  <span className="text-[17px] text-slate-400 font-bold tracking-tight">Tap to stop</span>
                  
                  <button 
                    onClick={handleMobileSendRecording}
                    className="w-14 h-14 bg-[#30C45D] text-white rounded-3xl flex items-center justify-center shadow-lg shadow-green-100 active:scale-95 transition-all cursor-pointer"
                  >
                    <Send size={24} strokeWidth={2.5} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>

      {/* ========================================================
          NEW HIGH-FIDELITY WEB DESKTOP LAYOUT (Exactly matching mockup)
          ======================================================== */}
      <div className="hidden md:flex bg-[#FCFAF6] font-inter w-full min-h-[calc(100vh-80px)] p-6 gap-6">
        
        {/* Column 1: Conversations List (Left) */}
        <div className="w-1/4 bg-white rounded-[32px] border border-gray-150/70 shadow-sm p-6 flex flex-col min-w-[280px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-gray-900">Conversations</h2>
            <button className="w-9 h-9 rounded-full bg-[#E6F4F0] text-[#0D7A39] flex items-center justify-center hover:bg-[#d5ece4] transition-colors cursor-pointer">
              <Edit3 size={16} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-2">
            {conversations.map((item) => {
              const isSelected = item.id === activeChatId;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectChat(item.id)}
                  className={`w-full flex items-start gap-3.5 p-3 rounded-2xl transition-all cursor-pointer text-left ${
                    isSelected 
                      ? 'bg-[#EBF5F1] border border-[#d2ebe1]' 
                      : 'bg-transparent border border-transparent hover:bg-gray-55'
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                      <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                    </div>
                    {item.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[13px] font-black text-gray-900 truncate leading-tight">{item.name}</span>
                      <span className="text-[10px] text-gray-400 font-medium shrink-0 ml-1">{item.time}</span>
                    </div>
                    <p className={`text-xs truncate ${isSelected ? 'text-[#0D7A39] font-bold' : 'text-gray-400 font-[500]'}`}>
                      {item.lastMessage}
                    </p>
                  </div>

                  {item.unreadCount && (
                    <div className="w-4 h-4 rounded-full bg-[#22C55E] text-white text-[8px] font-black flex items-center justify-center shrink-0">
                      {item.unreadCount}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Active Chat panel (Center) */}
        <div className="flex-1 bg-white rounded-[32px] border border-gray-150/70 shadow-sm flex flex-col overflow-hidden">
          
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                  <Image src={activeChat.avatar} alt={activeChat.name} fill className="object-cover" />
                </div>
                {activeChat.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 leading-none">{activeChat.name}</h3>
                <span className="text-[10px] text-green-500 font-extrabold block mt-1">
                  {activeChat.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <button className="p-2 hover:bg-gray-55 hover:text-gray-700 rounded-full transition-all cursor-pointer">
                <Video size={18} strokeWidth={2.5} />
              </button>
              <button className="p-2 hover:bg-gray-55 hover:text-gray-700 rounded-full transition-all cursor-pointer">
                <Phone size={18} strokeWidth={2.5} />
              </button>
              <button className="p-2 hover:bg-gray-55 hover:text-gray-700 rounded-full transition-all cursor-pointer">
                <Info size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Message Feed list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#FCFAF7]/40 flex flex-col">
            {activeMessages.map((msg) => {
              const isMe = msg.sender === 'user';
              return (
                <div key={msg.id} className="flex flex-col">
                  {msg.date && (
                    <div className="text-center my-4">
                      <span className="text-[10px] font-black text-gray-400 bg-gray-100 rounded-full px-3 py-1 uppercase tracking-wider">
                        {msg.date}
                      </span>
                    </div>
                  )}

                  <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className="flex flex-col gap-1 max-w-[70%]">
                      <div 
                        className={`px-4.5 py-3.5 text-xs leading-relaxed shadow-sm transition-all duration-300 font-[500] ${
                          isMe 
                            ? 'bg-[#0D7A39] text-white rounded-[24px] rounded-br-[4px]' 
                            : 'bg-[#FAF7F3] text-gray-800 rounded-[24px] rounded-bl-[4px] border border-[#EBE3D7]/50'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className={`text-[9px] text-gray-400 font-extrabold flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        {msg.time}
                        {isMe && <CheckCheck size={11} className="text-[#0D7A39]" strokeWidth={3} />}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={desktopChatEndRef} />
          </div>

          {/* Chat input box */}
          <div className="p-5 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-50 rounded-full px-5 py-2.5 border border-gray-150/70 flex items-center gap-3 focus-within:bg-white focus-within:shadow-sm focus-within:border-gray-200 transition-all">
                <button className="text-gray-400 hover:text-gray-650 transition-colors cursor-pointer">
                  <Plus size={18} strokeWidth={2.5} />
                </button>
                <button className="text-gray-400 hover:text-gray-650 transition-colors cursor-pointer">
                  <Smile size={18} strokeWidth={2.5} />
                </button>
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={desktopInputText}
                  onChange={(e) => setDesktopInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDesktopSendMessage()}
                  className="bg-transparent border-none outline-none text-xs text-gray-850 placeholder-gray-400 w-full"
                />
              </div>
              
              <button
                onClick={handleDesktopSendMessage}
                className="w-11 h-11 rounded-full bg-[#0D7A39] hover:bg-[#0B6630] text-white flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <Send size={15} strokeWidth={2.5} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Column 3: Specialist Profile details (Right) */}
        <div className="w-1/4 bg-white rounded-[32px] border border-gray-150/70 shadow-sm p-6 flex flex-col gap-6 min-w-[280px]">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shadow-sm mb-3">
              <Image src={activeChat.avatar} alt={activeChat.name} fill className="object-cover" />
            </div>
            <h2 className="text-base font-black text-gray-900">{activeChat.name}</h2>
            <span className="text-[11px] text-gray-400 font-[650] leading-none mt-1">{activeChat.role}</span>
            
            <div className="flex gap-1.5 mt-3 justify-center">
              <span className="text-[9px] font-black bg-green-50 text-green-600 border border-green-200 rounded-full px-2.5 py-0.5 uppercase tracking-wide">
                Active
              </span>
              <span className="text-[9px] font-black bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-2.5 py-0.5 uppercase tracking-wide">
                Available
              </span>
            </div>

            <button className="mt-4 px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-[11px] font-bold text-gray-650 transition-colors w-full cursor-pointer">
              View Profile
            </button>
          </div>

          {/* Shared Files list */}
          <div className="border-t border-gray-100 pt-5 flex flex-col gap-3">
            <span className="text-[9px] font-black text-gray-400 tracking-wider uppercase">SHARED FILES</span>
            <div className="flex flex-col gap-2">
              {activeChat.sharedFiles.map((file, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                      <FileText size={16} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-gray-800 truncate block leading-tight">{file.name}</span>
                      <span className="text-[9px] text-gray-400 font-bold block mt-0.5">{file.size} &bull; {file.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming appointments card */}
          {activeChat.appointment && (
            <div className="border-t border-gray-100 pt-5 mt-auto flex flex-col gap-3">
              <span className="text-[9px] font-black text-gray-400 tracking-wider uppercase">UPCOMING APPOINTMENTS</span>
              <div className="bg-[#E6F4F0] border border-[#d1ebe1] rounded-2xl p-4 flex gap-3 items-start shadow-sm">
                <Calendar size={16} className="text-[#0D7A39] shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <span className="text-xs font-black text-[#0D7A39] block leading-none">{activeChat.appointment.day}</span>
                  <span className="text-[10px] text-gray-500 font-bold block mt-1.5">{activeChat.appointment.time}</span>
                  <span className="text-[9px] text-[#0D7A39] font-black uppercase tracking-wider block mt-1">{activeChat.appointment.type}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
