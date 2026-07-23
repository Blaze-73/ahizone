import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') && (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router') || id.includes('react-helmet'))) {
            return 'vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion'
          }
          if (id.includes('node_modules/i18next')) {
            return 'i18n'
          }
        },
      },
    },
  },
})
