import React from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant, Size } from '../../theme/theme.ts';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  color?: ColorVariant;
  size?: Size;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, color = 'primary', size = 'md', indeterminate, style, id, ...rest }, ref) => {
    const theme = useTheme();
    const checkId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    const sizeMap: Record<Size, string> = { sm: '14px', md: '18px', lg: '22px' };
    const dim = sizeMap[size];

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      cursor: rest.disabled ? 'not-allowed' : 'pointer',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize.md,
      color: rest.disabled ? theme.colors.text.disabled : theme.colors.text.primary,
    };

    const inputStyle: React.CSSProperties = {
      width: dim,
      height: dim,
      accentColor: theme.colors[color][500],
      cursor: rest.disabled ? 'not-allowed' : 'pointer',
      margin: 0,
      ...style,
    };

    const combinedRef = (el: HTMLInputElement | null) => {
      if (el) el.indeterminate = !!indeterminate;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    return (
      <label htmlFor={checkId} style={containerStyle}>
        <input
          ref={combinedRef}
          type="checkbox"
          id={checkId}
          style={inputStyle}
          {...rest}
        />
        {label && <span>{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
