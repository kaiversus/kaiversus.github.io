---
layout: default
title: Courses Library
permalink: /courses/
---
<style>
    /* --- CSS RIÊNG CHO TRANG COURSES (THEME CAM) --- */
    :root {
        --course-theme: #ffaa00; /* Màu Cam Neon */
    }

    /* 1. KHUNG CHỨA CÁC KHÓA HỌC (HÀNG NGANG) */
    .course-navigator {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        padding-bottom: 20px;
        margin-top: 30px;
        scrollbar-width: thin;
        scrollbar-color: var(--course-theme) #111;
    }
    
    /* Thanh cuộn đẹp */
    .course-navigator::-webkit-scrollbar { height: 5px; }
    .course-navigator::-webkit-scrollbar-thumb { background: var(--course-theme); border-radius: 10px; }

    /* 2. THẺ KHÓA HỌC (CARD) */
    .course-folder {
        min-width: 200px;
        background: rgba(20, 20, 20, 0.8);
        border: 1px solid #444;
        border-top: 3px solid #666;
        border-radius: 5px;
        padding: 20px;
        cursor: pointer;
        transition: 0.3s;
        text-align: center;
        position: relative;
    }

    /* Hiệu ứng khi Hover hoặc Active */
    .course-folder:hover, .course-folder.active {
        background: rgba(255, 170, 0, 0.1); /* Nền cam nhạt */
        border-color: var(--course-theme);  /* Viền cam */
        box-shadow: 0 0 15px rgba(255, 170, 0, 0.2);
        transform: translateY(-5px);
    }
    
    .course-folder h3 {
        color: #fff;
        font-family: 'Orbitron', sans-serif;
        font-size: 1.1rem;
        margin: 10px 0 5px 0;
    }

    .course-folder span {
        font-size: 0.8rem;
        color: #888;
        font-family: monospace;
    }
    
    /* Icon nhấp nháy */
    .course-folder.active h3 { color: var(--course-theme); }

    /* 3. KHU VỰC HIỂN THỊ BÀI HỌC (MẶC ĐỊNH ẨN) */
    .modules-container {
        display: none; /* Ẩn đi */
        margin-top: 30px;
        animation: slideDown 0.5s ease;
    }
    
    .modules-container.show {
        display: grid; /* Hiện ra khi có class .show */
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    /* Thẻ bài học con */
    .module-card {
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid #333;
        border-left: 3px solid #444;
        padding: 15px;
        border-radius: 5px;
        transition: 0.3s;
        cursor: pointer;
    }
    
    .module-card:hover {
        border-left-color: var(--course-theme);
        background: rgba(255, 170, 0, 0.05);
        transform: translateX(5px);
    }

    .module-title {
        color: #ddd;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 5px;
    }
    
    .module-card:hover .module-title { color: var(--course-theme); }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>

<section class="container" style="margin-top: 50px;">
    <h1 style="color: var(--course-theme);">// LEARNING_PATHS</h1>
    <a href="/" class="btn-cyber secondary" style="font-size: 0.8rem; border-color: var(--course-theme); color: var(--course-theme);"><< RETURN_BASE</a>

    <p style="color: #888; margin-top: 10px; font-family: monospace;">> Select a module below to initialize data stream...</p>

    <div class="course-navigator">
        <div class="course-folder" onclick="showModules('Malware')">
            <div style="font-size: 2rem;">🦠</div>
            <h3>MALWARE</h3>
            <span>[ ANALYSIS ]</span>
        </div>

        <div class="course-folder" onclick="showModules('Web')">
            <div style="font-size: 2rem;">🌐</div>
            <h3>WEB</h3>
            <span>[ HACKING ]</span>
        </div>

        <div class="course-folder" onclick="showModules('Reverse')">
            <div style="font-size: 2rem;">⚙️</div>
            <h3>REVERSE</h3>
            <span>[ ENG ]</span>
        </div>

        <div class="course-folder" onclick="showModules('System')">
            <div style="font-size: 2rem;">🛡️</div>
            <h3>SYSTEM</h3>
            <span>[ PWN ]</span>
        </div>

        <div class="course-folder" onclick="showModules('Crypto')">
            <div style="font-size: 2rem;">🔐</div>
            <h3>CRYPTO</h3>
            <span>[ GRAPHY ]</span>
        </div>
        
         <div class="course-folder" onclick="showModules('General')">
            <div style="font-size: 2rem;">📂</div>
            <h3>GENERAL</h3>
            <span>[ BASICS ]</span>
        </div>
    </div>

    <hr style="border-color: #222; margin: 30px 0;">

    <h3 id="selected-course-title" style="color: var(--course-theme); font-family: 'Orbitron'; display: none;">
        // MODULES_LIST
    </h3>

    <div id="modules-grid" class="modules-container">
        {% for post in site.courses reversed %}
        <article class="module-card filter-item" 
                 data-cat="{{ post.category | default: 'General' }}" 
                 onclick="window.location.href='{{ post.url }}'">
            
            <div style="font-size: 0.8rem; color: #666; font-family: monospace; margin-bottom: 5px;">
                {{ post.date | date: "%Y-%m-%d" }} | {{ post.difficulty | default: 'Beginner' }}
            </div>
            
            <h4 class="module-title">{{ post.title }}</h4>
            <p style="color: #888; font-size: 0.9rem; margin: 0;">{{ post.description | truncate: 80 }}</p>
        </article>
        {% endfor %}
    </div>

</section>

<script>
    function showModules(category) {
        // 1. Xử lý UI của các nút Folder (Active state)
        let folders = document.querySelectorAll('.course-folder');
        folders.forEach(f => f.classList.remove('active'));
        event.currentTarget.classList.add('active');

        // 2. Hiện tiêu đề và Grid
        document.getElementById('selected-course-title').style.display = 'block';
        document.getElementById('selected-course-title').innerText = `// ${category.toUpperCase()}_MODULES`;
        
        let grid = document.getElementById('modules-grid');
        grid.classList.add('show');

        // 3. Lọc bài viết
        let items = document.getElementsByClassName('filter-item');
        let count = 0;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemCats = item.getAttribute('data-cat'); // Lấy danh mục bài viết
            
            // Kiểm tra xem bài viết có thuộc category đang chọn không
            // Dùng indexOf để tìm chuỗi con (vì 1 bài có thể nhiều tag)
            if (itemCats.includes(category)) {
                item.style.display = "block";
                count++;
            } else {
                item.style.display = "none";
            }
        }
        
        // Nếu không có bài nào
        if(count === 0) {
            document.getElementById('selected-course-title').innerText = `// NO_DATA_FOUND_FOR_${category.toUpperCase()}`;
        }
    }
</script>
