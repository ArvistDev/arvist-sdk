import React from 'react';
import { useTheme } from '../../theme/index.ts';

export type QualityStatus = 'PASS' | 'FAIL' | 'PENDING' | 'PROCESSING' | 'ERROR';

export interface QualityBadgeProps {
  status: QualityStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  style?: React.CSSProperties;
}

const statusConfig: Record<
  QualityStatus,
  { label: string; icon: string; color: string; bg: string; border: string }
> = {
  PASS: { label: 'PASS', icon: '✓', color: '#2e7d32', bg: '#e8f5e9', border: '#81c784' },
  FAIL: { label: 'FAIL', icon: '✕', color: '#c62828', bg: '#ffebee', border: '#ef9a9a' },
  PENDING: { label: 'PENDING', icon: '⏳', color: '#e65100', bg: '#fff3e0', border: '#ffcc02' },
  PROCESSING: { label: 'PROCESSING', icon: '⚙', color: '#1565c0', bg: '#e3f2fd', border: '#90caf9' },
  ERROR: { label: 'ERROR', icon: '⚠', color: '#b71c1c', bg: '#ffebee', border: '#e57373' },
};

export function QualityBadge({ status, size = 'md', showIcon = true, style }: QualityBadgeProps) {
  const theme = useTheme();
  const cfg = statusConfig[status];

  const sizeMap = {
    sm: { padding: '2px 8px', fontSize: theme.typography.fontSize.xs, gap: '3px' },
    md: { padding: '4px 10px', fontSize: theme.typography.fontSize.sm, gap: '4px' },
    lg: { padding: '6px 14px', fontSize: theme.typography.fontSize.md, gap: '6px' },
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: sizeMap[size].gap,
    padding: sizeMap[size].padding,
    fontSize: sizeMap[size].fontSize,
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: theme.typography.fontFamily,
    letterSpacing: '0.05em',
    borderRadius: theme.borderRadius.full,
    backgroundColor: cfg.bg,
    color: cfg.color,
    border: `1px solid ${cfg.border}`,
    userSelect: 'none',
    ...style,
  };

  return (
    <span style={badgeStyle}>
      {showIcon && <span>{cfg.icon}</span>}
      {cfg.label}
    </span>
  );
}

QualityBadge.displayName = 'QualityBadge';
