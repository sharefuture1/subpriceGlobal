<template>
  <div class="skeleton-item glass-card">
    <div class="rank-shimmer"></div>
    <div class="flag-shimmer"></div>
    <div class="info-shimmer">
      <div class="line title"></div>
      <div class="line subtitle"></div>
    </div>
    <div class="price-shimmer">
      <div class="line val"></div>
      <div class="line badge"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-item {
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--card);
}

.skeleton-item::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, transparent, var(--skeleton-shine), transparent);
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.rank-shimmer { width: 32px; height: 32px; border-radius: 10px; background: var(--skeleton-base); }
.flag-shimmer { width: 32px; height: 32px; border-radius: 50%; background: var(--skeleton-base); }
.info-shimmer { flex: 1; }
.line { background: var(--skeleton-base); border-radius: 4px; margin-bottom: 6px; }
.line.title { width: 60%; height: 14px; }
.line.subtitle { width: 40%; height: 10px; margin-bottom: 0; }
.price-shimmer { text-align: right; width: 60px; }
.line.val { width: 100%; height: 20px; }
.line.badge { width: 70%; height: 12px; margin-left: auto; margin-bottom: 0; margin-top: 6px; }

@media (max-width: 480px) {
  .skeleton-item { padding: 12px 14px; }
  .rank-shimmer, .flag-shimmer { width: 28px; height: 28px; }
}
</style>
