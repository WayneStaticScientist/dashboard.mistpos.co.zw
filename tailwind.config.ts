import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

const config: Config = {
  // CRITICAL: Ensure the content array is still here for non-CSS-first processing
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // Keep the HeroUI plugin here
  plugins: [heroui()],

  // NOTE: In Tailwind v4, you often place themes/extends directly here
  theme: {
    extend: {
      colors: {
        // ... (your custom colors)
      },
    },
  },
};

export default config;
