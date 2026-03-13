import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        myBg: "#1A237E",
        green: {
          50: "#E0F2F1",
          100: "#B2DFDB",
          200: "#80CBC4",
          300: "#4DB6AC",
          400: "#26A69A",
          500: "#009688",
          600: "#00897B",
          700: "#00796B",
          800: "#00695C",
          900: "#004D40",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "zoom-in": "zoomIn 0.3s ease-out forwards",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        zoomIn: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
    plugins: [],
  },
};

export default config;
