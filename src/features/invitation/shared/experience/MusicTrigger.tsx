"use client";

import { useEffect } from "react";
import { useMusic } from "../../core/music";
import type { MusicTriggerProps } from "../../types";

export function MusicTrigger({ theme, autoPlay }: MusicTriggerProps) {
  const track = theme.config.music.defaultTrack;
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
