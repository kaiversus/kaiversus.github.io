// ══════════════════════════════════════
// MATRIX RAIN — RED
// ══════════════════════════════════════
(function() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx    = canvas.getContext('2d');
  const CHARS  = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,./<>?\\~`';
  const FONT_SZ = 14;
  let cols, drops;

  function resize() {
    const banner = canvas.parentElement;
    canvas.width  = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
    cols  = Math.floor(canvas.width / FONT_SZ);
    drops = Array.from({ length: cols }, () => Math.random() * -60 | 0);
  }

  function draw() {
    const isLight = document.documentElement.classList.contains('light');
    ctx.fillStyle = isLight ? 'rgba(240,232,216,0.2)' : 'rgba(8,0,13,0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${FONT_SZ}px "Courier New", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.random() * CHARS.length | 0];
      const y    = drops[i] * FONT_SZ;
      const x    = i * FONT_SZ;

      if (drops[i] * FONT_SZ > 0 && drops[i] * FONT_SZ < canvas.height) {
        // Light mode: warm amber tones; dark mode: red
        const isLight = document.documentElement.classList.contains('light');
        if (isLight) {
          ctx.fillStyle = `rgba(160,100,30,${0.35 + Math.random()*0.25})`;
          ctx.fillText(char, x, y);
          for (let t = 1; t < 4; t++) {
            const by = y - t * FONT_SZ;
            if (by > 0) {
              ctx.fillStyle = `rgba(${130 - t*20},${80 - t*15},${20},${0.25 - t*0.06})`;
              ctx.fillText(CHARS[Math.random() * CHARS.length | 0], x, by);
            }
          }
        } else {
          ctx.fillStyle = `rgba(255,160,160,${0.7 + Math.random()*0.3})`;
          ctx.fillText(char, x, y);
          const depth = Math.random();
          if (depth > 0.7)      ctx.fillStyle = `rgba(200,10,40,0.85)`;
          else if (depth > 0.4) ctx.fillStyle = `rgba(160,0,30,0.65)`;
          else                  ctx.fillStyle = `rgba(90,0,20,0.45)`;
          for (let t = 1; t < 4; t++) {
            const by = y - t * FONT_SZ;
            if (by > 0) {
              const alpha = 0.6 - t * 0.15;
              ctx.fillStyle = `rgba(${180 - t*30},0,${20 + t*5},${alpha})`;
              ctx.fillText(CHARS[Math.random() * CHARS.length | 0], x, by);
            }
          }
        }
      }

      // reset drop when it reaches bottom (randomly)
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 45);
})();

const asciiEl = document.getElementById('ascii-art');
if (asciiEl) asciiEl.setAttribute('data-text', asciiEl.textContent);

// ── Syslog prompt typer ──
const syslogMsgs = [
  'Malware is just misunderstood software...',
  'If it runs, it can be reversed.',
  'There is no patch for human stupidity.',
  'Access granted. Proceed with caution.',
];
const syslogEl = document.getElementById('syslog-msg');
let sIdx = 0, sChar = 0, sDel = false;
function typeSyslog() {
  if (!syslogEl) return;
  const cur = syslogMsgs[sIdx];
  if (!sDel) {
    syslogEl.textContent = cur.slice(0, ++sChar);
    if (sChar === cur.length) setTimeout(() => { sDel=true; typeSyslog(); }, 2800);
    else setTimeout(typeSyslog, 42);
  } else {
    syslogEl.textContent = cur.slice(0, --sChar);
    if (sChar === 0) { sDel=false; sIdx=(sIdx+1)%syslogMsgs.length; setTimeout(typeSyslog,500); }
    else setTimeout(typeSyslog, 20);
  }
}
setTimeout(typeSyslog, 800);

// ── Role cycling typer ──
const roles = [
  'Reverse Engineering · Binary Exploitation · Malware Analysis',
  'Dissecting bits. Constructing exploits.',
  'Breaking things to understand how they work.',
];
const roleEl = document.getElementById('typed-role');
let rIdx = 0, rChar = 0, deleting = false;
function typeRole() {
  const cur = roles[rIdx];
  if (!deleting) {
    if (roleEl) roleEl.textContent = cur.slice(0, ++rChar);
    if (rChar === cur.length) { setTimeout(() => { deleting=true; typeRole(); }, 2200); }
    else setTimeout(typeRole, 38);
  } else {
    if (roleEl) roleEl.textContent = cur.slice(0, --rChar);
    if (rChar === 0) { deleting=false; rIdx=(rIdx+1)%roles.length; setTimeout(typeRole,400); }
    else setTimeout(typeRole, 18);
  }
}
setTimeout(typeRole, 700);

// ── Terminal body typer ──
const tb = document.getElementById('terminal-body');

const lines = [
  { type: 'cmd',     prompt: 'kaiversus@blog:~$ ', text: 'whoami' },
  { type: 'out',     text: 'Dinh Thien Bao  //  kaiversus' },
  { type: 'blank' },
  { type: 'cmd',     prompt: 'kaiversus@blog:~$ ', text: 'cat focus.txt' },
  { type: 'out',     text: 'Reverse Engineering · Binary Exploitation · Malware Analysis' },
  { type: 'blank' },
  { type: 'cmd',     prompt: 'kaiversus@blog:~$ ', text: 'uptime' },
  { type: 'comment', text: '# 3 years active  |  40+ writeups  |  [ SYSTEM: ONLINE ]' },
  { type: 'blank' },
  { type: 'cursor' },
];

let lineIdx = 0, charIdx = 0, currentEl = null;

function nextLine() {
  if (lineIdx >= lines.length) return;
  const l = lines[lineIdx];

  if (l.type === 'blank') {
    const d = document.createElement('div');
    d.className = 't-blank';
    tb.appendChild(d);
    lineIdx++; charIdx = 0;
    setTimeout(nextLine, 60);
    return;
  }

  if (l.type === 'cursor') {
    const row = document.createElement('div'); row.className = 't-line';
    const p = document.createElement('span'); p.className = 't-prompt';
    p.textContent = 'kaiversus@blog:~$ ';
    const c = document.createElement('span'); c.className = 't-cursor';
    row.appendChild(p); row.appendChild(c);
    tb.appendChild(row);
    return;
  }

  if (charIdx === 0) {
    const row = document.createElement('div'); row.className = 't-line';
    if (l.type === 'cmd') {
      const p = document.createElement('span'); p.className = 't-prompt';
      p.textContent = l.prompt;
      row.appendChild(p);
    }
    const span = document.createElement('span');
    span.className = l.type === 'cmd' ? 't-cmd'
                   : l.type === 'comment' ? 't-out t-comment'
                   : 't-out';
    row.appendChild(span);
    tb.appendChild(row);
    currentEl = span;
  }

  if (charIdx < l.text.length) {
    currentEl.textContent += l.text[charIdx];
    charIdx++;
    const delay = l.type === 'cmd' ? 48 : 10;
    setTimeout(nextLine, delay);
  } else {
    lineIdx++; charIdx = 0;
    const pause = l.type === 'cmd' ? 280 : 28;
    setTimeout(nextLine, pause);
  }
}

setTimeout(nextLine, 1000);

// KIỂM TRA VÀ ÁP DỤNG THEME KHI LOAD TRANG
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.documentElement.classList.add('light'); // Thêm class .light vào thẻ html
} else {
    document.documentElement.classList.remove('light');
}

// XỬ LÝ KHI BẤM NÚT TOGGLE
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Bật/tắt class 'light'
        document.documentElement.classList.toggle('light');
        
        // Kiểm tra xem hiện tại đang có class 'light' không để lưu vào localStorage
        const newTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
    });
}

// Restore saved preference
if (localStorage.getItem('theme') === 'light') {
  html.classList.add('light');
  toggleBtn.textContent = '☾';
}

toggleBtn.addEventListener('click', () => {
  const isLight = html.classList.toggle('light');
  toggleBtn.textContent = isLight ? '☾' : '☀';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
