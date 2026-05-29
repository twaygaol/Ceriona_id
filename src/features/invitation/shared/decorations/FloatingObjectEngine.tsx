"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingObjectEngineProps {
  shape?: "circle" | "diamond" | "leaf" | "petal" | "star";
  count?: number;
  color?: string;
  maxSize?: number;
  className?: string;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function CircleShape({ size, fill }: { size: number; fill: string }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={fill} />
    </svg>
  );
}

function DiamondShape({ size, fill }: { size: number; fill: string }) {
  const half = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <polygon points={`${half},0 ${size},${half} ${half},${size} 0,${half}`} fill={fill} />
    </svg>
  );
}

function LeafShape({ size, fill }: { size: number; fill: string }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 22C2 22 12 12 20 2C28 12 38 22 38 22C28 18 20 14 12 18C8 20 2 22 2 22Z"
        fill={fill}
      />
      <path d="M20 2L20 16" stroke={fill} strokeWidth={0.8} />
    </svg>
  );
}

function PetalShape({ size, fill }: { size: number; fill: string }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="13" rx="9" ry="12" fill={fill} opacity={0.7} />
      <path d="M10 1C10 1 14 7 10 13C6 7 10 1 10 1Z" fill={fill} opacity={0.4} />
    </svg>
  );
}

function StarShape({ size, fill }: { size: number; fill: string }) {
  const half = size / 2;
  const tip = size * 0.45;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M${half} 0 L${half + tip * 0.3} ${half - tip * 0.3} L${size} ${half} L${half + tip * 0.3} ${half + tip * 0.3} L${half} ${size} L${half - tip * 0.3} ${half + tip * 0.3} L0 ${half} L${half - tip * 0.3} ${half - tip * 0.3} Z`}
        fill={fill}
      />
    </svg>
  );
}

const shapeComponents: Record<string, React.ComponentType<{ size: number; fill: string }>> = {
  circle: CircleShape,
  diamond: DiamondShape,
  leaf: LeafShape,
  petal: PetalShape,
  star: StarShape,
};

export default function FloatingObjectEngine({
  shape = "petal",
  count = 8,
  color = "#C9A96E",
  maxSize = 24,
  className,
}: FloatingObjectEngineProps) {
  const ShapeComponent = shapeComponents[shape] || shapeComponents.petal;

  const objects = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: randomBetween(2, 98),
        top: randomBetween(5, 85),
        size: randomBetween(4, maxSize),
        delay: randomBetween(0, 6),
        duration: randomBetween(8, 16),
        driftX: randomBetween(-20, 20),
        driftY: randomBetween(15, 40),
        rotation: randomBetween(-15, 15),
        opacity: randomBetween(0.15, 0.45),
      })),
    [count, maxSize]
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {objects.map((obj) => (
        <motion.div
          key={obj.id}
          className="absolute"
          style={{
            left: `${obj.left}%`,
            top: `${obj.top}%`,
            width: obj.size,
            height: shape === "petal" || shape === "leaf" ? undefined : obj.size,
            opacity: obj.opacity,
          }}
          animate={{
            y: [0, -obj.driftY, -obj.driftY * 0.6, 0],
            x: [0, obj.driftX, -obj.driftX * 0.4, 0],
            rotate: [0, obj.rotation, -obj.rotation * 0.5, 0],
          }}
          transition={{
            duration: obj.duration,
            delay: obj.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShapeComponent size={obj.size} fill={color} />
        </motion.div>
      ))}
    </div>
  );
}
