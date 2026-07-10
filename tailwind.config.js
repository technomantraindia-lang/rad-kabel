/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Carlito", "Calibri", "Segoe UI", "Candara", "sans-serif"],
        heading: ["Montserrat", "Segoe UI", "system-ui", "sans-serif"],
      },
      colors: {
        rad: {
          red: "#e50914",
          black: "#050505",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-10px) scale(1.02)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        "spark-flicker": {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.85) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1.15) rotate(8deg)" },
        },
        "bg-zoom-slow": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        "number-pulse": {
          "0%, 100%": {
            opacity: "1",
            textShadow: "0 0 0 rgba(229,9,20,0)",
          },
          "50%": {
            opacity: "1",
            textShadow: "0 0 28px rgba(229,9,20,0.55)",
          },
        },
        "line-pan": {
          "0%": { transform: "translateX(-20%)" },
          "100%": { transform: "translateX(20%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.85s ease-out forwards",
        "float-slow": "float-slow 7s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3.5s ease-in-out infinite",
        "spark-flicker": "spark-flicker 2.2s ease-in-out infinite",
        "bg-zoom-slow": "bg-zoom-slow 22s ease-in-out infinite alternate",
        "number-pulse": "number-pulse 3s ease-in-out infinite",
        "line-pan": "line-pan 6.5s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
