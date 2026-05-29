"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function BatikDecoration({ color = "#D4A84B", className = "" }: DecorationComponentProps) {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kawung-inspired diamond motif */}
      <g opacity="0.3">
        <path d="M60 10 L90 60 L60 110 L30 60 Z" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M60 20 L80 60 L60 100 L40 60 Z" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="60" cy="60" r="8" fill={color} opacity="0.5" />
        {/* Small corner diamonds */}
        <path d="M30 30 L40 40 L30 50 L20 40 Z" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M90 30 L100 40 L90 50 L80 40 Z" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M30 70 L40 80 L30 90 L20 80 Z" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M90 70 L100 80 L90 90 L80 80 Z" stroke={color} strokeWidth="0.8" fill="none" />
        {/* Parang-like diagonal lines */}
        <path d="M10 10 L30 30" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <path d="M90 90 L110 110" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <path d="M110 10 L90 30" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <path d="M10 110 L30 90" stroke={color} strokeWidth="0.5" opacity="0.4" />
      </g>
    </svg>
  );
}
