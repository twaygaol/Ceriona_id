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
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: colors.text }}>
            Cerita Kami
          </h2>
          <div className="w-16 h-0.5 mx-auto" style={{ background: colors.accent }} />
        </motion.div>

        {chapters.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
              style={{ background: `linear-gradient(180deg, transparent, ${colors.accent}66, transparent)` }}
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
                {/* Gorga-inspired marker */}
                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 items-center justify-center z-10"
                  style={{
                    background: colors.accent,
                    boxShadow: `0 0 0 4px ${colors.background}`,
                    transform: "rotate(45deg)",
                  }}
                >
                  <div className="w-2 h-2" style={{ background: colors.surface }} />
                </div>

                <div className={`flex-1 ${idx % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <div
                    className="inline-block p-6"
                    style={{
                      border: `1px solid ${colors.accent}33`,
                      borderRadius: config.layout.borderRadius,
                      background: colors.surface,
                    }}
                  >
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="p-8 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              border: `1px solid ${colors.accent}33`,
              borderRadius: config.layout.borderRadius,
              background: colors.surface,
            }}
          >
            <p className="text-base leading-relaxed" style={{ color: colors.text, fontFamily: fonts.body }}>
              {storyText || "Kisah cinta kami dimulai dari pertemuan yang tidak terduga..."}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
