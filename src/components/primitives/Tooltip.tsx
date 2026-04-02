import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../../theme/index.ts';

export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export function Tooltip({ title, children, placement = 'top', delay = 200 }: TooltipProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const computePos = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const offset = 8;
    let top = 0;
    let left = 0;
    if (placement === 'top') {
      top = rect.top - offset;
      left = rect.left + rect.width / 2;
    } else if (placement === 'bottom') {
      top = rect.bottom + offset;
      left = rect.left + rect.width / 2;
    } else if (placement === 'left') {
      top = rect.top + rect.height / 2;
      left = rect.left - offset;
    } else {
      top = rect.top + rect.height / 2;
      left = rect.right + offset;
    }
    setPos({ top: top + window.scrollY, left: left + window.scrollX });
  }, [placement]);

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      computePos();
      setVisible(true);
    }, delay);
  }, [computePos, delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const transformMap: Record<string, string> = {
    top: 'translate(-50%, -100%)',
    bottom: 'translate(-50%, 0)',
    left: 'translate(-100%, -50%)',
    right: 'translate(0, -50%)',
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${pos.top}px`,
    left: `${pos.left}px`,
    transform: transformMap[placement],
    backgroundColor: theme.colors.grey[800],
    color: '#fff',
    padding: '4px 8px',
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: theme.zIndex.tooltip,
    boxShadow: theme.shadows.md,
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.15s ease',
    maxWidth: '300px',
    textAlign: 'center',
  };

  // Use a wrapper span so we avoid ref issues with cloneElement
  return (
    <>
      <span
        ref={triggerRef as React.RefObject<HTMLSpanElement>}
        style={{ display: 'contents' }}
        onMouseEnter={() => show()}
        onMouseLeave={() => hide()}
        onFocus={() => show()}
        onBlur={() => hide()}
      >
        {children}
      </span>
      {visible && (
        <div style={tooltipStyle} role="tooltip">
          {title}
        </div>
      )}
    </>
  );
}

Tooltip.displayName = 'Tooltip';
