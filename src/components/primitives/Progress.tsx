import React from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant, Size } from '../../theme/theme.ts';

export interface CircularProgressProps {
  size?: Size | number;
  color?: ColorVariant;
  value?: number;
  variant?: 'indeterminate' | 'determinate';
  thickness?: number;
  style?: React.CSSProperties;
}

export function CircularProgress({
  size = 'md',
  color = 'primary',
  value = 0,
  variant = 'indeterminate',
  thickness = 3.6,
  style,
}: CircularProgressProps) {
  const theme = useTheme();

  const sizeMap: Record<string, number> = { sm: 24, md: 40, lg: 56 };
  const dim = typeof size === 'number' ? size : sizeMap[size];

  const radius = (dim - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    variant === 'determinate'
      ? circumference - (value / 100) * circumference
      : 0;

  const svgStyle: React.CSSProperties = {
    width: `${dim}px`,
    height: `${dim}px`,
    animation: variant === 'indeterminate' ? 'arvist-spin 1.4s linear infinite' : undefined,
    ...style,
  };

  // Inject keyframes via a style tag approach — we use inline style on root
  const spinKeyframes = `
    @keyframes arvist-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes arvist-dash {
      0% { stroke-dashoffset: ${circumference * 0.8}; }
      50% { stroke-dashoffset: ${circumference * 0.1}; }
      100% { stroke-dashoffset: ${circumference * 0.8}; }
    }
  `;

  return (
    <>
      <style>{spinKeyframes}</style>
      <svg
        role="progressbar"
        aria-valuenow={variant === 'determinate' ? value : undefined}
        viewBox={`${dim / 2} ${dim / 2} ${dim} ${dim}`}
        style={svgStyle}
      >
        <circle
          cx={dim}
          cy={dim}
          r={radius}
          fill="none"
          stroke={theme.colors.grey[200]}
          strokeWidth={thickness}
        />
        <circle
          cx={dim}
          cy={dim}
          r={radius}
          fill="none"
          stroke={theme.colors[color][500]}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={variant === 'determinate' ? strokeDashoffset : undefined}
          strokeLinecap="round"
          style={
            variant === 'indeterminate'
              ? { animation: `arvist-dash 1.4s ease-in-out infinite` }
              : { transition: 'stroke-dashoffset 0.3s ease' }
          }
        />
      </svg>
    </>
  );
}

CircularProgress.displayName = 'CircularProgress';

export interface LinearProgressProps {
  value?: number;
  variant?: 'indeterminate' | 'determinate' | 'buffer';
  color?: ColorVariant;
  style?: React.CSSProperties;
}

export function LinearProgress({
  value = 0,
  variant = 'indeterminate',
  color = 'primary',
  style,
}: LinearProgressProps) {
  const theme = useTheme();

  const barKeyframes = `
    @keyframes arvist-indeterminate1 {
      0% { left: -35%; right: 100%; }
      60% { left: 100%; right: -90%; }
      100% { left: 100%; right: -90%; }
    }
    @keyframes arvist-indeterminate2 {
      0% { left: -200%; right: 100%; }
      60% { left: 107%; right: -8%; }
      100% { left: 107%; right: -8%; }
    }
  `;

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    height: '4px',
    backgroundColor: theme.colors[color][100],
    borderRadius: theme.borderRadius.full,
    ...style,
  };

  const barStyle: React.CSSProperties =
    variant === 'determinate'
      ? {
          width: `${value}%`,
          height: '100%',
          backgroundColor: theme.colors[color][500],
          borderRadius: theme.borderRadius.full,
          transition: 'width 0.3s ease',
        }
      : {
          position: 'absolute',
          height: '100%',
          backgroundColor: theme.colors[color][500],
          borderRadius: theme.borderRadius.full,
          animation: 'arvist-indeterminate1 2.1s cubic-bezier(0.65,0.815,0.735,0.395) infinite',
        };

  const bar2Style: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    backgroundColor: theme.colors[color][300],
    borderRadius: theme.borderRadius.full,
    animation: 'arvist-indeterminate2 2.1s cubic-bezier(0.165,0.84,0.44,1) 1.15s infinite',
  };

  return (
    <>
      <style>{barKeyframes}</style>
      <div
        role="progressbar"
        aria-valuenow={variant === 'determinate' ? value : undefined}
        style={trackStyle}
      >
        <div style={barStyle} />
        {variant === 'indeterminate' && <div style={bar2Style} />}
      </div>
    </>
  );
}

LinearProgress.displayName = 'LinearProgress';
