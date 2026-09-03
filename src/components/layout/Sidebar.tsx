"use client";

import { Component, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMounted } from "@/hooks/useMounted";
import { useUiStore } from "@/stores/useUiStore";
import { cn } from "@/lib/utils/cn";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "UI Catalog", href: "/components-showcase", icon: Component },
];

export function Sidebar() {
  const pathname = usePathname();
  const mounted = useMounted();
  const { isSidebarOpen } = useUiStore();

  if (!mounted || !isSidebarOpen) return null;

  return (
    <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--card)] p-4 transition-all">
      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href || (pathname ? pathname.startsWith(`${item.href}/`) : false);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
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
    </aside>
  );
}
