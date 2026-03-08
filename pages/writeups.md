---
layout: default
title: Writeups Archive
permalink: /writeups/
---

<style>
/* Light-mode aware card variables */
:root {
  --wu-card-bg:       transparent;
  --wu-card-border:   rgba(255,255,255,0.1);
  --wu-title-color:   #ffffff;
  --wu-desc-color:    #888888;
  --wu-meta-color:    #666666;
  --wu-cta-color:     #555555;
  --wu-path-color:    #666666;
  --wu-cd-color:      #666666;
}

html.light {
  --wu-card-bg:       rgba(240,233,220,0.7);
  --wu-card-border:   #c8bfaa;
  --wu-title-color:   #1c1a14;
  --wu-desc-color:    #5a5040;
  --wu-meta-color:    #7a6a50;
  --wu-cta-color:     #8a7a60;
  --wu-path-color:    #7a6a50;
  --wu-cd-color:      #7a6a50;
}

.wu-page-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
  color: var(--wu-meta-color);
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
}

.wu-page-header a {
  color: var(--wu-cd-color);
  text-decoration: none;
  transition: color 0.2s;
}
.wu-page-header a:hover { color: var(--green, #3fb950); }

.wu-title {
  color: var(--wu-title-color);
  font-size: 1.8rem;
  margin-bottom: 40px;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.wu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.wu-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: var(--wu-card-bg);
  border: 1px solid var(--wu-card-border);
  border-radius: 6px;
  padding: 20px;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.25s;
}
.wu-card:hover {
  transform: translateY(-3px);
}

.wu-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.wu-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.wu-tag {
  border: 1px solid;
  padding: 3px 8px;
  font-size: 0.75rem;
  border-radius: 4px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  font-weight: 700;
}

/* Tag colours — same in both themes but slightly muted in light */
.wu-tag-reverse  { color: #ff0055; border-color: #ff0055; background: rgba(255,0,85,0.08); }
.wu-tag-crypto   { color: #ffaa00; border-color: #ffaa00; background: rgba(255,170,0,0.08); }
.wu-tag-web      { color: #00aaff; border-color: #00aaff; background: rgba(0,170,255,0.08); }
.wu-tag-forensic { color: #a855f7; border-color: #a855f7; background: rgba(168,85,247,0.08); }
.wu-tag-default  { color: #00ff41; border-color: #00ff41; background: rgba(0,255,65,0.08); }

html.light .wu-tag-reverse  { color: #c0003c; border-color: #c0003c; }
html.light .wu-tag-crypto   { color: #cc7700; border-color: #cc7700; }
html.light .wu-tag-web      { color: #0077cc; border-color: #0077cc; }
html.light .wu-tag-forensic { color: #7c3abf; border-color: #7c3abf; }
html.light .wu-tag-default  { color: #1e6e28; border-color: #1e6e28; }

.wu-date {
  color: var(--wu-meta-color);
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  white-space: nowrap;
  padding-left: 10px;
}

.wu-card-title {
  color: var(--wu-title-color);
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  line-height: 1.4;
  transition: color 0.2s;
}

.wu-card-desc {
  color: var(--wu-desc-color);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.6;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wu-card-cta {
  margin-top: 20px;
  text-align: right;
  color: var(--wu-cta-color);
  font-size: 0.85rem;
  font-family: 'Orbitron', sans-serif;
  transition: color 0.2s;
}
</style>

<section class="container" style="max-width: 1100px; margin: 0 auto; padding-top: 50px; font-family: 'Courier New', monospace;">

    <div class="wu-page-header">
        <span style="color: var(--wu-path-color);">~/home/kai/writeups</span>
        <a href="/">[ cd ~ ]</a>
    </div>

    <h1 class="wu-title">Writeups Archive</h1>

    <div class="wu-grid">
        {% for post in site.writeups reversed %}

        {% assign tags = post.category | split: "," %}
        {% assign first_tag = tags[0] | strip | downcase %}

        {% assign hover_color = '#00ff41' %}
        {% if first_tag == 'reverse' %}{% assign hover_color = '#ff0055' %}
        {% elsif first_tag == 'crypto' %}{% assign hover_color = '#ffaa00' %}
        {% elsif first_tag == 'web' %}{% assign hover_color = '#00aaff' %}
        {% elsif first_tag == 'forensic' or first_tag == 'forensics' %}{% assign hover_color = '#a855f7' %}
        {% endif %}

        <a href="{{ post.url }}"
           class="wu-card"
           onmouseover="this.style.borderColor='{{ hover_color }}'; this.style.boxShadow='0 0 15px {{ hover_color }}33';"
           onmouseout="this.style.borderColor=''; this.style.boxShadow='';">

            <div class="wu-card-top">
                <div class="wu-tags">
                    {% for tag in tags %}
                        {% assign t = tag | strip | downcase %}
                        {% assign cls = 'wu-tag-default' %}
                        {% if t == 'reverse' %}{% assign cls = 'wu-tag-reverse' %}
                        {% elsif t == 'crypto' %}{% assign cls = 'wu-tag-crypto' %}
                        {% elsif t == 'web' %}{% assign cls = 'wu-tag-web' %}
                        {% elsif t == 'forensic' or t == 'forensics' %}{% assign cls = 'wu-tag-forensic' %}
                        {% endif %}
                        <span class="wu-tag {{ cls }}">{{ tag | strip }}</span>
                    {% endfor %}
                </div>
                <span class="wu-date">{{ post.date | date: "%Y-%m-%d" }}</span>
            </div>

            <h3 class="wu-card-title">{{ post.title }}</h3>

            <p class="wu-card-desc">{{ post.description | default: "Reading log data... Extracting strings... Ready for analysis." }}</p>

            <div class="wu-card-cta">[ READ_LOG ]</div>
        </a>
        {% endfor %}
    </div>
</section>