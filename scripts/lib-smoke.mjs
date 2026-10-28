// Prueba de humo del paquete compilado: se importa dist-lib como lo haría una
// app y se renderizan componentes en el servidor. Uso: npm run build:lib && node scripts/lib-smoke.mjs
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createElement as h } from 'react'
import { renderToString } from 'react-dom/server'
import * as ui from '../dist-lib/index.js'

const exported = Object.keys(ui)
assert.ok(exported.length > 100, `pocas exportaciones: ${exported.length}`)

const html = renderToString(
  h('div', null, [
    h(ui.Button, { key: 'b', variant: 'secondary' }, 'Guardar'),
    h(ui.Badge, { key: 'g', variant: 'success' }, 'Aprobado'),
    h(ui.Logo, { key: 'l' }),
    h(ui.Progress, { key: 'p', label: 'Notas', value: 50 }),
    h(ui.Stat, { key: 's', label: 'Estudiantes', value: '1.284' }),
    h(ui.Pagination, { key: 'n', page: 2, totalPages: 9, onPageChange() {} }),
  ]),
)

assert.match(html, /Guardar/)
assert.match(html, /rounded-full/, 'faltan las clases de Tailwind')
assert.match(html, /data:image\/png;base64/, 'el logo no está incrustado')
assert.match(html, /aria-current="page"/)
assert.equal(ui.paginationRange(6, 20).join(), '1,ellipsis,5,6,7,ellipsis,20')
assert.equal(ui.formatCurrency(850000).replace(/\s/g, ' '), '$ 850.000')

// Cada entrada por componente se importa por su nombre de paquete, como lo haría una app
// ("exports" de package.json), y juntas cubren lo mismo que el punto de entrada principal.
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const rutas = Object.keys(pkg.exports).filter((r) => !['.', './tokens.css', './package.json'].includes(r))
const porEntradas = new Set()
for (const ruta of rutas) {
  const modulo = await import(`${pkg.name}/${ruta.slice(2)}`)
  for (const nombre of Object.keys(modulo)) porEntradas.add(nombre)
}
assert.deepEqual([...porEntradas].sort(), [...exported].sort(), 'las entradas no cubren lo mismo que el índice')
const { Button } = await import(`${pkg.name}/button`)
assert.match(renderToString(h(Button, null, 'Solo el botón')), /Solo el botón/)

console.log(`dist-lib OK: ${exported.length} exportaciones en ${rutas.length} entradas por componente, render en servidor correcto.`)
