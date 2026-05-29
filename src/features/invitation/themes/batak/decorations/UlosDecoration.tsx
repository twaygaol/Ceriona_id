"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function UlosDecoration({ color = "#D4A84B", className = "" }: DecorationComponentProps) {
  return (
    <svg
      className={className}
      width="140"
      height="140"
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        {/* Central rhombus */}
        <path d="M70 15 L105 70 L70 125 L35 70 Z" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M70 30 L92 70 L70 110 L48 70 Z" stroke={color} strokeWidth="1" fill="none" />
        {/* Cross patterns inside */}
        <line x1="70" y1="15" x2="70" y2="125" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="35" y1="70" x2="105" y2="70" stroke={color} strokeWidth="0.8" opacity="0.5" />
        {/* Hook shapes */}
        <path d="M70 15 L60 30 L80 30 Z" stroke={color} strokeWidth="0.8" fill={color} opacity="0.4" />
        <path d="M70 125 L60 110 L80 110 Z" stroke={color} strokeWidth="0.8" fill={color} opacity="0.4" />
        <path d="M35 70 L50 60 L50 80 Z" stroke={color} strokeWidth="0.8" fill={color} opacity="0.4" />
        <path d="M105 70 L90 60 L90 80 Z" stroke={color} strokeWidth="0.8" fill={color} opacity="0.4" />
        {/* Corner rhombi */}
        <path d="M20 20 L30 30 L20 40 L10 30 Z" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M120 20 L130 30 L120 40 L110 30 Z" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M20 100 L30 110 L20 120 L10 110 Z" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M120 100 L130 110 L120 120 L110 110 Z" stroke={color} strokeWidth="0.8" fill="none" />
        {/* Horizontal border lines */}
        <line x1="15" y1="15" x2="125" y2="15" stroke={color} strokeWidth="0.5" opacity="0.3" />
        <line x1="15" y1="125" x2="125" y2="125" stroke={color} strokeWidth="0.5" opacity="0.3" />
      </g>
    </svg>
  );
}
