// Las entradas por componente (src/entradas, package.json "exports") se generan desde
// src/index.ts con `npm run entradas`. Si alguien agrega una exportación y no regenera,
// esta prueba falla en lugar de publicar un paquete incompleto.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import * as indice from './index'

const modulos = import.meta.glob<Record<string, unknown>>('./entradas/*.ts', { eager: true })
const archivos = Object.keys(modulos).map((ruta) => ruta.replace('./entradas/', ''))
const paquete = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8')) as {
  exports: Record<string, unknown>
  sideEffects: string[]
}

describe('entradas por componente', () => {
  it('juntas exportan exactamente lo mismo que el punto de entrada principal', () => {
    const nombres = new Map<string, string>()
    for (const [ruta, modulo] of Object.entries(modulos)) {
      for (const exportado of Object.keys(modulo)) {
        // Cada nombre vive en una sola entrada: si no, importar dos entradas daría dos copias.
        expect(nombres.has(exportado), `${exportado} está en ${nombres.get(exportado)} y en ${ruta}`).toBe(false)
        nombres.set(exportado, ruta)
      }
    }
    expect([...nombres.keys()].sort()).toEqual(Object.keys(indice).sort())
  })

  it('package.json publica una ruta por cada entrada', () => {
    const rutas = Object.keys(paquete.exports).filter((r) => !['.', './tokens.css', './package.json'].includes(r))
    expect(rutas.sort()).toEqual(archivos.map((f) => `./${f.replace(/\.ts$/, '')}`).sort())
  })

  it('solo el CSS tiene efectos secundarios (el resto se puede descartar al empaquetar)', () => {
    expect(paquete.sideEffects).toEqual(['**/*.css'])
  })
})
