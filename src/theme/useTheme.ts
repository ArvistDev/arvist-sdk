import { useContext } from 'react';
import type { Theme } from './theme.ts';
import { ThemeContext } from './ThemeProvider.tsx';

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
