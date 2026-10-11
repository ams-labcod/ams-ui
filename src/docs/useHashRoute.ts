import { useSyncExternalStore } from 'react'

// Rutas de la documentación en el hash (#/slug): sin router, funciona en cualquier hosting estático.
function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

export function useHashRoute(fallback: string) {
  const slug = useSyncExternalStore(subscribe, () => window.location.hash.replace(/^#\/?/, ''), () => '')
  return slug || fallback
}

export const href = (slug: string) => `#/${slug}`
