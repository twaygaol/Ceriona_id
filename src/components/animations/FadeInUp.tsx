"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { children: React.ReactNode; delay?: number };

export function FadeInUp({ children, delay = 0, ...props }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
