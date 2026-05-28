import React, { memo } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import type { SupportSlideData } from '../model/slides.data';

interface SlideContentProps {
  slide: SupportSlideData;
}

export const SlideContent: React.FC<SlideContentProps> = memo(({ slide }) => {
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center"
      aria-live="polite"
    >
      <div className="h-[4.5rem] flex items-end justify-center text-center">
        {slide.title}
      </div>

      <div className="relative w-full aspect-[4/3] max-w-[280px] md:max-w-[340px] flex items-center justify-center my-4 md:my-6 bg-transparent mx-auto">
        <Image 
          src={slide.image} 
          alt={slide.bottomText ? `Slide illustration for: ${slide.bottomText}` : `Onboarding slide illustration ${slide.id + 1}`}
          fill
          sizes="(max-width: 768px) 280px, 340px"
          priority={slide.id === 0}
          className={`object-contain mix-blend-multiply ${slide.imageScale || ''} origin-center`}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="h-[3.5rem] flex items-start justify-center text-center">
        {slide.bottomText && (
          <p className="text-[#415C4D] text-[1.05rem] md:text-[1.15rem]" style={{ fontFamily: 'var(--font-inter)' }}>
            {slide.bottomText}
          </p>
        )}
      </div>
    </motion.div>
  );
});

SlideContent.displayName = 'SlideContent';
