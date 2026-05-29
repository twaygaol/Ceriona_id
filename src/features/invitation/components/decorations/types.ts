import type React from "react";

export interface DecorationComponentProps {
  color?: string;
  intensity?: "subtle" | "medium" | "heavy";
  className?: string;
}

export interface DecorationDefinition {
  key: string;
  label: string;
  component: React.ComponentType<DecorationComponentProps>;
  configurable: boolean;
  config?: Record<string, any>;
}
