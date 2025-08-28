// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',  // बाहरी access के लिए
    port: 5000,       // Replit के लिए recommended port
    open: true,
    allowedHosts: [
      '4cbf995a-240c-4453-863d-5ec88094944d.sisko.replit.dev' // Add your host here
    ]
  },
});