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
          <span :class="{ active: !productStore.annualMode }">{{ t('billing.monthly') }}</span>
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
          <span :class="{ active: productStore.annualMode }">{{ t('billing.annual') }}</span>
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
      
      <!-- Region Filter -->
      <nav class="region-bar" aria-label="Region filters">
        <button
          v-for="r in regions"
          :key="r.key"
          class="region-btn"
          :class="{ active: productStore.currentRegion === r.key }"
          @click="productStore.currentRegion = r.key"
        >{{ r.label }}</button>
      </nav>

      <!-- Loading -->
      <div v-if="productStore.loading" class="price-list" aria-live="polite">
        <SkeletonItem v-for="i in 8" :key="i" />
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
          <a href="https://t.me/GlobalSubscription" target="_blank" class="tg-link">加入 Telegram 频道获取更新 📢</a>
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

// Back to top logic
const showBackToTop = ref(false)
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  productStore.fetchInitialData()
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

// Submit modal local state
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

const regions = computed(() => [
  { key: 'all', label: locale.value === 'zh' ? '全部地区' : 'All Regions' },
  { key: 'Asia', label: locale.value === 'zh' ? '亚洲' : 'Asia' },
  { id: 'Europe', key: 'Europe', label: locale.value === 'zh' ? '欧洲' : 'Europe' },
  { key: 'Americas', label: locale.value === 'zh' ? '美洲' : 'Americas' },
  { key: 'Africa', label: locale.value === 'zh' ? '非洲' : 'Africa' },
  { key: 'Oceania', label: locale.value === 'zh' ? '大洋洲' : 'Oceania' },
])

// Dynamic SEO
watch([() => productStore.currentProduct, () => configStore.locale], () => {
  const product = productStore.allProducts[productStore.currentProduct]
  updateSEO(product?.name, configStore.locale)
}, { immediate: true })
</script>

<style>
/* Background animations */
.bg-animation { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.orb {
  position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.25;
  animation: float 25s ease-in-out infinite;
}
.orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(0,229,160,0.2), transparent 70%); top: -150px; right: -100px; }
.orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(91,156,255,0.15), transparent 70%); bottom: -100px; left: -120px; animation-delay: -8s; }
.orb-3 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,107,53,0.1), transparent 70%); top: 35%; left: 35%; animation-delay: -16s; }

.light .orb { opacity: 0.12; filter: blur(140px); }
.light .orb-1 { background: radial-gradient(circle, rgba(0,184,132,0.15), transparent 70%); }
.light .orb-2 { background: radial-gradient(circle, rgba(64,117,208,0.15), transparent 70%); }

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
    linear-gradient(rgba(15,17,82,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,17,82,0.02) 1px, transparent 1px);
}

.app { 
  position: relative; z-index: 1; min-height: 100vh; 
  -webkit-user-select: none; user-select: none;
}

.billing-row { 
  display: flex; align-items: center; gap: 12px; margin-bottom: 24px; 
  padding: 12px 16px; border-radius: var(--radius-lg); 
  background: var(--pill-bg); border: 1px solid var(--border); 
}
.billing-toggle { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; }
.billing-toggle span { color: var(--muted); transition: color 0.2s; }
.billing-toggle span.active { color: var(--text); }

