// grelha técnica em canvas: quase invisível em repouso, acende e deforma-se à volta do ponteiro
(function () {
  var DRIFT_MS = 10000; // uma célula completa em 10 s
  var PULSE_MS = 7000;  // respiração da cor
  var WAVE_MS = 5200;   // onda diagonal que acende os nós
  var RADIUS = 230;     // alcance do foco, em px css
  var BULGE = 16;       // quanto as linhas se afastam do ponteiro
  var SEGMENT = 10;     // resolução das linhas curvas
  var IDLE_FRAME_MS = 30; // em repouso a grelha só deriva devagar: ~30 fps chegam

  // um só ponteiro para todas as grelhas da página
  var pointer = { x: -9999, y: -9999, active: false };
  window.addEventListener("pointermove", function (e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  }, { passive: true });
  ["pointerup", "pointercancel"].forEach(function (type) {
    window.addEventListener(type, function (e) {
      if (e.pointerType !== "mouse") pointer.active = false;
    }, { passive: true });
  });
  document.documentElement.addEventListener("pointerleave", function () { pointer.active = false; });

  function number(el, key, fallback) {
    var raw = parseFloat(el.getAttribute(key));
    return isFinite(raw) ? raw : fallback;
  }

  function initGrid(host) {
    if (host._gridDone) return;
    host._gridDone = true;

    var cellCss = number(host, "data-grid-cell", 32);
    var alphaMin = number(host, "data-grid-alpha", 0.004);
    var alphaMax = number(host, "data-grid-alpha-max", 0.06);
    var nodeEvery = number(host, "data-grid-nodes", 0);

    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:block;";
    host.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = host.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }
    resize();

    if (typeof ResizeObserver !== "undefined") new ResizeObserver(resize).observe(host);
    else window.addEventListener("resize", resize, { passive: true });

    var start = performance.now();
    var frame = null;
    var inView = true;
    var lastDraw = 0;
    var spot = { x: 0, y: 0, power: 0, seeded: false };

    // empurra um ponto para fora do centro do foco; zero na orla para as linhas colarem
    function bend(x, y, cx, cy, radius, strength) {
      var dx = x - cx;
      var dy = y - cy;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d >= radius || d < 0.001) return [x, y];
      var t = 1 - d / radius;
      var push = strength * t * t * (d / radius) * 4;
      return [x + (dx / d) * push, y + (dy / d) * push];
    }

    function traceBent(offset, cell, cx, cy, radius, strength) {
      var seg = SEGMENT * dpr;
      var x, y, p;
      var x0 = cx - radius, x1 = cx + radius, y0 = cy - radius, y1 = cy + radius;

      ctx.beginPath();
      for (x = offset + Math.ceil((x0 - offset) / cell) * cell; x <= x1; x += cell) {
        for (y = y0; y <= y1 + seg; y += seg) {
          p = bend(x, y, cx, cy, radius, strength);
          if (y === y0) ctx.moveTo(p[0], p[1]);
          else ctx.lineTo(p[0], p[1]);
        }
      }
      for (y = offset + Math.ceil((y0 - offset) / cell) * cell; y <= y1; y += cell) {
        for (x = x0; x <= x1 + seg; x += seg) {
          p = bend(x, y, cx, cy, radius, strength);
          if (x === x0) ctx.moveTo(p[0], p[1]);
          else ctx.lineTo(p[0], p[1]);
        }
      }
    }

    function draw(now) {
      frame = null;

      if (spot.power === 0 && now - lastDraw < IDLE_FRAME_MS) return schedule();
      lastDraw = now;

      var w = canvas.width;
      var h = canvas.height;
      if (!w || !h) return schedule();

      var elapsed = now - start;
      var cell = cellCss * dpr;
      var drift = ((elapsed % DRIFT_MS) / DRIFT_MS) * cell;
      var offset = (drift % cell) - cell;

      var t = (Math.sin((elapsed / PULSE_MS) * Math.PI * 2) + 1) / 2;
      // sempre laranja: a grelha respira entre visível e quase desaparecida, nunca fica branca
      var base = "rgba(235,94,20," + (alphaMin + t * (alphaMax - alphaMin)).toFixed(4) + ")";

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = dpr;
      ctx.strokeStyle = base;
      ctx.beginPath();

      var x, y;
      for (x = offset; x < w + cell; x += cell) {
        var xr = Math.round(x) + 0.5;
        ctx.moveTo(xr, 0);
        ctx.lineTo(xr, h);
      }
      for (y = offset; y < h + cell; y += cell) {
        var yr = Math.round(y) + 0.5;
        ctx.moveTo(0, yr);
        ctx.lineTo(w, yr);
      }
      ctx.stroke();

      if (nodeEvery >= 1) {
        var step = cell * nodeEvery;
        var span = w + h || 1;
        var wavePos = ((elapsed % WAVE_MS) / WAVE_MS) * span * 1.6 - span * 0.3;
        var reach = span * 0.14;
        var nodeOffset = (drift % step) - step;

        for (x = nodeOffset; x < w + step; x += step) {
          for (y = nodeOffset; y < h + step; y += step) {
            var distance = Math.abs(x + y - wavePos);
            if (distance > reach) continue;
            var heat = 1 - distance / reach;
            ctx.fillStyle = "rgba(235,94,20," + (heat * heat * 0.28).toFixed(3) + ")";
            ctx.beginPath();
            ctx.arc(Math.round(x), Math.round(y), dpr * 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // foco do ponteiro: segue com atraso suave e apaga-se quando o rato sai
      var rect = host.getBoundingClientRect();
      var tx = (pointer.x - rect.left) * dpr;
      var ty = (pointer.y - rect.top) * dpr;
      var radius = RADIUS * dpr;
      var over = pointer.active && tx > -radius && tx < w + radius && ty > -radius && ty < h + radius;

      if (over && !spot.seeded) {
        spot.x = tx;
        spot.y = ty;
        spot.seeded = true;
      }
      spot.x += (tx - spot.x) * 0.16;
      spot.y += (ty - spot.y) * 0.16;
      spot.power += ((over ? 1 : 0) - spot.power) * 0.09;
      if (!over && spot.power < 0.01) {
        spot.power = 0;
        spot.seeded = false;
      }

      // mais abaixo na grelha = menos foco e menos curvatura, até zero no fundo
      var depth = Math.min(1, Math.max(0, (spot.y / h - 0.15) / 0.6));
      var fade = spot.power * (1 - depth * depth * (3 - 2 * depth));

      if (fade > 0.01) {
        var strength = BULGE * dpr * fade;

        ctx.save();
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.clearRect(spot.x - radius, spot.y - radius, radius * 2, radius * 2);

        traceBent(offset, cell, spot.x, spot.y, radius, strength);
        ctx.strokeStyle = base;
        ctx.stroke();

        var glow = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, radius);
        glow.addColorStop(0, "rgba(235,94,20," + (0.34 * fade).toFixed(3) + ")");
        glow.addColorStop(0.45, "rgba(235,94,20," + (0.15 * fade).toFixed(3) + ")");
        glow.addColorStop(1, "rgba(235,94,20,0)");
        ctx.strokeStyle = glow;
        ctx.stroke();

        // sombra de luz suave por baixo das linhas
        var halo = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, radius);
        halo.addColorStop(0, "rgba(235,94,20," + (0.045 * fade).toFixed(3) + ")");
        halo.addColorStop(1, "rgba(235,94,20,0)");
        ctx.fillStyle = halo;
        ctx.fillRect(spot.x - radius, spot.y - radius, radius * 2, radius * 2);
        ctx.restore();
      }

      schedule();
    }

    function schedule() {
      if (frame || !inView || document.hidden) return;
      frame = requestAnimationFrame(draw);
    }

    function stop() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = null;
    }

    if (typeof IntersectionObserver !== "undefined") {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) schedule();
        else stop();
      }).observe(host);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else schedule();
    });

    schedule();
  }

  var SELECTOR = ".page-texture, [data-grid]";

  function initAll(root) {
    (root || document).querySelectorAll(SELECTOR).forEach(initGrid);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { initAll(); });
  else initAll();

  // páginas React montam a textura depois
  if (typeof MutationObserver !== "undefined") {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches(SELECTOR)) initGrid(node);
          if (node.querySelectorAll) initAll(node);
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
