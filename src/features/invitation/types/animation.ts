import type { AnimationKey } from "./template";

export interface AnimationDefinition {
  key: AnimationKey;
  label: string;
  cssClass: string;
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit?: Record<string, any>;
  duration: number;
  delay?: number;
}

export interface ScrollAnimationProps {
  animation: AnimationDefinition;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
}

export type AnimationRegistry = Map<AnimationKey, AnimationDefinition>;
