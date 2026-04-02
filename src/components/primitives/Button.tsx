import React, { useState } from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant, Size } from '../../theme/theme.ts';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: ColorVariant;
  size?: Size;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'md',
      fullWidth,
      startIcon,
      endIcon,
      loading,
      disabled,
      style,
      children,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const [hovered, setHovered] = useState(false);

    const colorScale = theme.colors[color];
    const isDisabled = disabled || loading;

    const sizeStyles: Record<Size, React.CSSProperties> = {
      sm: {
        padding: '4px 10px',
        fontSize: theme.typography.fontSize.sm,
        borderRadius: theme.borderRadius.md,
      },
      md: {
        padding: '6px 16px',
        fontSize: theme.typography.fontSize.md,
        borderRadius: theme.borderRadius.md,
      },
      lg: {
        padding: '8px 22px',
        fontSize: theme.typography.fontSize.lg,
        borderRadius: theme.borderRadius.md,
      },
    };

    const variantStyles = (): React.CSSProperties => {
      if (variant === 'contained') {
        return {
          backgroundColor: isDisabled
            ? theme.colors.grey[300]
            : hovered
              ? colorScale[700]
              : colorScale[500],
          color: isDisabled ? theme.colors.text.disabled : '#fff',
          border: 'none',
          boxShadow: hovered && !isDisabled ? theme.shadows.md : theme.shadows.sm,
        };
      }
      if (variant === 'outlined') {
        return {
          backgroundColor: hovered && !isDisabled ? `${colorScale[50]}` : 'transparent',
          color: isDisabled ? theme.colors.text.disabled : colorScale[600],
          border: `1px solid ${isDisabled ? theme.colors.grey[300] : colorScale[400]}`,
        };
      }
      // text
      return {
        backgroundColor: hovered && !isDisabled ? `${colorScale[50]}` : 'transparent',
        color: isDisabled ? theme.colors.text.disabled : colorScale[600],
        border: 'none',
      };
    };

    const computedStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeight.medium,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      outline: 'none',
      transition: theme.transitions.fast,
      width: fullWidth ? '100%' : undefined,
      opacity: isDisabled ? 0.65 : 1,
      ...sizeStyles[size],
      ...variantStyles(),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={computedStyle}
        onMouseEnter={(e) => {
          setHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
          onMouseLeave?.(e);
        }}
        {...rest}
      >
        {loading && <span style={{ display: 'inline-flex' }}>⏳</span>}
        {!loading && startIcon}
        {children}
        {endIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
