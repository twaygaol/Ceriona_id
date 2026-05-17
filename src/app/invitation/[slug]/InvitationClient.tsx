"use client";

import { useEffect, useState } from "react";
import { Heart, MapPin, Calendar, Clock, Share2, Copy, Check, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RSVPForm } from "@/features/rsvp/RSVPForm";
import { Countdown } from "@/components/ui/Countdown";
import { FloatingMusicButton } from "@/components/ui/FloatingMusicButton";
import { useRSVPStore } from "@/store/useRSVPStore";
import axios from "axios";

export interface InvitationData {
  id: string;
  slug: string;
  brideName: string;
  groomName: string;
  templateId: string;
  eventDate: Date;
  eventTime: string;
  eventLocation: string;
  googleMapsUrl: string;
  story: string;
  gallery: string[];
  rsvps?: {
    id: string;
    invitationId: string;
    name: string;
    attending: boolean;
    guestCount: number;
    message?: string | null;
    createdAt: string | Date;
  }[];
  heroImage?: string;
  musicUrl?: string;
}

interface InvitationClientProps {
  invitation: InvitationData;
}

export function InvitationClient({ invitation }: InvitationClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showOpening, setShowOpening] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenInvitation = () => {
    setShowOpening(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Undangan Pernikahan",
        text: "Kami mengundang Anda untuk hadir di pernikahan kami",
        url: window.location.href,
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showOpening) {
    return (
      <OpeningScreen 
        bride={invitation.brideName} 
        groom={invitation.groomName}
        onOpen={handleOpenInvitation}
      />
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <FloatingMusicButton musicUrl={invitation.musicUrl} />
      
      {/* Hero Section */}
      <HeroSection invitation={invitation} />
      
      {/* Quote Section */}
      <QuoteSection />
      
      {/* Countdown */}
      <CountdownSection date={invitation.eventDate} />
      
      {/* Story Timeline */}
      <StorySection story={invitation.story} />
      
      {/* Gallery */}
      <GallerySection images={invitation.gallery} />
      
      {/* Event Details */}
      <EventDetailsSection 
        date={invitation.eventDate}
        time={invitation.eventTime}
        location={invitation.eventLocation}
        mapsUrl={invitation.googleMapsUrl}
      />
      
      {/* RSVP Form */}
      <RSVPSection invitationId={invitation.id} />
      
      {/* Guest Wishes */}
      <GuestWishesSection invitationId={invitation.id} />
      
      {/* Gift Section */}
      <GiftSection />
      
      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gold/20 py-3 px-5 flex justify-between items-center z-40">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 text-brown text-sm"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <span>{copied ? "Tersalin!" : "Salin Link"}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-brown text-gold-light px-4 py-2 rounded-sm text-sm"
        >
          <Share2 size={16} />
          <span>Bagikan</span>
        </button>
      </div>
    </main>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-cream flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-brown font-serif text-lg">Membuka Undangan...</p>
      </div>
    </div>
  );
}

// Opening Screen Component
interface OpeningScreenProps {
  bride: string;
  groom: string;
  onOpen: () => void;
}

function OpeningScreen({ bride, groom, onOpen }: OpeningScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-brown to-brown-light flex items-center justify-center z-50"
    >
      <div className="text-center px-5">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Heart className="text-gold w-12 h-12 mx-auto mb-6 animate-pulse" />
          <p className="text-gold-light text-sm tracking-widest mb-4">THE WEDDING OF</p>
          <h1 className="font-serif text-4xl md:text-6xl text-gold-light mb-4">
            {bride} & {groom}
          </h1>
          <button
            onClick={onOpen}
            className="mt-8 px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-brown transition-all duration-300 rounded-sm text-sm tracking-wider"
          >
            Buka Undangan
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Hero Section
function HeroSection({ invitation }: { invitation: InvitationData }) {
  const heroImage = invitation.heroImage ?? invitation.gallery[0];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#4A3728]">
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_35%,rgba(201,169,110,0.22)_0%,rgba(74,55,40,0)_62%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#4A3728]/55 via-[#2C2420]/70 to-[#1A1410]" />
      <div className="absolute top-16 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C9A96E] to-transparent opacity-70" />
      <div className="relative z-10 text-center text-[#FAF7F2] px-5">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#E8D5B0] text-sm tracking-widest mb-4">Assalamualaikum Wr. Wb.</p>
          <h2 className="font-serif text-5xl md:text-7xl mb-4">
            {invitation.brideName} & {invitation.groomName}
          </h2>
          <p className="text-[#E8D5B0] text-lg mb-6">Dengan memohon rahmat dan ridho Allah SWT</p>
          <p className="max-w-md mx-auto text-sm leading-relaxed text-[#FAF7F2]/85">
            Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Quote Section
function QuoteSection() {
  return (
    <section className="py-20 px-5 bg-ivory">
      <div className="max-w-2xl mx-auto text-center">
        <Heart className="text-gold w-8 h-8 mx-auto mb-6" />
        <p className="font-serif text-2xl md:text-3xl text-brown italic leading-relaxed">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.&rdquo;
        </p>
        <p className="mt-4 text-gold-dark">— QS. Ar-Rum: 21</p>
      </div>
    </section>
  );
}

// Countdown Section
function CountdownSection({ date }: { date: Date }) {
  return (
    <section className="py-20 px-5 bg-cream">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="font-serif text-3xl text-brown mb-4">Menuju Hari Bahagia</h3>
        <Countdown targetDate={date} />
      </div>
    </section>
  );
}

// Story Section
function StorySection({ story }: { story: string }) {
  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-2xl mx-auto">
        <h3 className="font-serif text-3xl text-brown text-center mb-12">Kisah Cinta Kami</h3>
        <p className="text-brown-light text-center text-sm leading-relaxed mb-10">{story}</p>
        <div className="space-y-8">
          <StoryTimeline year="2020" title="Pertama Bertemu" description="Kisah cinta kami dimulai saat pertama kali bertemu di kampus..." />
          <StoryTimeline year="2022" title="Resmi Berpacaran" description="Setelah 2 tahun saling mengenal, kami memutuskan untuk serius..." />
          <StoryTimeline year="2024" title="Lamaran" description="Di hari yang penuh kebahagiaan, kami resmi bertunangan..." />
        </div>
      </div>
    </section>
  );
}

interface StoryTimelineProps {
  year: string;
  title: string;
  description: string;
}

function StoryTimeline({ year, title, description }: StoryTimelineProps) {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0 w-20 text-gold font-serif text-xl">{year}</div>
      <div>
        <h4 className="font-serif text-xl text-brown mb-2">{title}</h4>
        <p className="text-brown-light text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Gallery Section
function GallerySection({ images }: { images: string[] }) {
  return (
    <section className="py-20 px-5 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <h3 className="font-serif text-3xl text-brown text-center mb-12">Galeri Bahagia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-square bg-brown/10 rounded-lg overflow-hidden"
            >
              <Image src={img} alt={`Gallery ${idx + 1}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// function GallerySection({ images }: { images: string[] }) {
//   const fallbackGallery = [
//     "Momen Akad",
//     "Resepsi",
//     "Prewedding",
//   ];

//   return (
//     <section className="py-20 px-5 bg-ivory">
//       <div className="max-w-6xl mx-auto">
//         <h3 className="font-serif text-3xl text-brown text-center mb-12">Galeri Bahagia</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {images.length > 0 ? images.map((img, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ scale: 0.9, opacity: 0 }}
//               whileInView={{ scale: 1, opacity: 1 }}
//               transition={{ delay: idx * 0.1 }}
//               className="relative aspect-square bg-brown/10 rounded-lg overflow-hidden"
//             >
//               <Image src={img} alt={`Gallery ${idx + 1}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
//             </motion.div>
//           )) : fallbackGallery.map((label, idx) => (
//             <motion.div
//               key={label}
//               initial={{ scale: 0.9, opacity: 0 }}
//               whileInView={{ scale: 1, opacity: 1 }}
//               transition={{ delay: idx * 0.1 }}
//               className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gold/25 via-cream to-dusty-rose/30 border border-gold/20 flex items-center justify-center"
//             >
//               <div className="text-center px-6">
//                 <div className="w-12 h-px bg-gold mx-auto mb-4" />
//                 <p className="font-serif text-2xl text-brown">{label}</p>
//                 <p className="mt-2 text-xs uppercase tracking-[0.2em] text-brown-light">
//                   Foto Demo
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// Event Details Section
interface EventDetailsSectionProps {
  date: Date;
  time: string;
  location: string;
  mapsUrl: string;
}

function EventDetailsSection({ date, time, location, mapsUrl }: EventDetailsSectionProps) {
  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-2xl mx-auto">
        <h3 className="font-serif text-3xl text-brown text-center mb-12">Detail Acara</h3>
        <div className="space-y-6">
          <DetailItem icon={Calendar} label="Tanggal" value={date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} />
          <DetailItem icon={Clock} label="Waktu" value={time} />
          <DetailItem icon={MapPin} label="Tempat" value={location} />
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block text-center text-gold hover:text-gold-dark transition-colors"
        >
          Buka di Google Maps →
        </a>
      </div>
    </section>
  );
}

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 border border-gold/20 rounded-lg">
      <Icon className="text-gold w-6 h-6" />
      <div>
        <p className="text-xs text-gold-dark uppercase tracking-wide">{label}</p>
        <p className="text-brown font-medium">{value}</p>
      </div>
    </div>
  );
}

// RSVP Section
function RSVPSection({ invitationId }: { invitationId: string }) {
  return (
    <section className="py-20 px-5 bg-cream">
      <div className="max-w-xl mx-auto">
        <h3 className="font-serif text-3xl text-brown text-center mb-4">Konfirmasi Kehadiran</h3>
        <p className="text-brown-light text-center mb-8">Mohon isi form berikut untuk konfirmasi kehadiran Anda</p>
        <RSVPForm invitationId={invitationId} />
      </div>
    </section>
  );
}

// Guest Wishes Section
function GuestWishesSection({ invitationId }: { invitationId: string }) {
  const { getRSVPByInvitation, setRSVPs } = useRSVPStore();

  useEffect(() => {
    axios
      .get(`/api/rsvp/${invitationId}`)
      .then((response) => setRSVPs(invitationId, response.data))
      .catch(() => undefined);
  }, [invitationId, setRSVPs]);

  const rsvps = getRSVPByInvitation(invitationId);
  const wishes = rsvps.filter((r) => r.attending && r.message);

  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-2xl mx-auto">
        <h3 className="font-serif text-3xl text-brown text-center mb-12">Ucapan & Doa</h3>
        <div className="space-y-4">
          {wishes.length === 0 ? (
            <p className="text-center text-brown-light">Belum ada ucapan. Jadilah yang pertama memberikan doa!</p>
          ) : (
            wishes.map((wish, idx) => (
              <WishCard key={idx} name={wish.name} message={wish.message ?? ""} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function WishCard({ name, message }: { name: string; message: string }) {
  return (
    <div className="p-4 bg-cream rounded-lg border border-gold/20">
      <p className="font-medium text-brown mb-1">{name}</p>
      <p className="text-brown-light text-sm italic">&ldquo;{message}&rdquo;</p>
    </div>
  );
}

// Gift Section
function GiftSection() {
  return (
    <section className="py-20 px-5 bg-ivory">
      <div className="max-w-md mx-auto text-center">
        <h3 className="font-serif text-3xl text-brown mb-4">Wedding Gift</h3>
        <p className="text-brown-light mb-6">
          Doa restu Anda adalah karunia yang paling berharga bagi kami. 
          Namun jika ingin memberikan hadiah, dapat dikirimkan ke:
        </p>
        <div className="space-y-3">
          <GiftCard bank="BCA" number="1234567890" name="Rizky & Salsabila" />
          <GiftCard bank="Mandiri" number="0987654321" name="Rizky & Salsabila" />
        </div>
      </div>
    </section>
  );
}

interface GiftCardProps {
  bank: string;
  number: string;
  name: string;
}

function GiftCard({ bank, number, name }: GiftCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gold/20">
      <p className="font-medium text-brown">{bank}</p>
      <p className="text-gold font-mono text-lg">{number}</p>
      <p className="text-brown-light text-sm">a.n {name}</p>
      <button
        onClick={handleCopy}
        className="mt-2 text-xs text-gold hover:text-gold-dark"
      >
        {copied ? "Tersalin!" : "Salin Nomor"}
      </button>
    </div>
  );
}
