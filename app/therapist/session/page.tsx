'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mic, 
  MicOff,
  Video, 
  VideoOff,
  MonitorUp, 
  PhoneMissed,
  FileText,
  TrendingUp,
  Frown,
  Meh,
  Smile,
  Paperclip,
  Wifi,
  Timer,
  X,
  Trash2,
  CheckCircle,
  Plus
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function SessionPage() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [selectedMood, setSelectedMood] = useState('neutral');
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('9:41');

  // Live camera stream refs and hooks
  const streamRef = useRef<MediaStream | null>(null);
  const therapistVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const shouldHaveCamera = !isVideoOff;

    if (shouldHaveCamera) {
      let isStopped = false;
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      })
      .then((stream) => {
        if (isStopped) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = stream;
        if (therapistVideoRef.current) {
          therapistVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.warn("Could not start therapist camera:", err);
      });

      return () => {
        isStopped = true;
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
          streamRef.current = null;
        }
      };
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    }
  }, [isVideoOff]);

  const setTherapistVideoRef = (el: HTMLVideoElement | null) => {
    therapistVideoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
    }
  };

  // Note management states
  const [isNotesDrawerOpen, setIsNotesDrawerOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<{ id: string; text: string; time: string }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const updateTime = () => {
        const now = new Date();
        setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false }));
      };
      updateTime();
      const interval = setInterval(updateTime, 10000);
      return () => clearInterval(interval);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Safe client-only data loading after component mount
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      const saved = localStorage.getItem('sarah_session_saved_notes');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setTimeout(() => {
            setSavedNotes(parsed);
          }, 0);
        } catch (e) {
          console.error('Error parsing notes:', e);
        }
      }
      const draft = localStorage.getItem('sarah_session_current_note');
      if (draft) {
        setTimeout(() => {
          setCurrentNote(draft);
        }, 0);
      }
    }
  }, [mounted]);

  const handleCurrentNoteChange = (val: string) => {
    setCurrentNote(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sarah_session_current_note', val);
    }
  };

  const handleAddNote = () => {
    if (!currentNote.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const newNote = {
      id: Math.random().toString(36).substring(2, 9),
      text: currentNote.trim(),
      time: timeStr
    };
    const updated = [newNote, ...savedNotes];
    setSavedNotes(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sarah_session_saved_notes', JSON.stringify(updated));
      localStorage.removeItem('sarah_session_current_note');
    }
    setCurrentNote('');
  };

  const handleDeleteNote = (id: string) => {
    const updated = savedNotes.filter(note => note.id !== id);
    setSavedNotes(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sarah_session_saved_notes', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#EBF5F3] to-[#FDFDF5] font-inter relative pb-32 md:flex md:flex-col md:items-center w-full overflow-x-hidden">
      <div className="w-full max-w-md mx-auto md:max-w-3xl px-6 pt-4 relative">
        


        {/* Header */}
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center gap-3">
            <div className="w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 shadow-sm border border-black/5">
              <Image 
                src="https://randomuser.me/api/portraits/women/68.jpg" 
                alt="Therapist" 
                width={46} 
                height={46} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[22px] font-extrabold text-[#1D2D50] leading-none tracking-tight">Tabtaba</span>
              <span className="text-[10px] font-bold text-[#8997A5] tracking-widest mt-1">ACTIVE SESSION</span>
            </div>
          </div>
          
          <div className="bg-[#EAF6ED] rounded-full px-4 py-2.5 flex items-center gap-2 shadow-sm border border-white/50">
            <Timer size={18} className="text-[#1DA349]" strokeWidth={2.5} />
            <span className="text-[#1DA349] font-bold text-[16px]">24:15</span>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative w-full h-[280px] rounded-[32px] overflow-visible mb-12 shadow-sm">
          {/* Main Video (Patient) */}
          <div className="w-full h-full rounded-[32px] overflow-hidden relative border border-black/5">
            <Image 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800&h=600" 
              alt="Patient Video" 
              fill
              className="object-cover object-top"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            
            {/* Status Overlays */}
            <div className="absolute bottom-[44px] left-5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
              <span className="text-white font-semibold text-[14px]">Sarah Ahmed</span>
            </div>
            <div className="absolute bottom-[44px] right-5 flex items-center gap-1.5 text-white/90">
              <Wifi size={14} />
              <span className="text-[12px] font-medium">Stable Connection</span>
            </div>
          </div>

          {/* Picture in Picture (Therapist) */}
          <div className="absolute top-4 right-4 w-[120px] h-[85px] rounded-2xl overflow-hidden border-[3px] border-white/20 shadow-lg bg-[#0F172A] flex items-center justify-center">
            {!isVideoOff ? (
              <video
                ref={setTherapistVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-1.5 bg-black/50 w-full h-full">
                <VideoOff size={16} className="text-red-400 mb-0.5" />
                <span className="text-[7.5px] font-black tracking-widest text-slate-400 uppercase">
                  OFF
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons Floating at the bottom */}
          <div className="absolute -bottom-[28px] left-0 w-full flex items-center justify-center gap-4 z-10 px-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              {isMuted ? <MicOff size={24} className="text-gray-700" /> : <Mic size={24} className="text-gray-700" />}
            </button>
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              {isVideoOff ? <VideoOff size={24} className="text-gray-700" /> : <Video size={24} className="text-gray-700" />}
            </button>
            <button className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors border border-gray-100">
              <MonitorUp size={24} className="text-gray-700" />
            </button>
            <button 
              onClick={() => router.push('/sessions/complete')}
              className="w-[68px] h-[68px] rounded-full bg-[#C82A2A] flex items-center justify-center shadow-lg shadow-red-500/20 hover:bg-[#b02525] transition-colors ml-2"
            >
              <PhoneMissed size={28} className="text-white" />
            </button>
          </div>
        </div>

        {/* Patient Info Section */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F1F5F9] mb-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-[24px] font-extrabold text-[#1DA349] leading-tight">Sarah Ahmed</h2>
              <p className="text-[#64748B] font-medium text-[15px] mt-1">Session 4 • General Anxiety</p>
            </div>
            <button className="p-2">
              <FileText size={24} className="text-[#1DA349]" strokeWidth={2} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="bg-[#FAFAFA] rounded-2xl p-4 flex flex-col gap-2 border border-[#F1F5F9]">
              <span className="text-[#8997A5] text-[12px] font-semibold tracking-wide">Last Mood Rating</span>
              <div className="flex items-center gap-2 text-[#1DA349]">
                <div className="bg-[#1DA349] rounded-full p-1 text-white">
                  <Meh size={16} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-[15px]">Balanced</span>
              </div>
            </div>
            <div className="bg-[#FAFAFA] rounded-2xl p-4 flex flex-col gap-2 border border-[#F1F5F9]">
              <span className="text-[#8997A5] text-[12px] font-semibold tracking-wide">Overall Progress</span>
              <div className="flex items-center gap-2 text-[#1DA349]">
                <TrendingUp size={20} strokeWidth={2.5} />
                <span className="font-bold text-[15px]">65%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emotional Status Tracking */}
        <div className="mb-6">
          <h3 className="text-[#1DA349] font-bold text-[16px] mb-4 px-2">Current Emotional Status Tracking</h3>
          <div className="flex justify-between items-center px-1">
            
            <button 
              onClick={() => setSelectedMood('depressed')}
              className={`flex flex-col items-center gap-2 w-[72px] h-[92px] rounded-full justify-center transition-all ${selectedMood === 'depressed' ? 'bg-[#1DA349] shadow-lg shadow-green-500/20' : 'bg-[#F2F4F7]'}`}
            >
              <Frown size={32} className={selectedMood === 'depressed' ? 'text-white' : 'text-[#8997A5]'} strokeWidth={1.5} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedMood === 'depressed' ? 'text-white' : 'text-[#8997A5]'}`}>
                Depressed
              </span>
            </button>

            <button 
              onClick={() => setSelectedMood('sad')}
              className={`flex flex-col items-center gap-2 w-[72px] h-[92px] rounded-full justify-center transition-all ${selectedMood === 'sad' ? 'bg-[#1DA349] shadow-lg shadow-green-500/20' : 'bg-[#F2F4F7]'}`}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={selectedMood === 'sad' ? 'text-white' : 'text-[#8997A5]'}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 9.05v-.1"/>
                <path d="M16 9.05v-.1"/>
                <path d="M16 16c-1.3-1.6-3.8-1.6-5 0"/>
              </svg>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedMood === 'sad' ? 'text-white' : 'text-[#8997A5]'}`}>
                Sad
              </span>
            </button>

            <button 
              onClick={() => setSelectedMood('neutral')}
              className={`flex flex-col items-center gap-2 w-[88px] h-[108px] rounded-full justify-center transition-all ${selectedMood === 'neutral' ? 'bg-[#22C55E] shadow-xl shadow-green-500/30 -translate-y-2' : 'bg-[#F2F4F7]'}`}
            >
              <Meh size={36} className={selectedMood === 'neutral' ? 'text-white' : 'text-[#8997A5]'} strokeWidth={2} />
              <span className={`text-[11px] font-extrabold uppercase tracking-widest ${selectedMood === 'neutral' ? 'text-white' : 'text-[#8997A5]'}`}>
                Neutral
              </span>
            </button>

            <button 
              onClick={() => setSelectedMood('happy')}
              className={`flex flex-col items-center gap-2 w-[72px] h-[92px] rounded-full justify-center transition-all ${selectedMood === 'happy' ? 'bg-[#1DA349] shadow-lg shadow-green-500/20' : 'bg-[#F2F4F7]'}`}
            >
              <Smile size={32} className={selectedMood === 'happy' ? 'text-white' : 'text-[#8997A5]'} strokeWidth={1.5} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedMood === 'happy' ? 'text-white' : 'text-[#8997A5]'}`}>
                Happy
              </span>
            </button>

          </div>
        </div>

        {/* Live Session Notes */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F1F5F9] mb-6 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1DA349] font-bold text-[18px]">Live Session Notes</h3>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#1DA349]"></div>
              <div className="w-2 h-2 rounded-full bg-[#E2E8F0]"></div>
              <div className="w-2 h-2 rounded-full bg-[#E2E8F0]"></div>
            </div>
          </div>
          
          <div className="relative">
            <textarea 
              value={currentNote}
              onChange={(e) => handleCurrentNoteChange(e.target.value)}
              className="w-full h-[140px] bg-[#F8FAFC] rounded-2xl p-4 text-[#4F5B7B] placeholder:text-[#BAC7D5] focus:outline-none focus:ring-2 focus:ring-[#1DA349]/20 resize-none"
              placeholder="Start typing your notes here..."
            ></textarea>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#8997A5] hover:bg-[#E2E8F0] transition-colors">
                  <Paperclip size={18} />
                </button>
                <button className="w-9 h-9 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#8997A5] hover:bg-[#E2E8F0] transition-colors">
                  <Mic size={18} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#8997A5] text-[12px] font-medium">Auto-saved</span>
                {currentNote.trim() && (
                  <button 
                    onClick={handleAddNote}
                    className="bg-[#1DA349] text-white px-4 py-1.5 rounded-full text-[13px] font-bold shadow-md shadow-green-500/10 hover:bg-[#15803d] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>Save Note</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Session Notes Log List */}
        {savedNotes.length > 0 && (
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#F1F5F9] mb-8">
            <h3 className="text-[#1D2D50] font-extrabold text-[16px] mb-4 flex items-center justify-between">
              <span>Saved Session Notes ({savedNotes.length})</span>
              <span className="text-[10px] font-bold bg-[#EAF6ED] text-[#1DA349] px-2.5 py-1 rounded-full uppercase tracking-wider">Log</span>
            </h3>
            <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-1">
              {savedNotes.map((note) => (
                <div key={note.id} className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl p-4 relative group hover:border-[#E2E8F0] transition-colors">
                  <p className="text-[#4F5B7B] text-[14px] leading-relaxed whitespace-pre-wrap pr-10">{note.text}</p>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-dashed border-[#E2E8F0] text-[11px] font-bold text-[#8997A5]">
                    <span>{note.time}</span>
                    <button 
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-[#C82A2A] hover:text-red-700 transition-colors p-1 flex items-center gap-1 cursor-pointer"
                      title="Delete note"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto md:max-w-3xl bg-gradient-to-t from-[#FDFDF5] via-[#FDFDF5]/90 to-transparent pt-12 pb-6 px-6 z-40 flex items-center gap-4">
        <button 
          onClick={() => setIsNotesDrawerOpen(true)}
          className="flex-1 bg-[#1EA34B] hover:bg-[#15803d] text-white rounded-[24px] py-[18px] flex items-center justify-center gap-3 font-bold text-[18px] shadow-lg shadow-green-500/20 transition-all cursor-pointer"
        >
          <FileText size={22} strokeWidth={2.5} />
          <span>Notes</span>
        </button>
        <Link href="/sessions/complete" className="w-[68px] h-[68px] rounded-[24px] bg-[#C82A2A] hover:bg-[#b02525] flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20 transition-all">
          <PhoneMissed size={28} className="text-white" />
        </Link>
      </div>

      {/* Notes Drawer Bottom Sheet Overlay */}
      <AnimatePresence>
        {isNotesDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotesDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto md:max-w-3xl bg-white rounded-t-[36px] shadow-2xl z-50 overflow-hidden border-t border-[#F1F5F9] h-[85dvh] flex flex-col"
            >
              {/* Drag Handle & Header */}
              <div className="px-6 pt-4 pb-3 border-b border-[#F1F5F9] shrink-0">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#1DA349]">
                    <FileText size={22} className="stroke-[2.5]" />
                    <h3 className="font-extrabold text-[19px] text-[#1D2D50]">Session Notes</h3>
                  </div>
                  <button 
                    onClick={() => setIsNotesDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* Active Session Info */}
                <div className="mt-2 text-[13px] text-[#8997A5] font-semibold flex items-center gap-1.5">
                  <span>Therapy Session with Sarah Ahmed</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>Session 4</span>
                </div>
              </div>

              {/* Scrollable Content inside Drawer */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide pb-24">
                {/* Textarea Section */}
                <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-3xl p-5 relative">
                  <span className="text-[11px] font-bold text-[#8997A5] tracking-wider uppercase mb-2 block">
                    Write notes about Sarah&apos;s progress
                  </span>
                  <textarea
                    value={currentNote}
                    onChange={(e) => handleCurrentNoteChange(e.target.value)}
                    className="w-full h-[150px] bg-transparent text-[#4F5B7B] placeholder:text-[#BAC7D5] focus:outline-none resize-none text-[15px] leading-relaxed"
                    placeholder="Type symptoms, behaviors, next action steps, cognitive patterns..."
                  />
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-dashed border-[#E2E8F0]">
                    <span className="text-[#8997A5] text-[12px] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Auto-saved
                    </span>
                    <button
                      onClick={handleAddNote}
                      disabled={!currentNote.trim()}
                      className={`px-5 py-2 rounded-full font-bold text-[14px] flex items-center gap-1.5 transition-all ${
                        currentNote.trim() 
                          ? 'bg-[#1DA349] hover:bg-[#15803d] text-white shadow-md shadow-green-500/10 cursor-pointer' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Plus size={16} />
                      <span>Save Note</span>
                    </button>
                  </div>
                </div>

                {/* Saved Log History inside Drawer */}
                <div>
                  <h4 className="text-[#1D2D50] font-extrabold text-[15px] mb-3 flex items-center justify-between px-1">
                    <span>Note Log ({savedNotes.length})</span>
                    {savedNotes.length > 0 && <span className="text-[11px] text-[#1DA349] font-bold uppercase tracking-wider">Session History</span>}
                  </h4>
                  
                  {savedNotes.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-100 rounded-3xl py-12 px-4 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-3">
                        <FileText size={22} className="stroke-[1.5]" />
                      </div>
                      <p className="text-gray-400 text-[14px] font-medium leading-normal max-w-xs">
                        No notes saved for this session yet. Write in the editor above and save them!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedNotes.map((note) => (
                        <div key={note.id} className="bg-[#FAFDFB] border border-[#EAF6ED] rounded-[24px] p-4 relative group hover:shadow-xs transition-all">
                          <p className="text-[#334155] text-[14px] leading-relaxed whitespace-pre-wrap pr-6">
                            {note.text}
                          </p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed border-[#EAF6ED] text-[11px] font-bold text-[#8997A5]">
                            <span className="bg-[#EAF6ED] text-[#1DA349] px-2.5 py-1 rounded-full uppercase tracking-wider text-[9px]">
                              {note.time}
                            </span>
                            <button
                              onClick={() => handleDeleteNote(note.id)}
                              className="text-[#C82A2A] hover:text-red-700 transition-colors p-1 flex items-center gap-1 cursor-pointer"
                              title="Delete note"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Footer inside Drawer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 shrink-0 flex items-center justify-between gap-3 px-6">
                <span className="text-[11px] text-gray-400 font-medium">Notes persist throughout your session.</span>
                <button
                  onClick={() => setIsNotesDrawerOpen(false)}
                  className="bg-gray-900 text-white rounded-full px-5 py-2 text-[13px] font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
