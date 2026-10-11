import { formatBytes } from '../../../lib/format'

export interface RejectedFile {
  file: File
  /** Motivo legible, listo para mostrar. */
  reason: string
}

export interface FileRules {
  /** Igual que el atributo accept: ".pdf,image/*,application/zip". */
  accept?: string
  /** Tamaño máximo en bytes. */
  maxSize?: number
  /** Número máximo de archivos aceptados en una misma entrega. */
  maxFiles?: number
}

function matchesAccept(file: File, accept: string) {
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return accept
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) => {
      if (rule.startsWith('.')) return name.endsWith(rule)
      if (rule.endsWith('/*')) return type.startsWith(rule.slice(0, -1))
      return type === rule
    })
}

/** Separa los archivos válidos de los rechazados, con el motivo de cada rechazo. */
export function validateFiles(files: File[], { accept, maxSize, maxFiles }: FileRules = {}) {
  const accepted: File[] = []
  const rejected: RejectedFile[] = []
  for (const file of files) {
    if (accept && !matchesAccept(file, accept)) rejected.push({ file, reason: 'Este tipo de archivo no está permitido.' })
    else if (maxSize !== undefined && file.size > maxSize) rejected.push({ file, reason: `Pesa ${formatBytes(file.size)}; el máximo es ${formatBytes(maxSize)}.` })
    else if (maxFiles !== undefined && accepted.length >= maxFiles) rejected.push({ file, reason: `Solo se admiten ${maxFiles} archivo${maxFiles === 1 ? '' : 's'}.` })
    else accepted.push(file)
  }
  return { accepted, rejected }
}
