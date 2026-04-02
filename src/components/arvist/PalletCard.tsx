import React from 'react';
import { useTheme } from '../../theme/index.ts';
import { Card, CardHeader, CardContent, CardActions } from '../primitives/Card.tsx';
import { QualityBadge } from './QualityBadge.tsx';
import type { QualityStatus } from './QualityBadge.tsx';

export interface DetectedProduct {
  name: string;
  quantity: number;
  confidence: number;
}

export interface PalletCardProps {
  palletId: string;
  status: QualityStatus;
  scannedAt?: string | Date;
  products?: DetectedProduct[];
  thumbnailUrl?: string;
  cameraId?: string;
  modelVersion?: string;
  anomaliesDetected?: number;
  onViewDetails?: (palletId: string) => void;
  onReprocess?: (palletId: string) => void;
  style?: React.CSSProperties;
}

export function PalletCard({
  palletId,
  status,
  scannedAt,
  products = [],
  thumbnailUrl,
  cameraId,
  modelVersion,
  anomaliesDetected = 0,
  onViewDetails,
  onReprocess,
  style,
}: PalletCardProps) {
  const theme = useTheme();

  const formattedDate = scannedAt
    ? new Date(scannedAt).toLocaleString()
    : undefined;

  const metaStyle: React.CSSProperties = {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  };

  const actionBtnStyle = (primary = false): React.CSSProperties => ({
    padding: '6px 14px',
    border: primary ? 'none' : `1px solid ${theme.colors.grey[300]}`,
    borderRadius: theme.borderRadius.md,
    backgroundColor: primary ? theme.colors.primary[500] : 'transparent',
    color: primary ? '#fff' : theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: 'pointer',
    transition: theme.transitions.fast,
  });

  return (
    <Card elevation={1} style={style}>
      <CardHeader
        title={
          <span style={{ fontFamily: theme.typography.fontFamilyMono, fontSize: theme.typography.fontSize.md }}>
            {palletId}
          </span>
        }
        subheader={formattedDate}
        action={<QualityBadge status={status} />}
        avatar={
          thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={`Pallet ${palletId}`}
              style={{ width: 56, height: 56, borderRadius: theme.borderRadius.md, objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: theme.borderRadius.md,
                backgroundColor: theme.colors.grey[200],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              📦
            </div>
          )
        }
      />
      <CardContent>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {cameraId && (
            <span style={metaStyle}>
              <span>📷</span>
              {cameraId}
            </span>
          )}
          {modelVersion && (
            <span style={metaStyle}>
              <span>🤖</span>
              v{modelVersion}
            </span>
          )}
          {anomaliesDetected > 0 && (
            <span style={{ ...metaStyle, color: theme.colors.error[600] }}>
              <span>⚠</span>
              {anomaliesDetected} anomal{anomaliesDetected === 1 ? 'y' : 'ies'}
            </span>
          )}
        </div>

        {products.length > 0 && (
          <div>
            <div
              style={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.secondary,
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Detected Products ({products.length})
            </div>
            {products.map((product, i) => (
              <div key={i} style={rowStyle}>
                <span
                  style={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.fontSize.md,
                    color: theme.colors.text.primary,
                  }}
                >
                  {product.name}
                </span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: theme.typography.fontFamily,
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    ×{product.quantity}
                  </span>
                  <ConfidenceBar value={product.confidence} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {(onViewDetails || onReprocess) && (
        <CardActions>
          {onReprocess && (
            <button style={actionBtnStyle(false)} onClick={() => onReprocess(palletId)}>
              Reprocess
            </button>
          )}
          {onViewDetails && (
            <button style={actionBtnStyle(true)} onClick={() => onViewDetails(palletId)}>
              View Details
            </button>
          )}
        </CardActions>
      )}
    </Card>
  );
}

PalletCard.displayName = 'PalletCard';

function ConfidenceBar({ value }: { value: number }) {
  const theme = useTheme();
  const pct = Math.round(value * 100);
  const color =
    pct >= 90 ? theme.colors.success[500] : pct >= 70 ? theme.colors.warning[600] : theme.colors.error[500];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div
        style={{
          width: '48px',
          height: '4px',
          backgroundColor: theme.colors.grey[200],
          borderRadius: theme.borderRadius.full,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: theme.borderRadius.full,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: theme.typography.fontFamilyMono,
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.text.secondary,
          minWidth: '30px',
        }}
      >
        {pct}%
      </span>
    </div>
  );
}
