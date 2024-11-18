import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        dash: {
          to: {
            strokeDashoffset: "0",
          },
        },
        draw: {
          "0%": { strokeDasharray: "0 1500", opacity: "0" },
          "15%": { opacity: "0.3" },
          "100%": { strokeDasharray: "1500 1500", opacity: "0.1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        dash: "dash 30s linear infinite",
        draw: "draw 8s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
