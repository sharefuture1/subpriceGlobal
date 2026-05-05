<template>
  <div class="app" :class="configStore.theme">
    <!-- Animated background -->
    <div class="bg-animation">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    <div class="grid-overlay"></div>

    <TopNav
      :theme="configStore.theme"
      :locale="configStore.locale"
      @open-submit="openSubmitModal"
      @toggle-theme="configStore.toggleTheme"
      @toggle-locale="configStore.toggleLocale"
    />

    <main class="container">
      <AppHeader :dataSource="productStore.dataSource" />

      <CategoryTabs
        :categories="CATEGORIES"
        :currentCat="productStore.currentCat"
        @update:currentCat="productStore.setCategory"
        :locale="configStore.locale"
      />

      <ProductTabs
        :products="productStore.filteredProducts"
        v-model:currentProduct="productStore.currentProduct"
      />

      <!-- Billing toggle -->
      <section class="billing-row" aria-label="Billing Cycle Toggle">
        <div class="billing-toggle">
          <span :class="{ dim: productStore.annualMode }">{{ t('billing.monthly') }}</span>
          <div 
            class="toggle-pill" 
            :class="{ on: productStore.annualMode }" 
            @click="productStore.annualMode = !productStore.annualMode"
            role="switch"
            :aria-checked="productStore.annualMode"
            aria-label="Annual Billing Toggle"
          >
            <div class="toggle-knob"></div>
          </div>
          <span :class="{ dim: !productStore.annualMode }">{{ t('billing.annual') }}</span>
        </div>
        <transition name="fade"><span v-if="productStore.annualMode" class="save-chip">省 17%</span></transition>
      </section>

      <PriceSummary :summary="productStore.summary" />

      <!-- Search -->
      <section class="search-wrap" aria-label="Search Products">
        <span class="search-icon" aria-hidden="true">🔍</span>
        <input 
          v-model="productStore.searchQuery" 
          type="text" 
          :placeholder="t('search.placeholder')" 
          class="search-input"
          aria-label="Search through products"
        />
        <button 
          v-if="productStore.searchQuery" 
          class="search-clear" 
          @click="productStore.searchQuery = ''"
          aria-label="Clear search"
        >✕</button>
      </section>

      <!-- Sort -->
      <nav class="sort-bar" aria-label="Sort options">
        <button
          v-for="s in sortOptions"
          :key="s.key"
          class="sort-btn"
          :class="{ active: productStore.currentSort === s.key }"
          @click="productStore.currentSort = s.key"
          :aria-pressed="productStore.currentSort === s.key"
        >{{ s.label }}</button>
      </nav>

      <!-- Loading -->
      <div v-if="productStore.loading" class="price-list" aria-live="polite">
        <SkeletonItem v-for="i in 5" :key="i" />
      </div>

      <!-- Price list -->
      <transition name="list-fade" mode="out-in">
        <div v-if="!productStore.loading" class="price-list" :key="productStore.currentCat + productStore.currentProduct" role="list">
          <PriceItem
            v-for="(item, idx) in productStore.sortedList"
            :key="item.id + idx"
            :item="item"
            :idx="idx"
            :annual="productStore.annualMode"
            :min-price="minPrice"
            :global-max="globalMax"
            @report="handleReport"
            role="listitem"
          />
          <div v-if="!productStore.sortedList.length" class="not-found">
            <div class="not-found-icon" aria-hidden="true">💨</div>
            <div class="not-found-text">没有找到关于 "{{ productStore.searchQuery }}" 的匹配结果</div>
            <button class="clear-search-btn" @click="productStore.searchQuery = ''">清除搜索内容</button>
          </div>
        </div>
      </transition>

      <!-- Back to top -->
      <transition name="fade">
        <button 
          v-show="showBackToTop" 
          class="back-to-top" 
          @click="scrollToTop"
          aria-label="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 15l-6-6-6 6"/></svg>
        </button>
      </transition>

      <!-- Disclaimer -->
      <footer class="note" role="contentinfo">
        <div class="note-icon" aria-hidden="true">⚠️</div>
        <div>
          <strong>数据仅供参考。</strong>{{ t('note.text') }} 
          <a href="https://t.me/GlobalSubscription" target="_blank" style="color: var(--accent); margin-left: 8px; text-decoration: none;">加入 Telegram 频道获取更新 📢</a>
        </div>
      </footer>
    </main>

    <SubmitModal
      :show="showSubmitModal"
      :form="submitForm"
      :categories="CATEGORIES"
      :availableProducts="submitProducts"
      :countries="productStore.allCountries"
      :locale="configStore.locale"
      :message="submitMsg"
      :isError="submitError"
      :submitting="submitting"
      @close="showSubmitModal = false"
      @submit="submitData"
      @submit-request="submitRequest"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { CATEGORIES } from './data/index.js'
import * as api from './services/api.js'
import { loadLocaleMessages } from './main.js'

// Stores
import { useConfigStore } from './stores/configStore.js'
import { useProductStore } from './stores/productStore.js'

