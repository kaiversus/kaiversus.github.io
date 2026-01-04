/* File: assets/js/cyber-bg.js
    Hiệu ứng mưa mã nhị phân/hex cyberpunk
*/

const canvas = document.getElementById('cyber-matrix');
const ctx = canvas.getContext('2d');

// Thiết lập kích thước canvas bằng đúng kích thước phần Hero
let heroSection = document.querySelector('.hero-section');
canvas.width = heroSection.offsetWidth;
canvas.height = heroSection.offsetHeight;

// CẤU HÌNH MÀU SẮC Ở ĐÂY
// Bạn không thích màu xanh, tôi đổi sang màu hồng neon của bạn (#ff0055)
// Bạn có thể đổi thành màu đỏ (#ff0000), tím (#800080) tùy thích.
const colorNeon = '#ff0055'; 

// Các ký tự sẽ rơi xuống (Nhị phân và Hex cho ngầu)
const characters = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const charArray = characters.split('');

const fontSize = 20; // Kích thước chữ
const columns = canvas.width / fontSize; // Số cột

// Mảng chứa vị trí Y (dọc) của các giọt mưa
const drops = [];
for (let i = 0; i < columns; i++) {
    // Bắt đầu rơi từ các vị trí ngẫu nhiên ngoài màn hình để tự nhiên hơn
    drops[i] = Math.random() * -100; 
}

function draw() {
    // Tạo hiệu ứng vệt mờ: Vẽ một lớp màu đen bán trong suốt lên frame cũ
    ctx.fillStyle = 'rgba(5, 10, 20, 0.1)'; // Màu nền đen của bạn với độ mờ 0.1
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Thiết lập màu chữ và font
    ctx.fillStyle = colorNeon; 
    ctx.font = fontSize + 'px monospace'; // Dùng font monospace cho giống code

    // Vẽ các ký tự
    for (let i = 0; i < columns; i++) {
        // Chọn ký tự ngẫu nhiên
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Vẽ ký tự tại vị trí X (cột i) và Y (giá trị drops[i])
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Nếu giọt mưa rơi quá đáy màn hình VÀ một điều kiện ngẫu nhiên xảy ra
        // thì reset nó lại lên đỉnh để tạo vòng lặp vô tận
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Di chuyển giọt mưa xuống dưới
        drops[i]++;
    }
}

// Chạy hàm draw liên tục (khoảng 30fps)
setInterval(draw, 75);

// Xử lý khi người dùng thay đổi kích thước cửa sổ trình duyệt
window.addEventListener('resize', () => {
    heroSection = document.querySelector('.hero-section');
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
    // Tính toán lại số cột
    const newColumns = canvas.width / fontSize;
    // Thêm các cột mới nếu màn hình rộng ra
    for (let i = columns; i < newColumns; i++) {
        drops[i] = Math.random() * -100;
    }
});