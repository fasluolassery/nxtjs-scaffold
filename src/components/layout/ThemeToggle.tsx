"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useMounted } from "@/hooks/useMounted";

export function ThemeToggle() {
  const mounted = useMounted();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("app-theme") as "light" | "dark" | null;
    const initialTheme =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("app-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle Theme">
        <Sun className="h-5 w-5 opacity-0" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700 transition-transform duration-200 hover:-rotate-12" />
      )}
    </Button>
  );
}
