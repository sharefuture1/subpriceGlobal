import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    // PWA Configuration
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'SubPrice Global',
        short_name: 'SubPrice',
        description: 'Global Subscription Price Comparison Tool',
        theme_color: '#00e5a0',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
    // Compression (Gzip)
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  build: {
    // Optimized chunk splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vendor-vue';
            if (id.includes('pinia')) return 'vendor-pinia';
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
