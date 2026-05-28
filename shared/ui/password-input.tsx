'use client';

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, type InputProps } from './input';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        className={className}
        ref={ref}
        rightIcon={
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-[#c4c4c4] hover:text-gray-600 focus:outline-none transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <Eye className="w-[1.2rem] h-[1.2rem]" />
            ) : (
              <EyeOff className="w-[1.2rem] h-[1.2rem]" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
