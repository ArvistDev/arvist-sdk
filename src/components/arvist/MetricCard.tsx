import React from 'react';
import { useTheme } from '../../theme/index.ts';
import { Card, CardHeader, CardContent } from '../primitives/Card.tsx';

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: string;
  trend?: { value: number; label?: string };
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  style?: React.CSSProperties;
}

export function MetricCard({
  title,
  value,
  unit,
  icon,
  trend,
  color = 'primary',
  style,
}: MetricCardProps) {
  const theme = useTheme();

  const trendPositive = trend && trend.value >= 0;
  const trendColor = trendPositive ? theme.colors.success[600] : theme.colors.error[600];

  const accentStyle: React.CSSProperties = {
    width: '4px',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: theme.colors[color][500],
    borderRadius: `${theme.borderRadius.lg} 0 0 ${theme.borderRadius.lg}`,
  };

  return (
    <Card elevation={1} style={{ position: 'relative', overflow: 'visible', ...style }}>
      <div style={accentStyle} />
      <CardHeader
        title={
          <span
            style={{
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {title}
          </span>
        }
        avatar={icon ? <span style={{ fontSize: '24px' }}>{icon}</span> : undefined}
      />
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span
            style={{
              fontFamily: theme.typography.fontFamilyMono,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              lineHeight: 1,
            }}
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && (
            <span
              style={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize.md,
                color: theme.colors.text.secondary,
              }}
            >
              {unit}
            </span>
          )}
        </div>

        {trend && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '8px',
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize.sm,
              color: trendColor,
            }}
          >
            <span>{trendPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
            {trend.label && (
              <span style={{ color: theme.colors.text.secondary }}>{trend.label}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

MetricCard.displayName = 'MetricCard';
