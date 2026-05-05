// 国家/地区数据
// 修改方法：直接编辑 countries 数组，添加/修改国家条目即可

export const COUNTRIES = [
  // === 亚洲 ===
  { id:'cn',     name:'China',         flag:'🇨🇳', currency:'CNY', symbol:'¥' },
  { id:'hk',     name:'Hong Kong',     flag:'🇭🇰', currency:'HKD', symbol:'HK$' },
  { id:'tw',     name:'Taiwan',        flag:'🇹🇼', currency:'TWD', symbol:'NT$' },
  { id:'mo',     name:'Macau',         flag:'🇲🇴', currency:'MOP', symbol:'MOP' },
  { id:'jp',     name:'Japan',         flag:'🇯🇵', currency:'JPY', symbol:'¥' },
  { id:'kr',     name:'South Korea',   flag:'🇰🇷', currency:'KRW', symbol:'₩' },
  { id:'sg',     name:'Singapore',     flag:'🇸🇬', currency:'SGD', symbol:'S$' },
  { id:'my',     name:'Malaysia',      flag:'🇲🇾', currency:'MYR', symbol:'RM' },
  { id:'th',     name:'Thailand',      flag:'🇹🇭', currency:'THB', symbol:'฿' },
  { id:'vn',     name:'Vietnam',       flag:'🇻🇳', currency:'VND', symbol:'₫' },
  { id:'id',     name:'Indonesia',     flag:'🇮🇩', currency:'IDR', symbol:'Rp' },
  { id:'ph',     name:'Philippines',   flag:'🇵🇭', currency:'PHP', symbol:'₱' },
  { id:'pk',     name:'Pakistan',      flag:'🇵🇰', currency:'PKR', symbol:'₨' },
  { id:'in',     name:'India',         flag:'🇮🇳', currency:'INR', symbol:'₹' },
  { id:'bd',     name:'Bangladesh',    flag:'🇧🇩', currency:'BDT', symbol:'৳' },
  { id:'tr',     name:'Turkey',        flag:'🇹🇷', currency:'TRY', symbol:'₺' },
  { id:'sa',     name:'Saudi Arabia',  flag:'🇸🇦', currency:'SAR', symbol:'﷼' },
  { id:'ae',     name:'UAE',           flag:'🇦🇪', currency:'AED', symbol:'د.إ' },
  { id:'il',     name:'Israel',        flag:'🇮🇱', currency:'ILS', symbol:'₪' },
  { id:'ua',     name:'Ukraine',       flag:'🇺🇦', currency:'UAH', symbol:'₴' },
  { id:'kz',     name:'Kazakhstan',    flag:'🇰🇿', currency:'KZT', symbol:'₸' },

  // === 欧洲 ===
  { id:'gb',     name:'United Kingdom',flag:'🇬🇧', currency:'GBP', symbol:'£' },
  { id:'de',     name:'Germany',       flag:'🇩🇪', currency:'EUR', symbol:'€' },
  { id:'fr',     name:'France',        flag:'🇫🇷', currency:'EUR', symbol:'€' },
  { id:'it',     name:'Italy',         flag:'🇮🇹', currency:'EUR', symbol:'€' },
  { id:'es',     name:'Spain',         flag:'🇪🇸', currency:'EUR', symbol:'€' },
  { id:'nl',     name:'Netherlands',   flag:'🇳🇱', currency:'EUR', symbol:'€' },
  { id:'pl',     name:'Poland',        flag:'🇵🇱', currency:'PLN', symbol:'zł' },
  { id:'se',     name:'Sweden',        flag:'🇸🇪', currency:'SEK', symbol:'kr' },
  { id:'no',     name:'Norway',        flag:'🇳🇴', currency:'NOK', symbol:'kr' },
  { id:'dk',     name:'Denmark',       flag:'🇩🇰', currency:'DKK', symbol:'kr' },
  { id:'ch',     name:'Switzerland',    flag:'🇨🇭', currency:'CHF', symbol:'Fr' },
  { id:'at',     name:'Austria',       flag:'🇦🇹', currency:'EUR', symbol:'€' },
  { id:'be',     name:'Belgium',       flag:'🇧🇪', currency:'EUR', symbol:'€' },
  { id:'pt',     name:'Portugal',      flag:'🇵🇹', currency:'EUR', symbol:'€' },
  { id:'ie',     name:'Ireland',       flag:'🇮🇪', currency:'EUR', symbol:'€' },
  { id:'fi',     name:'Finland',       flag:'🇫🇮', currency:'EUR', symbol:'€' },
  { id:'cz',     name:'Czech',         flag:'🇨🇿', currency:'CZK', symbol:'Kč' },
  { id:'hu',     name:'Hungary',       flag:'🇭🇺', currency:'HUF', symbol:'Ft' },
  { id:'ro',     name:'Romania',       flag:'🇷🇴', currency:'RON', symbol:'lei' },
  { id:'ru',     name:'Russia',        flag:'🇷🇺', currency:'RUB', symbol:'₽' },
  { id:'by',     name:'Belarus',       flag:'🇧🇾', currency:'BYR', symbol:'Br' },

  // === 美洲 ===
  { id:'us',     name:'United States', flag:'🇺🇸', currency:'USD', symbol:'$' },
  { id:'ca',     name:'Canada',        flag:'🇨🇦', currency:'CAD', symbol:'C$' },
  { id:'mx',     name:'Mexico',        flag:'🇲🇽', currency:'MXN', symbol:'MX$' },
  { id:'br',     name:'Brazil',        flag:'🇧🇷', currency:'BRL', symbol:'R$' },
  { id:'ar',     name:'Argentina',     flag:'🇦🇷', currency:'ARS', symbol:'$' },
  { id:'cl',     name:'Chile',         flag:'🇨🇱', currency:'CLP', symbol:'$' },
  { id:'co',     name:'Colombia',      flag:'🇨🇴', currency:'COP', symbol:'$' },
  { id:'pe',     name:'Peru',          flag:'🇵🇪', currency:'PEN', symbol:'S/' },
  { id:'ve',     name:'Venezuela',     flag:'🇻🇪', currency:'VES', symbol:'Bs' },
  { id:'ec',     name:'Ecuador',       flag:'🇪🇨', currency:'USD', symbol:'$' },
  { id:'bo',     name:'Bolivia',       flag:'🇧🇴', currency:'BOB', symbol:'Bs' },
  { id:'py',     name:'Paraguay',      flag:'🇵🇾', currency:'PYG', symbol:'₲' },

  // === 非洲 ===
  { id:'eg',     name:'Egypt',         flag:'🇪🇬', currency:'EGP', symbol:'E£' },
  { id:'za',     name:'South Africa',  flag:'🇿🇦', currency:'ZAR', symbol:'R' },
  { id:'ng',     name:'Nigeria',       flag:'🇳🇬', currency:'NGN', symbol:'₦' },
  { id:'ke',     name:'Kenya',         flag:'🇰🇪', currency:'KES', symbol:'KSh' },
  { id:'ma',     name:'Morocco',       flag:'🇲🇦', currency:'MAD', symbol:'د.م.' },

  // === 大洋洲 ===
  { id:'au',     name:'Australia',     flag:'🇦🇺', currency:'AUD', symbol:'A$' },
  { id:'nz',     name:'New Zealand',   flag:'🇳🇿', currency:'NZD', symbol:'NZ$' },
]

// 通过 ID 快速查找
export const countryById = (id) => COUNTRIES.find(c => c.id === id)

// 通过货币快速筛选
export const countriesByCurrency = (currency) =>
  COUNTRIES.filter(c => c.currency === currency)