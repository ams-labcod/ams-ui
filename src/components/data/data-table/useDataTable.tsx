import { useMemo, useState } from 'react'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  type VisibilityState,
} from '@tanstack/react-table'
import { Checkbox } from '../../ui/checkbox/Checkbox'

declare module '@tanstack/react-table' {
  // Metadatos de columna que entiende DataTable.
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Alineación de cabecera y celdas; números a la derecha. */
    align?: 'left' | 'center' | 'right'
    /** Nombre en el menú de columnas visibles, si el header no es texto. */
    label?: string
  }
}

export interface UseDataTableOptions<T> {
  data: T[]
  columns: ColumnDef<T, any>[] // any: cada columna tiene su propio tipo de valor
  /** Id estable por fila; sin él, la selección se pierde al ordenar o filtrar. */
  getRowId?: (row: T) => string
  /** Añade la columna de casillas para seleccionar filas. */
  selectable?: boolean
  /** Nombre de cada fila para lectores de pantalla: «Seleccionar Ana Pérez». */
  getRowLabel?: (row: T) => string
  pageSize?: number
  initialSorting?: SortingState
  /** Columnas ocultas al empezar: { email: false }. Se pueden mostrar desde «Columnas». */
  initialColumnVisibility?: VisibilityState
  /** Texto de búsqueda global (filtra en todas las columnas con accessor). */
  globalFilter?: string
  /** Escape para opciones avanzadas de TanStack (paginación en servidor, filtros por columna…). */
  tableOptions?: Partial<TableOptions<T>>
}

/** La lógica de la tabla (TanStack Table v8) con valores por defecto de AMS. La vista es <DataTable table={…} />. */
export function useDataTable<T>({
  data,
  columns,
  getRowId,
  selectable = false,
  getRowLabel,
  pageSize = 10,
  initialSorting = [],
  initialColumnVisibility = {},
  globalFilter,
  tableOptions,
}: UseDataTableOptions<T>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize })

  const allColumns = useMemo(() => (selectable ? [selectionColumn<T>(getRowLabel), ...columns] : columns), [selectable, getRowLabel, columns])

  return useReactTable<T>({
    data,
    columns: allColumns,
    getRowId,
    state: { sorting, rowSelection, columnVisibility, pagination, globalFilter },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    enableRowSelection: selectable,
    // Primer clic siempre ascendente; TanStack invierte el orden en columnas numéricas.
    sortDescFirst: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...tableOptions,
  })
}

function selectionColumn<T>(getRowLabel?: (row: T) => string): ColumnDef<T> {
  return {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Seleccionar todas las filas de esta página"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={getRowLabel ? `Seleccionar ${getRowLabel(row.original)}` : `Seleccionar fila ${row.index + 1}`}
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
      />
    ),
  }
}
