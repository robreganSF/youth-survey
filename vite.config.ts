import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'es'
      }
    },
    target: 'esnext',
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    },
    exclude: ['@rollup/rollup-linux-x64-gnu']
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
})
