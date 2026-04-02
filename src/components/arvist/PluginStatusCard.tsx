import React from 'react';
import { useTheme } from '../../theme/index.ts';
import { Card, CardHeader, CardContent } from '../primitives/Card.tsx';

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export interface PluginStatusCardProps {
  pluginId: string;
  name: string;
  version?: string;
  status: ConnectionStatus;
  mqttBroker?: string;
  lastEvent?: string | Date;
  eventsProcessed?: number;
  uptime?: number;
  onReconnect?: () => void;
  style?: React.CSSProperties;
}

const statusConfig: Record<ConnectionStatus, { label: string; color: string; icon: string; dotColor: string }> = {
  connected: { label: 'Connected', color: '#2e7d32', icon: '🟢', dotColor: '#4caf50' },
  disconnected: { label: 'Disconnected', color: '#757575', icon: '⚫', dotColor: '#9e9e9e' },
  connecting: { label: 'Connecting…', color: '#e65100', icon: '🟡', dotColor: '#ffc107' },
  error: { label: 'Error', color: '#c62828', icon: '🔴', dotColor: '#f44336' },
};

export function PluginStatusCard({
  pluginId,
  name,
  version,
  status,
  mqttBroker,
  lastEvent,
  eventsProcessed,
  uptime,
  onReconnect,
  style,
}: PluginStatusCardProps) {
  const theme = useTheme();
  const cfg = statusConfig[status];

  const formatUptime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.sm,
    borderBottom: `1px solid ${theme.colors.divider}`,
  };

  const labelStyle: React.CSSProperties = { color: theme.colors.text.secondary };
  const valueStyle: React.CSSProperties = {
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamilyMono,
    textAlign: 'right',
  };

  const pulseKeyframe = `
    @keyframes arvist-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `;

  return (
    <Card elevation={1} style={style}>
      <style>{pulseKeyframe}</style>
      <CardHeader
        cardTitle={name}
        subheader={version ? `v${version}` : undefined}
        avatar={
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: theme.borderRadius.lg,
              backgroundColor: theme.colors.primary[50],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            🔌
          </div>
        }
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: cfg.dotColor,
                animation: status === 'connecting' ? 'arvist-pulse 1.2s ease-in-out infinite' : undefined,
              }}
            />
            <span
              style={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                color: cfg.color,
              }}
            >
              {cfg.label}
            </span>
          </div>
        }
      />
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={rowStyle}>
            <span style={labelStyle}>Plugin ID</span>
            <span style={valueStyle}>{pluginId}</span>
          </div>
          {mqttBroker && (
            <div style={rowStyle}>
              <span style={labelStyle}>MQTT Broker</span>
              <span style={valueStyle}>{mqttBroker}</span>
            </div>
          )}
          {eventsProcessed !== undefined && (
            <div style={rowStyle}>
              <span style={labelStyle}>Events Processed</span>
              <span style={valueStyle}>{eventsProcessed.toLocaleString()}</span>
            </div>
          )}
          {uptime !== undefined && (
            <div style={rowStyle}>
              <span style={labelStyle}>Uptime</span>
              <span style={valueStyle}>{formatUptime(uptime)}</span>
            </div>
          )}
          {lastEvent && (
            <div style={{ ...rowStyle, borderBottom: 'none' }}>
              <span style={labelStyle}>Last Event</span>
              <span style={valueStyle}>{new Date(lastEvent).toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {status !== 'connected' && onReconnect && (
          <button
            onClick={onReconnect}
            style={{
              marginTop: '12px',
              width: '100%',
              padding: '8px',
              border: `1px solid ${theme.colors.primary[300]}`,
              borderRadius: theme.borderRadius.md,
              backgroundColor: 'transparent',
              color: theme.colors.primary[600],
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize.md,
              fontWeight: theme.typography.fontWeight.medium,
              cursor: 'pointer',
              transition: theme.transitions.fast,
            }}
          >
            Reconnect
          </button>
        )}
      </CardContent>
    </Card>
  );
}

PluginStatusCard.displayName = 'PluginStatusCard';
