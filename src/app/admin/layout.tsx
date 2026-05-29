"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { BarChart3, CreditCard, LayoutDashboard, LayoutTemplate, LogOut, Mail, Settings, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Session } from "next-auth";

const adminItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: LayoutTemplate, label: "Template", href: "/admin/templates" },
  { icon: Mail, label: "Undangan", href: "/admin/invitations" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: CreditCard, label: "Billing", href: "/admin/billing/orders" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    getSession().then((currentSession) => {
      if (!mounted) return;
      setSession(currentSession);
      setLoading(false);
      if (!currentSession) router.replace("/login");
      if (currentSession && currentSession.user.role !== "admin") router.replace("/dashboard");
    });
    return () => { mounted = false; };
  }, [router]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#0f0b09]"><div className="space-y-4 text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gold-accent border-t-transparent" /><p className="text-sm text-gold-accent">Memuat admin...</p></div></div>;
  if (!session || session.user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-[#0f0b09] text-[#F7EBDD]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-[#15100e]/95 p-5 backdrop-blur-xl lg:block">
        <Link href="/admin" className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-accent text-[#15100e]"><Shield className="size-5" /></div>
          <div>
            <p className="font-serif text-2xl leading-none">Ceriona</p>
            <p className="text-xs uppercase tracking-[0.24em] text-gold-accent">Admin</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-2">
          {adminItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition", active ? "bg-gold-accent text-[#15100e]" : "text-white/65 hover:bg-white/10 hover:text-white")}>
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={() => signOut({ callbackUrl: "/login" })} className="absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/65 hover:bg-white/10">
          <LogOut className="size-4" /> Logout
        </button>
      </aside>

      <main className="min-h-screen lg:pl-72">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(217,184,108,0.10),transparent_28%),linear-gradient(180deg,#0f0b09,#15100e)] p-5 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
