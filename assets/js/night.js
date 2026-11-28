/* =========================================================================
   JV — modo noche: cielo estrellado + interruptor
   Sin dependencias. Respeta prefers-reduced-motion y pausa con la pestaña oculta.
   ========================================================================= */
(function () {
  "use strict";
  var root = document.documentElement;
  var KEY = "jv-theme";
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------ cielo */
  var cv = document.getElementById("sky");
  var ctx = cv && cv.getContext("2d");
  var W = 0, H = 0, DPR = 1, stars = [], shoots = [], raf = 0, running = false;
  var nextShoot = 0, last = 0, mx = 0, my = 0, tmx = 0, tmy = 0;
  var mobile = Math.min(innerWidth, innerHeight) < 600;

  // Paleta poco saturada: blanco, azul hielo, crema cálida
  var TINTS = [[255, 255, 255], [255, 255, 255], [255, 255, 255], [214, 226, 255], [196, 212, 255], [255, 240, 220]];

  // Sprite de brillo suave (se dibuja una vez y se reutiliza)
  var glow = document.createElement("canvas");
  (function () {
    var s = 64; glow.width = glow.height = s;
    var g = glow.getContext("2d"), r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    r.addColorStop(0, "rgba(255,255,255,1)");
    r.addColorStop(0.12, "rgba(235,242,255,.55)");
    r.addColorStop(0.35, "rgba(200,215,255,.12)");
    r.addColorStop(1, "rgba(200,215,255,0)");
    g.fillStyle = r; g.fillRect(0, 0, s, s);
  })();

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function build() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    cv.style.width = W + "px"; cv.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    stars = [];
    var area = W * H;
    var n = Math.round(area / (mobile ? 2600 : 2100));
    for (var i = 0; i < n; i++) stars.push(makeStar(Math.random() * W, Math.random() * H, false));

    // vía láctea: banda diagonal con polvo de estrellas más fino
    var m = Math.round(n * 0.55);
    for (var k = 0; k < m; k++) {
      var t = Math.random();
      var cx = -0.1 * W + t * 1.2 * W, cy = H * 0.95 - t * H * 0.9;
      var off = (Math.random() + Math.random() + Math.random() - 1.5) * Math.min(W, H) * 0.12;
      stars.push(makeStar(cx + off * 0.55, cy + off, true));
    }
  }

  function makeStar(x, y, dust) {
    var big = !dust && Math.random() < 0.035;
    var r = dust ? rnd(0.2, 0.55) : big ? rnd(1.1, 1.7) : Math.pow(Math.random(), 2.2) * 1.05 + 0.25;
    var tint = TINTS[(Math.random() * TINTS.length) | 0];
    return {
      x: x, y: y, r: r, big: big,
      a: dust ? rnd(0.18, 0.45) : big ? rnd(0.75, 0.95) : rnd(0.35, 0.85),
      tw: rnd(0.25, big ? 0.8 : 1.4),          // velocidad de titileo
      ph: Math.random() * Math.PI * 2,
      amp: dust ? 0.25 : rnd(0.22, 0.55),       // cuánto titila
      d: dust ? 0.3 : 0.4 + r * 0.6,            // profundidad (parallax)
      c: "rgb(" + tint[0] + "," + tint[1] + "," + tint[2] + ")"
    };
  }

  function shoot(now) {
    var fromLeft = Math.random() < 0.5;
    var ang = (fromLeft ? rnd(18, 32) : rnd(148, 162)) * Math.PI / 180;
    shoots.push({
      x: rnd(W * 0.15, W * 0.85), y: rnd(H * 0.04, H * 0.38),
      vx: Math.cos(ang), vy: Math.sin(ang),
      len: rnd(110, 190), sp: rnd(620, 900), t0: now, dur: rnd(0.75, 1.1)
    });
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (mobile && now - last < 31) return;     // ~30 fps en celular
    last = now;
    var t = now / 1000;
    mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var a = s.a * (1 - s.amp + s.amp * (0.5 + 0.5 * Math.sin(t * s.tw + s.ph)));
      var x = s.x + mx * s.d * 8, y = s.y + my * s.d * 6;
      if (s.big) {
        var g = s.r * 9;
        ctx.globalAlpha = a * 0.75;
        ctx.drawImage(glow, x - g, y - g, g * 2, g * 2);
        // destello en cruz muy fino
        ctx.globalAlpha = a * 0.28;
        ctx.fillStyle = s.c;
        ctx.fillRect(x - s.r * 7, y - 0.3, s.r * 14, 0.6);
        ctx.fillRect(x - 0.3, y - s.r * 7, 0.6, s.r * 14);
      }
      ctx.globalAlpha = a;
      ctx.fillStyle = s.c;
      ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.2832); ctx.fill();
    }

    // estrella fugaz discreta
    if (!reduced) {
      if (!nextShoot) nextShoot = t + rnd(4, 8);
      if (t > nextShoot) { shoot(t); nextShoot = t + rnd(9, 17); }
      for (var j = shoots.length - 1; j >= 0; j--) {
        var sh = shoots[j], p = (t - sh.t0) / sh.dur;
        if (p >= 1) { shoots.splice(j, 1); continue; }
        var hx = sh.x + sh.vx * sh.sp * (t - sh.t0), hy = sh.y + sh.vy * sh.sp * (t - sh.t0);
        var tl = sh.len * Math.min(1, p * 3);
        var fade = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8;
        var gr = ctx.createLinearGradient(hx, hy, hx - sh.vx * tl, hy - sh.vy * tl);
        gr.addColorStop(0, "rgba(255,255,255," + (0.85 * fade) + ")");
        gr.addColorStop(1, "rgba(200,215,255,0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = gr; ctx.lineWidth = 1.2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx - sh.vx * tl, hy - sh.vy * tl); ctx.stroke();
        ctx.globalAlpha = 0.6 * fade;
        ctx.drawImage(glow, hx - 6, hy - 6, 12, 12);
      }
    }
    ctx.globalAlpha = 1;
    if (reduced) { cancelAnimationFrame(raf); running = false; }
  }

  function start() {
    if (!ctx || running) return;
    if (!stars.length) build();
    running = true; last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  if (cv) {
    var rt;
    addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        mobile = Math.min(innerWidth, innerHeight) < 600;
        if (root.dataset.theme === "night") { build(); if (reduced) { running = false; start(); } }
        else stars = [];
      }, 200);
    });
    addEventListener("pointermove", function (e) {
      tmx = (e.clientX / innerWidth - 0.5) * -1; tmy = (e.clientY / innerHeight - 0.5) * -1;
    }, { passive: true });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else if (root.dataset.theme === "night") start();
    });
  }

  /* ------------------------------------------------------------ tema */
  var meta = document.querySelector('meta[name="theme-color"]');
  function apply(t) {
    if (t === "night") root.dataset.theme = "night"; else delete root.dataset.theme;
    if (meta) meta.setAttribute("content", t === "night" ? "#070B18" : "#e8e8e4");
    var btns = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", t === "night" ? "true" : "false");
      btns[i].setAttribute("aria-label", t === "night" ? "Cambiar a modo día" : "Cambiar a modo noche");
      btns[i].title = t === "night" ? "Modo día" : "Modo noche";
    }
    if (t === "night") start(); else stop();
  }

  function setTheme(t, x, y) {
    try { localStorage.setItem(KEY, t); } catch (e) {}
    if (!document.startViewTransition || reduced) { apply(t); return; }
    var r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add("theme-vt");
    var vt = document.startViewTransition(function () { apply(t); });
    vt.ready.then(function () {
      root.animate(
        { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + r + "px at " + x + "px " + y + "px)"] },
        { duration: 950, easing: "cubic-bezier(.7,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(function () {});
    vt.finished.then(function () { root.classList.remove("theme-vt"); }, function () { root.classList.remove("theme-vt"); });
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-theme-toggle]");
    if (!b) return;
    var r = b.getBoundingClientRect();
    setTheme(root.dataset.theme === "night" ? "day" : "night", r.left + r.width / 2, r.top + r.height / 2);
  });

  apply(root.dataset.theme === "night" ? "night" : "day");
})();
