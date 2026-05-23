"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { CheckCircle2, Crown, Eye, Gift, ImageIcon, Mail, MessageCircle, Music, Radio, Rocket, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardOverview {
  user: { id: string; name?: string | null; email: string; role: string };
  currentPlan: string;
  plan: {
    key: string;
    label: string;
    invitationLimit: number | "unlimited";
    templateTier: string;
    features: {
      whatsappBroadcast: boolean;
      weddingGift: boolean;
      liveStreaming: boolean;
      analyticsAdvanced: boolean;
      customTheme: boolean;
      prioritySupport: boolean;
    };
  };
  subscription?: {
    id: string;
    plan: string;
    status: string;
    startsAt: string;
    expiresAt?: string | null;
  } | null;
  orderCount: number;
  totals: { invitations: number; published: number; views: number; guests: number; rsvps: number };
  invitations: Array<{
    id: string;
    title: string;
    couple: string;
    template: string;
    isPublished: boolean;
    views: number;
    guestCount: number;
    rsvpCount: number;
    checklist: { basicInfo: boolean; gallery: boolean; music: boolean; guests: boolean; gift: boolean; live: boolean; published: boolean };
    progressPercent: number;
    updatedAt: string;
  }>;
  recentRsvps: Array<{ id: string; name: string; attending: boolean; guestCount: number; createdAt: string; invitation: { title: string } }>;
  recentGuestLogs: Array<{ id: string; guest?: string | null; provider: string; status: string; createdAt: string }>;
}

const checklistLabels = {
  basicInfo: "Info dasar",
  gallery: "Galeri",
  music: "Musik",
  guests: "Data tamu",
  gift: "Wedding gift",
  live: "Live streaming",
  published: "Published",
} as const;

