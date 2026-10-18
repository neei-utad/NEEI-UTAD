import { html, mount, useState } from "./react.js";
import { useHashTab } from "./hooks.js";
import { MERCH_ITEMS } from "./data/merch.js";
import { ALL_TAGS, archiveYears, CURRENT_YEAR, filterByTag, latestFilledYear, toFullYear } from "./lib/archive.js";
import {
  Button,
  Card,
  CardGrid,
  EmptyState,
  InstagramNote,
  PageCanvas,
  PageHeader,
  Tabs,
  TagFilter,
  YearSwitch,
} from "./components.js";

const TAGS = ["T-shirts", "Hoodies", "Casacos", "Acessórios", "Kits"];
const TAB_COLLECTION = "colecao";
const TAB_ARCHIVE = "anteriores";

const collection = MERCH_ITEMS.filter((item) => item.available);
const pastItems = MERCH_ITEMS.filter((item) => !item.available);
const years = archiveYears(pastItems);
const defaultYear = latestFilledYear(pastItems, years);

const TABS = [
  { id: TAB_COLLECTION, label: `Coleção ${CURRENT_YEAR}`, count: collection.length },
  { id: TAB_ARCHIVE, label: "Edições anteriores", count: pastItems.length },
];

function MerchCard({ item }) {
  return html`
    <${Card}
      square
      title=${item.title}
      image=${item.image}
      backImage=${item.backImage}
      alt=${item.tag === "Kits" ? `Cartaz: ${item.title}` : item.title}
      meta=${item.year}
      badge=${item.price || item.tag}
    />
  `;
}

function MerchPage() {
  const [tab, setTab] = useHashTab(TAB_COLLECTION, TAB_ARCHIVE);
  const [tag, setTag] = useState(ALL_TAGS);
  const [year, setYear] = useState(defaultYear);

  const isArchive = tab === TAB_ARCHIVE;
  const scope = isArchive ? pastItems.filter((item) => item.year === year) : collection;
  const { counts, activeTag, visible } = filterByTag(scope, tag);

  const openArchive = () => {
    setYear(defaultYear);
    setTab(TAB_ARCHIVE);
  };

  const emptyState = isArchive
    ? html`
        <${EmptyState}
          compact
          title=${`Ainda sem edições arquivadas em ${toFullYear(year)}`}
          description="Os artigos deste mandato aparecem aqui quando deixarem de estar à venda."
        />
      `
    : html`
        <${EmptyState}
          title=${`A coleção ${CURRENT_YEAR} ainda não abriu`}
          description="A nova coleção do núcleo está em preparação."
          action=${html`<${Button} onClick=${openArchive}>Ver edições anteriores<//>`}
          footnote=${html`<${InstagramNote} />`}
        />
      `;

  return html`
    <${PageCanvas}>
      <${PageHeader} title="Merch" description="T-shirts, hoodies, casacos e acessórios oficiais do NEEI." />

      <div className="mt-10">
        <${Tabs} label="Merch" tabs=${TABS} value=${tab} onChange=${setTab} />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <${TagFilter} tags=${TAGS} value=${activeTag} onChange=${setTag} counts=${counts} />
        ${isArchive && html`<${YearSwitch} years=${years} value=${year} onChange=${setYear} />`}
      </div>

      <section id=${`panel-${tab}`} role="tabpanel" aria-labelledby=${`tab-${tab}`} className="mt-6">
        ${visible.length
          ? html`<${CardGrid}>${visible.map((item) => html`<${MerchCard} key=${item.id} item=${item} />`)}<//>`
          : emptyState}
      </section>
    <//>
  `;
}

mount("hub-app", MerchPage);
