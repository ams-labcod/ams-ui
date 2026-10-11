import type { ReactNode } from 'react'
import { flexRender, type Column, type Table as TanTable } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, Columns3, SearchX } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { formatNumber } from '../../../lib/format'
import { Button } from '../../ui/button/Button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '../../ui/dropdown-menu/DropdownMenu'
import { EmptyState } from '../../ui/empty-state/EmptyState'
import { Pagination } from '../../ui/pagination/Pagination'
import { Select } from '../../ui/select/Select'
import { Skeleton } from '../../ui/skeleton/Skeleton'
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '../../ui/table/Table'

export interface DataTableProps<T> {
  /** Resultado de useDataTable() (o de useReactTable si necesitas control total). */
  table: TanTable<T>
  /** Nombre de la tabla para lectores de pantalla. */
  label: string
  loading?: boolean
  /** Qué mostrar sin filas. Por defecto, un EmptyState genérico. */
  empty?: ReactNode
  /** Búsqueda, filtros u otras acciones a la izquierda de la barra superior. */
  toolbar?: ReactNode
  /** Acciones sobre las filas seleccionadas. Aparecen al seleccionar al menos una. */
  bulkActions?: (rows: T[], clearSelection: () => void) => ReactNode
  /** Opciones del selector de filas por página. */
  pageSizes?: number[]
  className?: string
}

const align = { left: 'text-left', center: 'text-center', right: 'text-right' } as const

export function DataTable<T>({ table, label, loading = false, empty, toolbar, bulkActions, pageSizes = [10, 20, 50], className }: DataTableProps<T>) {
  const selected = table.getSelectedRowModel().rows.map((r) => r.original)
  const columnCount = table.getVisibleLeafColumns().length
  const rows = table.getRowModel().rows

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{toolbar}</div>
        <ColumnsMenu table={table} />
      </div>

      {bulkActions && selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-accent-border bg-accent-soft px-4 py-2.5 text-sm animate-fade-in">
          <span className="font-medium text-accent" aria-live="polite">
            {selected.length === 1 ? '1 fila seleccionada' : `${selected.length} filas seleccionadas`}
          </span>
          <div className="flex flex-wrap gap-2">{bulkActions(selected, () => table.resetRowSelection())}</div>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => table.resetRowSelection()}>
            Quitar selección
          </Button>
        </div>
      )}

      <Table aria-label={label} aria-busy={loading || undefined}>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id} className="hover:bg-transparent">
              {group.headers.map((header) => {
                const meta = header.column.columnDef.meta
                const sorted = header.column.getIsSorted()
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : header.column.getCanSort() ? 'none' : undefined}
                    className={cn(align[meta?.align ?? 'left'], header.column.id === 'select' && 'w-12')}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <SortButton column={header.column} right={meta?.align === 'right'}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </SortButton>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: Math.min(table.getState().pagination.pageSize, 8) }, (_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                {table.getVisibleLeafColumns().map((c) => (
                  <TableCell key={c.id}>
                    <Skeleton className={cn('h-4', c.id === 'select' ? 'size-4.5' : 'w-3/4')} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length === 0 ? (
            <TableEmpty colSpan={columnCount}>{empty ?? <EmptyState icon={<SearchX />} title="Sin resultados" description="Ninguna fila coincide con la búsqueda o los filtros." />}</TableEmpty>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={align[cell.column.columnDef.meta?.align ?? 'left']}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {loading && <span className="sr-only">Cargando {label}</span>}
      <Footer table={table} pageSizes={pageSizes} />
    </div>
  )
}

function SortButton<T>({ column, right, children }: { column: Column<T>; right: boolean; children: ReactNode }) {
  const sorted = column.getIsSorted()
  const Icon = sorted === 'asc' ? ArrowUp : sorted === 'desc' ? ArrowDown : ChevronsUpDown
  return (
    <button
      type="button"
      onClick={column.getToggleSortingHandler()}
      className={cn('-mx-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-xs px-1.5 py-1 transition-colors hover:text-fg', sorted && 'text-accent', right && 'flex-row-reverse')}
    >
      {children}
      <Icon aria-hidden className={cn('size-3.5', !sorted && 'opacity-50')} />
    </button>
  )
}

function ColumnsMenu<T>({ table }: { table: TanTable<T> }) {
  const hideable = table.getAllLeafColumns().filter((c) => c.getCanHide())
  if (hideable.length === 0) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <Columns3 />
          Columnas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
        {hideable.map((c) => (
          <DropdownMenuCheckboxItem key={c.id} checked={c.getIsVisible()} onCheckedChange={(v) => c.toggleVisibility(v)}>
            {c.columnDef.meta?.label ?? (typeof c.columnDef.header === 'string' ? c.columnDef.header : c.id)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Footer<T>({ table, pageSizes }: { table: TanTable<T>; pageSizes: number[] }) {
  const { pageIndex, pageSize } = table.getState().pagination
  const total = table.getFilteredRowModel().rows.length
  if (total === 0) return null
  const from = pageIndex * pageSize + 1
  const to = Math.min(total, from + pageSize - 1)
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-fg-muted">
      <div className="flex items-center gap-3">
        <span className="tabular-nums">
          {formatNumber(from)}–{formatNumber(to)} de {formatNumber(total)}
        </span>
        <Select
          aria-label="Filas por página"
          value={String(pageSize)}
          onValueChange={(v) => table.setPageSize(Number(v))}
          // Incluye el tamaño actual aunque no esté en pageSizes (p. ej. pageSize: 5).
          options={[...new Set([...pageSizes, pageSize])].sort((a, b) => a - b).map((n) => ({ value: String(n), label: `${n} por página` }))}
          className="h-control-sm w-36 rounded-full"
        />
      </div>
      <Pagination page={pageIndex + 1} totalPages={table.getPageCount()} onPageChange={(p) => table.setPageIndex(p - 1)} />
    </div>
  )
}
