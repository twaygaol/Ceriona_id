import type { AnimationDefinition } from "../types/animation";

export const sparkle: AnimationDefinition = {
  key: "sparkle",
  label: "Sparkle",
  cssClass: "animation-sparkle",
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: [0, 1, 0], scale: [0, 1.2, 0], repeat: Infinity },
  duration: 2,
};
