export type MarkdownFormat = 'bold' | 'italic' | 'code' | 'link' | 'heading' | 'list' | 'quote'

export interface EditResult {
  value: string
  /** Selección resultante: queda sobre el texto formateado para seguir escribiendo. */
  start: number
  end: number
}

const WRAP: Partial<Record<MarkdownFormat, [string, string, string]>> = {
  bold: ['**', '**', 'texto en negrita'],
  italic: ['_', '_', 'texto en cursiva'],
  code: ['`', '`', 'código'],
}

const PREFIX: Partial<Record<MarkdownFormat, string>> = {
  heading: '## ',
  list: '- ',
  quote: '> ',
}

/** Aplica un formato Markdown a la selección [start, end) de value. */
export function applyMarkdown(value: string, start: number, end: number, format: MarkdownFormat): EditResult {
  const selected = value.slice(start, end)
  const before = value.slice(0, start)
  const after = value.slice(end)

  const wrap = WRAP[format]
  if (wrap) {
    const [open, close, placeholder] = wrap
    // Si ya está envuelto, lo quita (alternar).
    if (before.endsWith(open) && after.startsWith(close)) {
      return { value: before.slice(0, -open.length) + selected + after.slice(close.length), start: start - open.length, end: end - open.length }
    }
    const text = selected || placeholder
    return { value: before + open + text + close + after, start: start + open.length, end: start + open.length + text.length }
  }

  if (format === 'link') {
    const text = selected || 'texto del enlace'
    const url = 'https://'
    const inserted = `[${text}](${url})`
    const urlStart = start + text.length + 3
    return { value: before + inserted + after, start: urlStart, end: urlStart + url.length }
  }

  // Formatos de línea: prefijo en cada línea tocada por la selección.
  const prefix = PREFIX[format]!
  const lineStart = value.lastIndexOf('\n', start - 1) + 1
  const lineEndIdx = value.indexOf('\n', end)
  const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx
  const lines = value.slice(lineStart, lineEnd).split('\n')
  const allPrefixed = lines.every((l) => l.startsWith(prefix))
  const changed = lines.map((l) => (allPrefixed ? l.slice(prefix.length) : prefix + l)).join('\n')
  return { value: value.slice(0, lineStart) + changed + value.slice(lineEnd), start: lineStart, end: lineStart + changed.length }
}
