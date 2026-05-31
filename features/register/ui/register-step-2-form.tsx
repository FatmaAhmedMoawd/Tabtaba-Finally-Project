'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, AlertCircle } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { registerStep2Schema, type RegisterStep2FormData } from '../model/register-step-2-schema';
import { useRouter } from 'next/navigation';

export const RegisterStep2Form: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterStep2FormData>({
    resolver: zodResolver(registerStep2Schema),
    mode: 'onChange',
    defaultValues: {
      dob: '',
      gender: '',
      privacyConsent: false,
    },
  });

  const onSubmit = (data: RegisterStep2FormData) => {
    console.log("Form Data Step 2: ", data);
    router.push('/dashboard');
  };

  const labelClasses = "block text-[14.5px] font-medium text-[#4A6478] mb-1.5 ml-0.5 tracking-wide";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 h-full flex-1" style={{ fontFamily: 'var(--font-inter)' }}>
      <div className="flex flex-col gap-6 flex-1">

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className={labelClasses}>
              Date of Birth
            </label>
            <Input
              id="dob"
              type="date"
              placeholder="mm/dd/yyyy"
              rightIcon={<Calendar className="w-[1.4rem] h-[1.4rem] text-[#c4c4c4] pointer-events-none" strokeWidth={1.5} />}
              className="[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-12 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-datetime-edit-fields-wrapper]:p-0"
              error={errors.dob?.message}
              {...register('dob')}
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className={labelClasses}>
              Gender
            </label>
            <Select
              id="gender"
              {...register('gender')}
              error={errors.gender?.message}
            >
              <option value="" disabled className="text-gray-400">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>

          {/* Privacy Consent */}
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[15px] font-bold text-[#0D5230] shrink-0" style={{ fontFamily: 'var(--font-quicksand)' }}>
                 I agree to the Privacy Policy
              </span>
              <input
                type="checkbox"
                id="privacyConsent"
                className="w-[18px] h-[18px] rounded-sm border-gray-400 text-[#30BE4F] focus:ring-[#30BE4F] cursor-pointer shrink-0 mt-0.5"
                {...register('privacyConsent')}
              />
            </div>
            {errors.privacyConsent?.message && (
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-[13px] text-red-500 font-medium text-center" role="alert">
                  {errors.privacyConsent.message}
                </p>
              </div>
            )}
          </div>
      </div>

      <div className="pt-8 flex flex-col gap-6 mt-auto pb-4 md:pb-8">
          {/* Terms and conditions */}
          <div className="flex items-center justify-center -mb-2">
            <span className="text-[13px] sm:text-[14px] text-gray-900 font-medium whitespace-nowrap">
              I Agree with <span className="text-[#30BE4F] hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#30BE4F] hover:underline cursor-pointer">Privacy Policy</span>
            </span>
          </div>

          {/* Continue Button — disabled until form is fully valid */}
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`w-full text-white rounded-[2rem] h-[58px] flex items-center justify-center text-[1.15rem] font-bold transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#30BE4F]/40 shadow-sm
              ${isValid
                ? 'bg-[#30BE4F] hover:bg-[#2baa46] cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed opacity-70'
              }`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {isSubmitting ? 'Processing...' : 'Continue'}
          </button>

          {/* Global hint when form is not valid yet */}
          {!isValid && (
            <p className="text-center text-[13px] text-gray-400 font-medium -mt-3">
              Please fill in all required fields to continue
            </p>
          )}
      </div>

    </form>
  );
};
