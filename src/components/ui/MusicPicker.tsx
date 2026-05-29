"use client";

import { useRef, useState } from "react";
import { FileAudio, Link2, Music, Pause, Play, Trash2, Upload, X } from "lucide-react";
import { FileUpload } from "@/components/ui/FileUpload";

interface MusicPickerProps {
  value?: string;
  onChange: (url: string) => void;
}

export function MusicPicker({ value, onChange }: MusicPickerProps) {
  const [mode, setMode] = useState<"url" | "upload" | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleUrlSubmit = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setUrlError("Masukkan URL");
      return;
    }
    if (!trimmed.match(/^https?:\/\/.+/i)) {
      setUrlError("URL harus dimulai dengan http:// atau https://");
      return;
    }
    setUrlError("");
    onChange(trimmed);
    setMode(null);
    setUrlInput("");
  };

  const handlePreview = () => {
    if (!value) return;
    if (previewing && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
      return;
    }
    const audio = new Audio(value);
    audio.loop = true;
    audio.play();
    audioRef.current = audio;
    setPreviewing(true);
    setPlaying(true);
  };

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPreviewing(false);
    setPlaying(false);
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="flex items-center gap-3 rounded-xl border border-gold/15 bg-white/80 p-3 backdrop-blur-xl">
          <button
            type="button"
            onClick={handlePreview}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition hover:bg-gold/20"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-brown">External URL</p>
            <p className="truncate text-xs text-brown-light">{value}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              stopPreview();
              onChange("");
            }}
            className="rounded-full p-1.5 text-red-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {!value && !mode && (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode("url")}
            className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-gold/30 bg-cream px-4 py-5 text-sm text-brown-light transition hover:border-gold/50 hover:bg-gold/5"
          >
            <Link2 className="h-6 w-6" />
            <span>URL Eksternal</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-gold/30 bg-cream px-4 py-5 text-sm text-brown-light transition hover:border-gold/50 hover:bg-gold/5"
          >
            <Upload className="h-6 w-6" />
            <span>Upload File</span>
          </button>
        </div>
      )}

      {mode === "url" && (
        <div className="rounded-xl border border-gold/15 bg-white p-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => { setUrlInput(e.target.value); setUrlError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
              placeholder="https://example.com/music.mp3"
              className="input-premium flex-1"
              autoFocus
            />
            <button type="button" onClick={handleUrlSubmit} className="rounded-lg bg-brown px-3 py-2 text-xs text-gold-light hover:bg-gold hover:text-brown">
              Pakai
            </button>
            <button type="button" onClick={() => setMode(null)} className="rounded-lg p-2 text-brown-light hover:text-brown">
              <X className="h-4 w-4" />
            </button>
          </div>
          {urlError && <p className="mt-1.5 text-xs text-red-500">{urlError}</p>}
        </div>
      )}

      {mode === "upload" && (
        <div className="rounded-xl border border-gold/15 bg-white p-3 backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-brown">Upload Musik</span>
            <button type="button" onClick={() => setMode(null)} className="rounded-lg p-1 text-brown-light hover:text-brown">
              <X className="h-4 w-4" />
            </button>
          </div>
          <FileUpload
            type="music"
            onUploadComplete={(url) => {
              onChange(url);
              setMode(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
