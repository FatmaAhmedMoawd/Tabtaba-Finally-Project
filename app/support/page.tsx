'use client';

import { TopHeader } from '@/shared/ui/top-header';
import { SupportCarousel } from '@/widgets/support-onboarding/ui/support-carousel';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SupportOnboardingPage() {
  const router = useRouter();

  return (
    <main className="min-h-[100dvh] flex flex-col items-center bg-white relative overflow-y-auto">
      <TopHeader />
      
      {/* Floating Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute left-6 top-8 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg hover:bg-white/40 transition-all active:scale-95"
        aria-label="Go back"
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </button>

      <SupportCarousel />
    </main>
  );
}

