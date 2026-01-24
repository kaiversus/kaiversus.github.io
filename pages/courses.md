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
            
            {% assign theme_color = "var(--primary)" %} {% if cat == "Web Security" %}
                {% assign theme_color = "#ffaa00" %} {% elsif cat == "Reverse Engineering" %}
                {% assign theme_color = "var(--accent)" %} {% endif %}

            {% if course_files.size > 0 %}
            <details class="log-card course-item" style="--cat-color: {{ theme_color }}; margin-bottom: 20px; cursor: pointer;">
                
                <summary style="list-style: none; outline: none;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div class="log-header" style="margin-bottom: 5px; border-bottom-color: var(--cat-color);">
                                <span>modules/{{ cat | downcase | replace: ' ', '_' }}</span>
                                <span style="color: var(--cat-color);">[DIR]</span>
                            </div>
                            <h3 class="log-title" style="color: var(--cat-color); display: inline-block;">{{ cat }}</h3>
                        </div>
                        <span class="cmd-btn" style="font-size: 1.2rem; color: var(--cat-color);">[ + EXPAND ]</span>
                    </div>
                    <p class="log-desc" style="margin-bottom: 0;">> Detected {{ course_files.size }} lessons available.</p>
                </summary>

                <div style="margin-top: 20px; border-top: 1px dashed #333; padding-top: 15px; padding-left: 20px;">
                    {% for post in course_files %}
                    <div class="lesson-link" style="margin-bottom: 15px;">
                        <span style="color: var(--cat-color);">root@{{ cat | split: ' ' | first | downcase }}:~$</span>
                        
                        <a href="{{ post.url }}" class="hover-text" style="color: #ccc; text-decoration: none; font-family: 'Courier New', monospace; transition: 0.3s;">
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
    /* Khi mở ra thì viền và bóng đổ ăn theo màu của Category đó */
    details[open] {
        border-color: var(--cat-color) !important;
        box-shadow: 0 0 15px var(--cat-color);
        box-shadow: 0 0 15px color-mix(in srgb, var(--cat-color), transparent 80%); /* Pha màu mờ hơn cho bóng */
    }
    
    details[open] .cmd-btn {
        content: "[ - COLLAPSE ]";
    }

    /* Ẩn mũi tên mặc định của thẻ details */
    details > summary::-webkit-details-marker {
        display: none;
    }

    /* Hiệu ứng hover cho link bài học */
    .lesson-link a:hover {
        color: var(--cat-color) !important;
        text-shadow: 0 0 5px var(--cat-color);
        padding-left: 5px; /* Dịch chuyển nhẹ khi hover */
    }
</style>
