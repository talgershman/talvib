"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="ml-2 hidden sm:inline">{isDark ? "Light" : "Dark"} mode</span>
    </button>
  );
}
