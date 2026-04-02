export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemeColors {
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  grey: ColorScale;
  background: {
    default: string;
    paper: string;
    elevated: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  divider: string;
  overlay: string;
}

export interface ThemeSpacing {
  (units: number): string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontFamilyMono: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    display: string;
  };
  fontWeight: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeShadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeTransitions {
  fast: string;
  normal: string;
  slow: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  borderRadius: ThemeBorderRadius;
  transitions: ThemeTransitions;
  zIndex: {
    drawer: number;
    modal: number;
    tooltip: number;
    toast: number;
  };
}

function createSpacing(): ThemeSpacing {
  const base = 8;
  const fn = (units: number) => `${units * base}px`;
  fn.xs = '4px';
  fn.sm = '8px';
  fn.md = '16px';
  fn.lg = '24px';
  fn.xl = '32px';
  fn.xxl = '48px';
  return fn as ThemeSpacing;
}

export const defaultTheme: Theme = {
  colors: {
    primary: {
      50: '#e8eaf6',
      100: '#c5cae9',
      200: '#9fa8da',
      300: '#7986cb',
      400: '#5c6bc0',
      500: '#3f51b5',
      600: '#3949ab',
      700: '#303f9f',
      800: '#283593',
      900: '#1a237e',
    },
    secondary: {
      50: '#fce4ec',
      100: '#f8bbd0',
      200: '#f48fb1',
      300: '#f06292',
      400: '#ec407a',
      500: '#e91e63',
      600: '#d81b60',
      700: '#c2185b',
      800: '#ad1457',
      900: '#880e4f',
    },
    success: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50',
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20',
    },
    warning: {
      50: '#fff8e1',
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#ffc107',
      600: '#ffb300',
      700: '#ffa000',
      800: '#ff8f00',
      900: '#ff6f00',
    },
    error: {
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#f44336',
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c',
    },
    info: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      elevated: '#ffffff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.6)',
      disabled: 'rgba(0,0,0,0.38)',
      inverse: '#ffffff',
    },
    divider: 'rgba(0,0,0,0.12)',
    overlay: 'rgba(0,0,0,0.5)',
  },
  spacing: createSpacing(),
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyMono:
      '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: {
      xs: '0.625rem',
      sm: '0.75rem',
      md: '0.875rem',
      lg: '1rem',
      xl: '1.125rem',
      xxl: '1.25rem',
      xxxl: '1.5rem',
      display: '2rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
  },
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '16px',
    full: '9999px',
  },
  transitions: {
    fast: 'all 0.1s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease',
  },
  zIndex: {
    drawer: 1200,
    modal: 1300,
    tooltip: 1500,
    toast: 1600,
  },
};

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type Size = 'sm' | 'md' | 'lg';
