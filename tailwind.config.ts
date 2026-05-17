import type { Config } from "tailwindcss"

const config: Config = {
//   darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        ivory: "#F5EFE3",
        gold: {
          DEFAULT: "#C9A96E",
          light: "#E8D5B0",
          dark: "#9E7A3E",
        },
        brown: {
          DEFAULT: "#4A3728",
          light: "#7A5C42",
        },
        sage: "#8A9E85",
        "dusty-rose": "#D4A5A0",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both",
        "fade-in": "fadeIn 0.6s ease both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
}
export default config