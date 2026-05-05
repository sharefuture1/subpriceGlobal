/**
 * SubPrice Admin Panel Logic
 */

const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:3000/api' 
  : 'https://subapi.future1.us/api'

let token = localStorage.getItem('adminToken') || ''
let countries = []
let currentProducts = []
let currentSubmissions = []
let currentFilter = 'pending'

// Constants
const CAT_NAMES = { 
  ai: '🤖 AI助手', stream: '🎬 流媒体', music: '🎵 音乐', 
  creative: '🎨 创作工具', cloud: '☁️ 云存储', office: '📋 办公协作', 
  game: '🎮 游戏', security: '🔒 安全工具' 
}
const STATUS_NAMES = { pending: '⏳ 待审核', approved: '✅ 已通过', rejected: '❌ 已拒绝' }

// --- Utils ---
function toast(msg, isError = false) {
  const t = document.getElementById('toast')
  t.textContent = msg
  t.className = 'toast' + (isError ? ' error' : '') + ' show'
  setTimeout(() => t.className = 'toast', 2500)
}

async function api(path, opts = {}) {
  const timestamp = Date.now()
  const signature = btoa(`subprice-${timestamp}`)
  
  const headers = { 
    'Content-Type': 'application/json',
    'x-client-signature': signature
  }
  if (token) headers['x-admin-token'] = token
  
  try {
    const res = await fetch(API + path, { headers, ...opts })
    const json = await res.json()
    
    if (res.status === 401) {
      logout()
      toast('登录已过期', true)
      return null
    }
    
    if (!res.ok) throw new Error(json.error || 'Request failed')
    return json
  } catch (err) {
    toast(err.message, true)
    throw err
  }
}

// --- Auth ---
async function login() {
  const pw = document.getElementById('passwordInput').value
  if (!pw) return
  
  try {
    const timestamp = Date.now()
    const signature = btoa(`subprice-${timestamp}`)
    const res = await fetch(API + '/admin/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-client-signature': signature
      },
      body: JSON.stringify({ password: pw })
    })
    const json = await res.json()
    
    if (json.success) {
      token = json.token
      localStorage.setItem('adminToken', token)
      showAdmin()
      init()
    } else {
      document.getElementById('loginError').style.display = 'block'
    }
  } catch (e) {
    toast('连接失败，请确认后端已启动', true)
  }
}

function logout() {
  token = ''
  localStorage.removeItem('adminToken')
  showLogin()
}

function showLogin() {
  document.getElementById('loginScreen').classList.remove('hidden')
  document.getElementById('adminScreen').classList.add('hidden')
}

function showAdmin() {
  document.getElementById('loginScreen').classList.add('hidden')
  document.getElementById('adminScreen').classList.remove('hidden')
}

// --- Navigation ---
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
  // Find current button and add active
  if (event) event.target.classList.add('active')
  
  document.getElementById('tabProducts').classList.toggle('hidden', tab !== 'products')
  document.getElementById('tabCountries').classList.toggle('hidden', tab !== 'countries')
  document.getElementById('tabSubmissions').classList.toggle('hidden', tab !== 'submissions')
  
  if (tab === 'submissions') loadSubmissions()
  if (tab === 'products') loadProducts()
  if (tab === 'countries') loadCountries()
}

// --- Init ---
async function init() {
  try {
    const [cats, cntrs] = await Promise.all([
      api('/categories'),
      api('/countries')
    ])
    countries = cntrs
    document.getElementById('statCountries').textContent = countries.length
    document.getElementById('apiStatus').textContent = '已连接'
    document.getElementById('apiStatus').style.color = 'var(--accent)'
    
    await loadProducts()
    renderCountries()
  } catch (e) {
    document.getElementById('apiStatus').textContent = '离线'
    document.getElementById('apiStatus').style.color = 'var(--danger)'
  }
}

// --- Products ---
async function loadProducts() {
  const cat = document.getElementById('catSelect').value
  try {
    const data = await api(`/products/${cat}`)
    currentProducts = data.products || []
    document.getElementById('statProducts').textContent = currentProducts.length
    renderProducts()
  } catch (e) { console.error(e) }
}

