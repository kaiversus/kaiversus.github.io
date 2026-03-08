---
layout: default
title: Courses Library
permalink: /courses/
---

<style>
:root {
  --ac:           #ffaa00;
  --ac-dim:       rgba(255,170,0,0.08);
  --ac-border:    rgba(255,170,0,0.3);
  --row-bg:       rgba(10,10,10,0.5);
  --row-border:   #1e2830;
  --card-bg:      #111820;
  --card-border:  #1e2830;
  --text:         #c9d1d9;
  --muted:        #556070;
  --divider:      #1e2830;
  --diff-basic:   #3fb950;
  --diff-inter:   #ffaa00;
  --diff-adv:     #ff4060;
}
html.light {
  --ac:           #cc7700;
  --ac-dim:       rgba(200,120,0,0.07);
  --ac-border:    rgba(180,100,0,0.3);
  --row-bg:       rgba(230,220,200,0.5);
  --row-border:   #d0c8b4;
  --card-bg:      #f0e9d8;
  --card-border:  #d0c8b4;
  --text:         #2a2520;
  --muted:        #8a7a60;
  --divider:      #d0c8b4;
  --diff-basic:   #1e6e28;
  --diff-inter:   #cc7700;
  --diff-adv:     #9e001c;
}

.ac-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px 96px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
}

/* ── Header ── */
.ac-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--divider);
  margin-bottom: 40px;
}
.ac-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 900;
  color: var(--ac);
  margin: 0;
  letter-spacing: 0.04em;
}
.ac-title .slash { color: var(--text); opacity: 0.4; }
.ac-status {
  font-size: 0.75rem;
  color: var(--muted);
  letter-spacing: 0.1em;
}
.ac-back {
  display: block;
  color: var(--muted);
  text-decoration: none;
  font-size: 0.8rem;
  margin-bottom: 36px;
  transition: color 0.2s;
}
.ac-back:hover { color: var(--ac); }

/* ── Category rows ── */
.cat-list { display: flex; flex-direction: column; gap: 2px; }
.cat-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  background: var(--row-bg);
  border: 1px solid var(--row-border);
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s, transform 0.2s;
  position: relative;
  overflow: hidden;
}
.cat-row::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--ac);
  transform: scaleY(0);
  transition: transform 0.2s;
}
.cat-row:hover {
  border-color: var(--ac-border);
  background: var(--ac-dim);
  transform: translateX(4px);
}
.cat-row:hover::before { transform: scaleY(1); }

.cat-hex {
  font-size: 0.75rem;
  color: var(--muted);
  letter-spacing: 0.06em;
  min-width: 60px;
}
.cat-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  flex: 1;
  letter-spacing: 0.06em;
  transition: color 0.2s;
}
.cat-row:hover .cat-name { color: var(--ac); }
.cat-count {
  font-size: 0.7rem;
  color: var(--muted);
  padding: 2px 8px;
  border: 1px solid var(--row-border);
  border-radius: 12px;
}
.cat-arrow {
  color: var(--ac);
  font-size: 0.85rem;
  opacity: 0.5;
  transition: opacity 0.2s, transform 0.2s;
}
.cat-row:hover .cat-arrow { opacity: 1; transform: translateX(4px); }

/* ── Detail view ── */
.detail-view { display: none; }
.detail-view.active {
  display: block;
  animation: fadeUp 0.3s ease;
}
@keyframes fadeUp {
  from { opacity:0; transform: translateY(8px); }
  to   { opacity:1; transform: translateY(0); }
}

.detail-header {
  margin-bottom: 28px;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.8rem;
  margin-bottom: 16px;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  transition: color 0.2s;
}
.back-btn:hover { color: var(--ac); }

.detail-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.4rem;
  color: var(--ac);
  margin: 0 0 4px;
}
.detail-sub {
  font-size: 0.75rem;
  color: var(--muted);
}

/* ── Module grid ── */
.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.module-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-top: 2px solid var(--card-border);
  padding: 20px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  color: var(--text);
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  border-radius: 4px;
}
.module-card:hover {
  border-color: var(--ac-border);
  border-top-color: var(--ac);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}
html.light .module-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.1); }

.module-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.68rem;
  color: var(--muted);
  margin-bottom: 12px;
  letter-spacing: 0.05em;
}

