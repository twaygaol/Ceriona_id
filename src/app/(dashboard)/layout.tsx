"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Mail,
  Search,
  Bell,
  LayoutTemplate, 
  Users, 
  CheckSquare,
  Gift,
  Radio,
  Music,
  ImageIcon,
  QrCode,
  MessageSquareQuote,
  MessageCircle,
  CalendarDays,
  Settings, 
  CreditCard,
  Menu,
  X,
  LogOut,
  UserCircle,
  Moon,
  Sun,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Session } from "next-auth";

const userMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Daftar Tamu", href: "/dashboard/guests" },
  { icon: QrCode, label: "Check-in QR", href: "/dashboard/checkin" },
  { icon: MessageSquareQuote, label: "Ucapan Tamu", href: "/dashboard/wishes" },
  { icon: MessageCircle, label: "Template WhatsApp", href: "/dashboard/whatsapp-templates" },
  { icon: CalendarDays, label: "Wedding Planner", href: "/dashboard/planner" },
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
  { icon: ImageIcon, label: "Galeri", href: "/dashboard/gallery" },
  { icon: Settings, label: "Pengaturan", href: "/dashboard/settings" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [darkMode, setDarkMode] = useState(false);
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

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-cream">
        {children}
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen", darkMode ? "bg-[#0f172a] text-white" : "bg-[#f6f8fb] text-[#0f172a]") }>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn("fixed left-4 top-4 z-50 rounded-2xl p-2 lg:hidden", darkMode ? "bg-[#111827] text-white" : "bg-[#0f172a] text-white")}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar — flex column: header (fixed), nav (scrollable), footer (fixed) */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 flex h-full flex-col border-r transition-all duration-300",
          darkMode ? "border-white/10 bg-[#0b1220]" : "border-[#0f172a]/8 bg-white",
          sidebarCollapsed ? "w-20" : "w-72",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex-shrink-0 p-6">
          <div className="flex items-center justify-between">
            <Link href="/" className={cn("font-serif text-3xl font-semibold tracking-wide", darkMode ? "text-white" : "text-[#0f172a]", sidebarCollapsed && "hidden")}>
              Cerio<span className="text-[#D9B86C]">na</span>
            </Link>
            {sidebarCollapsed && (
              <Link href="/" className={cn("font-serif text-2xl font-semibold", darkMode ? "text-white" : "text-[#0f172a]")}>
                C
              </Link>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn("hidden rounded-lg p-1.5 transition hover:bg-white/10 lg:block", darkMode ? "text-white/60 hover:text-white" : "text-[#0f172a]/60 hover:text-[#0f172a]")}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarCollapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                )}
              </svg>
            </button>
          </div>
          {!sidebarCollapsed && (
            <div className={cn("mt-6 rounded-[1.75rem] border p-4", darkMode ? "border-white/10 bg-white/5" : "border-[#0f172a]/8 bg-[#f8fafc]") }>
              <div className="flex items-center gap-3">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", darkMode ? "bg-white/10 text-[#D9B86C]" : "bg-[#0f172a] text-white") }>
                  <UserCircle className="size-6" />
                </div>
                <div className="min-w-0">
                  <p className={cn("truncate text-sm font-semibold", darkMode ? "text-white" : "text-[#0f172a]")}>{userName}</p>
                  {userEmail && <p className={cn("truncate text-xs", darkMode ? "text-white/55" : "text-[#64748b]")}>{userEmail}</p>}
                </div>
              </div>
              <div className={cn("mt-4 inline-flex rounded-full px-3 py-1 text-xs font-medium", darkMode ? "bg-[#D9B86C]/10 text-[#D9B86C]" : "bg-[#D9B86C]/12 text-[#8A672D]")}>Client Portal</div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className={cn("mt-6 flex items-center justify-center rounded-2xl p-3", darkMode ? "bg-white/10 text-[#D9B86C]" : "bg-[#0f172a] text-white")}>
              <UserCircle className="size-6" />
            </div>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 pb-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={sidebarCollapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                  sidebarCollapsed && "justify-center",
                  isActive
                    ? darkMode
                      ? "bg-white text-[#0f172a]"
                      : "bg-[#0f172a] text-white"
                    : darkMode
                      ? "text-white/65 hover:bg-white/8 hover:text-white"
                      : "text-[#64748b] hover:bg-[#0f172a]/5 hover:text-[#0f172a]"
                )}
              >
                <item.icon size={18} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={cn("flex-shrink-0 border-t p-4", darkMode ? "border-white/10 bg-[#0b1220]" : "border-[#0f172a]/8 bg-white") }>
          {!sidebarCollapsed ? (
            <>
              <div className={cn("mb-3 flex items-center justify-between rounded-2xl border p-3", darkMode ? "border-white/10 bg-white/5" : "border-[#0f172a]/8 bg-[#f8fafc]") }>
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="size-4 text-[#D9B86C]" /> : <Sun className="size-4 text-[#D9B86C]" />}
                  <span className={cn("text-sm font-medium", darkMode ? "text-white" : "text-[#0f172a]")}>Mode {darkMode ? "Dark" : "Light"}</span>
                </div>
                <button type="button" onClick={() => setDarkMode((value) => !value)} className={cn("rounded-full px-3 py-1 text-xs font-semibold", darkMode ? "bg-white text-[#0f172a]" : "bg-[#0f172a] text-white")}>{darkMode ? "Light" : "Dark"}</button>
              </div>
              <button type="button" className={cn("mb-3 flex w-full items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition", darkMode ? "border-white/10 text-white/75 hover:bg-white/8" : "border-[#0f172a]/8 text-[#475569] hover:bg-[#0f172a]/5")}><BookOpen className="size-4" /> Tutorial</button>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className={cn("flex w-full items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition", darkMode ? "border-red-500/20 text-red-300 hover:bg-red-500/10" : "border-red-200 text-red-600 hover:bg-red-50")}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <button 
                type="button" 
                onClick={() => setDarkMode((value) => !value)} 
                title={darkMode ? "Switch to Light mode" : "Switch to Dark mode"}
                className={cn("mb-3 flex w-full items-center justify-center rounded-2xl border p-3 transition", darkMode ? "border-white/10 text-white/75 hover:bg-white/8" : "border-[#0f172a]/8 text-[#475569] hover:bg-[#0f172a]/5")}
              >
                {darkMode ? <Moon className="size-4 text-[#D9B86C]" /> : <Sun className="size-4 text-[#D9B86C]" />}
              </button>
              <button 
                type="button" 
                title="Tutorial"
                className={cn("mb-3 flex w-full items-center justify-center rounded-2xl border p-3 transition", darkMode ? "border-white/10 text-white/75 hover:bg-white/8" : "border-[#0f172a]/8 text-[#475569] hover:bg-[#0f172a]/5")}
              >
                <BookOpen className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                title="Logout"
                className={cn("flex w-full items-center justify-center rounded-2xl border p-3 transition", darkMode ? "border-red-500/20 text-red-300 hover:bg-red-500/10" : "border-red-200 text-red-600 hover:bg-red-50")}
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Main Content — scrollable independently */}
      <main className={cn("flex h-screen flex-col transition-all duration-300", sidebarCollapsed ? "lg:ml-20" : "lg:ml-72")}>
        <div className="flex-shrink-0 border-b px-6 py-4 lg:px-8" style={{ borderColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)" }}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className={cn("relative w-full max-w-xl", darkMode ? "text-white" : "text-[#0f172a]") }>
              <Search className={cn("absolute left-3 top-1/2 size-4 -translate-y-1/2", darkMode ? "text-white/40" : "text-[#94a3b8]") } />
              <input placeholder="Cari tamu, RSVP, atau aktivitas..." className={cn("h-11 w-full rounded-2xl border pl-10 pr-4 text-sm outline-none", darkMode ? "border-white/10 bg-white/5 text-white placeholder:text-white/35" : "border-[#0f172a]/8 bg-white text-[#0f172a] placeholder:text-[#94a3b8]") } />
            </div>
            <div className="flex items-center gap-3">
              <button className={cn("inline-flex h-11 w-11 items-center justify-center rounded-2xl border", darkMode ? "border-white/10 bg-white/5 text-white" : "border-[#0f172a]/8 bg-white text-[#0f172a]") }><Bell className="size-4" /></button>
              <button className={cn("inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium", darkMode ? "border-white/10 bg-white/5 text-white" : "border-[#0f172a]/8 bg-white text-[#0f172a]") }><BookOpen className="size-4" /> Tutorial</button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
