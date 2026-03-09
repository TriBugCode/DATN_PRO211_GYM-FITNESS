# 🔧 DANH SÁCH CÁC LỖI ẨNTIỀN & GIẢI PHÁP FIX

**Mục đích:** Danh sách chi tiết các bug, lỗi logic, và cách sửa

---

## 🔴 BUG CRITICAL (Phải fix ngay)

### Bug #1: Plain Text Password Storage
**File:** `src/stores/authStore.js`  
**Line:** ~105  
**Mô tả:** Password được lưu dưới dạng plain text  

```javascript
// ❌ HIỆN TẠI (NGUY HIỂM)
{
  id: 'member1',
  name: 'Hội viên 1',
  email: 'member@gym.com',
  password: '123456',  // ❌ Plain text
  role: ROLES.MEMBER
}

// ✅ NÊN LÀM (HASH)
import bcrypt from 'bcryptjs'

// Khi lưu
const hashedPassword = await bcrypt.hash(password, 10)

// Khi so sánh
const isValid = await bcrypt.compare(inputPassword, hashedPassword)
```

---

### Bug #2: Form Validation không kiểm tra Duplicate Email
**File:** `src/components/ManageMembers.vue`  
**Function:** `saveMember()`  
**Mô tả:** Có thể tạo 2 hội viên với cùng email  

```javascript
// ❌ HIỆN TẠI
saveMember() {
  // Không có kiểm tra duplicate email
  authStore.addMember(this.formData)
}

// ✅ NÊN LÀM
saveMember() {
  // Kiểm tra duplicate email
  const emailExists = this.checkEmailExists(this.formData.email, this.editingMember?.id)
  if (emailExists) {
    this.errorMessage = 'Email đã tồn tại!'
    return
  }
  authStore.addMember(this.formData)
}

checkEmailExists(email, excludeId = null) {
  return this.members.some(m => m.email === email && m.id !== excludeId)
}
```

---

### Bug #3: Email Service không Configuration
**File:** `src/services/emailService.js`  
**Line:** ~12  
**Mô tả:** EmailJS credentials là placeholder  

```javascript
// ❌ HIỆN TẠI
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'  // Placeholder
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'  // Placeholder

// ✅ NÊN LÀM
// Option 1: Environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Tạo .env file
// VITE_EMAILJS_SERVICE_ID=service_xxxxxx
// VITE_EMAILJS_PUBLIC_KEY=pub_xxxxxx

// Option 2: Backend API (Tốt hơn)
// POST /api/email/send-verification
// Backend xử lý email using Nodemailer
```

---

### Bug #4: Schedule Capacity không Track Member Registrations
**File:** `src/components/ManageSchedule.vue`  
**Mô tả:** Không kiểm tra capacity khi member đăng ký  

```javascript
// ❌ HIỆN TẠI - Schedule object
{
  id: 'schedule1',
  name: 'Yoga Class',
  capacity: 20,  // Chỉ là số, không track ai đã register
  registered: []  // ❌ Field này không tồn tại
}

// ✅ NÊN LÀM
{
  id: 'schedule1',
  name: 'Yoga Class',
  capacity: 20,
  registeredMembers: ['member1', 'member3', 'member5'],  // ✅ Track
  waitlist: ['member7'],  // ✅ Waitlist nếu full
  
  // Helper method
  getAvailableSpots() {
    return this.capacity - this.registeredMembers.length
  },
  
  registerMember(memberId) {
    if (this.registeredMembers.includes(memberId)) {
      throw new Error('Already registered')
    }
    if (this.getAvailableSpots() > 0) {
      this.registeredMembers.push(memberId)
    } else {
      this.waitlist.push(memberId)
    }
  }
}
```

---

### Bug #5: Password Reset không có Email Verification
**File:** `src/components/ForgotPassword.vue`  
**Mô tả:** Bất cứ ai cũng có thể reset password của ai  

```javascript
// ❌ HIỆN TẠI
handleForgotPassword() {
  // Chỉ tìm user theo email, không verify
  const user = this.findUserByEmail(email)
  if (user) {
    user.password = 'temp123'  // ❌ Không an toàn!
  }
}

// ✅ NÊN LÀM (OTP Flow)
async handleForgotPassword() {
  // Step 1: Gửi OTP qua email
  const otp = generateOTP()  // Generate 6-digit OTP
  await emailService.sendOTP(email, otp)
  store.saveOTPRequest(email, otp, Date.now() + 10*60*1000)  // 10 min expiry
  
  // Step 2: User nhập OTP (show form)
  // Step 3: Verify OTP
  // Step 4: Allow reset password
  // Step 5: Send new temp password via email
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
```

---

### Bug #6: Role-based Authorization không Server-side
**File:** `src/router.js`  
**Mô tả:** Route guard chỉ frontend, dễ bypass  

