import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

// Initial messages for the default locale
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zh',
  fallbackLocale: 'en',
  messages: {} // Start empty
})

/**
 * Lazy load locale messages
 */
export async function loadLocaleMessages(locale) {
  if (Object.keys(i18n.global.getLocaleMessage(locale)).length > 0) {
    return nextTick()
  }

  // Load locale messages with dynamic import
  const messages = await import(`./i18n/${locale}.js`)
  
  // Set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

// Initial load
const initialLocale = i18n.global.locale.value
loadLocaleMessages(initialLocale)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)
app.mount('#app')
