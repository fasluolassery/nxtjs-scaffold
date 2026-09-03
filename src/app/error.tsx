"use client";

import { AlertOctagon, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button/Button";
import { logger } from "@/lib/logger/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Route Error Boundary caught failure", error, { digest: error.digest });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--destructive)]/10 text-[var(--destructive)]">
        <AlertOctagon className="h-8 w-8" />
      </div>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-2 max-w-md text-sm text-[var(--muted-foreground)]">
        An unhandled error occurred while processing your request. Please try again.
      </p>
      {error.message && (
        <pre className="mt-4 max-w-lg overflow-x-auto rounded bg-[var(--muted)] p-3 font-mono text-xs text-[var(--muted-foreground)]">
          {error.message}
        </pre>
      )}
      <Button onClick={reset} className="mt-6 gap-2">
        <RefreshCw className="h-4 w-4" /> Reset Route
      </Button>
    </div>
  );
}
