// Lógica pura de AdvancedFilter: tipos, operadores, evaluación y descripción
// legible. Se puede usar sin la interfaz (p. ej. para filtrar en el servidor).
import { startOfDay } from '../../../lib/date'
import { formatNumber } from '../../../lib/format'

export type FilterFieldType = 'text' | 'select' | 'number' | 'date'

export interface FilterField {
  /** Clave del dato en cada fila (o la que entienda tu getValue). */
  id: string
  label: string
  type: FilterFieldType
  /** Opciones de los campos select. */
  options?: { value: string; label: string }[]
  /** Formato de los números en la descripción («$ 850.000»). */
  format?: (value: number) => string
}

export type Operator =
  | 'contains'
  | 'notContains'
  | 'equals'
  | 'startsWith'
  | 'is'
  | 'isNot'
  | 'eq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'between'
  | 'on'
  | 'before'
  | 'after'

/** El valor depende del operador: texto, lista de opciones, número, par de números, fecha o par de fechas. */
export type FilterValue = string | string[] | number | [number, number] | Date | [Date, Date] | null

export interface FilterCondition {
  id: string
  field: string
  operator: Operator
  value: FilterValue
}

export interface FilterState {
  /** and: todas las condiciones; or: alguna. */
  join: 'and' | 'or'
  conditions: FilterCondition[]
}

export const emptyFilter: FilterState = { join: 'and', conditions: [] }

export const operatorsByType: Record<FilterFieldType, { value: Operator; label: string }[]> = {
  text: [
    { value: 'contains', label: 'contiene' },
    { value: 'notContains', label: 'no contiene' },
    { value: 'equals', label: 'es igual a' },
    { value: 'startsWith', label: 'empieza por' },
  ],
  select: [
    { value: 'is', label: 'es' },
    { value: 'isNot', label: 'no es' },
  ],
  number: [
    { value: 'eq', label: 'igual a' },
    { value: 'gt', label: 'mayor que' },
    { value: 'gte', label: 'mayor o igual que' },
    { value: 'lt', label: 'menor que' },
    { value: 'lte', label: 'menor o igual que' },
    { value: 'between', label: 'entre' },
  ],
  date: [
    { value: 'on', label: 'el día' },
    { value: 'before', label: 'antes del' },
    { value: 'after', label: 'después del' },
    { value: 'between', label: 'entre' },
  ],
}

let seq = 0
export function newCondition(field: FilterField): FilterCondition {
  return { id: `c${++seq}`, field: field.id, operator: operatorsByType[field.type][0]!.value, value: null }
}

const norm = (s: unknown) =>
  String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()

const toDay = (v: unknown) => {
  const d = v instanceof Date ? v : new Date(String(v))
  return Number.isNaN(d.getTime()) ? null : startOfDay(d).getTime()
}

/** ¿La condición tiene valor suficiente para aplicarse? Las incompletas se ignoran. */
export function isComplete(c: FilterCondition) {
  const v = c.value
  if (v === null || v === '') return false
  if (Array.isArray(v)) return c.operator === 'between' ? v.length === 2 && v.every((x) => x !== null && !(typeof x === 'number' && Number.isNaN(x))) : v.length > 0
  return !(typeof v === 'number' && Number.isNaN(v))
}

export function matchCondition(raw: unknown, c: FilterCondition): boolean {
  const v = c.value
  switch (c.operator) {
    case 'contains':
      return norm(raw).includes(norm(v))
    case 'notContains':
      return !norm(raw).includes(norm(v))
    case 'equals':
      return norm(raw) === norm(v)
    case 'startsWith':
      return norm(raw).startsWith(norm(v))
    case 'is':
      return (v as string[]).includes(String(raw))
    case 'isNot':
      return !(v as string[]).includes(String(raw))
    case 'eq':
      return Number(raw) === v
    case 'gt':
      return Number(raw) > (v as number)
    case 'gte':
      return Number(raw) >= (v as number)
    case 'lt':
      return Number(raw) < (v as number)
    case 'lte':
      return Number(raw) <= (v as number)
    case 'on':
      return toDay(raw) === toDay(v)
    case 'before': {
      const d = toDay(raw)
      return d !== null && d < toDay(v)!
    }
    case 'after': {
      const d = toDay(raw)
      return d !== null && d > toDay(v)!
    }
    case 'between': {
      const [a, b] = v as [number, number] | [Date, Date]
      if (a instanceof Date || b instanceof Date) {
        const d = toDay(raw)
        return d !== null && d >= toDay(a)! && d <= toDay(b)!
      }
      const n = Number(raw)
      return n >= Math.min(a, b) && n <= Math.max(a, b)
    }
  }
}

/** Filtra filas. getValue permite datos anidados o calculados; por defecto row[field.id]. */
export function applyFilter<T>(rows: T[], state: FilterState, getValue: (row: T, fieldId: string) => unknown = (row, id) => (row as Record<string, unknown>)[id]) {
  const active = state.conditions.filter(isComplete)
  if (active.length === 0) return rows
  return rows.filter((row) => {
    const test = (c: FilterCondition) => matchCondition(getValue(row, c.field), c)
    return state.join === 'and' ? active.every(test) : active.some(test)
  })
}

/** «Promedio mayor que 8», «Grado es Sexto o Séptimo», «Nombre contiene “ana”». */
export function describeCondition(c: FilterCondition, field: FilterField | undefined, locale = 'es') {
  if (!field) return ''
  const op = operatorsByType[field.type].find((o) => o.value === c.operator)?.label ?? c.operator
  const num = (n: number) => (field.format ? field.format(n) : formatNumber(n, locale))
  const date = (d: Date) => d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
  const one = (x: unknown) => (x instanceof Date ? date(x) : typeof x === 'number' ? num(x) : `«${String(x)}»`)
  const v = c.value
  let text: string
  if (field.type === 'select') {
    const labels = (v as string[]).map((x) => field.options?.find((o) => o.value === x)?.label ?? x)
    text = new Intl.ListFormat(locale, { type: 'disjunction' }).format(labels)
  } else if (c.operator === 'between' && Array.isArray(v)) {
    text = `${one(v[0])} y ${one(v[1])}`
  } else {
    text = one(v)
  }
  return `${field.label} ${op} ${text}`
}
