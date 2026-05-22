"use client";

import Link from "next/link";
import { BarChart3, LayoutTemplate, Mail, Users } from "lucide-react";

const cards = [
  { title: "Template Builder", desc: "Kelola tema visual dan template undangan.", href: "/admin/templates", icon: LayoutTemplate },
  { title: "Semua Undangan", desc: "Pantau undangan yang dibuat user.", href: "/admin/invitations", icon: Mail },
  { title: "Users", desc: "Kelola role user dan admin.", href: "/admin/users", icon: Users },
  { title: "Analytics", desc: "Insight performa platform.", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#D9B86C]">Admin Console</p>
        <h1 className="mt-2 font-serif text-5xl text-white">Platform Management</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">Dashboard khusus admin untuk mengelola template, user, billing, dan analytics platform.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10">
            <card.icon className="mb-6 size-8 text-[#D9B86C]" />
            <h2 className="font-serif text-2xl text-white">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
