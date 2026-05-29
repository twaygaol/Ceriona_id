"use client";

import { motion } from "framer-motion";
import type { StorySectionProps } from "../../../types";

export function StorySection({ config, colors, fonts, story }: StorySectionProps) {
  const storyText = typeof story === "string" ? story : "";
  const chapters = Array.isArray(story) ? story : [];

  return (
    <section
      className="relative w-full py-20 px-6"
      style={{ background: colors.background, fontFamily: fonts.heading }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Love Story
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Our Journey
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.accent}><path d="M4 0L8 4L4 8L0 4Z" /></svg>
            <div className="w-12 h-px" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
        </motion.div>

        {chapters.length > 0 ? (
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
              style={{ background: `linear-gradient(180deg, transparent, ${colors.accent}55, transparent)` }}
            />

            {chapters.map((chapter, idx) => (
              <motion.div
                key={idx}
                className={`relative flex items-start gap-6 mb-12 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center z-10"
                  style={{
                    background: colors.accent,
                    boxShadow: `0 0 0 4px ${colors.background}, 0 0 15px ${colors.accent}44`,
                    transform: "rotate(45deg)",
                  }}
                >
                  <div className="w-3 h-3" style={{ background: colors.surface, transform: "rotate(0deg)" }} />
                </div>

                <div className={`flex-1 ${idx % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
                  <div
                    className="inline-block p-6 relative"
                    style={{
                      border: `1.5px solid ${colors.accent}33`,
                      borderRadius: config.layout.borderRadius,
                      background: colors.surface,
                    }}
                  >
                    <svg className="absolute -top-1 left-1/2 -translate-x-1/2 w-full h-4 md:hidden" viewBox="0 0 60 10" fill="none">
                      <path d="M30 0L35 10L25 10Z" fill={colors.accent} opacity="0.3" />
                    </svg>

                    {chapter.title && (
                      <h3 className="text-lg font-bold mb-1" style={{ color: colors.accent }}>
                        {chapter.date && <span className="text-xs block mb-1" style={{ color: colors.muted, fontFamily: fonts.body }}>{chapter.date}</span>}
                        {chapter.title}
                      </h3>
                    )}
                    {chapter.description && (
                      <p className="text-sm leading-relaxed" style={{ color: colors.text, fontFamily: fonts.body }}>
                        {chapter.description}
                      </p>
                    )}
                    {chapter.image && (
                      <div className="mt-3 rounded overflow-hidden" style={{ border: `1px solid ${colors.accent}33` }}>
                        <img src={chapter.image} alt={chapter.title || "Story image"} className="w-full h-auto" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="p-8 text-center max-w-2xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              border: `1.5px solid ${colors.accent}33`,
              borderRadius: config.layout.borderRadius,
              background: colors.surface,
            }}
          >
            <svg className="absolute top-3 left-3 w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1" opacity="0.3">
              <path d="M3 21c3-3 6-6 9-9 3 3 6 6 9 9" />
              <path d="M3 3c3 3 6 6 9 9 3-3 6-6 9-9" />
            </svg>
            <p className="text-base leading-relaxed italic" style={{ color: colors.text, fontFamily: fonts.quote }}>
              {storyText || "Our love story began on a beautiful day, when two souls destined to be together finally found each other..."}
            </p>
            <div className="mt-4 w-12 h-px mx-auto" style={{ background: colors.accent }} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
