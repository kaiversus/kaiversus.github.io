---
layout: default
title: Projects Archive
permalink: /projects/
---

<style>
/* =============================================
   PROJECTS PAGE — Redesigned card layout
============================================= */

:root {
  --proj-card:         #111820;
  --proj-card-border:  #1e2830;
  --proj-text:         #c9d1d9;
  --proj-muted:        #556070;
  --proj-thumb-bg:     #0a1018;
  --proj-divider:      #1e2830;
}

html.light {
  --proj-card:         #f0e9d8;
  --proj-card-border:  #d0c8b4;
  --proj-text:         #2a2520;
  --proj-muted:        #8a7a60;
  --proj-thumb-bg:     #e4dcc8;
  --proj-divider:      #d0c8b4;
}

.proj-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px 96px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
}

.proj-page-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 48px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--proj-divider);
}

.proj-page-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 900;
  color: var(--proj-text);
  letter-spacing: 0.08em;
  margin: 0;
}
.proj-page-title .slash { color: var(--green, #3fb950); }

.proj-back {
  font-size: 0.8rem;
  color: var(--proj-muted);
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: color 0.2s;
}
.proj-back:hover { color: var(--green, #3fb950); }

.proj-section { margin-bottom: 56px; }

.proj-section-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--proj-divider);
}

.proj-section-tag {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 3px 10px;
  border: 1px solid;
  border-radius: 2px;
}
.proj-section-tag.green {
  color: var(--green, #3fb950);
  border-color: rgba(63,185,80,0.4);
  background: rgba(63,185,80,0.06);
}
html.light .proj-section-tag.green { color: #1e6e28; border-color: rgba(30,110,40,0.35); }
.proj-section-tag.red {
  color: #ff4060;
  border-color: rgba(255,64,96,0.4);
  background: rgba(255,64,96,0.06);
}
html.light .proj-section-tag.red { color: #9e001c; border-color: rgba(158,0,28,0.35); }

.proj-section-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--proj-text);
  letter-spacing: 0.06em;
}

.proj-section-desc {
  font-size: 0.75rem;
  color: var(--proj-muted);
  margin-left: auto;
}

/* Grid */
.proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* Card */
.proj-card {
  background: var(--proj-card);
  border: 1px solid var(--proj-card-border);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--proj-text);
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  position: relative;
}

.proj-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  transition: background 0.25s;
}

.proj-card:hover { transform: translateY(-4px); }
.proj-card.green:hover { border-color: rgba(63,185,80,0.5); box-shadow: 0 8px 28px rgba(63,185,80,0.1); }
.proj-card.green:hover::before { background: var(--green, #3fb950); }
.proj-card.red:hover { border-color: rgba(255,64,96,0.5); box-shadow: 0 8px 28px rgba(255,64,96,0.1); }
.proj-card.red:hover::before { background: #ff4060; }
html.light .proj-card.green:hover { border-color: rgba(30,110,40,0.5); box-shadow: 0 8px 20px rgba(30,110,40,0.12); }
html.light .proj-card.red:hover { border-color: rgba(158,0,28,0.5); box-shadow: 0 8px 20px rgba(158,0,28,0.12); }

/* Thumbnail */
.proj-thumb {
  width: 100%;
  aspect-ratio: 16 / 8;
  overflow: hidden;
  background: var(--proj-thumb-bg);
  flex-shrink: 0;
}
.proj-thumb img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: top;
  display: block;
  transition: transform 0.4s ease, opacity 0.3s;
  opacity: 0.85;
}
.proj-card:hover .proj-thumb img { transform: scale(1.04); opacity: 1; }
.proj-thumb-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; letter-spacing: 0.15em;
  color: var(--proj-muted); opacity: 0.4;
}

/* Card body */
.proj-card-body {
  padding: 16px 18px 14px;
  display: flex; flex-direction: column; flex: 1; gap: 8px;
}
.proj-card-meta {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 0.7rem; color: var(--proj-muted); letter-spacing: 0.06em;
}
.proj-card-type { font-weight: 700; letter-spacing: 0.1em; }
.proj-card-type.green { color: rgba(63,185,80,0.7); }
.proj-card-type.red   { color: rgba(255,64,96,0.7); }
html.light .proj-card-type.green { color: #1e6e28; }
html.light .proj-card-type.red   { color: #9e001c; }

.proj-card-title {
  font-size: 0.95rem; font-weight: 700;
  color: var(--proj-text); line-height: 1.35;
  margin: 0; transition: color 0.2s;
}
.proj-card.green:hover .proj-card-title { color: var(--green, #3fb950); }
.proj-card.red:hover   .proj-card-title { color: #ff4060; }
html.light .proj-card.green:hover .proj-card-title { color: #1e6e28; }
html.light .proj-card.red:hover   .proj-card-title { color: #9e001c; }

.proj-card-desc {
  font-size: 0.78rem; color: var(--proj-muted);
  line-height: 1.6; margin: 0; flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Footer buttons */
.proj-card-footer {
  display: flex; gap: 8px; flex-wrap: wrap;
  padding: 10px 18px 14px;
  border-top: 1px solid var(--proj-divider);
}
.proj-btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 11px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.08em; text-decoration: none;
  border: 1px solid; border-radius: 3px;
  background: transparent; transition: all 0.18s; white-space: nowrap;
}
.proj-btn svg { width: 11px; height: 11px; fill: currentColor; flex-shrink: 0; }

.proj-btn-primary.green { color: rgba(63,185,80,0.85); border-color: rgba(63,185,80,0.3); }
.proj-btn-primary.green:hover { background: rgba(63,185,80,0.1); color: #3fb950; border-color: rgba(63,185,80,0.6); }
html.light .proj-btn-primary.green { color: #1e6e28; border-color: rgba(30,110,40,0.35); }
html.light .proj-btn-primary.green:hover { background: rgba(30,110,40,0.1); }

.proj-btn-primary.red { color: rgba(255,64,96,0.85); border-color: rgba(255,64,96,0.3); }
.proj-btn-primary.red:hover { background: rgba(255,64,96,0.1); color: #ff4060; border-color: rgba(255,64,96,0.6); }
html.light .proj-btn-primary.red { color: #9e001c; border-color: rgba(158,0,28,0.35); }
html.light .proj-btn-primary.red:hover { background: rgba(158,0,28,0.08); }

.proj-btn-demo { color: #00c8d4; border-color: rgba(0,200,212,0.3); }
.proj-btn-demo:hover { background: rgba(0,200,212,0.08); border-color: rgba(0,200,212,0.6); }
html.light .proj-btn-demo { color: #006677; border-color: rgba(0,102,119,0.35); }

.proj-btn-github { color: var(--proj-muted); border-color: var(--proj-card-border); }
.proj-btn-github:hover { color: var(--proj-text); border-color: var(--proj-muted); background: rgba(128,128,128,0.06); }

@media (max-width: 640px) {
  .proj-grid { grid-template-columns: 1fr; }
  .proj-section-desc { display: none; }
}
</style>

<div class="proj-page">

  <div class="proj-page-header">
    <h1 class="proj-page-title"><span class="slash">// </span>PROJECTS_DIRECTORY</h1>
    <a href="/" class="proj-back">← cd ~</a>
  </div>

  <!-- CAREER -->
  <div class="proj-section">
    <div class="proj-section-label">
      <span class="proj-section-tag green">MAIN</span>
      <span class="proj-section-name">CAREER_OPERATIONS</span>
      <span class="proj-section-desc">Professional tools &amp; research artifacts</span>
    </div>
    <div class="proj-grid">
      {% assign career_projects = site.projects | where: "category", "career" %}
      {% for post in career_projects reversed %}
      <article class="proj-card green">
        <div class="proj-thumb">
          {% if post.image %}<img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
          {% else %}<div class="proj-thumb-placeholder">[ NO PREVIEW ]</div>{% endif %}
        </div>
        <div class="proj-card-body">
          <div class="proj-card-meta">
            <span class="proj-card-type green">[PRO]</span>
            <span>{{ post.date | date: "%Y-%m-%d" }}</span>
          </div>
          <h3 class="proj-card-title">{{ post.title }}</h3>
          <p class="proj-card-desc">{{ post.description | default: "No description provided." }}</p>
        </div>
        <div class="proj-card-footer">
          <a href="{{ post.url }}" class="proj-btn proj-btn-primary green">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> LOGS
          </a>
          {% if post.demo_link %}<a href="{{ post.demo_link }}" target="_blank" rel="noopener" class="proj-btn proj-btn-demo">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg> DEMO
          </a>{% endif %}
          {% if post.github_link %}<a href="{{ post.github_link }}" target="_blank" rel="noopener" class="proj-btn proj-btn-github">
            <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> REPO
          </a>{% endif %}
        </div>
      </article>
      {% endfor %}
    </div>
  </div>

  <!-- PERSONAL -->
  <div class="proj-section">
    <div class="proj-section-label">
      <span class="proj-section-tag red">SIDE</span>
      <span class="proj-section-name">PERSONAL_LAB</span>
      <span class="proj-section-desc">Experiments, utilities &amp; fun stuff</span>
    </div>
    <div class="proj-grid">
      {% assign personal_projects = site.projects | where: "category", "personal" %}
      {% for post in personal_projects reversed %}
      <article class="proj-card red">
        <div class="proj-thumb">
          {% if post.image %}<img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
          {% else %}<div class="proj-thumb-placeholder">[ NO PREVIEW ]</div>{% endif %}
        </div>
        <div class="proj-card-body">
          <div class="proj-card-meta">
            <span class="proj-card-type red">[EXP]</span>
            <span>{{ post.date | date: "%Y-%m-%d" }}</span>
          </div>
          <h3 class="proj-card-title">{{ post.title }}</h3>
          <p class="proj-card-desc">{{ post.description | default: "No description provided." }}</p>
        </div>
        <div class="proj-card-footer">
          <a href="{{ post.url }}" class="proj-btn proj-btn-primary red">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> INFO
          </a>
          {% if post.demo_link %}<a href="{{ post.demo_link }}" target="_blank" rel="noopener" class="proj-btn proj-btn-demo">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg> LIVE
          </a>{% endif %}
          {% if post.github_link %}<a href="{{ post.github_link }}" target="_blank" rel="noopener" class="proj-btn proj-btn-github">
            <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> REPO
          </a>{% endif %}
        </div>
      </article>
      {% endfor %}
    </div>
  </div>

</div>