"use client";

import type { ReactNode } from "react";
import type { DecorationComponentProps } from "../../../types/decoration";

interface GoldFrameProps extends DecorationComponentProps {
  children?: ReactNode;
}

export function GoldFrame({ color = "#C9A96E", className = "", children }: GoldFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="1" y="1" width="98" height="98" rx="2" stroke={color} strokeWidth="0.8" opacity="0.4" />
        <rect x="4" y="4" width="92" height="92" rx="1" stroke={color} strokeWidth="0.3" opacity="0.2" />
        <path d="M1 8 L8 1" stroke={color} strokeWidth="1.2" opacity="0.6" />
        <path d="M92 1 L99 8" stroke={color} strokeWidth="1.2" opacity="0.6" />
        <path d="M1 92 L8 99" stroke={color} strokeWidth="1.2" opacity="0.6" />
        <path d="M92 99 L99 92" stroke={color} strokeWidth="1.2" opacity="0.6" />
        <ellipse cx="5" cy="5" rx="3" ry="3" stroke={color} strokeWidth="0.6" opacity="0.4" fill="none" />
        <ellipse cx="95" cy="5" rx="3" ry="3" stroke={color} strokeWidth="0.6" opacity="0.4" fill="none" />
        <ellipse cx="5" cy="95" rx="3" ry="3" stroke={color} strokeWidth="0.6" opacity="0.4" fill="none" />
        <ellipse cx="95" cy="95" rx="3" ry="3" stroke={color} strokeWidth="0.6" opacity="0.4" fill="none" />
        <path d="M1 5 L5 1" stroke={color} strokeWidth="0.6" opacity="0.3" />
        <path d="M95 1 L99 5" stroke={color} strokeWidth="0.6" opacity="0.3" />
        <path d="M1 95 L5 99" stroke={color} strokeWidth="0.6" opacity="0.3" />
        <path d="M95 99 L99 95" stroke={color} strokeWidth="0.6" opacity="0.3" />
        <circle cx="5" cy="50" r="1" fill={color} opacity="0.3" />
        <circle cx="95" cy="50" r="1" fill={color} opacity="0.3" />
        <circle cx="50" cy="5" r="1" fill={color} opacity="0.3" />
        <circle cx="50" cy="95" r="1" fill={color} opacity="0.3" />
      </svg>
      {children && <div className="relative">{children}</div>}
    </div>
  );
}
