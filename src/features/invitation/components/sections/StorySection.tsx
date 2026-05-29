"use client";

import { Heart } from "lucide-react";

interface StoryItem {
  title?: string;
  description?: string;
  date?: string;
}

interface StorySectionProps {
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
  story?: StoryItem[] | string;
}

export default function StorySection({
  colors,
  fonts,
  layout,
  story,
}: StorySectionProps) {
  return (
    <section
      className="relative px-6 py-20 md:px-12"
      style={{ backgroundColor: colors.surface }}
    >
      <div
        className="mx-auto text-center"
        style={{ maxWidth: layout.maxWidth }}
      >
        <Heart
          size={24}
          className="mx-auto mb-4"
          style={{ color: colors.primary }}
        />

        <h2
          className="mb-12 text-3xl font-light tracking-wide md:text-4xl"
          style={{ fontFamily: fonts.heading, color: colors.text }}
        >
          Cerita Kami
        </h2>

        {(!story || (Array.isArray(story) && story.length === 0) || (typeof story === "string" && !story)) && (
          <p
            className="text-lg"
            style={{ fontFamily: fonts.quote, color: colors.muted }}
          >
            Tidak ada cerita untuk ditampilkan
          </p>
        )}

        {typeof story === "string" && story && (
          <p
            className="mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ fontFamily: fonts.quote, color: colors.muted }}
          >
            {story}
          </p>
        )}

        {Array.isArray(story) && story.length > 0 && (
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
              style={{ backgroundColor: colors.primary }}
            />

            <div className="relative space-y-12">
              {story.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex w-full items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  <div className="w-full md:w-1/2">
                    <div
                      className={`p-6 ${
                        index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                      }`}
                    >
                      {item.date && (
                        <p
                          className="mb-1 text-sm tracking-wider uppercase"
                          style={{
                            fontFamily: fonts.body,
                            color: colors.primary,
                          }}
                        >
                          {item.date}
                        </p>
                      )}
                      {item.title && (
                        <h3
                          className="mb-2 text-xl font-light"
                          style={{
                            fontFamily: fonts.heading,
                            color: colors.text,
                          }}
                        >
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p
                          className="leading-relaxed"
                          style={{
                            fontFamily: fonts.quote,
                            color: colors.muted,
                          }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className="absolute left-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full md:block"
                    style={{ backgroundColor: colors.primary }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export { StorySection };
