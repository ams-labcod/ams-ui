import { useId, type ReactNode } from 'react'
import { RadioGroup as R } from 'radix-ui'
import { cn } from '../../../lib/cn'
import { FieldDescription, FieldError } from '../field/Field'

export interface RadioOption {
  value: string
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  /** Nombre visible del grupo. Sin él, pasa aria-label. */
  label?: ReactNode
  description?: ReactNode
  error?: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  required?: boolean
  disabled?: boolean
  orientation?: 'vertical' | 'horizontal'
  /** 'card': cada opción es una tarjeta seleccionable, para elegir entre opciones con más contenido. */
  variant?: 'default' | 'card'
  className?: string
  'aria-label'?: string
}

export function RadioGroup({ options, label, description, error, variant = 'default', orientation = 'vertical', className, ...props }: RadioGroupProps) {
  const id = useId()
  const labelId = label ? `${id}-label` : undefined
  const descriptionId = description ? `${id}-description` : undefined
  const errorId = error ? `${id}-error` : undefined
  const card = variant === 'card'

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span id={labelId} className="text-sm font-medium text-fg">
          {label}
          {props.required && (
            <span aria-hidden className="ml-0.5 text-danger">
              *
            </span>
          )}
        </span>
      )}
      <R.Root
        {...props}
        orientation={orientation}
        aria-labelledby={labelId}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? true : undefined}
        className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap', card && 'gap-3')}
      >
        {options.map((o) => {
          const itemId = `${id}-${o.value}`
          return (
            <label
              key={o.value}
              htmlFor={itemId}
              className={cn(
                'group/radio flex cursor-pointer items-start gap-3 text-sm',
                card &&
                  'flex-1 rounded-lg border border-border bg-glass p-4 transition-colors duration-(--duration-fast) hover:border-border-strong has-data-[state=checked]:border-accent-border has-data-[state=checked]:bg-accent-soft',
                o.disabled && 'state-disabled',
              )}
            >
              <R.Item
                id={itemId}
                value={o.value}
                disabled={o.disabled}
                className={cn(
                  'mt-0.5 inline-flex size-4.5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-sunken transition-colors duration-(--duration-fast)',
                  'hover:border-accent-border data-[state=checked]:border-primary',
                  error && 'border-danger',
                )}
              >
                <R.Indicator className="size-2.5 rounded-full bg-primary" />
              </R.Item>
              <span className="min-w-0">
                <span className={cn('text-fg', card && 'font-medium')}>{o.label}</span>
                {o.description && <span className={cn('mt-0.5 block text-xs', card ? 'text-fg-muted' : 'text-fg-subtle')}>{o.description}</span>}
              </span>
            </label>
          )
        })}
      </R.Root>
      {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  )
}
