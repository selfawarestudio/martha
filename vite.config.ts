import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'es2019',
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'martha',
      formats: ['es', 'umd', 'iife']
    },
  }
})