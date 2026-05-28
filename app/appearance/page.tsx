'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Palette,
  CheckCircle2,
  Circle,
  Sun,
  Moon
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

type TextSize = 'A' | 'AA' | 'AAA';
type Language = 'en' | 'ar';

export default function AppearancePage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const [textSize, setTextSize] = useState<TextSize>('AA');
  const [visualTheme, setVisualTheme] = useState<'light' | 'dark'>('light');

  // Load initial settings on mount to avoid hydration mismatch
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTextSize = localStorage.getItem('textSize') as TextSize || 'AA';
      setTimeout(() => {
        setTextSize(savedTextSize);
      }, 0);
    }
  }, []);

  const handleTextSizeChange = (selectedSize: TextSize) => {
    setTextSize(selectedSize);
    if (typeof window !== 'undefined') {
      localStorage.setItem('textSize', selectedSize);
    }
  };

  const handleLanguageChange = (selectedLang: Language) => {
    setLanguage(selectedLang);
  };

  const textSizes = ['A', 'AA', 'AAA'];

  const languages = [
    { id: 'en', code: 'EN', label: 'English (US)' },
    { id: 'ar', code: 'AR', label: 'العربية' },
  ];

  // Bilingual translation support for the Appearance page
  const t = {
    title: { en: 'Appearance & Language', ar: 'المظهر واللغة' },
    themeTitle: { en: 'Select Theme', ar: 'اختر السمة' },
    themeSub: { en: 'Visual theme preferences (Preview)', ar: 'تفضيلات السمة البصرية (معاينة فقط)' },
    lightMode: { en: 'Light Mode', ar: 'الوضع المضيء' },
    darkMode: { en: 'Dark Mode', ar: 'الوضع الداكن' },
    textSizeTitle: { en: 'Text Size', ar: 'حجم الخط' },
    languageTitle: { en: 'Language', ar: 'لغة التطبيق' },
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F2F8FE] via-[#F8FBFF] to-[#FAF8F3] font-inter relative overflow-x-hidden pb-12">
      <style>{`
        @keyframes slideUpSection {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-section {
          animation: slideUpSection 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      {/* Header */}
      <div className="pt-12 px-6 flex items-center gap-3 relative z-10 animate-section" style={{ animationDelay: '0.1s' }}>
        <button 
          onClick={() => router.back()}
          className="text-[#064E3B] hover:scale-110 transition-transform p-1 -ml-1"
        >
          <ArrowLeft size={28} strokeWidth={2.5} />
        </button>
        <h1 className="text-[24px] font-bold text-[#064E3B] flex items-center gap-2">
          {language === 'ar' ? t.title.ar : t.title.en}
          <Palette size={24} strokeWidth={2.5} className="text-[#4ADE80] ml-1" />
        </h1>
      </div>

      <div className="px-6 mt-8 flex flex-col gap-8 relative z-10">

        {/* Theme Mode Selector Section (Visual Only, Non-Functional per request: "رجعهم بس ما تشغلهمش") */}
        <div className="animate-section" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-[18px] font-extrabold text-[#1F2937] mb-1">
            {language === 'ar' ? t.themeTitle.ar : t.themeTitle.en}
          </h2>
          <p className="text-[12px] text-gray-400 font-medium mb-4">
            {language === 'ar' ? t.themeSub.ar : t.themeSub.en}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Light Mode Card */}
            <button
              onClick={() => setVisualTheme('light')}
              className={`flex flex-col p-4 rounded-[24px] bg-white border-2 text-left transition-all duration-300 relative shadow-[0_4px_20px_rgb(0,0,0,0.02)] ${
                visualTheme === 'light' 
                  ? 'border-[#22C55E] scale-[1.01]' 
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-500">
                  <Sun size={22} />
                </div>
                {visualTheme === 'light' ? (
                  <CheckCircle2 className="text-[#22C55E]" size={22} strokeWidth={2.5} />
                ) : (
                  <Circle className="text-gray-300" size={22} strokeWidth={2} />
                )}
              </div>
              <span className="text-[15px] font-extrabold text-[#1F2937]">
                {language === 'ar' ? t.lightMode.ar : t.lightMode.en}
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5">Classic clean look</span>
            </button>

            {/* Dark Mode Card */}
            <button
              onClick={() => setVisualTheme('dark')}
              className={`flex flex-col p-4 rounded-[24px] bg-white border-2 text-left transition-all duration-300 relative shadow-[0_4px_20px_rgb(0,0,0,0.02)] ${
                visualTheme === 'dark' 
                  ? 'border-[#22C55E] scale-[1.01]' 
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <Moon size={22} />
                </div>
                {visualTheme === 'dark' ? (
                  <CheckCircle2 className="text-[#22C55E]" size={22} strokeWidth={2.5} />
                ) : (
                  <Circle className="text-gray-300" size={22} strokeWidth={2} />
                )}
              </div>
              <span className="text-[15px] font-extrabold text-[#1F2937]">
                {language === 'ar' ? t.darkMode.ar : t.darkMode.en}
              </span>
              <span className="text-[11px] text-gray-400 mt-0.5">Eye comfort mode</span>
            </button>
          </div>
        </div>

        {/* Text Size Section */}
        <div className="animate-section" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-[18px] font-extrabold text-[#1F2937] mb-4">
            {language === 'ar' ? t.textSizeTitle.ar : t.textSizeTitle.en}
          </h2>
          
          <div className="bg-white p-1.5 rounded-full flex items-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative">
            {textSizes.map((size) => {
              const isSelected = textSize === size;
              return (
                <button
                  key={size}
                  onClick={() => handleTextSizeChange(size as TextSize)}
                  className={`flex-1 py-3 text-center rounded-full transition-all duration-300 font-bold z-10 ${
                    isSelected 
                      ? 'bg-[#22C55E] text-white shadow-md scale-[1.02]' 
                      : 'bg-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Section */}
        <div className="animate-section" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-[18px] font-extrabold text-[#1F2937] mb-4">
            {language === 'ar' ? t.languageTitle.ar : t.languageTitle.en}
          </h2>
          
          <div className="flex flex-col gap-4">
            {languages.map((langItem) => {
              const isSelected = language === langItem.id;
              return (
                <button
                  key={langItem.id}
                  onClick={() => handleLanguageChange(langItem.id as Language)}
                  className={`flex items-center justify-between p-4 rounded-[24px] transition-all duration-300 ${
                    isSelected 
                      ? 'bg-white border-2 border-[#22C55E] shadow-sm scale-[1.01]' 
                      : 'bg-white border-2 border-transparent shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] transition-colors duration-300 ${
                      isSelected ? 'bg-[#DCFCE7] text-[#22C55E]' : 'bg-[#F3F4F6] text-gray-400'
                    }`}>
                      {langItem.code}
                    </div>
                    <span className={`text-[16px] font-bold transition-colors duration-300 ${
                      isSelected ? 'text-[#1F2937]' : 'text-gray-500'
                    }`}>
                      {langItem.label}
                    </span>
                  </div>
                  
                  {isSelected ? (
                    <CheckCircle2 className="text-[#22C55E]" size={24} strokeWidth={2.5} />
                  ) : (
                    <Circle className="text-gray-300" size={24} strokeWidth={2} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
