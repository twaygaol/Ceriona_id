"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PatternEngineProps {
  pattern?: "geometric" | "batik" | "ulos" | "arabesque" | "dots" | "lines";
  color?: string;
  opacity?: number;
  className?: string;
}

function GeometricPattern({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="transparent" />
      <polygon points="30,5 55,30 30,55 5,30" fill={color} opacity={0.1} />
      <polygon points="30,15 45,30 30,45 15,30" fill={color} opacity={0.07} />
      <circle cx="30" cy="30" r="8" fill={color} opacity={0.12} />
      <circle cx="0" cy="0" r="4" fill={color} opacity={0.08} />
      <circle cx="60" cy="60" r="4" fill={color} opacity={0.08} />
      <circle cx="60" cy="0" r="4" fill={color} opacity={0.08} />
      <circle cx="0" cy="60" r="4" fill={color} opacity={0.08} />
    </pattern>
  );
}

function BatikPattern({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="transparent" />
      <rect x="14" y="14" width="12" height="12" rx="2" fill={color} opacity={0.08} transform="rotate(45 20 20)" />
      <circle cx="20" cy="20" r="3" fill={color} opacity={0.12} />
      <circle cx="0" cy="0" r="2" fill={color} opacity={0.06} />
      <circle cx="40" cy="40" r="2" fill={color} opacity={0.06} />
      <circle cx="40" cy="0" r="2" fill={color} opacity={0.06} />
      <circle cx="0" cy="40" r="2" fill={color} opacity={0.06} />
      <circle cx="20" cy="0" r="1.5" fill={color} opacity={0.05} />
      <circle cx="20" cy="40" r="1.5" fill={color} opacity={0.05} />
      <circle cx="0" cy="20" r="1.5" fill={color} opacity={0.05} />
      <circle cx="40" cy="20" r="1.5" fill={color} opacity={0.05} />
    </pattern>
  );
}

function UlosPattern({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
      <rect width="48" height="48" fill="transparent" />
      <rect x="18" y="18" width="12" height="12" rx="2" fill={color} opacity={0.08} transform="rotate(45 24 24)" />
      <rect x="18" y="18" width="12" height="12" rx="2" fill={color} opacity={0.05} transform="rotate(-45 24 24)" />
      <rect x="2" y="2" width="8" height="8" rx="1" fill={color} opacity={0.06} transform="rotate(45 6 6)" />
      <rect x="38" y="38" width="8" height="8" rx="1" fill={color} opacity={0.06} transform="rotate(45 42 42)" />
      <rect x="38" y="2" width="8" height="8" rx="1" fill={color} opacity={0.06} transform="rotate(45 42 6)" />
      <rect x="2" y="38" width="8" height="8" rx="1" fill={color} opacity={0.06} transform="rotate(45 6 42)" />
      <line x1="24" y1="0" x2="24" y2="48" stroke={color} strokeWidth="0.5" opacity={0.04} />
      <line x1="0" y1="24" x2="48" y2="24" stroke={color} strokeWidth="0.5" opacity={0.04} />
    </pattern>
  );
}

function ArabesquePattern({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
      <rect width="50" height="50" fill="transparent" />
      <path d="M0 25 Q12.5 5 25 25 Q37.5 45 50 25" fill="none" stroke={color} strokeWidth="1" opacity={0.08} />
      <path d="M0 35 Q12.5 15 25 35 Q37.5 55 50 35" fill="none" stroke={color} strokeWidth="0.5" opacity={0.05} />
      <path d="M0 15 Q12.5 -5 25 15 Q37.5 35 50 15" fill="none" stroke={color} strokeWidth="0.5" opacity={0.05} />
      <circle cx="25" cy="25" r="2" fill={color} opacity={0.1} />
      <circle cx="0" cy="25" r="1.5" fill={color} opacity={0.06} />
      <circle cx="50" cy="25" r="1.5" fill={color} opacity={0.06} />
    </pattern>
  );
}

function DotsPattern({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="transparent" />
      <circle cx="10" cy="10" r="1.5" fill={color} opacity={0.12} />
      <circle cx="0" cy="0" r="1" fill={color} opacity={0.06} />
      <circle cx="20" cy="20" r="1" fill={color} opacity={0.06} />
      <circle cx="20" cy="0" r="1" fill={color} opacity={0.06} />
      <circle cx="0" cy="20" r="1" fill={color} opacity={0.06} />
    </pattern>
  );
}

function LinesPattern({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
      <rect width="30" height="30" fill="transparent" />
      <line x1="0" y1="5" x2="30" y2="5" stroke={color} strokeWidth="0.5" opacity={0.08} />
      <line x1="0" y1="15" x2="30" y2="15" stroke={color} strokeWidth="0.5" opacity={0.08} />
      <line x1="0" y1="25" x2="30" y2="25" stroke={color} strokeWidth="0.5" opacity={0.08} />
      <line x1="5" y1="0" x2="5" y2="30" stroke={color} strokeWidth="0.5" opacity={0.04} />
      <line x1="15" y1="0" x2="15" y2="30" stroke={color} strokeWidth="0.5" opacity={0.04} />
      <line x1="25" y1="0" x2="25" y2="30" stroke={color} strokeWidth="0.5" opacity={0.04} />
    </pattern>
  );
}

const patternComponents: Record<string, React.ComponentType<{ color: string; id: string }>> = {
  geometric: GeometricPattern,
  batik: BatikPattern,
  ulos: UlosPattern,
  arabesque: ArabesquePattern,
  dots: DotsPattern,
  lines: LinesPattern,
};

export default function PatternEngine({
  pattern = "geometric",
  color = "#C9A96E",
  opacity = 0.15,
  className,
}: PatternEngineProps) {
  const patternId = useMemo(() => `pattern-${pattern}-${Math.random().toString(36).slice(2, 8)}`, [pattern]);

  const PatternComponent = patternComponents[pattern];
  if (!PatternComponent) return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <PatternComponent color={color} id={patternId} />
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
