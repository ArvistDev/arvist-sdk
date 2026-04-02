import React from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant, Size } from '../../theme/theme.ts';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  color?: ColorVariant;
  size?: Size;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, color = 'primary', size = 'md', id, checked, disabled, onChange, ...rest }, ref) => {
    const theme = useTheme();
    const switchId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    const sizeConfig: Record<Size, { width: number; height: number; thumbSize: number }> = {
      sm: { width: 32, height: 18, thumbSize: 14 },
      md: { width: 40, height: 22, thumbSize: 18 },
      lg: { width: 48, height: 26, thumbSize: 22 },
    };
    const { width, height, thumbSize } = sizeConfig[size];

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize.md,
      color: disabled ? theme.colors.text.disabled : theme.colors.text.primary,
    };

    const trackStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${height}px`,
      backgroundColor: checked
        ? theme.colors[color][500]
        : theme.colors.grey[400],
      transition: theme.transitions.fast,
      opacity: disabled ? 0.5 : 1,
      flexShrink: 0,
    };

    const thumbOffset = checked ? `${width - thumbSize - 2}px` : '2px';
    const thumbStyle: React.CSSProperties = {
      position: 'absolute',
      top: '2px',
      left: thumbOffset,
      width: `${thumbSize}px`,
      height: `${thumbSize}px`,
      borderRadius: '50%',
      backgroundColor: '#fff',
      boxShadow: theme.shadows.sm,
      transition: theme.transitions.fast,
    };

    return (
      <label htmlFor={switchId} style={containerStyle}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={switchId}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0 }}
          {...rest}
        />
        <div style={trackStyle} aria-hidden="true">
          <div style={thumbStyle} />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
