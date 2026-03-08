---
layout: default
title: Projects Archive
permalink: /projects/
---

<style>
:root {
  --proj-card-bg:        rgba(5, 12, 20, 0.85);
  --proj-card-border:    rgba(255,255,255,0.1);
  --proj-title-color:    #dddddd;
  --proj-desc-color:     #888888;
  --proj-meta-color:     #666666;
  --proj-header-border:  #333333;
  --proj-section-desc:   #888888;
  --proj-section-border: #333333;
}

html.light {
  --proj-card-bg:        rgba(240,233,220,0.85);
  --proj-card-border:    #c8bfaa;
  --proj-title-color:    #1c1a14;
  --proj-desc-color:     #5a5040;
  --proj-meta-color:     #7a6a50;
  --proj-header-border:  #c8bfaa;
  --proj-section-desc:   #7a6a50;
  --proj-section-border: #c8bfaa;
}

.log-card {
    background: var(--proj-card-bg) !important;
    border: 1px solid var(--proj-card-border) !important;
    transition: all 0.3s ease;
}

/* Career card hover glow */
.card-career:hover {
    border-color: #00ff41 !important;
    box-shadow: 0 0 20px rgba(0,255,65,0.2), inset 0 0 10px rgba(0,255,65,0.06) !important;
    transform: translateY(-5px);
}
html.light .card-career:hover {
    border-color: #1e6e28 !important;
    box-shadow: 0 0 15px rgba(30,110,40,0.2) !important;
}

/* Personal card hover glow */
.card-personal:hover {
    border-color: #ff0055 !important;
    box-shadow: 0 0 20px rgba(255,0,85,0.2), inset 0 0 10px rgba(255,0,85,0.06) !important;
    transform: translateY(-5px);
}
html.light .card-personal:hover {
    border-color: #9e001c !important;
    box-shadow: 0 0 15px rgba(158,0,28,0.2) !important;
}

.log-card .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    margin-bottom: 12px;
    color: var(--proj-meta-color);
}

.log-title {
    color: var(--proj-title-color) !important;
    font-size: 1.15rem;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    margin: 0 0 10px 0;
    transition: color 0.2s;
}

.log-desc {
    color: var(--proj-desc-color) !important;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
}

