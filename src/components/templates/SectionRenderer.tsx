"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Copy, Gift, Heart, MapPin, MessageCircleHeart, Navigation, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { RSVPForm } from "@/features/rsvp/RSVPForm";
import type { TemplateSection, TemplateSectionProps } from "@/types/template";

const fallbackGallery = ["/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-3.jpg"];

function color(colors: TemplateSectionProps["colors"], key: keyof TemplateSectionProps["colors"], fallback: string) {
  return colors[key] || fallback;
}

function SectionShell({
  eyebrow,
  title,
  children,
  colors,
  className = "",
  template,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  colors: TemplateSectionProps["colors"];
  className?: string;
  template?: TemplateSectionProps["template"];
}) {
  const charaLike = template?.layout.visualTheme === "chara-51-inspired";

  return (
    <section className={`relative px-4 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24 ${className}`}>
      {charaLike && (
        <>
          <div className="pointer-events-none absolute inset-x-6 top-8 h-px bg-gradient-to-r from-transparent via-[#D9B86C]/45 to-transparent" />
          <div className="pointer-events-none absolute inset-x-6 bottom-8 h-px bg-gradient-to-r from-transparent via-[#D9B86C]/25 to-transparent" />
          <div className="pointer-events-none absolute left-4 top-10 h-20 w-20 rounded-tl-[3rem] border-l border-t border-[#D9B86C]/25" />
          <div className="pointer-events-none absolute right-4 top-10 h-20 w-20 rounded-tr-[3rem] border-r border-t border-[#D9B86C]/25" />
        </>
      )}
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em]" style={{ color: color(colors, "secondary", "#C9A96E") }}>
            {eyebrow}
          </p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl" style={{ color: color(colors, "primary", "#4A3728") }}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-white/35 bg-white/55 shadow-[0_30px_90px_-55px_rgba(44,36,32,0.75)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}

function OpeningSection({ invitation, colors }: TemplateSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center">
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 18%, ${color(colors, "secondary", "#C9A96E")}33, transparent 34%), linear-gradient(145deg, ${color(colors, "primary", "#2C2420")}, #120f0d)` }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,169,110,0.28),transparent_42%)]" />
      <div className="absolute inset-6 rounded-[2.5rem] border border-white/10" />
      <div className="absolute inset-10 rounded-[2rem] border border-[#D9B86C]/20" />
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10 max-w-3xl text-white">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
          <Heart className="size-7" style={{ color: color(colors, "secondary", "#C9A96E") }} />
        </div>
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-white/60">The Wedding Of</p>
        <h1 className="font-serif text-6xl leading-none sm:text-7xl lg:text-8xl" style={{ color: color(colors, "secondary", "#E8D5B0") }}>
          {invitation.brideName} & {invitation.groomName}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/70">Sebuah undangan hangat untuk menjadi bagian dari hari yang penuh cinta dan doa.</p>
      </motion.div>
    </section>
  );
}

function HeroSection({ invitation, colors }: TemplateSectionProps) {
  const heroImage = invitation.heroImage ?? invitation.gallery?.[0];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center">
      {heroImage && <Image src={heroImage} alt={`Foto ${invitation.brideName} dan ${invitation.groomName}`} fill priority sizes="100vw" className="scale-105 object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/80" />
      <div className="absolute inset-4 rounded-[2rem] border border-white/10" />
      <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-[#D9B86C]/45 to-transparent" />
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="relative z-10 max-w-4xl text-white">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5 text-xs uppercase tracking-[0.45em] text-white/65">
          Assalamualaikum Wr. Wb.
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9 }} className="font-serif text-6xl leading-none sm:text-7xl lg:text-9xl">
          {invitation.brideName} <span style={{ color: color(colors, "secondary", "#C9A96E") }}>&</span> {invitation.groomName}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.
        </motion.p>
      </div>
    </section>
  );
}

function QuoteSection({ colors, template }: TemplateSectionProps) {
  return (
    <SectionShell eyebrow="Sacred Verse" title="Tentang Cinta" colors={colors} template={template}>
      <GlassCard className="mx-auto max-w-3xl p-8 text-center sm:p-12">
        <Quote className="mx-auto mb-6 size-10 opacity-50" style={{ color: color(colors, "secondary", "#C9A96E") }} />
        <p className="font-serif text-2xl italic leading-relaxed sm:text-3xl">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.&rdquo;
        </p>
        <p className="mt-6 text-sm uppercase tracking-[0.24em] opacity-60">QS. Ar-Rum: 21</p>
      </GlassCard>
    </SectionShell>
  );
}