function renderProducts() {
  const el = document.getElementById('productList')
  if (!currentProducts.length) {
    el.innerHTML = '<div class="empty-state">该分类下暂无产品</div>'
    return
  }

  el.innerHTML = currentProducts.map(p => `
    <div class="product-item">
      <div class="product-item-header">
        <h3>${p.icon} ${p.name} <span class="badge">${p.id}</span></h3>
        <div class="product-actions">
          <button class="btn btn-primary" onclick="editProduct('${p.id}')">✏️ 编辑</button>
          <button class="btn btn-danger" onclick="deleteProduct('${p.id}')">🗑️ 删除</button>
        </div>
      </div>
      <table class="price-table">
        <thead>
          <tr><th>国家</th><th>本地价格</th><th>人民币(CNY)</th><th>操作</th></tr>
        </thead>
        <tbody>
          ${p.monthly.map(m => {
            const c = countries.find(c => c.id === m.id) || { nameZh: m.id, flag: '🌍' }
            return `<tr>
              <td><span class="flag">${c.flag}</span> <span class="country-name">${c.nameZh}</span></td>
              <td><input type="text" value="${m.local}" onchange="updatePrice('${p.id}','${m.id}','local',this.value)"></td>
              <td><input class="cny-input" type="number" value="${m.cny}" step="0.01" onchange="updatePrice('${p.id}','${m.id}','cny',parseFloat(this.value))"></td>
              <td><button class="remove-btn" onclick="removePrice('${p.id}','${m.id}')" title="删除价格">×</button></td>
            </tr>`
          }).join('')}
        </tbody>
      </table>
      <button class="btn" onclick="addPriceRow('${p.id}')" style="margin-top:12px; width:100%">+ 添加价格行</button>
    </div>`
  ).join('')
}

// --- Modals & CRUD ---
let editingProductId = null
let pendingNewPrices = []

function openAddProduct() {
  editingProductId = null
  document.getElementById('productModalTitle').textContent = '添加新产品'
  document.getElementById('pId').value = ''
  document.getElementById('pId').disabled = false
  document.getElementById('pName').value = ''
  document.getElementById('pIcon').value = '📦'
  renderPriceEditor([])
  document.getElementById('productModal').classList.remove('hidden')
}

function editProduct(id) {
  editingProductId = id
  const p = currentProducts.find(x => x.id === id)
  document.getElementById('productModalTitle').textContent = '编辑产品信息: ' + p.name
  document.getElementById('pId').value = p.id
  document.getElementById('pId').disabled = true
  document.getElementById('pName').value = p.name
  document.getElementById('pIcon').value = p.icon
  renderPriceEditor(p.monthly)
  document.getElementById('productModal').classList.remove('hidden')
}

function closeModal() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'))
}

function renderPriceEditor(prices) {
  pendingNewPrices = JSON.parse(JSON.stringify(prices))
  const el = document.getElementById('pPrices')
  el.innerHTML = `<label>价格列表</label>` +
    (pendingNewPrices.length ? pendingNewPrices.map((m, i) => {
      return `<div class="price-row" style="display:flex; gap:8px; margin-bottom:8px">
        <select style="flex:1" onchange="pendingNewPrices[${i}].id = this.value">
          <option value="">国家</option>
          ${countries.map(c => `<option value="${c.id}" ${c.id === m.id ? 'selected' : ''}>${c.flag} ${c.nameZh}</option>`).join('')}
        </select>
        <input type="text" style="flex:1" value="${m.local}" placeholder="本地价" onchange="pendingNewPrices[${i}].local = this.value">
        <input type="number" style="width:80px" value="${m.cny}" step="0.01" placeholder="CNY" onchange="pendingNewPrices[${i}].cny = parseFloat(this.value)">
        <button class="btn btn-danger" onclick="removeNewPrice(${i})">×</button>
      </div>`
    }).join('') : '<div style="color:var(--muted); font-size:12px">暂无价格数据</div>') +
    `<button class="btn" onclick="addNewPriceRow()" style="width:100%; margin-top:8px">+ 添加价格</button>`
}

