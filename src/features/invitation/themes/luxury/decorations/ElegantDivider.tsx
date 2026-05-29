"use client";

import type { DecorationComponentProps } from "../../../types/decoration";

export function ElegantDivider({ color = "#C9A96E", className = "" }: DecorationComponentProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <svg className="flex-1 max-w-24" height="12" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 6 C20 2 30 2 40 6 C50 10 60 10 70 6" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M70 6 C75 4 80 4 85 6 C90 8 95 8 100 6" stroke={color} strokeWidth="0.6" fill="none" opacity="0.3" />
      </svg>
      <div className="relative flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1L10 7L7 13L4 7Z" fill={color} opacity="0.8" />
          <path d="M7 3L9 7L7 11L5 7Z" fill={color} opacity="0.4" />
        </svg>
        <div className="absolute w-6 h-px -z-10" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      </div>
      <svg className="flex-1 max-w-24" height="12" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 6 C5 4 10 4 15 6 C20 8 25 8 30 6" stroke={color} strokeWidth="0.6" fill="none" opacity="0.3" />
        <path d="M30 6 C40 2 50 2 60 6 C70 10 80 10 100 6" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}
