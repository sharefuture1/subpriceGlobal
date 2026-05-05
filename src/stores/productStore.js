import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as api from '../services/api.js';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/index.js';

export const useProductStore = defineStore('product', () => {
  const loading = ref(false);
  const dataSource = ref('static');
  const apiProducts = ref(null);
  const allCountries = ref([]);

  const currentCat = ref('ai');
  const currentProduct = ref('chatgpt');
  const annualMode = ref(false);
  const searchQuery = ref('');
  const currentSort = ref('price');

  const fetchInitialData = async () => {
    // 1. Try to load from cache first for instant UI
    const cachedData = localStorage.getItem('subprice_cache');
    const cachedTime = localStorage.getItem('subprice_cache_time');
    
    if (cachedData && cachedTime) {
      const now = Date.now();
      const age = now - parseInt(cachedTime);
      // If cache is less than 5 minutes old, use it and return
      if (age < 5 * 60 * 1000) {
        const parsed = JSON.parse(cachedData);
        allCountries.value = parsed.countries;
        apiProducts.value = parsed.products;
        dataSource.value = 'api';
        console.log('[productStore] Using fresh cache');
        return;
      }
    }

    console.log('[productStore] fetchInitialData START');
    loading.value = true;
    try {
      const countries = await api.getCountries();
      allCountries.value = countries;

      dataSource.value = 'api';
      apiProducts.value = {};

      const data = await api.getProducts();

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
            apiProducts.value[p.id] = p;
          }
        }
      }

      // Update cache
      localStorage.setItem('subprice_cache', JSON.stringify({
        countries: allCountries.value,
        products: apiProducts.value
      }));
      localStorage.setItem('subprice_cache_time', Date.now().toString());

    } catch (e) {
      console.error('fetchInitialData failed:', e.message);
      dataSource.value = 'static';
    } finally {
      loading.value = false;
    }
  };

  const allProducts = computed(() => {
    if (dataSource.value === 'api' && apiProducts.value) return apiProducts.value;
    return STATIC_PRODUCTS;
  });

  const filteredProducts = computed(() =>
    Object.values(allProducts.value).filter(p => p.category === currentCat.value)
  );

  const baseList = computed(() => {
    let product = allProducts.value[currentProduct.value];
    if (!product) {
      const first = filteredProducts.value[0];
      if (first) {
        currentProduct.value = first.id;
        product = first;
      }
    }
    if (!product) return [];
    let list = (product.enrichedCountries || []).map(c => ({ ...c }));
    if (annualMode.value) list = list.map(c => ({ ...c, cny: +(c.cny * 12 * 0.83).toFixed(2) }));
    return list;
  });

  const filteredList = computed(() => {
    if (!searchQuery.value) return baseList.value;
    const q = searchQuery.value.toLowerCase();
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

  const setCategory = (cat) => {
    currentCat.value = cat;
    const first = filteredProducts.value[0];
    if (first) currentProduct.value = first.id;
    searchQuery.value = '';
  };

  return {
    loading, dataSource, allCountries, currentCat, currentProduct,
    annualMode, searchQuery, currentSort,
    allProducts, filteredProducts, sortedList, summary,
    fetchInitialData, setCategory
  };
});
