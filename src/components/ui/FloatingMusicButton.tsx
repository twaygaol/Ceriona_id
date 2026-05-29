"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, AlertCircle } from "lucide-react";

interface FloatingMusicButtonProps {
  musicUrl?: string;
}

export function FloatingMusicButton({ musicUrl }: FloatingMusicButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!musicUrl) return;

    // Create audio element
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "metadata";
    
    // Error handling
    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    });

    // Loading state
    audio.addEventListener("loadstart", () => {
      setIsLoading(true);
      setHasError(false);
    });

    audio.addEventListener("canplay", () => {
      setIsLoading(false);
    });

    // Set source
    audio.src = musicUrl;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Browser requires user interaction for audio play
        await audioRef.current.play();
        setIsPlaying(true);
        setHasError(false);
      }
    } catch (error) {
      console.error("Play error:", error);
      setHasError(true);
      setIsPlaying(false);
    }
  };

  if (!musicUrl) return null;

  return (
    <button
      onClick={togglePlay}
      disabled={isLoading}
      className="fixed bottom-20 right-5 z-50 bg-brown text-gold-light p-3 rounded-full shadow-lg hover:bg-gold hover:text-brown transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      title={hasError ? "Musik gagal dimuat" : isPlaying ? "Pause musik" : "Putar musik"}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gold-light border-t-transparent" />
      ) : hasError ? (
        <AlertCircle size={20} />
      ) : isPlaying ? (
        <Volume2 size={20} />
      ) : (
        <VolumeX size={20} />
      )}
    </button>
  );
}
