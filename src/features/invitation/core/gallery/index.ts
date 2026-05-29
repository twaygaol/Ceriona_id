"use client";

import { useState, useCallback } from "react";
import type { CoreGalleryItem } from "../../types";

export function useGallery() {
  const [activeImage, setActiveImage] = useState<CoreGalleryItem | null>(null);

  const openLightbox = useCallback((item: CoreGalleryItem) => {
    setActiveImage(item);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveImage(null);
  }, []);

  return {
    images: [] as CoreGalleryItem[],
    loading: false,
    openLightbox,
    closeLightbox,
    activeImage,
  };
}

export function placeholderImages(count: number): CoreGalleryItem[] {
  const icons = [
    "🌸", "🌺", "🌹", "🌷", "🌻",
    "🌿", "🍃", "✨", "🕊️", "💐",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: `placeholder-${i}`,
    url: "",
    thumbnail: undefined,
    caption: icons[i % icons.length],
  }));
}
