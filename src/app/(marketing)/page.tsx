"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Eye, Gift, Heart, ImageIcon, MapPin, MessageCircle, Music, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { templateThemePresets } from "@/services/templateThemeService";

const features = [
  { icon: Clock, title: "Countdown", desc: "Hitung mundur elegan menuju hari bahagia." },
  { icon: ImageIcon, title: "Gallery", desc: "Foto prewedding tampil cinematic dan rapi." },
  { icon: MessageCircle, title: "RSVP", desc: "Konfirmasi kehadiran langsung dari undangan." },
  { icon: Music, title: "Music", desc: "Musik latar untuk pengalaman lebih emosional." },
  { icon: MapPin, title: "Maps", desc: "Lokasi acara terhubung ke Google Maps." },
  { icon: Gift, title: "Gift", desc: "Amplop digital dengan tampilan premium." },
];

const steps = ["Pilih tema", "Isi data", "Preview", "Bagikan link"];

const socialProof = [
  { label: "Template Visual", value: "15+", desc: "Pilihan visual premium siap pakai" },
  { label: "Fitur Inti", value: "10+", desc: "RSVP, gift, live, gallery, music" },
  { label: "Flow Setup", value: "<10 Menit", desc: "Dari pilih tema sampai siap dibagikan" },
  { label: "Target Device", value: "100% Mobile", desc: "Dioptimalkan untuk pengalaman tamu di ponsel" },
];

const useCases = [
  {
    title: "Untuk pasangan yang ingin setup sendiri",
    desc: "Pilih tema, isi detail acara, upload foto, lalu publish tanpa perlu tim design atau developer.",
  },
  {
    title: "Untuk vendor atau wedding organizer",
    desc: "Admin bisa membuat template visual, lalu user/client tinggal memilih dan mengisi datanya sendiri.",
  },
  {
    title: "Untuk undangan yang butuh interaksi lengkap",
    desc: "Tamu bisa RSVP, mengirim ucapan, melihat live stream, membuka maps, dan memberi wedding gift dari satu halaman.",
  },
];

const comparisons = [
  { item: "Preview tema sebelum login", ceriona: true, manual: false },
  { item: "Template visual + opening screen", ceriona: true, manual: false },
  { item: "Guest management + WhatsApp", ceriona: true, manual: false },
  { item: "RSVP, wishes, gift, live stream", ceriona: true, manual: false },
  { item: "Dashboard user & admin terpisah", ceriona: true, manual: false },
];

const faqs = [
  {
    q: "Apakah user harus ngerti design?",
    a: "Tidak. User cukup pilih tema yang sudah disediakan admin, lalu isi data undangan. Visual template akan mengikuti tema yang dipilih.",
  },
  {
    q: "Apakah tema bisa dipreview dulu?",
    a: "Bisa. User bisa preview tema langsung di website sebelum login, lalu klik Gunakan Tema Ini untuk lanjut ke flow create invitation.",
  },
  {
    q: "Apakah tamu bisa RSVP dan kasih ucapan?",
    a: "Bisa. Undangan publik sudah mendukung RSVP enhanced, live guest wishes, wedding gift, dan live streaming jika diaktifkan.",
  },
  {
    q: "Apakah admin dan user dashboard-nya terpisah?",
    a: "Ya. Sistem sudah punya dashboard user untuk setup undangan dan dashboard admin terpisah di slug /admin untuk mengelola platform.",
  },
  {
    q: "Bagaimana sistem pesanan paket bekerja?",
    a: "Saat user klik pilih paket di halaman billing, sistem membuat order baru ke database. Order itu masuk ke Riwayat Pesanan user dan bisa dikelola admin di admin billing orders.",
  },
];

function buildUseThemeUrl(themeKey: string) {
  const destination = `/dashboard/invitations/create?theme=${encodeURIComponent(themeKey)}`;
  return `/register?next=${encodeURIComponent(destination)}`;
}

