---
layout: default
title: Projects Archive
permalink: /projects/
---
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
            <div style="margin-bottom: 15px; border: 1px solid rgba(0, 255, 65, 0.3); border-radius: 4px; overflow: hidden;">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" style="width: 100%; display: block; opacity: 0.9;">
            </div>
            {% endif %}

            <h3 class="log-title">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>
            
            <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 20px; border-top: 1px dashed #333; padding-top: 15px;">
                <a href="{{ post.url }}" class="cmd-btn" style="color: var(--primary);">
                    > [ READ_ANALYSIS ]
                </a>

                {% if post.github_link %}
                <a href="{{ post.github_link }}" target="_blank" class="cmd-btn" style="color: #fff;">
                    <span style="color: #888;">::</span> [ GITHUB_SOURCE ]
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
            <div style="margin-bottom: 15px; border: 1px solid rgba(255, 0, 85, 0.3); border-radius: 4px; overflow: hidden;">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" style="width: 100%; display: block; opacity: 0.9;">
            </div>
            {% endif %}

            <h3 class="log-title" style="color: #ddd;">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>
            
            <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 20px; border-top: 1px dashed #333; padding-top: 15px;">
                <a href="{{ post.url }}" class="cmd-btn" style="color: var(--accent);">
                    > [ INSPECT_LOG ]
                </a>

                {% if post.github_link %}
                <a href="{{ post.github_link }}" target="_blank" class="cmd-btn" style="color: #fff;">
                    <span style="color: #888;">::</span> [ REPO_LINK ]
                </a>
                {% endif %}
            </div>
        </article>
        {% endfor %}
    </div>

</section>
