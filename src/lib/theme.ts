export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'ams-theme'

/** Preferencia guardada; si no hay, la del sistema. Duplicada en index.html para evitar el destello inicial. */
export function resolveTheme(stored: string | null, prefersLight: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored
  return prefersLight ? 'light' : 'dark'
}

export function readTheme(root: HTMLElement = document.documentElement): Theme {
  return root.dataset.theme === 'light' ? 'light' : 'dark'
}

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement) {
  root.dataset.theme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Almacenamiento bloqueado: el tema se aplica igual, solo no persiste.
  }
}
