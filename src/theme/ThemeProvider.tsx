import React, { createContext, useContext } from 'react';
import type { Theme } from './theme.ts';
import { defaultTheme } from './theme.ts';

const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
