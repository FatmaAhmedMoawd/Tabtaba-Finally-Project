'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, Search, Star, Check, Calendar, Lock, 
  Video, Mic, MicOff, VideoOff, Volume2, X, Sparkles,
  Clock, ClipboardList
} from 'lucide-react';
import { DOCTORS } from '@/features/sessions/model/doctors';

const CATEGORIES = ['All Specialists', 'Anxiety', 'Depression'];

const DOCTOR_SPEECHES = [
  "Hello there! Welcome to your live session. I'm Dr. Emily, and it is wonderful to have you here today. 😊",
  "How has your energy and mind felt this week? Feel free to share anything that’s on your mind.",
  "Let's guide our thoughts through a brief somatic grounding exercise. Rest your hands and focus on your breath...",
  "Beautiful. Inhale peace, exhale all the tension in your shoulders... Let it drift away...",
  "Remember, wellness is a gentle, day-by-day path. You are doing an incredible job just by showing up.",
  "Our time today is focused entirely on creating a safe space for you. How does that sound?"
];

const ARIS_SPEECHES = [
  "Hello there! Welcome to your digital sanctuary. I'm Dr. Elena Aris, and I'll be guiding your mindfulness session today. 🌿",
  "Let's check in with ourselves. Drop your shoulders, ease your jaw, and take a long, deep inhalation...",
  "How has stress felt in your body this week? We will use light somatic breathing to help release any tension.",
  "Excellent. Inhale peace and absolute presence... exhale all doubts, worries, and cluttering thoughts...",
  "Remember that mindfulness is a gentle, moment-by-moment journey. You are doing a wonderful job just by showing up.",
  "Dr. Elena Aris is here for you. We will focus completely on cultivating a peaceful, grounded space. How does that sound?"
];

