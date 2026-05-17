"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Mail, label: "Kelola Undangan", href: "/dashboard/invitations" },
  { icon: LayoutTemplate, label: "Template", href: "/dashboard/templates" },
  { icon: Users, label: "Data Tamu", href: "/dashboard/guests" },
  { icon: CheckSquare, label: "RSVP", href: "/dashboard/rsvp" },
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
  const pathname = usePathname();

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
        </div>
        
        <nav className="mt-6">
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