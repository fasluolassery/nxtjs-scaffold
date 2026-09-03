import { FolderOpen } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button/Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export function EmptyState({
  title = "No data found",
  description = "There are no records to display at this time.",
  actionLabel,
  onAction,
  icon = <FolderOpen className="h-10 w-10 text-[var(--muted-foreground)]" />,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--muted)]">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-[var(--muted-foreground)]">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}
