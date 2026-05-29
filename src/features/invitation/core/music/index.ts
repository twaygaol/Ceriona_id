"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useMusic(track?: string) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const interactedRef = useRef(false);

  useEffect(() => {
    const handler = () => {
      interactedRef.current = true;
    };
    document.addEventListener("click", handler, { once: true });
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (!track) return;
    const audio = new Audio(track);
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onDur = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onDur);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onDur);
      audio.removeEventListener("ended", onEnd);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      const playFn = () => {
        audio.play().catch(() => {});
        setPlaying(true);
      };
      if (interactedRef.current) {
        playFn();
      } else {
        const handler = () => {
          interactedRef.current = true;
          playFn();
        };
        document.addEventListener("click", handler, { once: true });
      }
    }
  }, [playing]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  return { playing, toggle, currentTime, duration, volume, setVolume };
}
