<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bebas text-gym-red">Quản lý thanh toán</h1>
      <button
        @click="showAddModal = true"
        class="bg-gym-red hover:bg-gym-orange text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <i class="fas fa-plus mr-2"></i>Thêm thanh toán
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="bg-gym-dark-secondary p-4 rounded-lg border border-gym-red/20">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm thanh toán..."
            class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="completed">Hoàn thành</option>
            <option value="pending">Đang xử lý</option>
            <option value="failed">Thất bại</option>
          </select>
          <select
            v-model="membershipFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả gói</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Elite">Elite</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-gym-dark-secondary rounded-lg border border-gym-red/20 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gym-dark">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Thành viên</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Gói thành viên</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Số tiền</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Ngày thanh toán</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Phương thức</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gym-red/10">
            <tr v-for="payment in filteredPayments" :key="payment.id" class="hover:bg-gym-dark">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gym-red rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user text-white text-xs"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-white">{{ payment.memberName }}</div>
                    <div class="text-sm text-gym-text-secondary">{{ payment.memberEmail }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getMembershipBadgeClass(payment.membership)">
                  {{ payment.membership }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {{ formatCurrency(payment.amount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gym-text-secondary">
                {{ formatDate(payment.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gym-text-secondary">
                {{ payment.method }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getStatusBadgeClass(payment.status)">
                  {{ getStatusText(payment.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    v-if="payment.status === 'pending'"
                    @click="updatePaymentStatus(payment.id, 'completed')"
                    class="text-gym-green hover:text-gym-green/80 transition-colors"
                    title="Đánh dấu hoàn thành"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    @click="viewPaymentDetails(payment)"
                    class="text-gym-blue hover:text-gym-blue/80 transition-colors"
                    title="Xem chi tiết"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button
                    @click="deletePayment(payment.id)"
                    class="text-red-400 hover:text-red-300 transition-colors"
                    title="Xóa"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="text-center">
          <div class="text-2xl font-bebas text-gym-green mb-2">{{ formatCurrency(totalRevenue) }}</div>
          <div class="text-gym-text-secondary">Tổng doanh thu</div>
        </div>
      </div>
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="text-center">
          <div class="text-2xl font-bebas text-gym-blue mb-2">{{ completedPayments }}</div>
          <div class="text-gym-text-secondary">Thanh toán hoàn thành</div>
        </div>
      </div>
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20">
        <div class="text-center">
          <div class="text-2xl font-bebas text-gym-orange mb-2">{{ pendingPayments }}</div>
          <div class="text-gym-text-secondary">Đang xử lý</div>
        </div>
      </div>
    </div>

    <!-- Add Payment Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-md">
        <h3 class="text-xl font-oswald text-white mb-4">Thêm thanh toán mới</h3>

        <form @submit.prevent="savePayment" class="space-y-4">
          <div>
            <label class="block text-gym-text font-medium mb-2">Thành viên</label>
            <select
              v-model="paymentForm.memberId"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option value="">Chọn thành viên</option>
              <option v-for="member in adminStore.members" :key="member.id" :value="member.id">
                {{ member.name }} - {{ member.email }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Gói thành viên</label>
            <select
              v-model="paymentForm.membership"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option value="Basic">Basic - 500,000 VND</option>
              <option value="Pro">Pro - 800,000 VND</option>
              <option value="Elite">Elite - 1,200,000 VND</option>
            </select>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Số tiền</label>
            <input
              v-model.number="paymentForm.amount"
              type="number"
              min="0"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Phương thức thanh toán</label>
            <select
              v-model="paymentForm.method"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option value="Cash">Tiền mặt</option>
              <option value="Bank Transfer">Chuyển khoản</option>
              <option value="Credit Card">Thẻ tín dụng</option>
              <option value="E-wallet">Ví điện tử</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-gym-text-secondary hover:text-white transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="bg-gym-red hover:bg-gym-orange text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Thêm thanh toán
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '../../stores/adminStore'

const adminStore = useAdminStore()

const searchQuery = ref('')
const statusFilter = ref('')
const membershipFilter = ref('')
const showAddModal = ref(false)

const paymentForm = ref({
  memberId: '',
  membership: 'Basic',
  amount: 0,
  method: 'Cash'
})

const filteredPayments = computed(() => {
  return adminStore.payments.filter(payment => {
    const member = adminStore.members.find(m => m.id === payment.memberId)
    const matchesSearch = payment.memberName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         (member && member.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesStatus = !statusFilter.value || payment.status === statusFilter.value
    const matchesMembership = !membershipFilter.value || payment.membership === membershipFilter.value

    return matchesSearch && matchesStatus && matchesMembership
  })
})

const totalRevenue = computed(() => {
  return adminStore.payments
    .filter(payment => payment.status === 'completed')
    .reduce((total, payment) => total + payment.amount, 0)
})

const completedPayments = computed(() => {
  return adminStore.payments.filter(payment => payment.status === 'completed').length
})

const pendingPayments = computed(() => {
  return adminStore.payments.filter(payment => payment.status === 'pending').length
})

const getMembershipBadgeClass = (membership) => {
  switch (membership) {
    case 'Basic': return 'bg-blue-500/20 text-blue-400'
    case 'Pro': return 'bg-gym-red/20 text-gym-red'
    case 'Elite': return 'bg-gym-orange/20 text-gym-orange'
    default: return 'bg-gray-500/20 text-gray-400'
  }
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'completed': return 'bg-gym-green/20 text-gym-green'
    case 'pending': return 'bg-yellow-500/20 text-yellow-400'
    case 'failed': return 'bg-red-500/20 text-red-400'
    default: return 'bg-gray-500/20 text-gray-400'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'completed': return 'Hoàn thành'
    case 'pending': return 'Đang xử lý'
    case 'failed': return 'Thất bại'
    default: return status
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const updatePaymentStatus = (id, status) => {
  adminStore.updatePaymentStatus(id, status)
}

const viewPaymentDetails = (payment) => {
  // Implement view details functionality
  alert(`Chi tiết thanh toán:\n\nThành viên: ${payment.memberName}\nGói: ${payment.membership}\nSố tiền: ${formatCurrency(payment.amount)}\nNgày: ${formatDate(payment.date)}\nPhương thức: ${payment.method}\nTrạng thái: ${getStatusText(payment.status)}`)
}

const deletePayment = (id) => {
  if (confirm('Bạn có chắc muốn xóa thanh toán này?')) {
    adminStore.deletePayment(id)
  }
}

const savePayment = () => {
  const member = adminStore.members.find(m => m.id === paymentForm.value.memberId)
  if (!member) return

  const newPayment = {
    memberId: paymentForm.value.memberId,
    memberName: member.name,
    memberEmail: member.email,
    membership: paymentForm.value.membership,
    amount: paymentForm.value.amount,
    date: new Date().toISOString().split('T')[0],
    method: paymentForm.value.method,
    status: 'pending'
  }

  adminStore.addPayment(newPayment)
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  paymentForm.value = {
    memberId: '',
    membership: 'Basic',
    amount: 0,
    method: 'Cash'
  }
}
</script>