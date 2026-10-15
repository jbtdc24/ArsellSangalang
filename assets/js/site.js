(function () {
  'use strict';
  var S = window.SITE;
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var parse = function (ym) { var p = ym.split('-'); return { y: +p[0], m: +p[1] - 1 }; };
  var fmt = function (ym) { var d = parse(ym); return MONTHS[d.m] + ' ' + d.y; };
  var now = new Date();
  var nowIdx = now.getFullYear() * 12 + now.getMonth();
  var idx = function (ym) { if (!ym) return nowIdx; var d = parse(ym); return d.y * 12 + d.m; };
  var span = function (a, b) {
    var n = idx(b) - idx(a) + 1, y = Math.floor(n / 12), m = n % 12, out = [];
    if (y) out.push(y + (y > 1 ? ' yrs' : ' yr'));
    if (m) out.push(m + (m > 1 ? ' mos' : ' mo'));
    return out.join(' ');
  };

  /* ---------- simple text ---------- */
  $('intro').textContent = S.intro;
  $('where').textContent = 'Based in ' + S.location;
  $('foot-name').textContent = '© ' + now.getFullYear() + ' ' + S.name;
  $('hero-linkedin').href = S.linkedin;
  $('contact-linkedin').href = S.linkedin;
  if (S.email) {
    var mail = el('a', 'btn btn-ghost-light', 'Email ' + esc(S.email));
    mail.href = 'mailto:' + S.email;
    $('contact-actions').appendChild(mail);
  }

  /* ---------- 96-well plate ---------- */
  // Initials drawn on rows B–G. "#" = filled well.
  var ART = [
    '............',
    '..###...###.',
    '.#...#.#....',
    '.#...#.#....',
    '.#####..##..',
    '.#...#....#.',
    '.#...#.###..',
    '............'
  ];
  var plate = $('plate'), wells = [];
  plate.appendChild(el('span', 'lab'));
  for (var c = 1; c <= 12; c++) plate.appendChild(el('span', 'lab col', c));
  for (var r = 0; r < 8; r++) {
    plate.appendChild(el('span', 'lab row', 'ABCDEFGH'[r]));
    for (var k = 0; k < 12; k++) {
      var w = el('span', 'well');
      w.dataset.c = k; w.dataset.r = r;
      w.dataset.on = ART[r][k] === '#' ? '1' : '';
      plate.appendChild(w); wells.push(w);
    }
  }
  function fill() {
    wells.forEach(function (w) {
      if (!w.dataset.on) return;
      if (reduce) { w.classList.add('on'); return; }
      // pipette across the plate column by column, like a multichannel
      setTimeout(function () { w.classList.add('on'); }, 500 + (+w.dataset.c) * 90 + (+w.dataset.r) * 18);
    });
  }
  function drop(w) {
    if (w.classList.contains('drop')) return;
    w.classList.add('drop');
    setTimeout(function () { w.classList.remove('drop'); }, 420);
  }
  plate.addEventListener('pointerover', function (e) { if (e.target.classList.contains('well')) drop(e.target); });
  plate.addEventListener('pointerdown', function (e) { if (e.target.classList.contains('well')) drop(e.target); });

  /* ---------- gantt ---------- */
  var exp = S.experience.slice();
  var startY = Math.min.apply(null, exp.map(function (e) { return parse(e.start).y; }));
  var endY = now.getFullYear();
  var g0 = startY * 12, g1 = (endY + 1) * 12;           // whole years on the axis
  var pct = function (i) { return ((i - g0) / (g1 - g0)) * 100; };
  var gantt = $('gantt');
  var grid = el('div', 'g-grid'), rows = el('div', 'g-rows'), axis = el('div', 'g-axis');
  for (var y = startY; y <= endY + 1; y++) {
    var gi = el('i'); gi.style.left = pct(y * 12) + '%'; grid.appendChild(gi);
    if (y <= endY) { var t = el('span', '', y); t.style.left = pct(y * 12 + 6) + '%'; axis.appendChild(t); }
  }
  var over = el('div', 'g-grid g-over'), today = el('i', 'g-today'); today.style.left = pct(nowIdx + 1) + '%'; over.appendChild(today);
  exp.sort(function (a, b) { return idx(a.start) - idx(b.start); });
  var bars = [];
  exp.forEach(function (e) {
    var row = el('div', 'g-row');
    var bar = el('div', 'g-bar' + (e.type === 'Part-time' ? ' part' : '') + (e.end ? '' : ' open'));
    bar.style.left = pct(idx(e.start)) + '%';
    bar.style.width = (pct(idx(e.end) + 1) - pct(idx(e.start))) + '%';
    bar.innerHTML = esc(e.company) + ' <small>' + span(e.start, e.end) + '</small>';
    bar.dataset.co = e.company; bar.dataset.len = span(e.start, e.end);
    bar.title = e.role + ', ' + e.company;
    row.appendChild(bar); rows.appendChild(row); bars.push(bar);
  });
  gantt.appendChild(grid); gantt.appendChild(rows); gantt.appendChild(over); gantt.appendChild(axis);
  var legend = el('div', 'g-legend', '<span><i></i>Full-time</span><span><i class="part"></i>Part-time</span><span><i class="today"></i>Today</span>');
  gantt.appendChild(legend);

  // A label that doesn't fit inside its bar sits beside it instead.
  function fitLabels() {
    bars.forEach(function (b) {
      var lab = b.nextElementSibling;
      if (!lab || !lab.classList.contains('g-out')) { lab = el('span', 'g-out'); b.after(lab); }
      b.classList.remove('tight'); lab.textContent = '';
      if (b.scrollWidth > b.clientWidth + 1) {
        b.classList.add('tight');
        lab.textContent = window.innerWidth < 560 ? b.dataset.co : b.dataset.co + ', ' + b.dataset.len;
        var leftSide = parseFloat(b.style.left) > 50;
        lab.className = 'g-out ' + (leftSide ? 'to-left' : 'to-right');
        lab.style.left = leftSide ? '' : 'calc(' + b.style.left + ' + ' + b.style.width + ' + 12px)';
        lab.style.right = leftSide ? 'calc(' + (100 - parseFloat(b.style.left)) + '% + 12px)' : '';
      }
    });
  }
  fitLabels();
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(fitLabels, 120); });

  /* ---------- role list ---------- */
  var list = $('roles');
  exp.slice().reverse().sort(function (a, b) { return (b.end ? idx(b.end) : 1e9) - (a.end ? idx(a.end) : 1e9) || idx(b.start) - idx(a.start); })
    .forEach(function (e) {
      var li = el('li', 'role');
      li.innerHTML =
        '<div><h3>' + esc(e.role) + '</h3>' +
        '<p class="co">' + esc(e.company) + ', ' + esc(e.type.toLowerCase()) + (e.place ? ' in ' + esc(e.place) : '') + '</p>' +
        '<p class="when">' + fmt(e.start) + ' to ' + (e.end ? fmt(e.end) : 'today') + ' (' + span(e.start, e.end) + ')</p></div>' +
        '<p class="desc">' + esc(e.text) + '</p>';
      list.appendChild(li);
    });

  /* ---------- strengths ---------- */
  var sl = $('strength-list');
  S.strengths.forEach(function (s) {
    var d = el('div', 'strength');
    d.innerHTML = '<span class="dot" aria-hidden="true"></span><div><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div>';
    sl.appendChild(d);
  });

  /* ---------- certifications ---------- */
  var cl = $('cert-list');
  var seal = '<svg viewBox="0 0 20 20" fill="none" stroke="#5A3FC8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 10.5l3.2 3.2L15 7"/></svg>';
  S.certifications.slice().sort(function (a, b) { return idx(b.date) - idx(a.date); }).forEach(function (c) {
    var li = el('li', 'cert');
    li.innerHTML = '<span class="seal">' + seal + '</span><div><b>' + esc(c.name) + '</b><span>' + esc(c.issuer) + ', ' + fmt(c.date) + '</span></div>';
    cl.appendChild(li);
  });

  /* ---------- top bar + reveal ---------- */
  var top = document.querySelector('.top');
  var onScroll = function () { top.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.35 });
    io.observe(gantt);
  } else gantt.classList.add('in');

  var start = function () { requestAnimationFrame(function () { doc.classList.add('ready'); fill(); }); };
  if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 1200); })]).then(start);
  else start();
})();
