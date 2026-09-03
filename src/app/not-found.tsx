import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">404 - Page Not Found</h1>
      <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
        The requested page does not exist or has been moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
