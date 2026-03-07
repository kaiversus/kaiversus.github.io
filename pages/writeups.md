---
layout: default
title: Writeups Archive
permalink: /writeups/
---

<section class="container" style="max-width: 1100px; margin: 0 auto; padding-top: 50px; font-family: 'Courier New', monospace;">

    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; color: #666; font-size: 0.9rem;">
        <span>~/home/kai/writeups</span>
        <a href="/" style="color: #666; text-decoration: none; transition: 0.3s;" onmouseover="this.style.color='#00ff41'" onmouseout="this.style.color='#666'">[ cd ~ ]</a>
    </div>

    <h1 style="color: #fff; font-size: 1.8rem; margin-bottom: 40px; font-weight: bold; font-family: 'Orbitron', sans-serif;">Writeups Archive</h1>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
        
        {% for post in site.writeups reversed %}

        {% assign cat = post.category | downcase %}
        {% if cat == 'reverse' %}
            {% assign tag_color = '#ff0055' %} {% elsif cat == 'pwn' %}
            {% assign tag_color = '#ffaa00' %} {% elsif cat == 'crypto' %}
            {% assign tag_color = '#a855f7' %} {% elsif cat == 'web' %}
            {% assign tag_color = '#00ff41' %} {% elsif cat == 'forensic' or cat == 'forensics' %}
            {% assign tag_color = '#3b82f6' %} {% else %}
            {% assign tag_color = '#00ff41' %} {% endif %}

        <a href="{{ post.url }}" style="display: flex; flex-direction: column; text-decoration: none; background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; padding: 25px; transition: all 0.3s; position: relative; overflow: hidden;" onmouseover="this.style.borderColor='{{ tag_color }}'; this.style.transform='translateY(-5px)'; this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'; this.style.transform='translateY(0)'; this.style.background='rgba(255,255,255,0.015)'">
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <span style="border: 1px solid {{ tag_color }}; color: {{ tag_color }}; padding: 3px 10px; font-size: 0.75rem; border-radius: 4px; letter-spacing: 1px; text-transform: uppercase; background: rgba(0,0,0,0.5);">
                    {{ post.category | default: "CTF" }}
                </span>
                <span style="color: #555; font-size: 0.85rem;">{{ post.date | date: "%Y-%m-%d" }}</span>
            </div>

            <h3 style="color: #fff; margin: 0 0 15px 0; font-size: 1.15rem; font-family: 'Courier New', monospace; font-weight: bold; line-height: 1.4;">
                {{ post.title }}
            </h3>

            <p style="color: #888; font-size: 0.95rem; margin: 0; line-height: 1.6; flex-grow: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                {{ post.description | default: "Accessing target log data... Extracting strings... Ready for analysis." }}
            </p>

            <div style="margin-top: 20px; text-align: right; color: #444; font-size: 0.8rem;">
                [ READ_LOG ]
            </div>
        </a>
        {% endfor %}
        
    </div>
</section>
