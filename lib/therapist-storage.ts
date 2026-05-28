'use client';

export interface TherapistAvailabilityEntry {
  active: boolean;
  from: string;
  to: string;
}

export interface TherapistRegistrationData {
  fullName?: string;
  title?: string;
  gender?: string;
  username?: string;
  email?: string;
  mobile?: string;
  day?: string;
  month?: string;
  year?: string;
  nationality?: string;
  country?: string;
  languages?: string[];
  highestDegree?: string;
  graduationYear?: string;
  universityName?: string;
  category?: string;
  specialization?: string;
  experience?: string;
  authority?: string;
  licenseNumber?: string;
  worksAtClinic?: boolean;
  availability?: Record<string, TherapistAvailabilityEntry>;
  cvFileName?: string;
  certificateFileNames?: string[];
}

const STORAGE_KEY = 'therapist_registration_data';

export function getTherapistRegistrationData(): TherapistRegistrationData {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as TherapistRegistrationData;
  } catch {
    return {};
  }
}

export function saveTherapistRegistrationData(data: Partial<TherapistRegistrationData>) {
  if (typeof window === 'undefined') return;
  const existing = getTherapistRegistrationData();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...existing,
    ...data,
  }));
}

export function clearTherapistRegistrationData() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
