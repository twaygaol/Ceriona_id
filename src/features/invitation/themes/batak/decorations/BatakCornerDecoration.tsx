"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function BatakCornerDecoration({ color = "#D4A84B", className = "" }: DecorationComponentProps) {
  return (
    <svg
      className={className}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        {/* Gorga curved horn */}
        <path
          d="M5 50 C5 20 25 5 50 5 C70 5 85 15 90 30"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Ulos rhombus nested */}
        <path d="M50 15 L70 50 L50 85 L30 50 Z" stroke={color} strokeWidth="1" fill="none" />
        <path d="M50 30 L62 50 L50 70 L38 50 Z" stroke={color} strokeWidth="0.8" fill="none" />
        {/* Cross motif */}
        <line x1="50" y1="15" x2="50" y2="85" stroke={color} strokeWidth="0.6" opacity="0.5" />
        <line x1="30" y1="50" x2="70" y2="50" stroke={color} strokeWidth="0.6" opacity="0.5" />
        {/* Tiny corner hooks */}
        <path d="M50 15 L45 25 L55 25 Z" stroke={color} strokeWidth="0.6" fill={color} opacity="0.4" />
        <path d="M50 85 L45 75 L55 75 Z" stroke={color} strokeWidth="0.6" fill={color} opacity="0.4" />
        <path d="M30 50 L40 45 L40 55 Z" stroke={color} strokeWidth="0.6" fill={color} opacity="0.4" />
        <path d="M70 50 L60 45 L60 55 Z" stroke={color} strokeWidth="0.6" fill={color} opacity="0.4" />
        {/* Decorative dots */}
        <circle cx="50" cy="5" r="1.5" fill={color} opacity="0.5" />
        <circle cx="5" cy="50" r="1.5" fill={color} opacity="0.5" />
      </g>
    </svg>
  );
}
