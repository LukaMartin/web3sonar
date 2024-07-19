"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="text-center">
      <h1 className="mb-5 text-3xl">Something went wrong!</h1>
      <button
        className="hover:bg-white/[6%] active:scale-95 bg-white/[3%] py-2 px-4 rounded-md border-[1px] border-white/20"
        onClick={
          // Attempt to recover by trying to re-render the segment
          reset
        }
      >
        Try again
      </button>
    </main>
  );
}
