"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DecorationComponentProps {
  color?: string;
  intensity?: "subtle" | "medium" | "heavy";
  className?: string;
}

const countMap = {
  subtle: 5,
  medium: 7,
  heavy: 10,
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function SparkleSVG({ size, fill }: { size: number; fill: string }) {
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

export default function Sparkle({
  color = "#C9A96E",
  intensity = "medium",
  className,
}: DecorationComponentProps) {
  const count = countMap[intensity];
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: randomBetween(5, 95),
        top: randomBetween(5, 90),
        size: randomBetween(8, 18),
        delay: randomBetween(0, 4),
        duration: randomBetween(1.5, 3.5),
        scale: randomBetween(0.5, 1.2),
        rotation: randomBetween(0, 360),
      })),
    [count]
  );

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50 overflow-hidden",
        className
      )}
    >
      {sparkles.map((s) => (
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
            opacity: [0, 1, 0.3, 1, 0],
            scale: [0.3, s.scale, 0.6, s.scale, 0.3],
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
      ))}
    </div>
  );
}
