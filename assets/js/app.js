/* =========================================================================
   JV — THE CREATIVE DECK · motor de interacción
   Vanilla JS, sin dependencias. CSS 3D + Web Animations API.
   ========================================================================= */
(() => {
  "use strict";

  const SITE = window.JV_SITE;
  const ABOUT = window.JV_ABOUT;
  const DECK = window.JV_DECK.filter((c) => c.published);
  const N = DECK.length;

  /* ------------------------------------------------------------ utils */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad2 = (n) => String(n).padStart(2, "0");
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const mqReduce = matchMedia("(prefers-reduced-motion: reduce)");
  const mqHover = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = () => mqReduce.matches;
  const isMobile = () => innerWidth <= 640;
  const nextFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* ------------------------------------------------------------ refs */
  const body = document.body;
  const home = $("#home");
  const stage = $("#stage");
  const deckEl = $("#deck");
  const introEl = $("#intro");
  const heroEl = $(".hero");
  const kinetic = $(".kinetic");
  const detail = $("#detail");
  const dScroll = $("#detail-scroll");
  const dContent = $("#detail-content");
  const lb = $("#lightbox");
  const indexEl = $("#index");

  /* ------------------------------------------------------------ estado */
  const S = {
    pos: 0, target: 0,          // posición continua del carrusel (en cartas)
    rise: 1, spread: 1, leave: 0,
    selected: -1, hover: -1,
    dragging: false,
    ready: false, busy: false,
    open: -1                     // índice abierto en detalle
  };

  const mod = (i) => ((i % N) + N) % N;
  const wrapOffset = (i, pos) => {
    let o = mod(i - pos);
    if (o > N / 2) o -= N;
    return o;
  };
  const activeIndex = () => mod(Math.round(S.pos));

  /* ================================================================
     TIPOGRAFÍA CINÉTICA
     ================================================================ */
  $$(".kinetic__layer").forEach((layer) => {
    const base = layer.classList.contains("kinetic__layer--solid") ? 0 : layer.classList.contains("kinetic__layer--o1") ? 110 : 200;
    layer.innerHTML = [...layer.dataset.word]
      .map((ch, i) => `<span class="ch" style="transition-delay:${base + i * 45}ms"><span class="wv">${ch}</span></span>`)
      .join("");
  });

  if (mqHover.matches && !reduced()) {
    addEventListener("pointermove", (e) => {
      if (S.open >= 0) return;
      const mx = e.clientX / innerWidth - 0.5;
      const my = e.clientY / innerHeight - 0.5;
      kinetic.style.setProperty("--px1", `calc(0.035em + ${mx * 14}px)`);
      kinetic.style.setProperty("--py1", `calc(-0.035em + ${my * 10}px)`);
      kinetic.style.setProperty("--px2", `calc(0.07em + ${mx * 28}px)`);
      kinetic.style.setProperty("--py2", `calc(-0.07em + ${my * 20}px)`);
    }, { passive: true });
  }

  /* ================================================================
     ONDA TIPOGRÁFICA (título PORTFOLIO + nombre)
     ================================================================ */
  const waveLayers = {
    solid: $$(".kinetic__layer--solid .wv"),
    o1: $$(".kinetic__layer--o1 .wv"),
    o2: $$(".kinetic__layer--o2 .wv")
  };
  let waveOn = false, waveRaf = 0;
  // Solo PORTFOLIO: cada letra da una vuelta completa (360°) sobre su eje, en cascada
  const SPIN_PERIOD = 4.2, SPIN_DUR = 1.25, SPIN_STAGGER = 0.09;
  const easeIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  function spinAngle(t, i, lag) {
    const local = (t - i * SPIN_STAGGER - lag) % SPIN_PERIOD;
    const p = Math.max(0, Math.min(1, (local < 0 ? local + SPIN_PERIOD : local) / SPIN_DUR));
    return easeIO(p) * 360;
  }
  function wave(now) {
    const t = now / 1000;
    const L = waveLayers.solid.length;
    for (let i = 0; i < L; i++) {
      waveLayers.solid[i].style.transform = `perspective(600px) rotateX(${spinAngle(t, i, 0).toFixed(1)}deg)`;
      waveLayers.o1[i].style.transform = `perspective(600px) rotateX(${spinAngle(t, i, 0.12).toFixed(1)}deg)`;
      waveLayers.o2[i].style.transform = `perspective(600px) rotateX(${spinAngle(t, i, 0.24).toFixed(1)}deg)`;
    }
    waveRaf = waveOn ? requestAnimationFrame(wave) : 0;
  }
  function waveSync() {
    const want = !reduced() && !document.hidden && S.open < 0 && indexEl.hidden && scrollY < innerHeight;
    if (want && !waveOn) { waveOn = true; waveRaf = requestAnimationFrame(wave); }
    else if (!want) waveOn = false;
  }
  setInterval(waveSync, 400);
  addEventListener("scroll", waveSync, { passive: true });

  /* ================================================================
     CARTAS
     ================================================================ */
  function mediaAttrs(c, which = "card") {
    const k = c.card || {};
    const hero = which === "hero";
    const src = hero ? k.hero || k.src : k.src;
    const fit = (hero && k.heroFit) || k.fit || "cover";
    const pos = (hero && k.heroPos) || k.pos || "50% 50%";
    return {
      src, fit,
      blend: k.blend ? ' data-blend="1"' : "",
      style: `--mbg:${(hero && k.heroBg) || k.bg || c.color};--fit:${fit};--pos:${pos}`
    };
  }

  function frontHTML(c) {
    const t = (c.card && c.card.template) || "type";
    const top = `<div class="cf__top"><span class="cf__num">Nº ${esc(c.number)}</span><span>${esc(c.year || "")}</span></div>`;
    const bot = `<div class="cf__bot"><span>${esc(c.category)}</span><span>JV®</span></div>`;
    const ticks = `<i class="cf__tick cf__tick--a"></i><i class="cf__tick cf__tick--b"></i>`;

    if (t === "frame" || t === "full") {
      const m = mediaAttrs(c);
      const media = `<div class="cf__media" data-fit="${m.fit}"${m.blend} style="${m.style}"><img src="${esc(m.src)}" alt="" draggable="false" decoding="async"></div>`;
      if (t === "frame") {
        return `<div class="cf cf--frame">${ticks}${top}${media}<span class="cf__title">${esc(c.title)}</span>${bot}</div>`;
      }
      return `<div class="cf cf--full">${media}${top}<div class="cf__foot"><span class="cf__title">${esc(c.title)}</span>${bot}</div></div>`;
    }

    if (t === "pending") {
      return `<div class="cf cf--frame cf--pending">${ticks}${top}
        <div class="cf__media"><span class="stamp">ASSETS<br>EN PREPARACIÓN</span></div>
        <span class="cf__title">${esc(c.title)}</span>${bot}</div>`;
    }

    // tipográficas
    if (c.kind === "about") {
      return `<div class="cf cf--about">
        <img class="cf__photo" src="${esc(c.card.src)}" alt="" draggable="false" decoding="async">
        <span class="cf__aboutbar"></span>
        <div class="cf__top"><span class="cf__num">Nº ${esc(c.number)}</span><span>${esc(c.category)}</span></div>
        <div class="cf__aboutfoot">
          <span class="cf__title">THE<br><span class="o">CREATOR</span></span>
          <div class="cf__bot"><span>JHON VALENCIA SANTANA</span><span>JV®</span></div>
        </div>
      </div>`;
    }
    if (c.kind === "contact") {
      return `<div class="cf cf--type">${ticks}
        <div class="cf__top"><span class="cf__num">Nº ${esc(c.number)}</span><span>${esc(c.category)}</span></div>
        <span class="cf__big">LET'S<br><span class="o">CRE</span><br>ATE</span>
        <div><span class="cf__arrow">↗</span><div class="cf__bot"><span>SAY HELLO</span><span>JV®</span></div></div>
      </div>`;
    }
    if (c.kind === "archive") {
      const covers = (c.behance || []).filter((p) => p.cover).slice(0, 4);
      const mosaic = covers.length
        ? `<div class="cf__mosaic cf__mosaic--${covers.length}">${covers.map((p) => `<img src="${esc(p.cover)}" alt="" draggable="false" decoding="async" referrerpolicy="no-referrer" onerror="this.style.visibility='hidden'">`).join("")}</div>`
        : `<ul class="cf__disc" aria-hidden="true"><li><span>01</span>Campañas</li><li><span>02</span>Identidad</li><li><span>03</span>Editorial</li><li><span>04</span>Publicidad</li><li><span>05</span>Ilustración</li></ul>`;
      return `<div class="cf cf--be">
        <div class="cf__top"><span class="cf__num">Nº ${esc(c.number)}</span><span>${esc(c.year)}</span></div>
        ${mosaic}
        <div class="cf__befoot">
          <span class="cf__bename">Behance<i>↗</i></span>
          <span class="cf__besub">DISEÑO GRÁFICO${(c.behance || []).length ? ` · ${pad2(c.behance.length)} PROYECTOS` : ""}</span>
          <div class="cf__bot"><span>BEHANCE.NET/JHXNVALE</span><span>JV®</span></div>
        </div>
      </div>`;
    }
    return `<div class="cf cf--type">${top}<span class="cf__title">${esc(c.title)}</span>${bot}</div>`;
  }

  const backHTML = (c) =>
    `<span class="back__num">${esc(c.number)}</span><span class="back__ring"></span><span class="back__bar"></span>
     <span class="back__logo">JV<sup>®</sup></span><span class="back__txt">THE CREATIVE DECK</span>`;

  const slots = DECK.map((c, i) => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.i = i;
    slot.innerHTML = `
      <div class="float" style="--fd:${(-i * 0.53).toFixed(2)}s">
        <div class="card is-down" role="button" tabindex="-1"
             aria-label="${esc(`Carta ${c.number}: ${c.title} — ${c.category}`)}">
          <div class="card__inner">
            <div class="face face--front front" style="--c:${c.color};--ink:${c.ink}">${frontHTML(c)}</div>
            <div class="face face--back back">${backHTML(c)}</div>
          </div>
        </div>
      </div>`;
    stage.appendChild(slot);
    return slot;
  });
  const cards = slots.map((s) => $(".card", s));
  $("#count-total").textContent = pad2(N);

  /* ------------------------------------------------------------ layout del abanico */
  function layout() {
    const m = isMobile();
    const step = m ? 15 : 10.5;
    const vis = m ? 1.25 : 3.25;
    const H = innerHeight;
    const maxRot = 55 + S.leave * 45;

    for (let i = 0; i < N; i++) {
      const o = wrapOffset(i, S.pos);
      const ao = Math.abs(o);
      const away = i !== S.selected;
      const ang = clamp(o * step * S.spread * (1 + (away ? S.leave * 1.3 : 0)), -maxRot, maxRot);
      let y = -Math.max(0, 1 - ao) * 16;
      y += (1 - S.rise) * (H * 0.85 + ao * 50);
      if (away) y += S.leave * H * 0.18;
      const ry = -o * 7 * S.spread;
      let op = ao <= vis ? 1 : Math.max(0, 1 - (ao - vis) / 0.6);
      if (away) op *= 1 - S.leave;

      const s = slots[i];
      s.style.transform = `translate3d(0,${y.toFixed(2)}px,${(-ao * 34).toFixed(1)}px) rotate(${ang.toFixed(3)}deg) rotateY(${ry.toFixed(2)}deg)`;
      s.style.opacity = op.toFixed(3);
      s.style.zIndex = S.hover === i ? 300 : 100 - Math.round(ao * 10);
      s.style.visibility = op < 0.01 || i === S.selected ? "hidden" : "visible";
      s.style.pointerEvents = op < 0.4 ? "none" : "";
      cards[i].style.setProperty("--a", `${ang.toFixed(2)}deg`);
    }
  }

  let lastActive = -1;
  function syncActive() {
    const a = activeIndex();
    if (a === lastActive) return;
    lastActive = a;
    slots.forEach((s, i) => s.classList.toggle("is-active", i === a));
    cards.forEach((c, i) => c.setAttribute("tabindex", i === a ? "0" : "-1"));
    const c = DECK[a];
    $("#count-cur").textContent = pad2(a + 1);
    $("#deck-now").textContent = `Nº ${c.number} — ${c.title} — ${c.category}`;
  }

  /* ------------------------------------------------------------ bucle de animación */
  const tweens = new Set();
  const settleWaiters = [];
  let raf = 0, last = 0;

  function tween(key, to, dur, ease = easeOut) {
    return new Promise((resolve) => {
      for (const t of tweens) if (t.key === key) { tweens.delete(t); t.resolve(); }
      if (reduced() || dur <= 0) { S[key] = to; kick(); return resolve(); }
      tweens.add({ key, from: S[key], to, dur, ease, t0: performance.now(), resolve });
      kick();
    });
  }

  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;

    const auto = autoOn();
    if (auto) {
      // la baraja se mece alrededor de THE CREATOR, que queda siempre al centro
      const home = S.target + wrapOffset(HOME_I, S.target);
      const base = Math.round(home);
      S.target = base + Math.sin(now / 1000 * 0.75) * 0.4;
    }
    if (!S.dragging) {
      const k = reduced() ? 1 : 1 - Math.exp(-dt * 11);
      S.pos += (S.target - S.pos) * k;
      if (Math.abs(S.target - S.pos) < 0.0006) S.pos = S.target;
    }
    for (const t of tweens) {
      const p = clamp((now - t.t0) / t.dur, 0, 1);
      S[t.key] = t.from + (t.to - t.from) * t.ease(p);
      if (p >= 1) { tweens.delete(t); t.resolve(); }
    }
    layout();
    syncActive();

    if (Math.abs(S.target - S.pos) < 0.01 && !S.dragging) {
      while (settleWaiters.length) settleWaiters.shift()();
    }

    if (tweens.size || S.dragging || S.pos !== S.target || auto) raf = requestAnimationFrame(tick);
    else raf = 0;
  }
  /* giro automático de la rueda (se pausa al interactuar) */
  const HOME_I = Math.max(0, DECK.findIndex((c) => c.kind === "about"));
  let lastTouch = -1e9;
  const touch = () => { lastTouch = performance.now(); if (Math.abs(S.target - Math.round(S.target)) > 0.001 && !S.dragging) S.target = Math.round(S.target); };
  function autoOn() {
    return S.ready && !reduced() && !S.dragging && !S.busy && S.open < 0 && S.hover < 0 &&
      indexEl.hidden && !document.hidden && scrollY < innerHeight * 0.5 &&
      performance.now() - lastTouch > 6000;
  }
  setInterval(() => { if (autoOn()) kick(); }, 1000);

  function kick() {
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
  }
  const waitSettle = () =>
    new Promise((r) => {
      if (Math.abs(S.target - S.pos) < 0.01) return r();
      settleWaiters.push(r);
      setTimeout(r, 1200);
    });

  function goTo(i) {
    touch();
    S.target += wrapOffset(i, S.target);
    kick();
  }
  function step(d) {
    touch();
    S.target = Math.round(S.target) + d;
    kick();
  }

  /* ------------------------------------------------------------ hover + tilt */
  if (mqHover.matches) {
    slots.forEach((slot, i) => {
      slot.addEventListener("pointerenter", () => {
        if (!S.ready || S.dragging || S.busy) return;
        S.hover = i; slot.classList.add("is-hover"); touch(); layout();
      });
      slot.addEventListener("pointermove", (e) => {
        if (S.hover !== i) return;
        const r = slot.getBoundingClientRect();
        const nx = clamp((e.clientX - r.left) / r.width - 0.5, -0.5, 0.5);
        const ny = clamp((e.clientY - r.top) / r.height - 0.5, -0.5, 0.5);
        cards[i].style.setProperty("--tx", `${(nx * 16).toFixed(2)}deg`);
        cards[i].style.setProperty("--ty", `${(-ny * 16).toFixed(2)}deg`);
      });
      slot.addEventListener("pointerleave", () => {
        slot.classList.remove("is-hover");
        cards[i].style.setProperty("--tx", "0deg");
        cards[i].style.setProperty("--ty", "0deg");
        if (S.hover === i) { S.hover = -1; layout(); }
      });
    });
  }
  function clearHover() {
    slots.forEach((s) => s.classList.remove("is-hover"));
    S.hover = -1;
  }

  /* ------------------------------------------------------------ arrastre / swipe / tap */
  let drag = null;
  stage.addEventListener("pointerdown", (e) => {
    if (!S.ready || S.busy || e.button > 0) return;
    lastTouch = performance.now();
    const slot = e.target.closest(".slot");
    drag = {
      id: e.pointerId, x0: e.clientX, y0: e.clientY, pos0: S.pos,
      lx: e.clientX, lt: performance.now(), v: 0, moved: false,
      slot: slot ? +slot.dataset.i : -1
    };
  });
  addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x0;
    const dy = e.clientY - drag.y0;
    if (!drag.moved) {
      if (Math.abs(dx) < 7 || Math.abs(dx) < Math.abs(dy)) return;
      drag.moved = true;
      S.dragging = true;
      clearHover();
      stage.classList.add("is-dragging");
      try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    }
    const px = stage.querySelector(".slot").offsetWidth * (isMobile() ? 0.85 : 0.72);
    S.pos = drag.pos0 - dx / px;
    const now = performance.now();
    const dtt = Math.max(1, now - drag.lt);
    drag.v = 0.8 * drag.v + 0.2 * (-(e.clientX - drag.lx) / px / (dtt / 1000));
    drag.lx = e.clientX; drag.lt = now;
    S.target = S.pos;
    kick();
  });
  const endDrag = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag; drag = null;
    if (d.moved) {
      S.dragging = false;
      stage.classList.remove("is-dragging");
      const fling = clamp(d.v * 0.22, -3, 3);
      S.target = Math.round(S.pos + fling);
      kick();
    } else if (e.type === "pointerup" && d.slot >= 0) {
      onCardTap(d.slot);
    }
  };
  addEventListener("pointerup", endDrag);
  addEventListener("pointercancel", endDrag);

  function onCardTap(i) {
    if (i === activeIndex() && Math.abs(S.pos - S.target) < 0.3) openCard(i);
    else goTo(i);
  }

  /* ------------------------------------------------------------ rueda */
  let wAcc = 0, wLast = 0;
  stage.addEventListener("wheel", (e) => {
    if (S.open >= 0 || !S.ready || !lb.hidden) return;
    e.preventDefault();
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    wAcc += d;
    const now = performance.now();
    if (Math.abs(wAcc) > 40 && now - wLast > 160) {
      step(Math.sign(wAcc));
      wAcc = 0; wLast = now;
    }
  }, { passive: false });

  /* ------------------------------------------------------------ botones */
  $("#prev").addEventListener("click", () => S.ready && step(-1));
  $("#next").addEventListener("click", () => S.ready && step(1));

  /* ================================================================
     TRANSICIÓN CARTA ⇄ PROYECTO
     ================================================================ */
  function makeFlyer(i, rect, plain = false) {
    const c = DECK[i];
    const m = mediaAttrs(c, plain || !(c.card && c.card.flyFromCard) ? "hero" : "card");
    if (!plain) m.src = c.card && c.card.src;
    const f = document.createElement("div");
    f.className = plain ? "flyer flyer--plain" : "flyer";
    f.style.cssText = `left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;border-radius:14px;--card-w:${rect.width}px`;
    const mediaInner = m.src ? `<img src="${esc(m.src)}" alt="">` : "";
    const mbg = m.src ? (c.card && c.card.bg) || c.color : c.color;
    f.innerHTML = `
      <div class="flyer__rot">
        <div class="face face--front front" style="--c:${c.color};--ink:${c.ink}">${frontHTML(c)}</div>
        <div class="face face--back back">${backHTML(c)}</div>
        <div class="flyer__media" data-fit="${m.fit}"${m.blend} style="${m.style};--mbg:${mbg}">${mediaInner}</div>
      </div>`;
    document.body.appendChild(f);
    return f;
  }

  const px = (r) => ({ left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });

  async function openCard(i, { animate = true, from = null, origin = null } = {}) {
    if (S.busy || S.open >= 0) return;
    const c = DECK[i];
    if (!origin) origin = from ? "grid" : (!indexEl.hidden ? "index" : (scrollY > innerHeight * 0.5 ? "grid" : "deck"));
    S.origin = origin;
    if (origin !== "deck") return openFromEl(i, from || findPc(c.id), animate);
    const doAnim = animate && !reduced() && S.ready;

    if (doAnim && (activeIndex() !== i || Math.abs(S.pos - S.target) > 0.02)) {
      goTo(i);
      await waitSettle();
    }
    S.busy = true;
    setHash(c.id);
    renderDetail(i);

    if (!doAnim) {
      S.selected = i; S.leave = 1; layout();
      showDetail(i);
      S.busy = false;
      return;
    }

    clearHover();
    const rect = cards[i].getBoundingClientRect();
    const flyer = makeFlyer(i, rect);
    S.selected = i;
    layout();
    tween("leave", 1, 700, easeInOut);

    const vw = innerWidth, vh = innerHeight;
    const cw = rect.width * 1.16, ch = rect.height * 1.16;
    const mid = { left: (vw - cw) / 2, top: (vh - ch) / 2, width: cw, height: ch };
    const up = { left: rect.left, top: rect.top - 50, width: rect.width, height: rect.height };
    const D = 1100;

    const a1 = flyer.animate([
      { ...px(rect), borderRadius: "14px", offset: 0, easing: "cubic-bezier(.3,0,.2,1)" },
      { ...px(up), borderRadius: "14px", offset: 0.16, easing: "cubic-bezier(.65,0,.25,1)" },
      { ...px(mid), borderRadius: "14px", offset: 0.55, easing: "cubic-bezier(.75,0,.15,1)" },
      { left: "0px", top: "0px", width: `${vw}px`, height: `${vh}px`, borderRadius: "0px", offset: 1 }
    ], { duration: D, fill: "forwards" });
    $(".flyer__rot", flyer).animate([
      { transform: "rotateY(0deg)", offset: 0 },
      { transform: "rotateY(0deg)", offset: 0.16, easing: "cubic-bezier(.6,0,.3,1)" },
      { transform: "rotateY(360deg)", offset: 0.55 },
      { transform: "rotateY(360deg)", offset: 1 }
    ], { duration: D, fill: "forwards" });
    $(".flyer__media", flyer).animate([
      { opacity: 0, offset: 0 }, { opacity: 0, offset: 0.52 }, { opacity: 1, offset: 0.68 }, { opacity: 1, offset: 1 }
    ], { duration: D, fill: "forwards" });

    await a1.finished.catch(() => {});
    showDetail(i);
    await nextFrame();
    flyer.remove();
    S.busy = false;
    syncRoute();
  }

  function showDetail(i) {
    S.open = i;
    detail.hidden = false;
    dScroll.scrollTop = 0;
    home.style.visibility = "hidden";
    home.setAttribute("aria-hidden", "true");
    body.classList.add("is-detail");
    requestAnimationFrame(() => {
      detail.classList.add("is-in");
      observeReveals();
      $("#back").focus({ preventScroll: true });
    });
  }

  async function closeDetail({ animate = true } = {}) {
    if (S.busy || S.open < 0) return;
    if (S.origin && S.origin !== "deck") return closeToEl(animate);
    const i = S.open;
    S.busy = true;
    closeLightbox();

    // la baraja vuelve a quedar centrada en la carta abierta
    S.target += wrapOffset(i, S.target);
    S.pos = S.target;
    S.selected = i; S.leave = 1;
    home.style.visibility = "";
    home.removeAttribute("aria-hidden");
    layout(); syncActive();

    const doAnim = animate && !reduced();
    if (!doAnim) {
      hideDetail();
      S.leave = 0; S.selected = -1; layout();
      S.busy = false;
      cards[i].focus({ preventScroll: true });
      syncRoute();
      return;
    }

    detail.classList.remove("is-in");
    dContent.classList.add("is-swapping");
    await wait(260);

    // destino: posición de la carta en la baraja recompuesta
    S.leave = 0; layout();
    const r = cards[i].getBoundingClientRect();
    S.leave = 1; layout();

    const vw = innerWidth, vh = innerHeight;
    const flyer = makeFlyer(i, { left: 0, top: 0, width: vw, height: vh });
    flyer.style.borderRadius = "0px";
    $(".flyer__media", flyer).style.opacity = 1;
    hideDetail();
    dContent.classList.remove("is-swapping");

    const cw = r.width * 1.16, ch = r.height * 1.16;
    const mid = { left: (vw - cw) / 2, top: (vh - ch) / 2, width: cw, height: ch };
    const D = 1000;
    const a1 = flyer.animate([
      { left: "0px", top: "0px", width: `${vw}px`, height: `${vh}px`, borderRadius: "0px", offset: 0, easing: "cubic-bezier(.7,0,.25,1)" },
      { ...px(mid), borderRadius: "14px", offset: 0.42, easing: "cubic-bezier(.5,0,.2,1)" },
      { ...px(r), borderRadius: "14px", offset: 1 }
    ], { duration: D, fill: "forwards" });
    $(".flyer__rot", flyer).animate([
      { transform: "rotateY(360deg)", offset: 0 },
      { transform: "rotateY(360deg)", offset: 0.42, easing: "cubic-bezier(.55,0,.3,1)" },
      { transform: "rotateY(0deg)", offset: 0.9 },
      { transform: "rotateY(0deg)", offset: 1 }
    ], { duration: D, fill: "forwards" });
    $(".flyer__media", flyer).animate([
      { opacity: 1, offset: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0, offset: 0.46 }, { opacity: 0, offset: 1 }
    ], { duration: D, fill: "forwards" });
    setTimeout(() => tween("leave", 0, 750, easeInOut), 260);

    await a1.finished.catch(() => {});
    S.selected = -1;
    layout();
    await nextFrame();
    flyer.remove();
    S.busy = false;
    cards[i].focus({ preventScroll: true });
    syncRoute();
  }

  /* ---- transición desde/hacia una tarjeta editorial (home o índice) */
  function findPc(id) {
    const root = !indexEl.hidden ? indexEl : home;
    const el = root.querySelector(`.pc[data-open="${id}"]:not(.is-out) .pc__media`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight && r.width > 0 ? el : null;
  }

  async function openFromEl(i, el, animate) {
    const c = DECK[i];
    S.busy = true;
    setHash(c.id);
    renderDetail(i);
    if (!animate || reduced() || !el) {
      showDetail(i);
      S.busy = false;
      return;
    }
    const r = el.getBoundingClientRect();
    const flyer = makeFlyer(i, r, true);
    flyer.style.borderRadius = "4px";
    $(".flyer__media", flyer).style.opacity = 1;
    const a = flyer.animate([
      { ...px(r), borderRadius: "4px" },
      { left: "0px", top: "0px", width: `${innerWidth}px`, height: `${innerHeight}px`, borderRadius: "0px" }
    ], { duration: 850, easing: "cubic-bezier(.75,0,.2,1)", fill: "forwards" });
    await a.finished.catch(() => {});
    showDetail(i);
    await nextFrame();
    flyer.remove();
    S.busy = false;
    syncRoute();
  }

  async function closeToEl(animate) {
    const i = S.open;
    S.busy = true;
    closeLightbox();
    home.style.visibility = "";
    home.removeAttribute("aria-hidden");
    const back = !indexEl.hidden ? "#/projects" : "#/";
    const el = findPc(DECK[i].id);
    if (!animate || reduced() || !el) {
      hideDetail();
      S.busy = false; S.origin = null;
      setHash(back, true);
      syncRoute();
      return;
    }
    detail.classList.remove("is-in");
    dContent.classList.add("is-swapping");
    await wait(240);
    const vw = innerWidth, vh = innerHeight;
    const flyer = makeFlyer(i, { left: 0, top: 0, width: vw, height: vh }, true);
    flyer.style.borderRadius = "0px";
    $(".flyer__media", flyer).style.opacity = 1;
    hideDetail();
    dContent.classList.remove("is-swapping");
    const r = el.getBoundingClientRect();
    const a = flyer.animate([
      { left: "0px", top: "0px", width: `${vw}px`, height: `${vh}px`, borderRadius: "0px" },
      { ...px(r), borderRadius: "4px" }
    ], { duration: 800, easing: "cubic-bezier(.7,0,.25,1)", fill: "forwards" });
    await a.finished.catch(() => {});
    flyer.remove();
    S.busy = false; S.origin = null;
    setHash(back, true);
    syncRoute();
  }

  function hideDetail() {
    detail.hidden = true;
    detail.classList.remove("is-in");
    body.classList.remove("is-detail");
    S.open = -1;
    document.title = indexEl.hidden ? "Jhon Valencia Santana — Creative Strategy & Digital Innovation" : "Projects — Jhon Valencia Santana";
  }

  async function swapDetail(j) {
    if (S.busy) return;
    S.busy = true;
    j = mod(j);
    setHash(DECK[j].id);
    detail.classList.remove("is-in");
    dContent.classList.add("is-swapping");
    await wait(reduced() ? 0 : 320);
    renderDetail(j);
    S.open = j;
    dScroll.scrollTop = 0;
    detail.classList.remove("is-scrolled");
    dContent.classList.remove("is-swapping");
    await nextFrame();
    detail.classList.add("is-in");
    observeReveals();
    S.busy = false;
    syncRoute();
  }

  /* ================================================================
     DETALLE — plantillas editoriales
     ================================================================ */
  const words = (t) => esc(t).split(" ").map((w) => `<span class="w"><span>${w}</span></span>`).join(" ");
  const sec = (n, label, inner, extra = "") =>
    `<section class="sec ${extra}"><div class="sec__grid rv"><p class="sec__label"><b>${pad2(n)}</b>${label}</p><div class="sec__body">${inner}</div></div></section>`;
  const bigLink = (label, url, sub = "") =>
    `<a class="biglink" href="${esc(url)}" ${url.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'}><span>${esc(label)}${sub ? `<small>${esc(sub)}</small>` : ""}</span><span aria-hidden="true">↗</span></a>`;

  function heroImage(c) {
    const k = c.card;
    const m = mediaAttrs(c, "hero");
    return `<section class="p-hero" data-fit="${m.fit}" style="${m.style}${k.heroInk ? `;--hink:${k.heroInk}` : ""}">
      <div class="p-hero__media" data-fit="${m.fit}"${m.blend} ${m.fit === "cover" ? `style="background-image:url('${esc(k.src)}')"` : ""}>
        <img src="${esc(m.src)}" alt="${esc(c.title)} — portada" fetchpriority="high" decoding="async">
      </div>
      <div class="p-hero__shade"></div>
      <div class="p-hero__cap">
        <div>${c.lead ? `<p class="p-hero__concept">${esc(c.lead)}</p>` : ""}<h2 class="p-hero__title" id="detail-title">${words(c.title)}</h2></div>
        <div class="p-hero__tag"><span class="p-hero__num">${esc(c.number)}</span><span>${esc(c.category)}</span><span>${esc(c.year)}</span></div>
      </div>
    </section>`;
  }

  function heroType(c, l1, l2, extra = "") {
    return `<section class="p-hero p-hero--type ${extra}" style="--c:${c.color};--ink:${c.ink};--mbg:${c.color}">
      <span class="p-hero__redbar"></span>
      <h2 class="p-hero__giant" id="detail-title" aria-label="${esc(c.title)}">
        <span class="ln"><span>${l1}</span></span><span class="ln"><span class="o">${l2}</span></span>
      </h2>
      <div class="p-hero__cap">
        <span class="mono" style="font-size:12px;letter-spacing:.08em">${esc(SITE.studio)}</span>
        <div class="p-hero__tag"><span class="p-hero__num">${esc(c.number)}</span><span>${esc(c.category)}</span><span>${esc(c.year)}</span></div>
      </div>
    </section>`;
  }

  function gallery(c) {
    if (!c.gallery || !c.gallery.length) return "";
    const items = c.gallery
      .map((g, k) => `<figure class="g g--${g.span || "half"} reveal">
          <img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" decoding="async" width="${g.w}" height="${g.h}" style="aspect-ratio:${g.w}/${g.h}" data-lb>
          <figcaption>${pad2(k + 1)} — ${esc(g.alt)}</figcaption></figure>`)
      .join("");
    return `<section class="sec"><div class="sec__grid rv" style="margin-bottom:28px"><p class="sec__label"><b>05</b>VISUAL GALLERY</p><div class="sec__body"><p class="prose" style="margin:0">${c.gallery.length} pieza${c.gallery.length > 1 ? "s" : ""} · clic para ampliar</p></div></div><div class="gallery">${items}</div></section>`;
  }

  function nextBlock(i) {
    const n = DECK[mod(i + 1)];
    return `<button class="next" data-next style="--nc:${n.color};--nink:${n.ink}">
      <span><span class="next__label">NEXT CARD — Nº ${esc(n.number)}</span><span class="next__title">${esc(n.title)}</span></span>
      <span class="next__arrow" aria-hidden="true">→</span></button>`;
  }

  const footer = () => `<footer class="foot">
      <span>© ${new Date().getFullYear()} ${esc(SITE.name)} — JV® THE CREATIVE DECK</span>
      <span><a href="${esc(SITE.links.behance)}" target="_blank" rel="noopener">BEHANCE</a> ·
      <a href="${esc(SITE.links.linkedin)}" target="_blank" rel="noopener">LINKEDIN</a> ·
      <a href="mailto:${esc(SITE.email)}">${esc(SITE.email.toUpperCase())}</a></span></footer>`;

  function renderProject(c, i) {
    const facts = `<dl class="facts">
        <div><dt>CATEGORY</dt><dd>${esc(c.category)}</dd></div>
        <div><dt>YEAR</dt><dd>${esc(c.year)}</dd></div>
        <div><dt>COLLECTION</dt><dd>Nº ${esc(c.number)} / ${pad2(N)}</dd></div></dl>`;
    const role = `<div class="two">
        <div><h3>MY ROLE</h3><ul class="list">${(c.role || []).map((r, k) => `<li><span>${pad2(k + 1)}</span>${esc(r)}</li>`).join("")}</ul></div>
        <div><h3>PROCESS & DELIVERABLES</h3><div class="chips">${(c.deliverables || []).map((d) => `<span class="chip">${esc(d)}</span>`).join("")}</div></div></div>`;
    const links = c.links && c.links.length
      ? sec(6, "EXTERNAL LINKS", `<div class="links">${c.links.map((l) => bigLink(l.label, l.url, l.sub || "")).join("")}</div>`)
      : "";
    return heroImage(c) +
      sec(1, "OVERVIEW", `<p class="lead">${esc(c.lead)}</p>${facts}`) +
      sec(2, "PROJECT CONTEXT", `<p class="prose">${esc(c.context)}</p>`) +
      sec(3, "CREATIVE CONCEPT", `<p class="prose">${esc(c.concept)}</p>`) +
      sec(4, "MY ROLE", role) +
      gallery(c) + links + nextBlock(i) + footer();
  }


  const lum = (hex) => { const n = parseInt(hex.replace("#", ""), 16); const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };

  /* ---- caso narrativo (layout: "story") */
  function figs(items, startK) {
    return `<div class="gallery">${items.map((g, k) => `<figure class="g g--${g.span || "half"} reveal">
        <img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" decoding="async" width="${g.w}" height="${g.h}" style="aspect-ratio:${g.w}/${g.h}" data-lb>
        <figcaption>${esc(g.alt)}</figcaption></figure>`).join("")}</div>`;
  }
  const chipsHTML = (arr) => arr && arr.length ? `<div class="chips" style="margin-top:22px">${arr.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>` : "";

  function storyBlock(b, n) {
    const head = `<div class="sec__grid rv"><p class="sec__label"><b>${pad2(n)}</b>${esc(b.label)}</p>
      <div class="sec__body">${b.title ? `<h3 class="st-title">${esc(b.title)}</h3>` : ""}${b.body ? `<p class="prose">${esc(b.body)}</p>` : ""}${chipsHTML(b.chips)}</div></div>`;
    const cls = `sec st st--${b.type}${b.band ? ` band band--${b.band}` : ""}`;
    let extra = "";
    if (b.type === "duo") {
      extra = `<div class="duo">${b.cast.map((p, k) => `<figure class="duo__p rv">
          <div class="duo__img"><img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy" data-lb></div>
          <figcaption><span class="duo__name">${esc(p.name)}</span><span class="duo__role">${esc(p.role)}</span></figcaption></figure>`).join(`<span class="duo__amp" aria-hidden="true">&amp;</span>`)}</div>`;
    } else if (b.type === "identity") {
      const pal = b.palette && b.palette.length;
      extra = `<div class="ident${pal ? "" : " ident--solo"} rv">
          <figure class="ident__logo${b.image.contain ? " is-contain" : ""}" style="aspect-ratio:${b.image.w}/${b.image.h};margin:0;border-radius:8px;overflow:hidden;cursor:zoom-in"><img src="${esc(b.image.src)}" alt="${esc(b.image.alt)}" loading="lazy" style="width:100%;height:100%" data-lb></figure>
          ${pal ? "" : "<!--"}<div class="ident__pal">${(b.palette || []).map(([nm, hex]) => `<div class="sw" style="--sw:${hex};color:${lum(hex) < 0.45 ? "#fff" : "#151515"}"><span>${esc(nm)}</span><code>${esc(hex)}</code></div>`).join("")}</div>${pal ? "" : "-->"}</div>`;
    } else if (b.type === "steps") {
      extra = `<ol class="steps rv" style="--n:${b.steps.length}">${b.steps.map(([t, d], k) => `<li><span class="steps__n">${pad2(k + 1)}</span><strong>${esc(t)}</strong><p>${esc(d)}</p></li>`).join("")}</ol>`;
    } else if (b.type === "formats") {
      extra = b.groups.map((g) => {
        const row = g.cols === 3
          ? `<div class="fmt__row">${g.items.map((it) => `<figure class="fmt__it" style="flex:${(it.w / it.h).toFixed(3)} 1 0"><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" style="aspect-ratio:${it.w}/${it.h}" data-lb><figcaption>${esc(it.alt)}</figcaption></figure>`).join("")}</div>`
          : `<div class="fmt__grid">${g.items.map((it) => `<figure class="fmt__it"><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" style="aspect-ratio:${it.w}/${it.h}" data-lb><figcaption>${esc(it.alt)}</figcaption></figure>`).join("")}</div>`;
        return `<div class="fmt rv"><div class="fmt__head"><strong>${esc(g.name)}</strong><span class="mono">${esc(g.spec)}</span><span class="mono fmt__count">${pad2(g.items.length)} PIEZAS</span></div>${row}</div>`;
      }).join("");
    } else if (b.type === "deck") {
      extra = `<div class="slides rv"><p class="slides__spec mono">${esc(b.spec)}</p><div class="slides__grid">${b.items.map((it, k) =>
        `<figure class="slide${k === 0 ? " slide--lead" : ""}"><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" decoding="async" width="${it.w}" height="${it.h}" data-lb><span class="slide__n mono">${pad2(k + 1)}</span></figure>`).join("")}</div></div>`;
    } else if (b.type === "cards") {
      const cc = b.colors ? b.colors.map(([bg, fg], k) => `--k${k}:${bg};--f${k}:${fg}`).join(";") : "";
      extra = `<ol class="cards rv${b.colors ? " cards--custom" : ""}" style="${cc}">${b.cards.map(([t, d], k) => `<li><span class="mono">${pad2(k + 1)}</span><strong>${esc(t)}</strong><p>${esc(d)}</p></li>`).join("")}</ol>`;
    } else if (b.type === "covers") {
      const row = b.items.map((g) => `<figure class="cv" style="aspect-ratio:${g.w}/${g.h}"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" data-lb></figure>`).join("");
      extra = `<div class="marquee rv" aria-label="Portadas"><div class="marquee__track">${row}<div class="marquee__dup" aria-hidden="true">${row.replace(/ data-lb/g, "")}</div></div></div>`;
    } else if (b.type === "video") {
      extra = `<div class="yt rv">
          <video class="vid" controls playsinline preload="none" poster="${esc(b.poster)}" style="aspect-ratio:${b.w}/${b.h}">
            <source src="${esc(b.src)}" type="video/mp4">
            Tu navegador no reproduce video. <a href="${esc(b.src)}">Descárgalo aquí</a>.
          </video>
        </div>`;
    } else if (b.type === "youtube" && b.direct) {
      extra = `<div class="yt rv">
          <iframe class="yt__frame" src="https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(b.list)}&rel=0" title="Episodios de A 36 Cuotas en YouTube" loading="eager" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <a class="yt__link" href="${esc(b.url)}" target="_blank" rel="noopener"><span>Ver el canal ${esc(b.handle)} en YouTube</span><span aria-hidden="true">↗</span></a>
        </div>`;
    } else if (b.type === "youtube") {
      extra = `<div class="yt rv">
          <button class="yt__facade" data-yt="${esc(b.list)}" aria-label="Reproducir episodios de A 36 Cuotas en YouTube">
            <img src="${esc(b.poster)}" alt="" loading="lazy">
            <span class="yt__play" aria-hidden="true"><svg viewBox="0 0 68 48"><path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#D71920"/><path d="M45 24 27 14v20z" fill="#fff"/></svg></span>
            <span class="yt__label mono">VER EPISODIOS · ${esc(b.handle)}</span>
          </button>
          <a class="yt__link" href="${esc(b.url)}" target="_blank" rel="noopener"><span>Abrir el canal en YouTube</span><span aria-hidden="true">↗</span></a>
        </div>`;
    } else if (b.type === "web" && b.direct) {
      extra = `<div class="browser browser--live rv">
          <div class="browser__bar"><i></i><i></i><i></i><a class="browser__url mono" href="${esc(b.url)}" target="_blank" rel="noopener">🔒 ${esc(b.domain)}</a><a class="browser__go mono" href="${esc(b.url)}" target="_blank" rel="noopener">ABRIR EN PESTAÑA ↗</a></div>
          <div class="browser__view"><iframe class="browser__frame" src="${esc(b.url)}" title="${esc(b.domain)}" loading="lazy"></iframe></div>
        </div>`;
    } else if (b.type === "web") {
      extra = `<div class="browser rv">
          <div class="browser__bar"><i></i><i></i><i></i><a class="browser__url mono" href="${esc(b.url)}" target="_blank" rel="noopener">🔒 ${esc(b.domain)}</a><a class="browser__go mono" href="${esc(b.url)}" target="_blank" rel="noopener">ABRIR ↗</a></div>
          <div class="browser__view" data-site="${esc(b.url)}">
            <div class="browser__cover">
              <img src="${esc(b.preview)}" alt="" loading="lazy">
              <div class="browser__actions">
                <button class="browser__btn" data-load-site>VER EL SITIO AQUÍ</button>
                <a class="browser__btn browser__btn--ghost" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.domain)} ↗</a>
              </div>
            </div>
          </div></div>`;
    } else if (b.type === "figures") {
      extra = `<div style="height:clamp(24px,3vw,40px)"></div>${figs(b.items)}`;
    }
    return `<section class="${cls}">${head}${extra}</section>`;
  }

  function renderStory(c, i) {
    const facts = `<dl class="facts facts--4">${(c.facts || []).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
    let n = 1;
    const blocks = c.story.map((b) => storyBlock(b, ++n)).join("");
    const links = c.links && c.links.length
      ? sec(++n, "ENLACES", `<div class="links">${c.links.map((l) => bigLink(l.label, l.url, l.sub || "")).join("")}</div>`)
      : "";
    return heroImage(c) +
      sec(1, "OVERVIEW", `<p class="lead">${esc(c.lead)}</p>${facts}`) +
      blocks + links + nextBlock(i) + footer();
  }

  function renderAbout(c, i) {
    const tl = ABOUT.timeline.map(([t, a, b]) => `<li><time>${esc(t)}</time><div><strong>${esc(a)}</strong>${b ? `<span>${esc(b)}</span>` : ""}</div></li>`).join("");
    const hero = `<section class="p-hero p-hero--about" style="--c:${c.color};--ink:${c.ink};--mbg:${c.color}">
      <figure class="ab__photo"><img src="${esc(c.photo)}" alt="Retrato de Jhon Valencia Santana" fetchpriority="high"></figure>
      <span class="p-hero__redbar"></span>
      <div class="ab__text">
        <p class="p-hero__concept">${esc(SITE.title)}</p>
        <h2 class="p-hero__giant" id="detail-title" aria-label="The Creator"><span class="ln"><span>THE</span></span><span class="ln"><span class="o">CREATOR</span></span></h2>
        <p class="ab__name">Jhon Valencia Santana</p>
        <div class="ab__ctas">
          <a class="ab__btn ab__btn--be" href="${esc(SITE.links.behance)}" target="_blank" rel="noopener"><b>Bē</b> Ver portafolio en Behance <span aria-hidden="true">↗</span></a>
          <a class="ab__btn" href="${esc(SITE.links.linkedin)}" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div class="p-hero__cap"><span class="mono" style="font-size:12px;letter-spacing:.08em">BOGOTÁ, COLOMBIA</span>
        <div class="p-hero__tag"><span class="p-hero__num">${esc(c.number)}</span><span>${esc(c.category)}</span><span>${esc(c.year)}</span></div></div>
    </section>`;
    const behance = `<section class="sec band band--be">
      <div class="sec__grid rv"><p class="sec__label"><b>02</b>CREATIVE ARCHIVE</p>
        <div class="sec__body"><h3 class="st-title">Más de quince años de trabajo creativo, en Behance.</h3>
        <p class="prose">Campañas, piezas publicitarias y diseño gráfico de mi trayectoria en agencias y proyectos propios.</p></div></div>
      <a class="be-big rv" href="${esc(SITE.links.behance)}" target="_blank" rel="noopener">
        <span class="be-big__label mono">BEHANCE.NET/JHXNVALE</span>
        <span class="be-big__word">BEHANCE <i aria-hidden="true">↗</i></span>
        <span class="be-big__sub mono">ABRIR PORTAFOLIO COMPLETO</span>
      </a>
    </section>`;
    return hero +
      sec(1, "PROFESSIONAL PROFILE", `<p class="mono" style="font-size:12px;letter-spacing:.1em;margin:0 0 16px">${esc(SITE.title)}</p><p class="lead">${esc(ABOUT.lead)}</p><div style="height:28px"></div>${ABOUT.bio.map((p) => `<p class="prose">${esc(p)}</p>`).join("")}
        <dl class="facts"><div><dt>BASE</dt><dd>Bogotá, Colombia</dd></div><div><dt>EXPERIENCE</dt><dd>15+ años</dd></div><div><dt>FOCUS</dt><dd>Marca · Producto · Innovación</dd></div></dl>`) +
      behance +
      sec(3, "EXPERIENCE", `<ul class="tl">${tl}</ul>`) +
      sec(4, "EDUCATION & CERTS", `<ul class="list">${ABOUT.education.map((e, k) => `<li><span>${pad2(k + 1)}</span>${esc(e)}</li>`).join("")}</ul>`) +
      sec(5, "CAPABILITIES", `<div class="chips">${(SITE.expertise || ABOUT.skills).map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>`) +
      sec(6, "CREATIVE PHILOSOPHY", `<p class="lead">${esc(SITE.headline)}</p><div style="height:24px"></div><p class="prose">${esc(SITE.description)}</p>`) +
      sec(7, "ELSEWHERE", `<div class="links">${bigLink("Behance", SITE.links.behance, "Archivo creativo")}${bigLink("LinkedIn", SITE.links.linkedin, "Trayectoria")}${bigLink("GitHub", SITE.links.github, "Código")}</div>`) +
      nextBlock(i) + footer();
  }

  function renderContact(c, i) {
    return heroType(c, "LET'S", "CREATE") +
      sec(1, "CONTACT", `<p class="lead">Proyectos, alianzas o una buena idea: <em>escríbeme.</em></p>`) +
      sec(2, "CHANNELS", `<div class="links">
        ${bigLink(SITE.email, `mailto:${SITE.email}`, "Email")}
        ${bigLink("LinkedIn", SITE.links.linkedin, "/in/jhonvalenciasantana")}
        ${bigLink("Behance", SITE.links.behance, "/jhxnvale")}
        ${bigLink("GitHub", SITE.links.github, "/jhonvalencia86")}</div>`) +
      sec(3, "LOCATION", `<p class="lead">Bogotá, Colombia.<br>GMT−5.</p>`) +
      nextBlock(i) + footer();
  }

  function renderArchive(c, i) {
    const list = c.behance || [];
    const embeds = list.length
      ? `<section class="sec"><div class="sec__grid rv"><p class="sec__label"><b>02</b>PROYECTOS EN BEHANCE</p>
          <div class="sec__body"><h3 class="st-title">Directo desde Behance.</h3><p class="prose">${pad2(list.length)} proyectos de diseño gráfico, campañas y publicidad, con el visor oficial de Behance. Recórrelos aquí mismo o ábrelos en Behance.</p></div></div>
          <div class="be-grid">${list.map((p) => `<figure class="be-item rv">
            <div class="be-item__frame"><iframe src="https://www.behance.net/embed/project/${encodeURIComponent(p.id)}?ilo0=1" title="${esc(p.title || "Proyecto en Behance")}" loading="lazy" allowfullscreen allow="clipboard-write" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
            <figcaption><a href="https://www.behance.net/gallery/${encodeURIComponent(p.id)}" target="_blank" rel="noopener">${esc(p.title || "Ver en Behance")} ↗</a></figcaption></figure>`).join("")}</div></section>`
      : "";
    const big = `<section class="sec band band--be">
      <div class="sec__grid rv"><p class="sec__label"><b>${list.length ? "03" : "02"}</b>ARCHIVO COMPLETO</p>
        <div class="sec__body"><h3 class="st-title">Todo el archivo, en Behance.</h3></div></div>
      <a class="be-big rv" href="${esc(SITE.links.behance)}" target="_blank" rel="noopener">
        <span class="be-big__label mono">BEHANCE.NET/JHXNVALE</span>
        <span class="be-big__word">BEHANCE <i aria-hidden="true">↗</i></span>
        <span class="be-big__sub mono">DISEÑO GRÁFICO · PUBLICIDAD</span>
      </a></section>`;
    return heroType(c, "BEHANCE", "GRÁFICO", "p-hero--be") +
      sec(1, "OVERVIEW", `<p class="lead">${esc(c.lead)}</p><div style="height:24px"></div><p class="prose">${esc(c.context)}</p>`) +
      embeds + big + nextBlock(i) + footer();
  }

  function renderPending(c, i) {
    return heroType(c, "AGRO", "GESTOR", "p-hero--pending") +
      sec(1, "STATUS", `<p class="lead">${esc(c.lead)}</p><div style="height:24px"></div><p class="prose">${esc(c.context)}</p>
        <p class="note">PLACEHOLDER TEMPORAL — material original pendiente de recuperar o autorizar.</p>`) +
      nextBlock(i) + footer();
  }

  function renderDetail(i) {
    const c = DECK[i];
    detail.style.setProperty("--acc", c.accent || "#E44832");
    detail.classList.toggle("theme-dark", c.theme === "dark");
    if (c.paper) detail.style.setProperty("--dbg", c.paper); else detail.style.removeProperty("--dbg");
    const r = c.layout === "story" ? renderStory : { about: renderAbout, contact: renderContact, archive: renderArchive, pending: renderPending }[c.kind] || renderProject;
    dContent.innerHTML = r(c, i);
    lazyDetail();
    $("#d-count").textContent = `${pad2(i + 1)} / ${pad2(N)}`;
    document.title = `${c.title} — JV · The Creative Deck`;
  }

  dContent.addEventListener("click", (e) => {
    if (e.target.closest("[data-next]")) return swapDetail(S.open + 1);
    const yt = e.target.closest("[data-yt]");
    if (yt) {
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(yt.dataset.yt)}&autoplay=1&rel=0`;
      f.title = "Episodios de A 36 Cuotas en YouTube";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      f.allowFullscreen = true;
      f.className = "yt__frame";
      yt.replaceWith(f);
      return;
    }
    const site = e.target.closest("[data-load-site]");
    if (site) {
      const view = site.closest("[data-site]");
      const f = document.createElement("iframe");
      f.src = view.dataset.site;
      f.title = "Sitio web treintaseiscuotas.com";
      f.loading = "lazy";
      f.className = "browser__frame";
      view.innerHTML = "";
      view.appendChild(f);
      view.insertAdjacentHTML("beforeend", `<p class="browser__hint mono">¿No carga? Algunos sitios no permiten verse dentro de otra página: <a href="${esc(view.dataset.site)}" target="_blank" rel="noopener">ábrelo en una pestaña nueva ↗</a></p>`);
      return;
    }
    const img = e.target.closest(".g, .duo__img, .cv, .fmt__it, .slide, .ident__logo");
    if (img) {
      const el = img.querySelector("[data-lb]");
      const k = lbItems().indexOf(el);
      if (k >= 0) openLightbox(k);
    }
  });
  $("#back").addEventListener("click", () => goHome());
  $("#d-prev").addEventListener("click", () => swapDetail(S.open - 1));
  $("#d-next").addEventListener("click", () => swapDetail(S.open + 1));

  dScroll.addEventListener("scroll", () => {
    detail.classList.toggle("is-scrolled", dScroll.scrollTop > innerHeight * 0.85);
  }, { passive: true });

  /* carga diferida propia (fiable en Safari dentro del panel con scroll) */
  let lazyIO = null;
  function lazyDetail() {
    const imgs = $$('img[loading="lazy"]', dContent);
    imgs.forEach((im) => { im.dataset.src = im.getAttribute("src"); im.removeAttribute("src"); im.removeAttribute("loading"); });
    const load = (im) => { if (im.dataset.src) { im.src = im.dataset.src; delete im.dataset.src; } };
    if (lazyIO) lazyIO.disconnect();
    if (!("IntersectionObserver" in window)) { imgs.forEach(load); return; }
    lazyIO = new IntersectionObserver((ens) => ens.forEach((en) => {
      if (en.isIntersecting) { load(en.target); lazyIO.unobserve(en.target); }
    }), { root: dScroll, rootMargin: "120% 0px 120% 0px" });
    imgs.forEach((im) => lazyIO.observe(im));
    // red de seguridad: si algo falla, cargar todo tras unos segundos
    setTimeout(() => imgs.forEach(load), 6000);
  }

  /* reveal on scroll */
  let io = null;
  function observeReveals() {
    if (io) io.disconnect();
    const els = $$(".rv, .g.reveal", dContent);
    if (!("IntersectionObserver" in window) || reduced()) { els.forEach((el) => el.classList.add("is-seen")); return; }
    io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-seen"); io.unobserve(en.target); } });
    }, { root: dScroll, rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  }

  /* ================================================================
     LIGHTBOX
     ================================================================ */
  let lbK = 0;
  const lbItems = () => $$("img[data-lb]", dContent);
  function openLightbox(k) {
    const items = lbItems();
    if (!items.length) return;
    lbK = mod2(k, items.length);
    const g = { src: items[lbK].currentSrc || items[lbK].src || items[lbK].dataset.src, alt: items[lbK].alt };
    $("#lb-img").src = g.src;
    $("#lb-img").alt = g.alt;
    $("#lb-cap").textContent = `${pad2(lbK + 1)} / ${pad2(items.length)} — ${g.alt}`;
    const multi = items.length > 1;
    $("#lb-prev").style.visibility = $("#lb-next").style.visibility = multi ? "" : "hidden";
    if (lb.hidden) { lb.hidden = false; $("#lb-close").focus(); }
  }
  const mod2 = (k, n) => ((k % n) + n) % n;
  function closeLightbox() {
    if (lb.hidden) return;
    lb.hidden = true;
    $("#lb-img").removeAttribute("src");
  }
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", () => openLightbox(lbK - 1));
  $("#lb-next").addEventListener("click", () => openLightbox(lbK + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lightbox__fig")) closeLightbox(); });
  let lbSwipe = null;
  lb.addEventListener("pointerdown", (e) => { lbSwipe = e.clientX; });
  lb.addEventListener("pointerup", (e) => {
    if (lbSwipe == null) return;
    const dx = e.clientX - lbSwipe; lbSwipe = null;
    if (Math.abs(dx) > 50) openLightbox(lbK + (dx < 0 ? 1 : -1));
  });

  /* ================================================================
     TECLADO
     ================================================================ */
  addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (!lb.hidden) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") openLightbox(lbK - 1);
      else if (e.key === "ArrowRight") openLightbox(lbK + 1);
      return;
    }
    if (S.open < 0 && !indexEl.hidden) {
      if (e.key === "Escape") { e.preventDefault(); setHash(null); syncRoute(); }
      return;
    }
    if (S.open >= 0) {
      if (e.key === "Escape") { e.preventDefault(); goHome(); }
      else if (e.key === "ArrowLeft" && !isTyping(e)) swapDetail(S.open - 1);
      else if (e.key === "ArrowRight" && !isTyping(e)) swapDetail(S.open + 1);
      return;
    }
    if (!S.ready || !indexEl.hidden || scrollY > innerHeight * 0.6) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); focusActiveSoon(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); step(1); focusActiveSoon(); }
    else if ((e.key === "Enter" || e.key === " ") && (e.target === body || e.target.classList.contains("card") || e.target === document.documentElement)) {
      e.preventDefault(); openCard(activeIndex());
    }
  });
  const isTyping = (e) => /input|textarea|select/i.test(e.target.tagName);
  function focusActiveSoon() {
    if (!document.activeElement || !document.activeElement.classList.contains("card")) return;
    setTimeout(() => cards[mod(Math.round(S.target))].focus({ preventScroll: true }), 30);
  }
  cards.forEach((c, i) => c.addEventListener("focus", () => { if (S.ready && i !== activeIndex() && !S.busy) goTo(i); }));

  /* ================================================================
     HOME EDITORIAL + ÍNDICE DE PROYECTOS
     ================================================================ */
  const PROJECTS = DECK.filter((c) => c.kind === "project" || c.kind === "archive");

  function pcHTML(c) {
    const i = DECK.indexOf(c);
    const k = c.card || {};
    let media;
    if (k.hero || k.src) {
      const fit = k.heroFit || k.fit || "cover";
      media = `<div class="pc__media" data-fit="${fit}"${k.blend ? " data-blend" : ""} style="--mbg:${k.bg || c.color};--fit:${fit};--pos:${k.heroPos || k.pos || "50% 50%"}${k.ar ? `;--ar:${k.ar}` : ""}">
        <span class="pc__num">Nº ${esc(c.number)}</span>
        <img src="${esc(k.hero || k.src)}" alt="${esc(c.title)} — portada" loading="lazy" decoding="async"></div>`;
    } else {
      media = `<div class="pc__media pc__media--type" style="--mbg:${c.color};color:${c.ink}">
        <span class="pc__num">Nº ${esc(c.number)}</span>
        <span class="pc__type">${esc(c.title)}<i>↗</i></span></div>`;
    }
    return `<article class="pc" data-open="${esc(c.id)}" data-i="${i}" data-tags="${esc((c.tags || []).join("|"))}" tabindex="0" role="link" aria-label="${esc(`Explorar proyecto ${c.title}`)}">
      ${media}
      <div class="pc__meta"><span>${esc(c.category)}</span><span>${esc(c.year)}</span></div>
      <h3 class="pc__title"><span>${esc(c.title)}</span></h3>
      ${c.short ? `<p class="pc__desc">${esc(c.short)}</p>` : ""}
      <span class="pc__cta">EXPLORAR PROYECTO <i aria-hidden="true">→</i></span>
    </article>`;
  }

  function buildHome() {
    const h = SITE.headline || "";
    $("#st-h").innerHTML = h.split(" ").map((w, k, arr) =>
      `<span class="w${k === arr.length - 1 ? " o" : ""}"><span style="transition-delay:${k * 70}ms">${esc(w)}</span></span>`).join(" ");
    $("#st-role").innerHTML = `<b>●</b> ${esc(SITE.title || "")}<br>${esc(SITE.name)}<br>${esc("Bogotá, Colombia")}`;
    $("#st-desc").textContent = SITE.description || "";
    $("#pgrid").innerHTML = PROJECTS.map(pcHTML).join("");
    $("#exlist").innerHTML = (SITE.expertise || []).map((x, k) => `<li><span>${pad2(k + 1)}</span>${esc(x)}</li>`).join("");
    $("#cfoot-row").innerHTML = `
      <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>
      <a href="${esc(SITE.links.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>
      <a href="${esc(SITE.links.behance)}" target="_blank" rel="noopener">Behance ↗</a>
      <span>Bogotá, Colombia</span>
      <span>© ${new Date().getFullYear()} ${esc(SITE.name)}</span>`;
    observeIn(home, null);
  }

  let ixFilter = "Todos";
  function buildIndex() {
    const counts = {};
    PROJECTS.forEach((c) => (c.tags || []).forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
    const tags = ["Todos", ...Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))];
    $("#filters").innerHTML = tags.map((t) =>
      `<button class="filter" data-f="${esc(t)}" aria-pressed="${t === ixFilter}">${esc(t)}<sup>${t === "Todos" ? PROJECTS.length : counts[t]}</sup></button>`).join("");
    $("#ix-h").innerHTML = `Projects<sup>(${pad2(PROJECTS.length)})</sup>`;
    renderIndexGrid();
  }
  function renderIndexGrid() {
    const list = PROJECTS.filter((c) => ixFilter === "Todos" || (c.tags || []).includes(ixFilter));
    $("#ixgrid").innerHTML = list.map(pcHTML).join("");
    $$(".pc", $("#ixgrid")).forEach((el, k) => { el.style.animationDelay = `${k * 60}ms`; el.classList.add("is-seen"); });
    $("#ix-count").textContent = `${pad2(list.length)} / ${pad2(PROJECTS.length)} PROYECTOS`;
  }
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-f]");
    if (!b) return;
    ixFilter = b.dataset.f;
    $$(".filter").forEach((x) => x.setAttribute("aria-pressed", x.dataset.f === ixFilter));
    renderIndexGrid();
  });

  async function openIndex() {
    indexEl.hidden = false;
    body.classList.add("is-index");
    $("#index-scroll").scrollTop = 0;
    await nextFrame();
    indexEl.classList.add("is-in");
    document.title = "Projects — Jhon Valencia Santana";
  }
  async function closeIndex() {
    indexEl.classList.remove("is-in");
    await wait(reduced() ? 0 : 300);
    indexEl.hidden = true;
    body.classList.remove("is-index");
  }

  // clic / Enter sobre tarjetas editoriales
  function onPc(e) {
    const pc = e.target.closest(".pc");
    if (!pc) return;
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    if (S.busy || S.open >= 0) return;
    openCard(+pc.dataset.i, { from: $(".pc__media", pc), origin: indexEl.hidden ? "grid" : "index" });
  }
  [home, indexEl].forEach((root) => {
    root.addEventListener("click", (e) => { if (e.target.closest(".pc")) onPc(e); });
    root.addEventListener("keydown", (e) => { if (e.target.classList && e.target.classList.contains("pc")) onPc(e); });
  });

  // aparición al hacer scroll
  function observeIn(root, scroller) {
    const els = $$(".pc, .statement__h", root);
    if (!("IntersectionObserver" in window) || reduced()) { els.forEach((el) => el.classList.add("is-seen")); return; }
    const ob = new IntersectionObserver((ens) => ens.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-seen"); ob.unobserve(en.target); }
    }), { root: scroller, rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    els.forEach((el) => ob.observe(el));
    const check = () => els.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add("is-seen"); });
    (scroller || window).addEventListener("scroll", check, { passive: true });
    setTimeout(check, 500);
  }

  buildHome();
  buildIndex();

  /* ================================================================
     RUTAS (hash → compatible con GitHub Pages)
     ================================================================ */
  const routeId = () => {
    const m = location.hash.match(/^#\/p\/([\w-]+)/);
    return m ? m[1] : null;
  };
  const indexOfId = (id) => DECK.findIndex((c) => c.id === id);
  let silentHash = false;
  function setHash(id, raw = false) {
    const h = raw ? id : id ? `#/p/${id}` : "#/";
    if (location.hash !== h) { silentHash = true; location.hash = h; }
  }
  function goHome() {
    if (S.origin && S.origin !== "deck") return closeDetail();
    setHash(null); closeDetail();
  }

  function syncRoute() {
    if (S.busy) return;
    const id = routeId();
    const i = id ? indexOfId(id) : -1;
    const wantIndex = /^#\/projects/.test(location.hash);
    if (i >= 0) {
      if (S.open < 0) openCard(i);
      else if (S.open !== i) swapDetail(i);
    } else if (S.open >= 0) {
      closeDetail();
      return;
    } else if (wantIndex && indexEl.hidden) {
      openIndex();
    } else if (!wantIndex && !indexEl.hidden) {
      closeIndex();
    }
    $$(".topbar__nav a").forEach((a) => {
      const n = a.dataset.nav;
      a.toggleAttribute("aria-current", (n === "projects" && wantIndex) || n === id);
      if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page");
    });
    if (!id) document.title = wantIndex ? "Projects — Jhon Valencia Santana" : "Jhon Valencia Santana — Creative Strategy & Digital Innovation";
  }
  addEventListener("hashchange", () => {
    if (silentHash) { silentHash = false; return; }
    syncRoute();
  });

  /* ================================================================
     INTRO (≈2.2 s)
     ================================================================ */
  async function runIntro() {
    S.rise = 0; S.spread = 0;
    layout(); syncActive();
    if (reduced()) return finishIntro(true);

    await nextFrame();
    introEl.classList.add("is-on");                       // 1. monograma JV
    await wait(620);
    introEl.classList.add("is-out");
    heroEl.classList.add("is-in");                        // 2. PORTFOLIO
    kinetic.classList.add("is-in");
    await wait(260);
    tween("rise", 1, 650, easeOut);                       // 3. las cartas emergen
    await wait(420);
    tween("spread", 1, 700, easeInOut);                   // 4. abanico
    await wait(260);
    slots.forEach((s, i) => {                             // 5. profundidad + giro
      const ao = Math.abs(wrapOffset(i, S.pos));
      setTimeout(() => cards[i].classList.remove("is-down"), 70 * ao);
    });
    await wait(520);
    finishIntro(false);                                   // 6. instrucción
  }
  function finishIntro(instant) {
    S.rise = 1; S.spread = 1;
    cards.forEach((c) => c.classList.remove("is-down"));
    heroEl.classList.add("is-in"); kinetic.classList.add("is-in");
    introEl.classList.add("is-gone");
    body.classList.remove("is-intro");
    deckEl.classList.add("is-ready");
    S.ready = true;
    layout(); kick();
    if (instant) syncRoute();
  }

  /* ------------------------------------------------------------ misc */
  document.addEventListener("visibilitychange", () => body.classList.toggle("is-hidden-tab", document.hidden));
  addEventListener("resize", () => layout(), { passive: true });

  /* ------------------------------------------------------------ arranque */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  scrollTo(0, 0);
  const startId = routeId();
  const startIdx = startId ? indexOfId(startId) : -1;
  if (/^#\/projects/.test(location.hash)) {
    S.pos = S.target = Math.min(1, N - 1);
    finishIntro(false);
    syncActive();
    openIndex();
  } else if (startIdx >= 0) {
    // enlace directo a un proyecto: sin intro
    S.pos = S.target = startIdx;
    finishIntro(false);
    syncActive();
    openCard(startIdx, { animate: false });
  } else {
    // arranca con THE CREATOR al centro
    S.pos = S.target = HOME_I;
    runIntro().then(() => syncRoute());
  }
})();
