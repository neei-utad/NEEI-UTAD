// Código necessário para o funcionamento do carrossel.
AOS.init();
setTimeout(() => {
	AOS.refresh();
}, 100);

//carousel - glide.js
var carousel = document.querySelector(".glide");
if (carousel != null) {
	var glide = new Glide(".glide, .tile", {
		type: "carousel",
		startAt: 0,
		gap: 25,
		autoplay: 5000,
		animationDuration: 1000,
		hoverpause: true,
		focusAt: "center",
	});
	glide.mount();
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.menu-box');
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

/* typewriter effect */
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("type-title");
  const pathEl = document.getElementById("type-path");
  const commandEl = document.getElementById("type-command");
  const cursor = document.querySelector(".terminal-cursor");

  if (!titleEl || !pathEl || !commandEl || !cursor) return;

  const titleText = "Núcleo de Estudantes de Engenharia";
  const pathText = "~/neei > ";
  const commandText = "informática";

  const typingSpeed = 55;
  let i = 0;
  let j = 0;

  titleEl.parentNode.appendChild(cursor);

  function typeTitle() {
    if (i < titleText.length) {
      titleEl.textContent += titleText.charAt(i);
      i++;
      setTimeout(typeTitle, typingSpeed);
    } else {
      setTimeout(() => {
        pathEl.textContent = pathText;
        commandEl.parentNode.appendChild(cursor);
        typeCommand();
      }, 350);
    }
  }

  function typeCommand() {
    if (j < commandText.length) {
      commandEl.textContent += commandText.charAt(j);
      j++;
      setTimeout(typeCommand, typingSpeed + 25);
    } else {
      commandEl.classList.add("fade-active");
      cursor.classList.add("fade-active");
    }
  }

  setTimeout(typeTitle, 400);
});