export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    axios.get<DashboardOverview>("/api/dashboard/overview").then((response) => setOverview(response.data)).catch(() => null);
  }, []);

  const mostReadyInvitation = useMemo(() => overview?.invitations[0] ?? null, [overview]);

  if (!overview) return <div className="py-20 text-center text-brown-light">Memuat dashboard...</div>;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border-gold/15 bg-white/80 shadow-[0_20px_60px_-40px_rgba(74,55,40,0.45)] backdrop-blur-xl">
          <CardContent className="p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-brown-light">User Dashboard</p>
            <h1 className="mt-3 font-serif text-4xl text-brown sm:text-5xl">Halo, {overview.user.name || overview.user.email}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-brown-light">Di sini kamu bisa setup undangan, lengkapi tamu, aktifkan RSVP, musik, galeri, gift, dan live streaming sampai siap dibagikan ke tamu.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/dashboard/invitations/create" className="inline-flex items-center gap-2 rounded-full bg-brown px-5 py-3 text-sm font-semibold text-gold-light hover:bg-gold hover:text-brown"><Rocket className="size-4" /> Buat Undangan Baru</Link>
              <Link href="/dashboard/billing" className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white px-5 py-3 text-sm font-semibold text-brown hover:border-brown"><Crown className="size-4" /> Upgrade Paket</Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold/15 bg-brown text-gold-light shadow-[0_20px_60px_-40px_rgba(74,55,40,0.6)]">
          <CardContent className="p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-gold-light/70">Current Plan</p>
            <h2 className="mt-3 font-serif text-4xl uppercase">{overview.plan.label}</h2>
            <p className="mt-3 text-sm leading-7 text-gold-light/75">Pesanan paket tercatat {overview.orderCount} kali. Plan aktif dibaca dari subscription yang statusnya active.</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/10 px-3 py-1">Limit undangan: {overview.plan.invitationLimit}</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Tier template: {overview.plan.templateTier}</span>
              {overview.subscription?.expiresAt && <span className="rounded-full bg-white/10 px-3 py-1">Berakhir: {new Date(overview.subscription.expiresAt).toLocaleDateString("id-ID")}</span>}
            </div>
            <Link href="/dashboard/billing" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-brown">Kelola Billing</Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Mail} label="Undangan" value={overview.totals.invitations} />
        <StatCard icon={CheckCircle2} label="Published" value={overview.totals.published} />
        <StatCard icon={Eye} label="Views" value={overview.totals.views} />
        <StatCard icon={Users} label="Tamu" value={overview.totals.guests} />
        <StatCard icon={MessageCircle} label="RSVP" value={overview.totals.rsvps} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Progress Setup Undangan</CardTitle>
            <CardDescription>Lihat undangan mana yang paling siap dan komponen mana yang masih perlu dilengkapi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {overview.invitations.map((invitation) => (
              <div key={invitation.id} className="rounded-[1.75rem] border border-gold/15 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-serif text-2xl text-brown">{invitation.couple}</p>
                    <p className="mt-1 text-sm text-brown-light">{invitation.template} · {invitation.isPublished ? "Published" : "Draft"}</p>
                  </div>
                  <div className="min-w-[180px]">
                    <div className="mb-2 flex items-center justify-between text-sm text-brown-light">
                      <span>Setup progress</span>
                      <span>{invitation.progressPercent}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-cream">
                      <div className="h-3 rounded-full bg-gold transition-all" style={{ width: `${invitation.progressPercent}%` }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(invitation.checklist).map(([key, done]) => (
                    <span key={key} className={`rounded-full px-3 py-1 text-xs ${done ? "bg-green-100 text-green-700" : "bg-cream text-brown-light"}`}>
                      {checklistLabels[key as keyof typeof checklistLabels]}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-brown-light">
                  <span>{invitation.views} views</span>
                  <span>{invitation.guestCount} tamu</span>
                  <span>{invitation.rsvpCount} RSVP</span>
                </div>
              </div>
            ))}
            {overview.invitations.length === 0 && <div className="rounded-3xl border border-dashed border-gold/20 p-10 text-center text-brown-light">Belum ada undangan. Buat undangan pertamamu untuk memulai setup.</div>}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Akses cepat ke bagian yang paling sering diselesaikan user. Beberapa fitur akan terbuka sesuai paket aktif.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <QuickAction href="/dashboard/guests" icon={Users} title="Kelola Tamu" desc="Tambah manual atau import CSV/Excel." />
              <QuickAction href="/dashboard/rsvp" icon={MessageCircle} title="Lihat RSVP" desc="Pantau kehadiran, menu, dan dietary." />
              <QuickAction href="/dashboard/gallery" icon={ImageIcon} title="Upload Galeri" desc="Tambah foto prewedding dan momen acara." />
              <QuickAction href="/dashboard/music" icon={Music} title="Atur Musik" desc="Upload background music undangan." />
              <QuickAction href="/dashboard/gifts" icon={Gift} title="Wedding Gift" desc="Tambah rekening, e-wallet, atau QR." locked={!overview.plan.features.weddingGift} />
              <QuickAction href="/dashboard/live-streaming" icon={Radio} title="Live Streaming" desc="Tambahkan link YouTube, Zoom, atau Meet." locked={!overview.plan.features.liveStreaming} />
            </CardContent>
          </Card>

          {mostReadyInvitation && (
            <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Undangan Paling Siap</CardTitle>
                <CardDescription>Sistem menampilkan undangan yang terakhir aktif diperbarui agar kamu bisa lanjut setup lebih cepat.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-serif text-2xl text-brown">{mostReadyInvitation.couple}</p>
                <p className="mt-2 text-sm text-brown-light">Template: {mostReadyInvitation.template}</p>
                <p className="mt-2 text-sm text-brown-light">Progress: {mostReadyInvitation.progressPercent}%</p>
                <Link href="/dashboard/invitations" className="mt-4 inline-flex rounded-full bg-brown px-5 py-3 text-sm font-semibold text-gold-light hover:bg-gold hover:text-brown">Buka Undangan Saya</Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Aktivitas RSVP Terbaru</CardTitle>
            <CardDescription>Lihat respon tamu terbaru tanpa perlu membuka halaman RSVP penuh.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {overview.recentRsvps.map((rsvp) => (
              <div key={rsvp.id} className="rounded-2xl border border-gold/15 bg-white px-4 py-3">
                <p className="font-medium text-brown">{rsvp.name}</p>
                <p className="mt-1 text-xs text-brown-light">{rsvp.invitation.title} · {rsvp.guestCount} orang</p>
                <p className="mt-2 text-xs text-gold-dark">{rsvp.attending ? "Hadir" : "Tidak Hadir"}</p>
              </div>
            ))}
            {overview.recentRsvps.length === 0 && <p className="text-sm text-brown-light">Belum ada RSVP terbaru.</p>}
          </CardContent>
        </Card>

        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Aktivitas Broadcast WhatsApp</CardTitle>
            <CardDescription>Ringkasan pengiriman undangan ke tamu.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {overview.recentGuestLogs.map((log) => (
              <div key={log.id} className="rounded-2xl border border-gold/15 bg-white px-4 py-3">
                <p className="font-medium text-brown">{log.guest || "Guest"}</p>
                <p className="mt-1 text-xs text-brown-light">{log.provider}</p>
                <p className="mt-2 text-xs text-gold-dark">{log.status}</p>
              </div>
            ))}
            {overview.recentGuestLogs.length === 0 && <p className="text-sm text-brown-light">Belum ada aktivitas broadcast terbaru.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: number }) {
  return (
    <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.22em] text-brown-light">{label}</p>
          <Icon className="size-4 text-gold" />
        </div>
        <p className="mt-4 font-serif text-4xl text-brown">{value}</p>
      </CardContent>
    </Card>
  );
}

function QuickAction({ href, icon: Icon, title, desc, locked = false }: { href: string; icon: typeof Users; title: string; desc: string; locked?: boolean }) {
  return (
    <Link href={locked ? "/dashboard/billing" : href} className={`rounded-[1.5rem] border border-gold/15 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${locked ? "opacity-80" : ""}`}>
      <Icon className="mb-3 size-5 text-gold-dark" />
      <div className="flex items-center justify-between gap-3"><p className="font-medium text-brown">{title}</p>{locked && <span className="rounded-full bg-gold/15 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-gold-dark">Premium</span>}</div>
      <p className="mt-1 text-sm leading-6 text-brown-light">{desc}</p>
    </Link>
  );
}
