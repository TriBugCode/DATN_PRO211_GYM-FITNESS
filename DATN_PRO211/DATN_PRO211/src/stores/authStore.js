import axios from "axios"
import { ref } from "vue"

/* ===== ROLE CONSTANTS ===== */
export const ROLES = {
  ADMIN: "Admin",
  STAFF: "Staff",
  TRAINER: "Trainer",
  MEMBER: "Member"
}

/* ===== MEMBER PACKAGE CONSTANTS (UI ONLY) ===== */
export const PACKAGES = {
  BASIC: "basic",
  PREMIUM: "premium",
  ELITE: "elite"
}

/* ===== API BASE ===== */
const AUTH_API = "http://localhost:5170/api/auth"
const USER_API = "http://localhost:5170/api/users"
const REPORT_API = "http://localhost:5170/api/reports"

/* ===== AXIOS INSTANCE ===== */
const api = axios.create()

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/* ===== AUTH STORE (OBJECT STORE – SAFE VERSION) ===== */
export const authStore = {
  /* ===== STATE ===== */
  currentUser: ref(
    JSON.parse(localStorage.getItem("user"))
  ),
  token: ref(localStorage.getItem("token")),

  /* =====================================================
     AUTH
     ===================================================== */

  async login(email, password) {
    try {
      const res = await api.post(`${AUTH_API}/login`, {
        usernameOrEmail: email,
        password
      })

      this.token.value = res.data.token
      this.currentUser.value = res.data.user

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data || "Đăng nhập thất bại"
      }
    }
  },

  logout() {
    this.token.value = null
    this.currentUser.value = null
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  /* =====================================================
     REGISTER
     ===================================================== */

  async register(data) {
    try {
      const res = await api.post(`${AUTH_API}/register`, {
        username: data.username || data.email,
        password: data.password,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber || data.phone,
        role: data.role || ROLES.MEMBER
      })

      return {
        success: true,
        message: res.data?.message || "Đăng ký thành công",
        user: res.data?.user
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Đăng ký thất bại"
      }
    }
  },

  /* =====================================================
     ROLE / PERMISSION
     ===================================================== */

  hasRole(role) {
    return this.currentUser.value?.role === role
  },

  canAccess(roles = []) {
    if (!this.currentUser.value) return false
    return roles.includes(this.currentUser.value.role)
  },

  /* =====================================================
     MEMBERS
     ===================================================== */

  async getAllMembers() {
    const res = await api.get(`${USER_API}?role=Member`)
    return res.data
  },

  async searchMembers(keyword) {
    try {
      const res = await api.get(`${USER_API}/search`, {
        params: { keyword }
      })
      return res.data
    } catch {
      return []
    }
  },

  async addMember(data) {
    return api.post(USER_API, data)
  },

  async updateMember(id, data) {
    return api.put(`${USER_API}/${id}`, data)
  },

  async deleteMember(id) {
    return api.delete(`${USER_API}/${id}`)
  },

  /* =====================================================
     TRAINERS
     ===================================================== */

  async getAllTrainers() {
    try {
      const res = await api.get(`${USER_API}?role=Trainer`)
      return res.data
    } catch {
      return []
    }
  },

  async addTrainer(data) {
    return api.post(USER_API, { ...data, role: ROLES.TRAINER })
  },

  async updateTrainer(id, data) {
    return api.put(`${USER_API}/${id}`, data)
  },

  async deleteTrainer(id) {
    return api.delete(`${USER_API}/${id}`)
  },

  /* =====================================================
     STAFF
     ===================================================== */

  async getAllStaff() {
    try {
      const res = await api.get(`${USER_API}?role=Staff`)
      return res.data
    } catch {
      return []
    }
  },

  async addStaff(data) {
    return api.post(USER_API, { ...data, role: ROLES.STAFF })
  },

  async updateStaff(id, data) {
    return api.put(`${USER_API}/${id}`, data)
  },

  async deleteStaff(id) {
    return api.delete(`${USER_API}/${id}`)
  },

  /* =====================================================
     REPORTS / DASHBOARD
     ===================================================== */

  async getStatistics() {
    try {
      const res = await api.get(`${REPORT_API}/statistics`)
      return res.data
    } catch {
      return {
        totalMembers: 0,
        totalStaff: 0,
        totalTrainers: 0,
        membersByPackage: {
          basic: 0,
          premium: 0,
          elite: 0
        }
      }
    }
  }
}
