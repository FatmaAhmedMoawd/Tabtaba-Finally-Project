'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock } from 'lucide-react';

export default function TherapistSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSave = () => {
    setError('');
    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    setSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

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

        <h1 className="text-[28px] font-black mb-3">Security & Password</h1>
        <p className="text-[#64748B] text-[14px] mb-8">
          You can update your password here. This is just a local preview in the app.
        </p>

        <div className="bg-white rounded-[32px] border border-[#E2E8F0] shadow-sm p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-[#0D4B8D] font-bold">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFB] px-4 py-3 outline-none text-[15px]"
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#0D4B8D] font-bold">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFB] px-4 py-3 outline-none text-[15px]"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[#0D4B8D] font-bold">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFB] px-4 py-3 outline-none text-[15px]"
              placeholder="Confirm new password"
            />
          </div>

          {error && <p className="text-red-500 font-medium">{error}</p>}
          {saved && <p className="text-[#0A9D46] font-semibold">Password updated locally.</p>}

          <button
            type="button"
            onClick={handleSave}
            className="w-full rounded-3xl bg-[#0A9D46] px-6 py-3 text-white font-bold hover:bg-[#0c7f3b] transition"
          >
            Save Password
          </button>
        </div>

        <Link href="/therapist/profile" className="inline-flex items-center justify-center w-full mt-6 rounded-3xl bg-[#94A3B8] px-6 py-3 text-white font-bold hover:bg-[#748095] transition">
          Return to profile
        </Link>
      </div>
    </div>
  );
}
