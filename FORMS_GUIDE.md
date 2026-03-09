# Chi tiết các Form & Chức năng

## 1. FORM QUẢN LÝ HỘI VIÊN (Members Management)

### 📋 Danh sách Hội viên
- **Tìm kiếm**: Tìm theo tên, email hoặc số điện thoại
- **Hiển thị**: Bảng danh sách tất cả hội viên
- **Cột**: Họ tên, Email, Số điện thoại, Gói tập, Huấn luyện viên

### ➕ Thêm Hội viên mới
```
Modal Form:
- Họ tên *                    (bắt buộc)
- Email *                     (bắt buộc, kiểm tra trùng lặp)
- Mật khẩu *                  (bắt buộc)
- Số điện thoại *             (bắt buộc)
- Gói tập *                   (Basic, Premium, Elite)
- Huấn luyện viên             (hiện nếu chọn Premium/Elite)

Nút: "Thêm" | "Hủy"
```

### ✏️ Sửa Hội viên
```
Modal Form (tương tự Thêm):
- Tất cả các trường có thể chỉnh sửa
- Mật khẩu: để trống nếu không muốn đổi
- Nút: "Cập nhật" | "Hủy"
```

### 🗑️ Xóa Hội viên
- Nhấp nút "Xóa"
- Xác nhận: "Bạn chắc chắn muốn xóa hội viên này?"
- Xóa khỏi danh sách

---

## 2. FORM QUẢN LÝ HUẤN LUYỆN VIÊN (Trainers Management)

### 📋 Danh sách Huấn luyện viên
- **Tìm kiếm**: Tìm theo tên, email hoặc chuyên môn
- **Hiển thị**: Bảng danh sách tất cả HLV
- **Cột**: Họ tên, Email, Số điện thoại, Chuyên môn

### ➕ Thêm Huấn luyện viên mới
```
Modal Form:
- Họ tên *                    (bắt buộc)
- Email *                     (bắt buộc, kiểm tra trùng lặp)
- Mật khẩu *                  (bắt buộc)
- Số điện thoại *             (bắt buộc)
- Chuyên môn *                (Fitness, Yoga, Boxing, Swimming, 
                              Aerobics, Weight Training, Functional Training)

Nút: "Thêm" | "Hủy"
```

### ✏️ Sửa Huấn luyện viên
```
Modal Form (tương tự Thêm):
- Tất cả các trường có thể chỉnh sửa
- Mật khẩu: để trống nếu không muốn đổi
- Nút: "Cập nhật" | "Hủy"
```

### 🗑️ Xóa Huấn luyện viên
- Xác nhận xóa
- Xóa khỏi danh sách

---

## 3. FORM QUẢN LÝ NHÂN VIÊN (Staff Management)

### 📋 Danh sách Nhân viên
- **Tìm kiếm**: Tìm theo tên, email hoặc số điện thoại
- **Hiển thị**: Bảng danh sách tất cả nhân viên
- **Cột**: Họ tên, Email, Số điện thoại, Chức vụ, Ngày tham gia

### ➕ Thêm Nhân viên mới
```
Modal Form:
- Họ tên *                    (bắt buộc)
- Email *                     (bắt buộc, kiểm tra trùng lặp)
- Mật khẩu *                  (bắt buộc)
- Số điện thoại *             (bắt buộc)
- Chức vụ                     (VD: Quản lý, Lễ tân, Bảo vệ)

Nút: "Thêm" | "Hủy"
```

### ✏️ Sửa Nhân viên
```
Modal Form (tương tự Thêm):
- Tất cả các trường có thể chỉnh sửa
- Mật khẩu: để trống nếu không muốn đổi
- Nút: "Cập nhật" | "Hủy"
```

### 🗑️ Xóa Nhân viên
- Xác nhận xóa
- Xóa khỏi danh sách

---

## 4. FORM QUẢN LÝ LỊCH TẬP (Schedule Management)

