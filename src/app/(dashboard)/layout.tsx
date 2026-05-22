"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Mail, 
  LayoutTemplate, 
  Users, 
  CheckSquare, 
  Music,
  Image, 
  Settings, 
  CreditCard,
  Gift,
  Radio,
  Menu,
  X,
  LogOut,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Session } from "next-auth";

const userMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Mail, label: "Undangan Saya", href: "/dashboard/invitations" },
  { icon: Users, label: "Data Tamu", href: "/dashboard/guests" },
  { icon: CheckSquare, label: "RSVP", href: "/dashboard/rsvp" },
  { icon: Gift, label: "Wedding Gift", href: "/dashboard/gifts" },
  { icon: Radio, label: "Live Streaming", href: "/dashboard/live-streaming" },
  { icon: Music, label: "Musik", href: "/dashboard/music" },
  { icon: Image, label: "Galeri", href: "/dashboard/gallery" },
  { icon: Settings, label: "Pengaturan", href: "/dashboard/settings" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
];

const adminMenuItems = [
  { icon: LayoutDashboard, label: "Admin Overview", href: "/dashboard" },
  { icon: Mail, label: "Semua Undangan", href: "/dashboard/invitations" },
  { icon: LayoutTemplate, label: "Template Builder", href: "/dashboard/templates" },
  { icon: Users, label: "Data Tamu", href: "/dashboard/guests" },
  { icon: CheckSquare, label: "RSVP", href: "/dashboard/rsvp" },
  { icon: Gift, label: "Wedding Gift", href: "/dashboard/gifts" },
  { icon: Radio, label: "Live Streaming", href: "/dashboard/live-streaming" },
  { icon: Music, label: "Musik", href: "/dashboard/music" },
  { icon: Image, label: "Galeri", href: "/dashboard/gallery" },
  { icon: Settings, label: "Pengaturan", href: "/dashboard/settings" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getSession().then(setSession);
  }, []);

  const userName = session?.user?.name || session?.user?.email || "User";
  const userEmail = session?.user?.email;
  const isAdmin = session?.user?.role === "admin";
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  useEffect(() => {
    if (!session) return;
    if (!isAdmin && pathname.startsWith("/dashboard/templates")) {
      router.replace("/dashboard/invitations");
    }
  }, [isAdmin, pathname, router, session]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-brown text-gold-light p-2 rounded-md"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-gold/20 z-40 transition-transform duration-300",
          "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6">
          <Link href="/" className="font-serif text-4xl font-semibold text-brown">
            Cerio<span className="text-gold">na</span>
          </Link>
          <div className="mt-3 inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold-dark">
            {isAdmin ? "Admin Dashboard" : "User Dashboard"}
          </div>
        </div>
        
        <nav className="mt-6 pb-36">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 text-sm transition-colors",
                  isActive
                    ? "bg-gold/10 text-gold border-r-2 border-gold"
                    : "text-brown-light hover:bg-gold/5 hover:text-brown"
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gold/20 bg-white p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-cream px-3 py-3">
            <UserCircle className="h-9 w-9 text-gold" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-brown">{userName}</p>
              {userEmail && (
                <p className="truncate text-xs text-brown-light">{userEmail}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gold/20 px-3 py-2 text-sm text-brown-light transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
