"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface FloatingMusicButtonProps {
  musicUrl?: string;
}

export function FloatingMusicButton({ musicUrl }: FloatingMusicButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (musicUrl) {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!musicUrl) return null;

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-20 right-5 z-50 bg-brown text-gold-light p-3 rounded-full shadow-lg hover:bg-gold hover:text-brown transition-all duration-300"
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
