import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    allowedHosts: [
      "4cbf995a-240c-4453-863d-5ec88094944d-00-3r2q67gdq48pv.sisko.replit.dev"
    ]
  }
})