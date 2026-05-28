import React, { memo } from 'react';

interface SlideIndicatorsProps {
  total: number;
  current: number;
  onSelect?: (index: number) => void;
}

export const SlideIndicators: React.FC<SlideIndicatorsProps> = memo(({ total, current, onSelect }) => {
  return (
    <div 
      className="flex items-center space-x-2.5 mb-8" 
      role="tablist" 
      aria-label="Slides"
    >
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = current === idx;
        return (
          <button
            key={idx}
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => onSelect?.(idx)}
            className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#34c759] ${
              isActive 
                ? "w-[9px] h-[9px] bg-[#34c759]" 
                : "w-[9px] h-[9px] bg-[#e0e0e0]"
            }`}
          />
        );
      })}
    </div>
  );
});

SlideIndicators.displayName = 'SlideIndicators';
