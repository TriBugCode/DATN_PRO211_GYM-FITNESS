# DATN_PRO211 - Trang Landing Page Phòng Gym

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-green.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-blue.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue.svg)](https://tailwindcss.com/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-4.x-green.svg)](https://router.vuejs.org/)

Trang landing page hiện đại cho phòng gym được xây dựng bằng Vue 3, JavaScript và Tailwind CSS. Dự án này là phần của đồ án tốt nghiệp PRO211, cung cấp giao diện thân thiện, responsive và dễ sử dụng cho người dùng muốn tìm hiểu về các dịch vụ gym.

## ✨ Tính Năng Chính

- 🏋️‍♂️ **Thiết kế chuyên nghiệp**: Giao diện hiện đại, tập trung vào trải nghiệm người dùng
- 📱 **Responsive Design**: Hoạt động hoàn hảo trên mọi thiết bị (mobile, tablet, desktop)
- 🧭 **Vue Router**: Điều hướng mượt mà giữa các trang
- 🎨 **Tailwind CSS**: Styling nhanh chóng và nhất quán
- ⚡ **Vite**: Build tool siêu nhanh cho development và production
- 🌐 **Đa ngôn ngữ**: Nội dung hoàn toàn bằng tiếng Việt
- 📧 **Form liên hệ**: Tương tác với khách hàng tiềm năng
- 💰 **Bảng giá linh hoạt**: Hiển thị các gói dịch vụ rõ ràng

## 🚀 Cài Đặt và Chạy Dự Án

### Yêu Cầu Hệ Thống

- **Node.js**: Phiên bản 16.x trở lên
- **npm**: Phiên bản 7.x trở lên (hoặc yarn/pnpm)

### Các Bước Cài Đặt

1. **Clone repository:**
```bash
git clone <repository-url>
cd DATN_PRO211
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Chạy development server:**
```bash
npm run dev
```

Mở trình duyệt và truy cập `http://localhost:5173` để xem ứng dụng.

4. **Build cho production:**
```bash
npm run build
```

5. **Preview production build:**
```bash
npm run preview
```

## 📁 Cấu Trúc Thư Mục

```
DATN_PRO211/
├── public/                    # Static assets
├── src/
│   ├── assets/
│   │   └── animations.css    # Custom animations
│   ├── components/
│   │   ├── Header.vue        # Header với navigation và mobile menu
│   │   ├── Hero.vue          # Hero section với call-to-action
│   │   ├── Features.vue      # Danh sách tính năng nổi bật
│   │   ├── Services.vue      # Các dịch vụ cung cấp
│   │   ├── Classes.vue       # Thông tin về các lớp học
│   │   ├── Trainers.vue      # Giới thiệu đội ngũ HLV
│   │   ├── Pricing.vue       # Bảng giá các gói dịch vụ
│   │   ├── JoinNow.vue       # Trang đăng ký tham gia
│   │   ├── Contact.vue       # Form liên hệ
│   │   ├── Footer.vue        # Footer với thông tin liên hệ
│   │   └── Home.vue          # Trang chủ tổng hợp
│   ├── App.vue               # Component gốc của ứng dụng
│   ├── main.js               # Entry point, khởi tạo Vue app
│   ├── router.js             # Cấu hình Vue Router
│   └── style.css             # Global styles với Tailwind CSS
├── index.html                # HTML template chính
├── package.json              # Dependencies và scripts
├── vite.config.js           # Cấu hình Vite
├── tailwind.config.js       # Cấu hình Tailwind CSS
├── postcss.config.js        # Cấu hình PostCSS
└── README.md                # Tài liệu dự án (file này)
```

## 🛣️ Vue Router Configuration

Dự án sử dụng Vue Router 4 để quản lý điều hướng giữa các trang:

- `/` - Trang chủ (Home)
- `/lop-hoc` - Lớp học (Classes)
- `/hlv` - Huấn luyện viên (Trainers)
- `/bang-gia` - Bảng giá (Pricing)
- `/tham-gia-ngay` - Tham gia ngay (Join Now)
- `/lien-he` - Liên hệ (Contact)

Router được cấu hình trong `src/router.js` với chế độ history để có URL đẹp.

## 🛠️ Công Nghệ Sử Dụng

- **Vue 3** - Framework JavaScript với Composition API
- **Vue Router 4** - Official router cho Vue.js
- **Vite 5** - Next generation frontend tooling
- **Tailwind CSS 3** - Utility-first CSS framework
- **JavaScript ES6+** - Ngôn ngữ lập trình hiện đại
- **PostCSS** - Tool để transform CSS
- **Autoprefixer** - Thêm vendor prefixes tự động

## 🎨 Tùy Chỉnh

### Thay Đổi Màu Sắc Chính

Tìm và thay thế các class Tailwind trong các file `.vue`:
- `indigo-600` → màu chính (màu xanh navy hiện đại)
- `indigo-700` → màu hover
- `gray-700` → màu text phụ

### Thay Đổi Hình Ảnh

Cập nhật URL hình ảnh trong:
- `Hero.vue` - Background hero section
- `Services.vue` - Hình ảnh các dịch vụ
- `Trainers.vue` - Ảnh huấn luyện viên

### Thay Đổi Nội Dung

Chỉnh sửa data trong các component Vue tương ứng để cập nhật:
- Tên phòng gym
- Thông tin liên hệ
- Giá cả
- Mô tả dịch vụ

## 🚀 Triển Khai

1. **Build production:**
```bash
npm run build
```

2. **Upload thư mục `dist/` lên hosting:**
   - Netlify
   - Vercel
   - GitHub Pages
   - Firebase Hosting
   - Hoặc bất kỳ static hosting nào

## 🐛 Troubleshooting

### Lỗi thường gặp:

- **Port 5173 đã được sử dụng:**
  ```bash
  npm run dev -- --port 3000
  ```

- **Dependencies không cài đặt được:**
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- **Router không hoạt động:**
  Đảm bảo server hỗ trợ SPA routing (thêm fallback rule cho hosting)



## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

---

**Đồ án tốt nghiệp PRO211** - Phát triển bởi [Tên của bạn]
