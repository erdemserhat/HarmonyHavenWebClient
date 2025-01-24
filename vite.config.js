import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '',
  server: {
    port: 5173
  },
  preview: {
    port: 4173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    // SPA için gerekli yapılandırma
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
})