function addNewPriceRow() {
  pendingNewPrices.push({ id: '', local: '', cny: 0 })
  renderPriceEditor(pendingNewPrices)
}

function removeNewPrice(i) {
  pendingNewPrices.splice(i, 1)
  renderPriceEditor(pendingNewPrices)
}

async function saveProduct() {
  const cat = document.getElementById('catSelect').value
  const id = document.getElementById('pId').value.trim()
  const name = document.getElementById('pName').value.trim()
  const icon = document.getElementById('pIcon').value.trim()

  if (!id || !name) return toast('请填写基本信息', true)
  
  const validPrices = pendingNewPrices.filter(p => p.id && p.cny)
  
  try {
    const method = editingProductId ? 'PUT' : 'POST'
    const path = editingProductId ? `/admin/products/${cat}/${id}` : `/admin/products/${cat}`
    
    await api(path, {
      method,
      body: JSON.stringify({ id, name, icon, monthly: validPrices })
    })
    
    toast('保存成功')
    closeModal()
    loadProducts()
  } catch (e) { /* Error handled in api() */ }
}

async function deleteProduct(id) {
  if (!confirm(`确定要删除产品 ${id} 吗？`)) return
  const cat = document.getElementById('catSelect').value
  try {
    await api(`/admin/products/${cat}/${id}`, { method: 'DELETE' })
    toast('已删除')
    loadProducts()
  } catch (e) { }
}

async function updatePrice(productId, countryId, key, value) {
  const cat = document.getElementById('catSelect').value
  const p = currentProducts.find(x => x.id === productId)
  const monthly = p.monthly.map(m => m.id === countryId ? { ...m, [key]: value } : m)
  try {
    await api(`/admin/products/${cat}/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ monthly })
    })
    toast('价格已更新')
  } catch (e) { }
}

async function removePrice(productId, countryId) {
  if (!confirm('确定删除该国家价格？')) return
  const cat = document.getElementById('catSelect').value
  const p = currentProducts.find(x => x.id === productId)
  const monthly = p.monthly.filter(m => m.id !== countryId)
  try {
    await api(`/admin/products/${cat}/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ monthly })
    })
    toast('价格已移除')
    loadProducts()
  } catch (e) { }
}

async function addPriceRow(productId) {
  const p = currentProducts.find(x => x.id === productId)
  const usedIds = p.monthly.map(m => m.id)
  const available = countries.find(c => !usedIds.includes(c.id))
  if (!available) return toast('没有更多国家可选', true)
  
  p.monthly.push({ id: available.id, local: '', cny: 0 })
  renderProducts()
  toast('已添加新行，请编辑并保存')
}

// --- Countries ---
function renderCountries() {
  document.getElementById('countryList').innerHTML = countries.map(c => `
    <div class="country-item">
      <div class="info">
        <span class="flag">${c.flag}</span>
        <span class="name">${c.nameZh}</span>
        <span class="currency">${c.currency} (${c.symbol})</span>
      </div>
      <div class="actions">
        <button class="btn" onclick="editCountry('${c.id}')">✏️ 编辑</button>
      </div>
    </div>`
  ).join('')
}

let editingCountryId = null
function openAddCountry() {
  editingCountryId = null
  document.getElementById('cId').value = ''
  document.getElementById('cId').disabled = false
  document.getElementById('cName').value = ''
  document.getElementById('cNameZh').value = ''
  document.getElementById('cFlag').value = ''
  document.getElementById('cCurrency').value = ''
  document.getElementById('cSymbol').value = ''
  document.getElementById('countryModal').classList.remove('hidden')
}

function editCountry(id) {
  const c = countries.find(x => x.id === id)
  editingCountryId = id
  document.getElementById('cId').value = c.id
  document.getElementById('cId').disabled = true
  document.getElementById('cName').value = c.name
  document.getElementById('cNameZh').value = c.nameZh
  document.getElementById('cFlag').value = c.flag
  document.getElementById('cCurrency').value = c.currency
  document.getElementById('cSymbol').value = c.symbol
  document.getElementById('countryModal').classList.remove('hidden')
}

