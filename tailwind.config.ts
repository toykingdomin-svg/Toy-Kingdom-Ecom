import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Toy Kingdom brand tokens ── */
        tk: {
          gold:      "#E5961E",
          "gold-lt": "#F0A020",
          red:       "#E8231A",
          "red-dk":  "#C41E15",
          blue:      "#1A5BB5",
          yellow:    "#F5D800",
          green:     "#4A7A2B",
          black:     "#0A0A0A",
          white:     "#FFFFFF",
          offwhite:  "#F5F5F5",
          gray:      "#6B7280",
          "gray-lt": "#E5E7EB",
        },
        /* ── shadcn CSS-variable tokens (used by installed components) ── */
        background:        "var(--background)",
        foreground:        "var(--foreground)",
        border:            "var(--border)",
        input:             "var(--input)",
        ring:              "var(--ring)",
        primary: {
          DEFAULT:         "var(--primary)",
          foreground:      "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:         "var(--secondary)",
          foreground:      "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT:         "var(--muted)",
          foreground:      "var(--muted-foreground)",
        },
        accent: {
          DEFAULT:         "var(--accent)",
          foreground:      "var(--accent-foreground)",
        },
        destructive:       "var(--destructive)",
        card: {
          DEFAULT:         "var(--card)",
          foreground:      "var(--card-foreground)",
        },
        popover: {
          DEFAULT:         "var(--popover)",
          foreground:      "var(--popover-foreground)",
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
  /* Make border-border work as a default border color */
  corePlugins: {
    preflight: true,
  },
};

export default config;
