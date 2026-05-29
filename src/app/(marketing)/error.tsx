"use client";

export default function MarketingError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <h1 className="font-serif text-4xl text-brown">Terjadi Kesalahan</h1>
      <p className="mt-3 text-brown-light">Halaman ini sedang bermasalah.</p>
      <button
        onClick={() => reset()}
        className="mt-8 rounded-full bg-brown px-6 py-3 text-sm text-gold-light transition hover:bg-gold hover:text-brown"
      >
        Muat Ulang
      </button>
    </div>
  );
}