async function saveCountry() {
  const id = document.getElementById('cId').value.trim()
  const data = {
    name: document.getElementById('cName').value.trim(),
    nameZh: document.getElementById('cNameZh').value.trim(),
    flag: document.getElementById('cFlag').value.trim(),
    currency: document.getElementById('cCurrency').value.trim(),
    symbol: document.getElementById('cSymbol').value.trim()
  }
  
  try {
    const method = editingCountryId ? 'PUT' : 'POST'
    const path = editingCountryId ? `/admin/countries/${id}` : '/admin/countries'
    await api(path, { method, body: JSON.stringify(data) })
    toast('国家信息已保存')
    closeModal()
    init()
  } catch (e) { }
}

// --- Submissions ---
async function loadSubmissions() {
  try {
    const data = await api('/admin/submissions')
    currentSubmissions = data || []
    updatePendingBadge()
    renderSubmissions()
  } catch(e) { }
}

function updatePendingBadge() {
  const pending = currentSubmissions.filter(s => s.status === 'pending').length
  const badge = document.getElementById('pendingBadge')
  if (pending > 0) {
    badge.textContent = pending
    badge.classList.remove('hidden')
  } else {
    badge.classList.add('hidden')
  }
}

function filterSubmissions(status) {
  currentFilter = status
  document.querySelectorAll('#tabSubmissions .tab-btn').forEach(b => b.classList.remove('active'))
  document.getElementById('filter' + status.charAt(0).toUpperCase() + status.slice(1)).classList.add('active')
  renderSubmissions()
}

function renderSubmissions() {
  const filtered = currentSubmissions.filter(s => s.status === currentFilter)
  const el = document.getElementById('submissionsList')

  if (!filtered.length) {
    el.innerHTML = `<div class="empty-state">暂无相关提交记录</div>`
    return
  }

  el.innerHTML = filtered.map(s => {
    const time = new Date(s.createdAt).toLocaleString()
    return `<div class="submission-item ${s.status}">
      <div class="submission-header">
        <h4>${s.productId} (${s.countryId})</h4>
        <span class="status-badge ${s.status}">${STATUS_NAMES[s.status]}</span>
      </div>
      <div class="submission-body">
        <div class="price-info">💰 价格：${s.local} (CNY: ${s.cny})</div>
        ${s.submitterNote ? `<div class="note">备注: ${s.submitterNote}</div>` : ''}
        <div style="margin-top:8px; font-size:11px">提交时间: ${time}</div>
      </div>
      ${s.status === 'pending' ? `
        <div class="submission-actions" style="margin-top:12px">
          <button class="btn btn-primary" onclick="reviewSubmission('${s._id || s.id}', 'approved')">通过</button>
          <button class="btn btn-danger" onclick="reviewSubmission('${s._id || s.id}', 'rejected')">拒绝</button>
        </div>
      ` : ''}
    </div>`
  }).join('')
}

async function reviewSubmission(id, status) {
  try {
    await api(`/admin/submissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
    toast('审核已完成')
    loadSubmissions()
    if (status === 'approved') loadProducts()
  } catch(e) { }
}

// Global Exports
window.login = login
window.logout = logout
window.switchTab = switchTab
window.loadProducts = loadProducts
window.openAddProduct = openAddProduct
window.editProduct = editProduct
window.closeModal = closeModal
window.saveProduct = saveProduct
window.deleteProduct = deleteProduct
window.updatePrice = updatePrice
window.removePrice = removePrice
window.addPriceRow = addPriceRow
window.addNewPriceRow = addNewPriceRow
window.removeNewPrice = removeNewPrice
window.openAddCountry = openAddCountry
window.editCountry = editCountry
window.saveCountry = saveCountry
window.filterSubmissions = filterSubmissions
window.reviewSubmission = reviewSubmission

// Auto-init if token exists
if (token) {
  showAdmin()
  init()
} else {
  showLogin()
}
