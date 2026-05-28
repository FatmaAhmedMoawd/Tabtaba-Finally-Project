'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { registerSchema, type RegisterFormData } from '../model/register-schema';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  

  // useForm will provide `isValid` when using a validation resolver and mode 'onChange'
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      mobileCode: '+20',
      mobileNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  // Replace previous destructuring with values from the new `form`
  const { register: formRegister, handleSubmit: formHandleSubmit, formState } = form;
  const { errors: formErrors, isSubmitting: formIsSubmitting, isValid } = formState;

  const onSubmit = (data: RegisterFormData) => {
    // Handling form submission Mock behavior
    console.log("Form Data: ", data);
    if (typeof window !== 'undefined') {
      if (data.email) {
        localStorage.setItem('profile_email', data.email);
      }
      if (data.username) {
        localStorage.setItem('profile_fullName', data.username);
      }
      window.dispatchEvent(new Event('storage'));
    }
    // Move to step 2
    router.push('/register/step-2');
  };

  const labelClasses = "block text-[14.5px] font-medium text-[#4A6478] mb-1.5 ml-0.5 tracking-wide";

  return (
    <form onSubmit={formHandleSubmit(onSubmit)} className="w-full flex flex-col gap-6" style={{ fontFamily: 'var(--font-inter)' }}>
      
      {/* Email Address */}
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email Address
        </label>
          <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          leftIcon={<Mail className="w-[1.1rem] h-[1.1rem]" />}
            error={formErrors.email?.message}
            {...formRegister('email')}
        />
      </div>

      {/* Mobile Number */}
      <div>
        <label htmlFor="mobileNumber" className={labelClasses}>
          Mobile Number
        </label>
        <div className="flex gap-2">
          {/* Country Code Selector (Simplified) */}
          <div className="flex items-center gap-1.5 h-[52px] bg-white border border-gray-200 rounded-xl px-3 w-[100px] shrink-0 focus-within:border-[#30BE4F] focus-within:ring-1 focus-within:ring-[#30BE4F] relative">
            <span className="text-[20px] leading-none mb-[2px]">🇪🇬</span>
              <select
              className="appearance-none bg-transparent outline-none w-full text-[15px] font-medium text-gray-800 absolute inset-0 pl-10 pr-2 cursor-pointer z-10"
              {...formRegister('mobileCode')}
              aria-label="Country Code"
            >
              <option value="+20">+20</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
          </div>
          <div className="flex-1">
             <Input
                id="mobileNumber"
                type="tel"
                placeholder="Enter Mobile Number"
               error={formErrors.mobileNumber?.message}
               {...formRegister('mobileNumber')}
              />
          </div>
        </div>
        {formErrors.mobileCode && (
           <p className="text-[13px] text-red-500 font-medium px-1 mt-1.5" role="alert">
             {formErrors.mobileCode.message}
           </p>
        )}
      </div>

      {/* User Name */}
      <div>
        <label htmlFor="username" className={labelClasses}>
          User Name
        </label>
        <Input
          id="username"
          type="text"
          placeholder="Enter Username"
          error={formErrors.username?.message}
          {...formRegister('username')}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className={labelClasses}>
          Password
        </label>
        <PasswordInput
          id="password"
          placeholder="••••••••••"
          error={formErrors.password?.message}
          {...formRegister('password')}
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className={labelClasses}>
          confirm Password
        </label>
        <PasswordInput
          id="confirmPassword"
          placeholder="••••••••••"
          error={formErrors.confirmPassword?.message}
          {...formRegister('confirmPassword')}
        />
      </div>

      <div className="pt-2 flex flex-col gap-6">
          {/* Terms and conditions */}
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="agreeTerms"
              className="w-4 h-4 rounded-sm border-gray-300 text-[#30BE4F] focus:ring-[#30BE4F] cursor-pointer"
              {...formRegister('agreeTerms')}
            />
            <label htmlFor="agreeTerms" className="text-[13px] sm:text-[14px] text-gray-900 font-medium whitespace-nowrap">
              I Agree with <span className="text-[#30BE4F] hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#30BE4F] hover:underline cursor-pointer">Privacy Policy</span>
            </label>
          </div>
          {formErrors.agreeTerms && (
             <p className="text-[13px] text-red-500 font-medium px-1 text-center -mt-4" role="alert">
               {formErrors.agreeTerms.message}
             </p>
          )}

          {/* Continue Button */}
          <button
            type="submit"
            disabled={formIsSubmitting || !isValid}
            className="w-full text-white rounded-[2rem] py-[18px] px-6 flex items-center justify-center text-[1.15rem] font-bold transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#30BE4F]/40 shadow-sm disabled:opacity-70"
            style={{ 
              background: 'linear-gradient(90deg, rgba(48, 190, 79, 0.8) 0%, #FBBC05 35%, rgba(36, 137, 253, 0.8) 70%)',
              fontFamily: 'var(--font-inter)'
            }}
          >
            {formIsSubmitting ? 'Processing...' : 'Continue'}
          </button>
      </div>

    </form>
  );
};
