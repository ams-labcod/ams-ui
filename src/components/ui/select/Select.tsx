import type { AriaAttributes, ReactNode } from 'react'
import { Select as S } from 'radix-ui'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../../lib/cn'
import { controlClass, useFieldControl } from '../field/Field'
import { menuContentClass, menuItemClass } from '../menu/styles'

export interface SelectOption {
  /** No puede ser cadena vacía: Radix la reserva para "sin selección". */
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  name?: string
  id?: string
  disabled?: boolean
  required?: boolean
  className?: string
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: AriaAttributes['aria-invalid']
}

export function Select({ options, placeholder = 'Selecciona una opción', className, ...props }: SelectProps) {
  const { id, 'aria-label': ariaLabel, 'aria-describedby': describedBy, 'aria-invalid': invalid, ...root } = useFieldControl(props)
  return (
    <S.Root {...root}>
      <S.Trigger
        id={id}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        className={cn(
          controlClass,
          'inline-flex h-control-md cursor-pointer items-center justify-between gap-2 text-left data-placeholder:text-fg-subtle [&>span]:truncate',
          className,
        )}
      >
        <S.Value placeholder={placeholder} />
        <S.Icon asChild>
          <ChevronDown aria-hidden className="size-4 shrink-0 text-fg-subtle" />
        </S.Icon>
      </S.Trigger>
      <S.Portal>
        <S.Content
          position="popper"
          sideOffset={6}
          className={cn(menuContentClass, 'max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width)')}
        >
          <S.Viewport className="p-1">
            {options.map((o) => (
              <S.Item key={o.value} value={o.value} disabled={o.disabled} className={cn(menuItemClass, 'pr-8')}>
                <S.ItemText>{o.label}</S.ItemText>
                <S.ItemIndicator className="absolute right-2.5 text-accent">
                  <Check />
                </S.ItemIndicator>
              </S.Item>
            ))}
          </S.Viewport>
        </S.Content>
      </S.Portal>
    </S.Root>
  )
}
