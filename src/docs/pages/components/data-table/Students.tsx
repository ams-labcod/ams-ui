import { useMemo, useState } from 'react'
import { Ellipsis, FileText, Mail, Search, UserMinus } from 'lucide-react'
import {
  AdvancedFilter,
  applyFilter,
  Avatar,
  Badge,
  Button,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  emptyFilter,
  Input,
  toast,
  useDataTable,
  type ColumnDef,
  type FilterField,
  type FilterState,
} from '@ams-labcod/ams-ui'
import { gradeLabels, statusLabels, students, type Student } from '../../../sample-data'

const statusVariant = { activo: 'success', pendiente: 'warning', retirado: 'neutral' } as const

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: 'Estudiante',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar name={row.original.name} size="sm" aria-hidden />
        <div className="min-w-0">
          <p className="truncate font-medium text-fg">{row.original.name}</p>
          <p className="text-xs text-fg-subtle">{row.original.id}</p>
        </div>
      </div>
    ),
  },
  { accessorKey: 'grade', header: 'Grado', cell: ({ getValue }) => gradeLabels[getValue<Student['grade']>()] },
  {
    accessorKey: 'average',
    header: 'Promedio',
    meta: { align: 'right' },
    cell: ({ getValue }) => {
      const v = getValue<number>()
      return <span className={v < 6 ? 'font-semibold text-danger tabular-nums' : 'font-semibold text-fg tabular-nums'}>{v.toLocaleString('es', { minimumFractionDigits: 1 })}</span>
    },
  },
  { accessorKey: 'attendance', header: 'Asistencia', meta: { align: 'right' }, cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()} %</span> },
  { accessorKey: 'status', header: 'Estado', cell: ({ getValue }) => <Badge variant={statusVariant[getValue<Student['status']>()]}>{statusLabels[getValue<Student['status']>()]}</Badge> },
  {
    id: 'actions',
    header: () => <span className="sr-only">Acciones</span>,
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`Acciones para ${row.original.name}`}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem icon={<FileText />}>Ver boletín</DropdownMenuItem>
          <DropdownMenuItem icon={<Mail />}>Escribir al acudiente</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<UserMinus />} destructive>
            Retirar del curso
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const fields: FilterField[] = [
  { id: 'grade', label: 'Grado', type: 'select', options: Object.entries(gradeLabels).map(([value, label]) => ({ value, label })) },
  { id: 'average', label: 'Promedio', type: 'number' },
  { id: 'attendance', label: 'Asistencia', type: 'number' },
  { id: 'status', label: 'Estado', type: 'select', options: Object.entries(statusLabels).map(([value, label]) => ({ value, label })) },
  { id: 'enrolled', label: 'Matrícula', type: 'date' },
]

export default function Students() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterState>(emptyFilter)
  const data = useMemo(() => applyFilter(students, filter), [filter])

  const table = useDataTable({
    data,
    columns,
    getRowId: (s) => s.id,
    getRowLabel: (s) => s.name,
    selectable: true,
    globalFilter: search,
    initialSorting: [{ id: 'name', desc: false }],
  })

  return (
    <DataTable
      className="w-full"
      table={table}
      label="Estudiantes"
      toolbar={
        <>
          <Input type="search" aria-label="Buscar estudiante" placeholder="Buscar por nombre o código" startIcon={<Search />} value={search} onChange={(e) => setSearch(e.target.value)} className="h-control-sm w-60 rounded-full" />
          <AdvancedFilter fields={fields} value={filter} onChange={setFilter} />
        </>
      }
      bulkActions={(rows, clear) => (
        <>
          <Button size="sm" variant="secondary" onClick={() => toast.success(`Boletines de ${rows.length} estudiantes exportados`)}>
            <FileText />
            Exportar boletines
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              toast.info(`Mensaje enviado a ${rows.length} acudientes`)
              clear()
            }}
          >
            <Mail />
            Escribir a acudientes
          </Button>
        </>
      )}
    />
  )
}
