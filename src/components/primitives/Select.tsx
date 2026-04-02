import React, { useState } from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant, Size } from '../../theme/theme.ts';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: boolean;
  color?: ColorVariant;
  size?: Size;
  fullWidth?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      helperText,
      error,
      color = 'primary',
      size = 'md',
      fullWidth,
      placeholder,
      disabled,
      id,
      style,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const [focused, setFocused] = useState(false);
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const borderColor = error
      ? theme.colors.error[500]
      : focused
        ? theme.colors[color][500]
        : theme.colors.grey[400];

    const sizeMap: Record<Size, { padding: string; fontSize: string }> = {
      sm: { padding: '6px 10px', fontSize: theme.typography.fontSize.sm },
      md: { padding: '8px 12px', fontSize: theme.typography.fontSize.md },
      lg: { padding: '10px 14px', fontSize: theme.typography.fontSize.lg },
    };

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      width: fullWidth ? '100%' : undefined,
      fontFamily: theme.typography.fontFamily,
    };

    const labelStyle: React.CSSProperties = {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: error ? theme.colors.error[600] : focused ? theme.colors[color][600] : theme.colors.text.secondary,
      marginBottom: '4px',
    };

    const selectStyle: React.CSSProperties = {
      appearance: 'none',
      width: '100%',
      border: `1px solid ${borderColor}`,
      borderRadius: theme.borderRadius.md,
      backgroundColor: disabled ? theme.colors.grey[100] : theme.colors.background.paper,
      fontFamily: theme.typography.fontFamily,
      color: theme.colors.text.primary,
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      boxShadow: focused ? `0 0 0 2px ${theme.colors[color][100]}` : undefined,
      transition: theme.transitions.fast,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 8px center',
      paddingRight: '32px',
      ...sizeMap[size],
      ...style,
    };

    const helperStyle: React.CSSProperties = {
      fontSize: theme.typography.fontSize.xs,
      color: error ? theme.colors.error[600] : theme.colors.text.secondary,
      marginTop: '4px',
    };

    return (
      <div style={containerStyle}>
        {label && <label htmlFor={selectId} style={labelStyle}>{label}</label>}
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          style={selectStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {helperText && <span style={helperStyle}>{helperText}</span>}
      </div>
    );
  },
);

Select.displayName = 'Select';
