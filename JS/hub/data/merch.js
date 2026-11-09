// available true fica na coleção
// sem available vai para o arquivo
//
// { id, year, tag, title, image, backImage?, price?, available? }
// tag: T-shirts | Hoodies | Casacos | Acessórios | Kits

const merchThumb = (folder, file) => `./assets/images/merch/thumbs/${folder}/${file}.webp`;
const posterThumb = (folder, file) => `./assets/images/eventos/thumbs/${folder}/${file}.webp`;

export const MERCH_ITEMS = [
  // 2025/26
  { id: "25-hoodie-classica", year: "2025/26", tag: "Hoodies", title: "Hoodie Clássica", image: merchThumb("2025-2026", "HoodieClassico-frente"), backImage: merchThumb("2025-2026", "HoodieClassico-tras") },
  { id: "25-hoodie-lonely", year: "2025/26", tag: "Hoodies", title: "Hoodie Lonely Coders Club", image: merchThumb("2025-2026", "HoodieBranca-frente"), backImage: merchThumb("2025-2026", "HoodieBranca-tras") },
  { id: "25-hoodie-cloud", year: "2025/26", tag: "Hoodies", title: "Hoodie On Cloud 9.0", image: merchThumb("2025-2026", "HoodieCloud-frente"), backImage: merchThumb("2025-2026", "HoodieCloud-tras") },
  { id: "25-hoodie-web", year: "2025/26", tag: "Hoodies", title: "Hoodie Silent Architects of the Web", image: merchThumb("2025-2026", "HoodieWeb-frente"), backImage: merchThumb("2025-2026", "HoodieWeb-tras") },
  { id: "25-hoodie-pretty", year: "2025/26", tag: "Hoodies", title: "Hoodie Pretty Girls", image: merchThumb("2025-2026", "HoodieBIP-frente"), backImage: merchThumb("2025-2026", "HoodieBIP-tras") },
  { id: "25-casaco", year: "2025/26", tag: "Casacos", title: "Casaco com Fecho", image: merchThumb("2025-2026", "Casaco-frente"), backImage: merchThumb("2025-2026", "Casaco-tras") },
  { id: "25-parka", year: "2025/26", tag: "Casacos", title: "Parka", image: merchThumb("2025-2026", "Parka-frente"), backImage: merchThumb("2025-2026", "Parka-tras") },
  { id: "25-tshirt", year: "2025/26", tag: "T-shirts", title: "T-shirt", image: merchThumb("2025-2026", "Tshirt") },
  { id: "25-meias", year: "2025/26", tag: "Acessórios", title: "Meias", image: merchThumb("2025-2026", "Meias") },
  { id: "25-isqueiro", year: "2025/26", tag: "Acessórios", title: "Isqueiro", image: merchThumb("2025-2026", "Isqueiro") },
  { id: "25-tapete", year: "2025/26", tag: "Acessórios", title: "Tapete de Rato", image: merchThumb("2025-2026", "Tapete-de-rato") },
  { id: "25-kit-latada", year: "2025/26", tag: "Kits", title: "Kit Latada", price: "10€", image: posterThumb("2025-2026", "event-50") },

  // 2024/25
  { id: "24-hoodie-eng", year: "2024/25", tag: "Hoodies", title: "Hoodie Engenharia Informática", image: merchThumb("2024-2025", "HPE-frente"), backImage: merchThumb("2024-2025", "HPE-tras") },
  { id: "24-hoodie-floppy", year: "2024/25", tag: "Hoodies", title: "Hoodie Floppy", image: merchThumb("2024-2025", "HBPP-frente"), backImage: merchThumb("2024-2025", "HBPP-tras") },
  { id: "24-hoodie-info", year: "2024/25", tag: "Hoodies", title: "Hoodie Informática", image: merchThumb("2024-2025", "HPPP-frente"), backImage: merchThumb("2024-2025", "HPPP-tras") },
  { id: "24-casaco-branco", year: "2024/25", tag: "Casacos", title: "Casaco Branco", image: merchThumb("2024-2025", "CB-frente"), backImage: merchThumb("2024-2025", "CB-tras") },
  { id: "24-casaco-preto", year: "2024/25", tag: "Casacos", title: "Casaco Preto", image: merchThumb("2024-2025", "CP-frente"), backImage: merchThumb("2024-2025", "CP-tras") },
  { id: "24-parka", year: "2024/25", tag: "Casacos", title: "Parka", image: merchThumb("2024-2025", "Parka-frente"), backImage: merchThumb("2024-2025", "Parka-tras") },
  { id: "24-bone", year: "2024/25", tag: "Acessórios", title: "Boné", image: merchThumb("2024-2025", "chapeu") },
  { id: "24-guarda-chuva", year: "2024/25", tag: "Acessórios", title: "Guarda-chuva", image: merchThumb("2024-2025", "guarda-chuva") },
  { id: "24-meias", year: "2024/25", tag: "Acessórios", title: "Meias", image: merchThumb("2024-2025", "Meias") },
  { id: "24-isqueiros", year: "2024/25", tag: "Acessórios", title: "Isqueiros", image: merchThumb("2024-2025", "Isqueiro1"), backImage: merchThumb("2024-2025", "Isqueiro2") },
  { id: "24-tapete", year: "2024/25", tag: "Acessórios", title: "Tapete de Rato", image: merchThumb("2024-2025", "Tapete-de-rato") },
  { id: "24-emblema", year: "2024/25", tag: "Acessórios", title: "Emblema", image: merchThumb("2024-2025", "Emblema") },
  { id: "24-kit-caloiro", year: "2024/25", tag: "Kits", title: "Kit Caloiro", price: "4,5€", image: posterThumb("2024-2025", "event-37") },
  { id: "24-kit-latada", year: "2024/25", tag: "Kits", title: "Kit Latada", price: "10€", image: posterThumb("2024-2025", "event-41") },
  { id: "24-kit-finalistas", year: "2024/25", tag: "Kits", title: "Kit Finalistas", image: posterThumb("2024-2025", "event-46") },

  // 2023/24
  { id: "23-hoodie-curso", year: "2023/24", tag: "Hoodies", title: "Hoodie do Curso", image: merchThumb("2023-2024", "hoodie-curso-front"), backImage: merchThumb("2023-2024", "hoodie-curso-back") },
  { id: "23-hoodie-branca", year: "2023/24", tag: "Hoodies", title: "Hoodie Branca", image: merchThumb("2023-2024", "hoodie-branco-front"), backImage: merchThumb("2023-2024", "hoodie-branco-back") },
  { id: "23-hoodie-preta", year: "2023/24", tag: "Hoodies", title: "Hoodie Preta", image: merchThumb("2023-2024", "hoodie-preto-front"), backImage: merchThumb("2023-2024", "hoodie-preto-back") },
  { id: "23-casaco", year: "2023/24", tag: "Casacos", title: "Casaco", image: merchThumb("2023-2024", "casaco-front"), backImage: merchThumb("2023-2024", "casaco-back") },
  { id: "23-caneca", year: "2023/24", tag: "Acessórios", title: "Caneca", image: merchThumb("2023-2024", "caneca") },
  { id: "23-gorro", year: "2023/24", tag: "Acessórios", title: "Gorro", image: merchThumb("2023-2024", "gorro") },
  { id: "23-boxers", year: "2023/24", tag: "Acessórios", title: "Boxers", image: merchThumb("2023-2024", "boxers") },
  { id: "23-isqueiro", year: "2023/24", tag: "Acessórios", title: "Isqueiro", image: merchThumb("2023-2024", "isqueiro") },
  { id: "23-tapete", year: "2023/24", tag: "Acessórios", title: "Tapete de Rato", image: merchThumb("2023-2024", "tapete") },
  { id: "23-emblema", year: "2023/24", tag: "Acessórios", title: "Emblema", image: merchThumb("2023-2024", "emblema") },

  // 2022/23
  { id: "22-hoodie-curso", year: "2022/23", tag: "Hoodies", title: "Hoodie do Curso", image: merchThumb("2022-2023", "hoodie_1"), backImage: merchThumb("2022-2023", "hoodie_3") },
  { id: "22-hoodie-branca", year: "2022/23", tag: "Hoodies", title: "Hoodie Branca", image: merchThumb("2022-2023", "HoodieBranco"), backImage: merchThumb("2022-2023", "HoodieBrancoback") },
  { id: "22-hoodie-preta", year: "2022/23", tag: "Hoodies", title: "Hoodie Preta", image: merchThumb("2022-2023", "HoodiePreto"), backImage: merchThumb("2022-2023", "HoodiePretoback") },
  { id: "22-casaco", year: "2022/23", tag: "Casacos", title: "Casaco", image: merchThumb("2022-2023", "casaco_1"), backImage: merchThumb("2022-2023", "casaco_2") },
  { id: "22-bucket", year: "2022/23", tag: "Acessórios", title: "Chapéu Bucket", image: merchThumb("2022-2023", "bucket-hat") },
  { id: "22-garrafa", year: "2022/23", tag: "Acessórios", title: "Garrafa", image: merchThumb("2022-2023", "bottle") },
  { id: "22-isqueiro", year: "2022/23", tag: "Acessórios", title: "Isqueiro", image: merchThumb("2022-2023", "Lighter") },
  { id: "22-emblema", year: "2022/23", tag: "Acessórios", title: "Emblema", image: merchThumb("2022-2023", "emblema") },
];
