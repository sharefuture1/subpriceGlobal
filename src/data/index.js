// ============================================================
// 数据入口 - 支持静态和 API 两种模式
// API 优先：如果后端可用则用后端，否则用静态数据（降级）
// ============================================================

import { COUNTRIES, countryById } from './countries/index.js'
import aiProducts from './products/ai.js'
import streamProducts from './products/stream.js'
import musicProducts from './products/music.js'
import creativeProducts from './products/creative.js'
import cloudProducts from './products/cloud.js'
import officeProducts from './products/office.js'
import gameProducts from './products/game.js'
import securityProducts from './products/security.js'

// 静态数据（备用）
const STATIC_PRODUCTS = {
  ai: aiProducts, stream: streamProducts, music: musicProducts,
  creative: creativeProducts, cloud: cloudProducts, office: officeProducts,
  game: gameProducts, security: securityProducts
}

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

// 合并所有产品，附加 category
function buildAllProducts() {
  const all = []
  for (const [cat, products] of Object.entries(STATIC_PRODUCTS)) {
    for (const p of products) {
      all.push({ ...p, cat })
    }
  }
  return all
}

const allProducts = buildAllProducts()
const PRODUCTS = Object.fromEntries(allProducts.map(p => [p.id, p]))

// 获取产品列表（合并国家信息）
function enrichProduct(product) {
  return {
    ...product,
    enrichedCountries: product.monthly.map(entry => {
      const country = countryById(entry.id)
      return {
        id: entry.id,
        name: country?.name || entry.id,
        nameZh: country?.nameZh || country?.name || entry.id,
        flag: country?.flag || '🌍',
        currency: country?.currency || '',
        local: entry.local,
        cny: entry.cny,
      }
    })
  }
}

// 从 API 加载数据（如果后端可用）
export async function loadFromAPI() {
  try {
    const base = import.meta.env.VITE_API_BASE || ''
    const [categoriesRes, countriesRes, productsRes] = await Promise.all([
      fetch(base + '/api/categories'),
      fetch(base + '/api/countries'),
      fetch(base + '/api/products'),
    ])
    if (!categoriesRes.ok || !countriesRes.ok || !productsRes.ok) {
      throw new Error('API returned non-ok status')
    }
    const [categories, countries, productsMap] = await Promise.all([
      categoriesRes.json(),
      countriesRes.json(),
      productsRes.json(),
    ])
    return { categories, countries, products: productsMap }
  } catch (e) {
    console.warn('API unavailable, using static data:', e.message)
    return null
  }
}

export { PRODUCTS, COUNTRIES, countryById, enrichProduct }
export default PRODUCTS