function CountdownSection({ invitation, colors, template }: TemplateSectionProps) {
  const target = new Date(invitation.eventDate).getTime();
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const update = () => setDiff(Math.max(target - Date.now(), 0));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const items = [
    [days, "Hari"],
    [hours, "Jam"],
    [minutes, "Menit"],
    [seconds, "Detik"],
  ];

  return (
    <SectionShell eyebrow="Counting Down" title="Menuju Hari Bahagia" colors={colors} template={template}>
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {items.map(([value, label]) => (
          <GlassCard key={label} className="relative overflow-hidden p-6 text-center">
            <div className="absolute inset-x-6 top-0 h-px" style={{ backgroundColor: color(colors, "secondary", "#C9A96E") }} />
            <p className="font-serif text-5xl sm:text-6xl" style={{ color: color(colors, "primary", "#4A3728") }}>{value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] opacity-55">{label}</p>
          </GlassCard>
        ))}
      </div>
    </SectionShell>
  );
}

function StorySection({ invitation, colors, template }: TemplateSectionProps) {
  if (!invitation.story) return null;

  return (
    <SectionShell eyebrow="Our Journey" title="Kisah Cinta Kami" colors={colors} template={template}>
      <div className="mx-auto max-w-4xl">
        <GlassCard className="relative overflow-hidden p-8 sm:p-12">
          <div className="absolute left-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-black/20 to-transparent" />
          <div className="relative flex gap-6">
            <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-lg" style={{ backgroundColor: color(colors, "primary", "#4A3728") }}>
              <Heart className="size-5" />
            </div>
            <p className="text-base leading-8 opacity-75 sm:text-lg">{invitation.story}</p>
          </div>
        </GlassCard>
      </div>
    </SectionShell>
  );
}

