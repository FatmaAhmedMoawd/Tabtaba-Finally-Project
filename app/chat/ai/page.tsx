'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Send, Mic, Trash2, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ─── Avatar Icon ───────────────────────────────────────────
const TabtabaAvatarIcon = ({ className = 'w-11 h-11' }: { className?: string }) => (
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

const DiamondAlert = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2.69l7.9 7.9c.78.78.78 2.05 0 2.83L12 21.31l-7.9-7.9a2 2 0 0 1 0-2.83L12 2.69z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const WindIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
);

// ─── Types ──────────────────────────────────────────────────
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
    text: "Hello. I'm here to provide a safe space for whatever is on your mind today. How are you feeling in this moment?",
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
    text: "I hear you. That feeling of \"piling up\" can be very heavy. Let's try to break that down into smaller, more manageable pieces together.\n\nWould you like to try a 2-minute grounding exercise first, or should we talk through the specific tasks that are weighing on you?",
    timestamp: '10:13 AM',
    showWidget: false,
  },
];

function getRandomAIResponse(input: string = '') {
  const textLower = input.toLowerCase();
  if (textLower.includes('anxious') || textLower.includes('قلق')) {
    return "Anxiety can feel very heavy, but remember that it is temporary. Let's try to focus on your breathing. Would you like to try a grounding exercise, or should we talk about what is causing it?";
  }
  if (textLower.includes('sleep') || textLower.includes('نوم')) {
    return "I'm here to help you get some restful sleep. We can try a relaxing body scan exercise to ease your mind, or talk about sleep hygiene tips. What sounds best?";
  }
  if (textLower.includes('breathing') || textLower.includes('تنفس')) {
    return "Here is a quick calm breathing session to help you relax and ground yourself:";
  }
  const responses = [
    "Thank you for sharing that with me. It takes courage to be open about your feelings.",
    "I understand. How else does this make you feel? I'm here to listen.",
    "That sounds like a lot to handle. Remember to be kind to yourself during this time.",
    "Would you like to explore this feeling further, or should we try a calming technique?",
    "I'm here for you. Let's take it one step at a time.",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// ─── Main Page ───────────────────────────────────────────────
export default function AIChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isAiTyping]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.type === 'user') {
      const timer = setTimeout(() => {
        setIsAiTyping(true);
        const aiTimer = setTimeout(() => {
          const isBreathing = lastMsg.text.toLowerCase().includes('breathing') || lastMsg.text.toLowerCase().includes('تنفس');
          setMessages(prev => [
            ...prev,
            {
              id: `ai-${prev.length}`,
              type: 'ai',
              text: getRandomAIResponse(lastMsg.text),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              showWidget: isBreathing,
            },
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
      timerRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const sendMessage = (text: string = inputText) => {
    if (!text.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: `user-${prev.length}`,
        type: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        read: true,
      },
    ]);
    setInputText('');
    inputRef.current?.focus();
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <>
      {/* ═══ MOBILE LAYOUT ═══════════════════════════════════════════════ */}
      <div className="block md:hidden flex flex-col h-[100dvh] bg-gradient-to-b from-[#F0F6FA] via-[#FAF8F5] to-[#FCFAF2] font-inter max-w-lg mx-auto relative overflow-hidden">

        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 bg-white sticky top-0 z-40 border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.015)]">
          <div className="flex items-center gap-3">
            <TabtabaAvatarIcon className="w-11 h-11" />
            <div className="flex flex-col">
              <h1 className="text-[17px] font-bold text-[#1C1C1C] leading-tight">Tabtaba AI Assistant</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#30C45D]" />
                <span className="text-[12px] font-bold text-[#0D7A39]">Ready to listen</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-[#475569] hover:bg-[#F1F5F9] rounded-full transition-colors active:scale-95">
            <MoreVertical size={20} />
          </button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 flex flex-col scrollbar-hide">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[88%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row items-end'}`}>
                  {msg.type === 'ai' && <TabtabaAvatarIcon className="w-9 h-9 mb-1" />}
                  {msg.type === 'user' && (
                    <div className="w-9 h-9 bg-[#E2E8F0] rounded-full flex items-center justify-center shrink-0 mb-1 shadow-sm">
                      <svg viewBox="0 0 24 24" className="w-[60%] h-[60%] text-[#64748B]" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col gap-1 w-full">
                    <div className={`px-5 py-4 text-[15px] leading-relaxed shadow-sm transition-all duration-300 ${
                      msg.type === 'user'
                        ? 'bg-[#3B6B10] text-white rounded-[24px] rounded-br-[4px]'
                        : 'bg-[#F4F6EC] text-[#1C1C1C] rounded-[24px] rounded-bl-[4px]'
                    }`}>
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                      ))}
                    </div>

                    {msg.type === 'user' && (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#829285] px-1 justify-end mt-0.5">
                        <span>Read • {msg.timestamp}</span>
                      </div>
                    )}

                    {/* Breathing Widget */}
                    {msg.type === 'ai' && msg.showWidget && (
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
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex gap-3 items-end">
                <TabtabaAvatarIcon className="w-9 h-9 mb-1" />
                <div className="bg-[#F4F6EC] rounded-[24px] rounded-bl-[4px] px-5 py-4 flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-col items-center gap-2.5 px-5 mb-4">
          <div className="flex gap-2.5 justify-center w-full">
            <button onClick={() => sendMessage("I'm feeling anxious")} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#0D7A39]/35 rounded-full text-[13px] font-bold text-[#0D7A39] hover:bg-[#F4F9F6] active:scale-95 transition-all shadow-sm cursor-pointer">
              <DiamondAlert className="w-4 h-4 text-[#0D7A39]" />
              I'm feeling anxious
            </button>
            <button onClick={() => sendMessage("Help with sleep")} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#0D7A39]/35 rounded-full text-[13px] font-bold text-[#0D7A39] hover:bg-[#F4F9F6] active:scale-95 transition-all shadow-sm cursor-pointer">
              <Moon className="w-4 h-4 text-[#0D7A39]" />
              Help with sleep
            </button>
          </div>
          <button onClick={() => sendMessage("Breathing exercises")} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#0D7A39]/35 rounded-full text-[13px] font-bold text-[#0D7A39] hover:bg-[#F4F9F6] active:scale-95 transition-all shadow-sm cursor-pointer">
            <WindIcon className="w-4 h-4 text-[#0D7A39]" />
            Breathing exercises
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-5 pt-0 bg-transparent z-40">
          <div className="flex gap-3 items-center">
            <div className="flex-1 bg-[#F1F3EA] rounded-full min-h-[56px] flex items-center px-6 border border-transparent focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-md transition-all duration-300">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message here..."
                className="flex-1 bg-transparent border-none outline-none text-[15.5px] placeholder:text-gray-400 text-gray-800 py-3"
              />
              <button onClick={() => { setRecordingTime(0); setIsRecording(true); }} className="p-2 text-gray-500 hover:text-green-600 transition-colors cursor-pointer">
                <Mic size={22} strokeWidth={2} />
              </button>
            </div>
            <button onClick={() => sendMessage()} className="w-[56px] h-[56px] rounded-full bg-[#3B6B10] flex items-center justify-center text-white shadow-lg shadow-green-200/40 hover:bg-[#2F560C] transition-all active:scale-90 shrink-0 cursor-pointer">
              <Send size={22} strokeWidth={2.2} className="ml-0.5" />
            </button>
          </div>
        </div>

        {/* Recording Overlay */}
        <AnimatePresence>
          {isRecording && (
            <div className="fixed inset-0 z-55 flex flex-col justify-end">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setIsRecording(false); setRecordingTime(0); }} />
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative bg-white rounded-t-[40px] shadow-2xl flex flex-col items-center pt-12 pb-10 px-8 z-10">
                <div className="w-16 h-1 bg-slate-100 rounded-full absolute top-4" />
                <div className="relative flex items-center justify-center mb-10">
                  <div className="absolute w-32 h-32 bg-emerald-100 rounded-full animate-ping opacity-40" />
                  <div className="absolute w-28 h-28 bg-emerald-50 rounded-full" />
                  <div className="w-20 h-20 bg-[#30C45D] rounded-full flex items-center justify-center relative z-10 shadow-xl shadow-emerald-200">
                    <Mic size={32} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h2 className="text-[36px] font-bold text-slate-800 mb-6 tabular-nums">{formatTime(recordingTime)}</h2>
                <div className="flex items-center gap-1.5 mb-12 h-12">
                  {[...Array(18)].map((_, i) => {
                    const heights = [30, 45, 35, 60, 50, 80, 55, 85, 60, 85, 55, 80, 50, 60, 35, 45, 30, 20];
                    return <div key={i} className="w-[5px] bg-[#30C45D] rounded-full animate-pulse" style={{ height: `${heights[i]}%`, animationDelay: `${i * 0.05}s`, animationDuration: '0.8s' }} />;
                  })}
                </div>
                <div className="flex items-center justify-between w-full">
                  <button onClick={() => { setIsRecording(false); setRecordingTime(0); }} className="w-14 h-14 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center active:scale-95 transition-all border border-rose-100 cursor-pointer">
                    <Trash2 size={24} strokeWidth={2.5} />
                  </button>
                  <span className="text-[17px] text-slate-400 font-bold tracking-tight">Tap to stop</span>
                  <button onClick={() => { sendMessage('Sent a voice message 🎙️'); setIsRecording(false); setRecordingTime(0); }} className="w-14 h-14 bg-[#30C45D] text-white rounded-3xl flex items-center justify-center shadow-lg shadow-green-100 active:scale-95 transition-all cursor-pointer">
                    <Send size={24} strokeWidth={2.5} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>

      {/* ═══ DESKTOP LAYOUT ══════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-col bg-[#FCFAF6] font-inter w-full h-[calc(100vh-80px)]">
        {/* Desktop header */}
        <div className="px-8 py-5 border-b border-gray-100 bg-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <TabtabaAvatarIcon className="w-12 h-12" />
            <div>
              <h2 className="text-[18px] font-black text-gray-900 leading-tight">Tabtaba AI Assistant</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#30C45D]" />
                <span className="text-[12px] font-bold text-[#0D7A39]">Ready to listen • 24/7 Available</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black bg-green-50 text-green-600 border border-green-200 rounded-full px-3 py-1 uppercase tracking-wide">AI Coach</span>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 bg-[#FCFAF7]/60 flex flex-col">
          <AnimatePresence initial={false}>
            {messages.map(msg => {
              const isMe = msg.type === 'user';
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', damping: 22, stiffness: 200 }} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[65%] ${isMe ? 'flex-row-reverse' : 'flex-row items-end'}`}>
                    {!isMe && <TabtabaAvatarIcon className="w-10 h-10 mb-1" />}
                    {isMe && (
                      <div className="w-10 h-10 bg-[#E2E8F0] rounded-full flex items-center justify-center shrink-0 mb-1 shadow-sm">
                        <svg viewBox="0 0 24 24" className="w-[55%] h-[55%] text-[#64748B]" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className={`px-5 py-4 text-[14px] leading-relaxed shadow-sm ${
                        isMe
                          ? 'bg-[#0D7A39] text-white rounded-[24px] rounded-br-[4px]'
                          : 'bg-white text-gray-800 rounded-[24px] rounded-bl-[4px] border border-gray-100/80'
                      }`}>
                        {msg.text.split('\n').map((line, i) => (
                          <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                        ))}
                      </div>
                      <span className={`text-[10px] text-gray-400 font-bold flex items-center gap-1 ${isMe ? 'justify-end' : 'justify-start'} px-1`}>
                        {isMe ? `Read • ${msg.timestamp}` : msg.timestamp}
                      </span>

                      {/* Breathing Widget (desktop) */}
                      {!isMe && msg.showWidget && (
                        <div className="bg-[#E6F4F0] rounded-[28px] p-5 flex flex-col gap-4 mt-2 shadow-sm border border-[#D5EAE3] max-w-[340px]">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-[#C2E5DB] flex items-center justify-center text-[#0D7A39] shrink-0">
                              <WindIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#1C1C1C] text-[15px] leading-tight">Quick Calm Breathing</h4>
                              <span className="text-gray-500 text-[12px] font-medium">Guided Session • 2 min</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 h-[5px] bg-[#D4EAE3] rounded-full overflow-hidden">
                              <div className="w-[30%] h-full bg-[#0D7A39] rounded-full" />
                            </div>
                            <span className="text-[#0C7335] text-[9px] font-bold tracking-wider">PROGRESS</span>
                          </div>
                          <Link href="/relax/zone" className="w-full bg-[#30C45D] hover:bg-[#2AA950] text-white rounded-full py-2.5 flex items-center justify-center gap-2 font-bold text-[13px] transition-colors shadow-sm">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            Start Now
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isAiTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex gap-3 items-end">
                <TabtabaAvatarIcon className="w-10 h-10 mb-1" />
                <div className="bg-white rounded-[24px] rounded-bl-[4px] border border-gray-100/80 px-5 py-4 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Desktop suggestion chips */}
        <div className="px-8 py-3 bg-white border-t border-gray-100 flex items-center gap-3">
          <span className="text-[11px] text-gray-400 font-bold shrink-0">Quick:</span>
          <button onClick={() => sendMessage("I'm feeling anxious")} className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[12px] font-bold text-gray-700 hover:bg-[#F4F9F6] hover:border-[#0D7A39]/40 hover:text-[#0D7A39] active:scale-95 transition-all cursor-pointer">
            <DiamondAlert className="w-3.5 h-3.5" /> I'm feeling anxious
          </button>
          <button onClick={() => sendMessage("Help with sleep")} className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[12px] font-bold text-gray-700 hover:bg-[#F4F9F6] hover:border-[#0D7A39]/40 hover:text-[#0D7A39] active:scale-95 transition-all cursor-pointer">
            <Moon className="w-3.5 h-3.5" /> Help with sleep
          </button>
          <button onClick={() => sendMessage("Breathing exercises")} className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[12px] font-bold text-gray-700 hover:bg-[#F4F9F6] hover:border-[#0D7A39]/40 hover:text-[#0D7A39] active:scale-95 transition-all cursor-pointer">
            <WindIcon className="w-3.5 h-3.5" /> Breathing exercises
          </button>
        </div>

        {/* Desktop input */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className="flex-1 bg-gray-50 rounded-full px-6 py-3.5 border border-gray-150/70 flex items-center gap-3 focus-within:bg-white focus-within:shadow-md focus-within:border-gray-200 transition-all">
              <input
                type="text"
                placeholder="Type your message here..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="bg-transparent border-none outline-none text-[14px] text-gray-800 placeholder-gray-400 w-full"
              />
              <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer shrink-0">
                <Mic size={18} strokeWidth={2} />
              </button>
            </div>
            <button onClick={() => sendMessage()} className="w-12 h-12 rounded-full bg-[#0D7A39] hover:bg-[#0B6630] text-white flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0 cursor-pointer">
              <Send size={16} strokeWidth={2.5} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
