---
layout: default
title: Projects Archive
permalink: /projects/
---

<style>
    /* --- 1. SỬA LẠI THẺ CARD CHO SÁNG VÀ SẠCH HƠN --- */
    .log-card {
        background: rgba(5, 12, 20, 0.85); /* Nền tối hơn chút để nổi bật viền */
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.1); /* Viền mặc định mờ */
    }

    /* Hiệu ứng Glow cho Career (Xanh lá sáng) */
    .card-career:hover {
        border-color: #00ff41; 
        /* Glow sáng, lan tỏa rộng nhưng độ trong suốt thấp để không bị chói */
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.25), inset 0 0 10px rgba(0, 255, 65, 0.1);
        transform: translateY(-5px);
    }

    /* Hiệu ứng Glow cho Personal (Hồng neon sáng) */
    .card-personal:hover {
        border-color: #ff0055;
        box-shadow: 0 0 20px rgba(255, 0, 85, 0.3), inset 0 0 10px rgba(255, 0, 85, 0.1);
        transform: translateY(-5px);
    }

    /* --- Thêm đoạn này vào trong thẻ <style> --- */

    /* Nút Github (Màu Trắng Bạc - Silver Neon) */
    .btn-github { 
        color: #e0e0e0; 
        border-color: #e0e0e0; 
    }
    
    /* Hiệu ứng khi rê chuột: Sáng rực rỡ */
    .btn-github:hover { 
        border-color: #fff; 
        color: #fff; 
        background: rgba(255, 255, 255, 0.15); 
        text-shadow: 0 0 8px #fff; /* Chữ phát sáng */
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.4); /* Viền phát sáng */
    }

    /* --- 2. STYLE NÚT BẤM (CẬP NHẬT MỚI) --- */
    .btn-terminal {
        display: inline-flex;
        align-items: center;
        padding: 6px 14px; /* Nhỏ gọn lại xíu */
        font-family: 'Courier New', monospace; /* Font code chuẩn */
        font-size: 0.75rem;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration: none;
        border: 1px solid;
        transition: all 0.2s;
        background: transparent;
        margin-right: 8px;
        margin-bottom: 8px;
        letter-spacing: 0.5px;
    }

    .btn-icon { margin-right: 6px; font-size: 1rem; line-height: 0; }

    /* Nút Đọc (Màu theo section) */
    .btn-primary { color: #00ff41; border-color: #00ff41; }
    .btn-primary:hover { background: #00ff41; color: #000; box-shadow: 0 0 10px #00ff41; }

    .btn-accent { color: #ff0055; border-color: #ff0055; }
    .btn-accent:hover { background: #ff0055; color: #fff; box-shadow: 0 0 10px #ff0055; }

    /* Nút Github (Màu xám sáng) */
    .btn-neutral { color: #aaa; border-color: #555; }
    .btn-neutral:hover { border-color: #fff; color: #fff; background: rgba(255,255,255,0.1); }

    /* Nút Demo Web (Màu Xanh Lơ - Cyan) */
    .btn-live { color: #00f3ff; border-color: #00f3ff; }
    .btn-live:hover { 
        background: rgba(0, 243, 255, 0.15); 
        color: #fff; 
        text-shadow: 0 0 5px #00f3ff;
        box-shadow: 0 0 10px rgba(0, 243, 255, 0.4);
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
        <article class="log-card card-career" style="border-left: 3px solid var(--primary);">
            <div class="log-header">
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                <span style="color: var(--primary);">[PRO]</span>
            </div>

            {% if post.image %}
            <div style="margin-bottom: 15px; border: 1px solid rgba(0, 255, 65, 0.2); border-radius: 2px; overflow: hidden;">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" style="width: 100%; display: block; opacity: 0.9; transition: 0.3s;">
            </div>
            {% endif %}

            <h3 class="log-title">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px dashed rgba(255,255,255,0.1); display: flex; flex-wrap: wrap;">
                
                <a href="{{ post.url }}" class="btn-terminal btn-primary">
                    <span class="btn-icon">►</span> LOGS
                </a>

                {% if post.demo_link %}
                <a href="{{ post.demo_link }}" target="_blank" class="btn-terminal btn-live">
                    <span class="btn-icon">◉</span> DEMO
                </a>
                {% endif %}

                {% if post.github_link %}
                                <a href="{{ post.github_link }}" target="_blank" class="btn-terminal btn-github">
                                    <span class="btn-icon" style="display: flex; align-items: center;">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; fill: currentColor;"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                    </span> REPO
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
        <article class="log-card card-personal" style="border-left: 3px solid var(--accent);">
            <div class="log-header">
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                <span style="color: var(--accent);">[EXP]</span>
            </div>

            {% if post.image %}
            <div style="margin-bottom: 15px; border: 1px solid rgba(255, 0, 85, 0.2); border-radius: 2px; overflow: hidden;">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" style="width: 100%; display: block; opacity: 0.9; transition: 0.3s;">
            </div>
            {% endif %}

            <h3 class="log-title" style="color: #ddd;">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px dashed rgba(255,255,255,0.1); display: flex; flex-wrap: wrap;">
                
                <a href="{{ post.url }}" class="btn-terminal btn-accent">
                    <span class="btn-icon">►</span> INFO
                </a>

                {% if post.demo_link %}
                <a href="{{ post.demo_link }}" target="_blank" class="btn-terminal btn-live">
                    <span class="btn-icon">◉</span> LIVE
                </a>
                {% endif %}

                {% if post.github_link %}
                <a href="{{ post.github_link }}" target="_blank" class="btn-terminal btn-neutral">
                    <span class="btn-icon">&lt;/&gt;</span> REPO
                </a>
                {% endif %}
            </div>
        </article>
        {% endfor %}
    </div>

</section>
