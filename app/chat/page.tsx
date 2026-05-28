import React from 'react';
import type { Metadata } from 'next';
import { ChatInterface } from '@/features/chat/ui/chat-interface';

export const metadata: Metadata = {
  title: 'AI Assistant - Tabtaba',
  description: 'Chat with your AI Assistant securely.',
};

export default function ChatPage() {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-[100dvh]">
      <ChatInterface />
    </main>
  );
}
