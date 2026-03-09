# 🗺️ ROADMAP - HƯỚNG DẪN PHÁT TRIỂN TIẾP THEO

---

## 📍 GIAI ĐOẠN 1: FIX SECURITY ISSUES (1-2 weeks)

### Priority P0 (Blocking Production)

**Task 1.1: Password Hashing** (2-3 hours)
- [ ] Install bcryptjs: `npm install bcryptjs`
- [ ] Hash password khi register/change password
- [ ] Validate password khi login
- [ ] Remove plain text passwords from localStorage
- [ ] Test: Try to view password in browser DevTools
- **Acceptance:** No plain text password visible in any form

**Task 1.2: Input Validation & Sanitization** (3-4 hours)
- [ ] Install dompurify: `npm install dompurify`
- [ ] Create validation utility (`src/utils/validation.js`)
- [ ] Apply to all forms (email, phone, name, password)
- [ ] Test: Try to inject `<img src=x onerror=alert('XSS')>` in forms
- [ ] Test: Verify dangerous HTML is escaped
- **Acceptance:** No XSS vulnerabilities possible

**Task 1.3: Environment Variables** (1 hour)
- [ ] Create `.env.local` file (add to .gitignore)
- [ ] Move sensitive data to env vars:
  - EmailJS credentials
  - Test account credentials
  - API endpoints
- [ ] Update all references to use `import.meta.env`
- **Acceptance:** No hardcoded secrets in code

**Task 1.4: Rate Limiting** (2-3 hours)
- [ ] Add rate limiting to login form
- [ ] Implement 5 attempts per 15 minutes
- [ ] Lock account after failed attempts
- [ ] Test: Try to brute force login
- **Acceptance:** Account locks after 5 failed attempts

### Priority P1 (Should Fix Soon)

**Task 1.5: Form Validation** (3-4 hours)
- [ ] Duplicate email check
- [ ] Email format validation
- [ ] Phone number validation
- [ ] Password strength validation
- [ ] Name length validation
- **Acceptance:** All validations working, error messages displayed

**Task 1.6: Data Integrity** (2-3 hours)
- [ ] Schedule capacity validation
- [ ] Member package upgrade logic
- [ ] Trainer assignment validation
- [ ] Remove hard-coded test credentials
- **Acceptance:** Business logic enforced correctly

---

## 📍 GIAI ĐOẠN 2: BACKEND & DATABASE (8-12 weeks)

### Task 2.1: Backend API Setup (40-50 hours)
- [ ] Choose framework: Node.js + Express (recommended)
- [ ] Setup project structure
- [ ] Create npm scripts for dev/build/start
- [ ] Setup environment variables
- [ ] Add logging middleware
- [ ] Add error handling middleware
- [ ] Add CORS configuration
- [ ] Add request validation middleware

### Task 2.2: Database Setup (30-40 hours)
- [ ] Choose DB: PostgreSQL (recommended) or MongoDB
- [ ] Design schema:
  - Users table
  - Members table
  - Trainers table
  - Staff table
  - Schedules table
  - Registrations table (junction table)
  - Transactions table (for payments)
- [ ] Setup migrations
- [ ] Create seed data
- [ ] Setup relationships & constraints

### Task 2.3: Authentication API (40-50 hours)
- [ ] Implement JWT token system
- [ ] Create login endpoint: `POST /api/auth/login`
- [ ] Create register endpoint: `POST /api/auth/register`
- [ ] Create password reset endpoint
- [ ] Create token refresh endpoint
- [ ] Add authentication middleware
- [ ] Add role-based authorization middleware
- [ ] Store refresh tokens in database

### Task 2.4: REST API Endpoints (100-150 hours)

**Members API:**
- `GET /api/members` - List all
- `GET /api/members/:id` - Get one
- `POST /api/members` - Create
- `PUT /api/members/:id` - Update
- `DELETE /api/members/:id` - Delete
- `POST /api/members/:id/upgrade-package` - Upgrade

**Trainers API:**
- `GET /api/trainers` - List all
- `GET /api/trainers/:id` - Get one
- `POST /api/trainers` - Create
- `PUT /api/trainers/:id` - Update
- `DELETE /api/trainers/:id` - Delete

