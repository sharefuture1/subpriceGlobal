<template>
  <header class="header">
    <div class="header-top">
      <div class="header-badge premium-glass">
        <div class="badge-dot"></div>
        Global Price Intelligence
      </div>
      <div v-if="dataSource === 'api'" class="live-status">
        <span class="live-dot"></span>
        <span class="live-text">Real-time Data</span>
      </div>
    </div>
    
    <h1 class="main-title">
      {{ t('header.title') }}
      <span class="title-accent">
        {{ t('header.titleAccent') }}
        <svg class="title-underline" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,10 Q50,20 100,10" stroke="currentColor" stroke-width="3" fill="none" />
        </svg>
      </span>
    </h1>
    
    <p class="subtitle">{{ t('header.subtitle') }}</p>
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
.header { position: relative; margin-bottom: 40px; padding-top: 20px; }

.header-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }

.header-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 10px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase;
  color: var(--accent-text); padding: 6px 14px;
  border-radius: 100px;
}

.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

.live-status { display: flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; color: var(--muted); }
.live-dot { width: 5px; height: 5px; border-radius: 50%; background: #ff4d6a; animation: pulse 2s infinite; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 77, 106, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(255, 77, 106, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 77, 106, 0); } }

.main-title {
  font-family: var(--font-sans); font-size: clamp(32px, 8vw, 52px);
  font-weight: 800; line-height: 1; letter-spacing: -1.5px; margin-bottom: 16px;
  color: var(--text);
}

.title-accent {
  position: relative;
  display: inline-block;
  color: var(--accent-text);
  background: linear-gradient(135deg, var(--accent) 0%, var(--blue) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-underline {
  position: absolute; bottom: -8px; left: 0; width: 100%; height: 12px;
  color: var(--accent); opacity: 0.3;
}

.subtitle {
  color: var(--muted); font-size: 15px; font-weight: 500;
  line-height: 1.6; max-width: 520px;
}

@media (max-width: 640px) {
  .header { margin-bottom: 32px; }
  .main-title { letter-spacing: -1px; }
}
</style>
