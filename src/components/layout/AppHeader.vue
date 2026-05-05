<template>
  <header class="header">
    <div class="header-badge">
      <span class="badge-dot"></span>
      Global Price Intelligence
    </div>
    <h1>{{ t('header.title') }}<br><span class="gradient-text">{{ t('header.titleAccent') }}</span></h1>
    <p class="subtitle">{{ t('header.subtitle') }}</p>
    <div v-if="dataSource === 'api'" class="live-badge">
      <span class="live-dot"></span>
      LIVE
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({
  dataSource: String
})
</script>

<style scoped>
.header { position: relative; margin-bottom: 28px; }
.header-badge {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--accent); margin-bottom: 12px; padding: 5px 12px;
  background: var(--accent-dim); border: 1px solid var(--border-accent);
  border-radius: 100px;
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
.live-badge {
  position: absolute; top: 4px; right: 0;
  display: flex; align-items: center; gap: 5px;
  font-size: 9px; font-weight: 800; letter-spacing: 1.5px;
  color: var(--accent); background: var(--accent-dim);
  border: 1px solid var(--border-accent); padding: 3px 8px; border-radius: 6px;
}
.live-dot {
  width: 5px; height: 5px; border-radius: 50%; background: var(--accent);
  animation: pulse 1.5s ease-in-out infinite;
}
h1 {
  font-family: var(--font-sans); font-size: clamp(28px, 7vw, 44px);
  font-weight: 800; line-height: 1.1; letter-spacing: -1px; margin-bottom: 10px;
}
.gradient-text {
  background: linear-gradient(135deg, var(--accent) 0%, var(--blue) 50%, var(--accent) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer 4s linear infinite;
}
@keyframes shimmer { to { background-position: 200% center; } }
.subtitle { color: var(--muted2); font-size: 14px; font-weight: 400; line-height: 1.7; max-width: 500px; }
</style>
