import { html, mount, useState } from "./react.js";
import { listVariants, motion, rowVariants, useTilt } from "./motion.js";
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
  SectionHead,
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

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function Detail({ label, children }) {
  return html`
    <div>
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">${label}</dt>
      <dd className="mt-1 text-sm font-medium text-fg">${children}</dd>
    </div>
  `;
}

function UpcomingEventCard({ event }) {
  const tilt = useTilt({ max: 3 });

  return html`
    <${motion.li}
      ref=${tilt.ref}
      variants=${rowVariants}
      style=${tilt.style}
      whileHover=${tilt.enabled ? { y: -6 } : undefined}
      ...${tilt.handlers}
      className="hub-card hub-card--row group"
    >
      <div className="hub-card-media aspect-[4/5] sm:aspect-auto">
        <${SafeImage}
          src=${event.image}
          alt=${`Cartaz: ${event.title}`}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
      </div>
      <div className="hub-card-body gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="hub-countdown">${countdownLabel(event.date)}</span>
          <${Badge}>${event.tag}<//>
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">${event.title}</h3>
          <p className="hub-card-text mt-2 max-w-md text-[15px]">${event.description}</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line/10 pt-5 sm:grid-cols-3">
          <${Detail} label="Data"><time dateTime=${event.date}>${formatEventDate(event)}</time><//>
          ${event.time && html`<${Detail} label="Hora">${event.time}<//>`}
          ${event.place && html`<${Detail} label="Local">${event.place}<//>`}
        </dl>
        ${event.link &&
        html`
          <div className="mt-auto">
            <a href=${event.link} target="_blank" rel="noopener noreferrer" className=${PRIMARY_BUTTON_CLASS}>
              Inscrever-me <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
            </a>
          </div>
        `}
      </div>
    <//>
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
      <${PageHeader} title="Eventos & Atividades" />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <${Tabs} label="Eventos" tabs=${TABS} value=${tab} onChange=${setTab} />
        ${isArchive && html`<${YearSwitch} years=${years} value=${year} onChange=${setYear} />`}
        <div className="max-w-full sm:ml-auto">
          <${TagFilter} tags=${TAGS} value=${activeTag} onChange=${setTag} counts=${counts} />
        </div>
      </div>

      <section id=${`panel-${tab}`} role="tabpanel" aria-labelledby=${`tab-${tab}`} className="mt-9">
        <${SectionHead}
          title=${isArchive ? `Arquivo ${toFullYear(year)}` : "Próximos eventos"}
          count=${plural(visible.length, "evento", "eventos")}
        />

        ${!isArchive &&
        (visible.length
          ? html`
              <${motion.ul}
                key=${`${tab}-${activeTag}`}
                variants=${listVariants}
                initial="hide"
                animate="show"
                className="space-y-4"
              >
                ${visible.map((event) => html`<${UpcomingEventCard} key=${event.id} event=${event} />`)}
              <//>
            `
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
              <${CardGrid} key=${`${tab}-${activeTag}-${year}`}>
                ${visible.map(
                  (event, i) => html`
                    <${Card}
                      key=${event.id}
                      index=${i}
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
                title=${`Ainda sem eventos passados em ${toFullYear(year)}`}
                description="Os eventos deste mandato aparecem aqui depois de acontecerem."
              />
            `)}
      </section>
    <//>
  `;
}

mount("hub-app", EventsPage);
