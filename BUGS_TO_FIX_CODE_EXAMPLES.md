# 🔧 DANH SÁCH CÁC LỖI & GIẢI PHÁP FIX NGAY

---

## 🔴 CRITICAL BUGS (Phải Fix Ngay)

### Bug #1: Plain Text Password Storage

**File:** `src/stores/authStore.js`  
**Severity:** 🔴 CRITICAL  
**Risk:** Anyone with access to localStorage can see all passwords

```javascript
// ❌ HIỆN TẠI (NGUY HIỂM)
const users = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@gym.com',
    password: '123456',  // ❌ Plain text - BẤT KỲ AI CŨNG CÓ THỂ THẤY
    role: 'admin'
  },
  {
    id: 'member1',
    name: 'Member 1',
    email: 'member@gym.com',
    password: '654321',  // ❌ Plain text
    role: 'member'
  }
]

// ✅ GIẢI PHÁP 1: Hash Password (Frontend + Backend)
// Cài đặt: npm install bcryptjs

// Khi user đăng ký:
import bcryptjs from 'bcryptjs'

async function registerUser(email, password) {
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password, salt)
  
  const newUser = {
    id: generateId(),
    email: email,
    password: hashedPassword,  // ✅ Hashed
    role: 'member'
  }
  
  users.push(newUser)
  return newUser
}

// Khi user đăng nhập:
async function loginUser(email, password) {
  const user = users.find(u => u.email === email)
  
  if (!user) {
    throw new Error('Email không tồn tại')
  }
  
  const isPasswordValid = await bcryptjs.compare(password, user.password)
  
  if (!isPasswordValid) {
    throw new Error('Mật khẩu sai')
  }
  
  return user
}

// ✅ GIẢI PHÁP 2: Sử dụng Backend (TỐT HƠN)
// Chuyển password hashing sang server
// Frontend gửi: POST /api/login { email, password }
// Server: Hash + Compare + Return JWT token
```

---

### Bug #2: Duplicate Email Validation

**File:** `src/components/ManageMembers.vue` (và các component khác)  
**Severity:** 🟡 HIGH  
**Risk:** Có thể tạo 2 hội viên với cùng email

```javascript
// ❌ HIỆN TẠI
saveMember() {
  if (!this.formData.name || !this.formData.email) {
    alert('Vui lòng điền tất cả thông tin')
    return
  }
  
  // ❌ Không kiểm tra duplicate email
  this.authStore.addMember(this.formData)
  this.resetForm()
}

// ✅ GIẢI PHÁP
saveMember() {
  if (!this.formData.name || !this.formData.email) {
    this.errorMessage = 'Vui lòng điền tất cả thông tin'
    return
  }
  
  // ✅ Kiểm tra duplicate email
  const emailExists = this.authStore.members.some(m => 
    m.email === this.formData.email && 
    m.id !== this.editingMember?.id  // Nếu edit, không tính member hiện tại
  )
  
  if (emailExists) {
    this.errorMessage = 'Email này đã tồn tại trong hệ thống'
    return
  }
  
  // ✅ Kiểm tra email format
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  if (!emailRegex.test(this.formData.email)) {
    this.errorMessage = 'Email không hợp lệ'
    return
  }
  
  // ✅ Kiểm tra phone format (nếu có)
  if (this.formData.phone && !/^\\d{10,11}$/.test(this.formData.phone)) {
    this.errorMessage = 'Số điện thoại không hợp lệ (10-11 chữ số)'
    return
  }
  
  this.authStore.addMember(this.formData)
  this.errorMessage = ''
  this.resetForm()
}
```

---

### Bug #3: Schedule Capacity Not Validated

**File:** `src/stores/authStore.js`  
**Severity:** 🟡 HIGH  
**Risk:** Quá nhiều member đăng ký 1 lớp (vượt capacity)

