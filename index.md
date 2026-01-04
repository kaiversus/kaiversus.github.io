---
layout: default
title: Home Base | Kaiversus
---

<section class="hero-section">
    <canvas id="cyber-matrix"></canvas>

    <div class="hero-text">
        <h3 class="text-gold" style="color: var(--primary); font-size: 1rem; letter-spacing: 3px; margin-bottom: 5px;">// IDENTITY CONFIRMED</h3>
        
        <h1>DINH THIEN BAO</h1>

        <pre class="ascii-logo" style="color: var(--accent);">██╗  ██╗ █████╗ ██╗██╗   ██╗███████╗██████╗ ███████╗██╗   ██╗███████╗
██║ ██╔╝██╔══██╗██║██║   ██║██╔════╝██╔══██╗██╔════╝██║   ██║██╔════╝
█████╔╝ ███████║██║██║   ██║█████╗  ██████╔╝███████╗██║   ██║███████╗
██╔═██╗ ██╔══██║██║╚██╗ ██╔╝██╔══╝  ██╔══██╗╚════██║██║   ██║╚════██║
██║  ██╗██║  ██║██║ ╚████╔╝ ███████╗██║  ██║███████║╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝</pre>
        
        <p style="font-size: 1.2rem; color: #fff; margin-bottom: 20px; font-family: 'Courier New', monospace; background: rgba(0,0,0,0.6); display: inline-block; padding: 10px;">
            <span style="color: var(--primary);">root@kaiversus:~$</span> 
            <span id="typing-text"></span><span class="cursor">_</span>
        </p>

        <p style="color: #ccc; max-width: 600px; margin-bottom: 20px; font-size: 1.1rem;">
            Welcome to my profile.<br>
            Reverse Engineering | Pwnable | Malware Analysis
        </p>
        
        <div class="cta-group" style="display: flex; gap: 30px;">
            <a href="/about/" class="btn-cyber">ACCESS PROFILE</a>
            <a href="#writeups" class="btn-cyber secondary">REPOSITORY</a>
        </div>
    </div>
</section>

<section id="writeups" class="container" style="padding-top: 50px;">
    <a href="#writeups" class="scroll-down-btn">
        <span>>></span>
    </a>
    
    <div style="display: flex; justify-content: space-between; align-items: end; margin-bottom: 40px; border-bottom: 1px solid #333; padding-bottom: 20px;">
        <h2><span style="color: var(--primary);">SYSTEM</span> LOGS</h2>
        <a href="#" style="color: var(--accent); text-decoration: none; font-family: monospace;">[ARCHIVE_VIEW]</a>
    </div>

<div class="card-grid">
    
    {% for post in site.writeups reversed %}
    <article class="log-card {{ post.card_style }}">
        <div class="log-header">
            <span>{{ post.log_path }}</span>
            {% if post.card_style == 'danger' %}
                <span style="color: var(--accent);">{{ post.status_tag }}</span>
            {% else %}
                <span style="color: var(--primary);">{{ post.status_tag }}</span>
            {% endif %}
        </div>
        
        <h3 class="log-title">{{ post.title }}</h3>
        
        <p class="log-desc">
            > Target: {{ post.target }}<br>
            > Vuln: {{ post.vuln }}<br>
            > Status: {{ post.status }}
        </p>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; color: #666;">DATE: {{ post.date | date: "%Y-%m-%d" }}</span>
            <a href="{{ post.url }}" class="cmd-btn">
                {% if post.card_style == 'danger' %}
                    [ DEBUG_NOW ]
                {% else %}
                    [ EXECUTE_READ ]
                {% endif %}
            </a>
        </div>
    </article>
    {% endfor %}
    </div>
</section>
