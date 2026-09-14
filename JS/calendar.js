/*************************/
/* Configs do calendário */
/*************************/

const Calendar = tui.Calendar;
const container = document.getElementById("calendar");
const options = {
  defaultView: "month",
  isReadOnly: true,
  useFormPopup: true,
  useDetailPopup: false,
  gridSelection: false,
  calendars: [
    {
      id: "utad1",
      name: "UTAD1ano",
    },
    {
      id: "utad2",
      name: "UTAD2ano",
    },
    {
      id: "utad3",
      name: "UTAD3ano",
    },
    {
      id: "utad",
      name: "UTAD",
    },
  ],
};

const calendar = new Calendar(container, options);

calendar.setTheme({
  month: {
    weekend: {
      backgroundColor: "#d9d9d9",
    },
    gridCell: {
      headerHeight: 30,
      footerHeight: null,
    },
  },
  common: {
    color: "#000000",
  },
});

calendar.setOptions({
  month: {
    dayNames: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  },
});

/**/

/***********************/
/* Marcação de Eventos */
/***********************/

class Evento {
  constructor(id, calendarId, title, start, end, category, isReadOnly, useDetailPopUp, color, backgroundColor) {
      this.id = id;
      this.calendarId = calendarId;
      this.title = title;
      this.start = start;
      this.end = end;
      this.category = category;
      this.isReadOnly = isReadOnly;
      this.useDetailPopUp = useDetailPopUp;
      this.color = color;
      this.backgroundColor = backgroundColor;
  }
}

let eventos = [];

/* --1º Semestre-- */

/* Marcações 1º Ano */
/* Álgebra linear */
eventos.push(new Evento("utad1.1", "utad1", "(F) Álgebrea Linear", "2025-10-24", "2025-10-24", "allday", true, true, "#FFF", "orange"));
eventos.push(new Evento("utad1.2", "utad1", "(F) Álgebrea Linear", "2025-11-28", "2025-11-28", "allday", true, true, "#FFF", "orange"));
eventos.push(new Evento("utad1.3", "utad1", "(F) Álgebrea Linear", "2026-01-09", "2026-01-09", "allday", true, true, "#FFF", "orange"));

/* Análise matemática */
eventos.push(new Evento("utad1.4", "utad1", "(F) Análise Matemática", "2025-10-31", "2025-10-31", "allday", true, true, "#FFF", "orange"));
eventos.push(new Evento("utad1.5", "utad1", "(F) Análise Matemática", "2025-12-19", "2025-12-19", "allday", true, true, "#FFF", "orange"));

/* Programação Procedimental */
eventos.push(new Evento("utad1.6", "utad1", "(F) Programação Procedimental", "2025-11-06", "2025-11-06", "allday", true, true, "#FFF", "orange"));
eventos.push(new Evento("utad1.7", "utad1", "(F) Programação Procedimental", "2025-12-17", "2025-12-17", "allday", true, true, "#FFF", "orange"));

/* Tópicos de Matemática Discreta */
eventos.push(new Evento("utad1.10", "utad1", "(F) Tópicos de Matemática Discreta", "2025-11-07", "2025-11-07", "allday", true, true, "#FFF", "orange"));
eventos.push(new Evento("utad1.11", "utad1", "(F) Tópicos de Matemática Discreta", "2026-01-06", "2026-01-06", "allday", true, true, "#FFF", "orange"));

/* Sistemas Operativos */
eventos.push(new Evento("utad1.12", "utad1", "(F) Sistemas Operativos", "2025-11-03", "2025-11-03", "allday", true, true, "#FFF", "orange"));
eventos.push(new Evento("utad1.13", "utad1", "(F) Sistemas Operativos", "2026-01-05", "2026-01-05", "allday", true, true, "#FFF", "orange"));



/* Marcações 2º Ano */

/* Métodos Estatísticos */
eventos.push(new Evento("utad2.5", "utad2", "(F) Métodos Estatísticos", "2025-11-08", "2025-11-08", "allday", true, true, "#FFF", "gray"));
eventos.push(new Evento("utad2.6", "utad2", "(F) Métodos Estatísticos", "2025-12-20", "2025-12-20", "allday", true, true, "#FFF", "gray"));
eventos.push(new Evento("utad2.14", "utad2", "(F) Métodos Estatísticos", "2026-01-09", "2026-01-09", "allday", true, true, "#FFF", "gray"));

/* Programação Funcional */
eventos.push(new Evento("utad2.1", "utad2", "(AP) Programação Funcional", "2025-11-13", "2025-11-13", "allday", true, true, "#FFF", "gray"));
eventos.push(new Evento("utad2.2", "utad2", "(AP) Programação Funcional", "2026-01-08", "2026-01-08", "allday", true, true, "#FFF", "gray"));


/* Engenharia de Software */
eventos.push(new Evento("utad2.3", "utad2", "(T) Engenharia de Software - Etapa 1", "2025-10-18", "2025-10-18", "allday", true, true, "#FFF", "gray"));
eventos.push(new Evento("utad3.3", "utad2", "(T) Engenharia de Software - Etapa 2", "2025-11-15", "2025-11-15", "allday", true, true, "#FFF", "gray"));
eventos.push(new Evento("utad3.7", "utad2", "(T) Engenharia de Software - Etapa 3", "2025-12-13", "2025-12-13", "allday", true, true, "#FFF", "gray"));
eventos.push(new Evento("utad3.8", "utad2", "(T) Engenharia de Software - Apresentação e Defesa", "2025-12-17", "2025-12-20", "allday", true, true, "#FFF", "gray"));


/* Marcações 3º Ano */

