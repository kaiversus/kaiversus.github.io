---
layout: default
title: Writeups Archive
permalink: /writeups/
---
<section class="container" style="margin-top: 50px;">
    <h1 style="color: var(--primary);">// WRITEUPS_DIRECTORY</h1>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem;"><< BACK_TO_ROOT</a>

    <div class="filter-console" style="margin-top: 30px; border: 1px solid #333; padding: 15px; background: rgba(0,0,0,0.5);">
        <div class="filter-group">
            <span style="color: var(--primary); font-family: monospace;">> DIFFICULTY:</span>
            <button class="filter-btn active" onclick="filterSelection('all', 'diff')">[ ALL ]</button>
            <button class="filter-btn" onclick="filterSelection('Easy', 'diff')">[ EASY ]</button>
            <button class="filter-btn" onclick="filterSelection('Medium', 'diff')">[ MEDIUM ]</button>
            <button class="filter-btn" onclick="filterSelection('Hard', 'diff')">[ HARD ]</button>
        </div>
        <div class="filter-group" style="margin-top: 10px;">
            <span style="color: var(--accent); font-family: monospace;">> CATEGORY:  </span>
            <button class="filter-btn active" onclick="filterSelection('all', 'cat')">[ ALL ]</button>
            <button class="filter-btn" onclick="filterSelection('Reverse', 'cat')">[ REVERSE ]</button>
            <button class="filter-btn" onclick="filterSelection('Crypto', 'cat')">[ CRYPTO ]</button>
            <button class="filter-btn" onclick="filterSelection('Pwn', 'cat')">[ PWN ]</button>
            <button class="filter-btn" onclick="filterSelection('Web', 'cat')">[ WEB ]</button>
        </div>
    </div>
    
    <div class="card-grid" style="margin-top: 30px;">
        {% for post in site.writeups reversed %}
        <article class="log-card filter-item" data-diff="{{ post.difficulty | default: 'Unrated' }}" data-cat="{{ post.category | default: 'Misc' }}">
            
            <div class="log-header">
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                <div style="display: flex; gap: 5px;">
                    {% assign cat_list = post.category | split: ', ' %}
                    {% for cat in cat_list %}
                        <span class="tag-cat" style="border: 1px solid var(--accent); color: var(--accent);">{{ cat | upcase }}</span>
                    {% endfor %}
                    
                    {% if post.difficulty %}
                    <span class="tag-diff {{ post.difficulty }}">{{ post.difficulty | upcase }}</span>
                    {% endif %}
                </div>
            </div>
            
            <h3 class="log-title">{{ post.title }}</h3>
            <p class="log-desc">{{ post.description }}</p>
            <a href="{{ post.url }}" class="cmd-btn">[ READ_LOG ]</a>
        </article>
        {% endfor %}
    </div>
</section>

<script>
    let currentDiff = 'all';
    let currentCat = 'all';

    function filterSelection(value, type) {
        if (type === 'diff') currentDiff = value;
        if (type === 'cat') currentCat = value;

        updateActiveButton(value, type);

        let items = document.getElementsByClassName("filter-item");
        for (let i = 0; i < items.length; i++) {
            let itemDiff = items[i].getAttribute('data-diff');
            let itemCat = items[i].getAttribute('data-cat'); // Lấy chuỗi "Reverse, Crypto"

            // Logic Difficulty: So sánh chính xác
            let matchDiff = (currentDiff === 'all' || itemDiff === currentDiff);
            
            // Logic Category: Dùng indexOf để tìm chuỗi con (Logic chứa)
            // Ví dụ: Tìm "Reverse" trong "Reverse, Crypto" -> Có
            let matchCat = (currentCat === 'all' || itemCat.indexOf(currentCat) > -1);

            if (matchDiff && matchCat) {
                items[i].style.display = "block";
            } else {
                items[i].style.display = "none";
            }
        }
    }

    function updateActiveButton(value, type) {
        let container;
        if (type === 'diff') container = document.querySelectorAll('.filter-group')[0];
        else container = document.querySelectorAll('.filter-group')[1];

        let btns = container.getElementsByClassName("filter-btn");
        for (let i = 0; i < btns.length; i++) {
            btns[i].className = btns[i].className.replace(" active", "");
            if (btns[i].getAttribute('onclick').includes("'" + value + "'")) {
                btns[i].className += " active";
            }
        }
    }
</script>
