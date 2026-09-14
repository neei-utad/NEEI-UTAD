/* Script encarregue de alterar os eventos visíveis consoante o ano selecionado */
/* Por padrão, mostra apenas os eventos de 2025-2026 ao carregar a página */

document.addEventListener("DOMContentLoaded", () => {
  const events20252026 = document.getElementById("events-2025-2026");
  const events20252026Btn = document.getElementById("2025-2026");
  let events20242025 = null;
  let events20232024 = null;
  let events20222023 = null;

  const eventsSection = document.getElementById("events-section");

  // Estado inicial: só 2025/2026 visível
  if (events20252026) {
    events20252026.style.display = "flex";
    events20252026Btn?.classList.add("active-year");
  }

  // Função que prepara o template: move src -> data-src
  function prepareTemplate(templateId) {
    const tpl = document.getElementById(templateId);
    if (!tpl) return null;

    const clone = tpl.content.cloneNode(true);

    // Todas as imagens do template ficam com data-src
    clone.querySelectorAll("img").forEach(img => {
      if (img.src) {
        img.dataset.src = img.src;
        img.removeAttribute("src");
      }
    });

    return clone;
  }

  // Função que ativa lazy load das imagens quando o ano é exibido
  function loadImages(container) {
    if (!container) return;
    container.querySelectorAll("img[data-src]").forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }

  // Injetar os outros anos apenas depois do load
  window.addEventListener("load", () => {

    // 2024-2025
    const clone2425 = prepareTemplate("tpl-2024-2025");
    if(clone2425) {
      eventsSection.appendChild(clone2425);
      events20242025 = document.getElementById("events-2024-2025");
      if (events20242025) events20242025.style.display = "none";
    }

    // 2023-2024
    const clone2324 = prepareTemplate("tpl-2023-2024");
    if (clone2324) {
      eventsSection.appendChild(clone2324);
      events20232024 = document.getElementById("events-2023-2024");
      if (events20232024) events20232024.style.display = "none";
    }

    // 2022-2023
    const clone2223 = prepareTemplate("tpl-2022-2023");
    if (clone2223) {
      eventsSection.appendChild(clone2223);
      events20222023 = document.getElementById("events-2022-2023");
      if (events20222023) events20222023.style.display = "none";
    }

    // Iniciar Glide e AOS apenas depois do load
    if (typeof AOS !== "undefined") AOS.init();
    if (typeof Glide !== "undefined") {
      const glide = new Glide(".glide");
      glide.mount();
    }
  });

  // Ligar botões de anos
  const yearBtns = document.querySelectorAll(".year-btn");
  yearBtns.forEach(btn => btn.addEventListener("click", toggleEvents));

  function toggleEvents(e) {
    const year = e.target.dataset.year;

    const btn20242025 = document.getElementById("2024-2025");
    const btn20232024 = document.getElementById("2023-2024");
    const btn20222023 = document.getElementById("2022-2023");

    // Reset: esconder todos
    if (events20222023) events20222023.style.display = "none";
    if (events20232024) events20232024.style.display = "none";
    if (events20242025) events20242025.style.display = "none";
    if (events20252026) events20252026.style.display = "none";

    btn20222023?.classList.remove("active-year");
    btn20232024?.classList.remove("active-year");
    btn20242025?.classList.remove("active-year")
    events20252026Btn?.classList.remove("active-year");

    // Mostrar apenas o ano escolhido + lazy load imagens
    if (year === "2022-2023" && events20222023) {
      loadImages(events20222023);
      events20222023.style.display = "flex";
      btn20222023?.classList.add("active-year");
    } else if (year === "2023-2024" && events20232024) {
      loadImages(events20232024);
      events20232024.style.display = "flex";
      btn20232024?.classList.add("active-year");
    } else if (year === "2024-2025" && events20242025) {
      loadImages(events20242025);
      events20242025.style.display = "flex";
      btn20242025?.classList.add("active-year");
    } else if (events20252026) {
      loadImages(events20252026);
      events20252026.style.display = "flex";
      events20252026Btn?.classList.add("active-year");
    }
  }
});

