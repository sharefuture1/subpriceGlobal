const BASE_URL = import.meta.env.VITE_API_BASE || 'https://price-compare-api-zh09.onrender.com';
console.log('[api.js] BASE_URL:', BASE_URL);

const getSignature = () => btoa(`subprice-${Math.floor(Date.now() / 100000)}`);

export const apiFetch = async (endpoint, options = {}) => {
  const sig = getSignature();
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-client-signature': sig,
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'API Request failed');
  }
  return res.json();
};

export const getCategories = () => apiFetch('/api/categories');
export const getCountries = () => apiFetch('/api/countries');
export const getProducts = () => apiFetch('/api/products');
export const getProductsRaw = () => fetch(`${BASE_URL}/api/products`, {
  headers: { 'x-client-signature': getSignature() }
});
export const submitSubmission = (data) => apiFetch('/api/submit', {
  method: 'POST',
  body: JSON.stringify(data),
});
export const submitRequest = (data) => apiFetch('/api/requests', {
  method: 'POST',
  body: JSON.stringify(data),
});
