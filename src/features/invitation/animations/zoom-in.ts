import type { AnimationDefinition } from "../types/animation";

export const zoomIn: AnimationDefinition = {
  key: "zoom-in",
  label: "Zoom In",
  cssClass: "animation-zoom-in",
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  duration: 0.7,
};
