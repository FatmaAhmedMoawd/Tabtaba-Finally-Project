'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import { SUPPORT_SLIDES } from '@/features/support-onboarding/model/slides.data';
import { SlideContent } from '@/features/support-onboarding/ui/slide-content';
import { SlideIndicators } from '@/features/support-onboarding/ui/slide-indicators';
import { NextButton } from '@/shared/ui/next-button';

export const SupportCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = useCallback(() => {
    if (currentSlide < SUPPORT_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      router.push('/register'); // Navigate to register page
    }
  }, [currentSlide, router]);

  const slide = SUPPORT_SLIDES[currentSlide];

  return (
    <div className="flex-1 w-full max-w-lg mx-auto flex flex-col relative px-6 z-10 pt-8 pb-8 min-h-[calc(100dvh-60px)] md:min-h-[calc(100dvh-80px)]">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <SlideContent key={currentSlide} slide={slide} />
        </AnimatePresence>
      </div>

      {/* Carousel Indicators and Button */}
      <div className="w-full flex flex-col items-center pb-2 pt-4">
        <SlideIndicators 
          total={SUPPORT_SLIDES.length} 
          current={currentSlide} 
          onSelect={setCurrentSlide}
        />
        <NextButton onClick={handleNext} aria-label={currentSlide < SUPPORT_SLIDES.length - 1 ? 'Next Slide' : 'Finish Onboarding'}>
          Next
        </NextButton>
      </div>

    </div>
  );
};
