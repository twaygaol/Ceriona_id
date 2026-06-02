"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import type { VideoSectionProps } from "../../../types";

export function VideoSection({ config, colors, fonts, videos }: VideoSectionProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  if (!videos || videos.length === 0) return null;

  const getEmbedUrl = (url: string): string | null => {
    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
    );
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    return url;
  };

  return (
    <section
      className="relative w-full py-20 px-6"
      style={{ background: colors.surface, fontFamily: fonts.heading }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ color: colors.text }}>
            Video
          </h2>
          <div className="w-12 h-px mx-auto" style={{ background: colors.secondary }} />
          <p className="mt-4 text-sm" style={{ color: colors.muted, fontFamily: fonts.body }}>
            Video prewedding dan momen spesial
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videos.map((video, idx) => {
            const embedUrl = getEmbedUrl(video.url);
            return (
              <motion.div
                key={video.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div
                  className="relative aspect-video overflow-hidden cursor-pointer group"
                  style={{
                    borderRadius: config.layout.borderRadius || "12px",
                    background: colors.background,
                  }}
                  onClick={() => embedUrl && setActiveVideo(video.url)}
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title || "Video thumbnail"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: colors.background }}>
                      <Play className="w-12 h-12 opacity-40" style={{ color: colors.text }} />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${colors.secondary}33` }}
                    >
                      <Play className="w-6 h-6 ml-0.5" style={{ color: colors.secondary }} />
                    </div>
                  </div>
                  {video.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-sm text-white" style={{ fontFamily: fonts.body }}>
                        {video.title}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 text-white hover:opacity-70 transition-opacity"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getEmbedUrl(activeVideo) || activeVideo}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; encrypted-media; gyroscope"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
