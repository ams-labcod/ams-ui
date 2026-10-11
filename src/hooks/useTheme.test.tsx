import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { resolveTheme, THEME_STORAGE_KEY } from '../lib/theme'
import { useTheme } from './useTheme'

describe('resolveTheme', () => {
  it('respeta la preferencia guardada', () => {
    expect(resolveTheme('light', false)).toBe('light')
    expect(resolveTheme('dark', true)).toBe('dark')
  })
  it('cae al sistema si no hay preferencia válida', () => {
    expect(resolveTheme(null, true)).toBe('light')
    expect(resolveTheme('sepia', false)).toBe('dark')
  })
})

describe('useTheme', () => {
  it('alterna, aplica en <html> y persiste', async () => {
    document.documentElement.dataset.theme = 'dark'
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    act(() => result.current.toggleTheme())
    await waitFor(() => expect(result.current.theme).toBe('light'))
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })
})
