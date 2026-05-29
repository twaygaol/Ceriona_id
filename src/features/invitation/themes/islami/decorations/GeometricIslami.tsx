"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function GeometricIslami({ color = "#D4A84B", className = "" }: DecorationComponentProps) {
  return (
    <svg
      className={className}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.2">
        {/* 8-pointed star */}
        <polygon
          points="100,10 123,55 172,55 137,88 152,138 100,110 48,138 63,88 28,55 77,55"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner 8-pointed star */}
        <polygon
          points="100,35 115,65 148,65 127,85 136,120 100,100 64,120 73,85 52,65 85,65"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        {/* Outer circumscribed circle */}
        <circle cx="100" cy="100" r="85" stroke={color} strokeWidth="0.8" fill="none" />
        {/* Inner circles */}
        <circle cx="100" cy="100" r="60" stroke={color} strokeWidth="0.6" fill="none" opacity="0.5" />
        <circle cx="100" cy="100" r="40" stroke={color} strokeWidth="0.5" fill="none" opacity="0.4" />
        {/* Intersecting arcs */}
        <path d="M40 100 A60 60 0 0 1 160 100" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M100 40 A60 60 0 0 1 100 160" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M58 58 A60 60 0 0 1 142 142" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M142 58 A60 60 0 0 1 58 142" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
        {/* Corner 8-pointed stars */}
        <polygon
          points="30,15 38,33 56,33 43,43 48,62 30,50 12,62 17,43 4,33 22,33"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        <polygon
          points="170,15 178,33 196,33 183,43 188,62 170,50 152,62 157,43 144,33 162,33"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        <polygon
          points="30,145 38,163 56,163 43,173 48,192 30,180 12,192 17,173 4,163 22,163"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        <polygon
          points="170,145 178,163 196,163 183,173 188,192 170,180 152,192 157,173 144,163 162,163"
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        {/* Small diamond accents */}
        <polygon points="100,25 106,35 100,45 94,35" fill={color} opacity="0.4" />
        <polygon points="100,155 106,165 100,175 94,165" fill={color} opacity="0.4" />
        <polygon points="25,100 35,106 25,112 15,106" fill={color} opacity="0.4" />
        <polygon points="175,100 185,106 175,112 165,106" fill={color} opacity="0.4" />
      </g>
    </svg>
  );
}
