<template>
  <nav class="top-nav">
    <div class="nav-brand">
      <div class="brand-logo-wrap liquid-border">
        <img src="https://pub-b1ca55f26b8c4b68bed9070080a97700.r2.dev/subprice.jpg" alt="SubPrice Logo" class="brand-logo" />
      </div>
      <span class="brand-text">SubPrice</span>
    </div>

    <div class="nav-center">
      <div class="social-links-wrap">
        <a href="https://github.com/sharefuture1/subpriceGlobal" target="_blank" class="social-pill gh" title="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <div class="social-sep"></div>
        <a href="https://t.me/GlobalSubscription" target="_blank" class="social-pill tg" title="Telegram">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.575-.532.766-.734.785-.438.041-.772-.288-1.196-.566-.662-.434-1.035-.702-1.677-1.125-.741-.489-.261-.758.162-1.196.11-.114 2.022-1.854 2.06-2.012.005-.02.01-.091-.033-.129-.043-.038-.107-.025-.153-.014-.065.015-1.103.701-3.111 2.057-.294.202-.561.301-.8.295-.262-.007-.768-.15-1.144-.272-.46-.15-.827-.23-.796-.485.016-.133.2-.269.552-.407 2.16-.94 3.6-.1.1.2.1.2.2 0 0 0 0 0 1.2-1.2-1.2-1.2"/></svg>
        </a>
      </div>
    </div>

    <div class="nav-actions">
      <button class="nav-btn submit-btn" @click="$emit('open-submit')" :title="locale === 'zh' ? '提交数据' : 'Submit Data'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        <span class="btn-text">提交数据</span>
      </button>
      <button class="nav-btn icon-btn theme-btn" @click="$emit('toggle-theme')">
        <svg v-if="theme === 'dark'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
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
  padding: 0 24px; height: 64px;
  background: var(--nav-bg);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border-bottom: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-brand { display: flex; align-items: center; gap: 14px; flex: 1; }

.brand-logo-wrap {
  width: 38px; height: 38px; border-radius: 12px; overflow: hidden;
  background: #000;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all var(--transition-bounce);
}
.brand-logo-wrap:hover { transform: scale(1.08) rotate(5deg); box-shadow: 0 6px 20px rgba(0, 229, 160, 0.3); }
.brand-logo { width: 100%; height: 100%; object-fit: cover; }

.brand-text {
  font-weight: 800; font-size: 20px;
  background: linear-gradient(135deg, var(--accent) 0%, #00c4e8 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; letter-spacing: -0.5px;
}

.nav-center { display: flex; align-items: center; justify-content: center; flex: 1; }

.social-links-wrap {
  display: flex; align-items: center; gap: 4px;
  background: var(--pill-bg); border: 1px solid var(--border);
  padding: 4px; border-radius: 100px;
}

.social-pill {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--muted); transition: all var(--transition-med);
}

.social-pill svg { width: 18px; height: 18px; }

.social-pill:hover { background: var(--card-solid); color: var(--text); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
.social-pill.gh:hover { color: var(--text); }
.social-pill.tg:hover { color: #26A5E4; }

.social-sep { width: 1px; height: 16px; background: var(--border); }

.nav-actions { display: flex; align-items: center; gap: 10px; flex: 1; justify-content: flex-end; }

.nav-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text); font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all var(--transition-med); font-family: var(--font-sans);
}

.nav-btn:hover { border-color: var(--accent); color: var(--accent-text); background: var(--glow); transform: translateY(-1px); }

.submit-btn {
  background: linear-gradient(135deg, var(--accent), #00c4e8);
  border-color: transparent;
  color: #000; font-weight: 800;
  box-shadow: 0 4px 12px var(--glow-strong);
}

.light .submit-btn { color: #fff; background: linear-gradient(135deg, #00b884, #008eb8); }

.submit-btn:hover { box-shadow: 0 6px 20px var(--glow-strong); transform: translateY(-2px); }

.icon-btn { padding: 8px 12px; }
.lang-btn { font-size: 11px; font-weight: 800; min-width: 40px; justify-content: center; }

@media (max-width: 640px) {
  .nav-center { display: none; }
}

@media (max-width: 480px) {
  .btn-text { display: none; }
  .nav-btn { padding: 8px 10px; }
  .top-nav { padding: 0 16px; }
}
</style>
