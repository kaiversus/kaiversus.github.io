---
layout: default
title: Home Base | Kaiversus
---

<section class="hero-section">
    <canvas id="cyber-matrix"></canvas>

    <div class="hero-text">
        <h3 class="text-gold" style="color: var(--primary); font-size: 1rem; letter-spacing: 3px; margin-bottom: 5px;">// IDENTITY CONFIRMED</h3>
        
        <h1>DINH THIEN BAO <br> 
            <pre class="ascii-logo">
            ██╗ ██╗ █████╗ ██╗██╗ ██╗███████╗██████╗ ███████╗██╗ ██╗███████╗
            ██║██╔╝██╔══██╗██║██║ ██║██╔════╝██╔══██╗██╔════╝██║ ██║██╔════╝
            █████╔╝███████║██║██║ ██║█████╗  ██████╔╝███████╗██║ ██║███████╗
            ██╔═██╗██╔══██║██║╚██╗██╔╝██╔══╝  ██╔══██╗╚════██║██║ ██║╚════██║
            ██║ ██║██║  ██║██║ ╚████╔╝ ███████╗██║  ██║███████║╚████╔╝███████║
            ╚═╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚══════╝ ╚════╝ ╚══════╝
            </pre>
        </h1>
        
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
        
        <article class="log-card">
            <div class="log-header">
                <span>/var/log/ctf/htb.log</span>
                <span style="color: var(--primary);">[ENCRYPTED]</span>
            </div>
            <h3 class="log-title">HackTheBox: Forest</h3>
            <p class="log-desc">
                > Target: Active Directory<br>
                > Vuln: AS-REP Roasting<br>
                > Status: Pwned
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem; color: #666;">DATE: 2026-01-04</span>
                <a href="#" class="cmd-btn">[ EXECUTE_READ ]</a>
            </div>
        </article>

        <article class="log-card danger">
            <div class="log-header">
                <span>/bin/malware/wannacry.exe</span>
                <span style="color: var(--accent);">[DANGER]</span>
            </div>
            <h3 class="log-title">WannaCry Analysis</h3>
            <p class="log-desc">
                > Type: Ransomware<br>
                > Tech: Reverse Engineering<br>
                > Tool: IDA Pro, x64dbg
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem; color: #666;">DATE: 2025-12-20</span>
                <a href="#" class="cmd-btn">[ DEBUG_NOW ]</a>
            </div>
        </article>
        
        <article class="log-card">
            <div class="log-header">
                <span>/srv/www/vuln_report.txt</span>
                <span style="color: #fff;">[PUBLIC]</span>
            </div>
            <h3 class="log-title">Stored XSS Attack</h3>
            <p class="log-desc">
                > Target: E-commerce Site<br>
                > Bounty: $500<br>
                > Impact: Critical
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem; color: #666;">DATE: 2025-11-15</span>
                <a href="#" class="cmd-btn">[ VIEW_POC ]</a>
            </div>
        </article>

    </div>
</section>