/* Base de datos de ejemplo: imita db.ref() de Firebase Realtime Database.
   Guarda todo en el navegador de cada visitante (localStorage). No usa internet ni Firebase. */
(function () {
  /* Imagen de ejemplo (emoji sobre fondo de color), sin archivos externos */
  window.DEMO_IMG = function (emoji, bg) {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect width='300' height='300' fill='" + bg + "'/><text x='150' y='185' font-size='130' text-anchor='middle'>" + emoji + "</text></svg>";
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  var KEY = 'demo:' + (window.DEMO_ID || 'x') + ':v1';
  var data = null;
  try { data = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!data) { var sd = typeof window.DEMO_SEED === 'function' ? window.DEMO_SEED() : window.DEMO_SEED; data = JSON.parse(JSON.stringify(sd || {})); }
  var subs = [];
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} };
  var parts = function (p) { return String(p || '').split('/').filter(Boolean); };
  var get = function (p) { return parts(p).reduce(function (o, k) { return o == null ? undefined : o[k]; }, data); };
  var clone = function (v) { return v === undefined ? null : JSON.parse(JSON.stringify(v)); };
  var keysOf = function (p) { var v = get(p); return v && typeof v === 'object' ? Object.keys(v) : []; };
  function snap(p) {
    var ks = parts(p);
    return { key: ks.length ? ks[ks.length - 1] : null, val: function () { return clone(get(p)); }, exists: function () { return get(p) != null; } };
  }
  function put(p, v) {
    var ks = parts(p);
    var o = data;
    for (var i = 0; i < ks.length - 1; i++) {
      if (typeof o[ks[i]] !== 'object' || o[ks[i]] === null) o[ks[i]] = {};
      o = o[ks[i]];
    }
    var last = ks[ks.length - 1];
    if (v === null || v === undefined) delete o[last]; else o[last] = clone(v);
  }
  var rel = function (a, b) { return a === b || a.indexOf(b + '/') === 0 || b.indexOf(a + '/') === 0 || a === '' || b === ''; };
  function write(p, v) {
    if (v && typeof v === 'object' && v.__inc !== undefined) v = (Number(get(p)) || 0) + v.__inc;
    else if (v && typeof v === 'object' && v.__ts) v = Date.now();
    var before = subs.map(function (s) { return s.type === 'child_added' ? keysOf(s.path) : null; });
    put(p, v);
    save();
    var w = parts(p).join('/');
    subs.slice().forEach(function (s, i) {
      if (!rel(w, s.path)) return;
      if (s.type === 'value') setTimeout(function () { s.cb(snap(s.path)); }, 0);
      else if (s.type === 'child_added') {
        keysOf(s.path).forEach(function (k) {
          if (before[i].indexOf(k) < 0) setTimeout(function () { s.cb(snap(s.path + '/' + k)); }, 0);
        });
      }
    });
  }
  var uid = function () { return '-D' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };
  function ref(path) {
    var p = parts(path).join('/');
    return {
      key: parts(p).slice(-1)[0] || null,
      child: function (c) { return ref(p + '/' + c); },
      set: function (v) { write(p, v); return Promise.resolve(); },
      update: function (v) { Object.keys(v || {}).forEach(function (k) { write(p + '/' + k, v[k]); }); return Promise.resolve(); },
      remove: function () { write(p, null); return Promise.resolve(); },
      push: function (v) { var r = ref(p + '/' + uid()); if (v !== undefined) r.set(v); return r; },
      once: function () { return Promise.resolve(snap(p)); },
      transaction: function (fn) {
        var cur = get(p); var nv = fn(cur === undefined ? null : clone(cur));
        if (nv !== undefined) write(p, nv);
        return Promise.resolve({ committed: nv !== undefined, snapshot: snap(p) });
      },
      on: function (type, cb) {
        subs.push({ path: p, type: type, cb: cb });
        if (type === 'value') setTimeout(function () { cb(snap(p)); }, 0);
        else if (type === 'child_added') keysOf(p).forEach(function (k) { setTimeout(function () { cb(snap(p + '/' + k)); }, 0); });
        return cb;
      },
      off: function (type, cb) { subs = subs.filter(function (s) { return !(s.path === p && (!type || s.type === type) && (!cb || s.cb === cb)); }); }
    };
  }
  window.db = { ref: ref };
  window.firebase = { database: { ServerValue: { increment: function (n) { return { __inc: n }; }, TIMESTAMP: { __ts: true } } } };

  /* WhatsApp de demo: en vez de abrir un número inexistente, avisa qué pasaría en la web real */
  if (window.DEMO_FAKE_WA) {
    var aviso = function () { alert('En la web real, acá se abre WhatsApp con el mensaje del pedido ya armado.'); };
    var abrir = window.open;
    window.open = function (u) { if (String(u || '').indexOf('wa.me/' + window.DEMO_FAKE_WA) >= 0) { aviso(); return null; } return abrir.apply(window, arguments); };
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href*="wa.me/' + window.DEMO_FAKE_WA + '"]');
      if (a) { e.preventDefault(); aviso(); }
    }, true);
  }

  /* Barra de demo */
  document.addEventListener('DOMContentLoaded', function () {
    if (window.top !== window.self) return;
    var bar = document.createElement('div');
    bar.setAttribute('style', 'position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:99999;background:#10234a;color:#fff;font:500 13px system-ui,sans-serif;padding:9px 14px;border-radius:999px;display:flex;gap:12px;align-items:center;box-shadow:0 6px 24px #0006;max-width:94vw;flex-wrap:wrap;justify-content:center');
    var info = window.DEMO_INFO || 'Demo con datos de ejemplo';
    bar.innerHTML = '<span>' + info + '</span>' +
      '<button id="demoReset" style="background:#ff6b57;color:#fff;border:0;border-radius:999px;padding:5px 12px;font:600 12px system-ui;cursor:pointer">Reiniciar</button>' +
      '<a href="../../" style="color:#cfe0ff;font-size:12px">Volver a la vitrina</a>';
    document.body.appendChild(bar);
    document.getElementById('demoReset').onclick = function () { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); };
  });
})();
