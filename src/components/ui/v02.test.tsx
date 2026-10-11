import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Button } from './button/Button'
import { Calendar, nextRange } from './calendar/Calendar'
import { ChipGroup, Chip } from './chips/Chips'
import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from './command/Command'
import { DatePicker, DateRangePicker } from './date-picker/DatePicker'
import { Dropzone } from './dropzone/Dropzone'
import { Editor } from './editor/Editor'
import { FloatingField } from './floating-field/FloatingField'
import { Form, FormItem } from './form/Form'
import { Input } from './input/Input'
import { RadioGroup } from './radio-group/RadioGroup'
import { Sheet, SheetContent, SheetTrigger } from './sheet/Sheet'
import { toast } from './toast/toast'
import { Toaster } from './toast/Toaster'

describe('FloatingField', () => {
  it('la etiqueta nombra el campo y el error lo describe', () => {
    render(<FloatingField label="Correo" error="Falta el @" />)
    const input = screen.getByRole('textbox', { name: 'Correo' })
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Falta el @')
  })
})

describe('RadioGroup', () => {
  it('se nombra con label y cambia con flechas', async () => {
    const onValueChange = vi.fn()
    render(
      <RadioGroup
        label="Jornada"
        defaultValue="manana"
        onValueChange={onValueChange}
        options={[
          { value: 'manana', label: 'Mañana' },
          { value: 'tarde', label: 'Tarde' },
        ]}
      />,
    )
    expect(screen.getByRole('radiogroup', { name: 'Jornada' })).toBeInTheDocument()
    screen.getByRole('radio', { name: 'Mañana' }).focus()
    // Tecla mantenida: Radix enfoca en un setTimeout y solo selecciona si la flecha sigue pulsada.
    await userEvent.keyboard('{ArrowDown>}')
    await waitFor(() => expect(onValueChange).toHaveBeenCalledWith('tarde'))
  })
})