.toggle-pill {
  position: relative; width: 44px; height: 24px;
  background: var(--toggle-track); border-radius: 100px;
  cursor: pointer; transition: background var(--transition-med); flex-shrink: 0;
}
.toggle-pill.on { background: linear-gradient(135deg, var(--accent), #00c4e8); }
.light .toggle-pill.on { background: linear-gradient(135deg, #00c48c, #00a0c4); }

.toggle-knob {
  position: absolute; width: 18px; height: 18px;
  background: #fff; border-radius: 50%; top: 3px; left: 3px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.toggle-pill.on .toggle-knob { transform: translateX(20px); }

.save-chip {
  font-size: 11px; font-weight: 800; padding: 4px 10px;
  background: var(--accent-dim); color: var(--accent-text);
  border: 1px solid var(--border-accent); border-radius: 100px;
}

/* Search */
.search-wrap { position: relative; margin-bottom: 24px; }
.search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 16px; pointer-events: none; opacity: 0.5; }
.search-input {
  width: 100%; padding: 16px 52px;
  background: var(--input-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border); border-radius: 18px;
  color: var(--text); font-size: 15px; font-family: var(--font-sans); outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
}
.search-input:focus { 
  border-color: var(--accent); background: var(--surface2); 
  box-shadow: 0 0 0 4px var(--glow), 0 12px 32px rgba(0,0,0,0.4); transform: translateY(-2px); 
}
.search-input::placeholder { color: var(--muted); opacity: 0.6; }
.search-clear {
  position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
  background: var(--border2); border: none; color: var(--muted); cursor: pointer;
  width: 26px; height: 26px; border-radius: 50%; font-size: 10px;
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
.search-clear:hover { background: var(--danger); color: #fff; transform: scale(1.1); }

/* Sort */
.sort-bar { display: flex; gap: 10px; margin-bottom: 28px; flex-wrap: wrap; }
.sort-btn {
  padding: 8px 18px; border-radius: 14px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--muted); font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all var(--transition-med); font-family: var(--font-sans);
}
.sort-btn:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-dim); transform: translateY(-1px); }
.sort-btn.active { 
  border-color: var(--blue); color: #fff; 
  background: linear-gradient(135deg, var(--blue), #4a86ff); 
  font-weight: 800; 
  box-shadow: 0 6px 15px rgba(91,156,255,0.2);
  transform: translateY(-1px);
}

/* Region Filter */
.region-bar { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
.region-btn {
  padding: 6px 14px; border-radius: 100px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--muted); font-size: 12px; font-weight: 700;
  cursor: pointer; transition: all var(--transition-med);
}
.region-btn:hover { border-color: var(--accent); color: var(--accent-text); transform: translateY(-1px); }
.region-btn.active {
  background: var(--accent-dim); color: var(--accent-text); border-color: var(--border-accent);
  box-shadow: 0 4px 12px var(--glow);
}

/* Price list */
.price-list { display: flex; flex-direction: column; gap: 12px; }
.not-found { 
  text-align: center; padding: 80px 20px; color: var(--muted); 
  background: var(--pill-bg); border-radius: var(--radius-xl); border: 1px dashed var(--border2); 
}
.not-found-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
.not-found-text { margin-bottom: 20px; font-weight: 700; color: var(--text); font-size: 15px; }
.clear-search-btn {
  padding: 10px 24px; border-radius: 14px;
  background: var(--accent); color: #000;
  border: none; cursor: pointer;
  font-size: 14px; font-weight: 700; transition: all var(--transition-med);
}
.light .clear-search-btn { background: var(--accent-text); color: #fff; }
.clear-search-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 16px var(--glow-strong); }

/* Note */
.note {
  margin-top: 40px; padding: 20px 24px;
  background: var(--note-bg); border: 1px solid var(--note-border);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-lg); font-size: 13px; color: var(--text-secondary); line-height: 1.8;
  display: flex; gap: 14px; align-items: flex-start;
}
.note-icon { font-size: 20px; flex-shrink: 0; }
.note strong { color: var(--accent2); font-weight: 800; }
.tg-link { color: var(--blue); text-decoration: none; font-weight: 700; transition: color 0.2s; }
.tg-link:hover { color: var(--accent); }

/* Back to top */
.back-to-top {
  position: fixed; bottom: 32px; right: 32px;
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--surface); border: 1px solid var(--border);
  backdrop-filter: blur(16px);
  color: var(--text); display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 90;
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}
.back-to-top:hover {
  background: var(--accent); color: #000;
  transform: translateY(-8px) scale(1.1); box-shadow: 0 16px 40px var(--glow-strong);
  border-color: var(--accent);
}

/* Transitions */
.list-fade-enter-active, .list-fade-leave-active { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.list-fade-enter-from { opacity: 0; transform: translateY(20px) scale(0.98); }
.list-fade-leave-to { opacity: 0; transform: translateY(-20px) scale(0.98); }
</style>
