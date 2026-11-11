// fade + subida + desfoque em cascata quando os blocos entram no ecrã
(function () {
  if (!("IntersectionObserver" in window) || !Element.prototype.animate) return;

  var TARGETS = [
    "main h1", "main h2", "main h3", "main p", "main li", "main img", "main figure",
    "main article", "main table", "main blockquote", "main .card", "main .btn",
    "main [data-reveal]",
  ].join(",");

  // zonas que já têm coreografia própria
  var SKIP = "#hero-section, #gallery-section, #hub-app, #apontamentos-list, #search-results, " +
    ".filter-row, .page-texture, [data-reveal-skip]";

  var EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  var STEP = 70;

  function collect() {
    var seen = [];
    document.querySelectorAll(TARGETS).forEach(function (el) {
      if (el.closest(SKIP)) return;
      // só o bloco de fora anima: um <li> dentro de um <article> já revelado não repete
      for (var p = el.parentElement; p && p.tagName !== "MAIN"; p = p.parentElement) {
        if (p._revealPending !== undefined) return;
      }
      el._revealPending = true;
      seen.push(el);
    });
    return seen;
  }

  function init() {
    var elements = collect();
    if (!elements.length) return;

    elements.forEach(function (el) {
      el.style.opacity = "0";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        var batch = entries.filter(function (e) { return e.isIntersecting; });
        batch.sort(function (a, b) {
          return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left;
        });
        batch.forEach(function (entry, i) {
          var el = entry.target;
          observer.unobserve(el);
          el.style.opacity = "";
          el.animate(
            [
              { opacity: 0, transform: "translateY(26px) scale(0.985)", filter: "blur(6px)" },
              { opacity: 1, transform: "none", filter: "blur(0)" },
            ],
            { duration: 820, delay: Math.min(i, 8) * STEP, easing: EASE, fill: "backwards" }
          );
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
