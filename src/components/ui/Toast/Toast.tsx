"use client";

import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { useToastStore } from "@/stores/useToastStore";
import { cn } from "@/lib/utils/cn";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed top-4 right-4 left-4 z-50 flex flex-col space-y-2 sm:right-4 sm:left-auto sm:w-full sm:max-w-sm">
      {toasts.map((t) => {
        const icons = {
          success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />,
          error: <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />,
          info: <Info className="h-5 w-5 shrink-0 text-blue-500" />,
          warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />,
        };

        return (
          <div
            key={t.id}
            className={cn(
              "animate-in slide-in-from-top-5 fade-in pointer-events-auto flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 text-[var(--card-foreground)] shadow-lg transition-all duration-200"
            )}
          >
            {icons[t.type]}
            <div className="flex-1 space-y-1">
              <h4 className="text-sm font-semibold">{t.title}</h4>
              {t.description && (
                <p className="text-xs text-[var(--muted-foreground)]">{t.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
