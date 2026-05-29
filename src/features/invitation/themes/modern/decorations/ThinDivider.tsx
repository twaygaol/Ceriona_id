"use client";

export function ThinDivider({ color = "#C9A96E", className = "" }: { color?: string; className?: string }) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: "0.5px",
        background: color,
      }}
    />
  );
}
