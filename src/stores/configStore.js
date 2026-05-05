import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useConfigStore = defineStore('config', () => {
  const theme = ref(localStorage.getItem('theme') || 'dark');
  const locale = ref(localStorage.getItem('locale') || 'zh');

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', theme.value);
  };

  const setLocale = (newLocale) => {
    locale.value = newLocale;
    localStorage.setItem('locale', newLocale);
  };

  const toggleLocale = () => {
    setLocale(locale.value === 'zh' ? 'en' : 'zh');
  };

  return { theme, locale, toggleTheme, setLocale, toggleLocale };
});
