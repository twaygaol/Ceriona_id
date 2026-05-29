"use client";

import { useState } from "react";
import { ImageIcon, X } from "lucide-react";

interface GallerySectionProps {
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
  images?: string[];
  columns?: number;
  lightbox?: boolean;
}

export default function GallerySection({
  colors,
  fonts,
  layout,
  images,
  columns = 2,
  lightbox = true,
}: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const cols = Math.min(Math.max(columns, 1), 4);

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
          Galeri
        </h2>

        {!images || images.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20"
            style={{ color: colors.muted }}
          >
            <ImageIcon size={48} className="mb-4" />
            <p style={{ fontFamily: fonts.body }}>Belum ada foto</p>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="aspect-square cursor-pointer overflow-hidden"
                style={{ borderRadius: layout.borderRadius }}
                onClick={() => lightbox && setSelectedIndex(index)}
              >
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedIndex !== null && images && images[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute right-6 top-6 text-white"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={32} />
          </button>
          <img
            src={images[selectedIndex]}
            alt={`Gallery ${selectedIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

export { GallerySection };
