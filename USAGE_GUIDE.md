# Hệ thống Quản lý Gym với Phân quyền

## Mô tả
Đây là một ứng dụng web quản lý gym hiện đại với hệ thống phân quyền chi tiết cho 4 loại người dùng: Admin, Nhân viên, Huấn luyện viên và Hội viên.

## Các tính năng chính

### 1. Xác thực & Phân quyền
- **4 vai trò người dùng**: Admin, Staff, Trainer, Member
- **Đăng nhập/Đăng xuất**: Bảo mật với lưu trữ localStorage
- **Role-based access control**: Kiểm soát quyền truy cập dựa trên vai trò

### 2. Quản lý Hội viên (Admin & Staff)
- **Thêm hội viên mới**: Form đầy đủ với validation
- **Sửa thông tin hội viên**: Cập nhật tên, email, số điện thoại, gói tập
- **Xóa hội viên**: Xóa khỏi hệ thống
- **Tìm kiếm hội viên**: Tìm kiếm theo tên, email, số điện thoại
- **3 gói tập**:
  - Basic: Mua gói tập, xem lịch tập (300.000đ/tháng)
  - Premium: Thêm chọn huấn luyện viên (600.000đ/tháng)
  - Elite: Gói cao cấp nhất với hỗ trợ 24/7 (1.000.000đ/tháng)

### 3. Quản lý Huấn luyện viên (Admin)
- **Thêm huấn luyện viên mới**: Nhập thông tin và chuyên môn
- **Sửa thông tin huấn luyện viên**: Cập nhật hồ sơ
- **Xóa huấn luyện viên**: Xóa khỏi hệ thống
- **Tìm kiếm huấn luyện viên**: Tìm theo tên, email, chuyên môn
- **7 chuyên môn**: Fitness, Yoga, Boxing, Swimming, Aerobics, Weight Training, Functional Training

### 4. Quản lý Nhân viên (Admin)
- **Thêm nhân viên mới**: Tạo tài khoản cho nhân viên
- **Sửa thông tin nhân viên**: Cập nhật hồ sơ
- **Xóa nhân viên**: Xóa khỏi hệ thống
- **Tìm kiếm nhân viên**: Tìm theo tên, email, số điện thoại

### 5. Quản lý Lịch tập (Trainer & Member)
- **Thêm lịch tập mới**: Admin & Trainer có thể tạo lịch
- **Sửa lịch tập**: Cập nhật chi tiết lớp học
- **Xóa lịch tập**: Xóa khỏi lịch
- **Lọc lịch tập**: Theo loại tập và ngày trong tuần
- **Chi tiết lớp**: Tên, loại tập, ngày, giờ, huấn luyện viên, sức chứa

### 6. Báo cáo Thống kê (Admin & Staff)
- **Thống kê chung**:
  - Tổng số hội viên
  - Tổng số huấn luyện viên
  - Tổng số nhân viên
  - Doanh thu ước tính
- **Phân bổ gói tập**: Biểu đồ phần trăm từng gói
- **Tỉ lệ chuyển đổi**: Tỉ lệ hội viên nâng cấp lên Premium/Elite
- **Danh sách hội viên & huấn luyện viên**
- **Xuất báo cáo CSV**: Tải báo cáo dưới dạng file CSV

### 7. Gói tập cho Hội viên
- **Xem gói hiện tại**: Hiển thị gói đang sử dụng
- **Nâng cấp gói tập**: Nâng từ Basic → Premium → Elite
- **Lịch sử gói tập**: Theo dõi các gói đã sử dụng

### 8. Chọn Huấn luyện viên (Member)
- **Chỉ dành cho gói Premium/Elite**: Hạn chế chức năng dựa trên gói
- **Xem danh sách huấn luyện viên**: Với thông tin chi tiết
- **Chọn HLV**: Gán huấn luyện viên cá nhân
- **Hủy chọn**: Thay đổi lựa chọn bất kỳ lúc nào

## Cấu trúc Dự án

```
src/
├── stores/
│   └── authStore.js              # Lưu trữ trạng thái, logic quản lý người dùng
├── components/
│   ├── Dashboard.vue             # Dashboard chính với sidebar
│   ├── Login.vue                 # Trang đăng nhập (đã cập nhật)
│   ├── Register.vue              # Trang đăng ký (đã cập nhật)
│   ├── ManageMembers.vue         # Quản lý hội viên
│   ├── ManageTrainers.vue        # Quản lý huấn luyện viên
│   ├── ManageStaff.vue           # Quản lý nhân viên
│   ├── ManageSchedule.vue        # Quản lý lịch tập
│   ├── ManageReports.vue         # Báo cáo thống kê
│   ├── MemberPackages.vue        # Gói tập cho hội viên
│   └── SelectTrainer.vue         # Chọn huấn luyện viên
└── router.js                     # Router với authentication guard
```

