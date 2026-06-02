"use client";

import { motion } from "framer-motion";

interface UlosDividerProps {
  color?: string;
}

export function UlosDivider({ color = "#C8A44D" }: UlosDividerProps) {
  return (
    <motion.div
      className="my-12 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <svg
        width="200"
        height="40"
        viewBox="0 0 200 40"
        className="overflow-visible"
      >
        {/* Center ornament */}
        <circle cx="100" cy="20" r="8" fill={color} opacity="0.9" />
        <circle cx="100" cy="20" r="12" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
        
        {/* Left pattern */}
        <path
          d="M20,20 L80,20"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="40" cy="20" r="4" fill={color} opacity="0.7" />
        <circle cx="60" cy="20" r="4" fill={color} opacity="0.7" />
        
        {/* Right pattern */}
        <path
          d="M120,20 L180,20"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="140" cy="20" r="4" fill={color} opacity="0.7" />
        <circle cx="160" cy="20" r="4" fill={color} opacity="0.7" />
        
        {/* Decorative diamonds */}
        <path d="M30,15 L35,20 L30,25 L25,20 Z" fill={color} opacity="0.5" />
        <path d="M170,15 L175,20 L170,25 L165,20 Z" fill={color} opacity="0.5" />
      </svg>
    </motion.div>
  );
}
