// ============================================================
// 数据入口 - 支持静态和 API 两种模式
// API 优先：如果后端可用则用后端，否则用静态数据（降级）
// ============================================================

import { COUNTRIES, countryById } from './countries/index.js'
import { EXCHANGE_RATES } from './exchangeRates.js'

// 分类配置
export const CATEGORIES = {
  ai:       { label: 'AI Assistant',   labelZh: 'AI助手',     icon: '🤖' },
  stream:   { label: 'Streaming',       labelZh: '流媒体',      icon: '🎬' },
  music:    { label: 'Music',           labelZh: '音乐',        icon: '🎵' },
  creative: { label: 'Creative',        labelZh: '创作工具',    icon: '🎨' },
  cloud:    { label: 'Cloud Storage',  labelZh: '云存储',      icon: '☁️' },
  office:   { label: 'Office',         labelZh: '办公协作',    icon: '📋' },
  game:     { label: 'Gaming',          labelZh: '游戏',        icon: '🎮' },
  security: { label: 'Security',        labelZh: '安全工具',   icon: '🔒' },
}

/**
 * Lazy load category products
 */
export async function getStaticProducts(category) {
  try {
    const module = await import(`./products/${category}.js`)
    return module.default || module[category + 'Products']
  } catch (e) {
    console.error(`Failed to load static products for ${category}:`, e)
    return []
  }
}

// 合并所有产品，附加 category (Legacy support if needed, but better to load on demand)
export async function buildAllProducts() {
  const all = []
  for (const cat of Object.keys(CATEGORIES)) {
    const products = await getStaticProducts(cat)
    for (const p of products) {
      all.push({ ...p, cat })
    }
  }
  return all
}

// 获取产品列表（合并国家信息）
function enrichProduct(product, rates = EXCHANGE_RATES) {
  const currentRates = rates || EXCHANGE_RATES
  return {
    ...product,
    enrichedCountries: (product.monthly || []).map(entry => {
      const country = countryById(entry.id)
      const currency = country?.currency || ''
      const price = entry.price || 0
      
      // 使用传入的汇率计算
      const rate = currentRates[currency] || 0
      const cny = entry.cny || +(price * rate).toFixed(2)
      
      // 构造 local 显示字符串
      const localDisplay = entry.local || `${country?.symbol || ''} ${price}`
      
      return {
        id: entry.id,
        name: country?.name || entry.id,
        nameZh: country?.nameZh || country?.name || entry.id,
        flag: country?.flag || '🌍',
        currency: currency,
        local: localDisplay,
        cny: cny,
      }
    })
  }
}

export { COUNTRIES, countryById, enrichProduct }
