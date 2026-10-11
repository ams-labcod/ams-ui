import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './dialog/Dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu/DropdownMenu'
import { Popover, PopoverContent, PopoverTrigger } from './popover/Popover'
import { Select } from './select/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs/Tabs'
import { Tooltip } from './tooltip/Tooltip'

describe('Dialog', () => {
  it('abre, nombra el diálogo, cierra con Escape y devuelve el foco', async () => {
    render(
      <Dialog>
        <DialogTrigger>Retirar estudiante</DialogTrigger>
        <DialogContent title="¿Retirar a Ana Pérez?" description="Perderá el acceso al curso.">
          <DialogClose>Cancelar</DialogClose>
        </DialogContent>
      </Dialog>,
    )
    const trigger = screen.getByRole('button', { name: 'Retirar estudiante' })
    await userEvent.click(trigger)
    const dialog = screen.getByRole('dialog', { name: '¿Retirar a Ana Pérez?' })
    expect(dialog).toHaveAccessibleDescription('Perderá el acceso al curso.')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it('la X cierra el diálogo', async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent title="Detalle" />
      </Dialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})

describe('Tabs', () => {
  it('cambia de panel con las flechas', async () => {
    render(
      <Tabs defaultValue="notas">
        <TabsList aria-label="Secciones del curso">
          <TabsTrigger value="notas">Notas</TabsTrigger>
          <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
        </TabsList>
        <TabsContent value="notas">Panel de notas</TabsContent>
        <TabsContent value="asistencia">Panel de asistencia</TabsContent>
      </Tabs>,
    )
    screen.getByRole('tab', { name: 'Notas' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Asistencia' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel de asistencia')
  })
})

describe('DropdownMenu', () => {
  it('se abre con teclado y ejecuta el ítem elegido', async () => {
    const onSelect = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Acciones</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Editar</DropdownMenuItem>
          <DropdownMenuItem destructive>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )
    screen.getByRole('button', { name: 'Acciones' }).focus()
    await userEvent.keyboard('{Enter}')
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    await userEvent.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
  })
})

describe('Select', () => {
  it('elige una opción y avisa del cambio', async () => {
    const onValueChange = vi.fn()
    render(
      <Select
        aria-label="Período"
        onValueChange={onValueChange}
        options={[
          { value: 'p1', label: 'Primer período' },
          { value: 'p2', label: 'Segundo período' },
        ]}
      />,
    )
    await userEvent.click(screen.getByRole('combobox', { name: 'Período' }))
    await userEvent.click(await screen.findByRole('option', { name: 'Segundo período' }))
    expect(onValueChange).toHaveBeenCalledWith('p2')
    expect(screen.getByRole('combobox', { name: 'Período' })).toHaveTextContent('Segundo período')
  })
})

describe('Popover', () => {
  it('abre y cierra con Escape', async () => {
    render(
      <Popover>
        <PopoverTrigger>Filtros</PopoverTrigger>
        <PopoverContent aria-label="Filtros">Contenido</PopoverContent>
      </Popover>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Filtros' }))
    expect(await screen.findByText('Contenido')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByText('Contenido')).not.toBeInTheDocument())
  })
})

describe('Tooltip', () => {
  it('aparece al enfocar el disparador', async () => {
    render(
      <Tooltip content="Exportar a PDF" delay={0}>
        <button type="button">Exportar</button>
      </Tooltip>,
    )
    await userEvent.tab()
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Exportar a PDF')
  })
})
