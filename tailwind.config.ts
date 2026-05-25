import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tk: {
          gold: "#E5961E",
          "gold-lt": "#F0A020",
          red: "#E8231A",
          "red-dk": "#C41E15",
          blue: "#1A5BB5",
          yellow: "#F5D800",
          green: "#4A7A2B",
          black: "#0A0A0A",
          white: "#FFFFFF",
          offwhite: "#F5F5F5",
          gray: "#6B7280",
          "gray-lt": "#E5E7EB",
        },
      },
      fontFamily: {
        fredoka: ["var(--font-fredoka)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
        screens: {
          "2xl": "1280px",
        },
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "bounce-soft": "bounce-soft 0.5s ease-out",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
