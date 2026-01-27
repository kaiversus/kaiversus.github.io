---
layout: default
title: Courses Library
permalink: /courses/
---
<style>
    /* --- CSS THEME MÀU CAM --- */
    :root {
        --course-theme: #ffaa00; /* Màu Cam Neon */
    }

    /* 1. GIAO DIỆN DANH SÁCH DỌC (CATEGORY LIST) */
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
        border: 1px solid #333;
        background: rgba(10, 10, 10, 0.6);
        cursor: pointer;
        transition: 0.3s;
        font-family: 'Rajdhani', sans-serif;
    }

    .cat-row:hover {
        border-color: var(--course-theme);
        background: rgba(255, 170, 0, 0.05);
        transform: translateX(10px); /* Hiệu ứng đẩy sang phải */
    }

    .cat-id {
        color: #666;
        font-family: 'JetBrains Mono', monospace;
        margin-right: 15px;
        font-size: 0.9rem;
    }

    .cat-name {
        font-family: 'Orbitron', sans-serif;
        font-size: 1.2rem;
        color: #fff;
        flex-grow: 1;
        letter-spacing: 1px;
    }

    .cat-abbr {
        color: var(--course-theme);
        font-family: monospace;
        font-size: 0.9rem;
        opacity: 0.7;
    }

    .cat-row:hover .cat-name { color: var(--course-theme); }
    .cat-row:hover .cat-abbr { opacity: 1; letter-spacing: 2px; }

    /* 2. GIAO DIỆN CHI TIẾT (MODULE LIST) - Mặc định ẩn */
    .course-detail-view {
        display: none; /* Ẩn đi chờ kích hoạt */
        animation: fadeIn 0.5s ease;
    }

    .module-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 30px;
    }

    .module-card {
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid #333;
        border-left: 3px solid #444; /* Viền trái xám */
        padding: 20px;
        cursor: pointer;
        transition: 0.3s;
    }

    .module-card:hover {
        border-left-color: var(--course-theme); /* Hover thành cam */
        background: rgba(255, 170, 0, 0.05);
        transform: translateY(-5px);
    }

    .module-title {
        color: #ddd;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 10px;
    }

    .module-card:hover .module-title { color: var(--course-theme); }

    /* Nút Back */
    .back-nav {
        display: inline-flex;
        align-items: center;
        color: #888;
        cursor: pointer;
        font-family: monospace;
        margin-bottom: 20px;
        border-bottom: 1px solid transparent;
    }
    .back-nav:hover { color: var(--course-theme); border-bottom-color: var(--course-theme); }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>

<section class="container" style="margin-top: 50px;">
    
    <div style="display: flex; justify-content: space-between; align-items: end; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
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

        <div class="cat-row" onclick="openCourse('Web')">
            <span class="cat-id">[ 0x02 ]</span>
            <span class="cat-name">WEB EXPLOITATION</span>
            <span class="cat-abbr">&lt;DIR_WEB&gt;</span>
        </div>

        <div class="cat-row" onclick="openCourse('Reverse')">
            <span class="cat-id">[ 0x03 ]</span>
            <span class="cat-name">REVERSE ENGINEERING</span>
            <span class="cat-abbr">&lt;DIR_REV&gt;</span>
        </div>

        <div class="cat-row" onclick="openCourse('TryHackMe')">
            <span class="cat-id">[ 0x04 ]</span>
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
        <p style="color: #666; font-family: monospace; margin-bottom: 30px;">> List of available modules in this directory:</p>

        <div class="module-grid">
            {% for post in site.courses reversed %}
            <article class="module-card filter-item" 
                     data-cat="{{ post.category | default: 'General' }}" 
                     onclick="window.location.href='{{ post.url }}'">
                
                <div style="font-size: 0.8rem; color: #555; font-family: monospace; margin-bottom: 5px; display: flex; justify-content: space-between;">
                    <span>{{ post.date | date: "%Y-%m-%d" }}</span>
                    <span>[{{ post.difficulty | default: 'UNK' | upcase }}]</span>
                </div>
                
                <h4 class="module-title">{{ post.title }}</h4>
                <p style="color: #888; font-size: 0.9rem; margin: 0;">{{ post.description | truncate: 100 }}</p>
            </article>
            {% endfor %}
        </div>
    </div>

</section>

<script>
    function openCourse(category) {
        // 1. Ẩn danh sách chính
        document.getElementById('category-view').style.display = 'none';
        
        // 2. Hiện view chi tiết
        let detailView = document.getElementById('detail-view');
        detailView.style.display = 'block';
        
        // 3. Cập nhật tiêu đề
        document.getElementById('course-title-display').innerText = `// DIRECTORY: ${category.toUpperCase()}`;

        // 4. Lọc bài viết
        let items = document.getElementsByClassName('filter-item');
        let count = 0;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemCats = item.getAttribute('data-cat'); 
            
            // Logic lọc
            if (itemCats.includes(category)) {
                item.style.display = "block";
                count++;
            } else {
                item.style.display = "none";
            }
        }

        // Scroll lên đầu nhẹ nhàng
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    function closeCourse() {
        // Quay lại view danh sách
        document.getElementById('detail-view').style.display = 'none';
        document.getElementById('category-view').style.display = 'flex';
        document.getElementById('category-view').style.animation = 'fadeIn 0.3s ease';
    }
</script>
