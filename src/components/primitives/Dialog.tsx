import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../theme/index.ts';

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fullWidth?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const maxWidthMap = { sm: '444px', md: '600px', lg: '900px', xl: '1200px', full: '100%' };

export function Dialog({ open, onClose, maxWidth = 'md', fullWidth, children, style }: DialogProps) {
  const theme = useTheme();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    if (open) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: theme.colors.overlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.modal,
    padding: '16px',
  };

  const paperStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.xl,
    maxWidth: maxWidthMap[maxWidth],
    width: fullWidth || maxWidth === 'full' ? '100%' : undefined,
    maxHeight: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    ...style,
  };

  return (
    <div
      ref={backdropRef}
      style={backdropStyle}
      onClick={(e) => {
        if (e.target === backdropRef.current && onClose) onClose();
      }}
      role="presentation"
    >
      <div role="dialog" aria-modal="true" style={paperStyle}>
        {children}
      </div>
    </div>
  );
}

Dialog.displayName = 'Dialog';

export interface DialogTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export function DialogTitle({ onClose, style, children, ...rest }: DialogTitleProps) {
  const theme = useTheme();

  const titleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: `1px solid ${theme.colors.divider}`,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    flexShrink: 0,
    ...style,
  };

  return (
    <div style={titleStyle} {...rest}>
      <span>{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: theme.colors.text.secondary,
            lineHeight: 1,
            padding: '4px',
          }}
          aria-label="Close dialog"
        >
          ✕
        </button>
      )}
    </div>
  );
}

DialogTitle.displayName = 'DialogTitle';

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  dividers?: boolean;
}

export function DialogContent({ dividers, style, children, ...rest }: DialogContentProps) {
  const theme = useTheme();

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 24px',
    borderTop: dividers ? `1px solid ${theme.colors.divider}` : undefined,
    borderBottom: dividers ? `1px solid ${theme.colors.divider}` : undefined,
    ...style,
  };

  return (
    <div style={contentStyle} {...rest}>
      {children}
    </div>
  );
}

DialogContent.displayName = 'DialogContent';

export type DialogActionsProps = React.HTMLAttributes<HTMLDivElement>;

export function DialogActions({ style, children, ...rest }: DialogActionsProps) {
  const theme = useTheme();

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
    padding: '12px 24px',
    borderTop: `1px solid ${theme.colors.divider}`,
    flexShrink: 0,
    ...style,
  };

  return (
    <div style={actionsStyle} {...rest}>
      {children}
    </div>
  );
}

DialogActions.displayName = 'DialogActions';
