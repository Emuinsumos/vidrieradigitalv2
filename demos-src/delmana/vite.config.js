import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: '/demos/delmana/',
  build: { outDir: '../../dist/demos/delmana', emptyOutDir: true }
})
