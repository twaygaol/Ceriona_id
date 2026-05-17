"use client";

import { useInvitationStore } from "@/store/useInvitationStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, CheckSquare, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const chartData = [
  { month: "Jan", undangan: 12, tamu: 45 },
  { month: "Feb", undangan: 19, tamu: 67 },
  { month: "Mar", undangan: 25, tamu: 89 },
  { month: "Apr", undangan: 32, tamu: 112 },
  { month: "Mei", undangan: 38, tamu: 134 },
  { month: "Jun", undangan: 45, tamu: 156 },
];

export default function DashboardPage() {
  const { invitations } = useInvitationStore();
  
  const stats = [
    { title: "Total Undangan", value: invitations.length, icon: Mail, color: "text-gold" },
    { title: "Total Tamu", value: 156, icon: Users, color: "text-sage" },
    { title: "RSVP Hadir", value: 89, icon: CheckSquare, color: "text-dusty-rose" },
    { title: "Konversi", value: "67%", icon: TrendingUp, color: "text-brown" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-brown mb-2">Dashboard</h1>
      <p className="text-brown-light mb-8">Selamat datang kembali! Berikut statistik undangan Anda.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-brown-light">{stat.title}</CardTitle>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brown">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tren Pembuatan Undangan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="undangan" stroke="#C9A96E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pertumbuhan Tamu</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="tamu" stroke="#8A9E85" fill="#8A9E85" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
