import { useState } from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { applyFilter, describeCondition, type FilterField, type FilterState } from './data/advanced-filter/filtering'
import { AdvancedFilter } from './data/advanced-filter/AdvancedFilter'
import { BarChart, DonutChart } from './data/charts/Charts'
import { DataTable } from './data/data-table/DataTable'
import { useDataTable } from './data/data-table/useDataTable'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion/Accordion'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from './ui/alert-dialog/AlertDialog'
import { Breadcrumb } from './ui/breadcrumb/Breadcrumb'
import { Combobox } from './ui/combobox/Combobox'
import { Pagination, paginationRange } from './ui/pagination/Pagination'
import { Progress, ProgressRing } from './ui/progress/Progress'
import { Slider } from './ui/slider/Slider'
import { Toggle } from './ui/toggle/Toggle'
import type { ColumnDef } from '@tanstack/react-table'

describe('paginationRange', () => {
  it('muestra extremos, vecinas y saltos', () => {
    expect(paginationRange(1, 5)).toEqual([1, 2, 3, 4, 5])
    expect(paginationRange(6, 20)).toEqual([1, 'ellipsis', 5, 6, 7, 'ellipsis', 20])
    expect(paginationRange(2, 20)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 20])
    expect(paginationRange(19, 20)).toEqual([1, 'ellipsis', 16, 17, 18, 19, 20])
  })
})

