import type { ComponentProps, ReactNode } from 'react'
import { ToggleGroup as T } from 'radix-ui'
import { X } from 'lucide-react'
import { cn } from '../../../lib/cn'

const chipClass =
  'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-border bg-glass px-3.5 text-[13px] font-medium whitespace-nowrap text-fg-muted transition-colors duration-(--duration-fast) [&_svg]:size-3.5'

// ---------- Chip: etiqueta con opción de quitar (filtros activos, destinatarios) ----------

export interface ChipProps extends ComponentProps<'span'> {
  /** Si se pasa, muestra una X para quitar el chip. */
  onRemove?: () => void
  /** Nombre del botón de quitar; por defecto «Quitar <texto>» si children es texto. */
  removeLabel?: string
}

export function Chip({ onRemove, removeLabel, className, children, ...props }: ChipProps) {
  const label = removeLabel ?? (typeof children === 'string' ? `Quitar ${children}` : 'Quitar')
  return (
    <span className={cn(chipClass, 'border-accent-border bg-accent-soft text-accent', onRemove && 'pr-1.5', className)} {...props}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={label}
          className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent-soft hover:text-fg"
        >
          <X />
        </button>
      )}
    </span>
  )
}

// ---------- ChipGroup: selección de una o varias opciones ----------

export interface ChipOption {
  value: string
  label: ReactNode
  icon?: ReactNode
  disabled?: boolean
}

interface ChipGroupBase {
  options: ChipOption[]
  disabled?: boolean
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

export type ChipGroupProps = ChipGroupBase &
  (
    | { multiple?: false; value?: string; defaultValue?: string; onValueChange?: (value: string) => void }
    | { multiple: true; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void }
  )

export function ChipGroup({ options, className, multiple, ...props }: ChipGroupProps) {
  const items = options.map((o) => (
    <T.Item
      key={o.value}
      value={o.value}
      disabled={o.disabled}
      className={cn(
        chipClass,
        'cursor-pointer hover:border-border-strong hover:text-fg disabled:state-disabled',
        'data-[state=on]:border-accent-border data-[state=on]:bg-accent-soft data-[state=on]:text-accent',
      )}
    >
      {o.icon}
      {o.label}
    </T.Item>
  ))
  const rootClass = cn('flex flex-wrap gap-2', className)

  // Radix separa los tipos de un solo valor y de varios; aquí se expone una sola API.
  return multiple ? (
    <T.Root type="multiple" className={rootClass} {...(props as Omit<Extract<ChipGroupProps, { multiple: true }>, 'options' | 'multiple'>)}>
      {items}
    </T.Root>
  ) : (
    <T.Root type="single" className={rootClass} {...(props as Omit<Extract<ChipGroupProps, { multiple?: false }>, 'options' | 'multiple'>)}>
      {items}
    </T.Root>
  )
}
