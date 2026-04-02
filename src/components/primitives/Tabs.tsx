import React, { createContext, useContext, useState } from 'react';
import { useTheme } from '../../theme/index.ts';
import type { ColorVariant } from '../../theme/theme.ts';

interface TabsContextValue {
  value: string;
  onChange: (val: string) => void;
  color: ColorVariant;
}

const TabsContext = createContext<TabsContextValue>({
  value: '',
  onChange: () => undefined,
  color: 'primary',
});

export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  color?: ColorVariant;
  variant?: 'standard' | 'fullWidth';
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function Tabs({
  value,
  onChange,
  color = 'primary',
  variant = 'standard',
  style,
  children,
}: TabsProps) {
  const theme = useTheme();

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    borderBottom: `2px solid ${theme.colors.divider}`,
    fontFamily: theme.typography.fontFamily,
    ...style,
  };

  return (
    <TabsContext.Provider value={{ value, onChange, color }}>
      <div role="tablist" style={tabsStyle}>
        {variant === 'fullWidth'
          ? React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, { style: { flex: 1 } } as React.HTMLAttributes<HTMLElement>)
                : child,
            )
          : children}
      </div>
    </TabsContext.Provider>
  );
}

Tabs.displayName = 'Tabs';

export interface TabProps {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Tab({ value, label, disabled, icon, style }: TabProps) {
  const theme = useTheme();
  const ctx = useContext(TabsContext);
  const [hovered, setHovered] = useState(false);
  const isSelected = ctx.value === value;

  const tabStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '10px 16px',
    border: 'none',
    background: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.md,
    fontWeight: isSelected ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular,
    color: isSelected
      ? theme.colors[ctx.color][600]
      : hovered && !disabled
        ? theme.colors.text.primary
        : theme.colors.text.secondary,
    borderBottom: isSelected ? `2px solid ${theme.colors[ctx.color][500]}` : '2px solid transparent',
    marginBottom: '-2px',
    opacity: disabled ? 0.5 : 1,
    transition: theme.transitions.fast,
    outline: 'none',
    ...style,
  };

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      style={tabStyle}
      onClick={() => !disabled && ctx.onChange(value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {label}
    </button>
  );
}

Tab.displayName = 'Tab';

export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function TabPanel({ value, children, style }: TabPanelProps) {
  const ctx = useContext(TabsContext);
  if (ctx.value !== value) return null;
  return (
    <div role="tabpanel" style={{ padding: '16px 0', ...style }}>
      {children}
    </div>
  );
}

TabPanel.displayName = 'TabPanel';
