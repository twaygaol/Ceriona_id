"use client";

import TemplatesPage from "@/app/(dashboard)/dashboard/templates/page";

export default function AdminTemplatesPage() {
  return (
    <div className="space-y-6 text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-gold-accent">Admin Template Console</p>
        <h1 className="mt-2 font-serif text-5xl">Template Management</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">Area ini khusus admin untuk membuat, mengedit, menduplikasi, dan mengontrol template visual yang akan dipakai semua client.</p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
        <TemplatesPage />
      </div>
    </div>
  );
}
