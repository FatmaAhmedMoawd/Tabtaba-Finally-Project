'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  Headphones, 
  Wind, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Trash2, 
  Play, 
  Square,
  Moon,
  Sun,
  Activity,
  HeartCrack,
  Star,
  PartyPopper,
  Volume2
} from 'lucide-react';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';
import { useLanguage } from '@/lib/language-context';

// Pre-seeded specialist database matching standard schema
const SEEDED_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Rana Hassan',
    specialty: 'Psychiatrist',
    rating: 4.9,
    imageUrl: 'https://i.postimg.cc/mrLfS7Wm/Capture-PNG1.png',
    tags: ['MOOD DISORDERS', 'ANXIETY', 'ADHD'],
  },
  {
    id: '3',
    name: 'Dr. Sherif Mansour',
    specialty: 'Senior Consultant',
    rating: 5.0,
    imageUrl: 'https://i.postimg.cc/6pGyXJ7J/Capture.png',
    tags: ['CBT THERAPY', 'FAMILY'],
  }
];

// Pre-seeded customizable ambient sound exercises
const SEEDED_SOUNDS = [
  {
    id: 'sound-ocean',
    titleEn: 'Dynamic Ocean Breath',
    titleAr: 'أنفاس المحيط الحية',
    descEn: 'Relieves immediate panic through gentle wave rhythms.',
    descAr: 'يخفف الهلع الفوري عبر محاكاة أمواج البحر اللطيفة.',
    duration: '10 min',
    type: 'ocean',
    icon: 'Wind',
    color: 'from-cyan-400 to-blue-500',
    bg: 'bg-cyan-50'
  },
  {
    id: 'sound-calm',
    titleEn: 'Cosmic Tranquility Synth',
    titleAr: 'سنث الطمأنينة الكونية',
    descEn: 'Deep soothing bass beat to rest an overworked mind.',
    descAr: 'ترددات هادئة للمخ لتصفية الذهن وعلاج قلق التفكير المفرط.',
    duration: '15 min',
    type: 'cosmic',
    icon: 'Headphones',
    color: 'from-indigo-400 to-purple-600',
    bg: 'bg-indigo-50'
  }
];

// Helper to resolve icon components from serialized string names safely
const getIconComponent = (iconName: any) => {
  if (iconName === 'Wind') return Wind;
  return Headphones;
};

// Helper class for browser-native audio synthesizer loop so users play relaxing sounds live!
class AmbientSynth {
  ctx: AudioContext | null = null;
  gain: GainNode | null = null;
  osc1: OscillatorNode | null = null;
  osc2: OscillatorNode | null = null;
  filter: BiquadFilterNode | null = null;
  interval: any = null;

