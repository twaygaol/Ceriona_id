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
  subtle: 3,
  medium: 4,
  heavy: 6,
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingLeaf({
  color = "#8A9E85",
  intensity = "medium",
  className,
}: DecorationComponentProps) {
  const count = countMap[intensity];
  const leaves = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: randomBetween(5, 95),
        top: randomBetween(5, 80),
        delay: randomBetween(0, 3),
        duration: randomBetween(4, 7),
        size: randomBetween(16, 32),
        drift: randomBetween(-30, 30),
        rotation: randomBetween(-20, 20),
        flip: Math.random() > 0.5 ? 1 : -1,
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
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.left}%`,
            top: `${leaf.top}%`,
            width: leaf.size,
            height: leaf.size * 0.6,
          }}
          animate={{
            x: [0, leaf.drift, -leaf.drift * 0.4, leaf.drift * 0.6, 0],
            y: [0, -8, 6, -4, 0],
            rotate: [0, leaf.rotation, -leaf.rotation * 0.6, leaf.rotation * 0.4, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 40 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `scaleX(${leaf.flip})` }}
          >
            <path
              d="M2 22C2 22 12 12 20 2C28 12 38 22 38 22C28 18 20 14 12 18C8 20 2 22 2 22Z"
              fill={color}
              opacity={0.5}
            />
            <path
              d="M20 2L20 16"
              stroke={color}
              strokeWidth={1}
              opacity={0.6}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
