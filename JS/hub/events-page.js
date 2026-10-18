import { html, mount, useState } from "./react.js";
import { useHashTab } from "./hooks.js";
import { EVENTS } from "./data/events.js";
import { countdownLabel, formatEventDate, isUpcoming } from "./lib/dates.js";
import { ALL_TAGS, archiveYears, filterByTag, latestFilledYear, toFullYear } from "./lib/archive.js";
import {
  Badge,
  Button,
  Card,
  CardGrid,
  EmptyState,
  InstagramNote,
  PageCanvas,
  PageHeader,
  PRIMARY_BUTTON_CLASS,
  SafeImage,
  Tabs,
  TagFilter,
  YearSwitch,
} from "./components.js";

const TAGS = ["Workshops", "Palestras", "Convívios", "Torneios"];
const TAB_UPCOMING = "proximos";
const TAB_ARCHIVE = "arquivo";

const upcomingEvents = EVENTS.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date));
const pastEvents = EVENTS.filter((event) => !isUpcoming(event)).sort((a, b) => b.id - a.id);
const years = archiveYears(pastEvents);
const defaultYear = latestFilledYear(pastEvents, years);

const TABS = [
  { id: TAB_UPCOMING, label: "Próximos", count: upcomingEvents.length },
  { id: TAB_ARCHIVE, label: "Arquivo / Passados", count: pastEvents.length },
];

function Detail({ label, children }) {
  return html`
    <div>
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">${label}</dt>
      <dd className="mt-1 text-sm font-medium text-fg">${children}</dd>
    </div>
  `;
}

function UpcomingEventCard({ event }) {
  return html`
    <li className="group flex flex-col overflow-hidden rounded-xl border border-line/10 bg-surface/60 transition-colors hover:border-line/20 sm:flex-row">
      <div className="aspect-[4/5] overflow-hidden border-b border-line/10 bg-line/[0.03] sm:w-64 sm:shrink-0 sm:border-b-0 sm:border-r">
        <${SafeImage}
          src=${event.image}
          alt=${`Cartaz: ${event.title}`}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand/15 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.06em] text-brand">
            ${countdownLabel(event.date)}
          </span>
          <${Badge}>${event.tag}<//>
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">${event.title}</h3>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">${event.description}</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line/10 pt-5 sm:grid-cols-3">
          <${Detail} label="Data"><time dateTime=${event.date}>${formatEventDate(event)}</time><//>
          ${event.time && html`<${Detail} label="Hora">${event.time}<//>`}
          ${event.place && html`<${Detail} label="Local">${event.place}<//>`}
        </dl>
        ${event.link &&
        html`
          <div className="mt-auto">
            <a href=${event.link} target="_blank" rel="noopener noreferrer" className=${PRIMARY_BUTTON_CLASS}>Inscrever-me</a>
          </div>
        `}
      </div>
    </li>
  `;
}

function EventsPage() {
  const [tab, setTab] = useHashTab(TAB_UPCOMING, TAB_ARCHIVE);
  const [tag, setTag] = useState(ALL_TAGS);
  const [year, setYear] = useState(defaultYear);

  const isArchive = tab === TAB_ARCHIVE;
  const scope = isArchive ? pastEvents.filter((event) => event.year === year) : upcomingEvents;
  const { counts, activeTag, visible } = filterByTag(scope, tag);

  const openArchive = () => {
    setYear(defaultYear);
    setTab(TAB_ARCHIVE);
  };

  return html`
    <${PageCanvas}>
      <${PageHeader}
        title="Eventos & Atividades"
        description="Workshops, palestras, torneios e convívios organizados pelo NEEI."
      />

      <div className="mt-10">
        <${Tabs} label="Eventos" tabs=${TABS} value=${tab} onChange=${setTab} />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <${TagFilter} tags=${TAGS} value=${activeTag} onChange=${setTag} counts=${counts} />
        ${isArchive && html`<${YearSwitch} years=${years} value=${year} onChange=${setYear} />`}
      </div>

      <section id=${`panel-${tab}`} role="tabpanel" aria-labelledby=${`tab-${tab}`} className="mt-6">
        ${!isArchive &&
        (visible.length
          ? html`<ul className="space-y-4">${visible.map((event) => html`<${UpcomingEventCard} key=${event.id} event=${event} />`)}</ul>`
          : html`
              <${EmptyState}
                title="Sem eventos agendados"
                description="O calendário do mandato 2026/2027 está a ser preparado."
                action=${html`<${Button} onClick=${openArchive}>Ver histórico de ${toFullYear(defaultYear)}<//>`}
                footnote=${html`<${InstagramNote} />`}
              />
            `)}

        ${isArchive &&
        (visible.length
          ? html`
              <${CardGrid}>
                ${visible.map(
                  (event) => html`
                    <${Card}
                      key=${event.id}
                      title=${event.title}
                      description=${event.description}
                      image=${event.image}
                      meta=${formatEventDate(event)}
                      dateTime=${event.date || undefined}
                      badge=${event.tag}
                    />
                  `
                )}
              <//>
            `
          : html`
              <${EmptyState}
                compact
                title=${`Ainda sem eventos passados em ${toFullYear(year)}`}
                description="Os eventos deste mandato aparecem aqui depois de acontecerem."
              />
            `)}
      </section>
    <//>
  `;
}

mount("hub-app", EventsPage);
