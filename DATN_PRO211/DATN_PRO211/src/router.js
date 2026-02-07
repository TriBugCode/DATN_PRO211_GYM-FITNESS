import { createRouter, createWebHistory } from 'vue-router'
import { authStore, ROLES } from './stores/authStore'

// Public Pages
import Home from './components/Home.vue'
import Classes from './components/Classes.vue'
import Trainers from './components/Trainers.vue'
import Pricing from './components/Pricing.vue'
import Contact from './components/Contact.vue'
import JoinNow from './components/JoinNow.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import ChangePassword from './components/ChangePassword.vue'

// Dashboard & Management Pages
import Dashboard from './components/Dashboard.vue'
import ManageMembers from './components/ManageMembers.vue'
import ManageTrainers from './components/ManageTrainers.vue'
import ManageStaff from './components/ManageStaff.vue'
import ManageReports from './components/ManageReports.vue'
import ManageSchedule from './components/ManageSchedule.vue'

// Member Pages
import MemberPackages from './components/MemberPackages.vue'
import SelectTrainer from './components/SelectTrainer.vue'
import ViewSchedule from './components/ViewSchedule.vue'
//Admin Feature pages
import AdminPackage from './components/AdminComponets/AdminPackage.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dang-nhap',
    name: 'Login',
    component: Login
  },
  {
    path: '/lop-hoc',
    name: 'Classes',
    component: Classes
  },
  {
    path: '/hlv',
    name: 'Trainers',
    component: Trainers
  },
  {
    path: '/bang-gia',
    name: 'Pricing',
    component: Pricing
  },
  {
    path: '/lien-he',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/tham-gia-ngay',
    name: 'JoinNow',
    component: JoinNow
  },
  {
    path: '/dang-ki',
    name: 'Register',
    component: Register
  },
  {
    path: '/quen-mat-khau',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/doi-mat-khau',
    name: 'ChangePassword',
    component: ChangePassword
  },
  // Dashboard Routes
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      // Admin & Staff: Manage Members
      {
        path: 'members',
        name: 'ManageMembers',
        component: ManageMembers,
        meta: { requiresAuth: true }
      },
      // Admin: Manage Trainers
      {
        path: 'trainers',
        name: 'ManageTrainers',
        component: ManageTrainers,
        meta: { requiresAuth: true, requiredRole: ROLES.ADMIN }
      },
      // Admin: Manage Staff
      {
        path: 'staff',
        name: 'ManageStaff',
        component: ManageStaff,
        meta: { requiresAuth: true, requiredRole: ROLES.ADMIN }
      },
      // Admin & Staff: Reports
      {
        path: 'reports',
        name: 'ManageReports',
        component: ManageReports,
        meta: { requiresAuth: true }
      },
      {
        path: 'admin-package',
        name: 'AdminPackage',
        component: AdminPackage,
        meta: { requiresAuth: true, requiredRole: ROLES.ADMIN }
      },
      // Trainer & Member: Schedule
      {
        path: 'schedule',
        name: 'ManageSchedule',
        component: ManageSchedule,
        meta: { requiresAuth: true }
      },
      // Member: View Schedule (alternative route)
      {
        path: 'view-schedule',
        name: 'ViewSchedule',
        component: ViewSchedule,
        meta: { requiresAuth: true, requiredRole: 'member' }
      },
      // Member: Packages
      {
        path: 'packages',
        name: 'MemberPackages',
        component: MemberPackages,
        meta: { requiresAuth: true, requiredRole: ROLES.MEMBER }
      },
      // Member: Select Trainer
      {
        path: 'select-trainer',
        name: 'SelectTrainer',
        component: SelectTrainer,
        meta: { requiresAuth: true, requiredRole: ROLES.MEMBER }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Authentication Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = authStore.currentUser.value
  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.requiredRole

  // Check if page requires authentication
  if (requiresAuth && !isAuthenticated) {
    next('/dang-nhap')
    return
  }

  // Check if user has required role
  if (requiredRole && isAuthenticated && authStore.currentUser.value.role !== requiredRole) {
    // Admin can access everything
    if (authStore.currentUser.value.role === ROLES.ADMIN) {
      next()
      return
    }

    // Allow staff to access member management
    if (requiredRole === ROLES.MEMBER && authStore.currentUser.value.role === ROLES.STAFF) {
      next()
      return
    }

    // Allow member to view schedule (not manage)
    if (to.path === '/dashboard/schedule' && authStore.currentUser.value.role === ROLES.MEMBER) {
      next()
      return
    }

    // Deny access
    alert('Bạn không có quyền truy cập trang này')
    next('/dashboard')
    return
  }

  next()
})

export default router