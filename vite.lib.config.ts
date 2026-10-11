// Build de la librería (npm run build:lib). La app de documentación usa vite.config.ts.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json' with { type: 'json' }

// Todo lo que el consumidor instala (dependencias y peers) queda fuera del bundle.
const externals = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)]
const isExternal = (id: string) => externals.some((dep) => id === dep || id.startsWith(`${dep}/`))

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist-lib',
    emptyOutDir: true,
    sourcemap: true,
    // El logo (10 kB) va incrustado: el paquete no depende de rutas de assets.
    assetsInlineLimit: 16 * 1024,
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index' },
    rollupOptions: { external: isExternal },
  },
})