.diff-badge {
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 1px 7px;
  border: 1px solid;
  border-radius: 2px;
  font-size: 0.62rem;
}
.diff-badge.basic    { color: var(--diff-basic); border-color: var(--diff-basic); background: rgba(63,185,80,0.07); }
.diff-badge.intermediate { color: var(--diff-inter); border-color: var(--diff-inter); background: rgba(255,170,0,0.07); }
.diff-badge.advanced { color: var(--diff-adv); border-color: var(--diff-adv); background: rgba(255,64,96,0.07); }

.module-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 8px;
  line-height: 1.4;
  transition: color 0.2s;
}
.module-card:hover .module-title { color: var(--ac); }

.module-desc {
  font-size: 0.75rem;
  color: var(--muted);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .module-grid { grid-template-columns: 1fr; }
  .cat-hex { display: none; }
}
</style>

<div class="ac-page">

  <!-- Header -->
  <div class="ac-header">
    <h1 class="ac-title"><span class="slash">// </span>ACADEMY_DATABASE</h1>
    <span class="ac-status">SYS_STATUS: ONLINE</span>
  </div>
  <a href="/" class="ac-back">← BACK_TO_ROOT</a>

  <!-- Category list -->
  <div id="category-view" class="cat-list">

    {% assign all_cats = site.courses | map: "category" | compact | uniq %}
    {% assign idx = 0 %}
    {% for cat in all_cats %}
      {% assign count = site.courses | where: "category", cat | size %}
      {% assign idx = idx | plus: 1 %}
      {% assign hex = idx | prepend: "0x0" %}
      <div class="cat-row" onclick="openCourse('{{ cat | escape }}')">
        <span class="cat-hex">[ {{ hex }} ]</span>
        <span class="cat-name">{{ cat | upcase }}</span>
        <span class="cat-count">{{ count }} modules</span>
        <span class="cat-arrow">›</span>
      </div>
    {% endfor %}

    <!-- Fallback: manual categories if no front-matter -->
    {% if all_cats.size == 0 %}
    <div class="cat-row" onclick="openCourse('Malware')">
      <span class="cat-hex">[ 0x01 ]</span>
      <span class="cat-name">MALWARE ANALYSIS</span>
      <span class="cat-count">— modules</span>
      <span class="cat-arrow">›</span>
    </div>
    <div class="cat-row" onclick="openCourse('TryHackMe')">
      <span class="cat-hex">[ 0x02 ]</span>
      <span class="cat-name">TRYHACKME</span>
      <span class="cat-count">— modules</span>
      <span class="cat-arrow">›</span>
    </div>
    {% endif %}

  </div>

  <!-- Detail view -->
  <div id="detail-view" class="detail-view">
    <div class="detail-header">
      <button class="back-btn" onclick="closeCourse()">
        ← cd .. (RETURN)
      </button>
      <h2 class="detail-title" id="course-title-display">// LOADING...</h2>
      <p class="detail-sub">> List of available modules in this directory:</p>
    </div>

    <div class="module-grid">
      {% assign sorted_courses = site.courses | sort: 'title' %}
      {% for post in sorted_courses %}
      <a class="module-card filter-item"
         href="{{ post.url }}"
         data-cat="{{ post.category | default: 'General' }}">

        <div class="module-meta">
          <span>{{ post.date | date: "%Y-%m-%d" }}</span>
          {% assign diff = post.difficulty | default: 'basic' | downcase %}
          <span class="diff-badge {{ diff }}">{{ diff | upcase }}</span>
        </div>

        <h4 class="module-title">{{ post.title }}</h4>
        <p class="module-desc">{{ post.description | default: "" }}</p>
      </a>
      {% endfor %}
    </div>
  </div>

</div>

<script>
function openCourse(category) {
  document.getElementById('category-view').style.display = 'none';
  const dv = document.getElementById('detail-view');
  dv.classList.add('active');
  document.getElementById('course-title-display').textContent = `// DIRECTORY: ${category.toUpperCase()}`;

  document.querySelectorAll('.filter-item').forEach(el => {
    el.style.display = el.dataset.cat.includes(category) ? 'block' : 'none';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeCourse() {
  document.getElementById('detail-view').classList.remove('active');
  document.getElementById('detail-view').style.display = '';
  const cv = document.getElementById('category-view');
  cv.style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
