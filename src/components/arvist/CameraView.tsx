import React, { useState } from 'react';
import { useTheme } from '../../theme/index.ts';

export interface CameraViewProps {
  src?: string;
  cameraId?: string;
  label?: string;
  live?: boolean;
  offline?: boolean;
  style?: React.CSSProperties;
  onSnapshot?: () => void;
}

export function CameraView({
  src,
  cameraId,
  label,
  live = false,
  offline = false,
  style,
  onSnapshot,
}: CameraViewProps) {
  const theme = useTheme();
  const [errored, setErrored] = useState(false);

  const pulseKeyframe = `
    @keyframes arvist-live-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: '#000',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '180px',
    ...style,
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  };

  const topBarStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '8px',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
  };

  const bottomBarStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '8px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
  };

  const textStyle = (size = theme.typography.fontSize.sm): React.CSSProperties => ({
    color: '#fff',
    fontFamily: theme.typography.fontFamily,
    fontSize: size,
    fontWeight: theme.typography.fontWeight.medium,
  });

  const showOffline = offline || errored || !src;

  return (
    <div style={containerStyle}>
      <style>{pulseKeyframe}</style>

      {!showOffline && src ? (
        <img
          src={src}
          alt={label ?? cameraId ?? 'Camera feed'}
          onError={() => setErrored(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: theme.colors.grey[500],
          }}
        >
          <span style={{ fontSize: '40px' }}>📷</span>
          <span style={{ fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.sm }}>
            {offline ? 'Camera Offline' : 'No Feed Available'}
          </span>
        </div>
      )}

      <div style={overlayStyle}>
        <div style={topBarStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {live && !offline && !errored && (
              <>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: theme.colors.error[500],
                    animation: 'arvist-live-pulse 1.5s ease-in-out infinite',
                  }}
                />
                <span style={textStyle(theme.typography.fontSize.xs)}>LIVE</span>
              </>
            )}
            {(offline || errored) && (
              <span
                style={{
                  ...textStyle(theme.typography.fontSize.xs),
                  backgroundColor: theme.colors.grey[700],
                  padding: '2px 6px',
                  borderRadius: theme.borderRadius.sm,
                }}
              >
                OFFLINE
              </span>
            )}
          </div>
          {cameraId && (
            <span
              style={{
                ...textStyle(theme.typography.fontSize.xs),
                fontFamily: theme.typography.fontFamilyMono,
                backgroundColor: 'rgba(0,0,0,0.4)',
                padding: '2px 6px',
                borderRadius: theme.borderRadius.sm,
              }}
            >
              {cameraId}
            </span>
          )}
        </div>

        <div style={bottomBarStyle}>
          {label && <span style={textStyle()}>{label}</span>}
          {onSnapshot && !showOffline && (
            <button
              style={{
                pointerEvents: 'all',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                borderRadius: theme.borderRadius.sm,
                color: '#fff',
                cursor: 'pointer',
                padding: '4px 8px',
                fontSize: '12px',
              }}
              onClick={onSnapshot}
            >
              📸
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

CameraView.displayName = 'CameraView';
