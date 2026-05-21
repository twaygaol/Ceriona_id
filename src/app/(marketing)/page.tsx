import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Gift, Heart, ImageIcon, MapPin, MessageCircle, Music, Sparkles, Users } from "lucide-react";

const themes = [
  { name: "Chara 51 Inspired", tag: "Premium", bg: "from-[#130d0b] via-[#332018] to-[#070504]", text: "text-[#F7EBDD]", accent: "#D9B86C" },
  { name: "Floral Romance", tag: "Romantic", bg: "from-[#fff7f5] via-[#f4ddd8] to-[#ddb7b2]", text: "text-[#58383A]", accent: "#C9858C" },
  { name: "Minimal Editorial", tag: "Clean", bg: "from-white via-[#f4efe7] to-[#ded3c2]", text: "text-[#2C2420]", accent: "#B99A62" },
];

const features = [
  { icon: Clock, title: "Countdown", desc: "Hitung mundur elegan menuju hari bahagia." },
  { icon: ImageIcon, title: "Gallery", desc: "Foto prewedding tampil cinematic dan rapi." },
  { icon: MessageCircle, title: "RSVP", desc: "Konfirmasi kehadiran langsung dari undangan." },
  { icon: Music, title: "Music", desc: "Musik latar untuk pengalaman lebih emosional." },
  { icon: MapPin, title: "Maps", desc: "Lokasi acara terhubung ke Google Maps." },
  { icon: Gift, title: "Gift", desc: "Amplop digital dengan tampilan premium." },
];

const steps = ["Pilih tema", "Isi data", "Preview", "Bagikan link"];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#fffaf4] text-[#241A16]">
      <section className="relative min-h-screen px-4 pb-20 pt-28 sm:px-8 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,184,108,0.20),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(201,133,140,0.16),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_430px]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9B86C]/30 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[#8A672D] backdrop-blur-xl">
              <Sparkles className="size-4" />
              Digital Invitation Platform
            </div>
            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#241A16] sm:text-7xl lg:text-8xl">
              Buat undangan digital yang terasa premium.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#6F5A4E] sm:text-lg">
              Pilih tema, isi data, preview undangan, lalu bagikan ke tamu. Dirancang untuk wedding modern dengan tampilan cinematic seperti undangan profesional.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard/invitations/create" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#241A16] px-7 text-sm font-semibold text-[#F6E7C8] shadow-2xl shadow-[#241A16]/20 transition hover:-translate-y-0.5 hover:bg-[#3A2A22]">
                Buat Undangan Sekarang
                <ArrowRight className="size-4" />
              </Link>
              <a href="#themes" className="inline-flex h-13 items-center justify-center rounded-full border border-[#241A16]/15 bg-white/70 px-7 text-sm font-semibold text-[#241A16] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#241A16]/35">
                Lihat Tema
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#6F5A4E]">
              {["Tanpa coding", "Mobile first", "Preview realtime"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#B99A62]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[390px]">
            <div className="absolute -inset-8 rounded-[3rem] bg-[#D9B86C]/20 blur-3xl" />
            <div className="relative rounded-[3rem] border border-white/50 bg-[#120D0B] p-3 shadow-[0_40px_120px_-50px_rgba(36,26,22,0.9)]">
              <div className="overflow-hidden rounded-[2.45rem] bg-gradient-to-b from-[#271812] to-[#080605] text-[#F7EBDD]">
                <div className="relative flex min-h-[680px] flex-col justify-between p-7 text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(217,184,108,0.34),transparent_34%)]" />
                  <div className="absolute inset-5 rounded-[2rem] border border-[#D9B86C]/20" />
                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#D9B86C]">The Wedding of</p>
                    <h2 className="mt-8 font-serif text-6xl leading-none">Rizky<br />&<br />Salsa</h2>
                    <p className="mt-6 text-sm text-white/60">Minggu, 21 Juni 2026</p>
                  </div>
                  <div className="relative grid grid-cols-4 gap-2 rounded-3xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
                    {["12", "08", "45", "22"].map((item, index) => (
                      <div key={index} className="rounded-2xl bg-black/20 py-3">
                        <p className="font-serif text-2xl text-[#D9B86C]">{item}</p>
                        <p className="text-[10px] uppercase tracking-widest text-white/45">{["Hari", "Jam", "Min", "Det"][index]}</p>
                      </div>
                    ))}
                  </div>
                  <button className="relative rounded-full bg-[#D9B86C] px-6 py-3 text-sm font-semibold text-[#120D0B]">Buka Undangan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="themes" className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">Pilih Tema</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-6xl">Tema siap pakai untuk momen berkesan.</h2>
            </div>
            <Link href="/dashboard/templates/create" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8A672D]">
              Buat tema sendiri <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {themes.map((theme) => (
              <div key={theme.name} className="group overflow-hidden rounded-[2rem] border border-[#241A16]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
                <div className={`relative aspect-[3/4] bg-gradient-to-br ${theme.bg} p-5 ${theme.text}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.28),transparent_34%)]" />
                  <div className="relative flex h-full flex-col justify-between rounded-[1.6rem] border border-white/20 bg-white/10 p-5 text-center backdrop-blur-sm">
                    <span className="self-end rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{theme.tag}</span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] opacity-60">Wedding</p>
                      <p className="mt-5 font-serif text-5xl leading-none">Ayla & Reza</p>
                    </div>
                    <div className="mx-auto h-px w-24" style={{ backgroundColor: theme.accent }} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-2xl">{theme.name}</h3>
                  <p className="mt-1 text-sm text-[#6F5A4E]">Opening, hero, countdown, RSVP, wishes, dan gift sudah disiapkan.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#18110E] p-6 text-[#F7EBDD] sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D9B86C]">Fitur</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Semua kebutuhan undangan dalam satu dashboard.</h2>
              <p className="mt-5 text-sm leading-7 text-white/55">Kelola template, data undangan, RSVP, gallery, musik, dan publish dari satu tempat.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <feature.icon className="mb-4 size-6 text-[#D9B86C]" />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">Cara Kerja</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-6xl">Buat undangan dalam beberapa menit.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-[#241A16]/10 bg-white p-6 text-left shadow-sm">
                <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#241A16] text-sm font-semibold text-[#F6E7C8]">{index + 1}</div>
                <h3 className="font-serif text-2xl">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6F5A4E]">Proses simpel, hasil tetap terlihat profesional dan siap dibagikan.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-[#241A16] to-[#0F0B09] p-8 text-center text-[#F7EBDD] sm:p-14">
          <Users className="mx-auto mb-5 size-8 text-[#D9B86C]" />
          <h2 className="font-serif text-4xl leading-tight sm:text-6xl">Siap membuat undangan digital yang lebih berkelas?</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55">Mulai dari template premium, edit data, preview, lalu publish untuk dibagikan ke semua tamu.</p>
          <Link href="/dashboard/invitations/create" className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#D9B86C] px-7 text-sm font-semibold text-[#140F0D] transition hover:-translate-y-0.5">
            Mulai Sekarang <Heart className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
