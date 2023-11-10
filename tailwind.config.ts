import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    keyframes: {
      cartClick: {
        "0%": { opacity: "1", transform: "scale(1)", color: "green" },
        "100%": { opacity: "0", transform: "scale(1.5)" },
      },
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
    },
    animation: {
      clickedCart: "cartClick 300ms ease-out",
      fadeInSearchbar: "fadeIn 500ms ease-in-out",
    },
  },
  plugins: [require("daisyui")],
};
export default config;
