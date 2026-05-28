import React from 'react';
import type { Metadata } from 'next';
import { SessionsList } from '@/features/sessions/ui/sessions-list';
import { BottomNav } from '@/widgets/dashboard/ui/bottom-nav';

export const metadata: Metadata = {
  title: 'Sessions - Tabtaba',
  description: 'Book a session with our specialists',
};

export default function SessionsPage() {
  return (
    <>
      <SessionsList />
      <BottomNav />
    </>
  );
}
