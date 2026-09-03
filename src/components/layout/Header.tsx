"use client";

import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useMounted } from "@/hooks/useMounted";
import { useUiStore } from "@/stores/useUiStore";
import { env } from "@/env";

export function Header() {
  const mounted = useMounted();
  const { toggleSidebar } = useUiStore();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[var(--border)] bg-[var(--card)]/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
          {env.NEXT_PUBLIC_APP_NAME}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        {mounted && (
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5 text-[var(--muted-foreground)]" />
          </Button>
        )}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-semibold text-[var(--primary-foreground)]">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
