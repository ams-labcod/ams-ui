// Genera un punto de entrada por componente a partir de src/index.ts:
//   src/entradas/<componente>.ts  y  "exports"["./<componente>"] en package.json.
// Así una app puede importar '@ams-labcod/ams-ui/button' y cargar solo eso.
// Uso: npm run entradas (después de agregar o mover una exportación en src/index.ts).
// La prueba src/entradas.test.ts falla si index.ts y las entradas no coinciden.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const raiz = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const indice = readFileSync(join(raiz, 'src/index.ts'), 'utf8')

/** Nombre de la entrada según de dónde viene la exportación. */
function entradaDe(origen) {
  // createColumnHelper y ColumnDef se reexportan para usar DataTable.
  if (origen === '@tanstack/react-table') return 'data-table'
  const carpeta = origen.match(/^\.\/components\/[^/]+\/([^/]+)\//)
  if (carpeta) return carpeta[1]
  // Componentes sin carpeta propia (brand/Logo, layout/Layout): el nombre del archivo.
  const archivo = origen.match(/^\.\/components\/[^/]+\/([^/]+)$/)
  if (archivo) return archivo[1].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  if (origen.startsWith('./hooks/')) return 'hooks'
  if (origen.startsWith('./lib/')) return 'utils'
  throw new Error(`No sé a qué entrada va la exportación de "${origen}"`)
}

// Cada sentencia `export … from '…'` de index.ts (pueden ocupar varias líneas).
const sentencias = [...indice.matchAll(/^export\s[\s\S]*?\sfrom\s+'([^']+)'/gm)]
const entradas = new Map()
for (const [texto, origen] of sentencias) {
  const nombre = entradaDe(origen)
  const relativo = origen.startsWith('.') ? texto.replace(`'${origen}'`, `'.${origen}'`) : texto
  entradas.set(nombre, [...(entradas.get(nombre) ?? []), relativo])
}

const carpeta = join(raiz, 'src/entradas')
rmSync(carpeta, { recursive: true, force: true })
mkdirSync(carpeta)
for (const [nombre, lineas] of entradas) {
  writeFileSync(
    join(carpeta, `${nombre}.ts`),
    `// GENERADO por scripts/generar-entradas.mjs desde src/index.ts: no se edita a mano.\n${lineas.join('\n')}\n`,
  )
}

const paquete = JSON.parse(readFileSync(join(raiz, 'package.json'), 'utf8'))
const nombres = [...entradas.keys()].sort()
paquete.exports = {
  '.': { types: './dist-lib/types/index.d.ts', import: './dist-lib/index.js' },
  ...Object.fromEntries(
    nombres.map((n) => [`./${n}`, { types: `./dist-lib/types/entradas/${n}.d.ts`, import: `./dist-lib/entradas/${n}.js` }]),
  ),
  './tokens.css': './dist-lib/tokens.css',
  './package.json': './package.json',
}
writeFileSync(join(raiz, 'package.json'), `${JSON.stringify(paquete, null, 2)}\n`)
console.log(`${nombres.length} entradas: ${nombres.join(', ')}`)
