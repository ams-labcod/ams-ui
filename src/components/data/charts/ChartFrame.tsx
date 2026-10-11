import { useId, useState, type ReactNode } from 'react'
import { ChartColumn, Table2 } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { formatNumber } from '../../../lib/format'
import { EmptyState } from '../../ui/empty-state/EmptyState'
import { Skeleton } from '../../ui/skeleton/Skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table/Table'
import { Toggle } from '../../ui/toggle/Toggle'

export interface ChartSeries {
  /** Clave del valor en cada fila de data. */
  key: string
  label: string
}

// Variables --ams-* (no --color-*): las de @theme inline no existen en tiempo de ejecución.
/** Colores en orden fijo: la serie N siempre usa chart-N. Más de 5 series → agrupa en «Otros» o usa varios gráficos. */
export const chartColor = (i: number) => `var(--ams-chart-${(i % 5) + 1})`

export const defaultFormat = (n: number) => formatNumber(n, 'es', { maximumFractionDigits: 1 })
export const compactFormat = (n: number) => formatNumber(n, 'es', { notation: 'compact', maximumFractionDigits: 1 })

export interface ChartFrameProps {
  /** Título visible; también nombra el gráfico para lectores de pantalla. */
  title: string
  description?: ReactNode
  /** Series para la leyenda (se muestra con 2 o más). */
  legend?: { label: string; color: string }[]
  /** Tabla equivalente: columnas y filas ya formateadas. */
  table: { columns: string[]; rows: (string | number)[][] }
  height: number
  loading?: boolean
  isEmpty?: boolean
  empty?: ReactNode
  className?: string
  children: ReactNode
}

/** Marco común: título, leyenda, estados y una vista de tabla accesible para cada gráfico. */
export function ChartFrame({ title, description, legend = [], table, height, loading, isEmpty, empty, className, children }: ChartFrameProps) {
  const [asTable, setAsTable] = useState(false)
  const titleId = useId()

  return (
    <figure aria-labelledby={titleId} className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <figcaption>
          <span id={titleId} className="block font-display font-semibold text-fg">
            {title}
          </span>
          {description && <span className="mt-0.5 block text-sm text-fg-muted">{description}</span>}
        </figcaption>
        {/* Nombre fijo y estado en aria-pressed: en un botón de alternancia el texto no cambia. */}
        {!isEmpty && !loading && (
          <Toggle size="sm" variant="outline" pressed={asTable} onPressedChange={setAsTable}>
            <Table2 aria-hidden />
            <span className="max-sm:sr-only">Ver como tabla</span>
          </Toggle>
        )}
      </div>

      {loading ? (
        <Skeleton className="w-full rounded-md" style={{ height }} />
      ) : isEmpty ? (
        (empty ?? <EmptyState icon={<ChartColumn />} title="Sin datos para este período" description="Cuando haya registros, el gráfico aparecerá aquí." className="py-8" />)
      ) : asTable ? (
        <Table containerClassName="max-h-96 overflow-y-auto">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {table.columns.map((c, i) => (
                <TableHead key={c} className={i > 0 ? 'text-right' : undefined}>
                  {c}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.map((r, i) => (
              <TableRow key={i}>
                {r.map((cell, j) => (
                  <TableCell key={j} className={j > 0 ? 'text-right tabular-nums' : 'text-fg'}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
          {/* El SVG es decorativo para lectores: la información equivalente está en «Ver tabla». */}
          <div aria-hidden style={{ height }} className="w-full [&_.recharts-surface]:outline-none">
            {children}
          </div>
          {legend.length > 1 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
              {legend.map((l) => (
                <li key={l.label} className="inline-flex items-center gap-2">
                  <span aria-hidden className="size-2.5 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </figure>
  )
}

interface TooltipRow {
  label: string
  value: string
  color: string
}

/** Tooltip con superficie sólida; los valores van en color de texto y la identidad la da el punto de color. */
export function ChartTooltipCard({ title, rows }: { title?: ReactNode; rows: TooltipRow[] }) {
  if (rows.length === 0) return null
  return (
    <div className="min-w-40 rounded-md border border-border-strong bg-surface px-3 py-2.5 text-sm shadow-pop">
      {title !== undefined && <p className="mb-1.5 text-xs font-medium text-fg-subtle">{title}</p>}
      <ul className="flex flex-col gap-1">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2">
            <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: r.color }} />
            <span className="text-fg-muted">{r.label}</span>
            <span className="ml-auto pl-4 font-medium text-fg tabular-nums">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