export default function HomePage() {
  const [previewThemeKey, setPreviewThemeKey] = useState<string | null>(null);
  const themes = useMemo(() => templateThemePresets.slice(0, 9), []);
  const previewTheme = themes.find((theme) => theme.key === previewThemeKey) ?? null;

  return (
    <main className="overflow-hidden bg-[#fffaf4] text-[#241A16]">
      <section className="relative min-h-screen px-4 pb-20 pt-24 sm:px-8 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,184,108,0.20),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(201,133,140,0.16),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_470px]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9B86C]/30 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[#8A672D] backdrop-blur-xl">
              <Sparkles className="size-4" />
              Digital Invitation Platform
            </div>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.05em] text-[#241A16] sm:text-7xl lg:text-[6.5rem]">
              Pilih tema undangan, preview langsung, lalu buat momenmu sendiri.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#6F5A4E] sm:text-lg">
              Pengalaman seperti storefront tema premium: user datang, lihat preview undangan, pilih visual yang paling cocok, lalu lanjut setup setelah login.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#themes" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#241A16] px-7 text-sm font-semibold text-[#F6E7C8] shadow-2xl shadow-[#241A16]/20 transition hover:-translate-y-0.5 hover:bg-[#3A2A22]">
                Pilih Tema Sekarang
                <ArrowRight className="size-4" />
              </a>
              <Link href="/login" className="inline-flex h-13 items-center justify-center rounded-full border border-[#241A16]/15 bg-white/70 px-7 text-sm font-semibold text-[#241A16] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#241A16]/35">
                Masuk ke Akun
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#6F5A4E]">
              {["Tanpa coding", "Preview realtime", "Template siap pakai"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#B99A62]" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[#241A16]/10 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-[#B99A62]">Tema</p>
                <p className="mt-3 font-serif text-3xl text-[#241A16]">15+</p>
                <p className="mt-1 text-sm text-[#6F5A4E]">Pilihan visual siap pakai</p>
              </div>
              <div className="rounded-3xl border border-[#241A16]/10 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-[#B99A62]">Flow</p>
                <p className="mt-3 font-serif text-3xl text-[#241A16]">3 Step</p>
                <p className="mt-1 text-sm text-[#6F5A4E]">Pilih, login, setup</p>
              </div>
              <div className="rounded-3xl border border-[#241A16]/10 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-[#B99A62]">Style</p>
                <p className="mt-3 font-serif text-3xl text-[#241A16]">2026</p>
                <p className="mt-1 text-sm text-[#6F5A4E]">Cinematic & immersive</p>
              </div>
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
                  <button className="relative rounded-full bg-[#D9B86C] px-6 py-3 text-sm font-semibold text-[#120D0B]">Lihat Undangan</button>
                </div>
              </div>
            </div>
            <div className="absolute -left-16 bottom-12 hidden w-44 rounded-[1.8rem] border border-white/40 bg-white/80 p-4 shadow-2xl backdrop-blur-xl lg:block">
              <p className="text-xs uppercase tracking-[0.22em] text-[#B99A62]">Flow User</p>
              <div className="mt-3 space-y-2 text-sm text-[#6F5A4E]">
                <p>1. Preview tema</p>
                <p>2. Gunakan tema</p>
                <p>3. Login & setup</p>
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
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-6xl">Storefront tema yang bisa langsung dipreview.</h2>
            </div>
            <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8A672D]">
              Sudah punya akun? Masuk <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mb-6 flex flex-wrap gap-3 rounded-[2rem] border border-[#241A16]/10 bg-white/70 p-3 backdrop-blur-xl">
            <span className="rounded-full bg-[#241A16] px-4 py-2 text-sm font-semibold text-[#F6E7C8]">Wedding</span>
            <span className="rounded-full px-4 py-2 text-sm text-[#6F5A4E]">Custom</span>
            <span className="rounded-full px-4 py-2 text-sm text-[#6F5A4E]">Tradisional</span>
            <span className="rounded-full px-4 py-2 text-sm text-[#6F5A4E]">Modern</span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {themes.map((theme) => (
              <div key={theme.key} className="group overflow-hidden rounded-[2.2rem] border border-[#241A16]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative aspect-[4/5] p-5" style={{ background: theme.preview, color: theme.values.textColor }}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.28),transparent_34%)]" />
                  <div className="relative flex h-full flex-col justify-between rounded-[1.6rem] border border-white/20 bg-white/10 p-5 text-center backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{theme.values.isPremium ? "Premium" : "Free"}</span>
                      <span className="rounded-full bg-black/15 px-3 py-1 text-xs capitalize backdrop-blur">{theme.values.category}</span>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] opacity-60">{theme.opening.eyebrow}</p>
                      <p className="mt-5 font-serif text-5xl leading-none">Ayla & Reza</p>
                      <p className="mt-3 text-sm opacity-70">12 Des 2026 · Jakarta</p>
                    </div>
                    <div className="mx-auto h-px w-24" style={{ backgroundColor: theme.values.secondaryColor }} />
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <h3 className="font-serif text-2xl">{theme.label}</h3>
                    <p className="mt-1 text-sm text-[#6F5A4E]">{theme.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#8A672D]">
                    <Eye className="size-3.5" />
                    Preview dulu sebelum lanjut login
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setPreviewThemeKey(theme.key)}>
                      Preview
                    </Button>
                    <Link href={buildUseThemeUrl(theme.key)} className="inline-flex flex-1 items-center justify-center rounded-full bg-[#241A16] px-5 py-2 text-sm font-semibold text-[#F6E7C8] transition hover:bg-[#3A2A22]">
                      Gunakan Tema Ini
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">Kenapa Ceriona</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-6xl">Lebih banyak informasi, lebih sedikit kebingungan.</h2>
            <p className="mx-auto max-w-3xl text-sm leading-7 text-[#6F5A4E]">Landing page ini dirancang supaya user langsung paham alur: preview tema, login, setup undangan, lalu bagikan. Admin juga bisa mengelola template tanpa mengganggu flow user pemesan.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {socialProof.map((item) => (
              <div key={item.label} className="rounded-[2rem] border border-[#241A16]/10 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-[#B99A62]">{item.label}</p>
                <p className="mt-3 font-serif text-4xl text-[#241A16]">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-[#6F5A4E]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-8 lg:hidden">
        <div className="fixed inset-x-4 bottom-4 z-40 rounded-full border border-[#241A16]/10 bg-white/90 p-2 shadow-2xl backdrop-blur-xl">
          <a href="#themes" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#241A16] text-sm font-semibold text-[#F6E7C8]">
            Pilih Tema & Mulai
            <ArrowRight className="size-4" />
          </a>
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
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">Use Cases</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-6xl">Bukan cuma landing cantik, tapi flow produk yang jelas.</h2>
              <p className="mt-5 text-sm leading-7 text-[#6F5A4E]">Sistem ini bisa dipakai oleh pasangan langsung, vendor, maupun admin internal yang ingin mengelola library template dan operasional undangan digital secara terstruktur.</p>
            </div>
            <div className="space-y-4">
              {useCases.map((item, index) => (
                <div key={item.title} className="rounded-[2rem] border border-[#241A16]/10 bg-white p-6 shadow-sm">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#241A16] text-sm font-semibold text-[#F6E7C8]">
                    {index + 1}
                  </div>
                  <h3 className="font-serif text-2xl text-[#241A16]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#6F5A4E]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">Cara Kerja</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-6xl">Flow user dibuat sesingkat mungkin.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-[#241A16]/10 bg-white p-6 text-left shadow-sm">
                <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#241A16] text-sm font-semibold text-[#F6E7C8]">{index + 1}</div>
                <h3 className="font-serif text-2xl">{step}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6F5A4E]">Setiap langkah diarahkan agar user cepat sampai ke hasil tanpa bingung dengan pengaturan teknis.</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-[#241A16]/10 bg-white/80 p-6 shadow-sm backdrop-blur-xl sm:p-10 lg:p-14">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">Perbandingan</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-6xl">Kenapa flow ini lebih enak untuk user pemesan.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#6F5A4E]">Alih-alih user langsung dilempar ke dashboard kosong, mereka bisa melihat visual tema dulu di landing page, lalu baru lanjut login dan setup. Ini membuat proses lebih natural dan conversion-friendly.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#241A16]/10 text-[#6F5A4E]">
                  <th className="py-4 pr-4">Fitur</th>
                  <th className="py-4 pr-4">Ceriona</th>
                  <th className="py-4">Flow Manual Biasa</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.item} className="border-b border-[#241A16]/10">
                    <td className="py-4 pr-4 font-medium text-[#241A16]">{row.item}</td>
                    <td className="py-4 pr-4 text-[#8A672D]">{row.ceriona ? "Ya" : "Tidak"}</td>
                    <td className="py-4 text-[#6F5A4E]">{row.manual ? "Ya" : "Tidak"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">Order Flow</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-6xl">Dari pilih paket sampai dikelola admin.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#6F5A4E]">Landing page bukan hanya untuk lihat tema. User juga perlu paham bahwa setelah setup undangan, mereka bisa upgrade paket dan order itu akan masuk ke sistem admin untuk diproses.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["1", "Pilih Paket", "User memilih Free, Premium, atau Pro di halaman billing."],
              ["2", "Order Tercatat", "Sistem membuat order baru dan menyimpannya ke riwayat pesanan user."],
              ["3", "Admin Proses", "Admin melihat order itu di admin billing orders dan mengubah status."],
              ["4", "Plan Aktif", "Saat status menjadi paid, paket user dianggap aktif oleh sistem."],
            ].map(([step, title, desc]) => (
              <div key={title} className="rounded-[2rem] border border-[#241A16]/10 bg-white p-6 shadow-sm">
                <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#241A16] text-sm font-semibold text-[#F6E7C8]">{step}</div>
                <h3 className="font-serif text-2xl text-[#241A16]">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#6F5A4E]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-[#241A16] to-[#0F0B09] p-8 text-center text-[#F7EBDD] sm:p-14">
          <Users className="mx-auto mb-5 size-8 text-[#D9B86C]" />
          <h2 className="font-serif text-4xl leading-tight sm:text-6xl">Sekarang tampilannya sudah fokus ke preview tema.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55">Preview dulu, lalu lanjut login untuk setup undangan dengan tema yang sudah kamu pilih.</p>
          <a href="#themes" className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#D9B86C] px-7 text-sm font-semibold text-[#140F0D] transition hover:-translate-y-0.5">
            Pilih Tema <Heart className="size-4" />
          </a>
        </div>
      </section>

      <section className="px-4 pb-28 pt-4 sm:px-8 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">FAQ</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-6xl">Pertanyaan yang sering muncul.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-[2rem] border border-[#241A16]/10 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
                <h3 className="font-serif text-2xl text-[#241A16]">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6F5A4E]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={Boolean(previewTheme)} onOpenChange={(open) => !open && setPreviewThemeKey(null)}>
        <DialogContent className="max-w-5xl bg-[#120f0d] p-0 text-white">
          {previewTheme && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle>{previewTheme.label}</DialogTitle>
                <DialogDescription className="text-white/60">{previewTheme.description}</DialogDescription>
              </DialogHeader>
              <div className="p-6 pt-4">
                <div className="overflow-hidden rounded-[28px] border border-white/10 p-6" style={{ background: previewTheme.preview, color: previewTheme.values.textColor }}>
                  <div className="rounded-[24px] border border-white/15 bg-white/15 p-6 text-center backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.35em] opacity-60">{previewTheme.opening.eyebrow}</p>
                    <h3 className="mt-5 font-serif text-6xl leading-none">Rizky & Salsabila</h3>
                    <p className="mt-4 text-sm opacity-75">Minggu, 21 Juni 2026 · Jakarta</p>
                    <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 md:grid-cols-4">
                      {["12", "08", "45", "22"].map((item, index) => (
                        <div key={index} className="rounded-2xl border border-white/15 bg-black/15 p-3">
                          <p className="font-serif text-2xl">{item}</p>
                          <p className="text-[10px] uppercase tracking-widest opacity-60">{["Hari", "Jam", "Min", "Det"][index]}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Button type="button" variant="outline" onClick={() => setPreviewThemeKey(null)} className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                        Tutup Preview
                      </Button>
                      <Link href={buildUseThemeUrl(previewTheme.key)} className="inline-flex items-center justify-center rounded-full bg-[#D9B86C] px-6 py-3 text-sm font-semibold text-[#140F0D] transition hover:-translate-y-0.5">
                        Gunakan Tema Ini
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
