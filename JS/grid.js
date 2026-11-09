(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var CELL = 32;
  var DRIFT_MS = 10000; // one full tile in 10 s
  var PULSE_MS = 7000;  // orange ↔ white cycle in 7 s

  function initGrid(texture) {
    if (texture._gridDone) return;
    texture._gridDone = true;

    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;display:block;";
    texture.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = texture.getBoundingClientRect();
      canvas.width  = Math.round(rect.width  * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }
    resize();

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(resize).observe(texture);
    } else {
      window.addEventListener("resize", resize, { passive: true });
    }

    var start = performance.now();

    function draw(now) {
      var elapsed = now - start;
      var w = canvas.width;
      var h = canvas.height;
      if (!w || !h) { requestAnimationFrame(draw); return; }

      var cell = CELL * dpr;

      // diagonal drift — seamless because shift = one full cell
      var drift = ((elapsed % DRIFT_MS) / DRIFT_MS) * cell;

      // color: orange (235,94,20) ↔ white (255,255,255)
      var t = (Math.sin((elapsed / PULSE_MS) * Math.PI * 2) + 1) / 2;
      var r = Math.round(235 + (255 - 235) * t);
      var g = Math.round(94  + (255 - 94)  * t);
      var b = Math.round(20  + (255 - 20)  * t);
      // alpha: 0.08 at orange min, 0.28 at white max
      var a = 0.08 + t * 0.20;

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
      ctx.lineWidth = dpr;
      ctx.beginPath();

      // vertical lines (shift right)
      for (var x = drift % cell - cell; x < w + cell; x += cell) {
        var xr = Math.round(x) + 0.5;
        ctx.moveTo(xr, 0);
        ctx.lineTo(xr, h);
      }
      // horizontal lines (shift down)
      for (var y = drift % cell - cell; y < h + cell; y += cell) {
        var yr = Math.round(y) + 0.5;
        ctx.moveTo(0, yr);
        ctx.lineTo(w, yr);
      }
      ctx.stroke();

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  function initAll() {
    document.querySelectorAll(".page-texture").forEach(initGrid);
  }

  // existing elements
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  // React / dynamic pages — watch for .page-texture added later
  if (typeof MutationObserver !== "undefined") {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains("page-texture")) {
            initGrid(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll(".page-texture").forEach(initGrid);
          }
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
