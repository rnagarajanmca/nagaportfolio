"use client";

import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  size?: "default" | "compact";
  className?: string;
}

export function ThemeToggle({ size = "default", className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const baseClasses =
    "inline-flex items-center rounded-full border border-border bg-surface text-xs font-medium uppercase tracking-[0.2em] text-muted shadow-sm transition hover:bg-surface-strong hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
  const sizeClasses =
    size === "compact"
      ? "gap-1 px-3 py-1.5 text-[10px]"
      : "gap-2 px-4 py-2";
  const classes = [baseClasses, sizeClasses, className].filter(Boolean).join(" ");

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={classes}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Current theme: ${theme}`}
    >
      <span className={size === "compact" ? "min-w-[3rem] text-center" : "inline-block w-12 text-center"}>
        {theme === "light" ? "Light" : "Dark"}
      </span>
      {size === "compact" ? null : <span className="text-[10px] text-muted-foreground">MODE</span>}
    </button>
  );
}
