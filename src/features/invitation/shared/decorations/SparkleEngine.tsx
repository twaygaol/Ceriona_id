"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparkleEngineProps {
  color?: string;
  intensity?: "subtle" | "medium" | "heavy";
  position?: "top" | "bottom" | "corners" | "fullscreen";
  className?: string;
}

const countMap = {
  subtle: 10,
  medium: 15,
  heavy: 20,
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function DiamondSVG({ size, fill }: { size: number; fill: string }) {
  const half = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M${half} 0 L${size * 0.72} ${half} L${half} ${size} L${size * 0.28} ${half} Z`}
        fill={fill}
      />
    </svg>
  );
}

function StarSVG({ size, fill }: { size: number; fill: string }) {
  const half = size / 2;
  const tip = size * 0.45;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M${half} 0 L${half + tip * 0.3} ${half - tip * 0.3} L${size} ${half} L${half + tip * 0.3} ${half + tip * 0.3} L${half} ${size} L${half - tip * 0.3} ${half + tip * 0.3} L0 ${half} L${half - tip * 0.3} ${half - tip * 0.3} Z`}
        fill={fill}
      />
    </svg>
  );
}

function positionConstraint(pos: string): { leftMin: number; leftMax: number; topMin: number; topMax: number } {
  switch (pos) {
    case "top":
      return { leftMin: 5, leftMax: 95, topMin: 2, topMax: 30 };
    case "bottom":
      return { leftMin: 5, leftMax: 95, topMin: 70, topMax: 95 };
    case "fullscreen":
      return { leftMin: 2, leftMax: 98, topMin: 2, topMax: 95 };
    default:
      return { leftMin: 5, leftMax: 95, topMin: 5, topMax: 90 };
  }
}

export default function SparkleEngine({
  color = "#C9A96E",
  intensity = "medium",
  position = "fullscreen",
  className,
}: SparkleEngineProps) {
  const count = countMap[intensity];
  const region = useMemo(() => positionConstraint(position), [position]);
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: randomBetween(region.leftMin, region.leftMax),
        top: randomBetween(region.topMin, region.topMax),
        size: randomBetween(6, 16),
        delay: randomBetween(0, 5),
        duration: randomBetween(1.5, 3.5),
        scale: randomBetween(0.4, 1.2),
        rotation: randomBetween(0, 360),
        isDiamond: Math.random() > 0.5,
      })),
    [count, region]
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {sparkles.map((s) => {
        const SparkleSVG = s.isDiamond ? DiamondSVG : StarSVG;
        return (
          <motion.div
            key={s.id}
            className="absolute"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              rotate: `${s.rotation}deg`,
            }}
            animate={{
              opacity: [0, 1, 0.2, 0.8, 0],
              scale: [0.2, s.scale, 0.5, s.scale, 0.2],
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <SparkleSVG size={s.size} fill={color} />
          </motion.div>
        );
      })}
    </div>
  );
}
