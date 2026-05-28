import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">Page Not Found</h2>
      <p className="text-[#5C7182] mb-8">Could not find requested resource</p>
      <Link href="/dashboard" className="px-6 py-3 bg-[#0A9D46] text-white rounded-full font-semibold hover:bg-[#088C3E] transition-colors">
        Return Home
      </Link>
    </div>
  );
}
