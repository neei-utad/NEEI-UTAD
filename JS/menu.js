// breakpoint em que o menu passa de hamburger (mobile) para navbar (desktop)
const breakpoints = {
	small: "(max-width: 991.98px)",
	large: "(min-width: 992px)"
};

const themeToggleBtn = document.querySelector('.theme-toggle');

// aplica o texto/ícone do botão de acordo com o tema atual e o breakpoint
function renderThemeButton(theme) {
	const mediaQueryList = window.matchMedia(breakpoints.small);
	if (mediaQueryList.matches) {
		themeToggleBtn.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
	} else {
		const icon = theme === 'dark' ? 'bi-brightness-high-fill' : 'bi-moon-stars-fill';
		themeToggleBtn.innerHTML = `<i id="theme-toggle-icon" class="bi ${icon}"></i>`;
	}
}

// muda entre tema escuro e claro ao clicar no botão
function setTheme() {
	const root = document.documentElement;
	const newTheme = root.className === 'dark' ? 'light' : 'dark';
	root.className = newTheme;
	renderThemeButton(newTheme);
}
themeToggleBtn.addEventListener('click', setTheme);

Object.values(breakpoints).forEach((breakpoint) => {
	const mediaQueryList = window.matchMedia(breakpoint);
	mediaQueryList.addEventListener("change", () => {
		renderThemeButton(document.documentElement.className);
	});
});
renderThemeButton(document.documentElement.className);

// esconde o menu hamburger ao clicar fora dele
function hideMenu() {
	const menu = document.getElementById('menu-toggle');
	if (menu.checked)
		menu.checked = false;
}

const page = document.querySelector('main');
page.addEventListener('click', hideMenu);
