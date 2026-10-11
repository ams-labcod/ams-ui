import { describe, expect, it } from 'vitest'
import { applyMarkdown } from './markdown'
import { validateFiles } from '../dropzone/validateFiles'
import { formatBytes, formatCurrency } from '../../../lib/format'

describe('applyMarkdown', () => {
  it('envuelve la selección y la deja seleccionada', () => {
    const r = applyMarkdown('Hola mundo', 5, 10, 'bold')
    expect(r.value).toBe('Hola **mundo**')
    expect(r.value.slice(r.start, r.end)).toBe('mundo')
  })

  it('alterna: aplicar dos veces deshace', () => {
    const once = applyMarkdown('Hola mundo', 5, 10, 'italic')
    const twice = applyMarkdown(once.value, once.start, once.end, 'italic')
    expect(twice.value).toBe('Hola mundo')
  })

  it('sin selección inserta un texto de ejemplo seleccionado', () => {
    const r = applyMarkdown('', 0, 0, 'bold')
    expect(r.value).toBe('**texto en negrita**')
    expect(r.value.slice(r.start, r.end)).toBe('texto en negrita')
  })

  it('prefija todas las líneas tocadas y lo quita si ya estaba', () => {
    const r = applyMarkdown('uno\ndos\ntres', 1, 6, 'list')
    expect(r.value).toBe('- uno\n- dos\ntres')
    expect(applyMarkdown(r.value, r.start, r.end, 'list').value).toBe('uno\ndos\ntres')
  })

  it('enlace: selecciona la URL para reemplazarla', () => {
    const r = applyMarkdown('ver boletín', 4, 11, 'link')
    expect(r.value).toBe('ver [boletín](https://)')
    expect(r.value.slice(r.start, r.end)).toBe('https://')
  })
})

describe('validateFiles', () => {
  const file = (name: string, type: string, size: number) => new File([new Uint8Array(size)], name, { type })

  it('aplica accept por extensión, comodín y tipo exacto', () => {
    const { accepted, rejected } = validateFiles(
      [file('notas.pdf', 'application/pdf', 10), file('foto.png', 'image/png', 10), file('virus.exe', 'application/x-msdownload', 10)],
      { accept: '.pdf,image/*' },
    )
    expect(accepted.map((f) => f.name)).toEqual(['notas.pdf', 'foto.png'])
    expect(rejected[0]?.reason).toMatch(/no está permitido/)
  })

  it('rechaza por tamaño y por número máximo', () => {
    const { accepted, rejected } = validateFiles([file('a.pdf', 'application/pdf', 2000), file('b.pdf', 'application/pdf', 10), file('c.pdf', 'application/pdf', 10)], {
      maxSize: 1000,
      maxFiles: 1,
    })
    expect(accepted.map((f) => f.name)).toEqual(['b.pdf'])
    expect(rejected.map((r) => r.file.name)).toEqual(['a.pdf', 'c.pdf'])
    expect(rejected[0]?.reason).toContain('kB')
  })
})

describe('format', () => {
  it('formatBytes en español', () => {
    expect(formatBytes(500)).toBe('500 B')
    expect(formatBytes(1500)).toBe('1,5 kB')
    expect(formatBytes(5_000_000)).toBe('5 MB')
  })
  it('formatCurrency en pesos sin decimales', () => {
    expect(formatCurrency(1250000).replace(/\s/g, ' ')).toBe('$ 1.250.000')
  })
})
