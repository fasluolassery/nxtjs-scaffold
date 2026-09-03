"use client";

import { Component, LayoutDashboard, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useMounted } from "@/hooks/useMounted";
import { useUiStore } from "@/stores/useUiStore";
import { cn } from "@/lib/utils/cn";
import { env } from "@/env";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "UI Catalog", href: "/components-showcase", icon: Component },
];

export function Sidebar() {
  const pathname = usePathname();
  const mounted = useMounted();
  const { isSidebarOpen, setSidebarOpen } = useUiStore();

  // Automatically close mobile drawer when navigating
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [pathname, setSidebarOpen]);

  if (!mounted) return null;

  const navContent = (
    <nav className="space-y-1">
      {navigationItems.map((item) => {
        const isActive =
          pathname === item.href || (pathname ? pathname.startsWith(`${item.href}/`) : false);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => {
              if (typeof window !== "undefined" && window.innerWidth < 768) {
                setSidebarOpen(false);
              }
            }}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 focus-visible:ring-1 focus-visible:ring-[var(--ring)] focus-visible:outline-none",
              isActive
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-2xs"
                : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {isSidebarOpen && (
        <aside className="hidden w-64 shrink-0 border-r border-[var(--border)] bg-[var(--card)] p-4 transition-all md:block">
          {navContent}
        </aside>
      )}

      {/* Mobile Drawer (Sheet) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className="animate-in fade-in-0 fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <aside className="animate-in slide-in-from-left relative flex h-full w-72 max-w-[85vw] flex-col border-r border-[var(--border)] bg-[var(--card)] p-5 shadow-2xl transition-transform duration-200">
            <div className="mb-6 flex items-center justify-between border-b border-[var(--border)] pb-4">
              <span className="text-base font-bold tracking-tight text-[var(--foreground)]">
                {env.NEXT_PUBLIC_APP_NAME}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
