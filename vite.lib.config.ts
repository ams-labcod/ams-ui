// Build de la librería (npm run build:lib). La app de documentación usa vite.config.ts.
//
// Un archivo por módulo (preserveModules): así la app que consume solo empaqueta los
// componentes que usa, en la parte de la app que los usa. Con un único index.js, cualquier
// componente de una pantalla diferida terminaba en la carga inicial de todas las pantallas.
import { readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json' with { type: 'json' }

// Todo lo que el consumidor instala (dependencias y peers) queda fuera del bundle.
const externals = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)]
const isExternal = (id: string) => externals.some((dep) => id === dep || id.startsWith(`${dep}/`))

// El punto de entrada principal y uno por componente (src/entradas, generadas con npm run entradas).
const entradas = Object.fromEntries([
  ['index', 'src/index.ts'],
  ...readdirSync('src/entradas')
    .filter((f) => f.endsWith('.ts'))
    .map((f) => [`entradas/${f.replace(/\.ts$/, '')}`, `src/entradas/${f}`]),
])

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist-lib',
    emptyOutDir: true,
    sourcemap: true,
    // El logo (10 kB) va incrustado: el paquete no depende de rutas de assets.
    assetsInlineLimit: 16 * 1024,
    lib: { entry: entradas, formats: ['es'] },
    rollupOptions: {
      external: isExternal,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
})