// Components
import PriceItem from './components/PriceItem.vue'
import TopNav from './components/layout/TopNav.vue'
import AppHeader from './components/layout/AppHeader.vue'
import CategoryTabs from './components/features/CategoryTabs.vue'
import ProductTabs from './components/features/ProductTabs.vue'
import PriceSummary from './components/features/PriceSummary.vue'
import SubmitModal from './components/features/SubmitModal.vue'
import SkeletonItem from './components/features/SkeletonItem.vue'

// Styles
import './styles/global.css'

import { initSecurity } from './utils/security.js'
import { updateSEO } from './utils/seo.js'

const { t, locale } = useI18n()
const configStore = useConfigStore()
const productStore = useProductStore()
console.log('[APP] script setup running, productStore:', !!productStore.fetchInitialData)

// Back to top logic
const showBackToTop = ref(false)
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  console.log('[APP] onMounted fired, calling fetchInitialData');
  productStore.fetchInitialData()

  // Initialize Anti-Copy & Anti-Debug Measures
  initSecurity()

  window.addEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > 400
  })
})

// Sync locale between Store and i18n
watch(() => configStore.locale, async (newLocale) => {
  await loadLocaleMessages(newLocale)
  locale.value = newLocale
}, { immediate: true })

// Submit modal local state (keep here as it's transient UI state)
const showSubmitModal = ref(false)
const submitting = ref(false)
const submitMsg = ref('')
const submitError = ref(false)
const submitForm = ref({
  category: 'ai', productId: '', countryId: '', local: '', cny: '', submitterNote: ''
})

const submitProducts = computed(() => {
  return Object.values(productStore.allProducts).filter(p => p.cat === submitForm.value.category)
})

watch(() => submitForm.value.category, () => { submitForm.value.productId = '' })

async function openSubmitModal() {
  showSubmitModal.value = true
  submitMsg.value = ''
  submitError.value = false
}

function handleReport(item) {
  submitForm.value = {
    category: productStore.currentCat,
    productId: productStore.currentProduct,
    countryId: item.id,
    local: item.local,
    cny: item.cny,
    submitterNote: ''
  }
  showSubmitModal.value = true
  submitMsg.value = ''
  submitError.value = false
}

async function submitRequest(data) {
  if (!data.productName || !data.productName.trim()) {
    submitMsg.value = '请填写产品名称'
    submitError.value = true
    return
  }
  submitting.value = true
  submitMsg.value = ''
  try {
    const json = await api.submitRequest(data)
    if (json.success) {
      submitMsg.value = '✅ 需求提交成功！我们会尽快评估并添加'
      submitError.value = false
      setTimeout(() => {
        showSubmitModal.value = false
      }, 2000)
    }
  } catch (e) {
    submitMsg.value = e.message || '提交失败'
    submitError.value = true
  }
  submitting.value = false
}

async function submitData() {
  const { productId, countryId, local } = submitForm.value
  if (!productId || !countryId || !local) {
    submitMsg.value = '请填写必填项'
    submitError.value = true
    return
  }
  submitting.value = true
  submitMsg.value = ''
  try {
    const json = await api.submitSubmission(submitForm.value)
    if (json.success) {
      submitMsg.value = '✅ 提交成功！等待管理员审核'
      submitError.value = false
      setTimeout(() => {
        showSubmitModal.value = false
        submitForm.value = { category: 'ai', productId: '', countryId: '', local: '', cny: '', submitterNote: '' }
      }, 2000)
    }
  } catch (e) {
    submitMsg.value = e.message || '提交失败'
    submitError.value = true
  }
  submitting.value = false
}

const minPrice = computed(() => productStore.sortedList.length ? Math.min(...productStore.sortedList.map(c => c.cny)) : 0)
const globalMax = computed(() => {
  const product = productStore.allProducts[productStore.currentProduct]
  if (!product) return 0
  return Math.max(...(product.enrichedCountries || []).map(c => c.cny))
})

// Sort options
const sortOptions = computed(() => [
  { key: 'price', label: t('sort.priceAsc') },
  { key: 'price-desc', label: t('sort.priceDesc') },
  { key: 'name', label: t('sort.name') },
])

// Dynamic SEO
watch([() => productStore.currentProduct, () => configStore.locale], () => {
  const product = productStore.allProducts[productStore.currentProduct]
  updateSEO(product?.name, configStore.locale)
}, { immediate: true })
</script>

<style>
/* Background animations and other global-ish layout styles can remain here or move to global.css */
.bg-animation { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.orb {
  position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4;
  animation: float 20s ease-in-out infinite;
}
.orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,229,160,0.3), transparent 70%); top: -100px; right: -100px; animation-delay: 0s; }
.orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(91,156,255,0.25), transparent 70%); bottom: -50px; left: -100px; animation-delay: -7s; }
.orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(255,107,53,0.15), transparent 70%); top: 40%; left: 40%; animation-delay: -14s; }
.dark .orb { opacity: 0.35; }
.light .orb { opacity: 0.25; filter: blur(100px); }
.light .orb-1 { background: radial-gradient(circle, rgba(0,100,255,0.2), transparent 70%); }
.light .orb-2 { background: radial-gradient(circle, rgba(100,200,255,0.2), transparent 70%); }

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -40px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.grid-overlay {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(0,229,160,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,229,160,0.015) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none; z-index: 0;
}
.light .grid-overlay {
  background-image:
    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
}

