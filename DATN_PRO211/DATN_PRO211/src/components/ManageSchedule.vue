<template>
  <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold text-gray-900">Lịch tập</h2>
        <button
          v-if="canEditSchedule"
          @click="showAddForm = true"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Thêm lịch tập mới
        </button>
      </div>

    <!-- Filters -->
    <div class="flex gap-4 flex-wrap">
      <select
        v-model="filterClass"
        class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Tất cả lớp --</option>
        <option value="fitness">Fitness</option>
        <option value="yoga">Yoga</option>
        <option value="boxing">Boxing</option>
        <option value="swimming">Swimming</option>
        <option value="aerobics">Aerobics</option>
      </select>

      <select
        v-model="filterDay"
        class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Tất cả thứ --</option>
        <option value="monday">Thứ 2</option>
        <option value="tuesday">Thứ 3</option>
        <option value="wednesday">Thứ 4</option>
        <option value="thursday">Thứ 5</option>
        <option value="friday">Thứ 6</option>
        <option value="saturday">Thứ 7</option>
        <option value="sunday">Chủ nhật</option>
      </select>
    </div>

    <!-- Add/Edit Form Modal -->
    <div v-if="showAddForm || editingSchedule" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <h3 class="text-2xl font-bold mb-6">
          {{ editingSchedule ? 'Sửa lịch tập' : 'Thêm lịch tập mới' }}
        </h3>
        
        <form @submit.prevent="saveSchedule" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Tên lớp</label>
            <input
              v-model="formData.className"
              type="text"
              required
              placeholder="VD: Fitness sáng"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Loại tập</label>
            <select
              v-model="formData.type"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            >
              <option value="">-- Chọn loại tập --</option>
              <option value="fitness">Fitness</option>
              <option value="yoga">Yoga</option>
              <option value="boxing">Boxing</option>
              <option value="swimming">Swimming</option>
              <option value="aerobics">Aerobics</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Ngày tập</label>
            <select
              v-model="formData.day"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            >
              <option value="">-- Chọn thứ --</option>
              <option value="monday">Thứ 2</option>
              <option value="tuesday">Thứ 3</option>
              <option value="wednesday">Thứ 4</option>
              <option value="thursday">Thứ 5</option>
              <option value="friday">Thứ 6</option>
              <option value="saturday">Thứ 7</option>
              <option value="sunday">Chủ nhật</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Thời gian bắt đầu</label>
              <input
                v-model="formData.startTime"
                type="time"
                required
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Thời gian kết thúc</label>
              <input
                v-model="formData.endTime"
                type="time"
                required
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Huấn luyện viên</label>
            <select
              v-model="formData.trainer"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            >
              <option value="">-- Chọn huấn luyện viên --</option>
              <option v-for="trainer in getAllTrainers()" :key="trainer.id" :value="trainer.id">
                {{ trainer.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Sức chứa</label>
            <input
              v-model.number="formData.capacity"
              type="number"
              required
              min="1"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div v-if="formError" class="text-red-600 text-sm">{{ formError }}</div>

          <div class="flex gap-4 mt-6">
            <button
              type="submit"
              class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {{ editingSchedule ? 'Cập nhật' : 'Thêm' }}
            </button>
            <button
              type="button"
              @click="resetForm"
              class="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Schedule Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-200 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên lớp</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Loại</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thời gian</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Huấn luyện viên</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sức chứa</th>
            <th v-if="canEditSchedule" class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành động</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="schedule in displaySchedules" :key="schedule.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-900 font-medium">{{ schedule.className }}</td>
            <td class="px-6 py-4">
              <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {{ schedule.type }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ getDayName(schedule.day) }}</td>
            <td class="px-6 py-4 text-gray-600">{{ schedule.startTime }} - {{ schedule.endTime }}</td>
            <td class="px-6 py-4 text-gray-600">{{ getTrainerName(schedule.trainer) }}</td>
            <td class="px-6 py-4 text-gray-600">{{ schedule.capacity }} người</td>
            <td v-if="canEditSchedule" class="px-6 py-4 space-x-2">
              <button
                @click="startEdit(schedule)"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                ✏️ Sửa
              </button>
              <button
                @click="deleteSchedule(schedule.id)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                🗑️ Xóa
              </button>
            </td>
          </tr>
          <tr v-if="displaySchedules.length === 0">
            <td :colspan="canEditSchedule ? 7 : 6" class="px-6 py-8 text-center text-gray-500">
              Không có lịch tập nào
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { authStore } from '../stores/authStore';

export default {
  name: 'ManageSchedule',
  setup() {
    // State
    const schedules = ref([]);
    const filterClass = ref('');
    const filterDay = ref('');
    const showAddForm = ref(false);
    const editingSchedule = ref(null);
    const formError = ref('');
    const formData = ref({
      className: '',
      type: '',
      day: '',
      startTime: '',
      endTime: '',
      trainer: '',
      capacity: 20
    });

    // Permissions
    const canEditSchedule = computed(() => authStore.canAccess('edit-schedule'));

    // Load schedules
    const loadSchedules = () => {
      schedules.value = JSON.parse(localStorage.getItem('schedules') || '[]');
    };
    loadSchedules();

    // Displayed schedules
    const displaySchedules = computed(() => {
      let result = schedules.value;
      if (filterClass.value) {
        result = result.filter(s => s.type === filterClass.value);
      }
      if (filterDay.value) {
        result = result.filter(s => s.day === filterDay.value);
      }
      const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      return result.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
    });

    // Trainer helpers
    const getAllTrainers = () => authStore.getAllTrainers();
    const getTrainerName = (trainerId) => {
      const trainer = authStore.getAllTrainers().find(t => t.id === trainerId);
      return trainer?.name || 'N/A';
    };

    // Day name
    const getDayName = (day) => {
      const dayNames = {
        monday: 'Thứ 2',
        tuesday: 'Thứ 3',
        wednesday: 'Thứ 4',
        thursday: 'Thứ 5',
        friday: 'Thứ 6',
        saturday: 'Thứ 7',
        sunday: 'Chủ nhật'
      };
      return dayNames[day] || day;
    };

    // Save to storage
    const saveToStorage = () => {
      localStorage.setItem('schedules', JSON.stringify(schedules.value));
    };

    // Reset form
    const resetForm = () => {
      showAddForm.value = false;
      editingSchedule.value = null;
      formError.value = '';
      formData.value = {
        className: '',
        type: '',
        day: '',
        startTime: '',
        endTime: '',
        trainer: '',
        capacity: 20
      };
    };

    // Edit
    const startEdit = (schedule) => {
      editingSchedule.value = schedule;
      formData.value = { ...schedule };
      showAddForm.value = false;
    };

    // Save
    const saveSchedule = async () => {
      if (!formData.value.className || !formData.value.type || !formData.value.day ||
          !formData.value.startTime || !formData.value.endTime || !formData.value.trainer) {
        formError.value = 'Vui lòng điền đầy đủ thông tin';
        return;
      }
      if (editingSchedule.value) {
        const index = schedules.value.findIndex(s => s.id === editingSchedule.value.id);
        if (index !== -1) {
          schedules.value[index] = { ...editingSchedule.value, ...formData.value };
        }
      } else {
        const newSchedule = {
          id: 'schedule' + Date.now(),
          ...formData.value,
          createdAt: new Date().toISOString()
        };
        schedules.value.push(newSchedule);
      }
      saveToStorage();
      loadSchedules();
      resetForm();
    };

    // Delete
    const deleteSchedule = (scheduleId) => {
      if (confirm('Bạn chắc chắn muốn xóa lịch tập này?')) {
        schedules.value = schedules.value.filter(s => s.id !== scheduleId);
        saveToStorage();
        loadSchedules();
      }
    };

    // Watch for changes
    watch([filterClass, filterDay], () => {
      // No-op, triggers recompute
    });

    return {
      schedules,
      filterClass,
      filterDay,
      showAddForm,
      editingSchedule,
      formData,
      formError,
      canEditSchedule,
      displaySchedules,
      getAllTrainers,
      getTrainerName,
      getDayName,
      resetForm,
      startEdit,
      saveSchedule,
      deleteSchedule
    };
  }
};
</script>
