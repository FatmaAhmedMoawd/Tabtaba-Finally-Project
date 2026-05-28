'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-white p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-8">{error.message || "An unexpected error occurred."}</p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#0A9D46] text-white rounded-full font-semibold"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