.app { 
  position: relative; z-index: 1; min-height: 100vh; 
  /* Disable Text Selection */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.billing-row { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding: 12px; border-radius: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); }
.billing-toggle { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; }
.billing-toggle span { color: var(--muted); transition: color 0.2s; }
.billing-toggle span:not(.dim) { color: var(--text); }
.toggle-pill {
  position: relative; width: 44px; height: 24px;
  background: var(--border2); border-radius: 100px;
  cursor: pointer; transition: background 0.25s; flex-shrink: 0;
}
.toggle-pill.on { background: linear-gradient(135deg, var(--accent), #00c4e8); }
.toggle-knob {
  position: absolute; width: 18px; height: 18px;
  background: #fff; border-radius: 50%; top: 3px; left: 3px;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.toggle-pill.on .toggle-knob { transform: translateX(20px); }
.save-chip {
  font-size: 11px; font-weight: 700; padding: 3px 10px;
  background: rgba(0,229,160,0.12); color: var(--accent);
  border: 1px solid var(--border-accent); border-radius: 100px;
}

/* Search */
.search-wrap { position: relative; margin-bottom: 20px; }
.search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 15px; pointer-events: none; opacity: 0.6; }
.search-input {
  width: 100%; padding: 14px 42px;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border); border-radius: 16px;
  color: var(--text); font-size: 14px; font-family: var(--font-sans); outline: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.search-input:focus { border-color: var(--accent); background: rgba(255,255,255,0.06); box-shadow: 0 0 0 4px var(--glow); transform: translateY(-1px); }
.search-input::placeholder { color: var(--muted); opacity: 0.7; }
.search-clear {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: var(--border); border: none; color: var(--muted); cursor: pointer;
  width: 22px; height: 22px; border-radius: 50%; font-size: 10px; line-height: 1;
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
.search-clear:hover { background: var(--danger); color: #fff; transform: scale(1.1); }

/* Sort */
.sort-bar { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.sort-btn {
  padding: 6px 14px; border-radius: 10px;
  border: 1px solid var(--border); background: rgba(255,255,255,0.02);
  color: var(--muted); font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: var(--font-sans);
}
.sort-btn:hover { border-color: var(--blue); color: var(--blue); background: rgba(91,156,255,0.08); }
.sort-btn.active { border-color: var(--blue); color: var(--blue); background: rgba(91,156,255,0.12); font-weight: 700; box-shadow: 0 0 15px rgba(91,156,255,0.15); }

/* Price list */
.price-list { display: flex; flex-direction: column; gap: 10px; }
.not-found { text-align: center; padding: 80px 20px; color: var(--muted); font-size: 14px; background: rgba(255,255,255,0.02); border-radius: 20px; border: 1px dashed var(--border); }
.not-found-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }

/* Note */
.note {
  margin-top: 32px; padding: 18px 20px;
  background: rgba(255,107,53,0.03); border: 1px solid var(--note-border);
  backdrop-filter: blur(10px);
  border-radius: 18px; font-size: 12px; color: var(--muted2); line-height: 1.8;
  display: flex; gap: 12px; align-items: flex-start;
}
.note-icon { font-size: 18px; flex-shrink: 0; margin-top: -2px; }
.note strong { color: var(--accent2); font-weight: 800; }

/* Loading */
.loading { text-align: center; padding: 80px 0; }
.loading-ring {
  width: 44px; height: 44px; margin: 0 auto 16px;
  border: 3.5px solid var(--border); border-top-color: var(--accent);
  border-radius: 50%; animation: spin 0.8s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
}
.loading-text { color: var(--muted); font-size: 14px; font-weight: 600; letter-spacing: 0.5px; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Back to top */
.back-to-top {
  position: fixed; bottom: 32px; right: 32px;
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--surface); border: 1px solid var(--border);
  backdrop-filter: blur(10px);
  color: var(--text); display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 90;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.back-to-top:hover {
  background: var(--accent); color: #000;
  transform: translateY(-6px) scale(1.05); box-shadow: 0 12px 30px var(--glow-strong);
  border-color: var(--accent);
}

.not-found-text { margin-bottom: 16px; font-weight: 600; color: var(--text); }
.clear-search-btn {
  padding: 8px 20px; border-radius: 12px;
  background: var(--accent-dim); color: var(--accent);
  border: 1px solid var(--border-accent); cursor: pointer;
  font-size: 13px; font-weight: 700; transition: all 0.25s;
}
.clear-search-btn:hover { background: var(--accent); color: #000; transform: translateY(-2px); }

/* List Transitions */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.list-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}
</style>
