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
      .map((ch, i) => `<span class="ch" style="transition-delay:${base + i * 45}ms">${ch}</span>`)
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
      style: `--mbg:${k.bg || c.color};--fit:${fit};--pos:${pos}`
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
      return `<div class="cf cf--type">${ticks}
        <div class="cf__top"><span class="cf__num">Nº ${esc(c.number)}</span><span>${esc(c.category)}</span></div>
        <span class="cf__redbar"></span>
        <span class="cf__mono-big cf__plate">J<span style="color:transparent;-webkit-text-stroke:1.2px var(--ink)">V</span><sup>®</sup></span>
        <div class="cf__plate"><span class="cf__title">${esc(c.title)}</span><div class="cf__bot"><span>JHON VALENCIA</span><span>BOG</span></div></div>
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
      return `<div class="cf cf--type">${ticks}
        <div class="cf__top"><span class="cf__num">Nº ${esc(c.number)}</span><span>${esc(c.year)}</span></div>
        <span class="cf__big" style="font-size:calc(var(--card-w)*.19)">THE<br><span class="o">ARCHIVE</span><br>15+ YRS</span>
        <div><span class="cf__title" style="font-size:calc(var(--card-w)*.09)">BEHANCE ↗</span>${bot}</div>
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

    if (tweens.size || S.dragging || S.pos !== S.target) raf = requestAnimationFrame(tick);
    else raf = 0;
  }
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
    S.target += wrapOffset(i, S.target);
    kick();
  }
  function step(d) {
    S.target = Math.round(S.target) + d;
    kick();
  }

  /* ------------------------------------------------------------ hover + tilt */
  if (mqHover.matches) {
    slots.forEach((slot, i) => {
      slot.addEventListener("pointerenter", () => {
        if (!S.ready || S.dragging || S.busy) return;
        S.hover = i; slot.classList.add("is-hover"); layout();
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
  addEventListener("wheel", (e) => {
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
  function makeFlyer(i, rect) {
    const c = DECK[i];
    const m = mediaAttrs(c, "hero");
    m.src = c.card && c.card.src;
    const f = document.createElement("div");
    f.className = "flyer";
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

  async function openCard(i, { animate = true } = {}) {
    if (S.busy || S.open >= 0) return;
    const c = DECK[i];
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

  function hideDetail() {
    detail.hidden = true;
    detail.classList.remove("is-in");
    body.classList.remove("is-detail");
    S.open = -1;
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
    return `<section class="p-hero" data-fit="${m.fit}" style="${m.style}">
      <div class="p-hero__media" data-fit="${m.fit}"${m.blend} ${m.fit === "cover" ? `style="background-image:url('${esc(k.src)}')"` : ""}>
        <img src="${esc(m.src)}" alt="${esc(c.title)} — portada" fetchpriority="high" decoding="async">
      </div>
      <div class="p-hero__shade"></div>
      <div class="p-hero__cap">
        <h2 class="p-hero__title" id="detail-title">${words(c.title)}</h2>
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
      .map((g, k) => `<figure class="g g--${g.span || "half"} reveal" style="aspect-ratio:${g.w}/${g.h}">
          <img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" decoding="async" width="${g.w}" height="${g.h}" data-lb>
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


  /* ---- caso narrativo (layout: "story") */
  function figs(items, startK) {
    return `<div class="gallery">${items.map((g, k) => `<figure class="g g--${g.span || "half"} reveal" style="aspect-ratio:${g.w}/${g.h}">
        <img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" decoding="async" width="${g.w}" height="${g.h}" data-lb>
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
      extra = `<div class="ident rv">
          <figure class="g ident__logo" style="aspect-ratio:${b.image.w}/${b.image.h}"><img src="${esc(b.image.src)}" alt="${esc(b.image.alt)}" loading="lazy" data-lb></figure>
          <div class="ident__pal">${b.palette.map(([nm, hex]) => `<div class="sw" style="--sw:${hex}"><span>${esc(nm)}</span><code>${esc(hex)}</code></div>`).join("")}</div></div>`;
    } else if (b.type === "steps") {
      extra = `<ol class="steps rv">${b.steps.map(([t, d], k) => `<li><span class="steps__n">${pad2(k + 1)}</span><strong>${esc(t)}</strong><p>${esc(d)}</p></li>`).join("")}</ol>`;
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
    return heroType(c, "THE", "CREATOR") +
      sec(1, "PROFILE", `<p class="lead">${esc(ABOUT.lead)}</p><div style="height:28px"></div>${ABOUT.bio.map((p) => `<p class="prose">${esc(p)}</p>`).join("")}
        <dl class="facts"><div><dt>BASE</dt><dd>Bogotá, Colombia</dd></div><div><dt>EXPERIENCE</dt><dd>15+ años</dd></div><div><dt>FOCUS</dt><dd>Marca · Producto · Innovación</dd></div></dl>`) +
      sec(2, "EXPERIENCE", `<ul class="tl">${tl}</ul>`) +
      sec(3, "EDUCATION & CERTS", `<ul class="list">${ABOUT.education.map((e, k) => `<li><span>${pad2(k + 1)}</span>${esc(e)}</li>`).join("")}</ul>`) +
      sec(4, "CAPABILITIES", `<div class="chips">${ABOUT.skills.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>`) +
      sec(5, "ELSEWHERE", `<div class="links">${bigLink("Behance", SITE.links.behance, "Archivo creativo")}${bigLink("LinkedIn", SITE.links.linkedin, "Trayectoria")}${bigLink("GitHub", SITE.links.github, "Código")}</div>`) +
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
    return heroType(c, "CREATIVE", "ARCHIVE") +
      sec(1, "OVERVIEW", `<p class="lead">${esc(c.lead)}</p><div style="height:24px"></div><p class="prose">${esc(c.context)}</p>`) +
      sec(2, "OPEN THE ARCHIVE", `<div class="links">${c.links.map((l) => bigLink(l.label, l.url, "behance.net/jhxnvale")).join("")}</div>`) +
      nextBlock(i) + footer();
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
    $("#d-count").textContent = `${pad2(i + 1)} / ${pad2(N)}`;
    document.title = `${c.title} — JV · The Creative Deck`;
  }

  dContent.addEventListener("click", (e) => {
    if (e.target.closest("[data-next]")) return swapDetail(S.open + 1);
    const img = e.target.closest(".g, .duo__img");
    if (img) {
      const el = img.querySelector("[data-lb]");
      const k = lbItems().indexOf(el);
      if (k >= 0) openLightbox(k);
    }
  });
  $("#back").addEventListener("click", () => goHome());
  $("#d-prev").addEventListener("click", () => swapDetail(S.open - 1));
  $("#d-next").addEventListener("click", () => swapDetail(S.open + 1));

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
    const g = { src: items[lbK].currentSrc || items[lbK].src, alt: items[lbK].alt };
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
    if (S.open >= 0) {
      if (e.key === "Escape") { e.preventDefault(); goHome(); }
      else if (e.key === "ArrowLeft" && !isTyping(e)) swapDetail(S.open - 1);
      else if (e.key === "ArrowRight" && !isTyping(e)) swapDetail(S.open + 1);
      return;
    }
    if (!S.ready) return;
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
     RUTAS (hash → compatible con GitHub Pages)
     ================================================================ */
  const routeId = () => {
    const m = location.hash.match(/^#\/p\/([\w-]+)/);
    return m ? m[1] : null;
  };
  const indexOfId = (id) => DECK.findIndex((c) => c.id === id);
  let silentHash = false;
  function setHash(id) {
    const h = id ? `#/p/${id}` : "#/";
    if (location.hash !== h) { silentHash = true; location.hash = h; }
  }
  function goHome() { setHash(null); closeDetail(); }

  function syncRoute() {
    if (S.busy) return;
    const id = routeId();
    const i = id ? indexOfId(id) : -1;
    if (i >= 0) {
      if (S.open < 0) openCard(i);
      else if (S.open !== i) swapDetail(i);
    } else if (S.open >= 0) {
      closeDetail();
    }
    $$(".topbar__nav a").forEach((a) => {
      const n = a.dataset.nav;
      a.toggleAttribute("aria-current", (n === "work" && !id) || n === id);
      if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page");
    });
    if (!id) document.title = "JV — The Creative Deck · Jhon Valencia Santana";
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
  const startId = routeId();
  const startIdx = startId ? indexOfId(startId) : -1;
  if (startIdx >= 0) {
    // enlace directo a un proyecto: sin intro
    S.pos = S.target = startIdx;
    finishIntro(false);
    syncActive();
    openCard(startIdx, { animate: false });
  } else {
    // arranca con la carta 01 al centro
    S.pos = S.target = Math.min(1, N - 1);
    runIntro().then(() => syncRoute());
  }
})();
