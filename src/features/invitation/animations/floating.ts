import type { AnimationDefinition } from "../types/animation";

export const floating: AnimationDefinition = {
  key: "floating",
  label: "Floating",
  cssClass: "animation-floating",
  initial: { y: 0 },
  animate: { y: [-8, 8], repeat: Infinity, repeatType: "reverse" },
  duration: 3,
};
