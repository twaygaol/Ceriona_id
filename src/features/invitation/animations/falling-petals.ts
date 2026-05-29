import type { AnimationDefinition } from "../types/animation";

export const fallingPetals: AnimationDefinition = {
  key: "falling-petals",
  label: "Falling Petals",
  cssClass: "animation-falling-petals",
  initial: { y: -20, opacity: 0, rotate: 0 },
  animate: {
    y: [0, "100vh"],
    opacity: [0, 1, 0],
    rotate: [0, 360],
    repeat: Infinity,
  },
  duration: 4,
};