## Dữ liệu Test

### Tài khoản mặc định:

**Admin (Quản trị viên)**
- Email: admin@gym.com
- Password: 123456

**Staff (Nhân viên)**
- Email: staff@gym.com
- Password: 123456

**Trainer (Huấn luyện viên)**
- Email: trainer@gym.com
- Password: 123456

**Member (Hội viên)**
- Email: member@gym.com
- Password: 123456

### Dữ liệu lưu trữ:
- Tất cả dữ liệu được lưu trong `localStorage` (dùng cho testing)
- Dữ liệu tự động load khi ứng dụng khởi động
- Dữ liệu sẽ bị mất nếu xóa localStorage (tính năng này dành cho development)

## Hướng dẫn sử dụng

### 1. Đăng nhập
```
- Nhấp vào "Đăng nhập" trên trang chủ hoặc đi tới /dang-nhap
- Nhập email và password
- Được chuyển hướng tới /dashboard
```

### 2. Admin - Quản lý Hội viên
```
- Dashboard → Quản lý Hội viên
- Thêm: Nhấp "+ Thêm Hội viên mới"
- Sửa: Nhấp "✏️ Sửa" trên hàng cần chỉnh sửa
- Xóa: Nhấp "🗑️ Xóa" (cần xác nhận)
- Tìm kiếm: Nhập từ khóa và nhấp "🔍 Tìm kiếm"
```

### 3. Admin - Quản lý Huấn luyện viên
```
- Dashboard → Quản lý Huấn luyện viên
- Tương tự như quản lý hội viên
- Cần chọn chuyên môn khi thêm
```

### 4. Admin - Quản lý Nhân viên
```
- Dashboard → Quản lý Nhân viên
- Tương tự như quản lý hội viên
- Có thêm trường "Chức vụ"
```

### 5. Xem Báo cáo
```
- Dashboard → Báo cáo thống kê
- Xem thống kê chung (số lượng người dùng, doanh thu)
- Xem biểu đồ phân bổ gói tập
- Xuất báo cáo CSV: Nhấp "📥 Xuất báo cáo"
```

### 6. Hội viên - Nâng cấp gói tập
```
- Dashboard → Gói tập của tôi
- Xem gói hiện tại (có dấu ✓)
- Chọn gói khác để nâng cấp
```

### 7. Hội viên - Chọn Huấn luyện viên
```
- Dashboard → Chọn Huấn luyện viên (chỉ nếu gói Premium/Elite)
- Nhấp "Chọn huấn luyện viên này" 
- Xem chi tiết HLV được chọn
- Có thể thay đổi bất kỳ lúc nào
```

## Công nghệ sử dụng
- **Vue 3**: Framework frontend
- **Vue Router 4**: Routing và navigation
- **Tailwind CSS**: Styling
- **LocalStorage**: Lưu trữ dữ liệu (client-side)

## Quyền truy cập theo vai trò

| Tính năng | Admin | Staff | Trainer | Member |
|-----------|-------|-------|---------|--------|
| Quản lý Hội viên | ✓ | ✓ | ✗ | ✗ |
| Quản lý Huấn luyện viên | ✓ | ✗ | ✗ | ✗ |
| Quản lý Nhân viên | ✓ | ✗ | ✗ | ✗ |
| Quản lý Lịch tập | ✓ | ✗ | ✓ | Xem |
| Xem Báo cáo | ✓ | ✓ | ✗ | ✗ |
| Xem Gói tập | ✓ | ✗ | ✗ | ✓ |
| Chọn Huấn luyện viên | ✓ | ✗ | ✗ | ✓ (nếu gói cao) |

## Các tính năng bảo mật
- ✓ Role-based access control (RBAC)
- ✓ Route guards: Kiểm tra xác thực trước khi truy cập
- ✓ Kiểm tra quyền truy cập cho mỗi chức năng
- ✓ Đăng xuất an toàn

## Hướng phát triển trong tương lai
- [ ] Backend API integration (Node.js, Express, MongoDB)
- [ ] Xác thực JWT tokens
- [ ] Thanh toán online (Stripe, VNPay)
- [ ] Email notifications
- [ ] File upload (ảnh đại diện)
- [ ] Video tutorials for trainers
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard nâng cao

## Hỗ trợ
Nếu bạn có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ qua email hoặc tạo issue trong repository.
