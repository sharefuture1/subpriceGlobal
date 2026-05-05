// ============================================================
// 安全工具产品定价
// ============================================================
export const securityProducts = [
  {
    id: 'nordvpn',
    name: 'NordVPN',
    icon: '🔒',
    monthly: [
      { id: 'cn', price: 88 },
      { id: 'tr', price: 299.99 },
      { id: 'ar', price: 9999 },
      { id: 'in', price: 999 },
      { id: 'br', price: 49.90 },
      { id: 'pl', price: 59.99 },
      { id: 'jp', price: 1799 },
      { id: 'ca', price: 12.99 },
      { id: 'au', price: 14.99 },
      { id: 'us', price: 11.99 },
      { id: 'gb', price: 9.99 },
      { id: 'de', price: 10.99 },
    ]
  },
  {
    id: '1password',
    name: '1Password',
    icon: '🗝️',
    monthly: [
      { id: 'cn', price: 28 },
      { id: 'jp', price: 499 },
      { id: 'tr', price: 199.99 },
      { id: 'in', price: 599 },
      { id: 'ar', price: 7999 },
      { id: 'br', price: 34.99 },
      { id: 'ca', price: 4.99 },
      { id: 'au', price: 5.49 },
      { id: 'us', price: 2.99 },
      { id: 'gb', price: 2.65 },
      { id: 'de', price: 2.99 },
    ]
  },
  {
    id: 'bitwarden',
    name: 'Bitwarden Premium',
    icon: '🛡️',
    monthly: [
      { id: 'cn', price: 8 },
      { id: 'us', price: 1.00 },
    ]
  },
  {
    id: 'lastpass',
    name: 'LastPass Premium',
    icon: '🔑',
    monthly: [
      { id: 'cn', price: 28 },
      { id: 'us', price: 3.00 },
      { id: 'gb', price: 2.80 },
    ]
  },
]

export default securityProducts
