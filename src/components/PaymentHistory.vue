<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">💳 Lịch Sử Thanh Toán</h1>
        <p class="text-gray-600">Xem lịch sử đóng tiền và tải xuống hóa đơn của bạn</p>
      </div>

      <!-- Payment Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow p-6 text-white hover:shadow-lg transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-indigo-100 text-sm mb-1">Đã thanh toán tháng này</p>
              <p class="text-3xl font-bold">500.000đ</p>
              <p class="text-indigo-100 text-sm mt-2">Gói Premium</p>
            </div>
            <div class="text-4xl">💰</div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white hover:shadow-lg transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-green-100 text-sm mb-1">Tổng đã thanh toán năm nay</p>
              <p class="text-3xl font-bold">3.500.000đ</p>
              <p class="text-green-100 text-sm mt-2">7 tháng sử dụng</p>
            </div>
            <div class="text-4xl">✓</div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white hover:shadow-lg transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-orange-100 text-sm mb-1">Tiếp theo cần thanh toán</p>
              <p class="text-3xl font-bold">13/03/2026</p>
              <p class="text-orange-100 text-sm mt-2">Còn 28 ngày</p>
            </div>
            <div class="text-4xl">📅</div>
          </div>
        </div>
      </div>

      <!-- Filters & Export -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h2 class="text-xl font-bold text-gray-900">📋 Lịch sử thanh toán</h2>
          <div class="flex gap-2">
            <button
              @click="exportAsCSV"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
            >
              📥 Xuất CSV
            </button>
            <button
              @click="exportAsExcel"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              📊 Xuất Excel
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Lọc theo trạng thái</label>
            <select
              v-model="filterStatus"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Tất cả</option>
              <option value="paid">Đã thanh toán</option>
              <option value="pending">Chờ thanh toán</option>
              <option value="failed">Thanh toán thất bại</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tìm kiếm</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm invoice #..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Payment Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-100 border-b border-gray-200">
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Invoice #</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày thanh toán</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gói</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số tiền</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phương thức</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="payment in filteredPayments"
                :key="payment.id"
                class="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td class="px-6 py-4 text-sm font-semibold text-indigo-600">
                  {{ payment.invoiceNo }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ formatDate(payment.date) }}
                </td>
                <td class="px-6 py-4 text-sm">
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {{ payment.package }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-gray-900">
                  {{ formatCurrency(payment.amount) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ payment.method }}
                </td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="{
                      'bg-green-100 text-green-800': payment.status === 'paid',
                      'bg-yellow-100 text-yellow-800': payment.status === 'pending',
                      'bg-red-100 text-red-800': payment.status === 'failed'
                    }"
                    class="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                  >
                    {{ getStatusLabel(payment.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <button
                    @click="downloadInvoice(payment)"
                    class="text-indigo-600 hover:text-indigo-800 font-semibold mr-3"
                  >
                    📥
                  </button>
                  <button
                    @click="viewDetails(payment)"
                    class="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    👁️
                  </button>
                </td>
              </tr>
              <tr v-if="filteredPayments.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                  Không có dữ liệu thanh toán
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Invoice Detail Modal -->
      <div v-if="selectedPayment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Invoice Header -->
          <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-8">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h2 class="text-3xl font-bold mb-2">HÓA ĐƠN</h2>
                <p class="text-indigo-200">#{{ selectedPayment.invoiceNo }}</p>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold">{{ formatCurrency(selectedPayment.amount) }}</p>
                <p class="text-indigo-200 mt-1">Ngày: {{ formatDate(selectedPayment.date) }}</p>
              </div>
            </div>
          </div>

          <!-- Invoice Body -->
          <div class="p-8">
            <!-- Business Info -->
            <div class="mb-8 pb-8 border-b border-gray-200">
              <h3 class="text-lg font-bold text-gray-900 mb-3">Gym Fitness Center</h3>
              <p class="text-gray-600">📍 123 Đường ABC, Quận 1, TP. HCM</p>
              <p class="text-gray-600">📞 1900 123 456</p>
              <p class="text-gray-600">📧 billing@gym.com</p>
            </div>

            <!-- Customer Info -->
            <div class="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Hóa đơn cho:</h4>
                <p class="text-gray-600">Hội viên</p>
                <p class="text-gray-600">member@gym.com</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Chi tiết:</h4>
                <p class="text-gray-600">Ngày tạo: {{ formatDate(selectedPayment.date) }}</p>
                <p class="text-gray-600">Ngày hết hạn: {{ formatDate(addDays(selectedPayment.date, 30)) }}</p>
              </div>
            </div>

            <!-- Items -->
            <div class="mb-8">
              <table class="w-full">
                <thead>
                  <tr class="bg-gray-100 border-b-2 border-gray-200">
                    <th class="text-left px-4 py-2 text-sm font-semibold text-gray-700">Mô tả</th>
                    <th class="text-right px-4 py-2 text-sm font-semibold text-gray-700">Số lượng</th>
                    <th class="text-right px-4 py-2 text-sm font-semibold text-gray-700">Giá</th>
                    <th class="text-right px-4 py-2 text-sm font-semibold text-gray-700">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200">
                    <td class="px-4 py-3 text-sm text-gray-900">
                      Gói {{ selectedPayment.package }} - 1 tháng
                    </td>
                    <td class="text-right px-4 py-3 text-sm text-gray-600">1</td>
                    <td class="text-right px-4 py-3 text-sm text-gray-900 font-semibold">
                      {{ formatCurrency(selectedPayment.amount) }}
                    </td>
                    <td class="text-right px-4 py-3 text-sm text-gray-900 font-semibold">
                      {{ formatCurrency(selectedPayment.amount) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Totals -->
            <div class="flex justify-end mb-8">
              <div class="w-64">
                <div class="flex justify-between py-2 border-b border-gray-200">
                  <span class="text-gray-600">Subtotal:</span>
                  <span class="text-gray-900 font-semibold">{{ formatCurrency(selectedPayment.amount) }}</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-200">
                  <span class="text-gray-600">VAT (10%):</span>
                  <span class="text-gray-900 font-semibold">{{ formatCurrency(selectedPayment.amount * 0.1) }}</span>
                </div>
                <div class="flex justify-between py-3 bg-gray-100 px-3 rounded mt-2">
                  <span class="text-gray-900 font-bold">Tổng cộng:</span>
                  <span class="text-indigo-600 font-bold text-lg">
                    {{ formatCurrency(selectedPayment.amount * 1.1) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div class="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
              <p class="text-sm text-blue-800">
                ✓ Cảm ơn bạn đã tin tưởng Gym Fitness Center. Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.
              </p>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="bg-gray-50 p-6 flex justify-end gap-3 border-t border-gray-200">
            <button
              @click="printInvoice"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              🖨️ In
            </button>
            <button
              @click="downloadInvoiceAsPDF"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              📄 Tải PDF
            </button>
            <button
              @click="selectedPayment = null"
              class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentHistory',
  data() {
    return {
      filterStatus: '',
      searchQuery: '',
      selectedPayment: null,
      payments: [
        {
          id: 1,
          invoiceNo: 'INV-2026-001',
          date: '2026-02-13',
          package: 'Premium',
          amount: 500000,
          method: 'Credit Card',
          status: 'paid'
        },
        {
          id: 2,
          invoiceNo: 'INV-2026-002',
          date: '2026-01-13',
          package: 'Premium',
          amount: 500000,
          method: 'Bank Transfer',
          status: 'paid'
        },
        {
          id: 3,
          invoiceNo: 'INV-2025-012',
          date: '2025-12-13',
          package: 'Premium',
          amount: 500000,
          method: 'Credit Card',
          status: 'paid'
        },
        {
          id: 4,
          invoiceNo: 'INV-2025-011',
          date: '2025-11-13',
          package: 'Basic',
          amount: 300000,
          method: 'Cash',
          status: 'paid'
        },
        {
          id: 5,
          invoiceNo: 'INV-2025-010',
          date: '2025-10-13',
          package: 'Basic',
          amount: 300000,
          method: 'Bank Transfer',
          status: 'paid'
        }
      ]
    }
  },
  computed: {
    filteredPayments() {
      return this.payments.filter(p => {
        if (this.filterStatus && p.status !== this.filterStatus) return false
        if (this.searchQuery && !p.invoiceNo.toLowerCase().includes(this.searchQuery.toLowerCase())) return false
        return true
      })
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
    },
    getStatusLabel(status) {
      const labels = {
        paid: '✓ Đã thanh toán',
        pending: '⏳ Chờ thanh toán',
        failed: '✕ Thanh toán thất bại'
      }
      return labels[status] || status
    },
    viewDetails(payment) {
      this.selectedPayment = payment
    },
    downloadInvoice(payment) {
      alert(`Tải xuống invoice #${payment.invoiceNo}`)
    },
    downloadInvoiceAsPDF() {
      alert('Chức năng PDF sẽ hoạt động khi có backend')
    },
    printInvoice() {
      window.print()
    },
    exportAsCSV() {
      const headers = ['Invoice #', 'Ngày thanh toán', 'Gói', 'Số tiền', 'Phương thức', 'Trạng thái']
      const rows = this.filteredPayments.map(p => [
        p.invoiceNo,
        this.formatDate(p.date),
        p.package,
        p.amount,
        p.method,
        p.status
      ])

      let csv = headers.join(',') + '\n'
      rows.forEach(row => {
        csv += row.join(',') + '\n'
      })

      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
      element.setAttribute('download', 'payment_history.csv')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    exportAsExcel() {
      alert('Chức năng Excel sẽ hoạt động khi có backend')
    },
    addDays(dateStr, days) {
      const date = new Date(dateStr)
      date.setDate(date.getDate() + days)
      return date.toISOString().split('T')[0]
    }
  }
}
</script>
