"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function FloralDecoration({ color = "#D4A84B", className = "" }: DecorationComponentProps) {
  return (
    <svg
      className={className}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.35">
        {/* Central flower */}
        <circle cx="50" cy="50" r="6" fill={color} />
        <ellipse cx="50" cy="38" rx="4" ry="10" stroke={color} strokeWidth="1" fill="none" transform="rotate(0, 50, 50)" />
        <ellipse cx="50" cy="62" rx="4" ry="10" stroke={color} strokeWidth="1" fill="none" transform="rotate(0, 50, 50)" />
        <ellipse cx="38" cy="50" rx="4" ry="10" stroke={color} strokeWidth="1" fill="none" transform="rotate(90, 50, 50)" />
        <ellipse cx="62" cy="50" rx="4" ry="10" stroke={color} strokeWidth="1" fill="none" transform="rotate(90, 50, 50)" />

        {/* Diagonal petals */}
        <ellipse cx="41" cy="41" rx="4" ry="9" stroke={color} strokeWidth="0.8" fill="none" transform="rotate(45, 50, 50)" />
        <ellipse cx="59" cy="59" rx="4" ry="9" stroke={color} strokeWidth="0.8" fill="none" transform="rotate(45, 50, 50)" />
        <ellipse cx="59" cy="41" rx="4" ry="9" stroke={color} strokeWidth="0.8" fill="none" transform="rotate(-45, 50, 50)" />
        <ellipse cx="41" cy="59" rx="4" ry="9" stroke={color} strokeWidth="0.8" fill="none" transform="rotate(-45, 50, 50)" />

        {/* Outer decorative swirls */}
        <path d="M50 20 C50 15 55 12 58 15 C61 18 58 22 55 22" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M50 80 C50 85 45 88 42 85 C39 82 42 78 45 78" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M20 50 C15 50 12 45 15 42 C18 39 22 42 22 45" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M80 50 C85 50 88 55 85 58 C82 61 78 58 78 55" stroke={color} strokeWidth="0.8" fill="none" />

        {/* Tiny dots around */}
        <circle cx="50" cy="25" r="1.5" fill={color} opacity="0.6" />
        <circle cx="50" cy="75" r="1.5" fill={color} opacity="0.6" />
        <circle cx="25" cy="50" r="1.5" fill={color} opacity="0.6" />
        <circle cx="75" cy="50" r="1.5" fill={color} opacity="0.6" />
      </g>
    </svg>
  );
}
