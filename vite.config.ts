/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Los ejemplos de la documentación importan '@ams-labcod/ams-ui' como lo haría un consumidor.
  resolve: { alias: { '@ams-labcod/ams-ui': fileURLToPath(new URL('./src/index.ts', import.meta.url)) } },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    // Node 25+ expone un localStorage propio que tapa el de jsdom.
    execArgv: ['--no-experimental-webstorage'],
  },
})
