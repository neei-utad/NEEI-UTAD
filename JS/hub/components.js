import { html, useState } from "./react.js";
import { ALL_TAGS } from "./lib/archive.js";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export const PRIMARY_BUTTON_CLASS =
  "inline-flex h-9 items-center rounded-lg bg-brand px-4 text-sm font-medium text-white transition-colors hover:bg-brand-hover";

const INSTAGRAM_URL = "https://www.instagram.com/neei.utad/";

export function PageCanvas({ children }) {
  return html`
    <div className="relative">
      <div className="page-texture" aria-hidden="true"></div>
      <div className="hub-fade mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:pt-32">${children}</div>
    </div>
  `;
}

export function PageHeader({ title, description }) {
  return html`
    <div className="space-y-4">
      <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-4xl">${title}</h1>
      ${description && html`<p className="max-w-xl text-[15px] leading-relaxed text-muted">${description}</p>`}
    </div>
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
    <div role="tablist" aria-label=${label} onKeyDown=${handleKeyDown} className="flex gap-6 border-b border-line/10">
      ${tabs.map((tab) => {
        const active = tab.id === value;
        return html`
          <button
            key=${tab.id}
            id=${`tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected=${active}
            aria-controls=${`panel-${tab.id}`}
            tabIndex=${active ? 0 : -1}
            onClick=${() => onChange(tab.id)}
            className=${cx(
              "-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition-colors",
              active ? "border-brand text-fg" : "border-transparent text-muted hover:text-fg"
            )}
          >
            ${tab.label}
            <span className="rounded bg-line/[0.06] px-1.5 py-px font-mono text-[10px] tabular-nums text-muted">
              ${tab.count}
            </span>
          </button>
        `;
      })}
    </div>
  `;
}

export function TagFilter({ tags, value, onChange, counts }) {
  return html`
    <div role="group" aria-label="Filtrar por tipo" className="flex flex-wrap gap-1.5">
      ${[ALL_TAGS, ...tags].map((tag) => {
        const active = tag === value;
        return html`
          <button
            key=${tag}
            type="button"
            aria-pressed=${active}
            disabled=${tag !== ALL_TAGS && !counts[tag]}
            onClick=${() => onChange(tag)}
            className=${cx(
              "rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line/10 disabled:hover:text-muted",
              active ? "border-line/20 bg-line/[0.08] text-fg" : "border-line/10 text-muted hover:border-line/20 hover:text-fg"
            )}
          >
            ${tag}
          </button>
        `;
      })}
    </div>
  `;
}

export function YearSwitch({ years, value, onChange }) {
  return html`
    <div
      role="group"
      aria-label="Ano letivo"
      className="inline-flex max-w-full shrink-0 self-start overflow-x-auto rounded-lg border border-line/10 p-0.5 sm:self-auto"
    >
      ${years.map(
        (year) => html`
          <button
            key=${year}
            type="button"
            aria-pressed=${year === value}
            onClick=${() => onChange(year)}
            className=${cx(
              "shrink-0 rounded-md px-2.5 py-1 font-mono text-[11px] tabular-nums transition-colors",
              year === value ? "bg-line/[0.08] text-fg" : "text-muted hover:text-fg"
            )}
          >
            ${year}
          </button>
        `
      )}
    </div>
  `;
}

export function Button({ children, onClick }) {
  return html`<button type="button" className=${PRIMARY_BUTTON_CLASS} onClick=${onClick}>${children}</button>`;
}

export function EmptyState({ title, description, action, footnote, compact = false }) {
  return html`
    <div
      className=${cx(
        "flex flex-col items-center rounded-xl border border-dashed border-line/10 bg-surface/40 px-6 text-center",
        compact ? "py-12" : "py-16 sm:py-20"
      )}
    >
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
  return html`
    <span className="rounded border border-line/10 px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
      ${children}
    </span>
  `;
}

// imagem que some se falhar
export function SafeImage({ src, alt, className, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return html`<img src=${src} alt=${alt} className=${className} onError=${() => setFailed(true)} ...${rest} />`;
}

export function Card({ title, description, image, backImage, alt, meta, badge, dateTime, square = false }) {
  return html`
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line/10 bg-surface/60 transition-colors hover:border-line/20">
      <div className=${cx("relative overflow-hidden border-b border-line/10 bg-line/[0.03]", square ? "aspect-square" : "aspect-[4/5]")}>
        <${SafeImage}
          src=${image}
          alt=${alt || title}
          loading="lazy"
          decoding="async"
          className=${cx(
            "h-full w-full object-cover object-top transition-[transform,opacity] duration-500 group-hover:scale-[1.02]",
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
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <time dateTime=${dateTime} className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">${meta}</time>
          ${badge && html`<${Badge}>${badge}<//>`}
        </div>
        <h3 className="text-[15px] font-semibold leading-snug text-fg">${title}</h3>
        ${description && html`<p className="text-sm leading-relaxed text-muted">${description}</p>`}
      </div>
    </article>
  `;
}

export function CardGrid({ children }) {
  return html`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">${children}</div>`;
}
