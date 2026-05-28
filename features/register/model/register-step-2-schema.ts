import { z } from 'zod';

export const registerStep2Schema = z.object({
  dob: z.string().optional(),
  gender: z.string().optional(),
  privacyConsent: z.boolean().optional(),
});

export type RegisterStep2FormData = z.infer<typeof registerStep2Schema>;
