"use client";

import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, Eye, Gift, ImageIcon, MapPin, MessageCircle, Music, Sparkles } from "lucide-react";
import type { DashboardTemplate, TemplateSection } from "@/types/template";
import { Stats } from "@/components/sections/Stats";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getRegistryPresets } from "@/services/themeRegistryAdapter";
import type { TemplateThemePreset } from "@/services/templateThemeService";
import { ThemeRenderer } from "@/features/invitation/renderer/ThemeRenderer";

const features = [
  { icon: Clock, title: "Countdown", desc: "Hitung mundur elegan menuju hari bahagia." },
  { icon: ImageIcon, title: "Gallery", desc: "Foto prewedding tampil cinematic dan rapi." },
  { icon: MessageCircle, title: "RSVP", desc: "Konfirmasi kehadiran langsung dari undangan." },
  { icon: Music, title: "Music", desc: "Musik latar untuk pengalaman lebih emosional." },
  { icon: MapPin, title: "Maps", desc: "Lokasi acara terhubung ke Google Maps." },
  { icon: Gift, title: "Gift", desc: "Amplop digital dengan tampilan premium." },
];

const packages = [
  { key: "free", label: "Free", price: "Rp0", desc: "Untuk mencoba flow dasar undangan digital." },
  { key: "premium", label: "Premium", price: "Rp149K", desc: "Untuk wedding digital premium dengan fitur lengkap." },
  { key: "pro", label: "Pro", price: "Rp299K", desc: "Untuk kebutuhan high-end dan operasional maksimal." },
];

