"use client";
import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".template-card, .feature-card, .pricing-card, .testi-card").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
