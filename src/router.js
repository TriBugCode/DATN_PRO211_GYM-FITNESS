import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/authStore'

// Layouts
import MainLayout from './layouts/MainLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'
import TrainerLayout from './layouts/TrainerLayout.vue'

// Public Pages
import Home from './pages/Home.vue'
import Programs from './pages/Programs.vue'
import Trainers from './pages/Trainers.vue'
import Membership from './pages/Membership.vue'
import Payment from './pages/Payment.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

// Dashboard Pages
import Dashboard from './pages/Dashboard.vue'
import Profile from './pages/Profile.vue'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.vue'
import ManageMembers from './pages/admin/ManageMembers.vue'
import ManageTrainers from './pages/admin/ManageTrainers.vue'
import ManageSchedules from './pages/admin/ManageSchedule.vue'
import ManageReports from './pages/admin/ManageReports.vue'
import ManagePayments from './pages/admin/ManagePayments.vue'

// Trainer Pages
import TrainerDashboard from './pages/trainer/TrainerDashboard.vue'
import MyClients from './pages/trainer/MyClients.vue'
import MySchedules from './pages/trainer/MySchedules.vue'
import WorkoutPlans from './pages/trainer/WorkoutPlans.vue'
import ProgressReports from './pages/trainer/ProgressReports.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: '/programs', name: 'Programs', component: Programs },
      { path: '/trainers', name: 'Trainers', component: Trainers },
      { path: '/membership', name: 'Membership', component: Membership },
      { path: '/payment', name: 'Payment', component: Payment },
      { path: '/login', name: 'Login', component: Login },
      { path: '/register', name: 'Register', component: Register },
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true, role: 'member' },
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      { path: 'profile', name: 'Profile', component: Profile },
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'members', name: 'ManageMembers', component: ManageMembers },
      { path: 'trainers', name: 'ManageTrainers', component: ManageTrainers },
      { path: 'schedules', name: 'ManageSchedules', component: ManageSchedules },
      { path: 'reports', name: 'ManageReports', component: ManageReports },
      { path: 'payments', name: 'ManagePayments', component: ManagePayments },
    ]
  },
  {
    path: '/trainer',
    component: TrainerLayout,
    meta: { requiresAuth: true, role: 'trainer' },
    children: [
      { path: '', name: 'TrainerDashboard', component: TrainerDashboard },
      { path: 'clients', name: 'MyClients', component: MyClients },
      { path: 'schedules', name: 'MySchedules', component: MySchedules },
      { path: 'plans', name: 'WorkoutPlans', component: WorkoutPlans },
      { path: 'reports', name: 'ProgressReports', component: ProgressReports },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard with role-based access
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // Check role-based access
  if (to.meta.role) {
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }

    const userRole = authStore.user.role
    if (to.meta.role !== userRole) {
      // Redirect to appropriate dashboard based on user role
      if (userRole === 'admin') {
        next('/admin')
      } else if (userRole === 'trainer') {
        next('/trainer')
      } else {
        next('/dashboard')
      }
      return
    }
  }

  next()
})

export default router