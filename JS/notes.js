document.addEventListener("DOMContentLoaded", () => {
    currentTypeIndex = 0; 
    currentYearIndex = 0; 

    updateFilterUI(); 
    filterNotes();
});

// Event listeners for filtering
document.getElementById("type-prev").addEventListener("click", () => {
    changeType(-1);
    filterNotes(); 
});
document.getElementById("type-next").addEventListener("click", () => {
    changeType(1);
    filterNotes();
});
document.getElementById("year-prev").addEventListener("click", () => {
    changeYear(-1);
    filterNotes();
});
document.getElementById("year-next").addEventListener("click", () => {
    changeYear(1);
    filterNotes();
});

const types = ["lic", "mes"];
const years = ["1", "2", "3"];

let currentTypeIndex = 0;
let currentYearIndex = 0;

const typeDisplay = document.getElementById("type-display");
const yearDisplay = document.getElementById("year-display");

function changeType(direction) {
    currentTypeIndex = (currentTypeIndex + direction + types.length) % types.length;
    updateFilterUI();
    //updateYearButtons();
    filterNotes();
}

function changeYear(direction) {
    currentYearIndex = (currentYearIndex + direction + years.length) % years.length;
    updateFilterUI();
    filterNotes();
}

function updateFilterUI() {
    typeDisplay.textContent = types[currentTypeIndex] === "lic" ? "Licenciatura" : "Mestrado";

    if (types[currentTypeIndex] === "mes") {
        yearDisplay.textContent = "—";
        document.getElementById("year-prev").disabled = true;
        document.getElementById("year-next").disabled = true;
        yearDisplay.style.opacity = "0.5";
    } else {
        document.getElementById("year-prev").disabled = false;
        document.getElementById("year-next").disabled = false;
        yearDisplay.style.opacity = "1";
        yearDisplay.textContent = `${years[currentYearIndex]}º Ano`;
    }
}

/*function updateYearButtons() {
    const isMestrado = types[currentTypeIndex] === "mes";
    document.getElementById("year-prev").disabled = isMestrado;
    document.getElementById("year-next").disabled = isMestrado;
    yearDisplay.style.opacity = isMestrado ? "0.5" : "1";

    if (isMestrado) {
        yearDisplay.textContent = "—";
    } else {
        changeYear(0);
    }
}*/

