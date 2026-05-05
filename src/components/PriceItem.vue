<template>
  <div
    class="price-item glass-card"
    :class="{ best: isBest, silver: idx === 1, bronze: idx === 2 }"
    :style="{ animationDelay: (idx * 0.03) + 's' }"
    role="listitem"
    :aria-label="`${item.nameZh || item.name} pricing: ${item.local} locally, approx ${item.cny.toFixed(2)} CNY`"
  >
    <div v-if="isBest" class="best-pill" aria-hidden="true">🏆 最低价</div>

    <div class="rank-badge" :class="rankClass" aria-hidden="true">
      <span v-if="idx < 3" class="rank-emoji">{{ rankSymbol }}</span>
      <span v-else class="rank-num">{{ idx + 1 }}</span>
    </div>

    <div class="flag-wrap" aria-hidden="true">{{ item.flag }}</div>

    <div class="country-info">
      <div class="country-name">{{ item.nameZh || item.name }}</div>
      <div class="local-price">
        <span class="currency-tag" :aria-label="`Currency: ${item.currency}`">{{ item.currency }}</span>
        {{ item.local }}{{ annual ? '/年' : '/月' }}
      </div>
    </div>

    <div class="price-right">
      <div 
        class="cny-price obfuscated" 
        :class="{ best: isBest }" 
        :data-val="item.cny.toFixed(2)"
        :aria-label="`Price in CNY: ${item.cny.toFixed(2)}`"
      >
        <span class="currency-symbol">¥</span>
      </div>
      <div v-if="savePct > 5" class="save-badge" :aria-label="`Saves ${savePct}% compared to most expensive region`">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        省 {{ savePct }}%
      </div>
      <div v-else class="save-badge lowest" aria-hidden="true">最低价</div>
      
      <!-- Correction Button -->
      <button 
        class="report-btn" 
        @click.stop="$emit('report', item)"
        aria-label="Report incorrect price"
        title="价格纠错"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: Object,
  idx: Number,
  annual: Boolean,
  minPrice: Number,
  globalMax: Number,
})

const emit = defineEmits(['report'])

const isBest = computed(() => props.item.cny === props.minPrice)
const savePct = computed(() => {
  if (!props.globalMax || props.globalMax === 0) return 0
  return Math.round((1 - props.item.cny / props.globalMax) * 100)
})
const rankSymbol = computed(() => ['🥇','🥈','🥉'][props.idx] || '')
const rankClass = computed(() => ['gold','silver','bronze'][props.idx] || '')
</script>

<style scoped>
.price-item {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  animation: slideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}

.price-item::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--border);
  transition: background 0.2s;
}

.price-item:hover {
  border-color: var(--accent);
  background: var(--card-hover-bg);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px var(--border-accent);
}
.price-item:hover::before { background: var(--accent); }

.price-item.best {
  border-color: var(--accent);
  background: var(--card);
  box-shadow: 0 0 30px var(--glow), inset 0 0 30px var(--glow);
  padding-top: 18px;
}
.price-item.best::before { background: linear-gradient(to bottom, var(--accent), #00c4e8); }
.dark .price-item.best { background: rgba(0,229,160,0.04); }
.light .price-item.best { background: rgba(0,100,200,0.03); }

.price-item.silver::before { background: linear-gradient(to bottom, #c0c0c0, #a0a0a0); }
.price-item.bronze::before { background: linear-gradient(to bottom, #cd7f32, #a06020); }

.best-pill {
  position: absolute; top: 0; left: 50%;
  transform: translateX(-50%);
  font-size: 9px; font-weight: 800; letter-spacing: 0.5px;
  background: linear-gradient(135deg, var(--accent), #00c4e8);
  color: #000; padding: 2px 12px; border-radius: 0 0 10px 10px;
  text-transform: uppercase; z-index: 2;
  box-shadow: 0 2px 10px rgba(0,229,160,0.2);
}

.rank-badge {
  width: 30px; height: 30px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 13px; font-weight: 700;
  background: var(--surface2); border: 1px solid var(--border);
  transition: all 0.2s;
}
.rank-badge.gold { background: rgba(255,209,102,0.15); border-color: rgba(255,209,102,0.3); }
.rank-badge.silver { background: rgba(192,192,192,0.12); border-color: rgba(192,192,192,0.25); }
.rank-badge.bronze { background: rgba(205,127,50,0.12); border-color: rgba(205,127,50,0.25); }
.rank-emoji { font-size: 15px; line-height: 1; }
.rank-num { font-size: 11px; color: var(--muted); font-family: var(--font-sans); }

.flag-wrap { font-size: 26px; flex-shrink: 0; line-height: 1; filter: saturate(1.1); }

.country-info { flex: 1; min-width: 0; }
.country-name {
  font-size: 14px; font-weight: 700; margin-bottom: 4px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  color: var(--text); font-family: var(--font-sans);
}
.local-price {
  font-size: 11px; color: var(--muted); font-weight: 500;
  display: flex; align-items: center; gap: 5px;
  font-family: var(--font-sans);
}
.currency-tag {
  font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
  background: var(--surface2); border: 1px solid var(--border);
  padding: 1px 5px; border-radius: 4px;
}

.price-right { text-align: right; flex-shrink: 0; }
.cny-price {
  font-family: var(--font-sans); font-size: 20px; font-weight: 800;
  letter-spacing: -0.5px; color: var(--text);
  transition: color 0.2s;
}
.cny-price.best {
  background: linear-gradient(135deg, var(--accent), #00c4e8);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.cny-price.obfuscated::after {
  content: attr(data-val);
}
.save-badge {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: 10px; color: var(--accent2); font-weight: 700; margin-top: 3px;
  font-family: var(--font-sans);
}
.save-badge.lowest { color: var(--muted); font-weight: 600; }

.report-btn {
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--muted);
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 6px;
  margin-left: auto;
}

.price-item:hover .report-btn {
  opacity: 1;
}

.report-btn:hover {
  background: var(--accent-dim);
  color: var(--accent);
  border-color: var(--accent);
  transform: scale(1.1);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 480px) {
  .price-item { padding: 12px 13px; gap: 10px; }
  .cny-price { font-size: 17px; }
  .country-name { font-size: 13px; }
  .flag-wrap { font-size: 22px; }
  .rank-badge { width: 26px; height: 26px; }
}
</style>
