import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-[#4A3728] py-24 px-5 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(201,169,110,0.12)_0%,transparent_70%)]" />

      <div className="relative text-center max-w-[800px] mx-auto">
        <div className="section-label text-[#C9A96E]/70">Mulai Sekarang</div>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-[#E8D5B0] mb-4">
          Ciptakan Undangan yang<br /><em className="not-italic text-[#C9A96E]">Tak Akan Pernah</em> Dilupakan
        </h2>
        <p className="text-sm text-[#E8D5B0] opacity-60 mb-10 font-light">
          Bergabung bersama ribuan pasangan yang telah mempercayakan momen istimewa mereka kepada kami.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/dashboard"
            prefetch={false}
            className="inline-flex items-center gap-2 px-10 py-3.5 bg-[#C9A96E] text-[#4A3728] text-xs font-medium tracking-[0.1em] uppercase rounded-sm hover:bg-[#E8D5B0] transition-all"
          >
            Buat Undangan Gratis →
          </Link>
          <a
            href="#templates"
            className="inline-flex items-center gap-2 px-10 py-3.5 bg-transparent text-[#E8D5B0] text-xs font-medium tracking-[0.1em] uppercase rounded-sm border border-[#C9A96E]/30 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all"
          >
            Lihat Template
          </a>
        </div>
      </div>
    </section>
  );
}
