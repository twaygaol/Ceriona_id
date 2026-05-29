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
  subtle: 8,
  medium: 12,
  heavy: 15,
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FallingPetals({
  color = "#E8D5B0",
  intensity = "medium",
  className,
}: DecorationComponentProps) {
  const count = countMap[intensity];
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        delay: randomBetween(0, 5),
        duration: randomBetween(6, 12),
        size: randomBetween(6, 14),
        startX: randomBetween(-40, 40),
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
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: -20,
            width: petal.size,
            height: petal.size,
          }}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "100vh",
            x: [0, petal.startX, -petal.startX * 0.5, petal.startX * 0.3, 0],
            rotate: [0, petal.rotation, -petal.rotation * 0.5, petal.rotation * 0.3, 0],
            opacity: [0, 0.8, 0.6, 0.4, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="10" cy="14" rx="9" ry="13" fill={color} opacity={0.7} />
            <path d="M10 1C10 1 14 8 10 14C6 8 10 1 10 1Z" fill={color} opacity={0.5} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
