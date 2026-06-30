"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="border-border bg-background/40 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-9 items-center justify-center rounded-full border transition-colors"
    >
      {/* CSS-driven so there is no hydration mismatch: the active theme class decides which shows. */}
      <Sun className="hidden size-4 dark:block" />
      <Moon className="block size-4 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
