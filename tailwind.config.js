/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        display: ["Cinzel Decorative", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        champagne: "#C9A96E",
        obsidian: "#1C1A17",
        alabaster: "#FAFAF8",
        charcoal: "#F2EEE9",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "pulsate": "pulsate 2.5s ease-out infinite",
        "orb-float": "orbFloat 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
