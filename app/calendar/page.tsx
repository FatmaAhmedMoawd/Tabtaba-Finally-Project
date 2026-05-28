import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { AppointmentBooking } from '@/features/calendar/ui/appointment-booking';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

export const metadata: Metadata = {
  title: 'Appointment - Tabtaba',
  description: 'Book an appointment',
};

export default function CalendarPage() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#EAF2F8]">
          <div className="text-center font-inter">
            <div className="w-12 h-12 border-4 border-[#0D7A39] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#0D7A39] font-bold">Loading selection...</p>
          </div>
        </div>
      }>
        <AppointmentBooking />
      </Suspense>
      <BottomNav />
    </>
  );
}
