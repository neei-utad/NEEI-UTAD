// atributos start-year e end-year
const CONTACT_EMAIL = "neei@utad.pt";
const DEFAULT_END_YEAR = "2026";

const SOCIAL_LINKS = [
  { label: "Twitch", icon: "bi-twitch", href: "https://www.twitch.tv/neeiutad" },
  { label: "Instagram", icon: "bi-instagram", href: "https://www.instagram.com/neei.utad/" },
  { label: "Facebook", icon: "bi-facebook", href: "https://www.facebook.com/neei.utad" },
  { label: "YouTube", icon: "bi-youtube", href: "https://www.youtube.com/@neeiutad" },
  { label: "LinkedIn", icon: "bi-linkedin", href: "https://www.linkedin.com/company/neei/about/" },
];

const externalLink = (href, content, label = "") =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer"${label ? ` aria-label="${label}"` : ""}>${content}</a>`;

class NeeiFooter extends HTMLElement {
  connectedCallback() {
    const startYear = this.getAttribute("start-year");
    const endYear = this.getAttribute("end-year") || DEFAULT_END_YEAR;
    const yearLabel = startYear ? `${startYear}-${endYear}` : endYear;

    this.innerHTML = `
      <div id="footer-large-top">
        <div id="large-contact-area">
          <p>Contactos:</p>
          <div>
            <a href="mailto:${CONTACT_EMAIL}"><i class="bi bi-envelope-fill" aria-hidden="true"></i>${CONTACT_EMAIL}</a>
          </div>
        </div>
        <div id="credits">
          <p id="large-copyright">&copy;Copyright <b>${yearLabel} NEEI</b>. Todos os Direitos Reservados</p>
          <p id="large-credits-main">Originalmente criado por ${externalLink("https://www.linkedin.com/in/filipe-valadares/", "Filipe Valadares")}</p>
        </div>
        <div id="large-social-area">
          <p>Redes Sociais:</p>
          <div>
            ${SOCIAL_LINKS.map(({ label, icon, href }) => externalLink(href, `<i class="bi ${icon}" aria-hidden="true"></i>`, label)).join("")}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("neei-footer", NeeiFooter);
