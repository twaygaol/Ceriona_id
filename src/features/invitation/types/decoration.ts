import type { DecorationKey } from "./template";

export interface DecorationDefinition {
  key: DecorationKey;
  label: string;
  component: React.ComponentType<DecorationComponentProps>;
  configurable: boolean;
  config?: Record<string, any>;
}

export interface DecorationComponentProps {
  color?: string;
  intensity?: "subtle" | "medium" | "heavy";
  className?: string;
}

export type DecorationRegistry = Map<DecorationKey, DecorationDefinition>;

export interface DecorationEngineProps {
  decorations: DecorationDefinition[];
  intensity: import("./template").ThemeDecorationSet["intensity"];
  color?: string;
}
