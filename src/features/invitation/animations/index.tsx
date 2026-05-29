import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { AnimationKey } from "../types/template";
import type { AnimationDefinition, AnimationRegistry, ScrollAnimationProps } from "../types/animation";
import { fadeUp } from "./fade-up";
import { zoomIn } from "./zoom-in";
import { slideLeft } from "./slide-left";
import { slideRight } from "./slide-right";
import { floating } from "./floating";
import { sparkle } from "./sparkle";
import { fallingPetals } from "./falling-petals";

export const animationRegistry: AnimationRegistry = new Map([
  [fadeUp.key, fadeUp],
  [zoomIn.key, zoomIn],
  [slideLeft.key, slideLeft],
  [slideRight.key, slideRight],
  [floating.key, floating],
  [sparkle.key, sparkle],
  [fallingPetals.key, fallingPetals],
]);

export function getAnimation(key: string): AnimationDefinition {
  return animationRegistry.get(key as AnimationKey) ?? fadeUp;
}

export function AnimationWrapper({
  animation,
  delay,
  threshold = 0.2,
  once = true,
  className,
  children,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        ...animation.initial,
        transition: { duration: animation.duration, delay: delay ?? animation.delay },
      }}
      animate={
        isInView
          ? {
              ...animation.animate,
              transition: { duration: animation.duration, delay: delay ?? animation.delay },
            }
          : {
              ...animation.initial,
              transition: { duration: animation.duration, delay: delay ?? animation.delay },
            }
      }
      exit={animation.exit ? { ...animation.exit, transition: { duration: animation.duration } } : undefined}
    >
      {children}
    </motion.div>
  );
}
