import type { Config } from "tailwindcss"
const { nextui } = require("@nextui-org/react");

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "xs": "400px",
        "sm": "640px",
        "md": "768px",
        "md-lg": "950px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
      },
      colors: {
        "green-yellow": '#a4f839',
        "fuel-yellow": "#FF8D22",
        gold: "#E5D10D",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideIn: {
          "0%": { width: "0" },
          "100%": { width: "100" },
        },
        slideDown: {
          "0%, 50%": { transform: "translateY(-200%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(75%)" },
          "100%": { transform: "translateY(0)" },
        },
        pulseStrong: {
          "0%, 100%": { opactiy: "1" },
          "50%": { opacity: "0.1" },
        },
        fadeInSlideUp: {
          "0%": { transform: "translateY(20%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideIn: "slideIn 0.3s",
        slideDown: "slideDown 2.5s",
        slideUp: "slideUp 0.7s",
        pulseStrong: "pulseStrong 2s infinite",
        fadeInSlideUp: "fadeInSlideUp 1s"
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui({
    themes: {
      light: {
        colors: {
          success: "#a4f839"
        },
      },
    },
  })],
} satisfies Config

export default config