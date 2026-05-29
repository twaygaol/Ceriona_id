"use client";

export function MinimalLine({ color = "#C9A96E", className = "" }: { color?: string; className?: string }) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: "1px",
        background: color,
      }}
    />
  );
}
