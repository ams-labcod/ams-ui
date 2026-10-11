import { Fragment } from 'react'
import { ListFilter, Plus, Trash2 } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { Badge } from '../../ui/badge/Badge'
import { Button } from '../../ui/button/Button'
import { Chip, ChipGroup } from '../../ui/chips/Chips'
import { DatePicker, DateRangePicker } from '../../ui/date-picker/DatePicker'
import { Input } from '../../ui/input/Input'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover/Popover'
import { Select } from '../../ui/select/Select'
import {
  describeCondition,
  emptyFilter,
  isComplete,
  newCondition,
  operatorsByType,
  type FilterCondition,
  type FilterField,
  type FilterState,
  type FilterValue,
} from './filtering'

export interface AdvancedFilterProps {
  fields: FilterField[]
  value: FilterState
  onChange: (value: FilterState) => void
  /** Muestra las condiciones activas como chips junto al botón. */
  showChips?: boolean
  className?: string
}

export function AdvancedFilter({ fields, value, onChange, showChips = true, className }: AdvancedFilterProps) {
  const active = value.conditions.filter(isComplete)
  const fieldOf = (id: string) => fields.find((f) => f.id === id)

  const update = (id: string, patch: Partial<FilterCondition>) =>
    onChange({ ...value, conditions: value.conditions.map((c) => (c.id === id ? { ...c, ...patch } : c)) })
  const remove = (id: string) => onChange({ ...value, conditions: value.conditions.filter((c) => c.id !== id) })
  const add = () => fields[0] && onChange({ ...value, conditions: [...value.conditions, newCondition(fields[0])] })

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <Popover onOpenChange={(open) => open && value.conditions.length === 0 && add()}>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">
            <ListFilter />
            Filtros
            {active.length > 0 && (
              <Badge variant="solid" className="px-1.5 py-0 tabular-nums">
                {active.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" aria-label="Filtros" className="w-[min(40rem,calc(100vw-2rem))] p-0">
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3 text-sm text-fg-muted">
            Mostrar filas que cumplan
            <Select
              aria-label="Cómo combinar las condiciones"
              value={value.join}
              onValueChange={(join) => onChange({ ...value, join: join as FilterState['join'] })}
              options={[
                { value: 'and', label: 'todas' },
                { value: 'or', label: 'alguna' },
              ]}
              className="h-control-sm w-28"
            />
            de las condiciones
          </div>

          <ol className="flex max-h-[50vh] flex-col gap-3 overflow-y-auto p-4">
            {value.conditions.length === 0 && <li className="text-sm text-fg-subtle">Sin condiciones. Añade una para filtrar.</li>}
            {value.conditions.map((c, i) => {
              const field = fieldOf(c.field)
              if (!field) return null
              return (
                <li key={c.id} className="flex flex-wrap items-start gap-2">
                  <span className="w-6 pt-2.5 text-xs text-fg-subtle">{i === 0 ? '' : value.join === 'and' ? 'y' : 'o'}</span>
                  <Select
                    aria-label={`Campo de la condición ${i + 1}`}
                    value={c.field}
                    onValueChange={(id) => {
                      const next = fieldOf(id)
                      if (next) update(c.id, { ...newCondition(next), id: c.id })
                    }}
                    options={fields.map((f) => ({ value: f.id, label: f.label }))}
                    className="h-control-sm w-36"
                  />
                  <Select
                    aria-label={`Operador de la condición ${i + 1}`}
                    value={c.operator}
                    onValueChange={(op) => update(c.id, { operator: op as FilterCondition['operator'], value: null })}
                    options={operatorsByType[field.type].map((o) => ({ value: o.value, label: o.label }))}
                    className="h-control-sm w-40"
                  />
                  <div className="min-w-40 flex-1">
                    <ValueEditor field={field} condition={c} index={i} onChange={(v) => update(c.id, { value: v })} />
                  </div>
                  <Button variant="ghost" size="icon-sm" aria-label={`Quitar condición ${i + 1}`} onClick={() => remove(c.id)}>
                    <Trash2 />
                  </Button>
                </li>
              )
            })}
          </ol>

          <div className="flex justify-between gap-2 border-t border-border px-4 py-3">
            <Button variant="ghost" size="sm" onClick={add}>
              <Plus />
              Añadir condición
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onChange(emptyFilter)} disabled={value.conditions.length === 0}>
              Limpiar todo
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {showChips && active.length > 0 && (
        <>
          <ul aria-label="Filtros activos" className="flex flex-wrap items-center gap-1.5">
            {active.map((c, i) => (
              <Fragment key={c.id}>
                {i > 0 && (
                  <li aria-hidden className="text-xs text-fg-subtle">
                    {value.join === 'and' ? 'y' : 'o'}
                  </li>
                )}
                <li>
                  <Chip onRemove={() => remove(c.id)} removeLabel={`Quitar filtro: ${describeCondition(c, fieldOf(c.field))}`}>
                    {describeCondition(c, fieldOf(c.field))}
                  </Chip>
                </li>
              </Fragment>
            ))}
          </ul>
          <Button variant="link" size="sm" onClick={() => onChange(emptyFilter)}>
            Limpiar filtros
          </Button>
        </>
      )}
    </div>
  )
}

function ValueEditor({ field, condition, index, onChange }: { field: FilterField; condition: FilterCondition; index: number; onChange: (v: FilterValue) => void }) {
  const label = `Valor de la condición ${index + 1}`
  const v = condition.value
  const between = condition.operator === 'between'
  const control = 'h-control-sm'

  if (field.type === 'select') {
    return <ChipGroup multiple aria-label={label} options={field.options ?? []} value={(v as string[] | null) ?? []} onValueChange={onChange} className="pt-0.5" />
  }

  if (field.type === 'number') {
    const parse = (s: string) => (s === '' ? NaN : Number(s))
    if (between) {
      const [a, b] = (v as [number, number] | null) ?? [NaN, NaN]
      return (
        <div className="flex items-center gap-2">
          <Input type="number" aria-label={`${label}: desde`} className={control} value={Number.isNaN(a) ? '' : a} onChange={(e) => onChange([parse(e.target.value), b])} />
          <span className="text-xs text-fg-subtle">y</span>
          <Input type="number" aria-label={`${label}: hasta`} className={control} value={Number.isNaN(b) ? '' : b} onChange={(e) => onChange([a, parse(e.target.value)])} />
        </div>
      )
    }
    return <Input type="number" aria-label={label} className={control} value={typeof v === 'number' && !Number.isNaN(v) ? v : ''} onChange={(e) => onChange(parse(e.target.value))} />
  }

  if (field.type === 'date') {
    if (between) {
      const [from, to] = (v as [Date, Date] | null) ?? [null, null]
      return (
        <DateRangePicker
          aria-label={label}
          className={control}
          // Sin controlar: el selector guarda el inicio mientras se elige el final.
          // Al filtro solo llega el rango completo; mientras tanto la condición queda incompleta.
          defaultValue={{ from, to }}
          onChange={(r) => onChange(r.from && r.to ? [r.from, r.to] : null)}
        />
      )
    }
    return <DatePicker aria-label={label} className={control} value={(v as Date | null) ?? null} onChange={onChange} />
  }

  return <Input aria-label={label} className={control} value={typeof v === 'string' ? v : ''} onChange={(e) => onChange(e.target.value)} placeholder="Escribe…" />
}
