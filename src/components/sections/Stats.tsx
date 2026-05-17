"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 12000, suffix: "+", label: "Undangan Dibuat" },
  { value: 98, suffix: "%", label: "Kepuasan Pengguna" },
  { value: 500, suffix: "K+", label: "Tamu Terundang" },
  { value: 34, suffix: "", label: "Kota di Indonesia" },
];

export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="bg-[#4A3728] py-20 px-5 md:px-8">
      <div ref={ref} className="max-w-[900px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-[#C9A96E] leading-tight mb-2">
                {inView && (
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                )}
              </div>
              <div className="text-[0.7rem] tracking-[0.2em] uppercase text-[#E8D5B0] opacity-60 font-normal">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}