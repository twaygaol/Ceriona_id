"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlowerEngineProps {
  color?: string;
  intensity?: "subtle" | "medium" | "heavy";
  position?: "top" | "bottom" | "corners" | "fullscreen";
  className?: string;
}

const sizeMap = {
  subtle: 20,
  medium: 30,
  heavy: 40,
};

function FlowerSVG({ size, fill }: { size: number; fill: string }) {
  const half = size / 2;
  const petal = size * 0.28;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = half + petal * Math.cos(rad);
        const cy = half + petal * Math.sin(rad);
        return (
          <ellipse
            key={angle}
            cx={cx}
            cy={cy}
            rx={petal * 0.45}
            ry={petal * 0.3}
            transform={`rotate(${angle} ${cx} ${cy})`}
            fill={fill}
            opacity={0.55}
          />
        );
      })}
      <circle cx={half} cy={half} r={size * 0.07} fill={fill} />
      {[30, 90, 150, 210, 270, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const lx = half + size * 0.35 * Math.cos(rad);
        const ly = half + size * 0.35 * Math.sin(rad);
        return (
          <ellipse
            key={`leaf-${angle}`}
            cx={lx}
            cy={ly}
            rx={petal * 0.5}
            ry={petal * 0.15}
            transform={`rotate(${angle} ${lx} ${ly})`}
            fill={fill}
            opacity={0.3}
          />
        );
      })}
    </svg>
  );
}

const cornerConfigs = [
  { className: "top-0 left-0", rotation: 0 },
  { className: "top-0 right-0", rotation: 90 },
  { className: "bottom-0 left-0", rotation: -90 },
  { className: "bottom-0 right-0", rotation: 180 },
];

function getCornerSlots(position: string) {
  switch (position) {
    case "top":
      return cornerConfigs.filter((c) => c.className.startsWith("top"));
    case "bottom":
      return cornerConfigs.filter((c) => c.className.startsWith("bottom"));
    case "fullscreen":
      return cornerConfigs;
    default:
      return cornerConfigs;
  }
}

export default function FlowerEngine({
  color = "#C9A96E",
  intensity = "medium",
  position = "corners",
  className,
}: FlowerEngineProps) {
  const size = sizeMap[intensity];
  const corners = useMemo(() => getCornerSlots(position), [position]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {corners.map((corner, i) => (
        <motion.div
          key={corner.className}
          className={cn("absolute", corner.className)}
          style={{ transform: `rotate(${corner.rotation}deg)`, margin: size * 0.25 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
        >
          <FlowerSVG size={size} fill={color} />
        </motion.div>
      ))}
    </div>
  );
}
