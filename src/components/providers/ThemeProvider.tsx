'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ThemeMode } from '@/types';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: Exclude<ThemeMode, 'system'>;
  setTheme: (theme: ThemeMode) => void;
}

const STORAGE_KEY = 'fightpulse-theme';
const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Exclude<ThemeMode, 'system'> {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [resolvedTheme, setResolvedTheme] = useState<Exclude<ThemeMode, 'system'>>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const nextTheme = stored ?? 'light';
    setTheme(nextTheme);
    setResolvedTheme(nextTheme === 'system' ? getSystemTheme() : nextTheme);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        setResolvedTheme(getSystemTheme());
      }
    };

    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(resolvedTheme);
    html.dataset.theme = resolvedTheme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, resolvedTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme: ThemeMode) => {
        setTheme(nextTheme);
        setResolvedTheme(nextTheme === 'system' ? getSystemTheme() : nextTheme);
      }
    }),
    [resolvedTheme, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
