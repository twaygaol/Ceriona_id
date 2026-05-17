"use client";
import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-16 px-5 md:px-8">
      {/* Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_15%_80%,rgba(201,169,110,0.12)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_85%_20%,rgba(212,165,160,0.1)_0%,transparent_70%)]" />
      </div>

      {/* Ornament */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#C9A96E] opacity-40">
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[#C9A96E] text-xs">✦</div>
      </div>

      {/* Content */}
      <div className="relative text-center max-w-[780px] z-10">
        <div className="inline-block text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[#9E7A3E] border border-[#E8D5B0] px-4 py-1.5 rounded-sm mb-7 animate-fade-up">
          ✦ Premium Digital Invitation Platform
        </div>

        <h1 className="font-serif text-[clamp(3rem,8vw,5.5rem)] font-light leading-[1.1] text-[#4A3728] mb-2 animate-fade-up animation-delay-1">
          Undangan Digital<br />yang <em className="not-italic text-[#9E7A3E]">Memukau</em><br />& Tak Terlupakan
        </h1>

        <p className="font-serif text-[clamp(1.1rem,2.5vw,1.4rem)] font-light text-[#7A5C42] mb-8 italic animate-fade-up animation-delay-2">
          Karena setiap momen istimewa layak dirayakan dengan elegan
        </p>

        <p className="text-sm leading-relaxed text-[#7A5C42] max-w-[480px] mx-auto mb-10 font-light animate-fade-up animation-delay-3">
          Platform undangan digital premium dengan template cantik, animasi cinematic, dan fitur lengkap. 
          Bagikan kebahagiaan Anda dengan cara yang paling berkesan.
        </p>

        <div className="flex gap-4 justify-center flex-wrap animate-fade-up animation-delay-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#4A3728] text-[#E8D5B0] text-xs font-medium tracking-[0.1em] uppercase rounded-sm hover:bg-[#9E7A3E] hover:text-white transition-all"
          >
            Buat Undangan →
          </Link>
          <Link
            href="#templates"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-[#4A3728] text-xs font-medium tracking-[0.1em] uppercase rounded-sm border border-[#4A3728] hover:bg-[#4A3728] hover:text-[#E8D5B0] transition-all"
          >
            Lihat Template
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#7A5C42] opacity-60">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#9E7A3E] to-transparent animate-[scrollPulse_2s_ease_infinite]" />
      </div>
    </section>
  );
}
