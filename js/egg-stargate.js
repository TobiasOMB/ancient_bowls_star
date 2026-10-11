/* ============================================================
   ANCIENT BOWLS – Stargate-Animation für das Easter Egg (optional)
   ------------------------------------------------------------
   Dieses Modul ist freiwillig. Fehlt diese Datei (und css/egg-stargate.css),
   zeigt das Easter Egg die einfache Variante.

   Das Tor ist komplett als Vektorgrafik gebaut (immer scharf, keine Bilddatei).
   Ablauf: Der Glyphenring dreht sich ein, die 9 Chevrons verriegeln nacheinander,
   dann öffnet sich der Ereignishorizont und fließt in einer nahtlosen Endlosschleife.
   Danach erscheint der Name der nächsten Kollektion.
   ============================================================ */
(function () {
  'use strict';

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reihenfolge, in der die Chevrons verriegeln (Winkel in Grad, 0 = oben)
  var ORDER = [-40, 40, -80, 80, -120, 120, 0, -160, 160];

  // 13 erfundene Glyphen (jede passt in ein Feld von ca. 5 x 7 Einheiten)
  var GLYPHS = [
    'M-2 3L0 -3L2 3', 'M-2 -3H2M0 -3V3M-2 3H2', 'M-2 -3L2 -1L-2 1L2 3', 'M-2 3V-3L2 3V-3',
    'M0 -3V3M-2 -1L0 -3L2 -1M-2 1.5H2', 'M-2 -3L2 3M2 -3L-2 3', 'M-2 3A2 2 0 1 1 2 3M-2 3H2', 'M-2 -3H2L-2 3H2',
    'M-2 0H2M0 -3V3M-2 -3L-1 -2M2 -3L1 -2', 'M-2 -3V3M2 -3V3M-2 0H2', 'M-2 3L-2 -1L0 -3L2 -1L2 3', 'M0 -3L2 0L0 3L-2 0Z',
    'M-2 -3H2M-2 -3V3M-2 0H1M1 0L2 3'
  ];

  function pt(r, deg) { var t = deg * Math.PI / 180; return [(r * Math.sin(t)).toFixed(2), (-r * Math.cos(t)).toFixed(2)]; }

  /* ---------- Das Tor als SVG ---------- */
  function gateSVG() {
    var s = '<svg class="sg-gate" viewBox="-110 -110 220 220" aria-hidden="true">';
    s += '<defs>' +
      '<linearGradient id="sgRim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dbe5f1"/><stop offset=".42" stop-color="#7a8ca5"/><stop offset="1" stop-color="#202a36"/></linearGradient>' +
      '<radialGradient id="sgBand" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="100"><stop offset=".72" stop-color="#17212b"/><stop offset=".86" stop-color="#2d3a49"/><stop offset=".97" stop-color="#19232d"/></radialGradient>' +
      '<radialGradient id="sgPlate" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="90"><stop offset=".82" stop-color="#0b1219"/><stop offset=".92" stop-color="#17212b"/><stop offset="1" stop-color="#0c141b"/></radialGradient>' +
      '<linearGradient id="sgWedge" x1="0" x2="1"><stop offset="0" stop-color="#1f2a36"/><stop offset=".5" stop-color="#4d5f75"/><stop offset="1" stop-color="#1b2530"/></linearGradient>' +
      '<filter id="sgGlow" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '</defs>';

    // Grundkörper des Rings
    s += '<path fill="url(#sgBand)" fill-rule="evenodd" d="M100 0A100 100 0 1 0 -100 0A100 100 0 1 0 100 0ZM74 0A74 74 0 1 1 -74 0A74 74 0 1 1 74 0Z"/>';
    s += '<circle r="99" fill="none" stroke="url(#sgRim)" stroke-width="2.2"/><circle r="100.2" fill="none" stroke="#05090d" stroke-opacity=".8" stroke-width=".7"/>';

    // Feine Rillen im äußeren Band
    var i, a;
    s += '<g stroke="#b9cde4" stroke-opacity=".2" stroke-width=".35" fill="none">';
    for (i = 0; i < 156; i++) { a = i * 360 / 156; var p1 = pt(91.8, a), p2 = pt(96.6, a); s += '<path d="M' + p1[0] + ' ' + p1[1] + 'L' + p2[0] + ' ' + p2[1] + '"/>'; }
    s += '</g><circle r="90.6" fill="none" stroke="#04080c" stroke-opacity=".7" stroke-width=".8"/><circle r="90" fill="none" stroke="#9fb6d1" stroke-opacity=".3" stroke-width=".4"/>';

    // Glyphenring (dreht sich)
    s += '<g class="sg-spin"><path fill="url(#sgPlate)" fill-rule="evenodd" d="M89 0A89 89 0 1 0 -89 0A89 89 0 1 0 89 0ZM75.5 0A75.5 75.5 0 1 1 -75.5 0A75.5 75.5 0 1 1 75.5 0Z"/>';
    s += '<g stroke="#9fb6d1" stroke-opacity=".38" stroke-width=".4" fill="none">';
    for (i = 0; i < 39; i++) { a = (i + 0.5) * 360 / 39; var q1 = pt(75.5, a), q2 = pt(89, a); s += '<path d="M' + q1[0] + ' ' + q1[1] + 'L' + q2[0] + ' ' + q2[1] + '"/>'; }
    s += '</g><g fill="none" stroke="#c3d5ea" stroke-width=".6" stroke-linecap="round" stroke-linejoin="round">';
    for (i = 0; i < 39; i++) { a = i * 360 / 39; s += '<path transform="rotate(' + a.toFixed(3) + ') translate(0 -82.3)" d="' + GLYPHS[(i * 5 + 2) % 13] + '"/>'; }
    s += '</g><circle r="89" fill="none" stroke="#04080c" stroke-opacity=".7" stroke-width=".7"/><circle r="75.5" fill="none" stroke="#04080c" stroke-opacity=".7" stroke-width=".7"/></g>';

    // Innere Kante zum Ereignishorizont
    s += '<circle r="74.6" fill="none" stroke="url(#sgRim)" stroke-width="1.5"/><circle r="73.7" fill="none" stroke="#05090d" stroke-opacity=".8" stroke-width=".6"/>';

    // Glanzlichter
    s += '<path d="M-86 -50A99 99 0 0 1 -32 -94" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.1" stroke-linecap="round"/>';
    s += '<path d="M88 44A99 99 0 0 1 36 92" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round"/>';

    // Chevrons (stehen fest)
    ORDER.forEach(function (ang) {
      s += '<g class="sg-ch" transform="rotate(' + ang + ')">' +
        '<polygon points="-8.8,-103 8.8,-103 5.6,-73.4 -5.6,-73.4" fill="url(#sgWedge)" stroke="#9fb6d1" stroke-opacity=".5" stroke-width=".45" stroke-linejoin="round"/>' +
        '<polygon points="-5.1,-100.4 5.1,-100.4 2.9,-89.6 -2.9,-89.6" fill="#070c11" stroke="#000" stroke-opacity=".6" stroke-width=".3"/>' +
        '<polygon class="sg-c" points="-4.4,-99.4 4.4,-99.4 2.5,-90.6 -2.5,-90.6"/>' +
        '<polygon class="sg-c2" points="-2.5,-86.2 2.5,-86.2 0,-79.2"/></g>';
    });
    return s + '</svg>';
  }

  /* ---------- Ereignishorizont: statisches Rauschen in mehreren Schichten, die sich gleichmäßig drehen ---------- */
  function tex(id, freq, seed, octaves, matrix) {
    return '<svg class="sg-tex" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true"><defs>' +
      '<filter id="' + id + '" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">' +
      '<feTurbulence type="fractalNoise" baseFrequency="' + freq + '" numOctaves="' + octaves + '" seed="' + seed + '"/>' +
      '<feColorMatrix type="matrix" values="' + matrix + '"/></filter></defs>' +
      '<rect width="200" height="200" filter="url(#' + id + ')"/></svg>';
  }
  function pool() {
    var s = '<div class="sg-water"><div class="sg-base"></div>';
    s += '<div class="sg-layer l1">' + tex('sgT1', '0.013 0.02', 8, 4, '0 0 0 0 .62  0 0 0 0 .8  0 0 0 0 1  1.5 0 0 0 -.5') + '</div>';
    s += '<div class="sg-layer l2">' + tex('sgT2', '0.017 0.027', 31, 3, '0 0 0 0 .86  0 0 0 0 .95  0 0 0 0 1  5.4 0 0 0 -2.45') + '</div>';
    s += '<div class="sg-layer l3">' + tex('sgT3', '0.045 0.06', 5, 3, '0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  8 0 0 0 -4.0') + '</div>';
    for (var i = 0; i < 5; i++) s += '<i class="sg-rip" style="--i:' + i + '"></i>';
    s += '<div class="sg-core"></div><div class="sg-vig"></div></div>';
    return s;
  }

  function create() {
    var gate = document.createElement('div');
    gate.className = 'sg';
    gate.setAttribute('aria-hidden', 'true');
    gate.innerHTML =
      '<div class="sg-halo"></div>' +
      '<div class="sg-pool">' + pool() + '</div>' +
      gateSVG() +
      '<div class="sg-kaw"></div><div class="sg-flash"></div>';

    var chev = Array.prototype.slice.call(gate.querySelectorAll('.sg-ch'));
    var timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

    function reset() {
      timers.forEach(clearTimeout); timers = [];
      gate.className = 'sg';
      chev.forEach(function (c) { c.classList.remove('on'); });
    }

    return {
      el: gate,
      // Startet die Sequenz. Rückgabe: Millisekunden, nach denen der Name erscheinen soll.
      start: function () {
        reset();
        if (REDUCE) {
          gate.classList.add('is-in', 'is-static', 'is-open');
          chev.forEach(function (c) { c.classList.add('on'); });
          return 0;
        }
        later(function () { gate.classList.add('is-in', 'is-spin'); }, 900);
        chev.forEach(function (c, i) { later(function () { c.classList.add('on'); }, 2300 + i * 125); });
        later(function () { gate.classList.add('is-kaw'); }, 3550);
        later(function () { gate.classList.add('is-open'); }, 3650);
        return 2800;
      },
      stop: reset
    };
  }

  window.StargateEgg = { create: create };
})();
