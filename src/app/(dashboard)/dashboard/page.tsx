"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckSquare, Eye, Mail, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsData {
  stats: {
    invitations: number;
    publishedInvitations: number;
    totalViews: number;
    guests: number;
    rsvps: number;
    attending: number;
    notAttending: number;
    totalGuestCount: number;
    conversionRate: number;
  };
  monthly: Array<{ month: string; invitations: number; guests: number; rsvps: number }>;
  topInvitations: Array<{ id: string; title: string; couple: string; views: number; template: string; published: boolean }>;
  topTemplates: Array<{ id: string; name: string; usageCount: number }>;
  recentRsvps: Array<{ id: string; name: string; attending: boolean; guestCount: number; session?: string | null; createdAt: string }>;
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const { data } = await axios.get<AnalyticsData>("/api/analytics");
        setAnalytics(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (isLoading || !analytics) {
    return <div className="py-20 text-center text-brown-light">Memuat analytics...</div>;
  }

  const statCards = [
    { title: "Total Undangan", value: analytics.stats.invitations, desc: `${analytics.stats.publishedInvitations} published`, icon: Mail },
    { title: "Total Views", value: analytics.stats.totalViews, desc: "kunjungan undangan", icon: Eye },
    { title: "Total Tamu", value: analytics.stats.guests, desc: "guest list", icon: Users },
    { title: "RSVP Rate", value: `${analytics.stats.conversionRate}%`, desc: `${analytics.stats.rsvps} respon`, icon: TrendingUp },
    { title: "Hadir", value: analytics.stats.attending, desc: `${analytics.stats.totalGuestCount} total orang`, icon: CheckSquare },
    { title: "Tidak Hadir", value: analytics.stats.notAttending, desc: "konfirmasi tidak hadir", icon: CheckSquare },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-brown-light">Analytics Dashboard</p>
        <h1 className="font-serif text-3xl text-brown">Insight Undangan</h1>
        <p className="mt-1 text-sm text-brown-light">Pantau performa undangan, RSVP, tamu, dan template dari satu dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-gold/15 bg-white/80 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-medium text-brown-light">{stat.title}</CardTitle>
                <CardDescription>{stat.desc}</CardDescription>
              </div>
              <stat.icon className="size-5 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brown">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Growth Trend</CardTitle>
            <CardDescription>Undangan, tamu, dan RSVP per bulan.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8D5B0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="guests" stroke="#8A9E85" fill="#8A9E85" fillOpacity={0.25} />
                <Area type="monotone" dataKey="rsvps" stroke="#C9A96E" fill="#C9A96E" fillOpacity={0.25} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Template Usage</CardTitle>
            <CardDescription>Template buatan Anda yang paling sering dipakai.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.topTemplates}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8D5B0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usageCount" fill="#C9A96E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Top Invitations</CardTitle>
            <CardDescription>Undangan dengan views tertinggi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.topInvitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between rounded-2xl border border-gold/15 bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-brown">{invitation.couple}</p>
                  <p className="text-xs text-brown-light">{invitation.template} · {invitation.published ? "Published" : "Draft"}</p>
                </div>
                <span className="rounded-full bg-brown/10 px-3 py-1 text-sm text-brown">{invitation.views} views</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-gold/15 bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Recent RSVP</CardTitle>
            <CardDescription>Aktivitas RSVP terbaru.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.recentRsvps.map((rsvp) => (
              <div key={rsvp.id} className="flex items-center justify-between rounded-2xl border border-gold/15 bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-brown">{rsvp.name}</p>
                  <p className="text-xs text-brown-light">{rsvp.session ?? "all session"} · {rsvp.guestCount} orang</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${rsvp.attending ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {rsvp.attending ? "Hadir" : "Tidak Hadir"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
