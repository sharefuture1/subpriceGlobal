<template>
  <div class="cat-tabs-scroll">
    <nav class="cat-tabs" aria-label="Category navigation">
      <button
        v-for="(cat, key) in categories"
        :key="key"
        class="cat-tab"
        :class="{ active: currentCat === key }"
        @click="$emit('update:currentCat', key)"
        :aria-pressed="currentCat === key"
      >
        <span class="cat-icon" aria-hidden="true">{{ cat.icon }}</span>
        {{ locale === 'zh' ? cat.labelZh : cat.label }}
      </button>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  categories: Object,
  currentCat: String,
  locale: String
})
defineEmits(['update:currentCat'])
</script>

<style scoped>
.cat-tabs-scroll {
  overflow-x: auto;
  margin: 0 -20px;
  padding: 0 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.cat-tabs-scroll::-webkit-scrollbar { display: none; }

.cat-tabs { display: flex; gap: 8px; margin-bottom: 12px; padding: 4px 0; }
.cat-tab {
  display: flex; align-items: center; gap: 6px; flex-shrink: 0;
  padding: 8px 16px; border-radius: 12px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--muted); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all var(--transition-med); white-space: nowrap;
  font-family: var(--font-sans);
}
.cat-icon { font-size: 14px; transition: transform 0.2s; }
.cat-tab:hover { border-color: var(--accent); color: var(--text); background: var(--pill-bg); }
.cat-tab:hover .cat-icon { transform: scale(1.1); }

.cat-tab.active {
  background: linear-gradient(135deg, var(--accent), #00c4e8);
  border-color: transparent;
  color: #000; font-weight: 800;
  box-shadow: 0 4px 16px var(--glow-strong);
  transform: translateY(-1px);
}

.light .cat-tab.active {
  background: linear-gradient(135deg, #00c48c, #00a0c4);
  color: #fff;
  box-shadow: 0 4px 16px rgba(0, 160, 120, 0.2);
}

@media (max-width: 480px) {
  .cat-tabs-scroll { margin: 0 -16px; padding: 0 16px; }
  .cat-tab { padding: 7px 12px; font-size: 12px; }
}
</style>
