<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal glass-card">
        <div class="modal-header">
          <div class="modal-title-wrap">
            <img src="https://pub-b1ca55f26b8c4b68bed9070080a97700.r2.dev/subprice.jpg" alt="Logo" class="modal-logo" />
            <h3>{{ activeTab === 'price' ? '📝 提交价格数据' : '💡 提交产品需求' }}</h3>
          </div>
          <button class="modal-close" @click="$emit('close')">✕</button>
        </div>

        <!-- Tab switcher -->
        <div class="modal-tabs">
          <button class="modal-tab" :class="{ active: activeTab === 'price' }" @click="switchTab('price')">
            <span>📝</span> 价格纠错
          </button>
          <button class="modal-tab" :class="{ active: activeTab === 'request' }" @click="switchTab('request')">
            <span>💡</span> 产品需求
          </button>
        </div>

        <!-- Price submission tab -->
        <div v-if="activeTab === 'price'">
          <p v-if="form.productId && form.countryId" class="modal-desc context-box">
            📍 正在为 <strong>{{ availableProducts.find(p => p.id === form.productId)?.name }}</strong> 的 <strong>{{ countries.find(c => c.id === form.countryId)?.nameZh }}</strong> 区域纠错
          </p>
          <p v-else class="modal-desc">发现价格不对？提交正确价格，审核通过后自动更新。</p>
          <div class="form-grid">
            <div class="form-row">
              <label>分类</label>
              <select v-model="form.category">
                <option v-for="(cat, key) in categories" :key="key" :value="key">
                  {{ cat.icon }} {{ locale === 'zh' ? cat.labelZh : cat.label }}
                </option>
              </select>
            </div>

            <div class="form-row">
              <label>产品</label>
              <select v-model="form.productId">
                <option value="">选择产品</option>
                <option v-for="p in availableProducts" :key="p.id" :value="p.id">{{ p.icon }} {{ p.name }}</option>
              </select>
            </div>

            <div class="form-row">
              <label>国家</label>
              <select v-model="form.countryId">
                <option value="">选择国家</option>
                <option v-for="c in countries" :key="c.id" :value="c.id">{{ c.flag }} {{ c.nameZh }}</option>
              </select>
            </div>

            <div class="form-row">
              <label>本地价格</label>
              <input v-model="form.local" type="text" placeholder="如: ¥120 / 月 或 $19.99" />
            </div>

            <div class="form-row">
              <label>人民币价格 (CNY)</label>
              <input v-model.number="form.cny" type="number" step="0.01" placeholder="如: 120" />
            </div>

            <div class="form-row full">
              <label>备注 (可选)</label>
              <input v-model="form.submitterNote" type="text" placeholder="数据来源、备注说明..." />
            </div>
          </div>
        </div>

        <!-- Product request tab -->
        <div v-if="activeTab === 'request'">
          <p class="modal-desc">没找到你想比价的产品？提交需求，我们会尽快添加！</p>
          <div class="form-grid">
            <div class="form-row full">
              <label>产品名称 <span class="required">*</span></label>
              <input v-model="requestForm.productName" type="text" placeholder="如: Adobe Creative Cloud, Notion..." />
            </div>

            <div class="form-row">
              <label>所属类别</label>
              <select v-model="requestForm.category">
                <option value="">不确定</option>
                <option v-for="(cat, key) in categories" :key="key" :value="key">
                  {{ cat.icon }} {{ locale === 'zh' ? cat.labelZh : cat.label }}
                </option>
              </select>
            </div>

            <div class="form-row">
              <label>官网链接 (可选)</label>
              <input v-model="requestForm.website" type="url" placeholder="https://..." />
            </div>

            <div class="form-row full">
              <label>补充说明 (可选)</label>
              <textarea v-model="requestForm.note" placeholder="为什么需要这个产品？有哪些国家的价差比较大？" rows="3"></textarea>
            </div>
          </div>
        </div>

        <div v-if="message" class="submit-msg" :class="{ error: isError }">{{ message }}</div>

        <div class="form-actions">
          <button class="cancel" @click="$emit('close')">取消</button>
          <button class="confirm" @click="handleSubmit" :disabled="submitting">
            <span v-if="submitting" class="btn-spinner"></span>
            {{ submitting ? '提交中...' : (activeTab === 'price' ? '提交价格' : '提交需求') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  form: Object,
  categories: Object,
  availableProducts: Array,
  countries: Array,
  locale: String,
  message: String,
  isError: Boolean,
  submitting: Boolean
})

const emit = defineEmits(['close', 'submit', 'submit-request'])

const activeTab = ref('price')
const requestForm = ref({
  productName: '',
  category: '',
  website: '',
  note: ''
})

function switchTab(tab) {
  activeTab.value = tab
}

function handleSubmit() {
  if (activeTab.value === 'price') {
    emit('submit')
  } else {
    emit('submit-request', { ...requestForm.value })
  }
}

