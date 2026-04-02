import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../theme/index.ts';
import { Card, CardHeader, CardContent } from '../primitives/Card.tsx';

export type EventSeverity = 'info' | 'warning' | 'error' | 'success';

export interface MqttEvent {
  id: string;
  topic: string;
  timestamp: string | Date;
  severity?: EventSeverity;
  summary?: string;
  payload?: Record<string, unknown>;
}

export interface EventFeedProps {
  events: MqttEvent[];
  maxHeight?: number | string;
  autoScroll?: boolean;
  onEventClick?: (event: MqttEvent) => void;
  style?: React.CSSProperties;
}

const severityConfig: Record<EventSeverity, { color: string; icon: string; bg: string }> = {
  info: { color: '#1565c0', icon: 'ℹ', bg: '#e3f2fd' },
  warning: { color: '#e65100', icon: '⚠', bg: '#fff3e0' },
  error: { color: '#c62828', icon: '✕', bg: '#ffebee' },
  success: { color: '#2e7d32', icon: '✓', bg: '#e8f5e9' },
};

export function EventFeed({
  events,
  maxHeight = 400,
  autoScroll = true,
  onEventClick,
  style,
}: EventFeedProps) {
  const theme = useTheme();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [events, autoScroll]);

  const listStyle: React.CSSProperties = {
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  return (
    <Card variant="outlined" style={style}>
      <CardHeader
        cardTitle="Event Feed"
        subheader={`${events.length} event${events.length !== 1 ? 's' : ''}`}
        avatar={<span style={{ fontSize: '20px' }}>📡</span>}
      />
      <CardContent>
        <div style={listStyle}>
          {events.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize.sm,
                padding: '24px',
              }}
            >
              Waiting for events…
            </div>
          )}
          {events.map((evt) => {
            const cfg = severityConfig[evt.severity ?? 'info'];
            return (
              <div
                key={evt.id}
                onClick={() => onEventClick?.(evt)}
                style={{
                  display: 'flex',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: cfg.bg,
                  border: `1px solid transparent`,
                  cursor: onEventClick ? 'pointer' : 'default',
                  transition: theme.transitions.fast,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: cfg.color,
                    fontWeight: theme.typography.fontWeight.bold,
                    fontSize: '13px',
                    marginTop: '1px',
                  }}
                >
                  {cfg.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: theme.typography.fontFamilyMono,
                      fontSize: theme.typography.fontSize.sm,
                      color: cfg.color,
                      fontWeight: theme.typography.fontWeight.medium,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {evt.topic}
                  </div>
                  {evt.summary && (
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
                      {evt.summary}
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: theme.typography.fontFamilyMono,
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.text.secondary,
                    flexShrink: 0,
                    alignSelf: 'flex-start',
                    marginTop: '2px',
                  }}
                >
                  {new Date(evt.timestamp).toLocaleTimeString()}
                </span>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </CardContent>
    </Card>
  );
}

EventFeed.displayName = 'EventFeed';
