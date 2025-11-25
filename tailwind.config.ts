import { Config } from "tailwindcss/plugin";

const config: Config = {
  // CRITICAL: Ensure this content array covers all your files
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Defined using HSL channels
        primary: "hsl(var(--primary) / <alpha-value>)",
        // Accent: Defined using RGB channels (as a robust example)
        accent: "orange",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
      },
    },
  },
  plugins: [
    // This assumes you have a local HeroUI plugin setup at ./hero.ts
    // or are using a standard plugin configuration.
    // If you don't have this file, you might need to adjust the HeroUI setup.
    // require('./hero.ts'),
  ],
};
export default config;
