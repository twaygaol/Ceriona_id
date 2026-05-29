"use client";

export default function RootError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
      <div className="mx-auto mb-8 h-20 w-20 rounded-full border border-red-300/30 p-3">
        <div className="flex h-full w-full items-center justify-center text-3xl text-red-400">!</div>
      </div>
      <h1 className="font-serif text-4xl text-brown">Terjadi Kesalahan</h1>
      <p className="mt-3 text-brown-light">Maaf, terjadi kesalahan yang tidak terduga.</p>
      <button
        onClick={() => reset()}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-brown px-6 py-3 text-sm text-gold-light transition hover:bg-gold hover:text-brown"
      >
        Coba Lagi
      </button>
    </div>
  );
}
