import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
      <div className="mx-auto mb-8 h-20 w-20 rounded-full border border-gold/30 p-3">
        <div className="flex h-full w-full items-center justify-center font-serif text-3xl text-gold">✦</div>
      </div>
      <h1 className="font-serif text-6xl text-brown">404</h1>
      <p className="mt-3 text-brown-light">Halaman yang Anda cari tidak ditemukan.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-brown px-6 py-3 text-sm text-gold-light transition hover:bg-gold hover:text-brown"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
