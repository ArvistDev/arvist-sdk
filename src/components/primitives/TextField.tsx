import React, { useState } from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant, Size } from '../../theme/theme.ts';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  color?: ColorVariant;
  size?: Size;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

export const TextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      color = 'primary',
      size = 'md',
      fullWidth,
      startAdornment,
      endAdornment,
      multiline,
      rows = 4,
      disabled,
      style,
      id,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const [focused, setFocused] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
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

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      border: `1px solid ${borderColor}`,
      borderRadius: theme.borderRadius.md,
      backgroundColor: disabled ? theme.colors.grey[100] : theme.colors.background.paper,
      transition: theme.transitions.fast,
      boxShadow: focused ? `0 0 0 2px ${theme.colors[color][100]}` : undefined,
      overflow: 'hidden',
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      fontFamily: theme.typography.fontFamily,
      color: theme.colors.text.primary,
      cursor: disabled ? 'not-allowed' : 'text',
      resize: multiline ? 'vertical' : undefined,
      ...sizeMap[size],
      ...style,
    };

    const helperStyle: React.CSSProperties = {
      fontSize: theme.typography.fontSize.xs,
      color: error ? theme.colors.error[600] : theme.colors.text.secondary,
      marginTop: '4px',
    };

    const adornmentStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      color: theme.colors.text.secondary,
      flexShrink: 0,
    };

    const inputProps = {
      id: inputId,
      disabled,
      style: inputStyle,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      ...rest,
    };

    const textareaProps = {
      id: inputId,
      disabled,
      style: inputStyle,
      rows,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    };

    return (
      <div style={containerStyle}>
        {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
        <div style={wrapperStyle}>
          {startAdornment && <span style={adornmentStyle}>{startAdornment}</span>}
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              {...textareaProps}
            />
          ) : (
            <input ref={ref as React.Ref<HTMLInputElement>} {...inputProps} />
          )}
          {endAdornment && <span style={adornmentStyle}>{endAdornment}</span>}
        </div>
        {helperText && <span style={helperStyle}>{helperText}</span>}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
