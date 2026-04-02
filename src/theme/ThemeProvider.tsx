import React, { createContext } from 'react';
import type { Theme } from './theme.ts';
import { defaultTheme } from './theme.ts';

// Context is intentionally not exported — consumers use the useTheme hook instead.
export const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
