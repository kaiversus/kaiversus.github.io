---
layout: default
title: Courses Archive
permalink: /courses/
---
<style>
    /* --- CUSTOM THEME CHO KHÓA HỌC (MÀU CAM) --- */
    :root {
        --course-theme: #ffaa00; /* Màu cam chủ đạo */
    }

    /* Override màu nút Active cho trang này */
    .filter-btn.active {
        background: var(--course-theme) !important;
        color: #000 !important;
        box-shadow: 0 0 15px var(--course-theme) !important;
        border-color: var(--course-theme) !important;
    }

    .filter-btn:hover {
        border-color: var(--course-theme) !important;
        color: var(--course-theme) !important;
        box-shadow: 0 0 10px var(--course-theme) !important;
    }
    
    .filter-btn.active:hover {
        color: #000 !important;
    }

    /* Màu tag Difficulty */
    .tag-diff.easy { color: #00ff41; border: 1px solid #00ff41; padding: 2px 5px; border-radius: 4px; font-size: 0.7rem; }
    .tag-diff.medium { color: #ffaa00; border: 1px solid #ffaa00; padding: 2px 5px; border-radius: 4px; font-size: 0.7rem; }
    .tag-diff.hard { color: #ff0055; border: 1px solid #ff0055; padding: 2px 5px; border-radius: 4px; font-size: 0.7rem; }

    /* Màu tag Category */
    .tag-cat { 
        background: rgba(255, 255, 255, 0.1); 
        padding: 2px 8px; 
        border-radius: 4px; 
        font-size: 0.75rem; 
        color: #ccc;
        margin-right: 5px;
        font-family: monospace;
    }
</style>

<section class="container" style="margin-top: 50px;">
    <h1 style="color: var(--course-theme);">// COURSES_DIRECTORY</h1>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem; border-color: var(--course-theme); color: var(--course-theme);"><< BACK_TO_ROOT</a>
    
    <div class="filter-console" style="margin-top: 30px; border: 1px solid #333; padding: 20px; background: rgba(0,0,0,0.5);">
        
        <div style="margin-bottom: 20px; border-bottom: 1px dashed #444; padding-bottom: 20px;">
            <span style="color: #fff; font-family: monospace;">> SEARCH_MODULE:</span>
            <input type="text" id="searchInput" onkeyup="filterSearch()" placeholder="Search modules (e.g., malware, basic...)" class="cyber-input" 
                   style="background: transparent; border: none; border-bottom: 1px solid #555; color: var(--course-theme); font-family: monospace; width: 60%; margin-left: 10px; outline: none;">
        </div>

        <div class="filter-group">
            <span style="color: var(--course-theme); font-family: monospace;">> DIFFICULTY:</span>
            <button class="filter-btn active" onclick="filterSelection('all', 'diff')">[ ALL ]</button>
            <button class="filter-btn" onclick="filterSelection('Beginner', 'diff')">[ BEGINNER ]</button>
            <button class="filter-btn" onclick="filterSelection('Intermediate', 'diff')">[ INTERMEDIATE ]</button>
            <button class="filter-btn" onclick="filterSelection('Advanced', 'diff')">[ ADVANCED ]</button>
        </div>
        <div class="filter-group" style="margin-top: 15px;">
            <span style="color: #fff; font-family: monospace;">> TOPIC_TAGS: </span>
            <button class="filter-btn active" onclick="filterSelection('all', 'cat')">[ ALL ]</button>
            <button class="filter-btn" onclick="filterSelection('Malware', 'cat')">[ MALWARE ]</button>
            <button class="filter-btn" onclick="filterSelection('Reverse', 'cat')">[ REVERSE ]</button>
            <button class="filter-btn" onclick="filterSelection('System', 'cat')">[ SYSTEM ]</button>
            <button class="filter-btn" onclick="filterSelection('Crypto', 'cat')">[ CRYPTO ]</button>
            <button class="filter-btn" onclick="filterSelection('General', 'cat')">[ GENERAL ]</button>
        </div>
    </div>
    
    <div class="card-grid" style="margin-top: 30px;">
        {% for post in site.courses reversed %}
        <article class="log-card filter-item" 
                 data-diff="{{ post.difficulty | default: 'Unrated' }}" 
                 data-cat="{{ post.category | default: 'General' }}"
                 onclick="window.location.href='{{ post.url }}'"
                 style="border-color: rgba(255, 170, 0, 0.3);">
            
            <div class="log-header">
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                {% if post.difficulty %}
                <span class="tag-diff {{ post.difficulty | downcase }}">{{ post.difficulty | upcase }}</span>
                {% endif %}
            </div>
            
            <h3 class="log-title search-target" style="margin-bottom: 5px; color: var(--course-theme);">{{ post.title }}</h3>
            
            <div class="tag-container" style="margin-bottom: 10px;">
                {% assign cat_list = post.category | split: ', ' %}
                {% for cat in cat_list %}
                    <span class="tag-cat">{{ cat | strip | upcase }}</span>
                {% endfor %}
            </div>

            <p class="log-desc search-target">{{ post.description }}</p>
            
            <div style="text-align: right;">
                <span class="cmd-btn" style="color: var(--course-theme);">[ ACCESS_MODULE ]</span>
            </div>
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
            let title = item.querySelector('.log-title').innerText.toLowerCase();
            let desc = item.querySelector('.log-desc').innerText.toLowerCase();
            let contentText = title + " " + desc;

            // 3. Kiểm tra 3 điều kiện (Logic AND)
            // Lưu ý: Category dùng indexOf để tìm chuỗi con (vì 1 bài có thể nhiều tag)
            let matchDiff = (currentDiff === 'all' || itemDiff === currentDiff);
            let matchCat = (currentCat === 'all' || itemCat.indexOf(currentCat) > -1);
            let matchSearch = (currentSearch === '' || contentText.indexOf(currentSearch) > -1);

            // Nếu thỏa mãn CẢ BA thì hiện
            if (matchDiff && matchCat && matchSearch) {
                item.style.display = "block";
                // Animation nhẹ khi hiện
                item.style.animation = "fadeIn 0.5s";
            } else {
                item.style.display = "none";
            }
        }
    }

    // Hàm đổi màu nút active
    function updateActiveButton(value, type) {
        let container;
        // Xác định hàng nút nào đang được bấm (Difficulty hay Category)
        // Dựa vào thứ tự div.filter-group trong HTML
        if (type === 'diff') container = document.querySelectorAll('.filter-group')[0];
        else container = document.querySelectorAll('.filter-group')[1];

        let btns = container.getElementsByClassName("filter-btn");
        for (let i = 0; i < btns.length; i++) {
            // Xóa class active cũ
            btns[i].className = btns[i].className.replace(" active", "");
            // Thêm class active nếu đúng nút
            if (btns[i].getAttribute('onclick').includes("'" + value + "'")) {
                btns[i].className += " active";
            }
        }
    }
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
