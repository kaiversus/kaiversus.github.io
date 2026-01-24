---
layout: default
title: Projects Archive
permalink: /projects/
---

<style>
    /* Style chung cho nút kiểu Cyberpunk */
    .btn-terminal {
        display: inline-flex;
        align-items: center;
        padding: 8px 16px;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        text-transform: uppercase;
        text-decoration: none;
        border: 1px solid;
        transition: all 0.3s ease;
        background: rgba(0, 20, 0, 0.3); /* Nền tối nhẹ */
        letter-spacing: 1px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    /* Icon text bên trong nút */
    .btn-icon {
        margin-right: 8px;
        font-weight: bold;
    }

    /* --- BIẾN THỂ MÀU SẮC --- */

    /* 1. Primary (Dùng cho Career - Xanh lá) */
    .btn-primary {
        color: var(--primary);
        border-color: var(--primary);
    }
    .btn-primary:hover {
        background: rgba(0, 255, 65, 0.15);
        box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
        text-shadow: 0 0 5px var(--primary);
        color: #fff;
    }

    /* 2. Accent (Dùng cho Personal - Đỏ/Hồng) */
    .btn-accent {
        color: var(--accent);
        border-color: var(--accent);
    }
    .btn-accent:hover {
        background: rgba(255, 0, 85, 0.15);
        box-shadow: 0 0 10px rgba(255, 0, 85, 0.5);
        text-shadow: 0 0 5px var(--accent);
        color: #fff;
    }

    /* 3. Neutral (Dùng cho Github - Xám) */
    .btn-neutral {
        color: #888;
        border-color: #444;
    }
    .btn-neutral:hover {
        border-color: #fff;
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    }

</style>

<section class="container" style="margin-top: 50px;">
    
    <h1 style="color: var(--primary);">// PROJECTS_DIRECTORY</h1>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem;"><< BACK_TO_ROOT</a>
    
    <div style="margin-top: 60px; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
        <h2 class="text-gold" style="font-size: 1.5rem;">
            <span style="color: var(--primary);">[MAIN]</span> CAREER_OPERATIONS
        </h2>
        <p style="color: #888; font-family: monospace;">> Professional tools, Research & Work-related artifacts.</p>
    </div>

    <div class="card-grid">
        {% assign career_projects = site.projects | where: "category", "career" %}
        {% for post in career_projects reversed %}
        <article class="log-card" style="border-left: 3px solid var(--primary);">
            <div class="log-header">
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                <span style="color: var(--primary);">[PRO]</span>
            </div>

            {% if post.image %}
            <div style="margin-bottom: 15px; border: 1px solid rgba(0, 255, 65, 0.3); border-radius: 2px; overflow: hidden;">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" style="width: 100%; display: block; opacity: 0.85; filter: grayscale(30%); transition: all 0.3s;">
            </div>
            {% endif %}

            <h3 class="log-title">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>
            
            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed rgba(0, 255, 65, 0.3); display: flex; flex-wrap: wrap;">
                <a href="{{ post.url }}" class="btn-terminal btn-primary">
                    <span class="btn-icon">►</span> ACCESS_DATA
                </a>

                {% if post.github_link %}
                <a href="{{ post.github_link }}" target="_blank" class="btn-terminal btn-neutral">
                    <span class="btn-icon">&lt;/&gt;</span> SOURCE_CODE
                </a>
                {% endif %}
            </div>
        </article>
        {% endfor %}
    </div>

    <div style="margin-top: 80px; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
        <h2 style="font-size: 1.5rem; color: var(--accent);">
            <span style="color: var(--accent);">[SIDE]</span> PERSONAL_LAB
        </h2>
        <p style="color: #888; font-family: monospace;">> Experimental scripts, Utilities & Fun stuff.</p>
    </div>

    <div class="card-grid">
        {% assign personal_projects = site.projects | where: "category", "personal" %}
        {% for post in personal_projects reversed %}
        <article class="log-card" style="border-left: 3px solid var(--accent);">
            <div class="log-header">
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                <span style="color: var(--accent);">[EXP]</span>
            </div>

            {% if post.image %}
            <div style="margin-bottom: 15px; border: 1px solid rgba(255, 0, 85, 0.3); border-radius: 2px; overflow: hidden;">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" style="width: 100%; display: block; opacity: 0.85; filter: grayscale(30%); transition: all 0.3s;">
            </div>
            {% endif %}

            <h3 class="log-title" style="color: #ddd;">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>
            
             <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed rgba(255, 0, 85, 0.3); display: flex; flex-wrap: wrap;">
                <a href="{{ post.url }}" class="btn-terminal btn-accent">
                    <span class="btn-icon">►</span> INSPECT_LOG
                </a>

                {% if post.github_link %}
                <a href="{{ post.github_link }}" target="_blank" class="btn-terminal btn-neutral">
                    <span class="btn-icon">&lt;/&gt;</span> REPO_LINK
                </a>
                {% endif %}
            </div>
        </article>
        {% endfor %}
    </div>

</section>