```javascript
// ❌ HIỆN TẠI
// Schedule object không track registrations
{
  id: 'schedule1',
  name: 'Yoga Class',
  type: 'yoga',
  day: 'Monday',
  time: '06:00',
  duration: 60,
  trainer: 'trainer1',
  capacity: 20,
  // ❌ Không có field registrations
}

// ✅ GIẢI PHÁP
// Thêm tracking cho registrations
{
  id: 'schedule1',
  name: 'Yoga Class',
  type: 'yoga',
  day: 'Monday',
  time: '06:00',
  duration: 60,
  trainer: 'trainer1',
  capacity: 20,
  registrations: ['member1', 'member2', ...],  // ✅ Thêm field này
  createdAt: '2026-02-13',
  updatedAt: '2026-02-13'
}

// Trong authStore.js:
registerMemberForClass(memberId, scheduleId) {
  const schedule = this.schedules.find(s => s.id === scheduleId)
  
  if (!schedule) {
    throw new Error('Lớp không tồn tại')
  }
  
  // ✅ Kiểm tra xem member đã đăng ký chưa
  if (schedule.registrations.includes(memberId)) {
    throw new Error('Bạn đã đăng ký lớp này rồi')
  }
  
  // ✅ Kiểm tra xem lớp còn chỗ không
  if (schedule.registrations.length >= schedule.capacity) {
    // Option: Add to waitlist
    console.warn('Lớp đầy, thêm vào danh sách chờ')
    return false
  }
  
  // ✅ Đăng ký
  schedule.registrations.push(memberId)
  schedule.updatedAt = new Date()
  return true
}

// Hủy đăng ký:
unregisterMemberFromClass(memberId, scheduleId) {
  const schedule = this.schedules.find(s => s.id === scheduleId)
  const index = schedule.registrations.indexOf(memberId)
  
  if (index > -1) {
    schedule.registrations.splice(index, 1)
    schedule.updatedAt = new Date()
  }
}
```

---

### Bug #4: Email Service Not Configured

**File:** `src/services/emailService.js`  
**Severity:** 🟡 HIGH  
**Risk:** Không thể gửi email (credentials placeholder)

```javascript
// ❌ HIỆN TẠI
import emailjs from '@emailjs/browser'

emailjs.init('YOUR_PUBLIC_KEY')  // ❌ Placeholder

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'

// ✅ GIẢI PHÁP 1: Dùng Environment Variables

// Tạo file .env.local trong project root:
/*
VITE_EMAILJS_PUBLIC_KEY=pk_xxx_xxx
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_xxx
VITE_EMAILJS_WELCOME_TEMPLATE_ID=template_xxx
*/

// Cập nhật emailService.js:
import emailjs from '@emailjs/browser'

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
const EMAILJS_WELCOME_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID

export async function sendContactEmail(name, email, message) {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CONTACT_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'contact@gym.com'
      }
    )
    
    console.log('Email sent:', response)
    return true
  } catch (error) {
    console.error('Email send failed:', error)
    return false
  }
}

// ✅ GIẢI PHÁP 2: Dùng Backend (TỐT HƠN)

// Backend (Node.js + Express):
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

app.post('/api/email/send', async (req, res) => {
  const { to, subject, html } = req.body
  
  try {
    await transporter.sendMail({
      from: 'noreply@gym.com',
      to: to,
      subject: subject,
      html: html
    })
    
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Frontend chỉ cần POST:
const response = await fetch('/api/email/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'user@example.com',
    subject: 'Welcome!',
    html: '<h1>Welcome to our gym!</h1>'
  })
})
```

---

### Bug #5: No Input Sanitization (XSS Vulnerability)

**File:** All form components  
**Severity:** 🔴 CRITICAL  
**Risk:** User có thể inject malicious JavaScript code

```javascript
// ❌ HIỆN TẠI
// Người dùng có thể nhập: <img src=x onerror=alert('XSS')>
// Và code này sẽ thực thi trên trình duyệt

// ManageMembers.vue
<input v-model="formData.name" />
<p>{{ member.name }}</p>  // ❌ Nếu name có <script>, nó sẽ thực thi

// ✅ GIẢI PHÁP 1: Escape HTML (Vue 3 mặc định làm)
<p>{{ member.name }}</p>  // ✅ Vue 3 tự động escape

// ❌ NHƯ THẾ KHÔNG ĐƯỢC:
<p v-html="member.name"></p>  // ❌ Không bao giờ dùng v-html với user input

// ✅ GIẢI PHÁP 2: Input Validation

import DOMPurify from 'dompurify'

export function sanitizeInput(input) {
  // Loại bỏ HTML tags
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],  // Không cho phép tag nào
    ALLOWED_ATTR: [] 
  })
}

// Trong component:
import { sanitizeInput } from '@/utils/sanitize'

saveMember() {
  // Sanitize tất cả user input
  const cleanData = {
    name: sanitizeInput(this.formData.name),
    email: sanitizeInput(this.formData.email),
    phone: sanitizeInput(this.formData.phone)
  }
  
  this.authStore.addMember(cleanData)
}

// Cài đặt: npm install dompurify
```

