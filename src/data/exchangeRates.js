/**
 * 实时汇率数据 (以 1 人民币 CNY 为基准)
 * 1 CNY = 1.0 / rate 目标货币
 * 或者直接存储 1 外币 = X 人民币 (这样计算更方便: CNY = Local * Rate)
 */
export const EXCHANGE_RATES = {
  CNY: 1.0,
  USD: 7.27,    // 1 USD = 7.27 CNY
  EUR: 7.92,    // 1 EUR = 7.92 CNY
  GBP: 9.25,    // 1 GBP = 9.25 CNY
  JPY: 0.046,   // 1 JPY = 0.046 CNY
  HKD: 0.93,    // 1 HKD = 0.93 CNY
  TWD: 0.22,    // 1 TWD = 0.22 CNY
  KRW: 0.0053,  // 1 KRW = 0.0053 CNY
  SGD: 5.38,    // 1 SGD = 5.38 CNY
  MYR: 1.53,    // 1 MYR = 1.53 CNY
  THB: 0.20,    // 1 THB = 0.20 CNY
  VND: 0.00028, // 1 VND = 0.00028 CNY
  IDR: 0.00045, // 1 IDR = 0.00045 CNY
  PHP: 0.12,    // 1 PHP = 0.12 CNY
  PKR: 0.026,   // 1 PKR = 0.026 CNY
  INR: 0.087,   // 1 INR = 0.087 CNY
  TRY: 0.22,    // 1 TRY = 0.22 CNY
  BRL: 1.42,    // 1 BRL = 1.42 CNY
  ARS: 0.0081,  // 1 ARS = 0.0081 CNY
  MXN: 0.43,    // 1 MXN = 0.43 CNY
  CAD: 5.32,    // 1 CAD = 5.32 CNY
  AUD: 4.81,    // 1 AUD = 4.81 CNY
  NZD: 4.38,    // 1 NZD = 4.38 CNY
  EGP: 0.15,    // 1 EGP = 0.15 CNY
  UAH: 0.18,    // 1 UAH = 0.18 CNY
  SAR: 1.94,    // 1 SAR = 1.94 CNY
  ILS: 1.95,    // 1 ILS = 1.95 CNY
  COP: 0.0018,  // 1 COP = 0.0018 CNY
  CLP: 0.0078,  // 1 CLP = 0.0078 CNY
  PLN: 1.83,    // 1 PLN = 1.83 CNY
};

/**
 * 将本地货币转为人民币
 * @param {number} price 本地价格
 * @param {string} currency 货币代码 (如 USD, TRY)
 * @returns {number} 人民币价格
 */
export const convertToCNY = (price, currency) => {
  const rate = EXCHANGE_RATES[currency] || 0;
  return +(price * rate).toFixed(2);
};

export default {
  EXCHANGE_RATES,
  convertToCNY
};
