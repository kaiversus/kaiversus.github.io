---
layout: default
title: Home Base | Kaiversus
---

<section class="hero-section">
    <canvas id="cyber-matrix"></canvas>

    <div class="hero-text">
        <h3 class="text-gold" style="color: var(--primary); font-size: 1rem; letter-spacing: 3px; margin-bottom: 5px;">[ STATUS: COMPROMISED ]</h3>
        
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
            Dissecting bits... Constructing bytes...<br>
            Reverse Engineering | Binary Explointation | Malware Analysis
        </p>
        
        <div class="cta-group" style="display: flex; gap: 30px;">
            <a href="/about/" class="btn-cyber">EXECUTE</a>
            <a href="#writeups" class="btn-cyber secondary">DATABASE</a>
        </div>
    </div>
</section>

<section id="writeups" class="container" style="padding-top: 10px;">
    <a href="#writeups" class="scroll-down-btn">
        <span>>></span>
    </a>
    
    <div style="display: flex; justify-content: space-between; align-items: end; margin-bottom: 40px; border-bottom: 1px solid #333; padding-bottom: 20px;">
        <h2><span style="color: var(--primary);">SYSTEM</span> LOGS</h2>
        <a href="#" style="color: var(--accent); text-decoration: none; font-family: monospace;">[ARCHIVE_VIEW]</a>
    </div>

            <div style="font-family: 'Courier New', monospace; color: #888; margin-top: 15px; margin-bottom: 30px; font-size: 0.9rem;">
    <span style="color: var(--primary); margin-right: 10px;">root@repo:~$</span>
    <span id="re-quotes" style="color: #ccc;"></span><span class="cursor">_</span>
    </div>
    
    <script>
        const reTextElement = document.getElementById('re-quotes');
        // DANH SÁCH CÁC CÂU QUOTE NGẦU VỀ RE (Bạn có thể sửa lại ở đây)
        const reTexts = [
            "EVERYTHING IS OPEN SOURCE IF YOU CAN READ ASSEMBLY", // Mọi thứ đều là mã nguồn mở nếu bạn đọc được Assembly
            "THERE IS NO PATCH FOR HUMAN STUPIDITY",             // Không có bản vá nào cho sự ngu dốt của con người
            "ANALYZING MALWARE ONE BYTE AT A TIME",              // Phân tích mã độc từng byte một
            "MOV EAX, 0xDEADBEEF",                               // Mã hex kinh điển
            "IF IT CAN BE RUN, IT CAN BE REVERSED"               // Nếu nó chạy được, nó dịch ngược được
        ]; 
        
        let reCount = 0;
        let reIndex = 0;
        let reCurrentText = "";
        let reLetter = "";
    
        (function reType() {
            if (reCount === reTexts.length) { reCount = 0; }
            reCurrentText = reTexts[reCount];
            reLetter = reCurrentText.slice(0, ++reIndex);
            
            reTextElement.textContent = reLetter;
            
            if (reLetter.length === reCurrentText.length) {
                reCount++;
                reIndex = 0;
                // Thời gian chờ khi gõ xong 1 câu (3000ms = 3 giây)
                setTimeout(reType, 3000); 
            } else {
                // Tốc độ gõ chữ (50ms = nhanh)
                setTimeout(reType, 50); 
            }
        }());
    </script>

<div class="card-grid">
    
    <article class="log-card" onclick="window.location.href='/writeups/'" style="border-color: #00ff41; box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);">
        <div class="log-header">
            <span>home/kai/writeups</span>
            <span style="color: var(--primary);">[DIR]</span>
        </div>
        <h3 class="log-title" style="color: var(--primary);">WRITEUPS</h3>
        <p class="log-desc">
            > CTF Solutions<br>
            > Malware Analysis Logs<br>
            > Access Denied to unauthorized users
        </p>
        <div style="text-align: right;">
            <span class="cmd-btn">[ CD_INTO_DIR ]</span>
        </div>
    </article>

    <article class="log-card" onclick="window.location.href='/courses/'" style="border-color: #ffaa00; box-shadow: 0 0 10px rgba(255, 170, 0, 0.2);">
        <div class="log-header">
            <span>home/kai/courses</span>
            <span style="color: #ffaa00;">[DIR]</span>
        </div>
        <h3 class="log-title" style="color: #ffaa00;">COURSES</h3>
        <p class="log-desc">
            > Learning Path<br>
            > Certifications & Notes<br>
            > Knowledge Base
        </p>
        <div style="text-align: right;">
            <span class="cmd-btn" style="color: #ffaa00;">[ CD_INTO_DIR ]</span>
        </div>
    </article>

    <article class="log-card" onclick="window.location.href='/projects/'" style="border-color: #ff0055; box-shadow: 0 0 10px rgba(255, 0, 85, 0.2);">
        <div class="log-header">
            <span>/home/kai/projects</span>
            <span style="color: var(--accent);">[DIR]</span>
        </div>
        <h3 class="log-title" style="color: var(--accent);">PROJECTS</h3>
        <p class="log-desc">
            > Github Repositories<br>
            > Coding Tools<br>
            > Personal Malware Samples
        </p>
        <div style="text-align: right;">
            <span class="cmd-btn" style="color: var(--accent);">[ CD_INTO_DIR ]</span>
        </div>
    </article>

</div>
</section>
