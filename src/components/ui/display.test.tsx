import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Alert } from './alert/Alert'
import { Avatar, initials } from './avatar/Avatar'
import { Separator } from './separator/Separator'
import { Spinner } from './spinner/Spinner'

describe('Alert', () => {
  it('usa role alert para danger y status para info', () => {
    render(
      <>
        <Alert variant="danger" title="No se guardó" />
        <Alert variant="info" title="Nuevo período" />
      </>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('No se guardó')
    expect(screen.getByRole('status')).toHaveTextContent('Nuevo período')
  })

  it('muestra el botón de cerrar solo con onDismiss', async () => {
    const onDismiss = vi.fn()
    render(<Alert title="Aviso" onDismiss={onDismiss} />)
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar aviso' }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })
})

describe('Avatar', () => {
  it('calcula iniciales', () => {
    expect(initials('Ana María Pérez')).toBe('AP')
    expect(initials('  sofía ')).toBe('S')
    expect(initials('')).toBe('')
  })

  it('cae a las iniciales si la imagen falla', () => {
    const { container } = render(<Avatar name="Luis Gómez" src="/roto.png" />)
    expect(screen.getByRole('img', { name: 'Luis Gómez' })).toBeInTheDocument()
    fireEvent.error(container.querySelector('img')!)
    expect(screen.getByText('LG')).toBeInTheDocument()
  })
})

describe('Separator / Spinner', () => {
  it('separator decorativo no se anuncia', () => {
    render(<Separator decorative />)
    expect(screen.queryByRole('separator')).not.toBeInTheDocument()
  })

  it('spinner con label es un status; sin label es decorativo', () => {
    const { rerender } = render(<Spinner label="Cargando estudiantes" />)
    expect(screen.getByRole('status', { name: 'Cargando estudiantes' })).toBeInTheDocument()
    rerender(<Spinner />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
