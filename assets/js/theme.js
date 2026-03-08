/**
 * theme.js — Global theme manager
 * Handles dark/light mode sync across ALL pages via localStorage.
 * Must be included in <head> to prevent flash of wrong theme (FOCT).
 */

// ── 1. Apply saved theme IMMEDIATELY (before DOM renders) ──
(function () {
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }
})();

// ── 2. Wire up toggle button after DOM is ready ──
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  // Sync button icon with current state
  function syncIcon() {
    btn.textContent = document.documentElement.classList.contains('light') ? '☾' : '☀';
  }

  syncIcon();

  btn.addEventListener('click', function () {
    const isLight = document.documentElement.classList.toggle('light');
    syncIcon();
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
});
