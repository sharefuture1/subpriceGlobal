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

.cat-tabs { display: flex; gap: 6px; margin-bottom: 12px; }
.cat-tab {
  display: flex; align-items: center; gap: 5px; flex-shrink: 0;
  padding: 7px 14px; border-radius: 12px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--muted); font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; white-space: nowrap;
  font-family: var(--font-sans);
}
.cat-icon { font-size: 14px; }
.cat-tab:hover { border-color: var(--accent); color: var(--text); background: var(--glow); }
.cat-tab.active {
  background: var(--accent); border-color: var(--accent);
  color: #000; font-weight: 800;
  box-shadow: 0 0 20px var(--glow-strong);
}

@media (max-width: 480px) {
  .cat-tabs-scroll { margin: 0 -16px; padding: 0 16px; }
}
</style>
