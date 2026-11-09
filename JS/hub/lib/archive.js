export const CURRENT_YEAR = "2026/27";

export const ALL_TAGS = "Todos";

// "2025/26" passa a "2025/2026"
export const toFullYear = (year) => year.replace(/\/(\d\d)$/, "/20$1");

export function countByTag(items) {
  const counts = {};
  for (const { tag } of items) counts[tag] = (counts[tag] || 0) + 1;
  return counts;
}

// mandato atual aparece sempre
export function archiveYears(items) {
  return [...new Set([CURRENT_YEAR, ...items.map((item) => item.year)])].sort((a, b) => b.localeCompare(a));
}

export function latestFilledYear(items, years) {
  return years.find((year) => items.some((item) => item.year === year)) || years[0];
}

// tag sem resultados volta a todos
export function filterByTag(items, tag) {
  const counts = countByTag(items);
  const activeTag = tag === ALL_TAGS || counts[tag] ? tag : ALL_TAGS;
  const visible = activeTag === ALL_TAGS ? items : items.filter((item) => item.tag === activeTag);
  return { counts, activeTag, visible };
}
