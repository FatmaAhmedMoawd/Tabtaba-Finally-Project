import { z } from 'zod';

export const registerStep2Schema = z.object({
  dob: z
    .string()
    .min(1, 'Please enter your date of birth')
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, 'Please enter a valid date')
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    }, 'Date of birth must be in the past')
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 5 && age <= 120;
    }, 'Please enter a valid date of birth'),

  gender: z
    .string()
    .min(1, 'Please select your gender'),

  privacyConsent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the Privacy Policy to continue'),
});

export type RegisterStep2FormData = z.infer<typeof registerStep2Schema>;
