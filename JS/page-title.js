(function () {
  var s = document.createElement("style");
  s.textContent =
    "@keyframes _ptblink{0%,100%{opacity:1}50%{opacity:0}}" +
    ".page-title-cursor{color:#eb5e14;font-weight:700;margin-left:2px;" +
    "font-family:'Space Mono',ui-monospace,monospace;" +
    "animation:_ptblink 1.1s step-end infinite}";
  document.head.appendChild(s);

  var reduceMotion = false;

  function run() {
    var h1 = document.querySelector(".page-head h1");
    if (!h1) return;
    var text = h1.textContent.trim();
    if (!text) return;

    h1.textContent = "";

    var textSpan = document.createElement("span");
    h1.appendChild(textSpan);

    var cursor = document.createElement("span");
    cursor.className = "page-title-cursor";
    cursor.setAttribute("aria-hidden", "true");
    cursor.textContent = "_";
    h1.appendChild(cursor);

    if (reduceMotion) {
      textSpan.textContent = text;
      return;
    }

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
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
