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

// marca o link da página atual para o utilizador saber onde está
function markCurrentPage() {
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#menu-items .menu-item a").forEach((link) => {
    const target = (link.getAttribute("href") || "").split("/").pop().split("#")[0];
    if (target === here) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    }
  });
}

// efeito de lente no desktop: cada link avança em 3D conforme a distância ao rato
function initNavLens() {
  const list = document.getElementById("menu-items");
  if (!list) return;

  const links = [...list.querySelectorAll(".menu-item a")];
  const REACH = 150;

  links.forEach((link) => link.addEventListener("click", closeMenu));

  list.addEventListener("pointermove", (event) => {
    if (MOBILE_QUERY.matches || event.pointerType !== "mouse") return;
    links.forEach((link) => {
      const box = link.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (box.left + box.width / 2));
      const near = Math.max(0, 1 - distance / REACH);
      link.style.setProperty("--lens", (near * near * (3 - 2 * near)).toFixed(3));
    });
  });
  list.addEventListener("pointerleave", () => links.forEach((link) => link.style.setProperty("--lens", "0")));
}

renderThemeToggle();
addMobileLogo();
markCurrentPage();
initNavLens();
menuBox?.classList.toggle("scrolled", window.scrollY > 40);
