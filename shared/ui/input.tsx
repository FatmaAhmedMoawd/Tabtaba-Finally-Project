import React, { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 focus-within:z-10 relative">
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-4 flex items-center justify-center text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            className={cn(
              "flex h-[52px] w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-[15px] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#c4c4c4] focus-visible:outline-none focus-[&:not(:read-only)]:border-[#30BE4F] focus-[&:not(:read-only)]:ring-1 focus-[&:not(:read-only)]:ring-[#30BE4F] disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-[2.75rem]",
              rightIcon && "pr-[2.75rem]",
              error && "border-red-500 focus-[&:not(:read-only)]:border-red-500 focus-[&:not(:read-only)]:ring-red-500",
              className
            )}
            style={{ fontFamily: 'var(--font-inter)' }}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
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

Input.displayName = 'Input';
