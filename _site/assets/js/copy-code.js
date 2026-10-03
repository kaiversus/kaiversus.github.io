document.addEventListener('DOMContentLoaded', () => {
    // Tìm tất cả thẻ <pre> trong bài viết
    const codeBlocks = document.querySelectorAll('.writeup-content pre');

    codeBlocks.forEach((block) => {
        // 1. Tạo một thẻ div bao quanh thẻ pre để làm điểm tựa (wrapper)
        const wrapper = document.createElement('div');
        wrapper.className = 'code-header';
        
        // Chèn wrapper vào trước thẻ pre, sau đó đưa thẻ pre vào trong wrapper
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);

        // 2. Tạo nút Copy
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerText = 'Copy';

        // 3. Xử lý sự kiện click
        button.addEventListener('click', () => {
            // Lấy nội dung text trong thẻ code
            const code = block.querySelector('code') ? block.querySelector('code').innerText : block.innerText;
            
            // Copy vào clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Hiệu ứng thông báo thành công
                const originalText = button.innerText;
                button.innerText = 'Copied!';
                button.style.background = '#238636'; // Xanh lá
                button.style.color = '#fff';

                // Trả lại trạng thái cũ sau 2 giây
                setTimeout(() => {
                    button.innerText = originalText;
                    button.style.background = '';
                    button.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                button.innerText = 'Error';
            });
        });

        // Gắn nút vào wrapper
        wrapper.appendChild(button);
    });
});
