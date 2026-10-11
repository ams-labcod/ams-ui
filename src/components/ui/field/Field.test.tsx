import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Checkbox } from '../checkbox/Checkbox'
import { Input } from '../input/Input'
import { Select } from '../select/Select'
import { Switch } from '../switch/Switch'
import { Textarea } from '../textarea/Textarea'
import { FormField } from './Field'

describe('FormField', () => {
  it('conecta etiqueta, ayuda y error con el Input', () => {
    render(
      <FormField label="Correo" description="Usaremos este correo para el boletín" error="Escribe un correo válido" required>
        <Input />
      </FormField>,
    )
    const input = screen.getByRole('textbox', { name: 'Correo' })
    expect(input).toBeRequired()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Usaremos este correo para el boletín Escribe un correo válido')
  })

  it('sin error no marca el campo como inválido', () => {
    render(
      <FormField label="Observaciones">
        <Textarea />
      </FormField>,
    )
    expect(screen.getByRole('textbox', { name: 'Observaciones' })).not.toHaveAttribute('aria-invalid')
  })

  it('deshabilita el control', () => {
    render(
      <FormField label="Código" disabled>
        <Input />
      </FormField>,
    )
    expect(screen.getByRole('textbox', { name: 'Código' })).toBeDisabled()
  })

  it('funciona con Select', () => {
    render(
      <FormField label="Curso" error="Elige un curso">
        <Select options={[{ value: '3a', label: '3.º A' }]} />
      </FormField>,
    )
    const trigger = screen.getByRole('combobox', { name: 'Curso' })
    expect(trigger).toHaveAttribute('aria-invalid', 'true')
    expect(trigger).toHaveAccessibleDescription('Elige un curso')
  })
})

describe('Checkbox', () => {
  it('se marca con clic en la etiqueta', async () => {
    render(<Checkbox label="Recordarme" />)
    const box = screen.getByRole('checkbox', { name: 'Recordarme' })
    await userEvent.click(screen.getByText('Recordarme'))
    expect(box).toBeChecked()
  })

  it('indeterminate se refleja en el DOM', () => {
    render(<Checkbox aria-label="Todos" indeterminate />)
    expect(screen.getByRole('checkbox', { name: 'Todos' })).toBePartiallyChecked()
  })
})

describe('Switch', () => {
  it('es un role="switch" que alterna con Espacio', async () => {
    render(<Switch label="Notificaciones por correo" />)
    const sw = screen.getByRole('switch', { name: 'Notificaciones por correo' })
    sw.focus()
    await userEvent.keyboard(' ')
    expect(sw).toBeChecked()
  })
})
