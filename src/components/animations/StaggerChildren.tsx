"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & { children: React.ReactNode; stagger?: number };

export function StaggerChildren({ children, stagger = 0.08, ...props }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
