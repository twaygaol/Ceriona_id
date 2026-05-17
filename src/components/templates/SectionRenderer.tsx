"use client";

import Image from "next/image";
import { Calendar, Clock, Copy, Heart, MapPin } from "lucide-react";
import { Countdown } from "@/components/ui/Countdown";
import { RSVPForm } from "@/features/rsvp/RSVPForm";
import type {
  TemplateSection,
  TemplateSectionProps,
} from "@/types/template";

const fallbackGallery = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
];

function color(colors: TemplateSectionProps["colors"], key: keyof TemplateSectionProps["colors"], fallback: string) {
  return colors[key] || fallback;
}

function OpeningSection({ invitation, colors }: TemplateSectionProps) {
  return (
    <section
      className="flex min-h-screen items-center justify-center px-5 text-center"
      style={{ backgroundColor: color(colors, "primary", "#4A3728"), color: color(colors, "secondary", "#E8D5B0") }}
    >
      <div>
        <Heart className="mx-auto mb-6 h-12 w-12" />
        <p className="mb-4 text-sm uppercase tracking-[0.2em]">The Wedding Of</p>
        <h1 className="font-serif text-5xl md:text-7xl">
          {invitation.brideName} & {invitation.groomName}
        </h1>
      </div>
    </section>
  );
}

function HeroSection({ invitation, colors }: TemplateSectionProps) {
  const heroImage = invitation.heroImage ?? invitation.gallery?.[0];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 text-center">
      {heroImage && (
        <Image
          src={heroImage}
          alt={`Foto ${invitation.brideName} dan ${invitation.groomName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 max-w-2xl" style={{ color: color(colors, "secondary", "#E8D5B0") }}>
        <p className="mb-4 text-sm uppercase tracking-[0.2em]">Assalamualaikum Wr. Wb.</p>
        <h2 className="font-serif text-5xl md:text-7xl">
          {invitation.brideName} & {invitation.groomName}
        </h2>
        <p className="mt-6 text-sm leading-relaxed md:text-base">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir.
        </p>
      </div>
    </section>
  );
}

function QuoteSection({ colors }: TemplateSectionProps) {
  return (
    <section className="px-5 py-20 text-center">
      <div className="mx-auto max-w-2xl">
        <Heart className="mx-auto mb-6 h-8 w-8" style={{ color: color(colors, "primary", "#C9A96E") }} />
        <p className="font-serif text-2xl italic leading-relaxed md:text-3xl">
          &ldquo;Dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
        </p>
        <p className="mt-4 text-sm opacity-70">QS. Ar-Rum: 21</p>
      </div>
    </section>
  );
}

function CountdownSection({ invitation }: TemplateSectionProps) {
  return (
    <section className="px-5 py-20 text-center">
      <h3 className="mb-6 font-serif text-3xl">Menuju Hari Bahagia</h3>
      <Countdown targetDate={new Date(invitation.eventDate)} />
    </section>
  );
}

function StorySection({ invitation }: TemplateSectionProps) {
  if (!invitation.story) return null;

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="mb-8 font-serif text-3xl">Kisah Cinta Kami</h3>
        <p className="text-sm leading-relaxed opacity-75">{invitation.story}</p>
      </div>
    </section>
  );
}

function GallerySection({ invitation }: TemplateSectionProps) {
  const images = invitation.gallery?.length ? invitation.gallery : fallbackGallery;

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <h3 className="mb-10 text-center font-serif text-3xl">Galeri Bahagia</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="relative aspect-square overflow-hidden rounded-lg bg-black/10">
              <Image src={image} alt={`Galeri ${index + 1}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventSection({ invitation, colors }: TemplateSectionProps) {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-2xl">
        <h3 className="mb-10 text-center font-serif text-3xl">Detail Acara</h3>
        <div className="space-y-4">
          <Detail icon={Calendar} label="Tanggal" value={new Date(invitation.eventDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} colors={colors} />
          <Detail icon={Clock} label="Waktu" value={invitation.eventTime} colors={colors} />
          <Detail icon={MapPin} label="Tempat" value={invitation.eventLocation} colors={colors} />
        </div>
        {invitation.googleMapsUrl && (
          <a href={invitation.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-8 block text-center text-sm underline">
            Buka Google Maps
          </a>
        )}
      </div>
    </section>
  );
}

function Detail({ icon: Icon, label, value, colors }: { icon: typeof Calendar; label: string; value: string; colors: TemplateSectionProps["colors"] }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-black/10 bg-white/60 p-4">
      <Icon className="h-5 w-5" style={{ color: color(colors, "primary", "#C9A96E") }} />
      <div>
        <p className="text-xs uppercase tracking-wide opacity-60">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function RSVPSection({ invitation }: TemplateSectionProps) {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-xl">
        <h3 className="mb-4 text-center font-serif text-3xl">Konfirmasi Kehadiran</h3>
        <RSVPForm invitationId={invitation.id} />
      </div>
    </section>
  );
}

function WishesSection({ invitation }: TemplateSectionProps) {
  const wishes = invitation.rsvps?.filter((rsvp) => rsvp.attending && rsvp.message) ?? [];

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-2xl">
        <h3 className="mb-8 text-center font-serif text-3xl">Ucapan & Doa</h3>
        <div className="space-y-3">
          {wishes.length === 0 ? (
            <p className="text-center text-sm opacity-70">Belum ada ucapan.</p>
          ) : (
            wishes.map((wish) => (
              <div key={wish.id} className="rounded-lg bg-white/60 p-4">
                <p className="font-medium">{wish.name}</p>
                <p className="text-sm italic opacity-75">&ldquo;{wish.message}&rdquo;</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function GiftSection() {
  return (
    <section className="px-5 py-20 text-center">
      <div className="mx-auto max-w-md">
        <h3 className="mb-4 font-serif text-3xl">Wedding Gift</h3>
        <p className="text-sm leading-relaxed opacity-75">
          Doa restu Anda adalah hadiah terbaik bagi kami.
        </p>
      </div>
    </section>
  );
}

function FooterSection({ invitation, colors }: TemplateSectionProps) {
  return (
    <footer className="px-5 py-14 text-center" style={{ backgroundColor: color(colors, "primary", "#4A3728"), color: color(colors, "secondary", "#E8D5B0") }}>
      <p className="font-serif text-3xl">{invitation.brideName} & {invitation.groomName}</p>
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(window.location.href)}
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-current px-4 py-2 text-sm"
      >
        <Copy size={16} />
        Salin Link
      </button>
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

export function SectionRenderer({
  type,
  invitation,
  template,
}: TemplateSectionProps & { type: TemplateSection }) {
  const Component = sectionComponents[type];
  return <Component invitation={invitation} template={template} colors={template.layout.colors ?? {}} />;
}
