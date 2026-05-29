"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function GununganDecoration({ color = "#8B6914", className = "" }: DecorationComponentProps) {
  return (
    <svg
      className={className}
      width="160"
      height="200"
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.25">
        {/* Gunungan tree of life silhouette */}
        <path
          d="M80 5 C60 30 30 50 25 80 C20 110 30 130 40 140 L50 150 C55 160 60 170 65 180 L70 195 L90 195 L95 180 C100 170 105 160 110 150 L120 140 C130 130 140 110 135 80 C130 50 100 30 80 5Z"
          fill={color}
        />
        {/* Ornate details */}
        <path
          d="M80 20 C65 40 45 55 42 75 C39 95 45 110 55 120"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M80 20 C95 40 115 55 118 75 C121 95 115 110 105 120"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        {/* Curved wings */}
        <path
          d="M25 80 C15 70 10 55 15 40 C20 25 35 20 45 30"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M135 80 C145 70 150 55 145 40 C140 25 125 20 115 30"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        {/* Center ornament */}
        <ellipse cx="80" cy="85" rx="12" ry="18" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      </g>
    </svg>
  );
}
