<template>
  <nav class="top-nav">
    <div class="nav-brand">
      <span class="brand-icon">💰</span>
      <span class="brand-text">SubPrice</span>
    </div>

    <div class="nav-center">
      <a href="https://github.com/yourusername/price-compare-vue" target="_blank" class="social-link gh" title="GitHub Repository">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
      </a>
      <a href="https://t.me/GlobalSubscription" target="_blank" class="social-link tg" title="Telegram Channel">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
      </a>
    </div>

    <div class="nav-actions">
      <button class="nav-btn submit-btn" @click="$emit('open-submit')" :title="locale === 'zh' ? '提交数据' : 'Submit Data'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        <span class="btn-text">提交数据</span>
      </button>
      <button class="nav-btn icon-btn theme-btn" @click="$emit('toggle-theme')" :title="theme === 'dark' ? '浅色模式' : '深色模式'">
        <svg v-if="theme === 'dark'" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="nav-btn lang-btn" @click="$emit('toggle-locale')">{{ locale === 'zh' ? 'EN' : '中' }}</button>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  theme: String,
  locale: String
})
defineEmits(['open-submit', 'toggle-theme', 'toggle-locale'])
</script>

<style scoped>
.top-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; height: 56px;
  background: var(--nav-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border);
  transition: background 0.3s, border-color 0.3s;
}
.nav-brand { display: flex; align-items: center; gap: 7px; flex: 1; }
.brand-icon { font-size: 20px; line-height: 1; }
.brand-text {
  font-weight: 800; font-size: 17px;
  background: linear-gradient(135deg, var(--accent) 0%, #00c4e8 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; letter-spacing: -0.3px;
}
.nav-center { display: flex; align-items: center; gap: 15px; justify-content: center; flex: 1; }
.social-link { color: var(--muted); transition: all 0.2s; display: flex; align-items: center; }
.social-link:hover { color: var(--accent); transform: scale(1.1); }
.social-link.gh:hover { color: var(--text); }
.social-link.tg:hover { color: #26A5E4; }
.nav-actions { display: flex; align-items: center; gap: 8px; flex: 1; justify-content: flex-end; }
.nav-btn {
  display: flex; align-items: center; gap: 5px;
  padding: 6px 14px; border-radius: 10px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--text); font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: var(--font-sans);
}
.nav-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--glow); }
.submit-btn { background: var(--accent); border-color: var(--accent); color: #000; font-weight: 700; }
.submit-btn:hover { background: #00ffb3; border-color: #00ffb3; box-shadow: 0 0 20px var(--glow-strong); }
.icon-btn { padding: 6px 10px; }
.theme-btn:hover { color: var(--gold); border-color: var(--gold); }
.tg-btn:hover { color: #26A5E4; border-color: #26A5E4; background: rgba(38, 165, 228, 0.1); }
.lang-btn { font-size: 11px; font-weight: 700; min-width: 36px; justify-content: center; }

@media (max-width: 480px) {
  .btn-text { display: none; }
  .nav-btn { padding: 6px 10px; }
  .top-nav { padding: 0 12px; }
  .nav-center { gap: 10px; }
}
</style>
