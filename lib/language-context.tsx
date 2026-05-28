'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      setTimeout(() => {
        if (savedLanguage === 'ar' || savedLanguage === 'en') {
          setLanguageState(savedLanguage);
        } else {
          // Default to English unless browser is Arabic
          const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
          setLanguageState(browserLang);
        }
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      // Dispatch storage event to notify other tabs/components
      window.dispatchEvent(new Event('storage'));
    }
  };

  const dir = 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return a default mock to prevent crashes if used outside provider
    return {
      language: 'en' as Language,
      setLanguage: (lang: Language) => {},
      dir: 'ltr' as 'ltr' | 'rtl'
    };
  }
  return context;
};
