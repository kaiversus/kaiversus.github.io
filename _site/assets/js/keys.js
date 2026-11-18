/* kaiversus — điều hướng bằng bàn phím, grep, statusline, mục lục */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var sl = $('#statusline'), slMode = $('#sl-mode'), slSec = $('#sl-sec'), slMsg = $('#sl-msg'),
      slOff = $('#sl-off'), slPct = $('#sl-pct');
  var bar = document.createElement('span'); bar.className = 'sl-progress'; sl.appendChild(bar);

  function setMode(m) { sl.dataset.mode = m; slMode.textContent = m; }
  var msgT;
  function flash(t) { slMsg.textContent = t; clearTimeout(msgT); msgT = setTimeout(function () { slMsg.textContent = ''; }, 1800); }

  /* ── offset + phần trăm ── */
  var ticking = false;
  function updateScroll() {
    ticking = false;
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    var hex = Math.max(0, Math.round(y)).toString(16);
    slOff.textContent = '0x' + ('0000' + hex).slice(-Math.max(4, hex.length));
    var p = max > 0 ? y / max : 0;
    slPct.textContent = max <= 0 ? 'all' : y <= 2 ? 'top' : y >= max - 2 ? 'bot' : Math.round(p * 100) + '%';
    bar.style.width = (p * 100).toFixed(2) + '%';
    if (onScroll) onScroll();
  }
  var onScroll = null;
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); } }, { passive: true });

  /* ── help ── */
  var help = $('#help');
  function toggleHelp(force) {
    var show = typeof force === 'boolean' ? force : help.hidden;
    help.hidden = !show;
    if (show) $('[data-help-close]', help).focus();
  }
  $$('[data-help]').forEach(function (b) { b.addEventListener('click', function () { toggleHelp(true); }); });
  $('[data-help-close]').addEventListener('click', function () { toggleHelp(false); });
  help.addEventListener('click', function (e) { if (e.target === help) toggleHelp(false); });

  /* ── terminal ── */
  var term = $('#web-term-window');
  function termOpen() { return term && term.style.display !== 'none'; }
  function openTerm() {
    if (!termOpen()) $('#web-term-toggle').click();
    setMode('TERM');
  }
  function closeTerm() { if (termOpen()) term.style.display = 'none'; setMode('NORMAL'); }
  $$('[data-term]').forEach(function (b) { b.addEventListener('click', openTerm); });
  var tc = $('#web-term-close'); if (tc) tc.addEventListener('click', function () { setMode('NORMAL'); });

  /* ════════════ DANH SÁCH (trang chủ, trang mục) ════════════ */
  var rowsAll = $$('.row');
  var grep = $('#grep');
  var list = null;
  if (rowsAll.length) list = initList();

  function initList() {
    var chips = $$('.chip'), grepN = $('#grep-n'), empty = $('#rows-empty');
    var kind = 'all', sel = -1, visible = rowsAll.slice();
    rowsAll.forEach(function (r) { var t = $('.row-title', r); t.dataset.raw = t.textContent; });

    function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
    function escHtml(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

    function apply() {
      var q = grep ? grep.value.trim().toLowerCase() : '';
      var re = q ? new RegExp('(' + esc(q) + ')', 'ig') : null;
      visible = [];
      rowsAll.forEach(function (r) {
        var ok = (kind === 'all' || r.dataset.kind === kind) && (!q || r.dataset.q.indexOf(q) !== -1 || $('.row-title', r).dataset.raw.toLowerCase().indexOf(q) !== -1);
        r.hidden = !ok;
        var t = $('.row-title', r);
        t.innerHTML = re ? escHtml(t.dataset.raw).replace(re, '<mark>$1</mark>') : escHtml(t.dataset.raw);
        if (ok) visible.push(r);
      });
      $$('.group').forEach(function (g) { g.hidden = !$$('.row:not([hidden])', g).length; });
      if (grepN) grepN.textContent = (q || kind !== 'all') ? visible.length + '/' + rowsAll.length : '';
      if (empty) empty.hidden = visible.length > 0;
      select(visible.length ? Math.min(Math.max(sel, 0), visible.length - 1) : -1, false, sel < 0);
    }

    function select(i, scroll, quiet) {
      rowsAll.forEach(function (r) { r.classList.remove('is-sel'); });
      sel = i;
      if (quiet) { sel = -1; slSec.textContent = visible.length + ' entries'; return; }
      if (i < 0 || !visible[i]) { slSec.textContent = '0 entries'; return; }
      var r = visible[i];
      r.classList.add('is-sel');
      slSec.textContent = (i + 1) + '/' + visible.length + '  ' + $('.row-title', r).dataset.raw;
      if (scroll) {
        var b = r.getBoundingClientRect(), top = 80, bot = innerHeight - 60;
        if (b.top < top || b.bottom > bot) scrollTo({ top: scrollY + b.top - innerHeight / 2 + b.height / 2, behavior: 'smooth' });
      }
    }

    function setKind(k, push) {
      kind = k;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.kind === k)); });
      if (push !== false) history.replaceState(null, '', k === 'all' ? location.pathname : '#' + k);
      apply();
    }
    chips.forEach(function (c) { c.addEventListener('click', function () { setKind(c.dataset.kind); }); });

    if (grep) {
      grep.addEventListener('input', function () { sel = -1; apply(); });
      grep.addEventListener('focus', function () { setMode('GREP'); });
      grep.addEventListener('blur', function () { setMode('NORMAL'); });
      grep.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); if (grep.value) { grep.value = ''; apply(); } else grep.blur(); }
        else if (e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); grep.blur(); select(0, true); }
      });
    }
    $$('[data-clear]').forEach(function (b) { b.addEventListener('click', clear); });
    function clear() { if (grep) grep.value = ''; setKind('all'); }

    rowsAll.forEach(function (r) {
      r.addEventListener('mousemove', function () { var i = visible.indexOf(r); if (i !== sel) select(i, false); });
    });

    var h = location.hash.slice(1);
    if (h && chips.some(function (c) { return c.dataset.kind === h; })) setKind(h, false); else apply();

    return {
      move: function (d) { if (!visible.length) return; select(sel < 0 ? 0 : Math.min(visible.length - 1, Math.max(0, sel + d)), true); },
      open: function (newTab) { var r = visible[sel]; if (!r) return false; var a = $('a', r); if (newTab) open(a.href, '_blank'); else location.href = a.href; return true; },
      first: function () { select(0, true); }, last: function () { select(visible.length - 1, true); },
      kindAt: function (n) { var c = chips[n - 1]; if (c) setKind(c.dataset.kind); },
      clear: clear,
      busy: function () { return (grep && grep.value) || kind !== 'all' || sel >= 0; },
      unselect: function () { select(-1, false, true); }
    };
  }

  /* ════════════ BÀI VIẾT ════════════ */
  var prose = $('#prose');
  var heads = [];
  if (prose) initPost();

  function initPost() {
    var tocList = $('#toc-list'), toc = $('#toc');
    var n2 = 0, n3 = 0, used = {};
    heads = $$('h2, h3', prose).filter(function (h) { return !h.closest('.pe-lab, [markdown="0"]'); });
    heads.forEach(function (h) {
      var text = h.textContent.trim();
      if (!h.id) {
        var base = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
        var id = base, k = 2; while (used[id] || document.getElementById(id)) id = base + '-' + k++;
        h.id = id;
      }
      used[h.id] = 1;
      var off;
      if (h.tagName === 'H2') { n2++; n3 = 0; off = '0x' + ('0' + n2.toString(16)).slice(-2); var tag = document.createElement('span'); tag.className = 'h-off'; tag.textContent = off; h.insertBefore(tag, h.firstChild); }
      else { n3++; off = '.' + n3; }
      var a = document.createElement('a'); a.className = 'h-anchor'; a.href = '#' + h.id; a.textContent = '#'; a.setAttribute('aria-hidden', 'true'); a.tabIndex = -1;
      h.appendChild(a);
      h.dataset.label = text;
      var li = document.createElement('li'); li.className = h.tagName === 'H2' ? 'lv2' : 'lv3';
      var la = document.createElement('a'); la.href = '#' + h.id;
      la.innerHTML = '<span class="off">' + off + '</span><span></span>'; la.lastChild.textContent = text;
      la.addEventListener('click', function () { if (toc) toc.classList.remove('open'); });
      li.appendChild(la); tocList.appendChild(li);
      h._toc = la;
    });

    var cur;
    onScroll = function () {
      var c = null;
      for (var i = 0; i < heads.length; i++) { if (heads[i].getBoundingClientRect().top <= 90) c = heads[i]; else break; }
      if (c === cur) return;
      if (cur && cur._toc) cur._toc.classList.remove('on');
      cur = c;
      if (cur) {
        cur._toc.classList.add('on');
        var ta = cur._toc, tb = toc.getBoundingClientRect(), b = ta.getBoundingClientRect();
        if (b.top < tb.top || b.bottom > tb.bottom) toc.scrollTop += b.top - tb.top - tb.height / 3;
      }
      slSec.textContent = cur ? '§ ' + cur.dataset.label : (heads.length ? '§ contents' : '');
    };
    slSec.addEventListener('click', function () { toc.classList.toggle('open'); });

    /* code: nhãn ngôn ngữ + nút copy; bảng cuộn ngang */
    $$('div.highlighter-rouge, figure.highlight, :scope > pre', prose).forEach(function (el) {
      if (el.closest('.pe-lab, [markdown="0"]')) return;
      var box = el.matches('div.highlighter-rouge') ? ($('div.highlight', el) || el) : el;
      var m = (el.className || '').match(/language-([\w+-]+)/);
      if (m && m[1] !== 'plaintext') { var l = document.createElement('span'); l.className = 'code-lang'; l.textContent = m[1]; box.appendChild(l); }
      var b = document.createElement('button'); b.type = 'button'; b.className = 'copy-btn'; b.textContent = 'copy';
      b.addEventListener('click', function () {
        var code = $('code', box) || $('pre', box) || box;
        navigator.clipboard.writeText(code.innerText).then(function () {
          b.textContent = 'copied'; b.classList.add('ok'); flash('yanked ' + code.innerText.split('\n').length + ' lines');
          setTimeout(function () { b.textContent = 'copy'; b.classList.remove('ok'); }, 1600);
        });
      });
      box.appendChild(b);
    });
    $$('table', prose).forEach(function (t) {
      if (t.closest('.pe-lab, [markdown="0"], .table-wrap')) return;
      var w = document.createElement('div'); w.className = 'table-wrap'; t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
  }

  function jumpHeading(d) {
    if (!heads.length) return;
    var y = 92, i;
    if (d > 0) { for (i = 0; i < heads.length; i++) if (heads[i].getBoundingClientRect().top > y + 4) break; }
    else { for (i = heads.length - 1; i >= 0; i--) if (heads[i].getBoundingClientRect().top < y - 30) break; }
    var h = heads[i]; if (!h) { flash(d > 0 ? 'cuối bài' : 'đầu bài'); return; }
    scrollTo({ top: scrollY + h.getBoundingClientRect().top - 24, behavior: 'smooth' });
  }

  /* ════════════ BÀN PHÍM ════════════ */
  var lastG = 0;
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target, typing = t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

    if (e.key === 'Escape') {
      if (!help.hidden) { toggleHelp(false); return; }
      if (termOpen()) { closeTerm(); return; }
      var toc = $('#toc'); if (toc && toc.classList.contains('open')) { toc.classList.remove('open'); return; }
      if (list && !typing && list.busy()) { list.clear(); list.unselect(); }
      return;
    }
    if (typing || termOpen()) return;
    if (!help.hidden) { if (e.key === 'q' || e.key === '?') toggleHelp(false); return; }
    if (t.closest && t.closest('.pe-lab, [markdown="0"]')) return;

    var k = e.key;
    if (k === '?') { e.preventDefault(); toggleHelp(true); return; }
    if (k === ':') { e.preventDefault(); openTerm(); return; }
    if (k === 'G') { e.preventDefault(); if (list && !prose) list.last(); else scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); return; }
    if (k === 'g') {
      var now = Date.now();
      if (now - lastG < 450) { e.preventDefault(); lastG = 0; if (list && !prose) list.first(); scrollTo({ top: 0, behavior: 'smooth' }); }
      else lastG = now;
      return;
    }

    if (list && !prose) {
      if (k === 'j' || k === 'ArrowDown') { e.preventDefault(); list.move(1); return; }
      if (k === 'k' || k === 'ArrowUp') { e.preventDefault(); list.move(-1); return; }
      if (k === 'Enter' || k === 'l' || k === 'o') { if (list.open(k === 'o')) e.preventDefault(); return; }
      if (k === '/') { if (grep) { e.preventDefault(); grep.focus(); grep.select(); } return; }
      if (/^[1-9]$/.test(k)) { list.kindAt(+k); return; }
      if (k === 'h') { if (location.pathname !== '/') location.href = '/'; return; }
    }

    if (prose) {
      if (k === 'j') { e.preventDefault(); scrollBy({ top: 96, behavior: 'smooth' }); return; }
      if (k === 'k') { e.preventDefault(); scrollBy({ top: -96, behavior: 'smooth' }); return; }
      if (k === 'd') { e.preventDefault(); scrollBy({ top: innerHeight / 2, behavior: 'smooth' }); return; }
      if (k === 'u') { e.preventDefault(); scrollBy({ top: -innerHeight / 2, behavior: 'smooth' }); return; }
      if (k === ']') { e.preventDefault(); jumpHeading(1); return; }
      if (k === '[') { e.preventDefault(); jumpHeading(-1); return; }
      if (k === 't') {
        e.preventDefault();
        var tc = $('#toc');
        if (matchMedia('(max-width: 900px)').matches) tc.classList.toggle('open');
        else { document.body.classList.toggle('no-toc'); flash(document.body.classList.contains('no-toc') ? 'focus mode' : 'toc on'); }
        return;
      }
      if (k === 'y') {
        e.preventDefault();
        var on = $('#toc-list a.on'), url = location.origin + location.pathname + (on ? on.getAttribute('href') : '');
        navigator.clipboard.writeText(url).then(function () { flash('yanked ' + (on ? on.getAttribute('href') : 'url')); });
        return;
      }
      if (k === 'h') { var b = $('[data-back]'); if (b) location.href = b.href; return; }
    }
  });

  /* ── dòng gõ chữ ở đầu trang chủ (từ bản cũ) ── */
  var typed = $('#typed');
  if (typed) {
    var lines = typed.dataset.lines.split('|'), li = 0, ci = 0, del = false;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) typed.textContent = lines[0];
    else (function tick() {
      var cur = lines[li];
      if (!del) {
        typed.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { del = true; return setTimeout(tick, 2600); }
        setTimeout(tick, 42);
      } else {
        typed.textContent = cur.slice(0, --ci);
        if (ci === 0) { del = false; li = (li + 1) % lines.length; return setTimeout(tick, 450); }
        setTimeout(tick, 18);
      }
    })();
  }

  setMode('NORMAL');
  updateScroll();
})();
