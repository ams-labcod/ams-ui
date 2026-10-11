import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { addDays, addMonths, clampDate, isSameDay, isSameMonth, monthWeeks, startOfDay, startOfMonth, startOfWeek, weekdayNames } from '../../../lib/date'
import { Button } from '../button/Button'
import { Select } from '../select/Select'

export interface DateRange {
  from: Date | null
  to: Date | null
}

interface CalendarBaseProps {
  /** Mes que se muestra al montar; por defecto el del valor o el actual. */
  defaultMonth?: Date
  min?: Date
  max?: Date
  /** Días no seleccionables además de los que quedan fuera de min/max. */
  isDisabled?: (date: Date) => boolean
  /** Días con eventos: se marcan con un punto, como en la referencia. */
  events?: Date[]
  locale?: string
  /** Años del selector. Por defecto los de min/max, o 10 años alrededor del actual. */
  yearRange?: [number, number]
  /** Enfoca el día seleccionado (o hoy) al montar. Lo usan los pickers. */
  autoFocus?: boolean
  className?: string
}

export interface CalendarSingleProps extends CalendarBaseProps {
  mode?: 'single'
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date) => void
}

export interface CalendarRangeProps extends CalendarBaseProps {
  /** Rango: el primer clic fija el inicio y el segundo el final. */
  mode: 'range'
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange) => void
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const EMPTY_RANGE: DateRange = { from: null, to: null }

/** Siguiente rango tras elegir `day`: empieza uno nuevo si el anterior estaba completo; si se elige antes del inicio, se intercambian. */
export function nextRange(current: DateRange, day: Date): DateRange {
  if (!current.from || current.to) return { from: day, to: null }
  return day < current.from ? { from: day, to: current.from } : { from: current.from, to: day }
}

