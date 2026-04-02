import React from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant } from '../../theme/theme.ts';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  severity?: ColorVariant;
  variant?: 'filled' | 'outlined' | 'standard';
  onClose?: () => void;
  icon?: React.ReactNode;
  title?: string;
}

const defaultIcons: Record<string, string> = {
  success: '✓',
  warning: '⚠',
  error: '✕',
  info: 'ℹ',
  primary: 'ℹ',
  secondary: 'ℹ',
};

export function Alert({
  severity = 'info',
  variant = 'standard',
  onClose,
  icon,
  title,
  style,
  children,
  ...rest
}: AlertProps) {
  const theme = useTheme();
  const colorScale = theme.colors[severity];
  const displayIcon = icon !== undefined ? icon : defaultIcons[severity];

  const variantStyles = (): React.CSSProperties => {
    if (variant === 'filled') {
      return {
        backgroundColor: colorScale[500],
        color: '#fff',
        border: 'none',
      };
    }
    if (variant === 'outlined') {
      return {
        backgroundColor: 'transparent',
        color: colorScale[800],
        border: `1px solid ${colorScale[400]}`,
      };
    }
    return {
      backgroundColor: colorScale[50],
      color: colorScale[800],
      border: `1px solid ${colorScale[200]}`,
    };
  };

  const alertStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: theme.borderRadius.md,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.md,
    lineHeight: theme.typography.lineHeight.normal,
    ...variantStyles(),
    ...style,
  };

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    fontSize: '1.2em',
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: '1px',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const closeStyle: React.CSSProperties = {
    flexShrink: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'inherit',
    fontSize: '1em',
    padding: '0 4px',
    opacity: 0.7,
    lineHeight: 1,
  };

  return (
    <div role="alert" style={alertStyle} {...rest}>
      {displayIcon !== false && <span style={iconStyle}>{displayIcon}</span>}
      <div style={contentStyle}>
        {title && (
          <div style={{ fontWeight: theme.typography.fontWeight.semibold, marginBottom: children ? '4px' : 0 }}>
            {title}
          </div>
        )}
        {children}
      </div>
      {onClose && (
        <button style={closeStyle} onClick={onClose} aria-label="Close alert">
          ✕
        </button>
      )}
    </div>
  );
}

Alert.displayName = 'Alert';