### 📋 Danh sách Lịch tập
- **Lọc theo loại tập**: Fitness, Yoga, Boxing, Swimming, Aerobics
- **Lọc theo thứ**: Thứ 2-7, Chủ nhật
- **Hiển thị**: Bảng sắp xếp theo thứ trong tuần
- **Cột**: Tên lớp, Loại, Ngày, Thời gian, HLV, Sức chứa

### ➕ Thêm Lịch tập mới
```
Modal Form:
- Tên lớp *                   (VD: Fitness sáng)
- Loại tập *                  (Fitness, Yoga, Boxing, Swimming, Aerobics)
- Ngày tập *                  (Thứ 2-7, Chủ nhật)
- Thời gian bắt đầu *         (HH:MM)
- Thời gian kết thúc *        (HH:MM)
- Huấn luyện viên *           (Chọn từ danh sách)
- Sức chứa *                  (Số người, mặc định 20)

Nút: "Thêm" | "Hủy"
```

### ✏️ Sửa Lịch tập
```
Modal Form (tương tự Thêm):
- Tất cả các trường có thể chỉnh sửa
- Nút: "Cập nhật" | "Hủy"
```

### 🗑️ Xóa Lịch tập
- Xác nhận xóa
- Xóa khỏi danh sách

---

## 5. FORM BÁO CÁO THỐNG KÊ (Reports)

### 📊 Thống kê chung
- **Tổng Hội viên**: Số lượng tất cả hội viên
- **Huấn luyện viên**: Số lượng tất cả HLV
- **Nhân viên**: Số lượng tất cả nhân viên
- **Doanh thu ước tính**: Dựa trên:
  - Basic: 300.000đ x số người
  - Premium: 600.000đ x số người
  - Elite: 1.000.000đ x số người

### 📈 Biểu đồ Phân bổ Gói tập
- **Basic**: % hội viên dùng gói Basic
- **Premium**: % hội viên dùng gói Premium
- **Elite**: % hội viên dùng gói Elite
- Hiển thị: Số lượng + Phần trăm

### 📋 Danh sách
- **Hội viên gần đây**: 10 hội viên mới nhất
  - Hiển thị: Tên, Email, Gói tập
- **Huấn luyện viên**: Danh sách tất cả HLV
  - Hiển thị: Tên, Chuyên môn, Số điện thoại

### 📥 Xuất báo cáo
- Nút "📥 Xuất báo cáo"
- Tải file CSV chứa:
  - Thời gian xuất
  - Tất cả thống kê
  - Phân bổ gói tập
- File tên: `gym_report_[timestamp].csv`

---

## 6. FORM GÓI TẬP (Member Packages)

### 📦 Gói hiện tại
- Hiển thị: Gói đang sử dụng (có dấu ✓)

### 💳 Ba gói tập
```
┌─────────────────────────────────────┐
│ BASIC (300.000đ/tháng)              │
├─────────────────────────────────────┤
│ ✓ Mua gói tập                       │
│ ✓ Xem lịch tập                      │
│ ✗ Chọn huấn luyện viên              │
├─────────────────────────────────────┤
│ Nút: "Chọn gói này" / "✓ Gói hiện tại"
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ PREMIUM (600.000đ/tháng)  [Phổ biến]│
├─────────────────────────────────────┤
│ ✓ Mua gói tập                       │
│ ✓ Xem lịch tập                      │
│ ✓ Chọn huấn luyện viên              │
├─────────────────────────────────────┤
│ Nút: "Nâng cấp lên" / "✓ Gói hiện tại"
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ELITE (1.000.000đ/tháng)    [VIP]   │
├─────────────────────────────────────┤
│ ✓ Mua gói tập                       │
│ ✓ Xem lịch tập                      │
│ ✓ Chọn huấn luyện viên              │
│ ✓ Hỗ trợ 24/7                       │
├─────────────────────────────────────┤
│ Nút: "Nâng cấp lên" / "✓ Gói hiện tại"
└─────────────────────────────────────┘
```

### 📜 Lịch sử gói tập
- Hiển thị: Gói hiện tại + ngày kích hoạt
- Trạng thái: "Đang hoạt động" (xanh)

---

## 7. FORM CHỌN HUẤN LUYỆN VIÊN (Select Trainer)

