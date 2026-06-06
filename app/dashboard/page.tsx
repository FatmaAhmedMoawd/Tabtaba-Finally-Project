import React from 'react';
import type { Metadata } from 'next';
import { DashboardClient } from './dashboard-client';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

export const metadata: Metadata = {
  title: 'Dashboard - Tabtaba',
  description: 'Welcome to Tabtaba, your mental health companion.',
};

export default function DashboardPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col bg-white relative overflow-y-auto overflow-x-hidden font-inter scroll-smooth pb-24">
      <style>{`
        @keyframes fadeInUpFade {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-stagger-1 { animation: fadeInUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; animation-delay: 0.1s; }
        .animate-stagger-2 { animation: fadeInUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; animation-delay: 0.25s; }
        .animate-stagger-3 { animation: fadeInUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; animation-delay: 0.4s; }
        .animate-stagger-4 { animation: fadeInUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; animation-delay: 0.55s; }
        .animate-stagger-5 { animation: fadeInUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; animation-delay: 0.7s; }
      `}</style>

      <DashboardClient />
      
      <BottomNav />
    </main>
  );
}
