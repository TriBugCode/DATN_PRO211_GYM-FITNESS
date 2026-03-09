# Hướng Dẫn Sử Dụng Chức Năng Quên Mật Khẩu

## 📋 Tóm Tắt

Chức năng "Quên Mật Khẩu" đã được hoàn thành với các tính năng:

✅ Tạo mã OTP ngẫu nhiên (6 chữ số)  
✅ OTP có thời hạn 10 phút  
✅ Gửi OTP qua email (có thể sử dụng EmailJS hoặc backend)  
✅ Xác minh OTP  
✅ Đặt lại mật khẩu an toàn  
✅ Hiển thị OTP trên màn hình để test  

---

## 🚀 Cách Sử Dụng (Demo Hiện Tại)

### Bước 1: Truy cập trang Quên Mật Khẩu
- Nhấp vào "Quên mật khẩu?" trên trang đăng nhập

### Bước 2: Nhập Email
- Nhập email đã đăng ký
- Nhấp "Gửi Mã OTP"
- Chờ trong 1 giây
- **OTP sẽ hiển thị trên màn hình** (dòng chữ "OTP để test")

### Bước 3: Nhập Mã OTP
- Copy mã OTP từ màn hình
- Dán vào trường "Mã Xác Nhận"
- Nhấp "Xác Nhận"

### Bước 4: Đặt Lại Mật Khẩu
- Nhập mật khẩu mới (ít nhất 6 ký tự)
- Xác nhận mật khẩu
- Nhấp "Đặt Lại Mật Khẩu"
- Sẽ quay lại trang đăng nhập

---

## 📧 Để Gửi Email Thực Sự

### Cách 1: Sử dụng EmailJS (Khuyến Nghị)

**Các file liên quan:**
- `src/services/emailService.js` - Service để gửi email

**Cài đặt:**

1. Truy cập https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí
3. Cấu hình Email Service (Gmail hoặc provider khác)
4. Tạo Email Template với nội dung OTP
5. Sao chép Service ID, Template ID, Public Key
6. Mở `src/services/emailService.js` và cập nhật:

```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxx'     // Thay bằng giá trị của bạn
const EMAILJS_TEMPLATE_ID = 'template_xxxxx'   // Thay bằng giá trị của bạn
const EMAILJS_PUBLIC_KEY = 'xxxxx'             // Thay bằng giá trị của bạn
```

7. Thêm EmailJS vào `index.html`:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/index.min.js"></script>
```

### Cách 2: Sử dụng Backend API

Bạn có thể tạo API endpoint để gửi email từ backend.

Cập nhật `src/services/emailService.js` và sử dụng hàm `sendOtpEmailViaBackend`.

---

## 🔒 Bảo Mật

- OTP được tạo ngẫu nhiên 6 chữ số
- OTP hết hạn sau 10 phút
- Mật khẩu được cập nhật trực tiếp trong database
- Dữ liệu người dùng được lưu trong localStorage (trong môi trường production, sử dụng database thực)

---

## 📝 Cấu Trúc Dữ Liệu

Người dùng được lưu trong localStorage với cấu trúc:

```javascript
{
  id: 1234567890,
  fullname: "Nguyễn Văn A",
  email: "a@example.com",
  password: "hashedPassword123",
  createdAt: "2024-01-26T...",
  updatedAt: "2024-01-26T..." // Cập nhật khi đổi mật khẩu
}
```

---

## 🐛 Troubleshooting

### OTP không gửi được

- Kiểm tra console (F12 → Console) xem có lỗi gì không
- Kiểm tra cấu hình EmailJS/Backend
- Kiểm tra email có tồn tại trong hệ thống không

### OTP sai

- OTP phân biệt hoa/thường (nếu có)
- Kiểm tra OTP đã hết hạn chưa
- Copy lại OTP từ màn hình

### Mật khẩu không thay đổi

- Kiểm tra localStorage có dữ liệu người dùng không
- Thử xóa localStorage và đăng ký lại

---

## 📌 Lưu Ý

- Hiện tại OTP được hiển thị trên màn hình để dễ test
- Trong production, không nên hiển thị OTP trên màn hình
- Vui lòng cấu hình EmailJS hoặc backend để gửi email thực tế
- Đọc file `HUONG_DAN_EMAIL.md` để cấu hình chi tiết

---

**Cần giúp?** Liên hệ tác giả hoặc tham khảo tài liệu EmailJS.
