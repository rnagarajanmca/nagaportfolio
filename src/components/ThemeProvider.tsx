'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = 'portfolio-theme';

const themeTokens: Record<Theme, Record<string, string>> = {
  light: {
    '--color-background': '#eef2f7',
    '--color-foreground': '#0d1726',
    '--color-muted': '#3f4d63',
    '--color-muted-foreground': '#1f2a3d',
    '--color-accent': '#174a76',
    '--color-accent-foreground': '#f6f9fc',
    '--color-surface': '#ffffff',
    '--color-surface-strong': '#d7dfeb',
    '--color-border': '#c0c9d8',
    '--color-ring': '#174a76',
    '--shadow-soft': '0 20px 60px -22px rgba(13, 23, 38, 0.25)',
  },
  dark: {
    '--color-background': '#050d1d',
    '--color-foreground': '#f1f5f9',
    '--color-muted': '#cbd5f5',
    '--color-muted-foreground': '#e2e8f0',
    '--color-accent': '#e2e8f0',
    '--color-accent-foreground': '#050d1d',
    '--color-surface': '#0f1b33',
    '--color-surface-strong': '#1f2d47',
    '--color-border': '#30405e',
    '--color-ring': '#cbd5f5',
    '--shadow-soft': '0 20px 60px -20px rgba(148, 163, 184, 0.25)',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  return storedTheme ?? 'dark';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.classList.toggle('dark', theme === 'dark');

  const tokens = themeTokens[theme];
  Object.entries(tokens).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
