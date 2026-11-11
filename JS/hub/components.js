import { html, useEffect, useState } from "./react.js";
import { cardVariants, gridVariants, motion, useTilt } from "./motion.js";
import { ALL_TAGS } from "./lib/archive.js";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const PRIMARY_BUTTON_CLASS = "hub-cta";

const INSTAGRAM_URL = "https://www.instagram.com/neei.utad/";
const PILL_SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.7 };

export function PageCanvas({ children }) {
  return html`
    <div className="relative">
      <div className="page-texture" aria-hidden="true"></div>
      <div className="hub-fade mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:pt-32">${children}</div>
    </div>
  `;
}

export function PageHeader({ title }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!title) return;
    let i = 0;
    let interval = null;
    const delay = setTimeout(() => {
      interval = setInterval(() => {
        if (i < title.length) setDisplayed(title.slice(0, ++i));
        else clearInterval(interval);
      }, 55);
    }, 300);
    return () => {
      clearTimeout(delay);
      clearInterval(interval);
    };
  }, [title]);

  return html`
    <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-4xl">
      ${displayed}<span className="page-title-cursor">_</span>
    </h1>
  `;
}

// botão de um controlo segmentado; a pílula viaja entre botões pelo layoutId
function SegButton({ active, pillId, children, ...rest }) {
  return html`
    <button type="button" className=${cx("hub-seg-btn", active && "is-active")} ...${rest}>
      ${active && html`<${motion.span} layoutId=${pillId} className="hub-seg-pill" transition=${PILL_SPRING} />`}
      ${children}
    </button>
  `;
}

export function Tabs({ tabs, value, onChange, label }) {
  const handleKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    const index = tabs.findIndex((tab) => tab.id === value);
    const next = tabs[(index + step + tabs.length) % tabs.length];
    onChange(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return html`
    <div role="tablist" aria-label=${label} onKeyDown=${handleKeyDown} className="hub-seg">
      ${tabs.map((tab) => {
        const active = tab.id === value;
        return html`
          <${SegButton}
            key=${tab.id}
            pillId="hub-tabs-pill"
            active=${active}
            id=${`tab-${tab.id}`}
            role="tab"
            aria-selected=${active}
            aria-controls=${`panel-${tab.id}`}
            tabIndex=${active ? 0 : -1}
            onClick=${() => onChange(tab.id)}
          >
            ${tab.label}
            <span className="hub-seg-count">${tab.count}</span>
          <//>
        `;
      })}
    </div>
  `;
}

export function TagFilter({ tags, value, onChange, counts }) {
  return html`
    <div role="group" aria-label="Filtrar por tipo" className="hub-seg">
      ${[ALL_TAGS, ...tags].map((tag) => {
        const active = tag === value;
        return html`
          <${SegButton}
            key=${tag}
            pillId="hub-tag-pill"
            active=${active}
            aria-pressed=${active}
            disabled=${tag !== ALL_TAGS && !counts[tag]}
            onClick=${() => onChange(tag)}
          >
            ${tag}
          <//>
        `;
      })}
    </div>
  `;
}

export function YearSwitch({ years, value, onChange }) {
  return html`
    <div role="group" aria-label="Ano letivo" className="hub-seg">
      ${years.map(
        (year) => html`
          <${SegButton}
            key=${year}
            pillId="hub-year-pill"
            active=${year === value}
            aria-pressed=${year === value}
            onClick=${() => onChange(year)}
          >
            ${year}
          <//>
        `
      )}
    </div>
  `;
}

export function SectionHead({ title, count }) {
  return html`
    <div className="hub-section-head">
      <h2>${title}</h2>
      ${count !== undefined && html`<span className="hub-section-count">${count}</span>`}
    </div>
  `;
}

export function Button({ children, onClick }) {
  return html`<button type="button" className=${PRIMARY_BUTTON_CLASS} onClick=${onClick}>${children}</button>`;
}

export function EmptyState({ title, description, action, footnote }) {
  return html`
    <div className="hub-empty">
      <h2 className="text-base font-semibold text-fg">${title}</h2>
      ${description && html`<p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">${description}</p>`}
      ${action && html`<div className="mt-6">${action}</div>`}
      ${footnote && html`<p className="mt-6 font-mono text-[11px] text-muted">${footnote}</p>`}
    </div>
  `;
}

export function InstagramNote() {
  return html`
    <span>
      Novidades em primeira mão no${" "}
      <a
        href=${INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-fg underline decoration-line/20 underline-offset-4 hover:decoration-fg"
      >
        @neei.utad
      </a>
    </span>
  `;
}

export function Badge({ children }) {
  return html`<span className="hub-badge">${children}</span>`;
}

// imagem que some se falhar
export function SafeImage({ src, alt, className, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return html`<img src=${src} alt=${alt} className=${className} onError=${() => setFailed(true)} ...${rest} />`;
}

export const pad2 = (n) => String(n + 1).padStart(2, "0");

export function Card({ index = 0, title, description, image, backImage, alt, meta, badge, dateTime, square = false, glow = false }) {
  const tilt = useTilt();

  return html`
    <${motion.article}
      ref=${tilt.ref}
      variants=${cardVariants}
      style=${tilt.style}
      whileHover=${tilt.enabled ? { y: -6 } : undefined}
      ...${tilt.handlers}
      className=${cx("hub-card group", glow && "hub-card--glow")}
    >
      <div className=${cx("hub-card-media", square ? "aspect-square" : "aspect-[4/5]")}>
        <${SafeImage}
          src=${image}
          alt=${alt || title}
          loading="lazy"
          decoding="async"
          className=${cx(
            "h-full w-full object-cover object-top transition-[transform,opacity] duration-700 group-hover:scale-[1.05]",
            backImage && "group-hover:opacity-0"
          )}
        />
        ${backImage &&
        html`
          <${SafeImage}
            src=${backImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        `}
      </div>
      <div className="hub-card-body">
        <div className="hub-card-meta">
          <span>
            <span className="hub-card-index" aria-hidden="true">${pad2(index)}</span>
            <span aria-hidden="true"> · </span>
            <time dateTime=${dateTime}>${meta}</time>
          </span>
          ${badge && html`<${Badge}>${badge}<//>`}
        </div>
        <h3 className="hub-card-title">${title}</h3>
        ${description && html`<p className="hub-card-text">${description}</p>`}
      </div>
    <//>
  `;
}

export function CardGrid({ children }) {
  return html`
    <${motion.div} variants=${gridVariants} initial="hide" animate="show" className="hub-grid">
      ${children}
    <//>
  `;
}
