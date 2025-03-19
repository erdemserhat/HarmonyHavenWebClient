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
          open('https://harmonyhaventest.erdemserhat.com/');  // Change this to your desired URL
        }, 1000); // You can adjust the timeout duration if necessary
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
    allowedHosts: ['harmonyhaventest.erdemserhat.com'],
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
