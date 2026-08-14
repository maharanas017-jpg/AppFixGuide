import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentTheme = 'emerald' | 'indigo' | 'amber' | 'rose' | 'violet';

export interface ThemeStyles {
  text: string;
  bg: string;
  bgHover: string;
  bgSoft: string;
  border: string;
  hoverBorder: string;
  shadow: string;
  glow: string;
  gradient: string;
}

export const themes: Record<AccentTheme, ThemeStyles> = {
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-600',
    bgHover: 'hover:bg-emerald-700',
    bgSoft: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-300',
    border: 'border-emerald-500',
    hoverBorder: 'hover:border-emerald-500',
    shadow: 'shadow-emerald-600/10',
    glow: 'from-emerald-600 to-teal-500',
    gradient: 'from-emerald-600 via-teal-500 to-cyan-500'
  },
  indigo: {
    text: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-600',
    bgHover: 'hover:bg-indigo-700',
    bgSoft: 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-950 dark:text-indigo-300',
    border: 'border-indigo-500',
    hoverBorder: 'hover:border-indigo-500',
    shadow: 'shadow-indigo-600/10',
    glow: 'from-indigo-600 to-blue-500',
    gradient: 'from-indigo-650 via-violet-600 to-blue-500'
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-600',
    bgHover: 'hover:bg-amber-700',
    bgSoft: 'bg-amber-50 dark:bg-amber-950/20 text-amber-950 dark:text-amber-300',
    border: 'border-amber-500',
    hoverBorder: 'hover:border-amber-500',
    shadow: 'shadow-amber-600/10',
    glow: 'from-amber-600 to-orange-500',
    gradient: 'from-amber-500 via-orange-500 to-yellow-500'
  },
  rose: {
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-600',
    bgHover: 'hover:bg-rose-700',
    bgSoft: 'bg-rose-50 dark:bg-rose-950/20 text-rose-950 dark:text-rose-300',
    border: 'border-rose-500',
    hoverBorder: 'hover:border-rose-500',
    shadow: 'shadow-rose-600/10',
    glow: 'from-rose-600 to-pink-500',
    gradient: 'from-rose-600 via-pink-500 to-red-500'
  },
  violet: {
    text: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-600',
    bgHover: 'hover:bg-violet-700',
    bgSoft: 'bg-violet-50 dark:bg-violet-950/20 text-violet-950 dark:text-violet-300',
    border: 'border-violet-500',
    hoverBorder: 'hover:border-violet-500',
    shadow: 'shadow-violet-600/10',
    glow: 'from-violet-600 to-purple-500',
    gradient: 'from-violet-600 via-purple-650 to-indigo-500'
  }
};

interface ThemeContextProps {
  accentTheme: AccentTheme;
  setAccentTheme: (theme: AccentTheme) => void;
  styles: ThemeStyles;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentTheme, setAccentThemeState] = useState<AccentTheme>(() => {
    const saved = localStorage.getItem('appfix_accent_theme');
    return (saved as AccentTheme) || 'indigo'; // Default to a gorgeous cyber indigo
  });

  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem('appfix_dark_mode');
    return saved === 'true'; // false by default (premium clean light schemes)
  });

  const setAccentTheme = (theme: AccentTheme) => {
    setAccentThemeState(theme);
    localStorage.setItem('appfix_accent_theme', theme);
  };

  const setDarkMode = (dark: boolean) => {
    setDarkModeState(dark);
    localStorage.setItem('appfix_dark_mode', String(dark));
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const styles = themes[accentTheme];

  return (
    <ThemeContext.Provider value={{ accentTheme, setAccentTheme, styles, darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
