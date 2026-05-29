"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function LanternDecoration({ color = "#D4A84B", className = "" }: DecorationComponentProps) {
  return (
    <svg
      className={className}
      width="80"
      height="120"
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.35">
        {/* Chain/hook */}
        <line x1="40" y1="2" x2="40" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* Top cap */}
        <path d="M28 16 L52 16 L48 22 L32 22 Z" fill={color} opacity="0.5" />
        <path d="M32 22 L48 22 L44 28 L36 28 Z" fill={color} opacity="0.3" />
        {/* Lantern body - mosque lantern shape */}
        <path
          d="M36 28 C28 30 22 36 22 44 C22 52 26 56 28 60 C30 64 30 70 28 76 C26 80 22 84 22 88 C22 96 28 104 36 106 L44 106 C52 104 58 96 58 88 C58 84 54 80 52 76 C50 70 50 64 52 60 C54 56 58 52 58 44 C58 36 52 30 44 28 Z"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner glow */}
        <ellipse cx="40" cy="62" rx="8" ry="16" fill={color} opacity="0.15" />
        <ellipse cx="40" cy="62" rx="4" ry="10" fill={color} opacity="0.25" />
        {/* Candle glow effect */}
        <circle cx="40" cy="65" r="3" fill={color} opacity="0.4" />
        {/* Glass lines */}
        <line x1="28" y1="44" x2="52" y2="44" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <line x1="26" y1="52" x2="54" y2="52" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <line x1="26" y1="88" x2="54" y2="88" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <line x1="28" y1="96" x2="52" y2="96" stroke={color} strokeWidth="0.5" opacity="0.4" />
        {/* Waist */}
        <path d="M34 56 L46 56 L44 60 L36 60 Z" fill={color} opacity="0.3" />
        <path d="M34 78 L46 78 L44 74 L36 74 Z" fill={color} opacity="0.3" />
        {/* Bottom cap */}
        <path d="M34 106 L46 106 L44 112 L36 112 Z" fill={color} opacity="0.3" />
        <path d="M32 112 L48 112 L46 116 L34 116 Z" fill={color} opacity="0.5" />
        {/* Base tassel */}
        <line x1="40" y1="116" x2="40" y2="120" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <circle cx="40" cy="118" r="1.5" fill={color} opacity="0.6" />
      </g>
    </svg>
  );
}
