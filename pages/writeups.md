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
                {% if post.difficulty %}
                <span class="tag-diff {{ post.difficulty }}">{{ post.difficulty | upcase }}</span>
                {% endif %}
            </div>
            
            <h3 class="log-title">{{ post.title }}</h3>
            
            <div style="margin-bottom: 10px;">
                {% if post.category %}
                <span class="tag-cat">{{ post.category }}</span>
                {% endif %}
            </div>

            <p class="log-desc">{{ post.description }}</p>
            <a href="{{ post.url }}" class="cmd-btn">[ READ_LOG ]</a>
        </article>
        {% endfor %}
    </div>
</section>

<script>
    // State lưu trạng thái lọc hiện tại
    let currentDiff = 'all';
    let currentCat = 'all';

    function filterSelection(value, type) {
        // 1. Cập nhật state
        if (type === 'diff') currentDiff = value;
        if (type === 'cat') currentCat = value;

        // 2. Cập nhật giao diện nút bấm (Active class)
        updateActiveButton(value, type);

        // 3. Lọc các thẻ bài viết
        let items = document.getElementsByClassName("filter-item");
        for (let i = 0; i < items.length; i++) {
            let itemDiff = items[i].getAttribute('data-diff');
            let itemCat = items[i].getAttribute('data-cat');

            // Logic: Phải thỏa mãn CẢ HAI điều kiện (AND)
            let matchDiff = (currentDiff === 'all' || itemDiff === currentDiff);
            let matchCat = (currentCat === 'all' || itemCat === currentCat);

            if (matchDiff && matchCat) {
                items[i].style.display = "block";
            } else {
                items[i].style.display = "none";
            }
        }
    }

    function updateActiveButton(value, type) {
        // Tìm nhóm nút tương ứng (Dựa vào cha của nút được bấm, nhưng ở đây ta tìm thủ công cho chắc)
        let container;
        if (type === 'diff') container = document.querySelectorAll('.filter-group')[0];
        else container = document.querySelectorAll('.filter-group')[1];

        let btns = container.getElementsByClassName("filter-btn");
        for (let i = 0; i < btns.length; i++) {
            // Xóa active cũ
            btns[i].className = btns[i].className.replace(" active", "");
            // Nếu nút này chứa text khớp với value thì active (so sánh đơn giản)
            if (btns[i].getAttribute('onclick').includes("'" + value + "'")) {
                btns[i].className += " active";
            }
        }
    }
</script>
