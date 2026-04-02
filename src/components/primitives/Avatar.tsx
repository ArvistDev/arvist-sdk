import React from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant, Size } from '../../theme/theme.ts';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: Size | number;
  color?: ColorVariant | 'default';
  children?: React.ReactNode;
  variant?: 'circular' | 'rounded' | 'square';
}

export function Avatar({
  src,
  alt,
  size = 'md',
  color = 'primary',
  children,
  variant = 'circular',
  style,
  ...rest
}: AvatarProps) {
  const theme = useTheme();

  const dimMap: Record<string, number> = { sm: 32, md: 40, lg: 48 };
  const dim = typeof size === 'number' ? size : dimMap[size];

  const borderRadiusMap: Record<string, string> = {
    circular: theme.borderRadius.full,
    rounded: theme.borderRadius.lg,
    square: theme.borderRadius.none,
  };

  const colorBg =
    color === 'default' ? theme.colors.grey[400] : theme.colors[color as ColorVariant][500];

  const avatarStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${dim}px`,
    height: `${dim}px`,
    borderRadius: borderRadiusMap[variant],
    backgroundColor: src ? 'transparent' : colorBg,
    color: '#fff',
    fontSize: `${dim * 0.4}px`,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily,
    overflow: 'hidden',
    flexShrink: 0,
    userSelect: 'none',
    ...style,
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  return (
    <div style={avatarStyle} {...rest}>
      {src ? (
        <img src={src} alt={alt ?? ''} style={imgStyle} />
      ) : (
        children ?? (alt ? alt[0].toUpperCase() : '?')
      )}
    </div>
  );
}

Avatar.displayName = 'Avatar';
