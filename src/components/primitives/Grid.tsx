import React from 'react';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  item?: boolean;
  columns?: number;
  spacing?: number | string;
  columnSpacing?: number | string;
  rowSpacing?: number | string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      container,
      columns = 12,
      spacing = 0,
      columnSpacing,
      rowSpacing,
      alignItems,
      justifyContent,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    if (container) {
      const colGap = columnSpacing ?? spacing;
      const rowGap = rowSpacing ?? spacing;
      const colGapPx = typeof colGap === 'number' ? `${colGap * 8}px` : colGap;
      const rowGapPx = typeof rowGap === 'number' ? `${rowGap * 8}px` : rowGap;

      const computedStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        columnGap: colGapPx,
        rowGap: rowGapPx,
        alignItems,
        justifyContent,
        ...style,
      };
      return (
        <div ref={ref} style={computedStyle} {...rest}>
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} style={style} {...rest}>
        {children}
      </div>
    );
  },
);

Grid.displayName = 'Grid';
