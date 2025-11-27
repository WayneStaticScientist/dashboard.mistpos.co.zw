// tailwind.config.js

const { heroui } = require("@heroui/react"); // or @heroui/theme

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other Tailwind config (content, etc.)

  plugins: [
    heroui({
      // Set the color scale for your primary color
      themes: {
        // --- Light Theme Customization ---
        light: {
          colors: {
            primary: {
              // Hero UI expects 10 color shades (50 to 900) plus 'foreground' and 'DEFAULT'
              // You can use a color generator (like 'Tailwind Shades' or a custom tool) to get a full purple scale.
              // Here is a common Purple scale for illustration:
              50: "#f4effa",
              100: "#e4d7f4",
              200: "#c8b3ec",
              300: "#ad8fe4",
              400: "#926bda",
              500: "#7748d0", // This is usually the main shade for solid buttons
              600: "#6032a9",
              700: "#492083",
              800: "#32115c",
              900: "#1b0a36",

              // The default/main color
              DEFAULT: "#7748d0",

              // The color for text/icons on the primary color (e.g., white)
              foreground: "#FFFFFF",
            },
            // If you have other semantic colors to change, add them here
            // secondary: { /* ... */ }
          },
        },

        // --- Dark Theme Customization (Highly Recommended) ---
        dark: {
          colors: {
            primary: {
              // Dark mode primary usually uses a lighter/different purple shade
              50: "#1b0a36",
              // ... fill out the rest of the dark purple scale ...
              DEFAULT: "#926bda", // A lighter purple for contrast in dark mode
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
