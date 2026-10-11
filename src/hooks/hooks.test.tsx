import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Grid, Stack } from '../components/layout/Layout'
import { matchesHotkey, useDebouncedValue, useDisclosure, useHotkey } from './hooks'

describe('useDisclosure', () => {
  it('abre, cierra y alterna', () => {
    const { result } = renderHook(() => useDisclosure())
    act(() => result.current.onOpen())
    expect(result.current.open).toBe(true)
    act(() => result.current.onToggle())
    expect(result.current.open).toBe(false)
  })
})

describe('useDebouncedValue', () => {
  it('solo entrega el último valor tras la espera', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ v }) => useDebouncedValue(v, 300), { initialProps: { v: 'a' } })
    rerender({ v: 'an' })
    rerender({ v: 'ana' })
    expect(result.current).toBe('a')
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('ana')
    vi.useRealTimers()
  })
})

describe('matchesHotkey', () => {
  const ev = (key: string, mods: Partial<Record<'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey', boolean>> = {}) => ({ key, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, ...mods })
  it('mod es Ctrl fuera de Mac y ⌘ en Mac', () => {
    expect(matchesHotkey(ev('k', { ctrlKey: true }), 'mod+k', false)).toBe(true)
    expect(matchesHotkey(ev('k', { metaKey: true }), 'mod+k', true)).toBe(true)
    expect(matchesHotkey(ev('k', { metaKey: true }), 'mod+k', false)).toBe(false)
  })
  it('exige los modificadores exactos', () => {
    expect(matchesHotkey(ev('k'), 'mod+k', false)).toBe(false)
    expect(matchesHotkey(ev('j', { altKey: true }), 'alt+j', false)).toBe(true)
    expect(matchesHotkey(ev('/'), '/', false)).toBe(true)
  })
})

describe('useHotkey', () => {
  it('ignora teclas simples mientras se escribe', async () => {
    const handler = vi.fn()
    function Demo() {
      useHotkey('/', handler)
      return <input aria-label="campo" />
    }
    render(<Demo />)
    await userEvent.keyboard('/')
    expect(handler).toHaveBeenCalledTimes(1)
    await userEvent.type(screen.getByRole('textbox'), '/')
    expect(handler).toHaveBeenCalledTimes(1)
  })
})

describe('Layout', () => {
  it('Grid aplica columnas por punto de corte y Stack el gap', () => {
    render(
      <Stack gap={6} data-testid="stack">
        <Grid columns={{ base: 1, md: 3 }} data-testid="grid" />
      </Stack>,
    )
    expect(screen.getByTestId('grid').className).toContain('md:grid-cols-3')
    expect(screen.getByTestId('stack').className).toContain('gap-6')
  })
})
