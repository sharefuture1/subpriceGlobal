// 国家/地区数据
// 修改方法：直接编辑 countries 数组，添加/修改国家条目即可

export const COUNTRIES = [
  // === 亚洲 ===
  { id:'cn',     name:'China',         flag:'🇨🇳', currency:'CNY', symbol:'¥', region: 'Asia' },
  { id:'hk',     name:'Hong Kong',     flag:'🇭🇰', currency:'HKD', symbol:'HK$', region: 'Asia' },
  { id:'tw',     name:'Taiwan',        flag:'🇹🇼', currency:'TWD', symbol:'NT$', region: 'Asia' },
  { id:'mo',     name:'Macau',         flag:'🇲🇴', currency:'MOP', symbol:'MOP', region: 'Asia' },
  { id:'jp',     name:'Japan',         flag:'🇯🇵', currency:'JPY', symbol:'¥', region: 'Asia' },
  { id:'kr',     name:'South Korea',   flag:'🇰🇷', currency:'KRW', symbol:'₩', region: 'Asia' },
  { id:'sg',     name:'Singapore',     flag:'🇸🇬', currency:'SGD', symbol:'S$', region: 'Asia' },
  { id:'my',     name:'Malaysia',      flag:'🇲🇾', currency:'MYR', symbol:'RM', region: 'Asia' },
  { id:'th',     name:'Thailand',      flag:'🇹🇭', currency:'THB', symbol:'฿', region: 'Asia' },
  { id:'vn',     name:'Vietnam',       flag:'🇻🇳', currency:'VND', symbol:'₫', region: 'Asia' },
  { id:'id',     name:'Indonesia',     flag:'🇮🇩', currency:'IDR', symbol:'Rp', region: 'Asia' },
  { id:'ph',     name:'Philippines',   flag:'🇵🇭', currency:'PHP', symbol:'₱', region: 'Asia' },
  { id:'pk',     name:'Pakistan',      flag:'🇵🇰', currency:'PKR', symbol:'₨', region: 'Asia' },
  { id:'in',     name:'India',         flag:'🇮🇳', currency:'INR', symbol:'₹', region: 'Asia' },
  { id:'bd',     name:'Bangladesh',    flag:'🇧🇩', currency:'BDT', symbol:'৳', region: 'Asia' },
  { id:'tr',     name:'Turkey',        flag:'🇹🇷', currency:'TRY', symbol:'₺', region: 'Asia' },
  { id:'sa',     name:'Saudi Arabia',  flag:'🇸🇦', currency:'SAR', symbol:'﷼', region: 'Asia' },
  { id:'ae',     name:'UAE',           flag:'🇦🇪', currency:'AED', symbol:'د.إ', region: 'Asia' },
  { id:'il',     name:'Israel',        flag:'🇮🇱', currency:'ILS', symbol:'₪', region: 'Asia' },
  { id:'ua',     name:'Ukraine',       flag:'🇺🇦', currency:'UAH', symbol:'₴', region: 'Europe' },
  { id:'kz',     name:'Kazakhstan',    flag:'🇰🇿', currency:'KZT', symbol:'₸', region: 'Asia' },

  // === 欧洲 ===
  { id:'gb',     name:'United Kingdom',flag:'🇬🇧', currency:'GBP', symbol:'£', region: 'Europe' },
  { id:'de',     name:'Germany',       flag:'🇩🇪', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'fr',     name:'France',        flag:'🇫🇷', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'it',     name:'Italy',         flag:'🇮🇹', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'es',     name:'Spain',         flag:'🇪🇸', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'nl',     name:'Netherlands',   flag:'🇳🇱', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'pl',     name:'Poland',        flag:'🇵🇱', currency:'PLN', symbol:'zł', region: 'Europe' },
  { id:'se',     name:'Sweden',        flag:'🇸🇪', currency:'SEK', symbol:'kr', region: 'Europe' },
  { id:'no',     name:'Norway',        flag:'🇳🇴', currency:'NOK', symbol:'kr', region: 'Europe' },
  { id:'dk',     name:'Denmark',       flag:'🇩🇰', currency:'DKK', symbol:'kr', region: 'Europe' },
  { id:'ch',     name:'Switzerland',    flag:'🇨🇭', currency:'CHF', symbol:'Fr', region: 'Europe' },
  { id:'at',     name:'Austria',       flag:'🇦🇹', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'be',     name:'Belgium',       flag:'🇧🇪', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'pt',     name:'Portugal',      flag:'🇵🇹', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'ie',     name:'Ireland',       flag:'🇮🇪', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'fi',     name:'Finland',       flag:'🇫🇮', currency:'EUR', symbol:'€', region: 'Europe' },
  { id:'cz',     name:'Czech',         flag:'🇨🇿', currency:'CZK', symbol:'Kč', region: 'Europe' },
  { id:'hu',     name:'Hungary',       flag:'🇭🇺', currency:'HUF', symbol:'Ft', region: 'Europe' },
  { id:'ro',     name:'Romania',       flag:'🇷🇴', currency:'RON', symbol:'lei', region: 'Europe' },
  { id:'ru',     name:'Russia',        flag:'🇷🇺', currency:'RUB', symbol:'₽', region: 'Europe' },
  { id:'by',     name:'Belarus',       flag:'🇧🇾', currency:'BYR', symbol:'Br', region: 'Europe' },

  // === 美洲 ===
  { id:'us',     name:'United States', flag:'🇺🇸', currency:'USD', symbol:'$', region: 'Americas' },
  { id:'ca',     name:'Canada',        flag:'🇨🇦', currency:'CAD', symbol:'C$', region: 'Americas' },
  { id:'mx',     name:'Mexico',        flag:'🇲🇽', currency:'MXN', symbol:'MX$', region: 'Americas' },
  { id:'br',     name:'Brazil',        flag:'🇧🇷', currency:'BRL', symbol:'R$', region: 'Americas' },
  { id:'ar',     name:'Argentina',     flag:'🇦🇷', currency:'ARS', symbol:'$', region: 'Americas' },
  { id:'cl',     name:'Chile',         flag:'🇨🇱', currency:'CLP', symbol:'$', region: 'Americas' },
  { id:'co',     name:'Colombia',      flag:'🇨🇴', currency:'COP', symbol:'$', region: 'Americas' },
  { id:'pe',     name:'Peru',          flag:'🇵🇪', currency:'PEN', symbol:'S/', region: 'Americas' },
  { id:'ve',     name:'Venezuela',     flag:'🇻🇪', currency:'VES', symbol:'Bs', region: 'Americas' },
  { id:'ec',     name:'Ecuador',       flag:'🇪🇨', currency:'USD', symbol:'$', region: 'Americas' },
  { id:'bo',     name:'Bolivia',       flag:'🇧🇴', currency:'BOB', symbol:'Bs', region: 'Americas' },
  { id:'py',     name:'Paraguay',      flag:'🇵🇾', currency:'PYG', symbol:'₲', region: 'Americas' },

  // === 非洲 ===
  { id:'eg',     name:'Egypt',         flag:'🇪🇬', currency:'EGP', symbol:'E£', region: 'Africa' },
  { id:'za',     name:'South Africa',  flag:'🇿🇦', currency:'ZAR', symbol:'R', region: 'Africa' },
  { id:'ng',     name:'Nigeria',       flag:'🇳🇬', currency:'NGN', symbol:'₦', region: 'Africa' },
  { id:'ke',     name:'Kenya',         flag:'🇰🇪', currency:'KES', symbol:'KSh', region: 'Africa' },
  { id:'ma',     name:'Morocco',       flag:'🇲🇦', currency:'MAD', symbol:'د.م.', region: 'Africa' },

  // === 大洋洲 ===
  { id:'au',     name:'Australia',     flag:'🇦🇺', currency:'AUD', symbol:'A$', region: 'Oceania' },
  { id:'nz',     name:'New Zealand',   flag:'🇳🇿', currency:'NZD', symbol:'NZ$', region: 'Oceania' },
]

// 通过 ID 快速查找
export const countryById = (id) => COUNTRIES.find(c => c.id === id)

// 通过货币快速筛选
export const countriesByCurrency = (currency) =>
  COUNTRIES.filter(c => c.currency === currency)