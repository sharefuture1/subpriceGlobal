<template>
  <div class="summary glass-card">
    <div class="summary-card min">
      <div class="summary-label">{{ t('summary.lowestPrice') }}</div>
      <div class="summary-value green">¥{{ summary.min }}</div>
      <div class="summary-sub">最便宜</div>
    </div>
    <div class="summary-sep"></div>
    <div class="summary-card">
      <div class="summary-label">{{ t('summary.highestPrice') }}</div>
      <div class="summary-value orange">¥{{ summary.max }}</div>
      <div class="summary-sub">最贵</div>
    </div>
    <div class="summary-sep"></div>
    <div class="summary-card">
      <div class="summary-label">{{ t('summary.maxSave') }}</div>
      <div class="summary-value gold">{{ summary.savePct }}%</div>
      <div class="summary-sub">最高可省</div>
    </div>
    <div class="summary-sep"></div>
    <div class="summary-card">
      <div class="summary-label">{{ t('summary.countryCount') }}</div>
      <div class="summary-value blue">{{ summary.count }}</div>
      <div class="summary-sub">个国家</div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({
  summary: Object
})
</script>

<style scoped>
.summary {
  display: flex; align-items: center;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 16px 0; margin-bottom: 20px;
  transition: all var(--transition-med);
  overflow: hidden;
  box-shadow: var(--shadow);
}
.summary-card { flex: 1; text-align: center; padding: 4px 0; }
.summary-label { 
  font-size: 10px; color: var(--muted); margin-bottom: 6px; 
  letter-spacing: 0.8px; text-transform: uppercase; font-weight: 700; 
}
.summary-value { 
  font-family: var(--font-sans); font-size: 22px; font-weight: 800; 
  letter-spacing: -0.5px; transition: color 0.2s; 
}

.summary-value.green { color: var(--accent); }
.dark .summary-value.green { text-shadow: 0 0 15px var(--glow); }

.summary-value.orange { color: var(--accent2); }
.summary-value.gold { color: var(--gold); }
.summary-value.blue { color: var(--blue); }

.summary-sub { font-size: 9px; color: var(--muted); margin-top: 4px; font-weight: 600; opacity: 0.8; }
.summary-sep { width: 1px; height: 36px; background: var(--sep); flex-shrink: 0; }

@media (max-width: 640px) {
  .summary-value { font-size: 18px; }
  .summary-label { font-size: 9px; margin-bottom: 4px; }
}

@media (max-width: 480px) {
  .summary-value { font-size: 16px; }
  .summary-sub { display: none; }
  .summary-sep { height: 28px; }
  .summary { padding: 12px 0; border-radius: var(--radius-md); }
}
</style>
