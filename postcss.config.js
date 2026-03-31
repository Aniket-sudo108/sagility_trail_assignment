// ✅ PostCSS Configuration
// Why needed?
// → PostCSS processes your CSS using plugins
// → Required for Tailwind CSS to work properly
// → Adds browser compatibility automatically

module.exports = {
  plugins: {

    // ✅ Tailwind CSS plugin
    // → Generates utility classes (bg, flex, p-4, etc.)
    // → Converts Tailwind directives into actual CSS
    tailwindcss: {},

    // ✅ Autoprefixer plugin
    // → Automatically adds vendor prefixes
    // Example:
    // display: flex → adds -webkit-flex for older browsers
    autoprefixer: {},
  },
};


