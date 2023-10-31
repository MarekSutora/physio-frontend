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
        primary: "#14746F",
        secondary: "#248277",
        tertiary: "#469D89",
        complementary: "#78C6A3",
        primarydk: "#18392B",
      },
    },
  },
  plugins: [],
};
export default config;
