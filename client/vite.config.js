import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // All /api requests are forwarded to the Express backend
      '/api': {
        target: 'https://studenthub-backend-0da2.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
