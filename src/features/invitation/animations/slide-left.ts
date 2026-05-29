import type { AnimationDefinition } from "../types/animation";

export const slideLeft: AnimationDefinition = {
  key: "slide-left",
  label: "Slide Left",
  cssClass: "animation-slide-left",
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  duration: 0.5,
};
