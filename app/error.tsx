'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-white p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-8">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-[#0D7A39] text-white rounded-full font-semibold hover:bg-[#0A602D]"
      >
        Try again
      </button>
    </div>
  );
}
