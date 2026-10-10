// Componente reutilizável do rodapé desktop (#footer-large).
// Uso: <neei-footer id="footer-large"></neei-footer>
// Atributos opcionais: start-year="2023" end-year="2024" (por defeito end-year="2026")
class NeeiFooter extends HTMLElement {
  connectedCallback() {
    const startYear = this.getAttribute("start-year");
    const endYear = this.getAttribute("end-year") || "2026";
    const yearLabel = startYear ? `${startYear}-${endYear}` : endYear;

    this.innerHTML = `
      <div id="footer-large-top">
        <div id="large-contact-area">
          <p>Contactos:</p>
          <div>
            <a href="https://www.twitch.tv/neeiutad" target="_blank">
              <i class="bi bi-envelope-fill"></i>neei@utad.pt
            </a>
          </div>
        </div>
        <div id="credits">
          <p id="large-copyright">&copy;Copyright <b>${yearLabel} NEEI</b>. Todos os Direitos Reservados</p>
          <p id="large-credits-main">Originalmente criado por <a href="https://www.linkedin.com/in/filipe-valadares/" target="_blank">Filipe Valadares</a></p>
        </div>
        <div id="large-social-area">
          <p>Redes Sociais:</p>
          <div>
            <a href="https://www.twitch.tv/neeiutad" target="_blank"><i class="bi bi-twitch"></i></a>
            <a href="https://www.instagram.com/neei.utad/" target="_blank"><i class="bi bi-instagram"></i></a>
            <a href="https://www.facebook.com/neei.utad" target="_blank"><i class="bi bi-facebook"></i></a>
            <a href="https://www.youtube.com/@neeiutad" target="_blank"><i class="bi bi-youtube"></i></a>
            <a href="https://www.linkedin.com/company/neei/about/" target="_blank"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("neei-footer", NeeiFooter);