**Schedules API:**
- `GET /api/schedules` - List all
- `GET /api/schedules/:id` - Get one
- `POST /api/schedules` - Create
- `PUT /api/schedules/:id` - Update
- `DELETE /api/schedules/:id` - Delete
- `POST /api/schedules/:id/register` - Register member
- `DELETE /api/schedules/:id/unregister` - Unregister member

**Staff API:**
- `GET /api/staff` - List all
- `POST /api/staff` - Create
- `PUT /api/staff/:id` - Update
- `DELETE /api/staff/:id` - Delete

**Reports API:**
- `GET /api/reports/overview` - Dashboard stats
- `GET /api/reports/revenue` - Revenue report
- `GET /api/reports/members` - Member demographics
- `GET /api/reports/export` - Export to CSV

### Task 2.5: Frontend Backend Integration (50-80 hours)
- [ ] Create API service layer (`src/services/api.js`)
- [ ] Remove localStorage logic
- [ ] Update all components to call API
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add success notifications
- [ ] Update authentication store to use JWT
- [ ] Test all API calls

---

## 📍 GIAI ĐOẠN 3: PAYMENT & EMAIL (4-6 weeks)

### Task 3.1: Payment Gateway Integration (40-60 hours)

**Choose Payment Provider:**
- Option 1: Stripe (International)
- Option 2: VNPay (Vietnam)
- Option 3: Momo (Vietnam)

**Implementation:**
- [ ] Create payment backend endpoints
- [ ] Setup payment webhook handlers
- [ ] Create invoice table in database
- [ ] Create transaction history tracking
- [ ] Frontend: Payment form integration
- [ ] Handle success/failure callbacks
- [ ] Generate invoice PDFs
- [ ] Send payment confirmation email

### Task 3.2: Email Service Setup (6-10 hours)
- [ ] Configure email provider:
  - Option 1: Nodemailer + Gmail/SMTP
  - Option 2: SendGrid
  - Option 3: AWS SES
- [ ] Create email templates:
  - Welcome email
  - Password reset email
  - Invoice/Receipt email
  - Class reminder email
  - Promotional emails
- [ ] Setup email queue (Bull/RabbitMQ) for reliability
- [ ] Test email delivery

### Task 3.3: Billing Automation (30-40 hours)
- [ ] Setup recurring billing (cron jobs)
- [ ] Auto-charge monthly subscription
- [ ] Handle failed payments (retry logic)
- [ ] Send billing reminders
- [ ] Handle refunds/cancellations
- [ ] Send billing emails

---

## 📍 GIAI ĐOẠN 4: ADVANCED FEATURES (8-12 weeks)

### Task 4.1: Attendance Tracking (20-30 hours)
- [ ] Create attendance schema
- [ ] Add check-in/check-out API
- [ ] Add attendance tracking UI
- [ ] Generate attendance reports
- [ ] Track no-shows

### Task 4.2: Progress Tracking (30-40 hours)
- [ ] Create metrics schema (weight, body fat %, etc.)
- [ ] Add progress tracking UI
- [ ] Create progress reports
- [ ] Add progress charts/graphs
- [ ] Generate progress insights

### Task 4.3: Real-time Features (40-60 hours)
- [ ] Setup WebSocket (Socket.io)
- [ ] Real-time schedule updates
- [ ] Real-time notifications
- [ ] Live chat support (optional)
- [ ] Real-time member count in class

### Task 4.4: Mobile App (200-300 hours)
- [ ] Choose framework: React Native or Flutter
- [ ] Setup project structure
- [ ] Implement core features (login, schedule, progress)
- [ ] Test on iOS and Android
- [ ] Deploy to App Store and Google Play

---

## 📍 GIAI ĐOẠN 5: DEPLOYMENT & LAUNCH (2-4 weeks)

### Task 5.1: Backend Deployment (8-12 hours)
- [ ] Choose hosting: Heroku, AWS, DigitalOcean, Railway
- [ ] Setup environment variables
- [ ] Setup database on cloud
- [ ] Configure backups
- [ ] Setup CI/CD pipeline
- [ ] Deploy backend

