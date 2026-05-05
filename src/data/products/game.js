// ============================================================
// 游戏产品定价
// ============================================================
export const gameProducts = [
  {
    id: 'xgp',
    name: 'Xbox Game Pass Ultimate',
    icon: '🎮',
    monthly: [
      { id: 'cn', price: 118 },
      { id: 'tr', price: 349.99 },
      { id: 'ar', price: 7999 },
      { id: 'in', price: 699 },
      { id: 'br', price: 44.99 },
      { id: 'mx', price: 249 },
      { id: 'pl', price: 64.99 },
      { id: 'jp', price: 1210 },
      { id: 'kr', price: 14900 },
      { id: 'ca', price: 21.99 },
      { id: 'au', price: 24.95 },
      { id: 'us', price: 19.99 },
      { id: 'gb', price: 14.99 },
      { id: 'de', price: 14.99 },
      { id: 'sg', price: 18.90 },
    ]
  },
  {
    id: 'psplus',
    name: 'PS Plus Essential',
    icon: '🎯',
    monthly: [
      { id: 'cn', price: 75 },
      { id: 'jp', price: 850 },
      { id: 'ar', price: 4999 },
      { id: 'tr', price: 239.99 },
      { id: 'in', price: 999 },
      { id: 'br', price: 36.99 },
      { id: 'pl', price: 34.99 },
      { id: 'mx', price: 179 },
      { id: 'kr', price: 8900 },
      { id: 'ca', price: 11.99 },
      { id: 'au', price: 12.95 },
      { id: 'us', price: 9.99 },
      { id: 'gb', price: 6.99 },
      { id: 'de', price: 8.99 },
      { id: 'sg', price: 11.98 },
    ]
  },
  {
    id: 'nintendo',
    name: 'Nintendo Switch Online',
    icon: '🕹️',
    monthly: [
      { id: 'cn', price: 18 },
      { id: 'ar', price: 1699 },
      { id: 'tr', price: 129.99 },
      { id: 'br', price: 19.99 },
      { id: 'in', price: 499 },
      { id: 'mx', price: 149 },
      { id: 'jp', price: 2400 },
      { id: 'ca', price: 6.99 },
      { id: 'au', price: 8.99 },
      { id: 'us', price: 3.99 },
      { id: 'gb', price: 3.49 },
      { id: 'de', price: 3.99 },
    ]
  },
  {
    id: 'steam',
    name: 'Steam Subscription',
    icon: '🎲',
    monthly: [
      { id: 'cn', price: 68 },
      { id: 'ar', price: 5999 },
      { id: 'tr', price: 299.99 },
      { id: 'br', price: 29.90 },
      { id: 'in', price: 349 },
      { id: 'us', price: 4.99 },
      { id: 'gb', price: 3.99 },
      { id: 'de', price: 4.99 },
    ]
  },
]

export default gameProducts
