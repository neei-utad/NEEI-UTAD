// novo evento entra em próximos
// passa ao arquivo depois da data
//
// { id, year, tag, date, end?, time?, place?, title, description, image, link? }
// tag: Workshops | Palestras | Convívios | Torneios | Núcleo
export const EVENTS = [
  // 2026/27
  { id: 53, year: "2026/27", tag: "Convívios", date: "2026-10-27", time: "20h00", place: "Sabores da Isilda",
    title: "Jantar de Curso", description: "Jantar de curso de Eng. Informática. Inscrições até 23/10.",
    image: "./assets/images/eventos/thumbs/2026-2027/jantar-de-curso.webp" },

  // 2025/26
  { id: 52, year: "2025/26", tag: "Workshops", date: "2025-10-01", time: "16h30",
    title: "Padrões de Software", description: "Workshop com Diogo Guimarães.",
    image: "./assets/images/eventos/thumbs/2025-2026/event-52.webp" },
  { id: 51, year: "2025/26", tag: "Torneios", date: "2025-10-08", end: "2025-10-13",
    title: "Torneio de FIFA", description: "Torneio de EA FC com o NEUTAD.",
    image: "./assets/images/eventos/thumbs/2025-2026/event-51.webp" },
  { id: 49, year: "2025/26", tag: "Convívios", date: "2025-10-14", time: "20h30", place: "Escola Diogo Cão",
    title: "Jantar de Curso", description: "Jantar de curso na Escola Diogo Cão.",
    image: "./assets/images/eventos/thumbs/2025-2026/event-49.webp" },

  // 2024/25
  { id: 48, year: "2024/25", tag: "Torneios", date: "2025-03-24", place: "Metropolis",
    title: "Setas e Matraquilhos", description: "Torneio no Metropolis.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-48.webp" },
  { id: 47, year: "2024/25", tag: "Workshops", date: null,
    title: "Cloud Computing", description: "Workshop com a Accenture.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-47.webp" },
  { id: 45, year: "2024/25", tag: "Torneios", date: "2025-02-10", end: "2025-02-15",
    title: "Torneio de CS2", description: "Torneio de Counter-Strike 2.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-45.webp" },
  { id: 44, year: "2024/25", tag: "Núcleo", date: null,
    title: "Recrutamento NEEI", description: "Recrutamento para os departamentos do núcleo.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-44.webp" },
  { id: 43, year: "2024/25", tag: "Torneios", date: "2024-12-04", place: "Metropolis",
    title: "Torneio de Sueca", description: "Torneio no Metropolis.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-43.webp" },
  { id: 42, year: "2024/25", tag: "Convívios", date: "2024-12-05", time: "20h00", place: "Metropolis",
    title: "Jantar de Natal", description: "Jantar solidário no Metropolis.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-42.webp" },
  { id: 40, year: "2024/25", tag: "Torneios", date: null,
    title: "Torneio de FIFA", description: "Torneio de EA FC.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-40.webp" },
  { id: 39, year: "2024/25", tag: "Convívios", date: null,
    title: "Jantar de Curso", description: "Jantar de curso da Caloirada.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-39.webp" },
  { id: 38, year: "2024/25", tag: "Palestras", date: null,
    title: "Palestra com Rui Valente", description: "Saídas profissionais em Informática.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-38.webp" },
  { id: 36, year: "2024/25", tag: "Palestras", date: null,
    title: "Palestra 101", description: "Boas-vindas aos novos alunos de LEI.",
    image: "./assets/images/eventos/thumbs/2024-2025/event-36.webp" },
];
