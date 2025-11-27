// hero.ts or hero-config.js
import { heroui } from "@heroui/react";

// Revised HSL Green scale (H = 142) for a softer, more professional green
const customGreen = {
  // H S L
  50: "hsl(142 60% 98%)", // Very light, desaturated
  100: "hsl(142 70% 95%)",
  200: "hsl(142 80% 88%)",
  300: "hsl(142 85% 75%)",
  400: "hsl(142 90% 60%)",
  500: "hsl(142 95% 50%)", // Main Green (Good balance)
  600: "hsl(142 80% 40%)",
  700: "hsl(142 70% 30%)",
  800: "hsl(142 60% 20%)",
  900: "hsl(142 50% 15%)",
  DEFAULT: "green",
  foreground: "hsl(0 0% 100%)", // White text
};

// Revised dark mode green scale
const customDarkGreen = {
  50: "hsl(142 30% 10%)",
  100: "hsl(142 40% 15%)",
  200: "hsl(142 50% 25%)",
  300: "hsl(142 60% 35%)",
  400: "hsl(142 70% 45%)",
  500: "hsl(142 80% 55%)", // Main Green for Dark Theme (visible contrast)
  600: "hsl(142 85% 65%)",
  700: "hsl(142 90% 75%)",
  800: "hsl(142 95% 85%)",
  900: "hsl(142 100% 90%)",
  DEFAULT: "hsl(142 80% 55%)",
  foreground: "hsl(0 0% 100%)",
};

export default heroui({
  themes: {
    light: {
      colors: {
        primary: customGreen,
      },
    },
    dark: {
      colors: {
        primary: customDarkGreen,
      },
    },
  },
});
