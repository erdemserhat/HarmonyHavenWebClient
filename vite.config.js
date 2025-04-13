import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import open from 'open';
import path from 'path'; // Add this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'open-external-url',
      configureServer() {
        // Open the external URL after a brief delay to allow the server to start
        setTimeout(() => {
          open('https://harmonyhavenappserver.erdemserhat.com/');
        }, 1000);
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '',
  server: {
    allowedHosts: ['harmonyhavenappserver.erdemserhat.com'],
    port: 3000,
  },
  preview: {
    port: 4173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // SPA için gerekli yapılandırma
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
})