### ⚠️ Kiểm tra gói tập
- **Chỉ Premium/Elite**: Cho phép chọn HLV
- **Basic**: Hiển thị thông báo cần nâng cấp + link tới gói tập

### 💼 Danh sách Huấn luyện viên
```
Mỗi card HLV hiển thị:
├─ Tên HLV
├─ Chuyên môn
├─ Email
├─ Số điện thoại
├─ Mô tả (Bio)
└─ Nút: "Chọn" / "✓ Đã chọn"
```

### ✅ HLV hiện tại
- Hiển thị nếu đã chọn
- Thông tin chi tiết
- Nút: "Hủy chọn huấn luyện viên"

---

## 8. FORM ĐĂNG NHẬP (Login)

```
Email *                       (bắt buộc)
Mật khẩu *                    (bắt buộc)

Nút: "Đăng Nhập"
Link: "Quên mật khẩu?" | "Đăng kí ngay"

Thông báo:
- Lỗi: "Email hoặc mật khẩu không chính xác"
- Thành công: "Chào mừng [Tên người dùng]"
- Chuyển hướng: /dashboard (sau 1.5 giây)
```

---

## 9. FORM ĐĂNG KÝ (Register)

```
Họ tên *                      (bắt buộc)
Email *                       (bắt buộc, kiểm tra trùng lặp)
Số điện thoại *               (bắt buộc)
Mật khẩu *                    (bắt buộc, tối thiểu 6 ký tự)
Xác nhận mật khẩu *           (bắt buộc, phải trùng)

Nút: "Đăng Kí"
Link: "Đã có tài khoản? Đăng nhập ngay"

Validation:
- Kiểm tra email trùng lặp
- Kiểm tra độ dài mật khẩu
- Kiểm tra mật khẩu trùng nhau
- Định dạng email hợp lệ

Thông báo:
- Lỗi: Hiển thị chi tiết lỗi
- Thành công: "Đăng kí thành công! Hãy đăng nhập"
- Chuyển hướng: /dang-nhap (sau 1.5 giây)
```

---

## 10. DASHBOARD CHÍNH

### 🔝 Navigation Bar
- Logo/Tên app
- Tên người dùng + Badge vai trò
- Nút "Đăng xuất"

### 📁 Sidebar Menu (thay đổi theo role)

**Admin:**
```
QUẢN LÝ
├── 📋 Quản lý Hội viên
├── 💪 Quản lý Huấn luyện viên
├── 👥 Quản lý Nhân viên
└── 📊 Báo cáo thống kê
```

**Staff:**
```
CÔNG VIỆC
├── 📋 Quản lý Hội viên
└── 📊 Báo cáo thống kê
```

**Trainer:**
```
CÔNG VIỆC
├── 📅 Lịch tập
└── 👤 Thông tin Hội viên
```

**Member:**
```
THÔNG TIN
├── 📦 Gói tập của tôi
├── 📅 Lịch tập
└── 💪 Chọn Huấn luyện viên (nếu gói cao cấp)
```

---

## 💡 Mẹo sử dụng

### Tìm kiếm hiệu quả
- Nhập từng phần của tên/email
- Tìm kiếm không phân biệt hoa/thường
- Hỗ trợ tìm kiếm số điện thoại

### Nâng cấp gói tập
- Hội viên có thể nâng cấp từ Basic → Premium → Elite
- Không thể hạ cấp gói tập

### Quản lý quyền truy cập
- Admin có tất cả quyền
- Staff xem được người dùng nhưng không được xóa HLV
- Trainer chỉ quản lý lịch tập
- Member chỉ quản lý dữ liệu cá nhân

---

## 🐛 Xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Cách khắc phục |
|-----|-------------|----------------|
| Email đã tồn tại | Email trùng lặp | Dùng email khác |
| Mật khẩu không hợp lệ | < 6 ký tự | Nhập ≥ 6 ký tự |
| Không có quyền truy cập | Role không hợp lệ | Đăng nhập với role phù hợp |
| Dữ liệu mất | Xóa localStorage | Dùng browser khác hoặc clear cache |
