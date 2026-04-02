import React from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant } from '../../theme/theme.ts';

export interface BadgeProps {
  children: React.ReactNode;
  content?: React.ReactNode;
  color?: ColorVariant | 'default';
  max?: number;
  invisible?: boolean;
  showZero?: boolean;
  variant?: 'standard' | 'dot';
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
}

export function Badge({
  children,
  content,
  color = 'error',
  max = 99,
  invisible,
  showZero,
  variant = 'standard',
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
}: BadgeProps) {
  const theme = useTheme();

  const numericContent = typeof content === 'number' ? content : undefined;
  const displayContent =
    numericContent !== undefined
      ? numericContent > max
        ? `${max}+`
        : String(numericContent)
      : content;

  const isInvisible =
    invisible ||
    (numericContent === 0 && !showZero) ||
    (content === undefined && variant !== 'dot');

  const colorStyle =
    color === 'default'
      ? { bg: theme.colors.grey[500], text: '#fff' }
      : { bg: theme.colors[color as ColorVariant][500], text: '#fff' };

  const badgeSize = variant === 'dot' ? 10 : 20;

  const posStyle: React.CSSProperties = {
    top: anchorOrigin.vertical === 'top' ? `-${badgeSize / 2}px` : 'auto',
    bottom: anchorOrigin.vertical === 'bottom' ? `-${badgeSize / 2}px` : 'auto',
    right: anchorOrigin.horizontal === 'right' ? `-${badgeSize / 2}px` : 'auto',
    left: anchorOrigin.horizontal === 'left' ? `-${badgeSize / 2}px` : 'auto',
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: `${badgeSize}px`,
    minWidth: variant === 'dot' ? `${badgeSize}px` : `${badgeSize}px`,
    padding: variant === 'dot' ? 0 : '0 6px',
    borderRadius: theme.borderRadius.full,
    backgroundColor: colorStyle.bg,
    color: colorStyle.text,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: theme.typography.fontFamily,
    border: `2px solid ${theme.colors.background.paper}`,
    boxSizing: 'border-box',
    transition: theme.transitions.fast,
    opacity: isInvisible ? 0 : 1,
    transform: isInvisible ? 'scale(0)' : 'scale(1)',
    pointerEvents: 'none',
    ...posStyle,
  };

  return (
    <span style={{ position: 'relative', display: 'inline-flex', verticalAlign: 'middle' }}>
      {children}
      <span style={badgeStyle}>{variant !== 'dot' && displayContent}</span>
    </span>
  );
}

Badge.displayName = 'Badge';
