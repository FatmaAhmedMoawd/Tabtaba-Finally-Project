import React, { forwardRef } from 'react';
import { cn } from './input';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, leftIcon, children, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 focus-within:z-10 relative">
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-4 flex items-center justify-center text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <select
            className={cn(
              "flex h-[52px] w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2 text-[15px] transition-colors placeholder:text-[#c4c4c4] focus-visible:outline-none focus:border-[#30BE4F] focus:ring-1 focus:ring-[#30BE4F] disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-[2.75rem]",
              "pr-[2.75rem]", // space for chevron
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            style={{ fontFamily: 'var(--font-inter)' }}
            ref={ref}
            {...props}
          >
            {children}
          </select>
          <div className="absolute right-4 flex items-center justify-center pointer-events-none">
            <ChevronDown className="w-5 h-5 text-[#c4c4c4]" />
          </div>
        </div>
        {error && (
          <p className="text-[13px] text-red-500 font-medium px-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
