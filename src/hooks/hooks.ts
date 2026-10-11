import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'

/** Estado abierto/cerrado de un overlay, panel o sección. */
export function useDisclosure(initial = false) {
  const [open, setOpen] = useState(initial)
  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])
  const onToggle = useCallback(() => setOpen((o) => !o), [])
  // onOpenChange encaja directo en Dialog, Sheet, Popover…: <Dialog open={open} onOpenChange={setOpen}>
  return { open, onOpen, onClose, onToggle, setOpen }
}

/**
 * true si la media query coincide; se actualiza al cambiar.
 * useMediaQuery('(min-width: 55rem)') — los puntos de corte de AMS: 40rem sm, 55rem md, 61.25rem lg.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

/** El valor, pero solo después de `delay` ms sin cambios. Para buscar mientras se escribe sin una petición por tecla. */
export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

/** true mientras el elemento está visible en pantalla (IntersectionObserver). Para cargar al hacer scroll o animar al entrar. */
export function useInView<T extends Element>(options?: IntersectionObserverInit & { once?: boolean }): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const { once = false, root, rootMargin, threshold } = options ?? {}

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false
        setInView(visible)
        if (visible && once) io.disconnect()
      },
      { root, rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, root, rootMargin, threshold])

  return [ref, inView]
}

export interface HotkeyOptions {
  /** Funciona también mientras se escribe en un campo (por defecto no, salvo con Ctrl/⌘). */
  inInputs?: boolean
  enabled?: boolean
}

const isMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

/** ¿El evento coincide con «mod+k», «shift+?», «escape», «/»…? mod = ⌘ en Mac, Ctrl en el resto. */
export function matchesHotkey(e: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey'>, combo: string, mac = isMac()) {
  const parts = combo.toLowerCase().split('+')
  const key = parts.pop()
  const want = { mod: parts.includes('mod'), ctrl: parts.includes('ctrl'), shift: parts.includes('shift'), alt: parts.includes('alt') }
  const ctrl = want.ctrl || (want.mod && !mac)
  const meta = want.mod && mac
  return e.key.toLowerCase() === key && e.ctrlKey === ctrl && e.metaKey === meta && e.altKey === want.alt && (key === '?' || e.shiftKey === want.shift)
}

/** Atajo de teclado global: useHotkey('mod+k', () => setOpen(true)). */
export function useHotkey(combo: string, handler: (e: KeyboardEvent) => void, { inInputs = false, enabled = true }: HotkeyOptions = {}) {
  const saved = useRef(handler)
  useEffect(() => {
    saved.current = handler
  })

  useEffect(() => {
    if (!enabled) return
    function onKey(e: KeyboardEvent) {
      if (!matchesHotkey(e, combo)) return
      const typing = e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable="true"]')
      if (typing && !inInputs && !(e.ctrlKey || e.metaKey)) return
      e.preventDefault()
      saved.current(e)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [combo, inInputs, enabled])
}
