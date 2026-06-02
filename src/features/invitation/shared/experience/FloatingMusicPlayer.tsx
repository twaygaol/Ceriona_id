"use client";

import { useEffect, useRef, useState } from "react";
import { useMusic } from "../../core/music";
import type { ThemePackage } from "../../types";

interface FloatingMusicPlayerProps {
  theme: ThemePackage;
  trackUrl?: string;
}

export function FloatingMusicPlayer({ theme, trackUrl }: FloatingMusicPlayerProps) {
  const defaultTrack = theme.config.music.defaultTrack;
  const track = trackUrl || defaultTrack;
  const { playing, toggle } = useMusic(track);
  const [show, setShow] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!track) return;
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, [track]);

  useEffect(() => {
    if (!track || startedRef.current) return;
    startedRef.current = true;
    const t = setTimeout(() => toggle(), 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  if (!show || !track) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 flex size-12 items-center justify-center rounded-full bg-brown/90 text-gold-light shadow-xl backdrop-blur-sm transition hover:scale-105 active:scale-95"
      aria-label={playing ? "Pause musik" : "Putar musik"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`size-5 ${playing ? "animate-spin" : ""}`}
        style={playing ? { animationDuration: "4s" } : undefined}
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
      {!playing && (
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
          x
        </span>
      )}
    </button>
  );
}
