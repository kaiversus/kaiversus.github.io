---
layout: default
title: Security Lab
---

<section class="hero-section">
    
    <canvas id="cyber-matrix"></canvas>

    <div class="hero-text">
        <h3 class="text-gold" style="color: var(--primary);">System Status: <span style="color: var(--accent);">COMPROMISED</span></h3>
        
        <h1>Security Blog <br> 
            <span class="text-gold" style="-webkit-text-fill-color: var(--primary);">
                <span id="typing-text"></span><span class="cursor">_</span>
            </span>
        </h1>
        
        <p style="font-size: 1.2rem; color: #ccc; margin-bottom: 40px; font-family: 'Courier New', monospace;">
            > Initiating connection...<br>
            > Access granted.<br>
            Nơi lưu trữ các kỹ thuật Red Teaming & Malware Analysis.
        </p>
        
        <div class="cta-group">
            <a href="#writeups" class="btn-space">./READ_LOGS</a>
            <a href="https://github.com/kaiversus" target="_blank" class="btn-space" style="border-color: #fff; color: #fff; margin-left: 10px;">GITHUB</a>
        </div>
    </div>

    <div class="hero-visual">
        <img src="/assets/images/hacker-icon.png" alt="Cyber Security" class="ufo-img">
    </div>
</section>

<section class="container" style="text-align: center; margin-top: -30px; position: relative; z-index: 10; margin-bottom: 50px;">
    <div style="background: rgba(0,0,0,0.8); padding: 20px; border-radius: 15px; border: 1px solid #333; display: inline-block;">
        <span class="skill-tag">Python</span>
        <span class="skill-tag">Burp Suite</span>
        <span class="skill-tag">Metasploit</span>
        <span class="skill-tag">Reverse Eng</span>
    </div>
</section>

<section id="writeups" class="container">
    <div style="display: flex; justify-content: space-between; align-items: end; margin-bottom: 40px; border-bottom: 1px solid #333; padding-bottom: 20px;">
        <h2><span style="color: var(--primary);">ROOT</span> DIRECTORY</h2>
        <a href="#" style="color: var(--accent); text-decoration: none; font-family: monospace;">[VIEW_ALL]</a>
    </div>

    <div class="card-grid">
        <article class="space-card">
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" alt="Matrix Code">
            <div style="position: absolute; top: 10px; right: 10px; background: var(--accent); padding: 2px 10px; font-size: 12px; border-radius: 4px;">CTF</div>
            <h3 class="text-gold" style="color: #fff;">HackTheBox: Machine 'Forest'</h3>
            <p style="color: #aaa; font-size: 0.9rem;">Khai thác lỗi Active Directory.</p>
            <a href="#" class="btn-space" style="padding: 5px 15px; font-size: 0.7rem; border-radius: 4px;">Read</a>
        </article>

        <article class="space-card">
            <img src="https://images.unsplash.com/photo-1563206767-5b1d972d9fb7" alt="Malware">
            <div style="position: absolute; top: 10px; right: 10px; background: var(--primary); color: #000; padding: 2px 10px; font-size: 12px; border-radius: 4px;">MALWARE</div>
            <h3 class="text-gold" style="color: #fff;">Phân tích WannaCry</h3>
            <p style="color: #aaa; font-size: 0.9rem;">Dịch ngược mã độc.</p>
            <a href="#" class="btn-space" style="padding: 5px 15px; font-size: 0.7rem; border-radius: 4px;">Debug</a>
        </article>
        
        <article class="space-card">
            <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb" alt="Web">
            <div style="position: absolute; top: 10px; right: 10px; background: #fff; color: #000; padding: 2px 10px; font-size: 12px; border-radius: 4px;">WEB</div>
            <h3 class="text-gold" style="color: #fff;">XSS Attack</h3>
            <p style="color: #aaa; font-size: 0.9rem;">Lỗ hổng Cross-Site Scripting.</p>
            <a href="#" class="btn-space" style="padding: 5px 15px; font-size: 0.7rem; border-radius: 4px;">View POC</a>
        </article>
    </div>
</section>