  start(type: string) {
    try {
      if (typeof window === 'undefined') return;
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gain = this.ctx.createGain();
      this.filter = this.ctx.createBiquadFilter();

      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.gain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 1.2);

      if (type === 'ocean') {
        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(75, this.ctx.currentTime);

        this.osc2 = this.ctx.createOscillator();
        this.osc2.type = 'triangle';
        this.osc2.frequency.setValueAtTime(77, this.ctx.currentTime);

        // Slowly sweep lowpass filter frequency up and down to sound like physical ocean waves
        let high = true;
        this.interval = setInterval(() => {
          if (!this.ctx || !this.filter || !this.gain) return;
          const f = high ? 420 : 180;
          const v = high ? 0.18 : 0.05;
          this.filter.frequency.exponentialRampToValueAtTime(f, this.ctx.currentTime + 4.5);
          this.gain.gain.linearRampToValueAtTime(v, this.ctx.currentTime + 4.0);
          high = !high;
        }, 5000);

        this.osc1.connect(this.filter);
        this.osc2.connect(this.filter);
      } else {
        // Cosmic relaxing soundscapes
        this.osc1 = this.ctx.createOscillator();
        this.osc1.type = 'triangle';
        this.osc1.frequency.setValueAtTime(120, this.ctx.currentTime); // Soft B2 node

        this.osc2 = this.ctx.createOscillator();
        this.osc2.type = 'sine';
        this.osc2.frequency.setValueAtTime(240, this.ctx.currentTime);

        let high = true;
        this.interval = setInterval(() => {
          if (!this.ctx || !this.gain) return;
          const volTarget = high ? 0.22 : 0.08;
          this.gain.gain.linearRampToValueAtTime(volTarget, this.ctx.currentTime + 3.0);
          high = !high;
        }, 3500);

        this.osc1.connect(this.filter);
        this.osc2.connect(this.filter);
      }

      this.filter.connect(this.gain);
      this.gain.connect(this.ctx.destination);
      this.osc1.start();
      if (this.osc2) this.osc2.start();
    } catch (e) {
      console.error("Audio Synthesis block did not load:", e);
    }
  }

  stop() {
    try {
      if (this.interval) clearInterval(this.interval);
      if (this.gain && this.ctx) {
        this.gain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
        setTimeout(() => {
          try {
            this.osc1?.stop();
            this.osc2?.stop();
            this.ctx?.close();
          } catch(err){}
        }, 500);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default function FavoritesOasisPage() {
  const router = useRouter();
  const { language: lang, setLanguage: setLang } = useLanguage();
  
  // States
  const [activeTab, setActiveTab] = useState<'sounds' | 'doctors' | 'affirmation'>('sounds');
  const [doctors, setDoctors] = useState<any[]>([]);
  const [sounds, setSounds] = useState<any[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  // Affirmation Generator states
  const [selectedMood, setSelectedMood] = useState<string>('anxious');
  const [affirmation, setAffirmation] = useState<{ en: string; ar: string } | null>(null);
  const [isLoadingAffirmation, setIsLoadingAffirmation] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; targetX: number }[]>([]);

  // Sound Synth reference
  const synthRef = useRef<AmbientSynth | null>(null);
  
  // Load and seed localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Delay state changes to resolve cascading render issues
      setTimeout(() => {
        // Seed and load therapists
        const storedDocs = localStorage.getItem('fav_doctors');
        if (storedDocs) {
          setDoctors(JSON.parse(storedDocs));
        } else {
          localStorage.setItem('fav_doctors', JSON.stringify(SEEDED_DOCTORS));
          setDoctors(SEEDED_DOCTORS);
        }

        // Seed and load sound cards with automatic repair/migration for stale icon objects
        const storedSounds = localStorage.getItem('fav_sounds');
        let parsedSounds = null;
        try {
          if (storedSounds) {
            const rawParsed = JSON.parse(storedSounds);
            // Verify all items are string icon types, else clear/reset
            if (rawParsed && Array.isArray(rawParsed) && rawParsed.every((s: any) => typeof s.icon === 'string' && s.icon !== '')) {
              parsedSounds = rawParsed;
            }
          }
        } catch (e) {
          parsedSounds = null;
        }

        if (parsedSounds) {
          setSounds(parsedSounds);
        } else {
          localStorage.setItem('fav_sounds', JSON.stringify(SEEDED_SOUNDS));
          setSounds(SEEDED_SOUNDS);
        }
      }, 0);
    }

    return () => {
      // Cleanup synth on unmount
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  // Play / Pause synthetic sound waves
  const togglePlaySound = (soundId: string, type: string) => {
    if (playingId === soundId) {
      if (synthRef.current) {
        synthRef.current.stop();
        synthRef.current = null;
      }
      setPlayingId(null);
    } else {
      // Stop currently playing
      if (synthRef.current) {
        synthRef.current.stop();
      }
      const newSynth = new AmbientSynth();
      newSynth.start(type);
      synthRef.current = newSynth;
      setPlayingId(soundId);

      // Triggers custom magical ripple sparkle location
      triggerSparkles(10);
    }
  };

  // Sparkles generator effect
  const triggerSparkles = (count = 12) => {
    const newSparkles = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      x: Math.random() * 80 + 10, // percentages
      y: Math.random() * 60 + 20,
      targetX: (Math.random() - 0.5) * 60,
    }));
    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 2000);
  };

  // Delete/un-favorite handler
  const removeDoctor = (id: string) => {
    const fresh = doctors.filter(d => d.id !== id);
    setDoctors(fresh);
    localStorage.setItem('fav_doctors', JSON.stringify(fresh));
  };

  const removeSound = (id: string) => {
    if (playingId === id && synthRef.current) {
      synthRef.current.stop();
      setPlayingId(null);
    }
    const fresh = sounds.filter(s => s.id !== id);
    setSounds(fresh);
    localStorage.setItem('fav_sounds', JSON.stringify(fresh));
  };

  // Generate Personalized Affirmation via server-side Gemini 3.5-flash
  const generateBlessing = async () => {
    setIsLoadingAffirmation(true);
    setAffirmation(null);
    try {
      const response = await fetch('/api/affirmations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood: selectedMood }),
      });
      const data = await response.json();
      setAffirmation(data);
      triggerSparkles(18);
    } catch (e) {
      console.error(e);
      setAffirmation({
        en: "Take a beautiful slow breath. Calm is your superpower, and you are surrounded by light.",
        ar: "تنفّس ببطء ولطف وجمال. الطمأنينة هي قوتك الاستثنائية، والنور يحيط بقلبك دائمًا."
      });
    } finally {
      setIsLoadingAffirmation(false);
    }
  };

  // Static translations dictionary to support bilingual immersion beautifully
  const t = {
    oasisTitle: { ar: 'واحة المفضلة والمستودع السحري', en: 'Favorites Oasis & Sanctuary' },
    oasisSub: { ar: 'ملاذك الآمن ومستودع الطمأنينة لكل ما يحبه قلبك', en: 'Your secure sanctuary for everything that comforts your soul' },
    tabSounds: { ar: 'أصوات مهدئة', en: 'Zen Sounds' },
    tabSaves: { ar: 'الأخصائيين', en: 'Specialists' },
    tabBlessings: { ar: 'توكيدات AI', en: 'AI Blessings' },
    noSaves: { ar: 'لا توجد عناصر مفضلة حالياً', en: 'No favorites saved yet' },
    booking: { ar: 'حجز جلسة', en: 'Book Session' },
    message: { ar: 'تواصل الآن', en: 'Chat Now' },
    playNow: { ar: 'استمع وعش التجربة', en: 'Play live soundscape' },
    playing: { ar: 'يعزف الآن طيف لطيف...', en: 'Playing live sanctuary waves...' },
    stopPlay: { ar: 'إيقاف الصوت', en: 'Stop Sound' },
    breatheWithUs: { ar: 'تزامن بتنفسك مع النبض', en: 'Synchronize your breath' },
    oracleDesc: { ar: 'اختر حالتك النفسية ودع الذكاء الاصطناعي يبخر قلبك بتوكيدة مصممة خصيصاً لك', en: 'Select your state and receive a personalized poetic affirmation generated live' },
    oracleButton: { ar: 'استقبل رسالة الواحة السحرية 🕊️', en: 'Receive Oasis Blessing 🕊️' },
    generating: { ar: 'يقوم الحكيم بنسج مباركتك...', en: 'The Zen Sage is crafting your blessing...' },
    unfavorite: { ar: 'حفظ', en: 'Keep Saved' },
    breatheIn: { ar: 'شهـيق', en: 'Breathe In' },
    breatheOut: { ar: 'زفــير', en: 'Breathe Out' },
    states: {
      anxious: { ar: 'قلق ومشتت 🌪️', en: 'Anxious' },
      tired: { ar: 'مرهق ومستنزف 🔋', en: 'Exhausted' },
      sad: { ar: 'مهموم أو حزين 💧', en: 'Heavy-hearted' },
      grateful: { ar: 'راضٍ وممتن 🙏', en: 'Peaceful & Grateful' },
      overwhelmed: { ar: 'أفكاري متسارعة 🧠', en: 'Overthinking' }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EBF5F1] via-[#F3FAF7] to-[#FFFDF9] font-inter pb-32 text-[#1C1C1C] relative overflow-x-hidden">
      
      {/* Background Magical Subtle Star Glow elements to make it feel dreamy/خياليه */}
      <div className="absolute top-10 left-10 w-[180px] h-[180px] bg-[#22C55E] rounded-full blur-3xl opacity-15 pointer-events-none animate-pulse"></div>
      <div className="absolute top-48 right-(-20) w-[250px] h-[250px] bg-sky-200 rounded-full blur-[80px] opacity-25 pointer-events-none"></div>
      <div className="absolute bottom-40 left-5 w-[200px] h-[200px] bg-amber-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      {/* RENDER FLOATING SUNS/SPARKLES */}
      <AnimatePresence>
        {sparkles.map(spark => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 0, scale: 0, y: 15 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.4, 1.2, 0], x: spark.targetX }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{ left: `${spark.x}%`, top: `${spark.y}%` }}
            className="absolute z-50 pointer-events-none text-yellow-400 text-xl font-bold filter drop-shadow-[0_2px_8px_rgba(250,204,21,0.6)]"
          >
            ★
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header Bar */}
      <div className="pt-12 px-6 flex justify-between items-center relative z-20">
        <button 
          onClick={() => router.push('/profile')}
          className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-emerald-50 flex items-center justify-center text-[#0D7A39] hover:scale-110 active:scale-95 transition-all"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        
        {/* Bilingual Language Switcher Pill with animation */}
        <button
          onClick={() => {
            const nextL = lang === 'en' ? 'ar' : 'en';
            setLang(nextL);
            localStorage.setItem('language', nextL);
          }}
          className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-emerald-100 flex items-center gap-2 text-[13px] font-extrabold text-[#0D7A39] hover:bg-emerald-50 active:scale-95 transition-all text-left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          {lang === 'ar' ? 'العربية 🇪🇬' : 'English 🇺🇸'}
        </button>
      </div>

      {/* Spectacular Title / Welcome card */}
      <div className="mt-8 px-6 text-center max-w-2xl mx-auto flex flex-col items-center relative z-20">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-20 h-20 rounded-[28px] bg-[#22C55E] flex items-center justify-center text-white mb-5 shadow-lg shadow-[#22C55E]/20 relative"
        >
          {/* Animated pulsing halo around icon */}
          <div className="absolute inset-0 rounded-[28px] border-4 border-[#22C55E] animate-ping opacity-40"></div>
          <Heart size={38} className="fill-white stroke-none animate-pulse" />
        </motion.div>

        <h1 className="text-[26px] sm:text-[32px] font-black leading-tight text-[#0D7A39] tracking-tight">
          {lang === 'ar' ? t.oasisTitle.ar : t.oasisTitle.en}
        </h1>
        
        <p className="text-[14px] sm:text-[16px] text-[#5A7A6E] mt-2 max-w-md font-medium leading-relaxed">
          {lang === 'ar' ? t.oasisSub.ar : t.oasisSub.en}
        </p>
      </div>

      {/* Tabs list */}
      <div className="mt-10 px-4 max-w-lg md:max-w-xl mx-auto relative z-20">
        <div className="bg-[#E7F2EC] p-1 rounded-3xl flex gap-1 shadow-inner relative w-full overflow-hidden">
          <button
            onClick={() => setActiveTab('sounds')}
            className={`flex-1 py-3 text-center rounded-2xl font-black text-[11px] xs:text-[13px] sm:text-[14px] px-1 sm:px-3 transition-all duration-300 relative truncate ${
              activeTab === 'sounds' 
                ? 'bg-[#22C55E] text-white shadow-md' 
                : 'text-[#0D7A39] hover:bg-[#DCEEE3]'
            }`}
          >
            {lang === 'ar' ? t.tabSounds.ar : t.tabSounds.en}
          </button>
          
          <button
            onClick={() => setActiveTab('doctors')}
            className={`flex-1 py-3 text-center rounded-2xl font-black text-[11px] xs:text-[13px] sm:text-[14px] px-1 sm:px-3 transition-all duration-300 relative truncate ${
              activeTab === 'doctors' 
                ? 'bg-[#22C55E] text-white shadow-md' 
                : 'text-[#0D7A39] hover:bg-[#DCEEE3]'
            }`}
          >
            {lang === 'ar' ? t.tabSaves.ar : t.tabSaves.en}
          </button>

          <button
            onClick={() => setActiveTab('affirmation')}
            className={`flex-1 py-3 text-center rounded-2xl font-black text-[11px] xs:text-[13px] sm:text-[14px] px-1 sm:px-3 transition-all duration-300 relative truncate ${
              activeTab === 'affirmation' 
                ? 'bg-[#22C55E] text-white shadow-md' 
                : 'text-[#0D7A39] hover:bg-[#DCEEE3]'
            }`}
          >
            {lang === 'ar' ? t.tabBlessings.ar : t.tabBlessings.en}
          </button>
        </div>
      </div>

      {/* Tab Panels with animations */}
      <div className="mt-8 px-6 max-w-lg md:max-w-4xl lg:max-w-5xl mx-auto relative z-20">
        <AnimatePresence mode="wait">
          
          {/* TAP 1: MINDFUL SOUNDS */}
          {activeTab === 'sounds' && (
            <motion.div
              key="sounds-tab"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {sounds.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 text-center border border-gray-100">
                  <HeartCrack className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-400 font-bold">{lang === 'ar' ? t.noSaves.ar : t.noSaves.en}</p>
                </div>
              ) : (
                sounds.map((sound) => {
                  const IconComp = getIconComponent(sound.icon);
                  const isPlaying = playingId === sound.id;
                  
                  return (
                    <div 
                      key={sound.id}
                      className="bg-white/90 backdrop-blur-md rounded-[32px] p-5 shadow-[0_12px_36px_rgb(0,0,0,0.03)] border border-emerald-50/50 flex flex-col gap-4 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group"
                    >
                      {/* Gradient Accent edge */}
                      <div className={`absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-b ${sound.color}`} />

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-4 pl-1.5 matches-ar">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${sound.color} text-white shadow-md`}>
                            {isPlaying ? (
                              <Volume2 className="w-7 h-7 animate-bounce" />
                            ) : (
                              <IconComp className="w-7 h-7" />
                            )}
                          </div>
                          
                          <div className="flex flex-col">
                            <h3 className="font-extrabold text-[#111827] text-[17px] leading-snug">
                              {lang === 'ar' ? sound.titleAr : sound.titleEn}
                            </h3>
                            <span className="text-[12px] text-gray-400 mt-0.5 font-bold tracking-wider float-left">
                              {sound.duration}
                            </span>
                          </div>
                        </div>

                        {/* Top corner action */}
                        <button
                          onClick={() => removeSound(sound.id)}
                          className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-60 hover:opacity-100 hover:scale-105 active:scale-95 transition-all text-left"
                          title={lang === 'ar' ? t.unfavorite.ar : t.unfavorite.en}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-[14px] text-gray-500 leading-relaxed font-semibold pl-1.5">
                        {lang === 'ar' ? sound.descAr : sound.descEn}
                      </p>

                      {/* Interactive dynamic Web Audio Synthesizer Controls */}
                      <div className="mt-2 bg-[#F1F8F5] rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black text-[#0D7A39] tracking-wider uppercase">
                            {isPlaying ? (lang === 'ar' ? t.playing.ar : t.playing.en) : (lang === 'ar' ? t.playNow.ar : t.playNow.en)}
                          </span>
                          {isPlaying && (
                            <span className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 italic font-semibold">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                              Synthesizing calm...
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => togglePlaySound(sound.id, sound.type)}
                          className={`px-5 py-3 rounded-full font-black text-[13px] flex items-center gap-2 shadow-sm transition-all duration-300 ${
                            isPlaying 
                              ? 'bg-red-500 text-white hover:bg-red-600 scale-102' 
                              : 'bg-[#22C55E] text-white hover:bg-emerald-600 hover:scale-103'
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Square size={14} className="fill-white" />
                              <span>{lang === 'ar' ? t.stopPlay.ar : t.stopPlay.en}</span>
                            </>
                          ) : (
                            <>
                              <Play size={14} className="fill-white" />
                              <span>{lang === 'ar' ? 'ابدأ العزف' : 'Play Live'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Breathing Visualizer (Glow Ring) if sound is playing! */}
                      {isPlaying && (
                        <div className="mt-4 border-t border-gray-100 pt-4 flex flex-col items-center justify-center overflow-hidden">
                          <p className="text-[12px] font-bold text-[#0D7A39] mb-4">
                            {lang === 'ar' ? t.breatheWithUs.ar : t.breatheWithUs.en}
                          </p>
                          
                          <div className="relative w-40 h-40 flex items-center justify-center">
                            {/* Inner Circle displaying Breathe logic */}
                            <motion.div 
                              animate={{ scale: [0.8, 1.4, 1.4, 0.8] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute w-28 h-28 rounded-full bg-emerald-100 opacity-40 blur-lg"
                            />

                            <motion.div 
                              animate={{ scale: [0.95, 1.3, 1.3, 0.95] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute w-20 h-20 rounded-full border-4 border-dashed border-[#22C55E]"
                            />

                            <motion.div 
                              animate={{ scale: [1, 1.25, 1.25, 1] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                              className="relative w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center font-black text-xs text-[#0D7A39]"
                            >
                              <motion.span
                                animate={{ opacity: [1, 1, 0, 0, 1] }}
                                transition={{ duration: 8, repeat: Infinity }}
                                className="absolute"
                              >
                                {lang === 'ar' ? t.breatheIn.ar : t.breatheIn.en}
                              </motion.span>
                              <motion.span
                                animate={{ opacity: [0, 0, 1, 1, 0] }}
                                transition={{ duration: 8, repeat: Infinity }}
                                className="absolute font-black text-blue-500"
                              >
                                {lang === 'ar' ? t.breatheOut.ar : t.breatheOut.en}
                              </motion.span>
                            </motion.div>
                          </div>
                          
                          <div className="flex gap-16 text-xs text-gray-400 mt-4 font-black tracking-widest uppercase">
                            <span>4s {lang === 'ar' ? 'شهيق' : 'Inhale'}</span>
                            <span>4s {lang === 'ar' ? 'زفير' : 'Exhale'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </motion.div>
          )}

          {/* TAP 2: SAVED SPECIALISTS */}
          {activeTab === 'doctors' && (
            <motion.div
              key="doctors-tab"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {doctors.length === 0 ? (
                <div className="bg-white/85 backdrop-blur-md rounded-3xl p-12 text-center border border-gray-100">
                  <Activity className="mx-auto text-gray-300 mb-4 animate-bounce" size={48} />
                  <p className="text-gray-400 font-bold">{lang === 'ar' ? t.noSaves.ar : t.noSaves.en}</p>
                </div>
              ) : (
                doctors.map((doc) => (
                  <motion.div 
                    layout
                    key={doc.id}
                    className="bg-white/95 backdrop-blur-md rounded-[32px] p-5 shadow-[0_12px_36px_rgb(0,0,0,0.02)] border border-emerald-50/50 flex flex-col gap-5 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-4 text-left">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-emerald-50">
                          <Image 
                            src={doc.imageUrl}
                            alt={doc.name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div>
                          <h3 className="font-extrabold text-[18px] text-[#111827] leading-none mb-1.5">{doc.name}</h3>
                          <p className="text-[14px] text-gray-400 font-bold mb-1">{doc.specialty}</p>
                          <div className="flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-white p-0.5">
                              ★
                            </span>
                            <span className="text-[13px] text-[#1C1C1C] font-black">{doc.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Remove Specialist Fav Button */}
                      <button
                        onClick={() => removeDoctor(doc.id)}
                        className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-60 hover:opacity-100 hover:scale-105 active:scale-95 transition-all text-left"
                        title={lang === 'ar' ? t.unfavorite.ar : t.unfavorite.en}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Dr Specialist Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {doc.tags?.map((tag: string) => (
                        <span 
                          key={tag}
                          className="bg-sky-50 text-sky-600 border border-sky-100 text-[10px] font-black tracking-wide uppercase px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Integrated Therapist Workflows */}
                    <div className="grid grid-cols-2 gap-3 mt-1.5">
                      <button
                        onClick={() => router.push('/calendar')}
                        className="w-full h-12 rounded-[20px] bg-[#22C55E] hover:bg-emerald-600 text-white font-black text-[13px] flex items-center justify-center gap-2 shadow-sm shadow-[#22C55E]/15 transition-colors cursor-pointer"
                      >
                        <Calendar size={15} />
                        <span>{lang === 'ar' ? t.booking.ar : t.booking.en}</span>
                      </button>

                      <button
                        onClick={() => router.push('/chat')}
                        className="w-full h-12 rounded-[20px] bg-[#EBF5F1] hover:bg-[#D4EBE0] text-[#0D7A39] font-black text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <MessageSquare size={15} />
                        <span>{lang === 'ar' ? t.message.ar : t.message.en}</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {/* TAP 3: AI TRANQUILITY BLESSINGS GALAXY */}
          {activeTab === 'affirmation' && (
            <motion.div
              key="affirmations-tab"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-6 shadow-[0_12px_36px_rgb(0,0,0,0.02)] border border-emerald-50/50 flex flex-col items-center text-center">
                
                <h3 className="font-extrabold text-[#111827] text-[19px] mb-3">
                  {lang === 'ar' ? 'توكيدات واحة الطمأنينة السحرية ✨' : 'Divine Tranquility Oracle ✨'}
                </h3>
                
                <p className="text-[13px] text-gray-500 leading-relaxed font-semibold max-w-sm ml-1 pr-1">
                  {lang === 'ar' ? t.oracleDesc.ar : t.oracleDesc.en}
                </p>

                {/* Mood Select Pills */}
                <div className="w-full flex justify-center flex-wrap gap-2 mt-6">
                  {Object.entries(t.states).map(([key, item]) => {
                    const isSelected = selectedMood === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedMood(key);
                          triggerSparkles(4);
                        }}
                        className={`px-4 py-2 rounded-2xl text-[12px] font-black transition-all ${
                          isSelected 
                            ? 'bg-gradient-to-r from-[#22C55E] to-emerald-600 text-white shadow-md scale-103' 
                            : 'bg-emerald-50 text-[#0D7A39] hover:bg-[#E1F2E9]'
                        }`}
                      >
                        {lang === 'ar' ? item.ar : item.en}
                      </button>
                    );
                  })}
                </div>

                {/* Magical pulsing request trigger button */}
                <button
                  onClick={generateBlessing}
                  disabled={isLoadingAffirmation}
                  className="w-full h-14 rounded-full bg-gradient-to-r from-emerald-500 via-[#22C55E] to-[#0D7A39] hover:opacity-95 text-white font-extrabold text-[15px] shadow-lg shadow-emerald-500/15 transition-all flex items-center justify-center gap-3 mt-8 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-left focus:outline-none"
                >
                  <Sparkles size={18} className="animate-spin" />
                  <span>
                    {isLoadingAffirmation 
                      ? (lang === 'ar' ? t.generating.ar : t.generating.en) 
                      : (lang === 'ar' ? t.oracleButton.ar : t.oracleButton.en)}
                  </span>
                </button>
              </div>

              {/* RENDER POETIC AFFIRMATION */}
              {(isLoadingAffirmation || affirmation) && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative p-7 rounded-[32px] bg-gradient-to-br from-amber-500/[0.04] to-[#22C55E]/[0.08] border-2 border-emerald-100 shadow-[0_12px_44px_rgba(34,197,94,0.06)] text-center overflow-hidden"
                >
                  {/* Floating magic sparkles in background */}
                  <div className="absolute top-2 left-4 text-emerald-300 opacity-60 text-xl animate-bounce">❀</div>
                  <div className="absolute bottom-3 right-5 text-[#22C55E] opacity-60 text-2xl animate-spin">✧</div>

                  {isLoadingAffirmation ? (
                    <div className="py-8 flex flex-col items-center gap-4">
                      {/* Pulse visual loader */}
                      <div className="w-14 h-14 rounded-full border-4 border-dashed border-emerald-500 border-t-transparent animate-spin"></div>
                      <p className="text-[#0D7A39] font-black text-[14px]">
                        {lang === 'ar' ? 'الذكاء الاصطناعي يستشعر مشاعرك الآن وبصنف السلام...' : 'Tuning into your frequencies...'}
                      </p>
                    </div>
                  ) : (
                    <div className="py-2 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#EAFDF5] flex items-center justify-center text-[#0D7A39] mb-4">
                        <Sparkles size={22} className="animate-pulse" />
                      </div>

                      {/* Display in Arabic */}
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[19px] sm:text-[22px] font-black text-emerald-950 leading-relaxed font-serif"
                      >
                        {affirmation?.ar}
                      </motion.p>

                      {/* Custom decorative divider line */}
                      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#22C55E]/40 to-transparent my-4"></div>

                      {/* Display in English */}
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-[14px] sm:text-[16px] text-[#4A6458] font-bold leading-relaxed italic"
                      >
                        &ldquo;{affirmation?.en}&rdquo;
                      </motion.p>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}
