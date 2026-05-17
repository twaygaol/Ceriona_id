import Link from "next/link";
import { templateCards } from "@/lib/template-data";
import { cn } from "@/lib/utils";

export default function DashboardTemplatesPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-brown mb-2">Template</h1>
      <p className="text-brown-light mb-8">
        Pilih salah satu template untuk melihat preview undangan.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {templateCards.map((template) => (
          <Link
            key={template.id}
            href={`/invitation/${template.id}`}
            className="group block rounded-sm bg-white p-4 ring-1 ring-gold/20 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className={cn(
                "aspect-[4/3] rounded-sm bg-gradient-to-br p-6 flex flex-col items-center justify-center text-center",
                template.colors,
                template.textColor
              )}
            >
              <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase opacity-70">
                {template.name}
              </span>
              <span className="mt-3 font-serif text-2xl font-light">
                {template.couples}
              </span>
              <span className="mt-3 text-[0.65rem] uppercase tracking-[0.15em] opacity-60">
                {template.date}
              </span>
            </div>
            <div className="pt-4">
              <h2 className="font-serif text-lg text-brown">{template.name}</h2>
              <p className="text-sm text-brown-light">{template.features}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
