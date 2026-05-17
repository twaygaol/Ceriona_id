"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { templateCards } from "@/lib/template-data";

export function Templates() {
  return (
    <section id="templates" className="py-24 px-5 md:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,169,110,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <span className="section-label">Koleksi Template</span>
        <h2 className="section-title">
          Pilih <em>Estetika</em> yang Mencerminkan Kisah Anda
        </h2>
        <p className="section-desc">
          5 template premium yang dirancang khusus untuk momen pernikahan Indonesia,
          dari yang elegan modern hingga tradisional berkarakter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {templateCards.map((template) => (
            <Link
              key={template.id}
              href={`/invitation/${template.id}`}
              className="group block cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              aria-label={`Lihat preview template ${template.name}`}
            >
              <div
                className={cn(
                  "aspect-[3/4] relative overflow-hidden rounded-sm bg-gradient-to-br",
                  template.colors
                )}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  {template.popular && (
                    <span className="absolute top-4 right-4 text-[0.6rem] font-medium tracking-[0.1em] uppercase px-2 py-1 rounded-sm border border-[#8A9E85] text-[#8A9E85] bg-[#8A9E85]/10">
                      Terpopuler
                    </span>
                  )}
                  {template.new && (
                    <span className="absolute top-4 right-4 text-[0.6rem] font-medium tracking-[0.1em] uppercase px-2 py-1 rounded-sm border border-[#C9A96E] text-[#C9A96E] bg-[#C9A96E]/10">
                      Baru
                    </span>
                  )}

                  <div className="w-10 h-px bg-current opacity-40 mx-auto mb-4" />
                  <div className={cn("text-[0.55rem] font-medium tracking-[0.2em] uppercase opacity-60 mb-2", template.textColor)}>
                    {template.name}
                  </div>
                  <div className={cn("font-serif text-xl font-light leading-tight mb-2", template.textColor)}>
                    {template.id === "minimalist" ? (
                      <>
                        {template.couples.split(" ")[0]}<br />&<br />{template.couples.split(" ")[2]}
                      </>
                    ) : (
                      template.couples
                    )}
                  </div>
                  {template.id !== "minimalist" && template.id !== "dark" && (
                    <div className={cn("font-serif text-sm italic opacity-70", template.textColor)}>
                      {template.id === "elegant" && "The Wedding of"}
                    </div>
                  )}
                  <div className="w-10 h-px bg-current opacity-40 mx-auto my-3" />
                  <div className={cn("text-[0.6rem] font-medium tracking-[0.15em] uppercase opacity-50", template.textColor)}>
                    {template.date}
                  </div>
                </div>
              </div>

              <div className="pt-4 px-2">
                <div className="font-serif text-base font-normal text-[#4A3728] mb-1">{template.name}</div>
                <div className="text-[0.7rem] text-[#7A5C42] font-light tracking-wide">{template.features}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
