import type {Metadata} from 'next';
import { Playfair_Display, Quicksand, Inter } from 'next/font/google';
import './globals.css'; // Global styles
import { LanguageProvider } from '@/lib/language-context';
import { FloatingAssistantButton } from '@/shared/ui/floating-assistant-button';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Tabtaba - A safe space for you',
  description: 'Mental health platform providing a safe, calm, and professional environment.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${quicksand.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-gray-900 bg-white" suppressHydrationWarning>
        <LanguageProvider>
          {children}
          <FloatingAssistantButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
