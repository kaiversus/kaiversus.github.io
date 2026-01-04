---
layout: default
title: Home Base | Kaiversus
---

<section class="hero-section">
    <canvas id="cyber-matrix"></canvas>

    <div class="hero-text">
        <h3 class="text-gold" style="color: var(--primary); font-size: 1rem;">// IDENTITY CONFIRMED</h3>
        
        <h1>DINH THIEN BAO <br> 
            <span class="text-gold" style="-webkit-text-fill-color: var(--accent);">
                (KAI.VERSUS)
            </span>
        </h1>
        
        <p style="font-size: 1.2rem; color: #fff; margin-bottom: 20px; font-family: 'Courier New', monospace; background: rgba(0,0,0,0.5); display: inline-block; padding: 5px 10px;">
            <span style="color: var(--primary);">root@kaiversus:~$</span> 
            <span id="typing-text"></span><span class="cursor">_</span>
        </p>

        <p style="color: #ccc; max-width: 600px; margin-bottom: 40px;">
            Welcome to my Security Lab. <br>
            Nơi chia sẻ kiến thức về Reverse Engineering, Pwn & Malware Analysis.
        </p>
        
        <div class="cta-group">
            <a href="/about/" class="btn-space">ACCESS PROFILE</a>
            
            <a href="#writeups" class="btn-space" style="background: transparent; border-color: #fff; color: #fff; margin-left: 10px;">LATEST LOGS</a>
        </div>
    </div>

    <div class="hero-visual">
        <img src="/assets/images/hacker-icon.png" alt="Kaiversus" class="ufo-img">
    </div>
</section>

<section id="writeups" class="container" style="padding-top: 50px;">
    <div style="display: flex; justify-content: space-between; align-items: end; margin-bottom: 40px; border-bottom: 1px solid #333; padding-bottom: 20px;">
        <h2><span style="color: var(--primary);">SYSTEM</span> LOGS</h2>
        <a href="#" style="color: var(--accent); text-decoration: none; font-family: monospace;">[ARCHIVE]</a>
    </div>

    <div class="card-grid">
        <article class="space-card">
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" alt="Matrix Code">
            <div style="position: absolute; top: 10px; right: 10px; background: var(--accent); padding: 2px 10px; font-size: 12px; border-radius: 4px;">CTF</div>
            <h3 class="text-gold" style="color: #fff;">HackTheBox: Forest</h3>
            <p style="color: #aaa; font-size: 0.9rem;">Active Directory Exploitation.</p>
            <a href="#" class="btn-space" style="padding: 5px 15px; font-size: 0.7rem; border-radius: 4px;">Read</a>
        </article>

        <article class="space-card">
            <img src="https://images.unsplash.com/photo-1563206767-5b1d972d9fb7" alt="Malware">
            <div style="position: absolute; top: 10px; right: 10px; background: var(--primary); color: #000; padding: 2px 10px; font-size: 12px; border-radius: 4px;">MALWARE</div>
            <h3 class="text-gold" style="color: #fff;">WannaCry Analysis</h3>
            <p style="color: #aaa; font-size: 0.9rem;">Reverse Engineering Report.</p>
            <a href="#" class="btn-space" style="padding: 5px 15px; font-size: 0.7rem; border-radius: 4px;">Debug</a>
        </article>
        
        <article class="space-card">
            <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb" alt="Web">
            <div style="position: absolute; top: 10px; right: 10px; background: #fff; color: #000; padding: 2px 10px; font-size: 12px; border-radius: 4px;">WEB</div>
            <h3 class="text-gold" style="color: #fff;">Stored XSS</h3>
            <p style="color: #aaa; font-size: 0.9rem;">Bug Bounty Hunting.</p>
            <a href="#" class="btn-space" style="padding: 5px 15px; font-size: 0.7rem; border-radius: 4px;">View POC</a>
        </article>
    </div>
</section>