export function SessionsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Specialists');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showFiveSecAlert, setShowFiveSecAlert] = useState(false);
  const [showFiftyPercentPage, setShowFiftyPercentPage] = useState(false);

  // High-Fidelity "Get Ready for your Session" Screen States
  const [showGetReady, setShowGetReady] = useState(false);
  const [getReadyReferrer, setGetReadyReferrer] = useState<'reminder' | 'journey' | 'normal' | 'popup'>('normal');
  const [intentionsText, setIntentionsText] = useState('');
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [callDoctorName, setCallDoctorName] = useState('Dr. yasser');
  const [callDoctorSpecialty, setCallDoctorSpecialty] = useState('Consultant Psychiatrist');
  const [callDoctorImage, setCallDoctorImage] = useState('https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250');

  // Handle 5-second countdown alert when subscription is activated
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubscribed) {
      const alreadyAlerted = sessionStorage.getItem('joinAlertShown') === 'true';
      if (!alreadyAlerted) {
        timer = setTimeout(() => {
          setShowFiveSecAlert(true);
          sessionStorage.setItem('joinAlertShown', 'true');
        }, 5000);
      }
    } else {
      sessionStorage.removeItem('joinAlertShown');
      timer = setTimeout(() => {
        setShowFiveSecAlert(false);
      }, 0);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSubscribed]);

  // Live Simulated Call States
  const [isInActiveCall, setIsInActiveCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callTimer, setCallTimer] = useState(0);
  const [speechIndex, setSpeechIndex] = useState(0);

  // User camera stream refs and hooks
  const streamRef = useRef<MediaStream | null>(null);
  const readyVideoRef = useRef<HTMLVideoElement | null>(null);
  const callVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const shouldHaveCamera = (showGetReady && cameraOn) || (isInActiveCall && !isVideoOff);

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
        if (readyVideoRef.current) {
          readyVideoRef.current.srcObject = stream;
        }
        if (callVideoRef.current) {
          callVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.warn("Could not start camera preview:", err);
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
  }, [showGetReady, cameraOn, isInActiveCall, isVideoOff]);

  const setReadyVideoRef = (el: HTMLVideoElement | null) => {
    readyVideoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
    }
  };

  const setCallVideoRef = (el: HTMLVideoElement | null) => {
    callVideoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
    }
  };

  // Poll subscription state
  useEffect(() => {
    // Reset subscription when the site is opened for the first time in a new browser window/session
    if (typeof window !== 'undefined') {
      const sessionActive = sessionStorage.getItem('appActiveSession');
      if (!sessionActive) {
        sessionStorage.setItem('appActiveSession', 'true');
        localStorage.setItem('isSubscribed', 'false');
        window.dispatchEvent(new Event('storage'));
      }
    }

    const checkSub = () => {
      if (typeof window !== 'undefined') {
        const sub = localStorage.getItem('isSubscribed') === 'true';
        setTimeout(() => {
          setIsSubscribed(sub);
          if (sub) {
            setShowJourney(true);
          }
        }, 0);
      }
    };
    checkSub();
    const interval = setInterval(checkSub, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer for simulated call
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInActiveCall) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setCallTimer(0);
        setSpeechIndex(0);
      }, 0);
    }
    return () => clearInterval(interval);
  }, [isInActiveCall]);

  // Caption cycling for simulated doctor speech
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInActiveCall) {
      interval = setInterval(() => {
        const currentSpeechesLength = callDoctorName === 'Dr. Elena Aris' ? ARIS_SPEECHES.length : DOCTOR_SPEECHES.length;
        setSpeechIndex((prev) => (prev + 1) % currentSpeechesLength);
      }, 5500);
    }
    return () => clearInterval(interval);
  }, [isInActiveCall, callDoctorName]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doctor) => {
      const matchesSearch = 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
      const matchesCategory = 
        selectedCategory === 'All Specialists' ||
        doctor.tags.map(t => t.toLowerCase()).includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // RENDER THE EXACT "GET READY FOR YOUR SESSION" SCREEN MATCHING PHOTO BY THE MILLIMETER
  if (showGetReady) {
    return (
      <>
        {/* MOBILE VIEW */}
        <div className="block md:hidden flex flex-col min-h-screen bg-gradient-to-b from-[#FAFBFD] to-[#FFFFFF] font-sans max-w-lg lg:max-w-xl mx-auto pb-16 px-6 relative">
          {/* Subtle Back Button to ensure perfect navigation */}
          <div className="flex items-center justify-between pt-2 pb-1 relative z-10 select-none">
            <button 
              onClick={() => {
                setShowGetReady(false);
                if (getReadyReferrer === 'reminder') {
                  setShowReminder(true);
                  setShowJourney(true);
                } else if (getReadyReferrer === 'journey') {
                  setShowJourney(true);
                } else if (getReadyReferrer === 'normal') {
                  setShowJourney(false);
                } else if (getReadyReferrer === 'popup') {
                  setShowJourney(false);
                }
              }} 
              className="text-emerald-800/80 hover:text-[#0D7A39] flex items-center gap-1.5 text-xs font-black bg-[#EFFAF3] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer border border-emerald-100/70"
              id="btn-back-from-ready-mobile"
            >
              <ChevronLeft size={14} strokeWidth={3} />
              العودة / Back
            </button>
          </div>

          {/* Main Header Row */}
          <div className="pt-4 pb-2 px-1">
            <h2 className="text-[36px] font-black text-[#111827] leading-[1.05] tracking-tight">
              Get ready for your session
            </h2>
            <p className="text-[#64748B] text-[15.5px] font-[600] leading-relaxed mt-2.5">
              Take a deep breath. We&apos;re setting up a calm space for your conversation with {callDoctorName}.
            </p>
          </div>

          {/* Card 1: Therapist Info */}
          <div className="bg-white rounded-[32px] p-5.5 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.025),_0_5px_15px_rgba(0,0,0,0.01)] border border-slate-100/80 mt-6 flex flex-col gap-4.5">
            {/* Row 1: Doctor visual details */}
            <div className="flex items-center gap-4.5">
              <div className="w-[74px] h-[74px] rounded-full overflow-hidden shrink-0 relative border-[3px] border-white shadow-md bg-slate-100">
                <Image 
                  src={callDoctorImage}
                  alt={`${callDoctorName} professional profile photo`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex-1">
                <span className="bg-[#EFFAF3] text-[#0D7A39] text-[9.5px] font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase inline-block">
                  THERAPIST
                </span>
                <h3 className="text-[20px] font-black text-slate-900 leading-none mt-1.5">
                  {callDoctorName}
                </h3>
                <p className="text-[12.5px] font-[600] text-slate-400 leading-snug mt-1 max-w-[90%]">
                  {callDoctorSpecialty}
                </p>
              </div>
            </div>

            {/* Row 2: Grid Dates/Times */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              {/* Left Block Date */}
              <div className="bg-[#FAFBFD] rounded-[22px] p-4 flex flex-col items-start border border-slate-100/60 shadow-sm/20">
                <div className="flex items-center gap-2 text-[#0D7A39]">
                  <Calendar size={13} strokeWidth={3} />
                  <span className="text-[10px] font-black tracking-wider uppercase">DATE</span>
                </div>
                <span className="text-[14.5px] font-black text-slate-800 mt-1.5">
                  Today, Oct 24
                </span>
              </div>

              {/* Right Block Time */}
              <div className="bg-[#FAFBFD] rounded-[22px] p-4 flex flex-col items-start border border-slate-100/60 shadow-sm/20">
                <div className="flex items-center gap-2 text-[#0D7A39]">
                  <Clock size={13} strokeWidth={3} />
                  <span className="text-[10px] font-black tracking-wider uppercase">TIME</span>
                </div>
                <span className="text-[14.5px] font-black text-slate-800 mt-1.5">
                  2:30 PM (45m)
                </span>
              </div>
            </div>

            {/* Row 3: Session Type */}
            <div className="bg-[#FAFBFD] rounded-[22px] p-4 flex flex-col items-start border border-slate-100/60 shadow-sm/20">
              <div className="flex items-center gap-2 text-[#0D7A39]">
                <Video size={13} strokeWidth={3} className="shrink-0" />
                <span className="text-[10px] font-black tracking-wider uppercase">TYPE</span>
              </div>
              <span className="text-[14.5px] font-black text-slate-800 mt-1.5">
                Virtual Sanctuary Session
              </span>
            </div>
          </div>

          {/* Card 2: Intentions & Notes */}
          <div className="bg-[#FAF7F3] rounded-[32px] p-5.5 border border-[#FAF7F3] shadow-[0_4px_12px_rgba(0,0,0,0.01)] mt-5 flex flex-col">
            <div className="flex items-center gap-2 text-[#0D7A39]">
              <ClipboardList size={18} strokeWidth={2.5} className="text-[#0D7A39]" />
              <h4 className="text-[16px] font-[800] text-slate-800 leading-none">
                Intentions & Notes
              </h4>
            </div>
            <p className="text-slate-500 font-bold text-[12px] leading-relaxed mt-2 px-0.5">
              Writing down your thoughts can help ground you before the session begins.
            </p>
            
            <textarea
              className="w-full bg-white rounded-[20px] p-4 mt-4 border border-slate-100/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0D7A39]/15 text-[14px] text-slate-800 font-bold placeholder-slate-300 min-h-[120px] resize-none"
              placeholder="What would you like to talk about today?"
              value={intentionsText}
              onChange={(e) => setIntentionsText(e.target.value)}
            />
          </div>

          {/* Card 3: Hardware Check */}
          <div className="bg-[#F4F4F6] rounded-[32px] p-5.5 border border-[#ECECEF] shadow-[0_4px_12px_rgba(0,0,0,0.01)] mt-5 flex flex-col">
            <div className="flex items-center gap-2 text-[#0D7A39] mb-4">
              <Mic size={18} strokeWidth={2.5} />
              <h4 className="text-[16px] font-[800] text-slate-800 leading-none">
                Hardware Check
              </h4>
            </div>

            {/* Microphone */}
            <div className="flex items-center justify-between mb-4 bg-white/40 p-3 rounded-2xl border border-slate-100/30">
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center text-[#22C55E] shadow-sm border border-slate-100">
                  {micOn ? <Mic size={18} strokeWidth={2.5} /> : <MicOff size={18} strokeWidth={2.5} className="text-slate-400" />}
                </div>
                <div>
                  <span className="text-[14px] font-black text-slate-850 block leading-tight">
                    Microphone
                  </span>
                  <span className="text-[11px] font-[600] text-slate-400 block mt-0.5">
                    {micOn ? 'Default device active' : 'Microphone is muted'}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setMicOn(!micOn)}
                className={`w-11.5 h-6.5 rounded-full p-0.5 transition-colors duration-200 outline-none cursor-pointer flex items-center ${micOn ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`w-5.5 h-5.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${micOn ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Camera */}
            <div className="flex items-center justify-between bg-white/40 p-3 rounded-2xl border border-slate-100/30">
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center text-[#22C55E] shadow-sm border border-slate-100">
                  {cameraOn ? <Video size={18} strokeWidth={2.5} /> : <VideoOff size={18} strokeWidth={2.5} className="text-slate-400" />}
                </div>
                <div>
                  <span className="text-[14px] font-black text-slate-850 block leading-tight">
                    Camera
                  </span>
                  <span className="text-[11px] font-[600] text-slate-400 block mt-0.5">
                    {cameraOn ? 'High definition on' : 'Camera stream disabled'}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setCameraOn(!cameraOn)}
                className={`w-11.5 h-6.5 rounded-full p-0.5 transition-colors duration-200 outline-none cursor-pointer flex items-center ${cameraOn ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`w-5.5 h-5.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${cameraOn ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Video Preview */}
            <div className="mt-4 w-full h-[155px] rounded-[24px] overflow-hidden border border-slate-200/80 shadow-inner relative flex items-center justify-center bg-slate-900">
              {cameraOn ? (
                <>
                  <video
                    ref={setReadyVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover relative z-0"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-3 bg-black/15">
                    <div className="w-[46px] h-[46px] rounded-full bg-white/95 shadow-md flex items-center justify-center text-[#22C55E] relative mb-2">
                      <span className="absolute inset-0 rounded-full border border-[#22C55E] animate-ping opacity-30"></span>
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" className="opacity-0" />
                        <path d="M9 10c.3-.5.9-.6 1.2-.6" />
                        <path d="M14 10c.3-.5.9-.6 1.2-.6" />
                        <path d="M8 14.5s1.5 2 4 2 4-2 4-2" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-black text-white/95 tracking-[0.1em] uppercase font-mono px-3.5 py-1 bg-black/50 rounded-full border border-white/10 shadow-sm text-center">
                      CAMERA PREVIEW READY
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <VideoOff size={28} className="text-slate-600 mb-2" />
                  <span className="text-[11px] font-black text-slate-500 tracking-wider uppercase font-mono">
                    CAMERA PREVIEW OFFLINE
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setShowGetReady(false);
              setIsInActiveCall(true);
            }}
            className="w-full bg-gradient-to-r from-[#00A743] to-[#0D7A39] text-white py-[17px] rounded-[24px] font-black text-[17px] tracking-wide shadow-lg shadow-emerald-500/10 hover:brightness-[104%] hover:shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
            id="btn-start-session-ready-mobile"
          >
            Start Session 
            <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <span className="text-[11px] text-slate-400 font-[500] text-center italic tracking-wide mt-3.5 block">
            &ldquo;The best way to capture moments is to pay attention.&rdquo;
          </span>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block w-full max-w-5xl mx-auto px-8 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 border-b border-gray-150/40 pb-5">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setShowGetReady(false);
                  if (getReadyReferrer === 'reminder') {
                    setShowReminder(true);
                    setShowJourney(true);
                  } else if (getReadyReferrer === 'journey') {
                    setShowJourney(true);
                  } else if (getReadyReferrer === 'normal') {
                    setShowJourney(false);
                  } else if (getReadyReferrer === 'popup') {
                    setShowJourney(false);
                  }
                }} 
                className="flex items-center gap-2 text-gray-655 hover:text-gray-900 transition-colors font-bold text-sm bg-white border border-gray-250/60 rounded-full px-5 py-2.5 shadow-sm cursor-pointer"
                id="btn-back-from-ready-desktop"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
                <span>Back</span>
              </button>
              <h1 className="text-2xl font-black text-gray-900">Get Ready for your Session</h1>
            </div>
            <span className="text-xs font-black tracking-widest text-[#0D7A39] uppercase">
              Clinical Session Prep Room
            </span>
          </div>

          <p className="text-gray-500 font-medium text-base mb-8">
            Take a deep breath. We&apos;re setting up a calm space for your conversation with {callDoctorName}.
          </p>

          <div className="grid grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Hardware Checks & Camera Feed */}
            <div className="col-span-6 space-y-6">
              
              {/* Hardware checklist */}
              <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm space-y-5">
                <span className="text-xs font-black text-[#0D7A39] uppercase tracking-wider block">
                  Hardware Devices Connection
                </span>

                {/* Microphone Switch */}
                <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#22C55E] shadow-sm">
                      {micOn ? <Mic size={18} strokeWidth={2.5} /> : <MicOff size={18} strokeWidth={2.5} className="text-slate-400" />}
                    </div>
                    <div>
                      <span className="text-sm font-black text-slate-800 block">Microphone</span>
                      <span className="text-[11px] font-[600] text-slate-400 block mt-0.5">
                        {micOn ? 'Default device connected & active' : 'Microphone audio stream muted'}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setMicOn(!micOn)}
                    className={`w-11.5 h-6.5 rounded-full p-0.5 transition-colors duration-200 outline-none cursor-pointer flex items-center ${micOn ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}
                  >
                    <div className={`w-5.5 h-5.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${micOn ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Camera Switch */}
                <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#22C55E] shadow-sm">
                      {cameraOn ? <Video size={18} strokeWidth={2.5} /> : <VideoOff size={18} strokeWidth={2.5} className="text-slate-400" />}
                    </div>
                    <div>
                      <span className="text-sm font-black text-slate-800 block">Video Camera</span>
                      <span className="text-[11px] font-[600] text-slate-400 block mt-0.5">
                        {cameraOn ? 'High-definition lens active' : 'Video transmission disabled'}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCameraOn(!cameraOn)}
                    className={`w-11.5 h-6.5 rounded-full p-0.5 transition-colors duration-200 outline-none cursor-pointer flex items-center ${cameraOn ? 'bg-[#22C55E]' : 'bg-[#E2E8F0]'}`}
                  >
                    <div className={`w-5.5 h-5.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${cameraOn ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              {/* Video Preview Box */}
              <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-4">
                  REALTIME CAMERA PREVIEW
                </span>

                <div className="w-full h-[260px] rounded-[24px] overflow-hidden border border-slate-200/80 shadow-inner relative flex items-center justify-center bg-slate-900">
                  {cameraOn ? (
                    <>
                      <video
                        ref={setReadyVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover relative z-0"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 bg-black/20">
                        <div className="w-[50px] h-[50px] rounded-full bg-white/95 shadow-md flex items-center justify-center text-[#22C55E] relative mb-3">
                          <span className="absolute inset-0 rounded-full border border-[#22C55E] animate-ping opacity-30"></span>
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" className="opacity-0" />
                            <path d="M9 10c.3-.5.9-.6 1.2-.6" />
                            <path d="M14 10c.3-.5.9-.6 1.2-.6" />
                            <path d="M8 14.5s1.5 2 4 2 4-2 4-2" />
                          </svg>
                        </div>
                        <span className="text-[11px] font-black text-white tracking-[0.1em] uppercase font-mono px-4 py-1.5 bg-black/60 rounded-full border border-white/10 shadow-md text-center">
                          CAMERA FEED ESTABLISHED
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 text-gray-500">
                      <VideoOff size={36} className="text-gray-400 mb-3" />
                      <span className="text-xs font-black text-gray-400 tracking-wider uppercase font-mono">
                        Camera input device is disabled
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Therapist Info & Notes */}
            <div className="col-span-6 space-y-6">
              
              {/* Doctor Info Card */}
              <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-4.5 pb-4 border-b border-gray-100">
                  <div className="w-[74px] h-[74px] rounded-full overflow-hidden shrink-0 relative border-[3px] border-white shadow-md bg-slate-100">
                    <Image 
                      src={callDoctorImage}
                      alt={`${callDoctorName} visual card`}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="bg-[#EFFAF3] text-[#0D7A39] text-[9.5px] font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase inline-block">
                      ASSIGNED SPECIALIST
                    </span>
                    <h3 className="text-lg font-black text-gray-900 mt-1">
                      {callDoctorName}
                    </h3>
                    <p className="text-xs font-bold text-gray-400 mt-0.5">
                      {callDoctorSpecialty}
                    </p>
                  </div>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/60">
                    <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block">DATE</span>
                    <span className="text-[14.5px] font-black text-slate-800 mt-1.5 block">Today, Oct 24</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/60">
                    <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block">TIME</span>
                    <span className="text-[14.5px] font-black text-slate-800 mt-1.5 block">2:30 PM (45m)</span>
                  </div>
                  <div className="col-span-2 bg-gray-50 p-4 rounded-2xl border border-gray-100/60">
                    <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block">SESSION CHANNEL</span>
                    <span className="text-[14.5px] font-black text-slate-800 mt-1.5 block">Virtual Encryption Video Session</span>
                  </div>
                </div>
              </div>

              {/* Intentions Textarea */}
              <div className="bg-white border border-gray-150/50 rounded-[32px] p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#0D7A39]">
                  <ClipboardList size={18} strokeWidth={2.5} className="text-[#0D7A39]" />
                  <h4 className="text-sm font-black text-slate-850">Intentions & Notes</h4>
                </div>
                <p className="text-xs text-gray-400 font-bold leading-relaxed">
                  Writing down your thoughts can help ground you before the session begins.
                </p>
                
                <textarea
                  className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0D7A39]/15 text-sm text-slate-800 font-semibold placeholder-gray-300 min-h-[100px] resize-none"
                  placeholder="What would you like to talk about today?"
                  value={intentionsText}
                  onChange={(e) => setIntentionsText(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowGetReady(false);
                    if (getReadyReferrer === 'reminder') {
                      setShowReminder(true);
                      setShowJourney(true);
                    } else if (getReadyReferrer === 'journey') {
                      setShowJourney(true);
                    } else if (getReadyReferrer === 'normal') {
                      setShowJourney(false);
                    } else if (getReadyReferrer === 'popup') {
                      setShowJourney(false);
                    }
                  }}
                  className="px-6 py-3.5 border border-gray-250 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-colors cursor-pointer bg-white text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowGetReady(false);
                    setIsInActiveCall(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#00A743] to-[#0D7A39] text-white py-4 rounded-2xl font-black text-sm tracking-wide shadow-lg shadow-emerald-500/10 hover:brightness-[104%] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-start-session-ready-desktop"
                >
                  Start Live Session
                  <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

            </div>

          </div>
        </div>
      </>
    );
  }

  // RENDER 50% OFFER SCREEN
  if (showFiftyPercentPage) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#EFFAF3] via-[#FAFDFB] to-[#FDFBF7] font-sans max-w-lg lg:max-w-xl mx-auto pb-12 px-6 relative">
        {/* Header with back button */}
        <div className="pt-10 pb-4 flex items-center justify-between">
          <button 
            onClick={() => setShowFiftyPercentPage(false)} 
            className="p-2 -ml-2 text-[#5C7182] hover:bg-emerald-50 rounded-full transition-colors cursor-pointer"
            id="btn-back-from-fifty"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          
          <div className="relative w-[110px] h-[50px]">
            <Image 
              src="https://i.postimg.cc/YS4B7cnz/photo-2026-05-14-14-47-12.jpg" 
              alt="Tabtaba Logo" 
              fill
              className="object-contain mix-blend-multiply"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Hero Visual Offer Card */}
        <div className="mt-6 flex flex-col items-center">
          <div className="w-full bg-white rounded-[36px] px-8 py-9 border border-emerald-100 shadow-[0_12px_45px_rgba(0,0,0,0.02)] text-center relative overflow-hidden">
            
            {/* Ambient glows inside card */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-xl pointer-events-none hover:scale-110 transition-transform"></div>
            
            {/* Promo Badge */}
            <span className="inline-block bg-[#E8F8EC] text-[#0D7A39] font-black tracking-widest text-[11px] px-4.5 py-1.5 rounded-full uppercase mb-6 shadow-sm border border-emerald-100/35 pb-2.5">
              🎁 EXCLUSIVE DISCOUNT | عرض محدود
            </span>

            {/* Giant 50% Discount visual circle */}
            <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#30C45D]/15 to-emerald-400/5 rounded-full animate-pulse"></div>
              <div className="w-28 h-28 bg-gradient-to-tr from-[#30C45D] to-[#0D7A39] rounded-full shadow-lg shadow-emerald-500/20 flex flex-col items-center justify-center text-white">
                <span className="text-[38px] font-black leading-none select-none">50%</span>
                <span className="text-[11px] font-extrabold tracking-widest uppercase mt-0.5 opacity-90 select-none">OFF</span>
              </div>
            </div>

            <h2 className="text-[28px] font-black text-[#1D1F2A] leading-tight mb-2">
              خصم 50% على جلستك الأولى!
            </h2>
            <h3 className="text-[17px] font-bold text-[#5C7182] leading-snug mb-8">
              Get 50% OFF your first psychiatric session with our top clinical specialists!
            </h3>

            {/* Price section */}
            <div className="bg-[#FAFDFB] rounded-[24px] p-5 border border-emerald-50 flex items-center justify-around mb-8">
              <div className="flex flex-col items-center">
                <span className="text-[12px] font-black text-gray-400 line-through">EGP 400</span>
                <span className="text-[10px] font-extrabold text-gray-400">STANDARD PRICE</span>
              </div>
              <div className="w-[1.5px] h-10 bg-slate-100"></div>
              <div className="flex flex-col items-center">
                <span className="text-[34px] font-black text-[#0D7A39] leading-none">EGP 200</span>
                <span className="text-[10px] font-black text-[#0D7A39] uppercase tracking-wide mt-1">SPECIAL OFFER PRICE</span>
              </div>
            </div>

            {/* Value Checkmarks */}
            <div className="text-left flex flex-col gap-3.5 mb-8 max-w-[290px] mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-[14px] font-bold text-slate-700">Certified clinical professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-[14px] font-bold text-slate-700">No waiting list, book immediately</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-[14px] font-bold text-slate-700">Encrypted private consultations</span>
              </div>
            </div>

            {/* Solid green action button */}
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('isSubscribed', 'true');
                  window.dispatchEvent(new Event('storage'));
                  setIsSubscribed(true);
                  setShowFiftyPercentPage(false);
                  setShowReminder(true);
                  setShowJourney(true);
                }
              }}
                  className="w-full bg-gradient-to-r from-[#29B055] to-[#0D7A39] hover:brightness-105 active:scale-[0.98] text-white py-4.5 rounded-[24px] font-black text-[18px] transition-all flex justify-center items-center gap-2.5 shadow-lg shadow-[#29B055]/20 cursor-pointer text-center"
                  id="btn-join-session-offer"
                >
                  Join Session / انضم للجلسة
                </button>
              </div>
            </div>
          </div>
        );
      }

  // RENDER SUBSCRIBED JOURNEY SCREEN (matches the user's uploaded image exactly)
  if (isSubscribed && showJourney) {
    if (showReminder) {
      return (
        <>
          {/* MOBILE VIEW */}
          <div className="block md:hidden flex flex-col min-h-screen bg-gradient-to-b from-[#EFFAF3] via-[#FAFDFB] to-[#FDFBF7] font-sans max-w-lg lg:max-w-xl mx-auto pb-12 px-6 relative">
            
            {/* Header row */}
            <div className="pt-10 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setShowReminder(false)} 
                  className="p-1 -ml-1 text-[#1E293B] hover:bg-emerald-50 rounded-full transition-colors cursor-pointer"
                  id="btn-back-to-journey"
                >
                  <ChevronLeft size={28} strokeWidth={2.5} />
                </button>
                <h1 className="text-[22px] font-[900] text-[#1D1F2A] tracking-tight">
                  Session Reminder
                </h1>
              </div>
              
              {/* Elegant 3 dots menu style */}
              <div className="flex gap-1 items-center p-2 text-[#E2E8F0]">
                <span className="w-1.5 h-1.5 bg-[#CBD5E1] rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-[#CBD5E1] rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-[#CBD5E1] rounded-full"></span>
              </div>
            </div>

            {/* Centered Doctor Circle Avatar with overlapping Pill */}
            <div className="mt-8 flex flex-col items-center">
              <div className="relative w-[130px] h-[130px]">
                <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative bg-slate-100">
                  <Image 
                    src={callDoctorImage}
                    alt={`${callDoctorName} professional psychiatrist avatar`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* AVAILABLE overlapping badge */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#FCE7F3] text-[#DB2777] text-[10px] font-black px-4.5 py-1 rounded-full tracking-wider uppercase border-2 border-white shadow-sm whitespace-nowrap">
                  AVAILABLE
                </div>
              </div>

              {/* Main Central Card */}
              <div className="w-full bg-white rounded-[36px] px-8 py-9 border border-gray-100/60 shadow-[0_12px_45px_rgba(0,0,0,0.02)] text-center relative overflow-hidden mt-8">
                
                {/* Highlight badge text */}
                <span className="block text-[#0D7A39] font-black tracking-widest text-[12px] uppercase mb-4">
                  STARTS IN 10 MINUTES
                </span>

                {/* Heading string matches exactly */}
                <h2 className="text-[27px] sm:text-[30px] font-black text-[#1D1F2A] leading-tight mb-8">
                  Your session with <span className="text-[#30C45D]">{callDoctorName}</span> starts in 10 minutes
                </h2>

                {/* Big Green Pill Action Button */}
                <button 
                  onClick={() => {
                    setShowReminder(false);
                    setShowGetReady(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#29B055] to-[#0D7A39] hover:brightness-105 active:scale-[0.98] text-white py-4.5 rounded-[24px] font-black text-[18px] transition-all flex justify-center items-center gap-2.5 shadow-lg shadow-[#29B055]/20 cursor-pointer animate-pulse"
                  id="btn-join-now"
                >
                  <span>👉</span> Join Now
                </button>

                {/* Reschedule option button */}
                <button 
                  onClick={() => router.push('/calendar')}
                  className="mt-6 text-gray-400 hover:text-gray-600 font-bold text-[14px] flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
                  id="btn-reschedule-reminder"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  Reschedule
                </button>
              </div>
            </div>

            {/* Side-by-Side Date & Time Info Modules */}
            <div className="grid grid-cols-2 gap-4 mt-6 font-sans">
              {/* Today Item */}
              <div className="bg-[#FAFDFB]/80 backdrop-blur-md rounded-[24px] p-5 flex flex-col items-start border border-gray-100 shadow-sm">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E8F8EC] text-[#0D7A39] flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-0.5">TODAY</span>
                <span className="text-[14px] font-black text-[#1D1F2A]">Oct 24, 2023</span>
              </div>

              {/* Time Item */}
              <div className="bg-[#FAFDFB]/80 backdrop-blur-md rounded-[24px] p-5 flex flex-col items-start border border-gray-100 shadow-sm">
                <div className="w-[38px] h-[38px] rounded-full bg-[#E8F8EC] text-[#0D7A39] flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-0.5">TIME</span>
                <span className="text-[14px] font-black text-[#1D1F2A]">14:00 - 14:45</span>
              </div>
            </div>

            {/* Quick Prep checklist at bottom */}
            <div className="bg-gradient-to-br from-[#FAFDFC] to-[#F1F9F4] rounded-[28px] p-6 border border-emerald-100/40 shadow-sm mt-6 flex flex-col gap-4">
              
              {/* Title */}
              <div className="flex items-center gap-2">
                <svg className="text-[#0D7A39]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[14px] font-black text-[#0D7A39] uppercase tracking-wide">Quick Prep</span>
              </div>

              {/* Checklist */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#30C45D] text-white flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-bold text-gray-600">Find a quiet, private space</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#30C45D] text-white flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-white">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-bold text-gray-600">Check your internet connection</span>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP VIEW */}
          <div className="hidden md:block min-h-screen bg-[#F8FBFC] p-8">
            <div className="max-w-5xl mx-auto px-8 py-10 bg-gradient-to-b from-[#EFFAF3] via-[#FAFDFB] to-[#FDFBF7] rounded-[36px] border border-emerald-100/40 shadow-sm mt-6">
              
              {/* Header bar */}
              <div className="flex items-center justify-between pb-6 border-b border-emerald-100/30">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowReminder(false)} 
                    className="flex items-center gap-2 text-[#0D7A39] hover:bg-[#E8F8EC] border border-emerald-100 rounded-full px-5 py-2.5 shadow-sm transition-all cursor-pointer font-bold text-sm bg-white"
                    id="btn-back-to-journey-desktop"
                  >
                    <ChevronLeft size={16} strokeWidth={2.5} />
                    <span>Back to Journey</span>
                  </button>
                  <h1 className="text-2xl font-black text-[#1D1F2A]">Session Reminder</h1>
                </div>
                <div className="relative w-[110px] h-[50px]">
                  <Image 
                    src="https://i.postimg.cc/YS4B7cnz/photo-2026-05-14-14-47-12.jpg" 
                    alt="Tabtaba Logo" 
                    fill
                    className="object-contain mix-blend-multiply"
                    priority
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-12 gap-10 mt-8 items-start">
                
                {/* Left Column: Doctor Details & Call Action */}
                <div className="col-span-6 flex flex-col items-center bg-white rounded-[32px] p-8 border border-slate-100/80 shadow-[0_12px_45px_rgba(0,0,0,0.025)]">
                  <div className="relative w-[130px] h-[130px] mb-6">
                    <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative bg-slate-100">
                      <Image 
                        src={callDoctorImage}
                        alt={`${callDoctorName} professional psychiatrist avatar`}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* AVAILABLE badge */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#FCE7F3] text-[#DB2777] text-[10px] font-black px-4.5 py-1 rounded-full tracking-wider uppercase border-2 border-white shadow-sm whitespace-nowrap">
                      AVAILABLE
                    </div>
                  </div>

                  <span className="block text-[#0D7A39] font-black tracking-widest text-[12px] uppercase mb-3">
                    STARTS IN 10 MINUTES
                  </span>

                  <h2 className="text-[25px] font-black text-[#1D1F2A] text-center leading-tight mb-8">
                    Your session with <span className="text-[#30C45D]">{callDoctorName}</span> starts in 10 minutes
                  </h2>

                  <button 
                    onClick={() => {
                      setShowReminder(false);
                      setShowGetReady(true);
                    }}
                    className="w-full bg-gradient-to-r from-[#29B055] to-[#0D7A39] hover:brightness-105 active:scale-[0.98] text-white py-4.5 rounded-[24px] font-black text-[18px] transition-all flex justify-center items-center gap-2.5 shadow-lg shadow-[#29B055]/20 cursor-pointer animate-pulse"
                    id="btn-join-now-desktop"
                  >
                    <span>👉</span> Join Now
                  </button>

                  <button 
                    onClick={() => router.push('/calendar')}
                    className="mt-6 text-gray-400 hover:text-gray-650 font-bold text-[14px] flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
                    id="btn-reschedule-reminder-desktop"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    Reschedule
                  </button>
                </div>

                {/* Right Column: Time Blocks & Checklist */}
                <div className="col-span-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Today Block */}
                    <div className="bg-[#FAFDFB]/95 rounded-[24px] p-5 flex flex-col items-start border border-slate-100 shadow-sm bg-white">
                      <div className="w-[38px] h-[38px] rounded-full bg-[#E8F8EC] text-[#0D7A39] flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-0.5">TODAY</span>
                      <span className="text-[15px] font-black text-[#1D1F2A]">Oct 24, 2023</span>
                    </div>

                    {/* Time Block */}
                    <div className="bg-[#FAFDFB]/95 rounded-[24px] p-5 flex flex-col items-start border border-slate-100 shadow-sm bg-white">
                      <div className="w-[38px] h-[38px] rounded-full bg-[#E8F8EC] text-[#0D7A39] flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-0.5">TIME</span>
                      <span className="text-[15px] font-black text-[#1D1F2A]">14:00 - 14:45</span>
                    </div>
                  </div>

                  {/* Checklist Card */}
                  <div className="bg-gradient-to-br from-[#FAFDFC] to-[#F1F9F4] rounded-[28px] p-6 border border-emerald-100 shadow-sm flex flex-col gap-4 bg-white">
                    <div className="flex items-center gap-2">
                      <svg className="text-[#0D7A39]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[14px] font-black text-[#0D7A39] uppercase tracking-wide">Quick Prep Checklist</span>
                    </div>
                    
                    <div className="flex flex-col gap-3.5 mt-2">
                      <div className="flex items-center gap-3 bg-white/70 p-3.5 rounded-2xl border border-emerald-50/60 shadow-sm/5">
                        <div className="w-6.5 h-6.5 rounded-full bg-[#30C45D] text-white flex items-center justify-center shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-white">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[14.5px] font-bold text-gray-700">Find a quiet, private space</span>
                      </div>

                      <div className="flex items-center gap-3 bg-white/70 p-3.5 rounded-2xl border border-emerald-50/60 shadow-sm/5">
                        <div className="w-6.5 h-6.5 rounded-full bg-[#30C45D] text-white flex items-center justify-center shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-white">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-[14.5px] font-bold text-gray-700">Check your internet connection</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </>
      );
    }

    return (
      <>
        {/* MOBILE VIEW */}
        <div className="block md:hidden flex flex-col min-h-screen bg-gradient-to-b from-[#EFFAF3] via-[#FAFDFB] to-[#FCFAF6] font-inter max-w-lg lg:max-w-xl mx-auto pb-32 relative px-5">
          
          {/* Navigation row with Back button and Tabtaba Logo */}
          <div className="flex items-center justify-between pt-10 pb-2">
            <button 
              onClick={() => setShowJourney(false)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-[#0D7A39] border border-emerald-100 rounded-full text-xs font-black shadow-sm hover:bg-[#E8F8EC] transition-all cursor-pointer hover:scale-105 active:scale-95"
              id="btn-back-to-booking"
            >
              <ChevronLeft size={16} strokeWidth={3} />
              العودة لقائمة الأطباء / Back to Directory
            </button>
            
            <div className="relative w-[110px] h-[50px] cursor-pointer" onClick={() => router.push('/dashboard')}>
              <Image 
                src="https://i.postimg.cc/YS4B7cnz/photo-2026-05-14-14-47-12.jpg" 
                alt="Tabtaba Logo" 
                fill
                className="object-contain mix-blend-multiply"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Monthly Journey Section */}
          <div className="mt-4">
            <div className="bg-gradient-to-b from-[#E7F6ED] to-[#F1FAF4] rounded-[32px] p-6 shadow-sm border border-white relative overflow-hidden">
              {/* Header part */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-[22px] font-[900] text-[#0D7A39] tracking-tight">Monthly Journey</h2>
                  <p className="text-[14px] text-gray-550 font-bold mt-1">March Path to Wellbeing</p>
                </div>
                <div className="text-right">
                  <span className="text-[34px] font-black text-[#0D7A39] leading-none block">50%</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5 block">PROGRESS</span>
                </div>
              </div>

              {/* Steps & Horizontal Progress Connection */}
              <div className="relative flex justify-between items-center mt-8 pb-3 px-1">
                {/* Connector line behind circles */}
                <div className="absolute top-[24px] left-[7%] right-[7%] h-[3px] bg-[#E1E8EE] -z-0 rounded-full">
                  <div className="h-full bg-[#30C45D] rounded-full transition-all duration-[1s]" style={{ width: '66.7%' }}></div>
                </div>
                
                {/* Session 1 */}
                <div className="flex flex-col items-center flex-1 text-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#30C45D] flex items-center justify-center text-white shadow-md border-[4px] border-white ring-1 ring-[#30C45D]/10">
                    <Check size={18} strokeWidth={3.5} />
                  </div>
                  <span className="text-[12px] font-black text-[#1D214F] mt-3 block">Session 1</span>
                  <span className="text-[10px] font-bold text-gray-400 mt-1 block">Mar 04</span>
                </div>

                {/* Session 2 */}
                <div className="flex flex-col items-center flex-1 text-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#30C45D] flex items-center justify-center text-white shadow-md border-[4px] border-white ring-1 ring-[#30C45D]/10">
                    <Check size={18} strokeWidth={3.5} />
                  </div>
                  <span className="text-[12px] font-black text-[#1D214F] mt-3 block">Session 2</span>
                  <span className="text-[10px] font-bold text-gray-400 mt-1 block">Mar 12</span>
                </div>

                {/* Session 3 */}
                <div className="flex flex-col items-center flex-1 text-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#30C45D] text-[#30C45D] flex items-center justify-center shadow-sm border-[4px] border-white ring-2 ring-[#30C45D]/10">
                    <Calendar size={18} strokeWidth={3} />
                  </div>
                  <span className="text-[12px] font-black text-[#30C45D] mt-3 block">Session 3</span>
                  <span className="text-[10px] font-black text-[#30C45D] mt-1 block">Scheduled</span>
                </div>

                {/* Session 4 */}
                <div className="flex flex-col items-center flex-1 text-center relative z-10 opacity-60">
                  <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shadow-inner border-[4px] border-white">
                    <Lock size={16} strokeWidth={3} />
                  </div>
                  <span className="text-[12px] font-black text-gray-505 mt-3 block">Session 4</span>
                  <span className="text-[10px] font-black text-gray-400 mt-1 block">TBD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Session Card Section */}
          <div className="mt-6">
            <div className="bg-white rounded-[32px] p-8 border border-gray-100/60 shadow-[0_12px_45px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col">
              
              {/* Soft Ambient Green Glow right side */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] bg-gradient-to-l from-[#E8F8EC] via-[#F4FDF8]/40 to-transparent rounded-r-[32px] pointer-events-none select-none filter blur-xl"></div>
              
              <div className="relative z-10">
                {/* Badge */}
                <span className="inline-block bg-[#E8F9ED] text-[#0D7A39] font-black tracking-wider text-[11px] px-4 py-1.5 rounded-full uppercase mb-4 shadow-sm">
                  TODAY&apos;S SESSION
                </span>
                
                {/* Doctor Name */}
                <h2 className="text-[38px] font-black text-[#1C1C1CD5] leading-none mb-1">
                  Dr. Emily
                </h2>
                
                {/* Doctor Specialty + Time */}
                <p className="text-[18px] font-[600] text-gray-455 mb-8 flex items-center gap-1.5">
                  Psychologist &bull; 4:00 PM
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 items-center">
                  {/* Join Session Button */}
                  <button 
                    onClick={() => {
                      setGetReadyReferrer('journey');
                      setCallDoctorName('Dr. Emily');
                      setCallDoctorSpecialty('Psychologist / Psychiatrist');
                      setCallDoctorImage('https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400');
                      setShowReminder(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-[#00AC49] to-[#0D7A39] hover:brightness-105 active:scale-[0.98] text-white py-5 rounded-[24px] font-black text-[17px] transition-all flex justify-center items-center gap-2.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                      <path d="m22 8-6 4 6 4V8Z" />
                      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                      <line x1="9" x2="9" y1="10" y2="14"/>
                      <line x1="7" x2="11" y1="12" y2="12"/>
                    </svg>
                    Start Session / انضم للجلسة
                  </button>
                  
                  {/* Calendar Button */}
                  <button 
                    onClick={() => router.push('/calendar')}
                    className="w-[60px] h-[60px] rounded-[22px] border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-655 active:scale-95 transition-all shrink-0 shadow-sm cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sandboxing Developer Option (highly polite for testing) */}
          <div className="flex flex-col items-center justify-center mt-12 gap-1.5 opacity-60">
            <p className="text-[11px] text-gray-455 font-bold uppercase tracking-widest text-center">Development Settings</p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('isSubscribed', 'false');
                  window.dispatchEvent(new Event('storage'));
                  setIsSubscribed(false);
                  setShowJourney(false);
                }
              }}
              className="text-[13px] text-[#0D7A39] font-black underline hover:text-[#00AC49] transition-colors leading-tight cursor-pointer"
            >
              Reset Subscription (Toggle back to normal Doctor Booking list)
            </button>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block min-h-screen bg-[#F8FBFC] p-8">
          <div className="max-w-5xl mx-auto px-8 py-10 bg-gradient-to-b from-[#EFFAF3] via-[#FAFDFB] to-[#FCFAF6] rounded-[36px] border border-emerald-100/40 shadow-sm mt-6">
            
            {/* Navigation row with Back button and Tabtaba Logo */}
            <div className="flex items-center justify-between pb-6 border-b border-emerald-100/30">
              <button 
                onClick={() => setShowJourney(false)}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-white text-[#0D7A39] border border-emerald-100 rounded-full text-xs font-black shadow-sm hover:bg-[#E8F8EC] transition-all cursor-pointer hover:scale-105 active:scale-95"
                id="btn-back-to-booking-desktop"
              >
                <ChevronLeft size={16} strokeWidth={3} />
                العودة لقائمة الأطباء / Back to Directory
              </button>
              
              <div className="relative w-[110px] h-[50px] cursor-pointer" onClick={() => router.push('/dashboard')}>
                <Image 
                  src="https://i.postimg.cc/YS4B7cnz/photo-2026-05-14-14-47-12.jpg" 
                  alt="Tabtaba Logo" 
                  fill
                  className="object-contain mix-blend-multiply"
                  priority
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Split layout content */}
            <div className="grid grid-cols-12 gap-8 mt-8 items-start">
              
              {/* Left Column: Monthly Journey Card */}
              <div className="col-span-7 space-y-6">
                <div className="bg-gradient-to-b from-[#E7F6ED] to-[#F1FAF4] rounded-[32px] p-8 shadow-sm border border-white relative overflow-hidden">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-[24px] font-[900] text-[#0D7A39] tracking-tight">Monthly Journey</h2>
                      <p className="text-[15px] text-gray-550 font-bold mt-1">March Path to Wellbeing</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[38px] font-black text-[#0D7A39] leading-none block">50%</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5 block">PROGRESS</span>
                    </div>
                  </div>

                  {/* Steps & Horizontal Progress Connection */}
                  <div className="relative flex justify-between items-center mt-10 pb-4 px-2">
                    {/* Connector line behind circles */}
                    <div className="absolute top-[24px] left-[7%] right-[7%] h-[3px] bg-[#E1E8EE] -z-0 rounded-full">
                      <div className="h-full bg-[#30C45D] rounded-full transition-all duration-[1s]" style={{ width: '66.7%' }}></div>
                    </div>
                    
                    {/* Session 1 */}
                    <div className="flex flex-col items-center flex-1 text-center relative z-10">
                      <div className="w-12 h-12 rounded-full bg-[#30C45D] flex items-center justify-center text-white shadow-md border-[4px] border-white ring-1 ring-[#30C45D]/10">
                        <Check size={18} strokeWidth={3.5} />
                      </div>
                      <span className="text-[13px] font-black text-[#1D214F] mt-3 block">Session 1</span>
                      <span className="text-[11px] font-bold text-gray-400 mt-1 block">Mar 04</span>
                    </div>

                    {/* Session 2 */}
                    <div className="flex flex-col items-center flex-1 text-center relative z-10">
                      <div className="w-12 h-12 rounded-full bg-[#30C45D] flex items-center justify-center text-white shadow-md border-[4px] border-white ring-1 ring-[#30C45D]/10">
                        <Check size={18} strokeWidth={3.5} />
                      </div>
                      <span className="text-[13px] font-black text-[#1D214F] mt-3 block">Session 2</span>
                      <span className="text-[11px] font-bold text-gray-400 mt-1 block">Mar 12</span>
                    </div>

                    {/* Session 3 */}
                    <div className="flex flex-col items-center flex-1 text-center relative z-10">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#30C45D] text-[#30C45D] flex items-center justify-center shadow-sm border-[4px] border-white ring-2 ring-[#30C45D]/10">
                        <Calendar size={18} strokeWidth={3} />
                      </div>
                      <span className="text-[13px] font-black text-[#30C45D] mt-3 block">Session 3</span>
                      <span className="text-[11px] font-black text-[#30C45D] mt-1 block">Scheduled</span>
                    </div>

                    {/* Session 4 */}
                    <div className="flex flex-col items-center flex-1 text-center relative z-10 opacity-60">
                      <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shadow-inner border-[4px] border-white">
                        <Lock size={16} strokeWidth={3} />
                      </div>
                      <span className="text-[13px] font-black text-gray-555 mt-3 block">Session 4</span>
                      <span className="text-[11px] font-black text-gray-400 mt-1 block">TBD</span>
                    </div>
                  </div>
                </div>

                {/* Sandboxing Developer Option */}
                <div className="flex flex-col items-center justify-center py-4 bg-white/40 border border-slate-100 rounded-[28px] opacity-60">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">Development Settings</p>
                  <button 
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('isSubscribed', 'false');
                        window.dispatchEvent(new Event('storage'));
                        setIsSubscribed(false);
                        setShowJourney(false);
                      }
                    }}
                    className="text-[13px] text-[#0D7A39] font-black underline hover:text-[#00AC49] transition-colors leading-tight cursor-pointer mt-1"
                  >
                    Reset Subscription (Toggle back to normal Doctor Booking list)
                  </button>
                </div>
              </div>

              {/* Right Column: Today's Session Card */}
              <div className="col-span-5">
                <div className="bg-white rounded-[32px] p-8 border border-gray-100/60 shadow-[0_12px_45px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col min-h-[320px] justify-between">
                  
                  {/* Ambient Glow */}
                  <div className="absolute right-0 top-0 bottom-0 w-[50%] bg-gradient-to-l from-[#E8F8EC] via-[#F4FDF8]/40 to-transparent rounded-r-[32px] pointer-events-none select-none filter blur-xl"></div>
                  
                  <div className="relative z-10">
                    <span className="inline-block bg-[#E8F9ED] text-[#0D7A39] font-black tracking-wider text-[11px] px-4.5 py-1.5 rounded-full uppercase mb-5 shadow-sm border border-emerald-50">
                      TODAY&apos;S SESSION
                    </span>
                    
                    <h2 className="text-[34px] font-black text-[#1D1D1D] leading-none mb-1.5">
                      Dr. Emily
                    </h2>
                    
                    <p className="text-[16px] font-[600] text-gray-455 mb-8 flex items-center gap-1.5">
                      Psychologist &bull; 4:00 PM
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        setGetReadyReferrer('journey');
                        setCallDoctorName('Dr. Emily');
                        setCallDoctorSpecialty('Psychologist / Psychiatrist');
                        setGetReadyReferrer('journey');
                        setCallDoctorImage('https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400');
                        setShowReminder(true);
                      }}
                      className="w-full bg-gradient-to-r from-[#00AC49] to-[#0D7A39] hover:brightness-105 active:scale-[0.98] text-white py-4.5 rounded-[24px] font-black text-[16px] transition-all flex justify-center items-center gap-2.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                        <path d="m22 8-6 4 6 4V8Z" />
                        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                        <line x1="9" x2="9" y1="10" y2="14"/>
                        <line x1="7" x2="11" y1="12" y2="12"/>
                      </svg>
                      Start Session / انضم للجلسة
                    </button>
                    
                    <button 
                      onClick={() => router.push('/calendar')}
                      className="w-full h-13 rounded-[24px] border border-gray-200/80 bg-white flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 active:scale-95 transition-all shadow-sm cursor-pointer font-bold text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      <span>View Calendar</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* SIMULATED LIVE STREAMING SESSION OVERLAY */}
        {isInActiveCall && (
          <div className="fixed inset-0 z-[100] bg-[#0A0E1A] flex flex-col justify-between select-none">
            
            {/* Fullscreen Video stream of Dr. Sarah Jenkins (female blonde doctor in blue scrubs) */}
            <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-slate-900">
              <Image 
                src="https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=1200"
                alt="Dr. Sarah Jenkins high-definition professional camera stream"
                fill
                className="object-cover object-center scale-[1.02] filter brightness-[0.93] contrast-[1.02]"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/55 z-1" />
            </div>

            {/* Top Row: User Information overlay */}
            <div className="relative z-10 pt-10 px-6 flex items-start justify-between">
              
              {/* Top-Left metadata */}
              <div className="flex flex-col">
                {/* IN SESSION badge */}
                <div className="flex items-center gap-1.5 bg-black/35 backdrop-blur-lg px-3 py-1.5 rounded-full border border-white/10 w-fit">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse"></span>
                  <span className="text-[11px] font-black text-white tracking-[0.08em] uppercase">
                    IN SESSION
                  </span>
                </div>
                
                {/* Doctor Name and Live Timer */}
                <h3 className="text-white text-[28px] font-black mt-3 leading-none tracking-tight drop-shadow-lg">
                  {callDoctorName}
                </h3>
                <span className="text-white/80 font-mono text-[13.5px] font-[600] mt-1.5 drop-shadow-md block">
                  {formatTimer(callTimer)} elapsed
                </span>
              </div>

              {/* Top-Right Ellipsis Menu */}
              <button 
                className="w-11 h-11 rounded-full bg-black/35 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white/95 hover:bg-black/55 transition-colors cursor-pointer"
                id="btn-call-more"
              >
                <svg className="w-5.5 h-5.5 stroke-current fill-current" viewBox="0 0 24 24">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
            </div>

            {/* Patient Picture-in-Picture view ("YOU") */}
            <div className="absolute top-[160px] right-6 w-[122px] h-[178px] rounded-[30px] overflow-hidden border-2 border-white/30 shadow-2xl z-20 hover:scale-[1.02] transition-transform duration-300">
              <div className="relative w-full h-full bg-[#0F172A] flex items-center justify-center">
                {!isVideoOff ? (
                  <video
                    ref={setCallVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-3 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-red-400 mb-1.5 border border-white/10">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m1 1 22 22" />
                        <path d="m21 16 3 3V5l-3 3" />
                        <rect x="2" y="6" width="14" height="12" rx="2" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase">
                      CAMERA OFF
                    </span>
                  </div>
                )}
                
                {/* YOU overlapping status text */}
                <div className="absolute bottom-2.5 left-2.5 bg-black/45 backdrop-blur-md px-2 py-1 rounded-xl border border-white/5 flex items-center gap-1 select-none">
                  {/* Subtle video status dot */}
                  <div className={`w-1.5 h-1.5 rounded-full ${!isVideoOff ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`} />
                  <span className="text-[10px] font-black tracking-widest text-white font-sans uppercase">
                    YOU
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Live Audio subtitles/captions overlaid elegantly over chest area */}
            <div className="relative z-10 pointer-events-none mt-auto mb-4 px-6 max-w-sm mx-auto w-full text-center">
              <p className="text-white text-md font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-snug px-4 py-2 bg-black/15 backdrop-blur-xs rounded-2xl border border-white/5 inline-block">
                🌿 {ARIS_SPEECHES[speechIndex % ARIS_SPEECHES.length]}
              </p>
            </div>

            {/* Bottom Section: Verification & Action Dashboards */}
            <div className="relative z-10 flex flex-col gap-3 pb-8 px-6 bg-gradient-to-t from-black/60 to-transparent">
              
              {/* Connection Status Label */}
              <div className="flex items-center justify-center gap-2 text-white/50 text-[11px] font-[900] tracking-[0.2em] uppercase select-none">
                {/* Vector signal lines */}
                <div className="flex items-end gap-[2px] h-3.5 w-4 shrink-0 px-0.5">
                  <div className="w-[1.5px] h-[4px] bg-[#22C55E] rounded-full" />
                  <div className="w-[1.5px] h-[7px] bg-[#22C55E] rounded-full" />
                  <div className="w-[1.5px] h-[10.5px] bg-[#22C55E] rounded-full" />
                  <div className="w-[1.5px] h-[13.5px] bg-[#22C55E] rounded-full" />
                </div>
                <span>SECURE CONNECTION</span>
              </div>

              {/* Controls Grid */}
              <div className="flex items-center justify-center gap-4.5 max-w-sm mx-auto w-full">
                
                {/* 1. Share Screen Monitor Icon Button */}
                <button 
                  className="w-[52px] h-[52px] rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/60 active:scale-[0.93] transition-all cursor-pointer shadow-lg"
                  id="btn-share-screen"
                >
                  <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </button>

                {/* 2. Micro Mute Button */}
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-[52px] h-[52px] rounded-full backdrop-blur-xl border flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-[0.93] ${
                    isMuted 
                      ? 'bg-red-500/80 border-red-500 text-white' 
                      : 'bg-black/40 border-white/10 text-white hover:bg-black/60'
                  }`}
                  id="btn-call-mute"
                >
                  {isMuted ? (
                    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="1" y1="1" x2="23" y2="23" />
                      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                    </svg>
                  )}
                </button>

                {/* 3. SOLID RED END CALL BUTTON */}
                <button 
                  onClick={() => {
                    router.push('/sessions/complete');
                  }}
                  className="w-16 h-16 rounded-full bg-[#B91C1C] hover:bg-[#991B1B] active:scale-[0.9] transition-all flex items-center justify-center text-white shadow-xl shadow-red-700/25 cursor-pointer"
                  id="btn-call-disconnect"
                >
                  <svg className="w-7 h-7 fill-current text-white transform rotate-[135deg]" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>

                {/* 4. Camera Toggle Button */}
                <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`w-[52px] h-[52px] rounded-full backdrop-blur-xl border flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-[0.93] ${
                    isVideoOff 
                      ? 'bg-red-500/80 border-red-500 text-white' 
                      : 'bg-black/40 border-white/10 text-white hover:bg-black/60'
                  }`}
                  id="btn-call-camera"
                >
                  {isVideoOff ? (
                    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m1 1 22 22" />
                      <path d="m21 16 3 3V5l-3 3" />
                      <rect width="14" height="12" x="2" y="6" rx="2" className="opacity-45" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 8-6 4 6 4V8Z" />
                      <rect x="2" y="6" width="14" height="12" rx="2" ry="2" />
                    </svg>
                  )}
                </button>

                {/* 5. Audio Route speaker toggle */}
                <button 
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`w-[52px] h-[52px] rounded-full backdrop-blur-xl border flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-[0.93] ${
                    isSpeakerOn 
                      ? 'bg-black/45 border-white/10 text-emerald-400' 
                      : 'bg-black/40 border-white/10 text-white/50 hover:bg-black/60'
                  }`}
                  id="btn-call-speaker"
                >
                  <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </button>
              </div>

              {/* Secure footer notification */}
              <span className="text-white/60 text-[11px] font-[600] tracking-tight text-center block drop-shadow-sm select-none">
                This session is private and encrypted for your safety.
              </span>
            </div>
          </div>
        )}
      </>
    );
  }

  // RENDER NORMAL BOOKING SCREEN (unsubscribed state)
  return (
    <>
      {/* ========================================================
          OLD MOBILE LAYOUT (Exactly as it was originally)
          ======================================================== */}
      <div className="block md:hidden min-h-screen bg-[#F8FBFC] font-inter max-w-lg lg:max-w-xl mx-auto pb-24 px-5">
        
        {/* Header */}
        <div className="pt-12 pb-4 flex items-center bg-white sticky top-0 z-20">
          <button 
            onClick={() => router.back()} 
            className="p-2 -ml-2 mr-2 text-[#5C7182] hover:bg-gray-100 rounded-full transition-colors flex items-center"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-[#A0B3C6]" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-100 rounded-[16px] leading-5 bg-white placeholder-[#A0B3C6] focus:outline-none focus:ring-1 focus:ring-[#0D7A39] focus:border-[#0D7A39] sm:text-sm text-gray-900 shadow-sm"
              placeholder="Search by name or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white pb-4 pt-2 sticky top-[80px] z-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex justify-center pb-2">
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[14px] font-bold transition-all border shadow-sm ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#7EE299] to-[#29B055] text-white border-transparent'
                      : 'bg-white text-[#5C7182] border-gray-100 hover:bg-gray-50 font-semibold'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Subscription Banner */}
        {isSubscribed && (
          <div className="mt-4 bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] text-white rounded-[28px] p-6 shadow-xl shadow-emerald-500/10 relative overflow-hidden border border-emerald-400/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8 blur-lg pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <span className="inline-block bg-white/20 backdrop-blur-md text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase mb-2">
                  ✨ اشتراك نشط مفعّل / ACTIVE SUBSCRIPTION
                </span>
                <h3 className="text-[20px] font-black leading-tight mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
                  انضم إلى جلستك العلاجية الآن!
                </h3>
                <p className="text-emerald-100 text-[13px] font-medium leading-relaxed">
                  قناتك الاستشارية وجلستك مع طبيبك جاهزة للانضمام. اضغط لمشاهدة مسار العلاج والدخول.
                </p>
              </div>
              
              <button
                onClick={() => {
                  setShowReminder(false);
                  setShowJourney(true);
                }}
                className="bg-white hover:bg-emerald-50 text-[#047857] px-6 py-3.5 rounded-full font-black text-[14px] transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-black/5 whitespace-nowrap cursor-pointer shrink-0"
                id="btn-goto-journey-banner-mobile"
              >
                Join Now / انضم الآن
              </button>
            </div>
          </div>
        )}

        {/* Doctor Cards */}
        <div className="flex-1 pt-4 flex flex-col gap-5">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-50 flex flex-col">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="w-[88px] h-[88px] rounded-2xl overflow-hidden shrink-0 relative bg-gray-100">
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                      sizes="88px"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 flex flex-col pt-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-[#1C1C1C] text-[16px]">{doctor.name}</h3>
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-md">
                        <Star size={12} className="fill-[#29B055] text-[#29B055]" />
                        <span className="text-[#29B055] text-[12px] font-bold">{doctor.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <p className="text-[#5C7182] text-[13px] mb-2.5">{doctor.specialty}</p>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {doctor.tags.map((tag, idx) => {
                        return (
                          <span 
                            key={idx}
                            className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide bg-[#F4F6F9] text-[#5C7182]"
                          >
                            {tag}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
                
                <Link href={`/sessions/${doctor.id}`}
                  className="w-full mt-4 bg-gradient-to-r from-[#29B055] to-[#0A9D46] hover:from-[#249e4d] hover:to-[#088C3E] text-white py-3.5 rounded-xl font-bold text-[14px] transition-all shadow-md shadow-green-100 flex justify-center items-center"
                >
                  BOOK APPOINTMENT
                </Link>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-[#5C7182] text-[15px]">No specialists found for this search/category.</p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          NEW HIGH-FIDELITY WEB DESKTOP LAYOUT (Exactly matching mockup)
          ======================================================== */}
      <div className="hidden md:block min-h-screen bg-[#FCFAF6] font-inter px-8 pb-16">
        
        {/* Title Header Section */}
        <div className="mb-8 pt-2">
          <span className="text-[11px] font-black text-[#0D7A39] tracking-widest uppercase">Tabtaba</span>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight mt-1">
            Find Your Compassionate Expert
          </h1>
          <p className="text-gray-550 text-sm max-w-2xl mt-1 leading-relaxed font-medium">
            Connect with licensed professionals dedicated to your emotional well-being and personal growth journey.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-150/70 rounded-full text-sm text-gray-855 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D7A39]/15 focus:border-[#0D7A39] shadow-sm"
            placeholder="Search specialists by name, condition, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Chips row */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {['All Specialists', 'Anxiety', 'Depression', 'PTSD', 'ADHD', 'Child Psychiatry'].map((category) => {
            const isSelected = selectedCategory === category || (category === 'All Specialists' && selectedCategory === 'All Specialists');
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                  isSelected 
                    ? 'bg-[#0D7A39] text-white shadow-[#0D7A39]/10' 
                    : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Active Subscription Banner */}
        {isSubscribed && (
          <div className="mb-8 bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] text-white rounded-[28px] p-6 shadow-xl shadow-emerald-500/10 relative overflow-hidden border border-emerald-400/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8 blur-lg pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <span className="inline-block bg-white/20 backdrop-blur-md text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase mb-2">
                  ACTIVE SUBSCRIPTION
                </span>
                <h3 className="text-[20px] font-black leading-tight mb-1">
                  Join your therapy session now!
                </h3>
                <p className="text-emerald-100 text-[13px] font-medium leading-relaxed">
                  Your consulting room is active. Click to view your treatment path and join.
                </p>
              </div>
              
              <button
                onClick={() => {
                  setShowReminder(false);
                  setShowJourney(true);
                }}
                className="bg-white hover:bg-emerald-50 text-[#047857] px-6 py-3.5 rounded-full font-black text-[14px] transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-black/5 whitespace-nowrap cursor-pointer shrink-0"
                id="btn-goto-journey-banner"
              >
                Join Now
              </button>
            </div>
          </div>
        )}

        {/* Featured Specialists Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-black text-gray-900">Featured Specialists</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-650 transition-colors cursor-pointer">
                &lt;
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-gray-650 transition-colors cursor-pointer">
                &gt;
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Specialist 1 */}
            <div className="bg-[#0D7A39] rounded-[32px] p-6 text-white shadow-md flex justify-between items-center min-h-[170px] relative overflow-hidden group">
              <div className="flex flex-col justify-between h-full gap-4 z-10">
                <div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-white/20 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase">
                      Psychiatrist
                    </span>
                    <span className="bg-white/90 text-[#0D7A39] text-[9px] font-black tracking-wider px-2.5 py-0.5 rounded-full uppercase">
                      TOP RATED
                    </span>
                  </div>
                  <h3 className="text-xl font-black mt-3">Dr. Rana Hassan</h3>
                  <div className="flex items-center gap-1 mt-1 text-white/90 text-xs font-bold">
                    <span className="text-yellow-300">&#9733;</span>
                    <span>4.9 (120 reviews)</span>
                  </div>
                </div>
                <Link 
                  href="/sessions/1"
                  className="bg-white text-[#0D7A39] hover:bg-white/95 px-5 py-2.5 rounded-full font-bold text-xs shadow-sm transition-all active:scale-[0.98] w-fit"
                >
                  Book Now
                </Link>
              </div>
              <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 border-4 border-white/10 bg-white/5 z-10">
                <Image 
                  src="https://i.postimg.cc/mrLfS7Wm/Capture-PNG1.png"
                  alt="Dr. Rana Hassan"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Featured Specialist 2 */}
            <div className="bg-[#374151] rounded-[32px] p-6 text-white shadow-md flex justify-between items-center min-h-[170px] relative overflow-hidden group">
              <div className="flex flex-col justify-between h-full gap-4 z-10">
                <div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-white/20 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase">
                      Child Psychiatrist
                    </span>
                  </div>
                  <h3 className="text-xl font-black mt-3">Dr. Amira El-Saai</h3>
                  <div className="flex items-center gap-1 mt-1 text-white/90 text-xs font-bold">
                    <span className="text-yellow-300">&#9733;</span>
                    <span>4.8 (95 reviews)</span>
                  </div>
                </div>
                <Link 
                  href="/sessions/2"
                  className="bg-white text-gray-800 hover:bg-white/95 px-5 py-2.5 rounded-full font-bold text-xs shadow-sm transition-all active:scale-[0.98] w-fit"
                >
                  Book Now
                </Link>
              </div>
              <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 border-4 border-white/10 bg-white/5 z-10">
                <Image 
                  src="https://i.postimg.cc/kMzCdVWC/Capture-PNG2.png"
                  alt="Dr. Amira El-Saai"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Explore Specialists Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-black text-gray-900">Explore Specialists</h2>
            <span className="text-xs text-gray-400 font-bold">3 professionals found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Explore Card 1 */}
            <div className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-gray-100/50 flex flex-col justify-between min-h-[260px] relative hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                    <Image 
                      src="https://i.postimg.cc/mrLfS7Wm/Capture-PNG1.png"
                      alt="Dr. Rana Hassan"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-[#E6F4F0] text-[#0D7A39] text-[8.5px] font-black px-2 py-0.5 rounded-md uppercase">
                        Psychiatrist
                      </span>
                      <div className="flex items-center gap-0.5 text-xs font-bold text-gray-805">
                        <span className="text-yellow-400">&#9733;</span>
                        <span>4.9</span>
                      </div>
                    </div>
                    <h3 className="font-black text-gray-900 text-sm">Dr. Rana Hassan</h3>
                    <p className="text-gray-400 text-xs mt-0.5 font-medium leading-none">Adult Psychiatrist</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold px-2 py-1 rounded bg-gray-55 hover:bg-gray-100 text-gray-500 uppercase tracking-wide">
                    8 Years Exp.
                  </span>
                  <span className="text-[9px] font-bold px-2 py-1 rounded bg-gray-55 hover:bg-gray-100 text-gray-500 uppercase tracking-wide">
                    Certified
                  </span>
                </div>
              </div>

              <Link 
                href="/sessions/1"
                className="bg-[#0D7A39] hover:bg-[#0B6630] text-white py-3 rounded-xl font-bold text-xs w-full mt-4 flex items-center justify-center shadow-sm transition-colors"
              >
                Book Session
              </Link>
            </div>

            {/* Explore Card 2 */}
            <div className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-gray-100/50 flex flex-col justify-between min-h-[260px] relative hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                    <Image 
                      src="https://i.postimg.cc/kMzCdVWC/Capture-PNG2.png"
                      alt="Dr. Amira El-Saai"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-[#E6F4F0] text-[#0D7A39] text-[8.5px] font-black px-2 py-0.5 rounded-md uppercase">
                        Child Psychiatrist
                      </span>
                      <div className="flex items-center gap-0.5 text-xs font-bold text-gray-850">
                        <span className="text-yellow-400">&#9733;</span>
                        <span>4.8</span>
                      </div>
                    </div>
                    <h3 className="font-black text-gray-900 text-sm">Dr. Amira El-Saai</h3>
                    <p className="text-gray-400 text-xs mt-0.5 font-medium leading-none">Child & Adolescent Specialist</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold px-2 py-1 rounded bg-gray-55 hover:bg-gray-100 text-gray-500 uppercase tracking-wide">
                    6 Years Exp.
                  </span>
                  <span className="text-[9px] font-bold px-2 py-1 rounded bg-gray-55 hover:bg-gray-100 text-gray-500 uppercase tracking-wide">
                    Certified
                  </span>
                </div>
              </div>

              <Link 
                href="/sessions/2"
                className="bg-[#0D7A39] hover:bg-[#0B6630] text-white py-3 rounded-xl font-bold text-xs w-full mt-4 flex items-center justify-center shadow-sm transition-colors"
              >
                Book Session
              </Link>
            </div>

            {/* Explore Card 3 */}
            <div className="bg-white rounded-[28px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-gray-100/50 flex flex-col justify-between min-h-[260px] relative hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                    <Image 
                      src="https://i.postimg.cc/6pGyXJ7J/Capture.png"
                      alt="Dr. Sherif Mansour"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="bg-[#E6F4F0] text-[#0D7A39] text-[8.5px] font-black px-2 py-0.5 rounded-md uppercase">
                        Senior Consultant
                      </span>
                      <div className="flex items-center gap-0.5 text-xs font-bold text-gray-800">
                        <span className="text-yellow-400">&#9733;</span>
                        <span>5.0</span>
                      </div>
                    </div>
                    <h3 className="font-black text-gray-900 text-sm">Dr. Sherif Mansour</h3>
                    <p className="text-gray-400 text-xs mt-0.5 font-medium leading-none">Family & CBT Consultant</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold px-2 py-1 rounded bg-gray-55 hover:bg-gray-100 text-gray-500 uppercase tracking-wide">
                    15 Years Exp.
                  </span>
                  <span className="text-[9px] font-bold px-2 py-1 rounded bg-gray-55 hover:bg-gray-100 text-gray-500 uppercase tracking-wide">
                    Certified
                  </span>
                </div>
              </div>

              <Link 
                href="/sessions/3"
                className="bg-[#0D7A39] hover:bg-[#0B6630] text-white py-3 rounded-xl font-bold text-xs w-full mt-4 flex items-center justify-center shadow-sm transition-colors"
              >
                Book Session
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-16 pt-8 border-t border-gray-150/70 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-black text-[#0D7A39] text-sm">Tabtaba</span>
            <span>&copy; 2026 Tabtaba. Your partner in mental wellness.</span>
          </div>
          <div className="flex flex-wrap gap-6 font-bold">
            <Link href="/privacy" className="hover:text-gray-650 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-650 transition-colors">Privacy Policy</Link>
            <Link href="/support" className="hover:text-gray-650 transition-colors">Help Center</Link>
            <Link href="/settings" className="hover:text-gray-650 transition-colors">Cookie Settings</Link>
          </div>
        </footer>
      </div>

      {/* 5-Second Interactive Alert Modal */}
      {showFiveSecAlert && (
        <div className="fixed inset-0 z-[1000001] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            onClick={() => setShowFiveSecAlert(false)}
          ></div>

          <div className="relative bg-white rounded-[32px] w-full max-w-[350px] p-6 shadow-2xl border border-emerald-50 overflow-hidden transform animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-12 -mt-12 blur-xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600 relative">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping"></span>
                <Sparkles size={28} className="relative z-10 animate-bounce" />
              </div>

              <h3 className="text-[21px] font-[900] text-[#0D7A39] text-center mb-1 leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>
                يلا انضم يا باشا! 🎉
              </h3>
              
              <h4 className="text-[12px] font-black tracking-widest uppercase text-emerald-800/80 text-center mb-4">
                READY TO JOIN!
              </h4>

              <p className="text-[14px] text-slate-800 font-bold text-center leading-relaxed mb-3">
                جلستك العلاجية مع طبيبك جاهزة ومفعلة الآن. اضغط على الزر بالأسفل للانضمام فوراً وتجربة مسار العلاج الفردي!
              </p>

              <p className="text-[12px] text-slate-500 font-medium text-center leading-relaxed mb-6 italic">
                Your psychiatric session has been activated and is waiting. Click below to join now and begin your customized care journey!
              </p>

              <button
                onClick={() => {
                  setShowFiveSecAlert(false);
                  setShowReminder(false);
                  setShowJourney(true);
                }}
                className="w-full bg-gradient-to-r from-[#29B055] to-[#0A9D46] hover:from-[#249e4d] hover:to-[#088C3E] text-white py-4 rounded-2xl font-black text-[15px] shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mb-2"
                id="btn-alert-join-now"
              >
                Join Now / انضم الآن 👉
              </button>

              <button
                onClick={() => setShowFiveSecAlert(false)}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 py-3 rounded-2xl font-black text-[13px] transition-all cursor-pointer flex items-center justify-center"
              >
                ربما لاحقاً / Maybe Later
              </button>
            </div>

            <button
              onClick={() => setShowFiveSecAlert(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Close alert"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
