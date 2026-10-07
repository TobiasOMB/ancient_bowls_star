/* ============================================================
   ANCIENT BOWLS – Logik & Interaktionen
   Liest alle Inhalte aus content/content.js und baut die Seite.
   Du musst hier normalerweise nichts ändern.
   ============================================================ */
(function () {
  'use strict';

  var C = window.SITE_CONTENT || {};
  var TZ = 'Europe/Berlin';
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var EASE = 'cubic-bezier(.22,.8,.24,1)';

  /* ---------- Icons ---------- */
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor"/></svg>',
    twitch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h15v10.5L16 17.5h-4L9 20.5v-3H5z"/><path d="M12 7.5v4M16 7.5v4"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6.2C9.3 5.7 10.6 5.5 12 5.5s2.7.2 4 .7c1.9 2.8 2.9 5.9 3 9.3-1.4 1.1-2.9 1.8-4.4 2.3l-1-1.7M8 6.2C6.1 9 5.1 12.1 5 15.5c1.4 1.1 2.9 1.8 4.4 2.3l1-1.7"/><circle cx="9.2" cy="12" r="1.2"/><circle cx="14.8" cy="12" r="1.2"/><path d="M8.5 15c2.2.9 4.8.9 7 0"/></svg>',
    photos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="10.5" r="1.6"/><path d="M21 16l-5-5-8 8"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z"/></svg>'
  };

  var STATUS = {
    verfuegbar: { label: 'Verfügbar', cls: 'badge-verfuegbar' },
    bald:       { label: 'Bald verfügbar', cls: 'badge-bald' },
    vergeben:   { label: 'Vergeben', cls: 'badge-vergeben' }
  };

  /* ---------- Helfer ---------- */
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }
  function safeUrl(u) {
    u = u || '';
    return (/^(https?:|mailto:|tel:|#|\.{0,2}\/)/i.test(u) || /^[\w\-./]+\.(html|pdf)$/i.test(u)) ? u : '#';
  }
  function el(tag, props, kids) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      var v = props[k];
      if (v == null || v === false) return;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'icon') n.innerHTML = v; // nur interne Icons
      else n.setAttribute(k, v);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function img(src, alt) {
    var i = el('img', { src: src, alt: alt || '', loading: 'lazy', decoding: 'async' });
    i.addEventListener('error', function () { i.style.visibility = 'hidden'; });
    return i;
  }
  function imageList(o) {
    var list = Array.isArray(o.images) ? o.images.slice() : [];
    if (!list.length && o.image) list.push(o.image);
    return list.filter(Boolean);
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function bindText() {
    qsa('[data-text]').forEach(function (n) {
      var v = get(n.getAttribute('data-text'));
      if (typeof v === 'string') n.textContent = v;
    });
    if (C.meta && C.meta.title) document.title = C.meta.title;
  }

  /* ---------- Datum ---------- */
  var DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
  function parseDate(s) {
    if (!s) return null;
    var t = String(s).trim();
    if (DATE_ONLY.test(t)) t += 'T00:00:00';
    var d = new Date(t);
    return isNaN(d.getTime()) ? null : d;
  }
  function fmt(s, opts) {
    var d = parseDate(s);
    if (!d) return '';
    var o = Object.assign({}, opts);
    if (!DATE_ONLY.test(String(s).trim())) o.timeZone = TZ;
    return new Intl.DateTimeFormat('de-DE', o).format(d);
  }
  var F_FULL = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  var F_FULL_TIME = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  function hasTime(s) { return !DATE_ONLY.test(String(s || '').trim()); }

  /* ---------- Countdown mit Roll-Animation ---------- */
  var tickers = [];
  function onTick(fn) { tickers.push(fn); fn(Date.now()); }
  setInterval(function () { var n = Date.now(); tickers.forEach(function (f) { f(n); }); }, 1000);

  function countdown() {
    var units = ['Tage', 'Std.', 'Min.', 'Sek.'];
    var nums = units.map(function () { return el('span', { class: 'cd-num', text: '00' }); });
    var cells = units.map(function (u, i) {
      return el('div', { class: 'cd-cell' }, [nums[i], el('span', { class: 'cd-unit', text: u })]);
    });
    var box = el('div', { class: 'countdown', role: 'timer', 'aria-live': 'off' }, cells);
    function pad(n) { return n < 10 ? '0' + n : String(n); }
    function setNum(n, txt) {
      if (n.textContent === txt) return;
      n.textContent = txt;
      if (REDUCE) return;
      n.classList.remove('roll'); void n.offsetWidth; n.classList.add('roll');
    }
    return {
      el: box,
      set: function (ms) {
        var s = Math.max(0, Math.floor(ms / 1000));
        var v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
        v.forEach(function (x, i) { setNum(nums[i], pad(x)); });
        box.setAttribute('aria-label', v[0] + ' Tage, ' + v[1] + ' Stunden, ' + v[2] + ' Minuten');
      }
    };
  }

  /* ---------- Hero-Titel, Menü, Eyebrows, Socials ---------- */
  function buildHeroTitle() {
    var h = document.getElementById('hero-title');
    var t = ((C.hero && C.hero.title) || 'Ancient Bowls').trim();
    var parts = t.split(/\s+/);
    var a = parts.shift(), b = parts.join(' ');
    h.setAttribute('aria-label', t);
    [a, b].filter(Boolean).forEach(function (w) {
      h.appendChild(el('span', { class: 'ht-line', 'aria-hidden': 'true' }, [el('span', { class: 'ht-in', text: w })]));
    });
  }

  function two(n) { return n < 10 ? '0' + n : String(n); }

  function renderNav() {
    var list = document.getElementById('menu-list');
    (C.nav || []).forEach(function (item, i) {
      list.appendChild(el('li', {}, [el('a', { href: '#' + item.id, 'data-target': item.id }, [
        el('span', { class: 'ml-n', text: two(i + 1) }),
        el('span', { class: 'ml-t', style: '--i:' + i, text: item.label })
      ])]));
    });
    qsa('[data-nav]').forEach(function (e) {
      var id = e.getAttribute('data-nav');
      (C.nav || []).forEach(function (item, i) {
        if (item.id === id) { e.appendChild(el('b', { text: two(i + 1) })); e.appendChild(el('span', { text: item.label })); }
      });
    });
  }

  function renderSocial() {
    var menuBox = document.getElementById('menu-social');
    var footBox = document.getElementById('footer-social');
    (C.social || []).forEach(function (s) {
      var icon = ICONS[s.icon] || '';
      menuBox.appendChild(el('a', { class: 'icon-btn', href: safeUrl(s.url), target: '_blank', rel: 'noopener', 'aria-label': s.name, title: s.name, icon: icon }));
      var a = el('a', { href: safeUrl(s.url), target: '_blank', rel: 'noopener' });
      a.innerHTML = icon;
      a.appendChild(el('span', { text: s.name }));
      footBox.appendChild(el('li', {}, [a]));
    });
    var links = document.getElementById('footer-links');
    ((C.footer && C.footer.links) || []).forEach(function (l) {
      links.appendChild(el('li', {}, [el('a', { href: safeUrl(l.href), text: l.label })]));
    });
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  /* ---------- Lightbox / Galerie ---------- */
  var LB = (function () {
    var root, stage, image, title, thumbs, btnClose, btnPrev, btnNext;
    var list = [], idx = 0, heading = '', opener = null, startX = null;

    function build() {
      if (root) return;
      image = el('img', { alt: '' });
      btnPrev = el('button', { class: 'lb-btn lb-prev', type: 'button', 'aria-label': 'Vorheriges Bild', icon: ICONS.prev });
      btnNext = el('button', { class: 'lb-btn lb-next', type: 'button', 'aria-label': 'Nächstes Bild', icon: ICONS.next });
      stage = el('div', { class: 'lb-stage' }, [image, btnPrev, btnNext]);
      title = el('div', { class: 'lb-title' });
      btnClose = el('button', { class: 'lb-btn', type: 'button', 'aria-label': 'Galerie schließen', icon: ICONS.close });
      thumbs = el('div', { class: 'lb-thumbs' });
      root = el('div', { class: 'lb', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Bildergalerie', hidden: '' }, [
        el('div', { class: 'lb-bar' }, [title, btnClose]), stage, thumbs
      ]);
      document.body.appendChild(root);

      btnClose.addEventListener('click', close);
      btnPrev.addEventListener('click', function () { show(idx - 1, -1); });
      btnNext.addEventListener('click', function () { show(idx + 1, 1); });
      root.addEventListener('click', function (e) { if (e.target === root || e.target === stage) close(); });
      document.addEventListener('keydown', function (e) {
        if (root.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') show(idx - 1, -1);
        else if (e.key === 'ArrowRight') show(idx + 1, 1);
        else if (e.key === 'Tab') {
          var vis = qsa('button', root).filter(function (b) { return b.offsetParent !== null; });
          if (!vis.length) return;
          var first = vis[0], last = vis[vis.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
      stage.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
      stage.addEventListener('touchend', function (e) {
        if (startX == null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        startX = null;
      });
    }

    function show(i, dir) {
      idx = (i + list.length) % list.length;
      image.src = list[idx];
      image.alt = heading + ', Bild ' + (idx + 1) + ' von ' + list.length;
      image.className = '';
      if (dir) { void image.offsetWidth; image.className = dir > 0 ? 'go-next' : 'go-prev'; }
      title.textContent = '';
      title.appendChild(document.createTextNode(heading));
      if (list.length > 1) title.appendChild(el('small', { text: 'Bild ' + (idx + 1) + ' von ' + list.length }));
      Array.prototype.forEach.call(thumbs.children, function (t, n) {
        if (n === idx) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
      });
    }

    function open(images, start, head, from) {
      if (!images || !images.length) return;
      build();
      list = images; heading = head || ''; opener = from || document.activeElement;
      root.classList.toggle('lb-single', list.length < 2);
      thumbs.textContent = '';
      list.forEach(function (src, n) {
        var b = el('button', { class: 'lb-thumb', type: 'button', 'aria-label': 'Bild ' + (n + 1) + ' anzeigen' }, [img(src, '')]);
        b.addEventListener('click', function () { show(n, n > idx ? 1 : -1); });
        thumbs.appendChild(b);
      });
      root.hidden = false;
      document.body.classList.add('lb-open');
      show(start || 0);
      btnClose.focus();
    }
    function close() {
      if (!root || root.hidden) return;
      root.hidden = true;
      document.body.classList.remove('lb-open');
      if (opener && opener.focus) opener.focus();
    }
    return { open: open, close: close };
  })();

  /* ---------- Kollektion ---------- */
  function renderCollection() {
    var grid = document.getElementById('pieces');
    ((C.collection && C.collection.items) || []).forEach(function (it, n) {
      var st = STATUS[it.status] || STATUS.verfuegbar;
      var imgs = imageList(it);
      var many = imgs.length > 1;
      var media = el('button', {
        class: 'piece-media', type: 'button', 
        'aria-label': it.name + ': ' + (many ? imgs.length + ' Fotos ansehen' : 'Foto vergrößern')
      }, [
        imgs[0] ? img(imgs[0], '') : null,
        el('span', { class: 'badge ' + st.cls, text: st.label }),
        many ? el('span', { class: 'count-badge', icon: ICONS.photos + '<span>' + imgs.length + '</span>' }) : null
      ]);
      media.addEventListener('click', function () { LB.open(imgs, 0, it.name, media); });

      var foot = null;
      if (it.price || it.link) {
        foot = el('div', { class: 'piece-foot' }, [
          it.price ? el('span', { class: 'piece-price', text: it.price }) : null,
          it.link ? el('a', {
            class: 'link', href: safeUrl(it.link), text: it.linkLabel || 'Anfragen',
            target: /^https?:/i.test(it.link) ? '_blank' : null, rel: 'noopener',
            'aria-label': (it.linkLabel || 'Anfragen') + ': ' + it.name
          }) : null
        ]);
      }
      var body = el('div', { class: 'piece-body', 'data-reveal': '', style: '--d:.15s' }, [
        el('h3', { text: it.name }),
        el('p', { class: 'piece-meta', text: [it.material, it.detail].filter(Boolean).join('. ') }),
        foot
      ]);
      grid.appendChild(el('article', { class: 'piece' + (it.status === 'vergeben' ? ' is-sold' : '') }, [
        el('div', { class: 'piece-frame', 'data-reveal': 'img', style: '--d:' + ((n % 3) * 0.12).toFixed(2) + 's' }, [media]),
        body
      ]));
    });
  }

  /* ---------- Limited Edition ---------- */
  function renderLimited() {
    var L = C.limited || {};
    var imgs = imageList(L);

    var gal = document.getElementById('limited-gallery');
    if (imgs.length) {
      var mainImg = img(imgs[0], L.name || '');
      mainImg.loading = 'eager';
      var main = el('button', { class: 'limited-main', type: 'button', 'aria-label': (L.name || 'Limited Edition') + ': Galerie öffnen' }, [mainImg]);
      var current = 0;
      main.addEventListener('click', function () { LB.open(imgs, current, L.name, main); });
      gal.appendChild(el('div', { class: 'limited-frame' }, [main]));
      if (imgs.length > 1) {
        var row = el('div', { class: 'limited-thumbs' });
        imgs.forEach(function (src, n) {
          var t = el('button', { class: 'limited-thumb', type: 'button', 'aria-label': 'Bild ' + (n + 1) + ' zeigen' }, [img(src, '')]);
          if (n === 0) t.setAttribute('aria-current', 'true');
          t.addEventListener('click', function () {
            if (n === current) return;
            current = n;
            main.classList.add('is-swap');
            setTimeout(function () { mainImg.src = src; main.classList.remove('is-swap'); }, 260);
            qsa('.limited-thumb', row).forEach(function (c) { c.removeAttribute('aria-current'); });
            t.setAttribute('aria-current', 'true');
          });
          row.appendChild(t);
        });
        gal.appendChild(row);
      }
    }

    var facts = document.getElementById('limited-facts');
    (L.facts || []).forEach(function (f, i) { facts.appendChild(el('li', { 'data-reveal': '', style: '--d:' + (i * 0.1) + 's' }, [el('span', { text: f })])); });

    var start = parseDate(L.releaseStart), end = parseDate(L.releaseEnd);
    var pill = document.getElementById('limited-pill');
    var when = document.getElementById('limited-when');
    var label = document.getElementById('limited-label');
    var btn = document.getElementById('limited-btn');
    var cd = countdown();
    document.getElementById('limited-countdown').appendChild(cd.el);

    var parts = [];
    if (start) parts.push('Release: ' + fmt(L.releaseStart, F_FULL_TIME) + ' Uhr');
    if (end) parts.push('bis ' + fmt(L.releaseEnd, F_FULL_TIME) + ' Uhr');
    when.textContent = parts.join(' ');

    btn.appendChild(el('span'));
    btn.href = safeUrl(L.buttonLink);
    if (!L.buttonLink) btn.parentNode.hidden = true;

    onTick(function (now) {
      var lbl = btn.firstChild;
      if (!start) { cd.el.hidden = true; pill.hidden = true; return; }
      var state = now < start.getTime() ? 'before' : (end && now >= end.getTime() ? 'ended' : 'live');
      pill.className = 'pill' + (state === 'live' ? ' pill-live' : state === 'ended' ? ' pill-ended' : '');
      pill.textContent = state === 'before' ? 'Bald erhältlich' : state === 'live' ? 'Jetzt erhältlich' : 'Beendet';
      if (state === 'before') {
        label.textContent = L.textBefore || 'Der Verkauf startet in';
        cd.el.hidden = false; cd.set(start.getTime() - now);
        lbl.textContent = L.buttonLabelBefore || 'Mehr erfahren';
      } else if (state === 'live') {
        label.textContent = L.textLive || 'Jetzt erhältlich. Der Verkauf endet in';
        if (end) { cd.el.hidden = false; cd.set(end.getTime() - now); }
        else { cd.el.hidden = true; label.textContent = (L.textLive || 'Jetzt erhältlich').replace(/\.?\s*Der Verkauf endet in$/, ''); }
        lbl.textContent = L.buttonLabelLive || 'Jetzt sichern';
      } else {
        label.textContent = L.textEnded || 'Die Limited Edition ist beendet.';
        cd.el.hidden = true;
        btn.parentNode.hidden = true;
      }
    });
  }

  /* ---------- Livestream (Twitch) ---------- */
  function renderStream() {
    var S = C.livestream || {};
    var pill = document.getElementById('stream-pill');
    var nextEl = document.getElementById('stream-next');
    var titleEl = document.getElementById('stream-title');
    var link = document.getElementById('stream-link');
    var fb = document.getElementById('stream-fallback');
    var frame = document.getElementById('stream-frame');
    var cd = countdown();
    document.getElementById('stream-countdown').appendChild(cd.el);
    link.href = safeUrl(S.channelUrl || ('https://www.twitch.tv/' + (S.channel || '')));

    var live = null; // null = unbekannt, true = live, false = offline

    var sched = (S.schedule || []).map(function (s) { return { d: parseDate(s.start), title: s.title, raw: s.start }; })
      .filter(function (s) { return s.d; }).sort(function (a, b) { return a.d - b.d; });
    function nextStream(now) {
      for (var i = 0; i < sched.length; i++) if (sched[i].d.getTime() > now) return sched[i];
      return null;
    }

    onTick(function (now) {
      frame.classList.toggle('is-live', live === true);
      if (live === true) {
        pill.hidden = false; pill.className = 'pill pill-live'; pill.textContent = 'Live';
        nextEl.textContent = S.textLive || 'Phil ist gerade live.'; titleEl.textContent = '';
        cd.el.hidden = true; return;
      }
      if (live === false) { pill.hidden = false; pill.className = 'pill pill-off'; pill.textContent = 'Offline'; }
      else pill.hidden = true;
      var n = nextStream(now);
      if (n) {
        nextEl.textContent = (S.textNext || 'Nächster Stream') + ': ' + fmt(n.raw, F_FULL_TIME) + ' Uhr';
        titleEl.textContent = n.title || '';
        cd.el.hidden = false; cd.set(n.d.getTime() - now);
      } else {
        nextEl.textContent = S.textNone || 'Der nächste Streamtermin steht noch nicht fest.';
        titleEl.textContent = ''; cd.el.hidden = true;
      }
    });

    function showFallback() {
      var i = document.getElementById('stream-offline-img');
      if (S.offlineImage) i.src = S.offlineImage;
      fb.hidden = !S.offlineImage;
    }

    var host = location.hostname;
    if (!S.channel || !/^https?:$/.test(location.protocol) || !host) { showFallback(); return; }

    var ready = false;
    var timer = setTimeout(function () { if (!ready) showFallback(); }, 8000);
    var s = document.createElement('script');
    s.src = 'https://player.twitch.tv/js/embed/v1.js';
    s.async = true;
    s.onerror = showFallback;
    s.onload = function () {
      try {
        var player = new window.Twitch.Player('stream-player', {
          channel: S.channel, parent: [host], width: '100%', height: '100%', autoplay: true, muted: true
        });
        ready = true; clearTimeout(timer);
        player.addEventListener(window.Twitch.Player.ONLINE, function () { live = true; });
        player.addEventListener(window.Twitch.Player.OFFLINE, function () { live = false; });
      } catch (e) { showFallback(); }
    };
    document.head.appendChild(s);
  }

  /* ---------- Events ---------- */
  function renderEvents() {
    var E = C.events || {};
    var box = document.getElementById('events-list');
    var now = Date.now();

    var upcoming = (E.items || []).map(function (e) {
      var s = parseDate(e.start); var en = parseDate(e.end || e.start);
      if (!s) return null;
      var endMs = en.getTime();
      if (DATE_ONLY.test(String(e.end || e.start).trim())) endMs += 24 * 3600 * 1000;
      return { e: e, s: s, endMs: endMs };
    }).filter(function (x) { return x && x.endMs > now; })
      .sort(function (a, b) { return a.s - b.s; });

    if (!upcoming.length) { box.appendChild(el('p', { class: 'events-empty', 'data-reveal': '', text: E.emptyText || 'Aktuell sind keine Events geplant.' })); return; }

    function dateLine(e) {
      var line = fmt(e.start, hasTime(e.start) ? F_FULL_TIME : F_FULL) + (hasTime(e.start) ? ' Uhr' : '');
      if (e.end && e.end !== e.start) line += ' bis ' + fmt(e.end, hasTime(e.end) ? F_FULL_TIME : F_FULL) + (hasTime(e.end) ? ' Uhr' : '');
      return line;
    }

    var first = upcoming[0], fe = first.e;
    var day = fmt(fe.start, { day: 'numeric' });
    var mon = fmt(fe.start, { month: 'long' }) + ' ' + fmt(fe.start, { year: 'numeric' });
    var inEl = el('span', { class: 'event-in' });
    onTick(function (n) {
      var days = Math.ceil((first.s.getTime() - n) / 86400000);
      inEl.textContent = first.s.getTime() <= n ? 'Läuft gerade' : days <= 1 ? 'Beginnt in weniger als 24 Stunden' : 'Noch ' + days + ' Tage';
    });

    var program = null;
    if ((fe.program || []).length) {
      program = el('ul', { class: 'event-program', 'aria-label': 'Programm' }, fe.program.map(function (p, i) {
        return el('li', { 'data-reveal': '', style: '--d:' + (i * 0.12) + 's' }, [el('span', { class: 'event-time', text: p.time }), el('span', { text: p.label })]);
      }));
    }
    box.appendChild(el('article', { class: 'event-main', 'data-reveal': '' }, [
      el('div', { class: 'event-date', 'aria-hidden': 'true' }, [el('span', { class: 'event-day', text: day }), el('span', { class: 'event-month', text: mon })]),
      el('div', { class: 'event-body' }, [
        el('h3', { text: fe.title }),
        el('p', { class: 'event-where', text: [dateLine(fe), fe.location].filter(Boolean).join('. ') }),
        inEl,
        fe.text ? el('p', { class: 'event-text', text: fe.text }) : null,
        program,
        fe.link ? el('a', { class: 'btn', href: safeUrl(fe.link), target: /^https?:/i.test(fe.link) ? '_blank' : null, rel: 'noopener' }, [el('span', { text: fe.linkLabel || 'Mehr erfahren' })]) : null
      ])
    ]));

    if (upcoming.length > 1) {
      box.appendChild(el('div', { class: 'event-more' }, upcoming.slice(1).map(function (x, i) {
        return el('article', { class: 'event-row', 'data-reveal': '', style: '--d:' + (i * 0.1) + 's' }, [
          el('p', { class: 'event-row-date', text: fmt(x.e.start, hasTime(x.e.start) ? F_FULL_TIME : F_FULL) + (hasTime(x.e.start) ? ' Uhr' : '') }),
          el('div', {}, [el('h3', { text: x.e.title }), x.e.location ? el('p', { text: x.e.location }) : null])
        ]);
      })));
    }
  }

  /* ---------- Zeitstrahl ---------- */
  function renderTimeline() {
    var ol = document.getElementById('timeline');
    // Optical Flare: wandert mit der Linie mit
    var fl = el('div', { class: 'tl-flare', 'aria-hidden': 'true' });
    fl.appendChild(el('canvas', { class: 'fl-particles', 'aria-hidden': 'true' }));
    ['fl-glow', 'fl-trail', 'fl-rays', 'fl-rays2', 'fl-h3', 'fl-h1', 'fl-h2', 'fl-h4', 'fl-v', 'fl-shock', 'fl-core', 'fl-hot'].forEach(function (cls) { fl.appendChild(el('i', { class: cls })); });
    [['hex', -0.30, 84, 'rgba(130,190,255,.55)', 0.55], ['disc', 0.35, 34, 'rgba(190,150,255,.6)', 0.6],
     ['fill', 0.62, 72, 'rgba(110,170,255,.38)', 0.5], ['hex', 0.95, 28, 'rgba(120,225,255,.65)', 0.6],
     ['disc', 1.35, 120, 'rgba(150,190,255,.4)', 0.45], ['fill', 1.75, 46, 'rgba(255,190,150,.32)', 0.5],
     ['hex', 2.2, 92, 'rgba(190,170,255,.32)', 0.4]].forEach(function (g) {
      fl.appendChild(el('i', { class: 'fl-g ' + g[0], style: '--k:' + g[1] + ';--s:' + g[2] + 'px;--c:' + g[3] + ';--o:' + g[4] }));
    });
    ol.appendChild(fl);
    ((C.story && C.story.timeline) || []).forEach(function (t) {
      var imgs = imageList(t);
      var thumbs = null;
      if (imgs.length) {
        thumbs = el('div', { class: 'tl-thumbs' }, imgs.map(function (src, n) {
          var b = el('button', { class: 'tl-thumb', type: 'button', 'aria-label': t.year + ', ' + t.title + ': Bild ' + (n + 1) + ' von ' + imgs.length + ' ansehen' }, [img(src, '')]);
          b.addEventListener('click', function () { LB.open(imgs, n, t.year + ': ' + t.title, b); });
          return b;
        }));
      }
      ol.appendChild(el('li', { class: 'tl-item', 'data-reveal': '' }, [
        el('div', { class: 'tl-year', text: t.year }),
        el('h3', { text: t.title }),
        el('p', { text: t.text }),
        thumbs
      ]));
    });
  }

  /* ---------- Intro ---------- */
  function initIntro() {
    var intro = document.getElementById('intro');
    var seen = false;
    try { seen = sessionStorage.getItem('ab-intro') === '1'; } catch (e) {}
    if (REDUCE || seen) { if (intro) intro.remove(); document.body.classList.add('is-ready'); return; }
    document.body.classList.add('is-loading');
    var t0 = Date.now(), fired = false;
    function go() {
      if (fired) return; fired = true;
      setTimeout(function () {
        intro.classList.add('is-out');
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-ready');
        try { sessionStorage.setItem('ab-intro', '1'); } catch (e) {}
        setTimeout(function () { intro.remove(); }, 1200);
      }, Math.max(0, 1700 - (Date.now() - t0)));
    }
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
    setTimeout(go, 4500);
  }

  /* ---------- Reveal: Wort-für-Wort-Überschriften und Einblenden ---------- */
  function splitWords(h) {
    var text = h.textContent.trim();
    if (!text) return;
    h.setAttribute('aria-label', text);
    h.textContent = '';
    text.split(/\s+/).forEach(function (w, i) {
      h.appendChild(el('span', { class: 'w', 'aria-hidden': 'true' }, [el('span', { class: 'wi', style: '--i:' + i, text: w })]));
      h.appendChild(document.createTextNode(' '));
    });
  }
  function initReveal() {
    qsa('.eyebrow').forEach(function (e) { e.setAttribute('data-reveal', ''); });
    qsa('.split').forEach(splitWords);
    var targets = qsa('[data-reveal], .split');
    if (REDUCE || !('IntersectionObserver' in window)) { targets.forEach(function (t) { t.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- Mystik: Zeichenringe, Nebel, schwebende Lichtpartikel ---------- */
  var GLYPHS = [
    'M0 -88V-78',
    'M0 -88V-78M-2.6 -83H2.6',
    'M-1.7 -88V-78M1.7 -88V-78',
    'M-3 -79.5L0 -88L3 -79.5',
    'M0 -88V-82.5M0 -78.8v.01',
    'M-3 -79H3L0 -87Z'
  ];
  function arcane(kind) {
    var s = '<svg viewBox="-106 -106 212 212" fill="none" stroke="currentColor" stroke-width=".5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">', i;
    if (kind === 'outer') {
      s += '<circle r="98"/><circle r="95.4" stroke-dasharray=".5 2.5" stroke-opacity=".9"/>';
      for (i = 0; i < 72; i++) {
        var len = i % 6 === 0 ? 5.2 : (i % 2 === 0 ? 2.8 : 1.6);
        s += '<path transform="rotate(' + (i * 5) + ')" d="M0 -98V' + (-98 + len).toFixed(1) + '"/>';
      }
      for (i = 0; i < 4; i++) s += '<path transform="rotate(' + (i * 90) + ')" d="M0 -105.5L2.5 -102L0 -98.5L-2.5 -102Z"/>';
    } else {
      s += '<circle r="90"/><circle r="76"/><circle r="72.5" stroke-dasharray="1 3" stroke-opacity=".7"/>';
      for (i = 0; i < 24; i++) s += '<path transform="rotate(' + (i * 15) + ')" d="' + GLYPHS[(i * 7 + 3) % 6] + '"/>';
    }
    return s + '</svg>';
  }

  // Großer Hintergrund aus vielen Ringen, Strahlenbändern und feiner Geometrie (alles um den Mittelpunkt)
  function sigil(kind) {
    var s = '<svg viewBox="-320 -320 640 640" fill="none" stroke="currentColor" stroke-width=".9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">', i;
    function ring(r, op, dash) { return '<circle r="' + r + '" stroke-opacity="' + op + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>'; }
    function rad(a, r1, r2, op) {
      var t = a * Math.PI / 180, c = Math.cos(t), n = Math.sin(t);
      return '<path stroke-opacity="' + op + '" d="M' + (c * r1).toFixed(1) + ' ' + (n * r1).toFixed(1) + 'L' + (c * r2).toFixed(1) + ' ' + (n * r2).toFixed(1) + '"/>';
    }
    if (kind === 'static') {
      [[150, .5], [168, .3], [222, .55], [243, .45], [262, .3], [265.5, .2], [290, .2], [316, .14]].forEach(function (r) { s += ring(r[0], r[1]); });
      s += ring(180, .55, '.5 3.2') + ring(200, .25, '1 5');
      // Dreieck mit Kreisen, wie ein Konstruktionsplan
      s += '<path stroke-opacity=".42" d="M0 -132L114.3 66H-114.3Z"/>';
      s += '<path stroke-opacity=".22" d="M0 -132L0 -222M114.3 66L192 110M-114.3 66L-192 110"/>';
      s += '<circle r="92" cx="-44" cy="38" stroke-opacity=".3"/><circle r="92" cx="44" cy="38" stroke-opacity=".3"/><circle r="64" cy="-52" stroke-opacity=".22"/><circle r="132" stroke-opacity=".28"/>';
      for (i = 0; i < 4; i++) s += '<path transform="rotate(' + (i * 90) + ')" d="M0 -118L3.6 -111.5H-3.6Z" fill="currentColor" fill-opacity=".75" stroke="none"/>';
      [[0, -132], [114.3, 66], [-114.3, 66], [0, -222]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.8" fill="currentColor" stroke="none"/>'; });
    } else if (kind === 'tech') {
      // Technisches Overlay: Fadenkreuz, Diagonalen, Messmarken (alles auf das Logo zentriert)
      s += '<defs><linearGradient id="tg-h" gradientUnits="userSpaceOnUse" x1="-320" x2="320" y1="0" y2="0"><stop offset="0" stop-color="currentColor" stop-opacity="0"/><stop offset=".28" stop-color="currentColor" stop-opacity=".7"/><stop offset=".72" stop-color="currentColor" stop-opacity=".7"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient>' +
           '<linearGradient id="tg-v" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="-320" y2="320"><stop offset="0" stop-color="currentColor" stop-opacity="0"/><stop offset=".3" stop-color="currentColor" stop-opacity=".6"/><stop offset=".7" stop-color="currentColor" stop-opacity=".6"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>';
      s += '<path stroke="url(#tg-h)" d="M-320 0H320"/><path stroke="url(#tg-v)" d="M0 -320V320"/>';
      s += '<path stroke-opacity=".2" d="M-262 -183L262 183M-262 183L262 -183"/>';
      for (i = -300; i <= -108; i += 7) s += '<path stroke-opacity=".5" d="M' + i + ' 0v' + (i % 28 === 0 ? 7 : 3.5) + '"/>';
      for (i = 112; i <= 300; i += 14) s += '<path stroke-opacity=".45" d="M' + i + ' 0v' + (i % 28 === 0 ? 7 : 3.5) + '"/>';
      for (i = 112; i <= 296; i += 10) s += '<path stroke-opacity=".4" d="M0 ' + i + 'h' + (i % 30 === 2 ? 7 : 3.5) + 'M0 ' + (-i) + 'h' + (i % 30 === 2 ? -7 : -3.5) + '"/>';
      [[178, 0, 3.2], [-196, 0, 2.4], [0, -180, 2.8], [0, 196, 3]].forEach(function (c) { s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" stroke-opacity=".7"/>'; });
      s += '<circle cx="268" r="7.5" stroke-opacity=".7"/><circle cx="268" r="4.6" stroke-opacity=".6"/><circle cx="268" r="1" fill="currentColor" stroke="none"/>';
      [[-140, -120], [150, -100], [-120, 140], [170, 130], [60, -250], [-230, 60], [220, -190]].forEach(function (p) { s += '<path stroke-opacity=".65" d="M' + (p[0] - 3.5) + ' ' + p[1] + 'h7M' + p[0] + ' ' + (p[1] - 3.5) + 'v7"/>'; });
      s += '<path stroke-opacity=".5" d="M-206 -236l22 -9v10l-22 9zM-184 -245l30 -12"/>';
    } else if (kind === 'ticksA') {
      for (i = 0; i < 360; i++) {
        var big = i % 15 === 0, mid = i % 5 === 0;
        s += rad(i, 225, 225 + (big ? 17 : mid ? 11 : 6), big ? .75 : mid ? .55 : .38);
      }
    } else {
      for (i = 0; i < 180; i++) {
        var m = i % 6;
        s += rad(i * 2, 268, 268 + (m === 0 ? 46 : m === 3 ? 32 : m % 2 ? 14 : 22), m === 0 ? .4 : .26);
      }
    }
    return s + '</svg>';
  }

  /* ---------- Limited Edition: Aura aus Ringen, welligen Linien und Lichtläufern ---------- */
  function wavy(r0, parts, n) {
    var d = '', i, th, r;
    for (i = 0; i <= n; i++) {
      th = i / n * 6.283185;
      r = r0;
      parts.forEach(function (p) { r += p[0] * Math.sin(p[1] * th + p[2]); });
      d += (i ? 'L' : 'M') + (r * Math.cos(th)).toFixed(1) + ' ' + (r * Math.sin(th)).toFixed(1);
    }
    return d + 'Z';
  }
  function arc(r, a0, a1) {
    var t0 = a0 * Math.PI / 180, t1 = a1 * Math.PI / 180, big = (a1 - a0) > 180 ? 1 : 0;
    return 'M' + (r * Math.cos(t0)).toFixed(1) + ' ' + (r * Math.sin(t0)).toFixed(1) + 'A' + r + ' ' + r + ' 0 ' + big + ' 1 ' + (r * Math.cos(t1)).toFixed(1) + ' ' + (r * Math.sin(t1)).toFixed(1);
  }
  function aura() {
    var s = '<svg viewBox="-200 -200 400 400" fill="none" stroke="currentColor" stroke-width=".5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">', i;
    s += '<defs><linearGradient id="auG" gradientUnits="userSpaceOnUse" x1="-200" y1="0" x2="200" y2="0"><stop offset="0" stop-color="currentColor" stop-opacity="0"/><stop offset=".22" stop-color="currentColor" stop-opacity=".75"/><stop offset=".78" stop-color="currentColor" stop-opacity=".75"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>';
    // Ruhende Ringe
    [[121, .5], [137, .26], [153, .34], [170, .22], [186, .28], [197, .14]].forEach(function (c) { s += '<circle r="' + c[0] + '" stroke-opacity="' + c[1] + '"/>'; });
    s += '<circle r="129" stroke-opacity=".6" stroke-dasharray=".5 3.2"/><circle r="162" stroke-opacity=".4" stroke-dasharray="2 7"/>';
    // Strahlenband (dreht gegenläufig)
    s += '<g class="au-b">';
    for (i = 0; i < 180; i++) {
      var a = i * 2 * Math.PI / 180, big = i % 6 === 0, l = big ? 9 : (i % 2 ? 3 : 5.5), r1 = 175;
      s += '<path stroke-opacity="' + (big ? .55 : .3) + '" d="M' + (r1 * Math.cos(a)).toFixed(1) + ' ' + (r1 * Math.sin(a)).toFixed(1) + 'L' + ((r1 + l) * Math.cos(a)).toFixed(1) + ' ' + ((r1 + l) * Math.sin(a)).toFixed(1) + '"/>';
    }
    s += '</g>';
    // Wellige Ringe: drehen mit unterschiedlicher Geschwindigkeit, ein Lichtläufer wandert entlang
    var w1 = wavy(131, [[3.6, 5, 0]], 220), w2 = wavy(150, [[5, 3, 1], [1.8, 7, .4]], 260), w3 = wavy(176, [[4, 7, 2], [3, 2, .5]], 300);
    s += '<g class="au-r1"><path stroke-opacity=".6" stroke-width=".6" d="' + w1 + '"/><path class="au-run" pathLength="100" stroke="#fff" stroke-opacity=".9" stroke-width="1.2" stroke-dasharray="7 93" d="' + w1 + '"/></g>';
    s += '<g class="au-r2"><path stroke-opacity=".5" stroke-width=".6" d="' + w2 + '"/><path class="au-run au-run2" pathLength="100" stroke="#fff" stroke-opacity=".8" stroke-width="1.1" stroke-dasharray="5 95" d="' + w2 + '"/></g>';
    s += '<g class="au-r3"><path stroke-opacity=".4" stroke-width=".55" d="' + w3 + '"/><path class="au-run au-run3" pathLength="100" stroke="#cfe3ff" stroke-opacity=".8" stroke-width="1" stroke-dasharray="4 96" d="' + w3 + '"/></g>';
    // Bögen mit Endpunkten
    s += '<g class="au-a" stroke-width="1.3" stroke-opacity=".6"><path d="' + arc(143, 10, 92) + '"/><path d="' + arc(165, 150, 262) + '"/><path d="' + arc(187, 200, 262) + '"/><path d="' + arc(196, 320, 360) + '"/>' +
         '<circle cx="' + (143 * Math.cos(92 * Math.PI / 180)).toFixed(1) + '" cy="' + (143 * Math.sin(92 * Math.PI / 180)).toFixed(1) + '" r="1.6" fill="currentColor" stroke="none"/>' +
         '<circle cx="' + (165 * Math.cos(262 * Math.PI / 180)).toFixed(1) + '" cy="' + (165 * Math.sin(262 * Math.PI / 180)).toFixed(1) + '" r="1.6" fill="currentColor" stroke="none"/></g>';
    // Geschwungene S-Kurven, die über die Ringe laufen und an den Enden ausblenden
    s += '<path stroke="url(#auG)" stroke-width=".8" d="M-200 -52C-120 -128 -64 40 8 -18S140 -112 200 -32"/>';
    s += '<path stroke="url(#auG)" stroke-width=".7" d="M-200 66C-132 8 -76 150 4 84S130 6 200 74"/>';
    s += '<path class="au-run au-run4" pathLength="100" stroke="#fff" stroke-opacity=".85" stroke-width="1.2" stroke-dasharray="9 91" d="M-200 -52C-120 -128 -64 40 8 -18S140 -112 200 -32"/>';
    s += '<path class="au-run au-run5" pathLength="100" stroke="#cfe3ff" stroke-opacity=".7" stroke-width="1" stroke-dasharray="7 93" d="M-200 66C-132 8 -76 150 4 84S130 6 200 74"/>';
    return s + '</svg>';
  }
  // Fließende Wellenlinien durch die ganze Sektion (nahtlose Schleife)
  function waves() {
    function line(y, a1, a2, ph) {
      var d = '', x;
      for (x = 0; x <= 2000; x += 10) d += (x ? 'L' : 'M') + x + ' ' + (y + a1 * Math.sin(2 * Math.PI * x / 1000 + ph) + a2 * Math.sin(2 * Math.PI * 3 * x / 1000 + ph * 2)).toFixed(1);
      return d;
    }
    return '<svg class="lw lw1" viewBox="0 0 2000 200" preserveAspectRatio="none"><path d="' + line(100, 34, 9, 0) + '"/><path d="' + line(100, 26, 12, 1.4) + '" stroke-opacity=".5"/></svg>' +
           '<svg class="lw lw2" viewBox="0 0 2000 200" preserveAspectRatio="none"><path d="' + line(100, 30, 8, 2.2) + '"/><path d="' + line(100, 38, 6, .6) + '" stroke-opacity=".45"/></svg>' +
           '<svg class="lw lw3" viewBox="0 0 2000 200" preserveAspectRatio="none"><path d="' + line(100, 22, 10, 4) + '"/></svg>';
  }

  var particleSets = [];
  function initAtmosphere() {
    qsa('[data-arcane]').forEach(function (n) { n.innerHTML = arcane(n.getAttribute('data-arcane')); });
    qsa('[data-sigil]').forEach(function (n) { n.innerHTML = sigil(n.getAttribute('data-sigil')); });

    // Rauch-Animation des Logos: nur am Desktop, pausiert außerhalb des Bildes
    var fxSvg = document.querySelector('.fx-defs');
    if (fxSvg) {
      if (REDUCE || !FINE) qsa('.fx-defs animate').forEach(function (a) { a.remove(); });
      if ('IntersectionObserver' in window && fxSvg.pauseAnimations) {
        new IntersectionObserver(function (es) { if (es[0].isIntersecting) fxSvg.unpauseAnimations(); else fxSvg.pauseAnimations(); }).observe(document.getElementById('top'));
      }
    }
    // Zeichenring hinter der Limited Edition
    // Aura hinter dem Limited-Edition-Bild: exakt auf den Bildrahmen zentriert
    var lframe = document.querySelector('.limited-frame');
    if (lframe) lframe.insertBefore(el('div', { class: 'limited-aura', 'aria-hidden': 'true', icon: aura() }), lframe.firstChild);
    var lsec = document.querySelector('.section-limited');
    if (lsec) lsec.insertBefore(el('div', { class: 'limited-waves', 'aria-hidden': 'true', icon: waves() }), lsec.firstChild);

    qsa('.hero, .section-limited, .section-story').forEach(function (host) {
      host.insertBefore(el('div', { class: 'mist', 'aria-hidden': 'true' }), host.firstChild);
      if (host.classList.contains('hero')) host.insertBefore(el('div', { class: 'mist mist-b', 'aria-hidden': 'true' }), host.firstChild);
    });
    if (REDUCE) return;

    qsa('.hero, .section-limited, .section-story').forEach(function (host) {
      var cv = el('canvas', { class: 'particles', 'aria-hidden': 'true' });
      host.insertBefore(cv, host.firstChild);
      var ctx = cv.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      var set = { vis: false, ps: [] , w: 0, h: 0 };
      function make(init) {
        return { x: Math.random() * set.w, y: init ? Math.random() * set.h : set.h + 12,
          r: 0.5 + Math.random() * 1.5, vy: 0.06 + Math.random() * 0.22, vx: (Math.random() - 0.5) * 0.14,
          a: 0.18 + Math.random() * 0.5, ph: Math.random() * 6.28, tw: 0.4 + Math.random() * 1.2 };
      }
      function resize() {
        set.w = host.clientWidth; set.h = host.clientHeight;
        cv.width = Math.round(set.w * dpr); cv.height = Math.round(set.h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.round(clamp(set.w * set.h / 26000, 14, 56));
        set.ps = []; for (var i = 0; i < n; i++) set.ps.push(make(true));
      }
      set.draw = function (t) {
        ctx.clearRect(0, 0, set.w, set.h);
        ctx.globalCompositeOperation = 'lighter';
        set.ps.forEach(function (p, i) {
          p.y -= p.vy; p.x += p.vx + Math.sin(t / 2600 + p.ph) * 0.07;
          if (p.y < -12 || p.x < -12 || p.x > set.w + 12) set.ps[i] = p = make(false);
          var al = p.a * (0.55 + 0.45 * Math.sin(t / 1000 * p.tw + p.ph));
          ctx.fillStyle = 'rgba(190,212,236,' + al.toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
          if (p.r > 1.2) { ctx.fillStyle = 'rgba(127,160,200,' + (al * 0.16).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 6.2832); ctx.fill(); }
        });
      };
      resize();
      window.addEventListener('resize', resize);
      if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { set.vis = es[0].isIntersecting; }).observe(host);
      else set.vis = true;
      particleSets.push(set);
    });
  }

  /* ---------- Funkenschwarm am Flare: vertikaler Schweif wie bei einer Sternschnuppe ---------- */
  var flareSwarm = null;
  function initFlareSwarm() {
    var tl = document.getElementById('timeline');
    var cv = tl && tl.querySelector('.fl-particles');
    if (!cv || REDUCE) return;
    var ctx = cv.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var S = { tl: tl, w: 0, h: 0, ps: [], last: 0, headOff: null, prevOff: null, acc: 0 };
    var MAX = window.innerWidth < 600 ? 150 : 260;

    function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; }
    function emit(d) {
      if (S.ps.length >= MAX) return;
      S.ps.push({
        x: gauss() * 7, y: gauss() * 4 - Math.random() * d,   // entlang des zurückgelegten Wegs verteilt
        vx: (Math.random() - 0.5) * 0.2, vy: -(0.18 + Math.random() * 0.55),
        r: Math.random() < 0.06 ? 1.8 + Math.random() * 1.0 : 0.5 + Math.random() * 1.2,
        max: 150 + Math.random() * 230, age: 0, ph: Math.random() * 6.28, tw: 0.9 + Math.random() * 2.4,
        cyan: Math.random() < 0.2
      });
    }
    function resize() {
      S.w = Math.min(window.innerWidth, 300); S.h = 780;
      cv.width = Math.round(S.w * dpr); cv.height = Math.round(S.h * dpr);
      cv.style.width = S.w + 'px'; cv.style.height = S.h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, S.w / 2 * dpr, S.h / 2 * dpr);
    }
    S.draw = function (t) {
      var dt = S.last ? Math.min(3, (t - S.last) / 16.67) : 1; S.last = t;
      // Wie weit ist der Lichtpunkt seit dem letzten Bild gewandert? Die Funken bleiben im Raum stehen.
      var d = 0;
      if (S.headOff != null) { if (S.prevOff != null) d = S.headOff - S.prevOff; S.prevOff = S.headOff; }
      d = clamp(d, -90, 90);
      var speed = Math.abs(d);
      // Ausstoß: ruhig ein dünner Faden, beim Scrollen ein dichter Schweif
      S.acc += (0.6 + Math.min(speed, 40) * 0.14) * dt;
      while (S.acc >= 1) { emit(d); S.acc -= 1; }

      ctx.clearRect(-S.w / 2, -S.h / 2, S.w, S.h);
      ctx.globalCompositeOperation = 'lighter';
      for (var i = S.ps.length - 1; i >= 0; i--) {
        var p = S.ps[i];
        p.age += dt;
        p.y += p.vy * dt - d;                        // -d: Funken bleiben beim Scrollen im Raum zurück
        p.x += p.vx * dt + (Math.random() - 0.5) * 0.05;
        p.vy *= Math.pow(0.996, dt);
        if (p.age >= p.max || Math.abs(p.y) > S.h / 2 || Math.abs(p.x) > S.w / 2) { S.ps.splice(i, 1); continue; }
        var life = p.age / p.max;
        var env = life < 0.08 ? life / 0.08 : Math.pow(1 - (life - 0.08) / 0.92, 1.3);
        var fade = Math.pow(Math.max(0, 1 - Math.abs(p.y) / (S.h / 2)), 0.9);   // Schweif läuft sanft aus
        var al = Math.min(1, 1.35 * env * fade * (0.55 + 0.45 * Math.sin(t / 1000 * p.tw + p.ph)));
        var col = p.cyan ? '150,222,255' : '214,230,255';
        // Geschwindigkeitslinie: beim Scrollen ziehen die Funken einen kurzen senkrechten Schweif
        if (speed > 1.5 && p.r > 0.9) {
          var len = Math.min(34, speed * 2.4);
          var g = ctx.createLinearGradient(0, p.y, 0, p.y - Math.sign(d) * len);
          g.addColorStop(0, 'rgba(' + col + ',' + (al * 0.55).toFixed(3) + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
          ctx.strokeStyle = g; ctx.lineWidth = Math.max(0.8, p.r * 0.8);
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x, p.y - Math.sign(d) * len); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(' + col + ',' + al.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        if (p.r > 1.5) { ctx.fillStyle = 'rgba(' + col + ',' + (al * 0.14).toFixed(3) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, 6.2832); ctx.fill(); }
      }
    };
    resize();
    window.addEventListener('resize', resize);
    flareSwarm = S;
  }

  /* ---------- Laufband (reagiert auf Scrollrichtung und -tempo) ---------- */
  var marquee = null;
  function initMarquee() {
    var wrap = document.querySelector('.marquee'), track = document.getElementById('marquee-track');
    var words = C.marquee || [];
    if (!words.length) { wrap.hidden = true; return; }
    function group() {
      var g = el('div', { class: 'marquee-group' });
      words.forEach(function (w, i) {
        g.appendChild(el('span', { class: 'marquee-word' + (i % 2 ? ' outline' : ''), text: w }));
        g.appendChild(el('span', { class: 'marquee-star', icon: ICONS.star }));
      });
      return g;
    }
    marquee = { track: track, gw: 0, x: 0, dir: -1, vel: 0, last: window.pageYOffset, visible: true };
    function measure() {
      track.textContent = '';
      track.appendChild(group());
      marquee.gw = track.firstChild.getBoundingClientRect().width || 1;
      var n = Math.ceil((window.innerWidth * 2) / marquee.gw) + 1;
      for (var i = 0; i < n; i++) track.appendChild(group());
    }
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { marquee.visible = es[0].isIntersecting; }).observe(wrap);
    }
  }

  /* ---------- Master-Animationsschleife ---------- */
  function frame(t) {
    if (flareSwarm && flareSwarm.tl.classList.contains('has-flare')) flareSwarm.draw(t || 0); else if (flareSwarm) { flareSwarm.last = 0; flareSwarm.prevOff = null; flareSwarm.headOff = null; flareSwarm.ps.length = 0; }
    for (var k = 0; k < particleSets.length; k++) if (particleSets[k].vis) particleSets[k].draw(t || 0);
    if (marquee && marquee.visible && !REDUCE) {
      var y = window.pageYOffset, dy = y - marquee.last; marquee.last = y;
      marquee.vel = marquee.vel * 0.9 + dy * 0.1;
      if (Math.abs(dy) > 1) marquee.dir = dy > 0 ? -1 : 1;
      marquee.x += marquee.dir * (0.7 + Math.abs(marquee.vel) * 0.9);
      if (marquee.x <= -marquee.gw) marquee.x += marquee.gw;
      if (marquee.x > 0) marquee.x -= marquee.gw;
      marquee.track.style.transform = 'translate3d(' + marquee.x.toFixed(1) + 'px,0,0)';
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Scroll: Fortschritt, Header, Hero, Zeitstrahl, Back-to-top ---------- */
  var menuOpen = false;
  function initScroll() {
    var progress = document.getElementById('progress');
    var header = document.getElementById('header');
    var toTop = document.getElementById('to-top');
    var bar = document.getElementById('to-top-bar');
    var tl = document.getElementById('timeline');
    var lim = document.getElementById('limited');
    var tones = qsa('[data-tone]');
    var heroEl = document.getElementById('top');
    var lastY = window.pageYOffset, dir = 0, ticking = false;

    function showTop(v) { toTop.classList.toggle('is-visible', v); toTop.tabIndex = v ? 0 : -1; }

    function update() {
      ticking = false;
      var y = window.pageYOffset, vh = window.innerHeight;
      var max = document.documentElement.scrollHeight - vh;
      var p = max > 0 ? clamp(y / max, 0, 1) : 0;
      progress.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      bar.style.strokeDashoffset = (163.4 * (1 - p)).toFixed(1);

      var d = y - lastY;
      if (Math.abs(d) > 6) { dir = d > 0 ? 1 : -1; lastY = y; }

      // Back-to-top: nur beim Hochscrollen
      if (y < 500) showTop(false); else if (dir < 0) showTop(true); else if (dir > 0) showTop(false);

      // Header: Tonwert, Hintergrund, Ein-/Ausblenden
      var tone = 'dark';
      tones.forEach(function (s) { var r = s.getBoundingClientRect(); if (r.top <= 40 && r.bottom > 40) tone = s.getAttribute('data-tone'); });
      header.classList.toggle('on-dark', tone === 'dark');
      header.classList.toggle('on-light', tone !== 'dark');
      header.classList.toggle('is-solid', y > 80);
      if (!menuOpen) header.classList.toggle('is-hidden', dir > 0 && y > 260);

      // Hero-Parallax
      if (!REDUCE && heroEl) heroEl.style.setProperty('--hp', clamp(y / heroEl.offsetHeight, 0, 1).toFixed(3));

      // Limited-Edition-Parallax
      if (!REDUCE && lim) {
        var r = lim.getBoundingClientRect();
        lim.style.setProperty('--pl', clamp((vh - r.top) / (vh + r.height), 0, 1).toFixed(3));
      }

      // Zeitstrahl füllt sich beim Scrollen
      if (tl) {
        var tr = tl.getBoundingClientRect(), trig = vh * 0.62;
        var tp = clamp((trig - tr.top) / tr.height, 0, 1);
        tl.style.setProperty('--tl', tp.toFixed(4));
        tl.classList.toggle('has-flare', tp > 0.004 && tp < 0.996);
        if (tp > 0.004 && tp < 0.996) {
          var headY = tr.top + 6 + (tr.height - 12) * tp;
          if (flareSwarm) flareSwarm.headOff = 6 + (tr.height - 12) * tp;
          var headX = tr.left + (window.innerWidth >= 900 ? tr.width / 2 : 9.5);
          tl.style.setProperty('--vx', (window.innerWidth / 2 - headX).toFixed(0) + 'px');
          tl.style.setProperty('--vy', (vh / 2 - headY).toFixed(0) + 'px');
          tl.style.setProperty('--fi', clamp(1 - Math.abs(vh / 2 - headY) / (vh * 0.62), 0.3, 1).toFixed(2));
        }
        qsa('.tl-item', tl).forEach(function (it) { it.classList.toggle('is-active', it.getBoundingClientRect().top + 16 <= trig); });
      }
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' }); showTop(false); });
    update();
  }

  /* ---------- Vollbild-Menü ---------- */
  function initMenu() {
    var burger = document.getElementById('burger');
    var label = document.getElementById('burger-label');
    var menu = document.getElementById('menu');
    var header = document.getElementById('header');

    function setOpen(state) {
      menuOpen = state;
      burger.setAttribute('aria-expanded', String(state));
      burger.setAttribute('aria-label', state ? 'Menü schließen' : 'Menü öffnen');
      label.textContent = state ? 'Schließen' : 'Menü';
      document.body.classList.toggle('menu-open', state);
      if (state) {
        header.classList.remove('is-hidden');
        menu.removeAttribute('inert');
        menu.classList.add('is-open');
        var first = menu.querySelector('a');
        if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 500);
      } else {
        menu.classList.remove('is-open');
        menu.setAttribute('inert', '');
      }
    }
    burger.addEventListener('click', function () { setOpen(!menuOpen); });
    menu.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.menu-list a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen) { setOpen(false); burger.focus(); }
    });

    if ('IntersectionObserver' in window) {
      var links = {};
      qsa('.menu-list a', menu).forEach(function (a) { links[a.getAttribute('data-target')] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
          var a = links[en.target.id];
          if (a) a.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ---------- Easter Egg: stargate tippen oder 5x die Glyphe im Footer ---------- */
  function initEgg() {
    var E = C.easterEgg || {};
    if (E.enabled === false) return;
    var root = null, nameEl, closeBtn, opener = null, timer = null, gate = null;

    function build() {
      var name = E.nextCollection || 'Redacted';
      nameEl = el('span', { class: 'egg-name-text', 'aria-hidden': 'true', text: name });
      closeBtn = el('button', { class: 'btn egg-close', type: 'button' }, [el('span', { text: E.closeLabel || 'Schließen' })]);
      root = el('div', { class: 'egg', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'egg-title', hidden: '' }, [
        el('div', { class: 'egg-flash' }), el('div', { class: 'egg-streak' }),
        el('div', { class: 'egg-ring r1' }), el('div', { class: 'egg-ring r2' }), el('div', { class: 'egg-ring r3' }),
        el('div', { class: 'egg-body' }, [
          el('p', { class: 'egg-kicker', text: E.kicker || 'Geheimes Archiv' }),
          el('h2', { class: 'egg-title', id: 'egg-title', text: E.title || 'Du hast es gefunden.' }),
          el('p', { class: 'egg-lead', text: E.lead || 'Die nächste Kollektion trägt den Namen' }),
          el('p', { class: 'egg-name', 'aria-label': name }, [nameEl]),
          el('p', { class: 'egg-note', text: E.note || '' }),
          closeBtn
        ])
      ]);
      // Optional: Stargate-Animation (nur wenn js/egg-stargate.js eingebunden ist)
      if (window.StargateEgg) {
        gate = window.StargateEgg.create();
        root.querySelector('.egg-body').insertBefore(gate.el, root.querySelector('.egg-name'));
        root.classList.add('egg-has-gate');
      }
      document.body.appendChild(root);
      closeBtn.addEventListener('click', close);
      root.addEventListener('click', function (e) { if (e.target === root) close(); });
      document.addEventListener('keydown', function (e) {
        if (root.hidden) return;
        if (e.key === 'Escape') close();
        if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
      });
    }

    function decode(text, wait) {
      if (REDUCE) { nameEl.textContent = text; return; }
      var pool = '█▓▒░#$%&*+=?<>/ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
      var t0 = Date.now();
      clearInterval(timer);
      timer = setInterval(function () {
        var p = (Date.now() - t0 - 1100 - (wait || 0)) / 1500, out = '';
        for (var i = 0; i < text.length; i++) {
          if (text.charAt(i) === ' ') out += ' ';
          else if (p > (i + 1) / text.length) out += text.charAt(i);
          else out += pool.charAt(Math.floor(Math.random() * pool.length));
        }
        nameEl.textContent = out;
        if (p >= 1) { clearInterval(timer); nameEl.textContent = text; }
      }, 45);
    }

    function open() {
      if (!root) build();
      if (!root.hidden) return;
      opener = document.activeElement;
      root.hidden = false;
      root.classList.remove('is-on'); void root.offsetWidth; root.classList.add('is-on');
      document.body.classList.add('lb-open');
      var wait = gate ? gate.start() : 0;           // Stargate: Dauer bis der Name erscheint
      root.style.setProperty('--egg-t', wait + 'ms');
      decode(E.nextCollection || 'Redacted', wait);
      closeBtn.focus({ preventScroll: true });
    }
    function close() {
      if (!root || root.hidden) return;
      clearInterval(timer);
      if (gate) gate.stop();
      root.hidden = true;
      root.classList.remove('is-on');
      document.body.classList.remove('lb-open');
      if (opener && opener.focus) opener.focus();
    }

    // Auslöser 1: "stargate" auf der Tastatur tippen
    var word = 'stargate', buf = '';
    document.addEventListener('keydown', function (e) {
      if (root && !root.hidden) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var t = e.target, tag = t && t.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable)) return;
      if (!e.key || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-word.length);
      if (buf === word) { buf = ''; open(); }
    });
    // Auslöser 2: die kleine Glyphe unten im Footer fünfmal schnell antippen (Handy und Maus)
    var glyph = document.getElementById('footer-glyph'), n = 0, last = 0;
    if (glyph) glyph.addEventListener('click', function () {
      var now = Date.now();
      n = (now - last < 1400) ? n + 1 : 1; last = now;
      if (n >= 5) { n = 0; open(); }
    });
  }

  /* ---------- Start ---------- */
  initIntro();
  bindText();
  buildHeroTitle();
  renderNav();
  renderSocial();
  renderCollection();
  renderLimited();
  renderStream();
  renderEvents();
  renderTimeline();
  initReveal();
  initAtmosphere();
  initFlareSwarm();
  initMenu();
  initMarquee();
  initScroll();
  initEgg();
  requestAnimationFrame(frame);
})();
