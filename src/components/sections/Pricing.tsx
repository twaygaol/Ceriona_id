"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: 0,
    period: "Selamanya gratis",
    featured: false,
    features: [
      "1 undangan aktif",
      "Template dasar (2)",
      "RSVP hingga 50 tamu",
      "Link undangan standar",
      { text: "Musik background", disabled: true },
      { text: "Custom domain", disabled: true },
      { text: "Export data tamu", disabled: true },
    ],
  },
  {
    name: "Premium",
    price: 149,
    period: "per undangan · tanpa batas masa aktif",
    featured: true,
    features: [
      "1 undangan premium",
      "Semua 5 template",
      "RSVP tak terbatas",
      "Musik background",
      "Galeri 50 foto",
      "Google Maps terintegrasi",
      { text: "Custom domain", disabled: true },
    ],
  },
  {
    name: "Pro",
    price: 299,
    period: "per undangan · fitur penuh",
    featured: false,
    features: [
      "Undangan tak terbatas",
      "Custom template",
      "RSVP + ucapan tamu",
      "Musik + galeri 200 foto",
      "Export data tamu (CSV)",
      "Custom subdomain",
      "Prioritas support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-5 md:px-8 bg-[#F5EFE3]">
      <div className="max-w-[900px] mx-auto">
        <span className="section-label">Paket Harga</span>
        <h2 className="section-title">
          Investasi untuk <em>Kenangan</em> Seumur Hidup
        </h2>
        <p className="section-desc">Paket yang terjangkau dengan fitur premium. Tidak ada biaya tersembunyi.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "bg-white border rounded-sm p-8 relative transition-all duration-300",
                plan.featured
                  ? "border-[#C9A96E] border-[1.5px] shadow-xl md:scale-105"
                  : "border-[#C9A96E]/20"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-[#C9A96E] text-[#4A3728] text-[0.6rem] font-medium tracking-[0.1em] uppercase px-4 py-1 rounded-b-sm">
                  Paling Populer
                </div>
              )}

              <div className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#9E7A3E] mb-3">
                {plan.name}
              </div>
              <div className="font-serif text-4xl font-light text-[#4A3728] leading-tight">
                <span className="text-base font-normal">Rp</span>{plan.price.toLocaleString()}
              </div>
              <div className="text-sm text-[#7A5C42] mb-6">{plan.period}</div>
              <hr className="border-t border-[#E8D5B0] mb-6" />

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => {
                  const isDisabled = typeof feature === "object" && feature.disabled;
                  const text = typeof feature === "string" ? feature : feature.text;
                  return (
                    <li
                      key={idx}
                      className={cn(
                        "text-sm text-[#7A5C42] flex items-center gap-2 font-light",
                        isDisabled && "opacity-40 line-through"
                      )}
                    >
                      <span className={cn("text-[0.5rem]", isDisabled ? "text-[#7A5C42]" : "text-[#C9A96E]")}>
                        {isDisabled ? "—" : "✦"}
                      </span>
                      {text}
                    </li>
                  );
                })}
              </ul>

              <Link
                href="/dashboard"
                className={cn(
                  "block w-full py-3 text-center text-xs font-medium tracking-[0.1em] uppercase rounded-sm transition-all",
                  plan.featured
                    ? "bg-[#4A3728] text-[#E8D5B0] hover:bg-[#9E7A3E] hover:text-white"
                    : "bg-transparent text-[#4A3728] border border-[#4A3728] hover:bg-[#4A3728] hover:text-[#E8D5B0]"
                )}
              >
                {plan.name === "Free" ? "Mulai Gratis" : `Pilih ${plan.name}`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}