.section-divider-label {
    margin-top: 60px;
    border-bottom: 1px solid var(--proj-section-border);
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.section-desc {
    color: var(--proj-section-desc);
    font-family: monospace;
}

/* Button styles */
.btn-terminal {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid;
    transition: all 0.2s;
    background: transparent;
    margin-right: 8px;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
}

.btn-icon { margin-right: 6px; font-size: 1rem; line-height: 0; }

.btn-primary { color: #00ff41; border-color: #00ff41; }
.btn-primary:hover { background: #00ff41; color: #000; box-shadow: 0 0 10px #00ff41; }
html.light .btn-primary { color: #1e6e28; border-color: #1e6e28; }
html.light .btn-primary:hover { background: #1e6e28; color: #fff; box-shadow: none; }

.btn-accent { color: #ff0055; border-color: #ff0055; }
.btn-accent:hover { background: #ff0055; color: #fff; box-shadow: 0 0 10px #ff0055; }
html.light .btn-accent { color: #9e001c; border-color: #9e001c; }
html.light .btn-accent:hover { background: #9e001c; color: #fff; box-shadow: none; }

.btn-live { color: #00f3ff; border-color: #00f3ff; }
.btn-live:hover { background: rgba(0,243,255,0.15); color: #fff; text-shadow: 0 0 5px #00f3ff; box-shadow: 0 0 10px rgba(0,243,255,0.3); }
html.light .btn-live { color: #006677; border-color: #006677; }
html.light .btn-live:hover { background: rgba(0,102,119,0.1); color: #003344; box-shadow: none; text-shadow: none; }

.btn-github { color: #e0e0e0; border-color: #666666; }
.btn-github:hover { border-color: #fff; color: #fff; background: rgba(255,255,255,0.1); text-shadow: 0 0 6px #fff; box-shadow: 0 0 12px rgba(255,255,255,0.3); }
html.light .btn-github { color: #3a3020; border-color: #9a8a70; }
html.light .btn-github:hover { border-color: #1c1a14; color: #1c1a14; background: rgba(0,0,0,0.06); box-shadow: none; text-shadow: none; }

.proj-image-wrap {
    margin-bottom: 15px;
    border-radius: 2px;
    overflow: hidden;
}
.proj-image-wrap img {
    width: 100%;
    display: block;
    opacity: 0.9;
    transition: opacity 0.3s;
}
.log-card:hover .proj-image-wrap img { opacity: 1; }

.proj-btn-row {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px dashed rgba(128,128,128,0.2);
    display: flex;
    flex-wrap: wrap;
}
</style>

<section class="container" style="margin-top: 50px;">

    <h1 style="color: var(--green, #3fb950);">// PROJECTS_DIRECTORY</h1>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem;"><< BACK_TO_ROOT</a>

    <div class="section-divider-label">
        <h2 style="font-size: 1.5rem; color: var(--green, #3fb950); margin: 0;">
            <span>[MAIN]</span> CAREER_OPERATIONS
        </h2>
        <p class="section-desc">> Professional tools, Research & Work-related artifacts.</p>
    </div>

    <div class="card-grid">
        {% assign career_projects = site.projects | where: "category", "career" %}
        {% for post in career_projects reversed %}
        <article class="log-card card-career" style="border-left: 3px solid var(--green, #3fb950) !important;">
            <div class="log-header">
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                <span style="color: var(--green, #3fb950);">[PRO]</span>
            </div>

            {% if post.image %}
            <div class="proj-image-wrap" style="border: 1px solid rgba(63,185,80,0.2);">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
            </div>
            {% endif %}

            <h3 class="log-title">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>

            <div class="proj-btn-row">
                <a href="{{ post.url }}" class="btn-terminal btn-primary">
                    <span class="btn-icon">►</span> LOGS
                </a>
                {% if post.demo_link %}
                <a href="{{ post.demo_link }}" target="_blank" class="btn-terminal btn-live">
                    <span class="btn-icon">◉</span> DEMO
                </a>
                {% endif %}
                {% if post.github_link %}
                <a href="{{ post.github_link }}" target="_blank" class="btn-terminal btn-github">
                    <span class="btn-icon" style="display:flex;align-items:center;">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px;fill:currentColor;"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    </span> REPO
                </a>
                {% endif %}
            </div>
        </article>
        {% endfor %}
    </div>

    <div class="section-divider-label">
        <h2 style="font-size: 1.5rem; color: #ff0055; margin: 0;">
            <span>[SIDE]</span> PERSONAL_LAB
        </h2>
        <p class="section-desc">> Experimental scripts, Utilities & Fun stuff.</p>
    </div>

    <div class="card-grid">
        {% assign personal_projects = site.projects | where: "category", "personal" %}
        {% for post in personal_projects reversed %}
        <article class="log-card card-personal" style="border-left: 3px solid #ff0055 !important;">
            <div class="log-header">
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                <span style="color: #ff0055;">[EXP]</span>
            </div>

            {% if post.image %}
            <div class="proj-image-wrap" style="border: 1px solid rgba(255,0,85,0.2);">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
            </div>
            {% endif %}

            <h3 class="log-title">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>

            <div class="proj-btn-row">
                <a href="{{ post.url }}" class="btn-terminal btn-accent">
                    <span class="btn-icon">►</span> INFO
                </a>
                {% if post.demo_link %}
                <a href="{{ post.demo_link }}" target="_blank" class="btn-terminal btn-live">
                    <span class="btn-icon">◉</span> LIVE
                </a>
                {% endif %}
                {% if post.github_link %}
                <a href="{{ post.github_link }}" target="_blank" class="btn-terminal btn-github">
                    <span class="btn-icon" style="display:flex;align-items:center;">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px;fill:currentColor;"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    </span> REPO
                </a>
                {% endif %}
            </div>
        </article>
        {% endfor %}
    </div>

</section>