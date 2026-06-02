"use client";

import { useEffect } from "react";
import { useMusic } from "../../core/music";
import type { MusicTriggerProps } from "../../types";

export function MusicTrigger({ theme, autoPlay, trackUrl }: MusicTriggerProps & { trackUrl?: string }) {
  const defaultTrack = theme.config.music.defaultTrack;
  const track = trackUrl || defaultTrack;
  const { toggle } = useMusic(track);

  useEffect(() => {
    if (autoPlay && track) {
      const timer = setTimeout(() => {
        toggle();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, track, toggle]);

  return null;
}
