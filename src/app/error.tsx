"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center p-4 gap-4 bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-destructive">500</h1>
        <h2 className="text-2xl font-semibold text-foreground">Something went wrong!</h2>
        <p className="text-muted-foreground">An unexpected error occurred. Please try again later.</p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
