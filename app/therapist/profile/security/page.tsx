'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

function PasswordInput({
  id,
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-black text-gray-700 flex items-center gap-1.5">
        {label}
        {hint && <span className="text-[11px] font-medium text-gray-400 normal-case">({hint})</span>}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#059669] transition-colors">
          <KeyRound size={18} strokeWidth={1.8} />
        </div>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-12 py-3.5 rounded-2xl border-2 border-gray-100 bg-[#F8FAFC] text-[15px] text-gray-800 font-medium outline-none focus:border-[#10B981] focus:bg-white transition-all duration-200 placeholder:text-gray-300"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#059669] transition-colors cursor-pointer"
          tabIndex={-1}
        >
          {visible ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
        </button>
      </div>
    </div>
  );
}

function StrengthBar({ password }: { password: string }) {
  const getStrength = () => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const strength = getStrength();
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

  if (!password) return null;
  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all duration-500"
            style={{ backgroundColor: i <= strength ? colors[strength] : '#E5E7EB' }}
          />
        ))}
      </div>
      <p className="text-[12px] font-bold" style={{ color: colors[strength] }}>
        {labels[strength]} password
      </p>
    </div>
  );
}

function Rule({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-[13px] font-semibold transition-colors ${met ? 'text-[#059669]' : 'text-gray-300'}`}>
      {met ? <CheckCircle2 size={15} strokeWidth={2.5} /> : <XCircle size={15} strokeWidth={2} />}
      {text}
    </div>
  );
}

export default function TherapistSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const rules = {
    length: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    match: newPassword === confirmPassword && newPassword.length > 0,
  };
  const allRulesMet = Object.values(rules).every(Boolean);

  const handleSave = () => {
    setError('');
    setSaved(false);
    if (!currentPassword) { setError('Please enter your current password.'); return; }
    if (!rules.length) { setError('New password must be at least 8 characters.'); return; }
    if (!rules.match) { setError('New password and confirmation do not match.'); return; }
    setSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#F0FDF4] via-[#F8FAFC] to-[#EFF6FF] font-inter">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.85); }
          70%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        .fade-up { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .pop-in  { animation: popIn  0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.26s; }
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
            <Lock size={20} className="text-[#065F46]" strokeWidth={1.8} />
            <h1 className="text-xl font-black text-gray-900">Security & Password</h1>
          </div>
        </div>
      </div>

      {/* ─── Main Layout ─── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Left: Info Panel ── */}
          <div className="lg:col-span-4 space-y-4 fade-up delay-1">
            {/* Shield Card */}
            <div className="bg-gradient-to-br from-[#065F46] to-[#059669] rounded-[32px] p-8 text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5" />
              <ShieldCheck size={44} strokeWidth={1.5} className="mb-5 relative z-10" />
              <h2 className="text-xl font-black mb-2 relative z-10">Keep it Secure</h2>
              <p className="text-emerald-100 text-sm leading-relaxed relative z-10">
                Use a strong, unique password to protect your therapist account and your clients' data.
              </p>
            </div>

            {/* Tips Card */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 fade-up delay-2">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#F59E0B] mb-4 flex items-center gap-2">
                <AlertTriangle size={13} strokeWidth={2.5} />
                Password Tips
              </p>
              <ul className="space-y-3 text-[13px] text-gray-500 font-medium">
                <li className="flex items-start gap-2"><span className="text-[#10B981] font-black mt-0.5">✓</span> At least 8 characters</li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] font-black mt-0.5">✓</span> Mix uppercase & lowercase letters</li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] font-black mt-0.5">✓</span> Include numbers & symbols</li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] font-black mt-0.5">✓</span> Never share your password</li>
                <li className="flex items-start gap-2"><span className="text-[#10B981] font-black mt-0.5">✓</span> Change it periodically</li>
              </ul>
            </div>
          </div>

          {/* ── Right: Password Form ── */}
          <div className="lg:col-span-8 fade-up delay-2">
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8">
              <h3 className="text-lg font-black text-gray-900 mb-1">Change Password</h3>
              <p className="text-sm text-gray-400 mb-8">Update your credentials to keep your account safe.</p>

              <div className="space-y-6">
                <PasswordInput
                  id="current-password"
                  label="Current Password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  placeholder="Enter your current password"
                />

                <div className="h-px bg-gray-100" />

                <div>
                  <PasswordInput
                    id="new-password"
                    label="New Password"
                    hint="min. 8 characters"
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="Enter a strong new password"
                  />
                  <StrengthBar password={newPassword} />
                </div>

                <PasswordInput
                  id="confirm-password"
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Re-enter new password"
                />

                {/* Rules checklist */}
                {newPassword.length > 0 && (
                  <div className="bg-[#F8FAFC] rounded-2xl p-4 space-y-2 fade-up">
                    <p className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">Requirements</p>
                    <Rule met={rules.length} text="At least 8 characters" />
                    <Rule met={rules.upper}  text="Contains uppercase letter" />
                    <Rule met={rules.number} text="Contains a number" />
                    <Rule met={rules.match}  text="Passwords match" />
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 pop-in">
                    <XCircle size={20} className="text-red-500 flex-shrink-0" strokeWidth={2} />
                    <p className="text-red-600 font-semibold text-sm">{error}</p>
                  </div>
                )}

                {/* Success */}
                {saved && (
                  <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 pop-in">
                    <CheckCircle2 size={20} className="text-[#059669] flex-shrink-0" strokeWidth={2} />
                    <p className="text-[#065F46] font-bold text-sm">Password updated successfully!</p>
                  </div>
                )}

                {/* Save Button */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!allRulesMet || !currentPassword}
                  className={`w-full py-4 rounded-2xl font-black text-[15px] transition-all duration-300 cursor-pointer ${
                    allRulesMet && currentPassword
                      ? 'bg-gradient-to-r from-[#059669] to-[#10B981] text-white shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {allRulesMet && currentPassword ? '🔐 Save New Password' : 'Fill in all fields to continue'}
                </button>
              </div>
            </div>

            {/* Return */}
            <button
              onClick={() => router.back()}
              className="w-full mt-4 py-3.5 rounded-2xl border-2 border-gray-100 font-bold text-gray-500 hover:border-[#10B981] hover:text-[#059669] transition-all duration-200 text-sm cursor-pointer"
            >
              ← Return to Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
