"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${2 + Math.random() * 4}px`,
  delay: `${Math.random() * 4}s`,
  duration: `${2 + Math.random() * 3}s`,
}));

export function SparkleEffect({ color = "#C9A96E", className = "" }: DecorationComponentProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <style>{`
        @keyframes shimmer-${color.replace("#", "")} {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.8; transform: scale(1); box-shadow: 0 0 6px ${color}, 0 0 12px ${color}44; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: color,
            animation: `shimmer-${color.replace("#", "")} ${p.duration} ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
