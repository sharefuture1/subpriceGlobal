// API 服务层 - 从后端获取数据
// 开发环境通过 Vite 代理，生产环境通过环境变量配置

const API_BASE = import.meta.env.VITE_API_BASE || 'https://price-compare-api-zh09.onrender.com'

async function request(path) {
  const res = await fetch(API_BASE + path)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function fetchCategories() {
  return request('/categories')
}

export async function fetchCountries() {
  return request('/countries')
}

export async function fetchAllProducts() {
  return request('/products')
}

export async function fetchCategoryProducts(category) {
  return request(`/products/${category}`)
}
