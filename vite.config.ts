import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // listen on all network adapters
    port: 5173         // keep the familiar dev port
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