/* Sistemas de Informação */
eventos.push(new Evento("utad3.16", "utad3", "(T) Sistemas de Informação", "2025-10-10", "2025-10-10", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.17", "utad3", "(T) Sistemas de Informação", "2025-11-14", "2025-11-14", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.18", "utad3", "(T) Sistemas de Informação", "2025-12-05", "2025-12-05", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.19", "utad3", "(T) Sistemas de Informação", "2026-01-09", "2026-01-09", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.20", "utad3", "(T) Sistemas de Informação", "2026-01-14", "2026-01-14", "allday", true, true, "#FFF", "black"));

/* Gestão de Projetos em Engenharia */
eventos.push(new Evento("utad3.6", "utad3", "(T) GPE - 30%", "2025-11-10", "2025-11-16", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.7", "utad3", "(T) GPE - 70%", "2025-12-08", "2025-12-14", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.8", "utad3", "(T) GPE - 100%", "2026-01-05", "2026-01-11", "allday", true, true, "#FFF", "black"));

/* Laboratório de aplicações web e bases de dados */
eventos.push(new Evento("utad3.9", "utad3", "(T) Laboratório de Aplicações - Fase 1", "2025-10-05", "2025-10-05", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.10", "utad3", "(T) Laboratório de Aplicações - Fase 2", "2025-10-26", "2025-10-26", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.11", "utad3", "(T) Laboratório de Aplicações - Fase 3", "2026-01-05", "2026-01-05", "allday", true, true, "#FFF", "black"));

/* Redes II */
eventos.push(new Evento("utad3.4", "utad3", "(F) Redes II", "2025-10-28", "2025-10-28", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.5", "utad3", "(F) Redes II", "2025-12-16", "2025-12-16", "allday", true, true, "#FFF", "black"));

/* Inteligência Artificial */
eventos.push(new Evento("utad3.12", "utad3", "(T) Inteligência Artificial", "2026-01-08", "2026-01-08", "allday", true, true, "#FFF", "black"));

/* Engenharia Web */
eventos.push(new Evento("utad3.1", "utad3", "(F) Engenharia Web", "2025-10-30", "2025-10-30", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.2", "utad3", "(F) Engenharia Web", "2025-12-18", "2025-12-18", "allday", true, true, "#FFF", "black"));
eventos.push(new Evento("utad3.3", "utad3", "(P) Engenharia Web", "2025-12-19", "2025-12-19", "allday", true, true, "#FFF", "black"));


/* Outro tipo de marcações */

/*
eventos.push(new Evento("matriculas", "utad", "Matriculas", "2024-09-09", "2024-09-13", "allday", true, true, "#FFF", "blue"));
eventos.push(new Evento("yearStart", "utad", "Inicio do Ano Letivo", "2024-09-16", "2024-09-16", "allday", true, true, "#FFF", "blue"));
eventos.push(new Evento("MerchStart", "utad", "Merch - Início Encomendas", "2024-11-04", "2024-11-04", "allday", true, true, "#FFF", "blue"));
eventos.push(new Evento("MerchEnd", "utad", "Merch - Fim Encomendas", "2024-11-13", "2024-11-13", "allday", true, true, "#FFF", "blue"));
*\

/* Insere os eventos no calendário */

eventos.forEach((evento) => {
  calendar.createEvents([,
    evento
  ])
});

/********************************/
/* Interação com os botões HTML */
/********************************/

var hoje = calendar.getDate();

document.querySelector("#date").textContent =
  hoje.getMonth() + 1 + "/" + hoje.getFullYear();

document.querySelector("#prev").onclick = function () {
  calendar.prev();
  var hoje = calendar.getDate();
  document.querySelector("#date").textContent =
    hoje.getMonth() + 1 + "/" + hoje.getFullYear();
};

document.querySelector("#now").onclick = function () {
  calendar.today();
  var hoje = calendar.getDate();
  document.querySelector("#date").textContent =
    hoje.getMonth() + 1 + "/" + hoje.getFullYear();
};

document.querySelector("#next").onclick = function () {
  calendar.next();
  var hoje = calendar.getDate();
  document.querySelector("#date").textContent =
    hoje.getMonth() + 1 + "/" + hoje.getFullYear();
};

document.querySelector("#todos").onclick = function () {
  document.querySelector("#pri-ano").classList.remove("cal-outline");
  document.querySelector("#seg-ano").classList.remove("cal-outline");
  document.querySelector("#ter-ano").classList.remove("cal-outline");
  calendar.setCalendarVisibility("utad1", true);
  calendar.setCalendarVisibility("utad2", true);
  calendar.setCalendarVisibility("utad3", true);
};

document.querySelector("#pri-ano").onclick = function () {
  this.classList.add("cal-outline");
  document.querySelector("#seg-ano").classList.remove("cal-outline");
  document.querySelector("#ter-ano").classList.remove("cal-outline");
  calendar.setCalendarVisibility("utad1", true);
  calendar.setCalendarVisibility("utad2", false);
  calendar.setCalendarVisibility("utad3", false);
};

document.querySelector("#seg-ano").onclick = function () {
  this.classList.add("cal-outline");
  document.querySelector("#pri-ano").classList.remove("cal-outline");
  document.querySelector("#ter-ano").classList.remove("cal-outline");
  calendar.setCalendarVisibility("utad1", false);
  calendar.setCalendarVisibility("utad2", true);
  calendar.setCalendarVisibility("utad3", false);
};

document.querySelector("#ter-ano").onclick = function () {
  this.classList.add("cal-outline");
  document.querySelector("#seg-ano").classList.remove("cal-outline");
  document.querySelector("#pri-ano").classList.remove("cal-outline");
  calendar.setCalendarVisibility("utad1", false);
  calendar.setCalendarVisibility("utad2", false);
  calendar.setCalendarVisibility("utad3", true);
};