describe('Chips', () => {
  it('ChipGroup múltiple marca varias opciones con aria-pressed', async () => {
    const onValueChange = vi.fn()
    render(
      <ChipGroup
        multiple
        aria-label="Materias"
        onValueChange={onValueChange}
        options={[
          { value: 'mat', label: 'Matemáticas' },
          { value: 'fis', label: 'Física' },
        ]}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Matemáticas' }))
    await userEvent.click(screen.getByRole('button', { name: 'Física' }))
    expect(onValueChange).toHaveBeenLastCalledWith(['mat', 'fis'])
    expect(screen.getByRole('button', { name: 'Física' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('Chip con onRemove tiene un botón «Quitar …»', async () => {
    const onRemove = vi.fn()
    render(<Chip onRemove={onRemove}>3.º A</Chip>)
    await userEvent.click(screen.getByRole('button', { name: 'Quitar 3.º A' }))
    expect(onRemove).toHaveBeenCalledOnce()
  })
})

describe('Form', () => {
  const schema = z.object({ email: z.string().email('Escribe un correo válido.') })

  function Demo({ onSubmit }: { onSubmit: (v: z.infer<typeof schema>) => void }) {
    const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: '' } })
    return (
      <Form form={form} onSubmit={onSubmit}>
        <FormItem name="email" label="Correo">
          {(field) => <Input {...field} />}
        </FormItem>
        <Button type="submit">Guardar</Button>
      </Form>
    )
  }

  it('muestra el error del esquema y no envía; con datos válidos envía', async () => {
    const onSubmit = vi.fn()
    render(<Demo onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    const input = screen.getByRole('textbox', { name: 'Correo' })
    expect(await screen.findByText('Escribe un correo válido.')).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveFocus()
    expect(onSubmit).not.toHaveBeenCalled()
    await userEvent.type(input, 'ana@colegio.edu')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ email: 'ana@colegio.edu' }, expect.anything()))
  })
})

describe('Calendar', () => {
  it('navega con flechas, cambia de mes y selecciona con Enter', async () => {
    const onChange = vi.fn()
    render(<Calendar defaultValue={new Date(2026, 9, 31)} onChange={onChange} />)
    expect(screen.getByRole('heading', { name: 'Octubre de 2026' })).toBeInTheDocument()
    screen.getByRole('button', { name: 'sábado, 31 de octubre de 2026' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('heading', { name: 'Noviembre de 2026' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'domingo, 1 de noviembre de 2026' })).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    expect(onChange.mock.calls[0]?.[0]).toEqual(new Date(2026, 10, 1))
  })

  it('no selecciona días fuera de min/max', async () => {
    const onChange = vi.fn()
    render(<Calendar defaultMonth={new Date(2026, 9, 1)} min={new Date(2026, 9, 10)} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'lunes, 5 de octubre de 2026' }))
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('Calendar · rango y año', () => {
  const d = (day: number) => new Date(2026, 9, day)

  it('nextRange: inicio, fin, intercambio y reinicio', () => {
    expect(nextRange({ from: null, to: null }, d(5))).toEqual({ from: d(5), to: null })
    expect(nextRange({ from: d(5), to: null }, d(12))).toEqual({ from: d(5), to: d(12) })
    expect(nextRange({ from: d(12), to: null }, d(5))).toEqual({ from: d(5), to: d(12) })
    expect(nextRange({ from: d(5), to: d(12) }, d(20))).toEqual({ from: d(20), to: null })
  })

  it('elige un rango con dos clics y marca los días intermedios', async () => {
    const onChange = vi.fn()
    render(<Calendar mode="range" defaultMonth={d(1)} onChange={onChange} />)
    expect(screen.getByText('Elige la fecha inicial')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'lunes, 5 de octubre de 2026' }))
    expect(screen.getByText('Ahora elige la fecha final')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'lunes, 12 de octubre de 2026' }))
    expect(onChange).toHaveBeenLastCalledWith({ from: d(5), to: d(12) })
    expect(screen.getByRole('button', { name: 'lunes, 5 de octubre de 2026, inicio del rango' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'jueves, 8 de octubre de 2026' }).closest('td')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('button', { name: 'martes, 13 de octubre de 2026' }).closest('td')).toHaveAttribute('aria-selected', 'false')
  })

  it('el selector de año salta directamente', async () => {
    render(<Calendar defaultMonth={d(1)} yearRange={[2020, 2030]} />)
    await userEvent.click(screen.getByRole('combobox', { name: 'Año' }))
    await userEvent.click(await screen.findByRole('option', { name: '2028' }))
    expect(screen.getByRole('heading', { name: 'Octubre de 2028' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('combobox', { name: 'Mes' }))
    await userEvent.click(await screen.findByRole('option', { name: 'Marzo' }))
    expect(screen.getByRole('heading', { name: 'Marzo de 2028' })).toBeInTheDocument()
  })

  it('el selector de mes deshabilita los meses fuera de min/max', async () => {
    render(<Calendar defaultMonth={d(15)} min={d(10)} max={new Date(2026, 11, 31)} />)
    await userEvent.click(screen.getByRole('combobox', { name: 'Mes' }))
    expect(await screen.findByRole('option', { name: 'Septiembre' })).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByRole('option', { name: 'Noviembre' })).not.toHaveAttribute('aria-disabled')
  })
})

describe('DateRangePicker', () => {
  it('elige desde y hasta, y se cierra al completar', async () => {
    const onChange = vi.fn()
    render(<DateRangePicker aria-label="Periodo del informe" defaultValue={{ from: null, to: null }} onChange={onChange} min={new Date(2026, 9, 1)} max={new Date(2026, 9, 31)} />)
    await userEvent.click(screen.getByRole('button', { name: 'Periodo del informe' }))
    await userEvent.click(await screen.findByRole('button', { name: 'lunes, 5 de octubre de 2026' }))
    await userEvent.click(screen.getByRole('button', { name: 'viernes, 16 de octubre de 2026' }))
    expect(onChange).toHaveBeenLastCalledWith({ from: new Date(2026, 9, 5), to: new Date(2026, 9, 16) })
    await waitFor(() => expect(screen.queryByRole('grid')).not.toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Periodo del informe' })).toHaveTextContent('5 oct 2026 – 16 oct 2026')
  })
})

describe('DatePicker', () => {
  it('abre el calendario, elige un día y muestra la fecha', async () => {
    const onChange = vi.fn()
    render(<DatePicker aria-label="Fecha de entrega" defaultValue={new Date(2026, 9, 10)} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Fecha de entrega' }))
    await userEvent.click(await screen.findByRole('button', { name: 'jueves, 15 de octubre de 2026' }))
    expect(onChange.mock.calls[0]?.[0]).toEqual(new Date(2026, 9, 15))
    expect(screen.getByRole('button', { name: 'Fecha de entrega' })).toHaveTextContent('15 de octubre de 2026')
  })
})

describe('Sheet', () => {
  it('abre como diálogo nombrado y se cierra con Escape', async () => {
    render(
      <Sheet>
        <SheetTrigger>Ver ficha</SheetTrigger>
        <SheetContent title="Ficha de Sofía Restrepo">Contenido</SheetContent>
      </Sheet>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Ver ficha' }))
    expect(screen.getByRole('dialog', { name: 'Ficha de Sofía Restrepo' })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})

describe('Command', () => {
  it('filtra al escribir y muestra el estado vacío', async () => {
    const onSelect = vi.fn()
    render(
      <CommandDialog open>
        <CommandInput placeholder="Buscar" />
        <CommandList>
          <CommandEmpty>Sin resultados</CommandEmpty>
          <CommandItem onSelect={onSelect}>Calificaciones</CommandItem>
          <CommandItem>Asistencia</CommandItem>
        </CommandList>
      </CommandDialog>,
    )
    const input = screen.getByPlaceholderText('Buscar')
    await userEvent.type(input, 'asis')
    expect(screen.queryByRole('option', { name: 'Calificaciones' })).not.toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Asistencia' })).toBeInTheDocument()
    await userEvent.clear(input)
    await userEvent.type(input, 'zzz')
    expect(screen.getByText('Sin resultados')).toBeInTheDocument()
  })
})

describe('Dropzone', () => {
  it('entrega aceptados y rechazados al elegir archivos', async () => {
    const onFiles = vi.fn()
    render(<Dropzone multiple accept=".pdf" onFiles={onFiles} label="Subir boletines" />)
    const pdf = new File(['x'], 'boletin.pdf', { type: 'application/pdf' })
    const img = new File(['x'], 'foto.png', { type: 'image/png' })
    await userEvent.upload(screen.getByLabelText('Subir boletines'), [pdf, img], { applyAccept: false })
    const [accepted, rejected] = onFiles.mock.calls[0]!
    expect(accepted).toEqual([pdf])
    expect(rejected[0].file).toBe(img)
  })
})

describe('Editor', () => {
  it('Ctrl+B pone en negrita la selección', async () => {
    const onChange = vi.fn()
    render(<Editor aria-label="Mensaje" defaultValue="Hola mundo" onChange={onChange} />)
    const area = screen.getByRole('textbox', { name: 'Mensaje' }) as HTMLTextAreaElement
    area.focus()
    area.setSelectionRange(5, 10)
    await userEvent.keyboard('{Control>}b{/Control}')
    expect(onChange).toHaveBeenLastCalledWith('Hola **mundo**')
  })

  it('la barra es un toolbar con un solo botón tabulable', () => {
    render(<Editor aria-label="Mensaje" />)
    expect(screen.getByRole('toolbar', { name: 'Formato' })).toBeInTheDocument()
    const tabbable = screen.getAllByRole('button').filter((b) => b.tabIndex === 0)
    expect(tabbable).toHaveLength(1)
  })
})

describe('Toaster', () => {
  afterEach(() => {
    act(() => toast.dismiss())
    vi.useRealTimers()
  })

  it('muestra, reemplaza por id y se cierra solo', () => {
    vi.useFakeTimers()
    render(<Toaster />)
    act(() => {
      toast('Subiendo boletines…', { id: 'up', duration: Infinity })
    })
    expect(screen.getByText('Subiendo boletines…')).toBeInTheDocument()
    act(() => {
      toast.success('Boletines subidos', { id: 'up', duration: 3000 })
    })
    expect(screen.queryByText('Subiendo boletines…')).not.toBeInTheDocument()
    expect(screen.getByText('Boletines subidos')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.queryByText('Boletines subidos')).not.toBeInTheDocument()
  })

  it('danger usa role alert y la acción cierra la notificación', async () => {
    const onClick = vi.fn()
    render(<Toaster />)
    act(() => {
      toast.danger('No se pudo enviar', { duration: Infinity, action: { label: 'Reintentar', onClick } })
    })
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudo enviar')
    await userEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(onClick).toHaveBeenCalledOnce()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
