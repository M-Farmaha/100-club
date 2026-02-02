import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/100-club/',
  server: {
    port: 6789,
    open: '/100-club/',
  },
  build: {
    outDir: 'build',
  },
});
