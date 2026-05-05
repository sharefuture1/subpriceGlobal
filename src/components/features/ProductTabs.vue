<template>
  <div class="tabs-scroll">
    <nav class="tabs" aria-label="Product selection">
      <button
        v-for="p in products"
        :key="p.id"
        class="tab"
        :class="{ active: currentProduct === p.id }"
        @click="$emit('update:currentProduct', p.id)"
        :aria-pressed="currentProduct === p.id"
      >
        <span class="tab-icon" aria-hidden="true">{{ p.icon }}</span>{{ p.name }}
      </button>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  products: Array,
  currentProduct: String
})
defineEmits(['update:currentProduct'])
</script>

<style scoped>
.tabs-scroll { overflow-x: auto; margin: 0 -20px; padding: 0 20px; scrollbar-width: none; -ms-overflow-style: none; }
.tabs-scroll::-webkit-scrollbar { display: none; }
.tabs { display: flex; gap: 10px; margin-bottom: 20px; padding: 4px 0; }
.tab {
  display: flex; align-items: center; gap: 6px; flex-shrink: 0;
  padding: 8px 18px; border-radius: 100px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--muted); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all var(--transition-med); font-family: var(--font-sans);
}
.tab-icon { transition: transform 0.2s; }
.tab:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-dim); }
.tab:hover .tab-icon { transform: rotate(12deg) scale(1.1); }

.tab.active {
  background: linear-gradient(135deg, var(--blue), #4a86ff);
  border-color: transparent; color: #fff; font-weight: 700;
  box-shadow: 0 8px 20px rgba(91,156,255,0.25);
  transform: translateY(-1px);
}

.light .tab.active {
  background: linear-gradient(135deg, #4a7fd8, #3b6fc8);
  box-shadow: 0 6px 18px rgba(74, 127, 216, 0.2);
}

@media (max-width: 480px) {
  .tabs-scroll { margin: 0 -16px; padding: 0 16px; }
  .tab { padding: 7px 14px; font-size: 12px; }
}
</style>
