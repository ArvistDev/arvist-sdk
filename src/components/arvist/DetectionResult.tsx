import React from 'react';
import { useTheme } from '../../theme/index.ts';
import { Card, CardHeader, CardContent } from '../primitives/Card.tsx';

export interface Detection {
  label: string;
  confidence: number;
  boundingBox?: { x: number; y: number; width: number; height: number };
  subLabel?: string;
  attributes?: Record<string, string | number | boolean>;
}

export interface DetectionResultProps {
  detections: Detection[];
  modelVersion?: string;
  inferenceTimeMs?: number;
  frameId?: string;
  style?: React.CSSProperties;
}

export function DetectionResult({
  detections,
  modelVersion,
  inferenceTimeMs,
  frameId,
  style,
}: DetectionResultProps) {
  const theme = useTheme();

  const confidenceColor = (conf: number) => {
    if (conf >= 0.9) return theme.colors.success[600];
    if (conf >= 0.7) return theme.colors.warning[700];
    return theme.colors.error[600];
  };

  const headerMeta = [
    modelVersion && `Model v${modelVersion}`,
    inferenceTimeMs && `${inferenceTimeMs}ms`,
    frameId && `Frame ${frameId}`,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Card variant="outlined" style={style}>
      <CardHeader
        cardTitle="Detection Results"
        subheader={headerMeta || undefined}
        avatar={<span style={{ fontSize: '20px' }}>🎯</span>}
      />
      <CardContent>
        {detections.length === 0 ? (
          <p
            style={{
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.text.secondary,
              textAlign: 'center',
              margin: '16px 0',
            }}
          >
            No detections found
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {detections.map((det, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: theme.colors.grey[50],
                  border: `1px solid ${theme.colors.divider}`,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: theme.typography.fontFamily,
                      fontSize: theme.typography.fontSize.md,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      marginBottom: det.subLabel || det.attributes ? '2px' : 0,
                    }}
                  >
                    {det.label}
                  </div>
                  {det.subLabel && (
                    <div
                      style={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.secondary,
                      }}
                    >
                      {det.subLabel}
                    </div>
                  )}
                  {det.attributes && Object.keys(det.attributes).length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {Object.entries(det.attributes).map(([k, v]) => (
                        <span
                          key={k}
                          style={{
                            fontFamily: theme.typography.fontFamilyMono,
                            fontSize: theme.typography.fontSize.xs,
                            padding: '1px 6px',
                            borderRadius: theme.borderRadius.full,
                            backgroundColor: theme.colors.grey[200],
                            color: theme.colors.text.secondary,
                          }}
                        >
                          {k}: {String(v)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: theme.typography.fontFamilyMono,
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: confidenceColor(det.confidence),
                    flexShrink: 0,
                  }}
                >
                  {(det.confidence * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

DetectionResult.displayName = 'DetectionResult';
