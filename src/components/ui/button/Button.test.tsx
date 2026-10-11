import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('es type="button" por defecto y ejecuta onClick', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Guardar</Button>)
    const btn = screen.getByRole('button', { name: 'Guardar' })
    expect(btn).toHaveAttribute('type', 'button')
    await userEvent.click(btn)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('loading bloquea el clic y marca aria-busy', async () => {
    const onClick = vi.fn()
    render(<Button loading onClick={onClick}>Guardar</Button>)
    const btn = screen.getByRole('button', { name: 'Guardar' })
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('asChild renderiza el hijo con los estilos', () => {
    render(
      <Button asChild variant="secondary">
        <a href="/login">Ingresar</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Ingresar' })
    expect(link).toHaveAttribute('href', '/login')
    expect(link.className).toContain('rounded-full')
  })

  it('asChild deshabilitado usa aria-disabled', () => {
    render(
      <Button asChild disabled>
        <a href="/x">Ir</a>
      </Button>,
    )
    expect(screen.getByRole('link', { name: 'Ir' })).toHaveAttribute('aria-disabled', 'true')
  })
})
