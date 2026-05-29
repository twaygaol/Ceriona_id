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
  subtle: 2,
  medium: 3,
  heavy: 4,
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function ButterflySVG({ size, fill }: { size: number; fill: string }) {
  const s = size / 20;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 20C20 20 10 10 6 14C2 18 8 24 20 20Z"
        fill={fill}
        opacity={0.7}
      />
      <path
        d="M20 20C20 20 30 10 34 14C38 18 32 24 20 20Z"
        fill={fill}
        opacity={0.7}
      />
      <path
        d="M20 20C20 20 12 28 14 32C16 36 22 32 20 20Z"
        fill={fill}
        opacity={0.6}
      />
      <path
        d="M20 20C20 20 28 28 26 32C24 36 18 32 20 20Z"
        fill={fill}
        opacity={0.6}
      />
      <line x1="20" y1="20" x2="20" y2="36" stroke={fill} strokeWidth={1.5} opacity={0.5} />
      <circle cx="20" cy="18" r="1.5" fill={fill} />
    </svg>
  );
}

export default function Butterfly({
  color = "#D4A5A0",
  intensity = "medium",
  className,
}: DecorationComponentProps) {
  const count = countMap[intensity];
  const butterflies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const startSide = i % 2 === 0 ? "left" : "right";
        return {
          id: i,
          startX: startSide === "left" ? -10 : 110,
          startY: randomBetween(10, 80),
          endX: startSide === "left" ? 110 : -10,
          endY: randomBetween(10, 80),
          delay: randomBetween(0, 6),
          duration: randomBetween(10, 18),
          size: randomBetween(14, 26),
          midX: randomBetween(20, 80),
          midY: randomBetween(5, 90),
        };
      }),
    [count]
  );

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50 overflow-hidden",
        className
      )}
    >
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ width: b.size, height: b.size }}
          initial={{
            x: `${b.startX}vw`,
            y: `${b.startY}vh`,
            opacity: 0,
            scale: 0.6,
          }}
          animate={{
            x: [
              `${b.startX}vw`,
              `${b.midX}vw`,
              `${b.endX}vw`,
            ],
            y: [
              `${b.startY}vh`,
              `${b.midY}vh`,
              `${b.endY}vh`,
            ],
            opacity: [0, 1, 1, 1, 0],
            scale: [0.6, 1, 1, 1, 0.6],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{ rotateY: [0, 60, 0, -60, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ButterflySVG size={b.size} fill={color} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
