import { z } from 'zod';

const allowedEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email format' })
      .refine((val) => {
        try {
          const domain = val.split('@')[1]?.toLowerCase();
          return domain ? allowedEmailDomains.includes(domain) : false;
        } catch {
          return false;
        }
      }, { message: `Email must end with one of: ${allowedEmailDomains.join(', ')}` }),

    mobileCode: z.string().min(1),

    // Egyptian mobile numbers: start with 010,011,012,015 and total 11 digits
    mobileNumber: z
      .string()
      .min(1, { message: 'Mobile number is required' })
      .regex(/^(010|011|012|015)\d{8}$/, { message: 'Invalid Egyptian mobile number format' }),

    // Username: realistic name; allow Arabic/Latin letters, numbers, spaces, dot and dash; min length 3
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .refine((val) => /^[A-Za-z\u0600-\u06FF][A-Za-z0-9\u0600-\u06FF\s.-]{2,}$/.test(val), { message: 'Username must look like a real name (letters, numbers, spaces allowed)' })
      .refine((val) => !/(^|\W)(asd|qwe|qwer|123123|0000|1111)(\W|$)/i.test(val), { message: 'Username appears to be invalid or gibberish' }),

    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),

    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),

    agreeTerms: z.boolean().refine((v) => v === true, { message: 'You must agree to the terms' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
