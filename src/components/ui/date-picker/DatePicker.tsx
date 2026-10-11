import { useState, type AriaAttributes } from 'react'
import { Popover as P } from 'radix-ui'
import { CalendarDays } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { startOfDay } from '../../../lib/date'
import { Button } from '../button/Button'
import { Calendar, type CalendarSingleProps, type DateRange } from '../calendar/Calendar'
import { controlClass, useFieldControl } from '../field/Field'

export interface DatePickerProps extends Pick<CalendarSingleProps, 'min' | 'max' | 'isDisabled' | 'events' | 'locale' | 'yearRange'> {
  value?: Date | null
  defaultValue?: Date | null
  /** null al borrar. */
  onChange?: (date: Date | null) => void
  placeholder?: string
  /** Formato del texto del disparador. */
  format?: Intl.DateTimeFormatOptions
  /** Envía la fecha como AAAA-MM-DD en un <form>. */
  name?: string
  id?: string
  disabled?: boolean
  required?: boolean
  className?: string
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: AriaAttributes['aria-invalid']
}

const toIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function DatePicker({
  value,
  defaultValue = null,
  onChange,
  placeholder = 'Elige una fecha',
  format = { day: 'numeric', month: 'long', year: 'numeric' },
  name,
  locale = 'es',
  min,
  max,
  isDisabled,
  events,
  yearRange,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [inner, setInner] = useState<Date | null>(defaultValue)
  const selected = value !== undefined ? value : inner
  const control = useFieldControl(props)
  const today = startOfDay(new Date())
  const todayAvailable = !(min && today < startOfDay(min)) && !(max && today > startOfDay(max)) && !isDisabled?.(today)

  function commit(date: Date | null) {
    setInner(date)
    onChange?.(date)
    setOpen(false)
  }

  return (
    <P.Root open={open} onOpenChange={setOpen}>
      <P.Trigger
        id={control.id}
        disabled={control.disabled}
        aria-label={control['aria-label']}
        aria-describedby={control['aria-describedby']}
        aria-invalid={control['aria-invalid']}
        className={cn(controlClass, 'inline-flex h-control-md cursor-pointer items-center justify-between gap-2 text-left', !selected && 'text-fg-subtle', className)}
      >
        <span className="truncate">{selected ? selected.toLocaleDateString(locale, format) : placeholder}</span>
        <CalendarDays aria-hidden className="size-4 shrink-0 text-fg-subtle" />
      </P.Trigger>
      {name && <input type="hidden" name={name} value={selected ? toIso(selected) : ''} />}
      <P.Portal>
        <P.Content
          align="start"
          sideOffset={6}
          aria-label="Calendario"
          className="z-(--z-popover) rounded-md border border-border bg-surface p-3 shadow-pop outline-none animate-overlay-in"
        >
          <Calendar value={selected} onChange={commit} min={min} max={max} isDisabled={isDisabled} events={events} locale={locale} yearRange={yearRange} autoFocus />
          <div className="mt-2 flex justify-between gap-2 border-t border-border pt-3">
            <Button size="sm" variant="ghost" onClick={() => commit(today)} disabled={!todayAvailable}>
              Hoy
            </Button>
            {selected && !control.required && (
              <Button size="sm" variant="ghost" onClick={() => commit(null)}>
                Borrar
              </Button>
            )}
          </div>
        </P.Content>
      </P.Portal>
    </P.Root>
  )
}

export interface DateRangePickerProps extends Omit<DatePickerProps, 'value' | 'defaultValue' | 'onChange' | 'placeholder'> {
  value?: DateRange
  defaultValue?: DateRange
  /** Se llama con cada clic; el rango está completo cuando `to` no es null. */
  onChange?: (range: DateRange) => void
  placeholder?: string
}

/** Elige un rango de fechas (desde–hasta) en un solo calendario. Se cierra al completar el rango. */
export function DateRangePicker({
  value,
  defaultValue = { from: null, to: null },
  onChange,
  placeholder = 'Elige un rango de fechas',
  format = { day: 'numeric', month: 'short', year: 'numeric' },
  name,
  locale = 'es',
  min,
  max,
  isDisabled,
  events,
  yearRange,
  className,
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [inner, setInner] = useState<DateRange>(defaultValue)
  const range = value ?? inner
  const control = useFieldControl(props)
  const fmt = (d: Date) => d.toLocaleDateString(locale, format)
  const text = range.from ? `${fmt(range.from)} – ${range.to ? fmt(range.to) : '…'}` : placeholder

  function change(next: DateRange) {
    setInner(next)
    onChange?.(next)
    if (next.from && next.to) setOpen(false)
  }

  return (
    <P.Root open={open} onOpenChange={setOpen}>
      <P.Trigger
        id={control.id}
        disabled={control.disabled}
        aria-label={control['aria-label']}
        aria-describedby={control['aria-describedby']}
        aria-invalid={control['aria-invalid']}
        className={cn(controlClass, 'inline-flex h-control-md cursor-pointer items-center justify-between gap-2 text-left', !range.from && 'text-fg-subtle', className)}
      >
        <span className="truncate">{text}</span>
        <CalendarDays aria-hidden className="size-4 shrink-0 text-fg-subtle" />
      </P.Trigger>
      {name && (
        <>
          <input type="hidden" name={`${name}_desde`} value={range.from ? toIso(range.from) : ''} />
          <input type="hidden" name={`${name}_hasta`} value={range.to ? toIso(range.to) : ''} />
        </>
      )}
      <P.Portal>
        <P.Content
          align="start"
          sideOffset={6}
          aria-label="Calendario de rango"
          className="z-(--z-popover) rounded-md border border-border bg-surface p-3 shadow-pop outline-none animate-overlay-in"
        >
          <Calendar mode="range" value={range} onChange={change} min={min} max={max} isDisabled={isDisabled} events={events} locale={locale} yearRange={yearRange} autoFocus />
          {range.from && (
            <div className="mt-2 flex justify-end border-t border-border pt-3">
              <Button size="sm" variant="ghost" onClick={() => change({ from: null, to: null })}>
                Borrar
              </Button>
            </div>
          )}
        </P.Content>
      </P.Portal>
    </P.Root>
  )
}
