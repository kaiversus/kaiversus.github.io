/* File: assets/js/cyber-bg.js - Updated for Theming */
const canvas = document.getElementById('cyber-matrix');
const ctx = canvas.getContext('2d');
let heroSection = document.querySelector('.hero-section');

// Hàm lấy giá trị màu từ CSS Variable
function getCssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
}
resizeCanvas();

const characters = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const charArray = characters.split('');
const fontSize = 20;
let columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function draw() {
    // Kỹ thuật: Kiểm tra theme hiện tại
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    // Cấu hình màu dựa trên Theme
    // Dark mode: Xanh lá neon (#ff0055 cũ của bạn hoặc xanh lá)
    // Light mode: Xanh đậm hoặc Đen để nổi trên nền trắng
    const colorText = isLight ? '#008f11' : '#ff0055'; 
    
    // QUAN TRỌNG: Màu nền mờ để tạo vệt
    // Light mode cần màu trắng mờ, Dark mode cần màu đen mờ
    const fadeColor = isLight ? 'rgba(240, 242, 245, 0.1)' : 'rgba(5, 10, 20, 0.1)';

    ctx.fillStyle = fadeColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = colorText;
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < columns; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Chạy draw
setInterval(draw, 75);

window.addEventListener('resize', () => {
    resizeCanvas();
    const newColumns = canvas.width / fontSize;
    for (let i = columns; i < newColumns; i++) {
        drops[i] = Math.random() * -100;
    }
    columns = newColumns;
});
