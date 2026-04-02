import React from 'react';
import { useTheme } from '../../theme/index.ts';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 0 | 1 | 2 | 3;
  variant?: 'elevation' | 'outlined';
}

export function Card({ elevation = 1, variant = 'elevation', style, children, ...rest }: CardProps) {
  const theme = useTheme();

  const shadowMap = [
    theme.shadows.none,
    theme.shadows.sm,
    theme.shadows.md,
    theme.shadows.lg,
  ];

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    boxShadow: variant === 'outlined' ? 'none' : shadowMap[elevation],
    border: variant === 'outlined' ? `1px solid ${theme.colors.divider}` : 'none',
    ...style,
  };

  return (
    <div style={cardStyle} {...rest}>
      {children}
    </div>
  );
}

Card.displayName = 'Card';

export interface CardHeaderProps {
  /** The card title. Named 'title' to match common Card APIs. */
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

export function CardHeader({ title, subheader, avatar, action, style }: CardHeaderProps) {
  const theme = useTheme();

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    ...style,
  };

  return (
    <div style={headerStyle}>
      {avatar && <div style={{ flexShrink: 0 }}>{avatar}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </div>
        )}
        {subheader && (
          <div
            style={{
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              marginTop: '2px',
            }}
          >
            {subheader}
          </div>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
}

CardHeader.displayName = 'CardHeader';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export function CardContent({ noPadding, style, children, ...rest }: CardContentProps) {
  const contentStyle: React.CSSProperties = {
    padding: noPadding ? 0 : '16px',
    ...style,
  };
  return (
    <div style={contentStyle} {...rest}>
      {children}
    </div>
  );
}

CardContent.displayName = 'CardContent';

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableSpacing?: boolean;
}

export function CardActions({ disableSpacing, style, children, ...rest }: CardActionsProps) {
  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    gap: disableSpacing ? 0 : '8px',
    ...style,
  };
  return (
    <div style={actionsStyle} {...rest}>
      {children}
    </div>
  );
}

CardActions.displayName = 'CardActions';
