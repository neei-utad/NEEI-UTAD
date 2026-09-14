//? Dá para passar a escolha de temas entre páginas?
//? Sim. Essa funcionalidade não está ativa porque necessitamos de cookies e não queremos usar
//? cookies no site do NEEI.

// Função encarregue de mudar o tema.
function setTheme() {
	const root = document.documentElement;
	const themeBtn = document.querySelector('.theme-toggle');
	const themeBtnIcon = document.getElementById('theme-toggle-icon');
	const newTheme = root.className === 'dark' ? 'light' : 'dark';
	root.className = newTheme;
	const breakpoints = {
		small: "(max-width: 991.98px)",
		large: "(min-width: 992px)"
	};

	Object.values(breakpoints).forEach((breakpoint) => {
		const mediaQueryList = window.matchMedia(breakpoint);
	if (mediaQueryList.matches) {
		if (mediaQueryList.media === breakpoints.small) {
			if (newTheme == 'light') {
				themeBtn.textContent = 'Modo Escuro'
				themeBtnIcon.classList.remove('bi-brightness-high-fill');
				themeBtnIcon.classList.add('bi-moon-stars-fill');
			}
			else {
				themeBtn.textContent = 'Modo Claro'
				themeBtnIcon.classList.remove('bi-moon-stars-fill');
				themeBtnIcon.classList.add('bi-brightness-high-fill');
			}
		}
		else if (mediaQueryList.media === breakpoints.large) {
			if (newTheme == 'dark')
				themeBtn.innerHTML = '<button class="theme-toggle"><i id="theme-toggle-icon" class="bi bi-brightness-high-fill"></i></button>';
			else
				themeBtn.innerHTML = '<button class="theme-toggle"><i id="theme-toggle-icon" class="bi bi-moon-stars-fill"></i></button>';
		}
	}
});
}
document.querySelector('.theme-toggle').addEventListener('click', setTheme);

// Função encarregue de alterar o botão do tema escuro/claro, para apenas o ícone no breakpoint adequado.
const breakpoints = {
	small: "(max-width: 991.98px)",
	large: "(min-width: 992px)"
};
const themeBtn = document.querySelector('.theme-toggle');
const notificationsBtn = document.querySelector('.notifications');

const handleBreakpointChange = (mediaQueryList) => {
	const theme = document.documentElement.className === 'dark' ? 'light' : 'dark';
	if (mediaQueryList.matches) {
		if (mediaQueryList.media === breakpoints.small) {
			if (theme == 'light')
				themeBtn.textContent = 'Modo Claro';
			else
				themeBtn.textContent = 'Modo Escuro';
		}
		else if (mediaQueryList.media === breakpoints.large) {
			if (theme == 'light')
				themeBtn.innerHTML = '<button class="theme-toggle"><i id="theme-toggle-icon" class="bi bi-brightness-high-fill"></i></button>';
			else
				themeBtn.innerHTML = '<button class="theme-toggle"><i id="theme-toggle-icon" class="bi bi-moon-stars-fill"></i></button>';
		}
	}
};

Object.values(breakpoints).forEach((breakpoint) => {
	const mediaQueryList = window.matchMedia(breakpoint);
	mediaQueryList.addEventListener("change", (event) => {
		handleBreakpointChange(event.target);
	});
	handleBreakpointChange(mediaQueryList);
});

// Função encarregue de esconder o menu hamburger ao clicar noutro sítio.
function hideMenu() {
	const menu = document.getElementById('menu-toggle');
	if (menu.checked)
		menu.checked = false;
}

const page = document.querySelector('main');
page.addEventListener('click', hideMenu)