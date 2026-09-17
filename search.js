(function () {
  var data = null, loading = false;
  var box = document.getElementById('q');
  var hits = document.getElementById('hits');
  var btn = document.getElementById('menuBtn');
  var sidebar = document.getElementById('sidebar');
  var prefix = window.SITE_PREFIX || '';
  if (btn && sidebar) {
    btn.addEventListener('click', function () { sidebar.classList.toggle('open'); });
  }
  if (!box || !hits) return;

  function ensureData(cb) {
    if (data) return cb();
    if (loading) return setTimeout(function () { ensureData(cb); }, 120);
    loading = true;
    var s = document.createElement('script');
    s.src = prefix + 'search-data.js';
    s.onload = function () { data = window.SEARCH_DATA || []; cb(); };
    s.onerror = function () { loading = false; };
    document.body.appendChild(s);
  }

  box.addEventListener('focus', function () { ensureData(function () {}); });
  box.addEventListener('input', function () {
    ensureData(function () {
      var q = box.value.trim().toLowerCase();
      hits.innerHTML = '';
      if (!q) { hits.classList.remove('show'); return; }
      var n = 0;
      for (var i = 0; i < data.length && n < 30; i++) {
        var d = data[i];
        if (d.t.toLowerCase().indexOf(q) < 0 && d.x.toLowerCase().indexOf(q) < 0) continue;
        var a = document.createElement('a');
        a.href = prefix + d.u;
        var sm = document.createElement('small');
        sm.textContent = d.s;
        a.appendChild(sm);
        a.appendChild(document.createTextNode(d.t));
        hits.appendChild(a);
        n++;
      }
      if (n === 0) {
        var e = document.createElement('a');
        e.textContent = '没有匹配的文章';
        hits.appendChild(e);
      }
      hits.classList.add('show');
    });
  });
  document.addEventListener('click', function (ev) {
    if (ev.target !== box && !hits.contains(ev.target)) hits.classList.remove('show');
  });
})();
