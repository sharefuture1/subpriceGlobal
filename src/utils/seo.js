/**
 * SEO utility for updating document head tags.
 */
export function updateSEO(productName, locale) {
  if (typeof document === 'undefined') return;

  const isZh = locale === 'zh';
  const suffix = isZh ? '全球订阅价格对比 | SubPrice' : 'Global Subscription Price Comparison | SubPrice';
  const title = productName ? `${productName} ${suffix}` : suffix;
  
  document.title = title;
  
  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    const desc = isZh 
      ? `比较 ${productName || '主流服务'} 在全球各国的订阅价格。实时汇率转换，找到最便宜的订阅方案。`
      : `Compare ${productName || 'popular services'} subscription prices across different countries. Real-time currency conversion to find the cheapest plan.`;
    metaDesc.setAttribute('content', desc);
  }

  // Update OG title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
}
