"use client";

import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button/Button";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { EmptyState } from "@/components/feedback/EmptyState";
import { cn } from "@/lib/utils/cn";

export interface Column<T> {
  key: string;
  header: string;
  accessor?: (item: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (key: string) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  onSort,
  page = 1,
  totalPages = 1,
  onPageChange,
  emptyTitle,
  emptyDescription,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={`skeleton-${i}`} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="w-full space-y-4">
      <div className="overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--card)] shadow-xs">
        <table className="w-full text-left text-sm text-[var(--foreground)]">
          <thead className="border-b border-[var(--border)] bg-[var(--muted)] text-xs tracking-wider text-[var(--muted-foreground)] uppercase">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={cn("px-4 py-3 font-semibold", col.className)}>
                  {col.sortable && onSort ? (
                    <button
                      type="button"
                      onClick={() => onSort(col.key)}
                      className="inline-flex items-center gap-1 rounded px-1 hover:text-[var(--foreground)] focus-visible:ring-1 focus-visible:ring-[var(--ring)] focus-visible:outline-none"
                    >
                      {col.header}
                      <ChevronsUpDown className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="transition-colors hover:bg-[var(--accent)]/50"
              >
                {columns.map((col) => (
                  <td
                    key={`${keyExtractor(item)}-${col.key}`}
                    className={cn("px-4 py-3.5", col.className)}
                  >
                    {col.accessor
                      ? col.accessor(item)
                      : ((item as Record<string, unknown>)[col.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between px-2 text-sm text-[var(--muted-foreground)]">
          <div>
            Page <span className="font-medium text-[var(--foreground)]">{page}</span> of{" "}
            <span className="font-medium text-[var(--foreground)]">{totalPages}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              aria-label="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
