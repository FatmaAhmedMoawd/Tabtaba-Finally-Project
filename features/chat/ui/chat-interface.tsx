'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Mic, Send, Trash2, ChevronLeft, Bot, User, Sparkles, Wind, Moon, Heart, Smile } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  id: string;
  type: 'ai' | 'user';
  text: string;
  timestamp: string;
  read?: boolean;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'ai',
    text: "Hello! I'm here to provide a safe space for whatever is on your mind today. How are you feeling in this moment?",
    timestamp: '10:10 AM',
  },
  {
    id: '2',
    type: 'user',
    text: "I've been feeling quite overwhelmed with work lately. It feels like everything is piling up at once.",
    timestamp: '10:12 AM',
    read: true,
  },
  {
    id: '3',
    type: 'ai',
    text: "I hear you. That feeling of \"piling up\" can be very heavy. Let's try to break that down into smaller, more manageable pieces together.\n\nWould you like to talk about what's on your mind, or maybe try a quick relaxation exercise?",
    timestamp: '10:13 AM',
  }
];

const SUGGESTIONS = [
  { id: 'anxious', label: "I'm feeling anxious", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  { id: 'sleep', label: "Help with sleep", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-100" },
  { id: 'vent', label: "Just want to vent", icon: Heart, color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" },
  { id: 'breath', label: "Breathing exercise", icon: Wind, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
];

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

  // Use a stable reference for ID generation to avoid purity issues in render
  // but really we should just use the messages length for these mock IDs
  
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  // Handle AI Response in an effect to separate side effects from event handlers
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
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
    <div className="flex flex-col h-[100dvh] bg-[#F8FAFC] font-inter max-w-lg lg:max-w-xl mx-auto shadow-sm relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 bg-white sticky top-0 z-40 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-b-[24px]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="p-2 -ml-2 text-[#475569] hover:bg-[#F1F5F9] rounded-full transition-colors active:scale-95" 
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-md shadow-emerald-200">
              <Bot size={26} className="text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-white ring-1 ring-emerald-500/20"></span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[17px] font-bold text-[#1E293B] leading-tight">Tabtaba AI</h1>
            <span className="text-[12px] font-medium text-emerald-600">Online</span>
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
              <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {message.type === 'ai' && (
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 shadow-sm border border-emerald-50">
                    <Bot size={20} className="text-emerald-600" />
                  </div>
                )}
                
                <div className="flex flex-col gap-1">
                  <div 
                    className={`px-5 py-4 text-[15px] leading-relaxed shadow-sm transition-all duration-300 ${
                      message.type === 'user' 
                        ? 'bg-[#10B981] text-white rounded-[22px] rounded-tr-none' 
                        : 'bg-white text-[#334155] rounded-[22px] rounded-tl-none border border-slate-100'
                    }`}
                  >
                    {message.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                  <div className={`flex items-center gap-1 text-[11px] font-medium text-[#94A3B8] px-1 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span>{message.timestamp}</span>
                    {message.type === 'user' && message.read && (
                      <span className="text-emerald-500 font-bold ml-1">✓</span>
                    )}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center shrink-0 shadow-sm border border-slate-100 overflow-hidden">
                    <User size={20} className="text-slate-500" />
                  </div>
                )}
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
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 animate-pulse">
                <Bot size={20} className="text-emerald-600" />
              </div>
              <div className="bg-white border border-slate-100 rounded-[22px] rounded-tl-none px-5 py-4 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="px-5 mb-4 overflow-x-auto scrollbar-hide py-1">
        <div className="flex gap-2 min-w-max pb-1">
          {SUGGESTIONS.map((s) => (
            <button 
              key={s.id}
              onClick={() => handleSendMessage(s.label)}
              className={`flex items-center gap-2 px-4 py-2.5 ${s.bg} border ${s.border} rounded-2xl text-[14px] font-bold ${s.color} hover:brightness-95 transition-all active:scale-95 shadow-sm`}
            >
              <s.icon size={18} strokeWidth={2.5} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-5 pt-0 bg-white z-40 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)] rounded-t-[32px]">
        <div className="flex gap-3 items-center mt-4">
          <div className="flex-1 bg-slate-100 rounded-[24px] min-h-[56px] flex items-center px-5 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:shadow-md transition-all duration-300">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your safe space talk..." 
              className="flex-1 bg-transparent border-none outline-none text-[15.5px] placeholder:text-slate-400 text-slate-700 py-3"
            />
            <button 
              onClick={handleStartRecording}
              className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
            >
              <Mic size={22} strokeWidth={2} />
            </button>
          </div>
          <button 
            onClick={() => handleSendMessage()}
            className="w-[56px] h-[56px] rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-90 shrink-0"
          >
            <Send size={22} strokeWidth={2} className="ml-0.5" />
          </button>
        </div>
      </div>

      {/* Recording Overlay */}
      <AnimatePresence>
        {isRecording && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
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
                      className="w-[5px] bg-emerald-400 rounded-full animate-pulse shadow-sm"
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
                  className="w-14 h-14 bg-emerald-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-200 active:scale-95 transition-all"
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
