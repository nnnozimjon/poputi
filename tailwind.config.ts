import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      main: "#28ABB9", // default #40E0D0
      "dark-blue": "#2D6187",
      green: "#13ce66",
      blue: "#1fb6ff",
      "blue-600": "#054652",
      "purple-600": "#7e22ce",
      "pink-600": "#ff49db",
      pink: "#ff49db",
      orange: "#ff7849",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      "white-highlight": "#F7F7F7",
      white: "#FFF",
      black: "#000",
      secondary: "#F8F8F8",
      "secondary-100": "#F9F9F9",
      "secondary-200": "#9E9DA2",
      red: "red",
      "red-100": "#D84040",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    variants: {
      extend: {
        filter: ["responsive", "hover", "focus"],
      },
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwindcss-filters")],
};
export default config;
