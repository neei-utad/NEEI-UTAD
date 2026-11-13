// config de build (já não corre no browser). depois de mexer em classes tailwind nas páginas hub:
//   npx tailwindcss@3.4.16 -c JS/hub/tailwind.config.js -i JS/hub/tailwind.css -o CSS/hub-tw.css --minify
// sem preflight para não partir o menu
module.exports = {
  content: ["./events.html", "./merch.html", "./JS/hub/**/*.js"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        surface: "rgb(var(--hub-surface) / <alpha-value>)",
        fg: "rgb(var(--hub-fg) / <alpha-value>)",
        muted: "rgb(var(--hub-muted) / <alpha-value>)",
        line: "rgb(var(--hub-line) / <alpha-value>)",
        brand: { DEFAULT: "#eb5e14", hover: "#d35d18" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
    },
  },
};