### Task 5.2: Frontend Deployment (4-6 hours)
- [ ] Optimize bundle size
- [ ] Setup CDN for static assets
- [ ] Deploy to Vercel/Netlify/AWS
- [ ] Setup custom domain
- [ ] Configure SSL certificate
- [ ] Setup redirects

### Task 5.3: Quality Assurance (20-30 hours)
- [ ] Functional testing
- [ ] Security testing
- [ ] Performance testing
- [ ] Load testing
- [ ] User acceptance testing

### Task 5.4: Launch Preparation (10-20 hours)
- [ ] Create user documentation
- [ ] Create admin manual
- [ ] Train staff
- [ ] Setup monitoring & alerting
- [ ] Setup logging
- [ ] Setup error tracking (Sentry)

---

## 📊 TOTAL EFFORT ESTIMATION

| Giai Đoạn | Công việc | Giờ | Tuần |
|-----------|----------|-----|------|
| 1 | Security Fixes | 20 | 0.5 |
| 2 | Backend + DB | 220 | 5-6 |
| 3 | Payment + Email | 50 | 1-2 |
| 4 | Advanced | 300 | 6-8 |
| 5 | Deploy | 50 | 1 |
| **TOTAL** | | **640** | **13-17 weeks** |

**Timeline: ~4 months (with 2 developers)**  
**Cost Estimate: $20,000 - $30,000 USD**

---

## 🎯 QUICK WIN PRIORITIES

If you have limited time, focus on these (in order):

### Week 1: Critical Security (20 hours)
- ✅ Password hashing
- ✅ Input validation
- ✅ Rate limiting
- **Result:** Prevent basic attacks

### Week 2-3: Basic Backend (40 hours)
- ✅ API setup
- ✅ Database basic schema
- ✅ Authentication API
- **Result:** Can login to real backend

### Week 4-6: Core Features (80 hours)
- ✅ Members CRUD API
- ✅ Schedules API
- ✅ Frontend integration
- **Result:** App works without localStorage

### Week 7-8: Payment (40 hours)
- ✅ Payment gateway
- ✅ Invoice generation
- ✅ Transaction tracking
- **Result:** Can accept payments

### Week 9-10: Deployment (20 hours)
- ✅ Deploy backend + frontend
- ✅ Setup monitoring
- ✅ Go live
- **Result:** Production launch

**10-week MVP: ~200-240 hours with 1 developer**

---

## ✅ SUCCESS CRITERIA

Project will be "Production Ready" when:

- ✅ No security vulnerabilities (OWASP Top 10)
- ✅ No plain text passwords
- ✅ Backend API + Database working
- ✅ Payment system integrated
- ✅ Email service working
- ✅ All data persistent
- ✅ Can handle concurrent users
- ✅ Deployed to production server
- ✅ Monitoring & alerting setup
- ✅ User documentation complete
- ✅ User acceptance testing passed
- ✅ Performance acceptable (< 2s load time)

---

## 📚 RECOMMENDED TECH STACK

```
Frontend:
- Vue 3 (already using ✅)
- Vite (already using ✅)
- Tailwind CSS (already using ✅)
- Pinia (State management)
- Axios (HTTP client)

Backend:
- Node.js + Express (or Python + Django)
- PostgreSQL (Database)
- JWT (Authentication)
- Nodemailer (Email)
- Stripe/VNPay (Payment)

DevOps:
- Docker (Containerization)
- GitHub Actions (CI/CD)
- AWS/DigitalOcean (Hosting)
- Sentry (Error tracking)
- Datadog (Monitoring)

Mobile:
- React Native or Flutter
```

---

## 🚀 NEXT IMMEDIATE STEPS

1. **This Week:**
   - Fix password hashing (2-3 hrs)
   - Fix input validation (3-4 hrs)
   - Setup environment variables (1 hr)

2. **This Month:**
   - Fix all security issues (20 hrs)
   - Complete bug list (15 hrs)
   - Design database schema (8 hrs)

3. **Next Month:**
   - Build backend API
   - Setup database
   - Integrate with frontend

4. **3 Months:**
   - Payment integration
   - Email setup
   - Deploy to production

---

**Last Updated: 13/02/2026**  
**Status: Ready for Phase 1 (Security Fixes)**

