"use client";

import { motion } from "framer-motion";

function GorgaMarker({ color }: { color: string }) {
  return (
    <div
      className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center z-10"
      style={{
        background: color,
        boxShadow: `0 0 0 6px ${color}22, 0 0 20px ${color}44`,
        transform: "rotate(45deg)",
      }}
    >
      <div className="w-3 h-3" style={{ background: "#FFF9F2" }} />
    </div>
  );
}

export function StorySection({ config, colors, fonts, story }: any) {
  const storyText = typeof story === "string" ? story : "";
  const chapters = Array.isArray(story) ? story : [];

  return (
    <section
      className="relative w-full px-5 py-20"
      style={{ background: colors.surface, fontFamily: fonts.heading }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs uppercase tracking-[0.35em]" style={{ color: colors.accent, fontFamily: fonts.body }}>
            Pardalanan Holong
          </p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: colors.text }}>
            Cerita Kami
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent})` }} />
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M4 0L8 4L4 8L0 4Z" fill={colors.accent} /></svg>
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }} />
          </div>
        </motion.div>

        {chapters.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-1/2 top-4 bottom-0 w-px hidden md:block"
              style={{
                background: `linear-gradient(180deg, ${colors.accent}66, ${colors.accent}88, ${colors.accent}66)`,
              }}
            />

            {chapters.map((chapter: any, idx: number) => (
              <motion.div
                key={idx}
                className={`relative flex items-start gap-8 mb-16 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GorgaMarker color={colors.accent} />

                <div className={`flex-1 ${idx % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
                  <div
                    className="rounded-2xl border p-8"
                    style={{
                      borderColor: `${colors.accent}33`,
                      background: colors.background,
                    }}
                  >
                    {chapter.date && (
                      <p className="mb-3 text-sm tracking-wider font-medium" style={{ color: colors.accent, fontFamily: fonts.body }}>
                        {chapter.date}
                      </p>
                    )}
                    {chapter.image && (
                      <div className={`mb-4 overflow-hidden rounded-xl ${idx % 2 === 0 ? "md:float-right md:ml-4" : "md:float-left md:mr-4"}`}
                        style={{ width: "140px", height: "105px" }}
                      >
                        <img src={chapter.image} alt="" className="h-full w-full object-cover" />
                      </div>
                    )}
                    {chapter.title && (
                      <h3 className="mb-3 text-xl font-bold" style={{ color: colors.text }}>
                        {chapter.title}
                      </h3>
                    )}
                    {chapter.description && (
                      <p className="text-base leading-relaxed" style={{ color: colors.muted, fontFamily: fonts.body }}>
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
            className="rounded-2xl border p-10 text-center max-w-2xl mx-auto"
            style={{
              borderColor: `${colors.accent}33`,
              background: colors.background,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
