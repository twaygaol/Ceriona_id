"use client";

import { motion } from "framer-motion";
import type { OpeningScreenProps } from "../../../types";
import { OpenInvitationButton } from "./OpenInvitationButton";

const starPattern = {
  backgroundImage: `
    url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='40,4 52,28 78,28 58,44 65,72 40,56 15,72 22,44 2,28 28,28' fill='none' stroke='%23D4A84B' stroke-width='0.5' opacity='0.12'/%3E%3C/svg%3E"),
    linear-gradient(135deg, #0A2E0D, ${(c: any) => c?.primary || "#1B5E20"}, #0A2E0D)
  `,
  backgroundSize: "80px 80px, 100% 100%",
  backgroundBlendMode: "normal, normal",
};

function CrescentMoon({ color = "#D4A84B" }: { color?: string }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 12C36 12 24 24 24 40C24 56 36 68 50 68C44 64 40 56 40 48C40 38 44 28 50 12Z"
        fill={color}
        opacity="0.35"
      />
      <path
        d="M48 16C36 18 26 28 26 40C26 52 36 62 48 64C40 60 34 50 34 40C34 28 40 18 48 16Z"
        fill={color}
        opacity="0.2"
      />
    </svg>
  );
}

export function OpeningScreen({ onOpen, config }: OpeningScreenProps) {
  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0A2E0D, ${config.colors.primary}, #0A2E0D)`,
        fontFamily: config.fonts.heading,
      }}
    >
      <div className="absolute inset-0 opacity-60" style={starPattern as any} />

      <div className="absolute top-8 left-8 opacity-40">
        <CrescentMoon color={config.colors.secondary} />
      </div>
      <div className="absolute bottom-8 right-8 opacity-25 rotate-180">
        <CrescentMoon color={config.colors.secondary} />
      </div>

      <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, transparent, ${config.colors.secondary}, transparent)` }} />
      <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, transparent, ${config.colors.secondary}, transparent)` }} />

      {/* Geometric star border corners */}
      <div className="absolute top-4 left-4 w-24 h-24 border-t-2 border-l-2 rounded-tl-3xl" style={{ borderColor: `${config.colors.secondary}55` }}>
        <svg className="absolute -top-2 -left-2 w-6 h-6" viewBox="0 0 24 24">
          <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" fill={config.colors.secondary} opacity="0.4" />
        </svg>
      </div>
      <div className="absolute top-4 right-4 w-24 h-24 border-t-2 border-r-2 rounded-tr-3xl" style={{ borderColor: `${config.colors.secondary}55` }}>
        <svg className="absolute -top-2 -right-2 w-6 h-6" viewBox="0 0 24 24">
          <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" fill={config.colors.secondary} opacity="0.4" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 w-24 h-24 border-b-2 border-l-2 rounded-bl-3xl" style={{ borderColor: `${config.colors.secondary}55` }}>
        <svg className="absolute -bottom-2 -left-2 w-6 h-6" viewBox="0 0 24 24">
          <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" fill={config.colors.secondary} opacity="0.4" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 w-24 h-24 border-b-2 border-r-2 rounded-br-3xl" style={{ borderColor: `${config.colors.secondary}55` }}>
        <svg className="absolute -bottom-2 -right-2 w-6 h-6" viewBox="0 0 24 24">
          <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" fill={config.colors.secondary} opacity="0.4" />
        </svg>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p
          className="text-sm tracking-[0.3em] mb-6"
          style={{ color: config.colors.accent, fontFamily: config.fonts.quote, direction: "rtl" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>

        <div className="text-7xl md:text-9xl mb-4 leading-none" style={{ fontFamily: config.fonts.quote, color: config.colors.secondary, direction: "rtl" }}>
          ﷽
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, transparent, ${config.colors.secondary})` }} />
          <CrescentMoon color={config.colors.secondary} />
          <div className="w-16 h-px" style={{ background: `linear-gradient(90deg, ${config.colors.secondary}, transparent)` }} />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-2"
          style={{ color: config.colors.surface }}
        >
          The Wedding
        </h1>

        <div className="flex items-center gap-4 my-4">
          <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${config.colors.secondary})` }} />
          <span className="text-sm tracking-[0.3em] uppercase" style={{ color: config.colors.secondary, fontFamily: config.fonts.body }}>&</span>
          <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, ${config.colors.secondary}, transparent)` }} />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-8"
          style={{ color: config.colors.surface }}
        >
          Our Invitation
        </h1>

        <OpenInvitationButton onClick={onOpen} config={config} />
      </motion.div>
    </div>
  );
}
