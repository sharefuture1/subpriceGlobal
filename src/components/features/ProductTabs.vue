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
        <span aria-hidden="true">{{ p.icon }}</span>{{ p.name }}
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
.tabs { display: flex; gap: 8px; margin-bottom: 16px; padding-bottom: 2px; }
.tab {
  display: flex; align-items: center; gap: 5px; flex-shrink: 0;
  padding: 8px 16px; border-radius: 100px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--muted); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: var(--font-sans);
}
.tab:hover { border-color: var(--blue); color: var(--blue); background: rgba(91,156,255,0.06); }
.tab.active {
  background: linear-gradient(135deg, var(--blue), #5b8cff);
  border-color: transparent; color: #fff; font-weight: 700;
  box-shadow: 0 4px 16px rgba(91,156,255,0.35);
}

@media (max-width: 480px) {
  .tabs-scroll { margin: 0 -16px; padding: 0 16px; }
}
</style>
