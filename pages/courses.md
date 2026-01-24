---
layout: default
title: Courses Archive
permalink: /courses/
---
<section class="container" style="margin-top: 50px;">
    <h1 style="color: var(--primary);">// COURSES_DIRECTORY</h1>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem;"><< BACK_TO_ROOT</a>
    
    <div class="filter-console" style="margin-top: 30px; border: 1px solid #333; padding: 20px; background: rgba(0,0,0,0.5);">
        
        <div style="margin-bottom: 20px; border-bottom: 1px dashed #444; padding-bottom: 20px;">
            <span style="color: #fff; font-family: monospace;">> GREP_QUERY:</span>
            <input type="text" id="searchInput" onkeyup="filterSearch()" placeholder="Search modules (e.g., malware, basic...)" class="cyber-input" style="background: transparent; border: none; border-bottom: 1px solid #555; color: var(--primary); font-family: monospace; width: 60%; margin-left: 10px; outline: none;">
        </div>

        <div class="filter-group">
            <span style="color: var(--primary); font-family: monospace;">> DIFFICULTY:</span>
            <button class="filter-btn active" onclick="filterSelection('all', 'diff')">[ ALL ]</button>
            <button class="filter-btn" onclick="filterSelection('Beginner', 'diff')">[ BEGINNER ]</button>
            <button class="filter-btn" onclick="filterSelection('Intermediate', 'diff')">[ INTERMEDIATE ]</button>
            <button class="filter-btn" onclick="filterSelection('Advanced', 'diff')">[ ADVANCED ]</button>
        </div>
        <div class="filter-group" style="margin-top: 15px;">
            <span style="color: var(--accent); font-family: monospace;">> CATEGORY: </span>
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
                 onclick="window.location.href='{{ post.url }}'">
            
            <div class="log-header">
                <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                {% if post.difficulty %}
                <span class="tag-diff" style="color: var(--primary); border: 1px solid var(--primary); padding: 0 5px; border-radius: 3px; font-size: 0.7rem;">
                    {{ post.difficulty | upcase }}
                </span>
                {% endif %}
            </div>
            
            <h3 class="log-title search-target" style="margin-bottom: 5px;">{{ post.title }}</h3>
            
            <div class="tag-container" style="margin-bottom: 10px;">
                {% assign cat_list = post.category | split: ', ' %}
                {% for cat in cat_list %}
                    <span class="tag-cat" style="background: rgba(255, 255, 255, 0.1); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; color: #ccc; margin-right: 5px; font-family: monospace;">
                        {{ cat | strip | upcase }}
                    </span>
                {% endfor %}
            </div>

            <p class="log-desc search-target">{{ post.description }}</p>
            
            <div style="text-align: right;">
                <span class="cmd-btn" style="color: var(--primary);">[ ACCESS_MODULE ]</span>
            </div>
        </article>
        {% endfor %}
    </div>
</section>

<style>
    /* CSS CỤC BỘ CHO TRANG NÀY ĐỂ ĐẢM BẢO GIỐNG WRITEUPS */
    
    /* Nút bộ lọc */
    .filter-btn {
        background: transparent;
        border: 1px solid #444;
        color: #888;
        padding: 5px 15px;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
        font-family: monospace;
        transition: 0.3s;
    }

    /* Hover và Active dùng màu xanh lá (Primary) */
    .filter-btn:hover, .filter-btn.active {
        border-color: var(--primary);
        color: var(--primary);
        box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
    }
    
    .filter-btn.active {
        background: rgba(0, 255, 65, 0.1);
        font-weight: bold;
    }

    /* Hiệu ứng ô input */
    .cyber-input:focus {
        border-bottom-color: var(--primary) !important;
        box-shadow: 0 1px 0 var(--primary);
    }
</style>

<script>
    // LOGIC JAVASCRIPT GIỐNG HỆT WRITEUPS
    let currentDiff = 'all';
    let currentCat = 'all';
    let currentSearch = '';

    function filterSearch() {
        currentSearch = document.getElementById('searchInput').value.toLowerCase();
        runFilter(); 
    }

    function filterSelection(value, type) {
        if (type === 'diff') currentDiff = value;
        if (type === 'cat') currentCat = value;
        
        updateActiveButton(value, type);
        runFilter(); 
    }

    function runFilter() {
        let items = document.getElementsByClassName("filter-item");
        
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            
            // Lấy dữ liệu
            let itemDiff = item.getAttribute('data-diff');
            let itemCat = item.getAttribute('data-cat');
            
            // Tìm kiếm trong Title và Description
            let title = item.querySelector('.log-title').innerText.toLowerCase();
            let desc = item.querySelector('.log-desc').innerText.toLowerCase();
            let contentText = title + " " + desc;

            // Kiểm tra điều kiện
            let matchDiff = (currentDiff === 'all' || itemDiff === currentDiff);
            let matchCat = (currentCat === 'all' || itemCat.indexOf(currentCat) > -1);
            let matchSearch = (currentSearch === '' || contentText.indexOf(currentSearch) > -1);

            if (matchDiff && matchCat && matchSearch) {
                item.style.display = "block";
                item.style.animation = "fadeIn 0.3s"; // Thêm chút hiệu ứng cho mượt
            } else {
                item.style.display = "none";
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

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