export function Calendar(props: CalendarProps) {
  const { defaultMonth, min, max, isDisabled, events = [], locale = 'es', yearRange, autoFocus = false, className } = props
  const isRange = props.mode === 'range'

  const [inner, setInner] = useState<Date | DateRange | null>(props.defaultValue ?? (isRange ? EMPTY_RANGE : null))
  const value = props.value !== undefined ? props.value : inner
  const range = isRange ? ((value as DateRange | null) ?? EMPTY_RANGE) : null
  const single = isRange ? null : (value as Date | null)
  const anchor = range?.from ?? single

  const today = startOfDay(new Date())
  const [focused, setFocused] = useState(() => clampDate(startOfDay(anchor ?? defaultMonth ?? today), min, max))
  const [month, setMonth] = useState(() => startOfMonth(defaultMonth ?? focused))
  const [hovered, setHovered] = useState<Date | null>(null)
  const gridRef = useRef<HTMLTableElement>(null)
  const shouldFocus = useRef(autoFocus)
  const headingId = useId()

  // Tras mover el foco con el teclado, enfoca el botón del nuevo día.
  useEffect(() => {
    if (!shouldFocus.current) return
    shouldFocus.current = false
    gridRef.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus()
  }, [focused, month])

  const outOfRange = (d: Date) => (min && d < startOfDay(min)) || (max && d > startOfDay(max))
  const unavailable = (d: Date) => Boolean(outOfRange(d) || isDisabled?.(d))

  function moveFocus(next: Date) {
    const target = clampDate(next, min, max)
    shouldFocus.current = true
    setFocused(target)
    if (!isSameMonth(target, month)) setMonth(startOfMonth(target))
  }

  function select(day: Date) {
    if (unavailable(day)) return
    setFocused(day)
    if (props.mode === 'range') {
      const next = nextRange(range!, day)
      setInner(next)
      props.onChange?.(next)
    } else {
      setInner(day)
      props.onChange?.(day)
    }
  }

  function goToMonth(next: Date) {
    const target = startOfMonth(clampDate(next, min && startOfMonth(min), max))
    setMonth(target)
    setFocused(clampDate(isSameMonth(focused, target) ? focused : target, min, max))
  }

  function onKeyDown(e: KeyboardEvent, day: Date) {
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(day, -1),
      ArrowRight: () => addDays(day, 1),
      ArrowUp: () => addDays(day, -7),
      ArrowDown: () => addDays(day, 7),
      Home: () => startOfWeek(day),
      End: () => addDays(startOfWeek(day), 6),
      PageUp: () => addMonths(day, e.shiftKey ? -12 : -1),
      PageDown: () => addMonths(day, e.shiftKey ? 12 : 1),
    }
    const move = moves[e.key]
    if (!move) return
    e.preventDefault()
    moveFocus(move())
  }

  // Selectores de mes y año
  const thisYear = today.getFullYear()
  const [firstYear, lastYear] = yearRange ?? [min?.getFullYear() ?? thisYear - 10, max?.getFullYear() ?? thisYear + 10]
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i)
  const monthOptions = Array.from({ length: 12 }, (_, m) => {
    const first = new Date(month.getFullYear(), m, 1)
    const last = new Date(month.getFullYear(), m + 1, 0)
    return { value: String(m), label: capitalize(first.toLocaleDateString(locale, { month: 'long' })), disabled: Boolean((min && last < startOfDay(min)) || (max && first > startOfDay(max))) }
  })
  const canPrev = !min || startOfMonth(min) < month
  const canNext = !max || startOfMonth(max) > month

  // Rango visible: el confirmado o, mientras falta el final, el que se previsualiza hasta el día bajo el puntero o el foco.
  const previewTo = range?.from && !range.to ? hovered : null
  const [lo, hi] = (() => {
    if (!range?.from) return [null, null]
    const end = range.to ?? previewTo
    if (!end) return [range.from, range.from]
    return end < range.from ? [end, range.from] : [range.from, end]
  })()

  const weekdaysShort = weekdayNames(locale, 'narrow')
  const weekdaysLong = weekdayNames(locale, 'long')
  const monthLabel = capitalize(month.toLocaleDateString(locale, { month: 'long', year: 'numeric' }))

  return (
    <div className={cn('w-fit select-none', className)}>
      <div className="mb-3 flex items-center justify-between gap-1">
        <Button variant="ghost" size="icon-sm" onClick={() => goToMonth(addMonths(month, -1))} disabled={!canPrev} aria-label="Mes anterior">
          <ChevronLeft />
        </Button>
        <div className="flex gap-1.5">
          <Select
            aria-label="Mes"
            value={String(month.getMonth())}
            onValueChange={(m) => goToMonth(new Date(month.getFullYear(), Number(m), 1))}
            options={monthOptions}
            className="h-8 w-[7.5rem] rounded-sm px-2.5 text-[13px] font-medium"
          />
          <Select
            aria-label="Año"
            value={String(month.getFullYear())}
            onValueChange={(y) => goToMonth(new Date(Number(y), month.getMonth(), 1))}
            options={years.map((y) => ({ value: String(y), label: String(y) }))}
            className="h-8 w-[5.25rem] rounded-sm px-2.5 text-[13px] font-medium tabular-nums"
          />
        </div>
        <Button variant="ghost" size="icon-sm" onClick={() => goToMonth(addMonths(month, 1))} disabled={!canNext} aria-label="Mes siguiente">
          <ChevronRight />
        </Button>
      </div>
      <h2 id={headingId} aria-live="polite" className="sr-only">
        {monthLabel}
      </h2>

      <table ref={gridRef} role="grid" aria-labelledby={headingId} className="border-separate border-spacing-x-0 border-spacing-y-1" onMouseLeave={() => setHovered(null)}>
        <thead>
          <tr>
            {weekdaysShort.map((w, i) => (
              <th key={i} scope="col" abbr={weekdaysLong[i]} className="pb-1 text-2xs font-medium text-fg-subtle uppercase">
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthWeeks(month).map((week) => (
            <tr key={week[0]!.toISOString()}>
              {week.map((day) => {
                if (!isSameMonth(day, month)) return <td key={day.toISOString()} />
                const isStart = isRange && isSameDay(day, lo)
                const isEnd = isRange && isSameDay(day, hi)
                const between = isRange && lo && hi && day > lo && day < hi
                const confirmed = isRange && range?.to
                const isSelected = isRange ? Boolean(confirmed ? isStart || isEnd : isSameDay(day, range?.from)) : isSameDay(day, single)
                const isToday = isSameDay(day, today)
                const hasEvent = events.some((ev) => isSameDay(ev, day))
                const off = unavailable(day)
                const label = [
                  day.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
                  hasEvent && 'con eventos',
                  confirmed && isStart && 'inicio del rango',
                  confirmed && isEnd && 'fin del rango',
                ]
                  .filter(Boolean)
                  .join(', ')
                return (
                  <td
                    key={day.toISOString()}
                    aria-selected={isSelected || (confirmed && between) || false}
                    // La banda del rango une las celdas: se pinta en la celda, no en el botón.
                    className={cn(
                      'px-0.5',
                      (between || (lo && hi && !isSameDay(lo, hi) && (isStart || isEnd))) && 'bg-accent-soft',
                      isStart && hi && !isSameDay(lo, hi) && 'rounded-l-xs',
                      isEnd && lo && !isSameDay(lo, hi) && 'rounded-r-xs',
                      !confirmed && between && 'bg-accent-soft/50',
                    )}
                  >
                    <button
                      type="button"
                      tabIndex={isSameDay(day, focused) ? 0 : -1}
                      aria-label={label}
                      aria-current={isToday ? 'date' : undefined}
                      aria-disabled={off || undefined}
                      onClick={() => select(day)}
                      onKeyDown={(e) => onKeyDown(e, day)}
                      onFocus={() => {
                        setFocused(day)
                        setHovered(day)
                      }}
                      onMouseEnter={() => setHovered(day)}
                      className={cn(
                        'relative flex size-9 cursor-pointer items-center justify-center rounded-xs border text-[13px] tabular-nums transition-colors duration-(--duration-fast)',
                        'border-border bg-sunken text-fg-muted hover:border-border-strong hover:text-fg',
                        hasEvent && 'border-accent-border bg-accent-soft text-accent',
                        between && 'border-transparent bg-transparent text-accent',
                        isToday && 'border-accent font-bold text-accent',
                        (isSelected || isStart || isEnd) && 'border-transparent bg-gradient-primary font-semibold text-on-primary shadow-glow hover:text-on-primary',
                        off && 'cursor-not-allowed opacity-35 hover:border-border hover:text-fg-muted',
                      )}
                    >
                      {day.getDate()}
                      {hasEvent && <span aria-hidden className={cn('absolute bottom-1 size-1 rounded-full', isSelected || isStart || isEnd ? 'bg-on-primary' : 'bg-accent')} />}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {isRange && (
        <p aria-live="polite" className="mt-2 text-center text-xs text-fg-subtle">
          {!range?.from ? 'Elige la fecha inicial' : !range.to ? 'Ahora elige la fecha final' : 'Elige otra fecha para empezar un rango nuevo'}
        </p>
      )}
    </div>
  )
}
