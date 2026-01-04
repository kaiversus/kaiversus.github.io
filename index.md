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
    
    <article class="log-card" onclick="window.location.href='/writeups/'" style="cursor: pointer;">
        <div class="log-header">
            <span>/var/www/html/writeups</span>
            <span style="color: var(--primary);">[DIR]</span>
        </div>
        <h3 class="log-title" style="color: var(--primary);">📂 WRITEUPS</h3>
        <p class="log-desc">
            > CTF Solutions<br>
            > Malware Analysis Logs<br>
            > Access Denied to unauthorized users
        </p>
        <div style="text-align: right;">
            <span class="cmd-btn">[ CD_INTO_DIR ]</span>
        </div>
    </article>

    <article class="log-card" onclick="window.location.href='/courses/'" style="cursor: pointer;">
        <div class="log-header">
            <span>/usr/local/share/courses</span>
            <span style="color: #ffaa00;">[DIR]</span>
        </div>
        <h3 class="log-title" style="color: #ffaa00;">📚 COURSES</h3>
        <p class="log-desc">
            > Learning Path<br>
            > Certifications & Notes<br>
            > Knowledge Base
        </p>
        <div style="text-align: right;">
            <span class="cmd-btn">[ CD_INTO_DIR ]</span>
        </div>
    </article>

    <article class="log-card" onclick="window.location.href='/projects/'" style="cursor: pointer;">
        <div class="log-header">
            <span>/home/kai/projects</span>
            <span style="color: var(--accent);">[DIR]</span>
        </div>
        <h3 class="log-title" style="color: var(--accent);">🛠️ PROJECTS</h3>
        <p class="log-desc">
            > Github Repositories<br>
            > Coding Tools<br>
            > Personal Malware Samples
        </p>
        <div style="text-align: right;">
            <span class="cmd-btn">[ CD_INTO_DIR ]</span>
        </div>
    </article>

</div>
</section>
