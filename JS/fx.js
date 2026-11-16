// inclinação 3D + reflexo a seguir o rato para os cartões das páginas estáticas
(function () {
  var CARDS = ".link-ref, .guia-link-card, .partner, [data-fx]";
  var HAS_HOVER = window.matchMedia("(hover: hover)").matches;

  function enhance(card) {
    if (card._fx) return;
    card._fx = true;
    card.classList.add("fx-card", "tilt-surface");

    var glare = document.createElement("span");
    glare.className = "fx-glare";
    glare.setAttribute("aria-hidden", "true");
    card.appendChild(glare);

    if (!HAS_HOVER) return;

    var frame = null;
    var last = null;

    function apply() {
      frame = null;
      var rect = card.getBoundingClientRect();
      var x = last.clientX - rect.left;
      var y = last.clientY - rect.top;
      card.style.setProperty("--mx", x + "px");
      card.style.setProperty("--my", y + "px");
      card.style.setProperty("--tx", ((x / rect.width) * 2 - 1).toFixed(3));
      card.style.setProperty("--ty", ((y / rect.height) * 2 - 1).toFixed(3));
    }

    card.addEventListener("pointermove", function (event) {
      last = event;
      card.classList.add("is-tilting");
      if (!frame) frame = requestAnimationFrame(apply);
    });

    card.addEventListener("pointerleave", function () {
      card.classList.remove("is-tilting");
      card.style.setProperty("--tx", "0");
      card.style.setProperty("--ty", "0");
    });
  }

  function init() {
    document.querySelectorAll(CARDS).forEach(function (card) {
      // cartões muito largos inclinam menos para não parecerem a cair
      if (card.offsetWidth > 520) card.style.setProperty("--tilt-max", "2.5deg");
      enhance(card);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
