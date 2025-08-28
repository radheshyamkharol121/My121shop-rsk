// vite.config.js
// ------------------------------------------
// ⚡ Vite का main config file
// 👉 यहाँ पर हम React plugin और alias (src folder के लिए) सेट करते हैं
// ------------------------------------------

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],   // ⚛️ React को Vite के साथ चलाने के लिए plugin
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  
      // 👉 अब आप import में direct '@' का use कर सकते हो
      // Example: import Login from "@/pages/Auth/Login"
    },
  },
  server: {
    host: '0.0.0.0',  // 🌐 External access के लिए
    port: 5000,       // 🟢 Replit recommended port
    open: true        // ✅ Browser automatically open हो जाएगा
  }
})