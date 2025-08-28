// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',  // बाहरी access के लिए enable करें
    port: 5000,       // Replit के लिए recommended port
    open: true        // Browser अपने आप खुल जाएगा
  },
});