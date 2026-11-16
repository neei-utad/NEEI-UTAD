const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const DAY_MS = 86_400_000;

const pad = (n) => String(n).padStart(2, "0");

// datas locais sem fuso
export function parseDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function formatEventDate({ date, end, year }) {
  if (!date) return year;

  const start = parseDate(date);
  const startLabel = `${pad(start.getDate())} ${MONTHS[start.getMonth()]}`;
  if (!end) return `${startLabel} ${start.getFullYear()}`;

  const finish = parseDate(end);
  if (start.getMonth() === finish.getMonth()) {
    return `${pad(start.getDate())}–${pad(finish.getDate())} ${MONTHS[start.getMonth()]} ${start.getFullYear()}`;
  }
  return `${startLabel} – ${pad(finish.getDate())} ${MONTHS[finish.getMonth()]} ${finish.getFullYear()}`;
}

export function isUpcoming({ date, end }) {
  if (!date) return false;
  return parseDate(end || date) >= startOfToday();
}

export function countdownLabel(iso) {
  const days = Math.round((parseDate(iso) - startOfToday()) / DAY_MS);
  if (days <= 0) return "Hoje";
  if (days === 1) return "Amanhã";
  return `Daqui a ${days} dias`;
}
