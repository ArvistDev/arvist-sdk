import React from 'react';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  spacing?: number | string;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  flexWrap?: React.CSSProperties['flexWrap'];
  divider?: React.ReactNode;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'column',
      spacing = 0,
      alignItems,
      justifyContent,
      flexWrap,
      divider,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const gap = typeof spacing === 'number' ? `${spacing * 8}px` : spacing;

    const computedStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      gap: divider ? undefined : gap,
      alignItems,
      justifyContent,
      flexWrap,
      ...style,
    };

    if (divider) {
      const items = React.Children.toArray(children).filter(Boolean);
      return (
        <div ref={ref} style={computedStyle} {...rest}>
          {items.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < items.length - 1 && divider}
            </React.Fragment>
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} style={computedStyle} {...rest}>
        {children}
      </div>
    );
  },
);

Stack.displayName = 'Stack';
