---
layout: default
title: Writeups Archive
permalink: /writeups/
---
<section class="container" style="margin-top: 50px;">
    <h1 style="color: var(--primary);">// WRITEUPS_DIRECTORY</h1>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem;"><< BACK_TO_ROOT</a>

    <div class="filter-console" style="margin-top: 30px; border: 1px solid #333; padding: 20px; background: rgba(0,0,0,0.5);">
        
        <div style="margin-bottom: 20px; border-bottom: 1px dashed #444; padding-bottom: 20px;">
            <span style="color: #fff; font-family: monospace;">> GREP_QUERY:</span>
            <input type="text" id="searchInput" onkeyup="filterSearch()" placeholder="Enter keywords (e.g., blockchain, pico...)" class="cyber-input">
        </div>

        <div class="filter-group">
            <span style="color: var(--primary); font-family: monospace;">> DIFFICULTY:</span>
            <button class="filter-btn active" onclick="filterSelection('all', 'diff')">[ ALL ]</button>
            <button class="filter-btn" onclick="filterSelection('Easy', 'diff')">[ EASY ]</button>
            <button class="filter-btn" onclick="filterSelection('Medium', 'diff')">[ MEDIUM ]</button>
            <button class="filter-btn" onclick="filterSelection('Hard', 'diff')">[ HARD ]</button>
        </div>
        <div class="filter-group" style="margin-top: 15px;">
            <span style="color: var(--accent); font-family: monospace;">> CATEGORY:  </span>
            <button class="filter-btn active" onclick="filterSelection('all', 'cat')">[ ALL ]</button>
            <button class="filter-btn" onclick="filterSelection('Reverse', 'cat')">[ REVERSE ]</button>
            <button class="filter-btn" onclick="filterSelection('Crypto', 'cat')">[ CRYPTO ]</button>
            <button class="filter-btn" onclick="filterSelection('Pwn', 'cat')">[ PWN ]</button>
            <button class="filter-btn" onclick="filterSelection('Web', 'cat')">[ WEB ]</button>
            <button class="filter-btn" onclick="filterSelection('Forensic', 'cat')">[ FORENSIC ]</button>
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
            
            <h3 class="log-title search-target" style="margin-bottom: 5px;">{{ post.title }}</h3>
            
            <div class="tag-container">
                {% assign cat_list = post.category | split: ', ' %}
                {% for cat in cat_list %}
                    <span class="tag-cat {{ cat | strip }}">{{ cat | strip | upcase }}</span>
                {% endfor %}
            </div>

            <p class="log-desc search-target">{{ post.description }}</p>
            
            <a href="{{ post.url }}" class="cmd-btn">[ READ_LOG ]</a>
        </article>
        {% endfor %}
    </div>
</section>

<script>
    // State lưu trạng thái của 3 bộ lọc
    let currentDiff = 'all';
    let currentCat = 'all';
    let currentSearch = '';

    // Hàm xử lý khi gõ phím
    function filterSearch() {
        // Lấy giá trị ô input và chuyển về chữ thường
        currentSearch = document.getElementById('searchInput').value.toLowerCase();
        runFilter(); // Chạy bộ lọc tổng
    }

    // Hàm xử lý khi bấm nút Filter
    function filterSelection(value, type) {
        if (type === 'diff') currentDiff = value;
        if (type === 'cat') currentCat = value;
        
        updateActiveButton(value, type);
        runFilter(); // Chạy bộ lọc tổng
    }

    // --- BỘ NÃO TRUNG TÂM (LOGIC LỌC) ---
    function runFilter() {
        let items = document.getElementsByClassName("filter-item");
        
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            
            // 1. Lấy dữ liệu Attributes
            let itemDiff = item.getAttribute('data-diff');
            let itemCat = item.getAttribute('data-cat');
            
            // 2. Lấy nội dung văn bản để tìm kiếm (Tiêu đề + Mô tả)
            // Ghép lại thành 1 chuỗi lớn và chuyển về chữ thường
            let title = item.querySelector('.log-title').innerText.toLowerCase();
            let desc = item.querySelector('.log-desc').innerText.toLowerCase();
            let contentText = title + " " + desc;

            // 3. Kiểm tra 3 điều kiện (Logic AND)
            let matchDiff = (currentDiff === 'all' || itemDiff === currentDiff);
            let matchCat = (currentCat === 'all' || itemCat.indexOf(currentCat) > -1);
            let matchSearch = (currentSearch === '' || contentText.indexOf(currentSearch) > -1);

            // Nếu thỏa mãn CẢ BA thì hiện
            if (matchDiff && matchCat && matchSearch) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    }

    // Hàm đổi màu nút active
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
