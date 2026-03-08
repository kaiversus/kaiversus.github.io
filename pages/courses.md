---
layout: default
title: Courses Library
permalink: /courses/
---
<style>
    :root {
        --course-theme:    #ffaa00;
        --cat-row-bg:      rgba(10, 10, 10, 0.6);
        --cat-row-border:  #333;
        --cat-row-text:    #fff;
        --module-bg:       rgba(0, 0, 0, 0.4);
        --module-border:   #333;
        --module-title:    #ddd;
        --module-desc:     #888;
        --section-bg:      rgba(5, 12, 20, 0.85);
    }

    /* Light mode overrides */
    html.light {
        --course-theme:    #cc7700;
        --cat-row-bg:      rgba(220, 210, 190, 0.6);
        --cat-row-border:  #c8bfaa;
        --cat-row-text:    #2a2520;
        --module-bg:       rgba(240, 233, 220, 0.8);
        --module-border:   #c8bfaa;
        --module-title:    #2a2520;
        --module-desc:     #6a6050;
        --section-bg:      rgba(240, 233, 220, 0.8);
    }

    .category-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 30px;
    }

    .cat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border: 1px solid var(--cat-row-border);
        background: var(--cat-row-bg);
        cursor: pointer;
        transition: background 0.3s, border-color 0.3s, transform 0.3s;
        font-family: 'Rajdhani', sans-serif;
    }

    .cat-row:hover {
        border-color: var(--course-theme);
        background: rgba(255, 170, 0, 0.08);
        transform: translateX(10px);
    }

    .cat-id {
        color: #666;
        font-family: 'JetBrains Mono', monospace;
        margin-right: 15px;
        font-size: 0.9rem;
    }

    html.light .cat-id { color: #9a8a70; }

    .cat-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.2rem;
        color: var(--cat-row-text);
        flex-grow: 1;
        letter-spacing: 1px;
        transition: color 0.2s;
    }

    .cat-abbr {
        color: var(--course-theme);
        font-family: monospace;
        font-size: 0.9rem;
        opacity: 0.7;
        transition: opacity 0.2s, letter-spacing 0.2s;
    }

    .cat-row:hover .cat-name { color: var(--course-theme); }
    .cat-row:hover .cat-abbr { opacity: 1; letter-spacing: 2px; }

    /* Detail view */
    .course-detail-view {
        display: none;
        animation: fadeIn 0.5s ease;
    }

    .module-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 30px;
    }

    .module-card {
        background: var(--module-bg);
        border: 1px solid var(--module-border);
        border-left: 3px solid #444;
        padding: 20px;
        cursor: pointer;
        transition: border-color 0.3s, background 0.3s, transform 0.3s;
    }

    .module-card:hover {
        border-left-color: var(--course-theme);
        background: rgba(255, 170, 0, 0.06);
        transform: translateY(-5px);
    }

    html.light .module-card:hover {
        background: rgba(200, 130, 0, 0.06);
    }

    .module-title {
        color: var(--module-title);
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 10px;
        transition: color 0.2s;
    }

    .module-card:hover .module-title { color: var(--course-theme); }

    .module-meta {
        font-size: 0.8rem;
        color: var(--module-desc);
        font-family: monospace;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
    }

    .module-desc {
        color: var(--module-desc);
        font-size: 0.9rem;
        margin: 0;
    }

    .back-nav {
        display: inline-flex;
        align-items: center;
        color: #888;
        cursor: pointer;
        font-family: monospace;
        margin-bottom: 20px;
        border-bottom: 1px solid transparent;
        transition: color 0.2s, border-color 0.2s;
    }
    .back-nav:hover { color: var(--course-theme); border-bottom-color: var(--course-theme); }
    html.light .back-nav { color: #9a8a70; }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
    }
</style>

<section class="container" style="margin-top: 50px;">

    <div style="display: flex; justify-content: space-between; align-items: end; border-bottom: 1px solid var(--border, #333); padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="color: var(--course-theme); margin: 0;">// ACADEMY_DATABASE</h1>
        <span style="font-family: monospace; color: #666;">SYS_STATUS: ONLINE</span>
    </div>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem;"><< BACK_TO_ROOT</a>

    <div id="category-view" class="category-list">

        <div class="cat-row" onclick="openCourse('Malware')">
            <span class="cat-id">[ 0x01 ]</span>
            <span class="cat-name">MALWARE ANALYSIS</span>
            <span class="cat-abbr">&lt;DIR_MLW&gt;</span>
        </div>

        <div class="cat-row" onclick="openCourse('TryHackMe')">
            <span class="cat-id">[ 0x02 ]</span>
            <span class="cat-name">TRYHACKME</span>
            <span class="cat-abbr">&lt;DIR_CRY&gt;</span>
        </div>

    </div>

    <div id="detail-view" class="course-detail-view">

        <div class="back-nav" onclick="closeCourse()">
            <span>&lt;&lt; CD .. (RETURN)</span>
        </div>

        <h2 id="course-title-display" style="color: var(--course-theme); font-family: 'Orbitron'; margin-bottom: 5px;">
            // LOADING...
        </h2>
        <p style="font-family: monospace; margin-bottom: 30px; opacity: 0.5;">> List of available modules in this directory:</p>

        <div class="module-grid">
            {% assign sorted_courses = site.courses | sort: 'title' %}
            {% for post in sorted_courses %}
            <article class="module-card filter-item"
                     data-cat="{{ post.category | default: 'General' }}"
                     onclick="window.location.href='{{ post.url }}'">

                <div class="module-meta">
                    <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                    <span>[{{ post.difficulty | default: 'UNK' | upcase }}]</span>
                </div>

                <h4 class="module-title">{{ post.title }}</h4>
                <p class="module-desc">{{ post.description | truncate: 100 }}</p>
            </article>
            {% endfor %}
        </div>
    </div>

</section>

<script>
    function openCourse(category) {
        document.getElementById('category-view').style.display = 'none';
        let detailView = document.getElementById('detail-view');
        detailView.style.display = 'block';
        document.getElementById('course-title-display').innerText = `// DIRECTORY: ${category.toUpperCase()}`;

        let items = document.getElementsByClassName('filter-item');
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            item.style.display = item.getAttribute('data-cat').includes(category) ? "block" : "none";
        }
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    function closeCourse() {
        document.getElementById('detail-view').style.display = 'none';
        let catView = document.getElementById('category-view');
        catView.style.display = 'flex';
        catView.style.animation = 'fadeIn 0.3s ease';
    }
</script>