```javascript
// ❌ HIỆN TẠI
{
  path: '/dashboard/trainers',
  component: ManageTrainers,
  meta: { requiredRole: ROLES.ADMIN }  // ❌ Frontend only!
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')  // Chỉ check logged in, không check role
  } else {
    next()  // ❌ Cho phép mọi role truy cập
  }
})

// ✅ NÊN LÀM
router.beforeEach((to, from, next) => {
  const requiredRole = to.meta.requiredRole
  const userRole = authStore.currentUser?.role
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (requiredRole && userRole !== requiredRole) {
    // ✅ Check role
    next('/dashboard')  // Redirect nếu không có quyền
  } else {
    next()
  }
})

// ⭐ QUAN TRỌNG: Backend phải validate role
// GET /api/dashboard/trainers
// Backend check: if (user.role !== ADMIN) return 403 Forbidden
```

---

## 🟡 BUG MAJOR (Nên fix sớm)

### Bug #7: Trainer Selection cho Member - Multiple vs Single
**File:** `src/components/SelectTrainer.vue`  
**Mô tả:** 1 member chỉ có 1 trainer, nhưng thực tế gym cho many-to-many

```javascript
// ❌ HIỆN TẠI
{
  memberId: 'member1',
  selectedTrainer: 'trainer1'  // Chỉ 1 trainer
}

// ✅ NÊN LÀM (Many-to-many)
{
  memberId: 'member1',
  selectedTrainers: ['trainer1', 'trainer3'],  // Multiple
  
  // Primary trainer (for personal training)
  primaryTrainer: 'trainer1',
  
  // Secondary trainers (for specific classes)
  secondaryTrainers: ['trainer3']
}
```

---

### Bug #8: Membership Expiry Reminder Logic Incomplete
**File:** `src/stores/authStore.js`  
**Function:** `startExpiryWatcher()`  
**Mô tả:** Logic có nhưng không hoàn toàn  

```javascript
// ❌ HIỆN TẠI (Incomplete)
startExpiryWatcher() {
  setInterval(() => {
    this.checkAndSendReminders()  // Được call nhưng function không fully implement
  }, 24 * 60 * 60 * 1000)  // Daily
}

checkAndSendReminders() {
  this.users.members.forEach(member => {
    const expiryDate = new Date(member.packageExpiry)
    const now = new Date()
    const daysUntilExpiry = (expiryDate - now) / (1000 * 60 * 60 * 24)
    
    // Gửi reminder 3 ngày trước
    if (daysUntilExpiry <= 3 && daysUntilExpiry > 0) {
      sendSimpleEmail(member.email, 'Nhắc nhở: Gói tập sắp hết hạn', ...)
      member.lastExpiryReminderSent = expiryDate.toISOString()  // Track để tránh duplicate
    }
  })
}

// ✅ NÊN LÀM
// Backend job (better approach)
// Node.js cron job: check every 6 hours
// Send reminder nếu:
// - Days until expiry: 7, 3, 1, 0 (4 times)
// - Don't send duplicate
// - Log all email sends in audit_logs table
```

---

### Bug #9: Photo Upload Base64 không Scalable
**File:** `src/components/ManageMembers.vue`  
**Function:** `handlePhotoUpload()`  
**Mô tả:** Base64 photos lưu trong localStorage, not scalable  

```javascript
// ❌ HIỆN TẠI
handlePhotoUpload(event) {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    this.formData.photo = e.target.result  // ❌ Base64 string (large!)
  }
  reader.readAsDataURL(file)
}

// ❌ Problem: localStorage max ~5-10MB
// 100 members với photos = 50-100MB = localStorage penuh!

// ✅ NÊN LÀM (Upload to Cloud)
async handlePhotoUpload(event) {
  const file = event.target.files[0]
  
  // Option 1: Firebase Storage
  const storage = firebase.storage()
  const ref = storage.ref(`members/${this.formData.id}`)
  await ref.put(file)
  this.formData.photoUrl = await ref.getDownloadURL()
  
  // Option 2: AWS S3
  // const s3 = new AWS.S3()
  // await s3.upload({ Bucket: 'gym-bucket', Key: `members/${id}`, Body: file })
  
  // Option 3: Backend upload
  // const formData = new FormData()
  // formData.append('file', file)
  // const response = await fetch('/api/upload', { method: 'POST', body: formData })
  // this.formData.photoUrl = response.url
}
```

---

### Bug #10: Search không Pagination
**File:** `src/components/ManageMembers.vue`  
**Function:** `performSearch()`  
**Mô tả:** Render 10,000 members cùng lúc = lag  

```javascript
// ❌ HIỆN TẠI
performSearch() {
  this.filteredMembers = this.members.filter(m =>
    m.name.includes(this.searchQuery) ||
    m.email.includes(this.searchQuery) ||
    m.phone.includes(this.searchQuery)
  )
  // Render all members cùng lúc => slow!
}

// ✅ NÊN LÀM (Pagination)
data() {
  return {
    currentPage: 1,
    itemsPerPage: 20,
    totalResults: 0
  }
}

performSearch() {
  const results = this.members.filter(m =>
    m.name.includes(this.searchQuery) ||
    m.email.includes(this.searchQuery) ||
    m.phone.includes(this.searchQuery)
  )
  
  this.totalResults = results.length
  this.currentPage = 1  // Reset to first page
  
  // Chỉ render 20 items
  this.filteredMembers = results.slice(0, this.itemsPerPage)
}

goToPage(page) {
  const start = (page - 1) * this.itemsPerPage
  const end = start + this.itemsPerPage
  this.filteredMembers = this.results.slice(start, end)
  this.currentPage = page
}
```

