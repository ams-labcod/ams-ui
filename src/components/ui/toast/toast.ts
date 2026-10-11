import { useSyncExternalStore, type ReactNode } from 'react'

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'

export interface ToastOptions {
  description?: ReactNode
  variant?: ToastVariant
  /** Milisegundos antes de cerrarse solo; Infinity para que espere al usuario. */
  duration?: number
  action?: { label: string; onClick: () => void }
  /** Reutiliza un id para reemplazar una notificación (p. ej. "Subiendo…" → "Subido"). */
  id?: string
}

export interface ToastItem extends ToastOptions {
  id: string
  title: ReactNode
}

// Almacén mínimo a nivel de módulo: toast() funciona desde cualquier parte,
// incluso fuera de React, y <Toaster /> se suscribe.
let items: ToastItem[] = []
let counter = 0
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function show(title: ReactNode, options: ToastOptions = {}) {
  const id = options.id ?? `toast-${++counter}`
  const next = { ...options, id, title }
  const exists = items.some((t) => t.id === id)
  items = exists ? items.map((t) => (t.id === id ? next : t)) : [...items, next]
  emit()
  return id
}

export const toast = Object.assign(show, {
  info: (title: ReactNode, o?: ToastOptions) => show(title, { ...o, variant: 'info' }),
  success: (title: ReactNode, o?: ToastOptions) => show(title, { ...o, variant: 'success' }),
  warning: (title: ReactNode, o?: ToastOptions) => show(title, { ...o, variant: 'warning' }),
  danger: (title: ReactNode, o?: ToastOptions) => show(title, { ...o, variant: 'danger' }),
  /** Sin id, cierra todas. */
  dismiss: (id?: string) => {
    items = id ? items.filter((t) => t.id !== id) : []
    emit()
  },
})

const EMPTY: ToastItem[] = []

export function useToasts() {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange)
      return () => listeners.delete(onChange)
    },
    () => items,
    () => EMPTY,
  )
}
