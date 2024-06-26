import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
        accent: "#a4f839",
        "light-red": "#f76c6c",
        "fuel-yellow": "#eca034",
        gold: "#E5D10D",
        malachite: "#38EC34",
      },
      keyframes: {
        slideIn: {
          "0%": { width: "0" },
          "50%": { width: "50" },
          "100%": { width: "100" },
        },
        pulseStrong: {
          "0%, 100%": { opactiy: "1" },
          "50%": { opacity: "0.1" },
        },
        slideDown: {
          "0%, 50%": { transform: "translateY(-200%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.2s",
        pulseStrong: "pulseStrong 2s infinite",
        slideDown: "slideDown 2.5s "
      }
    },
  },
  plugins: [],
};
export default config;