---

### Bug #6: No Rate Limiting (Brute Force Attack)

**File:** Login form  
**Severity:** 🟡 HIGH  
**Risk:** Attacker có thể thử nhiều password liên tục

```javascript
// ❌ HIỆN TẠI
// Người dùng có thể thử unlimited password attempts

// ✅ GIẢI PHÁP 1: Frontend Rate Limiting
data() {
  return {
    loginAttempts: 0,
    lastAttemptTime: null,
    maxAttempts: 5,
    lockoutDuration: 15 * 60 * 1000  // 15 phút
  }
}

async handleLogin() {
  // Kiểm tra rate limit
  if (this.isLockedOut()) {
    this.errorMessage = 'Quá nhiều lần đăng nhập sai. Vui lòng thử lại sau 15 phút.'
    return
  }
  
  try {
    await this.authStore.login(this.email, this.password)
    this.loginAttempts = 0  // Reset counter khi thành công
  } catch (error) {
    this.loginAttempts++
    this.lastAttemptTime = Date.now()
    
    if (this.loginAttempts >= this.maxAttempts) {
      // Lock account
      localStorage.setItem('loginLocked', JSON.stringify({
        lockedTime: Date.now(),
        duration: this.lockoutDuration
      }))
    }
  }
}

isLockedOut() {
  const lockInfo = JSON.parse(localStorage.getItem('loginLocked'))
  if (!lockInfo) return false
  
  const elapsedTime = Date.now() - lockInfo.lockedTime
  if (elapsedTime > lockInfo.duration) {
    localStorage.removeItem('loginLocked')
    return false
  }
  
  return true
}

// ✅ GIẢI PHÁP 2: Backend Rate Limiting (TỐT HƠN)
// Sử dụng express-rate-limit package:

const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 phút
  max: 5,  // 5 attempts
  message: 'Quá nhiều lần đăng nhập sai, vui lòng thử lại sau 15 phút'
})

app.post('/api/login', loginLimiter, async (req, res) => {
  // Login logic
})
```

---

### Bug #7: Hard-coded Test Credentials

**File:** `src/stores/authStore.js`  
**Severity:** 🟡 HIGH  
**Risk:** Tất cả test accounts đều public biết

```javascript
// ❌ HIỆN TẠI
// Test accounts đều là default credentials
const users = [
  { email: 'admin@gym.com', password: '123456', role: 'admin' },
  { email: 'member@gym.com', password: '123456', role: 'member' },
  { email: 'trainer@gym.com', password: '123456', role: 'trainer' },
  { email: 'staff@gym.com', password: '123456', role: 'staff' }
]

// ✅ GIẢI PHÁP

// Tạo file src/config/testAccounts.js
export const TEST_ACCOUNTS = {
  ADMIN: {
    email: 'admin@gym.com',
    password: 'Admin@123456',  // Mật khẩu mạnh
    role: 'admin'
  },
  MEMBER: {
    email: 'member@gym.com',
    password: 'Member@123456',
    role: 'member'
  },
  TRAINER: {
    email: 'trainer@gym.com',
    password: 'Trainer@123456',
    role: 'trainer'
  },
  STAFF: {
    email: 'staff@gym.com',
    password: 'Staff@123456',
    role: 'staff'
  }
}

// Hoặc tốt hơn: Dùng environment variables
// .env.local
VITE_TEST_ADMIN_EMAIL=admin@gym.com
VITE_TEST_ADMIN_PASSWORD=Admin@123456
VITE_TEST_MEMBER_EMAIL=member@gym.com
VITE_TEST_MEMBER_PASSWORD=Member@123456

// config/testAccounts.js
export const TEST_ACCOUNTS = {
  ADMIN: {
    email: import.meta.env.VITE_TEST_ADMIN_EMAIL,
    password: import.meta.env.VITE_TEST_ADMIN_PASSWORD,
    role: 'admin'
  },
  // ...
}
```

---

### Bug #8: Không Validate Form Dữ Liệu

