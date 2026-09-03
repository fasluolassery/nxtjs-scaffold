"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex cursor-pointer items-center select-none",
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
            "peer relative h-6 w-11 rounded-full bg-[var(--input)] shadow-2xs transition-all duration-200 peer-checked:bg-[var(--primary)] peer-focus-visible:ring-1 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-[var(--border)] after:bg-white after:transition-transform after:duration-200 after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white",
            className
          )}
        />
      </label>
    );
  }
);

Switch.displayName = "Switch";
