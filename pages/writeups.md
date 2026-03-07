---
layout: default
title: Writeups Archive
permalink: /writeups/
---

<section class="container" style="max-width: 900px; margin: 0 auto; padding-top: 50px; font-family: 'Courier New', monospace;">

    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; color: #666; font-size: 0.9rem;">
        <span>~/home/kai/writeups</span>
        <a href="/" style="color: #666; text-decoration: none; transition: 0.3s;" onmouseover="this.style.color='#00ff41'" onmouseout="this.style.color='#666'">all posts →</a>
    </div>

    <h1 style="color: #fff; font-size: 1.8rem; margin-bottom: 30px; font-weight: bold; font-family: 'Orbitron', sans-serif;">Writeups Archive</h1>

    <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px;">
        
        {% for post in site.writeups reversed %}
        <a href="{{ post.url }}" style="display: flex; text-decoration: none; padding: 25px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
            
            <div style="width: 50px; color: #444; font-size: 0.9rem; margin-top: 2px;">
                {% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}
            </div>

            <div style="flex: 1;">
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px; align-items: center;">
                    <span style="border: 1px solid #ffaa00; color: #ffaa00; padding: 2px 8px; font-size: 0.75rem; border-radius: 4px; letter-spacing: 1px; background: rgba(255, 170, 0, 0.05);">Writeup</span>
                    <span style="color: #555; font-size: 0.85rem;">{{ post.date | date: "%b %Y" }}</span>
                </div>

                <h3 style="color: #00ff41; margin: 0 0 10px 0; font-size: 1.1rem; font-family: 'Courier New', monospace; font-weight: bold;">
                    {{ post.title }}
                </h3>

                <p style="color: #888; font-size: 0.95rem; margin: 0; line-height: 1.6; font-family: 'Courier New', monospace;">
                    {{ post.description | default: "Truy cập để đọc chi tiết nhật ký hệ thống..." }}
                </p>
            </div>

            <div style="width: 30px; display: flex; justify-content: flex-end; align-items: center; color: #333; font-size: 1.2rem;">
                →
            </div>
        </a>
        {% endfor %}
        
    </div>
</section>
