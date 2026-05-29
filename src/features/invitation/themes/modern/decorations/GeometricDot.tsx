"use client";

export function GeometricDot({ color = "#C9A96E", size = 6, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <div
      className={`inline-block rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
      }}
    />
  );
}
