// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // बाहरी access के लिए enable करें
    port: 5000,       // Replit के लिए recommended port
    open: true
  },
});