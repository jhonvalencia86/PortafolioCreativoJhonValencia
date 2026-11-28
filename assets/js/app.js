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
      style: `--mbg:${(hero && k.heroBg) || k.bg || c.color};--fit:${fit};--pos:${pos}${hero && k.heroPad ? `;--hpad:${k.heroPad}` : ""}`
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
    if (c.kind === "po") {
      const st = [0, 1, 2, 3, 4].map((k) => { const a = (k / 5) * Math.PI * 2 - Math.PI / 2; return `<circle cx="${(50 + Math.cos(a) * 34).toFixed(1)}" cy="${(50 + Math.sin(a) * 34).toFixed(1)}" r="5"/>`; }).join("");
      return `<div class="cf cf--po">${ticks}
        <div class="cf__top"><span class="cf__num">Nº ${esc(c.number)}</span><span>15+ AÑOS</span></div>
        <svg class="cf__loop" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="34" class="cf__loop-r"/><g class="cf__loop-s">${st}</g>
          <circle cx="50" cy="50" r="16" class="cf__loop-c"/><text x="50" y="54" text-anchor="middle">PO</text></svg>
        <div><span class="cf__title">THE PRODUCT<br><span class="o">OWNER</span></span>
        <div class="cf__bot"><span>BANCA DIGITAL</span><span>JV®</span></div></div>
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
    return `<section class="p-hero" data-id="${esc(c.id)}" data-fit="${m.fit}" style="${m.style}${k.heroInk ? `;--hink:${k.heroInk}` : ""}">
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

  function socialEmbed(url) {
    const u = String(url.url || url);
    let m = u.match(/tiktok\.com\/.*\/video\/(\d+)/);
    if (m) return `<figure class="reel reel--tt"><iframe src="https://www.tiktok.com/player/v1/${m[1]}?music_info=1&description=0&rel=0" title="Video de TikTok" loading="lazy" allow="fullscreen; encrypted-media" allowfullscreen></iframe><figcaption><a href="${esc(u)}" target="_blank" rel="noopener">Ver en TikTok ↗</a></figcaption></figure>`;
    m = u.match(/instagram\.com\/(?:reel|reels|p)\/([\w-]+)/);
    if (m) return `<figure class="reel reel--ig"><iframe src="https://www.instagram.com/reel/${m[1]}/embed/" title="Reel de Instagram" loading="lazy" allowfullscreen></iframe><figcaption><a href="${esc(u)}" target="_blank" rel="noopener">Ver en Instagram ↗</a></figcaption></figure>`;
    return "";
  }

  function storyBlock(b, n) {
    if (b.type === "social" && !(b.items && b.items.length) && !b.profile) return "";
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
    } else if (b.type === "films") {
      extra = `<div class="films rv">${b.items.map((it) => {
        if (it.kind === "note") return `<div class="film film--vert film--note"><strong>${esc(it.title)}</strong><p>${esc(it.text)}</p></div>`;
        if (it.kind === "image") return `<figure class="film film--vert"><div class="film__box" style="aspect-ratio:${it.w}/${it.h}"><img src="${esc(it.src)}" alt="${esc(it.title)}" loading="lazy" data-lb></div><figcaption>${esc(it.title)}</figcaption></figure>`;
        return `<figure class="film film--${it.span || "half"}"><div class="film__box" style="aspect-ratio:${it.w}/${it.h}">
            <video controls playsinline preload="none" poster="${esc(it.poster)}"><source src="${esc(it.src)}" type="video/mp4"></video></div>
            <figcaption><span>${esc(it.title)}</span>${it.dur ? `<span class="mono">${esc(it.dur)}</span>` : ""}</figcaption></figure>`;
      }).join("")}</div>`;
    } else if (b.type === "manifesto") {
      extra = `<div class="mani rv">${b.words.map((w, k) => `<span class="mani__w${k % 2 ? " o" : ""}">${esc(w)}</span>${k < b.words.length - 1 ? '<span class="mani__x">×</span>' : ""}`).join("")}</div>`;
    } else if (b.type === "split") {
      extra = `<div class="split rv"><figure class="split__img" style="aspect-ratio:${b.image.w}/${b.image.h}"><img src="${esc(b.image.src)}" alt="${esc(b.image.alt)}" loading="lazy" data-lb></figure></div>`;
    } else if (b.type === "social") {
      const pr = b.profile;
      const prof = pr ? `<a class="igcard rv" href="${esc(pr.url)}" target="_blank" rel="noopener">
          <span class="igcard__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg></span>
          <span class="igcard__txt"><span class="mono">${esc(pr.platform.toUpperCase())}</span><strong>${esc(pr.handle)}</strong></span>
          <span class="igcard__go mono">VER PERFIL ↗</span></a>` : "";
      const items = (b.items || []).map(socialEmbed).join("");
      extra = `${items ? `<div class="reels rv">${items}</div>` : ""}${prof}`;
    } else if (b.type === "formats") {
      extra = b.groups.map((g) => {
        const row = g.cols === 3
          ? `<div class="fmt__row">${g.items.map((it) => `<figure class="fmt__it" style="flex:${(it.w / it.h).toFixed(3)} 1 0"><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" style="aspect-ratio:${it.w}/${it.h}" data-lb><figcaption>${esc(it.alt)}</figcaption></figure>`).join("")}</div>`
          : `<div class="fmt__grid${g.cols === 1 ? " fmt__grid--1" : ""}">${g.items.map((it) => `<figure class="fmt__it"><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" style="aspect-ratio:${it.w}/${it.h}" data-lb><figcaption>${esc(it.alt)}</figcaption></figure>`).join("")}</div>`;
        return `<div class="fmt rv"><div class="fmt__head"><strong>${esc(g.name)}</strong><span class="mono">${esc(g.spec)}</span><span class="mono fmt__count">${pad2(g.items.length)} PIEZAS</span></div>${row}</div>`;
      }).join("");
    } else if (b.type === "deck") {
      extra = `<div class="slides rv"><p class="slides__spec mono">${esc(b.spec)}</p><div class="slides__grid">${b.items.map((it, k) =>
        `<figure class="slide${k === 0 ? " slide--lead" : ""}"><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" decoding="async" width="${it.w}" height="${it.h}" data-lb><span class="slide__n mono">${pad2(k + 1)}</span></figure>`).join("")}</div></div>`;
    } else if (b.type === "cards") {
      const cc = b.colors ? b.colors.map(([bg, fg], k) => `--k${k}:${bg};--f${k}:${fg}`).join(";") : "";
      extra = `<ol class="cards rv${b.colors ? " cards--custom" : ""}${b.cards.length === 4 ? " cards--n4" : ""}" style="${cc}">${b.cards.map(([t, d], k) => `<li><span class="mono">${pad2(k + 1)}</span><strong>${esc(t)}</strong><p>${esc(d)}</p></li>`).join("")}</ol>`;
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
    } else if (b.type === "jgap") {
      const N = b.steps.length, X = (k) => 60 + (k * 880) / (N - 1);
      extra = `<div class="bx-jg rv"><svg viewBox="0 0 1000 230" aria-hidden="true">
          ${b.steps.map((s, k) => `<text class="bx-jg__st" x="${X(k)}" y="22" text-anchor="middle">${esc(s)}</text>`).join("")}
          <rect class="bx-jg__gap" x="${X(b.gap) - 48}" y="38" width="96" height="160" rx="14"/>
          <circle class="bx-jg__pulse" cx="${X(b.gap)}" cy="118" r="18"/>
          ${b.rows.map(([name, sub, a, z], r) => { const y = 80 + r * 80;
            return `<line class="bx-jg__base" x1="${X(0)}" y1="${y}" x2="${X(N - 1)}" y2="${y}"/>
              <line class="bx-jg__ln bx-jg__ln--${r}" pathLength="1" x1="${X(a)}" y1="${y}" x2="${X(z)}" y2="${y}" style="--d:${0.3 + r * 0.5}s"/>
              ${Array.from({ length: z - a + 1 }, (_, k) => `<circle class="bx-jg__dot bx-jg__dot--${r}" cx="${X(a + k)}" cy="${y}" r="9" style="--d:${0.4 + r * 0.5 + k * 0.15}s"/>`).join("")}`; }).join("")}
          <text class="bx-jg__gt" x="${X(b.gap)}" y="222" text-anchor="middle">Brecha: nadie acompaña la mudanza</text>
        </svg>
        <div class="bx-jg__legend">${b.rows.map(([name, sub], r) => `<span class="bx-jg__lg bx-jg__lg--${r}"><i></i><b>${esc(name)}</b> ${esc(sub)}</span>`).join("")}</div>
        <div class="bx-trio">${b.cause.map(([t, d], k) => `<div style="--d:${0.8 + k * 0.15}s"><span class="mono">${esc(t)}</span><p>${esc(d)}</p></div>`).join("")}</div>
      </div>`;
    } else if (b.type === "curve") {
      const st = ["Buscar", "Formalizar", "Mudarse", "Proteger", "Habitar", "Renovar"];
      const pts = [["Expectativa", 60, 70], ["Dudas", 240, 150], ["Sobrecarga", 420, 240], ["Entra Mi Plan", 420, 240], ["Alivio", 600, 120], ["Tranquilidad", 780, 70], ["Confianza", 940, 30]];
      extra = `<div class="bx-cv rv">
        <blockquote class="bx-cv__q">${esc(b.quote)}<span class="mono">Laura · 33 años · arrendataria en Bogotá</span></blockquote>
        <svg viewBox="0 0 1000 320" aria-hidden="true">
          <defs><linearGradient id="bxg" x1="0" x2="1"><stop offset="0" stop-color="#9FB4A6"/><stop offset=".42" stop-color="#C9472B"/><stop offset=".5" stop-color="#F6D33C"/><stop offset="1" stop-color="#0B7A3E"/></linearGradient></defs>
          ${st.map((s, k) => `<text class="bx-cv__st" x="${60 + k * 176}" y="312" text-anchor="middle">${s}</text>`).join("")}
          <path class="bx-cv__ln" pathLength="1" d="M60 70 C 160 80, 200 140, 260 160 S 380 250, 420 240 S 520 140, 600 120 S 720 70, 790 68 S 900 40, 940 30"/>
          <g class="bx-cv__mk"><circle cx="420" cy="240" r="12"/><text x="436" y="276">Entra Mi Plan de Hogar</text></g>
          ${pts.filter((p) => p[0] !== "Entra Mi Plan").map(([t, x, y], k) => `<text class="bx-cv__lb" x="${x}" y="${y - 16}" text-anchor="middle" style="--d:${0.4 + k * 0.22}s">${t}</text>`).join("")}
        </svg>
        <p class="bx-cv__ins"><b class="mono">INSIGHT</b>Orientar antes de vender.</p>
      </div>`;
    } else if (b.type === "hub") {
      extra = `<div class="bx-hub rv">
        <ul class="bx-hub__col">${b.signals.map((s, k) => `<li style="--d:${k * 0.12}s"><i></i>${esc(s)}</li>`).join("")}</ul>
        <svg class="bx-hub__wires" viewBox="0 0 200 400" preserveAspectRatio="none" aria-hidden="true">${[50, 150, 250, 350].map((y, k) => `<path pathLength="1" d="M0 ${y} C 100 ${y}, 100 200, 200 200" style="--d:${0.3 + k * 0.1}s"/>`).join("")}</svg>
        <div class="bx-hub__core"><span class="bx-hub__ring"></span><strong>Mi Plan<br>de Hogar</strong><small>Checklist personal y siguiente paso</small></div>
        <svg class="bx-hub__wires bx-hub__wires--out" viewBox="0 0 200 400" preserveAspectRatio="none" aria-hidden="true">${[50, 150, 250, 350].map((y, k) => `<path pathLength="1" d="M0 200 C 100 200, 100 ${y}, 200 ${y}" style="--d:${0.9 + k * 0.1}s"/>`).join("")}</svg>
        <ul class="bx-hub__col bx-hub__col--out">${b.leaders.map(([t, d], k) => `<li style="--d:${1.2 + k * 0.12}s"><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ul>
      </div>`;
    } else if (b.type === "moments") {
      extra = `<ol class="bx-mo rv">${b.items.map(([t, lead, ch, sig], k) => `<li class="${k === b.star ? "is-star" : ""}" style="--d:${k * 0.1}s">
          <span class="bx-mo__n mono">${pad2(k + 1)}${k === b.star ? " ★" : ""}</span><strong>${esc(t)}</strong>
          <dl><dt>Lidera → acompaña</dt><dd>${esc(lead)}</dd><dt>Canal</dt><dd>${esc(ch)}</dd><dt>Señal que activa</dt><dd>${esc(sig)}</dd></dl></li>`).join("")}</ol>`;
    } else if (b.type === "allies") {
      extra = `<div class="bx-al rv">
        <div class="bx-al__stats">${b.stats.map(([v, suf, t]) => `<div><strong><span data-count="${v}">${v}</span>${suf}</strong><p>${esc(t)}</p></div>`).join("")}</div>
        <div class="bx-trio bx-trio--cards">${b.cards.map(([t, d], k) => `<div style="--d:${0.3 + k * 0.15}s">${k === 0 ? '<span class="bx-ai mono">IA</span>' : ""}<strong>${esc(t)}</strong><p>${esc(d)}</p></div>`).join("")}</div>
        <ol class="bx-flow">${b.flow.map((f, k) => `<li style="--d:${0.8 + k * 0.15}s"><span class="mono">${k + 1}</span>${esc(f)}</li>`).join("")}</ol>
        <p class="note">${esc(b.source)}</p>
      </div>`;
    } else if (b.type === "ice") {
      const sc = (a) => (a[0] + a[1] + a[2]) / 3;
      extra = `<div class="bx-ice rv">
        <div class="pr-formula"><span><b>I</b>mpacto</span><em>+</em><span><b>C</b>onfianza</span><em>+</em><span><b>F</b>acilidad</span><em>÷ 3</em></div>
        ${b.items.map(([t, d, v, goal, test], k) => `<div class="bx-ice__row" style="--d:${0.2 + k * 0.15}s;--w:${sc(v) * 10}%">
          <strong class="bx-ice__sc">${sc(v).toFixed(1).replace(".", ",")}</strong>
          <div class="bx-ice__main"><b>H${k + 1} · ${esc(t)}</b><p>${esc(d)}</p><span class="bx-ice__bar"><i></i></span></div>
          <div class="bx-ice__v mono">${["I", "C", "F"].map((x, j) => `<span>${x}${v[j]}</span>`).join("")}</div>
          <div class="bx-ice__goal"><b>${esc(goal)}</b><span class="mono">${esc(test)}</span></div></div>`).join("")}
      </div>`;
    } else if (b.type === "cadence") {
      extra = `<div class="bx-cd rv">
        <ol class="bx-cd__line">${b.days.map(([d, t], k) => `<li style="--d:${k * 0.25}s"><span class="mono">${esc(d)}</span><p>${esc(t)}</p></li>`).join("")}</ol>
        <div class="bx-cd__imgs">${b.images.map((g) => `<figure style="aspect-ratio:${g.w}/${g.h}"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" decoding="async" data-lb><figcaption class="mono">${esc(g.alt)}</figcaption></figure>`).join("")}</div>
      </div>`;
    } else if (b.type === "results") {
      const mx = Math.max(...b.rows.map((r) => r[2]));
      extra = `<div class="bx-rs rv">
        <div class="bx-rs__kpis">${b.kpis.map(([v, pre, suf, t, d]) => `<div><strong>${pre}<span data-count="${v}">${v}</span>${suf}</strong><b>${esc(t)}</b><span class="mono">${esc(d)}</span></div>`).join("")}</div>
        <div class="bx-rs__chart">
          <div class="bx-rs__lg mono"><span class="c0">Control</span><span class="c1">Piloto (meta)</span></div>
          ${b.rows.map(([t, c0, c1, u], k) => `<div class="bx-rs__row" style="--d:${k * 0.12}s"><span class="bx-rs__t">${esc(t)}</span>
            <div class="bx-rs__bars"><i class="c0" style="--w:${(c0 / mx) * 100}%"><em>${c0}${u}</em></i><i class="c1" style="--w:${(c1 / mx) * 100}%"><em>${c1}${u}</em></i></div></div>`).join("")}
          <p class="note">${esc(b.note)}</p>
        </div>
      </div>`;
    } else if (b.type === "aiflow") {
      extra = `<div class="bx-ai-f rv">
        <ol class="bx-steps5">${b.steps.map(([t, d], k) => `<li style="--d:${k * 0.15}s"><span class="mono">${pad2(k + 1)}</span><strong>${esc(t)}</strong><p>${esc(d)}</p></li>`).join("")}</ol>
        <div class="bx-ai-f__grid">
          <table class="bx-tools"><thead><tr><th>Tarea</th><th>Herramienta de IA</th><th>Cómo la uso</th></tr></thead>
            <tbody>${b.tools.map(([a, t, c]) => `<tr><td>${esc(a)}</td><td><b>${esc(t)}</b></td><td>${esc(c)}</td></tr>`).join("")}</tbody></table>
          <div class="bx-w"><p class="mono">CÓMO PUNTÚO CADA SOLICITUD</p>${b.weights.map(([t, v], k) => `<div class="bx-w__r" style="--w:${v * 2.6}%;--d:${0.3 + k * 0.1}s"><span>${esc(t)}</span><i></i><b>${v}%</b></div>`).join("")}</div>
        </div>
      </div>`;
    } else if (b.type === "gantt") {
      extra = `<div class="bx-gt rv">
        <div class="bx-gt__head"><span></span>${b.phases.map((p) => `<span class="mono">${esc(p)}</span>`).join("")}</div>
        ${b.rows.map(([name, bars], r) => `<div class="bx-gt__row"><strong>${esc(name)}</strong><div class="bx-gt__track">${bars.map(([a, z, t], k) =>
          `<i style="--a:${a};--z:${z};--d:${r * 0.12 + k * 0.2}s">${esc(t)}</i>`).join("")}</div></div>`).join("")}
        <div class="bx-gt__miles"><span></span><div>${b.miles.map(([d, t], k) => `<em style="--x:${(d / 90) * 100}%;--d:${1 + k * 0.15}s"><b class="mono">D${d}</b>${esc(t)}</em>`).join("")}</div></div>
      </div>`;
    } else if (b.type === "note") {
      return `<section class="sec sec--note"><p class="note bx-note rv">${esc(b.text)}</p></section>`;
    } else if (b.type === "figures") {
      extra = `<div style="height:clamp(24px,3vw,40px)"></div>${figs(b.items)}`;
    }
    return `<section class="${cls}">${head}${extra}</section>`;
  }

  function renderStory(c, i) {
    const facts = `<dl class="facts facts--4">${(c.facts || []).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
    let n = 1;
    const blocks = c.story.filter((b) => !(b.type === "social" && !(b.items && b.items.length) && !b.profile)).map((b) => storyBlock(b, b.type === "note" ? n : ++n)).join("");
    const links = c.links && c.links.length
      ? sec(++n, "ENLACES", `<div class="links">${c.links.map((l) => bigLink(l.label, l.url, l.sub || "")).join("")}</div>`)
      : "";
    return heroImage(c) +
      sec(1, "OVERVIEW", `<p class="lead">${esc(c.lead)}</p>${facts}`) +
      blocks + links + nextBlock(i) + footer();
  }

  /* ================================================================
     THE PRODUCT OWNER — página con gráficas animadas
     ================================================================ */
  function renderPO(c, i) {
    const n = (v) => `<span class="po-n">${v}</span>`;
    const hero = `<section class="p-hero p-hero--po" style="--c:${c.color};--ink:#fff;--mbg:${c.color}">
      <div class="po-hero">
        <p class="p-hero__concept">${esc(c.lead)}</p>
        <h2 class="p-hero__giant" id="detail-title" aria-label="The Product Owner"><span class="ln"><span>PRODUCT</span></span><span class="ln"><span class="o">OWNER</span></span></h2>
        <svg class="po-path" viewBox="0 0 1000 120" aria-hidden="true">
          <path class="po-path__line" d="M60 80 C 200 10, 300 110, 360 60 S 560 10, 640 60 S 840 110, 900 40"/>
          ${[["60","80","Idea"],["360","60","Discovery"],["640","60","MVP"],["900","40","Producción"]].map(([x, y, t], k) =>
            `<g class="po-node" style="--d:${0.5 + k * 0.45}s"><circle cx="${x}" cy="${y}" r="9"/><text x="${x}" y="${+y + 34}" text-anchor="middle">${t}</text></g>`).join("")}
        </svg>
      </div>
      <div class="p-hero__cap"><span class="mono" style="font-size:12px;letter-spacing:.08em">JHON VALENCIA SANTANA</span>
        <div class="p-hero__tag"><span class="p-hero__num">${esc(c.number)}</span><span>${esc(c.category)}</span><span>${esc(c.year)}</span></div></div>
    </section>`;

    const kpis = `<div class="po-kpis rv">${c.kpis.map((k) => `<div class="po-kpi">
        <strong><span>${esc(k.prefix)}</span><span data-count="${k.value}">${k.value.toLocaleString("es-CO")}</span><span>${esc(k.suffix)}</span></strong>
        <em class="mono">${esc(k.unit)}</em><p>${esc(k.label)}</p></div>`).join("")}</div>`;

    const y0 = 2017, y1 = 2027, span = y1 - y0;
    const years = Array.from({ length: span + 1 }, (_, k) => y0 + k);
    const tl = `<div class="po-tl rv">
      <div class="po-tl__axis">${years.map((y) => `<span style="left:${((y - y0) / span) * 100}%">${y}</span>`).join("")}</div>
      ${c.timeline.map((t, k) => `<div class="po-tl__row" style="--d:${k * 0.18}s">
        <div class="po-tl__label"><strong>${esc(t.org)}</strong><span class="mono">${esc(t.role)}</span></div>
        <div class="po-tl__track"><i style="left:${((t.from - y0) / span) * 100}%;width:${((t.to - t.from) / span) * 100}%"></i></div>
        <p>${esc(t.text)}</p></div>`).join("")}
    </div>`;

    const dd = `<div class="po-dd rv">
      <svg viewBox="0 0 1000 300" aria-hidden="true">
        <path class="po-dd__shape" d="M20 150 L260 30 L500 150 L260 270 Z"/>
        <path class="po-dd__shape po-dd__shape--b" d="M500 150 L740 30 L980 150 L740 270 Z"/>
        <line class="po-dd__mid" x1="260" y1="30" x2="260" y2="270"/><line class="po-dd__mid" x1="740" y1="30" x2="740" y2="270"/>
        ${[["140", "Descubrir"], ["380", "Definir"], ["620", "Desarrollar"], ["860", "Entregar"]].map(([x, t], k) =>
          `<text class="po-dd__t" x="${x}" y="158" text-anchor="middle" style="--d:${1 + k * 0.25}s">${t}</text>`).join("")}
        <text class="po-dd__cap" x="260" y="296" text-anchor="middle">PROBLEMA CORRECTO</text>
        <text class="po-dd__cap" x="740" y="296" text-anchor="middle">SOLUCIÓN CORRECTA</text>
      </svg>
      <ol class="po-cols">${c.method.map(([t, d], k) => `<li><span class="mono">${pad2(k + 1)}</span><strong>${esc(t)}</strong><p>${esc(d)}</p></li>`).join("")}</ol>
    </div>`;

    const stages = ["Backlog", "Planning", "Sprint", "Review", "Retro"];
    const R = 150, cx = 200, cy = 200;
    const scrum = `<div class="po-split rv">
      <svg class="po-loop" viewBox="0 0 400 400" aria-hidden="true">
        <circle class="po-loop__ring" cx="${cx}" cy="${cy}" r="${R}"/>
        <circle class="po-loop__track" cx="${cx}" cy="${cy}" r="${R}"/>
        <g class="po-loop__spin"><circle cx="${cx}" cy="${cy - R}" r="10" class="po-loop__dot"/></g>
        ${stages.map((s, k) => { const a = (k / stages.length) * Math.PI * 2 - Math.PI / 2; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
          return `<g class="po-loop__st" style="--d:${k * 0.2}s"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="34"/><text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle">${s}</text></g>`; }).join("")}
        <circle class="po-loop__core" cx="${cx}" cy="${cy}" r="62"/>
        <text class="po-loop__ct" x="${cx}" y="${cy - 4}" text-anchor="middle">Incremento</text>
        <text class="po-loop__cs" x="${cx}" y="${cy + 20}" text-anchor="middle">cada 2 semanas</text>
      </svg>
      <div><ul class="list po-list">
        <li><span>01</span>Visión y roadmap del producto</li>
        <li><span>02</span>Backlog priorizado con OKR</li>
        <li><span>03</span>Historias de usuario y criterios de aceptación</li>
        <li><span>04</span>Puente entre negocio, TI y proveedores</li>
        <li><span>05</span>Cumplimiento de ANS y validaciones normativas</li>
      </ul></div>
    </div>`;

    const dots = [[78, 22, "Nuevo canal WhatsApp"], [70, 34, "Journey crédito"], [30, 28, "Core bancario"], [82, 62, "Ajustes UX"], [28, 70, "Reportes"], [60, 18, "Onboarding digital"]];
    const mxSvg = `<div class="po-mx">
        <div class="po-mx__q po-mx__q--1"><span>Quick wins</span></div><div class="po-mx__q po-mx__q--2"><span>Grandes apuestas</span></div>
        <div class="po-mx__q po-mx__q--3"><span>Mejoras menores</span></div><div class="po-mx__q po-mx__q--4"><span>Evitar</span></div>
        <span class="po-mx__ax po-mx__ax--y mono">IMPACTO ↑</span><span class="po-mx__ax po-mx__ax--x mono">ESFUERZO →</span>
        ${dots.map(([x, y, t], k) => `<i class="po-mx__dot" style="--px:${(100 - x) / 100};--py:${y / 100};--d:${k * 0.15}s" title="${esc(t)}"></i>`).join("")}
      </div>`;

    // RICE
    const rice = [["Onboarding digital", 8.4], ["Recordatorio de pago por SMS", 6.1], ["Simulador de crédito", 4.7], ["Rediseño del portal", 1.9]];
    const riceD = `<div class="pr-rice">
      <div class="pr-formula"><span><b>R</b>each</span><em>×</em><span><b>I</b>mpact</span><em>×</em><span><b>C</b>onfidence</span><em>÷</em><span><b>E</b>ffort</span></div>
      ${rice.map(([t, v], k) => `<div class="pr-bar" style="--w:${(v / 8.4) * 100}%;--d:${0.25 + k * 0.14}s"><span class="pr-bar__t">${pad2(k + 1)} · ${esc(t)}</span><span class="pr-bar__v">${v.toFixed(1)}</span><i></i></div>`).join("")}
    </div>`;

    // WSJF
    const wsjf = [["Ajuste normativo SFC", [8, 13, 8], 5], ["Pagos inmediatos", [13, 8, 5], 8], ["App: nuevo home", [8, 3, 2], 13]];
    const wsjfD = `<div class="pr-wsjf">
      <div class="pr-formula"><span>Valor negocio</span><em>+</em><span>Criticidad tiempo</span><em>+</em><span>Reducción riesgo</span><em>÷</em><span>Tamaño</span></div>
      ${wsjf.map(([t, seg, size], k) => { const cod = seg[0] + seg[1] + seg[2];
        return `<div class="pr-wrow" style="--d:${0.25 + k * 0.18}s"><span class="pr-wrow__t">${esc(t)}</span>
          <div class="pr-wrow__stack">${seg.map((v, j) => `<i class="s${j}" style="--w:${(v / 34) * 100}%;--dd:${j * 0.12}s"></i>`).join("")}</div>
          <span class="pr-wrow__div mono">÷ ${size}</span><strong class="pr-wrow__r">${(cod / size).toFixed(1)}</strong></div>`; }).join("")}
      <div class="pr-legend mono"><span class="s0">Valor</span><span class="s1">Tiempo</span><span class="s2">Riesgo</span></div>
    </div>`;

    // MoSCoW
    const msc = [["Must", "pr-m", ["Validación de identidad", "Firma digital", "Cumplimiento SFC"]], ["Should", "pr-s", ["Simulador", "Notificaciones push"]], ["Could", "pr-c", ["Modo oscuro", "Chat en vivo"]], ["Won't", "pr-w", ["Integración cripto"]]];
    let mi = 0;
    const mscD = `<div class="pr-msc">${msc.map(([t, cl, items]) => `<div class="pr-msc__col ${cl}"><strong>${t}</strong>${items.map((x) => `<span style="--d:${0.2 + (mi++) * 0.09}s">${esc(x)}</span>`).join("")}</div>`).join("")}</div>`;

    // Kano
    const kanoD = `<div class="pr-chart"><svg viewBox="0 0 420 300" aria-hidden="true">
      <line class="pr-ax" x1="210" y1="14" x2="210" y2="286"/><line class="pr-ax" x1="14" y1="150" x2="406" y2="150"/>
      <text class="pr-axt" x="216" y="24">Satisfacción +</text><text class="pr-axt" x="216" y="284">Insatisfacción</text>
      <text class="pr-axt" x="306" y="142">Funcionalidad →</text>
      <path class="pr-ln pr-ln--a" pathLength="1" d="M20 282 C 150 250, 220 175, 400 160"/>
      <path class="pr-ln pr-ln--b" pathLength="1" d="M20 262 L 400 38"/>
      <path class="pr-ln pr-ln--c" pathLength="1" d="M20 142 C 220 140, 300 110, 400 18"/>
      <g class="pr-lab"><circle class="c-a" cx="330" cy="166" r="5"/><text x="300" y="192">Básicas</text>
      <circle class="c-b" cx="110" cy="209" r="5"/><text x="122" y="232">Desempeño</text>
      <circle class="c-c" cx="330" cy="88" r="5"/><text x="226" y="70">Encantadoras</text></g>
    </svg>
    <ul class="pr-keys"><li><i class="c-a"></i><b>Básicas:</b> el pago se refleja al instante.</li><li><i class="c-b"></i><b>Desempeño:</b> aprobar el crédito más rápido.</li><li><i class="c-c"></i><b>Encantadoras:</b> crédito preaprobado en un clic.</li></ul></div>`;

    // Cost of Delay
    const codD = `<div class="pr-chart"><svg viewBox="0 0 420 300" aria-hidden="true">
      <line class="pr-ax" x1="30" y1="270" x2="406" y2="270"/><line class="pr-ax" x1="30" y1="14" x2="30" y2="270"/>
      <text class="pr-axt" x="300" y="290">Tiempo →</text><text class="pr-axt" x="38" y="26">Valor perdido</text>
      <line class="pr-dl" x1="240" y1="20" x2="240" y2="270"/><text class="pr-axt pr-axt--m" x="246" y="44">Fecha normativa</text>
      <path class="pr-ln pr-ln--b" pathLength="1" d="M30 270 L 400 170"/>
      <path class="pr-ln pr-ln--c" pathLength="1" d="M30 270 L 240 262 L 240 60 L 400 52"/>
      <path class="pr-ln pr-ln--a" pathLength="1" d="M30 270 C 70 150, 110 70, 400 40"/>
    </svg>
    <ul class="pr-keys"><li><i class="c-b"></i><b>Estándar:</b> cada semana de espera cuesta lo mismo.</li><li><i class="c-c"></i><b>Fecha fija:</b> no cuesta nada hasta la fecha, luego todo.</li><li><i class="c-a"></i><b>Urgente:</b> el valor se pierde rápido, va primero.</li></ul></div>`;

    const methods = [
      ["RICE", "Puntaje por alcance e impacto", riceD, "Le doy a cada iniciativa un puntaje: a cuántos clientes llega, cuánto los mueve y qué tan seguros estamos, dividido por el esfuerzo.", "Backlog grande con datos de uso. Pone a todas las ideas bajo el mismo criterio y saca la discusión de las opiniones."],
      ["WSJF", "Costo de retraso ÷ tamaño", wsjfD, "Weighted Shortest Job First: sube lo que más cuesta aplazar y menos tarda en salir.", "Planeación por incrementos con varios equipos, proveedores y dependencias. Clave cuando hay normativa encima."],
      ["MoSCoW", "Alcance del MVP", mscD, "Separo lo que el producto debe tener para salir de lo que puede esperar.", "Releases con fecha fija y MVPs. Negocio y TI acuerdan alcance sin pelear cada historia."],
      ["Kano", "Qué espera y qué sorprende", kanoD, "Clasifico funcionalidades por cómo cambian la satisfacción del cliente.", "Discovery y diseño de propuesta de valor: evita invertir de más en lo básico y de menos en lo que diferencia."],
      ["Cost of Delay", "Cuánto cuesta esperar", codD, "Modelo cómo se pierde valor cada semana que algo no sale.", "Cuando hay fechas regulatorias o ventanas de mercado. Explica a comité por qué algo va antes."],
      ["Impacto / Esfuerzo", "Matriz con OKR", mxSvg, "Cada iniciativa se ubica por su impacto en los OKR contra el esfuerzo de construirla.", "Revisión rápida de roadmap con negocio. Saca los quick wins y deja claras las grandes apuestas."],
    ];
    const pri = `<div class="po-pri rv" data-pri>
      <div class="po-pri__nav" role="tablist">${methods.map(([t, s], k) => `<button type="button" role="tab" class="po-pri__tab${k ? "" : " is-on"}" data-k="${k}" aria-selected="${k ? "false" : "true"}"><span class="mono">${pad2(k + 1)}</span><strong>${t}</strong><small>${s}</small><i class="po-pri__prog"></i></button>`).join("")}</div>
      <div class="po-pri__stage">${methods.map(([t, s, d, what, when], k) => `<div class="po-pri__panel${k ? "" : " is-on"}" role="tabpanel" data-k="${k}">
        <div class="po-pri__viz">${d}</div>
        <div class="po-pri__txt"><p class="mono po-pri__kick">${pad2(k + 1)} / ${pad2(methods.length)}</p><h4>${t}</h4><p>${what}</p><p class="po-pri__when"><b class="mono">CUÁNDO LO USO</b>${when}</p></div>
      </div>`).join("")}</div>
      <p class="note">Ejemplos ilustrativos para mostrar cada método. No corresponden a un backlog real.</p>
    </div>`;

    const N = c.channels.length;
    const eco = `<div class="po-eco rv"><svg viewBox="0 0 600 600" aria-hidden="true">
      ${c.channels.map((ch, k) => { const a = (k / N) * Math.PI * 2 - Math.PI / 2; const x = 300 + Math.cos(a) * 225, y = 300 + Math.sin(a) * 225;
        return `<line class="po-eco__ln" x1="300" y1="300" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" style="--d:${k * 0.12}s"/>
          <g class="po-eco__n" style="--d:${0.4 + k * 0.12}s"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="46"/><text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle">${esc(ch)}</text></g>`; }).join("")}
      <circle class="po-eco__pulse" cx="300" cy="300" r="88"/>
      <circle class="po-eco__core" cx="300" cy="300" r="88"/>
      <text class="po-eco__ct" x="300" y="292" text-anchor="middle">Producto</text><text class="po-eco__ct" x="300" y="322" text-anchor="middle">financiero digital</text>
    </svg></div>`;

    const funnel = `<div class="po-funnel rv">${[["Visitas", 100], ["Registro", 72], ["Solicitud", 50], ["Aprobación", 34], ["Desembolso", 24]].map(([t, w], k) =>
      `<div class="po-funnel__row" style="--w:${w}%;--d:${k * 0.15}s"><i></i><span>${t}</span></div>`).join("")}
      <div class="po-funnel__badge"><strong>+60%</strong><span>conversión y adopción del canal digital (FNA)</span></div></div>`;

    const edu = `<div class="po-edu rv"><ul class="tl">${c.education.map(([a, b]) => `<li><time>EDUCACIÓN</time><div><strong>${esc(a)}</strong><span>${esc(b)}</span></div></li>`).join("")}</ul>
      <div class="po-certs">${c.certs.map((x) => `<span>${esc(x)}</span>`).join("")}</div></div>`;

    let k = 0;
    const S = (label, title, body, extra, band = "") => `<section class="sec st${band ? ` band ${band}` : ""}"><div class="sec__grid rv"><p class="sec__label"><b>${pad2(++k)}</b>${label}</p>
      <div class="sec__body"><h3 class="st-title">${title}</h3>${body ? `<p class="prose">${body}</p>` : ""}</div></div>${extra}</section>`;
    return hero +
      S("PERFIL", "Producto, negocio y tecnología en la misma mesa.", esc(c.summary), kpis) +
      S("PRIORIZACIÓN", "Priorizar es decidir qué no se hace.", "Uso varios métodos según el momento: datos para ordenar el backlog, costo de retraso cuando hay normativa encima y MoSCoW para cerrar el alcance de un MVP.", pri, "band--po2") +
      S("TRAYECTORIA", "Nueve años construyendo producto en banca y seguros.", "", tl) +
      S("MÉTODO", "Primero el problema correcto, luego la solución correcta.", "Design Thinking para descubrir y definir; ágil para desarrollar y entregar.", dd) +
      S("EJECUCIÓN ÁGIL", "Scrum, Kanban y ágil híbrido.", "Equipos multidisciplinarios entre negocio, TI y proveedores, entregando en ciclos cortos.", scrum) +
      S("ECOSISTEMA", "Un producto financiero toca muchas piezas.", "Coordino canales, tecnología, proveedores y negocio para que el producto llegue completo a producción.", eco) +
      S("CONVERSIÓN", "Optimizar el funnel con datos.", "Análisis del recorrido del cliente para quitar fricción en cada paso del canal digital.", funnel) +
      S("HERRAMIENTAS", "Cómo trabajo.", "", `<div class="chips rv" style="margin-top:28px">${c.tools.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div>`) +
      S("FORMACIÓN", "Formación y certificaciones.", "", edu) +
      sec(++k, "CONTACTO", `<div class="links">${bigLink("LinkedIn", SITE.links.linkedin, "Trayectoria completa")}${bigLink(SITE.email, `mailto:${SITE.email}`, "Email")}</div>`) +
      nextBlock(i) + footer();
  }

  let priTimer = 0;
  function initPri() {
    clearInterval(priTimer);
    const root = $("[data-pri]", dContent); if (!root) return;
    const tabs = $$(".po-pri__tab", root), panels = $$(".po-pri__panel", root);
    let cur = 0, auto = true;
    const go = (k) => { cur = k;
      tabs.forEach((t, j) => { t.classList.toggle("is-on", j === k); t.setAttribute("aria-selected", j === k); t.classList.remove("is-run"); });
      panels.forEach((p, j) => p.classList.toggle("is-on", j === k));
      if (auto) { void tabs[k].offsetWidth; tabs[k].classList.add("is-run"); }
      const nav = tabs[k].parentNode; nav.scrollTo({ left: tabs[k].offsetLeft - (nav.clientWidth - tabs[k].offsetWidth) / 2, behavior: "smooth" });
    };
    tabs.forEach((t, j) => t.addEventListener("click", () => { auto = false; clearInterval(priTimer); go(j); }));
    const io = new IntersectionObserver((es) => { if (!es[0].isIntersecting || !auto) return; io.disconnect(); go(0);
      priTimer = setInterval(() => { if (!auto || !root.isConnected) return clearInterval(priTimer); go((cur + 1) % tabs.length); }, 7000); }, { threshold: 0.35 });
    io.observe(root);
  }

  function runCounters() {
    const els = $$("[data-count]", dContent);
    const go = (el) => {
      const end = +el.dataset.count; delete el.dataset.count;
      if (reduced()) { el.textContent = end.toLocaleString("es-CO"); return; }
      const t0 = performance.now(), D = 1600;
      const f = (now) => { const p = Math.min(1, (now - t0) / D); el.textContent = Math.round(end * easeOut(p)).toLocaleString("es-CO"); if (p < 1) requestAnimationFrame(f); };
      el.textContent = "0"; requestAnimationFrame(f);
    };
    if (!("IntersectionObserver" in window)) return els.forEach(go);
    const ob = new IntersectionObserver((ens) => ens.forEach((en) => { if (en.isIntersecting) { go(en.target); ob.unobserve(en.target); } }), { root: dScroll, threshold: 0.5 });
    els.forEach((el) => ob.observe(el));
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
    const r = c.layout === "story" ? renderStory : { po: renderPO, about: renderAbout, contact: renderContact, archive: renderArchive, pending: renderPending }[c.kind] || renderProject;
    dContent.innerHTML = r(c, i);
    lazyDetail();
    setTimeout(runCounters, 50); if (c.kind === "po") initPri();
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

  dContent.addEventListener("play", (e) => {
    $$("video", dContent).forEach((v) => { if (v !== e.target && !v.paused) v.pause(); });
  }, true);

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
