"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function CalligraphyDecoration({ color = "#D4A84B", className = "" }: DecorationComponentProps) {
  return (
    <svg
      className={className}
      width="160"
      height="80"
      viewBox="0 0 160 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.25">
        <path
          d="M20 40 C30 20 50 10 70 20 C90 30 100 50 110 45 C120 40 130 25 140 35"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M15 45 C25 30 45 15 65 25 C85 35 95 55 105 50 C115 45 125 30 135 40"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M10 50 C20 35 40 20 60 30 C80 40 90 60 100 55 C110 50 120 35 130 45"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
        <circle cx="30" cy="35" r="2.5" fill={color} opacity="0.5" />
        <circle cx="60" cy="25" r="2" fill={color} opacity="0.4" />
        <circle cx="90" cy="50" r="2.5" fill={color} opacity="0.5" />
        <circle cx="120" cy="32" r="2" fill={color} opacity="0.4" />
        <circle cx="145" cy="42" r="1.8" fill={color} opacity="0.3" />
      </g>
    </svg>
  );
}
