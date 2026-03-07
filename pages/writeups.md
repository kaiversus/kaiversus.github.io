---
layout: default
title: Writeups Archive
permalink: /writeups/
---

<section id="writeups" class="container" style="padding-top: 50px; min-height: 80vh;">
    <div style="display: flex; justify-content: space-between; align-items: end; margin-bottom: 40px; border-bottom: 1px solid #333; padding-bottom: 20px;">
        <h2><span style="color: var(--primary);">SYSTEM</span> LOGS</h2>
        <a href="/" style="color: var(--accent); text-decoration: none; font-family: monospace;">[ << BACK_TO_ROOT ]</a>
    </div>

    <div style="font-family: 'Courier New', monospace; color: #888; margin-top: 15px; margin-bottom: 30px; font-size: 0.9rem;">
        <span style="color: var(--primary); margin-right: 10px;">root@kaiversus:~/writeups$</span>
        <span style="color: #ccc;">ls -la</span><span class="cursor">_</span>
    </div>

    <div class="card-grid">
        {% for post in site.writeups reversed %}
        <article class="log-card" onclick="window.location.href='{{ post.url }}'" style="border-color: #00ff41; box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);">
            <div class="log-header">
                <span>home/kai/writeups/{{ post.title | slugify }}</span>
                <span style="color: var(--primary);">[FILE]</span>
            </div>
            
            <h3 class="log-title" style="color: var(--primary);">{{ post.title }}</h3>
            
            <p class="log-desc">
                > Date: {{ post.date | date: "%Y-%m-%d" }}<br>
                > {{ post.description | default: "Accessing target log..." }}
            </p>
            
            <div style="text-align: right;">
                <span class="cmd-btn">[ READ_LOG ]</span>
            </div>
        </article>
        {% endfor %}
    </div>
</section>
