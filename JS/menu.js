const THEME_STORAGE_KEY = "neei-theme";
const MOBILE_QUERY = window.matchMedia("(max-width: 991.98px)");

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const menuBox = document.querySelector(".menu-box");

function renderThemeToggle() {
  if (!themeToggle) return;
  const isDark = root.className === "dark";
  if (MOBILE_QUERY.matches) {
    themeToggle.textContent = isDark ? "Modo Claro" : "Modo Escuro";
  } else {
    const icon = isDark ? "bi-brightness-high-fill" : "bi-moon-stars-fill";
    themeToggle.innerHTML = `<i id="theme-toggle-icon" class="bi ${icon}"></i>`;
  }
}

function toggleTheme() {
  root.className = root.className === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_STORAGE_KEY, root.className);
  } catch {}
  renderThemeToggle();
}

function closeMenu() {
  if (menuToggle?.checked) menuToggle.checked = false;
}

// logo da barra mobile como link
function addMobileLogo() {
  const bar = document.querySelector(".hamburger-menu");
  if (!bar || bar.querySelector(".mobile-logo")) return;

  const source = document.querySelector(".menu-logo a");
  const link = document.createElement("a");
  link.className = "mobile-logo";
  link.href = source?.getAttribute("href") || "./index.html";
  link.setAttribute("aria-label", "NEEI - página inicial");

  const img = document.createElement("img");
  img.src = source?.querySelector("img")?.getAttribute("src") || "./assets/images/logos/neei-logo.png";
  img.alt = "";
  img.width = 32;
  img.height = 32;

  link.append(img);
  bar.prepend(link);
}

themeToggle?.addEventListener("click", toggleTheme);
MOBILE_QUERY.addEventListener("change", renderThemeToggle);

document.addEventListener("click", (event) => {
  if (menuToggle?.checked && !event.target.closest(".menu-box, .menu__btn, #menu-toggle")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener(
  "scroll",
  () => menuBox?.classList.toggle("scrolled", window.scrollY > 40),
  { passive: true }
);

renderThemeToggle();
addMobileLogo();
