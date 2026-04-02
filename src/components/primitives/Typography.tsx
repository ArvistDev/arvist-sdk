import React from 'react';
import { useTheme } from '../../theme/index.ts';

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'code';

const variantTagMap: Record<TypographyVariant, React.ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  code: 'code',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  component?: React.ElementType;
  color?: string;
  align?: React.CSSProperties['textAlign'];
  noWrap?: boolean;
  gutterBottom?: boolean;
  fontWeight?: React.CSSProperties['fontWeight'];
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body1',
      component,
      color,
      align,
      noWrap,
      gutterBottom,
      fontWeight,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const Tag = component ?? variantTagMap[variant];

    const variantStyles: Record<TypographyVariant, React.CSSProperties> = {
      display: {
        fontSize: theme.typography.fontSize.display,
        fontWeight: theme.typography.fontWeight.bold,
        lineHeight: theme.typography.lineHeight.tight,
        letterSpacing: '-0.02em',
      },
      h1: {
        fontSize: '2rem',
        fontWeight: theme.typography.fontWeight.bold,
        lineHeight: theme.typography.lineHeight.tight,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: theme.typography.fontWeight.bold,
        lineHeight: theme.typography.lineHeight.tight,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: theme.typography.fontWeight.semibold,
        lineHeight: theme.typography.lineHeight.tight,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: theme.typography.fontWeight.semibold,
        lineHeight: theme.typography.lineHeight.normal,
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: theme.typography.fontWeight.medium,
        lineHeight: theme.typography.lineHeight.normal,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: theme.typography.fontWeight.medium,
        lineHeight: theme.typography.lineHeight.normal,
      },
      subtitle1: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.medium,
        lineHeight: theme.typography.lineHeight.normal,
      },
      subtitle2: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.medium,
        lineHeight: theme.typography.lineHeight.normal,
      },
      body1: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.regular,
        lineHeight: theme.typography.lineHeight.normal,
      },
      body2: {
        fontSize: theme.typography.fontSize.md,
        fontWeight: theme.typography.fontWeight.regular,
        lineHeight: theme.typography.lineHeight.normal,
      },
      caption: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.regular,
        lineHeight: theme.typography.lineHeight.normal,
      },
      overline: {
        fontSize: theme.typography.fontSize.xs,
        fontWeight: theme.typography.fontWeight.semibold,
        lineHeight: theme.typography.lineHeight.normal,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
      code: {
        fontSize: theme.typography.fontSize.md,
        fontFamily: theme.typography.fontFamilyMono,
        lineHeight: theme.typography.lineHeight.normal,
      },
    };

    const computedStyle: React.CSSProperties = {
      fontFamily: variant === 'code' ? theme.typography.fontFamilyMono : theme.typography.fontFamily,
      margin: 0,
      color: color ?? theme.colors.text.primary,
      textAlign: align,
      whiteSpace: noWrap ? 'nowrap' : undefined,
      overflow: noWrap ? 'hidden' : undefined,
      textOverflow: noWrap ? 'ellipsis' : undefined,
      marginBottom: gutterBottom ? '0.35em' : undefined,
      fontWeight,
      ...variantStyles[variant],
      ...style,
    };

    return <Tag ref={ref} style={computedStyle} {...rest}>{children}</Tag>;
  },
);

Typography.displayName = 'Typography';
