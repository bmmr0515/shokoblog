import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shoko: {
          yellow: {
            DEFAULT: "#EAB308",
            dark: "#D97706",
            light: "#FEF9C3",
            border: "#FDE047",
          },
          orange: {
            DEFAULT: "#F97316",
            dark: "#EA580C",
            light: "#FFEDD5",
          },
          text: {
            main: "#1F2937",
            sub: "#4B5563",
            light: "#6B7280",
          },
          border: "#E5E7EB",
        }
      },
      fontFamily: {
        sans: ['"Hiragino Kaku Gothic ProN"', '"Hiragino Sans"', 'Meiryo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
