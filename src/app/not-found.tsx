"use client";

import { Link } from "@/components/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center p-4 gap-4 bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
