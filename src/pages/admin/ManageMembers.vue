<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bebas text-gym-red">Quản lý thành viên</h1>
      <button
        @click="showAddModal = true"
        class="bg-gym-red hover:bg-gym-orange text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <i class="fas fa-plus mr-2"></i>Thêm thành viên
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="bg-gym-dark-secondary p-4 rounded-lg border border-gym-red/20">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm thành viên..."
            class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white placeholder-gym-text-secondary focus:border-gym-red focus:outline-none"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="statusFilter"
            class="px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
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

    <!-- Members Table -->
    <div class="bg-gym-dark-secondary rounded-lg border border-gym-red/20 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gym-dark">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Thành viên</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Liên hệ</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Gói</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Ngày tham gia</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Thanh toán cuối</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gym-text-secondary uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gym-red/10">
            <tr v-for="member in filteredMembers" :key="member.id" class="hover:bg-gym-dark">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gym-red rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-user text-white"></i>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-white">{{ member.name }}</div>
                    <div class="text-sm text-gym-text-secondary">{{ member.trainer }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-white">{{ member.email }}</div>
                <div class="text-sm text-gym-text-secondary">{{ member.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getMembershipBadgeClass(member.membership)">
                  {{ member.membership }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="member.status === 'active' ? 'bg-gym-green/20 text-gym-green' : 'bg-gray-500/20 text-gray-400'">
                  {{ member.status === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gym-text-secondary">
                {{ formatDate(member.joinDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gym-text-secondary">
                {{ formatDate(member.lastPayment) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editMember(member)"
                    class="text-gym-blue hover:text-gym-blue/80 transition-colors"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deleteMember(member.id)"
                    class="text-red-400 hover:text-red-300 transition-colors"
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

    <!-- Add/Edit Member Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-gym-dark-secondary p-6 rounded-lg border border-gym-red/20 w-full max-w-md">
        <h3 class="text-xl font-oswald text-white mb-4">
          {{ showEditModal ? 'Chỉnh sửa thành viên' : 'Thêm thành viên mới' }}
        </h3>

        <form @submit.prevent="saveMember" class="space-y-4">
          <div>
            <label class="block text-gym-text font-medium mb-2">Họ và tên</label>
            <input
              v-model="memberForm.name"
              type="text"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Email</label>
            <input
              v-model="memberForm.email"
              type="email"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Số điện thoại</label>
            <input
              v-model="memberForm.phone"
              type="tel"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Gói thành viên</label>
            <select
              v-model="memberForm.membership"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Elite">Elite</option>
            </select>
          </div>

          <div>
            <label class="block text-gym-text font-medium mb-2">Huấn luyện viên</label>
            <select
              v-model="memberForm.trainer"
              required
              class="w-full px-4 py-2 bg-gym-dark border border-gym-red/20 rounded-lg text-white focus:border-gym-red focus:outline-none"
            >
              <option v-for="trainer in adminStore.trainers" :key="trainer.id" :value="trainer.name">
                {{ trainer.name }}
              </option>
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
              {{ showEditModal ? 'Cập nhật' : 'Thêm' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/adminStore'

const adminStore = useAdminStore()

const searchQuery = ref('')
const statusFilter = ref('')
const membershipFilter = ref('')
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingMember = ref(null)

const memberForm = ref({
  name: '',
  email: '',
  phone: '',
  membership: 'Basic',
  trainer: ''
})

const filteredMembers = computed(() => {
  return adminStore.members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || member.status === statusFilter.value
    const matchesMembership = !membershipFilter.value || member.membership === membershipFilter.value

    return matchesSearch && matchesStatus && matchesMembership
  })
})

const getMembershipBadgeClass = (membership) => {
  switch (membership) {
    case 'Basic': return 'bg-blue-500/20 text-blue-400'
    case 'Pro': return 'bg-gym-red/20 text-gym-red'
    case 'Elite': return 'bg-gym-orange/20 text-gym-orange'
    default: return 'bg-gray-500/20 text-gray-400'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const editMember = (member) => {
  editingMember.value = member
  memberForm.value = { ...member }
  showEditModal.value = true
}

const deleteMember = (id) => {
  if (confirm('Bạn có chắc muốn xóa thành viên này?')) {
    adminStore.deleteMember(id)
  }
}

const saveMember = () => {
  if (showEditModal.value) {
    adminStore.updateMember(editingMember.value.id, memberForm.value)
  } else {
    adminStore.addMember(memberForm.value)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingMember.value = null
  memberForm.value = {
    name: '',
    email: '',
    phone: '',
    membership: 'Basic',
    trainer: ''
  }
}

onMounted(() => {
  // Set default trainer if available
  if (adminStore.trainers.length > 0) {
    memberForm.value.trainer = adminStore.trainers[0].name
  }
})
</script>