---
layout: default
title: Writeups Archive
permalink: /writeups/
---
<section class="container" style="margin-top: 50px;">
    <h1 style="color: var(--primary);">// WRITEUPS_DIRECTORY</h1>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem;"><< BACK_TO_ROOT</a>
    
    <div class="card-grid" style="margin-top: 30px;">
        {% for post in site.writeups reversed %}
        <article class="log-card">
            <div class="log-header"><span>{{ post.date | date: "%Y-%m-%d" }}</span></div>
            <h3 class="log-title">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>
            <a href="{{ post.url }}" class="cmd-btn">[ READ_LOG ]</a>
        </article>
        {% endfor %}
    </div>
</section>
