(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function typewriterH1() {
    var h1 = document.querySelector(".page-head h1");
    if (!h1) return;
    var text = h1.textContent.trim();
    if (!text) return;

    h1.textContent = "";
    var textSpan = document.createElement("span");
    h1.appendChild(textSpan);

    var cursor = document.createElement("span");
    cursor.className = "page-title-cursor";
    cursor.textContent = "_";
    h1.appendChild(cursor);

    var i = 0;
    function step() {
      if (i < text.length) {
        textSpan.textContent += text.charAt(i++);
        setTimeout(step, 55);
      }
    }
    setTimeout(step, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", typewriterH1);
  } else {
    typewriterH1();
  }
})();
