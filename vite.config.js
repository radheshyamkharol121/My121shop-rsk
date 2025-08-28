import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// हिंदी: Replit host allow करने के लिए server.allowedHosts में host add करें
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // सभी IPs से access
    port: 5174,      // जो भी port use कर रहे हो
    allowedHosts: [
      '4cbf995a-240c-4453-863d-5ec88094944d-00-3r2q67gdq48pv.sisko.replit.dev'
    ]
  }
});