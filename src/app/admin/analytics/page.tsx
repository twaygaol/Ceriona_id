"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, Eye, LayoutTemplate, Mail, Users } from "lucide-react";

interface AdminOverview {
  stats: {
    users: number;
    clients: number;
    admins: number;
    invitations: number;
    publishedInvitations: number;
    templates: number;
    activeTemplates: number;
    guests: number;
    rsvps: number;
    views: number;
    activeSubscriptions: number;
    expiredSubscriptions: number;
  };
}

export default function AdminAnalyticsPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);

  useEffect(() => {
    axios.get<AdminOverview>("/api/admin/overview").then((response) => setOverview(response.data)).catch(() => null);
  }, []);

  const cards = [
    { label: "Platform Users", value: overview?.stats.users ?? 0, icon: Users },
    { label: "Client Accounts", value: overview?.stats.clients ?? 0, icon: Users },
    { label: "Templates", value: overview?.stats.templates ?? 0, icon: LayoutTemplate },
    { label: "Invitations", value: overview?.stats.invitations ?? 0, icon: Mail },
    { label: "Published", value: overview?.stats.publishedInvitations ?? 0, icon: Mail },
    { label: "Views", value: overview?.stats.views ?? 0, icon: Eye },
    { label: "Active Subs", value: overview?.stats.activeSubscriptions ?? 0, icon: Users },
    { label: "Expired Subs", value: overview?.stats.expiredSubscriptions ?? 0, icon: Users },
  ];

  return (
    <div className="space-y-8 text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#D9B86C]">Admin Analytics</p>
        <h1 className="mt-2 font-serif text-5xl">Platform Insight</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">Halaman analytics admin berfokus ke metrik platform, bukan metrik satu user. Tampilan ini memang dipisahkan agar admin langsung paham kondisi sistem secara keseluruhan.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <card.icon className="mb-4 size-6 text-[#D9B86C]" />
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">{card.label}</p>
            <p className="mt-4 font-serif text-4xl">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="size-6 text-[#D9B86C]" />
          <div>
            <h2 className="font-serif text-3xl">Admin Reading Mode</h2>
            <p className="mt-1 text-sm text-white/55">Tampilan admin sengaja dibuat lebih gelap, lebih padat, dan berorientasi monitoring sistem supaya beda dari dashboard user yang fokus setup undangan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