export default function HomePage() {
  const router = useRouter();
  const registryPresets = useMemo(() => getRegistryPresets(), []);
  const themes = useMemo(() => registryPresets, [registryPresets]);
  const registryKeys = useMemo(() => new Set(registryPresets.map((t) => t.key)), [registryPresets]);
  const [previewThemeKey, setPreviewThemeKey] = useState<string | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<{ session?: { id: string; status: string } } | null>(null);
  const [paymentResult, setPaymentResult] = useState<{
    order?: { id: string; plan: string; amount: number; status: string } | null;
    nextStep?: string;
    account?: { email: string; temporaryPassword?: string | null; verificationUrl?: string | null; existingAccount?: boolean };
    emailDelivery?: { verification?: { delivered?: boolean; provider?: string }; account?: { delivered?: boolean; provider?: string } } | null;
  } | null>(null);
  const [form, setForm] = useState({
    themeKey: themes[0]?.key ?? "",
    groomName: "Rizky",
    brideName: "Salsabila",
    plan: "premium",
    email: "",
    phone: "",
  });
  const [photoMode, setPhotoMode] = useState(false);

  const selectedTheme = themes.find((theme) => theme.key === form.themeKey) ?? themes[0];
  const previewTheme = themes.find((theme) => theme.key === previewThemeKey) ?? null;

  const openPreview = useCallback((themeKey: string) => {
    const theme = themes.find((t) => t.key === themeKey);
    if (!theme) return;
    setPreviewThemeKey(themeKey);
  }, [themes]);

  const openWizard = (themeKey?: string, targetStep: 1 | 2 | 3 = 1) => {
    if (themeKey) setForm((current) => ({ ...current, themeKey }));
    setWizardOpen(true);
    setStep(targetStep);
    setCheckoutResult(null);
    setPaymentResult(null);
  };

  const handlePrimaryCheckout = async () => {
    setIsSubmitting(true);
    try {
      const checkout = checkoutResult?.session?.id ? checkoutResult : await axios.post("/api/checkout-sessions", form).then((response) => response.data);
      setCheckoutResult(checkout);

      const { data } = await axios.post(`/api/checkout-sessions/${checkout.session.id}/pay`);
      setPaymentResult(data);

      if (data.account?.email && data.account?.temporaryPassword) {
        localStorage.setItem(
          "pendingAuth",
          JSON.stringify({
            email: data.account.email,
            password: data.account.temporaryPassword,
            next: `/dashboard/invitations/create?theme=${encodeURIComponent(form.themeKey)}`,
          })
        );
      }

      if (data.order?.id) {
        router.push(`/checkout/${data.order.id}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden bg-[#fffaf4] text-[#241A16]">
      {/* Hero */}
      <section className="relative min-h-screen px-4 pb-20 pt-24 sm:px-8 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(217,184,108,0.20),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(201,133,140,0.16),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_470px]">
          <div className="max-w-3xl pt-8 lg:pt-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9B86C]/30 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[#8A672D] backdrop-blur-xl">
              <Sparkles className="size-4" />
              Digital Invitation Platform
            </div>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.05em] text-[#241A16] sm:text-7xl lg:text-[6.3rem]">
              Pilih tema undangan, preview live, lalu lanjut ke paket dan checkout.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#6F5A4E] sm:text-lg">
              Homepage tetap bersih. Semua aktivitas pemilihan tema, isi nama pasangan, pilih paket, dan checkout sekarang muncul di popup wizard premium.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#6F5A4E]">
              {["Theme storefront", "Preview realtime", "Wizard dalam popup"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#B99A62]" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <InfoCard title="Tema" value={`${themes.length}+`} desc="Preview visual siap pakai" />
              <InfoCard title="Flow" value="3 Step" desc="Pilih, preview, checkout" />
              <InfoCard title="Mode" value="Popup" desc="Website tetap bersih" />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button onClick={() => openWizard(undefined, 1)} className="bg-brown text-gold-light hover:bg-gold hover:text-brown">
                Mulai Pilih Tema
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[390px]">
            <ThemePhonePreview theme={selectedTheme} groomName={form.groomName} brideName={form.brideName} />
          </div>
        </div>
      </section>

      {/* Theme Storefront */}
      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B99A62]">Pilih Tema</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-6xl">Storefront tema yang bisa langsung dipreview.</h2>
            </div>
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
                    <Eye className="size-3.5" /> Preview dulu sebelum lanjut checkout
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => openPreview(theme.key)}>Preview</Button>
                    <Button type="button" onClick={() => openWizard(theme.key, 2)} className="flex-1 bg-brown text-gold-light hover:bg-gold hover:text-brown">
                      Gunakan Tema Ini
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#18110E] p-6 text-[#F7EBDD] sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D9B86C]">Fitur</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Semua kebutuhan undangan dalam satu dashboard.</h2>
              <p className="mt-5 text-sm leading-7 text-white/55">
                Setelah checkout dan akun dibuat, user tinggal masuk ke portal untuk edit tema yang sudah dipilih, upload media, aktifkan RSVP, gift, dan live streaming.
              </p>
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

      <Stats />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />

      {/* Preview Dialog */}
      <Dialog open={Boolean(previewTheme)} onOpenChange={(open) => { if (!open) setPreviewThemeKey(null); }}>
        <DialogContent className="max-w-5xl bg-[#0D0D0D] p-0 text-white">
          {previewTheme && (
            <div className="flex h-[90vh] flex-col">
              <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="ml-2 text-sm font-medium text-white/80">{previewTheme.label}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPreviewThemeKey(null)}
                    className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                  >
                    Tutup
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setForm((current) => ({ ...current, themeKey: previewTheme.key }));
                      setPreviewThemeKey(null);
                      openWizard(previewTheme.key, 2);
                    }}
                    className="bg-brown text-gold-light hover:bg-gold hover:text-brown"
                  >
                    <Sparkles className="size-4" />
                    Gunakan Tema Ini
                  </Button>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center overflow-hidden bg-[#0D0D0D] p-4">
                <div className="h-full w-full overflow-y-auto rounded-2xl bg-white">
                  <ThemeRenderer
                    themeId={previewTheme.key}
                    invitation={{
                      brideName: form.brideName || "Ayla",
                      groomName: form.groomName || "Reza",
                      eventDate: new Date("2026-12-12"),
                      eventTime: "10:00",
                      eventLocation: "Jakarta",
                      story: "Kisah cinta kami dimulai dari sebuah pertemuan yang tidak terduga...",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── WIZARD DIALOG — FIXED ─── */}
      <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
        <DialogContent
          className="overflow-hidden rounded-[2rem] border border-[#241A16]/10 bg-[#fffaf4] p-0 text-[#241A16] shadow-[0_40px_120px_-40px_rgba(36,26,22,0.45)]"
          style={{
            width: "min(96vw, 1280px)",
            maxWidth: "min(96vw, 1280px)",
            height: "90vh",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Wizard Personalisasi Tema Undangan</DialogTitle>
            <DialogDescription>Pilih tema, isi nama pasangan, lalu lanjutkan ke paket dan checkout.</DialogDescription>
          </DialogHeader>

          {/* Two-column grid — responsive: horizontal on md+, stacked on mobile */}
          <div
            className="flex-1 min-h-0 overflow-hidden grid-cols-1 md:grid-cols-[480px_1fr]"
            style={{ display: "grid" }}
          >

            {/* ── LEFT PANEL ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRight: "1px solid rgba(36,26,22,0.10)",
                background: "rgba(255,255,255,0.70)",
                backdropFilter: "blur(12px)",
              }}
            >

              {/* Step tabs */}
              <div style={{ flexShrink: 0, padding: "20px 20px 0" }}>
                <div className="flex gap-1.5 rounded-2xl bg-[#f5ede3] p-1.5">
                  {([1, 2, 3] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStep(item)}
                      className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        step === item ? "bg-brown text-gold-light shadow-sm" : "text-brown-light hover:text-brown"
                      }`}
                    >
                      Step {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable content */}
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                  >

                {/* Step 1 — Tema */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-brown-light">Step 1</p>
                      <h2 className="mt-1.5 font-serif text-3xl text-brown">Pilih Tema</h2>
                      <p className="mt-1 text-sm leading-6 text-brown-light">
                        Pilih visual theme yang paling cocok dengan karakter acara. Preview realtime tampil di kanan.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {themes.slice(0, 6).map((theme) => (
                        <div
                          key={theme.key}
                          onClick={() => setForm((current) => ({ ...current, themeKey: theme.key }))}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setForm((current) => ({ ...current, themeKey: theme.key }));
                            }
                          }}
                          className={`cursor-pointer overflow-hidden rounded-[1.3rem] border bg-white text-left transition ${
                            form.themeKey === theme.key
                              ? "border-brown ring-2 ring-brown/15"
                              : "border-gold/15 hover:border-gold/40"
                          }`}
                        >
                          <div className="h-24 p-3" style={{ background: theme.preview, color: theme.values.textColor }}>
                            <div className="flex h-full items-end rounded-xl border border-white/15 bg-white/10 p-2.5 text-xs font-medium backdrop-blur-sm">
                              {theme.label}
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3">
                            <div>
                              <p className="text-xs font-medium text-brown">{theme.label}</p>
                              <p className="text-[10px] capitalize text-brown-light">{theme.values.category}</p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-[10px]"
                              onClick={(e) => { e.stopPropagation(); openPreview(theme.key); }}
                            >
                              <Eye className="size-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2 — Nama */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="rounded-[1.5rem] border border-gold/15 bg-gradient-to-br from-white to-cream/70 p-5 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.26em] text-brown-light">Step 2</p>
                      <h2 className="mt-1.5 font-serif text-3xl text-brown">Lihat undangan dengan nama kamu & pasangan</h2>
                      <p className="mt-2 text-sm leading-6 text-brown-light">
                        Ketik nama mempelai pria dan wanita. Preview di kanan akan langsung berubah secara realtime. Kalau belum cocok, kamu bisa kembali ke step tema kapan saja.
                      </p>
                    </div>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-brown">Nama Mempelai Pria</span>
                      <input
                        value={form.groomName}
                        onChange={(e) => setForm((current) => ({ ...current, groomName: e.target.value }))}
                        className="input-premium"
                          placeholder="Contoh: Rizky"
                        />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-brown">Nama Mempelai Wanita</span>
                      <input
                        value={form.brideName}
                        onChange={(e) => setForm((current) => ({ ...current, brideName: e.target.value }))}
                        className="input-premium"
                          placeholder="Contoh: Salsabila"
                        />
                    </label>
                    <button
                      type="button"
                      onClick={() => setPhotoMode((current) => !current)}
                      className={`flex w-full items-center justify-between rounded-[1.3rem] border p-4 text-left transition ${photoMode ? "border-brown bg-brown text-gold-light" : "border-gold/15 bg-white"}`}
                    >
                      <div>
                        <p className="font-medium">Mode tanpa foto</p>
                        <p className={`mt-1 text-sm leading-6 ${photoMode ? "text-gold-light/75" : "text-brown-light"}`}>Cocok untuk user yang belum punya foto pre-wedding atau ingin preview lebih minimal.</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${photoMode ? "bg-gold text-brown" : "bg-cream text-brown-light"}`}>{photoMode ? "Aktif" : "Nonaktif"}</span>
                    </button>
                    <div className="rounded-[1.3rem] border border-gold/15 bg-white p-4 text-sm leading-6 text-brown-light">
                      <p className="font-medium text-brown">Tips</p>
                      <p className="mt-1">Gunakan nama panggilan yang ingin ditampilkan di cover undangan. Nama ini nanti bisa tetap diedit lagi di dashboard setelah akun aktif.</p>
                    </div>
                    <div className="rounded-[1.3rem] border border-gold/15 bg-white p-4 text-sm leading-6 text-brown-light">
                      <p className="font-medium text-brown">Cocok? Gunakan tema ini</p>
                      <p className="mt-1">Kalau preview di kanan sudah terasa pas, lanjut ke paket tanpa perlu pilih tema lagi dari awal.</p>
                    </div>
                  </div>
                )}

                {/* Step 3 — Paket */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="rounded-[1.5rem] border border-gold/15 bg-gradient-to-br from-white to-cream/70 p-5 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.26em] text-brown-light">Step 3</p>
                      <h2 className="mt-1.5 font-serif text-3xl text-brown">Pilih Paket & Checkout</h2>
                      <p className="mt-1 text-sm leading-6 text-brown-light">
                        Pilih paket yang sesuai. Setelah ini sistem membuat checkout session, menyiapkan akun, dan melanjutkan user ke tahap pembayaran.
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {packages.map((pkg) => (
                        <button
                          key={pkg.key}
                          type="button"
                          onClick={() => setForm((current) => ({ ...current, plan: pkg.key }))}
                          className={`rounded-[1.3rem] border p-3.5 text-left transition ${
                            form.plan === pkg.key
                              ? "border-brown bg-brown text-gold-light shadow-lg"
                              : "border-gold/15 bg-white hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-serif text-xl">{pkg.label}</p>
                            {pkg.key === "premium" && <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.18em]">Best</span>}
                          </div>
                          <p className="mt-1.5 text-xs font-medium opacity-85">{pkg.price}</p>
                          <p className="mt-1 text-[10px] leading-relaxed opacity-65">{pkg.desc}</p>
                          <div className="mt-3 h-px w-full bg-current/10" />
                          <p className="mt-3 text-[10px] uppercase tracking-[0.18em] opacity-55">{pkg.key === "free" ? "Trial" : pkg.key === "premium" ? "Recommended" : "Business"}</p>
                        </button>
                      ))}
                    </div>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-brown">Email</span>
                      <input
                        value={form.email}
                        onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                        className="input-premium"
                        type="email"
                        placeholder="nama@email.com"
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-brown">Nomor HP</span>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
                        className="input-premium"
                        placeholder="08xxxxxxxxxx"
                      />
                    </label>

                  {paymentResult?.order && (
                      <div className="space-y-3 rounded-[1.7rem] border border-green-200 bg-gradient-to-br from-green-50 to-white px-5 py-5 text-sm text-green-800 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.22em] text-green-700/70">Checkout Ready</p>
                        <p className="font-serif text-2xl text-green-900">Pesanan berhasil dibuat</p>
                        <p>Order ID: <span className="font-medium">{paymentResult.order.id}</span></p>
                        <p>Status saat ini: <span className="font-medium uppercase">{paymentResult.order.status}</span></p>
                        {paymentResult.account?.email && <p>Email tujuan akun: <span className="font-medium">{paymentResult.account.email}</span></p>}

                        {paymentResult.order.status === "pending" && (
                          <div className="rounded-2xl border border-green-200/60 bg-white/70 p-4 text-sm leading-6 text-green-900">
                            <p className="font-medium">Langkah berikutnya</p>
                            <p className="mt-2">Selesaikan pembayaran terlebih dahulu. Setelah pembayaran terkonfirmasi, sistem akan otomatis:</p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-green-900/90">
                              <li>mengaktifkan akun user</li>
                              <li>mengirim email verifikasi</li>
                              <li>mengirim detail login dashboard</li>
                              <li>membuat draft undangan dengan tema yang sudah dipilih</li>
                            </ul>
                            <p className="mt-4 text-xs text-green-700/80">Anda akan diarahkan otomatis ke halaman pembayaran.</p>
                          </div>
                        )}

                        {paymentResult.order.status === "paid" && paymentResult.emailDelivery?.verification?.delivered && (
                          <>
                            <p>{paymentResult.account?.existingAccount ? "Akun Anda sudah ada. Link verifikasi terbaru dan instruksi login sudah dikirim ke email." : "Link verifikasi dan detail akun sudah dikirim ke email. Cek inbox untuk melanjutkan ke portal."}</p>
                            <p className="text-xs text-green-700/80">Jika belum ada di inbox, cek folder spam atau promotions.</p>
                          </>
                        )}

                        {paymentResult.order.status === "paid" && !paymentResult.emailDelivery?.verification?.delivered && (
                          <>
                            {paymentResult.account?.temporaryPassword && (
                              <p>Password sementara: <span className="font-medium">{paymentResult.account.temporaryPassword}</span></p>
                            )}
                            {paymentResult.account?.verificationUrl && (
                              <a className="font-medium underline" href={paymentResult.account.verificationUrl}>Buka verifikasi email</a>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer buttons — always visible at bottom */}
              <div style={{ flexShrink: 0, borderTop: "1px solid rgba(36,26,22,0.10)", background: "rgba(255,255,255,0.80)", padding: "16px 20px", backdropFilter: "blur(8px)" }}>
                <div className="flex gap-3">
                  {step > 1 && (
                    <Button variant="outline" onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}>
                      Kembali
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                      className="h-11 flex-1 rounded-full bg-brown text-gold-light hover:bg-gold hover:text-brown"
                    >
                      {step === 1 ? "Lanjut Isi Nama Pasangan" : "Lanjut Pilih Paket"}
                    </Button>
                  ) : (
                    <Button
                      disabled={isSubmitting || !form.email || !form.phone || !form.groomName || !form.brideName}
                      onClick={handlePrimaryCheckout}
                      className="h-11 flex-1 rounded-full bg-brown text-gold-light hover:bg-gold hover:text-brown"
                    >
                      {isSubmitting ? "Menyiapkan Pembayaran..." : "Lanjut ke Pembayaran"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL — Live Preview (hidden on mobile) ── */}
            <div
              className="hidden md:flex"
              style={{
                flexDirection: "column",
                overflow: "hidden",
                background: "linear-gradient(160deg,#f7f1e8,#efe3d3)",
                padding: "24px",
              }}
            >
              <div className="mb-5 shrink-0 rounded-[1.3rem] border border-[#241A16]/10 bg-white/70 p-4 shadow-sm backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-[#B99A62]">Live Preview</p>
                <h3 className="mt-1.5 font-serif text-2xl text-[#241A16]">{selectedTheme.label}</h3>
                <p className="mt-1 text-sm leading-6 text-[#6F5A4E]">
                  Preview mengikuti tema yang dipilih, nama pasangan, dan mode foto secara realtime.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#8A672D]">
                  <span className="rounded-full bg-white px-3 py-1 shadow-sm">{form.groomName}</span>
                  <span className="rounded-full bg-white px-3 py-1 shadow-sm">{form.brideName}</span>
                  <span className="rounded-full bg-white px-3 py-1 shadow-sm">{photoMode ? "Tanpa foto" : "Dengan foto"}</span>
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <ThemePhonePreview theme={selectedTheme} groomName={form.groomName} brideName={form.brideName} photoMode={photoMode} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function InfoCard({ title, value, desc }: { title: string; value: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-[#241A16]/10 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.22em] text-[#B99A62]">{title}</p>
      <p className="mt-3 font-serif text-3xl text-[#241A16]">{value}</p>
      <p className="mt-1 text-sm text-[#6F5A4E]">{desc}</p>
    </div>
  );
}

function ThemePhonePreview({
  theme,
  groomName,
  brideName,
  photoMode = false,
}: {
  theme: TemplateThemePreset;
  groomName: string;
  brideName: string;
  photoMode?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[420px] scale-[0.92] sm:scale-[0.96] xl:scale-100">
      <div className="absolute -inset-8 rounded-[3rem] bg-[#D9B86C]/20 blur-3xl" />
      <div className="relative rounded-[3rem] border border-white/50 bg-[#120D0B] p-3 shadow-[0_40px_120px_-50px_rgba(36,26,22,0.9)]">
        <div className="overflow-hidden rounded-[2.45rem] text-[#F7EBDD]" style={{ background: theme.preview }}>
          <div className="relative flex min-h-[640px] flex-col justify-between p-7 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.18),transparent_34%)]" />
            <div className="absolute inset-5 rounded-[2rem] border border-white/20" />
            <div className="absolute inset-x-10 top-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            {!photoMode && <div className="absolute inset-x-8 top-24 h-52 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_60%)] blur-xl" />}
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.35em] opacity-70">{theme.opening.eyebrow}</p>
              <h2 className="mt-8 font-serif text-5xl leading-none">
                {groomName}
                <br />&<br />
                {brideName}
              </h2>
              <p className="mt-6 text-sm opacity-70">{photoMode ? "Mode tanpa foto aktif" : "Preview realtime tema yang dipilih"}</p>
            </div>
            <div className="relative grid grid-cols-4 gap-2 rounded-3xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
              {["12", "08", "45", "22"].map((item, index) => (
                <div key={index} className="rounded-2xl bg-black/15 py-3">
                  <p className="font-serif text-2xl">{item}</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">{["Hari", "Jam", "Min", "Det"][index]}</p>
                </div>
              ))}
            </div>
            <button className="relative rounded-full bg-white/80 px-6 py-3 text-sm font-semibold text-[#120D0B]">
              {theme.opening.buttonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
