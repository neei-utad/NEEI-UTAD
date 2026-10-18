// sem preflight para não partir o menu
tailwind.config = {
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