const notes = [
    //*****Licenciatura*****//
    //*****1º ano*****//
    //1º semestre
    {titulo: "Álgebra Linear", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1FnTtJOhHqq1DzFkF_B8hizb1qjvNwDtm"},
    {titulo: "Tópicos Matemática Discreta", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1513gezLTu7H-87izHyxZYI6KECN-kdHk"},
    {titulo: "Análise Matemática I", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1mqKdQlSF3dgMrcKyZVvmG6FGEiEh2t7r"},
    {titulo: "Laboratório de Informática e Computadores", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1edSwO-r3ADBf4lBOFeVl-9VIYRjXCTxo"},
    {titulo: "Programação Procedimental", type: "lic", year: "1", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1NJVBltSxZpcSu5BIsGmmQO0ScEWMYha7"},
    //2º semestre
    {titulo: "Análise Matemática II", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/11m77a_avEL6Fw9Sd8FZLkIzCiAmOMa9N"},
    {titulo: "Elementos de Física Geral", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1WFw_P1YJkBaFAw8pjViWhP-yPfCaObul"},
    {titulo: "Engenharia nas Organizações", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/103dCO8Dzijn90B-QeJf-XQRt8ooUeUgx"},
    {titulo: "Laboratório de Programação", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1Ypgk2iImK8H9oxAdc3uJlovLZLF7tABp"},
    {titulo: "Programação Orientada aos Objetos", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1rWIdnK6ONJXO2EVlew2hRfMvUhDCpasT"},
    {titulo: "Sistemas Computacionais", type: "lic", year: "1", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1J3MVOW3UOjxrkt3dxpjxwe89VmHco3gF"},
    //*****2º ano*****//
    //1º semestre
    {titulo: "Compiladores", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1roXUe2EyOERI6iGXf5_y5OgKnHBBFpNE"},
    {titulo: "Engenharia de Software", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1uFP_L7n7fiDXzbrcMUI2B-psgtDsC_Nc"},
    {titulo: "Métodos Estatísticos", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1JWkpUcVx3CiqjXM5tCFAMHtHCHxRPv-6"},
    {titulo: "Programação Funcional", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1w4Lz7TdLY52y5-cpkEaKHCo5utEocBba"},
    {titulo: "Sistemas Operativos", type: "lic", year: "2", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1nk24r0jA-OGdKOonB8DGBHYgPvQFbNi2"},
    //2º semestre
    {titulo: "Algoritmia e estruturas de dados", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1BcroRIQ2JodtwfsGObcrbaF6nZJ611db"},
    {titulo: "Bases de Dados", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1Ff_E0TOXaLhnEU5MeCRe6udM7DYwAmK5"},
    {titulo: "Laboratório de Planeamento de Software", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1jwq5SGZ-5vgLXOtMQgJxs862kS7dcq6w"},
    {titulo: "Métodos Computacionais em Engenharia", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1q1nY4pDtEqDaDBbaFAECa0YeW_Vo0zIF"},
    {titulo: "Programação Multiplataforma", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1coNq6CBHMsFRP1hCqcZY4y_8ucNUBHh0"},
    {titulo: "Redes de Dados I", type: "lic", year: "2", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1nZyZYnLfis8PwoZjgTo9f_gc8PJGAOQe"},
    //*****3º ano*****//
    //1º semestre
    {titulo: "Engenharia Web", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1nsg3GTupw39onD1RcPfVB0Xd5Z5KJEH7"},
    {titulo: "Gestão de Projetos em Engenharia", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1m3UEVb6ErFmtOcQiZXd9fJKMAXKLYnnM"},
    {titulo: "Inteligência Artificial", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/11Vb1FWonqII5IngeLUy5oe6EU4TUrGId"},
    {titulo: "Redes de Dados II", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1sv0YJKgvfEQ27BR-0yf1kTafLzWwZSTK"},
    {titulo: "Sistemas de Informação", type: "lic", year: "3", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1V-P0vLUL3pU1A4mG1cyPF7NWjlpir-D2"},
    //2º semestre
    {titulo: "Introdução à Ciência dos Dados", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1YHIgQMucab8ldZSJI-tMS5riNiDnNhbA"},
    {titulo: "Computação Gráfica", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1JU7prU-iAb7i1bQqAb-5nS9a7ihpHac0"},
    {titulo: "Interação Pessoa Computador", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1mLfmGnGqSY1wodeuFC4_7d1NBRHWfnzv"},
    {titulo: "Laboratório de Projeto", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/10IbToWKseqyWA4HBm9DKGLHKzKAtW1M_"},
    {titulo: "Sistemas Distribuídos", type: "lic", year: "3", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1uNZ4rs_FQLCs2sx6l8N4no8xQrtrnfBd"},
    //*****Mestrado*****//
    //1º semestre
    {titulo: "Administração de Sistemas", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1gBW6NXbh6yyBXmzuat3NqIT_6dTuyKgL"},
    {titulo: "Arquitetura e Padrões de Software", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1oLIYvp4ThovxSyvDRsp_8Fg20sZnxHwz"},
    {titulo: "Crowdsourcing", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/10GAtcmTWJW5-go5WwhJDePuGK8dQBtfg"},
    {titulo: "Investigação Operacional", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1rRhYC3OnpJkXnpTfsRj1Io7S3LZ55L_7"},
    {titulo: "Processamento Digital de Imagem", type: "mes", sem: "1", link: "https://drive.google.com/drive/u/1/folders/1K4voe7ndOvRSr3JiqKCa7-BP6iqglra0"},
    //2º semestre
    {titulo: "Business Intelligence", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1l-jMZOLoCKIvTlpRwwSfioePyiAzfOQW"},
    {titulo: "Desenvolvimento de Aplicações Móveis", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1XP-Mek2rd4t0Wa_y0Iqs0xn4eGnYWlks"},
    {titulo: "Integração de Sistemas", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1K7cIwhY-hW8J8ZDGOvFEV9eWTA64jIvY"},
    {titulo: "LE", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1noKDUNmRknRL5w3lqNTA5IKc4PjnOIKr"},
    {titulo: "Visão por Computador", type: "mes", sem: "2", link: "https://drive.google.com/drive/u/1/folders/1XWMDfRR4hHEx5KK6mDSe__1TW_T8Qt8A"},
];

function displayNotes(filteredNotes = notes) {
    const sem1Container = document.getElementById("sem-1");
    const sem2Container = document.getElementById("sem-2");

    // Clear previous content
    sem1Container.innerHTML = "<h2>1º Semestre</h2>";
    sem2Container.innerHTML = "<h2>2º Semestre</h2>";

    if (filteredNotes.length === 0) {
        sem1Container.innerHTML += "<p style='color: white; text-align: center;'>Nenhum apontamento encontrado.</p>";
        sem2Container.innerHTML += "<p style='color: white; text-align: center;'>Nenhum apontamento encontrado.</p>";
        return;
    }

    filteredNotes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note-card");
        noteElement.innerHTML = `
            <p class="note-text">${note.titulo}</p>
            <a href="${note.link}" target="_blank">
                <button class="btn">Aceder</button>
            </a>
        `;

        if (note.sem === "1") {
            sem1Container.appendChild(noteElement);
        } else {
            sem2Container.appendChild(noteElement);
        }
    });
}

function filterNotes() {
    const type = types[currentTypeIndex];
    const year = years[currentYearIndex];

    let filtered = notes.filter((note) =>
        note.type === type && (type === "mes" || note.year === year)
    );

    displayNotes(filtered);
}



