"use client";

import { useState, useRef } from "react";
import { Search, Play, Pause, Music, Loader2, X } from "lucide-react";
import { searchMusic, getWeddingPlaylist, type MusicTrack } from "@/services/musicService";

interface MusicSearchProps {
  onSelect: (track: MusicTrack) => void;
  onClose: () => void;
}

export function MusicSearch({ onSelect, onClose }: MusicSearchProps) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      // Load wedding playlist if no query
      setIsSearching(true);
      const playlist = await getWeddingPlaylist();
      setTracks(playlist);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const results = await searchMusic(searchQuery);
    setTracks(results);
    setIsSearching(false);
  };

  const handlePreview = (track: MusicTrack) => {
    if (previewingId === track.id && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play();
        setPlaying(true);
      }
      return;
    }

    // Stop previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Play new audio
    const audio = new Audio(track.audioUrl);
    audio.addEventListener("ended", () => {
      setPlaying(false);
      setPreviewingId(null);
    });
    audio.play();
    audioRef.current = audio;
    setPreviewingId(track.id);
    setPlaying(true);
  };

  const handleSelect = (track: MusicTrack) => {
    // Stop preview
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlaying(false);
    setPreviewingId(null);
    
    onSelect(track);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Load wedding playlist on mount
  useState(() => {
    handleSearch("");
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-3xl rounded-2xl border border-gold/15 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold/15 p-5">
          <div className="flex items-center gap-3">
            <Music className="size-5 text-gold" />
            <h2 className="font-serif text-xl text-brown">Cari Musik</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-brown-light transition hover:bg-gold/10 hover:text-brown"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-gold/15 p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brown-light" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
              placeholder="Cari musik wedding, romantic, love..."
              className="input-premium w-full pl-10"
              autoFocus
            />
            <button
              onClick={() => handleSearch(query)}
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-brown px-4 py-2 text-xs text-gold-light transition hover:bg-gold hover:text-brown disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="size-4 animate-spin" /> : "Cari"}
            </button>
          </div>
          <p className="mt-2 text-xs text-brown-light">
            Powered by Pixabay & Jamendo — Musik gratis untuk undangan Anda
          </p>
        </div>

        {/* Results */}
        <div className="max-h-[500px] overflow-y-auto p-5">
          {isSearching ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="size-8 animate-spin text-gold" />
            </div>
          ) : tracks.length === 0 ? (
            <div className="py-20 text-center text-brown-light">
              <Music className="mx-auto mb-3 size-12 opacity-30" />
              <p>Tidak ada hasil. Coba kata kunci lain.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-3 rounded-xl border border-gold/10 bg-cream/30 p-3 transition hover:border-gold/30 hover:bg-cream/50"
                >
                  {/* Preview Button */}
                  <button
                    onClick={() => handlePreview(track)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition hover:bg-gold/20"
                  >
                    {previewingId === track.id && playing ? (
                      <Pause className="size-4" />
                    ) : (
                      <Play className="size-4" />
                    )}
                  </button>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-brown">{track.title}</p>
                    <p className="truncate text-xs text-brown-light">
                      {track.artist} • {formatDuration(track.duration)} • {track.source}
                    </p>
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => handleSelect(track)}
                    className="shrink-0 rounded-lg bg-brown px-4 py-2 text-xs text-gold-light transition hover:bg-gold hover:text-brown"
                  >
                    Pilih
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
