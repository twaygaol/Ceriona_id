import type { AnimationDefinition } from "../types/animation";

export const slideRight: AnimationDefinition = {
  key: "slide-right",
  label: "Slide Right",
  cssClass: "animation-slide-right",
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  duration: 0.5,
};
