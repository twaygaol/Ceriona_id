"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BatakDecorationsProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function BatakDecorations({ colors }: BatakDecorationsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Gorga Top Ornament */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-10 overflow-hidden">
        <motion.svg
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1.2 }}
          viewBox="0 0 1200 100"
          className="w-full"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))" }}
        >
          {/* Gorga Pattern Top */}
          <path
            d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50 L1200,0 L0,0 Z"
            fill={colors.primary}
            opacity="0.8"
          />
          <path
            d="M0,60 Q150,35 300,60 T600,60 T900,60 T1200,60"
            stroke={colors.secondary}
            strokeWidth="2"
            fill="none"
          />
          {/* Decorative circles */}
          {[150, 450, 750, 1050].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy="50"
              r="8"
              fill={colors.secondary}
              opacity="0.9"
            />
          ))}
        </motion.svg>
      </div>

      {/* Gorga Bottom Ornament */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 overflow-hidden">
        <motion.svg
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 1.2 }}
          viewBox="0 0 1200 100"
          className="w-full"
          style={{ filter: "drop-shadow(0 -2px 8px rgba(0,0,0,0.1))" }}
        >
          <path
            d="M0,50 Q150,80 300,50 T600,50 T900,50 T1200,50 L1200,100 L0,100 Z"
            fill={colors.primary}
            opacity="0.8"
          />
          <path
            d="M0,40 Q150,65 300,40 T600,40 T900,40 T1200,40"
            stroke={colors.secondary}
            strokeWidth="2"
            fill="none"
          />
        </motion.svg>
      </div>

      {/* Gorga Corner Ornaments */}
      <motion.div
        className="pointer-events-none fixed left-4 top-20 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <path
            d="M10,10 Q10,40 40,40 Q10,40 10,70"
            stroke={colors.secondary}
            strokeWidth="3"
            fill="none"
          />
          <circle cx="40" cy="40" r="6" fill={colors.secondary} />
        </svg>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed right-4 top-20 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <path
            d="M70,10 Q70,40 40,40 Q70,40 70,70"
            stroke={colors.secondary}
            strokeWidth="3"
            fill="none"
          />
          <circle cx="40" cy="40" r="6" fill={colors.secondary} />
        </svg>
      </motion.div>

      {/* Gold Dust Particles */}
      <GoldDustEffect color={colors.secondary} />
    </>
  );
}

function GoldDustEffect({ color }: { color: string }) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
