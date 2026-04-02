import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../theme/index.ts';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  confidence?: number;
  color?: string;
}

export interface AnnotatedImageProps {
  src: string;
  alt?: string;
  boundingBoxes?: BoundingBox[];
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

export function AnnotatedImage({
  src,
  alt = '',
  boundingBoxes = [],
  style,
  containerStyle,
}: AnnotatedImageProps) {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawAnnotations = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete) return;

    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    const scaleX = img.clientWidth / img.naturalWidth;
    const scaleY = img.clientHeight / img.naturalHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const box of boundingBoxes) {
      const x = box.x * scaleX;
      const y = box.y * scaleY;
      const w = box.width * scaleX;
      const h = box.height * scaleY;
      const color = box.color ?? theme.colors.primary[500];

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      if (box.label) {
        const text = box.confidence !== undefined
          ? `${box.label} ${(box.confidence * 100).toFixed(0)}%`
          : box.label;

        ctx.font = `bold 12px ${theme.typography.fontFamily}`;
        const textWidth = ctx.measureText(text).width;
        const labelH = 18;
        const labelY = y > labelH ? y - labelH : y + h;

        ctx.fillStyle = color;
        ctx.fillRect(x, labelY, textWidth + 8, labelH);
        ctx.fillStyle = '#fff';
        ctx.fillText(text, x + 4, labelY + 13);
      }
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    img.addEventListener('load', drawAnnotations);
    if (img.complete) drawAnnotations();
    return () => img.removeEventListener('load', drawAnnotations);
  });

  useEffect(() => {
    const observer = new ResizeObserver(drawAnnotations);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  });

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block', ...containerStyle }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ display: 'block', width: '100%', height: 'auto', ...style }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

AnnotatedImage.displayName = 'AnnotatedImage';
