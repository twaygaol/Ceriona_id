"use client";

import { Play, VideoIcon } from "lucide-react";

interface VideoItem {
  url?: string;
  title?: string;
  thumbnail?: string;
}

interface VideoSectionProps {
  invitation: any;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
    muted: string;
  };
  fonts: { heading: string; body: string; quote: string };
  layout: {
    borderRadius: string;
    maxWidth: string;
    spacing: string;
    buttonStyle: string;
    containerStyle: string;
  };
  videos?: VideoItem[];
}

function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function VideoSection({
  colors,
  fonts,
  layout,
  videos,
}: VideoSectionProps) {
  if (!videos || videos.length === 0) {
    return (
      <section
        className="relative px-6 py-20 md:px-12"
        style={{ backgroundColor: colors.background }}
      >
        <div
          className="mx-auto text-center"
          style={{ maxWidth: layout.maxWidth }}
        >
          <h2
            className="mb-12 text-3xl font-light tracking-wide md:text-4xl"
            style={{ fontFamily: fonts.heading, color: colors.text }}
          >
            Video
          </h2>
          <div
            className="flex flex-col items-center justify-center py-20"
            style={{ color: colors.muted }}
          >
            <VideoIcon size={48} className="mb-4" />
            <p style={{ fontFamily: fonts.body }}>Belum ada video</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative px-6 py-20 md:px-12"
      style={{ backgroundColor: colors.background }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: layout.maxWidth }}
      >
        <h2
          className="mb-12 text-center text-3xl font-light tracking-wide md:text-4xl"
          style={{ fontFamily: fonts.heading, color: colors.text }}
        >
          Video
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video, index) => {
            const embedUrl = getYoutubeEmbedUrl(video.url);
            return (
              <div
                key={index}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: layout.borderRadius,
                }}
              >
                {embedUrl ? (
                  <div className="relative aspect-video">
                    <iframe
                      src={embedUrl}
                      title={video.title || `Video ${index + 1}`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-video"
                  >
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title || `Video ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center"
                        style={{ backgroundColor: colors.muted }}
                      >
                        <VideoIcon
                          size={40}
                          style={{ color: colors.surface }}
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:bg-black/40">
                      <Play
                        size={48}
                        className="text-white opacity-80"
                        fill="white"
                      />
                    </div>
                  </a>
                )}
                {video.title && (
                  <div className="p-4">
                    <p
                      className="text-sm"
                      style={{
                        fontFamily: fonts.body,
                        color: colors.text,
                      }}
                    >
                      {video.title}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { VideoSection };
