"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { DecorationId, DecorationConfig } from "../../types";
import FlowerEngine from "./FlowerEngine";
import SparkleEngine from "./SparkleEngine";
import PatternEngine from "./PatternEngine";
import FloatingObjectEngine from "./FloatingObjectEngine";

interface DecorationItem {
  id: DecorationId;
  intensity?: "subtle" | "medium" | "heavy";
  color?: string;
  position?: "top" | "bottom" | "corners" | "fullscreen";
  pattern?: "geometric" | "batik" | "ulos" | "arabesque" | "dots" | "lines";
}

interface DecorationEngineProps {
  decorations: DecorationItem[];
  colors?: Record<string, string>;
}

function GoldFrame() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="calc(100% - 16)" height="calc(100% - 16)" rx="12"
        fill="none" stroke="#C9A96E" strokeWidth="1" opacity={0.3} />
      <rect x="16" y="16" width="calc(100% - 32)" height="calc(100% - 32)" rx="8"
        fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity={0.15} />
    </svg>
  );
}

function MinimalLine({ color }: { color?: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <svg width="120" height="2" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="1" x2="120" y2="1" stroke={color || "#C9A96E"} strokeWidth="0.5" opacity={0.4} />
      </svg>
    </div>
  );
}

const decorationRenderers: Record<string, React.ComponentType<any>> = {
  "flower-engine": FlowerEngine,
  "sparkle-engine": SparkleEngine,
  "floating-object-engine": FloatingObjectEngine,
};

const patternTypeMap: Record<string, "geometric" | "batik" | "ulos" | "arabesque" | "dots" | "lines"> = {
  "batik-pattern": "batik",
  "gunungan": "geometric",
  "ulos-pattern": "ulos",
  "gorga-carving": "arabesque",
  "geometric-star": "geometric",
};

function renderDecoration(dec: DecorationItem, colors?: Record<string, string>) {
  const color = dec.color || colors?.accent || colors?.primary || "#C9A96E";
  const intensity = dec.intensity || "medium";

  if (dec.id === "none") return null;

  if (dec.id === "gold-frame") {
    return <GoldFrame key={dec.id} />;
  }

  if (dec.id === "minimal-line") {
    return <MinimalLine key={dec.id} color={color} />;
  }

  if (dec.id === "pattern-engine" || patternTypeMap[dec.id]) {
    const pattern = dec.pattern || patternTypeMap[dec.id] || "geometric";
    return <PatternEngine key={dec.id} pattern={pattern} color={color} />;
  }

  const Component = decorationRenderers[dec.id];
  if (!Component) return null;

  return (
    <Component
      key={dec.id}
      color={color}
      intensity={intensity}
      position={dec.position}
    />
  );
}

export default function DecorationEngine({
  decorations,
  colors,
}: DecorationEngineProps) {
  const items = useMemo(
    () => decorations.filter((d) => d.id !== "none"),
    [decorations]
  );

  if (items.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {items.map((dec) => renderDecoration(dec, colors))}
    </div>
  );
}
