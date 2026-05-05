<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal">
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

// Reset message on tab switch
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

// Reset request form when modal closes
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
  background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
  backdrop-filter: blur(6px); padding: 20px;
}
.modal {
  background: var(--surface); border: 1px solid var(--border2);
  border-radius: 22px; padding: 28px; width: 100%; max-width: 520px;
  max-height: 90vh; overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0,0,0,0.4);
}
.modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.modal-title-wrap { display: flex; align-items: center; gap: 12px; }
.modal-logo { width: 36px; height: 36px; border-radius: 10px; object-fit: cover; border: 1px solid var(--border); }
.modal h3 { font-family: var(--font-sans); font-size: 18px; font-weight: 800; color: var(--accent); }
.modal-close {
  width: 28px; height: 28px; border-radius: 8px; border: 1px solid var(--border);
  background: transparent; color: var(--muted); cursor: pointer; font-size: 12px;
  display: flex; align-items: center; justify-content: center; transition: all 0.15s;
}
.modal-close:hover { border-color: var(--danger); color: var(--danger); background: rgba(255,77,106,0.06); }

/* Tabs */
.modal-tabs {
  display: flex; gap: 6px; margin-bottom: 20px;
  background: var(--card); border: 1px solid var(--border);
  border-radius: 12px; padding: 4px;
}
.modal-tab {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;
  padding: 8px 12px; border-radius: 9px; border: none;
  background: transparent; color: var(--muted);
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: all 0.2s; font-family: var(--font-sans);
}
.modal-tab.active {
  background: var(--accent); color: #000; font-weight: 700;
  box-shadow: 0 2px 10px var(--glow-strong);
}

.modal-desc { font-size: 12px; color: var(--muted2); margin-bottom: 22px; line-height: 1.6; }
.modal-desc.context-box {
  background: var(--accent-dim);
  color: var(--text);
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-accent);
}
.modal-desc.context-box strong { color: var(--accent); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-row { display: flex; flex-direction: column; }
.form-row.full { grid-column: 1 / -1; }
.form-row label {
  font-size: 11px; color: var(--muted); margin-bottom: 6px;
  text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
}
.required { color: var(--danger); }
.form-row select, .form-row input, .form-row textarea {
  padding: 11px 13px;
  background: var(--input-bg); border: 1px solid var(--border); border-radius: 11px;
  color: var(--text); font-size: 13px; font-family: var(--font-sans); outline: none;
  transition: all 0.2s; -webkit-appearance: none;
}
.form-row textarea {
  resize: vertical; min-height: 80px; line-height: 1.5;
}
.form-row select:focus, .form-row input:focus, .form-row textarea:focus {
  border-color: var(--accent); box-shadow: 0 0 0 3px var(--glow);
}
.form-row input::placeholder, .form-row textarea::placeholder { color: var(--muted); }
.form-row select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b80' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px;
}
.submit-msg { font-size: 12px; padding: 10px 14px; border-radius: 10px; margin: 14px 0 0; }
.submit-msg { background: rgba(0,229,160,0.1); color: var(--accent); }
.submit-msg.error { background: rgba(255,77,106,0.1); color: var(--danger); }
.form-actions { display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end; }
.cancel {
  padding: 10px 20px; background: transparent; border: 1px solid var(--border);
  color: var(--muted); border-radius: 11px; cursor: pointer; font-size: 13px;
  font-weight: 600; transition: all 0.15s;
}
.cancel:hover { border-color: var(--muted); color: var(--text); }
.confirm {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 24px; background: linear-gradient(135deg, var(--accent), #00c4e8);
  border: none; color: #000; border-radius: 11px; cursor: pointer;
  font-weight: 700; font-size: 13px;
  transition: all 0.2s; box-shadow: 0 4px 16px rgba(0,229,160,0.3);
}
.confirm:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(0,229,160,0.4); }
.confirm:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.btn-spinner {
  width: 14px; height: 14px; border: 2px solid rgba(0,0,0,0.2); border-top-color: #000;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 540px) {
  .form-grid { grid-template-columns: 1fr; }
  .modal { padding: 22px 18px; border-radius: 18px; }
}
</style>