**File:** Tất cả form components  
**Severity:** 🟡 HIGH  
**Risk:** Dữ liệu không hợp lệ được lưu vào system

```javascript
// ❌ HIỆN TẠI
// Chỉ kiểm tra required, không validate format

// ✅ GIẢI PHÁP - Tạo validation utility

// src/utils/validation.js
export const validators = {
  email: (value) => {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
    return regex.test(value)
  },
  
  phone: (value) => {
    const regex = /^\\d{10,11}$/
    return regex.test(value)
  },
  
  password: (value) => {
    // Ít nhất 8 ký tự, 1 uppercase, 1 lowercase, 1 số
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/
    return regex.test(value)
  },
  
  username: (value) => {
    // Chỉ chứa letters, numbers, underscore
    const regex = /^[a-zA-Z0-9_]{3,20}$/
    return regex.test(value)
  },
  
  url: (value) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }
}

// Trong component:
import { validators } from '@/utils/validation'

data() {
  return {
    formData: { email: '', phone: '' },
    errors: {}
  }
}

validateForm() {
  this.errors = {}
  
  if (!validators.email(this.formData.email)) {
    this.errors.email = 'Email không hợp lệ'
  }
  
  if (!validators.phone(this.formData.phone)) {
    this.errors.phone = 'Số điện thoại không hợp lệ (10-11 chữ số)'
  }
  
  return Object.keys(this.errors).length === 0
}

async saveMember() {
  if (!this.validateForm()) {
    return
  }
  
  // Save member
}
```

---

## 🟡 HIGH PRIORITY BUGS

### Bug #9: Member Upgrade Package Logic Error

```javascript
// ❌ HIỆN TẠI - Không kiểm tra package hiện tại
upgradeMembership(memberId, newPackage) {
  const member = this.members.find(m => m.id === memberId)
  member.package = newPackage
}

// ✅ GIẢI PHÁP
upgradeMembership(memberId, newPackage) {
  const member = this.members.find(m => m.id === memberId)
  const currentLevel = { 'Basic': 1, 'Premium': 2, 'Elite': 3 }
  
  // Không cho downgrade
  if (currentLevel[newPackage] <= currentLevel[member.package]) {
    throw new Error('Chỉ có thể nâng cấp gói, không thể hạ cấp')
  }
  
  member.package = newPackage
  member.upgradeDate = new Date()
}
```

---

### Bug #10: No Trainer Assignment Validation

```javascript
// ❌ HIỆN TẠI
assignTrainer(memberId, trainerId) {
  const member = this.members.find(m => m.id === memberId)
  member.trainer = trainerId
}

// ✅ GIẢI PHÁP
assignTrainer(memberId, trainerId) {
  const member = this.members.find(m => m.id === memberId)
  
  // Chỉ Premium/Elite members mới có trainer
  if (!['Premium', 'Elite'].includes(member.package)) {
    throw new Error('Chỉ members Premium/Elite mới có thể chọn trainer')
  }
  
  const trainer = this.trainers.find(t => t.id === trainerId)
  if (!trainer) {
    throw new Error('Trainer không tồn tại')
  }
  
  member.trainer = trainerId
}
```

---

## 📊 TỔNG HỢP CÁC BUG

| Bug # | Vấn đề | Severity | Fix Time | Priority |
|-------|--------|----------|----------|----------|
| 1 | Plain text password | 🔴 CRITICAL | 2-3 hrs | P0 |
| 2 | Duplicate email | 🟡 HIGH | 1-2 hrs | P1 |
| 3 | Schedule capacity | 🟡 HIGH | 2-3 hrs | P1 |
| 4 | Email not configured | 🟡 HIGH | 1-2 hrs | P1 |
| 5 | XSS vulnerability | 🔴 CRITICAL | 3-4 hrs | P0 |
| 6 | No rate limiting | 🟡 HIGH | 2-3 hrs | P1 |
| 7 | Hard-coded credentials | 🟡 HIGH | 1 hr | P1 |
| 8 | No validation | 🟡 HIGH | 3-4 hrs | P1 |
| 9 | Package upgrade logic | 🟡 HIGH | 1-2 hrs | P2 |
| 10 | Trainer assignment | 🟡 HIGH | 1 hr | P2 |

**Total Fix Time: 20-25 hours**

