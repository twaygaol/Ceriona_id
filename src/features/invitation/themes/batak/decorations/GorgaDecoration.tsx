"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function GorgaDecoration({ color = "#D4A84B", className = "" }: DecorationComponentProps) {
  return (
    <svg
      className={className}
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.25">
        {/* Dragon/serpentine body */}
        <path
          d="M10 60 C20 30 40 20 60 30 C80 40 90 70 110 80 C130 90 150 70 160 50"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Secondary curve */}
        <path
          d="M20 70 C30 50 50 45 65 55 C80 65 85 85 100 90 C115 95 135 80 150 65"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          opacity="0.6"
        />
        {/* Ornamental curls */}
        <path
          d="M55 25 C50 20 52 15 58 16 C62 17 62 22 58 24"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M125 95 C130 100 128 105 122 104 C118 103 118 98 122 96"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        {/* Dots along body */}
        <circle cx="40" cy="40" r="2" fill={color} opacity="0.5" />
        <circle cx="80" cy="65" r="2" fill={color} opacity="0.5" />
        <circle cx="120" cy="85" r="2" fill={color} opacity="0.5" />
        <circle cx="145" cy="60" r="2" fill={color} opacity="0.5" />
        {/* Spiral ornaments */}
        <path
          d="M30 15 C25 10 28 5 33 8 C36 10 34 14 30 13"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M150 105 C155 110 152 115 147 112 C144 110 146 106 150 107"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
        />
      </g>
    </svg>
  );
}
