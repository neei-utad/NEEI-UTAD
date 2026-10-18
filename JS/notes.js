// nova cadeira é uma linha aqui
const NOTES = [
  { title: "Álgebra Linear", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1FnTtJOhHqq1DzFkF_B8hizb1qjvNwDtm" },
  { title: "Tópicos Matemática Discreta", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1513gezLTu7H-87izHyxZYI6KECN-kdHk" },
  { title: "Análise Matemática I", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1mqKdQlSF3dgMrcKyZVvmG6FGEiEh2t7r" },
  { title: "Laboratório de Informática e Computadores", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1edSwO-r3ADBf4lBOFeVl-9VIYRjXCTxo" },
  { title: "Programação Procedimental", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1NJVBltSxZpcSu5BIsGmmQO0ScEWMYha7" },
  { title: "Análise Matemática II", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/11m77a_avEL6Fw9Sd8FZLkIzCiAmOMa9N" },
  { title: "Elementos de Física Geral", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1WFw_P1YJkBaFAw8pjViWhP-yPfCaObul" },
  { title: "Engenharia nas Organizações", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/103dCO8Dzijn90B-QeJf-XQRt8ooUeUgx" },
  { title: "Laboratório de Programação", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1Ypgk2iImK8H9oxAdc3uJlovLZLF7tABp" },
  { title: "Programação Orientada aos Objetos", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1rWIdnK6ONJXO2EVlew2hRfMvUhDCpasT" },
  { title: "Sistemas Computacionais", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1J3MVOW3UOjxrkt3dxpjxwe89VmHco3gF" },
  { title: "Compiladores", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1roXUe2EyOERI6iGXf5_y5OgKnHBBFpNE" },
  { title: "Engenharia de Software", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1uFP_L7n7fiDXzbrcMUI2B-psgtDsC_Nc" },
  { title: "Métodos Estatísticos", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1JWkpUcVx3CiqjXM5tCFAMHtHCHxRPv-6" },
  { title: "Programação Funcional", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1w4Lz7TdLY52y5-cpkEaKHCo5utEocBba" },
  { title: "Sistemas Operativos", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1nk24r0jA-OGdKOonB8DGBHYgPvQFbNi2" },
  { title: "Algoritmia e estruturas de dados", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1BcroRIQ2JodtwfsGObcrbaF6nZJ611db" },
  { title: "Bases de Dados", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1Ff_E0TOXaLhnEU5MeCRe6udM7DYwAmK5" },
  { title: "Laboratório de Planeamento de Software", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1jwq5SGZ-5vgLXOtMQgJxs862kS7dcq6w" },
  { title: "Métodos Computacionais em Engenharia", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1q1nY4pDtEqDaDBbaFAECa0YeW_Vo0zIF" },
  { title: "Programação Multiplataforma", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1coNq6CBHMsFRP1hCqcZY4y_8ucNUBHh0" },
  { title: "Redes de Dados I", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1nZyZYnLfis8PwoZjgTo9f_gc8PJGAOQe" },
  { title: "Engenharia Web", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1nsg3GTupw39onD1RcPfVB0Xd5Z5KJEH7" },
  { title: "Gestão de Projetos em Engenharia", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1m3UEVb6ErFmtOcQiZXd9fJKMAXKLYnnM" },
  { title: "Inteligência Artificial", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/11Vb1FWonqII5IngeLUy5oe6EU4TUrGId" },
  { title: "Redes de Dados II", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1sv0YJKgvfEQ27BR-0yf1kTafLzWwZSTK" },
  { title: "Sistemas de Informação", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1V-P0vLUL3pU1A4mG1cyPF7NWjlpir-D2" },
  { title: "Introdução à Ciência dos Dados", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1YHIgQMucab8ldZSJI-tMS5riNiDnNhbA" },
  { title: "Computação Gráfica", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1JU7prU-iAb7i1bQqAb-5nS9a7ihpHac0" },
  { title: "Interação Pessoa Computador", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1mLfmGnGqSY1wodeuFC4_7d1NBRHWfnzv" },
  { title: "Laboratório de Projeto", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/10IbToWKseqyWA4HBm9DKGLHKzKAtW1M_" },
  { title: "Sistemas Distribuídos", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1uNZ4rs_FQLCs2sx6l8N4no8xQrtrnfBd" },
  { title: "Administração de Sistemas", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1gBW6NXbh6yyBXmzuat3NqIT_6dTuyKgL" },
  { title: "Arquitetura e Padrões de Software", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1oLIYvp4ThovxSyvDRsp_8Fg20sZnxHwz" },
  { title: "Crowdsourcing", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/10GAtcmTWJW5-go5WwhJDePuGK8dQBtfg" },
  { title: "Investigação Operacional", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1rRhYC3OnpJkXnpTfsRj1Io7S3LZ55L_7" },
  { title: "Processamento Digital de Imagem", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1K4voe7ndOvRSr3JiqKCa7-BP6iqglra0" },
  { title: "Business Intelligence", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1l-jMZOLoCKIvTlpRwwSfioePyiAzfOQW" },
  { title: "Desenvolvimento de Aplicações Móveis", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1XP-Mek2rd4t0Wa_y0Iqs0xn4eGnYWlks" },
  { title: "Integração de Sistemas", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1K7cIwhY-hW8J8ZDGOvFEV9eWTA64jIvY" },
  { title: "LE", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1noKDUNmRknRL5w3lqNTA5IKc4PjnOIKr" },
  { title: "Visão por Computador", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1XWMDfRR4hHEx5KK6mDSe__1TW_T8Qt8A" },
];

const STORAGE_KEY = "neei-apontamentos";
const state = { type: "lic", year: "1", query: "" };

const elements = {
  typeTabs: document.getElementById("type-tabs"),
  yearTabs: document.getElementById("year-tabs"),
  search: document.getElementById("notes-search-input"),
  list: document.getElementById("apontamentos-list"),
  results: document.getElementById("search-results"),
  sem: { 1: document.getElementById("sem-1"), 2: document.getElementById("sem-2") },
};

// mantém comprimento para o destaque
const normalize = (s) =>
  [...s].map((c) => c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || c).join("");

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

// hash depois storage depois defeito
function readInitialState() {
  const hash = location.hash.slice(1);
  const fromHash = /^lic-[123]$/.test(hash) ? { type: "lic", year: hash.slice(-1) } : hash === "mes" ? { type: "mes" } : null;
  if (fromHash) return Object.assign(state, fromHash);
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && (saved.type === "lic" || saved.type === "mes") && /^[123]$/.test(saved.year)) {
      Object.assign(state, { type: saved.type, year: saved.year });
    }
  } catch {}
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ type: state.type, year: state.year }));
  } catch {}
  history.replaceState(null, "", `#${state.type === "mes" ? "mes" : `lic-${state.year}`}`);
}

function setupSegmented(container, key) {
  const indicator = document.createElement("span");
  indicator.className = "filter-indicator";
  indicator.setAttribute("aria-hidden", "true");
  container.prepend(indicator);

  container.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.setAttribute("type", "button");
    tab.addEventListener("click", () => {
      const value = tab.dataset[key];
      if (state[key] === value || container.classList.contains("disabled")) return;
      state[key] = value;
      clearSearch();
      update();
    });
  });

  // segue mudanças de layout
  new ResizeObserver(() => moveIndicator(container, true)).observe(container);
}

function syncSegmented(container, key) {
  container.querySelectorAll(".filter-tab").forEach((tab) => {
    const active = tab.dataset[key] === state[key];
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-pressed", active);
  });
  moveIndicator(container);
}

function moveIndicator(container, instant = false) {
  const active = container.querySelector(".filter-tab.active");
  const indicator = container.querySelector(".filter-indicator");
  if (!active || !indicator) return;
  if (instant) indicator.style.transition = "none";
  indicator.style.width = `${active.offsetWidth}px`;
  indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  if (instant) {
    indicator.getBoundingClientRect();
    indicator.style.transition = "";
  }
}

// destaque sem innerhtml
function highlighted(text, query) {
  const frag = document.createDocumentFragment();
  if (!query) {
    frag.append(text);
    return frag;
  }
  const start = normalize(text).indexOf(normalize(query));
  if (start < 0) {
    frag.append(text);
    return frag;
  }
  const mark = document.createElement("mark");
  mark.textContent = text.slice(start, start + query.length);
  frag.append(text.slice(0, start), mark, text.slice(start + query.length));
  return frag;
}

function noteRow(note, index, { query = "", showMeta = false } = {}) {
  const row = document.createElement("a");
  row.className = "note-card";
  row.href = note.link;
  row.target = "_blank";
  row.rel = "noopener noreferrer";
  row.style.setProperty("--i", index);

  const icon = document.createElement("span");
  icon.className = "note-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = '<i class="bi bi-folder2"></i><i class="bi bi-folder2-open"></i>';

  const text = document.createElement("span");
  text.className = "note-text";

  const title = document.createElement("span");
  title.className = "note-title";
  title.append(highlighted(note.title, query));
  text.append(title);

  if (showMeta) {
    const meta = document.createElement("span");
    meta.className = "note-meta";
    meta.textContent = note.type === "mes" ? `Mestrado · ${note.sem}º sem` : `${note.year}º ano · ${note.sem}º sem`;
    text.append(meta);
  }

  const go = document.createElement("span");
  go.className = "note-go";
  go.innerHTML = 'Abrir <i class="bi bi-arrow-up-right" aria-hidden="true"></i>';

  row.append(icon, text, go);
  return row;
}

function columnHead(title, count) {
  const head = document.createElement("div");
  head.className = "sem-head";
  const h2 = document.createElement("h2");
  h2.textContent = title;
  const n = document.createElement("span");
  n.className = "sem-count";
  n.textContent = plural(count, "cadeira", "cadeiras");
  head.append(h2, n);
  return head;
}

function emptyRow(text) {
  const p = document.createElement("p");
  p.className = "notes-empty";
  p.textContent = text;
  return p;
}

function renderSemesters() {
  const current = NOTES.filter((n) => n.type === state.type && (state.type === "mes" || n.year === state.year));
  ["1", "2"].forEach((sem) => {
    const list = current.filter((n) => n.sem === sem);
    const rows = list.map((n, i) => noteRow(n, i));
    elements.sem[sem].replaceChildren(
      columnHead(`${sem}º Semestre`, list.length),
      ...(rows.length ? rows : [emptyRow("Ainda sem apontamentos.")])
    );
  });
}

function renderSearch() {
  const q = state.query.trim();
  const found = NOTES.filter((n) => normalize(n.title).includes(normalize(q)));
  elements.results.replaceChildren(
    columnHead(`Resultados para "${q}"`, found.length),
    ...(found.length
      ? found.map((n, i) => noteRow(n, i, { query: q, showMeta: true }))
      : [emptyRow("Nenhuma cadeira encontrada. Experimenta outro nome.")])
  );
}

function update() {
  const searching = state.query.trim().length > 0;
  elements.list.hidden = searching;
  elements.results.hidden = !searching;
  document.getElementById("filter-section").classList.toggle("is-searching", searching);

  elements.yearTabs.classList.toggle("disabled", state.type === "mes");
  syncSegmented(elements.typeTabs, "type");
  syncSegmented(elements.yearTabs, "year");

  if (searching) {
    renderSearch();
  } else {
    renderSemesters();
    persist();
  }
}

function clearSearch() {
  if (!state.query) return;
  state.query = "";
  elements.search.value = "";
}

elements.search.addEventListener("input", () => {
  state.query = elements.search.value;
  update();
});

elements.search.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearSearch();
    update();
    elements.search.blur();
  }
});

document.addEventListener("keydown", (event) => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
  if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
    event.preventDefault();
    elements.search.focus();
  }
});


readInitialState();
setupSegmented(elements.typeTabs, "type");
setupSegmented(elements.yearTabs, "year");
update();
document.fonts?.ready.then(() => {
  moveIndicator(elements.typeTabs, true);
  moveIndicator(elements.yearTabs, true);
});
