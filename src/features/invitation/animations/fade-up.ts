import type { AnimationDefinition } from "../types/animation";

export const fadeUp: AnimationDefinition = {
  key: "fade-up",
  label: "Fade Up",
  cssClass: "animation-fade-up",
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  duration: 0.6,
};