function GallerySection({ invitation, colors, template }: TemplateSectionProps) {
  const images = invitation.gallery?.length ? invitation.gallery : fallbackGallery;

  return (
    <SectionShell eyebrow="Captured Moments" title="Galeri Bahagia" colors={colors} template={template}>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <motion.div key={`${image}-${index}`} whileHover={{ scale: 1.025 }} className={`relative overflow-hidden rounded-[1.75rem] bg-black/10 shadow-2xl ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
            <Image src={image} alt={`Galeri ${index + 1}`} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover transition duration-700 hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-80" />
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function EventSection({ invitation, colors, template }: TemplateSectionProps) {
  return (
    <SectionShell eyebrow="Save The Date" title="Detail Acara" colors={colors} template={template}>
      <GlassCard className="mx-auto max-w-4xl p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Detail icon={Calendar} label="Tanggal" value={new Date(invitation.eventDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} colors={colors} />
          <Detail icon={Clock} label="Waktu" value={invitation.eventTime} colors={colors} />
          <Detail icon={MapPin} label="Tempat" value={invitation.eventLocation} colors={colors} />
        </div>
        {invitation.googleMapsUrl && (
          <a href={invitation.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mx-auto mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm text-white transition hover:scale-[1.01] sm:w-auto" style={{ backgroundColor: color(colors, "primary", "#4A3728") }}>
            <Navigation className="size-4" />
            Buka Google Maps
          </a>
        )}
      </GlassCard>
    </SectionShell>
  );
}

function Detail({ icon: Icon, label, value, colors }: { icon: typeof Calendar; label: string; value: string; colors: TemplateSectionProps["colors"] }) {
  return (
    <div className="rounded-[1.5rem] border border-white/40 bg-white/55 p-5 text-center backdrop-blur-xl">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ backgroundColor: color(colors, "primary", "#4A3728") }}>
        <Icon className="size-5" />
      </div>
      <p className="text-xs uppercase tracking-[0.26em] opacity-50">{label}</p>
      <p className="mt-2 font-medium leading-6">{value}</p>
    </div>
  );
}

function RSVPSection({ invitation, colors, template }: TemplateSectionProps) {
  return (
    <SectionShell eyebrow="Be Our Guest" title="Konfirmasi Kehadiran" colors={colors} template={template}>
      <GlassCard className="mx-auto max-w-xl p-5 sm:p-8">
        <RSVPForm invitationId={invitation.id} />
      </GlassCard>
    </SectionShell>
  );
}

function WishesSection({ invitation, colors, template }: TemplateSectionProps) {
  const [wishes, setWishes] = useState(invitation.rsvps?.filter((rsvp) => rsvp.attending && rsvp.message) ?? []);

  useEffect(() => {
    const loadWishes = async () => {
      try {
        const response = await fetch(`/api/rsvp/${invitation.id}`, { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        setWishes(data.filter((rsvp: { attending: boolean; message?: string | null }) => rsvp.attending && rsvp.message));
      } catch {
        // Keep existing wishes if polling fails.
      }
    };

    const timer = window.setInterval(loadWishes, 5000);
    return () => window.clearInterval(timer);
  }, [invitation.id]);

  return (
    <SectionShell eyebrow="Warm Wishes" title="Ucapan & Doa" colors={colors} template={template}>
      <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
        {wishes.length === 0 ? (
          <GlassCard className="col-span-full p-8 text-center text-sm opacity-70">Belum ada ucapan. Jadilah yang pertama memberi doa terbaik.</GlassCard>
        ) : (
          wishes.map((wish) => (
            <GlassCard key={wish.id} className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: color(colors, "primary", "#4A3728") }}>
                  <MessageCircleHeart className="size-4" />
                </div>
                <p className="font-medium">{wish.name}</p>
              </div>
              <p className="text-sm italic leading-7 opacity-75">&ldquo;{wish.message}&rdquo;</p>
            </GlassCard>
          ))
        )}
      </div>
    </SectionShell>
  );
}

interface VirtualGiftItem {
  id: string;
  type: string;
  provider: string;
  accountNumber?: string | null;
  accountName?: string | null;
  qrImageUrl?: string | null;
}

function GiftSection({ invitation, colors, template }: TemplateSectionProps) {
  const [gifts, setGifts] = useState<VirtualGiftItem[]>([]);

  useEffect(() => {
    async function loadGifts() {
      try {
        const response = await fetch(`/api/gifts/${invitation.id}`, { cache: "no-store" });
        if (response.ok) setGifts(await response.json());
      } catch {
        setGifts([]);
      }
    }

    loadGifts();
  }, [invitation.id]);

  return (
    <SectionShell eyebrow="With Love" title="Wedding Gift" colors={colors} template={template}>
      <GlassCard className="mx-auto max-w-2xl p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ backgroundColor: color(colors, "primary", "#4A3728") }}>
          <Gift className="size-6" />
        </div>
        <p className="text-sm leading-7 opacity-75">Doa restu Anda adalah hadiah terbaik bagi kami. Terima kasih atas cinta dan perhatian yang diberikan.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {gifts.map((gift) => (
            <div key={gift.id} className="rounded-2xl border border-black/5 bg-white/45 p-4 text-left backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] opacity-50">{gift.type}</p>
              <p className="mt-1 font-semibold">{gift.provider}</p>
              {gift.accountNumber && <p className="mt-2 font-mono text-sm">{gift.accountNumber}</p>}
              {gift.accountName && <p className="text-sm opacity-70">a.n. {gift.accountName}</p>}
              {gift.accountNumber && (
                <button type="button" onClick={() => navigator.clipboard.writeText(gift.accountNumber ?? "")} className="mt-3 rounded-full border border-current px-3 py-1 text-xs">
                  Salin Nomor
                </button>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </SectionShell>
  );
}

function FooterSection({ invitation, colors }: TemplateSectionProps) {
  return (
    <footer className="relative overflow-hidden px-4 py-20 text-center text-white" style={{ backgroundColor: color(colors, "primary", "#4A3728") }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_38%)]" />
      <div className="relative mx-auto max-w-3xl">
        <Sparkles className="mx-auto mb-6 size-8" style={{ color: color(colors, "secondary", "#C9A96E") }} />
        <p className="mb-3 text-xs uppercase tracking-[0.38em] text-white/55">Terima Kasih</p>
        <p className="font-serif text-5xl" style={{ color: color(colors, "secondary", "#E8D5B0") }}>{invitation.brideName} & {invitation.groomName}</p>
        <button type="button" onClick={() => navigator.clipboard.writeText(window.location.href)} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm backdrop-blur-xl transition hover:bg-white/20">
          <Copy className="size-4" />
          Salin Link Undangan
        </button>
      </div>
    </footer>
  );
}

const sectionComponents: Record<TemplateSection, React.ComponentType<TemplateSectionProps>> = {
  opening: OpeningSection,
  hero: HeroSection,
  quote: QuoteSection,
  countdown: CountdownSection,
  story: StorySection,
  gallery: GallerySection,
  event: EventSection,
  rsvp: RSVPSection,
  wishes: WishesSection,
  gift: GiftSection,
  footer: FooterSection,
};

export function SectionRenderer({ type, invitation, template }: TemplateSectionProps & { type: TemplateSection }) {
  const Component = sectionComponents[type];
  return <Component invitation={invitation} template={template} colors={template.layout.colors ?? {}} />;
}
