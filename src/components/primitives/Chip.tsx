import React from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant, Size } from '../../theme/theme.ts';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  color?: ColorVariant | 'default';
  variant?: 'filled' | 'outlined';
  size?: Size;
  onDelete?: () => void;
  icon?: React.ReactNode;
  clickable?: boolean;
}

export function Chip({
  label,
  color = 'default',
  variant = 'filled',
  size = 'md',
  onDelete,
  icon,
  clickable,
  style,
  onClick,
  ...rest
}: ChipProps) {
  const theme = useTheme();

  const colorScale = color === 'default' ? theme.colors.grey : theme.colors[color as ColorVariant];

  const sizeMap: Record<Size, { height: string; fontSize: string; padding: string }> = {
    sm: { height: '22px', fontSize: theme.typography.fontSize.xs, padding: '0 8px' },
    md: { height: '28px', fontSize: theme.typography.fontSize.sm, padding: '0 10px' },
    lg: { height: '34px', fontSize: theme.typography.fontSize.md, padding: '0 12px' },
  };

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: theme.borderRadius.full,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: clickable || onClick ? 'pointer' : 'default',
    transition: theme.transitions.fast,
    userSelect: 'none',
    ...(variant === 'filled'
      ? {
          backgroundColor: color === 'default' ? colorScale[200] : colorScale[100],
          color: color === 'default' ? colorScale[700] : colorScale[800],
          border: 'none',
        }
      : {
          backgroundColor: 'transparent',
          color: color === 'default' ? colorScale[700] : colorScale[700],
          border: `1px solid ${color === 'default' ? colorScale[400] : colorScale[400]}`,
        }),
    ...sizeMap[size],
    ...style,
  };

  const deleteStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
    color: 'inherit',
    opacity: 0.7,
    fontSize: '12px',
    marginLeft: '2px',
  };

  return (
    <span
      style={chipStyle}
      role={clickable || onClick ? 'button' : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
      onClick={onClick}
      {...rest}
    >
      {icon && <span style={{ display: 'inline-flex', fontSize: '1em' }}>{icon}</span>}
      {label}
      {onDelete && (
        <button
          style={deleteStyle}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label={`Remove ${label}`}
        >
          ✕
        </button>
      )}
    </span>
  );
}

Chip.displayName = 'Chip';
