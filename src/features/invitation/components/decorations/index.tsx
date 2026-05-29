"use client";

import type { DecorationKey } from "../../types/template";
import type { DecorationComponentProps, DecorationDefinition } from "./types";
import FlowerCorner from "./FlowerCorner";
import FallingPetals from "./FallingPetals";
import FloatingLeaf from "./FloatingLeaf";
import Butterfly from "./Butterfly";
import Sparkle from "./Sparkle";
import Ornament from "./Ornament";

const registry: [string, DecorationDefinition][] = [
  ["flower-corner", { key: "flower-corner", label: "Flower Corner", component: FlowerCorner, configurable: true }],
  ["falling-petals", { key: "falling-petals", label: "Falling Petals", component: FallingPetals, configurable: true }],
  ["floating-leaf", { key: "floating-leaf", label: "Floating Leaf", component: FloatingLeaf, configurable: true }],
  ["butterfly", { key: "butterfly", label: "Butterfly", component: Butterfly, configurable: true }],
  ["sparkle", { key: "sparkle", label: "Sparkle", component: Sparkle, configurable: true }],
  ["ornament", { key: "ornament", label: "Ornament", component: Ornament, configurable: true }],
];

export const decorationRegistry = new Map<string, DecorationDefinition>(registry);

export function getDecoration(key: string): DecorationDefinition | null {
  return decorationRegistry.get(key) ?? null;
}

interface DecorationRendererProps {
  keys: DecorationKey[];
  intensity?: DecorationComponentProps["intensity"];
  color?: string;
}

export function DecorationRenderer({
  keys,
  intensity = "medium",
  color,
}: DecorationRendererProps) {
  const items = keys
    .filter((k) => k !== "none")
    .map((k) => getDecoration(k))
    .filter((d): d is DecorationDefinition => d !== null);

  if (items.length === 0) return null;

  return (
    <>
      {items.map((dec) => {
        const Component = dec.component;
        return (
          <div
            key={dec.key}
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          >
            <Component color={color} intensity={intensity} />
          </div>
        );
      })}
    </>
  );
}
