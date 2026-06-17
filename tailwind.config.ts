import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: { 900: "#05080C", 850: "#07111A", 800: "#0A1621" },
        accent: { amber: "#D39A2E", gold: "#F0B84A", cyan: "#27B6D6", green: "#44D083", red: "#E5484D", orange: "#F59E0B" },
        text: { primary: "#F4F7FA", secondary: "#AAB6C2", muted: "#6F7D89", accent: "#F0B84A" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
