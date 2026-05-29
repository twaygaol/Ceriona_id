"use client";

import { useState, Component, type ReactNode, type ErrorInfo } from "react";
import { getAllThemePackages } from "@/features/invitation/renderer/theme-registry";
import { ThemeRenderer } from "@/features/invitation/renderer/ThemeRenderer";
import type { ThemeId } from "@/features/invitation/types";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null; info: ErrorInfo | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null, info: null };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info });
  }
  render() {
    if (this.state.error) {
      return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h3 className="font-bold text-red-700">Error: {this.state.error.message}</h3>
          <pre className="mt-3 max-h-96 overflow-auto rounded bg-red-100 p-4 text-xs text-red-900">
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function TestTemplateEnginePage() {
  const allThemes = getAllThemePackages();
  const [selectedId, setSelectedId] = useState<string>(allThemes[0]?.id ?? "");
  const [showPreview, setShowPreview] = useState(false);

  const dummyInvitation = {
    id: "test",
    brideName: "Ayla",
    groomName: "Reza",
    eventDate: new Date("2026-12-12"),
    eventTime: "10:00",
    eventLocation: "The Manor Jakarta",
    story: "Kisah cinta kami dimulai dari sebuah pertemuan yang tidak terduga...",
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-gold/15 bg-white/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-2xl text-brown">Theme Engine — Core + Package</h1>
          <p className="text-sm text-brown-light">Arsitektur modular: Core Engine + Theme Package</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4">
          <p className="font-medium text-green-800">✓ {allThemes.length} Theme Packages terdaftar</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {allThemes.map((t) => (
              <span key={t.id} className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                {t.name} {t.isPremium ? "⭐" : "○"}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
              <h2 className="mb-3 font-serif text-lg text-brown">Pilih Tema</h2>
              <div className="space-y-2">
                {allThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => { setSelectedId(theme.id); setShowPreview(false); }}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      theme.id === selectedId
                        ? "border-brown bg-brown text-gold-light"
                        : "border-gold/15 bg-white/50 text-brown hover:border-gold/40"
                    }`}
                  >
                    <p className="text-sm font-medium">{theme.name}</p>
                    <p className="mt-0.5 text-xs opacity-70">{theme.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowPreview((v) => !v)}
              className="w-full rounded-2xl bg-brown py-3 text-sm font-medium text-gold-light transition hover:bg-gold hover:text-brown"
            >
              {showPreview ? "Tutup Preview" : "Tampilkan Preview"}
            </button>
          </div>

          <div className="min-h-[600px]">
            {showPreview ? (
              <div className="overflow-hidden rounded-2xl border border-gold/15 shadow-xl">
                <div className="border-b border-gold/15 bg-white/50 px-4 py-2 text-xs text-brown-light">
                  Preview: <span className="font-medium text-brown">
                    {allThemes.find((t) => t.id === selectedId)?.name || selectedId}
                  </span>
                </div>
                <div className="h-[800px] overflow-y-auto">
                  <ErrorBoundary>
                    <ThemeRenderer themeId={selectedId} invitation={dummyInvitation} />
                  </ErrorBoundary>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-gold/30 bg-white/30">
                <div className="text-center">
                  <p className="text-brown-light">Klik &quot;Tampilkan Preview&quot; untuk melihat tema</p>
                  <p className="mt-1 text-xs text-brown-light/60">Setiap tema memiliki pengalaman visual yang berbeda</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
