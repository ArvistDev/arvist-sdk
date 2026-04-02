import React, { useState } from 'react';
import { useTheme } from '../../theme/index.ts';
import type { Size } from '../../theme/theme.ts';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  children: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'md', style, children, onMouseEnter, onMouseLeave, disabled, ...rest }, ref) => {
    const theme = useTheme();
    const [hovered, setHovered] = useState(false);

    const sizeMap: Record<Size, string> = { sm: '28px', md: '36px', lg: '44px' };
    const dim = sizeMap[size];

    const computedStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      border: 'none',
      borderRadius: theme.borderRadius.full,
      backgroundColor: hovered && !disabled ? theme.colors.grey[100] : 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: theme.transitions.fast,
      padding: 0,
      outline: 'none',
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
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
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
