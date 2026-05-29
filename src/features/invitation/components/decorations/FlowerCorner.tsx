"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface DecorationComponentProps {
  color?: string;
  intensity?: "subtle" | "medium" | "heavy";
  className?: string;
}

const sizeMap = {
  subtle: 24,
  medium: 32,
  heavy: 48,
};

function FlowerSVG({ size, fill }: { size: number; fill: string }) {
  const half = size / 2;
  const petal = size * 0.3;
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
            rx={petal * 0.5}
            ry={petal * 0.35}
            transform={`rotate(${angle} ${cx} ${cy})`}
            fill={fill}
            opacity={0.6}
          />
        );
      })}
      <circle cx={half} cy={half} r={size * 0.08} fill={fill} />
    </svg>
  );
}

const cornerClasses = [
  "top-0 left-0",
  "top-0 right-0",
  "bottom-0 left-0",
  "bottom-0 right-0",
];

const cornerRotations = [0, 90, -90, 180];

export default function FlowerCorner({
  color = "#C9A96E",
  intensity = "medium",
  className,
}: DecorationComponentProps) {
  const size = sizeMap[intensity];
  const flowers = useMemo(
    () =>
      cornerClasses.map((pos, i) => (
        <div
          key={pos}
          className={cn("absolute", pos, className)}
          style={{ transform: `rotate(${cornerRotations[i]}deg)` }}
        >
          <FlowerSVG size={size} fill={color} />
        </div>
      )),
    [size, color, className]
  );

  return <>{flowers}</>;
}
