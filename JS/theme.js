// corre no head para evitar flash
try {
  const savedTheme = localStorage.getItem("neei-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.className = savedTheme;
  }
} catch {}
