import React from 'react';
import { useTheme } from '../../theme/index.ts';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  flexItem?: boolean;
  children?: React.ReactNode;
}

export function Divider({
  orientation = 'horizontal',
  variant = 'fullWidth',
  flexItem,
  children,
  style,
  ...rest
}: DividerProps) {
  const theme = useTheme();

  if (children) {
    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.sm,
      ...style,
    };
    const lineStyle: React.CSSProperties = {
      flex: 1,
      height: '1px',
      backgroundColor: theme.colors.divider,
    };
    return (
      <div style={wrapperStyle} role="separator">
        <div style={lineStyle} />
        {children}
        <div style={lineStyle} />
      </div>
    );
  }

  const insetLeft = variant === 'inset' ? '72px' : variant === 'middle' ? '16px' : '0';
  const insetRight = variant === 'middle' ? '16px' : '0';

  const hrStyle: React.CSSProperties =
    orientation === 'horizontal'
      ? {
          border: 'none',
          borderTop: `1px solid ${theme.colors.divider}`,
          margin: 0,
          marginLeft: insetLeft,
          marginRight: insetRight,
          ...style,
        }
      : {
          border: 'none',
          borderLeft: `1px solid ${theme.colors.divider}`,
          height: flexItem ? 'auto' : '100%',
          alignSelf: flexItem ? 'stretch' : undefined,
          margin: '0 8px',
          ...style,
        };

  return <hr style={hrStyle} {...rest} />;
}

Divider.displayName = 'Divider';
