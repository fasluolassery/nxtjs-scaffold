"use client";

import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          "relative inline-flex cursor-pointer items-center select-none",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border border-[var(--input)] shadow-2xs transition-all duration-150 peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] peer-checked:text-[var(--primary-foreground)] peer-focus-visible:ring-1 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:outline-none",
            className
          )}
        >
          {checked && (
            <Check className="animate-in zoom-in-50 h-3 w-3 stroke-[3] text-white transition-transform duration-100" />
          )}
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
