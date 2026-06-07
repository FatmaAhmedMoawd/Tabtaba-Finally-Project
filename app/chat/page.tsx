import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ChatInterface } from '@/features/chat/ui/chat-interface';

export const metadata: Metadata = {
  title: 'AI Assistant - Tabtaba',
  description: 'Chat with your AI Assistant securely.',
};

export default function ChatPage() {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-[100dvh]">
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">Loading...</div>}>
        <ChatInterface />
      </Suspense>
    </main>
  );
}