describe('Pagination', () => {
  it('marca la página actual y bloquea los extremos', async () => {
    const onPageChange = vi.fn()
    render(<Pagination page={1} totalPages={8} onPageChange={onPageChange} />)
    expect(screen.getByRole('button', { name: 'Página 1' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Página anterior' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Página siguiente' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})

describe('Progress', () => {
  it('expone valor y porcentaje', () => {
    render(
      <>
        <Progress label="Boletines enviados" value={30} max={120} />
        <ProgressRing label="Asistencia" value={94} />
      </>,
    )
    expect(screen.getByRole('progressbar', { name: 'Boletines enviados' })).toHaveAttribute('aria-valuetext', '25 %')
    expect(screen.getByRole('progressbar', { name: 'Asistencia' })).toHaveAttribute('aria-valuenow', '94')
  })
})

describe('Slider', () => {
  it('cambia con flechas respetando el paso y el máximo', async () => {
    const onValueChange = vi.fn()
    render(<Slider label="Nota mínima" defaultValue={9.5} min={0} max={10} step={0.5} onValueChange={onValueChange} />)
    const thumb = screen.getByRole('slider', { name: 'Nota mínima' })
    thumb.focus()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')
    expect(onValueChange).toHaveBeenLastCalledWith(10)
    expect(thumb).toHaveAttribute('aria-valuenow', '10')
  })

  it('formatValue recibe solo el valor (regresión: map pasaba índice y array)', () => {
    render(<Slider label="Descuento" defaultValue={[100000, 200000]} max={400000} formatValue={(n: number, ...rest: unknown[]) => `${n}:${rest.length}`} />)
    expect(screen.getByText('100000:0 – 200000:0')).toBeInTheDocument()
  })

  it('rango con dos asas nombradas', () => {
    render(<Slider label="Promedio" defaultValue={[6, 9]} max={10} />)
    expect(screen.getByRole('slider', { name: 'Promedio: desde' })).toHaveAttribute('aria-valuenow', '6')
    expect(screen.getByRole('slider', { name: 'Promedio: hasta' })).toHaveAttribute('aria-valuenow', '9')
  })
})

describe('Toggle', () => {
  it('comunica su estado con aria-pressed', async () => {
    render(<Toggle aria-label="Mostrar notas ocultas">Ocultas</Toggle>)
    const t = screen.getByRole('button', { name: 'Mostrar notas ocultas' })
    expect(t).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(t)
    expect(t).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('AlertDialog', () => {
  it('enfoca Cancelar al abrir y confirma con la acción', async () => {
    const onDelete = vi.fn()
    render(
      <AlertDialog>
        <AlertDialogTrigger>Eliminar período</AlertDialogTrigger>
        <AlertDialogContent title="¿Eliminar el período 1?" description="Se borrarán 1.240 notas.">
          <AlertDialogCancel />
          <AlertDialogAction onClick={onDelete}>Eliminar</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar período' }))
    const dialog = screen.getByRole('alertdialog', { name: '¿Eliminar el período 1?' })
    expect(dialog).toHaveAccessibleDescription('Se borrarán 1.240 notas.')
    expect(within(dialog).getByRole('button', { name: 'Cancelar' })).toHaveFocus()
    await userEvent.click(within(dialog).getByRole('button', { name: 'Eliminar' }))
    expect(onDelete).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument())
  })
})

describe('Accordion', () => {
  it('single: abrir uno cierra el otro', async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger>¿Cuánto tarda la implementación?</AccordionTrigger>
          <AccordionContent>Entre 2 y 4 semanas.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>¿Funciona sin conexión?</AccordionTrigger>
          <AccordionContent>La app móvil sí.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    const a = screen.getByRole('button', { name: '¿Cuánto tarda la implementación?' })
    const b = screen.getByRole('button', { name: '¿Funciona sin conexión?' })
    await userEvent.click(a)
    expect(a).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(b)
    expect(a).toHaveAttribute('aria-expanded', 'false')
    expect(b).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('Breadcrumb', () => {
  it('marca la página actual y colapsa los niveles intermedios', () => {
    render(
      <Breadcrumb
        maxItems={3}
        items={[{ label: 'Inicio', href: '/' }, { label: 'Cursos', href: '/cursos' }, { label: '3.º A', href: '/cursos/3a' }, { label: 'Matemáticas', href: '/m' }, { label: 'Notas' }]}
      />,
    )
    expect(screen.getByRole('navigation', { name: 'Ruta de navegación' })).toBeInTheDocument()
    expect(screen.getByText('Notas')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('2 niveles intermedios')).toBeInTheDocument()
    expect(screen.queryByText('Cursos')).not.toBeInTheDocument()
  })
})

describe('Combobox', () => {
  it('busca, elige y muestra el estado vacío', async () => {
    const onValueChange = vi.fn()
    render(
      <Combobox
        aria-label="Estudiante"
        onValueChange={onValueChange}
        options={[
          { value: '1', label: 'Ana M. Pérez', description: '3.º A' },
          { value: '2', label: 'Luis F. Gómez', description: '4.º B' },
        ]}
      />,
    )
    await userEvent.click(screen.getByRole('combobox', { name: 'Estudiante' }))
    const search = await screen.findByPlaceholderText('Buscar')
    await userEvent.type(search, '4.º b')
    expect(screen.queryByRole('option', { name: /Ana/ })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('option', { name: /Luis/ }))
    expect(onValueChange).toHaveBeenCalledWith('2')
    expect(screen.getByRole('combobox', { name: 'Estudiante' })).toHaveTextContent('Luis F. Gómez')
  })
})

// ---------- Datos ----------

interface Student {
  id: string
  name: string
  grade: string
  avg: number
  enrolled: Date
}

const students: Student[] = [
  { id: '1', name: 'Ana Pérez', grade: '6', avg: 9.1, enrolled: new Date(2026, 0, 15) },
  { id: '2', name: 'Luis Gómez', grade: '7', avg: 7.5, enrolled: new Date(2026, 1, 3) },
  { id: '3', name: 'Sofía Restrepo', grade: '6', avg: 9.6, enrolled: new Date(2026, 2, 20) },
  { id: '4', name: 'Diego Quintero', grade: '8', avg: 5.8, enrolled: new Date(2026, 3, 1) },
]

const fields: FilterField[] = [
  { id: 'name', label: 'Nombre', type: 'text' },
  { id: 'grade', label: 'Grado', type: 'select', options: [{ value: '6', label: 'Sexto' }, { value: '7', label: 'Séptimo' }, { value: '8', label: 'Octavo' }] },
  { id: 'avg', label: 'Promedio', type: 'number' },
  { id: 'enrolled', label: 'Matrícula', type: 'date' },
]

describe('filtering', () => {
  const names = (state: FilterState) => applyFilter(students, state).map((s) => s.name)

  it('combina condiciones con y / o, ignora las incompletas', () => {
    const conditions: FilterState['conditions'] = [
      { id: 'a', field: 'grade', operator: 'is', value: ['6'] },
      { id: 'b', field: 'avg', operator: 'gt', value: 9.3 },
      { id: 'c', field: 'name', operator: 'contains', value: '' },
    ]
    expect(names({ join: 'and', conditions })).toEqual(['Sofía Restrepo'])
    expect(names({ join: 'or', conditions })).toEqual(['Ana Pérez', 'Sofía Restrepo'])
  })

  it('texto sin tildes ni mayúsculas, rangos numéricos y de fechas', () => {
    expect(names({ join: 'and', conditions: [{ id: 'a', field: 'name', operator: 'contains', value: 'SOFIA' }] })).toEqual(['Sofía Restrepo'])
    expect(names({ join: 'and', conditions: [{ id: 'a', field: 'avg', operator: 'between', value: [9, 6] }] })).toEqual(['Luis Gómez'])
    expect(names({ join: 'and', conditions: [{ id: 'a', field: 'enrolled', operator: 'between', value: [new Date(2026, 1, 1), new Date(2026, 2, 20)] }] })).toEqual([
      'Luis Gómez',
      'Sofía Restrepo',
    ])
  })

  it('describe la condición en palabras', () => {
    expect(describeCondition({ id: 'a', field: 'grade', operator: 'is', value: ['6', '7'] }, fields[1])).toBe('Grado es Sexto o Séptimo')
    expect(describeCondition({ id: 'a', field: 'avg', operator: 'gt', value: 8 }, fields[2])).toBe('Promedio mayor que 8')
    expect(describeCondition({ id: 'a', field: 'name', operator: 'contains', value: 'ana' }, fields[0])).toBe('Nombre contiene «ana»')
  })
})

describe('AdvancedFilter', () => {
  it('muestra las condiciones activas como chips y las quita', async () => {
    function Demo() {
      const [state, setState] = useState<FilterState>({ join: 'and', conditions: [{ id: 'x', field: 'avg', operator: 'gt', value: 8 }] })
      return <AdvancedFilter fields={fields} value={state} onChange={setState} />
    }
    render(<Demo />)
    expect(screen.getByText('Promedio mayor que 8')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Filtros/ })).toHaveTextContent('1')
    await userEvent.click(screen.getByRole('button', { name: 'Quitar filtro: Promedio mayor que 8' }))
    expect(screen.queryByText('Promedio mayor que 8')).not.toBeInTheDocument()
  })
})

const columns: ColumnDef<Student>[] = [
  { accessorKey: 'name', header: 'Nombre' },
  { accessorKey: 'avg', header: 'Promedio', meta: { align: 'right' } },
]

function Table({ onBulk }: { onBulk?: (rows: Student[]) => void }) {
  const table = useDataTable({ data: students, columns, getRowId: (s) => s.id, selectable: true, getRowLabel: (s) => s.name, pageSize: 2 })
  return <DataTable table={table} label="Estudiantes" bulkActions={(rows) => <button onClick={() => onBulk?.(rows)}>Exportar</button>} />
}

describe('DataTable', () => {
  it('pagina y ordena con aria-sort', async () => {
    render(<Table />)
    const rows = () => screen.getAllByRole('row').slice(1).map((r) => r.textContent)
    expect(rows()).toHaveLength(2)
    expect(screen.getByText('1–2 de 4')).toBeInTheDocument()
    const sortBtn = screen.getByRole('button', { name: 'Promedio' })
    await userEvent.click(sortBtn)
    expect(screen.getByRole('columnheader', { name: 'Promedio' })).toHaveAttribute('aria-sort', 'ascending')
    expect(rows()[0]).toContain('Diego Quintero')
    await userEvent.click(screen.getByRole('button', { name: 'Página 2' }))
    expect(screen.getByText('3–4 de 4')).toBeInTheDocument()
  })

  it('selección de filas y acciones masivas', async () => {
    const onBulk = vi.fn()
    render(<Table onBulk={onBulk} />)
    await userEvent.click(screen.getByRole('checkbox', { name: 'Seleccionar Ana Pérez' }))
    expect(screen.getByText('1 fila seleccionada')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('checkbox', { name: 'Seleccionar todas las filas de esta página' }))
    expect(screen.getByText('2 filas seleccionadas')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Exportar' }))
    expect(onBulk.mock.calls[0]?.[0].map((s: Student) => s.name)).toEqual(['Ana Pérez', 'Luis Gómez'])
  })

  it('paginación en el servidor: el total y las páginas vienen de rowCount', async () => {
    const onPage = vi.fn()
    function Server() {
      const [page, setPage] = useState({ pageIndex: 0, pageSize: 2 })
      // La API devolvió solo la página actual (2 filas) de 30 en total.
      const table = useDataTable({
        data: students.slice(0, 2),
        columns,
        rowCount: 30,
        tableOptions: {
          state: { pagination: page },
          onPaginationChange: (u) => setPage((p) => {
            const nuevo = typeof u === 'function' ? u(p) : u
            onPage(nuevo)
            return nuevo
          }),
        },
      })
      return <DataTable table={table} label="Estudiantes" />
    }
    render(<Server />)
    expect(screen.getByText('1–2 de 30')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Página 15' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Página 2' }))
    expect(onPage).toHaveBeenLastCalledWith({ pageIndex: 1, pageSize: 2 })
    expect(screen.getByText('3–4 de 30')).toBeInTheDocument()
    // No pagina en el cliente: muestra las filas recibidas tal cual.
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(2)
  })

  it('estado vacío', () => {
    function Empty() {
      const table = useDataTable<Student>({ data: [], columns })
      return <DataTable table={table} label="Estudiantes" />
    }
    render(<Empty />)
    expect(screen.getByText('Sin resultados')).toBeInTheDocument()
  })
})

describe('Charts', () => {
  const data = [
    { mes: 'Ago', matriculas: 30, retiros: 2 },
    { mes: 'Sep', matriculas: 48, retiros: 4 },
  ]

  it('ofrece la vista de tabla con los mismos datos', async () => {
    render(<BarChart title="Matrículas por mes" data={data} index="mes" series={[{ key: 'matriculas', label: 'Matrículas' }, { key: 'retiros', label: 'Retiros' }]} />)
    expect(screen.getByRole('figure', { name: 'Matrículas por mes' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Ver como tabla' }))
    expect(screen.getByRole('row', { name: 'Sep 48 4' })).toBeInTheDocument()
  })

  it('estado vacío y porcentajes del donut', async () => {
    const { rerender } = render(<DonutChart title="Asistencia" data={[]} />)
    expect(screen.getByText('Sin datos para este período')).toBeInTheDocument()
    rerender(
      <DonutChart
        title="Asistencia"
        data={[
          { label: 'Presentes', value: 312 },
          { label: 'Ausentes', value: 14 },
          { label: 'Justificados', value: 6 },
        ]}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Ver como tabla' }))
    expect(screen.getByRole('row', { name: 'Presentes 312 94 %' })).toBeInTheDocument()
  })
})
