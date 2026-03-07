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

        {% assign first_tag = post.category | split: "," | first | strip | downcase %}
        {% assign card_color = '#00ff41' %} {% if first_tag == 'reverse' %}{% assign card_color = '#ff0055' %}{% endif %}
        {% if first_tag == 'crypto' %}{% assign card_color = '#ffaa00' %}{% endif %}
        {% if first_tag == 'web' %}{% assign card_color = '#00aaff' %}{% endif %}
        {% if first_tag == 'forensic' or first_tag == 'forensics' %}{% assign card_color = '#a855f7' %}{% endif %}

        <a href="{{ post.url }}" style="display: flex; flex-direction: column; text-decoration: none; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 20px; transition: all 0.3s; position: relative;" onmouseover="this.style.borderColor='{{ card_color }}'; this.style.boxShadow='0 0 15px {{ card_color }}33'; this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    {% assign tags = post.category | split: "," %}
                    {% for tag in tags %}
                        {% assign t = tag | strip | downcase %}
                        {% assign tag_color = '#00ff41' %} {% if t == 'reverse' %}
                            {% assign tag_color = '#ff0055' %} {% elsif t == 'crypto' %}
                            {% assign tag_color = '#ffaa00' %} {% elsif t == 'web' %}
                            {% assign tag_color = '#00aaff' %} {% elsif t == 'forensic' or t == 'forensics' %}
                            {% assign tag_color = '#a855f7' %} {% endif %}

                        <span style="border: 1px solid {{ tag_color }}; color: {{ tag_color }}; padding: 3px 8px; font-size: 0.75rem; border-radius: 4px; letter-spacing: 1px; text-transform: uppercase; background: rgba(0,0,0,0.5);">
                            {{ tag | strip }}
                        </span>
                    {% endfor %}
                </div>

                <span style="color: #666; font-size: 0.85rem; padding-left: 10px; white-space: nowrap;">
                    {{ post.date | date: "%Y-%m-%d" }}
                </span>
            </div>

            <h3 style="color: #fff; margin: 0 0 15px 0; font-size: 1.2rem; font-family: 'Courier New', monospace; font-weight: bold; line-height: 1.4;">
                {{ post.title }}
            </h3>

            <p style="color: #888; font-size: 0.95rem; margin: 0; line-height: 1.6; flex-grow: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                {{ post.description | default: "Reading log data... Extracting strings... Ready for analysis." }}
            </p>

            <div style="margin-top: 20px; text-align: right; color: #555; font-size: 0.85rem; font-family: 'Orbitron', sans-serif;">
                [ READ_LOG ]
            </div>
        </a>
        {% endfor %}
        
    </div>
</section>
