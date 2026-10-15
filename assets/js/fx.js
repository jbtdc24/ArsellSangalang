/* Motion layer: cursor, hero card tilt, reveals, process track, contact grid. */
(function () {
  'use strict';
  var S = window.SITE;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999, in: false };
  window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; mouse.in = true; }, { passive: true });
  document.addEventListener('pointerleave', function () { mouse.in = false; mouse.x = mouse.y = -9999; });

  /* ---------- split the name into letters ---------- */
  var nm = document.querySelector('.name');
  if (nm) {
    var n = 0;
    [].forEach.call(nm.children, function (line) {
      line.classList.add('line');
      var t = line.textContent; line.textContent = '';
      for (var i = 0; i < t.length; i++) {
        var ch = document.createElement('span'); ch.className = 'ch'; ch.textContent = t[i];
        ch.style.transitionDelay = (0.05 + n++ * 0.035) + 's';
        line.appendChild(ch);
      }
    });
  }

  /* ---------- headings: wrap for the mask wipe ---------- */
  [].forEach.call(document.querySelectorAll('.block-head h2, .contact h2'), function (h) {
    h.innerHTML = '<span class="mask"><span class="inner">' + h.innerHTML + '</span></span>';
    h.classList.add('rv');
  });

  /* ---------- process track ---------- */
  var track = $('flow-track');
  S.process.forEach(function (p, i) {
    var li = document.createElement('li'); li.className = 'step';
    li.innerHTML = '<span class="step-n">' + (i + 1) + '</span><h3>' + p.title + '</h3><p>' + p.text + '</p>';
    track.appendChild(li);
  });
  var steps = [].slice.call(track.children);

  /* ---------- staggered reveals ---------- */
  var groups = [
    ['#roles .role', 0.1], ['#strength-list .strength', 0.12], ['#cert-list .cert', 0.07], ['.block-sub', 0], ['.contact p, .contact .hero-actions', 0.12]
  ];
  groups.forEach(function (g) {
    [].forEach.call(document.querySelectorAll(g[0]), function (e, i) { e.classList.add('rv'); e.style.setProperty('--d', (i * g[1]) + 's'); });
  });
  var rvs = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
    [].forEach.call(rvs, function (e) { io.observe(e); });
  } else [].forEach.call(rvs, function (e) { e.classList.add('in'); });

  if (reduce) { document.documentElement.classList.add('still'); return; }

  /* ---------- cursor ---------- */
  var cur = $('cursor');
  if (fine) {
    document.documentElement.classList.add('has-cursor');
    document.addEventListener('pointerover', function (e) {
      var hot = e.target.closest && e.target.closest('a, button, .deal, .step');
      cur.classList.toggle('hot', !!hot);
    });
    document.addEventListener('pointerdown', function () { cur.classList.add('press'); });
    document.addEventListener('pointerup', function () { cur.classList.remove('press'); });
  }

  /* ---------- magnetic buttons ---------- */
  var mags = fine ? [].slice.call(document.querySelectorAll('.btn, .top nav .nav-cta')) : [];
  mags.forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px)';
    });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });

  /* ---------- hero card: tilt toward the cursor ---------- */
  var plate = window.PLATE.el, hero = document.querySelector('.hero');
  var tilt = { x: 0, y: 0, tx: 0, ty: 0 };
  function measure() {}
  hero.addEventListener('pointermove', function (e) {
    var r = plate.getBoundingClientRect();
    tilt.ty = clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1) * 8;
    tilt.tx = clamp(-(e.clientY - (r.top + r.height / 2)) / r.height, -1, 1) * 6;
  });
  hero.addEventListener('pointerleave', function () { tilt.tx = tilt.ty = 0; });
  function glow() {}

  /* ---------- process track (pinned horizontal scroll) ---------- */
  var flow = $('process'), fill = $('flow-fill'), dropEl = $('flow-drop');
  var flowMax = 0, pinned = false;
  function sizeFlow() {
    pinned = innerWidth > 900;
    flow.classList.toggle('pinned', pinned);
    if (pinned) {
      flowMax = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      flow.style.height = (innerHeight + flowMax + innerHeight * 0.35) + 'px';
    } else { flow.style.height = ''; track.style.transform = ''; }
  }
  function updFlow() {
    var r = flow.getBoundingClientRect();
    var span = pinned ? (flow.offsetHeight - innerHeight) : (r.height + innerHeight * 0.3);
    var p = pinned ? clamp(-r.top / span, 0, 1) : clamp((innerHeight * 0.75 - r.top) / span, 0, 1);
    if (pinned) track.style.transform = 'translate3d(' + (-flowMax * clamp(p * 1.12, 0, 1)).toFixed(1) + 'px,0,0)';
    fill.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    dropEl.style.left = (p * 100).toFixed(2) + '%';
    var k = Math.min(steps.length - 1, Math.floor(p * steps.length * 1.02));
    steps.forEach(function (s, i) { s.classList.toggle('lit', i <= k && p > 0.02); });
  }

  /* ---------- contact: glowing dot grid ---------- */
  var cf = $('contact-fx'), cg = cf.getContext('2d'), contact = cf.parentElement, cW, cH, cOn = false;
  function sizeContact() { cW = contact.clientWidth; cH = contact.clientHeight; cf.width = cW * DPR; cf.height = cH * DPR; cg.setTransform(DPR, 0, 0, DPR, 0, 0); }
  function drawContact(t) {
    cg.clearRect(0, 0, cW, cH);
    var r = contact.getBoundingClientRect(), mx = mouse.x - r.left, my = mouse.y - r.top;
    var gap = cW < 600 ? 22 : 30, rad = gap * 0.28;
    for (var y = gap / 2; y < cH; y += gap) for (var x = gap / 2; x < cW; x += gap) {
      var wave = 0.5 + 0.5 * Math.sin(x * 0.012 + y * 0.008 - t / 700);
      var d = Math.hypot(mx - x, my - y), h = clamp(1 - d / 170, 0, 1);
      var a = 0.05 + wave * 0.05 + h * 0.5;
      cg.fillStyle = h > 0.02 ? 'rgba(' + Math.round(lerp(212, 120, h)) + ',' + Math.round(lerp(146, 66, h)) + ',' + Math.round(lerp(74, 30, h)) + ',' + (a + 0.1).toFixed(3) + ')' : 'rgba(42,28,21,' + a.toFixed(3) + ')';
      cg.beginPath(); cg.arc(x, y, rad * (1 + h * 0.5), 0, 6.283); cg.fill();
    }
  }
  new IntersectionObserver(function (es) { cOn = es[0].isIntersecting; }).observe(contact);

  /* ---------- scroll + resize ---------- */
  var prog = $('progress');
  function onScroll() {
    var max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0).toFixed(4) + ')';
    updFlow();
  }
  function onResize() { sizeFlow(); sizeContact(); measure(); onScroll(); }
  window.addEventListener('scroll', onScroll, { passive: true });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(onResize, 120); });
  onResize();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize);
  setTimeout(measure, 1500);

  /* ---------- loop ---------- */
  var heroOn = true;
  new IntersectionObserver(function (es) { heroOn = es[0].isIntersecting; }).observe(hero);
  function loop(t) {
    if (!document.hidden) {
      if (fine) {
        mouse.sx = lerp(mouse.sx < -999 ? mouse.x : mouse.sx, mouse.x, 0.2);
        mouse.sy = lerp(mouse.sy < -999 ? mouse.y : mouse.sy, mouse.y, 0.2);
        cur.style.transform = 'translate3d(' + mouse.sx.toFixed(1) + 'px,' + mouse.sy.toFixed(1) + 'px,0)';
        cur.style.opacity = mouse.in ? 1 : 0;
      }
      if (heroOn) {
        tilt.x = lerp(tilt.x, tilt.tx, 0.08); tilt.y = lerp(tilt.y, tilt.ty, 0.08);
        plate.style.transform = 'rotateX(' + tilt.x.toFixed(2) + 'deg) rotateY(' + tilt.y.toFixed(2) + 'deg)';
        glow();
      }
      if (cOn) drawContact(t);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
