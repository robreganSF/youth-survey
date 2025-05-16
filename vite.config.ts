import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        format: 'es'
      }
    },
    target: 'esnext',
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-x64-gnu'],
    esbuildOptions: {
      target: 'esnext'
    }
  }
})
