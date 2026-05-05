import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import * as api from '../services/api.js';
import { getStaticProducts, enrichProduct, COUNTRIES } from '../data/index.js';
import { EXCHANGE_RATES } from '../data/exchangeRates.js';

export const useProductStore = defineStore('product', () => {
  const loading = ref(false);
  const dataSource = ref('static');
  const apiProducts = ref({});
  const staticProductsMap = ref({}); 
  const loadedCategories = ref(new Set());
  const allCountries = ref([]);
  const rates = ref({ ...EXCHANGE_RATES });

  const currentCat = ref('ai');
  const currentProduct = ref('chatgpt');
  const annualMode = ref(false);
  const searchQuery = ref('');
  const debouncedSearchQuery = ref('');
  const currentSort = ref('price');
  const currentRegion = ref('all');

  // Debounce search query
  let searchTimeout = null;
  watch(searchQuery, (newVal) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      debouncedSearchQuery.value = newVal;
    }, 300);
  });

  const fetchInitialData = async () => {
    // 1. Try to load from cache first for instant UI
    const cachedData = localStorage.getItem('subprice_cache');
    const cachedTime = localStorage.getItem('subprice_cache_time');
    
    if (cachedData && cachedTime) {
      const now = Date.now();
      const age = now - parseInt(cachedTime);
      if (age < 5 * 60 * 1000) {
        const parsed = JSON.parse(cachedData);
        allCountries.value = parsed.countries;
        apiProducts.value = parsed.products;
        dataSource.value = 'api';
        return;
      }
    }
    
    // Fetch rates
    try {
      const rateData = await fetch('https://api.exchangerate-api.com/v4/latest/CNY').then(r => r.json());
      if (rateData && rateData.rates) {
        // The API returns 1 CNY = X Foreign. We need 1 Foreign = X CNY.
        // So Rate = 1 / rateData.rates[Currency]
        const newRates = { CNY: 1.0 };
        for (const [code, val] of Object.entries(rateData.rates)) {
          newRates[code] = +(1 / val).toFixed(4);
        }
        rates.value = newRates;
        console.log('[productStore] Rates updated from API');
      }
    } catch (e) {
      console.warn('[productStore] Failed to fetch live rates, using static fallback');
    }

    loading.value = true;
    try {
      const countries = await api.getCountries();
      allCountries.value = countries;
      dataSource.value = 'api';
      
      const data = await api.getProducts();
      const newApiProducts = {};

      for (const catKey of Object.keys(data)) {
        const catData = data[catKey];
        if (catData && catData.products) {
          for (const p of catData.products) {
            p.enrichedCountries = (p.monthly || []).map(entry => {
              const c = (Array.isArray(countries) ? countries : []).find(x => x.id === entry.id);
              return {
                id: entry.id,
                name: c?.name || entry.id,
                nameZh: c?.nameZh || c?.name || entry.id,
                flag: c?.flag || '🌍',
                currency: c?.currency || '',
                local: entry.local,
                cny: entry.cny
              };
            });
            newApiProducts[p.id] = p;
          }
        }
      }
      apiProducts.value = newApiProducts;

      // Update cache
      localStorage.setItem('subprice_cache', JSON.stringify({
        countries: allCountries.value,
        products: apiProducts.value
      }));
      localStorage.setItem('subprice_cache_time', Date.now().toString());

    } catch (e) {
      console.error('fetchInitialData failed:', e.message);
      dataSource.value = 'static';
      await loadStaticCategory(currentCat.value);
    } finally {
      loading.value = false;
    }
  };

  const loadStaticCategory = async (cat) => {
    if (loadedCategories.value.has(cat)) return;
    const products = await getStaticProducts(cat);
    const enriched = {};
    products.forEach(p => {
      // Pass the current rates to enrichProduct if we want to use live rates
      // But enrichProduct is currently using the imported static rates.
      // Let's modify enrichProduct to accept rates as an argument.
      enriched[p.id] = enrichProduct({ ...p, cat }, rates.value);
    });
    staticProductsMap.value = { ...staticProductsMap.value, ...enriched };
    loadedCategories.value.add(cat);
  };

  const allProducts = computed(() => {
    if (dataSource.value === 'api' && Object.keys(apiProducts.value).length > 0) {
      return apiProducts.value;
    }
    return staticProductsMap.value;
  });

  const filteredProducts = computed(() => {
    const products = Object.values(allProducts.value);
    // In static mode, we might only have one category loaded, so we filter what we have
    return products.filter(p => p.cat === currentCat.value || p.category === currentCat.value);
  });

  const baseList = computed(() => {
    let product = allProducts.value[currentProduct.value];
    if (!product && filteredProducts.value.length > 0) {
      const first = filteredProducts.value[0];
      product = first;
    }
    if (!product) return [];
    let list = (product.enrichedCountries || []).map(c => ({ ...c }));
    
    // Region filter
    if (currentRegion.value !== 'all') {
      list = list.filter(c => {
        const country = allCountries.value.find(x => x.id === c.id) || COUNTRIES.find(x => x.id === c.id);
        return country?.region === currentRegion.value;
      });
    }

    if (annualMode.value) list = list.map(c => ({ ...c, cny: +(c.cny * 12 * 0.83).toFixed(2) }));
    return list;
  });

  const filteredList = computed(() => {
    if (!debouncedSearchQuery.value) return baseList.value;
    const q = debouncedSearchQuery.value.toLowerCase();
    return baseList.value.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.nameZh && c.nameZh.toLowerCase().includes(q)) ||
      c.currency.toLowerCase().includes(q) ||
      c.local.toLowerCase().includes(q)
    );
  });

  const sortedList = computed(() => {
    let list = [...filteredList.value];
    if (currentSort.value === 'price') list.sort((a, b) => a.cny - b.cny);
    else if (currentSort.value === 'price-desc') list.sort((a, b) => b.cny - a.cny);
    else if (currentSort.value === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  });

  const summary = computed(() => {
    const prices = baseList.value.map(c => c.cny);
    if (!prices.length) return { min: 0, max: 0, savePct: 0, count: 0 };
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return {
      min: min.toFixed(0),
      max: max.toFixed(0),
      savePct: Math.round((1 - min / max) * 100),
      count: baseList.value.length
    };
  });

  const setCategory = async (cat) => {
    currentCat.value = cat;
    if (dataSource.value === 'static' && !loadedCategories.value.has(cat)) {
      loading.value = true;
      try {
        await loadStaticCategory(cat);
      } finally {
        loading.value = false;
      }
    }
    const first = filteredProducts.value[0];
    if (first) currentProduct.value = first.id;
    searchQuery.value = '';
  };

  return {
    loading, dataSource, allCountries, currentCat, currentProduct,
    annualMode, searchQuery, currentSort, currentRegion,
    allProducts, filteredProducts, sortedList, summary,
    fetchInitialData, setCategory
  };
});
