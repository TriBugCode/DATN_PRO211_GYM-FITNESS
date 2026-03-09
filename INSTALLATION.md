# Hướng dẫn cài đặt và chạy ứng dụng

## Yêu cầu hệ thống
- Node.js 14+ 
- npm hoặc yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Cài đặt

### Bước 1: Clone hoặc tải về dự án
```bash
cd d:\DATN_PRO211\DATN_PRO211
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy ứng dụng
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:5173/**

## Các lệnh có sẵn

```bash
# Chạy ứng dụng ở chế độ phát triển
npm run dev

# Build cho production
npm run build

# Preview build sản phẩm
npm run preview
```

## Đăng nhập lần đầu

Ứng dụng đã có sẵn dữ liệu test trong `localStorage`. 

### Tài khoản test có sẵn:

1. **Admin** (Quản trị viên)
   - Email: `admin@gym.com`
   - Password: `123456`

2. **Staff** (Nhân viên)
   - Email: `staff@gym.com`
   - Password: `123456`

3. **Trainer** (Huấn luyện viên)
   - Email: `trainer@gym.com`
   - Password: `123456`

4. **Member** (Hội viên)
   - Email: `member@gym.com`
   - Password: `123456`

## Quy trình sử dụng

### 1. Lần đầu truy cập
```
1. Truy cập http://localhost:5173/
2. Nhấp "Đăng Nhập" hoặc đi tới /dang-nhap
3. Nhập email/password của một tài khoản test
4. Bạn sẽ được chuyển hướng tới /dashboard
```

### 2. Khám phá các tính năng

**Admin - Chạm vào tất cả các chức năng:**
- Quản lý Hội viên: Thêm, sửa, xóa, tìm kiếm
- Quản lý Huấn luyện viên
- Quản lý Nhân viên
- Báo cáo thống kê

**Staff - Nhân viên:**
- Quản lý Hội viên
- Xem Báo cáo

**Trainer - Huấn luyện viên:**
- Quản lý Lịch tập
- Xem Thông tin Hội viên

**Member - Hội viên:**
- Xem Gói tập của tôi
- Xem Lịch tập
- Chọn Huấn luyện viên (nếu gói Premium/Elite)

### 3. Thêm dữ liệu mới

Admin có thể:
1. Thêm hội viên mới → /dashboard/members → "+ Thêm Hội viên mới"
2. Thêm huấn luyện viên → /dashboard/trainers → "+ Thêm Huấn luyện viên mới"
3. Thêm nhân viên → /dashboard/staff → "+ Thêm Nhân viên mới"
4. Thêm lịch tập → /dashboard/schedule → "+ Thêm lịch tập mới"

### 4. Xem báo cáo

Admin/Staff:
1. Dashboard → Báo cáo thống kê
2. Xem thống kê chung
3. Xuất báo cáo CSV nếu cần

## Cấu trúc thư mục chính

```
src/
├── stores/authStore.js          # Logic quản lý người dùng
├── router.js                    # Định tuyến & guards
├── components/
│   ├── Dashboard.vue            # Dashboard chính
│   ├── Login.vue                # Đăng nhập
│   ├── Register.vue             # Đăng ký
│   ├── ManageMembers.vue        # Quản lý hội viên
│   ├── ManageTrainers.vue       # Quản lý HLV
│   ├── ManageStaff.vue          # Quản lý nhân viên
│   ├── ManageSchedule.vue       # Quản lý lịch tập
│   ├── ViewSchedule.vue         # Xem lịch tập (member)
│   ├── ManageReports.vue        # Báo cáo
│   ├── MemberPackages.vue       # Gói tập
│   ├── SelectTrainer.vue        # Chọn HLV
│   └── ...các component khác
└── App.vue
```

## Lưu trữ dữ liệu

### localStorage Keys:
- `currentUser` - Thông tin người dùng hiện tại
- `allUsers` - Tất cả người dùng (members, trainers, staff, admins)
- `schedules` - Lịch tập
- `myRegistrations` - Các lớp mà hội viên đã đăng ký

### Xóa dữ liệu (nếu cần reset)
```javascript
// Mở DevTools (F12) → Console và chạy:
localStorage.clear()

// Hoặc xóa từng key:
localStorage.removeItem('currentUser')
localStorage.removeItem('allUsers')
localStorage.removeItem('schedules')
localStorage.removeItem('myRegistrations')
```

## Khắc phục sự cố

### Vấn đề: Ứng dụng không tải
**Giải pháp:**
1. Xóa `node_modules`: `rmdir node_modules /s /q`
2. Cài lại: `npm install`
3. Chạy lại: `npm run dev`

### Vấn đề: Dữ liệu bị mất
**Giải pháp:**
- Mở DevTools (F12)
- Vào Storage → Local Storage
- Nếu `allUsers` trống, dữ liệu sẽ tự khởi tạo khi reload

### Vấn đề: Port 5173 bị chiếm
**Giải pháp:**
```bash
# Sử dụng port khác
npm run dev -- --port 3000
```

### Vấn đề: "Bạn không có quyền truy cập"
**Giải pháp:**
- Đảm bảo bạn đã đăng nhập với role phù hợp
- Admin có tất cả quyền
- Staff chỉ có quyền xem hội viên & báo cáo

## Tips sử dụng

1. **Tìm kiếm nhanh**: Nhập một phần của tên/email
2. **Thêm dữ liệu test**: Tạo nhiều hộc viên với gói tập khác nhau
3. **Đăng ký lớp**: Member có thể đăng ký tối đa `capacity` người
4. **Nâng cấp gói**: Member có thể nâng từ Basic → Premium → Elite
5. **Xuất báo cáo**: Admin có thể tải báo cáo CSV bất kỳ lúc nào

## Tài liệu chi tiết

- **[USAGE_GUIDE.md](./USAGE_GUIDE.md)** - Hướng dẫn chi tiết các tính năng
- **[FORMS_GUIDE.md](./FORMS_GUIDE.md)** - Chi tiết các form và input
- **[TEST_CREDENTIALS.txt](./TEST_CREDENTIALS.txt)** - Danh sách tài khoản test

## Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra browser console (F12 → Console)
2. Xem các file hướng dẫn trên
3. Reset dữ liệu bằng `localStorage.clear()`

## Phát triển tiếp theo

Các tính năng có thể thêm:
- [ ] Backend API (Node.js + Express)
- [ ] Database (MongoDB)
- [ ] JWT Authentication
- [ ] Email notifications
- [ ] Payment integration (Stripe)
- [ ] File uploads
- [ ] Real-time notifications
- [ ] Mobile app

---

**Phiên bản**: 1.0.0  
**Cập nhật lần cuối**: Tháng 2, 2026
