'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, User, Globe, MapPin, ShieldCheck } from 'lucide-react';
import { getTherapistRegistrationData, TherapistRegistrationData } from '@/lib/therapist-storage';

export default function TherapistPersonalInformationPage() {
  const [profileData, setProfileData] = useState<TherapistRegistrationData>({});
  const router = useRouter();

  useEffect(() => {
    const data = getTherapistRegistrationData();
    Promise.resolve().then(() => {
      setProfileData(data);
    });
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#F4F9F9] text-[#1D2D50] font-inter pb-24">
      <div className="max-w-lg mx-auto px-6 pt-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-[#0A9D46] font-black"
        >
          <ArrowLeft size={24} /> Back
        </button>

        <h1 className="text-[28px] font-black mb-3">Personal Information</h1>
        <p className="text-[#64748B] text-[14px] mb-8">
          View the profile information you entered during registration.
        </p>

        <div className="bg-white rounded-[32px] border border-[#E2E8F0] shadow-sm p-6 space-y-5">
          <div className="space-y-2">
            <div className="text-[#94A3B8] text-[12px] uppercase tracking-[0.24em] font-bold">Full Name</div>
            <div className="text-[17px] font-bold">{profileData.fullName || 'Not set'}</div>
          </div>

          <div className="space-y-2">
            <div className="text-[#94A3B8] text-[12px] uppercase tracking-[0.24em] font-bold">Email</div>
            <div className="flex items-center gap-2 text-[17px] font-bold text-[#334155]">
              <Mail size={18} />
              {profileData.email || 'Not set'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-[#94A3B8] text-[12px] uppercase tracking-[0.24em] font-bold">Username</div>
              <div className="text-[16px]">{profileData.username || 'Not set'}</div>
            </div>
            <div className="space-y-2">
              <div className="text-[#94A3B8] text-[12px] uppercase tracking-[0.24em] font-bold">Gender</div>
              <div className="text-[16px]">{profileData.gender || 'Not set'}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-[#94A3B8] text-[12px] uppercase tracking-[0.24em] font-bold">Country</div>
              <div className="text-[16px]">{profileData.country || 'Not set'}</div>
            </div>
            <div className="space-y-2">
              <div className="text-[#94A3B8] text-[12px] uppercase tracking-[0.24em] font-bold">Nationality</div>
              <div className="text-[16px]">{profileData.nationality || 'Not set'}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-[#94A3B8] text-[12px] uppercase tracking-[0.24em] font-bold">Title</div>
              <div className="text-[16px]">{profileData.title || 'Not set'}</div>
            </div>
            <div className="space-y-2">
              <div className="text-[#94A3B8] text-[12px] uppercase tracking-[0.24em] font-bold">Date of Birth</div>
              <div className="text-[16px]">{profileData.day && profileData.month && profileData.year ? `${profileData.day} ${profileData.month} ${profileData.year}` : 'Not set'}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[#94A3B8] text-[12px] uppercase tracking-[0.24em] font-bold">Languages</div>
            <div className="flex flex-wrap gap-2">
              {(profileData.languages ?? []).length > 0 ? (
                profileData.languages?.map((lang) => (
                  <span key={lang} className="bg-[#EAF6ED] text-[#1D4F28] px-3 py-1 rounded-full text-sm font-bold">{lang}</span>
                ))
              ) : (
                <span className="text-[16px]">Not set</span>
              )}
            </div>
          </div>
        </div>

        <Link href="/therapist/profile" className="inline-flex items-center justify-center w-full mt-6 rounded-3xl bg-[#0A9D46] px-6 py-3 text-white font-bold hover:bg-[#0c7f3b] transition">
          Return to profile
        </Link>
      </div>
    </div>
  );
}
