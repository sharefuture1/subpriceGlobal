// ============================================================
// 流媒体产品定价
// ============================================================
export const streamProducts = [
  {
    id: 'netflix',
    name: 'Netflix Standard',
    icon: '🎬',
    monthly: [
      { id: 'cn', local: '¥ 79 / 月', cny: 79 },
      { id: 'hk', local: 'HKD 63 / 月', cny: 59 },
      { id: 'ar', local: 'ARS 2,490', cny: 18.33 },
      { id: 'pk', local: 'PKR 1,100', cny: 26.99 },
      { id: 'tr', local: 'TRY 164.99', cny: 25.17 },
      { id: 'eg', local: 'EGP 299.99', cny: 44.22 },
      { id: 'vn', local: 'VND 260,000', cny: 67.72 },
      { id: 'in', local: 'INR 649', cny: 54.77 },
      { id: 'th', local: 'THB 280', cny: 56.18 },
      { id: 'ph', local: 'PHP 549', cny: 62.45 },
      { id: 'id', local: 'IDR 154,000', cny: 68.00 },
      { id: 'br', local: 'BRL 39.90', cny: 48.88 },
      { id: 'mx', local: 'MXN 219', cny: 77.29 },
      { id: 'co', local: 'COP 19,900', cny: 32.99 },
      { id: 'pl', local: 'PLN 56', cny: 96.25 },
      { id: 'my', local: 'MYR 54.90', cny: 83.82 },
      { id: 'ua', local: 'UAH 189', cny: 33.02 },
      { id: 'jp', local: 'JPY 1,590', cny: 68.22 },
      { id: 'kr', local: 'KRW 13,500', cny: 69.87 },
      { id: 'ca', local: 'CAD 16.99', cny: 85.01 },
      { id: 'au', local: 'AUD 18.99', cny: 90.79 },
      { id: 'nz', local: 'NZD 19.99', cny: 82.00 },
      { id: 'us', local: 'USD 15.49', cny: 112.62 },
      { id: 'gb', local: 'GBP 10.99', cny: 103.70 },
      { id: 'de', local: 'EUR 12.99', cny: 105.19 },
      { id: 'sg', local: 'SGD 15.98', cny: 85.47 },
    ]
  },
  {
    id: 'disney',
    name: 'Disney+',
    icon: '🏰',
    monthly: [
      { id: 'cn', local: '¥ 73 / 月', cny: 73 },
      { id: 'tr', local: 'TRY 89.99', cny: 13.72 },
      { id: 'ar', local: 'ARS 2,499', cny: 18.39 },
      { id: 'in', local: 'INR 299', cny: 25.23 },
      { id: 'id', local: 'IDR 49,000', cny: 21.64 },
      { id: 'vn', local: 'VND 86,000', cny: 22.40 },
      { id: 'ph', local: 'PHP 279', cny: 31.74 },
      { id: 'th', local: 'THB 179', cny: 35.91 },
      { id: 'br', local: 'BRL 33.90', cny: 41.53 },
      { id: 'my', local: 'MYR 26.90', cny: 41.06 },
      { id: 'mx', local: 'MXN 179', cny: 63.14 },
      { id: 'jp', local: 'JPY 990', cny: 42.50 },
      { id: 'kr', local: 'KRW 9,900', cny: 51.23 },
      { id: 'ca', local: 'CAD 11.99', cny: 59.99 },
      { id: 'au', local: 'AUD 13.99', cny: 66.89 },
      { id: 'us', local: 'USD 13.99', cny: 101.73 },
      { id: 'gb', local: 'GBP 4.99', cny: 47.09 },
      { id: 'de', local: 'EUR 8.99', cny: 72.83 },
      { id: 'sg', local: 'SGD 11.98', cny: 64.06 },
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube Premium',
    icon: '▶️',
    monthly: [
      { id: 'cn', local: '¥ 65 / 月', cny: 65 },
      { id: 'ar', local: 'ARS 1,599', cny: 11.76 },
      { id: 'vn', local: 'VND 79,000', cny: 20.57 },
      { id: 'ua', local: 'UAH 99', cny: 17.29 },
      { id: 'tr', local: 'TRY 139.99', cny: 21.35 },
      { id: 'in', local: 'INR 179', cny: 15.10 },
      { id: 'id', local: 'IDR 59,000', cny: 26.06 },
      { id: 'ph', local: 'PHP 219', cny: 24.91 },
      { id: 'br', local: 'BRL 23.90', cny: 29.27 },
      { id: 'th', local: 'THB 179', cny: 35.91 },
      { id: 'my', local: 'MYR 22.90', cny: 34.95 },
      { id: 'mx', local: 'MXN 129', cny: 45.52 },
      { id: 'jp', local: 'JPY 1,280', cny: 54.96 },
      { id: 'kr', local: 'KRW 14,900', cny: 77.12 },
      { id: 'ca', local: 'CAD 17.99', cny: 90.01 },
      { id: 'au', local: 'AUD 17.99', cny: 86.01 },
      { id: 'us', local: 'USD 13.99', cny: 101.73 },
      { id: 'gb', local: 'GBP 12.99', cny: 122.54 },
      { id: 'de', local: 'EUR 11.99', cny: 97.11 },
      { id: 'sg', local: 'SGD 16.98', cny: 90.82 },
    ]
  },
  {
    id: 'hbo',
    name: 'Max (HBO)',
    icon: '🎭',
    monthly: [
      { id: 'cn', local: '¥ 95 / 月', cny: 95 },
      { id: 'ar', local: 'ARS 1,999', cny: 14.71 },
      { id: 'br', local: 'BRL 34.90', cny: 42.75 },
      { id: 'mx', local: 'MXN 119', cny: 41.99 },
      { id: 'co', local: 'COP 19,900', cny: 32.99 },
      { id: 'pl', local: 'PLN 29.99', cny: 51.53 },
      { id: 'es', local: 'EUR 8.99', cny: 72.83 },
      { id: 'de', local: 'EUR 9.99', cny: 80.94 },
      { id: 'us', local: 'USD 15.99', cny: 116.28 },
    ]
  },
  {
    id: 'primevideo',
    name: 'Prime Video',
    icon: '📺',
    monthly: [
      { id: 'cn', local: '¥ 35 / 月', cny: 35 },
      { id: 'in', local: 'INR 299', cny: 25.23 },
      { id: 'tr', local: 'TRY 59.99', cny: 9.15 },
      { id: 'vn', local: 'VND 59,000', cny: 15.33 },
      { id: 'ph', local: 'PHP 199', cny: 22.64 },
      { id: 'th', local: 'THB 99', cny: 19.87 },
      { id: 'br', local: 'BRL 14.90', cny: 18.25 },
      { id: 'mx', local: 'MXN 99', cny: 34.95 },
      { id: 'ar', local: 'ARS 399', cny: 2.93 },
      { id: 'jp', local: 'JPY 600', cny: 25.77 },
      { id: 'kr', local: 'KRW 6,990', cny: 36.19 },
      { id: 'ca', local: 'CAD 9.99', cny: 49.99 },
      { id: 'au', local: 'AUD 9.99', cny: 47.77 },
      { id: 'us', local: 'USD 8.99', cny: 65.36 },
      { id: 'gb', local: 'GBP 8.99', cny: 84.81 },
      { id: 'de', local: 'EUR 8.99', cny: 72.83 },
    ]
  },
  {
    id: 'dulife',
    name: '哔哩哔哩大会员',
    icon: '📺',
    monthly: [
      { id: 'cn', local: '¥ 25 / 月', cny: 25 },
      { id: 'hk', local: 'HKD 38 / 月', cny: 35 },
    ]
  },
  {
    id: 'iqiyi',
    name: '爱奇艺VIP',
    icon: '🎬',
    monthly: [
      { id: 'cn', local: '¥ 25 / 月', cny: 25 },
      { id: 'hk', local: 'HKD 45 / 月', cny: 42 },
    ]
  },
  {
    id: 'tencent',
    name: '腾讯视频VIP',
    icon: '🎬',
    monthly: [
      { id: 'cn', local: '¥ 30 / 月', cny: 30 },
      { id: 'hk', local: 'HKD 55 / 月', cny: 51 },
    ]
  },
]

export default streamProducts
