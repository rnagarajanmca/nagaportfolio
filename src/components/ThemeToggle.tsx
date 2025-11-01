"use client";

import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted shadow-sm transition hover:bg-surface-strong hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      aria-label="Toggle theme"
    >
      <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
      <span className="text-[10px] text-muted-foreground">MODE</span>
    </button>
  );
}
