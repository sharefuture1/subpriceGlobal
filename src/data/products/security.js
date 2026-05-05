// ============================================================
// 安全工具产品定价
// ============================================================
export const securityProducts = [
  {
    id: 'nordvpn',
    name: 'NordVPN',
    icon: '🔒',
    monthly: [
      { id: 'cn', local: '¥ 88 / 月', cny: 88 },
      { id: 'tr', local: 'TRY 299.99', cny: 45.76 },
      { id: 'ar', local: 'ARS 9,999', cny: 73.59 },
      { id: 'in', local: 'INR 999', cny: 84.30 },
      { id: 'br', local: 'BRL 49.90', cny: 61.14 },
      { id: 'pl', local: 'PLN 59.99', cny: 103.07 },
      { id: 'jp', local: 'JPY 1,799', cny: 77.26 },
      { id: 'ca', local: 'CAD 12.99', cny: 65.00 },
      { id: 'au', local: 'AUD 14.99', cny: 71.66 },
      { id: 'us', local: 'USD 11.99', cny: 87.15 },
      { id: 'gb', local: 'GBP 9.99', cny: 94.26 },
      { id: 'de', local: 'EUR 10.99', cny: 89.00 },
    ]
  },
  {
    id: '1password',
    name: '1Password',
    icon: '🗝️',
    monthly: [
      { id: 'cn', local: '¥ 28 / 月', cny: 28 },
      { id: 'jp', local: 'JPY 499', cny: 21.43 },
      { id: 'tr', local: 'TRY 199.99', cny: 30.51 },
      { id: 'in', local: 'INR 599', cny: 50.55 },
      { id: 'ar', local: 'ARS 7,999', cny: 58.88 },
      { id: 'br', local: 'BRL 34.99', cny: 42.87 },
      { id: 'ca', local: 'CAD 4.99', cny: 24.97 },
      { id: 'au', local: 'AUD 5.49', cny: 26.25 },
      { id: 'us', local: 'USD 2.99', cny: 21.74 },
      { id: 'gb', local: 'GBP 2.65', cny: 25.00 },
      { id: 'de', local: 'EUR 2.99', cny: 24.22 },
    ]
  },
  {
    id: 'bitwarden',
    name: 'Bitwarden Premium',
    icon: '🛡️',
    monthly: [
      { id: 'cn', local: '¥ 8 / 月', cny: 8 },
      { id: 'us', local: 'USD 1.00', cny: 7.27 },
    ]
  },
  {
    id: 'lastpass',
    name: 'LastPass Premium',
    icon: '🔑',
    monthly: [
      { id: 'cn', local: '¥ 28 / 月', cny: 28 },
      { id: 'us', local: 'USD 3.00', cny: 21.81 },
      { id: 'gb', local: 'GBP 2.80', cny: 26.43 },
    ]
  },
]

export default securityProducts
