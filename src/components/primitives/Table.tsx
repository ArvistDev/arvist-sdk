import React from 'react';
import { useTheme } from '../../theme/index.ts';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  size?: 'sm' | 'md';
}

export function Table({ size = 'md', style, children, ...rest }: TableProps) {
  const theme = useTheme();

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: theme.typography.fontFamily,
    fontSize: size === 'sm' ? theme.typography.fontSize.sm : theme.typography.fontSize.md,
    ...style,
  };

  return (
    <table style={tableStyle} {...rest}>
      {children}
    </table>
  );
}

Table.displayName = 'Table';

export type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableHead({ style, children, ...rest }: TableHeadProps) {
  return <thead style={style} {...rest}>{children}</thead>;
}

TableHead.displayName = 'TableHead';

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ style, children, ...rest }: TableBodyProps) {
  return <tbody style={style} {...rest}>{children}</tbody>;
}

TableBody.displayName = 'TableBody';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  hover?: boolean;
}

export function TableRow({ selected, hover, style, children, onMouseEnter, onMouseLeave, ...rest }: TableRowProps) {
  const theme = useTheme();
  const [hovered, setHovered] = React.useState(false);

  const rowStyle: React.CSSProperties = {
    backgroundColor: selected
      ? theme.colors.primary[50]
      : hover && hovered
        ? theme.colors.grey[50]
        : undefined,
    transition: theme.transitions.fast,
    ...style,
  };

  return (
    <tr
      style={rowStyle}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      {...rest}
    >
      {children}
    </tr>
  );
}

TableRow.displayName = 'TableRow';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  component?: 'td' | 'th';
  align?: 'left' | 'right' | 'center' | 'justify';
  padding?: 'normal' | 'checkbox' | 'none';
}

export function TableCell({
  component = 'td',
  align = 'left',
  padding = 'normal',
  style,
  children,
  ...rest
}: TableCellProps) {
  const theme = useTheme();

  const cellStyle: React.CSSProperties = {
    borderBottom: `1px solid ${theme.colors.divider}`,
    textAlign: align,
    padding:
      padding === 'none'
        ? 0
        : padding === 'checkbox'
          ? '0 0 0 4px'
          : '12px 16px',
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: component === 'th' ? theme.typography.fontWeight.semibold : undefined,
    backgroundColor: component === 'th' ? theme.colors.grey[50] : undefined,
    ...style,
  };

  return React.createElement(component, { style: cellStyle, ...rest }, children);
}

TableCell.displayName = 'TableCell';
