'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Mic, Send, Trash2, ChevronLeft, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

type Message = {
  id: string;
  type: 'ai' | 'user';
  text: string;
  timestamp: string;
  read?: boolean;
  showWidget?: boolean;
};

const INITIAL_MESSAGES: Message[] = [
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
      {/* Head outline */}
      <circle cx="50" cy="53" r="30" strokeWidth="6.5" />
      
      {/* Hair bangs */}
      <path d="M22 50 C28 35, 72 35, 78 50" strokeWidth="6" />
      
      {/* Headset band */}
      <path d="M20 53 C20 23, 80 23, 80 53" strokeWidth="6.5" />
      
      {/* Headset ear cups */}
      <rect x="14" y="44" width="7" height="18" rx="3.5" fill="currentColor" stroke="none" />
      <rect x="79" y="44" width="7" height="18" rx="3.5" fill="currentColor" stroke="none" />
      
      {/* Eyes */}
      <circle cx="38" cy="55" r="4.5" fill="currentColor" stroke="none" />
      <circle cx="62" cy="55" r="4.5" fill="currentColor" stroke="none" />
      
      {/* Smile */}
      <path d="M44 68 C47 72, 53 72, 56 68" strokeWidth="6" />
      
      {/* Microphone boom arm */}
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

export function ChatInterface() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.type === 'user') {
      const timer = setTimeout(() => {
        setIsAiTyping(true);
        const aiTimer = setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: `ai-${prev.length}`,
              type: 'ai',
              text: getRandomAIResponse(),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          ]);
          setIsAiTyping(false);
        }, 2000);
        return () => clearTimeout(aiTimer);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${prev.length}`,
        type: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        read: true
      }
    ]);
    setInputText('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setRecordingTime(0);
    setIsRecording(true);
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
  };

  const handleSendRecording = () => {
    handleSendMessage("Sent a voice message 🎤");
    setIsRecording(false);
    setRecordingTime(0);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-gradient-to-br from-[#FAFCF9] via-[#F4F9F5] to-[#FCF9F0] font-inter max-w-lg mx-auto shadow-sm relative overflow-hidden">
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
        <button className="p-2 text-[#475569] hover:bg-[#F1F5F9] rounded-full transition-colors">
          <MoreVertical size={20} strokeWidth={2.5} />
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 flex flex-col scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
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
                
                <div className="flex flex-col gap-1 w-full">
                  <div 
                    className={`px-5 py-4 text-[15px] leading-relaxed shadow-sm transition-all duration-300 ${
                      message.type === 'user' 
                        ? 'bg-[#2D6A12] text-white rounded-[24px] rounded-br-[4px]' 
                        : 'bg-[#F0F4EC] text-[#2C3A24] rounded-[24px] rounded-bl-[4px]'
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

        {isAiTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex gap-3 items-end">
              <TabtabaAvatarIcon className="w-9 h-9 mb-1" />
              <div className="bg-[#F0F4EC] rounded-[24px] rounded-bl-[4px] px-5 py-4 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce"></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-col items-center gap-3 px-5 mb-4">
        <div className="flex gap-3 justify-center w-full">
          <button 
            onClick={() => handleSendMessage("I'm feeling anxious")}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-full text-[14px] font-bold text-[#1E7B44] hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
          >
            <DiamondAlert className="w-4 h-4 text-[#1E7B44]" />
            I'm feeling anxious
          </button>
          <button 
            onClick={() => handleSendMessage("Help with sleep")}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-full text-[14px] font-bold text-[#1E7B44] hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
          >
            <Moon className="w-4 h-4 text-[#1E7B44]" />
            Help with sleep
          </button>
        </div>
        
        <Link 
          href="/relax/zone"
          className="flex items-center gap-2.5 px-6 py-3 bg-[#30C45D] hover:bg-[#2AA950] rounded-full text-[14px] font-bold text-white active:scale-95 transition-all shadow-md shadow-green-200/50"
        >
          <WindIcon className="w-4 h-4 text-white" />
          Breathing exercises
        </Link>
      </div>

      {/* Input Bar */}
      <div className="p-5 pt-0 bg-transparent z-40">
        <div className="flex gap-3 items-center">
          <div className="flex-1 bg-[#F2F4F0] rounded-full min-h-[56px] flex items-center px-6 border border-transparent focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-md transition-all duration-300">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..." 
              className="flex-1 bg-transparent border-none outline-none text-[15.5px] placeholder:text-gray-400 text-gray-700 py-3"
            />
            <button 
              onClick={handleStartRecording}
              className="p-2 text-gray-500 hover:text-green-600 transition-colors"
            >
              <Mic size={22} strokeWidth={2} />
            </button>
          </div>
          <button 
            onClick={() => handleSendMessage()}
            className="w-[56px] h-[56px] rounded-full bg-[#30C45D] flex items-center justify-center text-white shadow-lg shadow-green-200/50 hover:bg-[#2AA950] transition-all active:scale-90 shrink-0"
          >
            <Send size={22} strokeWidth={2.2} className="ml-0.5" />
          </button>
        </div>
      </div>

      {/* Recording Overlay */}
      <AnimatePresence>
        {isRecording && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end animate-fade-in">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
              onClick={handleCancelRecording}
            />
            
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-white rounded-t-[40px] shadow-2xl flex flex-col items-center pt-12 pb-10 px-8"
            >
              <div className="w-16 h-1 bg-slate-100 rounded-full absolute top-4"></div>
              
              <div className="relative flex items-center justify-center mb-10">
                <div className="absolute w-32 h-32 bg-emerald-100 rounded-full animate-ping opacity-40"></div>
                <div className="absolute w-28 h-28 bg-emerald-50 rounded-full"></div>
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center relative z-10 shadow-xl shadow-emerald-200">
                  <Mic size={32} className="text-white" strokeWidth={2.5} />
                </div>
              </div>

              <h2 className="text-[36px] font-bold text-slate-800 mb-6 tabular-nums">
                {formatTime(recordingTime)}
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
                  onClick={handleCancelRecording}
                  className="w-14 h-14 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center active:scale-95 transition-all border border-rose-100"
                >
                  <Trash2 size={24} strokeWidth={2.5} />
                </button>
                
                <span className="text-[17px] text-slate-400 font-bold tracking-tight">Tap to stop</span>
                
                <button 
                  onClick={handleSendRecording}
                  className="w-14 h-14 bg-[#30C45D] text-white rounded-3xl flex items-center justify-center shadow-lg shadow-green-100 active:scale-95 transition-all"
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
  );
}
