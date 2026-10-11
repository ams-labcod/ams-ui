import { useCallback, useSyncExternalStore } from 'react'
import { applyTheme, readTheme, type Theme } from '../lib/theme'

// El DOM (data-theme en <html>) es la única fuente de verdad: cualquier
// componente que llame a useTheme se entera del cambio sin un provider.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => readTheme(), (): Theme => 'dark')
  const setTheme = useCallback((next: Theme) => applyTheme(next), [])
  const toggleTheme = useCallback(() => applyTheme(readTheme() === 'dark' ? 'light' : 'dark'), [])
  return { theme, setTheme, toggleTheme }
}
