import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// हिंदी: Vite config - dev server default port 5173
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
});