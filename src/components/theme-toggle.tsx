"use client";

import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <Button type="button" aria-label="Toggle theme" onClick={toggle} variant="ghost">
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="ml-2 hidden sm:inline">
        {mounted ? (isDark ? "Light" : "Dark") : "Theme"} mode
      </span>
    </Button>
  );
}
