/* Brand bubble shapes for the PM page — the construction from AIQB-local/BRAND.md ("Bubble construction"):
   rounded rectangles merged (outer corners 24, inner 12), a straight angled tail or a stepped corner at any
   corner (tail-left, step-right, tail-bottom-left, step-bottom-right, ...), and a slit in the right side where there is room. Geometry ported from AIQB-local/script.js. */
(function () {
  if (!('clipPath' in document.documentElement.style)) return;
  var BUBBLE = { R: 24, r: 12, TAIL: 22, SLIT: 12, INSET: 16 };
  function bubblePoints(W, H, spec, p, safe) {
    var R = BUBBLE.R, r = BUBBLE.r, TAIL = BUBBLE.TAIL, SLIT = BUBBLE.SLIT, INSET = BUBBLE.INSET;
    var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
    var has = function (f) { return (spec || '').split(' ').indexOf(f) >= 0; };
    var a = clamp(W * 0.3, 56, 150);
    var tFull = Math.min(clamp(H * 0.12, 28, 52), safe - 8);
    var t = Math.max(2, Math.min(tFull * p, safe - 8));
    var tail = TAIL * Math.min(1, p);
    var s = Math.round(H * 0.38);
    var left = tFull >= 20 && (has('tail-left') ? 'tail' : has('step-left') ? 'step' : null);
    var right = tFull >= 20 && (has('tail-right') ? 'tail' : has('step-right') ? 'step' : null);
    var slit = has('slit') && s >= tFull + 2 * R && s + SLIT + 2 * R < safe;
    var pts = [];
    if (left) pts.push([0, t, R], [a, t, r], left === 'tail' ? [a - tail, 0, 0] : [a, 0, R]);
    else pts.push([0, 0, R]);
    if (right) pts.push(right === 'tail' ? [W - a + tail, 0, 0] : [W - a, 0, R], [W - a, t, r], [W, t, R]);
    else pts.push([W, 0, R]);
    var bl = tFull >= 20 && (has('tail-bottom-left') ? 'tail' : has('step-bottom-left') ? 'step' : null);
    var br = tFull >= 20 && !slit && (has('tail-bottom-right') ? 'tail' : has('step-bottom-right') ? 'step' : null);
    if (slit) {
      var d = Math.round(INSET + 2 + (W * 0.38 - INSET - 2) * Math.min(1, p));
      pts.push([W, s, R], [W - d, s, SLIT / 2], [W - d, s + SLIT, SLIT / 2], [W - INSET, s + SLIT, R], [W - INSET, H, R]);
    } else if (br) pts.push([W, H - t, R], [W - a, H - t, r], br === 'tail' ? [W - a + tail, H, 0] : [W - a, H, R]);
    else pts.push([W, H, R]);
    if (bl) pts.push(bl === 'tail' ? [a - tail, H, 0] : [a, H, R], [a, H - t, r], [0, H - t, R]);
    else pts.push([0, H, R]);
    return pts;
  }
  function roundedOutline(pts) {
    var K = 0.5523, n = pts.length, parts = [];
    var f = function (v) { return v.map(function (c) { return c.toFixed(1); }).join(' '); };
    pts.forEach(function (pt, i) {
      var x = pt[0], y = pt[1], rad = pt[2];
      var pp = pts[(i + n - 1) % n], np = pts[(i + 1) % n];
      var l1 = Math.hypot(x - pp[0], y - pp[1]), l2 = Math.hypot(np[0] - x, np[1] - y);
      var u1 = [(x - pp[0]) / l1, (y - pp[1]) / l1], u2 = [(np[0] - x) / l2, (np[1] - y) / l2];
      var k = Math.min(rad, l1 / 2, l2 / 2);
      var s = [x - u1[0] * k, y - u1[1] * k], e = [x + u2[0] * k, y + u2[1] * k];
      var c1 = [s[0] + u1[0] * k * K, s[1] + u1[1] * k * K], c2 = [e[0] - u2[0] * k * K, e[1] - u2[1] * k * K];
      parts.push((i ? 'L ' : 'M ') + f(s) + ' C ' + f(c1) + ' ' + f(c2) + ' ' + f(e));
    });
    return parts.join(' ') + ' Z';
  }

  var tiles = [].slice.call(document.querySelectorAll('[data-bubble]'));
  if (!tiles.length) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progress = new Map();
  function depthOf(tile){ return parseFloat(tile.dataset.bubbleDepth) || 1; }   // data-bubble-depth: how deep the finished cut is (1 = the brand bubble)
  function shape(tile) {
    var W = tile.clientWidth, H = tile.clientHeight; if (!W || !H) return;
    var title = tile.querySelector('h3, h4, .bubble-safe');
    var safe = title ? title.offsetTop - 12 : H;
    var p = progress.has(tile) ? progress.get(tile) : depthOf(tile);
    tile.style.clipPath = "path('" + roundedOutline(bubblePoints(W, H, tile.dataset.bubble, p, safe)) + "')";
    tile.classList.add('is-shaped');
  }
  var tweens = new Map();
  function cutTo(tile, to, ms, delay) {
    cancelAnimationFrame(tweens.get(tile));
    var from = progress.has(tile) ? progress.get(tile) : 1, start = performance.now() + (delay || 0);
    var ease = function (x) { return 1 - Math.pow(1 - x, 3); };
    (function frame(now) {
      var k = Math.min(1, Math.max(0, (now - start) / ms));
      progress.set(tile, from + (to - from) * ease(k)); shape(tile);
      if (k < 1) tweens.set(tile, requestAnimationFrame(frame));
    })(performance.now());
    setTimeout(function () {   // if frames were throttled (background tab), land on the finished cut anyway
      if (progress.get(tile) !== to) { cancelAnimationFrame(tweens.get(tile)); progress.set(tile, to); shape(tile); }
    }, ms + (delay || 0) + 250);
  }
  var animating = !reduced && 'IntersectionObserver' in window;
  var inLoop = function (t) { return 'bubbleBreathe' in t.dataset; };
  if (animating) tiles.forEach(function (t) { progress.set(t, inLoop(t) ? depthOf(t) : 0); });
  tiles.forEach(shape);
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (es) { es.forEach(function (e) { shape(e.target); }); });
    tiles.forEach(function (t) { ro.observe(t); });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { tiles.forEach(shape); });
  if (animating) {
    var groups = new Map();   // each list of bubbles crops in when it scrolls into view (audience, contact, ...)
    tiles.forEach(function (t) { var g = t.parentElement; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(t); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        (groups.get(e.target) || []).forEach(function (t, i) { if (!inLoop(t)) cutTo(t, depthOf(t), 650, i * 90); });
      });
    }, { threshold: 0.35 });
    groups.forEach(function (_, g) { io.observe(g); });
  }
  // data-bubble-breathe: the cut keeps deepening and easing back (tail, step and slit grow and retract), never jumping
  tiles.filter(function (t) { return 'bubbleBreathe' in t.dataset; }).forEach(function (t) {
    if (!animating) return;
    var base = depthOf(t), t0 = performance.now() + 1500;
    (function frame(now) {
      var k = Math.max(0, now - t0) / 1000;
      progress.set(t, base * (0.72 + 0.28 * Math.sin(k * 0.9)));   // 0.95 … 1.3 … 0.57 of the brand depth
      shape(t); requestAnimationFrame(frame);
    })(performance.now());
  });
  tiles.forEach(function (t) {   // hover: the cut goes a little deeper, as on the brand site (unless data-bubble-static)
    if ('bubbleStatic' in t.dataset) return;
    t.addEventListener('mouseenter', function () { if (animating) cutTo(t, depthOf(t) * 1.3, 320); });
    t.addEventListener('mouseleave', function () { if (animating) cutTo(t, depthOf(t), 420); });
  });
})();
