import React from 'react';
import { useTheme } from '../../theme/index.ts';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  selected?: boolean;
  disabled?: boolean;
  button?: boolean;
  divider?: boolean;
  secondaryAction?: React.ReactNode;
}

export function List({ style, children, ...rest }: React.HTMLAttributes<HTMLUListElement>) {
  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    ...style,
  };
  return <ul style={listStyle} {...rest}>{children}</ul>;
}

List.displayName = 'List';

export function ListItem({
  selected,
  disabled,
  button,
  divider,
  secondaryAction,
  style,
  children,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: ListItemProps) {
  const theme = useTheme();
  const [hovered, setHovered] = React.useState(false);

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 16px',
    backgroundColor: selected
      ? theme.colors.primary[50]
      : button && hovered
        ? theme.colors.grey[50]
        : undefined,
    cursor: button && !disabled ? 'pointer' : disabled ? 'not-allowed' : 'default',
    opacity: disabled ? 0.5 : 1,
    borderBottom: divider ? `1px solid ${theme.colors.divider}` : undefined,
    transition: theme.transitions.fast,
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.text.primary,
    ...style,
  };

  return (
    <li
      style={itemStyle}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      {...rest}
    >
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {secondaryAction && <div style={{ flexShrink: 0 }}>{secondaryAction}</div>}
    </li>
  );
}

ListItem.displayName = 'ListItem';

export interface ListItemTextProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  style?: React.CSSProperties;
}

export function ListItemText({ primary, secondary, style }: ListItemTextProps) {
  const theme = useTheme();

  return (
    <div style={{ minWidth: 0, ...style }}>
      {primary && (
        <div
          style={{
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.text.primary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {primary}
        </div>
      )}
      {secondary && (
        <div
          style={{
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            marginTop: '2px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {secondary}
        </div>
      )}
    </div>
  );
}

ListItemText.displayName = 'ListItemText';
