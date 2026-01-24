---
layout: default
title: Training Modules | Kaiversus
permalink: /courses/
---
<section class="container" style="margin-top: 50px;">
    <h1 style="color: var(--primary);">// TRAINING_MODULES</h1>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem;"><< BACK_TO_ROOT</a>
    
    {% assign categories = "Malware|Web Security|Reverse Engineering" | split: "|" %}

    <div class="card-grid" style="margin-top: 30px; grid-template-columns: 1fr;">
        
        {% for cat in categories %}
            {% assign course_files = site.courses | where: "category", cat %}
            
            {% if course_files.size > 0 %}
            <details class="log-card" style="margin-bottom: 20px; cursor: pointer;">
                <summary style="list-style: none; outline: none;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div class="log-header" style="margin-bottom: 5px;">
                                <span>modules/{{ cat | downcase | replace: ' ', '_' }}</span>
                                <span style="color: var(--accent);">[DIR]</span>
                            </div>
                            <h3 class="log-title" style="color: var(--primary); display: inline-block;">{{ cat }}</h3>
                        </div>
                        <span class="cmd-btn" style="font-size: 1.2rem;">[ + EXPAND ]</span>
                    </div>
                    <p class="log-desc" style="margin-bottom: 0;">> Detected {{ course_files.size }} lessons available.</p>
                </summary>

                <div style="margin-top: 20px; border-top: 1px dashed #333; padding-top: 15px; padding-left: 20px;">
                    {% for post in course_files %}
                    <div style="margin-bottom: 15px;">
                        <span style="color: var(--primary);">root@course:~$</span>
                        <a href="{{ post.url }}" style="color: #ccc; text-decoration: none; font-family: 'Courier New', monospace; transition: 0.3s;" onmouseover="this.style.color='#00ff41'" onmouseout="this.style.color='#ccc'">
                            ./{{ post.url | split: '/' | last }} <span style="color: #666;">// {{ post.title }}</span>
                        </a>
                    </div>
                    {% endfor %}
                </div>
            </details>
            {% endif %}
        {% endfor %}

    </div>
</section>

<style>
    details[open] .cmd-btn {
        content: "[ - COLLAPSE ]";
        color: var(--accent);
    }
    details[open] {
        border-color: var(--primary);
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.1);
    }
    details > summary::-webkit-details-marker {
        display: none;
    }
</style>