---

## 🟠 BUG MINOR (Có thể fix sau)

### Bug #11: No Auto-save Form
**File:** All form components  
**Mô tả:** Form data mất nếu page refresh  

```javascript
// ✅ Solution: Auto-save with debounce
import { debounce } from 'lodash-es'

data() {
  return {
    formData: { name: '', email: '' }
  }
}

watch: {
  formData: {
    handler: debounce(function() {
      localStorage.setItem('draftMember', JSON.stringify(this.formData))
    }, 500),
    deep: true
  }
}

mounted() {
  const draft = localStorage.getItem('draftMember')
  if (draft) {
    this.formData = JSON.parse(draft)  // Restore draft
  }
}
```

---

### Bug #12: No Input Sanitization
**File:** All form fields  
**Mô tả:** Có thể input XSS attack  

```javascript
// ❌ HIỆN TẠI (Unsafe)
<div>{{ member.name }}</div>  // Nếu name = "<img onerror=alert('XSS')>"

// ✅ NÊN LÀM
// Vue auto-escape text, nhưng:
1. Luôn escape dữ liệu từ user
2. Validate input format (name, email, phone)
3. Use DOMPurify cho rich text

import DOMPurify from 'dompurify'

const cleanName = DOMPurify.sanitize(userInput)
```

---

### Bug #13: CSV Export Format không Proper
**File:** `src/components/ManageReports.vue`  
**Mô tả:** Export format không đúng standard  

```javascript
// ✅ Proper CSV Export
exportReport() {
  const members = this.getAllMembers()
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Package', 'Created At']
  
  // Create CSV
  let csv = headers.join(',') + '\n'
  members.forEach(m => {
    csv += `"${m.id}","${m.name}","${m.email}","${m.phone}","${m.packageLevel}","${m.createdAt}"\n`
  })
  
  // Download
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `gym-report-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
}
```

---

### Bug #14: No Confirmation Dialog untuk Dangerous Actions
**File:** ManageMembers, ManageTrainers, ManageStaff  
**Mô tả:** Có thể delete mà không confirm  

```javascript
// ❌ HIỆN TẠI (Unsafe)
deleteMember(id) {
  authStore.removeMember(id)  // Xóa ngay!
}

// ✅ NÊN LÀM
async deleteMember(id) {
  const confirmed = await this.confirmDelete(
    `Bạn chắc chắn muốn xóa hội viên này? Hành động không thể undo.`
  )
  if (confirmed) {
    authStore.removeMember(id)
  }
}

confirmDelete(message) {
  return new Promise(resolve => {
    // Show confirmation dialog
    if (confirm(message)) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}
```

---

### Bug #15: Trainer Capacity - Multiple Class Assignments
**File:** `src/components/ManageSchedule.vue`  
**Mô tả:** 1 trainer có thể teach 2 classes cùng giờ  

```javascript
// ✅ Solution: Check trainer availability
isTrainerAvailable(trainerId, dayOfWeek, time, excludeScheduleId = null) {
  const schedules = this.schedules.filter(s =>
    s.trainerId === trainerId &&
    s.dayOfWeek === dayOfWeek &&
    s.excludeScheduleId !== excludeScheduleId
  )
  
  // Check time conflict (±1 hour)
  const requestedTime = new Date(`2000-01-01 ${time}`)
  return !schedules.some(s => {
    const scheduleTime = new Date(`2000-01-01 ${s.time}`)
    const diff = Math.abs(requestedTime - scheduleTime) / (1000 * 60)  // minutes
    return diff < 60  // Within 1 hour = conflict
  })
}
```

---

## 📋 BUG TRACKING TABLE

| # | Severity | Type | File | Status | Fix Time |
|---|----------|------|------|--------|----------|
| 1 | Critical | Security | authStore.js | TODO | 2h |
| 2 | Critical | Logic | ManageMembers.vue | TODO | 1h |
| 3 | Critical | Config | emailService.js | TODO | 0.5h |
| 4 | Critical | Logic | ManageSchedule.vue | TODO | 2h |
| 5 | Critical | Auth | ForgotPassword.vue | TODO | 3h |
| 6 | Critical | Auth | router.js | TODO | 2h |
| 7 | Major | Design | SelectTrainer.vue | TODO | 1h |
| 8 | Major | Logic | authStore.js | TODO | 1.5h |
| 9 | Major | Architecture | ManageMembers.vue | TODO | 4h |
| 10 | Major | Performance | ManageMembers.vue | TODO | 2h |
| 11 | Minor | UX | All forms | TODO | 1h |
| 12 | Minor | Security | All inputs | TODO | 2h |
| 13 | Minor | Format | ManageReports.vue | TODO | 0.5h |
| 14 | Minor | UX | All CRUD | TODO | 1h |
| 15 | Minor | Logic | ManageSchedule.vue | TODO | 1h |

**Total Fix Time: ~27 hours**

---

**Cập nhật lần cuối:** 13/02/2026
