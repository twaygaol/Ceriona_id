"use client";

interface GorgaOrnamentProps {
  position?: "top" | "bottom" | "left" | "right";
  color?: string;
  size?: number;
}

export function GorgaOrnament({ 
  position = "top", 
  color = "#C8A44D",
  size = 100 
}: GorgaOrnamentProps) {
  const rotations = {
    top: 0,
    right: 90,
    bottom: 180,
    left: 270,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rotations[position]}deg)` }}
    >
      {/* Main Gorga pattern */}
      <path
        d="M50,10 Q30,30 50,50 Q70,30 50,10 Z"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M50,50 Q35,60 50,80 Q65,60 50,50 Z"
        fill={color}
        opacity="0.6"
      />
      
      {/* Decorative lines */}
      <path
        d="M30,40 Q50,45 70,40"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M35,55 Q50,58 65,55"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      
      {/* Center dot */}
      <circle cx="50" cy="50" r="4" fill={color} />
      
      {/* Side ornaments */}
      <circle cx="30" cy="40" r="3" fill={color} opacity="0.7" />
      <circle cx="70" cy="40" r="3" fill={color} opacity="0.7" />
    </svg>
  );
}
