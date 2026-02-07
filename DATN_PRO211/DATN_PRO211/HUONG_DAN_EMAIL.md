## Hướng Dẫn Thiết Lập Email OTP

### Cách 1: Sử dụng EmailJS (Khuyến Nghị - Đơn Giản, Miễn Phí)

**Bước 1: Tạo tài khoản EmailJS**
1. Truy cập: https://www.emailjs.com/
2. Click "Sign Up" và tạo tài khoản miễn phí
3. Xác nhận email của bạn

**Bước 2: Tạo Email Service**
1. Vào "Email Services" 
2. Click "Create New Service"
3. Chọn Gmail (hoặc email provider của bạn)
4. Follow hướng dẫn để kết nối
5. Lưu lại Service ID (ví dụ: `service_xxxxx`)

**Bước 3: Tạo Email Template**
1. Vào "Email Templates"
2. Click "Create New Template"
3. Sử dụng template sau:

```
Subject: Mã xác nhận đặt lại mật khẩu - Gym-Fitness

Body:
Xin chào,

Mã xác nhận của bạn là: {{otp_code}}

Mã này sẽ hết hạn sau 10 phút.

Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.

Trân trọng,
Đội ngũ Gym-Fitness
```

4. Lưu Template ID (ví dụ: `template_xxxxx`)

**Bước 4: Lấy Public Key**
1. Vào "Account" → "API Keys"
2. Copy "Public Key" (ví dụ: `xxxxx`)

**Bước 5: Cập nhật trong dự án**

Mở file `src/services/emailService.js` và cập nhật:

```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxx'     // Thay bằng Service ID của bạn
const EMAILJS_TEMPLATE_ID = 'template_xxxxx'   // Thay bằng Template ID của bạn
const EMAILJS_PUBLIC_KEY = 'xxxxx'             // Thay bằng Public Key của bạn
```

**Bước 6: Thêm EmailJS vào index.html**

Mở `index.html` và thêm vào `<head>`:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/index.min.js"></script>
```

---

### Cách 2: Sử dụng Backend Node.js (Nếu bạn có server)

Cài đặt package:
```bash
npm install nodemailer
```

Tạo file `server.js`:

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // Sử dụng App Password nếu bật 2FA
  }
});

app.post('/api/send-otp', async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Mã xác nhận đặt lại mật khẩu - Gym-Fitness',
      html: `
        <p>Xin chào,</p>
        <p>Mã xác nhận của bạn là: <strong>${otp}</strong></p>
        <p>Mã này sẽ hết hạn sau 10 phút.</p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
      `
    });
    
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

### Cách 3: Demo (Hiện Tại)

Hiện tại, OTP được hiển thị trên màn hình để bạn có thể test. Điều này hoàn toàn bình thường cho môi trường phát triển.

**Cách sử dụng:**
1. Nhập email đã đăng ký
2. Bấm "Gửi Mã OTP"
3. OTP sẽ hiển thị trên màn hình (với dòng chữ "OTP để test")
4. Copy và dán OTP vào trường tiếp theo

---

### Troubleshooting

- **Lỗi CORS**: Thêm domain của bạn vào EmailJS Settings → CORS
- **Email không gửi**: Kiểm tra Service ID, Template ID, Public Key có chính xác không
- **OTP hết hạn**: OTP mặc định có thời hạn 10 phút

---

**Liên Hệ**: Nếu cần hỗ trợ, tham khảo tài liệu EmailJS: https://www.emailjs.com/docs/
