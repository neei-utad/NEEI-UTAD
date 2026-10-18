const REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const HAS_HOVER = window.matchMedia("(hover: hover)").matches;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// força o reinício de uma animação css
function restartAnimation(element) {
  element.style.animation = "none";
  element.getBoundingClientRect();
  element.style.animation = "";
}

function initTypewriter() {
  const titleEl = document.getElementById("type-title");
  const pathEl = document.getElementById("type-path");
  const commandEl = document.getElementById("type-command");
  const cursor = document.querySelector(".terminal-cursor");
  if (!titleEl || !pathEl || !commandEl || !cursor) return;

  const TITLE = "Núcleo de Estudantes de Engenharia";
  const PATH = "~/neei > ";
  const COMMAND = "informática";
  const TYPING_MS = 55;

  function type(element, text, delay, onDone) {
    let index = 0;
    const step = () => {
      element.textContent += text.charAt(index++);
      if (index < text.length) setTimeout(step, delay);
      else onDone();
    };
    step();
  }

  titleEl.parentNode.appendChild(cursor);

  setTimeout(() => {
    type(titleEl, TITLE, TYPING_MS, () => {
      setTimeout(() => {
        pathEl.textContent = PATH;
        commandEl.parentNode.appendChild(cursor);
        type(commandEl, COMMAND, TYPING_MS + 25, () => {
          commandEl.classList.add("fade-active");
          cursor.classList.add("fade-active");
        });
      }, 350);
    });
  }, 400);
}

function initGallery() {
  const section = document.getElementById("gallery-section");
  const gallery = document.getElementById("expanding-gallery");
  if (!section || !gallery) return;

  const cards = [...gallery.querySelectorAll(".expand-card")];
  if (!cards.length) return;

  const counter = document.getElementById("gallery-current");
  const intervalMs = parseFloat(getComputedStyle(section).getPropertyValue("--gallery-interval")) * 1000 || 6000;

  let current = Math.max(0, cards.findIndex((card) => card.classList.contains("active")));
  let timer = null;
  let inView = false;

  function schedule() {
    clearTimeout(timer);
    const playing = !REDUCE_MOTION && inView && !document.hidden && !section.classList.contains("is-paused");
    section.classList.toggle("is-playing", playing);
    if (playing) timer = setTimeout(() => show(current + 1), intervalMs);
  }

  function setPaused(paused) {
    section.classList.toggle("is-paused", paused);
    schedule();
  }

  function show(index) {
    current = (index + cards.length) % cards.length;

    cards.forEach((card, i) => {
      const active = i === current;
      card.classList.toggle("active", active);
      card.setAttribute("aria-pressed", active);
      if (active) {
        restartAnimation(card.querySelector(".expand-card-progress"));
      } else {
        card.style.removeProperty("--px");
        card.style.removeProperty("--py");
      }
    });

    if (counter) {
      counter.textContent = String(current + 1).padStart(2, "0");
      counter.classList.remove("tick");
      counter.getBoundingClientRect();
      counter.classList.add("tick");
    }

    schedule();
  }

  cards.forEach((card, i) => {
    card.addEventListener("click", () => show(i));
    if (HAS_HOVER) card.addEventListener("mouseenter", () => i !== current && show(i));
  });

  document.getElementById("gallery-prev")?.addEventListener("click", () => show(current - 1));
  document.getElementById("gallery-next")?.addEventListener("click", () => show(current + 1));

  gallery.addEventListener("keydown", (event) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    show(current + step);
    cards[current].focus();
  });

  section.addEventListener("mouseenter", () => setPaused(true));
  section.addEventListener("mouseleave", () => setPaused(false));
  section.addEventListener("focusin", () => setPaused(true));
  section.addEventListener("focusout", (event) => {
    if (!section.contains(event.relatedTarget)) setPaused(false);
  });

  let touchStartX = null;
  gallery.addEventListener("touchstart", (event) => { touchStartX = event.touches[0].clientX; }, { passive: true });
  gallery.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) show(current + (deltaX < 0 ? 1 : -1));
    touchStartX = null;
  });

  if (HAS_HOVER && !REDUCE_MOTION) initPointerParallax(gallery, () => cards[current]);

  if (!REDUCE_MOTION) section.classList.add("will-reveal");
  new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      if (inView) section.classList.add("is-revealed");
      schedule();
    },
    { threshold: 0.25 }
  ).observe(section);

  document.addEventListener("visibilitychange", schedule);

  show(current);
}

// foto ativa segue o rato
function initPointerParallax(container, getActiveCard) {
  const EASING = 0.08;
  const target = { x: 0, y: 0 };
  const position = { x: 0, y: 0 };
  let frame = null;

  const tick = () => {
    position.x += (target.x - position.x) * EASING;
    position.y += (target.y - position.y) * EASING;

    const card = getActiveCard();
    card.style.setProperty("--px", position.x.toFixed(3));
    card.style.setProperty("--py", position.y.toFixed(3));

    const settled = Math.abs(target.x - position.x) < 0.001 && Math.abs(target.y - position.y) < 0.001;
    frame = settled ? null : requestAnimationFrame(tick);
  };

  const requestTick = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  container.addEventListener("pointermove", (event) => {
    const card = getActiveCard();
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    target.x = clamp((x / rect.width) * 2 - 1, -1, 1);
    target.y = clamp((y / rect.height) * 2 - 1, -1, 1);
    requestTick();
  });

  container.addEventListener("pointerleave", () => {
    target.x = 0;
    target.y = 0;
    requestTick();
  });
}

initTypewriter();
initGallery();