watch(() => props.show, (val) => {
  if (!val) {
    requestForm.value = { productName: '', category: '', website: '', note: '' }
    activeTab.value = 'price'
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
  backdrop-filter: blur(8px); padding: 20px;
}
.modal {
  background: var(--surface);
  border-radius: var(--radius-xl); padding: 28px; width: 100%; max-width: 520px;
  max-height: 90vh; overflow-y: auto;
  box-shadow: 0 32px 64px rgba(0,0,0,0.4);
}

.light .modal {
  box-shadow: 0 16px 48px rgba(15, 17, 82, 0.15);
}

.modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.modal-title-wrap { display: flex; align-items: center; gap: 12px; }
.modal-logo { width: 36px; height: 36px; border-radius: 10px; object-fit: cover; border: 1px solid var(--border); }
.modal h3 { font-family: var(--font-sans); font-size: 18px; font-weight: 800; color: var(--accent-text); }
.modal-close {
  width: 32px; height: 32px; border-radius: 10px; border: 1px solid var(--border);
  background: transparent; color: var(--muted); cursor: pointer; font-size: 12px;
  display: flex; align-items: center; justify-content: center; transition: all var(--transition-fast);
}
.modal-close:hover { border-color: var(--danger); color: var(--danger); background: rgba(255,77,106,0.06); }

/* Tabs */
.modal-tabs {
  display: flex; gap: 6px; margin-bottom: 24px;
  background: var(--pill-bg); border: 1px solid var(--border);
  border-radius: 14px; padding: 5px;
}
.modal-tab {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 10px; border-radius: 10px; border: none;
  background: transparent; color: var(--muted);
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all var(--transition-med); font-family: var(--font-sans);
}
.modal-tab.active {
  background: var(--card-solid); color: var(--text); font-weight: 700;
  box-shadow: var(--shadow-sm);
}

.light .modal-tab.active {
  background: var(--surface);
  color: var(--text);
}

.modal-desc { font-size: 13px; color: var(--muted2); margin-bottom: 24px; line-height: 1.6; }
.modal-desc.context-box {
  background: var(--accent-dim);
  color: var(--text-secondary);
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid var(--border-accent);
}
.modal-desc.context-box strong { color: var(--accent-text); }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-row { display: flex; flex-direction: column; }
.form-row.full { grid-column: 1 / -1; }
.form-row label {
  font-size: 11px; color: var(--muted); margin-bottom: 8px;
  text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;
}
.required { color: var(--danger); }
.form-row select, .form-row input, .form-row textarea {
  padding: 12px 14px;
  background: var(--input-bg); border: 1px solid var(--border2); border-radius: 12px;
  color: var(--text); font-size: 14px; font-family: var(--font-sans); outline: none;
  transition: all var(--transition-fast); -webkit-appearance: none;
}
.form-row textarea { resize: vertical; min-height: 100px; line-height: 1.6; }
.form-row select:focus, .form-row input:focus, .form-row textarea:focus {
  border-color: var(--accent); box-shadow: 0 0 0 3px var(--glow);
  background: var(--card-solid);
}
.form-row input::placeholder, .form-row textarea::placeholder { color: var(--muted); opacity: 0.6; }
.form-row select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b8b9b' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 14px center; padding-right: 40px;
}

.submit-msg { font-size: 13px; padding: 12px 16px; border-radius: 12px; margin: 18px 0 0; font-weight: 600; }
.submit-msg { background: var(--accent-dim); color: var(--accent-text); border: 1px solid var(--border-accent); }
.submit-msg.error { background: rgba(255,77,106,0.1); color: var(--danger); border-color: rgba(255,77,106,0.2); }

.form-actions { display: flex; gap: 12px; margin-top: 28px; justify-content: flex-end; }
.cancel {
  padding: 12px 24px; background: transparent; border: 1px solid var(--border2);
  color: var(--muted); border-radius: 12px; cursor: pointer; font-size: 14px;
  font-weight: 600; transition: all var(--transition-fast);
}
.cancel:hover { border-color: var(--muted); color: var(--text); background: var(--pill-bg); }

.confirm {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 28px; background: linear-gradient(135deg, var(--accent), #00c4e8);
  border: none; color: #000; border-radius: 12px; cursor: pointer;
  font-weight: 700; font-size: 14px;
  transition: all var(--transition-med); box-shadow: 0 4px 16px var(--glow-strong);
}

.light .confirm {
  background: linear-gradient(135deg, #00c48c, #00a0c4);
  color: #fff;
  box-shadow: 0 4px 16px rgba(0, 160, 120, 0.2);
}

.confirm:hover { transform: translateY(-1px); box-shadow: 0 6px 24px var(--glow-strong); }
.confirm:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.btn-spinner {
  width: 16px; height: 16px; border: 2.5px solid rgba(0,0,0,0.15); border-top-color: #000;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}

.light .btn-spinner { border-color: rgba(255,255,255,0.3); border-top-color: #fff; }

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 540px) {
  .form-grid { grid-template-columns: 1fr; gap: 12px; }
  .modal { padding: 24px 20px; border-radius: var(--radius-lg); }
  .form-actions { flex-direction: column-reverse; }
  .confirm, .cancel { width: 100%; justify-content: center; }
}
</style>
