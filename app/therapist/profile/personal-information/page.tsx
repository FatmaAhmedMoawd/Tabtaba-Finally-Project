'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  User,
  Globe,
  MapPin,
  Calendar,
  Languages,
  BadgeCheck,
  Fingerprint,
  UserCircle2,
  Tag,
} from 'lucide-react';
import { getTherapistRegistrationData, TherapistRegistrationData } from '@/lib/therapist-storage';

function InfoRow({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F0FBF4] transition-colors duration-200 group">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
          accent ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#EEF2FF] text-[#4F46E5]'
        }`}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-400 mb-0.5">{label}</p>
        <div className="text-[16px] font-bold text-gray-800 truncate">{value || <span className="text-gray-300 font-medium italic">Not set</span>}</div>
      </div>
    </div>
  );
}

export default function TherapistPersonalInformationPage() {
  const [profileData, setProfileData] = useState<TherapistRegistrationData>({});
  const [initials, setInitials] = useState('T');
  const router = useRouter();

  useEffect(() => {
    const data = getTherapistRegistrationData();
    Promise.resolve().then(() => {
      setProfileData(data);
      if (data.fullName) {
        const parts = data.fullName.trim().split(/\s+/);
        setInitials(parts.map((p) => p[0]).join('').toUpperCase().slice(0, 2));
      }
    });
  }, []);

  const dob =
    profileData.day && profileData.month && profileData.year
      ? `${profileData.day} ${profileData.month} ${profileData.year}`
      : '';

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-[#EFF6FF] font-inter">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .fade-up { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }

        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.6; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes initialsPop {
          0%   { transform: scale(0.3) rotate(-15deg); opacity: 0; }
          60%  { transform: scale(1.1) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .avatar-float  { animation: avatarFloat 3.5s ease-in-out infinite; }
        .pulse-ring    { animation: pulseRing 2.2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .initials-pop  { animation: initialsPop 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
      `}</style>

      {/* ─── Top Nav ─── */}
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#065F46] font-bold text-sm bg-[#D1FAE5] hover:bg-[#A7F3D0] px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <UserCircle2 size={22} className="text-[#065F46]" strokeWidth={1.8} />
            <h1 className="text-xl font-black text-gray-900">Personal Information</h1>
          </div>
        </div>
      </div>

      {/* ─── Main Layout ─── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left: Profile Hero Card ── */}
          <div className="lg:col-span-4 fade-up delay-1">
            <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden">
              {/* gradient banner */}
              <div className="h-32 bg-gradient-to-br from-[#059669] via-[#10B981] to-[#34D399] relative overflow-visible">
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                  }}
                />
              </div>

              {/* avatar */}
              <div className="px-8 pb-8">
                <div className="flex justify-center -mt-16 mb-5">
                  <div className="relative avatar-float">
                    {/* pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-[#10B981] pulse-ring" />
                    <div className="absolute inset-0 rounded-full bg-[#34D399] pulse-ring" style={{ animationDelay: '0.6s' }} />
                    {/* main circle */}
                    <div className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#047857] via-[#059669] to-[#6EE7B7] flex items-center justify-center border-[5px] border-white shadow-2xl shadow-emerald-300/40">
                      <span className="text-[40px] font-black text-white initials-pop drop-shadow-lg">{initials}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-xl font-black text-gray-900">{profileData.fullName || 'Therapist'}</h2>
                  <p className="text-sm text-gray-400 mt-1 font-medium">{profileData.title || 'Mental Health Professional'}</p>
                  {profileData.email && (
                    <p className="text-xs text-[#059669] font-bold mt-2 truncate">{profileData.email}</p>
                  )}
                </div>

                {/* badge */}
                <div className="flex items-center gap-2 bg-[#ECFDF5] rounded-2xl px-4 py-3 border border-[#A7F3D0]">
                  <BadgeCheck size={18} className="text-[#059669] flex-shrink-0" strokeWidth={2} />
                  <span className="text-[13px] font-bold text-[#065F46]">Verified Therapist Account</span>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-4 grid grid-cols-2 gap-3 fade-up delay-2">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <Globe size={20} className="mx-auto text-[#6366F1] mb-1" strokeWidth={1.8} />
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide">Country</p>
                <p className="text-sm font-black text-gray-800 mt-0.5 truncate">{profileData.country || '—'}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <Languages size={20} className="mx-auto text-[#F59E0B] mb-1" strokeWidth={1.8} />
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide">Languages</p>
                <p className="text-sm font-black text-gray-800 mt-0.5">{(profileData.languages ?? []).length || '—'}</p>
              </div>
            </div>
          </div>

          {/* ── Right: Info Cards ── */}
          <div className="lg:col-span-8 space-y-5 fade-up delay-2">

            {/* Identity Card */}
            <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#059669] mb-4 flex items-center gap-2">
                <Fingerprint size={14} strokeWidth={2.5} />
                Identity
              </p>
              <div className="space-y-1 divide-y divide-gray-50">
                <InfoRow icon={User} label="Full Name" value={profileData.fullName || ''} accent />
                <InfoRow icon={Tag} label="Username" value={profileData.username || ''} />
                <InfoRow icon={UserCircle2} label="Gender" value={profileData.gender || ''} />
                <InfoRow icon={Calendar} label="Date of Birth" value={dob} />
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 p-6 fade-up delay-3">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#6366F1] mb-4 flex items-center gap-2">
                <Mail size={14} strokeWidth={2.5} />
                Contact & Location
              </p>
              <div className="space-y-1 divide-y divide-gray-50">
                <InfoRow icon={Mail} label="Email Address" value={profileData.email || ''} />
                <InfoRow icon={Globe} label="Country" value={profileData.country || ''} />
                <InfoRow icon={MapPin} label="Nationality" value={profileData.nationality || ''} />
              </div>
            </div>

            {/* Languages Card */}
            <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 p-6 fade-up delay-4">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#F59E0B] mb-4 flex items-center gap-2">
                <Languages size={14} strokeWidth={2.5} />
                Languages Spoken
              </p>
              <div className="flex flex-wrap gap-2 p-2">
                {(profileData.languages ?? []).length > 0 ? (
                  profileData.languages?.map((lang) => (
                    <span
                      key={lang}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] text-[#065F46] border border-[#A7F3D0] px-4 py-2 rounded-full text-sm font-black shadow-sm"
                    >
                      🌐 {lang}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-300 italic text-sm font-medium">No languages added yet</p>
                )}
              </div>
            </div>

            {/* Return button */}
            <button
              onClick={() => router.back()}
              className="w-full mt-2 bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-[15px] cursor-pointer"
            >
              ← Return to Profile
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
