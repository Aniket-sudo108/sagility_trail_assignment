// ✅ Tailwind CSS Configuration
// Why needed?
// → Controls design system (colors, spacing, fonts)
// → Enables Tailwind to scan files and generate only used CSS
// → Keeps CSS lightweight and scalable

module.exports = {

  // ✅ Content paths
  // → Tells Tailwind where to look for class names
  // → Removes unused CSS (important for performance)
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {

      // ✅ Custom Theme Extension
      // → Add your own design tokens (colors, spacing, etc.)
      // → Keeps UI consistent across project

      colors: {
        primary: "#00B8A9",      // Main brand color (used in buttons, highlights)
        background: "#EEF3F7",   // App background color
      },
    },
  },

  // ✅ Plugins
  // → Add extra Tailwind features (forms, typography, etc.)
  plugins: [],
};